/**
 * FURNOSTYLES — AUTH SERVICE
 * ===========================
 * File: shared/firebase/auth-service.js
 * Purpose: Centralized authentication service using Firebase Auth.
 *          Provides reusable authentication methods for the entire platform.
 * 
 * This service uses the Firebase Auth instance from firebase-init.js
 * No direct Firebase Auth calls should be made outside this service.
 * 
 * Load order: After firebase-init.js
 * 
 * Usage: Use window.FurnostylesAuthService for all authentication operations
 */

(function () {
  'use strict';

  /**
   * Auth service state
   */
  var authServiceState = {
    currentUser: null,
    authListener: null
  };

  /**
   * Get Auth instance
   * Returns the Firebase Auth instance from firebase-init.js
   */
  function getAuthInstance() {
    if (window.FurnostylesFirebaseInit && window.FurnostylesFirebaseInit.getAuth) {
      return window.FurnostylesFirebaseInit.getAuth();
    }
    console.error('[AuthService] Firebase Auth instance not available. Ensure firebase-init.js is loaded.');
    return null;
  }

  /**
   * Sign up with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {object} userData - Additional user data (name, role, etc.)
   * @returns {Promise} - Resolves with user object
   */
  function signUpWithEmailPassword(email, password, userData) {
    var auth = getAuthInstance();
    if (!auth) return Promise.reject(new Error('Auth not available'));

    return auth.createUserWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        var user = userCredential.user;
        
        // Update user profile with display name
        if (userData && userData.name) {
          return user.updateProfile({
            displayName: userData.name
          }).then(function () {
            // Store additional user data in Firestore
            return storeUserData(user.uid, userData);
          }).then(function () {
            return user;
          });
        }
        
        return user;
      });
  }

  /**
   * Sign in with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Resolves with user object
   */
  function signInWithEmailPassword(email, password) {
    var auth = getAuthInstance();
    if (!auth) return Promise.reject(new Error('Auth not available'));

    return auth.signInWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        return userCredential.user;
      });
  }

  /**
   * Sign out
   * @returns {Promise} - Resolves when sign out is complete
   */
  function signOut() {
    var auth = getAuthInstance();
    if (!auth) return Promise.reject(new Error('Auth not available'));

    return auth.signOut()
      .then(function () {
        authServiceState.currentUser = null;
      });
  }

  /**
   * Get current user
   * @returns {object|null} - Current user object or null
   */
  function getCurrentUser() {
    var auth = getAuthInstance();
    if (!auth) return null;

    return auth.currentUser;
  }

  /**
   * Listen to auth state changes
   * @param {function} callback - Callback function (user)
   * @returns {function} - Unsubscribe function
   */
  function onAuthStateChanged(callback) {
    var auth = getAuthInstance();
    if (!auth) return function () {};

    return auth.onAuthStateChanged(function (user) {
      authServiceState.currentUser = user;
      callback(user);
    });
  }

  /**
   * Send password reset email
   * @param {string} email - User email
   * @returns {Promise} - Resolves when email is sent
   */
  function sendPasswordResetEmail(email) {
    var auth = getAuthInstance();
    if (!auth) return Promise.reject(new Error('Auth not available'));

    return auth.sendPasswordResetEmail(email);
  }

  /**
   * Update user profile
   * @param {object} profileData - Profile data to update
   * @returns {Promise} - Resolves when profile is updated
   */
  function updateProfile(profileData) {
    var auth = getAuthInstance();
    if (!auth) return Promise.reject(new Error('Auth not available'));
    
    var user = auth.currentUser;
    if (!user) return Promise.reject(new Error('No current user'));

    return user.updateProfile(profileData);
  }

  /**
   * Store user data in Firestore
   * @param {string} userId - User ID
   * @param {object} userData - User data to store
   * @returns {Promise} - Resolves when data is stored
   */
  function storeUserData(userId, userData) {
    var firestore = window.FurnostylesFirebaseInit && window.FurnostylesFirebaseInit.getFirestore();
    if (!firestore) return Promise.reject(new Error('Firestore not available'));

    var userDoc = {
      uid: userId,
      email: userData.email,
      name: userData.name || '',
      role: userData.role || 'client',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    return firestore.collection('users').doc(userId).set(userDoc);
  }

  /**
   * Get user data from Firestore
   * @param {string} userId - User ID
   * @returns {Promise} - Resolves with user data
   */
  function getUserData(userId) {
    var firestore = window.FurnostylesFirebaseInit && window.FurnostylesFirebaseInit.getFirestore();
    if (!firestore) return Promise.reject(new Error('Firestore not available'));

    return firestore.collection('users').doc(userId).get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        }
        return null;
      });
  }

  /**
   * Export Auth Service API
   */
  window.FurnostylesAuthService = {
    signUpWithEmailPassword: signUpWithEmailPassword,
    signInWithEmailPassword: signInWithEmailPassword,
    signOut: signOut,
    getCurrentUser: getCurrentUser,
    onAuthStateChanged: onAuthStateChanged,
    sendPasswordResetEmail: sendPasswordResetEmail,
    updateProfile: updateProfile,
    getUserData: getUserData
  };

}());
