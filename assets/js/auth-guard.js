/**
 * FURNOSTYLES — AUTH GUARD
 * =========================
 * File: assets/js/auth-guard.js
 * Purpose: Protect dashboard pages from unauthenticated users.
 *          Redirects to login page if user is not authenticated.
 *          Optionally checks for specific user roles.
 *
 * Usage:
 *   Add this script to dashboard pages before closing </body> tag.
 *   Configure required role via data attribute:
 *   <script src="assets/js/auth-guard.js" data-required-role="vendor"></script>
 *
 * Supported roles:
 *   - client (default)
 *   - vendor
 *   - admin
 */

(function () {
  'use strict';

  /* ============================================================
     GET REQUIRED ROLE FROM SCRIPT TAG
     ============================================================ */

  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];
  var requiredRole = currentScript.getAttribute('data-required-role') || null;

  /* ============================================================
     CHECK AUTHENTICATION
     ============================================================ */

  function checkAuth() {
    // Check if FurnostylesAuth is available
    if (!window.FurnostylesAuth) {
      console.warn('[AuthGuard] FurnostylesAuth not available. Redirecting to login.');
      redirectToLogin();
      return;
    }

    // Check if user is authenticated
    if (!window.FurnostylesAuth.isAuthenticated()) {
      console.warn('[AuthGuard] User not authenticated. Redirecting to login.');
      redirectToLogin();
      return;
    }

    // Check role if required
    if (requiredRole) {
      var userRole = window.FurnostylesAuth.getCurrentUserRole();
      if (userRole !== requiredRole) {
        console.warn('[AuthGuard] User role (' + userRole + ') does not match required role (' + requiredRole + '). Redirecting.');
        redirectToAccessDenied();
        return;
      }
    }

    console.log('[AuthGuard] Auth check passed. User can access this page.');
  }

  /* ============================================================
     REDIRECT TO LOGIN
     ============================================================ */

  function redirectToLogin() {
    var currentPath = window.location.pathname;
    var loginUrl = 'login.html?redirect=' + encodeURIComponent(currentPath);
    window.location.href = loginUrl;
  }

  /* ============================================================
     REDIRECT TO ACCESS DENIED
     ============================================================ */

  function redirectToAccessDenied() {
    // Redirect to appropriate dashboard based on user's role
    var userRole = window.FurnostylesAuth.getCurrentUserRole();
    if (userRole === 'admin') {
      window.location.href = 'admin/admin-dashboard.html';
    } else if (userRole === 'vendor') {
      window.location.href = 'vendor/vendor-dashboard.html';
    } else {
      window.location.href = 'client/dashboard.html';
    }
  }

  /* ============================================================
     RUN AUTH CHECK
     ============================================================ */

  // Wait for auth module to load
  if (window.FurnostylesAuth) {
    checkAuth();
  } else {
    // If auth module not loaded yet, wait for it
    var checkInterval = setInterval(function () {
      if (window.FurnostylesAuth) {
        clearInterval(checkInterval);
        checkAuth();
      }
    }, 100);

    // Timeout after 5 seconds
    setTimeout(function () {
      clearInterval(checkInterval);
      if (!window.FurnostylesAuth) {
        console.error('[AuthGuard] Auth module failed to load. Redirecting to login.');
        redirectToLogin();
      }
    }, 5000);
  }

  console.log('[AuthGuard] Auth guard loaded. Required role:', requiredRole || 'any');

}());
