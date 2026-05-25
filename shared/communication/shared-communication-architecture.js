/**
 * FURNOSTYLES — SHARED COMMUNICATION ARCHITECTURE
 * =================================================
 * File: shared/communication/shared-communication-architecture.js
 * Purpose: Centralized communication architecture for customer inquiries,
 *          sourcing communication, vendor communication, consultation messaging,
 *          project communication, and property inquiries.
 */

(function () {
  'use strict';

  /**
   * CUSTOMER INQUIRY STRUCTURE
   * Centralized customer inquiry structure
   */
  var CustomerInquiryStructure = {
    id: 'string',
    type: 'string',
    subject: 'string',
    message: 'string',
    userId: 'string',
    productId: 'string',
    vendorId: 'string',
    status: 'string',
    priority: 'string',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
    response: 'object'
  };

  /**
   * SOURCING COMMUNICATION STRUCTURE
   * Centralized sourcing communication structure
   */
  var SourcingCommunicationStructure = {
    id: 'string',
    sourcingRequestId: 'string',
    type: 'string',
    message: 'string',
    userId: 'string',
    vendorId: 'string',
    status: 'string',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
    responses: 'array'
  };

  /**
   * VENDOR COMMUNICATION STRUCTURE
   * Centralized vendor communication structure
   */
  var VendorCommunicationStructure = {
    id: 'string',
    type: 'string',
    subject: 'string',
    message: 'string',
    userId: 'string',
    vendorId: 'string',
    status: 'string',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
    responses: 'array'
  };

  /**
   * CONSULTATION MESSAGING STRUCTURE
   * Centralized consultation messaging structure
   */
  var ConsultationMessagingStructure = {
    id: 'string',
    consultationId: 'string',
    type: 'string',
    message: 'string',
    userId: 'string',
    providerId: 'string',
    status: 'string',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
    responses: 'array'
  };

  /**
   * PROJECT COMMUNICATION STRUCTURE
   * Centralized project communication structure
   */
  var ProjectCommunicationStructure = {
    id: 'string',
    projectId: 'string',
    type: 'string',
    message: 'string',
    userId: 'string',
    providerId: 'string',
    status: 'string',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
    responses: 'array'
  };

  /**
   * PROPERTY INQUIRY STRUCTURE
   * Centralized property inquiry structure
   */
  var PropertyInquiryStructure = {
    id: 'string',
    propertyId: 'string',
    type: 'string',
    subject: 'string',
    message: 'string',
    userId: 'string',
    ownerId: 'string',
    status: 'string',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
    response: 'object'
  };

  /**
   * COMMUNICATION TYPES
   * Centralized communication types
   */
  var CommunicationTypes = {
    inquiry: 'inquiry',
    quote: 'quote-request',
    information: 'information-request',
    partnership: 'partnership-request',
    support: 'support-request',
    escalation: 'escalation'
  };

  /**
   * COMMUNICATION STATUSES
   * Centralized communication statuses
   */
  var CommunicationStatuses = {
    pending: 'pending',
    inProgress: 'in-progress',
    responded: 'responded',
    completed: 'completed',
    cancelled: 'cancelled',
    escalated: 'escalated'
  };

  /**
   * COMMUNICATION PRIORITIES
   * Centralized communication priorities
   */
  var CommunicationPriorities = {
    low: 'low',
    medium: 'medium',
    high: 'high',
    urgent: 'urgent'
  };

  /**
   * EXPORT SHARED COMMUNICATION ARCHITECTURE
   */
  window.FurnostylesSharedCommunicationArchitecture = {
    CustomerInquiryStructure: CustomerInquiryStructure,
    SourcingCommunicationStructure: SourcingCommunicationStructure,
    VendorCommunicationStructure: VendorCommunicationStructure,
    ConsultationMessagingStructure: ConsultationMessagingStructure,
    ProjectCommunicationStructure: ProjectCommunicationStructure,
    PropertyInquiryStructure: PropertyInquiryStructure,
    CommunicationTypes: CommunicationTypes,
    CommunicationStatuses: CommunicationStatuses,
    CommunicationPriorities: CommunicationPriorities
  };

}());
