/**
 * Furnostyles Assignment Workflow
 * Orchestrates linear state transitions with checks that secure Platform authority.
 */

(function () {
  'use strict';

  function _status() { return window.FurnostylesAssignmentStatus; }
  function _svc() { return window.FurnostylesAssignmentService; }

  /**
   * Safe linear state-transition checks.
   */
  function canTransition(current, next) {
    var s = _status() ? _status().STATUSES : {};
    if (!s) return false;

    // Strict state transitions protecting authority
    switch (current) {
      case s.PENDING_REVIEW:
        return next === s.RECOMMENDED || next === s.ASSIGNED || next === s.CLOSED;
      case s.RECOMMENDED:
        return next === s.ASSIGNED || next === s.CLOSED;
      case s.ASSIGNED:
        return next === s.ACCEPTED || next === s.DECLINED || next === s.ESCALATED;
      case s.ACCEPTED:
        return next === s.IN_PROGRESS || next === s.ESCALATED;
      case s.DECLINED:
        return next === s.PENDING_REVIEW || next === s.CLOSED;
      case s.IN_PROGRESS:
        return next === s.COMPLETED || next === s.ESCALATED;
      case s.COMPLETED:
        return next === s.CLOSED || next === s.ESCALATED;
      case s.ESCALATED:
        return next === s.PENDING_REVIEW || next === s.ASSIGNED || next === s.CLOSED;
      default:
        return false;
    }
  }

  window.FurnostylesAssignmentWorkflow = {
    canTransition: canTransition
  };

}());
