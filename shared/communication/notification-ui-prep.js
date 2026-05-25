/**
 * FURNOSTYLES — NOTIFICATION UI PREPARATION
 * ===========================================
 * File: shared/communication/notification-ui-prep.js
 * Purpose: Centralized notification UI preparation for notification badges,
 *          alerts, message previews, activity feeds, and communication status.
 */

(function () {
  'use strict';

  /**
   * NOTIFICATION BADGE STRATEGY
   * Centralized notification badge strategy
   */
  var NotificationBadgeStrategy = {
    structure: {
      container: 'span.fns-notification-badge',
      count: 'span.fns-badge-count',
      pulse: 'span.fns-badge-pulse'
    },
    variants: ['primary', 'secondary', 'success', 'warning', 'danger'],
    positions: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    maxCount: 99
  };

  /**
   * ALERT STRATEGY
   * Centralized alert strategy
   */
  var AlertStrategy = {
    structure: {
      container: 'div.fns-alert',
      icon: 'span.fns-alert-icon',
      message: 'div.fns-alert-message',
      actions: 'div.fns-alert-actions',
      close: 'button.fns-alert-close'
    },
    types: ['info', 'success', 'warning', 'error'],
    dismissible: true,
    autoDismiss: 5000
  };

  /**
   * MESSAGE PREVIEW STRATEGY
   * Centralized message preview strategy
   */
  var MessagePreviewStrategy = {
    structure: {
      container: 'div.fns-message-preview',
      header: 'div.fns-preview-header',
      sender: 'span.fns-preview-sender',
      time: 'span.fns-preview-time',
      content: 'div.fns-preview-content',
      unread: 'span.fns-preview-unread'
    },
    maxLength: 100,
    showUnread: true
  };

  /**
   * ACTIVITY FEED STRATEGY
   * Centralized activity feed strategy
   */
  var ActivityFeedStrategy = {
    structure: {
      container: 'div.fns-activity-feed',
      list: 'ul.fns-activity-list',
      item: 'li.fns-activity-item',
      icon: 'span.fns-activity-icon',
      content: 'div.fns-activity-content',
      timestamp: 'span.fns-activity-timestamp'
    },
    itemTypes: ['message', 'notification', 'update', 'system'],
    limit: 20
  };

  /**
   * COMMUNICATION STATUS STRATEGY
   * Centralized communication status strategy
   */
  var CommunicationStatusStrategy = {
    structure: {
      container: 'div.fns-communication-status',
      indicator: 'span.fns-status-indicator',
      label: 'span.fns-status-label',
      lastSeen: 'span.fns-status-last-seen'
    },
    statuses: ['online', 'offline', 'away', 'busy'],
    showLastSeen: true
  };

  /**
   * NOTIFICATION CENTER STRATEGY
   * Centralized notification center strategy
   */
  var NotificationCenterStrategy = {
    structure: {
      container: 'div.fns-notification-center',
      header: 'div.fns-notification-header',
      tabs: 'div.fns-notification-tabs',
      list: 'div.fns-notification-list',
      item: 'div.fns-notification-item',
      footer: 'div.fns-notification-footer'
    },
    tabs: ['all', 'unread', 'messages', 'updates'],
    itemsPerPage: 10
  };

  /**
   * EXPORT NOTIFICATION UI PREPARATION
   */
  window.FurnostylesNotificationUIPrep = {
    NotificationBadgeStrategy: NotificationBadgeStrategy,
    AlertStrategy: AlertStrategy,
    MessagePreviewStrategy: MessagePreviewStrategy,
    ActivityFeedStrategy: ActivityFeedStrategy,
    CommunicationStatusStrategy: CommunicationStatusStrategy,
    NotificationCenterStrategy: NotificationCenterStrategy
  };

}());
