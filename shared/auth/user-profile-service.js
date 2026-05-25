/**
 * FURNOSTYLES — USER PROFILE SERVICE
 * ==================================
 * File: shared/auth/user-profile-service.js
 *
 * PURPOSE:
 *   Central service for managing user profiles in Firestore.
 *   Creates, reads, updates user profiles with role persistence.
 *
 * DEPENDENCIES:
 *   - shared/firebase/firestore-service.js
 *   - shared/auth/auth-config.js
 *
 * USER PROFILE STRUCTURE (Firestore: users/{uid}):
 *   {
 *     uid: string              // Firebase Auth user ID
 *     fullName: string         // User's full name
 *     email: string            // User's email address
 *     phone: string | null     // Phone number (optional)
 *     role: string             // One of: client, vendor, provider, contractor, propertyOwner, agent, admin, superAdmin
 *     status: string           // active, pending, suspended
 *     emailVerified: boolean   // Email verification status
 *     createdAt: timestamp     // Server timestamp
 *     updatedAt: timestamp     // Server timestamp
 *   }
 *
 * USAGE:
 *   window.FurnostylesUserProfileService.createProfile(user, userData)
 *   window.FurnostylesUserProfileService.getProfile(uid)
 *   window.FurnostylesUserProfileService.updateProfile(uid, data)
 *   window.FurnostylesUserProfileService.getUserRole(uid)
 */

(function () {
  'use strict';

  var COLLECTION = 'users';

  /**
   * Create user profile in Firestore
   * @param {object} user - Firebase Auth user object
   * @param {object} userData - Additional user data (name, role, phone, etc.)
   */
  function createProfile(user, userData) {
    if (!user || !user.uid) {
      return Promise.reject(new Error('Invalid user object'));
    }

    if (!window.FurnostylesFirestoreService) {
      return Promise.reject(new Error('Firestore service not available'));
    }

    var profile = {
      uid: user.uid,
      fullName: userData.name || userData.fullName || '',
      email: user.email || '',
      phone: userData.phone || null,
      role: userData.role || 'client',
      status: 'active',
      emailVerified: user.emailVerified || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return window.FurnostylesFirestoreService.setDocument(COLLECTION, user.uid, profile)
      .then(function () {
        console.log('[UserProfile] Profile created for user:', user.uid);
        return profile;
      });
  }

  /**
   * Get user profile from Firestore
   * @param {string} uid - User ID
   */
  function getProfile(uid) {
    if (!uid) {
      return Promise.reject(new Error('User ID required'));
    }

    if (!window.FurnostylesFirestoreService) {
      return Promise.reject(new Error('Firestore service not available'));
    }

    return window.FurnostylesFirestoreService.getDocument(COLLECTION, uid)
      .then(function (doc) {
        if (!doc) {
          console.warn('[UserProfile] Profile not found for user:', uid);
          return null;
        }
        return doc;
      });
  }

  /**
   * Update user profile in Firestore
   * @param {string} uid - User ID
   * @param {object} data - Data to update
   */
  function updateProfile(uid, data) {
    if (!uid) {
      return Promise.reject(new Error('User ID required'));
    }

    if (!window.FurnostylesFirestoreService) {
      return Promise.reject(new Error('Firestore service not available'));
    }

    var updateData = Object.assign({}, data, {
      updatedAt: new Date().toISOString()
    });

    return window.FurnostylesFirestoreService.updateDocument(COLLECTION, uid, updateData)
      .then(function () {
        console.log('[UserProfile] Profile updated for user:', uid);
      });
  }

  /**
   * Get user role from Firestore
   * @param {string} uid - User ID
   */
  function getUserRole(uid) {
    return getProfile(uid)
      .then(function (profile) {
        return profile ? profile.role : null;
      });
  }

  /**
   * Check if user profile exists
   * @param {string} uid - User ID
   */
  function profileExists(uid) {
    return getProfile(uid)
      .then(function (profile) {
        return profile !== null;
      });
  }

  /**
   * Export user profile service API
   */
  window.FurnostylesUserProfileService = {
    createProfile: createProfile,
    getProfile: getProfile,
    updateProfile: updateProfile,
    getUserRole: getUserRole,
    profileExists: profileExists
  };

}());
