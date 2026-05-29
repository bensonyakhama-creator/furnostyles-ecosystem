/**
 * FURNOSTYLES — PAYMENT UI COMPONENTS
 * ====================================
 * File: shared/payment/payment-ui.js
 * Purpose: UI components for payment processing
 *          Payment form, payment method selection, status display
 *
 * Dependencies:
 *   - shared/payment/payment-config.js
 *   - shared/payment/payment-service.js
 *   - shared/modal/modal.js (for payment modals)
 *
 * Usage:
 *   window.FurnostylesPaymentUI.renderPaymentForm(container, options)
 *   window.FurnostylesPaymentUI.showPaymentModal(paymentData)
 */

(function() {
  'use strict';

  /* ============================================================
     PAYMENT FORM RENDERER
     ============================================================ */

  /**
   * Render payment form
   * @param {HTMLElement} container - Container element
   * @param {object} options - Form options
   */
  function renderPaymentForm(container, options) {
    if (!container) return;

    options = options || {};
    var amount = options.amount || 0;
    var currency = options.currency || 'KES';
    var description = options.description || '';
    var enabledProviders = window.FurnostylesPaymentConfig.getEnabledProviders();

    var html = '<div class="fns-payment-form">' +
      '<div class="fns-payment-summary">' +
        '<div class="fns-payment-amount">' + formatAmount(amount, currency) + '</div>' +
        '<div class="fns-payment-description">' + escapeHtml(description) + '</div>' +
      '</div>' +
      '<div class="fns-payment-methods">' +
        '<h3 class="fns-payment-methods-title">Select Payment Method</h3>' +
        '<div class="fns-payment-methods-list">';

    if (enabledProviders.length === 0) {
      html += '<div class="fns-payment-error">No payment providers enabled. Please contact support.</div>';
    } else {
      enabledProviders.forEach(function(providerId) {
        var provider = window.FurnostylesPaymentConfig.getProvider(providerId);
        html += renderPaymentMethodOption(providerId, provider);
      });
    }

    html += '</div></div>' +
      '<div class="fns-payment-actions">' +
        '<button type="button" class="fns-btn fns-btn-primary fns-pay-btn" disabled>Proceed to Pay</button>' +
        '<button type="button" class="fns-btn fns-btn-secondary fns-cancel-btn">Cancel</button>' +
      '</div>' +
    '</div>';

    container.innerHTML = html;
    attachPaymentFormListeners(container, options);
  }

  /**
   * Render payment method option
   * @param {string} providerId - Provider ID
   * @param {object} provider - Provider config
   * @returns {string} - HTML string
   */
  function renderPaymentMethodOption(providerId, provider) {
    var icon = getProviderIcon(providerId);
    return '<div class="fns-payment-method" data-provider="' + providerId + '">' +
      '<div class="fns-payment-method-icon">' + icon + '</div>' +
      '<div class="fns-payment-method-info">' +
        '<div class="fns-payment-method-name">' + escapeHtml(provider.name) + '</div>' +
        '<div class="fns-payment-method-desc">Pay securely with ' + escapeHtml(provider.name) + '</div>' +
      '</div>' +
      '<div class="fns-payment-method-radio">' +
        '<input type="radio" name="payment_method" value="' + providerId + '" id="pm_' + providerId + '">' +
        '<label for="pm_' + providerId + '"></label>' +
      '</div>' +
    '</div>';
  }

  /**
   * Get provider icon
   * @param {string} providerId - Provider ID
   * @returns {string} - Icon HTML
   */
  function getProviderIcon(providerId) {
    var icons = {
      stripe: '💳',
      paypal: '🅿️',
      mpesa: '📱',
      card: '💳'
    };
    return icons[providerId] || '💰';
  }

  /**
   * Attach listeners to payment form
   * @param {HTMLElement} container - Container element
   * @param {object} options - Form options
   */
  function attachPaymentFormListeners(container, options) {
    var payBtn = container.querySelector('.fns-pay-btn');
    var cancelBtn = container.querySelector('.fns-cancel-btn');
    var methodRadios = container.querySelectorAll('input[name="payment_method"]');

    // Enable/disable pay button based on selection
    methodRadios.forEach(function(radio) {
      radio.addEventListener('change', function() {
        payBtn.disabled = false;
      });
    });

    // Pay button handler
    payBtn.addEventListener('click', function() {
      var selectedMethod = container.querySelector('input[name="payment_method"]:checked');
      if (selectedMethod) {
        var providerId = selectedMethod.value;
        handlePaymentSubmit(providerId, options);
      }
    });

    // Cancel button handler
    cancelBtn.addEventListener('click', function() {
      if (options.onCancel) {
        options.onCancel();
      }
    });
  }

  /**
   * Handle payment submission
   * @param {string} providerId - Selected provider
   * @param {object} options - Form options
   */
  function handlePaymentSubmit(providerId, options) {
    // Show provider-specific form
    switch (providerId) {
      case 'stripe':
        showStripeForm(options);
        break;
      case 'paypal':
        showPayPalForm(options);
        break;
      case 'mpesa':
        showMpesaForm(options);
        break;
      default:
        console.error('[PaymentUI] Unknown provider:', providerId);
    }
  }

  /* ============================================================
     PROVIDER-SPECIFIC FORMS
     ============================================================ */

  /**
   * Show Stripe card form
   * @param {object} options - Payment options
   */
  function showStripeForm(options) {
    if (window.FurnostylesModal) {
      var modalHtml = '<div class="fns-stripe-form">' +
        '<h3>Card Details</h3>' +
        '<div class="fns-form-group">' +
          '<label>Card Number</label>' +
          '<input type="text" class="fns-input" placeholder="4242 4242 4242 4242" maxlength="19">' +
        '</div>' +
        '<div class="fns-form-row">' +
          '<div class="fns-form-group">' +
            '<label>Expiry Date</label>' +
            '<input type="text" class="fns-input" placeholder="MM/YY" maxlength="5">' +
          '</div>' +
          '<div class="fns-form-group">' +
            '<label>CVC</label>' +
            '<input type="text" class="fns-input" placeholder="123" maxlength="3">' +
          '</div>' +
        '</div>' +
        '<div class="fns-form-group">' +
          '<label>Cardholder Name</label>' +
          '<input type="text" class="fns-input" placeholder="Name on card">' +
        '</div>' +
        '<button type="button" class="fns-btn fns-btn-primary fns-confirm-card-btn">Pay ' + formatAmount(options.amount, options.currency) + '</button>' +
      '</div>';

      window.FurnostylesModal.show({
        title: 'Enter Card Details',
        content: modalHtml,
        onConfirm: function() {
          // Handle Stripe payment confirmation
          if (options.onConfirm) {
            options.onConfirm({ provider: 'stripe' });
          }
        }
      });
    }
  }

  /**
   * Show PayPal form
   * @param {object} options - Payment options
   */
  function showPayPalForm(options) {
    // PayPal typically redirects to their site
    if (options.onConfirm) {
      options.onConfirm({ provider: 'paypal' });
    }
  }

  /**
   * Show M-Pesa form
   * @param {object} options - Payment options
   */
  function showMpesaForm(options) {
    if (window.FurnostylesModal) {
      var modalHtml = '<div class="fns-mpesa-form">' +
        '<h3>M-Pesa Payment</h3>' +
        '<div class="fns-form-group">' +
          '<label>Phone Number</label>' +
          '<input type="tel" class="fns-input fns-mpesa-phone" placeholder="07XX XXX XXX" maxlength="10">' +
        '</div>' +
        '<div class="fns-mpesa-amount">' +
          '<span>Amount: </span>' +
          '<strong>' + formatAmount(options.amount, options.currency) + '</strong>' +
        '</div>' +
        '<div class="fns-mpesa-note">' +
          'You will receive an M-Pesa prompt on your phone to confirm the payment.' +
        '</div>' +
        '<button type="button" class="fns-btn fns-btn-primary fns-confirm-mpesa-btn">Pay Now</button>' +
      '</div>';

      window.FurnostylesModal.show({
        title: 'M-Pesa Payment',
        content: modalHtml,
        onConfirm: function() {
          var phone = document.querySelector('.fns-mpesa-phone').value;
          if (options.onConfirm) {
            options.onConfirm({ provider: 'mpesa', phoneNumber: phone });
          }
        }
      });
    }
  }

  /* ============================================================
     PAYMENT STATUS DISPLAY
     ============================================================ */

  /**
   * Render payment status
   * @param {HTMLElement} container - Container element
   * @param {object} payment - Payment object
   */
  function renderPaymentStatus(container, payment) {
    if (!container || !payment) return;

    var statusConfig = {
      pending: { icon: '⏳', label: 'Pending', class: 'pending' },
      succeeded: { icon: '✅', label: 'Completed', class: 'success' },
      failed: { icon: '❌', label: 'Failed', class: 'error' },
      refunded: { icon: '↩️', label: 'Refunded', class: 'warning' },
      processing: { icon: '⚙️', label: 'Processing', class: 'processing' }
    };

    var status = statusConfig[payment.status] || statusConfig.pending;

    var html = '<div class="fns-payment-status fns-payment-status-' + status.class + '">' +
      '<div class="fns-payment-status-icon">' + status.icon + '</div>' +
      '<div class="fns-payment-status-info">' +
        '<div class="fns-payment-status-label">' + status.label + '</div>' +
        '<div class="fns-payment-status-amount">' + formatAmount(payment.amount, payment.currency) + '</div>' +
        '<div class="fns-payment-status-provider">' + (payment.provider || '').toUpperCase() + '</div>' +
      '</div>' +
      '<div class="fns-payment-status-details">' +
        '<div class="fns-payment-status-id">ID: ' + payment.id + '</div>' +
        '<div class="fns-payment-status-date">Date: ' + new Date(payment.createdAt?.toDate?.() || payment.createdAt).toLocaleDateString() + '</div>' +
      '</div>' +
    '</div>';

    container.innerHTML = html;
  }

  /* ============================================================
     UTILITY FUNCTIONS
     ============================================================ */

  /**
   * Format amount for display
   * @param {number} amount - Amount
   * @param {string} currency - Currency code
   * @returns {string} - Formatted amount
   */
  function formatAmount(amount, currency) {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency || 'KES'
    }).format(amount);
  }

  /**
   * Escape HTML
   * @param {string} text - Text to escape
   * @returns {string} - Escaped text
   */
  function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  // Export API
  window.FurnostylesPaymentUI = {
    renderPaymentForm: renderPaymentForm,
    renderPaymentStatus: renderPaymentStatus,
    showStripeForm: showStripeForm,
    showPayPalForm: showPayPalForm,
    showMpesaForm: showMpesaForm
  };

  console.log('[PaymentUI] Payment UI components module loaded');

})();
