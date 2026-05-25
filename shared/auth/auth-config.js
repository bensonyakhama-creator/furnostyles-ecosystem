/**
 * FURNOSTYLES — AUTH CONFIGURATION
 * ================================
 * File: shared/auth/auth-config.js
 *
 * PURPOSE:
 *   Central configuration for authentication system.
 *   Defines roles, role labels, redirect paths, and auth settings.
 *
 * ROLES:
 *   client         — Regular customer browsing/buying
 *   vendor         — Furniture/materials seller
 *   provider       — Service provider (repairs, installations)
 *   contractor     — Construction/renovation contractor
 *   propertyOwner  — Property owner (landlord, homeowner)
 *   agent          — Real estate agent
 *   admin          — Platform administrator
 *   superAdmin     — Super administrator (full access)
 *
 * USAGE:
 *   window.FurnostylesAuthConfig.getRoleLabel(role)
 *   window.FurnostylesAuthConfig.getRedirectPath(role)
 *   window.FurnostylesAuthConfig.getPublicRoutes()
 *   window.FurnostylesAuthConfig.getProtectedRoutes()
 */

(function () {
  'use strict';

  var config = {
    /* Role definitions with display labels */
    roles: {
      client:         { label: 'Client',          description: 'Regular customer' },
      vendor:         { label: 'Vendor',          description: 'Furniture/materials seller' },
      provider:       { label: 'Service Provider', description: 'Repairs & installations' },
      contractor:     { label: 'Contractor',      description: 'Construction/renovation' },
      propertyOwner:  { label: 'Property Owner',  description: 'Landlord or homeowner' },
      agent:          { label: 'Real Estate Agent', description: 'Property listing agent' },
      admin:          { label: 'Admin',           description: 'Platform administrator' },
      superAdmin:     { label: 'Super Admin',     description: 'Full system access' }
    },

    /* Redirect paths after login by role */
    redirectPaths: {
      client:         'dashboards/client/index.html',
      vendor:         'dashboards/vendor/index.html',
      provider:       'dashboards/provider/index.html',
      contractor:     'dashboards/contractor/index.html',
      propertyOwner:  'dashboards/property-owner/index.html',
      agent:          'dashboards/agent/index.html',
      admin:          'dashboards/admin/index.html',
      superAdmin:     'dashboards/super-admin/index.html'
    },

    /* Public routes (no auth required) */
    publicRoutes: [
      'index.html',
      'login.html',
      'register.html',
      'forgot-password.html',
      'verify-email.html',
      'firebase-test.html'
    ],

    /* Protected routes (auth required) */
    protectedRoutes: [
      'dashboards/client/index.html',
      'dashboards/vendor/index.html',
      'dashboards/provider/index.html',
      'dashboards/contractor/index.html',
      'dashboards/property-owner/index.html',
      'dashboards/agent/index.html',
      'dashboards/admin/index.html',
      'dashboards/super-admin/index.html'
    ],

    /* Auth settings */
    settings: {
      requireEmailVerification: true,
      defaultRole: 'client',
      sessionTimeoutMinutes: 1440, /* 24 hours */
      passwordMinLength: 8
    }
  };

  /**
   * Get role display label
   */
  function getRoleLabel(role) {
    return config.roles[role] ? config.roles[role].label : role;
  }

  /**
   * Get role description
   */
  function getRoleDescription(role) {
    return config.roles[role] ? config.roles[role].description : '';
  }

  /**
   * Get redirect path for role
   */
  function getRedirectPath(role) {
    return config.redirectPaths[role] || config.redirectPaths[config.settings.defaultRole];
  }

  /**
   * Check if route is public
   */
  function isPublicRoute(path) {
    var filename = path.split('/').pop();
    return config.publicRoutes.indexOf(filename) !== -1;
  }

  /**
   * Check if route is protected
   */
  function isProtectedRoute(path) {
    var filename = path.split('/').pop();
    return config.protectedRoutes.indexOf(filename) !== -1;
  }

  /**
   * Get all valid roles
   */
  function getValidRoles() {
    return Object.keys(config.roles);
  }

  /**
   * Export auth config API
   */
  window.FurnostylesAuthConfig = {
    config: config,
    getRoleLabel: getRoleLabel,
    getRoleDescription: getRoleDescription,
    getRedirectPath: getRedirectPath,
    isPublicRoute: isPublicRoute,
    isProtectedRoute: isProtectedRoute,
    getValidRoles: getValidRoles
  };

}());
