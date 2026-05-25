/**
 * FURNOSTYLES — VENDOR/PRODUCT ARCHITECTURE
 * ============================================
 * File: shared/data/vendor-product-architecture.js
 * Purpose: Centralized data architecture for products, services, properties,
 *          vendors, sourcing requests, and inquiries.
 * 
 * This file DOES NOT implement data operations.
 * It only defines the architecture and structure for future data systems.
 * 
 * Load order: After data-schemas.js
 * 
 * Usage: This architecture will be used when data systems are implemented
 */

(function () {
  'use strict';

  /**
   * VENDOR DATA ARCHITECTURE
   * Centralized vendor data structure and operations
   */
  var VendorDataArchitecture = {
    collection: 'vendors',
    
    documentStructure: {
      basic: {
        vendorId: 'string',
        businessName: 'string',
        displayName: 'string',
        email: 'string',
        phone: 'string',
        whatsapp: 'string',
        type: 'string', // supplier, service-provider, contractor, designer
        categories: ['string'],
        description: 'string'
      },
      
      location: {
        address: 'string',
        city: 'string',
        country: 'string',
        coordinates: {
          lat: 'number',
          lng: 'number'
        }
      },
      
      verification: {
        verified: 'boolean',
        verificationLevel: 'string', // basic, standard, premium, enterprise
        verifiedAt: 'timestamp',
        documents: ['string']
      },
      
      ratings: {
        average: 'number',
        count: 'number',
        breakdown: {
          quality: 'number',
          reliability: 'number',
          communication: 'number',
          pricing: 'number',
          timeliness: 'number'
        }
      },
      
      metadata: {
        featured: 'boolean',
        createdAt: 'timestamp',
        updatedAt: 'timestamp',
        createdBy: 'string',
        status: 'string' // active, suspended, deleted
      }
    },
    
    subcollections: {
      products: 'products',
      services: 'services',
      reviews: 'reviews',
      inquiries: 'inquiries'
    },
    
    indexes: [
      { fields: ['type'] },
      { fields: ['verification.verified'] },
      { fields: ['ratings.average'] },
      { fields: ['featured'] },
      { fields: ['createdAt'] }
    ]
  };

  /**
   * PRODUCT DATA ARCHITECTURE
   * Centralized product data structure and operations
   */
  var ProductDataArchitecture = {
    collection: 'products',
    
    documentStructure: {
      basic: {
        productId: 'string',
        title: 'string',
        description: 'string',
        category: 'string',
        subcategory: 'string',
        price: 'number',
        currency: 'string',
        availability: 'string' // in-stock, out-of-stock, pre-order
      },
      
      specifications: {
        material: 'string',
        dimensions: 'string',
        weight: 'string',
        color: 'string',
        brand: 'string'
      },
      
      images: {
        primary: 'string',
        gallery: ['string']
      },
      
      vendor: {
        vendorId: 'string',
        vendorName: 'string',
        verified: 'boolean'
      },
      
      ratings: {
        average: 'number',
        count: 'number'
      },
      
      metadata: {
        featured: 'boolean',
        views: 'number',
        createdAt: 'timestamp',
        updatedAt: 'timestamp',
        createdBy: 'string',
        status: 'string' // active, inactive, deleted
      }
    },
    
    subcollections: {
      reviews: 'reviews',
      inquiries: 'inquiries'
    },
    
    indexes: [
      { fields: ['vendorId'] },
      { fields: ['category', 'subcategory'] },
      { fields: ['price'] },
      { fields: ['availability'] },
      { fields: ['featured'] },
      { fields: ['ratings.average'] },
      { fields: ['createdAt'] }
    ]
  };

  /**
   * SERVICE DATA ARCHITECTURE
   * Centralized service data structure and operations
   */
  var ServiceDataArchitecture = {
    collection: 'services',
    
    documentStructure: {
      basic: {
        serviceId: 'string',
        title: 'string',
        description: 'string',
        category: 'string',
        subcategory: 'string',
        priceRange: {
          min: 'number',
          max: 'number',
          unit: 'string' // per-hour, per-project
        },
        duration: 'string'
      },
      
      features: ['string'],
      
      images: {
        primary: 'string',
        gallery: ['string']
      },
      
      provider: {
        providerId: 'string',
        providerName: 'string',
        verified: 'boolean'
      },
      
      ratings: {
        average: 'number',
        count: 'number'
      },
      
      metadata: {
        featured: 'boolean',
        views: 'number',
        createdAt: 'timestamp',
        updatedAt: 'timestamp',
        createdBy: 'string',
        status: 'string'
      }
    },
    
    subcollections: {
      reviews: 'reviews',
      inquiries: 'inquiries'
    },
    
    indexes: [
      { fields: ['providerId'] },
      { fields: ['category', 'subcategory'] },
      { fields: ['priceRange.min'] },
      { fields: ['featured'] },
      { fields: ['ratings.average'] },
      { fields: ['createdAt'] }
    ]
  };

  /**
   * PROPERTY DATA ARCHITECTURE
   * Centralized property data structure and operations
   */
  var PropertyDataArchitecture = {
    collection: 'properties',
    
    documentStructure: {
      basic: {
        propertyId: 'string',
        title: 'string',
        description: 'string',
        type: 'string', // apartment, house, land, commercial
        status: 'string', // for-sale, for-rent, sold, rented
        price: 'number',
        currency: 'string'
      },
      
      location: {
        address: 'string',
        city: 'string',
        area: 'string',
        coordinates: {
          lat: 'number',
          lng: 'number'
        }
      },
      
      specifications: {
        bedrooms: 'number',
        bathrooms: 'number',
        size: 'number',
        lotSize: 'number',
        yearBuilt: 'number'
      },
      
      amenities: ['string'],
      
      images: {
        primary: 'string',
        gallery: ['string']
      },
      
      agent: {
        agentId: 'string',
        agentName: 'string',
        verified: 'boolean'
      },
      
      metadata: {
        featured: 'boolean',
        views: 'number',
        createdAt: 'timestamp',
        updatedAt: 'timestamp',
        createdBy: 'string',
        status: 'string'
      }
    },
    
    subcollections: {
      reviews: 'reviews',
      inquiries: 'inquiries'
    },
    
    indexes: [
      { fields: ['agentId'] },
      { fields: ['type'] },
      { fields: ['status'] },
      { fields: ['price'] },
      { fields: ['featured'] },
      { fields: ['createdAt'] }
    ]
  };

  /**
   * SOURCING REQUEST DATA ARCHITECTURE
   * Centralized sourcing request data structure and operations
   */
  var SourcingRequestDataArchitecture = {
    collection: 'sourcing_requests',
    
    documentStructure: {
      basic: {
        requestId: 'string',
        userId: 'string',
        type: 'string', // custom, bulk, dropshipping
        category: 'string',
        description: 'string'
      },
      
      specifications: {
        material: 'string',
        quantity: 'number',
        budget: {
          min: 'number',
          max: 'number',
          currency: 'string'
        },
        timeline: 'string'
      },
      
      status: {
        current: 'string', // pending, in-progress, completed, cancelled
        updatedAt: 'timestamp'
      },
      
      metadata: {
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
      }
    },
    
    subcollections: {
      responses: 'responses'
    },
    
    indexes: [
      { fields: ['userId'] },
      { fields: ['type'] },
      { fields: ['category'] },
      { fields: ['status.current'] },
      { fields: ['createdAt'] }
    ]
  };

  /**
   * INQUIRY DATA ARCHITECTURE
   * Centralized inquiry data structure and operations
   */
  var InquiryDataArchitecture = {
    collection: 'inquiries',
    
    documentStructure: {
      basic: {
        inquiryId: 'string',
        userId: 'string',
        type: 'string', // quote, sourcing, consultation, property, partnership
        category: 'string',
        subject: 'string',
        message: 'string'
      },
      
      contact: {
        name: 'string',
        email: 'string',
        phone: 'string'
      },
      
      related: {
        relatedId: 'string', // product ID, service ID, property ID, vendor ID
        relatedType: 'string'
      },
      
      status: {
        current: 'string', // pending, in-progress, responded, completed, cancelled
        updatedAt: 'timestamp'
      },
      
      response: {
        message: 'string',
        respondedBy: 'string',
        respondedAt: 'timestamp'
      },
      
      metadata: {
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
      }
    },
    
    subcollections: {
      messages: 'messages'
    },
    
    indexes: [
      { fields: ['userId'] },
      { fields: ['type'] },
      { fields: ['status.current'] },
      { fields: ['related.relatedId'] },
      { fields: ['createdAt'] }
    ]
  };

  /**
   * DATA RELATIONSHIP MAP
   * Defines relationships between different data entities
   */
  var DataRelationshipMap = {
    vendor: {
      hasMany: ['products', 'services', 'reviews', 'inquiries'],
      belongsTo: ['users']
    },
    
    product: {
      belongsTo: ['vendors', 'categories'],
      hasMany: ['reviews', 'inquiries']
    },
    
    service: {
      belongsTo: ['providers', 'categories'],
      hasMany: ['reviews', 'inquiries']
    },
    
    property: {
      belongsTo: ['agents', 'categories'],
      hasMany: ['reviews', 'inquiries']
    },
    
    inquiry: {
      belongsTo: ['users', 'vendors'],
      relatedTo: ['products', 'services', 'properties']
    },
    
    sourcingRequest: {
      belongsTo: ['users'],
      hasMany: ['responses']
    }
  };

  /**
   * EXPORT VENDOR/PRODUCT ARCHITECTURE
   */
  window.FurnostylesVendorProductArchitecture = {
    VendorDataArchitecture: VendorDataArchitecture,
    ProductDataArchitecture: ProductDataArchitecture,
    ServiceDataArchitecture: ServiceDataArchitecture,
    PropertyDataArchitecture: PropertyDataArchitecture,
    SourcingRequestDataArchitecture: SourcingRequestDataArchitecture,
    InquiryDataArchitecture: InquiryDataArchitecture,
    DataRelationshipMap: DataRelationshipMap
  };

}());
