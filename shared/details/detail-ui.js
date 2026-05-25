/**
 * Furnostyles Detail UI
 * Loading, error, and not-found states for detail pages.
 * Load order: detail-layout.css → detail-ui.js
 */

(function () {
  'use strict';

  function renderLoading(container) {
    if (!container) return;
    container.innerHTML =
      '<div class="dtl-skel-hero">' +
        '<div>' +
          '<div class="dtl-skel-block" style="height:420px;margin-bottom:10px;"></div>' +
          '<div style="display:flex;gap:8px;">' +
            '<div class="dtl-skel-block" style="width:72px;height:60px;"></div>' +
            '<div class="dtl-skel-block" style="width:72px;height:60px;"></div>' +
            '<div class="dtl-skel-block" style="width:72px;height:60px;"></div>' +
          '</div>' +
        '</div>' +
        '<div style="padding-top:8px;">' +
          '<span class="dtl-skel-line" style="width:80%;height:30px;margin-bottom:16px;"></span>' +
          '<span class="dtl-skel-line" style="width:45%;height:36px;margin-bottom:16px;"></span>' +
          '<span class="dtl-skel-line" style="width:60%;"></span>' +
          '<span class="dtl-skel-line" style="width:50%;"></span>' +
          '<span class="dtl-skel-line" style="width:40%;"></span>' +
          '<div style="margin-top:28px;">' +
            '<span class="dtl-skel-block" style="height:46px;margin-bottom:10px;border-radius:9px;"></span>' +
            '<span class="dtl-skel-block" style="height:46px;border-radius:9px;"></span>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderNotFound(container, type) {
    if (!container) return;
    var labels = { listing: 'product', property: 'property', repair: 'repair project' };
    var label = labels[type] || 'item';
    var links = {
      listing:  'marketplace.html',
      property: 'realestate-marketplace.html',
      repair:   'services-marketplace.html'
    };
    container.innerHTML =
      '<div style="text-align:center;padding:72px 24px;">' +
        '<div style="font-size:56px;margin-bottom:16px;">\uD83D\uDD0D</div>' +
        '<h2 style="font-size:22px;font-weight:800;color:#1a2540;margin:0 0 8px;">' +
          'This ' + label + ' is no longer available' +
        '</h2>' +
        '<p style="font-size:14px;color:#8090a0;margin:0 0 24px;">' +
          'It may have been removed or is pending review.' +
        '</p>' +
        '<a href="' + (links[type] || 'marketplace.html') + '" ' +
           'style="display:inline-block;background:#0b3b46;color:#fff;padding:12px 28px;' +
           'border-radius:8px;font-weight:700;text-decoration:none;font-size:14px;">' +
          'Browse Marketplace' +
        '</a>' +
      '</div>';
  }

  function renderError(container, message) {
    if (!container) return;
    container.innerHTML =
      '<div style="text-align:center;padding:60px 24px;">' +
        '<div style="font-size:44px;margin-bottom:14px;">\u26A0</div>' +
        '<h2 style="font-size:18px;font-weight:700;color:#cc1a1a;margin:0 0 8px;">Failed to load</h2>' +
        '<p style="font-size:13px;color:#8090a0;margin:0 0 20px;">' +
          (message || 'An unexpected error occurred.') +
        '</p>' +
        '<button onclick="window.location.reload()" ' +
           'style="background:#0b3b46;color:#fff;border:none;padding:10px 24px;' +
           'border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;">' +
          'Try Again' +
        '</button>' +
      '</div>';
  }

  /**
   * Parse `name` from the page query string.
   */
  function getParam(name) {
    var m = window.location.search.match(
      new RegExp('[?&]' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^&]*)')
    );
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  window.FurnostylesDetailUI = {
    renderLoading:  renderLoading,
    renderNotFound: renderNotFound,
    renderError:    renderError,
    getParam:       getParam
  };

}());
