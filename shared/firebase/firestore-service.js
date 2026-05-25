/**
 * FURNOSTYLES — FIRESTORE SERVICE
 * ================================
 * File: shared/firebase/firestore-service.js
 * Purpose: Centralized Firestore service for all database operations.
 *          Provides reusable methods for CRUD operations on Firestore.
 * 
 * This service uses the Firestore instance from firebase-init.js
 * No direct Firestore calls should be made outside this service.
 * 
 * Load order: After firebase-init.js
 * 
 * Usage: Use window.FurnostylesFirestoreService for all Firestore operations
 */

(function () {
  'use strict';

  /**
   * Get Firestore instance
   * Returns the Firestore instance from firebase-init.js
   */
  function getFirestoreInstance() {
    if (window.FurnostylesFirebaseInit && window.FurnostylesFirebaseInit.getFirestore) {
      return window.FurnostylesFirebaseInit.getFirestore();
    }
    console.error('[FirestoreService] Firestore instance not available. Ensure firebase-init.js is loaded.');
    return null;
  }

  /**
   * Get document
   * @param {string} collection - Collection name
   * @param {string} docId - Document ID
   * @returns {Promise} - Resolves with document data
   */
  function getDocument(collection, docId) {
    var firestore = getFirestoreInstance();
    if (!firestore) return Promise.reject(new Error('Firestore not available'));

    return firestore.collection(collection).doc(docId).get()
      .then(function (doc) {
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        }
        return null;
      });
  }

  /**
   * Get collection
   * @param {string} collection - Collection name
   * @param {object} options - Query options (where, orderBy, limit)
   * @returns {Promise} - Resolves with array of documents
   */
  function getCollection(collection, options) {
    var firestore = getFirestoreInstance();
    if (!firestore) return Promise.reject(new Error('Firestore not available'));

    var query = firestore.collection(collection);

    // Apply where clauses
    if (options && options.where) {
      options.where.forEach(function (whereClause) {
        query = query.where(whereClause.field, whereClause.operator, whereClause.value);
      });
    }

    // Apply orderBy
    if (options && options.orderBy) {
      if (Array.isArray(options.orderBy)) {
        options.orderBy.forEach(function (orderByClause) {
          query = query.orderBy(orderByClause.field, orderByClause.direction || 'asc');
        });
      } else {
        query = query.orderBy(options.orderBy.field, options.orderBy.direction || 'asc');
      }
    }

    // Apply limit
    if (options && options.limit) {
      query = query.limit(options.limit);
    }

    return query.get()
      .then(function (snapshot) {
        var documents = [];
        snapshot.forEach(function (doc) {
          documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
      });
  }

  /**
   * Add document
   * @param {string} collection - Collection name
   * @param {object} data - Document data
   * @returns {Promise} - Resolves with document ID
   */
  function addDocument(collection, data) {
    var firestore = getFirestoreInstance();
    if (!firestore) return Promise.reject(new Error('Firestore not available'));

    return firestore.collection(collection).add(data)
      .then(function (docRef) {
        return docRef.id;
      });
  }

  /**
   * Set document
   * @param {string} collection - Collection name
   * @param {string} docId - Document ID
   * @param {object} data - Document data
   * @returns {Promise} - Resolves when document is set
   */
  function setDocument(collection, docId, data) {
    var firestore = getFirestoreInstance();
    if (!firestore) return Promise.reject(new Error('Firestore not available'));

    return firestore.collection(collection).doc(docId).set(data);
  }

  /**
   * Update document
   * @param {string} collection - Collection name
   * @param {string} docId - Document ID
   * @param {object} data - Document data to update
   * @returns {Promise} - Resolves when document is updated
   */
  function updateDocument(collection, docId, data) {
    var firestore = getFirestoreInstance();
    if (!firestore) return Promise.reject(new Error('Firestore not available'));

    return firestore.collection(collection).doc(docId).update(data);
  }

  /**
   * Delete document
   * @param {string} collection - Collection name
   * @param {string} docId - Document ID
   * @returns {Promise} - Resolves when document is deleted
   */
  function deleteDocument(collection, docId) {
    var firestore = getFirestoreInstance();
    if (!firestore) return Promise.reject(new Error('Firestore not available'));

    return firestore.collection(collection).doc(docId).delete();
  }

  /**
   * Real-time listener for document
   * @param {string} collection - Collection name
   * @param {string} docId - Document ID
   * @param {function} callback - Callback function (doc, error)
   * @returns {function} - Unsubscribe function
   */
  function onDocumentSnapshot(collection, docId, callback) {
    var firestore = getFirestoreInstance();
    if (!firestore) return function () {};

    return firestore.collection(collection).doc(docId)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          callback({ id: doc.id, ...doc.data() }, null);
        } else {
          callback(null, null);
        }
      }, function (error) {
        callback(null, error);
      });
  }

  /**
   * Real-time listener for collection
   * @param {string} collection - Collection name
   * @param {object} options - Query options
   * @param {function} callback - Callback function (docs, error)
   * @returns {function} - Unsubscribe function
   */
  function onCollectionSnapshot(collection, options, callback) {
    var firestore = getFirestoreInstance();
    if (!firestore) return function () {};

    var query = firestore.collection(collection);

    // Apply where clauses
    if (options && options.where) {
      options.where.forEach(function (whereClause) {
        query = query.where(whereClause.field, whereClause.operator, whereClause.value);
      });
    }

    // Apply orderBy
    if (options && options.orderBy) {
      if (Array.isArray(options.orderBy)) {
        options.orderBy.forEach(function (orderByClause) {
          query = query.orderBy(orderByClause.field, orderByClause.direction || 'asc');
        });
      } else {
        query = query.orderBy(options.orderBy.field, options.orderBy.direction || 'asc');
      }
    }

    // Apply limit
    if (options && options.limit) {
      query = query.limit(options.limit);
    }

    return query.onSnapshot(function (snapshot) {
      var documents = [];
      snapshot.forEach(function (doc) {
        documents.push({ id: doc.id, ...doc.data() });
      });
      callback(documents, null);
    }, function (error) {
      callback(null, error);
    });
  }

  /**
   * Batch operations
   * @param {array} operations - Array of operations { type, collection, docId, data }
   * @returns {Promise} - Resolves when batch is committed
   */
  function batchOperations(operations) {
    var firestore = getFirestoreInstance();
    if (!firestore) return Promise.reject(new Error('Firestore not available'));

    var batch = firestore.batch();

    operations.forEach(function (op) {
      var docRef = firestore.collection(op.collection).doc(op.docId);
      
      if (op.type === 'set') {
        batch.set(docRef, op.data);
      } else if (op.type === 'update') {
        batch.update(docRef, op.data);
      } else if (op.type === 'delete') {
        batch.delete(docRef);
      }
    });

    return batch.commit();
  }

  /**
   * Export Firestore Service API
   */
  window.FurnostylesFirestoreService = {
    getDocument: getDocument,
    getCollection: getCollection,
    addDocument: addDocument,
    setDocument: setDocument,
    updateDocument: updateDocument,
    deleteDocument: deleteDocument,
    onDocumentSnapshot: onDocumentSnapshot,
    onCollectionSnapshot: onCollectionSnapshot,
    batchOperations: batchOperations
  };

}());
