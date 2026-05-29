/**
 * FURNOSTYLES — ROLE-ROUTING STRATEGY
 * ======================================
 * File: shared/routing/role-routing-strategy.js
 * Purpose: Centralized role-routing strategy to avoid duplicated dashboards,
 *          conflicting account systems, broken redirects, and inconsistent permissions.
 * 
 * This file DOES NOT implement routing.
 * It only defines the strategy and structure for future routing systems.
 * 
 * Load order: After account-architecture.js, dashboard-architecture.js
 * 
 * Usage: This strategy will be used when routing systems are implemented
 */

(function () {
  'use strict';

  /**
   * ROUTE PROTECTION STRATEGY
   * Centralized route protection based on user roles
   */
  var RouteProtectionStrategy = {
    /**
     * Protected routes configuration
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
      
      'dashboards/admin/index.html': ['admin'],
      'dashboards/admin/users.html': ['admin'],
      'dashboards/admin/vendors.html': ['admin'],
      'dashboards/admin/products.html': ['admin'],
      'dashboards/admin/services.html': ['admin'],
      'dashboards/admin/inquiries.html': ['admin'],
      'dashboards/admin/orders.html': ['admin'],
      'dashboards/admin/reports.html': ['admin'],
      'dashboards/admin/settings.html': ['admin']
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
      'sourcing-marketplace.html'
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
     * Get redirect route based on user role
     */
    getRedirectRoute: function (userRole) {
      var redirects = {
        'client': 'dashboards/client/index.html',
        'vendor': 'dashboards/vendor/index.html',
        'provider': 'dashboards/provider/index.html',
        'contractor': 'dashboards/contractor/index.html',
        'property-owner': 'dashboards/property-owner/index.html',
        'agent': 'dashboards/agent/index.html',
        'admin': 'dashboards/admin/index.html',
        'super-admin': 'dashboards/super-admin/index.html',
        'guest': 'index.html'
      };
      return redirects[userRole] || redirects['guest'];
    }
  };

  /**
   * DASHBOARD ROUTING STRATEGY
   * Centralized dashboard routing to avoid duplicated dashboards
   */
  var DashboardRoutingStrategy = {
    /**
     * Dashboard paths by role
     * Modern dashboards/ structure
     */
    dashboardPaths: {
      'client': 'dashboards/client/index.html',
      'vendor': 'dashboards/vendor/index.html',
      'provider': 'dashboards/provider/index.html',
      'contractor': 'dashboards/contractor/index.html',
      'property-owner': 'dashboards/property-owner/index.html',
      'agent': 'dashboards/agent/index.html',
      'admin': 'dashboards/admin/index.html',
      'super-admin': 'dashboards/super-admin/index.html'
    },
    
    /**
     * Redirect to appropriate dashboard
     */
    redirectToDashboard: function (userRole) {
      var dashboardPath = this.dashboardPaths[userRole];
      if (dashboardPath) {
        window.location.href = dashboardPath;
      }
    },
    
    /**
     * Get dashboard path for role
     */
    getDashboardPath: function (userRole) {
      return this.dashboardPaths[userRole] || null;
    },
    
    /**
     * Validate dashboard access
     */
    validateDashboardAccess: function (userRole, currentPath) {
      var expectedPath = this.dashboardPaths[userRole];
      return currentPath === expectedPath;
    }
  };

  /**
   * ACCOUNT ROUTING STRATEGY
   * Centralized account routing to avoid conflicting account systems
   */
  var AccountRoutingStrategy = {
    /**
     * Account paths by action
     */
    accountPaths: {
      login: 'accounts/login.html',
      register: 'accounts/register.html',
      forgotPassword: 'accounts/forgot-password.html',
      resetPassword: 'accounts/reset-password.html'
    },
    
    /**
     * Redirect to login
     */
    redirectToLogin: function (redirectUrl) {
      var loginPath = this.accountPaths.login;
      if (redirectUrl) {
        window.location.href = loginPath + '?redirect=' + encodeURIComponent(redirectUrl);
      } else {
        window.location.href = loginPath;
      }
    },
    
    /**
     * Redirect after login
     */
    redirectAfterLogin: function (userRole, redirectUrl) {
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        DashboardRoutingStrategy.redirectToDashboard(userRole);
      }
    },
    
    /**
     * Redirect after logout
     */
    redirectAfterLogout: function () {
      window.location.href = 'index.html';
    }
  };

  /**
   * PERMISSION ROUTING STRATEGY
   * Centralized permission-based routing for consistent permissions
   */
  var PermissionRoutingStrategy = {
    /**
     * Permission definitions by role
     */
    rolePermissions: {
      'client': [
        'view:products',
        'view:services',
        'view:properties',
        'save:items',
        'create:inquiries',
        'view:own-inquiries',
        'track:own-orders'
      ],
      'vendor': [
        'view:products',
        'view:services',
        'create:products',
        'update:own-products',
        'delete:own-products',
        'create:services',
        'update:own-services',
        'delete:own-services',
        'respond:inquiries',
        'view:own-inquiries',
        'view:own-orders'
      ],
      'provider': [
        'view:products',
        'view:services',
        'create:services',
        'update:own-services',
        'delete:own-services',
        'respond:inquiries',
        'view:own-inquiries',
        'view:own-orders'
      ],
      'property-owner': [
        'view:properties',
        'create:properties',
        'update:own-properties',
        'delete:own-properties',
        'respond:inquiries',
        'view:own-inquiries',
        'view:own-orders'
      ],
      'admin': [
        'view:all',
        'create:all',
        'update:all',
        'delete:all',
        'moderate:content',
        'manage:users',
        'manage:vendors',
        'verify:vendors',
        'view:reports',
        'manage:settings'
      ]
    },
    
    /**
     * Check if user has permission
     */
    hasPermission: function (userRole, permission) {
      var permissions = this.rolePermissions[userRole];
      if (!permissions) return false;
      return permissions.indexOf(permission) !== -1;
    },
    
    /**
     * Check if user has all required permissions
     */
    hasAllPermissions: function (userRole, requiredPermissions) {
      var permissions = this.rolePermissions[userRole];
      if (!permissions) return false;
      return requiredPermissions.every(function (perm) {
        return permissions.indexOf(perm) !== -1;
      });
    },
    
    /**
     * Check if user has any of the required permissions
     */
    hasAnyPermission: function (userRole, requiredPermissions) {
      var permissions = this.rolePermissions[userRole];
      if (!permissions) return false;
      return requiredPermissions.some(function (perm) {
        return permissions.indexOf(perm) !== -1;
      });
    }
  };

  /**
   * REDIRECT SAFETY STRATEGY
   * Centralized redirect safety to avoid broken redirects
   */
  var RedirectSafetyStrategy = {
    /**
     * Validate redirect URL
     */
    validateRedirectUrl: function (url) {
      // Prevent open redirects
      if (!url) return false;
      
      // Allow relative URLs only
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return false;
      }
      
      // Allow whitelisted domains
      var allowedDomains = ['furnostyles.com', 'www.furnostyles.com'];
      var domain = new URL(window.location.origin).hostname;
      
      if (allowedDomains.indexOf(domain) === -1) {
        return false;
      }
      
      return true;
    },
    
    /**
     * Safe redirect
     */
    safeRedirect: function (url, fallbackUrl) {
      if (this.validateRedirectUrl(url)) {
        window.location.href = url;
      } else if (fallbackUrl) {
        window.location.href = fallbackUrl;
      } else {
        window.location.href = 'index.html';
      }
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
   * EXPORT ROLE-ROUTING STRATEGY
   */
  window.FurnostylesRoleRoutingStrategy = {
    RouteProtectionStrategy: RouteProtectionStrategy,
    DashboardRoutingStrategy: DashboardRoutingStrategy,
    AccountRoutingStrategy: AccountRoutingStrategy,
    PermissionRoutingStrategy: PermissionRoutingStrategy,
    RedirectSafetyStrategy: RedirectSafetyStrategy
  };

}());
