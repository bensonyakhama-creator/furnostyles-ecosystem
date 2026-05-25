/**
 * Furnostyles Inquiry UI
 * UI rendering and form handling for inquiry system
 */

(function () {
  'use strict';

  /**
   * Render inquiry form
   */
  function renderInquiryForm(container, options) {
    options = options || {};
    var page = options.page || window.location.pathname.split('/').pop();
    var relatedCategory = options.relatedCategory || null;
    var prefillMessage = options.prefillMessage || '';

    // Get inquiry type options for the page
    var inquiryTypeOptions = window.FurnostylesInquiryConfig ?
      window.FurnostylesInquiryConfig.getInquiryTypeOptionsForPage(page) : [];

    // Get form field configs
    var fieldConfigs = window.FurnostylesInquiryConfig ?
      window.FurnostylesInquiryConfig.getAllFormFieldConfigs() : {};

    // Build form HTML
    var formHtml = '<form id="fnsInquiryForm" class="fns-inquiry-form" novalidate>';
    
    // Inquiry type select
    if (inquiryTypeOptions.length > 0) {
      formHtml += '<div class="fns-form-group">';
      formHtml += '<label for="inquiryType" class="fns-form-label">' + 
        (fieldConfigs.inquiryType ? fieldConfigs.inquiryType.label : 'Inquiry Type') + '</label>';
      formHtml += '<select id="inquiryType" name="inquiryType" class="fns-form-select" required>';
      formHtml += '<option value="">Select inquiry type...</option>';
      inquiryTypeOptions.forEach(function (opt) {
        formHtml += '<option value="' + opt.value + '">' + opt.label + '</option>';
      });
      formHtml += '</select>';
      formHtml += '<span class="fns-form-error" id="inquiryTypeError"></span>';
      formHtml += '</div>';
    }

    // Full name
    formHtml += '<div class="fns-form-group">';
    formHtml += '<label for="fullName" class="fns-form-label">' + 
      (fieldConfigs.fullName ? fieldConfigs.fullName.label : 'Full Name') + '</label>';
    formHtml += '<input type="text" id="fullName" name="fullName" class="fns-form-input" ' +
      'placeholder="' + (fieldConfigs.fullName ? fieldConfigs.fullName.placeholder : 'Enter your full name') + '" required>';
    formHtml += '<span class="fns-form-error" id="fullNameError"></span>';
    formHtml += '</div>';

    // Email
    formHtml += '<div class="fns-form-group">';
    formHtml += '<label for="email" class="fns-form-label">' + 
      (fieldConfigs.email ? fieldConfigs.email.label : 'Email Address') + '</label>';
    formHtml += '<input type="email" id="email" name="email" class="fns-form-input" ' +
      'placeholder="' + (fieldConfigs.email ? fieldConfigs.email.placeholder : 'Enter your email address') + '" required>';
    formHtml += '<span class="fns-form-error" id="emailError"></span>';
    formHtml += '</div>';

    // Phone
    formHtml += '<div class="fns-form-group">';
    formHtml += '<label for="phone" class="fns-form-label">' + 
      (fieldConfigs.phone ? fieldConfigs.phone.label : 'Phone Number') + '</label>';
    formHtml += '<input type="tel" id="phone" name="phone" class="fns-form-input" ' +
      'placeholder="' + (fieldConfigs.phone ? fieldConfigs.phone.placeholder : 'Enter your phone number') + '" required>';
    formHtml += '<span class="fns-form-error" id="phoneError"></span>';
    formHtml += '</div>';

    // Location
    formHtml += '<div class="fns-form-group">';
    formHtml += '<label for="location" class="fns-form-label">' + 
      (fieldConfigs.location ? fieldConfigs.location.label : 'Location') + '</label>';
    formHtml += '<input type="text" id="location" name="location" class="fns-form-input" ' +
      'placeholder="' + (fieldConfigs.location ? fieldConfigs.location.placeholder : 'Enter your location') + '" required>';
    formHtml += '<span class="fns-form-error" id="locationError"></span>';
    formHtml += '</div>';

    // Related category (optional)
    if (fieldConfigs.relatedCategory && fieldConfigs.relatedCategory.options) {
      formHtml += '<div class="fns-form-group">';
      formHtml += '<label for="relatedCategory" class="fns-form-label">' + 
        fieldConfigs.relatedCategory.label + '</label>';
      formHtml += '<select id="relatedCategory" name="relatedCategory" class="fns-form-select">';
      formHtml += '<option value="">Select category (optional)...</option>';
      fieldConfigs.relatedCategory.options.forEach(function (opt) {
        var selected = relatedCategory === opt.value ? ' selected' : '';
        formHtml += '<option value="' + opt.value + '"' + selected + '>' + opt.label + '</option>';
      });
      formHtml += '</select>';
      formHtml += '</div>';
    }

    // Message
    formHtml += '<div class="fns-form-group">';
    formHtml += '<label for="message" class="fns-form-label">' + 
      (fieldConfigs.message ? fieldConfigs.message.label : 'Message') + '</label>';
    formHtml += '<textarea id="message" name="message" class="fns-form-textarea" ' +
      'placeholder="' + (fieldConfigs.message ? fieldConfigs.message.placeholder : 'Describe your inquiry in detail...') + '" ' +
      'rows="' + (fieldConfigs.message ? fieldConfigs.message.rows : 5) + '" required>' + prefillMessage + '</textarea>';
    formHtml += '<span class="fns-form-error" id="messageError"></span>';
    formHtml += '</div>';

    // Submit button
    formHtml += '<div class="fns-form-actions">';
    formHtml += '<button type="submit" id="submitInquiryBtn" class="btn primary">Submit Inquiry</button>';
    formHtml += '<span id="submitSpinner" class="fns-spinner" style="display: none;">Submitting...</span>';
    formHtml += '</div>';

    formHtml += '</form>';

    // Success message container
    formHtml += '<div id="inquirySuccessMessage" class="fns-alert fns-alert-success" style="display: none;"></div>';
    
    // Error message container
    formHtml += '<div id="inquiryErrorMessage" class="fns-alert fns-alert-error" style="display: none;"></div>';

    // WhatsApp backup CTA
    var whatsappInfo = window.FurnostylesInquiryConfig ? 
      window.FurnostylesInquiryConfig.getWhatsAppInfo() : { url: 'https://wa.me/254713639205' };
    formHtml += '<div class="fns-whatsapp-cta">';
    formHtml += '<p>Prefer to chat directly? <a href="' + whatsappInfo.url + '" target="_blank" class="fns-whatsapp-link">';
    formHtml += 'Contact us on WhatsApp <span class="fns-whatsapp-icon">💬</span></a></p>';
    formHtml += '</div>';

    // Render form
    container.innerHTML = formHtml;

    // Attach form handler
    attachFormHandler(page);
  }

  /**
   * Attach form submission handler
   */
  function attachFormHandler(page) {
    var form = document.getElementById('fnsInquiryForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleFormSubmit(page);
    });
  }

  /**
   * Handle form submission
   */
  function handleFormSubmit(page) {
    var form = document.getElementById('fnsInquiryForm');
    var submitBtn = document.getElementById('submitInquiryBtn');
    var spinner = document.getElementById('submitSpinner');
    var successMsg = document.getElementById('inquirySuccessMessage');
    var errorMsg = document.getElementById('inquiryErrorMessage');

    // Clear previous messages
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';

    // Clear previous errors
    clearFieldErrors();

    // Collect form data
    var inquiryData = {
      inquiryType: form.inquiryType ? form.inquiryType.value : 'general',
      fullName: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      location: form.location.value,
      relatedCategory: form.relatedCategory ? form.relatedCategory.value : null,
      message: form.message.value,
      relatedPage: page,
      source: 'web_form'
    };

    // Show loading state
    if (submitBtn) submitBtn.disabled = true;
    if (spinner) spinner.style.display = 'inline';

    // Submit with validation
    if (window.FurnostylesInquiryService) {
      window.FurnostylesInquiryService.submitInquiryWithValidation(inquiryData)
        .then(function (result) {
          // Show success message
          var message = window.FurnostylesInquiryConfig ?
            window.FurnostylesInquiryConfig.getSuccessMessage(inquiryData.inquiryType) :
            'Your inquiry has been submitted successfully.';
          
          if (successMsg) {
            successMsg.textContent = message;
            successMsg.style.display = 'block';
          }

          // Reset form
          form.reset();

          // Hide loading state
          if (submitBtn) submitBtn.disabled = false;
          if (spinner) spinner.style.display = 'none';
        })
        .catch(function (error) {
          // Handle validation errors
          if (error.type === 'validation') {
            displayFieldErrors(error.errors);
            if (errorMsg) {
              errorMsg.textContent = window.FurnostylesInquiryConfig ?
                window.FurnostylesInquiryConfig.ErrorMessages.VALIDATION_FAILED :
                'Please correct the errors in the form.';
              errorMsg.style.display = 'block';
            }
          } else {
            // Handle submission errors
            if (errorMsg) {
              errorMsg.textContent = window.FurnostylesInquiryConfig ?
                window.FurnostylesInquiryConfig.ErrorMessages.SUBMISSION_FAILED :
                'Failed to submit inquiry. Please try again.';
              errorMsg.style.display = 'block';
            }
          }

          // Hide loading state
          if (submitBtn) submitBtn.disabled = false;
          if (spinner) spinner.style.display = 'none';
        });
    } else {
      // Fallback if service not available
      if (errorMsg) {
        errorMsg.textContent = 'Inquiry service not available. Please contact us via WhatsApp.';
        errorMsg.style.display = 'block';
      }
      if (submitBtn) submitBtn.disabled = false;
      if (spinner) spinner.style.display = 'none';
    }
  }

  /**
   * Display field errors
   */
  function displayFieldErrors(errors) {
    Object.keys(errors).forEach(function (fieldName) {
      var errorEl = document.getElementById(fieldName + 'Error');
      var inputEl = document.getElementById(fieldName);
      if (errorEl) {
        errorEl.textContent = errors[fieldName];
        errorEl.style.display = 'block';
      }
      if (inputEl) {
        inputEl.classList.add('fns-form-input-error');
      }
    });
  }

  /**
   * Clear field errors
   */
  function clearFieldErrors() {
    var errorElements = document.querySelectorAll('.fns-form-error');
    errorElements.forEach(function (el) {
      el.textContent = '';
      el.style.display = 'none';
    });

    var inputElements = document.querySelectorAll('.fns-form-input, .fns-form-select, .fns-form-textarea');
    inputElements.forEach(function (el) {
      el.classList.remove('fns-form-input-error');
    });
  }

  /**
   * Export UI API
   */
  window.FurnostylesInquiryUI = {
    renderInquiryForm: renderInquiryForm,
    attachFormHandler: attachFormHandler,
    handleFormSubmit: handleFormSubmit,
    displayFieldErrors: displayFieldErrors,
    clearFieldErrors: clearFieldErrors
  };

}());
