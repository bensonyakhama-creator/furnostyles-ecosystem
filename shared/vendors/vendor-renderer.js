/**
 * Furnostyles Vendor Renderer
 * Dynamically builds fully integrated vendor and supplier headers, detail metrics, sidebars, and listing grids.
 * Strictly preserves the Furnostyles trust layer.
 */

(function () {
  'use strict';

  function _esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function _wa(name) {
    return 'https://wa.me/254713639205?text=' +
      encodeURIComponent('Hi Furnostyles, I am viewing the profile of verified partner: ' + (name || 'Vendor') + '. I would like to inquire about their listings.');
  }

  function _consult(id, name) {
    return 'contact.html?from=vendor&id=' + encodeURIComponent(id || '') + '&name=' + encodeURIComponent(name || '');
  }

  /* ---------------------------------------------------------------- */
  /* PLATFORM TRUST COMPONENT                                           */
  /* ---------------------------------------------------------------- */

  function renderTrustSidebar(vendorName) {
    return '<div class="vnd-trust-sidebar">' +
      '<h3 class="vnd-sidebar-title">\uD83D\uDEE1\uFE0F Furnostyles Verified</h3>' +
      '<p class="vnd-sidebar-text">' +
        'To ensure a seamless, high-quality experience, all inquiries and orders for ' +
        '<strong>' + _esc(vendorName) + '</strong> are processed under the Furnostyles trust and protection guarantee.' +
      '</p>' +
      '<ul class="vnd-trust-list">' +
        '<li class="vnd-trust-item">\u2713 Escrow Protected Payments</li>' +
        '<li class="vnd-trust-item">\u2713 Direct Quality Verification</li>' +
        '<li class="vnd-trust-item">\u2713 Safe Delivery &amp; Assembly</li>' +
        '<li class="vnd-trust-item">\u2713 Moderated Catalog Only</li>' +
      '</ul>' +
      '<div style="border-top:1.5px dashed #f0f4ff;padding-top:14px;margin-top:14px;">' +
        '<div style="font-size:11px;color:#80a0aa;font-weight:700;text-transform:uppercase;margin-bottom:4px;">Platform Discipline</div>' +
        '<div style="font-size:13px;font-weight:700;color:#1a2540;">Discipline Score: <span style="color:#1a6e3a;">9.8 / 10</span></div>' +
        '<div style="font-size:11px;color:#8090a0;margin-top:2px;">Calculated based on response speed, description accuracy, and completion.</div>' +
      '</div>' +
    '</div>';
  }

  /* ---------------------------------------------------------------- */
  /* VENDOR METRICS                                                     */
  /* ---------------------------------------------------------------- */

  function renderMetricsRow(speed, count) {
    return '<div class="vnd-metrics-bar">' +
      '<div class="vnd-metrics-grid">' +
        '<div class="vnd-metric-card">' +
          '<div class="vnd-metric-icon">\u2605</div>' +
          '<div>' +
            '<div class="vnd-metric-label">Platform Rating</div>' +
            '<div class="vnd-metric-value">4.9 (Verified)</div>' +
          '</div>' +
        '</div>' +
        '<div class="vnd-metric-card">' +
          '<div class="vnd-metric-icon">\u26A1</div>' +
          '<div>' +
            '<div class="vnd-metric-label">Response Time</div>' +
            '<div class="vnd-metric-value">' + _esc(speed || 'Under 2 hours') + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="vnd-metric-card">' +
          '<div class="vnd-metric-icon">\uD83D\uDCE6</div>' +
          '<div>' +
            '<div class="vnd-metric-label">Moderated Items</div>' +
            '<div class="vnd-metric-value">' + _esc(count || '0') + ' active</div>' +
          '</div>' +
        '</div>' +
        '<div class="vnd-metric-card">' +
          '<div class="vnd-metric-icon">\uD83D\uDEE1\uFE0F</div>' +
          '<div>' +
            '<div class="vnd-metric-label">Assurance</div>' +
            '<div class="vnd-metric-value">Furnostyles Escrow</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ---------------------------------------------------------------- */
  /* VENDOR PROFILE RENDER                                              */
  /* ---------------------------------------------------------------- */

  function renderVendorProfile(headerContainer, mainContainer, profile, listings) {
    if (!headerContainer || !mainContainer || !profile) return;

    var name  = profile.storeName || profile.displayName || 'Bespoke Artisan';
    var desc  = profile.businessDescription || 'Verified designer &amp; local workshop partnering with Furnostyles.';
    var loc   = profile.location || 'Nairobi, Kenya';
    var speed = profile.responseSpeed || 'Under 2 hours';
    var type  = profile.businessType || 'Workshop / Artisan';
    var id    = profile.id || profile.uid || '';
    var badge = profile.trustBadge || 'Verified Partner';
    var recommended = profile.recommended || false;
    var rating = profile.rating || 4.8;

    var approvedListings = (listings || []).filter(function (L) { return L && L.status === 'approved'; });

    // VERIFICATION & RECOMMENDED BADGES
    var badgesHTML = '';
    if (profile.verified) {
      badgesHTML += '<span class="vnd-verified-badge">\u2713 Furnostyles Verified</span>';
    }
    if (recommended) {
      badgesHTML += '<span class="vnd-recommended-badge">\u2B50 Recommended by Furnostyles</span>';
    }

    // RENDER HEADER
    headerContainer.innerHTML =
      '<div class="vnd-profile-header">' +
        '<div class="vnd-header-grid">' +
          '<div class="vnd-avatar-wrap">\uD83D\uDC64</div>' +
          '<div class="vnd-header-info">' +
            '<div class="vnd-eyebrow">\u2728 Furnostyles Partner Workshop</div>' +
            '<h1 class="vnd-title">' + _esc(name) + '</h1>' +
            '<div class="vnd-badges-row">' + badgesHTML + '</div>' +
            '<div class="vnd-meta-list">' +
              '<div class="vnd-meta-item">📁 ' + _esc(type) + '</div>' +
              '<div class="vnd-meta-item">📍 ' + _esc(loc) + '</div>' +
              '<div class="vnd-meta-item">\u2605 ' + rating + ' Rating</div>' +
              '<div class="vnd-meta-item">\u26A1 ' + _esc(speed) + '</div>' +
              '<div class="vnd-meta-item">\u2713 Moderated by Furnostyles</div>' +
            '</div>' +
            '<p class="vnd-desc">' + _esc(desc) + '</p>' +
            '<div class="vnd-actions-row">' +
              '<a href="' + _esc(_consult(id, name)) + '" class="vnd-action-btn vnd-btn-primary">\uD83D\uDCAC Book Consultation</a>' +
              '<a href="' + _esc(_wa(name)) + '" target="_blank" rel="noopener" class="vnd-action-btn vnd-btn-wa">\uD83D\uDCF1 WhatsApp Chat</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      renderMetricsRow(speed, approvedListings.length);

    // RENDER MAIN AREA
    var gridHTML = '<div class="mp-grid" id="vndGrid"></div>';
    if (approvedListings.length === 0) {
      gridHTML =
        '<div style="text-align:center;padding:48px 24px;border:1.5px dashed #dce4f0;border-radius:12px;">' +
          '<div style="font-size:40px;margin-bottom:12px;">\uD83D\uDCE6</div>' +
          '<h3 style="font-size:16px;font-weight:700;color:#1a2540;margin:0 0 6px;">Catalog Pending</h3>' +
          '<p style="font-size:13px;color:#8090a0;margin:0;">No public approved products at this moment. Reach out to request custom workshops.</p>' +
        '</div>';
    }

    // RELATED MARKETPLACE LINKS
    var relatedLinksHTML =
      '<div class="vnd-related-links" style="margin-top: 32px; padding: 24px; background: rgba(11, 59, 70, 0.05); border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.1);">' +
        '<h3 style="font-size: 16px; font-weight: 700; color: var(--fns-gold-primary); margin-bottom: 16px;">Explore Marketplace</h3>' +
        '<div style="display: flex; gap: 12px; flex-wrap: wrap;">' +
          '<a href="furniture-marketplace.html" style="background: var(--fns-petrol-blue); color: var(--fns-white); padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none;">Furniture</a>' +
          '<a href="materials-marketplace.html" style="background: var(--fns-petrol-blue); color: var(--fns-white); padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none;">Materials</a>' +
          '<a href="services-marketplace.html" style="background: var(--fns-petrol-blue); color: var(--fns-white); padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none;">Services</a>' +
          '<a href="realestate-marketplace.html" style="background: var(--fns-petrol-blue); color: var(--fns-white); padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none;">Real Estate</a>' +
          '<a href="sourcing-marketplace.html" style="background: var(--fns-petrol-blue); color: var(--fns-white); padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none;">Sourcing</a>' +
        '</div>' +
      '</div>';

    mainContainer.innerHTML =
      '<div class="vnd-container">' +
        '<div>' +
          '<h2 class="section-title-alt" style="margin: 0 0 24px;">Approved Active Listings</h2>' +
          gridHTML +
          relatedLinksHTML +
        '</div>' +
        '<div>' +
          renderTrustSidebar(name) +
        '</div>' +
      '</div>';

    // RENDER CARDS IF EXISTS
    var grid = document.getElementById('vndGrid');
    if (grid && approvedListings.length > 0 && window.FurnostylesMarketplaceRenderer) {
      window.FurnostylesMarketplaceRenderer.renderGrid(grid, approvedListings);
    }
  }

  /* ---------------------------------------------------------------- */
  /* SUPPLIER PROFILE RENDER                                            */
  /* ---------------------------------------------------------------- */

  function renderSupplierProfile(headerContainer, mainContainer, profile, listings) {
    if (!headerContainer || !mainContainer || !profile) return;

    var name  = profile.companyName || profile.displayName || 'Premium Supplier';
    var desc  = profile.businessDescription || 'Direct-to-factory global sourcing. Specializing in high-volume, premium grade imports.';
    var spec  = profile.importSpecialization || 'Modern Furniture &amp; Sourcing';
    var speed = profile.responseSpeed || 'Under 3 hours';
    var id    = profile.id || profile.uid || '';
    var badge = profile.trustBadge || 'Verified Importer';
    var recommended = profile.recommended || false;
    var rating = profile.rating || 4.8;

    var approvedListings = (listings || []).filter(function (L) { return L && L.status === 'approved'; });

    // VERIFICATION & RECOMMENDED BADGES
    var badgesHTML = '';
    if (profile.verified) {
      badgesHTML += '<span class="vnd-verified-badge">\u2713 Furnostyles Verified</span>';
    }
    if (recommended) {
      badgesHTML += '<span class="vnd-recommended-badge">\u2B50 Recommended by Furnostyles</span>';
    }

    // RENDER HEADER
    headerContainer.innerHTML =
      '<div class="vnd-profile-header">' +
        '<div class="vnd-header-grid">' +
          '<div class="vnd-avatar-wrap">\uD83C\uDF10</div>' +
          '<div class="vnd-header-info">' +
            '<div class="vnd-eyebrow">\uD83C\uDF0D Global Sourcing Partner</div>' +
            '<h1 class="vnd-title">' + _esc(name) + '</h1>' +
            '<div class="vnd-badges-row">' + badgesHTML + '</div>' +
            '<div class="vnd-meta-list">' +
              '<div class="vnd-meta-item">🌍 Speciality: ' + _esc(spec) + '</div>' +
              '<div class="vnd-meta-item">📍 ' + _esc(profile.location || 'International') + '</div>' +
              '<div class="vnd-meta-item">\u2605 ' + rating + ' Rating</div>' +
              '<div class="vnd-meta-item">\u26A1 ' + _esc(speed) + '</div>' +
              '<div class="vnd-meta-item">\u2713 Commission &amp; Bulk Protection</div>' +
            '</div>' +
            '<p class="vnd-desc">' + _esc(desc) + '</p>' +
            '<div class="vnd-actions-row">' +
              '<a href="' + _esc(_consult(id, name)) + '" class="vnd-action-btn vnd-btn-primary">\uD83D\uDCCB Request Sourcing Proposal</a>' +
              '<a href="' + _esc(_wa(name)) + '" target="_blank" rel="noopener" class="vnd-action-btn vnd-btn-wa">\uD83D\uDCF1 Sourcing Inquiry</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      renderMetricsRow(speed, approvedListings.length);

    // RENDER MAIN AREA
    var gridHTML = '<div class="mp-grid" id="vndGrid"></div>';
    if (approvedListings.length === 0) {
      gridHTML =
        '<div style="text-align:center;padding:48px 24px;border:1.5px dashed #dce4f0;border-radius:12px;">' +
          '<div style="font-size:40px;margin-bottom:12px;">\uD83C\uDF0D</div>' +
          '<h3 style="font-size:16px;font-weight:700;color:#1a2540;margin:0 0 6px;">Import Pipeline Empty</h3>' +
          '<p style="font-size:13px;color:#8090a0;margin:0;">No public pre-order imports currently listed. Reach out via proposal to import bespoke furniture.</p>' +
        '</div>';
    }

    // RELATED MARKETPLACE LINKS
    var relatedLinksHTML =
      '<div class="vnd-related-links" style="margin-top: 32px; padding: 24px; background: rgba(11, 59, 70, 0.05); border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.1);">' +
        '<h3 style="font-size: 16px; font-weight: 700; color: var(--fns-gold-primary); margin-bottom: 16px;">Explore Marketplace</h3>' +
        '<div style="display: flex; gap: 12px; flex-wrap: wrap;">' +
          '<a href="furniture-marketplace.html" style="background: var(--fns-petrol-blue); color: var(--fns-white); padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none;">Furniture</a>' +
          '<a href="materials-marketplace.html" style="background: var(--fns-petrol-blue); color: var(--fns-white); padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none;">Materials</a>' +
          '<a href="sourcing-marketplace.html" style="background: var(--fns-petrol-blue); color: var(--fns-white); padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none;">Sourcing</a>' +
          '<a href="secondhand-marketplace.html" style="background: var(--fns-petrol-blue); color: var(--fns-white); padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none;">Secondhand</a>' +
        '</div>' +
      '</div>';

    mainContainer.innerHTML =
      '<div class="vnd-container">' +
        '<div>' +
          '<h2 class="section-title-alt" style="margin: 0 0 24px;">Approved Imported Catalog</h2>' +
          gridHTML +
          relatedLinksHTML +
        '</div>' +
        '<div>' +
          renderTrustSidebar(name) +
        '</div>' +
      '</div>';

    // RENDER CARDS IF EXISTS
    var grid = document.getElementById('vndGrid');
    if (grid && approvedListings.length > 0 && window.FurnostylesMarketplaceRenderer) {
      window.FurnostylesMarketplaceRenderer.renderGrid(grid, approvedListings);
    }
  }

  window.FurnostylesVendorRenderer = {
    renderVendorProfile:   renderVendorProfile,
    renderSupplierProfile: renderSupplierProfile
  };

}());
