/**
 * FURNOSTYLES — STORAGE KEYS
 * ===========================
 * File: shared/storage/storage-keys.js
 * Purpose: Centralized localStorage key constants
 *          Ensures consistency across all modules
 *
 * Usage:
 *   window.FurnostylesStorageKeys.CART
 *   window.FurnostylesStorageKeys.USER
 *   window.FurnostylesStorageKeys.ORDERS
 */

(function() {
  'use strict';

  var STORAGE_PREFIX = 'furnostyles_';

  var keys = {
    // Authentication & Session
    USER: STORAGE_PREFIX + 'user',
    SESSION: STORAGE_PREFIX + 'session',
    ROLE: STORAGE_PREFIX + 'role',
    LOCAL_USER: 'fns_local_user', // Legacy key for compatibility

    // Cart & Shopping
    CART: STORAGE_PREFIX + 'cart',
    SAVED_FOR_LATER: STORAGE_PREFIX + 'saved_later',
    CART_PREFS: STORAGE_PREFIX + 'cart_prefs',
    SHOPPING_CART: 'fns_shopping_cart', // Legacy key for compatibility

    // Orders & Checkout
    ORDERS: STORAGE_PREFIX + 'orders',
    CHECKOUT_DATA: STORAGE_PREFIX + 'checkout_data',

    // User Data
    WISHLIST: STORAGE_PREFIX + 'wishlist',
    ADDRESSES: STORAGE_PREFIX + 'addresses',
    PAYMENTS: STORAGE_PREFIX + 'payments',
    UPLOADS: STORAGE_PREFIX + 'uploads',

    // Communications
    MESSAGES: STORAGE_PREFIX + 'messages',
    ALERTS: STORAGE_PREFIX + 'alerts',
    TICKETS: STORAGE_PREFIX + 'tickets',

    // Reviews & Feedback
    REVIEWS: STORAGE_PREFIX + 'reviews',

    // Rate Limiting
    RATE_LIMIT_PREFIX: 'fns_rate_limit_',

    // UI State
    DASHBOARD_TAB: STORAGE_PREFIX + 'dashboard_tab',
    DASHBOARD_FILTER: STORAGE_PREFIX + 'dashboard_filter'
  };

  // Export API
  window.FurnostylesStorageKeys = keys;

  console.log('[StorageKeys] Storage keys module loaded');

})();
