/**
 * FURNOSTYLES — SESSION.JS
 * =========================
 * File: assets/js/session.js
 * Purpose: Session management for Furnostyles.
 *          Handles user session persistence, storage, and retrieval.
 *          Stores user data in localStorage for quick access.
 *          Works alongside Firebase Auth for session management.
 *
 * Dependencies:
 *   - assets/js/auth.js
 *
 * Usage:
 *   window.FurnostylesSession.set(user, userData, role)
 *   window.FurnostylesSession.get()
 *   window.FurnostylesSession.clear()
 *   window.FurnostylesSession.getUser()
 *   window.FurnostylesSession.getRole()
 *   window.FurnostylesSession.isAuthenticated()
 */

(function () {
  'use strict';

  /* ============================================================
     STORAGE KEYS
     ============================================================ */

  var SESSION_KEY = 'furnostyles_session';
  var USER_KEY = 'furnostyles_user';
  var ROLE_KEY = 'furnostyles_role';

  /* ============================================================
     SESSION STATE
     ============================================================ */

  var sessionState = {
    user: null,
    userData: null,
    role: null
  };

  /* ============================================================
     SAVE SESSION
     ============================================================ */

  /**
   * Save session to localStorage
   * @param {object} user - Firebase Auth user object
   * @param {object} userData - User data from Firestore
   * @param {string} role - User role
   */
  function set(user, userData, role) {
    sessionState.user = user;
    sessionState.userData = userData;
    sessionState.role = role || 'client';

    try {
      // Save to localStorage
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL
        }));
      }

      if (userData) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      }

      if (role) {
        localStorage.setItem(ROLE_KEY, role);
      }

      console.log('[Session] Session saved');
    } catch (error) {
      console.error('[Session] Failed to save session:', error);
    }
  }

  /* ============================================================
     LOAD SESSION
     ============================================================ */

  /**
   * Load session from localStorage
   * @returns {object} - Session object with user, userData, role
   */
  function get() {
    try {
      var userDataStr = localStorage.getItem(SESSION_KEY);
      var userStr = localStorage.getItem(USER_KEY);
      var roleStr = localStorage.getItem(ROLE_KEY);

      // Also check for fns_local_user for compatibility with login.html
      var fnsLocalUser = localStorage.getItem('fns_local_user');

      if (userDataStr) {
        sessionState.userData = JSON.parse(userDataStr);
      }

      if (userStr) {
        sessionState.user = JSON.parse(userStr);
      } else if (fnsLocalUser) {
        // Migrate from fns_local_user to standard keys
        var localUser = JSON.parse(fnsLocalUser);
        sessionState.user = localUser;
        localStorage.setItem(USER_KEY, JSON.stringify(localUser));
      }

      if (roleStr) {
        sessionState.role = roleStr;
      } else if (fnsLocalUser) {
        // Set default role if migrating
        var localUser = JSON.parse(fnsLocalUser);
        sessionState.role = localUser.activeRole || localUser.roles?.[0] || 'customer';
        localStorage.setItem(ROLE_KEY, sessionState.role);
      }

      return {
        user: sessionState.user,
        userData: sessionState.userData,
        role: sessionState.role
      };
    } catch (error) {
      console.error('[Session] Failed to load session:', error);
      return {
        user: null,
        userData: null,
        role: null
      };
    }
  }

  /* ============================================================
     CLEAR SESSION
     ============================================================ */

  /**
   * Clear session from localStorage and memory
   */
  function clear() {
    sessionState.user = null;
    sessionState.userData = null;
    sessionState.role = null;

    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(ROLE_KEY);
      console.log('[Session] Session cleared');
    } catch (error) {
      console.error('[Session] Failed to clear session:', error);
    }
  }

  /* ============================================================
     GET USER
     ============================================================ */

  /**
   * Get current user from session
   * @returns {object|null} - User object or null
   */
  function getUser() {
    return sessionState.user;
  }

  /* ============================================================
     GET USER DATA
     ============================================================ */

  /**
   * Get user data from session
   * @returns {object|null} - User data or null
   */
  function getUserData() {
    return sessionState.userData;
  }

  /* ============================================================
     GET ROLE
     ============================================================ */

  /**
   * Get user role from session
   * @returns {string|null} - User role or null
   */
  function getRole() {
    return sessionState.role;
  }

  /* ============================================================
     CHECK AUTHENTICATION
     ============================================================ */

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if authenticated
   */
  function isAuthenticated() {
    return !!sessionState.user && !!sessionState.userData;
  }

  /* ============================================================
     GET DISPLAY NAME
     ============================================================ */

  /**
   * Get user display name for UI
   * @returns {string} - Display name or fallback
   */
  function getDisplayName() {
    if (sessionState.userData && sessionState.userData.fullName) {
      return sessionState.userData.fullName;
    }
    if (sessionState.user && sessionState.user.displayName) {
      return sessionState.user.displayName;
    }
    if (sessionState.user && sessionState.user.email) {
      // Return first part of email before @
      return sessionState.user.email.split('@')[0];
    }
    return 'User';
  }

  /* ============================================================
     GET INITIALS
     ============================================================ */

  /**
   * Get user initials for avatar
   * @returns {string} - User initials
   */
  function getInitials() {
    var name = getDisplayName();
    if (!name) return 'U';

    var parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  /* ============================================================
     UPDATE USER DATA
     ============================================================ */

  /**
   * Update user data in session
   * @param {object} userData - Updated user data
   */
  function updateUserData(userData) {
    sessionState.userData = Object.assign({}, sessionState.userData, userData);

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionState.userData));
      console.log('[Session] User data updated');
    } catch (error) {
      console.error('[Session] Failed to update user data:', error);
    }
  }

  /* ============================================================
     SYNC WITH AUTH
     ============================================================ */

  /**
   * Sync session with Firebase Auth state
   * Called when auth state changes
   * @param {object} user - Firebase Auth user
   * @param {object} userData - User data from Firestore
   * @param {string} role - User role
   */
  function syncWithAuth(user, userData, role) {
    if (user && userData) {
      set(user, userData, role);
    } else {
      clear();
    }
  }

  /* ============================================================
     EXPORT SESSION API
     ============================================================ */

  window.FurnostylesSession = {
    // Session management
    set: set,
    get: get,
    clear: clear,

    // User data
    getUser: getUser,
    getUserData: getUserData,
    getRole: getRole,
    updateUserData: updateUserData,

    // Authentication check
    isAuthenticated: isAuthenticated,

    // UI helpers
    getDisplayName: getDisplayName,
    getInitials: getInitials,

    // Auth sync
    syncWithAuth: syncWithAuth,

    // Session state (read-only)
    get sessionState() {
      return sessionState;
    }
  };

  // Load session on module init
  get();

  console.log('[Session] FurnostylesSession module loaded');

}());
