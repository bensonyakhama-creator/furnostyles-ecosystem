/**
 * FURNOSTYLES — DASHBOARD COMPONENTS STRATEGY
 * ============================================
 * File: dashboards/shared/dashboard-components-strategy.js
 * Purpose: Centralized dashboard component strategy for cards, charts, metrics,
 *          activity feeds, notifications, inquiry lists, and management tables.
 */

(function () {
  'use strict';

  /**
   * CARD COMPONENT STRATEGY
   * Centralized card component strategy
   */
  var CardComponentStrategy = {
    types: ['stat', 'list', 'chart', 'table', 'activity', 'notification'],
    variants: ['primary', 'secondary', 'success', 'warning', 'danger'],
    sizes: ['small', 'medium', 'large', 'full'],
    structure: {
      container: 'div.fns-card',
      header: 'div.fns-card-header',
      title: 'h3.fns-card-title',
      body: 'div.fns-card-body',
      footer: 'div.fns-card-footer'
    },
    actions: ['view', 'edit', 'delete', 'refresh']
  };

  /**
   * CHART COMPONENT STRATEGY
   * Centralized chart component strategy
   */
  var ChartComponentStrategy = {
    types: ['line', 'bar', 'pie', 'area', 'radar', 'gauge'],
    timeRanges: ['day', 'week', 'month', 'quarter', 'year'],
    structure: {
      container: 'div.fns-chart',
      canvas: 'canvas.fns-chart-canvas',
      legend: 'div.fns-chart-legend',
      tooltip: 'div.fns-chart-tooltip'
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      showLegend: true,
      showTooltip: true
    }
  };

  /**
   * METRIC COMPONENT STRATEGY
   * Centralized metric component strategy
   */
  var MetricComponentStrategy = {
    types: ['number', 'percentage', 'currency', 'duration'],
    structure: {
      container: 'div.fns-metric',
      value: 'div.fns-metric-value',
      label: 'div.fns-metric-label',
      change: 'div.fns-metric-change',
      trend: 'div.fns-metric-trend'
    },
    trends: ['up', 'down', 'neutral'],
    variants: ['positive', 'negative', 'neutral']
  };

  /**
   * ACTIVITY FEED STRATEGY
   * Centralized activity feed strategy
   */
  var ActivityFeedStrategy = {
    structure: {
      container: 'div.fns-activity-feed',
      list: 'ul.fns-activity-list',
      item: 'li.fns-activity-item',
      icon: 'span.fns-activity-icon',
      content: 'div.fns-activity-content',
      timestamp: 'span.fns-activity-timestamp'
    },
    itemTypes: ['user', 'order', 'inquiry', 'review', 'system'],
    filters: ['type', 'date-range'],
    limit: 20
  };

  /**
   * NOTIFICATION COMPONENT STRATEGY
   * Centralized notification component strategy
   */
  var NotificationComponentStrategy = {
    types: ['info', 'success', 'warning', 'error'],
    structure: {
      container: 'div.fns-notification',
      icon: 'span.fns-notification-icon',
      message: 'div.fns-notification-message',
      actions: 'div.fns-notification-actions',
      close: 'button.fns-notification-close'
    },
    positions: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    duration: 5000
  };

  /**
   * INQUIRY LIST STRATEGY
   * Centralized inquiry list strategy
   */
  var InquiryListStrategy = {
    structure: {
      container: 'div.fns-inquiry-list',
      item: 'div.fns-inquiry-item',
      header: 'div.fns-inquiry-header',
      subject: 'h4.fns-inquiry-subject',
      meta: 'div.fns-inquiry-meta',
      body: 'div.fns-inquiry-body',
      actions: 'div.fns-inquiry-actions'
    },
    statuses: ['pending', 'in-progress', 'responded', 'completed', 'cancelled'],
    priorities: ['low', 'medium', 'high', 'urgent'],
    actions: ['view', 'respond', 'mark-complete', 'cancel']
  };

  /**
   * MANAGEMENT TABLE STRATEGY
   * Centralized management table strategy
   */
  var ManagementTableStrategy = {
    structure: {
      container: 'div.fns-table-container',
      table: 'table.fns-table',
      thead: 'thead.fns-table-head',
      tbody: 'tbody.fns-table-body',
      row: 'tr.fns-table-row',
      cell: 'td.fns-table-cell',
      headerCell: 'th.fns-table-header'
    },
    features: {
      sortable: true,
      filterable: true,
      searchable: true,
      pagination: true,
      selectable: true
    },
    actions: ['view', 'edit', 'delete', 'approve', 'reject']
  };

  window.FurnostylesDashboardComponentsStrategy = {
    CardComponentStrategy: CardComponentStrategy,
    ChartComponentStrategy: ChartComponentStrategy,
    MetricComponentStrategy: MetricComponentStrategy,
    ActivityFeedStrategy: ActivityFeedStrategy,
    NotificationComponentStrategy: NotificationComponentStrategy,
    InquiryListStrategy: InquiryListStrategy,
    ManagementTableStrategy: ManagementTableStrategy
  };

}());
