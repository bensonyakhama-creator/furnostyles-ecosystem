/**
 * Furnostyles Commerce Validation
 * Centralized validation for cart, checkout, and order data before persistence.
 */

(function () {
  'use strict';

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^\+?[0-9]{10,15}$/.test(phone.replace(/\s/g, ''));
  }

  function validateCartItem(item) {
    if (!item || !item.id) return { valid: false, error: 'Item ID missing' };
    if (!item.quantity || item.quantity < 1) return { valid: false, error: 'Invalid quantity' };
    if (!item.price || item.price < 0) return { valid: false, error: 'Invalid price' };
    return { valid: true };
  }

  function validateCheckoutForm(data) {
    var errors = [];

    if (!data.fullName || data.fullName.trim().length < 2) {
      errors.push('Full name is required');
    }

    if (!data.email || !validateEmail(data.email)) {
      errors.push('Valid email is required');
    }

    if (!data.phone || !validatePhone(data.phone)) {
      errors.push('Valid phone number is required');
    }

    if (!data.address || data.address.trim().length < 5) {
      errors.push('Delivery address is required');
    }

    if (!data.city || data.city.trim().length < 2) {
      errors.push('City is required');
    }

    if (!data.paymentMethod) {
      errors.push('Payment method must be selected');
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  window.FurnostylesCommerceValidation = {
    validateEmail: validateEmail,
    validatePhone: validatePhone,
    validateCartItem: validateCartItem,
    validateCheckoutForm: validateCheckoutForm
  };

}());
