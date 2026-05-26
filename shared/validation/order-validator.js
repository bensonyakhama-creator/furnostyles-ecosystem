/**
 * FURNOSTYLES — ORDER VALIDATOR
 * =============================
 * File: shared/validation/order-validator.js
 * Purpose: Client-side order validation before submission
 *          Can be extended with server-side validation API calls
 *
 * Features:
 *   - Validate cart items and prices
 *   - Validate shipping costs
 *   - Validate promo codes
 *   - Validate addresses
 *   - Extensible for server-side validation
 *
 * Usage:
 *   window.FurnostylesOrderValidator.validateOrder(orderData)
 *   window.FurnostylesOrderValidator.validatePromoCode(code, subtotal)
 */

(function() {
  'use strict';

  /**
   * Validate order data before submission
   * Returns { valid: boolean, errors: string[] }
   */
  function validateOrder(orderData) {
    var errors = [];

    // Validate required fields
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      errors.push('Cart is empty');
    }

    if (!orderData.shippingAddress) {
      errors.push('Shipping address is required');
    }

    if (!orderData.paymentMethod) {
      errors.push('Payment method is required');
    }

    // Validate items
    if (orderData.items) {
      orderData.items.forEach(function(item, index) {
        if (!item.id) {
          errors.push('Item at index ' + index + ' is missing ID');
        }
        if (!item.name) {
          errors.push('Item at index ' + index + ' is missing name');
        }
        if (!item.price || item.price < 0) {
          errors.push('Item at index ' + index + ' has invalid price');
        }
        if (!item.quantity || item.quantity < 1) {
          errors.push('Item at index ' + index + ' has invalid quantity');
        }
      });
    }

    // Validate totals
    var calculatedSubtotal = 0;
    if (orderData.items) {
      orderData.items.forEach(function(item) {
        calculatedSubtotal += (item.price * item.quantity);
      });
    }

    if (Math.abs(calculatedSubtotal - orderData.subtotal) > 0.01) {
      errors.push('Subtotal mismatch. Expected: ' + calculatedSubtotal + ', Got: ' + orderData.subtotal);
    }

    // Validate shipping cost
    if (orderData.shipping < 0) {
      errors.push('Shipping cost cannot be negative');
    }

    // Validate discount
    if (orderData.discount < 0) {
      errors.push('Discount cannot be negative');
    }

    if (orderData.discount > orderData.subtotal) {
      errors.push('Discount cannot exceed subtotal');
    }

    // Validate total
    var calculatedTotal = calculatedSubtotal + orderData.shipping - orderData.discount;
    if (Math.abs(calculatedTotal - orderData.total) > 0.01) {
      errors.push('Total mismatch. Expected: ' + calculatedTotal + ', Got: ' + orderData.total);
    }

    // Validate shipping address
    if (orderData.shippingAddress) {
      if (!orderData.shippingAddress.name) {
        errors.push('Shipping address name is required');
      }
      if (!orderData.shippingAddress.phone) {
        errors.push('Shipping address phone is required');
      }
      if (!orderData.shippingAddress.address) {
        errors.push('Shipping address street is required');
      }
      if (!orderData.shippingAddress.city) {
        errors.push('Shipping address city is required');
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Validate promo code
   * Returns { valid: boolean, discount: number, error: string }
   */
  function validatePromoCode(code, subtotal) {
    // In production, this would call a backend API
    // For now, using hardcoded validation as fallback
    
    var promoCodes = {
      'FURNO10': { discount: 0.10, type: 'percentage', minPurchase: 0 },
      'FURNO20': { discount: 0.20, type: 'percentage', minPurchase: 1000 },
      'FURNO15': { discount: 0.15, type: 'percentage', minPurchase: 500 }
    };

    var promo = promoCodes[code.toUpperCase()];

    if (!promo) {
      return {
        valid: false,
        discount: 0,
        error: 'Invalid promo code'
      };
    }

    if (subtotal < promo.minPurchase) {
      return {
        valid: false,
        discount: 0,
        error: 'Minimum purchase of KES ' + promo.minPurchase + ' required'
      };
    }

    var discountAmount = promo.type === 'percentage' 
      ? subtotal * promo.discount 
      : promo.discount;

    return {
      valid: true,
      discount: discountAmount,
      error: null
    };
  }

  /**
   * Validate shipping cost for city
   * Returns { valid: boolean, cost: number, error: string }
   */
  function validateShippingCost(city, weight) {
    // In production, this would call a backend API
    // For now, using hardcoded rates as fallback
    
    var shippingRates = {
      'Nairobi': 200,
      'Mombasa': 350,
      'Kisumu': 300,
      'Nakuru': 250,
      'Eldoret': 280,
      'default': 400
    };

    var cost = shippingRates[city] || shippingRates['default'];

    // Add weight-based surcharge if weight provided
    if (weight && weight > 10) {
      cost += Math.ceil((weight - 10) / 5) * 50;
    }

    return {
      valid: true,
      cost: cost,
      error: null
    };
  }

  /**
   * Sanitize user input to prevent XSS
   */
  function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  /**
   * Validate email format
   */
  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * Validate phone number (Kenya format)
   */
  function validatePhone(phone) {
    var re = /^(\+254|0)?[7]\d{8}$/;
    return re.test(phone.replace(/\s/g, ''));
  }

  // Export API
  window.FurnostylesOrderValidator = {
    validateOrder: validateOrder,
    validatePromoCode: validatePromoCode,
    validateShippingCost: validateShippingCost,
    sanitizeInput: sanitizeInput,
    validateEmail: validateEmail,
    validatePhone: validatePhone
  };

  console.log('[OrderValidator] Order validator module loaded');

})();
