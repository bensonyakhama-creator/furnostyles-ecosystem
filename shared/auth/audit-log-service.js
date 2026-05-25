/**
 * FURNOSTYLES — AUDIT LOG SERVICE
 * ================================
 * File: shared/auth/audit-log-service.js
 * Purpose: Implements audit logging for security events, user actions,
 *          and system events. Tracks login attempts, signups, role changes,
 *          account modifications, and other security-relevant events.
 *
 * Dependencies:
 *   - Firebase SDK (must be loaded before this file)
 *   - shared/firebase/firebase-config.js
 *   - assets/js/firestore.js
 *
 * Usage:
 *   window.FurnostylesAuditLog.logEvent(eventType, userId, details)
 *   window.FurnostylesAuditLog.getUserLogs(userId, limit)
 *   window.FurnostylesAuditLog.getSecurityAlerts(userId)
 */

(function () {
  'use strict';

  /* ============================================================
     AUDIT EVENT TYPES
     ============================================================ */

  var AuditEventTypes = {
    // Authentication events
    LOGIN_SUCCESS: 'login-success',
    LOGIN_FAILURE: 'login-failure',
    LOGOUT: 'logout',
    SIGNUP_SUCCESS: 'signup-success',
    SIGNUP_FAILURE: 'signup-failure',
    PASSWORD_RESET_REQUEST: 'password-reset-request',
    PASSWORD_RESET_SUCCESS: 'password-reset-success',
    PASSWORD_RESET_FAILURE: 'password-reset-failure',

    // Verification events
    EMAIL_VERIFICATION: 'email-verification',
    PHONE_VERIFICATION: 'phone-verification',
    DOCUMENT_UPLOAD: 'document-upload',
    DOCUMENT_VERIFICATION: 'document-verification',
    DOCUMENT_REJECTION: 'document-rejection',

    // Account events
    ROLE_CHANGE: 'role-change',
    ROLE_UPGRADE_REQUEST: 'role-upgrade-request',
    ACCOUNT_SUSPENSION: 'account-suspension',
    ACCOUNT_REACTIVATION: 'account-reactivation',
    ACCOUNT_DELETION: 'account-deletion',
    PROFILE_UPDATE: 'profile-update',

    // Content events
    PRODUCT_CREATE: 'product-create',
    PRODUCT_UPDATE: 'product-update',
    PRODUCT_DELETE: 'product-delete',
    SERVICE_CREATE: 'service-create',
    SERVICE_UPDATE: 'service-update',
    SERVICE_DELETE: 'service-delete',
    PROPERTY_CREATE: 'property-create',
    PROPERTY_UPDATE: 'property-update',
    PROPERTY_DELETE: 'property-delete',

    // Inquiry events
    INQUIRY_CREATE: 'inquiry-create',
    INQUIRY_RESPONSE: 'inquiry-response',
    INQUIRY_UPDATE: 'inquiry-update',

    // Order events
    ORDER_CREATE: 'order-create',
    ORDER_UPDATE: 'order-update',
    ORDER_CANCEL: 'order-cancel',

    // Admin events
    USER_BAN: 'user-ban',
    USER_UNBAN: 'user-unban',
    CONTENT_MODERATION: 'content-moderation',
    SETTINGS_CHANGE: 'settings-change'
  };

  /* ============================================================
     LOG AUDIT EVENT
     ============================================================ */

  /**
   * Log an audit event
   * @param {string} eventType - Type of event from AuditEventTypes
   * @param {string} userId - User ID (null for anonymous events)
   * @param {object} details - Additional event details
   * @returns {Promise} - Resolves with log entry ID
   */
  function logEvent(eventType, userId, details) {
    if (!window.FurnostylesFirestore) {
      console.error('[AuditLog] Firestore not available');
      return Promise.reject(new Error('Firestore not available'));
    }

    var logData = {
      eventType: eventType,
      userId: userId || null,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      ipAddress: details.ipAddress || null,
      userAgent: navigator.userAgent,
      details: details || {},
      severity: getEventSeverity(eventType)
    };

    return window.FurnostylesFirestore.save('audit_logs', logData)
      .then(function (logId) {
        console.log('[AuditLog] Event logged:', eventType, logId);
        return logId;
      })
      .catch(function (error) {
        console.error('[AuditLog] Failed to log event:', error);
        throw error;
      });
  }

  /* ============================================================
     GET EVENT SEVERITY
     ============================================================ */

  /**
   * Get severity level for event type
   * @param {string} eventType - Event type
   * @returns {string} - Severity level: 'info', 'warning', 'error', 'critical'
   */
  function getEventSeverity(eventType) {
    var criticalEvents = [
      'account-deletion',
      'account-suspension',
      'user-ban',
      'login-failure'
    ];

    var errorEvents = [
      'signup-failure',
      'password-reset-failure',
      'document-rejection'
    ];

    var warningEvents = [
      'role-change',
      'role-upgrade-request',
      'content-moderation',
      'settings-change'
    ];

    if (criticalEvents.indexOf(eventType) !== -1) return 'critical';
    if (errorEvents.indexOf(eventType) !== -1) return 'error';
    if (warningEvents.indexOf(eventType) !== -1) return 'warning';
    return 'info';
  }

  /* ============================================================
     GET AUDIT LOGS FOR USER
     ============================================================ */

  /**
   * Get audit logs for a specific user
   * @param {string} userId - User ID
   * @param {number} limit - Maximum number of logs to return
   * @returns {Promise} - Resolves with array of log entries
   */
  function getUserLogs(userId, limit) {
    if (!window.FurnostylesFirestore) {
      console.error('[AuditLog] Firestore not available');
      return Promise.reject(new Error('Firestore not available'));
    }

    return window.FurnostylesFirestore.list('audit_logs', {
      where: [{ field: 'userId', operator: '==', value: userId }],
      orderBy: { field: 'timestamp', direction: 'desc' },
      limit: limit || 50
    });
  }

  /* ============================================================
     GET AUDIT LOGS BY EVENT TYPE
     ============================================================ */

  /**
   * Get audit logs by event type
   * @param {string} eventType - Event type
   * @param {number} limit - Maximum number of logs to return
   * @returns {Promise} - Resolves with array of log entries
   */
  function getLogsByEventType(eventType, limit) {
    if (!window.FurnostylesFirestore) {
      console.error('[AuditLog] Firestore not available');
      return Promise.reject(new Error('Firestore not available'));
    }

    return window.FurnostylesFirestore.list('audit_logs', {
      where: [{ field: 'eventType', operator: '==', value: eventType }],
      orderBy: { field: 'timestamp', direction: 'desc' },
      limit: limit || 50
    });
  }

  /* ============================================================
     GET SECURITY ALERTS
     ============================================================ */

  /**
   * Get security alerts for a user
   * @param {string} userId - User ID
   * @returns {Promise} - Resolves with array of security alerts
   */
  function getSecurityAlerts(userId) {
    if (!window.FurnostylesFirestore) {
      console.error('[AuditLog] Firestore not available');
      return Promise.reject(new Error('Firestore not available'));
    }

    return window.FurnostylesFirestore.list('audit_logs', {
      where: [
        { field: 'userId', operator: '==', value: userId },
        { field: 'severity', operator: 'in', value: ['critical', 'error'] }
      ],
      orderBy: { field: 'timestamp', direction: 'desc' },
      limit: 20
    });
  }

  /* ============================================================
     GET RECENT CRITICAL EVENTS
     ============================================================ */

  /**
   * Get recent critical events across all users
   * @param {number} limit - Maximum number of events to return
   * @returns {Promise} - Resolves with array of critical events
   */
  function getRecentCriticalEvents(limit) {
    if (!window.FurnostylesFirestore) {
      console.error('[AuditLog] Firestore not available');
      return Promise.reject(new Error('Firestore not available'));
    }

    return window.FurnostylesFirestore.list('audit_logs', {
      where: [{ field: 'severity', operator: '==', value: 'critical' }],
      orderBy: { field: 'timestamp', direction: 'desc' },
      limit: limit || 50
    });
  }

  /* ============================================================
     GET AUDIT STATISTICS
     ============================================================ */

  /**
   * Get audit statistics for a user
   * @param {string} userId - User ID
   * @returns {Promise} - Resolves with statistics object
   */
  function getAuditStatistics(userId) {
    if (!window.FurnostylesFirestore) {
      console.error('[AuditLog] Firestore not available');
      return Promise.reject(new Error('Firestore not available'));
    }

    return getUserLogs(userId, 1000).then(function (logs) {
      var stats = {
        totalEvents: logs.length,
        byEventType: {},
        bySeverity: {
          info: 0,
          warning: 0,
          error: 0,
          critical: 0
        },
        lastActivity: null
      };

      logs.forEach(function (log) {
        // Count by event type
        stats.byEventType[log.eventType] = (stats.byEventType[log.eventType] || 0) + 1;

        // Count by severity
        if (stats.bySeverity[log.severity] !== undefined) {
          stats.bySeverity[log.severity]++;
        }

        // Track last activity
        if (!stats.lastActivity || log.timestamp > stats.lastActivity) {
          stats.lastActivity = log.timestamp;
        }
      });

      return stats;
    });
  }

  /* ============================================================
     EXPORT AUDIT LOG SERVICE
     ============================================================ */

  window.FurnostylesAuditLog = {
    // Event types
    EventTypes: AuditEventTypes,

    // Logging functions
    logEvent: logEvent,

    // Query functions
    getUserLogs: getUserLogs,
    getLogsByEventType: getLogsByEventType,
    getSecurityAlerts: getSecurityAlerts,
    getRecentCriticalEvents: getRecentCriticalEvents,
    getAuditStatistics: getAuditStatistics
  };

  console.log('[AuditLog] FurnostylesAuditLog service loaded');

}());
