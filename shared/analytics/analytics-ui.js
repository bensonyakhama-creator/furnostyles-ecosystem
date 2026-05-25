/**
 * Furnostyles Analytics UI Helper
 * Dynamic widgets to render progress trends, high-level metrics cards, and actionable platform insight rows.
 */

(function () {
  'use strict';

  function _esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderMetricCard(title, value, trend, trendDir, timeframe) {
    var icon = trendDir === 'up' ? '▲' : (trendDir === 'down' ? '▼' : '■');
    var trendClass = trendDir === 'up' ? 'up' : (trendDir === 'down' ? 'down' : 'flat');

    return '<div class="an-card">' +
      '<div class="an-title">' + _esc(title) + ' <span class="an-trend ' + trendClass + '">' + icon + ' ' + _esc(trend) + '</span></div>' +
      '<div class="an-value">' + _esc(value) + '</div>' +
      '<div class="an-meta-row">' +
        '<span class="an-timeframe">Timeframe: ' + _esc(timeframe || '7 days') + '</span>' +
      '</div>' +
    '</div>';
  }

  function renderInsightRow(ins) {
    var sevColor = ins.severity === 'high' ? '#ef4444' : (ins.severity === 'medium' ? '#f59e0b' : '#3b82f6');
    var icon = ins.severity === 'high' ? '⚠️' : '💡';

    return '<div style="padding:16px;border:1.5px solid #dce4f0;border-radius:10px;margin-bottom:12px;background:#fafbfd;border-left:4px solid ' + sevColor + ';">' +
      '<div style="font-size:11px;font-weight:700;color:' + sevColor + ';text-transform:uppercase;margin-bottom:4px;">' + icon + ' ' + _esc(ins.type) + '</div>' +
      '<div style="font-size:13px;font-weight:700;color:#1a2540;margin-bottom:6px;">' + _esc(ins.message) + '</div>' +
      '<div style="font-size:12px;color:#4c5e80;"><strong>Action Required:</strong> ' + _esc(ins.suggestedAction) + '</div>' +
    '</div>';
  }

  window.FurnostylesAnalyticsUI = {
    renderMetricCard: renderMetricCard,
    renderInsightRow: renderInsightRow
  };

}());
