/**
 * FURNOSTYLES — ACCOUNT ARCHITECTURE
 * ====================================
 * File: shared/auth/account-architecture.js
 * Purpose: Centralized account architecture for future authentication.
 *          Defines the strategy for clients, vendors, providers, property owners, and admins.
 * 
 * This file DOES NOT implement authentication.
 * It only defines the architecture and structure for future account systems.
 * 
 * Load order: After firebase-init.js, auth-service.js
 * 
 * Usage: This architecture will be used when authentication is implemented
 */

(function () {
  'use strict';

  /**
   * USER ROLE DEFINITIONS
   * Centralized role definitions for the entire platform
   */
  var UserRoles = {
    CLIENT: {
      id: 'client',
      name: 'Client',
      description: 'Regular users who browse, save items, and make inquiries',
      permissions: [
        'view:products',
        'view:services',
        'view:properties',
        'save:items',
        'create:inquiries',
        'view:own-inquiries',
        'track:own-orders'
      ],
      dashboard: 'client/dashboard.html',
      features: ['saved-items', 'inquiries', 'orders', 'profile']
    },
    
    VENDOR: {
      id: 'vendor',
      name: 'Vendor',
      description: 'Product and service providers who list items and respond to inquiries',
      permissions: [
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
      dashboard: 'vendor/dashboard.html',
      features: ['products', 'services', 'inquiries', 'orders', 'reviews', 'profile', 'analytics']
    },
    
    PROVIDER: {
      id: 'provider',
      name: 'Service Provider',
      description: 'Professional service providers (contractors, designers, etc.)',
      permissions: [
        'view:products',
        'view:services',
        'create:services',
        'update:own-services',
        'delete:own-services',
        'respond:inquiries',
        'view:own-inquiries',
        'view:own-orders'
      ],
      dashboard: 'provider/dashboard.html',
      features: ['services', 'inquiries', 'orders', 'reviews', 'profile', 'portfolio']
    },
    
    PROPERTY_OWNER: {
      id: 'property-owner',
      name: 'Property Owner',
      description: 'Property owners listing properties for sale or rent',
      permissions: [
        'view:properties',
        'create:properties',
        'update:own-properties',
        'delete:own-properties',
        'respond:inquiries',
        'view:own-inquiries',
        'view:own-orders'
      ],
      dashboard: 'property-owner/dashboard.html',
      features: ['properties', 'inquiries', 'orders', 'reviews', 'profile']
    },
    
    ADMIN: {
      id: 'admin',
      name: 'Admin',
      description: 'Platform administrators with full access',
      permissions: [
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
      ],
      dashboard: 'admin/dashboard.html',
      features: ['users', 'vendors', 'products', 'services', 'properties', 'inquiries', 'orders', 'reports', 'settings']
    }
  };

  /**
   * USER DATA STRUCTURE
   * Centralized user data structure for Firestore
   */
  var UserDataStructure = {
    basic: {
      uid: 'string',
      email: 'string',
      displayName: 'string',
      photoURL: 'string',
      role: 'string',
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    },
    
    profile: {
      phone: 'string',
      location: {
        address: 'string',
        city: 'string',
        country: 'string'
      },
      bio: 'string',
      website: 'string'
    },
    
    preferences: {
      notifications: {
        email: 'boolean',
        sms: 'boolean',
        push: 'boolean'
      },
      language: 'string',
      timezone: 'string'
    },
    
    verification: {
      emailVerified: 'boolean',
      phoneVerified: 'boolean',
      verifiedAt: 'timestamp'
    },
    
    metadata: {
      lastLogin: 'timestamp',
      loginCount: 'number',
      ipAddress: 'string'
    }
  };

  /**
   * ACCOUNT COLLECTION STRUCTURE
   * Firestore collection structure for accounts
   */
  var AccountCollectionStructure = {
    users: {
      collection: 'users',
      indexes: [
        { fields: ['email'] },
        { fields: ['role'] },
        { fields: ['createdAt'] }
      ]
    },
    
    userProfiles: {
      collection: 'user_profiles',
      parentCollection: 'users',
      subcollection: true
    },
    
    userPermissions: {
      collection: 'user_permissions',
      parentCollection: 'users',
      subcollection: true
    },
    
    userActivity: {
      collection: 'user_activity',
      parentCollection: 'users',
      subcollection: true
    }
  };

  /**
   * ROLE-BASED ACCESS CONTROL
   * Centralized RBAC strategy
   */
  var RoleBasedAccessControl = {
    /**
     * Check if user has permission
     */
    hasPermission: function (userRole, permission) {
      var role = UserRoles[userRole.toUpperCase()];
      if (!role) return false;
      return role.permissions.indexOf(permission) !== -1;
    },
    
    /**
     * Get user dashboard URL
     */
    getDashboardUrl: function (userRole) {
      var role = UserRoles[userRole.toUpperCase()];
      if (!role) return null;
      return role.dashboard;
    },
    
    /**
     * Get user features
     */
    getFeatures: function (userRole) {
      var role = UserRoles[userRole.toUpperCase()];
      if (!role) return [];
      return role.features;
    },
    
    /**
     * Check if user can access route
     */
    canAccessRoute: function (userRole, route) {
      var role = UserRoles[userRole.toUpperCase()];
      if (!role) return false;
      
      // Check if route matches dashboard
      if (route === role.dashboard) return true;
      
      // Check feature-based routes
      var featureRoutes = {
        'saved-items': '/saved-items',
        'inquiries': '/inquiries',
        'orders': '/orders',
        'products': '/products',
        'services': '/services',
        'properties': '/properties',
        'reviews': '/reviews',
        'profile': '/profile',
        'analytics': '/analytics',
        'portfolio': '/portfolio',
        'users': '/users',
        'vendors': '/vendors',
        'reports': '/reports',
        'settings': '/settings'
      };
      
      return role.features.some(function (feature) {
        return route.includes(featureRoutes[feature] || feature);
      });
    }
  };

  /**
   * ACCOUNT CREATION STRATEGY
   * Strategy for creating different account types
   */
  var AccountCreationStrategy = {
    /**
     * Client account creation
     */
    createClient: function (email, password, userData) {
      // Future implementation: Create client account
      console.log('createClient will be implemented when auth is integrated');
      return Promise.resolve({ success: true, userId: 'placeholder' });
    },
    
    /**
     * Vendor account creation
     */
    createVendor: function (email, password, userData) {
      // Future implementation: Create vendor account
      console.log('createVendor will be implemented when auth is integrated');
      return Promise.resolve({ success: true, userId: 'placeholder' });
    },
    
    /**
     * Provider account creation
     */
    createProvider: function (email, password, userData) {
      // Future implementation: Create provider account
      console.log('createProvider will be implemented when auth is integrated');
      return Promise.resolve({ success: true, userId: 'placeholder' });
    },
    
    /**
     * Property owner account creation
     */
    createPropertyOwner: function (email, password, userData) {
      // Future implementation: Create property owner account
      console.log('createPropertyOwner will be implemented when auth is integrated');
      return Promise.resolve({ success: true, userId: 'placeholder' });
    },
    
    /**
     * Admin account creation
     */
    createAdmin: function (email, password, userData) {
      // Future implementation: Create admin account
      console.log('createAdmin will be implemented when auth is integrated');
      return Promise.resolve({ success: true, userId: 'placeholder' });
    }
  };

  /**
   * EXPORT ACCOUNT ARCHITECTURE
   */
  window.FurnostylesAccountArchitecture = {
    UserRoles: UserRoles,
    UserDataStructure: UserDataStructure,
    AccountCollectionStructure: AccountCollectionStructure,
    RoleBasedAccessControl: RoleBasedAccessControl,
    AccountCreationStrategy: AccountCreationStrategy
  };

}());
