/**
 * Furnostyles Vendor UI
 * Handles URL parsing, dynamic layouts, loading skeleton renders, and empty/error states.
 * Also handles demo data loading for vendor and supplier profiles.
 */

(function () {
  'use strict';

  function getParam(name) {
    var m = window.location.search.match(
      new RegExp('[?&]' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^&]*)')
    );
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  function renderLoading(container) {
    if (!container) return;
    container.innerHTML =
      '<div class="vnd-skel-header">' +
        '<div class="vnd-header-grid">' +
          '<div class="vnd-skel-shimmer" style="width:120px;height:120px;border-radius:50%;flex-shrink:0;"></div>' +
          '<div style="flex:1;width:100%;">' +
            '<div class="vnd-skel-shimmer" style="width:40%;height:32px;margin-bottom:12px;"></div>' +
            '<div class="vnd-skel-shimmer" style="width:25%;height:16px;margin-bottom:12px;"></div>' +
            '<div class="vnd-skel-shimmer" style="width:75%;height:14px;margin-bottom:6px;"></div>' +
            '<div class="vnd-skel-shimmer" style="width:60%;height:14px;"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="vnd-container">' +
        '<div>' +
          '<div style="padding:20px 0;">' +
            '<div class="vnd-skel-shimmer" style="width:180px;height:24px;margin-bottom:20px;background:#e0e8f0;"></div>' +
            '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;">' +
              '<div class="vnd-skel-shimmer" style="height:320px;border-radius:12px;background:#e0e8f0;"></div>' +
              '<div class="vnd-skel-shimmer" style="height:320px;border-radius:12px;background:#e0e8f0;"></div>' +
              '<div class="vnd-skel-shimmer" style="height:320px;border-radius:12px;background:#e0e8f0;"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="vnd-skel-shimmer" style="height:260px;border-radius:12px;background:#e0e8f0;"></div>' +
        '</div>' +
      '</div>';
  }

  function renderNotFound(container, type) {
    if (!container) return;
    var label = type === 'supplier' ? 'Supplier' : 'Vendor';
    container.innerHTML =
      '<div style="text-align:center;padding:80px 24px;">' +
        '<div style="font-size:64px;margin-bottom:20px;">\uD83D\uDEAF</div>' +
        '<h2 style="font-size:24px;font-weight:800;color:#1a2540;margin:0 0 10px;">' + label + ' Profile Not Found</h2>' +
        '<p style="font-size:14px;color:#8090a0;margin:0 0 28px;max-width:440px;margin-left:auto;margin-right:auto;">' +
          'The vendor code is invalid, or the profile is undergoing moderation review. Please check back later.' +
        '</p>' +
        '<a href="marketplace.html" style="display:inline-block;background:#0b3b46;color:#fff;padding:12px 32px;' +
          'border-radius:8px;font-weight:700;text-decoration:none;font-size:14px;box-shadow:0 4px 12px rgba(11,59,70,0.15);">' +
          'Return to Marketplace' +
        '</a>' +
      '</div>';
  }

  function renderError(container, message) {
    if (!container) return;
    container.innerHTML =
      '<div style="text-align:center;padding:72px 24px;">' +
        '<div style="font-size:48px;margin-bottom:16px;">\u26A0</div>' +
        '<h2 style="font-size:20px;font-weight:800;color:#cc1a1a;margin:0 0 10px;">Connection Interrupted</h2>' +
        '<p style="font-size:14px;color:#8090a0;margin:0 0 24px;">' +
          (message || 'An unexpected error occurred while loading this vendor profile.') +
        '</p>' +
        '<button onclick="window.location.reload()" style="background:#0b3b46;color:#fff;border:none;' +
          'padding:12px 32px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;' +
          'box-shadow:0 4px 12px rgba(11,59,70,0.15);">' +
          'Retry Connection' +
        '</button>' +
      '</div>';
  }

  /**
   * Load demo vendor data
   * @param {String} id - Vendor ID
   * @returns {Object|null} - Vendor data or null
   */
  function loadDemoVendor(id) {
    if (!window.FurnostylesVendorsDemo) return null;
    var vendors = window.FurnostylesVendorsDemo.vendors || [];
    return vendors.find(function(v) { return v.id === id; }) || null;
  }

  /**
   * Load demo supplier data
   * @param {String} id - Supplier ID
   * @returns {Object|null} - Supplier data or null
   */
  function loadDemoSupplier(id) {
    if (!window.FurnostylesVendorsDemo) return null;
    var suppliers = window.FurnostylesVendorsDemo.suppliers || [];
    return suppliers.find(function(s) { return s.id === id; }) || null;
  }

  /**
   * Get demo listings for vendor/supplier
   * @param {Object} profile - Vendor or supplier profile
   * @returns {Array} - Array of demo listings
   */
  function getDemoListings(profile) {
    if (!profile || !profile.featuredListings) return [];
    
    var listings = [];
    var allProducts = [];
    
    // Collect all demo products from various sources
    if (window.FurnostylesFurnitureDemo) {
      allProducts = allProducts.concat(window.FurnostylesFurnitureDemo.products || []);
    }
    if (window.FurnostylesMaterialsDemo) {
      allProducts = allProducts.concat(window.FurnostylesMaterialsDemo.products || []);
    }
    if (window.FurnostylesSecondhandDemo) {
      allProducts = allProducts.concat(window.FurnostylesSecondhandDemo.products || []);
    }
    if (window.FurnostylesSourcingDemo) {
      allProducts = allProducts.concat(window.FurnostylesSourcingDemo.products || []);
    }
    
    // Filter by featured listings
    profile.featuredListings.forEach(function(listingId) {
      var product = allProducts.find(function(p) { return p.id === listingId; });
      if (product) {
        listings.push({
          id: product.id,
          title: product.title,
          category: product.category,
          location: product.location,
          description: product.description,
          price: product.price,
          image: product.image,
          featured: true,
          status: 'approved'
        });
      }
    });
    
    return listings;
  }

  window.FurnostylesVendorProfileUI = {
    getParam: getParam,
    renderLoading: renderLoading,
    renderNotFound: renderNotFound,
    renderError: renderError,
    loadDemoVendor: loadDemoVendor,
    loadDemoSupplier: loadDemoSupplier,
    getDemoListings: getDemoListings
  };

}());
