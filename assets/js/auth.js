/**
 * FURNOSTYLES — AUTH.JS
 * =====================
 * File: assets/js/auth.js
 * Purpose: Central authentication module for Furnostyles.
 *          Handles signup, login, logout, password reset, email verification.
 *          Integrates with Firebase Auth and Firestore.
 *          Manages role-based dashboard redirects.
 *
 * Supported Roles:
 *   - client (default)
 *   - vendor
 *   - admin
 *
 * Dashboard Redirects:
 *   - client  → client/dashboard.html
 *   - vendor  → vendor/vendor-dashboard.html
 *   - admin   → admin/admin-dashboard.html
 *
 * Dependencies:
 *   - Firebase SDK (must be loaded before this file)
 *   - shared/firebase/firebase-config.js
 *   - shared/firebase/firebase-bridge.js
 *   - assets/js/firestore.js
 *   - assets/js/session.js
 *
 * Usage:
 *   window.FurnostylesAuth.signUp(email, password, userData)
 *   window.FurnostylesAuth.signIn(email, password)
 *   window.FurnostylesAuth.signInWithGoogle()
 *   window.FurnostylesAuth.signOut()
 *   window.FurnostylesAuth.resetPassword(email)
 *   window.FurnostylesAuth.sendEmailVerification()
 */

