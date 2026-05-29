/**
 * FURNOSTYLES — PAYMENT CONFIGURATION
 * ===================================
 * File: shared/payment/payment-config.js
 * Purpose: Centralized payment gateway configuration
 *          Supports multiple payment providers (Stripe, PayPal, M-Pesa)
 *
 * Environment Variables Required:
 * - STRIPE_PUBLIC_KEY
 * - STRIPE_SECRET_KEY
 * - PAYPAL_CLIENT_ID
 * - PAYPAL_SECRET
 * - MPESA_CONSUMER_KEY
 * - MPESA_CONSUMER_SECRET
 * - MPESA_PASSKEY
 *
 * Usage:
 *   window.FurnostylesPaymentConfig.getProvider('stripe')
 *   window.FurnostylesPaymentConfig.isProviderEnabled('mpesa')
 */

(function() {
  'use strict';

  /* ============================================================
     PAYMENT PROVIDER CONFIGURATIONS
     ============================================================ */

  var providers = {
    stripe: {
      name: 'Stripe',
      enabled: false,
      publicKey: null,
      secretKey: null,
      webhookSecret: null,
      currency: 'KES',
      locale: 'en-KE',
      apiVersion: '2023-10-16'
    },
    paypal: {
      name: 'PayPal',
      enabled: false,
      clientId: null,
      secret: null,
      mode: 'sandbox', // 'sandbox' or 'live'
      currency: 'KES',
      locale: 'en-KE'
    },
    mpesa: {
      name: 'M-Pesa',
      enabled: false,
      consumerKey: null,
      consumerSecret: null,
      passkey: null,
      shortcode: null,
      environment: 'sandbox', // 'sandbox' or 'production'
      currency: 'KES'
    },
    card: {
      name: 'Card Payment',
      enabled: false,
      gateway: 'stripe', // Uses Stripe as default
      currency: 'KES'
    }
  };

  /* ============================================================
     LOAD CONFIGURATION FROM ENVIRONMENT
     ============================================================ */

  function loadConfiguration() {
    // Stripe configuration
    if (typeof STRIPE_PUBLIC_KEY !== 'undefined') {
      providers.stripe.publicKey = STRIPE_PUBLIC_KEY;
      providers.stripe.enabled = true;
    }
    if (typeof STRIPE_SECRET_KEY !== 'undefined') {
      providers.stripe.secretKey = STRIPE_SECRET_KEY;
    }
    if (typeof STRIPE_WEBHOOK_SECRET !== 'undefined') {
      providers.stripe.webhookSecret = STRIPE_WEBHOOK_SECRET;
    }

    // PayPal configuration
    if (typeof PAYPAL_CLIENT_ID !== 'undefined') {
      providers.paypal.clientId = PAYPAL_CLIENT_ID;
      providers.paypal.enabled = true;
    }
    if (typeof PAYPAL_SECRET !== 'undefined') {
      providers.paypal.secret = PAYPAL_SECRET;
    }
    if (typeof PAYPAL_MODE !== 'undefined') {
      providers.paypal.mode = PAYPAL_MODE;
    }

    // M-Pesa configuration
    if (typeof MPESA_CONSUMER_KEY !== 'undefined') {
      providers.mpesa.consumerKey = MPESA_CONSUMER_KEY;
      providers.mpesa.enabled = true;
    }
    if (typeof MPESA_CONSUMER_SECRET !== 'undefined') {
      providers.mpesa.consumerSecret = MPESA_CONSUMER_SECRET;
    }
    if (typeof MPESA_PASSKEY !== 'undefined') {
      providers.mpesa.passkey = MPESA_PASSKEY;
    }
    if (typeof MPESA_SHORTCODE !== 'undefined') {
      providers.mpesa.shortcode = MPESA_SHORTCODE;
    }
    if (typeof MPESA_ENVIRONMENT !== 'undefined') {
      providers.mpesa.environment = MPESA_ENVIRONMENT;
    }

    // Enable card payment if Stripe is enabled
    if (providers.stripe.enabled) {
      providers.card.enabled = true;
    }
  }

  /* ============================================================
     PUBLIC API
     ============================================================ */

  /**
   * Get provider configuration
   * @param {string} providerId - Provider ID (stripe, paypal, mpesa, card)
   * @returns {object|null} - Provider configuration or null
   */
  function getProvider(providerId) {
    return providers[providerId] || null;
  }

  /**
   * Check if provider is enabled
   * @param {string} providerId - Provider ID
   * @returns {boolean} - True if enabled
   */
  function isProviderEnabled(providerId) {
    var provider = providers[providerId];
    return provider ? provider.enabled : false;
  }

  /**
   * Get all enabled providers
   * @returns {Array} - Array of enabled provider IDs
   */
  function getEnabledProviders() {
    return Object.keys(providers).filter(function(id) {
      return providers[id].enabled;
    });
  }

  /**
   * Get default provider
   * @returns {string|null} - Default provider ID
   */
  function getDefaultProvider() {
    // Priority: M-Pesa (Kenya), Stripe, PayPal
    if (providers.mpesa.enabled) return 'mpesa';
    if (providers.stripe.enabled) return 'stripe';
    if (providers.paypal.enabled) return 'paypal';
    return null;
  }

  /**
   * Set provider configuration (for testing)
   * @param {string} providerId - Provider ID
   * @param {object} config - Configuration object
   */
  function setProviderConfig(providerId, config) {
    if (providers[providerId]) {
      providers[providerId] = Object.assign(providers[providerId], config);
    }
  }

  /**
   * Get supported currencies for a provider
   * @param {string} providerId - Provider ID
   * @returns {string} - Currency code
   */
  function getCurrency(providerId) {
    var provider = providers[providerId];
    return provider ? provider.currency : 'KES';
  }

  /**
   * Validate provider configuration
   * @param {string} providerId - Provider ID
   * @returns {object} - { valid: boolean, errors: Array }
   */
  function validateProvider(providerId) {
    var provider = providers[providerId];
    if (!provider) {
      return { valid: false, errors: ['Provider not found'] };
    }

    var errors = [];

    switch (providerId) {
      case 'stripe':
        if (!provider.publicKey) errors.push('Stripe public key is required');
        if (!provider.secretKey) errors.push('Stripe secret key is required');
        break;
      case 'paypal':
        if (!provider.clientId) errors.push('PayPal client ID is required');
        if (!provider.secret) errors.push('PayPal secret is required');
        break;
      case 'mpesa':
        if (!provider.consumerKey) errors.push('M-Pesa consumer key is required');
        if (!provider.consumerSecret) errors.push('M-Pesa consumer secret is required');
        if (!provider.passkey) errors.push('M-Pesa passkey is required');
        if (!provider.shortcode) errors.push('M-Pesa shortcode is required');
        break;
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  // Load configuration on module load
  loadConfiguration();

  // Export API
  window.FurnostylesPaymentConfig = {
    getProvider: getProvider,
    isProviderEnabled: isProviderEnabled,
    getEnabledProviders: getEnabledProviders,
    getDefaultProvider: getDefaultProvider,
    setProviderConfig: setProviderConfig,
    getCurrency: getCurrency,
    validateProvider: validateProvider,
    
    // Configuration object (read-only)
    providers: providers
  };

  console.log('[PaymentConfig] Payment configuration module loaded');
  console.log('[PaymentConfig] Enabled providers:', getEnabledProviders());

})();
