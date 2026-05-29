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
      dashboard: 'dashboards/client/index.html',
      features: ['saved-items', 'inquiries', 'orders', 'profile'],
      verificationLevel: 'none'
    },

    INDIVIDUAL_SELLER: {
      id: 'individual-seller',
      name: 'Individual Seller',
      description: 'Non-business individuals selling secondhand items (minimal verification)',
      permissions: [
        'view:products',
        'view:services',
        'create:secondhand-products',
        'update:own-products',
        'delete:own-products',
        'respond:inquiries',
        'view:own-inquiries',
        'view:own-orders',
        'update:own-profile'
      ],
      dashboard: 'dashboards/vendor/index.html',
      features: ['products', 'inquiries', 'orders', 'reviews', 'profile'],
      verificationLevel: 'basic',
      verificationRequirements: ['phone', 'id'],
      canUpgradeTo: ['vendor']
    },

    INDIVIDUAL_LANDLORD: {
      id: 'individual-landlord',
      name: 'Individual Landlord',
      description: 'Individual property owners without business registration (minimal verification)',
      permissions: [
        'view:properties',
        'create:properties',
        'update:own-properties',
        'delete:own-properties',
        'respond:inquiries',
        'view:own-inquiries',
        'view:own-orders',
        'update:own-profile'
      ],
      dashboard: 'dashboards/property-owner/index.html',
      features: ['properties', 'inquiries', 'orders', 'reviews', 'profile'],
      verificationLevel: 'basic',
      verificationRequirements: ['phone', 'id'],
      canUpgradeTo: ['property-owner']
    },

    VENDOR: {
      id: 'vendor',
      name: 'Vendor',
      description: 'Business product and service providers with full verification',
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
      dashboard: 'dashboards/vendor/index.html',
      features: ['products', 'services', 'inquiries', 'orders', 'reviews', 'profile', 'analytics'],
      verificationLevel: 'full',
      verificationRequirements: ['phone', 'id', 'business-license', 'tax-registration', 'bank-account']
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
      dashboard: 'dashboards/provider/index.html',
      features: ['services', 'inquiries', 'orders', 'reviews', 'profile', 'portfolio'],
      verificationLevel: 'full',
      verificationRequirements: ['phone', 'id', 'business-license', 'tax-registration', 'bank-account']
    },

    PROPERTY_OWNER: {
      id: 'property-owner',
      name: 'Property Owner',
      description: 'Business property owners with full verification',
      permissions: [
        'view:properties',
        'create:properties',
        'update:own-properties',
        'delete:own-properties',
        'respond:inquiries',
        'view:own-inquiries',
        'view:own-orders'
      ],
      dashboard: 'dashboards/property-owner/index.html',
      features: ['properties', 'inquiries', 'orders', 'reviews', 'profile'],
      verificationLevel: 'full',
      verificationRequirements: ['phone', 'id', 'business-license', 'tax-registration', 'bank-account']
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
      dashboard: 'dashboards/admin/index.html',
      features: ['users', 'vendors', 'products', 'services', 'properties', 'inquiries', 'orders', 'reports', 'settings'],
      verificationLevel: 'none'
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
      verifiedAt: 'timestamp',
      verificationLevel: 'string', // 'none', 'basic', 'full'
      verificationStatus: 'string', // 'pending', 'verified', 'rejected'
      documents: {
        id: {
          uploaded: 'boolean',
          verified: 'boolean',
          url: 'string'
        },
        businessLicense: {
          uploaded: 'boolean',
          verified: 'boolean',
          url: 'string'
        },
        taxRegistration: {
          uploaded: 'boolean',
          verified: 'boolean',
          url: 'string'
        },
        bankAccount: {
          uploaded: 'boolean',
          verified: 'boolean',
          accountNumber: 'string',
          bankName: 'string'
        }
      }
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
     * Individual seller account creation (minimal verification)
     */
    createIndividualSeller: function (email, password, userData) {
      // Future implementation: Create individual seller account
      // Only requires phone and ID verification
      console.log('createIndividualSeller will be implemented when auth is integrated');
      return Promise.resolve({ success: true, userId: 'placeholder' });
    },

    /**
     * Individual landlord account creation (minimal verification)
     */
    createIndividualLandlord: function (email, password, userData) {
      // Future implementation: Create individual landlord account
      // Only requires phone and ID verification
      console.log('createIndividualLandlord will be implemented when auth is integrated');
      return Promise.resolve({ success: true, userId: 'placeholder' });
    },

    /**
     * Vendor account creation (full verification)
     */
    createVendor: function (email, password, userData) {
      // Future implementation: Create vendor account
      // Requires full business documentation
      console.log('createVendor will be implemented when auth is integrated');
      return Promise.resolve({ success: true, userId: 'placeholder' });
    },

    /**
     * Provider account creation (full verification)
     */
    createProvider: function (email, password, userData) {
      // Future implementation: Create provider account
      // Requires full business documentation
      console.log('createProvider will be implemented when auth is integrated');
      return Promise.resolve({ success: true, userId: 'placeholder' });
    },

    /**
     * Property owner account creation (full verification)
     */
    createPropertyOwner: function (email, password, userData) {
      // Future implementation: Create property owner account
      // Requires full business documentation
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
