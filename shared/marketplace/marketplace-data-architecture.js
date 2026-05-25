/**
 * FURNOSTYLES — MARKETPLACE DATA ARCHITECTURE
 * ============================================
 * File: shared/marketplace/marketplace-data-architecture.js
 * Purpose: Centralized marketplace data architecture for products, services,
 *          properties, vendors, sourcing requests, categories, and featured collections.
 * 
 * This file DOES NOT implement marketplace data systems.
 * It only defines the strategy and structure for future marketplace data systems.
 * 
 * Load order: After marketplace-init.js
 * 
 * Usage: This strategy will be used when marketplace data systems are implemented
 */

(function () {
  'use strict';

  /**
   * PRODUCT DATA STRUCTURE
   * Centralized product data structure
   */
  var ProductDataStructure = {
    id: 'string',
    title: 'string',
    description: 'string',
    category: 'string',
    subcategory: 'string',
    vendorId: 'string',
    pricing: {
      price: 'number',
      currency: 'string',
      discountPrice: 'number',
      discountPercent: 'number'
    },
    availability: {
      status: 'string',
      quantity: 'number',
      stockLocation: 'string'
    },
    media: {
      images: 'array',
      videos: 'array',
      documents: 'array'
    },
    specifications: 'object',
    badges: 'array',
    featured: 'boolean',
    status: 'string',
    seo: {
      slug: 'string',
      metaTitle: 'string',
      metaDescription: 'string',
      keywords: 'array'
    },
    timestamps: {
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
      featuredAt: 'timestamp'
    }
  };

  /**
   * SERVICE DATA STRUCTURE
   * Centralized service data structure
   */
  var ServiceDataStructure = {
    id: 'string',
    title: 'string',
    description: 'string',
    category: 'string',
    subcategory: 'string',
    providerId: 'string',
    pricing: {
      basePrice: 'number',
      currency: 'string',
      pricingModel: 'string',
      hourlyRate: 'number',
      projectRate: 'number'
    },
    availability: {
      status: 'string',
      availabilitySchedule: 'object'
    },
    media: {
      images: 'array',
      videos: 'array',
      portfolio: 'array'
    },
    specifications: 'object',
    serviceArea: 'object',
    badges: 'array',
    featured: 'boolean',
    status: 'string',
    rating: 'number',
    reviewCount: 'number',
    seo: {
      slug: 'string',
      metaTitle: 'string',
      metaDescription: 'string',
      keywords: 'array'
    },
    timestamps: {
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
      featuredAt: 'timestamp'
    }
  };

  /**
   * PROPERTY DATA STRUCTURE
   * Centralized property data structure
   */
  var PropertyDataStructure = {
    id: 'string',
    title: 'string',
    description: 'string',
    type: 'string',
    category: 'string',
    ownerId: 'string',
    agentId: 'string',
    pricing: {
      price: 'number',
      currency: 'string',
      pricingType: 'string',
      rentPrice: 'number',
      rentPeriod: 'string'
    },
    location: {
      address: 'string',
      city: 'string',
      region: 'string',
      country: 'string',
      coordinates: 'object'
    },
    specifications: {
      bedrooms: 'number',
      bathrooms: 'number',
      area: 'number',
      areaUnit: 'string',
      yearBuilt: 'number',
      amenities: 'array'
    },
    media: {
      images: 'array',
      videos: 'array',
      virtualTour: 'string'
    },
    badges: 'array',
    featured: 'boolean',
    status: 'string',
    views: 'number',
    seo: {
      slug: 'string',
      metaTitle: 'string',
      metaDescription: 'string',
      keywords: 'array'
    },
    timestamps: {
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
      featuredAt: 'timestamp'
    }
  };

  /**
   * VENDOR DATA STRUCTURE
   * Centralized vendor data structure
   */
  var VendorDataStructure = {
    id: 'string',
    name: 'string',
    type: 'string',
    description: 'string',
    contact: {
      email: 'string',
      phone: 'string',
      website: 'string'
    },
    location: {
      address: 'string',
      city: 'string',
      region: 'string',
      country: 'string'
    },
    verification: {
      status: 'string',
      verifiedAt: 'timestamp',
      documents: 'array'
    },
    rating: {
      average: 'number',
      totalReviews: 'number'
    },
    statistics: {
      totalProducts: 'number',
      totalServices: 'number',
      totalSales: 'number'
    },
    media: {
      logo: 'string',
      banner: 'string',
      images: 'array'
    },
    status: 'string',
    seo: {
      slug: 'string',
      metaTitle: 'string',
      metaDescription: 'string'
    },
    timestamps: {
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    }
  };

  /**
   * SOURCING REQUEST DATA STRUCTURE
   * Centralized sourcing request data structure
   */
  var SourcingRequestDataStructure = {
    id: 'string',
    category: 'string',
    description: 'string',
    specifications: 'object',
    budget: {
      min: 'number',
      max: 'number',
      currency: 'string'
    },
    timeline: {
      startDate: 'timestamp',
      endDate: 'timestamp',
      urgency: 'string'
    },
    userId: 'string',
    vendorId: 'string',
    status: 'string',
    responses: 'array',
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  };

  /**
   * CATEGORY DATA STRUCTURE
   * Centralized category data structure
   */
  var CategoryDataStructure = {
    id: 'string',
    name: 'string',
    slug: 'string',
    type: 'string',
    parentId: 'string',
    level: 'number',
    order: 'number',
    icon: 'string',
    image: 'string',
    description: 'string',
    specifications: 'object',
    filters: 'array',
    seo: {
      metaTitle: 'string',
      metaDescription: 'string',
      keywords: 'array'
    },
    status: 'string',
    timestamps: {
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    }
  };

  /**
   * FEATURED COLLECTION DATA STRUCTURE
   * Centralized featured collection data structure
   */
  var FeaturedCollectionDataStructure = {
    id: 'string',
    title: 'string',
    description: 'string',
    type: 'string',
    items: 'array',
    layout: 'string',
    displayOptions: 'object',
    startDate: 'timestamp',
    endDate: 'timestamp',
    active: 'boolean',
    priority: 'number',
    seo: {
      slug: 'string',
      metaTitle: 'string',
      metaDescription: 'string'
    },
    timestamps: {
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    }
  };

  /**
   * EXPORT MARKETPLACE DATA ARCHITECTURE
   */
  window.FurnostylesMarketplaceDataArchitecture = {
    ProductDataStructure: ProductDataStructure,
    ServiceDataStructure: ServiceDataStructure,
    PropertyDataStructure: PropertyDataStructure,
    VendorDataStructure: VendorDataStructure,
    SourcingRequestDataStructure: SourcingRequestDataStructure,
    CategoryDataStructure: CategoryDataStructure,
    FeaturedCollectionDataStructure: FeaturedCollectionDataStructure
  };

}());
