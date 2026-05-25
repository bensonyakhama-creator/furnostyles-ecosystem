/**
 * Furnostyles Escalation Chat
 * Triggers dedicated tri-party escalation chats connecting customers, partners, and administrators.
 */

(function () {
  'use strict';

  function _msg() { return window.FurnostylesMessagingService; }

  /**
   * Initializes a protected escalation thread with direct Admin moderation injection.
   */
  function initiateEscalationThread(requestId, assignmentId, clientUserId, partnerId, reason, bridge) {
    if (!bridge || !_msg()) return Promise.reject(new Error('Required services unavailable.'));

    return _msg().startConversation(requestId, clientUserId, partnerId, 'escalation', bridge)
      .then(function (convo) {
        var systemWarning = '⚠️ ESCALATION REPORTED: ' + reason + '. ' +
          'A Furnostyles Platform Coordinator has been injected into this workspace to resolve the dispute.';
        
        return _msg().sendMessage(convo.id, 'system_coordinator', 'admin', systemWarning, bridge)
          .then(function () {
            return convo;
          });
      });
  }

  window.FurnostylesEscalationChat = {
    initiateEscalationThread: initiateEscalationThread
  };

}());
