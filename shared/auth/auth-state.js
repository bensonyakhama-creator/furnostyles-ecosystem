/**
 * FURNOSTYLES — AUTH STATE MANAGEMENT
 * ====================================
 * File: shared/auth/auth-state.js
 *
 * PURPOSE:
 *   Central auth state management using Firebase Auth.
 *   Tracks current user, auth state changes, and user role.
 *   Provides callbacks for auth state changes.
 *
 * DEPENDENCIES:
 *   - shared/firebase/firebase-config.js
 *   - shared/firebase/firebase-bridge.js
 *   - shared/firebase/auth-service.js
 *   - shared/auth/auth-config.js
 *
 * USAGE:
 *   window.FurnostylesAuthState.getCurrentUser()
 *   window.FurnostylesAuthState.onAuthChange(callback)
 *   window.FurnostylesAuthState.getUserRole()
 *   window.FurnostylesAuthState.isAuthenticated()
 */

(function () {
  'use strict';

  var authState = {
    currentUser: null,
    userData: null,      /* Firestore user document */
    role: null,
    listener: null
  };

  /**
   * Get current auth user
   */
  function getCurrentUser() {
    return authState.currentUser;
  }

  /**
   * Get current user data from Firestore
   */
  function getUserData() {
    return authState.userData;
  }

  /**
   * Get current user role
   */
  function getUserRole() {
    return authState.role;
  }

  /**
   * Check if user is authenticated
   */
  function isAuthenticated() {
    return !!authState.currentUser;
  }

  /**
   * Check if user has specific role
   */
  function hasRole(role) {
    return authState.role === role;
  }

  /**
   * Load user data from Firestore using user-profile-service
   */
  function loadUserData(userId) {
    if (!window.FurnostylesUserProfileService) {
      console.warn('[AuthState] User profile service not available.');
      return Promise.resolve(null);
    }

    return window.FurnostylesUserProfileService.getProfile(userId)
      .then(function (profile) {
        if (profile) {
          authState.userData = profile;
          authState.role = profile.role || null;
        } else {
          console.warn('[AuthState] Profile not found for user:', userId);
          authState.userData = null;
          authState.role = null;
        }
        return profile;
      })
      .catch(function (error) {
        console.warn('[AuthState] Failed to load user data:', error);
        authState.userData = null;
        authState.role = null;
        return null;
      });
  }

  /**
   * Listen to auth state changes
   * @param {function} callback - Called with (user, userData, role)
   * @returns {function} - Unsubscribe function
   */
  function onAuthChange(callback) {
    if (!window.FurnostylesAuthService) {
      console.warn('[AuthState] Auth service not available.');
      return function () {};
    }

    var unsubscribe = window.FurnostylesAuthService.onAuthStateChanged(function (user) {
      authState.currentUser = user;

      if (user) {
        /* Load user data from Firestore */
        loadUserData(user.uid).then(function (userData) {
          callback(user, authState.userData, authState.role);
        });
      } else {
        authState.userData = null;
        authState.role = null;
        callback(null, null, null);
      }
    });

    authState.listener = unsubscribe;
    return unsubscribe;
  }

  /**
   * Sign out
   */
  function signOut() {
    if (!window.FurnostylesAuthService) {
      return Promise.reject(new Error('Auth service not available'));
    }

    return window.FurnostylesAuthService.signOut()
      .then(function () {
        authState.currentUser = null;
        authState.userData = null;
        authState.role = null;
      });
  }

  /**
   * Export auth state API
   */
  window.FurnostylesAuthState = {
    getCurrentUser: getCurrentUser,
    getUserData: getUserData,
    getUserRole: getUserRole,
    isAuthenticated: isAuthenticated,
    hasRole: hasRole,
    onAuthChange: onAuthChange,
    signOut: signOut
  };

}());
