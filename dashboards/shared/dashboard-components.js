/**
 * FURNOSTYLES — DASHBOARD COMPONENTS
 * =================================
 * File: dashboards/shared/dashboard-components.js
 *
 * PURPOSE:
 *   Reusable dashboard UI components for all role dashboards.
 *   Provides consistent UI across client, vendor, provider, contractor, property-owner, agent, admin dashboards.
 *
 * COMPONENTS:
 *   - Metric Card
 *   - Inquiry List
 *   - Notification Area
 *   - Quick Action Buttons
 *   - Empty State
 *   - Loading State
 *   - Error State
 *
 * USAGE:
 *   window.FurnostylesDashboardComponents.renderMetricCard(container, data)
 *   window.FurnostylesDashboardComponents.renderInquiryList(container, data)
 *   window.FurnostylesDashboardComponents.renderNotificationArea(container, data)
 */

(function () {
  'use strict';

  /**
   * Render metric card
   * @param {HTMLElement} container - Container element
   * @param {object} data - Metric data { label, value, icon, trend }
   */
  function renderMetricCard(container, data) {
    if (!container) return;

    var icon = data.icon || '📊';
    var trend = data.trend || '';
    var trendClass = data.trendClass || '';

    container.innerHTML = `
      <div class="fns-metric-card">
        <div class="fns-metric-icon">${icon}</div>
        <div class="fns-metric-content">
          <div class="fns-metric-label">${data.label}</div>
          <div class="fns-metric-value">${data.value}</div>
          ${trend ? `<div class="fns-metric-trend ${trendClass}">${trend}</div>` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Render inquiry list
   * @param {HTMLElement} container - Container element
   * @param {Array} data - Array of inquiry objects
   */
  function renderInquiryList(container, data) {
    if (!container) return;

    if (!data || data.length === 0) {
      renderEmptyState(container, {
        title: 'No inquiries yet',
        message: 'Your inquiries will appear here.'
      });
      return;
    }

    var itemsHtml = data.map(function (item) {
      var statusClass = getStatusClass(item.status);
      return `
        <div class="fns-inquiry-item">
          <div class="fns-inquiry-type">${item.type}</div>
          <div class="fns-inquiry-title">${item.title}</div>
          <div class="fns-inquiry-meta">
            <span class="fns-inquiry-status ${statusClass}">${item.status}</span>
            <span class="fns-inquiry-date">${item.date}</span>
          </div>
          ${item.vendor ? `<div class="fns-inquiry-vendor">${item.vendor}</div>` : ''}
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="fns-inquiry-list">
        ${itemsHtml}
      </div>
    `;
  }

  /**
   * Render notification area
   * @param {HTMLElement} container - Container element
   * @param {Array} data - Array of notification objects
   */
  function renderNotificationArea(container, data) {
    if (!container) return;

    if (!data || data.length === 0) {
      container.innerHTML = `
        <div class="fns-notification-area">
          <div class="fns-notification-empty">No new notifications</div>
        </div>
      `;
      return;
    }

    var itemsHtml = data.map(function (item) {
      return `
        <div class="fns-notification-item ${item.read ? 'read' : 'unread'}">
          <div class="fns-notification-icon">${item.icon || '🔔'}</div>
          <div class="fns-notification-content">
            <div class="fns-notification-title">${item.title}</div>
            <div class="fns-notification-message">${item.message}</div>
            <div class="fns-notification-time">${item.time}</div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="fns-notification-area">
        ${itemsHtml}
      </div>
    `;
  }

  /**
   * Render quick action buttons
   * @param {HTMLElement} container - Container element
   * @param {Array} data - Array of action objects { label, icon, onClick }
   */
  function renderQuickActions(container, data) {
    if (!container) return;

    var buttonsHtml = data.map(function (action, index) {
      return `
        <button class="fns-quick-action-btn" data-action-index="${index}">
          <span class="fns-quick-action-icon">${action.icon || '▶'}</span>
          <span class="fns-quick-action-label">${action.label}</span>
        </button>
      `;
    }).join('');

    container.innerHTML = `
      <div class="fns-quick-actions">
        ${buttonsHtml}
      </div>
    `;

    /* Attach click handlers */
    var buttons = container.querySelectorAll('.fns-quick-action-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var index = parseInt(btn.getAttribute('data-action-index'), 10);
        if (data[index] && data[index].onClick) {
          data[index].onClick();
        }
      });
    });
  }

  /**
   * Render empty state
   * @param {HTMLElement} container - Container element
   * @param {object} data - Empty state data { title, message, icon }
   */
  function renderEmptyState(container, data) {
    if (!container) return;

    var icon = data.icon || '📭';
    var title = data.title || 'No data';
    var message = data.message || '';

    container.innerHTML = `
      <div class="fns-empty-state">
        <div class="fns-empty-icon">${icon}</div>
        <div class="fns-empty-title">${title}</div>
        ${message ? `<div class="fns-empty-message">${message}</div>` : ''}
      </div>
    `;
  }

  /**
   * Render loading state
   * @param {HTMLElement} container - Container element
   * @param {string} message - Loading message
   */
  function renderLoadingState(container, message) {
    if (!container) return;

    container.innerHTML = `
      <div class="fns-loading-state">
        <div class="fns-loading-spinner"></div>
        <div class="fns-loading-message">${message || 'Loading...'}</div>
      </div>
    `;
  }

  /**
   * Render error state
   * @param {HTMLElement} container - Container element
   * @param {object} data - Error data { title, message, retryAction }
   */
  function renderErrorState(container, data) {
    if (!container) return;

    var title = data.title || 'Error';
    var message = data.message || 'Something went wrong.';
    var retryAction = data.retryAction || null;

    container.innerHTML = `
      <div class="fns-error-state">
        <div class="fns-error-icon">⚠️</div>
        <div class="fns-error-title">${title}</div>
        <div class="fns-error-message">${message}</div>
        ${retryAction ? `<button class="fns-error-retry-btn">Retry</button>` : ''}
      </div>
    `;

    if (retryAction) {
      var retryBtn = container.querySelector('.fns-error-retry-btn');
      retryBtn.addEventListener('click', retryAction);
    }
  }

  /**
   * Get status class for inquiry status
   */
  function getStatusClass(status) {
    var statusMap = {
      'pending': 'status-pending',
      'in-progress': 'status-in-progress',
      'in_progress': 'status-in-progress',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled',
      'new': 'status-new',
      'contacted': 'status-contacted',
      'assigned': 'status-assigned',
      'closed': 'status-closed'
    };
    return statusMap[status] || 'status-unknown';
  }

  /**
   * Render admin inquiry table via shared inquiry-admin-ui module
   * @param {HTMLElement} container - Container element
   * @param {Array} inquiries - Inquiry data array (optional, uses placeholder)
   * @param {object} options - Options { onView, onContact, onAssign, onEscalate }
   */
  function renderInquiryAdminTable(container, inquiries, options) {
    if (!container) return;
    if (window.FurnostylesInquiryAdminUI) {
      window.FurnostylesInquiryAdminUI.renderInquiryTable(container, inquiries, options);
    } else {
      renderEmptyState(container, {
        title: 'Inquiry module not loaded',
        message: 'Ensure inquiry-admin-ui.js is loaded.',
        icon: '⚠️'
      });
    }
  }

  /**
   * Render admin inquiry filter bar via shared inquiry-admin-ui module
   * @param {HTMLElement} container - Container element
   * @param {object} options - Options { onFilter }
   */
  function renderInquiryAdminFilters(container, options) {
    if (!container) return;
    if (window.FurnostylesInquiryAdminUI) {
      window.FurnostylesInquiryAdminUI.renderFilterBar(container, options);
    }
  }

  /**
   * Render inquiry summary metrics via shared inquiry-admin-ui module
   * @param {HTMLElement} container - Container element
   * @param {Array} inquiries - Inquiry data array (optional, uses placeholder)
   */
  function renderInquirySummaryMetrics(container, inquiries) {
    if (!container) return;
    if (window.FurnostylesInquiryAdminUI) {
      window.FurnostylesInquiryAdminUI.renderInquirySummary(container, inquiries);
    }
  }

  /**
   * Export dashboard components API
   */
  window.FurnostylesDashboardComponents = {
    renderMetricCard: renderMetricCard,
    renderInquiryList: renderInquiryList,
    renderNotificationArea: renderNotificationArea,
    renderQuickActions: renderQuickActions,
    renderEmptyState: renderEmptyState,
    renderLoadingState: renderLoadingState,
    renderErrorState: renderErrorState,
    renderInquiryAdminTable: renderInquiryAdminTable,
    renderInquiryAdminFilters: renderInquiryAdminFilters,
    renderInquirySummaryMetrics: renderInquirySummaryMetrics
  };

}());
