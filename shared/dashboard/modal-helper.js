/**
 * FURNOSTYLES — MODAL HELPER
 * ===========================
 * File: shared/dashboard/modal-helper.js
 * Purpose: Simple modal dialog system for dashboard interactions
 *          Replaces prompt() and alert() with proper UI modals
 *
 * Usage:
 *   window.FurnostylesModal.prompt(config)
 *   window.FurnostylesModal.confirm(config)
 *   window.FurnostylesModal.alert(config)
 */

(function() {
  'use strict';

  /**
   * Create modal element
   */
  function createModal() {
    var modal = document.createElement('div');
    modal.className = 'fns-modal-overlay';
    modal.innerHTML = `
      <div class="fns-modal">
        <div class="fns-modal-header">
          <h3 class="fns-modal-title"></h3>
          <button class="fns-modal-close" type="button">&times;</button>
        </div>
        <div class="fns-modal-body"></div>
        <div class="fns-modal-footer"></div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  /**
   * Show prompt modal with form fields
   */
  function promptModal(config) {
    return new Promise(function(resolve) {
      var modal = createModal();
      var titleEl = modal.querySelector('.fns-modal-title');
      var bodyEl = modal.querySelector('.fns-modal-body');
      var footerEl = modal.querySelector('.fns-modal-footer');
      var closeBtn = modal.querySelector('.fns-modal-close');

      titleEl.textContent = config.title || 'Enter Details';

      // Create form fields
      var form = document.createElement('form');
      form.className = 'fns-modal-form';

      config.fields.forEach(function(field) {
        var group = document.createElement('div');
        group.className = 'fns-form-group';

        var label = document.createElement('label');
        label.textContent = field.label;
        if (field.required) {
          label.innerHTML += ' <span class="required">*</span>';
        }

        var input;
        if (field.type === 'select') {
          input = document.createElement('select');
          field.options.forEach(function(opt) {
            var option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            input.appendChild(option);
          });
        } else {
          input = document.createElement('input');
          input.type = field.type || 'text';
        }

        input.name = field.name;
        input.placeholder = field.placeholder || '';
        if (field.required) input.required = true;
        if (field.value) input.value = field.value;

        group.appendChild(label);
        group.appendChild(input);
        form.appendChild(group);
      });

      bodyEl.appendChild(form);

      // Create buttons
      var cancelBtn = document.createElement('button');
      cancelBtn.type = 'button';
      cancelBtn.className = 'fns-btn fns-btn-secondary';
      cancelBtn.textContent = config.cancelText || 'Cancel';

      var submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.className = 'fns-btn fns-btn-primary';
      submitBtn.textContent = config.submitText || 'Submit';

      footerEl.appendChild(cancelBtn);
      footerEl.appendChild(submitBtn);

      // Event handlers
      function closeModal(result) {
        modal.remove();
        resolve(result);
      }

      closeBtn.addEventListener('click', function() { closeModal(null); });
      cancelBtn.addEventListener('click', function() { closeModal(null); });

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = {};
        config.fields.forEach(function(field) {
          formData[field.name] = form.querySelector('[name="' + field.name + '"]').value;
        });
        closeModal(formData);
      });

      // Close on overlay click
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal(null);
      });

      // Focus first input
      setTimeout(function() {
        var firstInput = form.querySelector('input, select');
        if (firstInput) firstInput.focus();
      }, 100);
    });
  }

  /**
   * Show confirm modal
   */
  function confirmModal(config) {
    return new Promise(function(resolve) {
      var modal = createModal();
      var titleEl = modal.querySelector('.fns-modal-title');
      var bodyEl = modal.querySelector('.fns-modal-body');
      var footerEl = modal.querySelector('.fns-modal-footer');
      var closeBtn = modal.querySelector('.fns-modal-close');

      titleEl.textContent = config.title || 'Confirm';
      bodyEl.innerHTML = '<p>' + (config.message || 'Are you sure?') + '</p>';

      var cancelBtn = document.createElement('button');
      cancelBtn.type = 'button';
      cancelBtn.className = 'fns-btn fns-btn-secondary';
      cancelBtn.textContent = config.cancelText || 'Cancel';

      var confirmBtn = document.createElement('button');
      confirmBtn.type = 'button';
      confirmBtn.className = 'fns-btn fns-btn-primary';
      confirmBtn.textContent = config.confirmText || 'Confirm';

      footerEl.appendChild(cancelBtn);
      footerEl.appendChild(confirmBtn);

      closeBtn.addEventListener('click', function() { 
        modal.remove();
        resolve(false);
      });
      cancelBtn.addEventListener('click', function() { 
        modal.remove();
        resolve(false);
      });
      confirmBtn.addEventListener('click', function() { 
        modal.remove();
        resolve(true);
      });

      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.remove();
          resolve(false);
        }
      });
    });
  }

  /**
   * Show alert modal
   */
  function alertModal(config) {
    return new Promise(function(resolve) {
      var modal = createModal();
      var titleEl = modal.querySelector('.fns-modal-title');
      var bodyEl = modal.querySelector('.fns-modal-body');
      var footerEl = modal.querySelector('.fns-modal-footer');
      var closeBtn = modal.querySelector('.fns-modal-close');

      titleEl.textContent = config.title || 'Alert';
      bodyEl.innerHTML = '<p>' + (config.message || '') + '</p>';

      var okBtn = document.createElement('button');
      okBtn.type = 'button';
      okBtn.className = 'fns-btn fns-btn-primary';
      okBtn.textContent = config.okText || 'OK';

      footerEl.appendChild(okBtn);

      closeBtn.addEventListener('click', function() { 
        modal.remove();
        resolve();
      });
      okBtn.addEventListener('click', function() { 
        modal.remove();
        resolve();
      });

      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.remove();
          resolve();
        }
      });
    });
  }

  // Export API
  window.FurnostylesModal = {
    prompt: promptModal,
    confirm: confirmModal,
    alert: alertModal
  };

  console.log('[ModalHelper] Modal helper module loaded');

})();
