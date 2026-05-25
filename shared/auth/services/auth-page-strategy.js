/**
 * FURNOSTYLES — AUTH PAGE STRATEGY
 * =================================
 * File: shared/auth/services/auth-page-strategy.js
 * Purpose: Centralized auth page strategy for login, signup, forgot password,
 *          email verification, onboarding, and role selection.
 * 
 * This file DOES NOT implement auth pages.
 * It only defines the strategy and structure for future auth pages.
 * 
 * Load order: After account-architecture.js
 * 
 * Usage: This strategy will be used when auth pages are implemented
 */

(function () {
  'use strict';

  /**
   * AUTH PAGE DEFINITIONS
   * Centralized auth page definitions
   */
  var AuthPageDefinitions = {
    login: {
      path: 'accounts/login.html',
      title: 'Sign In',
      description: 'Sign in to your Furnostyles account',
      type: 'public',
      requiredFields: ['email', 'password'],
      optionalFields: ['remember-me'],
      redirectAfter: 'dashboard',
      redirectParam: 'redirect'
    },
    
    signup: {
      path: 'accounts/signup.html',
      title: 'Create Account',
      description: 'Create a new Furnostyles account',
      type: 'public',
      requiredFields: ['name', 'email', 'password', 'confirm-password'],
      optionalFields: ['role-selection'],
      redirectAfter: 'onboarding',
      redirectParam: null
    },
    
    forgotPassword: {
      path: 'accounts/forgot-password.html',
      title: 'Forgot Password',
      description: 'Reset your Furnostyles password',
      type: 'public',
      requiredFields: ['email'],
      optionalFields: [],
      redirectAfter: 'login',
      redirectParam: null
    },
    
    resetPassword: {
      path: 'accounts/reset-password.html',
      title: 'Reset Password',
      description: 'Set your new password',
      type: 'public',
      requiredFields: ['password', 'confirm-password'],
      optionalFields: [],
      redirectAfter: 'login',
      redirectParam: null
    },
    
    emailVerification: {
      path: 'accounts/verify-email.html',
      title: 'Verify Email',
      description: 'Verify your email address',
      type: 'protected',
      requiredFields: [],
      optionalFields: [],
      redirectAfter: 'dashboard',
      redirectParam: null
    },
    
    onboarding: {
      path: 'accounts/onboarding.html',
      title: 'Complete Your Profile',
      description: 'Complete your profile to get started',
      type: 'protected',
      requiredFields: ['role-selection'],
      optionalFields: ['company-name', 'phone', 'location', 'bio'],
      redirectAfter: 'dashboard',
      redirectParam: null
    },
    
    roleSelection: {
      path: 'accounts/role-selection.html',
      title: 'Select Your Role',
      description: 'Choose how you want to use Furnostyles',
      type: 'protected',
      requiredFields: ['role'],
      optionalFields: [],
      redirectAfter: 'onboarding',
      redirectParam: null
    }
  };

  /**
   * AUTH PAGE FLOW STRATEGY
   * Centralized auth page flow strategy
   */
  var AuthPageFlowStrategy = {
    /**
     * Standard auth flow
     */
    standardFlow: [
      'signup',
      'emailVerification',
      'onboarding',
      'roleSelection',
      'dashboard'
    ],
    
    /**
     * Login flow
     */
    loginFlow: [
      'login',
      'dashboard'
    ],
    
    /**
     * Password reset flow
     */
    passwordResetFlow: [
      'forgotPassword',
      'emailVerification',
      'resetPassword',
      'login',
      'dashboard'
    ],
    
    /**
     * Get next page in flow
     */
    getNextPage: function (currentPage, flowType) {
      var flow = this[flowType + 'Flow'];
      if (!flow) return null;
      
      var currentIndex = flow.indexOf(currentPage);
      if (currentIndex === -1) return flow[0];
      
      var nextIndex = currentIndex + 1;
      if (nextIndex >= flow.length) return null;
      
      return flow[nextIndex];
    },
    
    /**
     * Get previous page in flow
     */
    getPreviousPage: function (currentPage, flowType) {
      var flow = this[flowType + 'Flow'];
      if (!flow) return null;
      
      var currentIndex = flow.indexOf(currentPage);
      if (currentIndex === -1) return null;
      
      var previousIndex = currentIndex - 1;
      if (previousIndex < 0) return null;
      
      return flow[previousIndex];
    }
  };

  /**
   * AUTH PAGE VALIDATION STRATEGY
   * Centralized validation strategy for auth pages
   */
  var AuthPageValidationStrategy = {
    /**
     * Validate login form
     */
    validateLoginForm: function (formData) {
      var errors = [];
      
      if (!formData.email) {
        errors.push('Email is required');
      } else if (!this.validateEmail(formData.email)) {
        errors.push('Invalid email format');
      }
      
      if (!formData.password) {
        errors.push('Password is required');
      }
      
      return {
        valid: errors.length === 0,
        errors: errors
      };
    },
    
    /**
     * Validate signup form
     */
    validateSignupForm: function (formData) {
      var errors = [];
      
      if (!formData.name) {
        errors.push('Name is required');
      }
      
      if (!formData.email) {
        errors.push('Email is required');
      } else if (!this.validateEmail(formData.email)) {
        errors.push('Invalid email format');
      }
      
      if (!formData.password) {
        errors.push('Password is required');
      } else if (!this.validatePassword(formData.password)) {
        errors.push('Password must be at least 8 characters');
      }
      
      if (formData.password !== formData['confirm-password']) {
        errors.push('Passwords do not match');
      }
      
      return {
        valid: errors.length === 0,
        errors: errors
      };
    },
    
    /**
     * Validate email format
     */
    validateEmail: function (email) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    
    /**
     * Validate password strength
     */
    validatePassword: function (password) {
      return password && password.length >= 8;
    }
  };

  /**
   * AUTH PAGE REDIRECT STRATEGY
   * Centralized redirect strategy for auth pages
   */
  var AuthPageRedirectStrategy = {
    /**
     * Get redirect URL after auth action
     */
    getRedirectUrl: function (page, userRole, redirectParam) {
      var pageConfig = AuthPageDefinitions[page];
      if (!pageConfig) return null;
      
      if (redirectParam && this.validateRedirectUrl(redirectParam)) {
        return redirectParam;
      }
      
      var redirectTarget = pageConfig.redirectAfter;
      
      if (redirectTarget === 'dashboard') {
        if (userRole === 'admin') return 'admin/dashboard.html';
        if (userRole === 'vendor') return 'vendor/dashboard.html';
        if (userRole === 'provider') return 'provider/dashboard.html';
        if (userRole === 'property-owner') return 'property-owner/dashboard.html';
        return 'client/dashboard.html';
      }
      
      if (redirectTarget === 'onboarding') {
        return 'accounts/onboarding.html';
      }
      
      if (redirectTarget === 'login') {
        return 'accounts/login.html';
      }
      
      return 'index.html';
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
      
      return true;
    }
  };

  /**
   * EXPORT AUTH PAGE STRATEGY
   */
  window.FurnostylesAuthPageStrategy = {
    AuthPageDefinitions: AuthPageDefinitions,
    AuthPageFlowStrategy: AuthPageFlowStrategy,
    AuthPageValidationStrategy: AuthPageValidationStrategy,
    AuthPageRedirectStrategy: AuthPageRedirectStrategy
  };

}());
