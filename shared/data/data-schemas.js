/**
 * FURNOSTYLES — DATA SCHEMAS
 * ===========================
 * File: shared/data/data-schemas.js
 * Purpose: Reusable data structure definitions for future backend integration.
 *          Defines safe schemas for products, services, properties, vendors,
 *          sourcing requests, consultations, and inquiries.
 * 
 * This file DOES NOT connect to any backend.
 * It only defines the structure of data for future Firebase integration.
 * 
 * Load order: Before any data-loading scripts
 * 
 * Usage: These schemas can be used to validate data structure when
 *        Firebase is integrated in the future.
 */

(function () {
  'use strict';

  /**
   * PRODUCT SCHEMA
   * Structure for furniture, materials, and marketplace products
   */
  var ProductSchema = {
    id: 'string',                    // Unique product ID
    title: 'string',                 // Product name
    description: 'string',           // Product description
    category: 'string',              // Category (furniture, materials, etc.)
    subcategory: 'string',           // Subcategory
    price: 'number',                 // Price in KES
    currency: 'string',              // Currency code (KES)
    availability: 'string',          // in-stock, out-of-stock, pre-order
    images: ['string'],              // Array of image URLs
    specifications: {                // Product specifications
      material: 'string',
      dimensions: 'string',
      weight: 'string',
      color: 'string'
    },
    vendor: {                        // Vendor information
      id: 'string',
      name: 'string',
      verified: 'boolean'
    },
    ratings: {                       // Product ratings
      average: 'number',
      count: 'number'
    },
    featured: 'boolean',             // Featured product flag
    createdAt: 'timestamp',          // Creation timestamp
    updatedAt: 'timestamp'           // Last update timestamp
  };

  /**
   * SERVICE SCHEMA
   * Structure for interior design, repairs, and professional services
   */
  var ServiceSchema = {
    id: 'string',                    // Unique service ID
    title: 'string',                 // Service name
    description: 'string',           // Service description
    category: 'string',              // Service category
    priceRange: {                    // Price range
      min: 'number',
      max: 'number',
      unit: 'string'                 // per-hour, per-project, etc.
    },
    duration: 'string',             // Estimated duration
    images: ['string'],              // Array of image URLs
    features: ['string'],            // Service features
    provider: {                      // Service provider
      id: 'string',
      name: 'string',
      verified: 'boolean'
    },
    ratings: {                       // Service ratings
      average: 'number',
      count: 'number'
    },
    featured: 'boolean',             // Featured service flag
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  };

  /**
   * PROPERTY SCHEMA
   * Structure for real estate and property listings
   */
  var PropertySchema = {
    id: 'string',                    // Unique property ID
    title: 'string',                 // Property title
    description: 'string',           // Property description
    type: 'string',                  // Property type (apartment, house, land, etc.)
    location: {                      // Location information
      address: 'string',
      city: 'string',
      area: 'string',
      coordinates: {
        lat: 'number',
        lng: 'number'
      }
    },
    price: 'number',                 // Price in KES
    currency: 'string',              // Currency code (KES)
    specifications: {                // Property specifications
      bedrooms: 'number',
      bathrooms: 'number',
      size: 'number',                // Size in sq ft
      lotSize: 'number'              // Lot size in sq ft
    },
    amenities: ['string'],           // Property amenities
    images: ['string'],              // Array of image URLs
    agent: {                         // Listing agent
      id: 'string',
      name: 'string',
      verified: 'boolean'
    },
    status: 'string',                // for-sale, for-rent, sold, rented
    featured: 'boolean',             // Featured property flag
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  };

  /**
   * VENDOR SCHEMA
   * Structure for vendor and supplier profiles
   */
  var VendorSchema = {
    id: 'string',                    // Unique vendor ID
    name: 'string',                  // Vendor name
    description: 'string',           // Vendor description
    type: 'string',                  // Vendor type (supplier, service-provider, etc.)
    categories: ['string'],          // Categories served
    location: {                      // Vendor location
      address: 'string',
      city: 'string',
      country: 'string'
    },
    contact: {                       // Contact information
      email: 'string',
      phone: 'string',
      whatsapp: 'string'
    },
    verification: {                  // Verification status
      verified: 'boolean',
      verifiedAt: 'timestamp',
      documents: ['string']          // Verification document URLs
    },
    ratings: {                       // Vendor ratings
      average: 'number',
      count: 'number'
    },
    products: ['string'],            // Product IDs
    services: ['string'],            // Service IDs
    featured: 'boolean',             // Featured vendor flag
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  };

  /**
   * SOURCING REQUEST SCHEMA
   * Structure for sourcing and import requests
   */
  var SourcingRequestSchema = {
    id: 'string',                    // Unique request ID
    userId: 'string',                // User ID (when auth is implemented)
    type: 'string',                  // Request type (custom, bulk, dropshipping)
    category: 'string',              // Category (furniture, materials, etc.)
    description: 'string',           // Request description
    specifications: {                // Product specifications
      material: 'string',
      quantity: 'number',
      budget: {
        min: 'number',
        max: 'number',
        currency: 'string'
      },
      timeline: 'string'
    },
    status: 'string',                // pending, in-progress, completed, cancelled
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  };

  /**
   * CONSULTATION SCHEMA
   * Structure for consultation requests
   */
  var ConsultationSchema = {
    id: 'string',                    // Unique consultation ID
    userId: 'string',                // User ID (when auth is implemented)
    type: 'string',                  // Consultation type (whatsapp, phone, in-person)
    category: 'string',              // Category (furnishing, renovation, etc.)
    scheduledDate: 'timestamp',      // Scheduled date
    status: 'string',                // pending, confirmed, completed, cancelled
    notes: 'string',                 // Consultation notes
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  };

  /**
   * INQUIRY SCHEMA
   * Structure for general inquiries
   */
  var InquirySchema = {
    id: 'string',                    // Unique inquiry ID
    userId: 'string',                // User ID (when auth is implemented)
    type: 'string',                  // Inquiry type (general, product, service, property)
    category: 'string',              // Inquiry category
    subject: 'string',               // Inquiry subject
    message: 'string',               // Inquiry message
    contact: {                       // Contact information
      name: 'string',
      email: 'string',
      phone: 'string'
    },
    status: 'string',                // pending, responded, resolved
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  };

  /**
   * EXPORT SCHEMAS FOR FUTURE USE
   * These can be used when Firebase is integrated
   */
  window.FurnostylesDataSchemas = {
    Product: ProductSchema,
    Service: ServiceSchema,
    Property: PropertySchema,
    Vendor: VendorSchema,
    SourcingRequest: SourcingRequestSchema,
    Consultation: ConsultationSchema,
    Inquiry: InquirySchema
  };

  /**
   * VALIDATION HELPER (Future Use)
   * This will be used when Firebase is integrated to validate data
   */
  window.FurnostylesDataValidator = {
    validate: function (data, schema) {
      // Future implementation: Validate data against schema
      // This will be implemented when Firebase is integrated
      console.log('Data validation will be implemented when Firebase is integrated');
      return true;
    }
  };

}());
