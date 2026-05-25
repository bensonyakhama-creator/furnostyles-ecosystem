/**
 * Furnostyles Detail Recommendations
 * Loads smart cross-ecosystem recommendation sections below detail pages.
 * Depends on: public-filter.js, recommendation-renderer.js
 */
(function () {
  'use strict';

  function _get() { return window.FurnostylesPublicFilter; }
  function _rec() { return window.FurnostylesRecommendationRenderer; }

  function loadForListing(container, listing) {
    var F = _get(), R = _rec();
    if (!F || !R || !container) return;

    var type = (listing && listing.listingType) || 'furniture';
    var loaders = [];

    loaders.push({ title: 'More ' + (type.charAt(0).toUpperCase() + type.slice(1)), promise: F.getApprovedByType(type, null, 6), renderer: 'listing' });

    if (type === 'furniture' || type === 'secondhand') {
      loaders.push({ title: 'Renovation &amp; Repair Services', promise: F.getApprovedRepairs(null, 4), renderer: 'repair' });
      loaders.push({ title: 'Sourcing Opportunities', promise: F.getApprovedByType('sourcing', null, 4), renderer: 'listing' });
    }

    if (type === 'material') {
      loaders.push({ title: 'Renovation Showcases', promise: F.getApprovedRepairs(null, 4), renderer: 'repair' });
      loaders.push({ title: 'Furniture &amp; Products', promise: F.getApprovedByType('furniture', null, 4), renderer: 'listing' });
    }

    if (type === 'sourcing') {
      loaders.push({ title: 'Related Furniture', promise: F.getApprovedByType('furniture', null, 4), renderer: 'listing' });
      loaders.push({ title: 'Building Materials', promise: F.getApprovedByType('material', null, 4), renderer: 'listing' });
    }

    if (type === 'secondhand') {
      loaders.push({ title: 'New Furniture', promise: F.getApprovedByType('furniture', null, 4), renderer: 'listing' });
    }

    loaders.push({ title: 'Real Estate Listings', promise: F.getApprovedProperties(null, 4), renderer: 'property' });

    R.loadAndRender(container, loaders);
  }

  function loadForProperty(container, property) {
    var F = _get(), R = _rec();
    if (!F || !R || !container) return;

    R.loadAndRender(container, [
      { title: 'Furnishing Suggestions', promise: F.getApprovedByType('furniture', null, 6), renderer: 'listing' },
      { title: 'Renovation Showcases', promise: F.getApprovedRepairs(null, 4), renderer: 'repair' },
      { title: 'Building Materials', promise: F.getApprovedByType('material', null, 4), renderer: 'listing' },
      { title: 'More Properties', promise: F.getApprovedProperties(null, 6), renderer: 'property' }
    ]);
  }

  function loadForRepair(container, repair) {
    var F = _get(), R = _rec();
    if (!F || !R || !container) return;

    R.loadAndRender(container, [
      { title: 'Similar Repair Projects', promise: F.getApprovedRepairs(null, 6), renderer: 'repair' },
      { title: 'Materials &amp; Supplies', promise: F.getApprovedByType('material', null, 4), renderer: 'listing' },
      { title: 'Furniture After Renovation', promise: F.getApprovedByType('furniture', null, 4), renderer: 'listing' },
      { title: 'Related Properties', promise: F.getApprovedProperties(null, 4), renderer: 'property' }
    ]);
  }

  window.FurnostylesDetailRecommendations = {
    loadForListing:  loadForListing,
    loadForProperty: loadForProperty,
    loadForRepair:   loadForRepair
  };

}());
