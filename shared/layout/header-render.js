/**
 * FURNOSTYLES — HEADER RENDERER
 * ==============================
 * File: shared/layout/header-render.js
 * Purpose: Reads window.FurnostylesHeaderData and renders the shared
 *          topbar + sticky header into #fns-header-mount.
 *          Also renders floating cart and WhatsApp buttons.
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
     SECTION: TOPBAR
  ============================================================ */

  function buildTopbar(data) {
    var tb = data.topbar || {};
    if (!tb.enabled) return '';
    return (
      '<div class="premium-topbar">' +
        '<span>' + safe(tb.left || '') + '</span>' +
        '<span>' + safe(tb.right || '') + '</span>' +
      '</div>'
    );
  }

  /* ============================================================
     SECTION: HEADER
  ============================================================ */

  function buildHeader(data) {
    var brand = data.brand || {};
    var search = data.search || {};
    var nav = data.nav || [];

    var brandHtml =
      '<a class="premium-brand" href="' + safe(brand.href || '/index.html') + '">' +
        when(brand.logo, '<img src="' + safe(brand.logo) + '" alt="' + safe(brand.name) + '" onerror="this.remove()">') +
        '<span>' + safe(brand.name) + '</span>' +
      '</a>';

    var searchHtml = when(search.enabled,
      '<div class="fld-youtube-search">' +
        '<input type="search" id="siteSearch" placeholder="' + safe(search.placeholder || 'Search...') + '">' +
        '<button type="button" onclick="searchSite()">Search</button>' +
      '</div>'
    );

    var navHtml = nav.map(function (item) {
      return '<a href="' + safe(item.href) + '">' + safe(item.label) + '</a>';
    }).join('');

    var iconActionsHtml =
      '<div class="fld-icon-actions">' +
        '<button class="fld-icon-btn" id="fldCartBtn" title="Cart">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true">' +
            '<path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7-4h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6.31l.95-4.57.03-.32a1 1 0 0 0-.29-.71l-1.39-1.39a1 1 0 0 0-1.41 0l-1.4 1.4a1 1 0 0 0 0 1.41l.82.82L8.5 14H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/>' +
          '</svg>' +
          '<span class="fld-badge" id="fldCartCount" data-cart-count>0</span>' +
        '</button>' +
        '<button class="fld-icon-btn" id="fldAlertsBtn" title="Alerts">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true">' +
            '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>' +
          '</svg>' +
          '<span class="fld-badge" id="fldAlertsCount">0</span>' +
        '</button>' +
        '<button class="fld-avatar-btn" id="fldAccountBtn" data-login-tooltip="Sign up and Log in">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" class="avatar-icon" id="fldAccountAvatar" aria-hidden="true">' +
            '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>' +
            '<circle cx="12" cy="7" r="4"/>' +
          '</svg>' +
          '<span class="user-name" hidden></span>' +
        '</button>' +
      '</div>';

    return (
      '<header class="premium-header">' +
        brandHtml +
        searchHtml +
        iconActionsHtml +
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
    return [
      buildTopbar(data),
      buildHeader(data)
    ].join('');
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
    }
  };

  /* Auto-init — runs immediately if DOM is ready, otherwise waits */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

}());

