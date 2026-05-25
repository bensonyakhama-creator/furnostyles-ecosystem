/**
 * FURNOSTYLES — LAYOUT-LOADER.JS
 * ================================
 * File: assets/js/layout-loader.js
 * Purpose: Triggers header-render.js and footer-render.js to mount
 *          their components after the DOM is ready.
 *          Also wires shared header events (cart open, account panel, search).
 *
 * Depends on: header-render.js, footer-render.js
 * No external libraries. Vanilla JS only.
 */

(function () {
  'use strict';

  function init() {
    // Trigger header render if available
    if (typeof window.FurnostylesHeader === 'object' && typeof window.FurnostylesHeader.init === 'function') {
      window.FurnostylesHeader.init();
    }

    // Trigger footer render if available
    if (typeof window.FurnostylesFooter === 'object' && typeof window.FurnostylesFooter.init === 'function') {
      window.FurnostylesFooter.init();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
