/**
 * FURNOSTYLES — AUTH AUDIT LOG
 * ============================
 * File: shared/auth/audit-log.js
 * Purpose: Log authentication events for security monitoring
 *          Tracks login, logout, registration, password changes, etc.
 *
 * Usage:
 *   window.FurnostylesAuditLog.logEvent('login', { email: 'user@example.com', success: true })
 *   window.FurnostylesAuditLog.getRecentEvents(limit)
 *   window.FurnostylesAuditLog.getFailedAttempts(email)
 */

(function() {
  'use strict';

  var STORAGE_KEY = 'furnostyles_audit_log';
  var MAX_LOG_ENTRIES = 1000; // Keep last 1000 events
  var LOG_RETENTION_DAYS = 90; // Keep logs for 90 days

  /**
   * Get audit log from localStorage
   * @returns {Array} - Array of audit log entries
   */
  function getAuditLog() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('[AuditLog] Failed to get audit log:', e);
      return [];
    }
  }

  /**
   * Save audit log to localStorage
   * @param {Array} log - Audit log array
   */
  function saveAuditLog(log) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
    } catch (e) {
      console.error('[AuditLog] Failed to save audit log:', e);
    }
  }

  /**
   * Clean up old log entries beyond retention period
   * @param {Array} log - Audit log array
   * @returns {Array} - Cleaned log array
   */
  function cleanupOldEntries(log) {
    var cutoffDate = Date.now() - (LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000);
    return log.filter(function(entry) {
      return entry.timestamp > cutoffDate;
    });
  }

  /**
   * Trim log to max entries
   * @param {Array} log - Audit log array
   * @returns {Array} - Trimmed log array
   */
  function trimLog(log) {
    if (log.length > MAX_LOG_ENTRIES) {
      return log.slice(-MAX_LOG_ENTRIES);
    }
    return log;
  }

  /**
   * Log an authentication event
   * @param {string} eventType - Type of event (login, logout, register, etc.)
   * @param {object} details - Event details
   * @returns {object} - The logged event
   */
  function logEvent(eventType, details) {
    var log = getAuditLog();
    
    var event = {
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      eventType: eventType,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      details: details || {}
    };

    // Add IP address if available (would need server-side in production)
    if (details.email) {
      event.email = details.email;
    }
    if (details.userId) {
      event.userId = details.userId;
    }
    if (details.success !== undefined) {
      event.success = details.success;
    }

    log.push(event);
    log = cleanupOldEntries(log);
    log = trimLog(log);
    saveAuditLog(log);

    console.log('[AuditLog] Event logged:', eventType, event);
    return event;
  }

  /**
   * Get recent audit events
   * @param {number} limit - Maximum number of events to return
   * @param {string} eventType - Optional event type filter
   * @returns {Array} - Array of recent events
   */
  function getRecentEvents(limit, eventType) {
    var log = getAuditLog();
    var filtered = eventType ? log.filter(function(e) { return e.eventType === eventType; }) : log;
    return filtered.slice(-limit).reverse();
  }

  /**
   * Get failed authentication attempts for an email
   * @param {string} email - User email
   * @param {number} hours - Time window in hours (default: 24)
   * @returns {Array} - Array of failed attempts
   */
  function getFailedAttempts(email, hours) {
    hours = hours || 24;
    var cutoff = Date.now() - (hours * 60 * 60 * 1000);
    var log = getAuditLog();
    
    return log.filter(function(entry) {
      return entry.email === email && 
             entry.success === false && 
             entry.timestamp > cutoff;
    });
  }

  /**
   * Get all events for a specific user
   * @param {string} email - User email
   * @param {number} limit - Maximum number of events
   * @returns {Array} - Array of user events
   */
  function getUserEvents(email, limit) {
    var log = getAuditLog();
    var userEvents = log.filter(function(entry) {
      return entry.email === email;
    });
    return userEvents.slice(-limit).reverse();
  }

  /**
   * Get security events (failed logins, suspicious activity)
   * @param {number} hours - Time window in hours (default: 24)
   * @returns {Array} - Array of security events
   */
  function getSecurityEvents(hours) {
    hours = hours || 24;
    var cutoff = Date.now() - (hours * 60 * 60 * 1000);
    var log = getAuditLog();
    
    return log.filter(function(entry) {
      return entry.success === false && entry.timestamp > cutoff;
    });
  }

  /**
   * Clear audit log (admin function)
   * @returns {boolean} - Success status
   */
  function clearAuditLog() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('[AuditLog] Audit log cleared');
      return true;
    } catch (e) {
      console.error('[AuditLog] Failed to clear audit log:', e);
      return false;
    }
  }

  /**
   * Get audit log statistics
   * @returns {object} - Statistics object
   */
  function getStatistics() {
    var log = getAuditLog();
    var stats = {
      totalEvents: log.length,
      byType: {},
      bySuccess: { true: 0, false: 0 },
      last24Hours: 0,
      last7Days: 0
    };

    var now = Date.now();
    var day24 = now - (24 * 60 * 60 * 1000);
    var day7 = now - (7 * 24 * 60 * 60 * 1000);

    log.forEach(function(entry) {
      // Count by type
      stats.byType[entry.eventType] = (stats.byType[entry.eventType] || 0) + 1;
      
      // Count by success
      if (entry.success !== undefined) {
        stats.bySuccess[entry.success]++;
      }
      
      // Count by time
      if (entry.timestamp > day24) stats.last24Hours++;
      if (entry.timestamp > day7) stats.last7Days++;
    });

    return stats;
  }

  // Export API
  window.FurnostylesAuditLog = {
    logEvent: logEvent,
    getRecentEvents: getRecentEvents,
    getFailedAttempts: getFailedAttempts,
    getUserEvents: getUserEvents,
    getSecurityEvents: getSecurityEvents,
    clearAuditLog: clearAuditLog,
    getStatistics: getStatistics,
    
    // Configuration
    MAX_LOG_ENTRIES: MAX_LOG_ENTRIES,
    LOG_RETENTION_DAYS: LOG_RETENTION_DAYS
  };

  console.log('[AuditLog] Audit log module loaded');

})();
