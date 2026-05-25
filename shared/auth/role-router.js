/**
 * FURNOSTYLES — ROLE ROUTER
 * =========================
 * File: shared/auth/role-router.js
 *
 * PURPOSE:
 *   Route users to appropriate dashboard based on their role.
 *   Called after successful login or registration.
 *
 * DEPENDENCIES:
 *   - shared/auth/auth-config.js
 *   - shared/auth/auth-state.js
 *
 * USAGE:
 *   window.FurnostylesRoleRouter.redirectByRole(role)
 *   window.FurnostylesRoleRouter.redirectCurrentUser()
 */

(function () {
  'use strict';

  /**
   * Redirect user to dashboard based on role
   * @param {string} role - User role
   */
  function redirectByRole(role) {
    if (!window.FurnostylesAuthConfig) {
      console.warn('[RoleRouter] Auth config not available.');
      window.location.href = 'index.html';
      return;
    }

    var path = window.FurnostylesAuthConfig.getRedirectPath(role);
    if (path) {
      window.location.href = path;
    } else {
      window.location.href = 'index.html';
    }
  }

  /**
   * Redirect current user to their dashboard
   * If role is missing, redirect to role completion/onboarding
   */
  function redirectCurrentUser() {
    if (!window.FurnostylesAuthState) {
      console.warn('[RoleRouter] Auth state not available.');
      window.location.href = 'index.html';
      return;
    }

    var role = window.FurnostylesAuthState.getUserRole();
    if (role) {
      redirectByRole(role);
    } else {
      /* No role set, redirect to role completion/onboarding */
      redirectForRoleCompletion();
    }
  }

  /**
   * Redirect user to role completion/onboarding page
   * Used when user profile exists but role is missing
   */
  function redirectForRoleCompletion() {
    /* TODO: Create role-completion.html page */
    /* For now, redirect to register as fallback */
    window.location.href = 'register.html?complete=true';
  }

  /**
   * Export role router API
   */
  window.FurnostylesRoleRouter = {
    redirectByRole: redirectByRole,
    redirectCurrentUser: redirectCurrentUser,
    redirectForRoleCompletion: redirectForRoleCompletion
  };

}());