(function () {
  'use strict';

  /* ============================================================
     AUTH STATE
     ============================================================ */

  var authState = {
    currentUser: null,
    userData: null,
    role: null
  };

  /* ============================================================
     PASSWORD VALIDATION
     ============================================================ */

  /**
   * Validate password strength
   * Requirements:
   * - Minimum 8 characters
   * - At least one uppercase letter
   * - At least one lowercase letter
   * - At least one number
   * - At least one special character
   * @param {string} password - Password to validate
   * @returns {object} - { valid: boolean, error: string }
   */
  function validatePassword(password) {
    if (!password || typeof password !== 'string') {
      return { valid: false, error: 'Password is required' };
    }

    if (password.length < 8) {
      return { valid: false, error: 'Password must be at least 8 characters long' };
    }

    if (password.length > 128) {
      return { valid: false, error: 'Password must not exceed 128 characters' };
    }

    if (!/[A-Z]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one uppercase letter' };
    }

    if (!/[a-z]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one lowercase letter' };
    }

    if (!/[0-9]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one number' };
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one special character (!@#$%^&* etc.)' };
    }

    // Check for common weak passwords
    var commonPasswords = ['password', '12345678', 'qwerty', 'abc123', 'letmein', 'welcome', 'admin123'];
    var lowerPassword = password.toLowerCase();
    if (commonPasswords.some(function(common) { return lowerPassword.includes(common); })) {
      return { valid: false, error: 'Password is too common. Please choose a stronger password.' };
    }

    return { valid: true };
  }

  /* ============================================================
     GET FIREBASE INSTANCES
     ============================================================ */

  function getAuth() {
    if (window.FurnostylesFirebase && window.FurnostylesFirebase.auth) {
      return window.FurnostylesFirebase.auth;
    }
    console.error('[Auth] Firebase Auth not available. Ensure Firebase SDK is loaded.');
    return null;
  }

  function getFirestore() {
    if (window.FurnostylesFirebase && window.FurnostylesFirebase.db) {
      return window.FurnostylesFirebase.db;
    }
    console.error('[Auth] Firestore not available. Ensure Firebase SDK is loaded.');
    return null;
  }

  /* ============================================================
     USER DATA STORAGE IN FIRESTORE
     ============================================================ */

  /**
   * Save user data to Firestore users collection
   * @param {string} uid - User ID from Firebase Auth
   * @param {object} userData - User data to save
   * @returns {Promise} - Resolves when data is saved
   */
  function saveUserToFirestore(uid, userData) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    var userDoc = {
      uid: uid,
      fullName: userData.fullName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'client',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      emailVerified: false,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    return db.collection('users').doc(uid).set(userDoc)
      .then(function () {
        console.log('[Auth] User data saved to Firestore:', uid);
        return userDoc;
      })
      .catch(function (error) {
        console.error('[Auth] Failed to save user data:', error);
        throw error;
      });
  }

  /**
   * Load user data from Firestore
   * @param {string} uid - User ID
   * @returns {Promise} - Resolves with user data
   */
  function loadUserFromFirestore(uid) {
    var db = getFirestore();
    if (!db) return Promise.resolve(null);

    return db.collection('users').doc(uid).get()
      .then(function (doc) {
        if (doc.exists) {
          var data = doc.data();
          authState.userData = data;
          authState.role = data.role || 'client';
          return data;
        } else {
          console.warn('[Auth] User document not found in Firestore:', uid);
          return null;
        }
      })
      .catch(function (error) {
        console.error('[Auth] Failed to load user data:', error);
        return null;
      });
  }

  /* ============================================================
     SIGN UP WITH EMAIL/PASSWORD
     ============================================================ */

  /**
   * Sign up a new user with email and password
   * @param {string} email - User email
   * @param {string} password - User password (min 6 characters)
   * @param {object} userData - Additional user data (fullName, phone, role)
   * @returns {Promise} - Resolves with user object
   */
  function signUp(email, password, userData) {
    var auth = getAuth();
    if (!auth) return Promise.reject(new Error('Auth not available'));

    // Validate password with strengthened requirements
    var passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return Promise.reject(new Error(passwordValidation.error));
    }

    // Set default role if not provided
    userData = userData || {};
    userData.email = email;
    userData.role = userData.role || 'client';

    return auth.createUserWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        var user = userCredential.user;

        // Update display name
        if (userData.fullName) {
          return user.updateProfile({
            displayName: userData.fullName
          }).then(function () {
            // Save to Firestore
            return saveUserToFirestore(user.uid, userData);
          }).then(function () {
            // Send email verification
            return user.sendEmailVerification();
          }).then(function () {
            console.log('[Auth] Sign up successful. Verification email sent.');
            return user;
          });
        }

        // If no fullName, just save to Firestore
        return saveUserToFirestore(user.uid, userData).then(function () {
          return user;
        });
      })
      .catch(function (error) {
        console.error('[Auth] Sign up failed:', error);
        throw error;
      });
  }

  /* ============================================================
     SIGN IN WITH EMAIL/PASSWORD
     ============================================================ */

  /**
   * Sign in with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Resolves with user object
   */
  function signIn(email, password) {
    var auth = getAuth();
    if (!auth) return Promise.reject(new Error('Auth not available'));

    return auth.signInWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        var user = userCredential.user;

        // Load user data from Firestore
        return loadUserFromFirestore(user.uid).then(function (userData) {
          authState.currentUser = user;
          authState.userData = userData;
          authState.role = userData ? userData.role : 'client';

          // Save to localStorage for header button detection
          var localUser = {
            uid: user.uid,
            email: user.email,
            fullName: userData ? userData.fullName : user.email,
            role: authState.role
          };
          localStorage.setItem('fns_local_user', JSON.stringify(localUser));

          console.log('[Auth] Sign in successful. Role:', authState.role);
          return user;
        });
      })
      .catch(function (error) {
        console.error('[Auth] Sign in failed:', error);
        throw error;
      });
  }

  /* ============================================================
     SIGN IN WITH GOOGLE
     ============================================================ */

  /**
   * Sign in with Google OAuth
   * @returns {Promise} - Resolves with user object
   */
  function signInWithGoogle() {
    var auth = getAuth();
    if (!auth) return Promise.reject(new Error('Auth not available'));

    var provider = new firebase.auth.GoogleAuthProvider();

    return auth.signInWithPopup(provider)
      .then(function (result) {
        var user = result.user;

        // Check if user exists in Firestore
        return loadUserFromFirestore(user.uid).then(function (userData) {
          var finalUserData;
          var finalRole;

          if (!userData) {
            // New user - create Firestore document
            var newUserData = {
              fullName: user.displayName || '',
              email: user.email || '',
              phone: user.phoneNumber || '',
              role: 'client', // Default role for Google sign-up
              emailVerified: user.emailVerified
            };
            return saveUserToFirestore(user.uid, newUserData).then(function () {
              authState.currentUser = user;
              authState.userData = newUserData;
              authState.role = 'client';
              finalUserData = newUserData;
              finalRole = 'client';

              // Save to localStorage for header button detection
              var localUser = {
                uid: user.uid,
                email: user.email,
                fullName: newUserData.fullName,
                role: finalRole
              };
              localStorage.setItem('fns_local_user', JSON.stringify(localUser));

              return user;
            });
          } else {
            // Existing user
            authState.currentUser = user;
            authState.userData = userData;
            authState.role = userData.role || 'client';
            finalUserData = userData;
            finalRole = userData.role || 'client';

            // Save to localStorage for header button detection
            var localUser = {
              uid: user.uid,
              email: user.email,
              fullName: userData.fullName,
              role: finalRole
            };
            localStorage.setItem('fns_local_user', JSON.stringify(localUser));

            return user;
          }
        });
      })
      .catch(function (error) {
        console.error('[Auth] Google sign-in failed:', error);
        throw error;
      });
  }

  /* ============================================================
     SIGN OUT
     ============================================================ */

  /**
   * Sign out current user
   * @returns {Promise} - Resolves when sign out is complete
   */
  function signOut() {
    var auth = getAuth();
    if (!auth) return Promise.reject(new Error('Auth not available'));

    return auth.signOut()
      .then(function () {
        // Clear auth state
        authState.currentUser = null;
        authState.userData = null;
        authState.role = null;

        // Clear localStorage
        localStorage.removeItem('fns_local_user');

        // Clear session
        if (window.FurnostylesSession) {
          window.FurnostylesSession.clear();
        }

        console.log('[Auth] Sign out successful');
      })
      .catch(function (error) {
        console.error('[Auth] Sign out failed:', error);
        throw error;
      });
  }

  /* ============================================================
     PASSWORD RESET
     ============================================================ */

  /**
   * Send password reset email
   * @param {string} email - User email
   * @returns {Promise} - Resolves when email is sent
   */
  function resetPassword(email) {
    var auth = getAuth();
    if (!auth) return Promise.reject(new Error('Auth not available'));

    return auth.sendPasswordResetEmail(email)
      .then(function () {
        console.log('[Auth] Password reset email sent to:', email);
      })
      .catch(function (error) {
        console.error('[Auth] Password reset failed:', error);
        throw error;
      });
  }

  /* ============================================================
     EMAIL VERIFICATION
     ============================================================ */

  /**
   * Send email verification to current user
   * @returns {Promise} - Resolves when email is sent
   */
  function sendEmailVerification() {
    var auth = getAuth();
    if (!auth) return Promise.reject(new Error('Auth not available'));

    var user = auth.currentUser;
    if (!user) return Promise.reject(new Error('No current user'));

    return user.sendEmailVerification()
      .then(function () {
        console.log('[Auth] Email verification sent');
      })
      .catch(function (error) {
        console.error('[Auth] Email verification failed:', error);
        throw error;
      });
  }

  /* ============================================================
     ROLE-BASED DASHBOARD REDIRECT
     ============================================================ */

  /**
   * Redirect user to appropriate dashboard based on role
   * @param {string} role - User role (client, vendor, admin)
   */
  function redirectToDashboard(role) {
    role = role || 'client';

    var dashboardUrl;
    switch (role) {
      case 'vendor':
        dashboardUrl = 'vendor/vendor-dashboard.html';
        break;
      case 'admin':
        dashboardUrl = 'admin/admin-dashboard.html';
        break;
      case 'client':
      default:
        dashboardUrl = 'client/dashboard.html';
        break;
    }

    console.log('[Auth] Redirecting to dashboard:', dashboardUrl);
    window.location.href = dashboardUrl;
  }

  /* ============================================================
     GET CURRENT USER
     ============================================================ */

  /**
   * Get current authenticated user
   * @returns {object|null} - Current user or null
   */
  function getCurrentUser() {
    var auth = getAuth();
    if (!auth) return null;
    return auth.currentUser;
  }

  /**
   * Get current user data from Firestore
   * @returns {object|null} - User data or null
   */
  function getCurrentUserData() {
    return authState.userData;
  }

  /**
   * Get current user role
   * @returns {string|null} - User role or null
   */
  function getCurrentUserRole() {
    return authState.role;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if authenticated
   */
  function isAuthenticated() {
    var auth = getAuth();
    return auth ? !!auth.currentUser : false;
  }

  /* ============================================================
     AUTH STATE LISTENER
     ============================================================ */

  /**
   * Listen to auth state changes
   * @param {function} callback - Called with (user, userData, role)
   * @returns {function} - Unsubscribe function
   */
  function onAuthStateChange(callback) {
    var auth = getAuth();
    if (!auth) return function () {};

    return auth.onAuthStateChanged(function (user) {
      if (user) {
        authState.currentUser = user;
        loadUserFromFirestore(user.uid).then(function (userData) {
          callback(user, authState.userData, authState.role);
        });
      } else {
        authState.currentUser = null;
        authState.userData = null;
        authState.role = null;
        callback(null, null, null);
      }
    });
  }

  /* ============================================================
     EXPORT AUTH API
     ============================================================ */

  window.FurnostylesAuth = {
    // Auth methods
    signUp: signUp,
    signIn: signIn,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut,
    resetPassword: resetPassword,
    sendEmailVerification: sendEmailVerification,

    // User data methods
    getCurrentUser: getCurrentUser,
    getCurrentUserData: getCurrentUserData,
    getCurrentUserRole: getCurrentUserRole,
    isAuthenticated: isAuthenticated,

    // Redirect method
    redirectToDashboard: redirectToDashboard,

    // Auth state listener
    onAuthStateChange: onAuthStateChange,

    // Auth state (read-only)
    get authState() {
      return authState;
    }
  };

  console.log('[Auth] FurnostylesAuth module loaded');

}());
