/**
 * Furnostyles Assignment UI
 * Shared dynamic interface component to inject and process request submits, progress maps, and results.
 */

(function () {
  'use strict';

  function _esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Show alert using modal if available, fallback to native alert
  function showAlert(message, title) {
    if (window.FurnostylesModal) {
      window.FurnostylesModal.alert({
        title: title || 'Notice',
        message: message
      });
    } else {
      alert(message);
    }
  }

  function renderSuccess(container, reqId, category, urgency) {
    if (!container) return;

    var catLabels = {
      repair: 'Repair & Renovation Showcase',
      installation: 'Installation Specialist',
      consultation: 'Design & Space Consultation',
      property_support: 'Property Support Package'
    };

    // XSS MITIGATION: User input (reqId, category) is escaped using _esc() function
    // This HTML rendering is for static UI structure only - no user-controlled HTML
    container.innerHTML =
      '<div class="rtg-success-box">' +
        '<div class="rtg-success-icon">\u2709\uFE0F</div>' +
        '<h2 class="rtg-success-title">Service Request Registered</h2>' +
        '<p class="rtg-success-desc">' +
          'Your request is undergoing manual quality review by our platform administration. ' +
          'We will evaluate suitable matching specialists and reach out with assignments within 2 hours.' +
        '</p>' +
        '<div class="rtg-tracking-card">' +
          '<div class="rtg-track-row">' +
            '<span class="rtg-track-lbl">Request ID:</span>' +
            '<span class="rtg-track-val" style="font-family:monospace;">' + _esc(reqId) + '</span>' +
          '</div>' +
          '<div class="rtg-track-row">' +
            '<span class="rtg-track-lbl">Category:</span>' +
            '<span class="rtg-track-val">' + _esc(catLabels[category] || category) + '</span>' +
          '</div>' +
          '<div class="rtg-track-row">' +
            '<span class="rtg-track-lbl">Routing Urgency:</span>' +
            '<span class="rtg-track-val" style="text-transform:uppercase;color:' + (urgency === 'urgent' ? '#cc1a1a' : '#0b3b46') + ';">' + _esc(urgency) + '</span>' +
          '</div>' +
          '<div class="rtg-track-row">' +
            '<span class="rtg-track-lbl">Ecosystem Status:</span>' +
            '<span class="rtg-track-val" style="color:#c9a227;">Pending Platform Review</span>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">' +
          '<a href="marketplace.html" class="btn primary">Browse Catalog</a>' +
          '<a href="contact.html" class="btn secondary">Contact Concierge</a>' +
        '</div>' +
      '</div>';
  }

  function bindFormSubmit(formId, containerId, category) {
    var form = document.getElementById(formId);
    var container = document.getElementById(containerId);
    if (!form || !container) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Request...';
      }

      var bridge = window.FurnostylesFirebaseBridge;
      var engine = window.FurnostylesRoutingEngine;

      if (!bridge || !engine) {
        showAlert('Ecosystem routing engines are not available. Please retry in a few moments.', 'Error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Request';
        }
        return;
      }

      var uploadedUrls = [];
      if (window.FurnostylesUploadBridge && window.FurnostylesUploadBridge.getUploadedUrls) {
        uploadedUrls = window.FurnostylesUploadBridge.getUploadedUrls();
      }

      var payload = {
        category: category,
        subcategory: form.subcategory ? form.subcategory.value : '',
        location: form.location ? form.location.value : 'Nairobi',
        urgency: form.urgency ? form.urgency.value : 'standard',
        description: form.description ? form.description.value : '',
        images: uploadedUrls,
        budget: form.budget ? form.budget.value : '',
        schedule: form.schedule ? form.schedule.value : ''
      };

      engine.submitRequest(payload, bridge)
        .then(function (res) {
          if (res && res.success) {
            renderSuccess(container, res.id, category, payload.urgency);
          } else {
            showAlert('Request registering failed. Please try again.', 'Error');
          }
        })
        .catch(function (err) {
          showAlert('Error: ' + err.message, 'Error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Request';
          }
        });
    });
  }

  window.FurnostylesAssignmentUI = {
    bindFormSubmit: bindFormSubmit
  };

}());
