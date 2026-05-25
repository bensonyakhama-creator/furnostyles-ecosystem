/**
 * FURNOSTYLES — AUTH UI HELPERS
 * ==============================
 * File: shared/auth/auth-ui.js
 *
 * PURPOSE:
 *   UI helper functions for authentication pages.
 *   Form validation, error display, loading states, role selection.
 *
 * DEPENDENCIES:
 *   - shared/auth/auth-config.js
 *
 * USAGE:
 *   window.FurnostylesAuthUI.showFormError(form, message)
 *   window.FurnostylesAuthUI.clearFormErrors(form)
 *   window.FurnostylesAuthUI.setLoading(form, isLoading)
 *   window.FurnostylesAuthUI.renderRoleSelect(selectElement)
 */

(function () {
  'use strict';

  /**
   * Show error message on form
   */
  function showFormError(form, message) {
    clearFormErrors(form);

    var errorDiv = document.createElement('div');
    errorDiv.className = 'auth-error';
    errorDiv.style.cssText = 'background: #dc3545; color: white; padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; font-size: 14px;';
    errorDiv.textContent = message;

    form.insertBefore(errorDiv, form.firstChild);
  }

  /**
   * Clear all error messages on form
   */
  function clearFormErrors(form) {
    var errors = form.querySelectorAll('.auth-error');
    errors.forEach(function (error) {
      error.remove();
    });
  }

  /**
   * Set loading state on form
   */
  function setLoading(form, isLoading) {
    var submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.textContent = 'Processing...';
    } else {
      submitBtn.disabled = false;
      if (submitBtn.dataset.originalText) {
        submitBtn.textContent = submitBtn.dataset.originalText;
      }
    }
  }

  /**
   * Render role selection options
   */
  function renderRoleSelect(selectElement) {
    if (!selectElement) return;

    if (!window.FurnostylesAuthConfig) {
      console.warn('[AuthUI] Auth config not available.');
      return;
    }

    var roles = window.FurnostylesAuthConfig.getValidRoles();
    var currentRole = selectElement.value || 'client';

    selectElement.innerHTML = '';

    roles.forEach(function (role) {
      var option = document.createElement('option');
      option.value = role;
      option.textContent = window.FurnostylesAuthConfig.getRoleLabel(role);
      if (role === currentRole) {
        option.selected = true;
      }
      selectElement.appendChild(option);
    });
  }

  /**
   * Validate email format
   */
  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * Validate password strength
   */
  function isValidPassword(password) {
    if (!window.FurnostylesAuthConfig) {
      return password.length >= 8;
    }
    return password.length >= window.FurnostylesAuthConfig.config.settings.passwordMinLength;
  }

  /**
   * Export auth UI API
   */
  window.FurnostylesAuthUI = {
    showFormError: showFormError,
    clearFormErrors: clearFormErrors,
    setLoading: setLoading,
    renderRoleSelect: renderRoleSelect,
    isValidEmail: isValidEmail,
    isValidPassword: isValidPassword
  };

}());
