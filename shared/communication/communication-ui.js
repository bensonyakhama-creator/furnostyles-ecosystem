/**
 * Furnostyles Communication UI Helpers
 * Renders beautiful components like notification cards and conversational message logs.
 */

(function () {
  'use strict';

  function _esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderNotificationCard(n) {
    var icons = {
      system: '\u2699\uFE0F',
      assignment: '\uD83D\uDCCB',
      moderation: '\uD83D\uDEE1\uFE0F',
      service: '\uD83D\uDD27',
      escalation: '\u26A0\uFE0F',
      verification: '\u2705'
    };

    var dateStr = n.createdAt ? n.createdAt.substring(0, 10) + ' ' + n.createdAt.substring(11, 16) : '';
    var isUnread = n.status === 'unread' ? ' unread' : '';

    return '<div class="comm-noti-card' + isUnread + '">' +
      '<div class="comm-noti-icon">' + (icons[n.notificationType] || '🔔') + '</div>' +
      '<div class="comm-noti-body">' +
        '<h3 class="comm-noti-title">' + _esc(n.title) + '</h3>' +
        '<p class="comm-noti-text">' + _esc(n.message) + '</p>' +
        '<span class="comm-noti-time">' + dateStr + '</span>' +
      '</div>' +
    '</div>';
  }

  function renderMessageBubble(m, activeUserId) {
    var isMe = m.senderId === activeUserId;
    var side = isMe ? 'sent' : 'received';
    var timeStr = m.createdAt ? m.createdAt.substring(11, 16) : '';

    return '<div class="comm-bubble-row ' + side + '">' +
      '<div class="comm-bubble">' +
        '<strong>' + _esc(m.senderRole.toUpperCase()) + '</strong>' +
        '<div style="margin-top:4px;">' + _esc(m.message) + '</div>' +
        '<div class="comm-bubble-meta">' + timeStr + '</div>' +
      '</div>' +
    '</div>';
  }

  window.FurnostylesCommunicationUI = {
    renderNotificationCard: renderNotificationCard,
    renderMessageBubble: renderMessageBubble
  };

}());
