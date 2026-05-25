/**
 * Furnostyles Moderation Status
 * Central constants for all moderation states, labels, styles, and allowed transitions.
 *
 * Load order: before moderation-service.js and moderation-ui.js
 */

(function () {
  'use strict';

  window.FurnStylesModerationStatus = {

    PENDING:  'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    HIDDEN:   'hidden',
    FLAGGED:  'flagged',

    LABEL: {
      pending:  'Pending Review',
      approved: 'Approved',
      rejected: 'Rejected',
      hidden:   'Hidden',
      flagged:  'Flagged'
    },

    /* Inline badge CSS — applied directly so cards work without external CSS */
    STYLE: {
      pending:  'background:#fffbea;color:#8a5d00;border:1px solid #f0d890;',
      approved: 'background:#f0faf4;color:#1a6e3a;border:1px solid #b6dfc6;',
      rejected: 'background:#fff5f5;color:#cc1a1a;border:1px solid #f5c0c0;',
      hidden:   'background:#f5f5f5;color:#555;border:1px solid #ccc;',
      flagged:  'background:#fff8f0;color:#8a4000;border:1px solid #f0c890;'
    },

    /**
     * Which status transitions are permitted per current status.
     * Guards are enforced in the UI before calling the service.
     */
    ALLOWED_TRANSITIONS: {
      pending:  ['approved', 'rejected', 'hidden', 'flagged'],
      approved: ['hidden', 'flagged', 'rejected'],
      rejected: ['approved', 'pending'],
      hidden:   ['approved', 'pending'],
      flagged:  ['approved', 'rejected', 'hidden', 'pending']
    },

    /**
     * Returns true if transitioning from `from` → `to` is allowed.
     */
    canTransition: function (from, to) {
      var allowed = this.ALLOWED_TRANSITIONS[from];
      return allowed ? allowed.indexOf(to) !== -1 : false;
    },

    /**
     * Returns the badge style string for a given status.
     */
    styleFor: function (status) {
      return this.STYLE[status] || this.STYLE.pending;
    }

  };

}());
