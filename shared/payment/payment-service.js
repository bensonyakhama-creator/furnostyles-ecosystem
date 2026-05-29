/**
 * FURNOSTYLES — PAYMENT SERVICE
 * ==============================
 * File: shared/payment/payment-service.js
 * Purpose: Payment processing service supporting multiple providers
 *          Handles payment creation, confirmation, and status tracking
 *
 * Dependencies:
 *   - shared/payment/payment-config.js
 *   - shared/firebase/firebase-config.js (for Firestore integration)
 *
 * Usage:
 *   window.FurnostylesPayment.createPayment(amount, currency, provider)
 *   window.FurnostylesPayment.confirmPayment(paymentId, paymentMethod)
 *   window.FurnostylesPayment.getPaymentStatus(paymentId)
 */

(function() {
  'use strict';

  /* ============================================================
     PAYMENT STATE
     ============================================================ */

  var paymentState = {
    currentPayment: null,
    processing: false
  };

  /* ============================================================
     FIRESTORE INTEGRATION
     ============================================================ */

  function getFirestore() {
    if (typeof firebase !== 'undefined' && firebase.firestore) {
      return firebase.firestore();
    }
    if (window.FurnostylesFirebase && window.FurnostylesFirebase.db) {
      return window.FurnostylesFirebase.db;
    }
    console.error('[Payment] Firestore not available');
    return null;
  }

  /* ============================================================
     PAYMENT CREATION
     ============================================================ */

  /**
   * Create a new payment
   * @param {object} paymentData - Payment details
   * @returns {Promise} - Resolves with payment object
   */
  function createPayment(paymentData) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    var defaultProvider = window.FurnostylesPaymentConfig.getDefaultProvider();
    if (!defaultProvider) {
      return Promise.reject(new Error('No payment provider enabled'));
    }

    var payment = {
      id: 'pay_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      amount: paymentData.amount || 0,
      currency: paymentData.currency || 'KES',
      provider: paymentData.provider || defaultProvider,
      status: 'pending',
      description: paymentData.description || '',
      metadata: paymentData.metadata || {},
      orderId: paymentData.orderId || null,
      userId: paymentData.userId || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    return db.collection('payments').doc(payment.id).set(payment)
      .then(function() {
        console.log('[Payment] Payment created:', payment.id);
        paymentState.currentPayment = payment;
        return payment;
      })
      .catch(function(error) {
        console.error('[Payment] Failed to create payment:', error);
        throw error;
      });
  }

  /* ============================================================
     PAYMENT CONFIRMATION
     ============================================================ */

  /**
   * Confirm a payment with payment method
   * @param {string} paymentId - Payment ID
   * @param {object} paymentMethod - Payment method details
   * @returns {Promise} - Resolves with payment confirmation
   */
  function confirmPayment(paymentId, paymentMethod) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    paymentState.processing = true;

    return db.collection('payments').doc(paymentId).get()
      .then(function(doc) {
        if (!doc.exists) {
          throw new Error('Payment not found');
        }

        var payment = doc.data();
        var provider = payment.provider;

        // Route to appropriate provider handler
        switch (provider) {
          case 'stripe':
            return confirmStripePayment(payment, paymentMethod);
          case 'paypal':
            return confirmPayPalPayment(payment, paymentMethod);
          case 'mpesa':
            return confirmMpesaPayment(payment, paymentMethod);
          default:
            throw new Error('Unsupported payment provider: ' + provider);
        }
      })
      .then(function(result) {
        // Update payment status
        return db.collection('payments').doc(paymentId).update({
          status: result.status,
          transactionId: result.transactionId,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
          paymentState.processing = false;
          return result;
        });
      })
      .catch(function(error) {
        paymentState.processing = false;
        console.error('[Payment] Payment confirmation failed:', error);
        throw error;
      });
  }

  /* ============================================================
     PROVIDER-SPECIFIC HANDLERS
     ============================================================ */

  /**
   * Confirm Stripe payment
   * @param {object} payment - Payment object
   * @param {object} paymentMethod - Payment method details
   * @returns {Promise} - Payment confirmation result
   */
  function confirmStripePayment(payment, paymentMethod) {
    // This would integrate with Stripe.js
    // For now, return a mock response
    console.log('[Payment] Confirming Stripe payment:', payment.id);
    
    return Promise.resolve({
      status: 'succeeded',
      transactionId: 'stripe_' + Date.now(),
      provider: 'stripe'
    });
  }

  /**
   * Confirm PayPal payment
   * @param {object} payment - Payment object
   * @param {object} paymentMethod - Payment method details
   * @returns {Promise} - Payment confirmation result
   */
  function confirmPayPalPayment(payment, paymentMethod) {
    // This would integrate with PayPal SDK
    // For now, return a mock response
    console.log('[Payment] Confirming PayPal payment:', payment.id);
    
    return Promise.resolve({
      status: 'succeeded',
      transactionId: 'paypal_' + Date.now(),
      provider: 'paypal'
    });
  }

  /**
   * Confirm M-Pesa payment
   * @param {object} payment - Payment object
   * @param {object} paymentMethod - Payment method details (phone number)
   * @returns {Promise} - Payment confirmation result
   */
  function confirmMpesaPayment(payment, paymentMethod) {
    // This would integrate with M-Pesa API
    // For now, return a mock response
    console.log('[Payment] Confirming M-Pesa payment:', payment.id);
    console.log('[Payment] Phone:', paymentMethod.phoneNumber);
    
    return Promise.resolve({
      status: 'pending', // M-Pesa payments are async
      transactionId: 'mpesa_' + Date.now(),
      provider: 'mpesa'
    });
  }

  /* ============================================================
     PAYMENT STATUS
     ============================================================ */

  /**
   * Get payment status
   * @param {string} paymentId - Payment ID
   * @returns {Promise} - Resolves with payment status
   */
  function getPaymentStatus(paymentId) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    return db.collection('payments').doc(paymentId).get()
      .then(function(doc) {
        if (!doc.exists) {
          throw new Error('Payment not found');
        }
        return doc.data();
      });
  }

  /**
   * Listen to payment status changes
   * @param {string} paymentId - Payment ID
   * @param {function} callback - Callback function
   * @returns {function} - Unsubscribe function
   */
  function onPaymentStatusChange(paymentId, callback) {
    var db = getFirestore();
    if (!db) {
      callback({ error: 'Firestore not available' });
      return function() {};
    }

    return db.collection('payments').doc(paymentId)
      .onSnapshot(function(doc) {
        if (doc.exists) {
          callback(doc.data());
        } else {
          callback({ error: 'Payment not found' });
        }
      });
  }

  /* ============================================================
     PAYMENT HISTORY
     ============================================================ */

  /**
   * Get user payment history
   * @param {string} userId - User ID
   * @param {number} limit - Maximum number of payments
   * @returns {Promise} - Resolves with payment history
   */
  function getUserPayments(userId, limit) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    limit = limit || 20;

    return db.collection('payments')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get()
      .then(function(querySnapshot) {
        return querySnapshot.docs.map(function(doc) {
          return doc.data();
        });
      });
  }

  /**
   * Get order payments
   * @param {string} orderId - Order ID
   * @returns {Promise} - Resolves with order payments
   */
  function getOrderPayments(orderId) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    return db.collection('payments')
      .where('orderId', '==', orderId)
      .orderBy('createdAt', 'desc')
      .get()
      .then(function(querySnapshot) {
        return querySnapshot.docs.map(function(doc) {
          return doc.data();
        });
      });
  }

  /* ============================================================
     PAYMENT REFUND
     ============================================================ */

  /**
   * Refund a payment
   * @param {string} paymentId - Payment ID
   * @param {number} amount - Amount to refund (optional, full refund if not specified)
   * @param {string} reason - Refund reason
   * @returns {Promise} - Resolves with refund result
   */
  function refundPayment(paymentId, amount, reason) {
    var db = getFirestore();
    if (!db) return Promise.reject(new Error('Firestore not available'));

    return db.collection('payments').doc(paymentId).get()
      .then(function(doc) {
        if (!doc.exists) {
          throw new Error('Payment not found');
        }

        var payment = doc.data();
        if (payment.status !== 'succeeded') {
          throw new Error('Can only refund succeeded payments');
        }

        // Create refund record
        var refund = {
          id: 'refund_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
          paymentId: paymentId,
          amount: amount || payment.amount,
          reason: reason || 'Customer request',
          status: 'pending',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        return db.collection('refunds').doc(refund.id).set(refund)
          .then(function() {
            // Update payment status
            return db.collection('payments').doc(paymentId).update({
              status: 'refunded',
              refundId: refund.id,
              updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
          })
          .then(function() {
            console.log('[Payment] Refund created:', refund.id);
            return refund;
          });
      });
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
   * Validate payment data
   * @param {object} paymentData - Payment data to validate
   * @returns {object} - { valid: boolean, errors: Array }
   */
  function validatePaymentData(paymentData) {
    var errors = [];

    if (!paymentData.amount || paymentData.amount <= 0) {
      errors.push('Amount must be greater than 0');
    }

    if (!paymentData.currency) {
      errors.push('Currency is required');
    }

    if (paymentData.provider && !window.FurnostylesPaymentConfig.isProviderEnabled(paymentData.provider)) {
      errors.push('Payment provider is not enabled: ' + paymentData.provider);
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  // Export API
  window.FurnostylesPayment = {
    createPayment: createPayment,
    confirmPayment: confirmPayment,
    getPaymentStatus: getPaymentStatus,
    onPaymentStatusChange: onPaymentStatusChange,
    getUserPayments: getUserPayments,
    getOrderPayments: getOrderPayments,
    refundPayment: refundPayment,
    formatAmount: formatAmount,
    validatePaymentData: validatePaymentData,
    
    // State
    getState: function() { return paymentState; },
    isProcessing: function() { return paymentState.processing; }
  };

  console.log('[Payment] Payment service module loaded');

})();
