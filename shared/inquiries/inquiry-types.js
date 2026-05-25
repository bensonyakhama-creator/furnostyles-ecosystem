/**
 * Furnostyles Inquiry Types
 * Centralized inquiry type definitions for the entire platform
 */

(function () {
  'use strict';

  /**
   * Inquiry type constants
   */
  var InquiryTypes = {
    // General contact inquiries
    GENERAL: 'general',
    
    // Quote requests
    QUOTE_REQUEST: 'quote_request',
    
    // Repair requests
    REPAIR_REQUEST: 'repair_request',
    
    // Sourcing requests
    SOURCING_REQUEST: 'sourcing_request',
    
    // Property inquiries
    PROPERTY_INQUIRY: 'property_inquiry',
    
    // Service consultations
    SERVICE_CONSULTATION: 'service_consultation',
    
    // Vendor/supplier partnership inquiries
    VENDOR_PARTNERSHIP: 'vendor_partnership',
    
    // Provider/artisan partnership inquiries
    PROVIDER_PARTNERSHIP: 'provider_partnership',
    
    // Contractor partnership inquiries
    CONTRACTOR_PARTNERSHIP: 'contractor_partnership',
    
    // Property owner listing inquiry
    PROPERTY_OWNER_LISTING: 'property_owner_listing',
    
    // Agent partnership inquiry
    AGENT_PARTNERSHIP: 'agent_partnership'
  };

  /**
   * Inquiry status constants
   */
  var InquiryStatus = {
    NEW: 'new',
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    RESPONDED: 'responded',
    COMPLETED: 'completed',
    CLOSED: 'closed'
  };

  /**
   * Inquiry source constants
   */
  var InquirySource = {
    CONTACT_FORM: 'contact_form',
    SERVICES_PAGE: 'services_page',
    REPAIRS_PAGE: 'repairs_page',
    SOURCING_MARKETPLACE: 'sourcing_marketplace',
    REALESTATE_MARKETPLACE: 'realestate_marketplace',
    PRODUCT_PAGE: 'product_page',
    PROPERTY_PAGE: 'property_page',
    WHATSAPP: 'whatsapp',
    EMAIL: 'email',
    PHONE: 'phone'
  };

  /**
   * Inquiry type display labels
   */
  var InquiryTypeLabels = {
    general: 'General Inquiry',
    quote_request: 'Quote Request',
    repair_request: 'Repair Request',
    sourcing_request: 'Sourcing Request',
    property_inquiry: 'Property Inquiry',
    service_consultation: 'Service Consultation',
    vendor_partnership: 'Vendor Partnership',
    provider_partnership: 'Provider Partnership',
    contractor_partnership: 'Contractor Partnership',
    property_owner_listing: 'Property Owner Listing',
    agent_partnership: 'Agent Partnership'
  };

  /**
   * Inquiry status display labels
   */
  var InquiryStatusLabels = {
    new: 'New',
    pending: 'Pending',
    in_progress: 'In Progress',
    responded: 'Responded',
    completed: 'Completed',
    closed: 'Closed'
  };

  /**
   * Related category options
   */
  var RelatedCategories = {
    FURNITURE: 'furniture',
    UPHOLSTERY: 'upholstery',
    REPAIRS: 'repairs',
    SOURCING: 'sourcing',
    REAL_ESTATE: 'real_estate',
    SERVICES: 'services',
    PARTNERSHIP: 'partnership',
    OTHER: 'other'
  };

  /**
   * Get inquiry type label
   */
  function getInquiryTypeLabel(type) {
    return InquiryTypeLabels[type] || type;
  }

  /**
   * Get inquiry status label
   */
  function getInquiryStatusLabel(status) {
    return InquiryStatusLabels[status] || status;
  }

  /**
   * Validate inquiry type
   */
  function isValidInquiryType(type) {
    return Object.values(InquiryTypes).includes(type);
  }

  /**
   * Validate inquiry status
   */
  function isValidInquiryStatus(status) {
    return Object.values(InquiryStatus).includes(status);
  }

  /**
   * Get inquiry types for a specific page
   */
  function getInquiryTypesForPage(page) {
    switch (page) {
      case 'contact.html':
        return [InquiryTypes.GENERAL, InquiryTypes.QUOTE_REQUEST, InquiryTypes.SERVICE_CONSULTATION];
      case 'services.html':
        return [InquiryTypes.SERVICE_CONSULTATION, InquiryTypes.QUOTE_REQUEST];
      case 'repairs.html':
        return [InquiryTypes.REPAIR_REQUEST, InquiryTypes.QUOTE_REQUEST];
      case 'sourcing-marketplace.html':
        return [InquiryTypes.SOURCING_REQUEST, InquiryTypes.VENDOR_PARTNERSHIP];
      case 'realestate-marketplace.html':
        return [InquiryTypes.PROPERTY_INQUIRY, InquiryTypes.PROPERTY_OWNER_LISTING, InquiryTypes.AGENT_PARTNERSHIP];
      default:
        return [InquiryTypes.GENERAL];
    }
  }

  /**
   * Export inquiry types API
   */
  window.FurnostylesInquiryTypes = {
    InquiryTypes: InquiryTypes,
    InquiryStatus: InquiryStatus,
    InquirySource: InquirySource,
    RelatedCategories: RelatedCategories,
    getInquiryTypeLabel: getInquiryTypeLabel,
    getInquiryStatusLabel: getInquiryStatusLabel,
    isValidInquiryType: isValidInquiryType,
    isValidInquiryStatus: isValidInquiryStatus,
    getInquiryTypesForPage: getInquiryTypesForPage
  };

}());
