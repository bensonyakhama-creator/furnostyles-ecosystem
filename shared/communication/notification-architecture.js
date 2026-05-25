/**
 * FURNOSTYLES — NOTIFICATION ARCHITECTURE
 * ========================================
 * File: shared/communication/notification-architecture.js
 * Purpose: Centralized notification architecture for inquiry updates,
 *          order updates, sourcing updates, project updates,
 *          consultation reminders, and vendor notifications.
 */

(function () {
  'use strict';

  /**
   * NOTIFICATION STRUCTURE
   * Centralized notification structure
   */
  var NotificationStructure = {
    id: 'string',
    type: 'string',
    title: 'string',
    message: 'string',
    userId: 'string',
    read: 'boolean',
    priority: 'string',
    actionUrl: 'string',
    actionLabel: 'string',
    metadata: 'object',
    createdAt: 'timestamp',
    expiresAt: 'timestamp'
  };

  /**
   * NOTIFICATION TYPES
   * Centralized notification types
   */
  var NotificationTypes = {
    inquiryUpdate: 'inquiry-update',
    orderUpdate: 'order-update',
    sourcingUpdate: 'sourcing-update',
    projectUpdate: 'project-update',
    consultationReminder: 'consultation-reminder',
    vendorNotification: 'vendor-notification',
    systemNotification: 'system-notification'
  };

  /**
   * NOTIFICATION PRIORITIES
   * Centralized notification priorities
   */
  var NotificationPriorities = {
    low: 'low',
    medium: 'medium',
    high: 'high',
    urgent: 'urgent'
  };

  /**
   * INQUIRY UPDATE NOTIFICATION STRATEGY
   * Centralized inquiry update notification strategy
   */
  var InquiryUpdateNotificationStrategy = {
    triggers: ['new-inquiry', 'inquiry-response', 'inquiry-status-change'],
    template: {
      newInquiry: 'New inquiry received: {subject}',
      inquiryResponse: 'Response to your inquiry: {subject}',
      statusChange: 'Inquiry status updated: {status}'
    }
  };

  /**
   * ORDER UPDATE NOTIFICATION STRATEGY
   * Centralized order update notification strategy
   */
  var OrderUpdateNotificationStrategy = {
    triggers: ['order-created', 'order-shipped', 'order-delivered', 'order-cancelled'],
    template: {
      orderCreated: 'Order #{orderId} created',
      orderShipped: 'Order #{orderId} shipped',
      orderDelivered: 'Order #{orderId} delivered',
      orderCancelled: 'Order #{orderId} cancelled'
    }
  };

  /**
   * SOURCING UPDATE NOTIFICATION STRATEGY
   * Centralized sourcing update notification strategy
   */
  var SourcingUpdateNotificationStrategy = {
    triggers: ['sourcing-quote', 'sourcing-update', 'sourcing-completed'],
    template: {
      sourcingQuote: 'New quote received for sourcing request #{requestId}',
      sourcingUpdate: 'Sourcing request #{requestId} updated',
      sourcingCompleted: 'Sourcing request #{requestId} completed'
    }
  };

  /**
   * PROJECT UPDATE NOTIFICATION STRATEGY
   * Centralized project update notification strategy
   */
  var ProjectUpdateNotificationStrategy = {
    triggers: ['project-started', 'milestone-reached', 'project-completed'],
    template: {
      projectStarted: 'Project #{projectId} has started',
      milestoneReached: 'Milestone reached: {milestone}',
      projectCompleted: 'Project #{projectId} completed'
    }
  };

  /**
   * CONSULTATION REMINDER NOTIFICATION STRATEGY
   * Centralized consultation reminder notification strategy
   */
  var ConsultationReminderNotificationStrategy = {
    triggers: ['consultation-scheduled', 'consultation-reminder', 'consultation-upcoming'],
    template: {
      consultationScheduled: 'Consultation scheduled for {date}',
      consultationReminder: 'Reminder: Consultation in {time}',
      consultationUpcoming: 'Upcoming consultation: {date}'
    }
  };

  /**
   * VENDOR NOTIFICATION STRATEGY
   * Centralized vendor notification strategy
   */
  var VendorNotificationStrategy = {
    triggers: ['new-order', 'new-inquiry', 'verification-update', 'performance-update'],
    template: {
      newOrder: 'New order received: #{orderId}',
      newInquiry: 'New inquiry received: {subject}',
      verificationUpdate: 'Verification status updated: {status}',
      performanceUpdate: 'Performance update: {metric}'
    }
  };

  /**
   * EXPORT NOTIFICATION ARCHITECTURE
   */
  window.FurnostylesNotificationArchitecture = {
    NotificationStructure: NotificationStructure,
    NotificationTypes: NotificationTypes,
    NotificationPriorities: NotificationPriorities,
    InquiryUpdateNotificationStrategy: InquiryUpdateNotificationStrategy,
    OrderUpdateNotificationStrategy: OrderUpdateNotificationStrategy,
    SourcingUpdateNotificationStrategy: SourcingUpdateNotificationStrategy,
    ProjectUpdateNotificationStrategy: ProjectUpdateNotificationStrategy,
    ConsultationReminderNotificationStrategy: ConsultationReminderNotificationStrategy,
    VendorNotificationStrategy: VendorNotificationStrategy
  };

}());
