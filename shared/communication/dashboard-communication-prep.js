/**
 * FURNOSTYLES — DASHBOARD COMMUNICATION PREPARATION
 * ===================================================
 * File: shared/communication/dashboard-communication-prep.js
 * Purpose: Centralized dashboard communication preparation for vendor dashboards,
 *          client dashboards, provider dashboards, and admin dashboards.
 */

(function () {
  'use strict';

  /**
   * VENDOR DASHBOARD COMMUNICATION STRATEGY
   * Centralized vendor dashboard communication strategy
   */
  var VendorDashboardCommunicationStrategy = {
    sections: ['inquiries', 'messages', 'notifications', 'orders'],
    communicationTypes: ['inquiry', 'order', 'support', 'verification'],
    responseTime: '24h',
    notificationSettings: {
      email: true,
      sms: false,
      push: true
    }
  };

  /**
   * CLIENT DASHBOARD COMMUNICATION STRATEGY
   * Centralized client dashboard communication strategy
   */
  var ClientDashboardCommunicationStrategy = {
    sections: ['inquiries', 'messages', 'notifications', 'consultations'],
    communicationTypes: ['inquiry', 'consultation', 'support', 'sourcing'],
    responseTime: '48h',
    notificationSettings: {
      email: true,
      sms: false,
      push: true
    }
  };

  /**
   * PROVIDER DASHBOARD COMMUNICATION STRATEGY
   * Centralized provider dashboard communication strategy
   */
  var ProviderDashboardCommunicationStrategy = {
    sections: ['service-requests', 'messages', 'notifications', 'projects'],
    communicationTypes: ['service-request', 'consultation', 'project', 'support'],
    responseTime: '24h',
    notificationSettings: {
      email: true,
      sms: false,
      push: true
    }
  };

  /**
   * ADMIN DASHBOARD COMMUNICATION STRATEGY
   * Centralized admin dashboard communication strategy
   */
  var AdminDashboardCommunicationStrategy = {
    sections: ['inquiries', 'messages', 'notifications', 'approvals'],
    communicationTypes: ['inquiry', 'approval', 'support', 'escalation'],
    responseTime: '24h',
    notificationSettings: {
      email: true,
      sms: true,
      push: true
    }
  };

  /**
   * DASHBOARD COMMUNICATION WIDGET STRATEGY
   * Centralized dashboard communication widget strategy
   */
  var DashboardCommunicationWidgetStrategy = {
    structure: {
      container: 'div.fns-dashboard-communication',
      header: 'div.fns-comm-header',
      tabs: 'div.fns-comm-tabs',
      content: 'div.fns-comm-content',
      list: 'div.fns-comm-list',
      item: 'div.fns-comm-item'
    },
    widgetTypes: ['inbox', 'notifications', 'activity'],
    maxItems: 5
  };

  /**
   * DASHBOARD NOTIFICATION STRATEGY
   * Centralized dashboard notification strategy
   */
  var DashboardNotificationStrategy = {
    structure: {
      container: 'div.fns-dashboard-notifications',
      header: 'div.fns-notif-header',
      list: 'div.fns-notif-list',
      item: 'div.fns-notif-item',
      badge: 'span.fns-notif-badge'
    },
    displayTypes: ['toast', 'banner', 'sidebar'],
    autoDismiss: 5000
  };

  /**
   * EXPORT DASHBOARD COMMUNICATION PREPARATION
   */
  window.FurnostylesDashboardCommunicationPrep = {
    VendorDashboardCommunicationStrategy: VendorDashboardCommunicationStrategy,
    ClientDashboardCommunicationStrategy: ClientDashboardCommunicationStrategy,
    ProviderDashboardCommunicationStrategy: ProviderDashboardCommunicationStrategy,
    AdminDashboardCommunicationStrategy: AdminDashboardCommunicationStrategy,
    DashboardCommunicationWidgetStrategy: DashboardCommunicationWidgetStrategy,
    DashboardNotificationStrategy: DashboardNotificationStrategy
  };

}());
