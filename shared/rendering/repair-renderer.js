/**
 * Furnostyles Repair Renderer
 * Renders approved repair project showcase cards.
 * Shows before/after images side-by-side without vendor info.
 *
 * Load order: public-filter.js → repair-renderer.js
 */

(function () {
  'use strict';

  function _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function _fmt(iso) {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString('en-KE', { year: 'numeric', month: 'short' });
    } catch (e) { return ''; }
  }

  function _thumb(url, label) {
    var isData = url && url.indexOf('data:') === 0;
    if (url && !isData) {
      return '<img class="mp-repair-thumb" src="' + _esc(url) + '" alt="' + _esc(label) + '" loading="lazy">';
    }
    return '<div class="mp-repair-thumb-label">' +
      '<span style="font-size:20px;">' + (label === 'Before' ? '\uD83D\uDCF8' : '\u2728') + '</span>' +
      '<span>' + label + '</span>' +
    '</div>';
  }

  /**
   * Render a single repair showcase card.
   * Links to repair-detail.html?id={id} for future detail page.
   */
  function renderCard(repair) {
    var id         = repair.id || '';
    var before     = repair.beforeImages && repair.beforeImages[0] ? repair.beforeImages[0] : null;
    var after      = repair.afterImages  && repair.afterImages[0]  ? repair.afterImages[0]  : null;
    var loc        = repair.location ? '\uD83D\uDCCD\u00a0' + repair.location : '';
    var dateStr    = _fmt(repair.createdAt);
    var desc       = repair.description
      ? String(repair.description).substring(0, 80) + (repair.description.length > 80 ? '\u2026' : '')
      : '';
    var detailHref = 'repair-detail.html?id=' + encodeURIComponent(id);

    return '<a class="mp-card" href="' + _esc(detailHref) + '" aria-label="' + _esc(repair.repairType || 'Repair') + '">' +
      '<div class="mp-card-img-wrap">' +
        '<div class="mp-repair-thumbs">' +
          _thumb(before, 'Before') +
          '<div class="mp-repair-divider"></div>' +
          _thumb(after, 'After') +
        '</div>' +
        '<span class="mp-badge mp-badge-repair">' + _esc(repair.repairType || 'Repair') + '</span>' +
      '</div>' +
      '<div class="mp-card-body">' +
        '<h3 class="mp-card-title">' + _esc(repair.repairType || 'Repair Project') + '</h3>' +
        (loc     ? '<p class="mp-card-location">' + loc + '</p>' : '') +
        (dateStr ? '<p class="mp-card-cat">' + dateStr + '</p>' : '') +
        (desc    ? '<p class="mp-card-desc">' + _esc(desc) + '</p>' : '') +
        '<span class="mp-card-cta">View Work &rarr;</span>' +
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
            '<span class="mp-skel-line" style="width:60%;"></span>' +
            '<span class="mp-skel-line" style="width:40%;"></span>' +
            '<span class="mp-skel-line" style="width:50%;"></span>' +
          '</div>' +
        '</div>';
    }
    container.innerHTML = '<div class="mp-grid">' + skel + '</div>';
  }

  function renderGrid(container, repairs) {
    if (!container) return;
    if (!repairs || repairs.length === 0) {
      container.innerHTML =
        '<div class="mp-empty">' +
          '<div class="mp-empty-icon">\uD83D\uDD28</div>' +
          '<p class="mp-empty-title">No repair showcases yet</p>' +
          '<p class="mp-empty-sub">Approved renovation and repair projects will appear here.</p>' +
        '</div>';
      return;
    }
    container.innerHTML = '<div class="mp-grid">' + repairs.map(renderCard).join('') + '</div>';
  }

  function renderError(container, message) {
    if (!container) return;
    container.innerHTML =
      '<div class="mp-error">' +
        '<div class="mp-error-icon">\u26A0</div>' +
        '<p class="mp-error-title">Could not load repair showcases</p>' +
        '<p class="mp-error-sub">' + _esc(String(message || 'Unknown error')) + '</p>' +
      '</div>';
  }

  window.FurnostylesRepairRenderer = {
    renderCard:        renderCard,
    renderGrid:        renderGrid,
    renderLoadingGrid: renderLoadingGrid,
    renderError:       renderError
  };

}());
