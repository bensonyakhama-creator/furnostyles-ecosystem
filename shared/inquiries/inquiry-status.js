/**
 * Furnostyles Inquiry Status
 * Admin-side status definitions and helpers
 */

(function () {
  'use strict';

  /**
   * Admin status values
   */
  var AdminStatus = {
    NEW: 'new',
    CONTACTED: 'contacted',
    IN_PROGRESS: 'in_progress',
    ASSIGNED: 'assigned',
    COMPLETED: 'completed',
    CLOSED: 'closed'
  };

  /**
   * Status display labels
   */
  var AdminStatusLabels = {
    new: 'New',
    contacted: 'Contacted',
    in_progress: 'In Progress',
    assigned: 'Assigned',
    completed: 'Completed',
    closed: 'Closed'
  };

  /**
   * Status CSS class mappings
   */
  var AdminStatusClasses = {
    new: 'status-new',
    contacted: 'status-contacted',
    in_progress: 'status-in-progress',
    assigned: 'status-assigned',
    completed: 'status-completed',
    closed: 'status-closed'
  };

  /**
   * Status color config (for badges)
   */
  var AdminStatusColors = {
    new: { bg: '#fff3cd', color: '#856404' },
    contacted: { bg: '#cce5ff', color: '#004085' },
    in_progress: { bg: '#d1ecf1', color: '#0c5460' },
    assigned: { bg: '#e2d9f3', color: '#4a1d96' },
    completed: { bg: '#d4edda', color: '#155724' },
    closed: { bg: '#e2e3e5', color: '#383d41' }
  };

  /**
   * Inquiry type display labels
   */
  var InquiryTypeLabels = {
    general: 'General',
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
   * Inquiry type CSS class mappings
   */
  var InquiryTypeClasses = {
    general: 'type-general',
    quote_request: 'type-quote',
    repair_request: 'type-repair',
    sourcing_request: 'type-sourcing',
    property_inquiry: 'type-property',
    service_consultation: 'type-service',
    vendor_partnership: 'type-vendor',
    provider_partnership: 'type-provider',
    contractor_partnership: 'type-contractor',
    property_owner_listing: 'type-owner',
    agent_partnership: 'type-agent'
  };

  /**
   * Source page display labels
   */
  var SourcePageLabels = {
    'contact.html': 'Contact Page',
    'services.html': 'Services Page',
    'repairs.html': 'Repairs Page',
    'sourcing-marketplace.html': 'Sourcing Marketplace',
    'realestate-marketplace.html': 'Real Estate Marketplace',
    'furniture-marketplace.html': 'Furniture Marketplace',
    'services-marketplace.html': 'Services Marketplace',
    'materials-marketplace.html': 'Materials Marketplace'
  };

  /**
   * Get admin status label
   */
  function getAdminStatusLabel(status) {
    return AdminStatusLabels[status] || status;
  }

  /**
   * Get admin status CSS class
   */
  function getAdminStatusClass(status) {
    return AdminStatusClasses[status] || 'status-unknown';
  }

  /**
   * Get admin status color config
   */
  function getAdminStatusColors(status) {
    return AdminStatusColors[status] || { bg: '#e2e3e5', color: '#383d41' };
  }

  /**
   * Get inquiry type label
   */
  function getInquiryTypeLabel(type) {
    return InquiryTypeLabels[type] || type;
  }

  /**
   * Get inquiry type CSS class
   */
  function getInquiryTypeClass(type) {
    return InquiryTypeClasses[type] || 'type-general';
  }

  /**
   * Get source page label
   */
  function getSourcePageLabel(page) {
    return SourcePageLabels[page] || page;
  }

  /**
   * Get all status values as array for filter dropdowns
   */
  function getAllStatuses() {
    return Object.keys(AdminStatusLabels).map(function (key) {
      return { value: key, label: AdminStatusLabels[key] };
    });
  }

  /**
   * Get all inquiry type values as array for filter dropdowns
   */
  function getAllInquiryTypes() {
    return Object.keys(InquiryTypeLabels).map(function (key) {
      return { value: key, label: InquiryTypeLabels[key] };
    });
  }

  /**
   * Get all source pages as array for filter dropdowns
   */
  function getAllSourcePages() {
    return Object.keys(SourcePageLabels).map(function (key) {
      return { value: key, label: SourcePageLabels[key] };
    });
  }

  /**
   * Check if a status is a terminal state
   */
  function isTerminalStatus(status) {
    return status === AdminStatus.COMPLETED || status === AdminStatus.CLOSED;
  }

  /**
   * Get next suggested status
   */
  function getNextStatus(currentStatus) {
    var flow = {
      new: AdminStatus.CONTACTED,
      contacted: AdminStatus.IN_PROGRESS,
      in_progress: AdminStatus.ASSIGNED,
      assigned: AdminStatus.COMPLETED
    };
    return flow[currentStatus] || null;
  }

  /**
   * Export status API
   */
  window.FurnostylesInquiryStatus = {
    AdminStatus: AdminStatus,
    AdminStatusLabels: AdminStatusLabels,
    AdminStatusClasses: AdminStatusClasses,
    AdminStatusColors: AdminStatusColors,
    InquiryTypeLabels: InquiryTypeLabels,
    InquiryTypeClasses: InquiryTypeClasses,
    SourcePageLabels: SourcePageLabels,
    getAdminStatusLabel: getAdminStatusLabel,
    getAdminStatusClass: getAdminStatusClass,
    getAdminStatusColors: getAdminStatusColors,
    getInquiryTypeLabel: getInquiryTypeLabel,
    getInquiryTypeClass: getInquiryTypeClass,
    getSourcePageLabel: getSourcePageLabel,
    getAllStatuses: getAllStatuses,
    getAllInquiryTypes: getAllInquiryTypes,
    getAllSourcePages: getAllSourcePages,
    isTerminalStatus: isTerminalStatus,
    getNextStatus: getNextStatus
  };

}());
