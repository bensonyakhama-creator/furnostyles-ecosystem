/**
 * Furnostyles Listing UI
 * Reusable submission state rendering — loading, success, error.
 * Used by listing, property, and repair test pages.
 *
 * Usage:
 *   FurnostylesListingUI.showLoading(el, 'Saving...')
 *   FurnostylesListingUI.showSuccess(el, 'Saved!', { id, collection, status })
 *   FurnostylesListingUI.showError(el, 'Failed.', retryFn)
 *   FurnostylesListingUI.clearState(el)
 */

(function () {
  'use strict';

  var BASE_STYLE = [
    'border-radius:10px', 'padding:20px 22px', 'margin-top:20px',
    'font-family:inherit', 'font-size:14px'
  ].join(';');

  var ICON = {
    loading: '&#9203;',  /* ⏣ */
    success: '&#10003;', /* ✓ */
    error:   '&#9888;'   /* ⚠ */
  };

  /* ------------------------------------------------------------------ */

  function showLoading(container, message) {
    if (!container) return;
    container.innerHTML =
      '<div style="' + BASE_STYLE + ';background:#f0f4ff;border:1px solid #c8d8f5;color:#1a2540;">' +
        '<span style="font-size:22px;display:block;margin-bottom:10px;">' + ICON.loading + '</span>' +
        '<strong style="font-size:15px;">Saving\u2026</strong>' +
        '<p style="margin:6px 0 0;color:#4c5e80;">' + (message || 'Submitting to Firestore\u2026') + '</p>' +
      '</div>';
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ------------------------------------------------------------------ */

  function showSuccess(container, message, meta) {
    if (!container) return;

    var cfg = window.FurnostylesListingConfig;
    var mode = meta && meta.uploadMode === 'firebase' ? 'Firebase Storage' : 'Local mode';
    var bridgeMode = (window.FurnostylesFirebase &&
      typeof window.FurnostylesFirebase.isLive === 'function' &&
      window.FurnostylesFirebase.isLive()) ? 'Firestore (live)' : 'localStorage (local mode)';

    var rows = '';
    if (meta) {
      var fields = [
        ['Document ID',   meta.id        || '\u2014'],
        ['Collection',    meta.collection || '\u2014'],
        ['Status',        meta.status     || (cfg ? cfg.STATUS.PENDING : 'pending')],
        ['Images saved',  (meta.imageCount || 0) + ' image URL(s)'],
        ['Upload mode',   mode],
        ['Saved to',      bridgeMode]
      ];
      rows = fields.map(function (f) {
        return '<div style="display:flex;gap:10px;padding:5px 0;border-bottom:1px solid #c6ecd6;font-size:13px;">' +
          '<span style="min-width:110px;font-weight:600;color:#3c4f72;flex-shrink:0;">' + f[0] + '</span>' +
          '<span style="word-break:break-all;color:#1a2540;">' + f[1] + '</span>' +
          '</div>';
      }).join('');
    }

    container.innerHTML =
      '<div style="' + BASE_STYLE + ';background:#f0faf4;border:1px solid #b6dfc6;">' +
        '<span style="font-size:22px;color:#1a6e3a;display:block;margin-bottom:10px;">' + ICON.success + '</span>' +
        '<strong style="font-size:15px;color:#1a6e3a;">' + (message || 'Submitted successfully!') + '</strong>' +
        (rows ? '<div style="margin-top:14px;">' + rows + '</div>' : '') +
        '<p style="margin:14px 0 0;padding:10px 12px;background:#fffbea;border:1px solid #f0d890;' +
          'border-radius:6px;font-size:12px;color:#8a5d00;">' +
          '<strong>Next step (Phase 19+):</strong> Admin approval queue reads ' +
          '<code>' + (meta && meta.collection ? meta.collection : 'this collection') + '</code> ' +
          'where <code>status === &quot;pending&quot;</code> and activates approved listings.' +
        '</p>' +
      '</div>';

    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ------------------------------------------------------------------ */

  function showError(container, message, retryFn) {
    if (!container) return;

    var retryBtn = '';
    if (typeof retryFn === 'function') {
      retryBtn = '<button type="button" onclick="(window._listingRetryFn && window._listingRetryFn())" ' +
        'style="margin-top:12px;padding:9px 20px;background:#1a2540;color:#fff;border:none;' +
        'border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;">Retry</button>';
      window._listingRetryFn = retryFn;
    }

    container.innerHTML =
      '<div style="' + BASE_STYLE + ';background:#fff5f5;border:1px solid #f5c0c0;">' +
        '<span style="font-size:22px;color:#cc1a1a;display:block;margin-bottom:10px;">' + ICON.error + '</span>' +
        '<strong style="font-size:15px;color:#cc1a1a;">Submission failed</strong>' +
        '<p style="margin:6px 0 0;color:#8a2020;">' + (message || 'An error occurred. Please try again.') + '</p>' +
        retryBtn +
      '</div>';

    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ------------------------------------------------------------------ */

  function clearState(container) {
    if (!container) return;
    container.innerHTML = '';
    container.style.display = 'none';
  }

  /* ------------------------------------------------------------------ */
  /* LISTING CARD RENDERING                                               */
  /* ------------------------------------------------------------------ */

  function _esc(str) {
    return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  var STATUS_STYLE = {
    pending:  'background:#fffbea;color:#8a5d00;border:1px solid #f0d890;',
    active:   'background:#f0faf4;color:#1a6e3a;border:1px solid #b6dfc6;',
    rejected: 'background:#fff5f5;color:#cc1a1a;border:1px solid #f5c0c0;',
    archived: 'background:#f5f5f5;color:#666;border:1px solid #ddd;',
    draft:    'background:#f0f4ff;color:#0044aa;border:1px solid #c8d8f5;'
  };

  /**
   * Render a single listing card HTML string.
   * @param {Object} listing - Firestore listing document
   * @returns {string} HTML
   */
  function renderListingCard(listing) {
    var thumb    = listing.images && listing.images[0] ? listing.images[0] : null;
    var isData   = thumb && thumb.indexOf('data:') === 0;
    var status   = listing.status || 'pending';
    var sc       = STATUS_STYLE[status] || STATUS_STYLE.pending;
    var price    = listing.price ? 'KSh\u00a0' + Number(listing.price).toLocaleString() : '\u2014';
    var date     = listing.createdAt
      ? new Date(listing.createdAt).toLocaleDateString('en-KE', { year:'numeric', month:'short', day:'numeric' })
      : '\u2014';
    var imgBlock = isData
      ? '<div class="vd-card-thumb vd-card-thumb-placeholder">Preview</div>'
      : thumb
        ? '<img class="vd-card-thumb" src="' + _esc(thumb) + '" alt="' + _esc(listing.title) + '" loading="lazy">'
        : '<div class="vd-card-thumb vd-card-thumb-placeholder">\uD83D\uDCE6</div>';

    return '<div class="vd-listing-card">' +
      imgBlock +
      '<div class="vd-card-body">' +
        '<div class="vd-card-meta">' +
          '<span class="vd-card-type">' + _esc(listing.listingType || 'product') + '</span>' +
          '<span class="vd-card-status" style="' + sc + '">' + _esc(status) + '</span>' +
        '</div>' +
        '<h4 class="vd-card-title">' + _esc(listing.title || 'Untitled') + '</h4>' +
        '<p class="vd-card-sub">' +
          _esc(listing.category || '') +
          (listing.condition ? ' &middot; ' + _esc(listing.condition) : '') +
        '</p>' +
        '<div class="vd-card-footer">' +
          '<span class="vd-card-price">' + price + '</span>' +
          '<span class="vd-card-date">' + date + '</span>' +
        '</div>' +
        '<div class="vd-card-actions">' +
          '<button type="button" class="vd-btn-edit" data-listing-id="' + _esc(listing.id || '') + '">Edit</button>' +
          '<button type="button" class="vd-btn-del"  data-listing-id="' + _esc(listing.id || '') + '">Delete</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /**
   * Render a grid of listing cards into a container, or an empty-state CTA.
   * @param {Element} container
   * @param {Array}   listings
   * @param {string}  addHref - URL for the "+ Add Listing" button (default add-listing.html)
   */
  function renderListingGrid(container, listings, addHref) {
    if (!container) return;
    var href = addHref || 'add-listing.html';

    if (!listings || listings.length === 0) {
      container.innerHTML =
        '<div style="text-align:center;padding:48px 24px;color:#8090a0;">' +
          '<div style="font-size:44px;margin-bottom:12px;">\uD83D\uDCE6</div>' +
          '<p style="font-weight:700;font-size:16px;color:#1a2540;margin:0 0 6px;">No listings yet</p>' +
          '<p style="font-size:13px;margin:0 0 18px;">Add your first listing to get started.</p>' +
          '<a href="' + _esc(href) + '" style="display:inline-block;padding:10px 26px;' +
            'background:#1a2540;color:#fff;border-radius:7px;text-decoration:none;' +
            'font-weight:700;font-size:13px;">+ Add Listing</a>' +
        '</div>';
      return;
    }

    container.innerHTML =
      '<div class="vd-listings-grid">' +
        listings.map(renderListingCard).join('') +
      '</div>';
  }

  /**
   * Render a skeleton loading grid (3 placeholder cards).
   */
  function renderLoadingGrid(container) {
    if (!container) return;
    var skel = '';
    for (var i = 0; i < 3; i++) {
      skel += '<div class="vd-listing-card vd-card-skeleton">' +
        '<div class="vd-card-thumb vd-skel-block"></div>' +
        '<div class="vd-card-body">' +
          '<div class="vd-skel-line" style="width:60%;height:12px;margin-bottom:8px;"></div>' +
          '<div class="vd-skel-line" style="width:80%;height:16px;margin-bottom:8px;"></div>' +
          '<div class="vd-skel-line" style="width:45%;height:12px;"></div>' +
        '</div>' +
      '</div>';
    }
    container.innerHTML = '<div class="vd-listings-grid">' + skel + '</div>';
  }

  /* ------------------------------------------------------------------ */

  window.FurnostylesListingUI = {
    showLoading:      showLoading,
    showSuccess:      showSuccess,
    showError:        showError,
    clearState:       clearState,
    renderListingCard: renderListingCard,
    renderListingGrid: renderListingGrid,
    renderLoadingGrid: renderLoadingGrid
  };

}());
