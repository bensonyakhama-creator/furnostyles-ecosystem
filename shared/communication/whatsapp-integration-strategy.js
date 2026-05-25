/**
 * FURNOSTYLES — WHATSAPP INTEGRATION STRATEGY
 * ============================================
 * File: shared/communication/whatsapp-integration-strategy.js
 * Purpose: Centralized WhatsApp integration strategy for WhatsApp inquiries,
 *          quick support, sourcing assistance, consultation escalation,
 *          and project communication.
 */

(function () {
  'use strict';

  /**
   * WHATSAPP INQUIRY STRATEGY
   * Centralized WhatsApp inquiry strategy
   */
  var WhatsAppInquiryStrategy = {
    phoneNumber: '254713639205',
    messageTemplate: 'Hello Furnostyles, I have an inquiry about: {item}',
    buttonLabel: 'WhatsApp Chat',
    buttonPosition: 'floating',
    trigger: 'click'
  };

  /**
   * QUICK SUPPORT STRATEGY
   * Centralized quick support strategy
   */
  var QuickSupportStrategy = {
    messageTemplate: 'Hello, I need quick support for: {topic}',
    responseTime: '15 minutes',
    availableHours: '9am - 6pm EAT',
    escalationPath: 'email'
  };

  /**
   * SOURCING ASSISTANCE STRATEGY
   * Centralized sourcing assistance strategy
   */
  var SourcingAssistanceStrategy = {
    messageTemplate: 'I need sourcing assistance for: {category}',
    requiredInfo: ['category', 'quantity', 'budget', 'timeline'],
    followUp: 'email'
  };

  /**
   * CONSULTATION ESCALATION STRATEGY
   * Centralized consultation escalation strategy
   */
  var ConsultationEscalationStrategy = {
    messageTemplate: 'I need to escalate my consultation request: {consultationId}',
    escalationLevels: ['support', 'manager', 'director'],
    responseTime: '1 hour'
  };

  /**
   * PROJECT COMMUNICATION STRATEGY
   * Centralized project communication strategy
   */
  var ProjectCommunicationStrategy = {
    messageTemplate: 'Project update: {projectId} - {status}',
    communicationTypes: ['update', 'issue', 'milestone'],
    notification: 'email'
  };

  /**
   * WHATSAPP BUTTON STRUCTURE
   * Centralized WhatsApp button structure
   */
  var WhatsAppButtonStructure = {
    container: 'a.chat-float',
    icon: 'span.chat-icon',
    label: 'span.chat-label',
    href: 'https://wa.me/254713639205',
    target: '_blank'
  };

  /**
   * WHATSAPP MESSAGE TEMPLATES
   * Centralized WhatsApp message templates
   */
  var WhatsAppMessageTemplates = {
    generalInquiry: 'Hello Furnostyles, I have a general inquiry.',
    productInquiry: 'Hello, I am interested in: {productName}. Please provide more information.',
    serviceInquiry: 'Hello, I need information about: {serviceName}.',
    sourcingRequest: 'Hello, I need sourcing assistance for: {category}.',
    consultationRequest: 'Hello, I would like to schedule a consultation.',
    supportRequest: 'Hello, I need support with: {topic}.'
  };

  /**
   * WHATSAPP INTEGRATION OPTIONS
   * Centralized WhatsApp integration options
   */
  var WhatsAppIntegrationOptions = {
    showButton: true,
    position: 'bottom-right',
    animation: true,
    mobileOnly: false
  };

  /**
   * EXPORT WHATSAPP INTEGRATION STRATEGY
   */
  window.FurnostylesWhatsAppIntegrationStrategy = {
    WhatsAppInquiryStrategy: WhatsAppInquiryStrategy,
    QuickSupportStrategy: QuickSupportStrategy,
    SourcingAssistanceStrategy: SourcingAssistanceStrategy,
    ConsultationEscalationStrategy: ConsultationEscalationStrategy,
    ProjectCommunicationStrategy: ProjectCommunicationStrategy,
    WhatsAppButtonStructure: WhatsAppButtonStructure,
    WhatsAppMessageTemplates: WhatsAppMessageTemplates,
    WhatsAppIntegrationOptions: WhatsAppIntegrationOptions
  };

}());
