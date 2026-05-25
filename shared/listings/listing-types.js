/**
 * Furnostyles Listing Types
 * Document schemas for each listing type.
 * These define the shape of Firestore documents — used by service and validation layers.
 */

(function () {
  'use strict';

  /**
   * Build a base listing document (products / furniture / secondhand / sourcing / materials)
   */
  function buildListingDoc(formData, uploadResult) {
    var cfg = window.FurnostylesListingConfig;
    var now = new Date().toISOString();

    return {
      listingType:   String(formData.listingType  || (cfg ? cfg.LISTING_TYPES.PRODUCT : 'product')).trim(),
      title:         String(formData.title        || '').trim(),
      category:      String(formData.category     || '').trim(),
      subcategory:   String(formData.subcategory  || '').trim(),
      price:         Number(formData.price)        || 0,
      condition:     String(formData.condition    || '').trim(),
      description:   String(formData.description  || '').trim(),
      sellerType:    String(formData.sellerType   || '').trim(),
      location:      String(formData.location     || '').trim(),
      vendorId:      String(formData.vendorId     || '').trim(),
      vendorRole:    String(formData.vendorRole   || 'vendor').trim(),
      images:        uploadResult.urls    || [],
      imageSources:  uploadResult.sources || [],
      uploadMode:    uploadResult.mode    || 'local',
      status:        cfg ? cfg.STATUS.PENDING : 'pending',
      createdAt:     now,
      updatedAt:     now,
      sourcePage:    String(formData.sourcePage   || '').trim()
    };
  }

  /**
   * Build a property document
   */
  function buildPropertyDoc(formData, uploadResult) {
    var cfg = window.FurnostylesListingConfig;
    var now = new Date().toISOString();

    return {
      title:        String(formData.title       || '').trim(),
      location:     String(formData.location    || '').trim(),
      priceOrRent:  Number(formData.priceOrRent) || 0,
      pricePeriod:  String(formData.pricePeriod || 'total').trim(),
      propertyType: String(formData.propertyType || '').trim(),
      listingMode:  String(formData.listingMode  || '').trim(),
      bedrooms:     String(formData.bedrooms    || '').trim(),
      description:  String(formData.description || '').trim(),
      images:       uploadResult.urls    || [],
      imageSources: uploadResult.sources || [],
      uploadMode:   uploadResult.mode    || 'local',
      status:       cfg ? cfg.STATUS.PENDING : 'pending',
      createdAt:    now,
      updatedAt:    now,
      sourcePage:   String(formData.sourcePage || 'property-upload-test').trim()
    };
  }

  /**
   * Build a repair project document
   */
  function buildRepairProjectDoc(formData, beforeUpload, afterUpload) {
    var cfg = window.FurnostylesListingConfig;
    var now = new Date().toISOString();

    return {
      repairType:        String(formData.repairType   || '').trim(),
      location:          String(formData.location     || '').trim(),
      description:       String(formData.description  || '').trim(),
      repairDate:        String(formData.repairDate   || '').trim(),
      estimatedCost:     Number(formData.estimatedCost) || 0,
      beforeImages:      beforeUpload.urls    || [],
      beforeImageSources: beforeUpload.sources || [],
      afterImages:       afterUpload.urls     || [],
      afterImageSources:  afterUpload.sources  || [],
      totalImages:       (beforeUpload.urls || []).length + (afterUpload.urls || []).length,
      uploadMode:        beforeUpload.mode    || 'local',
      status:            cfg ? cfg.STATUS.PENDING : 'pending',
      createdAt:         now,
      updatedAt:         now,
      sourcePage:        String(formData.sourcePage || 'repair-before-after-upload-test').trim()
    };
  }

  window.FurnostylesListingTypes = {
    buildListingDoc:      buildListingDoc,
    buildPropertyDoc:     buildPropertyDoc,
    buildRepairProjectDoc: buildRepairProjectDoc
  };

}());
