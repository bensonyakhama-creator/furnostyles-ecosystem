/**
 * Furnostyles Assignment UI Helper
 * Renders shared widgets such as escalation submission models or state indicator badges.
 */

(function () {
  'use strict';

  function _status() { return window.FurnostylesAssignmentStatus; }
  function _esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function renderStatusBadge(status) {
    var s = _status();
    var color = s ? s.getBadgeColor(status) : '#8090a0';
    return '<span style="display:inline-block;padding:4px 10px;font-size:10px;font-weight:700;' +
      'text-transform:uppercase;border-radius:12px;background:' + color + '15;color:' + color + ';' +
      'border:1px solid ' + color + '30;">' + _esc(status) + '</span>';
  }

  window.FurnostylesAssignmentUIHelper = {
    renderStatusBadge: renderStatusBadge
  };

}());
