/**
 * FURNOSTYLES — LIVE CHAT PREPARATION
 * ====================================
 * File: shared/communication/live-chat-prep.js
 * Purpose: Centralized live-chat preparation for support chat,
 *          marketplace chat, sourcing support, project consultation chat,
 *          and vendor communication.
 */

(function () {
  'use strict';

  /**
   * SUPPORT CHAT STRATEGY
   * Centralized support chat strategy
   */
  var SupportChatStrategy = {
    chatType: 'support',
    structure: {
      container: 'div.fns-support-chat',
      widget: 'div.fns-chat-widget',
      button: 'button.fns-chat-button',
      window: 'div.fns-chat-window',
      header: 'div.fns-chat-header',
      messages: 'div.fns-chat-messages',
      input: 'div.fns-chat-input'
    },
    features: ['typing-indicator', 'file-upload', 'emoji-picker'],
    availability: '9am - 6pm EAT'
  };

  /**
   * MARKETPLACE CHAT STRATEGY
   * Centralized marketplace chat strategy
   */
  var MarketplaceChatStrategy = {
    chatType: 'marketplace',
    structure: {
      container: 'div.fns-marketplace-chat',
      conversations: 'div.fns-conversations',
      chat: 'div.fns-chat-area',
      header: 'div.fns-chat-header',
      messages: 'div.fns-chat-messages',
      input: 'div.fns-chat-input'
    },
    features: ['product-sharing', 'quote-request', 'negotiation'],
    participants: ['buyer', 'seller']
  };

  /**
   * SOURCING SUPPORT STRATEGY
   * Centralized sourcing support strategy
   */
  var SourcingSupportStrategy = {
    chatType: 'sourcing',
    structure: {
      container: 'div.fns-sourcing-chat',
      header: 'div.fns-chat-header',
      messages: 'div.fns-chat-messages',
      input: 'div.fns-chat-input'
    },
    features: ['document-sharing', 'quote-comparison', 'timeline'],
    participants: ['client', 'sourcing-agent']
  };

  /**
   * PROJECT CONSULTATION CHAT STRATEGY
   * Centralized project consultation chat strategy
   */
  var ProjectConsultationChatStrategy = {
    chatType: 'project-consultation',
    structure: {
      container: 'div.fns-project-chat',
      header: 'div.fns-chat-header',
      messages: 'div.fns-chat-messages',
      input: 'div.fns-chat-input',
      attachments: 'div.fns-chat-attachments'
    },
    features: ['image-sharing', 'milestone-updates', 'approval-flow'],
    participants: ['client', 'provider', 'project-manager']
  };

  /**
   * VENDOR COMMUNICATION STRATEGY
   * Centralized vendor communication strategy
   */
  var VendorCommunicationStrategy = {
    chatType: 'vendor',
    structure: {
      container: 'div.fns-vendor-chat',
      conversations: 'div.fns-conversations',
      chat: 'div.fns-chat-area',
      header: 'div.fns-chat-header',
      messages: 'div.fns-chat-messages',
      input: 'div.fns-chat-input'
    },
    features: ['bulk-messaging', 'catalog-sharing', 'order-updates'],
    participants: ['vendor', 'customer']
  };

  /**
   * CHAT MESSAGE STRUCTURE
   * Centralized chat message structure
   */
  var ChatMessageStructure = {
    id: 'string',
    chatId: 'string',
    senderId: 'string',
    content: 'string',
    type: 'string',
    timestamp: 'timestamp',
    status: 'string',
    attachments: 'array'
  };

  /**
   * CHAT STRUCTURE
   * Centralized chat structure
   */
  var ChatStructure = {
    id: 'string',
    type: 'string',
    participants: 'array',
    subject: 'string',
    status: 'string',
    lastMessage: 'object',
    unreadCount: 'number',
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  };

  /**
   * CHAT OPTIONS
   * Centralized chat options
   */
  var ChatOptions = {
    realTime: true,
    typingIndicator: true,
    readReceipts: true,
    fileUpload: true,
    emojiPicker: true,
    maxFileSize: 10485760
  };

  /**
   * EXPORT LIVE CHAT PREPARATION
   */
  window.FurnostylesLiveChatPrep = {
    SupportChatStrategy: SupportChatStrategy,
    MarketplaceChatStrategy: MarketplaceChatStrategy,
    SourcingSupportStrategy: SourcingSupportStrategy,
    ProjectConsultationChatStrategy: ProjectConsultationChatStrategy,
    VendorCommunicationStrategy: VendorCommunicationStrategy,
    ChatMessageStructure: ChatMessageStructure,
    ChatStructure: ChatStructure,
    ChatOptions: ChatOptions
  };

}());
