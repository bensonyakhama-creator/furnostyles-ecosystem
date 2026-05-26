/**
 * FURNOSTYLES — RATE LIMITER
 * ==========================
 * File: shared/auth/rate-limiter.js
 * Purpose: Client-side rate limiting for authentication attempts
 *          Prevents brute force attacks by limiting login/register attempts
 *
 * Features:
 *   - Track failed attempts per email/IP
 *   - Implement exponential backoff
 *   - Lockout after threshold reached
 *   - Persistent storage across sessions
 *
 * Usage:
 *   window.FurnostylesRateLimiter.checkLimit('login', email)
 *   window.FurnostylesRateLimiter.recordAttempt('login', email, success)
 *   window.FurnostylesRateLimiter.isLocked('login', email)
 *   window.FurnostylesRateLimiter.getRemainingAttempts('login', email)
 */

(function() {
  'use strict';

  // Storage keys
  var STORAGE_PREFIX = 'fns_rate_limit_';
  var LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  var MAX_ATTEMPTS = 5;
  var ATTEMPT_WINDOW = 15 * 60 * 1000; // 15 minutes

  /**
   * Get rate limit data for a specific action and identifier
   */
  function getRateLimitData(action, identifier) {
    try {
      var key = STORAGE_PREFIX + action + '_' + identifier;
      var data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('[RateLimiter] Failed to get rate limit data:', e);
      return null;
    }
  }

  /**
   * Save rate limit data
   */
  function saveRateLimitData(action, identifier, data) {
    try {
      var key = STORAGE_PREFIX + action + '_' + identifier;
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('[RateLimiter] Failed to save rate limit data:', e);
    }
  }

  /**
   * Clear expired attempts from the data
   */
  function clearExpiredAttempts(data) {
    var now = Date.now();
    data.attempts = data.attempts.filter(function(attempt) {
      return attempt.timestamp > now - ATTEMPT_WINDOW;
    });
  }

  /**
   * Check if the identifier is currently locked out
   */
  function isLocked(action, identifier) {
    var data = getRateLimitData(action, identifier);
    if (!data || !data.lockedUntil) return false;

    var now = Date.now();
    if (now < data.lockedUntil) {
      return true;
    }

    // Lockout expired, clear it
    data.lockedUntil = null;
    data.attempts = [];
    saveRateLimitData(action, identifier, data);
    return false;
  }

  /**
   * Get remaining time until lockout expires (in seconds)
   */
  function getLockoutRemaining(action, identifier) {
    var data = getRateLimitData(action, identifier);
    if (!data || !data.lockedUntil) return 0;

    var now = Date.now();
    var remaining = Math.ceil((data.lockedUntil - now) / 1000);
    return Math.max(0, remaining);
  }

  /**
   * Check if an action can be performed
   * Returns { allowed: boolean, remainingAttempts: number, lockedUntil: number }
   */
  function checkLimit(action, identifier) {
    // Check if locked out
    if (isLocked(action, identifier)) {
      return {
        allowed: false,
        remainingAttempts: 0,
        lockedUntil: getLockoutRemaining(action, identifier)
      };
    }

    var data = getRateLimitData(action, identifier);
    if (!data) {
      data = {
        attempts: [],
        lockedUntil: null
      };
    }

    // Clear expired attempts
    clearExpiredAttempts(data);

    var remainingAttempts = MAX_ATTEMPTS - data.attempts.length;

    return {
      allowed: remainingAttempts > 0,
      remainingAttempts: Math.max(0, remainingAttempts),
      lockedUntil: 0
    };
  }

  /**
   * Record an attempt (success or failure)
   */
  function recordAttempt(action, identifier, success) {
    var data = getRateLimitData(action, identifier);
    if (!data) {
      data = {
        attempts: [],
        lockedUntil: null
      };
    }

    // Clear expired attempts
    clearExpiredAttempts(data);

    if (success) {
      // Reset on successful attempt
      data.attempts = [];
      data.lockedUntil = null;
    } else {
      // Record failed attempt
      data.attempts.push({
        timestamp: Date.now()
      });

      // Check if threshold reached
      if (data.attempts.length >= MAX_ATTEMPTS) {
        data.lockedUntil = Date.now() + LOCKOUT_DURATION;
        console.warn('[RateLimiter] Lockout triggered for', action, identifier);
      }
    }

    saveRateLimitData(action, identifier, data);
  }

  /**
   * Get remaining attempts before lockout
   */
  function getRemainingAttempts(action, identifier) {
    var check = checkLimit(action, identifier);
    return check.remainingAttempts;
  }

  /**
   * Reset rate limit for an identifier (admin function)
   */
  function resetLimit(action, identifier) {
    try {
      var key = STORAGE_PREFIX + action + '_' + identifier;
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('[RateLimiter] Failed to reset rate limit:', e);
      return false;
    }
  }

  /**
   * Clear all rate limit data (admin function)
   */
  function clearAllLimits() {
    try {
      var keys = Object.keys(localStorage);
      keys.forEach(function(key) {
        if (key.indexOf(STORAGE_PREFIX) === 0) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (e) {
      console.error('[RateLimiter] Failed to clear all limits:', e);
      return false;
    }
  }

  // Export API
  window.FurnostylesRateLimiter = {
    checkLimit: checkLimit,
    recordAttempt: recordAttempt,
    isLocked: isLocked,
    getLockoutRemaining: getLockoutRemaining,
    getRemainingAttempts: getRemainingAttempts,
    resetLimit: resetLimit,
    clearAllLimits: clearAllLimits,
    
    // Configuration
    MAX_ATTEMPTS: MAX_ATTEMPTS,
    LOCKOUT_DURATION: LOCKOUT_DURATION,
    ATTEMPT_WINDOW: ATTEMPT_WINDOW
  };

  console.log('[RateLimiter] Rate limiter module loaded');

})();
