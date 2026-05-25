/**
 * Furnostyles Listing Validation
 * Field-level validation for listing, property, and repair project forms.
 * Returns { valid: bool, errors: { fieldId: string } }
 */

(function () {
  'use strict';

  function trim(v) { return String(v || '').trim(); }

  function err(errors, field, msg) {
    errors[field] = msg;
  }

  /* ------------------------------------------------------------------ */
  /* LISTING (product / furniture / secondhand / sourcing / material)    */
  /* ------------------------------------------------------------------ */

  function validateListing(data) {
    var errors = {};

    if (!trim(data.title))       err(errors, 'title',       'Title is required.');
    else if (trim(data.title).length < 5)
                                 err(errors, 'title',       'Title must be at least 5 characters.');

    if (!trim(data.category))    err(errors, 'category',    'Category is required.');
    if (!trim(data.sellerType))  err(errors, 'sellerType',  'Seller type is required.');

    if (!trim(data.price) && data.price !== 0) {
                                 err(errors, 'price',       'Price is required.');
    } else if (Number(data.price) < 0) {
                                 err(errors, 'price',       'Price cannot be negative.');
    }

    if (!trim(data.description)) err(errors, 'description', 'Description is required.');
    else if (trim(data.description).length < 20)
                                 err(errors, 'description', 'Description must be at least 20 characters.');

    return { valid: Object.keys(errors).length === 0, errors: errors };
  }

  /* ------------------------------------------------------------------ */
  /* PROPERTY                                                             */
  /* ------------------------------------------------------------------ */

  function validateProperty(data) {
    var errors = {};

    if (!trim(data.title))        err(errors, 'title',        'Property title is required.');
    else if (trim(data.title).length < 5)
                                  err(errors, 'title',        'Title must be at least 5 characters.');

    if (!trim(data.location))     err(errors, 'location',     'Location is required.');
    if (!trim(data.propertyType)) err(errors, 'propertyType', 'Property type is required.');
    if (!trim(data.listingMode))  err(errors, 'listingMode',  'Listing type (sale/rent) is required.');

    if (!trim(data.priceOrRent) && data.priceOrRent !== 0) {
                                  err(errors, 'priceOrRent',  'Price or rent amount is required.');
    } else if (Number(data.priceOrRent) < 0) {
                                  err(errors, 'priceOrRent',  'Amount cannot be negative.');
    }

    if (!trim(data.description))  err(errors, 'description',  'Description is required.');
    else if (trim(data.description).length < 20)
                                  err(errors, 'description',  'Description must be at least 20 characters.');

    return { valid: Object.keys(errors).length === 0, errors: errors };
  }

  /* ------------------------------------------------------------------ */
  /* REPAIR PROJECT                                                       */
  /* ------------------------------------------------------------------ */

  function validateRepairProject(data) {
    var errors = {};

    if (!trim(data.repairType))  err(errors, 'repairType',  'Repair type is required.');
    if (!trim(data.location))    err(errors, 'location',    'Location is required.');

    if (!trim(data.description)) err(errors, 'description', 'Description is required.');
    else if (trim(data.description).length < 20)
                                 err(errors, 'description', 'Description must be at least 20 characters.');

    return { valid: Object.keys(errors).length === 0, errors: errors };
  }

  /* ------------------------------------------------------------------ */
  /* SHARED HELPERS                                                       */
  /* ------------------------------------------------------------------ */

  /**
   * Apply field errors to DOM inputs — adds a visible error message below each field.
   * @param {Object} errors  - { fieldId: errorMessage }
   * @param {Element} scope  - Container element to search within (defaults to document)
   */
  function applyFieldErrors(errors, scope) {
    var root = scope || document;

    /* Clear any existing error hints first */
    var existing = root.querySelectorAll('.fns-field-error');
    for (var i = 0; i < existing.length; i++) existing[i].parentNode.removeChild(existing[i]);

    Object.keys(errors).forEach(function (fieldId) {
      var input = root.getElementById(fieldId) || root.querySelector('[name="' + fieldId + '"]');
      if (!input) return;

      input.style.borderColor = '#cc1a1a';

      var hint = document.createElement('div');
      hint.className = 'fns-field-error';
      hint.textContent = errors[fieldId];
      hint.style.cssText = 'font-size:12px;color:#cc1a1a;margin-top:4px;';
      input.parentNode.insertBefore(hint, input.nextSibling);
    });
  }

  /**
   * Clear all field error highlights in a container.
   */
  function clearFieldErrors(scope) {
    var root = scope || document;
    var hints = root.querySelectorAll('.fns-field-error');
    for (var i = 0; i < hints.length; i++) hints[i].parentNode.removeChild(hints[i]);
    var inputs = root.querySelectorAll('.ut-input,.ut-select,.ut-textarea');
    for (var j = 0; j < inputs.length; j++) inputs[j].style.borderColor = '';
  }

  window.FurnostylesListingValidation = {
    validateListing:      validateListing,
    validateProperty:     validateProperty,
    validateRepairProject: validateRepairProject,
    applyFieldErrors:     applyFieldErrors,
    clearFieldErrors:     clearFieldErrors
  };

}());
