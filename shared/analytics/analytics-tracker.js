/**
 * Furnostyles Analytics Tracker
 * Front-facing utility to automatically register pageviews, product details, and category engagements.
 */

(function () {
  'use strict';

  function _svc() { return window.FurnostylesAnalyticsService; }

  /**
   * Tracks a public marketplace product view.
   */
  function trackProductView(productId, category, bridge) {
    var s = _svc();
    if (!s || !bridge) return;
    s.logEvent('product_view', 1, category || 'furniture', 'marketplace', { productId: productId }, bridge);
  }

  /**
   * Tracks a dynamic service routing dispatch submit.
   */
  function trackServiceRequest(requestId, category, bridge) {
    var s = _svc();
    if (!s || !bridge) return;
    s.logEvent('service_request_submitted', 1, category || 'repair', 'routing', { requestId: requestId }, bridge);
  }

  /**
   * Automatically initializes global session page tracking.
   */
  function autoTrackPage(bridge) {
    var s = _svc();
    if (!s || !bridge) return;

    var path = window.location.pathname;
    var cleanPath = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    s.logEvent('page_view', 1, 'general', 'navigation', { page: cleanPath }, bridge);
  }

  window.FurnostylesAnalyticsTracker = {
    trackProductView: trackProductView,
    trackServiceRequest: trackServiceRequest,
    autoTrackPage: autoTrackPage
  };

}());
