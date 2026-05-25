/**
 * FURNOSTYLES — APP.JS
 * ====================
 * File: assets/js/app.js
 * Purpose: Core page initialisation. Runs on DOMContentLoaded.
 *          Handles: header compact-on-scroll, search submit,
 *          cart count badge, alerts badge, account state display,
 *          floating back-to-top button, scroll-reveal animations.
 *
 * Depends on: firebase-bridge.js (optional, degrades gracefully)
 * No external libraries. Vanilla JS only.
 */

(function () {
  'use strict';

  /* ============================================================
     SITE SEARCH
  ============================================================ */

  window.searchSite = function () {
    var input = document.getElementById('siteSearch');
    if (!input) return;

    var query = (input.value || '').trim();
    if (!query) return;

    // Redirect to marketplace with search query
    window.location.href = 'marketplace.html?q=' + encodeURIComponent(query);
  };

  /* ============================================================
     CHAT WIDGET
  ============================================================ */

  window.toggleChatWidget = function () {
    var widget = document.querySelector('.chat-widget');
    if (widget) {
      widget.classList.toggle('active');
    }
  };

  window.openLiveChat = function () {
    alert('Live chat coming soon! Please use WhatsApp for immediate assistance.');
  };

  /* ============================================================
     CART MANAGEMENT
  ============================================================ */

  window.updateCartCount = function (count) {
    var cartCount = document.getElementById('fldCartCount');
    var dataCartCount = document.querySelector('[data-cart-count]');

    if (cartCount) cartCount.textContent = count;
    if (dataCartCount) dataCartCount.textContent = count;

    // Update localStorage
    try {
      localStorage.setItem('fldCartCount', count);
    } catch (e) {}
  };

  window.getCartCount = function () {
    try {
      return parseInt(localStorage.getItem('fldCartCount') || '0', 10);
    } catch (e) {
      return 0;
    }
  };

  /* ============================================================
     ACCOUNT STATE
  ============================================================ */

  window.updateAccountState = function (user) {
    var accountBtn = document.getElementById('fldAccountBtn');
    var accountAvatar = document.getElementById('fldAccountAvatar');
    var userName = accountBtn ? accountBtn.parentElement.querySelector('.user-name') : null;

    if (!accountBtn) return;

    if (user && user.name) {
      if (accountAvatar) {
        // For SVG avatar, we could change the fill color or add a user-specific styling
        accountAvatar.style.color = 'var(--fns-gold-primary)';
      }
      if (userName) {
        userName.textContent = user.name;
        userName.hidden = false;
      }
      accountBtn.setAttribute('data-logged-in', 'true');
    } else {
      if (accountAvatar) {
        accountAvatar.style.color = '';
      }
      if (userName) userName.hidden = true;
      accountBtn.setAttribute('data-logged-in', 'false');
    }
  };

  /* ============================================================
     HEADER SCROLL BEHAVIOR
  ============================================================ */

  var header = null;
  var lastScroll = 0;

  function handleScroll() {
    if (!header) {
      header = document.querySelector('.premium-header');
    }
    if (!header) return;

    var currentScroll = window.pageYOffset;

    // Add compact class when scrolled down
    if (currentScroll > 50) {
      header.classList.add('compact');
    } else {
      header.classList.remove('compact');
    }

    lastScroll = currentScroll;
  }

  /* ============================================================
     CONTACT FORM VALIDATION
  ============================================================ */

  function initContactForm() {
    var contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var service = document.getElementById('service').value;
      var budget = document.getElementById('budget').value;
      var contactMethod = document.getElementById('contactMethod').value;
      var message = document.getElementById('message').value.trim();

      // Basic validation
      if (!name || !email || !phone || !service || !contactMethod || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Phone validation (basic check for numbers)
      var phoneRegex = /^[+]?[\d\s\-()]+$/;
      if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number.');
        return;
      }

      // If validation passes, show success message
      var successMessage = document.getElementById('formSuccessMessage');
      if (successMessage) {
        successMessage.classList.remove('fns-hidden');
        contactForm.reset();
      }

      // In production, this would send data to backend
      console.log('Form submitted:', {
        name: name,
        email: email,
        phone: phone,
        service: service,
        budget: budget,
        contactMethod: contactMethod,
        message: message
      });
    });
  }

  /* ============================================================
     BLOG FILTERING
  ============================================================ */

  function initBlogFiltering() {
    var filterBtns = document.querySelectorAll('.fns-filter-btn');
    var blogGrid = document.getElementById('blogGrid');
    var blogCards = blogGrid ? blogGrid.querySelectorAll('.fns-card') : [];

    if (!filterBtns.length || !blogGrid) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = this.getAttribute('data-category');

        // Update active button state
        filterBtns.forEach(function (b) {
          b.classList.remove('fns-btn-primary');
          b.classList.add('fns-btn-outline');
        });
        this.classList.remove('fns-btn-outline');
        this.classList.add('fns-btn-primary');

        // Filter cards
        blogCards.forEach(function (card) {
          var cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('fns-hidden');
          } else {
            card.classList.add('fns-hidden');
          }
        });
      });
    });

    // Search functionality
    var searchInput = document.getElementById('blogSearch');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        var searchTerm = this.value.toLowerCase().trim();

        blogCards.forEach(function (card) {
          var title = card.querySelector('.fns-card-title').textContent.toLowerCase();
          var description = card.querySelector('.fns-card-description').textContent.toLowerCase();

          if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.classList.remove('fns-hidden');
          } else {
            card.classList.add('fns-hidden');
          }
        });
      });
    }
  }

  /* ============================================================
     INITIALISATION
  ============================================================ */

  function init() {
    // Load cart count from localStorage
    updateCartCount(getCartCount());

    // Check for logged-in user from localStorage
    try {
      var user = JSON.parse(localStorage.getItem('fldUser') || 'null');
      if (user) {
        updateAccountState(user);
      }
    } catch (e) {}

    // Initialize contact form
    initContactForm();

    // Initialize blog filtering
    initBlogFiltering();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle search on Enter key
    var searchInput = document.getElementById('siteSearch');
    if (searchInput) {
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          searchSite();
        }
      });
    }

    // Wire search buttons
    var searchButtons = document.querySelectorAll('button[aria-label="Search"]');
    searchButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        searchSite();
      });
    });

    // Wire chat widget toggle
    var chatWidgetToggle = document.querySelector('.chat-widget-toggle');
    if (chatWidgetToggle) {
      chatWidgetToggle.addEventListener('click', function (e) {
        e.preventDefault();
        toggleChatWidget();
      });
    }

    // Wire live chat option
    var liveChatOption = document.querySelector('.chat-option.livechat');
    if (liveChatOption) {
      liveChatOption.addEventListener('click', function (e) {
        e.preventDefault();
        openLiveChat();
      });
    }

    // Wire cart button
    var cartBtn = document.getElementById('fldCartBtn');
    if (cartBtn) {
      cartBtn.addEventListener('click', function () {
        window.location.href = 'cart.html';
      });
    }

    // Wire account button
    var accountBtn = document.getElementById('fldAccountBtn');
    if (accountBtn) {
      accountBtn.addEventListener('click', function () {
        window.location.href = 'accounts/login.html';
      });
    }

    // Wire alerts button
    var alertsBtn = document.getElementById('fldAlertsBtn');
    if (alertsBtn) {
      alertsBtn.addEventListener('click', function () {
        // TODO: Open alerts panel
        alert('Alerts panel coming soon');
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
