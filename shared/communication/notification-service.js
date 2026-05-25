/**
 * Furnostyles Notification Service
 * Core service to dispatch, fetch, and archive notifications.
 */

(function () {
  'use strict';

  function _status() { return window.FurnostylesCommunicationStatus; }

  /**
   * Dispatches a notification to a specific user role or ID.
   */
  function sendNotification(data, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));
    if (!data) return Promise.reject(new Error('Payload missing.'));

    var s = _status() ? _status().STATUSES : {};
    var doc = {
      notificationType: data.type || 'system',
      title: data.title || 'Platform Update',
      message: data.message || '',
      relatedId: data.relatedId || '',
      recipientRole: data.recipientRole || 'client',
      recipientId: data.recipientId || '', // specific user
      status: s.UNREAD || 'unread',
      createdAt: new Date().toISOString()
    };

    return bridge.create('notifications', doc);
  }

  /**
   * Fetches notifications matching a specific role or user ID.
   */
  function fetchNotifications(recipientId, role, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var whereClauses = [];
    if (recipientId) {
      whereClauses.push({ field: 'recipientId', operator: '==', value: recipientId });
    } else if (role) {
      whereClauses.push({ field: 'recipientRole', operator: '==', value: role });
    }

    return bridge.list('notifications', { where: whereClauses })
      .then(function (list) {
        return list.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      });
  }

  window.FurnostylesNotificationService = {
    sendNotification: sendNotification,
    fetchNotifications: fetchNotifications
  };

}());
