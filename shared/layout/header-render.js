/**
 * FURNOSTYLES — HEADER RENDERER
 * ==============================
 * File: shared/layout/header-render.js
 * Purpose: Reads window.FurnostylesHeaderData and renders the shared
 *          sticky header into #fns-header-mount.
 *          Also renders floating cart and WhatsApp buttons.
 *
 * Note: Topbar is now rendered separately by topbar-render.js
 *
 * Mount point: <div id="fns-header-mount"></div>
 * Load after: header-data.js
 *
 * Public API:
 *   window.FurnostylesHeader.init()           — manual re-init
 *   window.FurnostylesHeader.updateCart(count) — update badge count
 */

(function () {
  'use strict';

  var _mounted = false;

  /* ============================================================
     SAFETY HELPERS
  ============================================================ */

  function safe(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function when(condition, html) {
    return condition ? (html || '') : '';
  }

  /* ============================================================
     SECTION: HEADER
  ============================================================ */

  function buildHeader(data) {
    var brand = data.brand || {};
    var search = data.search || {};
    var nav = data.nav || [];
    var topNav = data.topNav || {};
    var categories = data.categories || {};
    var promotions = data.promotions || {};
    var delivery = data.delivery || {};

    // Top navigation bar (Jumia-style)
    var topNavHtml = when(topNav.enabled,
      '<div class="fns-header-top-nav">' +
        topNav.links.map(function(link) {
          var linkHtml;
          if (link.action === 'openRegisterModal') {
            linkHtml = '<a href="javascript:void(0)" onclick="window.FurnostylesRegisterModal && window.FurnostylesRegisterModal.open()" class="' + (link.highlight ? 'fns-header-top-nav-link fns-highlight' : 'fns-header-top-nav-link') + '">' +
              safe(link.label) +
              '</a>';
          } else {
            linkHtml = '<a href="' + safe(link.href) + '" class="' + (link.highlight ? 'fns-header-top-nav-link fns-highlight' : 'fns-header-top-nav-link') + '">' +
              safe(link.label) +
              (link.icon ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7-4h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6.31l.95-4.57.03-.32a1 1 0 0 0-.29-.71l-1.39-1.39a1 1 0 0 0-1.41 0l-1.4 1.4a1 1 0 0 0 0 1.41l.82.82L8.5 14H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/></svg>' : '') +
              '</a>';
          }
          return linkHtml;
        }).join('') +
      '</div>'
    );

    // Category navigation (Jumia-style)
    var categoriesHtml = when(categories.enabled,
      '<nav class="fns-header-categories">' +
        categories.items.map(function(cat) {
          return '<a href="' + safe(cat.href) + '" class="fns-header-category-link">' + safe(cat.label) + '</a>';
        }).join('') +
      '</nav>'
    );

    // Promotional banners (Jumia-style)
    var promotionsHtml = when(promotions.enabled,
      '<div class="fns-header-promotions">' +
        promotions.items.map(function(promo) {
          return '<a href="' + safe(promo.href) + '" class="fns-header-promo ' + (promo.highlight ? 'fns-promo-highlight' : '') + '">' +
            '<span class="fns-promo-text">' + safe(promo.text) + '</span>' +
            (promo.subtext ? '<span class="fns-promo-subtext">' + safe(promo.subtext) + '</span>' : '') +
          '</a>';
        }).join('') +
      '</div>'
    );

    // Delivery hooks
    var deliveryHtml = when(delivery.enabled,
      '<div class="fns-header-delivery">' +
        '<div class="fns-delivery-info">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">' +
            '<rect x="1" y="3" width="15" height="13"></rect>' +
            '<polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>' +
            '<circle cx="5.5" cy="18.5" r="2.5"></circle>' +
            '<circle cx="18.5" cy="18.5" r="2.5"></circle>' +
          '</svg>' +
          '<span class="fns-delivery-text">' + safe(delivery.info) + '</span>' +
        '</div>' +
        '<div class="fns-delivery-locations">' +
          delivery.locations.map(function(loc) {
            return '<span class="fns-delivery-location">' + safe(loc) + '</span>';
          }).join('') +
        '</div>' +
      '</div>'
    );

    var brandHtml =
      '<a class="fns-header-brand" href="' + safe(brand.href || '/index.html') + '">' +
        when(brand.logo, '<img class="fns-header-brand-logo" src="' + safe(brand.logo) + '" alt="' + safe(brand.name) + ' Logo" onerror="this.remove()">') +
        '<div class="fns-header-brand-text">' +
          '<span class="fns-header-brand-name">' + safe(brand.name) + '</span>' +
          '<span class="fns-header-brand-tagline">' + safe(brand.tagline || 'Personal Luxury. Elevated.') + '</span>' +
        '</div>' +
      '</a>';

    var searchHtml = when(search.enabled,
      '<div class="fns-header-search">' +
        '<input type="search" id="siteSearch" placeholder="' + safe(search.placeholder || 'Search products, services, guides...') + '">' +
        '<button type="button" onclick="searchSite()">Search</button>' +
      '</div>'
    );

    var navHtml = nav.map(function (item) {
      return '<a href="' + safe(item.href) + '">' + safe(item.label) + '</a>';
    }).join('');

    // Mobile menu toggle button
    var mobileToggleHtml =
      '<button class="fns-mobile-toggle" id="fnsMobileToggle" aria-label="Toggle menu" aria-expanded="false">' +
        '<span class="fns-toggle-icon"></span>' +
        '<span class="fns-toggle-icon"></span>' +
        '<span class="fns-toggle-icon"></span>' +
      '</button>';

    // Mobile navigation menu
    var mobileNavHtml =
      '<nav class="fns-mobile-nav" id="fnsMobileNav" aria-hidden="true">' +
        nav.map(function (item) {
          return '<a href="' + safe(item.href) + '" class="fns-mobile-nav-link">' + safe(item.label) + '</a>';
        }).join('') +
      '</nav>';

    var iconActionsHtml =
      '<div class="fns-header-actions">' +
        '<a href="cart.html" class="fns-header-btn" id="fldCartBtn" title="Cart">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true">' +
            '<path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7-4h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6.31l.95-4.57.03-.32a1 1 0 0 0-.29-.71l-1.39-1.39a1 1 0 0 0-1.41 0l-1.4 1.4a1 1 0 0 0 0 1.41l.82.82L8.5 14H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/>' +
          '</svg>' +
          '<span class="fns-header-badge" style="display:none">0</span>' +
        '</a>' +
        '<a href="alerts.html" class="fns-header-btn" id="fldAlertsBtn" title="Alerts">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true">' +
            '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>' +
          '</svg>' +
        '</a>' +
        '<div id="authButtonContainer"></div>' +
      '</div>';

    return (
      '<header class="fns-header">' +
        '<div class="fns-header-top-sections">' +
          topNavHtml +
          categoriesHtml +
          promotionsHtml +
          deliveryHtml +
        '</div>' +
        '<div class="fns-header-main">' +
          mobileToggleHtml +
          brandHtml +
          searchHtml +
          iconActionsHtml +
        '</div>' +
        mobileNavHtml +
      '</header>'
    );
  }

  /* ============================================================
     SECTION: FLOATING BUTTONS
  ============================================================ */

  function buildFloats(data) {
    var floats = data.floats || {};
    var html = '';

    if (floats.cart && floats.cart.enabled) {
      html +=
        '<a class="cart-float" href="' + safe(floats.cart.href || '/cart.html') + '">' +
          safe(floats.cart.label || 'Cart') + ' <span data-cart-count="">0</span>' +
        '</a>';
    }

    if (floats.whatsapp && floats.whatsapp.enabled) {
      html +=
        '<a class="chat-float" href="' + safe(floats.whatsapp.href) + '" target="_blank">' +
          safe(floats.whatsapp.label || 'WhatsApp Chat') +
        '</a>';
    }

    return html;
  }

  /* ============================================================
     HEADER ASSEMBLER
  ============================================================ */

  function buildHeaderHTML(data) {
    return buildHeader(data);
  }

  /* ============================================================
     SCROLL HANDLER — sticky header behavior
  ============================================================ */

  function initScrollHandler() {
    // Scroll handler for sticky header - main header is already sticky via CSS
    // This can be extended for additional scroll behaviors if needed
  }

  /* ============================================================
     MOBILE MENU HANDLER
  ============================================================ */

  function initMobileMenu() {
    var toggle = document.getElementById('fnsMobileToggle');
    var mobileNav = document.getElementById('fnsMobileNav');

    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function() {
      var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      mobileNav.setAttribute('aria-hidden', isExpanded);
      mobileNav.classList.toggle('active', !isExpanded);
      toggle.classList.toggle('active', !isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.classList.remove('active');
        toggle.classList.remove('active');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.classList.remove('active');
        toggle.classList.remove('active');
      }
    });
  }

  /* ============================================================
     MOUNT — inject header into page
  ============================================================ */

  function mount() {
    var data = window.FurnostylesHeaderData;
    if (!data) {
      console.warn('[FurnostylesHeader] header-data.js must be loaded before header-render.js.');
      return;
    }

    if (_mounted) return;   /* prevent double-mount from layout-loader.js */
    _mounted = true;

    var html = buildHeaderHTML(data);
    var mountPoint = document.getElementById('fns-header-mount');

    if (mountPoint) {
      mountPoint.innerHTML = html;
    } else {
      document.body.insertAdjacentHTML('afterbegin', html);
    }

    // Append floating buttons after layout
    var floatsHtml = buildFloats(data);
    if (floatsHtml) {
      var layout = document.querySelector('.premium-layout');
      if (layout) {
        layout.insertAdjacentHTML('afterend', floatsHtml);
      } else {
        document.body.insertAdjacentHTML('beforeend', floatsHtml);
      }
    }

    // Initialize auth button
    initAuthButton();

    // Initialize scroll handler
    initScrollHandler();

    // Initialize mobile menu
    initMobileMenu();
  }

  /* ============================================================
     AUTH BUTTON LOGIC
  ============================================================ */

  function safe(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function initAuthButton() {
    var container = document.getElementById('authButtonContainer');
    if (!container) return;

    // Check if user is logged in
    var user = null;
    try {
      user = JSON.parse(localStorage.getItem('fns_local_user') || 'null');
    } catch (e) {}

    if (user) {
      // User is logged in - show avatar with dropdown
      var userName = user.fullName || user.email || 'User';
      var initials = 'U';
      if (userName && userName.length > 0) {
        var parts = userName.trim().split(/\s+/);
        if (parts.length >= 2) {
          initials = (parts[0][0] + parts[1][0]).toUpperCase();
        } else if (parts.length === 1 && parts[0].length > 0) {
          initials = parts[0][0].toUpperCase();
        }
      }

      container.innerHTML =
        '<div class="fns-auth-dropdown">' +
          '<button class="fns-auth-btn fns-auth-logged-in" id="fnsAuthBtn" aria-haspopup="true" aria-expanded="false">' +
            '<div class="fns-auth-avatar">' + safe(initials) + '</div>' +
            '<span class="fns-auth-name">' + safe(userName.split(' ')[0]) + '</span>' +
            '<svg class="fns-auth-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">' +
              '<polyline points="6 9 12 15 18 9"/>' +
            '</svg>' +
          '</button>' +
          '<div class="fns-auth-menu" role="menu">' +
            '<a href="dashboards/client/index.html" class="fns-auth-menu-item" role="menuitem">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">' +
                '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>' +
                '<polyline points="9 22 9 12 15 12 15 22"/>' +
              '</svg>' +
              'Dashboard' +
            '</a>' +
            '<a href="upload.html" class="fns-auth-menu-item" role="menuitem">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">' +
                '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>' +
                '<polyline points="17 8 12 3 7 8"/>' +
                '<line x1="12" y1="3" x2="12" y2="15"/>' +
              '</svg>' +
              'Sell Item' +
            '</a>' +
            '<a href="dropshipping-dashboard.html" class="fns-auth-menu-item" role="menuitem">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">' +
                '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' +
                '<polyline points="3.27 6.96 12 12.01 20.73 6.96"/>' +
                '<line x1="12" y1="22.08" x2="12" y2="12"/>' +
              '</svg>' +
              'Dropshipping' +
            '</a>' +
            '<div class="fns-auth-divider"></div>' +
            '<button class="fns-auth-menu-item fns-auth-logout" id="fnsLogoutBtn" role="menuitem">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">' +
                '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>' +
                '<polyline points="16 17 21 12 16 7"/>' +
                '<line x1="21" y1="12" x2="9" y2="12"/>' +
              '</svg>' +
              'Sign Out' +
            '</button>' +
          '</div>' +
        '</div>';

      // Toggle dropdown
      var authBtn = document.getElementById('fnsAuthBtn');
      var authMenu = container.querySelector('.fns-auth-menu');
      if (authBtn && authMenu) {
        authBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          var expanded = authBtn.getAttribute('aria-expanded') === 'true';
          authBtn.setAttribute('aria-expanded', !expanded);
          authMenu.classList.toggle('active', !expanded);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
          if (!container.contains(e.target)) {
            authBtn.setAttribute('aria-expanded', 'false');
            authMenu.classList.remove('active');
          }
        });
      }

      // Logout functionality
      var logoutBtn = document.getElementById('fnsLogoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
          if (window.FurnostylesAuth) {
            window.FurnostylesAuth.signOut()
              .then(function () {
                location.href = 'index.html';
              })
              .catch(function () {
                localStorage.removeItem('fns_local_user');
                location.href = 'index.html';
              });
          } else {
            localStorage.removeItem('fns_local_user');
            location.href = 'index.html';
          }
        });
      }
    } else {
      // User is not logged in - show login button
      container.innerHTML =
        '<a href="login.html" class="fns-auth-btn fns-auth-login-btn">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">' +
            '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>' +
            '<circle cx="12" cy="7" r="4"/>' +
          '</svg>' +
          '<span>Sign In</span>' +
        '</a>';
    }
  }

  /* ============================================================
     PUBLIC API
  ============================================================ */

  window.FurnostylesHeader = {
    init: mount,
    updateCart: function (count) {
      var cartCount = document.getElementById('fldCartCount');
      if (cartCount) {
        cartCount.textContent = count;
      }
      var dataCartCount = document.querySelector('[data-cart-count]');
      if (dataCartCount) {
        dataCartCount.textContent = count;
      }
    },
    refreshAuthButton: initAuthButton
  };

  /* Auto-init — runs immediately if DOM is ready, otherwise waits */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

}());
