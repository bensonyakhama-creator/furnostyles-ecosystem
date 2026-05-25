/**
 * Furnostyles Recommendation Renderer
 * Renders horizontal-scroll "You might also like" sections
 * below the main marketplace grid.
 *
 * Load order: marketplace-renderer.js + property-renderer.js + repair-renderer.js
 *             → recommendation-renderer.js
 *
 * Usage:
 *   FurnostylesRecommendationRenderer.render(container, sections)
 *
 * sections is an array of:
 *   {
 *     title:    'Related Services',
 *     items:    [...],        // array of approved documents
 *     renderer: 'repair'     // 'listing' | 'property' | 'repair'
 *   }
 */

(function () {
  'use strict';

  var RENDERERS = {
    listing:  function () { return window.FurnostylesMarketplaceRenderer; },
    property: function () { return window.FurnostylesPropertyRenderer; },
    repair:   function () { return window.FurnostylesRepairRenderer; }
  };

  var EMPTY_ICONS = {
    listing:  '\uD83D\uDCE6',
    property: '\uD83C\uDFE0',
    repair:   '\uD83D\uDD28'
  };

  /**
   * Render all recommendation sections into container.
   * Each section that has 0 items is silently skipped.
   *
   * @param {Element} container
   * @param {Array}   sections  - [{ title, items, renderer }]
   */
  function render(container, sections) {
    if (!container) return;
    container.innerHTML = '';

    if (!sections || sections.length === 0) return;

    sections.forEach(function (section) {
      if (!section.items || section.items.length === 0) return;

      var rendererFactory = RENDERERS[section.renderer] || RENDERERS.listing;
      var renderer = rendererFactory();
      if (!renderer) return;

      var sec = document.createElement('div');
      sec.className = 'mp-rec-section';

      var title = document.createElement('h2');
      title.className = 'mp-rec-title';
      title.textContent = section.title || 'You might also like';
      sec.appendChild(title);

      var scroll = document.createElement('div');
      scroll.className = 'mp-rec-scroll';

      var items = section.items.slice(0, 8);
      scroll.innerHTML = items.map(renderer.renderCard).join('');
      sec.appendChild(scroll);

      container.appendChild(sec);
    });
  }

  /**
   * Load recommendations and render them.
   * loaders is an array of:
   *   { title, promise, renderer }
   * Each promise resolves to an array of items.
   *
   * @param {Element} container
   * @param {Array}   loaders
   */
  function loadAndRender(container, loaders) {
    if (!container || !loaders || loaders.length === 0) return;

    var promises = loaders.map(function (loader) {
      return loader.promise
        .then(function (items) {
          return { title: loader.title, items: items || [], renderer: loader.renderer };
        })
        .catch(function () {
          return { title: loader.title, items: [], renderer: loader.renderer };
        });
    });

    Promise.all(promises).then(function (sections) {
      render(container, sections);
    });
  }

  window.FurnostylesRecommendationRenderer = {
    render:         render,
    loadAndRender:  loadAndRender
  };

}());
