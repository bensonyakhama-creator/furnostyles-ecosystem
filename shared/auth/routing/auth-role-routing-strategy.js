/**
 * FURNOSTYLES — AUTH ROLE ROUTING STRATEGY
 * ==========================================
 * File: shared/auth/routing/auth-role-routing-strategy.js
 * Purpose: Centralized role routing strategy to avoid duplicated dashboards,
 *          broken redirects, conflicting permissions, and scattered routing logic.
 * 
 * This file DOES NOT implement routing.
 * It only defines the strategy and structure for future routing systems.
 * 
 * Load order: After role-system-architecture.js, role-routing-strategy.js
 * 
 * Usage: This strategy will be used when routing systems are implemented
 */

(function () {
  'use strict';

  /**
   * ROLE ROUTE MAPPINGS
   * Centralized route mappings by role
   */
  var RoleRouteMappings = {
    client: {
      dashboard: 'dashboards/client/index.html',
      savedItems: 'dashboards/client/saved-items.html',
      inquiries: 'dashboards/client/inquiries.html',
      orders: 'dashboards/client/orders.html',
      profile: 'dashboards/client/profile.html',
      default: 'dashboards/client/index.html'
    },

    vendor: {
      dashboard: 'dashboards/vendor/index.html',
      products: 'dashboards/vendor/products.html',
      services: 'dashboards/vendor/services.html',
      inquiries: 'dashboards/vendor/inquiries.html',
      orders: 'dashboards/vendor/orders.html',
      reviews: 'dashboards/vendor/reviews.html',
      analytics: 'dashboards/vendor/analytics.html',
      settings: 'dashboards/vendor/settings.html',
      default: 'dashboards/vendor/index.html'
    },

    provider: {
      dashboard: 'dashboards/provider/index.html',
      services: 'dashboards/provider/services.html',
      inquiries: 'dashboards/provider/inquiries.html',
      orders: 'dashboards/provider/orders.html',
      reviews: 'dashboards/provider/reviews.html',
      portfolio: 'dashboards/provider/portfolio.html',
      profile: 'dashboards/provider/profile.html',
      default: 'dashboards/provider/index.html'
    },

    contractor: {
      dashboard: 'dashboards/contractor/index.html',
      services: 'dashboards/contractor/services.html',
      inquiries: 'dashboards/contractor/inquiries.html',
      orders: 'dashboards/contractor/orders.html',
      reviews: 'dashboards/contractor/reviews.html',
      portfolio: 'dashboards/contractor/portfolio.html',
      profile: 'dashboards/contractor/profile.html',
      default: 'dashboards/contractor/index.html'
    },

    'property-owner': {
      dashboard: 'dashboards/property-owner/index.html',
      properties: 'dashboards/property-owner/properties.html',
      inquiries: 'dashboards/property-owner/inquiries.html',
      orders: 'dashboards/property-owner/orders.html',
      reviews: 'dashboards/property-owner/reviews.html',
      profile: 'dashboards/property-owner/profile.html',
      default: 'dashboards/property-owner/index.html'
    },

    agent: {
      dashboard: 'dashboards/agent/index.html',
      properties: 'dashboards/agent/properties.html',
      inquiries: 'dashboards/agent/inquiries.html',
      orders: 'dashboards/agent/orders.html',
      reviews: 'dashboards/agent/reviews.html',
      profile: 'dashboards/agent/profile.html',
      default: 'dashboards/agent/index.html'
    },

    admin: {
      dashboard: 'dashboards/admin/index.html',
      users: 'dashboards/admin/users.html',
      vendors: 'dashboards/admin/vendors.html',
      products: 'dashboards/admin/products.html',
      services: 'dashboards/admin/services.html',
      properties: 'dashboards/admin/properties.html',
      inquiries: 'dashboards/admin/inquiries.html',
      orders: 'dashboards/admin/orders.html',
      reports: 'dashboards/admin/reports.html',
      settings: 'dashboards/admin/settings.html',
      default: 'dashboards/admin/index.html'
    },

    'super-admin': {
      dashboard: 'dashboards/super-admin/index.html',
      users: 'dashboards/admin/users.html',
      vendors: 'dashboards/admin/vendors.html',
      products: 'dashboards/admin/products.html',
      services: 'dashboards/admin/services.html',
      properties: 'dashboards/admin/properties.html',
      inquiries: 'dashboards/admin/inquiries.html',
      orders: 'dashboards/admin/orders.html',
      reports: 'dashboards/admin/reports.html',
      settings: 'dashboards/admin/settings.html',
      admins: 'dashboards/admin/admins.html',
      system: 'dashboards/admin/system.html',
      default: 'dashboards/super-admin/index.html'
    }
  };

  /**
   * ROUTE PROTECTION STRATEGY
   * Centralized route protection to prevent unauthorized access
   */
  var RouteProtectionStrategy = {
    /**
     * Protected routes by role
     * Modern dashboards/ structure
     */
    protectedRoutes: {
      'dashboards/client/index.html': ['client'],
      'dashboards/client/saved-items.html': ['client'],
      'dashboards/client/inquiries.html': ['client'],
      'dashboards/client/orders.html': ['client'],
      'dashboards/client/profile.html': ['client'],

      'dashboards/vendor/index.html': ['vendor'],
      'dashboards/vendor/products.html': ['vendor'],
      'dashboards/vendor/services.html': ['vendor'],
      'dashboards/vendor/inquiries.html': ['vendor'],
      'dashboards/vendor/orders.html': ['vendor'],
      'dashboards/vendor/reviews.html': ['vendor'],
      'dashboards/vendor/analytics.html': ['vendor'],
      'dashboards/vendor/settings.html': ['vendor'],

      'dashboards/provider/index.html': ['provider'],
      'dashboards/provider/services.html': ['provider'],
      'dashboards/provider/inquiries.html': ['provider'],
      'dashboards/provider/orders.html': ['provider'],
      'dashboards/provider/reviews.html': ['provider'],
      'dashboards/provider/portfolio.html': ['provider'],
      'dashboards/provider/profile.html': ['provider'],

      'dashboards/contractor/index.html': ['contractor'],
      'dashboards/contractor/services.html': ['contractor'],
      'dashboards/contractor/inquiries.html': ['contractor'],
      'dashboards/contractor/orders.html': ['contractor'],
      'dashboards/contractor/reviews.html': ['contractor'],
      'dashboards/contractor/portfolio.html': ['contractor'],
      'dashboards/contractor/profile.html': ['contractor'],

      'dashboards/property-owner/index.html': ['property-owner'],
      'dashboards/property-owner/properties.html': ['property-owner'],
      'dashboards/property-owner/inquiries.html': ['property-owner'],
      'dashboards/property-owner/orders.html': ['property-owner'],
      'dashboards/property-owner/reviews.html': ['property-owner'],
      'dashboards/property-owner/profile.html': ['property-owner'],

      'dashboards/agent/index.html': ['agent'],
      'dashboards/agent/properties.html': ['agent'],
      'dashboards/agent/inquiries.html': ['agent'],
      'dashboards/agent/orders.html': ['agent'],
      'dashboards/agent/reviews.html': ['agent'],
      'dashboards/agent/profile.html': ['agent'],

      'dashboards/admin/index.html': ['admin', 'super-admin'],
      'dashboards/admin/users.html': ['admin', 'super-admin'],
      'dashboards/admin/vendors.html': ['admin', 'super-admin'],
      'dashboards/admin/products.html': ['admin', 'super-admin'],
      'dashboards/admin/services.html': ['admin', 'super-admin'],
      'dashboards/admin/properties.html': ['admin', 'super-admin'],
      'dashboards/admin/inquiries.html': ['admin', 'super-admin'],
      'dashboards/admin/orders.html': ['admin', 'super-admin'],
      'dashboards/admin/reports.html': ['admin', 'super-admin'],
      'dashboards/admin/settings.html': ['admin', 'super-admin'],
      'dashboards/admin/admins.html': ['super-admin'],
      'dashboards/admin/system.html': ['super-admin'],

      'dashboards/super-admin/index.html': ['super-admin']
    },
    
    /**
     * Public routes (accessible to all)
     */
    publicRoutes: [
      'index.html',
      'about.html',
      'services.html',
      'portfolio.html',
      'blogs.html',
      'contact.html',
      'ecosystem.html',
      'projects.html',
      'project-guidance.html',
      'marketplace.html',
      'furniture-marketplace.html',
      'materials-marketplace.html',
      'services-marketplace.html',
      'realestate-marketplace.html',
      'secondhand-marketplace.html',
      'sourcing-marketplace.html',
      'accounts/login.html',
      'accounts/signup.html',
      'accounts/forgot-password.html',
      'accounts/reset-password.html'
    ],
    
    /**
     * Check if route is protected
     */
    isProtectedRoute: function (route) {
      return this.protectedRoutes.hasOwnProperty(route);
    },
    
    /**
     * Check if route is public
     */
    isPublicRoute: function (route) {
      return this.publicRoutes.indexOf(route) !== -1;
    },
    
    /**
     * Check if user can access route
     */
    canAccessRoute: function (route, userRole) {
      if (this.isPublicRoute(route)) return true;
      
      var allowedRoles = this.protectedRoutes[route];
      if (!allowedRoles) return false;
      
      return allowedRoles.indexOf(userRole) !== -1;
    },
    
    /**
     * Get redirect route if access denied
     */
    getRedirectRoute: function (userRole) {
      if (userRole && RoleRouteMappings[userRole]) {
        return RoleRouteMappings[userRole].default;
      }
      return 'accounts/login.html';
    }
  };

  /**
   * ROUTE REDIRECT STRATEGY
   * Centralized redirect strategy to prevent broken redirects
   */
  var RouteRedirectStrategy = {
    /**
     * Redirect to role-appropriate dashboard
     */
    redirectToDashboard: function (userRole) {
      var mappings = RoleRouteMappings[userRole];
      if (mappings && mappings.default) {
        window.location.href = mappings.default;
      } else {
        window.location.href = 'index.html';
      }
    },
    
    /**
     * Redirect after login
     */
    redirectAfterLogin: function (userRole, redirectUrl) {
      if (redirectUrl && this.validateRedirectUrl(redirectUrl)) {
        window.location.href = redirectUrl;
      } else {
        this.redirectToDashboard(userRole);
      }
    },
    
    /**
     * Redirect after logout
     */
    redirectAfterLogout: function () {
      window.location.href = 'index.html';
    },
    
    /**
     * Validate redirect URL
     */
    validateRedirectUrl: function (url) {
      if (!url) return false;
      
      // Prevent open redirects
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return false;
      }
      
      // Allow relative URLs only
      return true;
    },
    
    /**
     * Get safe redirect URL from query param
     */
    getSafeRedirectUrl: function () {
      var params = new URLSearchParams(window.location.search);
      var redirectUrl = params.get('redirect');
      
      if (this.validateRedirectUrl(redirectUrl)) {
        return redirectUrl;
      }
      
      return null;
    }
  };

  /**
   * ROUTE PERMISSION STRATEGY
   * Centralized permission-based routing to prevent conflicting permissions
   */
  var RoutePermissionStrategy = {
    /**
     * Permission requirements for routes
     */
    routePermissions: {
      'vendor/products.html': ['create:products', 'update:own-products'],
      'vendor/services.html': ['create:services', 'update:own-services'],
      'vendor/analytics.html': ['view:own-orders'],
      'admin/users.html': ['manage:users'],
      'admin/vendors.html': ['manage:vendors'],
      'admin/settings.html': ['manage:settings'],
      'admin/admins.html': ['manage:admins'],
      'admin/system.html': ['manage:system']
    },
    
    /**
     * Check if user has required permissions for route
     */
    hasRoutePermissions: function (route, userRole) {
      var requiredPermissions = this.routePermissions[route];
      if (!requiredPermissions) return true;
      
      var rolePermissions = window.FurnostylesRoleSystemArchitecture &&
                           window.FurnostylesRoleSystemArchitecture.RolePermissionsSystem;
      
      if (!rolePermissions) return false;
      
      return rolePermissions.hasAllPermissions(userRole, requiredPermissions);
    }
  };

  /**
   * EXPORT AUTH ROLE ROUTING STRATEGY
   */
  window.FurnostylesAuthRoleRoutingStrategy = {
    RoleRouteMappings: RoleRouteMappings,
    RouteProtectionStrategy: RouteProtectionStrategy,
    RouteRedirectStrategy: RouteRedirectStrategy,
    RoutePermissionStrategy: RoutePermissionStrategy
  };

}());
