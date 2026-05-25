/**
 * Furnostyles Property Renderer
 * Renders approved property cards for the real estate marketplace page.
 * Does NOT expose ownerId or vendor info.
 *
 * Load order: public-filter.js → property-renderer.js
 */

(function () {
  'use strict';

  function _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function _price(val, period) {
    if (!val && val !== 0) return '';
    var base = 'KSh\u00a0' + Number(val).toLocaleString();
    if (period && period !== 'total') return base + '\u00a0/' + period;
    return base;
  }

  function _imgBlock(prop) {
    var thumb  = prop.images && prop.images[0] ? prop.images[0] : null;
    var isData = thumb && thumb.indexOf('data:') === 0;
    if (thumb && !isData) {
      return '<img class="mp-card-img" src="' + _esc(thumb) + '" alt="' + _esc(prop.title) + '" loading="lazy">';
    }
    return '<div class="mp-card-img-placeholder">\uD83C\uDFE0</div>';
  }

  function _modeLabel(mode) {
    if (!mode) return '';
    if (mode === 'for_sale' || mode === 'sale')  return 'For Sale';
    if (mode === 'for_rent' || mode === 'rent')  return 'For Rent';
    return mode;
  }

  /**
   * Render a single property card.
   * Links to property-detail.html?id={id} for future detail page.
   */
  function renderCard(prop) {
    var id         = prop.id || '';
    var modeLabel  = _modeLabel(prop.listingMode);
    var price      = _price(prop.priceOrRent, prop.pricePeriod);
    var loc        = prop.location ? '\uD83D\uDCCD\u00a0' + prop.location : '';
    var beds       = prop.bedrooms ? '\uD83D\uDECF\u00a0' + prop.bedrooms + ' bed' : '';
    var desc       = prop.description
      ? String(prop.description).substring(0, 90) + (prop.description.length > 90 ? '\u2026' : '')
      : '';
    var detailHref = 'property-detail.html?id=' + encodeURIComponent(id);

    return '<a class="mp-card" href="' + _esc(detailHref) + '" aria-label="' + _esc(prop.title || 'Property') + '">' +
      '<div class="mp-card-img-wrap">' +
        _imgBlock(prop) +
        (modeLabel ? '<span class="mp-badge mp-badge-mode">' + _esc(modeLabel) + '</span>' : '') +
        (prop.propertyType ? '<span class="mp-badge mp-badge-type" style="left:auto;right:10px;">' + _esc(prop.propertyType) + '</span>' : '') +
      '</div>' +
      '<div class="mp-card-body">' +
        '<h3 class="mp-card-title">' + _esc(prop.title || 'Property') + '</h3>' +
        (loc  ? '<p class="mp-card-location">' + loc + '</p>' : '') +
        (price ? '<p class="mp-card-price">' + price + '</p>' : '') +
        (beds  ? '<p class="mp-card-cat">' + beds + '</p>' : '') +
        (desc  ? '<p class="mp-card-desc">' + _esc(desc) + '</p>' : '') +
        '<span class="mp-card-cta">View Property &rarr;</span>' +
      '</div>' +
    '</a>';
  }

  function renderLoadingGrid(container, count) {
    if (!container) return;
    var n = count || 6;
    var skel = '';
    for (var i = 0; i < n; i++) {
      skel +=
        '<div class="mp-card">' +
          '<div class="mp-skel-img"></div>' +
          '<div class="mp-card-body">' +
            '<span class="mp-skel-line" style="width:65%;"></span>' +
            '<span class="mp-skel-line" style="width:40%;"></span>' +
            '<span class="mp-skel-line" style="width:55%;height:20px;"></span>' +
            '<span class="mp-skel-line" style="width:35%;"></span>' +
          '</div>' +
        '</div>';
    }
    container.innerHTML = '<div class="mp-grid">' + skel + '</div>';
  }

  function renderGrid(container, properties) {
    if (!container) return;
    if (!properties || properties.length === 0) {
      container.innerHTML =
        '<div class="mp-empty">' +
          '<div class="mp-empty-icon">\uD83C\uDFE0</div>' +
          '<p class="mp-empty-title">No properties listed</p>' +
          '<p class="mp-empty-sub">Approved property listings will appear here.</p>' +
        '</div>';
      return;
    }
    container.innerHTML = '<div class="mp-grid">' + properties.map(renderCard).join('') + '</div>';
  }

  function renderError(container, message) {
    if (!container) return;
    container.innerHTML =
      '<div class="mp-error">' +
        '<div class="mp-error-icon">\u26A0</div>' +
        '<p class="mp-error-title">Could not load properties</p>' +
        '<p class="mp-error-sub">' + _esc(String(message || 'Unknown error')) + '</p>' +
      '</div>';
  }

  window.FurnostylesPropertyRenderer = {
    renderCard:        renderCard,
    renderGrid:        renderGrid,
    renderLoadingGrid: renderLoadingGrid,
    renderError:       renderError
  };

}());
