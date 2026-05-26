/**
 * FURNOSTYLES — TOPBAR RENDERER
 * =============================
 * File: shared/layout/topbar-render.js
 * Purpose: Reads window.FurnostylesHeaderData.topbar and renders the
 *          shared topbar into #fns-topbar-mount.
 *
 * Mount point: <div id="fns-topbar-mount"></div>
 * Load after: header-data.js
 *
 * Public API:
 *   window.FurnostylesTopbar.init() — manual re-init
 */

(function () {
  'use strict';

  var _mounted = false;

  /* ============================================================
     SAFETY HELPERS
  ============================================================ */

  function safe(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function when(condition, html) {
    return condition ? (html || '') : '';
  }

  /* ============================================================
     SECTION: TOPBAR
  ============================================================ */

  function buildTopbar(data) {
    var tb = data.topbar || {};
    if (!tb.enabled) return '';
    return (
      '<div class="fns-topbar">' +
        '<div class="fns-topbar-brand">' +
          '<span class="fns-topbar-brand-name">' + safe(tb.brandName || 'FURNOSTYLES') + '</span>' +
          '<span class="fns-topbar-tagline">' + safe(tb.tagline || 'Personal Luxury. Elevated.') + '</span>' +
        '</div>' +
        '<div class="fns-topbar-message">' +
          '<span>🚚 Delivery to all parts in Kenya | going beyond kenyan borders soon</span>' +
        '</div>' +
        '<div class="fns-topbar-contact">' +
          '<a href="tel:' + safe(tb.phone || '') + '" class="fns-topbar-link">' + safe(tb.phone || '') + '</a>' +
          '<span class="fns-topbar-separator">|</span>' +
          '<a href="mailto:' + safe(tb.email || '') + '" class="fns-topbar-link">' + safe(tb.email || '') + '</a>' +
        '</div>' +
      '</div>'
    );
  }

  /* ============================================================
     MOUNT — inject topbar into page
  ============================================================ */

  function mount() {
    var data = window.FurnostylesHeaderData;
    if (!data) {
      console.warn('[FurnostylesTopbar] header-data.js must be loaded before topbar-render.js.');
      return;
    }

    var html = buildTopbar(data);
    var mountPoint = document.getElementById('fns-topbar-mount');

    if (mountPoint) {
      mountPoint.innerHTML = html;
    } else {
      document.body.insertAdjacentHTML('afterbegin', '<div id="fns-topbar-mount">' + html + '</div>');
    }

    _mounted = true;
  }

  /* ============================================================
     PUBLIC API
  ============================================================ */

  window.FurnostylesTopbar = {
    init: mount
  };

  /* Auto-init — runs immediately if DOM is ready, otherwise waits */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

}());
