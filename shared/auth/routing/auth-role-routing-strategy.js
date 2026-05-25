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
      dashboard: 'client/dashboard.html',
      savedItems: 'client/saved-items.html',
      inquiries: 'client/inquiries.html',
      orders: 'client/orders.html',
      profile: 'client/profile.html',
      default: 'client/dashboard.html'
    },
    
    vendor: {
      dashboard: 'vendor/dashboard.html',
      products: 'vendor/products.html',
      services: 'vendor/services.html',
      inquiries: 'vendor/inquiries.html',
      orders: 'vendor/orders.html',
      reviews: 'vendor/reviews.html',
      analytics: 'vendor/analytics.html',
      settings: 'vendor/settings.html',
      default: 'vendor/dashboard.html'
    },
    
    provider: {
      dashboard: 'provider/dashboard.html',
      services: 'provider/services.html',
      inquiries: 'provider/inquiries.html',
      orders: 'provider/orders.html',
      reviews: 'provider/reviews.html',
      portfolio: 'provider/portfolio.html',
      profile: 'provider/profile.html',
      default: 'provider/dashboard.html'
    },
    
    contractor: {
      dashboard: 'provider/dashboard.html',
      services: 'provider/services.html',
      inquiries: 'provider/inquiries.html',
      orders: 'provider/orders.html',
      reviews: 'provider/reviews.html',
      portfolio: 'provider/portfolio.html',
      profile: 'provider/profile.html',
      default: 'provider/dashboard.html'
    },
    
    'property-owner': {
      dashboard: 'property-owner/dashboard.html',
      properties: 'property-owner/properties.html',
      inquiries: 'property-owner/inquiries.html',
      orders: 'property-owner/orders.html',
      reviews: 'property-owner/reviews.html',
      profile: 'property-owner/profile.html',
      default: 'property-owner/dashboard.html'
    },
    
    agent: {
      dashboard: 'agent/dashboard.html',
      properties: 'agent/properties.html',
      inquiries: 'agent/inquiries.html',
      orders: 'agent/orders.html',
      reviews: 'agent/reviews.html',
      profile: 'agent/profile.html',
      default: 'agent/dashboard.html'
    },
    
    admin: {
      dashboard: 'admin/dashboard.html',
      users: 'admin/users.html',
      vendors: 'admin/vendors.html',
      products: 'admin/products.html',
      services: 'admin/services.html',
      properties: 'admin/properties.html',
      inquiries: 'admin/inquiries.html',
      orders: 'admin/orders.html',
      reports: 'admin/reports.html',
      settings: 'admin/settings.html',
      default: 'admin/dashboard.html'
    },
    
    'super-admin': {
      dashboard: 'admin/dashboard.html',
      users: 'admin/users.html',
      vendors: 'admin/vendors.html',
      products: 'admin/products.html',
      services: 'admin/services.html',
      properties: 'admin/properties.html',
      inquiries: 'admin/inquiries.html',
      orders: 'admin/orders.html',
      reports: 'admin/reports.html',
      settings: 'admin/settings.html',
      admins: 'admin/admins.html',
      system: 'admin/system.html',
      default: 'admin/dashboard.html'
    }
  };

  /**
   * ROUTE PROTECTION STRATEGY
   * Centralized route protection to prevent unauthorized access
   */
  var RouteProtectionStrategy = {
    /**
     * Protected routes by role
     */
    protectedRoutes: {
      'client/dashboard.html': ['client'],
      'client/saved-items.html': ['client'],
      'client/inquiries.html': ['client'],
      'client/orders.html': ['client'],
      'client/profile.html': ['client'],
      
      'vendor/dashboard.html': ['vendor'],
      'vendor/products.html': ['vendor'],
      'vendor/services.html': ['vendor'],
      'vendor/inquiries.html': ['vendor'],
      'vendor/orders.html': ['vendor'],
      'vendor/reviews.html': ['vendor'],
      'vendor/analytics.html': ['vendor'],
      'vendor/settings.html': ['vendor'],
      
      'provider/dashboard.html': ['provider', 'contractor'],
      'provider/services.html': ['provider', 'contractor'],
      'provider/inquiries.html': ['provider', 'contractor'],
      'provider/orders.html': ['provider', 'contractor'],
      'provider/reviews.html': ['provider', 'contractor'],
      'provider/portfolio.html': ['provider', 'contractor'],
      'provider/profile.html': ['provider', 'contractor'],
      
      'property-owner/dashboard.html': ['property-owner'],
      'property-owner/properties.html': ['property-owner'],
      'property-owner/inquiries.html': ['property-owner'],
      'property-owner/orders.html': ['property-owner'],
      'property-owner/reviews.html': ['property-owner'],
      'property-owner/profile.html': ['property-owner'],
      
      'agent/dashboard.html': ['agent'],
      'agent/properties.html': ['agent'],
      'agent/inquiries.html': ['agent'],
      'agent/orders.html': ['agent'],
      'agent/reviews.html': ['agent'],
      'agent/profile.html': ['agent'],
      
      'admin/dashboard.html': ['admin', 'super-admin'],
      'admin/users.html': ['admin', 'super-admin'],
      'admin/vendors.html': ['admin', 'super-admin'],
      'admin/products.html': ['admin', 'super-admin'],
      'admin/services.html': ['admin', 'super-admin'],
      'admin/properties.html': ['admin', 'super-admin'],
      'admin/inquiries.html': ['admin', 'super-admin'],
      'admin/orders.html': ['admin', 'super-admin'],
      'admin/reports.html': ['admin', 'super-admin'],
      'admin/settings.html': ['admin', 'super-admin'],
      'admin/admins.html': ['super-admin'],
      'admin/system.html': ['super-admin']
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
