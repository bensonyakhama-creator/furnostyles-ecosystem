/**
 * Furnostyles Assignment Status Utility
 * Master enumeration of assignment statuses and color helpers.
 */

(function () {
  'use strict';

  var STATUSES = {
    PENDING_REVIEW: 'pending review',
    RECOMMENDED:    'recommended',
    ASSIGNED:       'assigned',
    ACCEPTED:       'accepted',
    DECLINED:       'declined',
    IN_PROGRESS:    'in progress',
    COMPLETED:      'completed',
    ESCALATED:      'escalated',
    CLOSED:         'closed'
  };

  function getBadgeColor(status) {
    switch (status) {
      case STATUSES.PENDING_REVIEW: return '#8090a0';
      case STATUSES.RECOMMENDED:    return '#0b3b46';
      case STATUSES.ASSIGNED:       return '#1a6e3a';
      case STATUSES.ACCEPTED:       return '#c9a227';
      case STATUSES.DECLINED:       return '#cc1a1a';
      case STATUSES.IN_PROGRESS:    return '#2563eb';
      case STATUSES.COMPLETED:      return '#10b981';
      case STATUSES.ESCALATED:      return '#dc2626';
      case STATUSES.CLOSED:         return '#4b5563';
      default:                      return '#6b7280';
    }
  }

  window.FurnostylesAssignmentStatus = {
    STATUSES: STATUSES,
    getBadgeColor: getBadgeColor
  };

}());
