/**
 * Furnostyles Messaging Service
 * Unified messenger model. Filters all peer interactions through Furnostyles coordination (No raw Peer-to-Peer).
 */

(function () {
  'use strict';

  function _status() { return window.FurnostylesCommunicationStatus; }

  /**
   * Initializes or fetches a moderated conversation thread.
   */
  function startConversation(relatedRequestId, clientUserId, partnerId, type, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var s = _status() ? _status().STATUSES : {};
    var query = {
      where: [
        { field: 'relatedRequestId', operator: '==', value: relatedRequestId },
        { field: 'clientUserId', operator: '==', value: clientUserId }
      ]
    };

    return bridge.list('conversations', query)
      .then(function (existing) {
        if (existing && existing.length > 0) {
          return existing[0];
        }

        var doc = {
          relatedRequestId: relatedRequestId,
          clientUserId: clientUserId,
          partnerId: partnerId,
          conversationType: type || 'assignment', // 'assignment', 'escalation', 'inquiry'
          moderatedBy: 'admin', // Furnostyles is always central
          status: s.UNREAD || 'unread',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        return bridge.create('conversations', doc);
      });
  }

  /**
   * Appends a message to a conversation thread.
   */
  function sendMessage(conversationId, senderId, senderRole, messageText, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var s = _status() ? _status().STATUSES : {};
    var msgDoc = {
      conversationId: conversationId,
      senderId: senderId,
      senderRole: senderRole,
      message: messageText || '',
      attachments: [],
      status: s.UNREAD || 'unread',
      createdAt: new Date().toISOString()
    };

    return bridge.create('messages', msgDoc)
      .then(function (newMsg) {
        // Log interaction for future safety audit
        var log = {
          conversationId: conversationId,
          senderId: senderId,
          senderRole: senderRole,
          timestamp: new Date().toISOString()
        };
        bridge.create('communicationLogs', log);

        // Touch parent conversation updatedAt
        return bridge.update('conversations', conversationId, {
          updatedAt: new Date().toISOString(),
          lastMessageSnippet: String(messageText).substring(0, 60)
        }).then(function () {
          return newMsg;
        });
      });
  }

  /**
   * Fetches conversation messages.
   */
  function fetchMessages(conversationId, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    return bridge.list('messages', {
      where: [{ field: 'conversationId', operator: '==', value: conversationId }]
    })
    .then(function (msgs) {
      return msgs.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    });
  }

  window.FurnostylesMessagingService = {
    startConversation: startConversation,
    sendMessage: sendMessage,
    fetchMessages: fetchMessages
  };

}());
