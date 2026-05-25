/**
 * FURNOSTYLES — FIRESTORE.JS
 * ===========================
 * File: assets/js/firestore.js
 * Purpose: Central Firestore operations module for Furnostyles.
 *          Provides CRUD operations for Firestore collections.
 *          Handles users, products, orders, inquiries, and other data.
 *
 * Dependencies:
 *   - Firebase SDK (must be loaded before this file)
 *   - shared/firebase/firebase-config.js
 *   - shared/firebase/firebase-bridge.js
 *
 * Usage:
 *   window.FurnostylesFirestore.save(collection, data)
 *   window.FurnostylesFirestore.get(collection, id)
 *   window.FurnostylesFirestore.list(collection, options)
 *   window.FurnostylesFirestore.update(collection, id, data)
 *   window.FurnostylesFirestore.remove(collection, id)
 */

(function () {
  'use strict';

  /* ============================================================
     GET FIRESTORE INSTANCE
     ============================================================ */

  function getFirestore() {
    if (window.FurnostylesFirebase && window.FurnostylesFirebase.db) {
      return window.FurnostylesFirebase.db;
    }
    console.error('[Firestore] Firestore not available. Ensure Firebase SDK is loaded.');
    return null;
  }

  /* ============================================================
     SAVE DOCUMENT
     ============================================================ */

  /**
   * Save a document to a collection
   * @param {string} collection - Collection name
   * @param {object} data - Document data
   * @returns {Promise} - Resolves with document ID
   */
  function save(collection, data) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    var docData = Object.assign({}, data, {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return db.collection(collection).add(docData)
      .then(function (docRef) {
        console.log('[Firestore] Document saved:', collection, docRef.id);
        return docRef.id;
      })
      .catch(function (error) {
        console.error('[Firestore] Save failed:', error);
        throw error;
      });
  }

  /* ============================================================
     GET DOCUMENT
     ============================================================ */

  /**
   * Get a document by ID
   * @param {string} collection - Collection name
   * @param {string} id - Document ID
   * @returns {Promise} - Resolves with document data
   */
  function get(collection, id) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    return db.collection(collection).doc(id).get()
      .then(function (doc) {
        if (doc.exists) {
          return Object.assign({ id: doc.id }, doc.data());
        } else {
          console.warn('[Firestore] Document not found:', collection, id);
          return null;
        }
      })
      .catch(function (error) {
        console.error('[Firestore] Get failed:', error);
        throw error;
      });
  }

  /* ============================================================
     LIST DOCUMENTS
     ============================================================ */

  /**
   * List documents from a collection with optional filters
   * @param {string} collection - Collection name
   * @param {object} options - Query options (where, orderBy, limit)
   * @returns {Promise} - Resolves with array of documents
   */
  function list(collection, options) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    var query = db.collection(collection);

    // Apply where filters
    if (options && options.where) {
      options.where.forEach(function (w) {
        query = query.where(w.field, w.operator, w.value);
      });
    }

    // Apply orderBy
    if (options && options.orderBy) {
      var ob = Array.isArray(options.orderBy) ? options.orderBy[0] : options.orderBy;
      query = query.orderBy(ob.field, ob.direction || 'asc');
    }

    // Apply limit
    if (options && options.limit) {
      query = query.limit(options.limit);
    }

    return query.get()
      .then(function (snapshot) {
        var docs = [];
        snapshot.forEach(function (doc) {
          docs.push(Object.assign({ id: doc.id }, doc.data()));
        });
        console.log('[Firestore] Listed', docs.length, 'documents from:', collection);
        return docs;
      })
      .catch(function (error) {
        console.error('[Firestore] List failed:', error);
        throw error;
      });
  }

  /* ============================================================
     UPDATE DOCUMENT
     ============================================================ */

  /**
   * Update a document
   * @param {string} collection - Collection name
   * @param {string} id - Document ID
   * @param {object} data - Data to update
   * @returns {Promise} - Resolves when update is complete
   */
  function update(collection, id, data) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    var updateData = Object.assign({}, data, {
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return db.collection(collection).doc(id).update(updateData)
      .then(function () {
        console.log('[Firestore] Document updated:', collection, id);
      })
      .catch(function (error) {
        console.error('[Firestore] Update failed:', error);
        throw error;
      });
  }

  /* ============================================================
     REMOVE DOCUMENT
     ============================================================ */

  /**
   * Delete a document
   * @param {string} collection - Collection name
   * @param {string} id - Document ID
   * @returns {Promise} - Resolves when delete is complete
   */
  function remove(collection, id) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    return db.collection(collection).doc(id).delete()
      .then(function () {
        console.log('[Firestore] Document deleted:', collection, id);
      })
      .catch(function (error) {
        console.error('[Firestore] Delete failed:', error);
        throw error;
      });
  }

  /* ============================================================
     USER-SPECIFIC OPERATIONS
     ============================================================ */

  /**
   * Get user by ID
   * @param {string} uid - User ID
   * @returns {Promise} - Resolves with user data
   */
  function getUser(uid) {
    return get('users', uid);
  }

  /**
   * Update user data
   * @param {string} uid - User ID
   * @param {object} data - Data to update
   * @returns {Promise} - Resolves when update is complete
   */
  function updateUser(uid, data) {
    return update('users', uid, data);
  }

  /**
   * Get user by email
   * @param {string} email - User email
   * @returns {Promise} - Resolves with user data
   */
  function getUserByEmail(email) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    return db.collection('users').where('email', '==', email).limit(1).get()
      .then(function (snapshot) {
        if (snapshot.empty) {
          return null;
        }
        var doc = snapshot.docs[0];
        return Object.assign({ id: doc.id }, doc.data());
      })
      .catch(function (error) {
        console.error('[Firestore] Get user by email failed:', error);
        throw error;
      });
  }

  /* ============================================================
     QUERY HELPERS
     ============================================================ */

  /**
   * Query documents where field equals value
   * @param {string} collection - Collection name
   * @param {string} field - Field name
   * @param {*} value - Field value
   * @returns {Promise} - Resolves with array of documents
   */
  function whereEquals(collection, field, value) {
    return list(collection, {
      where: [{ field: field, operator: '==', value: value }]
    });
  }

  /**
   * Query documents ordered by field
   * @param {string} collection - Collection name
   * @param {string} field - Field name
   * @param {string} direction - 'asc' or 'desc'
   * @param {number} limit - Max documents to return
   * @returns {Promise} - Resolves with array of documents
   */
  function orderBy(collection, field, direction, limit) {
    var options = {
      orderBy: { field: field, direction: direction || 'asc' }
    };
    if (limit) {
      options.limit = limit;
    }
    return list(collection, options);
  }

  /* ============================================================
     BATCH OPERATIONS
     ============================================================ */

  /**
   * Execute multiple operations as a batch
   * @param {Array} operations - Array of operation objects
   * @returns {Promise} - Resolves when batch is complete
   */
  function batch(operations) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    var batch = db.batch();

    operations.forEach(function (op) {
      var ref = db.collection(op.collection).doc(op.id);
      if (op.type === 'set') {
        batch.set(ref, op.data);
      } else if (op.type === 'update') {
        batch.update(ref, op.data);
      } else if (op.type === 'delete') {
        batch.delete(ref);
      }
    });

    return batch.commit()
      .then(function () {
        console.log('[Firestore] Batch completed:', operations.length, 'operations');
      })
      .catch(function (error) {
        console.error('[Firestore] Batch failed:', error);
        throw error;
      });
  }

  /* ============================================================
     EXPORT FIRESTORE API
     ============================================================ */

  window.FurnostylesFirestore = {
    // CRUD operations
    save: save,
    get: get,
    list: list,
    update: update,
    remove: remove,

    // User operations
    getUser: getUser,
    updateUser: updateUser,
    getUserByEmail: getUserByEmail,

    // Query helpers
    whereEquals: whereEquals,
    orderBy: orderBy,

    // Batch operations
    batch: batch
  };

  console.log('[Firestore] FurnostylesFirestore module loaded');

}());
