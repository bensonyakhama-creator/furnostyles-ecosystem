/**
 * FURNOSTYLES — FIREBASE CONFIG
 * ==============================
 * File: shared/firebase/firebase-config.js
 * Purpose: Exposes Firebase project credentials as window.FURNOSTYLES_FIREBASE_CONFIG.
 *          Loads configuration from environment variables or falls back to placeholder values.
 *          When placeholders are present, firebase-bridge.js runs in local (localStorage) mode.
 *
 * IMPORTANT: Real API keys should be set via environment variables in .env file.
 *           The .env file is gitignored and not committed to version control.
 *           DO NOT commit real API keys to version control.
 */

(function() {
  'use strict';

  // Try to load from environment variables (for build-time injection)
  // In production, these would be replaced by build process
  var envConfig = {
    apiKey: typeof FIREBASE_API_KEY !== 'undefined' ? FIREBASE_API_KEY : '',
    authDomain: typeof FIREBASE_AUTH_DOMAIN !== 'undefined' ? FIREBASE_AUTH_DOMAIN : '',
    projectId: typeof FIREBASE_PROJECT_ID !== 'undefined' ? FIREBASE_PROJECT_ID : '',
    storageBucket: typeof FIREBASE_STORAGE_BUCKET !== 'undefined' ? FIREBASE_STORAGE_BUCKET : '',
    messagingSenderId: typeof FIREBASE_MESSAGING_SENDER_ID !== 'undefined' ? FIREBASE_MESSAGING_SENDER_ID : '',
    appId: typeof FIREBASE_APP_ID !== 'undefined' ? FIREBASE_APP_ID : '',
    measurementId: typeof FIREBASE_MEASUREMENT_ID !== 'undefined' ? FIREBASE_MEASUREMENT_ID : ''
  };

  // Check if we have real config (not empty/placeholder)
  var hasRealConfig = envConfig.apiKey && 
                      envConfig.apiKey.length > 20 && 
                      envConfig.apiKey.indexOf('PASTE') !== 0 &&
                      envConfig.apiKey.indexOf('your_') !== 0;

  // If no real config from env, use placeholder to trigger local mode
  if (!hasRealConfig) {
    console.warn('[Firebase Config] No real Firebase config found. Running in LOCAL mode.');
    window.FURNOSTYLES_FIREBASE_CONFIG = {
      apiKey: 'PLACEHOLDER_KEY',
      authDomain: 'placeholder.firebaseapp.com',
      projectId: 'placeholder-project',
      storageBucket: 'placeholder.appspot.com',
      messagingSenderId: '000000000000',
      appId: '1:000000000000:web:0000000000000000',
      measurementId: 'G-PLACEHOLDER'
    };
  } else {
    window.FURNOSTYLES_FIREBASE_CONFIG = envConfig;
    console.log('[Firebase Config] Firebase config loaded from environment variables.');
  }

})();
