/**
 * FURNOSTYLES — MESSAGING ARCHITECTURE
 * =====================================
 * File: shared/communication/messaging-architecture.js
 * Purpose: Centralized messaging architecture for client ↔ vendor communication,
 *          client ↔ Furnostyles communication, sourcing communication,
 *          project discussions, and property consultations.
 */

(function () {
  'use strict';

  /**
   * MESSAGE STRUCTURE
   * Centralized message structure
   */
  var MessageStructure = {
    id: 'string',
    conversationId: 'string',
    senderId: 'string',
    receiverId: 'string',
    content: 'string',
    type: 'string',
    status: 'string',
    read: 'boolean',
    attachments: 'array',
    metadata: 'object',
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  };

  /**
   * CONVERSATION STRUCTURE
   * Centralized conversation structure
   */
  var ConversationStructure = {
    id: 'string',
    type: 'string',
    participants: 'array',
    subject: 'string',
    status: 'string',
    lastMessage: 'object',
    unreadCount: 'number',
    metadata: 'object',
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  };

  /**
   * CLIENT ↔ VENDOR COMMUNICATION STRATEGY
   * Centralized client-vendor communication strategy
   */
  var ClientVendorCommunicationStrategy = {
    conversationType: 'client-vendor',
    messageTypes: ['inquiry', 'quote', 'negotiation', 'confirmation'],
    allowedActions: ['send', 'receive', 'archive', 'block'],
    responseTime: '24h'
  };

  /**
   * CLIENT ↔ FURNOSTYLES COMMUNICATION STRATEGY
   * Centralized client-Furnostyles communication strategy
   */
  var ClientFurnostylesCommunicationStrategy = {
    conversationType: 'client-furnostyles',
    messageTypes: ['support', 'consultation', 'feedback', 'escalation'],
    allowedActions: ['send', 'receive', 'escalate', 'close'],
    responseTime: '48h'
  };

  /**
   * SOURCING COMMUNICATION STRATEGY
   * Centralized sourcing communication strategy
   */
  var SourcingCommunicationStrategy = {
    conversationType: 'sourcing',
    messageTypes: ['request', 'quote', 'negotiation', 'confirmation'],
    allowedActions: ['send', 'receive', 'accept', 'decline'],
    responseTime: '72h'
  };

  /**
   * PROJECT DISCUSSION STRATEGY
   * Centralized project discussion strategy
   */
  var ProjectDiscussionStrategy = {
    conversationType: 'project',
    messageTypes: ['update', 'question', 'approval', 'milestone'],
    allowedActions: ['send', 'receive', 'approve', 'reject'],
    responseTime: '24h'
  };

  /**
   * PROPERTY CONSULTATION STRATEGY
   * Centralized property consultation strategy
   */
  var PropertyConsultationStrategy = {
    conversationType: 'property-consultation',
    messageTypes: ['inquiry', 'viewing', 'offer', 'negotiation'],
    allowedActions: ['send', 'receive', 'schedule', 'cancel'],
    responseTime: '24h'
  };

  /**
   * MESSAGE TYPES
   * Centralized message types
   */
  var MessageTypes = {
    text: 'text',
    image: 'image',
    document: 'document',
    quote: 'quote',
    system: 'system'
  };

  /**
   * MESSAGE STATUSES
   * Centralized message statuses
   */
  var MessageStatuses = {
    sent: 'sent',
    delivered: 'delivered',
    read: 'read',
    failed: 'failed'
  };

  /**
   * CONVERSATION STATUSES
   * Centralized conversation statuses
   */
  var ConversationStatuses = {
    active: 'active',
    archived: 'archived',
    closed: 'closed',
    blocked: 'blocked'
  };

  /**
   * EXPORT MESSAGING ARCHITECTURE
   */
  window.FurnostylesMessagingArchitecture = {
    MessageStructure: MessageStructure,
    ConversationStructure: ConversationStructure,
    ClientVendorCommunicationStrategy: ClientVendorCommunicationStrategy,
    ClientFurnostylesCommunicationStrategy: ClientFurnostylesCommunicationStrategy,
    SourcingCommunicationStrategy: SourcingCommunicationStrategy,
    ProjectDiscussionStrategy: ProjectDiscussionStrategy,
    PropertyConsultationStrategy: PropertyConsultationStrategy,
    MessageTypes: MessageTypes,
    MessageStatuses: MessageStatuses,
    ConversationStatuses: ConversationStatuses
  };

}());
