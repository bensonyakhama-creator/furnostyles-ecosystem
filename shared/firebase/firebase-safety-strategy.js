/**
 * FURNOSTYLES — FIREBASE SAFETY STRATEGY
 * ==========================================
 * File: shared/firebase/firebase-safety-strategy.js
 * Purpose: Centralized Firebase safety strategy ensuring single initialization point,
 *          reusable services, centralized auth, reusable rendering systems, and
 *          reusable data-fetch systems.
 * 
 * This file DOES NOT implement Firebase operations.
 * It only defines the safety strategy and structure for Firebase integration.
 * 
 * Load order: After firebase-init.js
 * 
 * Usage: This strategy will be used when Firebase is integrated
 */

(function () {
  'use strict';

  /**
   * SINGLE INITIALIZATION POINT STRATEGY
   * Ensures Firebase is initialized only once
   */
  var SingleInitializationPointStrategy = {
    /**
     * Initialization state
     */
    state: {
      initialized: false,
      initializing: false,
      initCount: 0
    },
    
    /**
     * Check if Firebase is initialized
     */
    isInitialized: function () {
      return window.FurnostylesFirebaseInit && window.FurnostylesFirebaseInit.isInitialized();
    },
    
    /**
     * Get Firebase initialization status
     */
    getInitStatus: function () {
      return {
        initialized: this.state.initialized,
        initializing: this.state.initializing,
        initCount: this.state.initCount
      };
    },
    
    /**
     * Prevent multiple initializations
     */
    preventMultipleInit: function () {
      if (this.state.initializing) {
        console.warn('[FirebaseSafety] Initialization already in progress. Waiting...');
        return false;
      }
      
      if (this.state.initialized) {
        console.warn('[FirebaseSafety] Firebase already initialized. Skipping...');
        return false;
      }
      
      this.state.initializing = true;
      this.state.initCount++;
      return true;
    }
  };

  /**
   * REUSABLE SERVICES STRATEGY
   * Ensures all Firebase operations use centralized services
   */
  var ReusableServicesStrategy = {
    /**
     * Available services
     */
    services: {
      auth: 'FurnostylesAuthService',
      firestore: 'FurnostylesFirestoreService',
      storage: 'FurnostylesStorageService'
    },
    
    /**
     * Get service instance
     */
    getService: function (serviceName) {
      var serviceGlobal = window[this.services[serviceName]];
      if (!serviceGlobal) {
        console.error('[FirebaseSafety] Service not found:', serviceName);
        return null;
      }
      return serviceGlobal;
    },
    
    /**
     * Validate service usage
     */
    validateServiceUsage: function (serviceName, methodName) {
      var service = this.getService(serviceName);
      if (!service) return false;
      
      if (typeof service[methodName] !== 'function') {
        console.error('[FirebaseSafety] Method not found:', serviceName + '.' + methodName);
        return false;
      }
      
      return true;
    },
    
    /**
     * Log service usage for debugging
     */
    logServiceUsage: function (serviceName, methodName) {
      console.log('[FirebaseSafety] Service usage:', serviceName + '.' + methodName);
    }
  };

  /**
   * CENTRALIZED AUTH STRATEGY
   * Ensures all authentication uses centralized auth service
   */
  var CentralizedAuthStrategy = {
    /**
     * Auth service reference
     */
    authService: 'FurnostylesAuthService',
    
    /**
     * Get auth service
     */
    getAuthService: function () {
      return window[this.authService];
    },
    
    /**
     * Validate auth operation
     */
    validateAuthOperation: function (operation) {
      var authService = this.getAuthService();
      if (!authService) {
        console.error('[FirebaseSafety] Auth service not available');
        return false;
      }
      
      if (typeof authService[operation] !== 'function') {
        console.error('[FirebaseSafety] Auth operation not found:', operation);
        return false;
      }
      
      return true;
    },
    
    /**
     * Prevent direct Firebase Auth calls
     */
    preventDirectAuthCalls: function () {
      // Monitor for direct Firebase Auth calls
      if (window.firebase && window.firebase.auth) {
        console.warn('[FirebaseSafety] Direct Firebase Auth calls detected. Use FurnostylesAuthService instead.');
      }
    }
  };

  /**
   * REUSABLE RENDERING SYSTEMS STRATEGY
   * Ensures all rendering uses centralized rendering systems
   */
  var ReusableRenderingSystemsStrategy = {
    /**
     * Available rendering systems
     */
    renderingSystems: {
      components: 'FurnostylesComponentHooks',
      marketplace: 'FurnostylesMarketplaceRenderingArchitecture'
    },
    
    /**
     * Get rendering system
     */
    getRenderingSystem: function (systemName) {
      return window[this.renderingSystems[systemName]];
    },
    
    /**
     * Validate rendering operation
     */
    validateRenderingOperation: function (systemName, methodName) {
      var system = this.getRenderingSystem(systemName);
      if (!system) {
        console.error('[FirebaseSafety] Rendering system not found:', systemName);
        return false;
      }
      
      if (typeof system[methodName] !== 'function') {
        console.error('[FirebaseSafety] Rendering operation not found:', systemName + '.' + methodName);
        return false;
      }
      
      return true;
    },
    
    /**
     * Centralized rendering hooks
     */
    renderingHooks: {
      beforeRender: function (data) {
        console.log('[FirebaseSafety] Before render hook');
        return data;
      },
      afterRender: function (element) {
        console.log('[FirebaseSafety] After render hook');
        return element;
      },
      onError: function (error) {
        console.error('[FirebaseSafety] Rendering error:', error);
        return error;
      }
    }
  };

  /**
   * REUSABLE DATA-FETCH SYSTEMS STRATEGY
   * Ensures all data fetching uses centralized data-fetch systems
   */
  var ReusableDataFetchSystemsStrategy = {
    /**
     * Available data-fetch systems
     */
    dataFetchSystems: {
      firestore: 'FurnostylesFirestoreService',
      schemas: 'FurnostylesDataSchemas',
      architecture: 'FurnostylesVendorProductArchitecture'
    },
    
    /**
     * Get data-fetch system
     */
    getDataFetchSystem: function (systemName) {
      return window[this.dataFetchSystems[systemName]];
    },
    
    /**
     * Validate data-fetch operation
     */
    validateDataFetchOperation: function (systemName, methodName) {
      var system = this.getDataFetchSystem(systemName);
      if (!system) {
        console.error('[FirebaseSafety] Data-fetch system not found:', systemName);
        return false;
      }
      
      if (typeof system[methodName] !== 'function') {
        console.error('[FirebaseSafety] Data-fetch operation not found:', systemName + '.' + methodName);
        return false;
      }
      
      return true;
    },
    
    /**
     * Centralized data-fetch hooks
     */
    dataFetchHooks: {
      beforeFetch: function (query) {
        console.log('[FirebaseSafety] Before fetch hook');
        return query;
      },
      afterFetch: function (data) {
        console.log('[FirebaseSafety] After fetch hook');
        return data;
      },
      onError: function (error) {
        console.error('[FirebaseSafety] Data-fetch error:', error);
        return error;
      }
    },
    
    /**
     * Data sanitization
     */
    sanitizeData: function (data) {
      if (typeof data === 'string') {
        return data
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }
      if (typeof data === 'object' && data !== null) {
        var sanitized = {};
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            sanitized[key] = this.sanitizeData(data[key]);
          }
        }
        return sanitized;
      }
      return data;
    }
  };

  /**
   * ERROR HANDLING STRATEGY
   * Centralized error handling for Firebase operations
   */
  var ErrorHandlingStrategy = {
    /**
     * Error types
     */
    errorTypes: {
      INIT_ERROR: 'INIT_ERROR',
      AUTH_ERROR: 'AUTH_ERROR',
      FIRESTORE_ERROR: 'FIRESTORE_ERROR',
      STORAGE_ERROR: 'STORAGE_ERROR',
      NETWORK_ERROR: 'NETWORK_ERROR',
      PERMISSION_ERROR: 'PERMISSION_ERROR'
    },
    
    /**
     * Handle Firebase error
     */
    handleFirebaseError: function (error, context) {
      console.error('[FirebaseSafety] Firebase error in', context, ':', error);
      
      // Log error for debugging
      var errorInfo = {
        type: this.getErrorType(error),
        message: error.message,
        code: error.code,
        context: context,
        timestamp: new Date().toISOString()
      };
      
      return errorInfo;
    },
    
    /**
     * Get error type
     */
    getErrorType: function (error) {
      if (!error || !error.code) return 'UNKNOWN_ERROR';
      
      if (error.code.startsWith('auth/')) return this.errorTypes.AUTH_ERROR;
      if (error.code.startsWith('firestore/')) return this.errorTypes.FIRESTORE_ERROR;
      if (error.code.startsWith('storage/')) return this.errorTypes.STORAGE_ERROR;
      if (error.code === 'unavailable' || error.code === 'network-request-failed') {
        return this.errorTypes.NETWORK_ERROR;
      }
      if (error.code === 'permission-denied') return this.errorTypes.PERMISSION_ERROR;
      
      return 'UNKNOWN_ERROR';
    },
    
    /**
     * User-friendly error message
     */
    getUserFriendlyMessage: function (error) {
      var errorType = this.getErrorType(error);
      
      var messages = {
        'AUTH_ERROR': 'Authentication error. Please sign in again.',
        'FIRESTORE_ERROR': 'Database error. Please try again.',
        'STORAGE_ERROR': 'File storage error. Please try again.',
        'NETWORK_ERROR': 'Network error. Please check your connection.',
        'PERMISSION_ERROR': 'You don\'t have permission to perform this action.',
        'UNKNOWN_ERROR': 'An error occurred. Please try again.'
      };
      
      return messages[errorType] || messages['UNKNOWN_ERROR'];
    }
  };

  /**
   * EXPORT FIREBASE SAFETY STRATEGY
   */
  window.FurnostylesFirebaseSafetyStrategy = {
    SingleInitializationPointStrategy: SingleInitializationPointStrategy,
    ReusableServicesStrategy: ReusableServicesStrategy,
    CentralizedAuthStrategy: CentralizedAuthStrategy,
    ReusableRenderingSystemsStrategy: ReusableRenderingSystemsStrategy,
    ReusableDataFetchSystemsStrategy: ReusableDataFetchSystemsStrategy,
    ErrorHandlingStrategy: ErrorHandlingStrategy
  };

}());
