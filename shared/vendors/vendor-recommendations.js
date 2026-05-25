/**
 * Furnostyles Vendor Recommendations
 * Smart platform upsells below vendor and supplier pages.
 * Supports cross-linking into matching reviews, repairs, or consultations.
 */

(function () {
  'use strict';

  function _get() { return window.FurnostylesPublicFilter; }
  function _rec() { return window.FurnostylesRecommendationRenderer; }

  function loadForVendor(container, vendorId) {
    var F = _get(), R = _rec();
    if (!F || !R || !container) return;

    R.loadAndRender(container, [
      { title: 'Trending Local Products', promise: F.getApprovedByType('furniture', null, 4), renderer: 'listing' },
      { title: 'Recent Repairs &amp; Renovation Works', promise: F.getApprovedRepairs(null, 4), renderer: 'repair' },
      { title: 'Global Sourcing &amp; Imports', promise: F.getApprovedByType('sourcing', null, 4), renderer: 'listing' }
    ]);
  }

  function loadForSupplier(container, supplierId) {
    var F = _get(), R = _rec();
    if (!F || !R || !container) return;

    R.loadAndRender(container, [
      { title: 'Top-Rated Sourcing Alternatives', promise: F.getApprovedByType('sourcing', null, 4), renderer: 'listing' },
      { title: 'Materials &amp; Supplies Ready To Ship', promise: F.getApprovedByType('material', null, 4), renderer: 'listing' },
      { title: 'Premium Furnished Spaces', promise: F.getApprovedProperties(null, 4), renderer: 'property' }
    ]);
  }

  window.FurnostylesVendorRecommendations = {
    loadForVendor:   loadForVendor,
    loadForSupplier: loadForSupplier
  };

}());
