/**
 * Furnostyles Inquiry Admin UI
 * Admin-side rendering: inquiry table, filters, action buttons.
 * Loads real data from Firestore via FurnostylesInquiryService.
 * Falls back to placeholder data when bridge is in LOCAL mode.
 */

(function () {
  'use strict';

  /**
   * Placeholder inquiry data for shell display
   */
  var PLACEHOLDER_INQUIRIES = [
    {
      id: 'INQ-001',
      inquiryType: 'quote_request',
      fullName: 'James Mwangi',
      email: 'james@example.com',
      phone: '0712345678',
      location: 'Kasarani, Nairobi',
      message: 'I need a quote for home furnishing project.',
      relatedCategory: 'furniture',
      relatedPage: 'contact.html',
      status: 'new',
      source: 'web_form',
      createdAt: '2025-01-15T08:30:00.000Z'
    },
    {
      id: 'INQ-002',
      inquiryType: 'repair_request',
      fullName: 'Grace Njoroge',
      email: 'grace@example.com',
      phone: '0723456789',
      location: 'Westlands, Nairobi',
      message: 'Electrical fault and socket replacement needed.',
      relatedCategory: 'repairs',
      relatedPage: 'repairs.html',
      status: 'contacted',
      source: 'web_form',
      createdAt: '2025-01-14T10:15:00.000Z'
    },
    {
      id: 'INQ-003',
      inquiryType: 'sourcing_request',
      fullName: 'David Kamau',
      email: 'david@example.com',
      phone: '0734567890',
      location: 'Karen, Nairobi',
      message: 'Looking to source premium outdoor furniture from Asia.',
      relatedCategory: 'sourcing',
      relatedPage: 'sourcing-marketplace.html',
      status: 'in_progress',
      source: 'web_form',
      createdAt: '2025-01-13T14:00:00.000Z'
    },
    {
      id: 'INQ-004',
      inquiryType: 'property_inquiry',
      fullName: 'Mary Otieno',
      email: 'mary@example.com',
      phone: '0745678901',
      location: 'Runda, Nairobi',
      message: 'Interested in Airbnb setup and staging services.',
      relatedCategory: 'real_estate',
      relatedPage: 'realestate-marketplace.html',
      status: 'assigned',
      source: 'web_form',
      createdAt: '2025-01-12T09:45:00.000Z'
    },
    {
      id: 'INQ-005',
      inquiryType: 'service_consultation',
      fullName: 'Peter Kimani',
      email: 'peter@example.com',
      phone: '0756789012',
      location: 'Kilimani, Nairobi',
      message: 'Need interior design consultation for new office.',
      relatedCategory: 'services',
      relatedPage: 'services.html',
      status: 'completed',
      source: 'web_form',
      createdAt: '2025-01-11T11:30:00.000Z'
    },
    {
      id: 'INQ-006',
      inquiryType: 'vendor_partnership',
      fullName: 'Sarah Wanjiku',
      email: 'sarah@example.com',
      phone: '0767890123',
      location: 'Industrial Area, Nairobi',
      message: 'We are a furniture manufacturer interested in partnership.',
      relatedCategory: 'partnership',
      relatedPage: 'contact.html',
      status: 'new',
      source: 'web_form',
      createdAt: '2025-01-10T16:00:00.000Z'
    }
  ];

  /**
   * Format date for display — handles both ISO strings and Firestore Timestamps
   */
  function formatDate(value) {
    if (!value) return '—';
    try {
      var d;
      if (value && typeof value === 'object' && typeof value.toDate === 'function') {
        d = value.toDate();
      } else if (value && typeof value === 'object' && value.seconds) {
        d = new Date(value.seconds * 1000);
      } else {
        d = new Date(value);
      }
      if (isNaN(d.getTime())) return String(value);
      return d.toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return String(value) || '—';
    }
  }

  /**
   * Render inquiry filter bar
   */
  function renderFilterBar(container, options) {
    options = options || {};
    var onFilter = options.onFilter || function () {};

    var statuses = window.FurnostylesInquiryStatus ?
      window.FurnostylesInquiryStatus.getAllStatuses() : [];
    var types = window.FurnostylesInquiryStatus ?
      window.FurnostylesInquiryStatus.getAllInquiryTypes() : [];
    var pages = window.FurnostylesInquiryStatus ?
      window.FurnostylesInquiryStatus.getAllSourcePages() : [];

    var statusOptions = statuses.map(function (s) {
      return '<option value="' + s.value + '">' + s.label + '</option>';
    }).join('');

    var typeOptions = types.map(function (t) {
      return '<option value="' + t.value + '">' + t.label + '</option>';
    }).join('');

    var pageOptions = pages.map(function (p) {
      return '<option value="' + p.value + '">' + p.label + '</option>';
    }).join('');

    container.innerHTML = '\
      <div class="fns-inquiry-filter-bar">\
        <div class="fns-filter-group">\
          <label class="fns-filter-label" for="filterType">Inquiry Type</label>\
          <select id="filterType" class="fns-filter-select">\
            <option value="">All Types</option>' + typeOptions + '\
          </select>\
        </div>\
        <div class="fns-filter-group">\
          <label class="fns-filter-label" for="filterStatus">Status</label>\
          <select id="filterStatus" class="fns-filter-select">\
            <option value="">All Statuses</option>' + statusOptions + '\
          </select>\
        </div>\
        <div class="fns-filter-group">\
          <label class="fns-filter-label" for="filterPage">Source Page</label>\
          <select id="filterPage" class="fns-filter-select">\
            <option value="">All Pages</option>' + pageOptions + '\
          </select>\
        </div>\
        <div class="fns-filter-group">\
          <label class="fns-filter-label" for="filterDate">Date From</label>\
          <input type="date" id="filterDate" class="fns-filter-input">\
        </div>\
        <div class="fns-filter-actions">\
          <button id="applyFiltersBtn" class="btn primary fns-filter-btn">Apply Filters</button>\
          <button id="clearFiltersBtn" class="btn secondary fns-filter-btn">Clear</button>\
        </div>\
      </div>\
    ';

    var applyBtn = container.querySelector('#applyFiltersBtn');
    var clearBtn = container.querySelector('#clearFiltersBtn');

    if (applyBtn) {
      applyBtn.addEventListener('click', function () {
        var filters = {
          type: container.querySelector('#filterType').value,
          status: container.querySelector('#filterStatus').value,
          page: container.querySelector('#filterPage').value,
          dateFrom: container.querySelector('#filterDate').value
        };
        onFilter(filters);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        container.querySelector('#filterType').value = '';
        container.querySelector('#filterStatus').value = '';
        container.querySelector('#filterPage').value = '';
        container.querySelector('#filterDate').value = '';
        onFilter({});
      });
    }
  }

  /**
   * Load inquiries from Firestore via service
   * Falls back to placeholder data if service/bridge unavailable
   */
  function loadInquiries(options) {
    options = options || {};
    var onSuccess = options.onSuccess || function () {};
    var onError = options.onError || function () {};
    var onLoading = options.onLoading || function () {};

    onLoading();

    if (!window.FurnostylesInquiryService) {
      console.warn('[InquiryAdminUI] Service not available, using placeholder data.');
      onSuccess(PLACEHOLDER_INQUIRIES);
      return;
    }

    window.FurnostylesInquiryService.getAllInquiries({ limit: 100 })
      .then(function (result) {
        var inquiries = result.inquiries || [];
        if (inquiries.length === 0 && options.usePlaceholderWhenEmpty) {
          onSuccess(PLACEHOLDER_INQUIRIES);
        } else {
          onSuccess(inquiries);
        }
      })
      .catch(function (error) {
        console.error('[InquiryAdminUI] Load error:', error);
        onError(error);
      });
  }

  /**
   * Update inquiry status via service and re-render badge in table row
   */
  function updateInquiryStatusLive(inquiryId, newStatus, onDone) {
    if (!window.FurnostylesInquiryService) {
      showActionToast('Service not available.');
      return;
    }

    window.FurnostylesInquiryService.updateInquiryStatus(inquiryId, newStatus)
      .then(function () {
        var label = window.FurnostylesInquiryStatus ?
          window.FurnostylesInquiryStatus.getAdminStatusLabel(newStatus) : newStatus;
        showActionToast('Status updated to: ' + label);
        if (typeof onDone === 'function') onDone();
      })
      .catch(function (error) {
        console.error('[InquiryAdminUI] Status update error:', error);
        showActionToast('Update failed: ' + (error.message || 'Unknown error'));
      });
  }

  /**
   * Render status badge HTML
   */
  function renderStatusBadge(status) {
    var label = window.FurnostylesInquiryStatus ?
      window.FurnostylesInquiryStatus.getAdminStatusLabel(status) : status;
    var cssClass = window.FurnostylesInquiryStatus ?
      window.FurnostylesInquiryStatus.getAdminStatusClass(status) : '';
    return '<span class="fns-admin-status-badge ' + cssClass + '">' + label + '</span>';
  }

  /**
   * Render inquiry type badge HTML
   */
  function renderTypeBadge(type) {
    var label = window.FurnostylesInquiryStatus ?
      window.FurnostylesInquiryStatus.getInquiryTypeLabel(type) : type;
    var cssClass = window.FurnostylesInquiryStatus ?
      window.FurnostylesInquiryStatus.getInquiryTypeClass(type) : '';
    return '<span class="fns-admin-type-badge ' + cssClass + '">' + label + '</span>';
  }

  /**
   * Render row action buttons
   */
  function renderRowActions(inquiry) {
    var isTerminal = window.FurnostylesInquiryStatus ?
      window.FurnostylesInquiryStatus.isTerminalStatus(inquiry.status) : false;

    var actions = '\
      <div class="fns-inquiry-row-actions">\
        <button class="fns-row-action-btn view-btn" data-id="' + inquiry.id + '" title="View Details">👁 View</button>';

    if (!isTerminal) {
      actions += '\
        <button class="fns-row-action-btn contact-btn" data-id="' + inquiry.id + '" title="Mark Contacted">📞 Contacted</button>\
        <button class="fns-row-action-btn assign-btn" data-id="' + inquiry.id + '" title="Assign">🔀 Assign</button>\
        <button class="fns-row-action-btn escalate-btn" data-id="' + inquiry.id + '" title="Escalate">⬆ Escalate</button>';
    }

    actions += '</div>';
    return actions;
  }

  /**
   * Render inquiry admin table
   */
  function renderInquiryTable(container, inquiries, options) {
    options = options || {};
    var data = inquiries || PLACEHOLDER_INQUIRIES;

    if (data.length === 0) {
      container.innerHTML = '\
        <div class="fns-empty-state">\
          <div class="fns-empty-icon">📭</div>\
          <div class="fns-empty-title">No inquiries found</div>\
          <div class="fns-empty-message">No inquiries match your current filters.</div>\
        </div>';
      return;
    }

    var rows = data.map(function (inq) {
      return '\
        <tr class="fns-inquiry-row" data-id="' + inq.id + '">\
          <td class="fns-td fns-td-id"><code>' + inq.id + '</code></td>\
          <td class="fns-td">' + renderTypeBadge(inq.inquiryType) + '</td>\
          <td class="fns-td fns-td-name">\
            <div class="fns-td-primary">' + inq.fullName + '</div>\
            <div class="fns-td-secondary">' + inq.email + '</div>\
          </td>\
          <td class="fns-td fns-td-phone">' + inq.phone + '</td>\
          <td class="fns-td fns-td-location">' + inq.location + '</td>\
          <td class="fns-td fns-td-page">' + (inq.relatedPage || '—') + '</td>\
          <td class="fns-td">' + renderStatusBadge(inq.status) + '</td>\
          <td class="fns-td fns-td-date">' + formatDate(inq.createdAt) + '</td>\
          <td class="fns-td fns-td-actions">' + renderRowActions(inq) + '</td>\
        </tr>';
    }).join('');

    container.innerHTML = '\
      <div class="fns-inquiry-table-wrap">\
        <table class="fns-inquiry-table">\
          <thead>\
            <tr>\
              <th class="fns-th">ID</th>\
              <th class="fns-th">Type</th>\
              <th class="fns-th">Contact</th>\
              <th class="fns-th">Phone</th>\
              <th class="fns-th">Location</th>\
              <th class="fns-th">Source Page</th>\
              <th class="fns-th">Status</th>\
              <th class="fns-th">Date</th>\
              <th class="fns-th">Actions</th>\
            </tr>\
          </thead>\
          <tbody id="inquiryTableBody">' + rows + '</tbody>\
        </table>\
      </div>\
    ';

    attachTableHandlers(container, data, options);
  }

  /**
   * Attach click handlers to table action buttons
   */
  function attachTableHandlers(container, data, options) {
    options = options || {};

    container.querySelectorAll('.view-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        var inquiry = null;
        for (var i = 0; i < data.length; i++) {
          if (data[i].id === id) { inquiry = data[i]; break; }
        }
        if (options.onView) {
          options.onView(inquiry);
        } else {
          showInquiryDetail(inquiry);
        }
      });
    });

    container.querySelectorAll('.contact-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        var inquiry = null;
        for (var i = 0; i < data.length; i++) {
          if (data[i].id === id) { inquiry = data[i]; break; }
        }
        if (options.onContact) {
          options.onContact(inquiry, id);
        } else {
          updateInquiryStatusLive(id, 'contacted', options.onStatusUpdated);
        }
      });
    });

    container.querySelectorAll('.assign-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        if (options.onAssign) {
          options.onAssign(id);
        } else {
          showActionToast('Assign — coming in next phase.');
        }
      });
    });

    container.querySelectorAll('.escalate-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        if (options.onEscalate) {
          options.onEscalate(id);
        } else {
          showActionToast('Escalate — coming in next phase.');
        }
      });
    });
  }

  /**
   * Show inquiry detail modal (placeholder shell)
   */
  function showInquiryDetail(inquiry) {
    if (!inquiry) return;

    var existing = document.getElementById('fnsInquiryDetailModal');
    if (existing) existing.remove();

    var statusBadge = renderStatusBadge(inquiry.status);
    var typeBadge = renderTypeBadge(inquiry.inquiryType);

    var modal = document.createElement('div');
    modal.id = 'fnsInquiryDetailModal';
    modal.className = 'fns-modal-overlay';
    modal.innerHTML = '\
      <div class="fns-modal">\
        <div class="fns-modal-header">\
          <h3 class="fns-modal-title">Inquiry Details &mdash; ' + inquiry.id + '</h3>\
          <button class="fns-modal-close" id="closeInquiryModal">&times;</button>\
        </div>\
        <div class="fns-modal-body">\
          <div class="fns-detail-row">\
            <span class="fns-detail-label">Type</span>\
            <span class="fns-detail-value">' + typeBadge + '</span>\
          </div>\
          <div class="fns-detail-row">\
            <span class="fns-detail-label">Status</span>\
            <span class="fns-detail-value">' + statusBadge + '</span>\
          </div>\
          <div class="fns-detail-row">\
            <span class="fns-detail-label">Full Name</span>\
            <span class="fns-detail-value">' + inquiry.fullName + '</span>\
          </div>\
          <div class="fns-detail-row">\
            <span class="fns-detail-label">Email</span>\
            <span class="fns-detail-value">' + inquiry.email + '</span>\
          </div>\
          <div class="fns-detail-row">\
            <span class="fns-detail-label">Phone</span>\
            <span class="fns-detail-value">' + inquiry.phone + '</span>\
          </div>\
          <div class="fns-detail-row">\
            <span class="fns-detail-label">Location</span>\
            <span class="fns-detail-value">' + inquiry.location + '</span>\
          </div>\
          <div class="fns-detail-row">\
            <span class="fns-detail-label">Source Page</span>\
            <span class="fns-detail-value">' + (inquiry.relatedPage || '—') + '</span>\
          </div>\
          <div class="fns-detail-row">\
            <span class="fns-detail-label">Related Category</span>\
            <span class="fns-detail-value">' + (inquiry.relatedCategory || '—') + '</span>\
          </div>\
          <div class="fns-detail-row">\
            <span class="fns-detail-label">Date Submitted</span>\
            <span class="fns-detail-value">' + formatDate(inquiry.createdAt) + '</span>\
          </div>\
          <div class="fns-detail-row fns-detail-message">\
            <span class="fns-detail-label">Message</span>\
            <span class="fns-detail-value">' + inquiry.message + '</span>\
          </div>\
        </div>\
        <div class="fns-modal-footer">\
          <p class="fns-modal-note">Assign, contact, and escalate actions coming in next phase.</p>\
          <button class="btn secondary" id="closeInquiryModalFooter">Close</button>\
        </div>\
      </div>\
    ';

    document.body.appendChild(modal);

    document.getElementById('closeInquiryModal').addEventListener('click', function () {
      modal.remove();
    });
    document.getElementById('closeInquiryModalFooter').addEventListener('click', function () {
      modal.remove();
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.remove();
    });
  }

  /**
   * Show simple toast notification
   */
  function showActionToast(message) {
    var existing = document.getElementById('fnsActionToast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'fnsActionToast';
    toast.className = 'fns-action-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function () {
      toast.classList.add('fns-toast-visible');
    }, 10);

    setTimeout(function () {
      toast.classList.remove('fns-toast-visible');
      setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
  }

  /**
   * Render summary metrics for inquiry dashboard
   */
  function renderInquirySummary(container, inquiries) {
    var data = inquiries || PLACEHOLDER_INQUIRIES;

    var counts = {
      total: data.length,
      new: 0,
      contacted: 0,
      in_progress: 0,
      assigned: 0,
      completed: 0,
      closed: 0
    };

    data.forEach(function (inq) {
      if (counts.hasOwnProperty(inq.status)) {
        counts[inq.status]++;
      }
    });

    container.innerHTML = '\
      <div class="fns-metrics-grid">\
        <div><div class="fns-metric-card"><div class="fns-metric-icon">📋</div><div class="fns-metric-content"><div class="fns-metric-label">Total Inquiries</div><div class="fns-metric-value">' + counts.total + '</div></div></div></div>\
        <div><div class="fns-metric-card"><div class="fns-metric-icon">🆕</div><div class="fns-metric-content"><div class="fns-metric-label">New</div><div class="fns-metric-value">' + counts.new + '</div></div></div></div>\
        <div><div class="fns-metric-card"><div class="fns-metric-icon">📞</div><div class="fns-metric-content"><div class="fns-metric-label">Contacted</div><div class="fns-metric-value">' + counts.contacted + '</div></div></div></div>\
        <div><div class="fns-metric-card"><div class="fns-metric-icon">🔄</div><div class="fns-metric-content"><div class="fns-metric-label">In Progress</div><div class="fns-metric-value">' + counts.in_progress + '</div></div></div></div>\
        <div><div class="fns-metric-card"><div class="fns-metric-icon">🔀</div><div class="fns-metric-content"><div class="fns-metric-label">Assigned</div><div class="fns-metric-value">' + counts.assigned + '</div></div></div></div>\
        <div><div class="fns-metric-card"><div class="fns-metric-icon">✅</div><div class="fns-metric-content"><div class="fns-metric-label">Completed</div><div class="fns-metric-value">' + counts.completed + '</div></div></div></div>\
      </div>\
    ';
  }

  /**
   * Get placeholder inquiries (for LOCAL mode / demo)
   */
  function getPlaceholderInquiries() {
    return PLACEHOLDER_INQUIRIES;
  }

  /**
   * Filter inquiry array by filter object (client-side)
   */
  function filterInquiries(inquiries, filters) {
    return inquiries.filter(function (inq) {
      if (filters.type && inq.inquiryType !== filters.type) return false;
      if (filters.status && inq.status !== filters.status) return false;
      if (filters.page && inq.relatedPage !== filters.page) return false;
      if (filters.dateFrom) {
        var from = new Date(filters.dateFrom);
        var createdVal = inq.createdAt;
        var created;
        if (createdVal && typeof createdVal === 'object' && createdVal.seconds) {
          created = new Date(createdVal.seconds * 1000);
        } else {
          created = new Date(createdVal);
        }
        if (created < from) return false;
      }
      return true;
    });
  }

  /**
   * Export admin UI API
   */
  window.FurnostylesInquiryAdminUI = {
    renderFilterBar: renderFilterBar,
    renderInquiryTable: renderInquiryTable,
    renderInquirySummary: renderInquirySummary,
    renderStatusBadge: renderStatusBadge,
    renderTypeBadge: renderTypeBadge,
    showInquiryDetail: showInquiryDetail,
    showActionToast: showActionToast,
    getPlaceholderInquiries: getPlaceholderInquiries,
    filterInquiries: filterInquiries,
    loadInquiries: loadInquiries,
    updateInquiryStatusLive: updateInquiryStatusLive
  };

}());
