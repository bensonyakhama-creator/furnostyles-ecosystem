/**
 * FURNOSTYLES — STORAGE SERVICE
 * ==============================
 * File: shared/firebase/storage-service.js
 * Purpose: Centralized Firebase Storage service for file operations.
 *          Provides reusable methods for upload, download, and delete operations.
 * 
 * This service uses the Storage instance from firebase-init.js
 * No direct Storage calls should be made outside this service.
 * 
 * Load order: After firebase-init.js
 * 
 * Usage: Use window.FurnostylesStorageService for all Storage operations
 */

(function () {
  'use strict';

  /**
   * Get Storage instance — tries bridge, then firebase-init, then global SDK
   */
  function getStorageInstance() {
    /* 1. FurnostylesFirebase bridge (standard approach) */
    var bridge = window.FurnostylesFirebase;
    if (bridge && bridge.storage) return bridge.storage;

    /* 2. firebase-init.js explicit getter */
    if (window.FurnostylesFirebaseInit && window.FurnostylesFirebaseInit.getStorage) {
      var s = window.FurnostylesFirebaseInit.getStorage();
      if (s) return s;
    }

    /* 3. Global Firebase SDK fallback */
    if (window.firebase && typeof window.firebase.storage === 'function') {
      try { return window.firebase.storage(); } catch (e) {}
    }

    return null;
  }

  /**
   * Check whether a real Storage instance is available
   */
  function isAvailable() {
    return getStorageInstance() !== null;
  }

  /**
   * Build a canonical Storage path for an upload
   * @param {string} context  - 'products'|'properties'|'repairs'|'portfolios'|'sourcing'|'vendors'
   * @param {string} entityId - Entity document ID (or null/undefined for temp uploads)
   * @param {string} filename - Original or sanitized filename
   * @returns {string} Full Storage path, e.g. "uploads/products/abc123/img_001_photo.jpg"
   */
  function getUploadPath(context, entityId, filename) {
    var config   = window.FurnostylesUploadConfig;
    var base     = config ? config.getStoragePath(context) : ('uploads/' + (context || 'misc') + '/');
    var id       = entityId || ('tmp_' + Date.now());
    var safeName = String(filename || 'image').replace(/[^a-zA-Z0-9._-]/g, '_');
    return base + id + '/' + safeName;
  }

  /**
   * Upload file
   * @param {string} path - Storage path
   * @param {File} file - File to upload
   * @param {object} metadata - Optional metadata
   * @param {function} onProgress - Progress callback
   * @returns {Promise} - Resolves with download URL
   */
  function uploadFile(path, file, metadata, onProgress) {
    var storage = getStorageInstance();

    /* LOCAL mode — no Firebase Storage available */
    if (!storage) {
      return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.onload = function (e) {
          if (onProgress) onProgress(100);
          resolve(e.target.result); /* data URL as stand-in */
        };
        reader.onerror = function () {
          if (onProgress) onProgress(100);
          resolve('[local:' + path + ']'); /* last-resort fallback */
        };
        reader.readAsDataURL(file);
      });
    }

    /* FIREBASE mode */
    var storageRef = storage.ref(path);
    var uploadTask = storageRef.put(file, metadata || undefined);

    return new Promise(function (resolve, reject) {
      uploadTask.on('state_changed',
        function (snapshot) {
          if (onProgress) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          }
        },
        function (error) { reject(error); },
        function () {
          uploadTask.snapshot.ref.getDownloadURL()
            .then(function (downloadURL) { resolve(downloadURL); })
            .catch(reject);
        }
      );
    });
  }

  /**
   * Download file
   * @param {string} path - Storage path
   * @returns {Promise} - Resolves with download URL
   */
  function downloadFile(path) {
    var storage = getStorageInstance();
    if (!storage) return Promise.reject(new Error('Storage not available'));

    var storageRef = storage.ref(path);

    return storageRef.getDownloadURL();
  }

  /**
   * Delete file
   * @param {string} path - Storage path
   * @returns {Promise} - Resolves when file is deleted
   */
  function deleteFile(path) {
    var storage = getStorageInstance();
    if (!storage) return Promise.reject(new Error('Storage not available'));

    var storageRef = storage.ref(path);

    return storageRef.delete();
  }

  /**
   * Get file metadata
   * @param {string} path - Storage path
   * @returns {Promise} - Resolves with file metadata
   */
  function getMetadata(path) {
    var storage = getStorageInstance();
    if (!storage) return Promise.reject(new Error('Storage not available'));

    var storageRef = storage.ref(path);

    return storageRef.getMetadata();
  }

  /**
   * List files in directory
   * @param {string} path - Storage path
   * @param {number} maxResults - Maximum results to return
   * @returns {Promise} - Resolves with array of file references
   */
  function listFiles(path, maxResults) {
    var storage = getStorageInstance();
    if (!storage) return Promise.reject(new Error('Storage not available'));

    var storageRef = storage.ref(path);

    if (maxResults) {
      return storageRef.list({ maxResults: maxResults });
    }

    return storageRef.listAll();
  }

  /**
   * Upload multiple files
   * @param {array} files - Array of { path, file, metadata }
   * @param {function} onProgress - Progress callback
   * @returns {Promise} - Resolves with array of download URLs
   */
  function uploadMultipleFiles(files, onProgress) {
    var uploadPromises = files.map(function (fileObj, index) {
      return uploadFile(fileObj.path, fileObj.file, fileObj.metadata, function (progress) {
        if (onProgress) {
          onProgress({ index: index, progress: progress, total: files.length });
        }
      });
    });

    return Promise.all(uploadPromises);
  }

  /**
   * Export Storage Service API
   */
  window.FurnostylesStorageService = {
    isAvailable:        isAvailable,
    getUploadPath:      getUploadPath,
    uploadFile:         uploadFile,
    downloadFile:       downloadFile,
    deleteFile:         deleteFile,
    getMetadata:        getMetadata,
    listFiles:          listFiles,
    uploadMultipleFiles: uploadMultipleFiles
  };

}());
