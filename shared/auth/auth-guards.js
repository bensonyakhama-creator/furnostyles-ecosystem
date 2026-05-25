/**
 * FURNOSTYLES — AUTH GUARDS
 * =========================
 * File: shared/auth/auth-guards.js
 *
 * PURPOSE:
 *   Route guards to protect pages and redirect based on auth state.
 *   Call on page load to check if user can access the current page.
 *
 * DEPENDENCIES:
 *   - shared/auth/auth-config.js
 *   - shared/auth/auth-state.js
 *
 * USAGE:
 *   window.FurnostylesAuthGuards.requireAuth()
 *   window.FurnostylesAuthGuards.requireGuest()
 *   window.FurnostylesAuthGuards.requireRole(role)
 */

(function () {
  'use strict';

  /**
   * Require authentication
   * Redirects to login if not authenticated
   */
  function requireAuth() {
    if (!window.FurnostylesAuthState) {
      console.warn('[AuthGuards] Auth state not available.');
      return;
    }

    if (!window.FurnostylesAuthState.isAuthenticated()) {
      var currentPath = window.location.pathname;
      var loginUrl = 'login.html?redirect=' + encodeURIComponent(currentPath);
      window.location.href = loginUrl;
    }
  }

  /**
   * Require guest (not authenticated)
   * Redirects to dashboard if already authenticated
   */
  function requireGuest() {
    if (!window.FurnostylesAuthState) {
      console.warn('[AuthGuards] Auth state not available.');
      return;
    }

    if (window.FurnostylesAuthState.isAuthenticated()) {
      window.FurnostylesRoleRouter.redirectCurrentUser();
    }
  }

  /**
   * Require specific role
   * Redirects to login if not authenticated, or to default dashboard if wrong role
   */
  function requireRole(requiredRole) {
    if (!window.FurnostylesAuthState) {
      console.warn('[AuthGuards] Auth state not available.');
      return;
    }

    if (!window.FurnostylesAuthState.isAuthenticated()) {
      var currentPath = window.location.pathname;
      var loginUrl = 'login.html?redirect=' + encodeURIComponent(currentPath);
      window.location.href = loginUrl;
      return;
    }

    var userRole = window.FurnostylesAuthState.getUserRole();
    if (userRole !== requiredRole) {
      /* Wrong role, redirect to their dashboard */
      window.FurnostylesRoleRouter.redirectCurrentUser();
    }
  }

  /**
   * Check redirect parameter from URL
   * Returns redirect URL or null
   */
  function getRedirectParam() {
    var params = new URLSearchParams(window.location.search);
    return params.get('redirect');
  }

  /**
   * Export auth guards API
   */
  window.FurnostylesAuthGuards = {
    requireAuth: requireAuth,
    requireGuest: requireGuest,
    requireRole: requireRole,
    getRedirectParam: getRedirectParam
  };

}());