/* ================================================================
   FURNOSTYLES HEADER UI  —  Auth / Cart / Alerts Interactive Panels
   Runs after header-render mounts the header HTML.
   Works in both local (localStorage) and Firebase modes.
================================================================ */
(function () {
  'use strict';

  /* ----------------------------------------------------------
     CSS — now in layout.css, no longer injected
  ---------------------------------------------------------- */
  function injectCSS() {
    // CSS moved to assets/css/layout.css
    // No longer needed to inject via JS
  }

  /* ----------------------------------------------------------
     CART helpers  (localStorage)
  ---------------------------------------------------------- */
  function cartGet() {
    try { return JSON.parse(localStorage.getItem('furnostyles_cart') || '[]'); } catch (e) { return []; }
  }
  function cartSave(c) { localStorage.setItem('furnostyles_cart', JSON.stringify(c)); }
  function cartCount() { return cartGet().reduce(function (s, i) { return s + (i.quantity || 1); }, 0); }
  function cartTotal() { return cartGet().reduce(function (s, i) { return s + Number(i.price || 0) * Number(i.quantity || 1); }, 0); }

  function cartBadgeRefresh() {
    var n = cartCount();
    var b = document.getElementById('fldCartCount');
    if (b) { b.textContent = n; b.style.display = n > 0 ? '' : 'none'; }
    document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = n; });
  }

  /* Public addToCart — called from product pages */
  window.FurnostylesCart = {
    add: function (item) {
      var c = cartGet();
      var idx = -1;
      c.forEach(function (x, i) { if (x.id === item.id) idx = i; });
      if (idx >= 0) { c[idx].quantity = (c[idx].quantity || 1) + (item.quantity || 1); }
      else { c.push({ id: item.id || ('item_' + Date.now()), title: item.title || 'Item', price: item.price || 0, quantity: item.quantity || 1, category: item.category || 'product', vendorId: item.vendorId || null }); }
      cartSave(c);
      cartBadgeRefresh();
      /* flash the cart panel open briefly */
      var panel = document.getElementById('fnsCartPanel');
      if (panel) { refreshCartPanel(panel); openCartPanel(); }
    },
    remove: function (id) { cartSave(cartGet().filter(function (i) { return i.id !== id; })); cartBadgeRefresh(); },
    get: cartGet,
    clear: function () { localStorage.removeItem('furnostyles_cart'); cartBadgeRefresh(); }
  };

  /* ----------------------------------------------------------
     ALERTS helpers
  ---------------------------------------------------------- */
  function alertsGet() {
    try { return JSON.parse(localStorage.getItem('furnostyles_alerts') || '[]'); } catch (e) { return []; }
  }
  function alertsBadgeRefresh() {
    var n = alertsGet().filter(function (a) { return !a.read; }).length;
    var b = document.getElementById('fldAlertsCount');
    if (b) { b.textContent = n; b.style.display = n > 0 ? '' : 'none'; }
  }
  function alertsMarkRead() {
    var a = alertsGet().map(function (x) { return Object.assign({}, x, { read: true }); });
    localStorage.setItem('furnostyles_alerts', JSON.stringify(a));
    alertsBadgeRefresh();
  }

  function buildAlertsHTML() {
    var list = alertsGet();
    if (!list.length) return '<div class="fns-alerts-none">No notifications yet</div>';
    return list.slice(0, 8).map(function (a) {
      return '<div class="fns-alert-row ' + (a.read ? '' : 'unread') + '">' +
        '<div class="fns-alert-dot ' + (a.read ? 'read' : '') + '"></div>' +
        '<div class="fns-alert-txt"><p>' + (a.text || '') + '</p><span>' + (a.time || '') + '</span></div>' +
      '</div>';
    }).join('');
  }

  /* ----------------------------------------------------------
     CART PANEL HTML
  ---------------------------------------------------------- */
  function buildCartItemsHTML() {
    var c = cartGet();
    if (!c.length) {
      return '<div class="fns-cart-empty-msg">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5" width="52" height="52"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' +
        '<p>Your cart is empty</p>' +
        '<a href="marketplace.html" style="color:#1a7d9a;font-size:.88rem;text-decoration:none">Browse Marketplace &rarr;</a>' +
      '</div>';
    }
    return c.map(function (item) {
      var lineTotal = (Number(item.price) * Number(item.quantity || 1)).toLocaleString();
      return '<div class="fns-cart-item-row" data-cart-rid="' + item.id + '">' +
        '<div class="fns-cart-item-info">' +
          '<p class="fns-cart-item-title">' + (item.title || 'Item') + '</p>' +
          '<span class="fns-cart-item-meta">KES ' + lineTotal + '<span class="fns-cart-item-qty">× ' + (item.quantity || 1) + '</span></span>' +
        '</div>' +
        '<button class="fns-cart-rmv" data-rmv="' + item.id + '" title="Remove">×</button>' +
      '</div>';
    }).join('');
  }

  function refreshCartPanel(panel) {
    var body = panel.querySelector('.fns-cart-panel-body');
    var sub = panel.querySelector('.fns-cart-sub-amt');
    if (body) body.innerHTML = buildCartItemsHTML();
    if (sub) sub.textContent = 'KES ' + cartTotal().toLocaleString();
    panel.querySelectorAll('[data-rmv]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.FurnostylesCart.remove(btn.getAttribute('data-rmv'));
        refreshCartPanel(panel);
      });
    });
  }

  function openCartPanel() {
    var panel = document.getElementById('fnsCartPanel');
    var ov = document.getElementById('fnsOverlay');
    closeAll();
    if (panel) { refreshCartPanel(panel); panel.classList.add('fns-open'); }
    if (ov) ov.classList.add('fns-active');
  }

  /* ----------------------------------------------------------
     AUTH DROPDOWN
  ---------------------------------------------------------- */
  function renderAuthDrop(drop, user) {
    if (!user) {
      drop.innerHTML =
        '<div class="fns-auth-drop-hello">Hello,</div>' +
        '<div class="fns-auth-drop-name">Sign in for the best experience</div>' +
        '<a href="login.html" class="fns-adb p">Sign In</a>' +
        '<a href="register.html" class="fns-adb o">New user? Register free</a>' +
        '<div class="fns-auth-links">' +
          '<a href="buyer-protection.html">&#128737; Buyer Protection</a>' +
          '<a href="vendor-policy.html">&#128722; Become a Vendor</a>' +
          '<a href="about.html">&#8505; About Furnostyles</a>' +
        '</div>';
    } else {
      // Use FurnostylesSession for display name if available
      var displayName = '';
      if (window.FurnostylesSession) {
        displayName = window.FurnostylesSession.getDisplayName();
      } else {
        displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'My Account');
      }

      // Get user role for dashboard link
      var role = 'client';
      if (window.FurnostylesSession) {
        role = window.FurnostylesSession.getRole() || 'client';
      }

      // Determine dashboard URL based on role
      var dashboardUrl = 'client/dashboard.html';
      if (role === 'vendor') dashboardUrl = 'vendor/vendor-dashboard.html';
      else if (role === 'admin') dashboardUrl = 'admin/admin-dashboard.html';

      drop.innerHTML =
        '<div class="fns-auth-drop-hello">Hello,</div>' +
        '<div class="fns-auth-drop-name">' + displayName + '</div>' +
        '<div class="fns-auth-links">' +
          '<a href="' + dashboardUrl + '">&#128218; My Dashboard</a>' +
          '<a href="alerts.html">&#128276; Notifications</a>' +
          '<a href="cart.html">&#128722; My Cart</a>' +
          '<a href="add-listing.html">&#43; Sell / List an Item</a>' +
          '<a href="inquiries.html">&#128172; My Enquiries</a>' +
        '</div>' +
        '<button class="fns-adb d" id="fnsSignOutBtn">Sign Out</button>';
      setTimeout(function () {
        var btn = document.getElementById('fnsSignOutBtn');
        if (!btn) return;
        btn.addEventListener('click', function () {
          // Use new FurnostylesAuth signOut
          if (window.FurnostylesAuth) {
            window.FurnostylesAuth.signOut()
              .then(function () {
                location.href = 'index.html';
              })
              .catch(function () {
                // Fallback to localStorage cleanup
                localStorage.removeItem('fns_local_user');
                location.href = 'index.html';
              });
          } else {
            // Fallback to old methods
            var b = window.FurnostylesFirebase;
            var p = (b && b.auth && b.auth.signOut) ? b.auth.signOut()
                  : (window.FurnostylesAuthState && window.FurnostylesAuthState.signOut) ? window.FurnostylesAuthState.signOut()
                  : Promise.resolve();
            p.then(function () {
              localStorage.removeItem('fns_local_user');
              location.href = 'index.html';
            }).catch(function () {
              localStorage.removeItem('fns_local_user');
              location.href = 'index.html';
            });
          }
        });
      }, 30);
    }
  }

  function updateAccountBtnUI(user) {
    var btn = document.getElementById('fldAccountBtn');
    if (!btn) return;
    var svg = btn.querySelector('.avatar-icon');
    var nameSpan = btn.querySelector('.user-name');
    var existing = btn.querySelector('.fns-av-init');
    if (user) {
      // Use FurnostylesSession for display name if available
      var displayName = '';
      var initials = '';
      if (window.FurnostylesSession) {
        displayName = window.FurnostylesSession.getDisplayName();
        initials = window.FurnostylesSession.getInitials();
      } else {
        displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'Me');
        initials = displayName.charAt(0).toUpperCase();
      }

      if (existing) { existing.textContent = initials; }
      else {
        var circle = document.createElement('span');
        circle.className = 'fns-av-init';
        circle.textContent = initials;
        btn.insertBefore(circle, btn.firstChild);
      }
      if (svg) svg.style.display = 'none';
      if (nameSpan) { nameSpan.textContent = displayName.length > 12 ? displayName.slice(0, 12) + '…' : displayName; nameSpan.removeAttribute('hidden'); }
    } else {
      if (existing) existing.remove();
      if (svg) svg.style.display = '';
      if (nameSpan) nameSpan.setAttribute('hidden', '');
    }
  }

  /* ----------------------------------------------------------
     CLOSE ALL PANELS
  ---------------------------------------------------------- */
  function closeAll() {
    ['fnsAuthDrop', 'fnsAlertsDrop'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove('fns-open');
    });
    var panel = document.getElementById('fnsCartPanel');
    if (panel) panel.classList.remove('fns-open');
    var ov = document.getElementById('fnsOverlay');
    if (ov) ov.classList.remove('fns-active');
  }

  /* ----------------------------------------------------------
     BUILD DOM ELEMENTS
  ---------------------------------------------------------- */
  function buildCartPanelEl() {
    if (document.getElementById('fnsCartPanel')) return document.getElementById('fnsCartPanel');
    var el = document.createElement('div');
    el.className = 'fns-cart-panel';
    el.id = 'fnsCartPanel';
    el.innerHTML =
      '<div class="fns-cart-panel-head">' +
        '<h2>&#128722; My Cart</h2>' +
        '<button class="fns-cart-panel-close" id="fnsCartClose" aria-label="Close">&#215;</button>' +
      '</div>' +
      '<div class="fns-cart-panel-body"></div>' +
      '<div class="fns-cart-panel-foot">' +
        '<div class="fns-cart-subtotal"><span>Subtotal</span><span class="fns-cart-sub-amt">KES 0</span></div>' +
        '<a href="checkout.html" class="fns-cart-cta p">Proceed to Checkout</a>' +
        '<a href="cart.html" class="fns-cart-cta o">View Full Cart</a>' +
      '</div>';
    document.body.appendChild(el);
    return el;
  }

  function buildAuthDropEl(anchor) {
    if (document.getElementById('fnsAuthDrop')) return document.getElementById('fnsAuthDrop');
    var drop = document.createElement('div');
    drop.className = 'fns-auth-drop';
    drop.id = 'fnsAuthDrop';
    anchor.style.position = 'relative';
    anchor.appendChild(drop);
    return drop;
  }

  function buildAlertsDropEl(anchor) {
    if (document.getElementById('fnsAlertsDrop')) return document.getElementById('fnsAlertsDrop');
    var drop = document.createElement('div');
    drop.className = 'fns-alerts-drop';
    drop.id = 'fnsAlertsDrop';
    drop.innerHTML =
      '<div class="fns-alerts-drop-head"><h3>&#128276; Notifications</h3><a href="alerts.html">View all</a></div>' +
      '<div class="fns-alerts-scroller" id="fnsAlertsScroller"></div>' +
      '<div class="fns-alerts-drop-foot"><a href="alerts.html">See all notifications</a></div>';
    anchor.style.position = 'relative';
    anchor.appendChild(drop);
    return drop;
  }

  function buildOverlayEl() {
    if (document.getElementById('fnsOverlay')) return document.getElementById('fnsOverlay');
    var ov = document.createElement('div');
    ov.className = 'fns-overlay';
    ov.id = 'fnsOverlay';
    document.body.appendChild(ov);
    return ov;
  }

  /* ----------------------------------------------------------
     MAIN INIT
  ---------------------------------------------------------- */
  function initHeaderUI() {
    injectCSS();

    var accountBtn = document.getElementById('fldAccountBtn');
    var cartBtn    = document.getElementById('fldCartBtn');
    var alertsBtn  = document.getElementById('fldAlertsBtn');

    if (!accountBtn) return; /* header not mounted yet — retry */

    var ov         = buildOverlayEl();
    var cartPanel  = buildCartPanelEl();
    var authDrop   = buildAuthDropEl(accountBtn);
    var alertsDrop = alertsBtn ? buildAlertsDropEl(alertsBtn) : null;

    /* Initial renders */
    renderAuthDrop(authDrop, null);
    cartBadgeRefresh();
    alertsBadgeRefresh();

    /* Account button */
    accountBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = authDrop.classList.contains('fns-open');
      closeAll();
      if (!open) { authDrop.classList.add('fns-open'); ov.classList.add('fns-active'); }
    });

    /* Cart button */
    cartBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = cartPanel.classList.contains('fns-open');
      closeAll();
      if (!open) { openCartPanel(); }
    });
    document.getElementById('fnsCartClose').addEventListener('click', closeAll);

    /* Alerts button */
    if (alertsBtn && alertsDrop) {
      alertsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = alertsDrop.classList.contains('fns-open');
        closeAll();
        if (!open) {
          var scroller = document.getElementById('fnsAlertsScroller');
          if (scroller) scroller.innerHTML = buildAlertsHTML();
          alertsDrop.classList.add('fns-open');
          ov.classList.add('fns-active');
          alertsMarkRead();
        }
      });
    }

    /* Overlay + Escape close */
    ov.addEventListener('click', closeAll);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

    /* localStorage sync (other tabs) */
    window.addEventListener('storage', function (e) {
      if (e.key === 'furnostyles_cart') { cartBadgeRefresh(); if (cartPanel.classList.contains('fns-open')) refreshCartPanel(cartPanel); }
      if (e.key === 'furnostyles_alerts') alertsBadgeRefresh();
    });

    /* Firebase / local auth state */
    var bridge = window.FurnostylesFirebase;
    if (bridge && bridge.onAuthChange) {
      bridge.onAuthChange(function (user) {
        /* In local mode bridge always returns null; supplement with localStorage session */
        if (!user && bridge.mode === 'local') {
          try { user = JSON.parse(localStorage.getItem('fns_local_user') || 'null'); } catch (e) {}
        }
        renderAuthDrop(authDrop, user);
        updateAccountBtnUI(user);
      });
    }
    /* Also check immediately if bridge not yet ready */
    try {
      var lsUser = JSON.parse(localStorage.getItem('fns_local_user') || 'null');
      if (lsUser) { renderAuthDrop(authDrop, lsUser); updateAccountBtnUI(lsUser); }
    } catch (e) {}
  }

  /* Retry until header is mounted */
  function tryInit(attempts) {
    if (document.getElementById('fldAccountBtn')) { initHeaderUI(); return; }
    if (attempts > 0) setTimeout(function () { tryInit(attempts - 1); }, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { tryInit(10); });
  } else {
    tryInit(10);
  }

}());
