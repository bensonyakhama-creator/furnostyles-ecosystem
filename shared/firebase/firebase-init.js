/**
 * FURNOSTYLES — FIREBASE INITIALIZATION
 * =====================================
 * File: shared/firebase/firebase-init.js
 * Purpose: SINGLE Firebase initialization point for the entire application.
 *          Ensures no duplicated Firebase initialization across the platform.
 * 
 * This is the ONLY place where Firebase should be initialized.
 * All other Firebase services should use the instances created here.
 * 
 * Load order: FIRST - before any other Firebase-related files
 * 
 * Usage: Initialize Firebase once, then use window.FurnostylesFirebase instances
 */

(function () {
  'use strict';

  /**
   * Firebase initialization state
   * Prevents multiple initializations
   * Note: Storage is skipped for now (Cloudflare hosting)
   */
  var initializationState = {
    initialized: false,
    initializing: false,
    app: null,
    auth: null,
    firestore: null
  };

  /**
   * Initialize Firebase
   * Single initialization point for the entire application
   */
  function initializeFirebase() {
    // Prevent multiple initializations
    if (initializationState.initialized) {
      console.warn('[Firebase] Firebase already initialized. Returning existing instances.');
      return Promise.resolve(getFirebaseInstances());
    }

    if (initializationState.initializing) {
      console.warn('[Firebase] Firebase initialization in progress. Please wait.');
      return new Promise(function (resolve) {
        var checkInterval = setInterval(function () {
          if (initializationState.initialized) {
            clearInterval(checkInterval);
            resolve(getFirebaseInstances());
          }
        }, 100);
      });
    }

    initializationState.initializing = true;

    // Check if Firebase config is available
    if (!window.FURNOSTYLES_FIREBASE_CONFIG) {
      console.error('[Firebase] Firebase config not found. Please load firebase-config.js first.');
      initializationState.initializing = false;
      return Promise.reject(new Error('Firebase config not found'));
    }

    // Check if Firebase SDK is loaded
    if (typeof firebase === 'undefined') {
      console.error('[Firebase] Firebase SDK not loaded. Please include Firebase SDK scripts.');
      initializationState.initializing = false;
      return Promise.reject(new Error('Firebase SDK not loaded'));
    }

    try {
      // Initialize Firebase app
      var app = firebase.initializeApp(window.FURNOSTYLES_FIREBASE_CONFIG);
      initializationState.app = app;

      // Initialize Firebase Auth
      var auth = firebase.auth();
      initializationState.auth = auth;

      // Initialize Firebase Firestore
      var firestore = firebase.firestore();
      initializationState.firestore = firestore;

      // Storage is skipped for now (Cloudflare hosting)

      // Set initialization state
      initializationState.initialized = true;
      initializationState.initializing = false;

      console.log('[Firebase] Firebase initialized successfully');

      // Expose Firebase instances globally
      window.FurnostylesFirebase = {
        app: app,
        auth: auth,
        firestore: firestore,
        initialized: true
      };

      return Promise.resolve(window.FurnostylesFirebase);

    } catch (error) {
      console.error('[Firebase] Firebase initialization failed:', error);
      initializationState.initializing = false;
      return Promise.reject(error);
    }
  }

  /**
   * Get Firebase instances
   * Returns the initialized Firebase instances
   */
  function getFirebaseInstances() {
    if (!initializationState.initialized) {
      console.warn('[Firebase] Firebase not initialized. Call initializeFirebase() first.');
      return null;
    }

    return {
      app: initializationState.app,
      auth: initializationState.auth,
      firestore: initializationState.firestore
    };
  }

  /**
   * Check if Firebase is initialized
   */
  function isInitialized() {
    return initializationState.initialized;
  }

  /**
   * Get Auth instance
   */
  function getAuth() {
    if (!initializationState.initialized) {
      console.warn('[Firebase] Firebase not initialized. Call initializeFirebase() first.');
      return null;
    }
    return initializationState.auth;
  }

  /**
   * Get Firestore instance
   */
  function getFirestore() {
    if (!initializationState.initialized) {
      console.warn('[Firebase] Firebase not initialized. Call initializeFirebase() first.');
      return null;
    }
    return initializationState.firestore;
  }

  /**
   * Export Firebase initialization API
   * Note: getStorage is not included (Storage skipped for Cloudflare hosting)
   */
  window.FurnostylesFirebaseInit = {
    initialize: initializeFirebase,
    getInstances: getFirebaseInstances,
    isInitialized: isInitialized,
    getAuth: getAuth,
    getFirestore: getFirestore
  };

  /**
   * Auto-initialize if Firebase SDK and config are available.
   * This is the SINGLE initialization point for the entire application.
   */
  var autoInit = true;
  if (autoInit && typeof firebase !== 'undefined' && window.FURNOSTYLES_FIREBASE_CONFIG) {
    initializeFirebase().catch(function (error) {
      console.error('[Firebase] Auto-initialization failed:', error);
    });
  }

}());
