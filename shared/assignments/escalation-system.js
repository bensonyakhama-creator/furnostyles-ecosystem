/**
 * Furnostyles Escalation System
 * Handles dispute reporting, manual reassignments, and quality reviews by Platform Coordinators.
 */

(function () {
  'use strict';

  function _status() { return window.FurnostylesAssignmentStatus; }

  /**
   * Registers a customer/artisan escalation on a specific assignment.
   */
  function submitEscalation(assignmentId, requestId, reason, initiatedBy, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var s = _status() ? _status().STATUSES : {};
    var doc = {
      assignmentId: assignmentId,
      requestId: requestId,
      reason: reason || 'General dispute / Delay reported',
      initiatedBy: initiatedBy || 'client',
      escalationStatus: 'pending platform review',
      createdAt: new Date().toISOString(),
      resolvedAt: null
    };

    return bridge.create('escalations', doc)
      .then(function () {
        return bridge.update('assignments', assignmentId, {
          assignmentStatus: s.ESCALATED || 'escalated',
          escalationStatus: 'active',
          updatedAt: new Date().toISOString()
        });
      })
      .then(function () {
        return bridge.update('serviceRequests', requestId, {
          status: s.ESCALATED || 'escalated',
          updatedAt: new Date().toISOString()
        });
      });
  }

  /**
   * Resolves an escalation and marks the assignment as resolved or triggers reassignment.
   */
  function resolveEscalation(escalationId, assignmentId, requestId, resolution, action, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var s = _status() ? _status().STATUSES : {};
    var updateEscalation = {
      escalationStatus: 'resolved',
      resolution: resolution || 'Amicably resolved',
      resolvedAt: new Date().toISOString()
    };

    return bridge.update('escalations', escalationId, updateEscalation)
      .then(function () {
        var nextStatus = (action === 'reassign') ? s.PENDING_REVIEW : s.CLOSED;
        
        return bridge.update('assignments', assignmentId, {
          escalationStatus: 'resolved',
          assignmentStatus: nextStatus,
          updatedAt: new Date().toISOString()
        }).then(function () {
          return bridge.update('serviceRequests', requestId, {
            status: nextStatus,
            updatedAt: new Date().toISOString()
          });
        });
      });
  }

  window.FurnostylesEscalationSystem = {
    submitEscalation: submitEscalation,
    resolveEscalation: resolveEscalation
  };

}());
