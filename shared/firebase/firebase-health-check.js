/**
 * FURNOSTYLES — FIREBASE HEALTH CHECK
 * ===================================
 * File: shared/firebase/firebase-health-check.js
 *
 * PURPOSE:
 *   Provides a simple health-check function to verify that Firebase
 *   (or the local bridge) is loaded and ready for use.
 *
 * USAGE:
 *   window.FurnostylesHealthCheck.run()
 *     → Returns a Promise that resolves with a health report object.
 *
 * HEALTH REPORT STRUCTURE:
 *   {
 *     status: 'ok' | 'degraded' | 'failed',
 *     mode: 'local' | 'firebase',
 *     config: { hasConfig: boolean, isPlaceholder: boolean },
 *     sdk: { loaded: boolean },
 *     services: {
 *       app: { ready: boolean },
 *       db: { ready: boolean },
 *       auth: { ready: boolean },
 *       storage: { ready: boolean }
 *     },
 *     timestamp: ISO string
 *   }
 *
 * LOAD ORDER:
 *   After firebase-config.js and firebase-bridge.js
 */

(function () {
  'use strict';

  function runHealthCheck() {
    var report = {
      status: 'failed',
      mode: 'unknown',
      config: { hasConfig: false, isPlaceholder: true },
      sdk: { loaded: false },
      services: {
        app: { ready: false },
        db: { ready: false },
        auth: { ready: false },
        storage: { ready: false }
      },
      timestamp: new Date().toISOString()
    };

    /* Check config */
    var cfg = window.FURNOSTYLES_FIREBASE_CONFIG;
    report.config.hasConfig = !!(cfg && cfg.apiKey);
    report.config.isPlaceholder = !report.config.hasConfig ||
      (cfg.apiKey && (
        cfg.apiKey.indexOf('PASTE') === 0 ||
        cfg.apiKey.indexOf('AIzaSyXXX') === 0 ||
        cfg.apiKey.length < 20
      ));

    /* Check SDK */
    report.sdk.loaded = (typeof firebase !== 'undefined' &&
                         typeof firebase.initializeApp === 'function');

    /* Check bridge mode */
    if (window.FurnostylesFirebase) {
      report.mode = window.FurnostylesFirebase.mode || 'unknown';
    }

    /* Check services */
    var fb = window.FurnostylesFirebase;
    if (fb) {
      report.services.app.ready = !!(fb.app);
      report.services.db.ready = !!(fb.db);
      report.services.auth.ready = !!(fb.auth);
      report.services.storage.ready = !!(fb.storage);
    }

    /* Determine overall status */
    if (report.mode === 'firebase') {
      /* Firebase mode: all services should be ready */
      var allReady = report.services.app.ready &&
                     report.services.db.ready &&
                     report.services.auth.ready &&
                     report.services.storage.ready;
      report.status = allReady ? 'ok' : 'degraded';
    } else if (report.mode === 'local') {
      /* Local mode: no real services needed, always ok */
      report.status = 'ok';
    } else {
      /* Unknown or failed */
      report.status = 'failed';
    }

    return Promise.resolve(report);
  }

  /**
   * Export health check API
   */
  window.FurnostylesHealthCheck = {
    run: runHealthCheck
  };

}());
