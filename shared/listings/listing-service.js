/**
 * Furnostyles Listing Service
 * Saves listing, property, and repair project documents to Firestore (or localStorage in LOCAL mode).
 *
 * Uses FurnostylesFirebase bridge — no direct Firestore calls here.
 * Uses FurnostylesListingTypes for document building.
 *
 * Load order: firebase-bridge.js → listing-config.js → listing-types.js → listing-service.js
 */

(function () {
  'use strict';

  function getBridge() {
    return window.FurnostylesFirebase || null;
  }

  function getConfig() {
    return window.FurnostylesListingConfig || {
      COLLECTIONS: { LISTINGS: 'listings', PROPERTIES: 'properties', REPAIR_PROJECTS: 'repairProjects' },
      STATUS: { PENDING: 'pending' }
    };
  }

  function getTypes() {
    return window.FurnostylesListingTypes || null;
  }

  /* ------------------------------------------------------------------ */
  /* SUBMIT LISTING (product / furniture / secondhand / sourcing)        */
  /* ------------------------------------------------------------------ */

  /**
   * Submit a product/listing document to Firestore.
   * @param {Object} formData     - { title, category, price, description, sellerType, location, listingType, sourcePage }
   * @param {Object} uploadResult - Result from uploadAndGetURLs() → { urls, sources, mode }
   * @returns Promise<{ id, ...doc }>
   */
  function submitListing(formData, uploadResult) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available.'));

    var types = getTypes();
    var doc = types
      ? types.buildListingDoc(formData, uploadResult)
      : _buildListingFallback(formData, uploadResult);

    return bridge.save(getConfig().COLLECTIONS.LISTINGS, doc)
      .then(function (id) { return Object.assign({}, doc, { id: String(id || 'local_' + Date.now()) }); });
  }

  /* ------------------------------------------------------------------ */
  /* SUBMIT PROPERTY                                                      */
  /* ------------------------------------------------------------------ */

  /**
   * Submit a property document to Firestore.
   * @param {Object} formData     - { title, location, priceOrRent, pricePeriod, propertyType, listingMode, bedrooms, description, sourcePage }
   * @param {Object} uploadResult - Result from uploadAndGetURLs()
   * @returns Promise<{ id, ...doc }>
   */
  function submitProperty(formData, uploadResult) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available.'));

    var types = getTypes();
    var doc = types
      ? types.buildPropertyDoc(formData, uploadResult)
      : _buildPropertyFallback(formData, uploadResult);

    return bridge.save(getConfig().COLLECTIONS.PROPERTIES, doc)
      .then(function (id) { return Object.assign({}, doc, { id: String(id || 'local_' + Date.now()) }); });
  }

  /* ------------------------------------------------------------------ */
  /* SUBMIT REPAIR PROJECT                                                */
  /* ------------------------------------------------------------------ */

  /**
   * Submit a repair project document to Firestore.
   * @param {Object} formData      - { repairType, location, description, repairDate, estimatedCost, sourcePage }
   * @param {Object} beforeUpload  - uploadAndGetURLs() result for Before images
   * @param {Object} afterUpload   - uploadAndGetURLs() result for After images
   * @returns Promise<{ id, ...doc }>
   */
  function submitRepairProject(formData, beforeUpload, afterUpload) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available.'));

    var types = getTypes();
    var doc = types
      ? types.buildRepairProjectDoc(formData, beforeUpload, afterUpload)
      : _buildRepairFallback(formData, beforeUpload, afterUpload);

    return bridge.save(getConfig().COLLECTIONS.REPAIR_PROJECTS, doc)
      .then(function (id) { return Object.assign({}, doc, { id: String(id || 'local_' + Date.now()) }); });
  }

  /* ------------------------------------------------------------------ */
  /* READ OPERATIONS                                                      */
  /* ------------------------------------------------------------------ */

  function getListingById(id) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available.'));
    return bridge.get(getConfig().COLLECTIONS.LISTINGS, id);
  }

  function getPropertyById(id) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available.'));
    return bridge.get(getConfig().COLLECTIONS.PROPERTIES, id);
  }

  function getRepairProjectById(id) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available.'));
    return bridge.get(getConfig().COLLECTIONS.REPAIR_PROJECTS, id);
  }

  /* ------------------------------------------------------------------ */
  /* VENDOR QUERIES                                                       */
  /* ------------------------------------------------------------------ */

  /**
   * Load all listings submitted by a specific vendor.
   * @param {string} vendorId - Firebase Auth UID
   * @returns Promise<Array>
   */
  function getVendorListings(vendorId) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available.'));
    if (!vendorId) return Promise.resolve([]);
    return bridge.list(getConfig().COLLECTIONS.LISTINGS, {
      where:   [{ field: 'vendorId', operator: '==', value: vendorId }],
      orderBy: { field: 'createdAt', direction: 'desc' }
    });
  }

  /* ------------------------------------------------------------------ */
  /* STATUS UPDATE (for future admin approval)                           */
  /* ------------------------------------------------------------------ */

  function updateListingStatus(collection, id, status) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available.'));
    return bridge.update(collection, id, {
      status:    status,
      updatedAt: new Date().toISOString()
    });
  }

  /* ------------------------------------------------------------------ */
  /* INTERNAL HELPERS                                                     */
  /* ------------------------------------------------------------------ */

  /**
   * Normalize the bridge save response to a consistent { id, ...doc } shape.
   * Bridge LOCAL mode returns the doc object directly with an _id field.
   * Bridge FIREBASE mode returns the Firestore DocumentReference or a wrapped object.
   */
  function _normalizeResult(saved, doc) {
    if (!saved) return Object.assign({ id: 'unknown' }, doc);

    /* If bridge returned an id property, use it */
    if (saved.id) return Object.assign({}, doc, { id: saved.id });

    /* LOCAL bridge may attach _id */
    if (saved._id) return Object.assign({}, doc, { id: saved._id });

    /* Firestore DocumentReference has .id */
    if (saved.id !== undefined) return Object.assign({}, doc, { id: saved.id });

    /* Fallback: generate a readable local ID */
    return Object.assign({}, doc, { id: 'local_' + Date.now() });
  }

  function _buildListingFallback(formData, uploadResult) {
    var now = new Date().toISOString();
    return {
      listingType:  formData.listingType  || 'product',
      title:        formData.title,
      category:     formData.category,
      subcategory:  formData.subcategory  || '',
      price:        Number(formData.price) || 0,
      condition:    formData.condition    || '',
      description:  formData.description,
      sellerType:   formData.sellerType,
      location:     formData.location     || '',
      vendorId:     formData.vendorId     || '',
      vendorRole:   formData.vendorRole   || 'vendor',
      images: uploadResult.urls || [], imageSources: uploadResult.sources || [],
      uploadMode: uploadResult.mode || 'local',
      status: 'pending', createdAt: now, updatedAt: now, sourcePage: formData.sourcePage || ''
    };
  }

  function _buildPropertyFallback(formData, uploadResult) {
    var now = new Date().toISOString();
    return {
      title: formData.title, location: formData.location,
      priceOrRent: Number(formData.priceOrRent) || 0, pricePeriod: formData.pricePeriod || 'total',
      propertyType: formData.propertyType, listingMode: formData.listingMode,
      bedrooms: formData.bedrooms || '', description: formData.description,
      images: uploadResult.urls || [], imageSources: uploadResult.sources || [],
      status: 'pending', createdAt: now, updatedAt: now, sourcePage: formData.sourcePage || ''
    };
  }

  function _buildRepairFallback(formData, beforeUpload, afterUpload) {
    var now = new Date().toISOString();
    return {
      repairType: formData.repairType, location: formData.location,
      description: formData.description, repairDate: formData.repairDate || '',
      estimatedCost: Number(formData.estimatedCost) || 0,
      beforeImages: beforeUpload.urls || [], afterImages: afterUpload.urls || [],
      totalImages: (beforeUpload.urls || []).length + (afterUpload.urls || []).length,
      status: 'pending', createdAt: now, updatedAt: now, sourcePage: formData.sourcePage || ''
    };
  }

  /* ------------------------------------------------------------------ */
  /* EXPORT                                                               */
  /* ------------------------------------------------------------------ */

  window.FurnostylesListingService = {
    submitListing:        submitListing,
    submitProperty:       submitProperty,
    submitRepairProject:  submitRepairProject,
    getListingById:       getListingById,
    getPropertyById:      getPropertyById,
    getRepairProjectById: getRepairProjectById,
    getVendorListings:    getVendorListings,
    updateListingStatus:  updateListingStatus
  };

}());
