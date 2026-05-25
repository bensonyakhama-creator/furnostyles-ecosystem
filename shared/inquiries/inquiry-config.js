/**
 * Furnostyles Inquiry Configuration
 * Centralized configuration for inquiry system
 */

(function () {
  'use strict';

  /**
   * Firestore collection name
   */
  var COLLECTION_NAME = 'inquiries';

  /**
   * Default inquiry status
   */
  var DEFAULT_STATUS = 'new';

  /**
   * WhatsApp contact number
   */
  var WHATSAPP_NUMBER = '+254713639205';

  /**
   * WhatsApp contact URL
   */
  var WHATSAPP_URL = 'https://wa.me/254713639205';

  /**
   * Contact email
   */
  var CONTACT_EMAIL = 'furnostyles@gmail.com';

  /**
   * Contact phone
   */
  var CONTACT_PHONE = '+254 713 639 205';

  /**
   * Success messages
   */
  var SuccessMessages = {
    SUBMITTED: 'Your inquiry has been submitted successfully. We will get back to you within 24 hours.',
    QUOTE_REQUESTED: 'Your quote request has been submitted. Our team will contact you shortly.',
    REPAIR_REQUESTED: 'Your repair request has been received. We will schedule a visit soon.',
    SOURCING_REQUESTED: 'Your sourcing request has been submitted. Our sourcing team will contact you.',
    PROPERTY_INQUIRY: 'Your property inquiry has been received. An agent will contact you shortly.',
    PARTNERSHIP_REQUESTED: 'Your partnership inquiry has been submitted. We will review and respond.'
  };

  /**
   * Error messages
   */
  var ErrorMessages = {
    SUBMISSION_FAILED: 'Failed to submit inquiry. Please try again or contact us via WhatsApp.',
    VALIDATION_FAILED: 'Please correct the errors in the form and try again.',
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
  };

  /**
   * Form field configuration
   */
  var FormFields = {
    fullName: {
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your full name',
      minLength: 2,
      maxLength: 100
    },
    email: {
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter your email address',
      validation: 'email'
    },
    phone: {
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: 'Enter your phone number (e.g., 0712345678)',
      validation: 'phone'
    },
    location: {
      label: 'Location',
      type: 'text',
      required: true,
      placeholder: 'Enter your location (e.g., Kasarani, Nairobi)',
      minLength: 2,
      maxLength: 200
    },
    inquiryType: {
      label: 'Inquiry Type',
      type: 'select',
      required: true,
      options: []
    },
    relatedCategory: {
      label: 'Related Category',
      type: 'select',
      required: false,
      options: [
        { value: 'furniture', label: 'Furniture' },
        { value: 'upholstery', label: 'Upholstery' },
        { value: 'repairs', label: 'Repairs' },
        { value: 'sourcing', label: 'Sourcing' },
        { value: 'real_estate', label: 'Real Estate' },
        { value: 'services', label: 'Services' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'other', label: 'Other' }
      ]
    },
    message: {
      label: 'Message',
      type: 'textarea',
      required: true,
      placeholder: 'Describe your inquiry in detail...',
      minLength: 10,
      maxLength: 2000,
      rows: 5
    }
  };

  /**
   * Get Firestore collection name
   */
  function getCollectionName() {
    return COLLECTION_NAME;
  }

  /**
   * Get default status
   */
  function getDefaultStatus() {
    return DEFAULT_STATUS;
  }

  /**
   * Get WhatsApp contact info
   */
  function getWhatsAppInfo() {
    return {
      number: WHATSAPP_NUMBER,
      url: WHATSAPP_URL
    };
  }

  /**
   * Get contact email
   */
  function getContactEmail() {
    return CONTACT_EMAIL;
  }

  /**
   * Get contact phone
   */
  function getContactPhone() {
    return CONTACT_PHONE;
  }

  /**
   * Get success message for inquiry type
   */
  function getSuccessMessage(inquiryType) {
    switch (inquiryType) {
      case 'quote_request':
        return SuccessMessages.QUOTE_REQUESTED;
      case 'repair_request':
        return SuccessMessages.REPAIR_REQUESTED;
      case 'sourcing_request':
        return SuccessMessages.SOURCING_REQUESTED;
      case 'property_inquiry':
        return SuccessMessages.PROPERTY_INQUIRY;
      case 'vendor_partnership':
      case 'provider_partnership':
      case 'contractor_partnership':
      case 'agent_partnership':
        return SuccessMessages.PARTNERSHIP_REQUESTED;
      default:
        return SuccessMessages.SUBMITTED;
    }
  }

  /**
   * Get form field configuration
   */
  function getFormFieldConfig(fieldName) {
    return FormFields[fieldName];
  }

  /**
   * Get all form field configurations
   */
  function getAllFormFieldConfigs() {
    return FormFields;
  }

  /**
   * Get inquiry type options for a page
   */
  function getInquiryTypeOptionsForPage(page) {
    if (!window.FurnostylesInquiryTypes) {
      return [];
    }

    var types = window.FurnostylesInquiryTypes.getInquiryTypesForPage(page);
    return types.map(function (type) {
      return {
        value: type,
        label: window.FurnostylesInquiryTypes.getInquiryTypeLabel(type)
      };
    });
  }

  /**
   * Export configuration API
   */
  window.FurnostylesInquiryConfig = {
    getCollectionName: getCollectionName,
    getDefaultStatus: getDefaultStatus,
    getWhatsAppInfo: getWhatsAppInfo,
    getContactEmail: getContactEmail,
    getContactPhone: getContactPhone,
    SuccessMessages: SuccessMessages,
    ErrorMessages: ErrorMessages,
    getSuccessMessage: getSuccessMessage,
    getFormFieldConfig: getFormFieldConfig,
    getAllFormFieldConfigs: getAllFormFieldConfigs,
    getInquiryTypeOptionsForPage: getInquiryTypeOptionsForPage
  };

}());
