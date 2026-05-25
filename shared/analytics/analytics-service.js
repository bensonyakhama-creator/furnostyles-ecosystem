/**
 * Furnostyles Analytics Service
 * Core service to log activity snapshots, pull calculated metrics, and save insights.
 */

(function () {
  'use strict';

  /**
   * Logs a generic tracking event in the analytics collection.
   */
  function logEvent(type, value, category, source, meta, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var doc = {
      metricType: type || 'view',
      metricValue: value || 1,
      category: category || 'marketplace',
      source: source || 'public',
      meta: meta || {},
      createdAt: new Date().toISOString()
    };

    return bridge.create('analytics', doc);
  }

  /**
   * Aggregates events into specific type statistics.
   */
  function getAggregatedMetrics(type, category, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var whereClauses = [];
    if (type) whereClauses.push({ field: 'metricType', operator: '==', value: type });
    if (category) whereClauses.push({ field: 'category', operator: '==', value: category });

    return bridge.list('analytics', { where: whereClauses })
      .then(function (list) {
        var total = 0;
        list.forEach(function (item) {
          total += Number(item.metricValue || 0);
        });
        return {
          count: list.length,
          sum: total,
          items: list
        };
      });
  }

  window.FurnostylesAnalyticsService = {
    logEvent: logEvent,
    getAggregatedMetrics: getAggregatedMetrics
  };

}());
