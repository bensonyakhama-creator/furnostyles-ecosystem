/**
 * Furnostyles Marketplace Renderer
 * Renders approved product/listing cards for public marketplace pages.
 * Does NOT expose vendorId or vendorRole.
 *
 * Load order: public-filter.js → marketplace-renderer.js
 */

(function () {
  'use strict';

  function _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function _price(val) {
    if (!val && val !== 0) return '';
    return 'KSh\u00a0' + Number(val).toLocaleString();
  }

  function _imgBlock(listing) {
    var thumb  = listing.images && listing.images[0] ? listing.images[0] : null;
    var isData = thumb && thumb.indexOf('data:') === 0;
    if (thumb && !isData) {
      return '<img class="mp-card-img" src="' + _esc(thumb) + '" alt="' + _esc(listing.title) + '" loading="lazy">';
    }
    var icons = {
      furniture:  '\uD83D\uDECB',
      material:   '\uD83E\uDDF1',
      sourcing:   '\uD83C\uDF0D',
      secondhand: '\u267B',
      product:    '\uD83D\uDCE6'
    };
    return '<div class="mp-card-img-placeholder">' +
      (icons[listing.listingType] || icons.product) +
      '</div>';
  }

  function _typeLabel(type) {
    var labels = {
      furniture:  'Furniture',
      material:   'Material',
      sourcing:   'Sourcing',
      secondhand: 'Secondhand',
      product:    'Product'
    };
    return labels[type] || type || 'Listing';
  }

  /**
   * Build HTML for a single listing card.
   * Links to listing-detail.html?id={id} for future detail page.
   */
  function renderCard(listing) {
    var id    = listing.id || '';
    var price = _price(listing.price);
    var cat   = listing.category || '';
    var cond  = listing.condition ? '\u00b7 ' + listing.condition : '';
    var loc   = listing.location ? '\uD83D\uDCCD\u00a0' + listing.location : '';
    var desc  = listing.description
      ? String(listing.description).substring(0, 90) + (listing.description.length > 90 ? '\u2026' : '')
      : '';
    var detailHref = 'product-detail.html?id=' + encodeURIComponent(id);

    return '<a class="mp-card" href="' + _esc(detailHref) + '" aria-label="' + _esc(listing.title || 'Listing') + '">' +
      '<div class="mp-card-img-wrap">' +
        _imgBlock(listing) +
        '<span class="mp-badge mp-badge-type">' + _esc(_typeLabel(listing.listingType)) + '</span>' +
        /* featured badge placeholder — will be populated by admin feature flag */
        (listing.featured ? '<span class="mp-badge mp-badge-featured">Featured</span>' : '') +
      '</div>' +
      '<div class="mp-card-body">' +
        '<h3 class="mp-card-title">' + _esc(listing.title || 'Untitled') + '</h3>' +
        (cat ? '<p class="mp-card-cat">' + _esc(cat) + (cond ? ' ' + cond : '') + '</p>' : '') +
        (price ? '<p class="mp-card-price">' + price + '</p>' : '') +
        (loc ? '<p class="mp-card-location">' + loc + '</p>' : '') +
        (desc ? '<p class="mp-card-desc">' + _esc(desc) + '</p>' : '') +
        '<span class="mp-card-cta">View Details &rarr;</span>' +
      '</div>' +
    '</a>';
  }

  /**
   * Render a loading skeleton grid (n placeholder cards).
   */
  function renderLoadingGrid(container, count) {
    if (!container) return;
    var n = count || 6;
    var skel = '';
    for (var i = 0; i < n; i++) {
      skel +=
        '<div class="mp-card">' +
          '<div class="mp-skel-img"></div>' +
          '<div class="mp-card-body">' +
            '<span class="mp-skel-line" style="width:70%;"></span>' +
            '<span class="mp-skel-line" style="width:45%;"></span>' +
            '<span class="mp-skel-line" style="width:55%;height:20px;"></span>' +
            '<span class="mp-skel-line" style="width:40%;"></span>' +
          '</div>' +
        '</div>';
    }
    container.innerHTML = '<div class="mp-grid">' + skel + '</div>';
  }

  /**
   * Render the full grid. Empty state if no items.
   */
  function renderGrid(container, listings) {
    if (!container) return;
    if (!listings || listings.length === 0) {
      container.innerHTML =
        '<div class="mp-empty">' +
          '<div class="mp-empty-icon">\uD83D\uDCE6</div>' +
          '<p class="mp-empty-title">No listings yet</p>' +
          '<p class="mp-empty-sub">Check back soon \u2014 new items are reviewed and added regularly.</p>' +
        '</div>';
      return;
    }
    container.innerHTML = '<div class="mp-grid">' + listings.map(renderCard).join('') + '</div>';
  }

  /** Render error state */
  function renderError(container, message) {
    if (!container) return;
    container.innerHTML =
      '<div class="mp-error">' +
        '<div class="mp-error-icon">\u26A0</div>' +
        '<p class="mp-error-title">Could not load listings</p>' +
        '<p class="mp-error-sub">' + _esc(String(message || 'Unknown error')) + '</p>' +
      '</div>';
  }

  window.FurnostylesMarketplaceRenderer = {
    renderCard:         renderCard,
    renderGrid:         renderGrid,
    renderLoadingGrid:  renderLoadingGrid,
    renderError:        renderError
  };

}());
