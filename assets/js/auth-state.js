/**
 * FURNOSTYLES — AUTH STATE MANAGER
 * ================================
 * File: assets/js/auth-state.js
 * Purpose: Manages authentication state across all pages with inline headers.
 *          Works with Firebase (FurnostylesSession/FurnostylesAuth) and falls back to localStorage.
 *          Updates header UI (account button, login/register links) based on auth state.
 *
 * Usage: Include this script on pages with inline header buttons (fldAccountBtn, fldCartBtn, fldAlertBtn)
 *        Must be loaded after Firebase SDK and auth/session scripts.
 */

(function() {
  'use strict';

  /* Get user from Firebase or localStorage fallback */
  function getCurrentUser() {
    if (window.FurnostylesSession) {
      var sessionUser = window.FurnostylesSession.getUser();
      if (sessionUser) return sessionUser;
    }
    try {
      return JSON.parse(localStorage.getItem('fns_local_user') || 'null');
    } catch (e) {
      return null;
    }
  }

  /* Get display name from user object */
  function getDisplayName(user) {
    if (!user) return 'Account';
    return user.displayName || user.fullName || (user.email ? user.email.split('@')[0] : 'Account');
  }

  /* Get user role */
  function getUserRole(user) {
    if (!user) return 'client';
    return user.role || 'client';
  }

  /* Get dashboard URL based on role */
  function getDashboardUrl(role) {
    if (role === 'vendor') return 'vendor/dashboard.html';
    if (role === 'admin') return 'admin/dashboard.html';
    if (role === 'landlord') return 'property-owner/dashboard.html';
    if (role === 'provider') return 'provider/dashboard.html';
    return 'client/dashboard.html';
  }

  /* Update header UI based on auth state */
  function applyAuthState() {
    var user = getCurrentUser();
    var loginLink = document.getElementById('idxLoginLink');
    var regLink = document.getElementById('idxRegisterLink');
    var accountBtn = document.getElementById('fldAccountBtn');

    if (user) {
      var displayName = getDisplayName(user);
      var role = getUserRole(user);
      var dashboardLink = getDashboardUrl(role);

      // Update login link to show user name and link to dashboard
      if (loginLink) {
        loginLink.innerHTML = '<svg class="fld-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' + displayName;
        loginLink.href = dashboardLink;
      }

      // Update register link to show sign out
      if (regLink) {
        regLink.innerHTML = '<svg class="fld-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Sign Out';
        regLink.href = '#';
        regLink.addEventListener('click', function(e) {
          e.preventDefault();
          if (window.FurnostylesAuth) {
            window.FurnostylesAuth.signOut().then(function() {
              location.reload();
            }).catch(function() {
              localStorage.removeItem('fns_local_user');
              location.reload();
            });
          } else {
            localStorage.removeItem('fns_local_user');
            location.reload();
          }
        });
      }

      // Update account button text
      var txt = document.querySelector('#fldAccountBtn .fld-btn-text');
      if (txt) {
        txt.textContent = displayName.split(' ')[0];
      }
    } else {
      // User not logged in - reset to default state
      if (loginLink) {
        loginLink.innerHTML = '<svg class="fld-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Sign In';
        loginLink.href = 'login.html';
      }
      if (regLink) {
        regLink.innerHTML = '<svg class="fld-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>Register';
        regLink.href = 'register.html';
      }
    }
  }

  /* Initialize on DOM ready */
  function init() {
    // Listen to Firebase auth changes if available
    if (window.FurnostylesSession) {
      window.FurnostylesSession.onAuthChange(function(user) {
        applyAuthState();
      });
    }
    // Apply initial state
    applyAuthState();
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Listen to localStorage changes (other tabs)
  window.addEventListener('storage', function(e) {
    if (e.key === 'fns_local_user') {
      applyAuthState();
    }
  });

})();
