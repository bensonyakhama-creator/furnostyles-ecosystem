/**
 * Furnostyles Communication Status
 * Master enumeration of communication statuses.
 */

(function () {
  'use strict';

  var STATUSES = {
    UNREAD: 'unread',
    READ:   'read',
    PENDING_RESPONSE: 'pending response',
    ESCALATED: 'escalated',
    ARCHIVED:  'archived'
  };

  window.FurnostylesCommunicationStatus = {
    STATUSES: STATUSES
  };

}());
