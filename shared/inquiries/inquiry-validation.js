/**
 * Furnostyles Inquiry Validation
 * Centralized validation logic for inquiry forms
 */

(function () {
  'use strict';

  /**
   * Validation error messages
   */
  var ErrorMessages = {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    MIN_LENGTH: 'Minimum length is {min} characters',
    MAX_LENGTH: 'Maximum length is {max} characters',
    INVALID_TYPE: 'Invalid inquiry type'
  };

  /**
   * Validate email format
   */
  function isValidEmail(email) {
    if (!email || typeof email !== 'string') {
      return false;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Validate phone number (Kenyan format with optional country code)
   */
  function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') {
      return false;
    }
    var phoneRegex = /^(\+254|0)?[7]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Validate required field
   */
  function isRequired(value) {
    if (value === null || value === undefined) {
      return false;
    }
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return true;
  }

  /**
   * Validate minimum length
   */
  function hasMinLength(value, min) {
    if (!value || typeof value !== 'string') {
      return false;
    }
    return value.trim().length >= min;
  }

  /**
   * Validate maximum length
   */
  function hasMaxLength(value, max) {
    if (!value || typeof value !== 'string') {
      return true;
    }
    return value.trim().length <= max;
  }

  /**
   * Validate inquiry data object
   */
  function validateInquiry(data) {
    var errors = {};

    // Validate fullName
    if (!isRequired(data.fullName)) {
      errors.fullName = ErrorMessages.REQUIRED;
    } else if (!hasMinLength(data.fullName, 2)) {
      errors.fullName = ErrorMessages.MIN_LENGTH.replace('{min}', '2');
    } else if (!hasMaxLength(data.fullName, 100)) {
      errors.fullName = ErrorMessages.MAX_LENGTH.replace('{max}', '100');
    }

    // Validate email
    if (!isRequired(data.email)) {
      errors.email = ErrorMessages.REQUIRED;
    } else if (!isValidEmail(data.email)) {
      errors.email = ErrorMessages.INVALID_EMAIL;
    }

    // Validate phone
    if (!isRequired(data.phone)) {
      errors.phone = ErrorMessages.REQUIRED;
    } else if (!isValidPhone(data.phone)) {
      errors.phone = ErrorMessages.INVALID_PHONE;
    }

    // Validate location
    if (!isRequired(data.location)) {
      errors.location = ErrorMessages.REQUIRED;
    } else if (!hasMinLength(data.location, 2)) {
      errors.location = ErrorMessages.MIN_LENGTH.replace('{min}', '2');
    } else if (!hasMaxLength(data.location, 200)) {
      errors.location = ErrorMessages.MAX_LENGTH.replace('{max}', '200');
    }

    // Validate message
    if (!isRequired(data.message)) {
      errors.message = ErrorMessages.REQUIRED;
    } else if (!hasMinLength(data.message, 10)) {
      errors.message = ErrorMessages.MIN_LENGTH.replace('{min}', '10');
    } else if (!hasMaxLength(data.message, 2000)) {
      errors.message = ErrorMessages.MAX_LENGTH.replace('{max}', '2000');
    }

    // Validate inquiryType
    if (!isRequired(data.inquiryType)) {
      errors.inquiryType = ErrorMessages.REQUIRED;
    } else if (window.FurnostylesInquiryTypes && !window.FurnostylesInquiryTypes.isValidInquiryType(data.inquiryType)) {
      errors.inquiryType = ErrorMessages.INVALID_TYPE;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors
    };
  }

  /**
   * Validate single field
   */
  function validateField(fieldName, value, rules) {
    rules = rules || {};

    if (rules.required && !isRequired(value)) {
      return ErrorMessages.REQUIRED;
    }

    if (value && rules.email && !isValidEmail(value)) {
      return ErrorMessages.INVALID_EMAIL;
    }

    if (value && rules.phone && !isValidPhone(value)) {
      return ErrorMessages.INVALID_PHONE;
    }

    if (value && rules.minLength && !hasMinLength(value, rules.minLength)) {
      return ErrorMessages.MIN_LENGTH.replace('{min}', rules.minLength);
    }

    if (value && rules.maxLength && !hasMaxLength(value, rules.maxLength)) {
      return ErrorMessages.MAX_LENGTH.replace('{max}', rules.maxLength);
    }

    return null;
  }

  /**
   * Sanitize input to prevent XSS
   */
  function sanitizeInput(input) {
    if (!input || typeof input !== 'string') {
      return input;
    }
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .trim();
  }

  /**
   * Sanitize inquiry data object
   */
  function sanitizeInquiryData(data) {
    var sanitized = {};
    var stringFields = ['fullName', 'email', 'phone', 'location', 'message', 'relatedCategory', 'relatedPage'];

    Object.keys(data).forEach(function (key) {
      if (stringFields.indexOf(key) !== -1 && typeof data[key] === 'string') {
        sanitized[key] = sanitizeInput(data[key]);
      } else {
        sanitized[key] = data[key];
      }
    });

    return sanitized;
  }

  /**
   * Export validation API
   */
  window.FurnostylesInquiryValidation = {
    ErrorMessages: ErrorMessages,
    isValidEmail: isValidEmail,
    isValidPhone: isValidPhone,
    isRequired: isRequired,
    hasMinLength: hasMinLength,
    hasMaxLength: hasMaxLength,
    validateInquiry: validateInquiry,
    validateField: validateField,
    sanitizeInput: sanitizeInput,
    sanitizeInquiryData: sanitizeInquiryData
  };

}());
