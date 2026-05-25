/**
 * Furnostyles Moderation UI
 * Renders review cards and wires moderation action buttons.
 *
 * Load order: moderation-status.js → moderation-service.js → moderation-ui.js
 *
 * Usage:
 *   FurnStylesModerationUI.renderLoadingState(container)
 *   FurnStylesModerationUI.renderReviewGrid(container, items, collection, itemType)
 *   FurnStylesModerationUI.renderStats(statsEl, items)
 *   FurnStylesModerationUI.renderErrorState(container, message)
 *
 * itemType: 'listing' | 'property' | 'repair'
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* HELPERS                                                              */
  /* ------------------------------------------------------------------ */

  function _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function _fmt(iso) {
    if (!iso) return '\u2014';
    try {
      return new Date(iso).toLocaleDateString('en-KE', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch (e) { return String(iso); }
  }

  function _price(val) {
    return val ? 'KSh\u00a0' + Number(val).toLocaleString() : '\u2014';
  }

  function _statusStyle(status) {
    var ms = window.FurnStylesModerationStatus;
    return ms ? ms.styleFor(status) : '';
  }

  /* ------------------------------------------------------------------ */
  /* CARD HTML BUILDERS                                                   */
  /* ------------------------------------------------------------------ */

  function _mediaBlock(item, itemType) {
    if (itemType === 'repair') {
      var before = item.beforeImages && item.beforeImages[0] ? item.beforeImages[0] : null;
      var after  = item.afterImages  && item.afterImages[0]  ? item.afterImages[0]  : null;
      var isDataB = before && before.indexOf('data:') === 0;
      var isDataA = after  && after.indexOf('data:')  === 0;
      return '<div class="mdr-repair-thumbs">' +
        (before && !isDataB
          ? '<img class="mdr-repair-thumb" src="' + _esc(before) + '" alt="Before" loading="lazy">'
          : '<div class="mdr-repair-thumb mdr-thumb-placeholder" style="flex:1;">Before</div>') +
        (after && !isDataA
          ? '<img class="mdr-repair-thumb" src="' + _esc(after) + '" alt="After" loading="lazy">'
          : '<div class="mdr-repair-thumb mdr-thumb-placeholder" style="flex:1;">After</div>') +
        '</div>';
    }

    var thumb  = item.images && item.images[0] ? item.images[0] : null;
    var isData = thumb && thumb.indexOf('data:') === 0;
    if (thumb && !isData) {
      return '<img class="mdr-card-img" src="' + _esc(thumb) + '" alt="" loading="lazy">';
    }
    return '<div class="mdr-card-img mdr-thumb-placeholder">\uD83D\uDCF7</div>';
  }

  function _fieldsFor(item, itemType) {
    if (itemType === 'listing') {
      return [
        ['Type',        item.listingType],
        ['Category',    item.category],
        ['Subcategory', item.subcategory],
        ['Condition',   item.condition],
        ['Price',       _price(item.price)],
        ['Location',    item.location],
        ['Vendor ID',   item.vendorId],
        ['Vendor Role', item.vendorRole],
        ['Source',      item.sourcePage]
      ];
    }
    if (itemType === 'property') {
      return [
        ['Prop. Type',  item.propertyType],
        ['Mode',        item.listingMode],
        ['Location',    item.location],
        ['Price/Rent',  _price(item.priceOrRent)],
        ['Period',      item.pricePeriod],
        ['Bedrooms',    item.bedrooms],
        ['Owner ID',    item.vendorId || item.ownerId],
        ['Source',      item.sourcePage]
      ];
    }
    /* repair */
    return [
      ['Repair Type', item.repairType],
      ['Location',    item.location],
      ['Est. Cost',   _price(item.estimatedCost)],
      ['Before imgs', (item.beforeImages ? item.beforeImages.length : 0) + ' image(s)'],
      ['After imgs',  (item.afterImages  ? item.afterImages.length  : 0) + ' image(s)'],
      ['Repair Date', item.repairDate],
      ['Source',      item.sourcePage]
    ];
  }

  function _buildCardHTML(item, collection, itemType) {
    var status  = item.status || 'pending';
    var sc      = _statusStyle(status);
    var title   = item.title || item.repairType || 'Untitled';
    var id      = item.id || '';

    var fieldsHTML = _fieldsFor(item, itemType)
      .filter(function (f) { return f[1]; })
      .map(function (f) {
        return '<div class="mdr-field-row">' +
          '<span class="mdr-field-key">' + _esc(f[0]) + '</span>' +
          '<span class="mdr-field-val">' + _esc(String(f[1])) + '</span>' +
          '</div>';
      }).join('');

    /* Description snippet (listings and properties) */
    var descBlock = '';
    if (item.description) {
      var snippet = String(item.description).substring(0, 100) +
        (item.description.length > 100 ? '\u2026' : '');
      descBlock = '<p style="font-size:12px;color:#8090a0;margin:8px 0 0;line-height:1.5;">' +
        _esc(snippet) + '</p>';
    }

    return '<div class="mdr-review-card" data-id="' + _esc(id) + '" ' +
        'data-collection="' + _esc(collection) + '" ' +
        'data-item-type="' + _esc(itemType) + '">' +
      '<div class="mdr-card-media">' + _mediaBlock(item, itemType) + '</div>' +
      '<div class="mdr-card-info">' +
        '<div class="mdr-card-top">' +
          '<span class="mdr-status-badge" style="' + sc + '">' + _esc(status) + '</span>' +
          '<span class="mdr-card-date">' + _esc(_fmt(item.createdAt)) + '</span>' +
        '</div>' +
        '<h4 class="mdr-card-title">' + _esc(title) + '</h4>' +
        '<div class="mdr-card-fields">' + fieldsHTML + '</div>' +
        descBlock +
      '</div>' +
      '<div class="mdr-card-actions">' +
        '<button type="button" class="mdr-btn mdr-btn-approve" data-action="approve">\u2713 Approve</button>' +
        '<button type="button" class="mdr-btn mdr-btn-reject"  data-action="reject">\u2717 Reject</button>' +
        '<button type="button" class="mdr-btn mdr-btn-hide"    data-action="hide">\uD83D\uDC41 Hide</button>' +
        '<button type="button" class="mdr-btn mdr-btn-flag"    data-action="flag">\u2691 Flag</button>' +
      '</div>' +
      '<div class="mdr-action-feedback"></div>' +
    '</div>';
  }

  /* ------------------------------------------------------------------ */
  /* ACTION WIRING                                                        */
  /* ------------------------------------------------------------------ */

  var ACTION_LABELS = {
    approve: 'Approved',
    reject:  'Rejected',
    hide:    'Hidden',
    flag:    'Flagged'
  };

  var REASON_PROMPTS = {
    reject: 'Rejection reason (stored in Firestore):',
    hide:   'Hide reason (optional):',
    flag:   'Flag reason (optional):'
  };

  function _wireCard(card) {
    var modSvc = window.FurnostylesModeration;
    var modStatus = window.FurnStylesModerationStatus;
    if (!modSvc) return;

    var id         = card.getAttribute('data-id');
    var collection = card.getAttribute('data-collection');
    var feedbackEl = card.querySelector('.mdr-action-feedback');
    var buttons    = card.querySelectorAll('.mdr-btn[data-action]');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var action = btn.getAttribute('data-action');

        /* Check transition is allowed */
        var currentStatus = (card.querySelector('.mdr-status-badge') || {}).textContent || 'pending';
        var newStatus = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : action;
        if (modStatus && !modStatus.canTransition(currentStatus.trim(), newStatus)) {
          if (feedbackEl) {
            feedbackEl.textContent = 'Transition ' + currentStatus + ' \u2192 ' + newStatus + ' not allowed.';
            feedbackEl.style.color = '#cc1a1a';
          }
          return;
        }

        /* Ask for reason if needed */
        var reason = '';
        if (REASON_PROMPTS[action]) {
          reason = window.prompt(REASON_PROMPTS[action]) || '';
        }

        /* Disable buttons */
        buttons.forEach(function (b) { b.disabled = true; b.style.opacity = '0.5'; });
        if (feedbackEl) { feedbackEl.textContent = 'Saving\u2026'; feedbackEl.style.color = '#4c5e80'; }

        modSvc[action](collection, id, reason)
          .then(function () {
            /* Update badge */
            var badge = card.querySelector('.mdr-status-badge');
            if (badge && modStatus) {
              badge.textContent = newStatus;
              badge.setAttribute('style', modStatus.styleFor(newStatus));
            }
            /* Dim card to signal it's been actioned */
            card.style.opacity = '0.65';
            if (feedbackEl) {
              feedbackEl.textContent = '\u2713 ' + (ACTION_LABELS[action] || action);
              feedbackEl.style.color = action === 'approve' ? '#1a6e3a' : '#8a2020';
            }
          })
          .catch(function (err) {
            buttons.forEach(function (b) { b.disabled = false; b.style.opacity = '1'; });
            if (feedbackEl) {
              feedbackEl.textContent = 'Error: ' + err.message;
              feedbackEl.style.color = '#cc1a1a';
            }
          });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* PUBLIC API                                                           */
  /* ------------------------------------------------------------------ */

  /**
   * Render and wire all review cards into container.
   */
  function renderReviewGrid(container, items, collection, itemType) {
    if (!container) return;
    container.innerHTML = '';

    if (!items || items.length === 0) {
      container.innerHTML =
        '<div style="text-align:center;padding:56px 24px;color:#8090a0;">' +
          '<div style="font-size:44px;margin-bottom:12px;">\u2713</div>' +
          '<p style="font-weight:700;font-size:16px;color:#1a2540;margin:0 0 6px;">All caught up!</p>' +
          '<p style="font-size:13px;margin:0;">No items match this filter.</p>' +
        '</div>';
      return;
    }

    var wrapper = document.createElement('div');
    wrapper.className = 'mdr-review-grid';

    items.forEach(function (item) {
      var tmp = document.createElement('div');
      tmp.innerHTML = _buildCardHTML(item, collection, itemType);
      var card = tmp.firstElementChild;
      _wireCard(card);
      wrapper.appendChild(card);
    });

    container.appendChild(wrapper);
  }

  /**
   * Render skeleton loading placeholder (3 cards).
   */
  function renderLoadingState(container) {
    if (!container) return;
    var skel = '';
    for (var i = 0; i < 3; i++) {
      skel +=
        '<div class="mdr-review-card">' +
          '<div class="mdr-card-media"><div class="mdr-skel-block"></div></div>' +
          '<div class="mdr-card-info" style="padding:14px 16px;">' +
            '<div class="mdr-skel-line" style="width:35%;height:13px;margin-bottom:12px;"></div>' +
            '<div class="mdr-skel-line" style="width:65%;height:18px;margin-bottom:10px;"></div>' +
            '<div class="mdr-skel-line" style="width:50%;height:12px;margin-bottom:6px;"></div>' +
            '<div class="mdr-skel-line" style="width:40%;height:12px;"></div>' +
          '</div>' +
          '<div class="mdr-card-actions" style="padding:0 16px 14px;">' +
            '<div class="mdr-skel-line" style="width:80px;height:30px;border-radius:6px;display:inline-block;margin-right:8px;"></div>' +
            '<div class="mdr-skel-line" style="width:72px;height:30px;border-radius:6px;display:inline-block;"></div>' +
          '</div>' +
        '</div>';
    }
    container.innerHTML = '<div class="mdr-review-grid">' + skel + '</div>';
  }

  /**
   * Render stats strip from an array of items.
   */
  function renderStats(container, items) {
    if (!container) return;
    var counts = { total: items.length, pending: 0, approved: 0, rejected: 0, hidden: 0, flagged: 0 };
    items.forEach(function (i) {
      if (counts[i.status] !== undefined) counts[i.status]++;
    });
    container.innerHTML = [
      ['Total',    counts.total],
      ['Pending',  counts.pending],
      ['Approved', counts.approved],
      ['Rejected', counts.rejected],
      ['Hidden',   counts.hidden],
      ['Flagged',  counts.flagged]
    ].map(function (s) {
      return '<div class="mdr-stat-pill"><strong>' + s[1] + '</strong> ' + s[0] + '</div>';
    }).join('');
  }

  /**
   * Render error state.
   */
  function renderErrorState(container, message) {
    if (!container) return;
    container.innerHTML =
      '<div style="text-align:center;padding:40px;color:#cc1a1a;">' +
        '<div style="font-size:36px;margin-bottom:10px;">\u26A0</div>' +
        '<p style="font-weight:700;font-size:15px;">Failed to load items</p>' +
        '<p style="font-size:13px;">' + _esc(String(message || 'Unknown error')) + '</p>' +
      '</div>';
  }

  window.FurnStylesModerationUI = {
    renderReviewGrid:   renderReviewGrid,
    renderLoadingState: renderLoadingState,
    renderStats:        renderStats,
    renderErrorState:   renderErrorState
  };

}());
