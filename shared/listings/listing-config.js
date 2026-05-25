/**
 * Furnostyles Listing Config
 * Central constants for all listing types, Firestore collections, and statuses.
 */

(function () {
  'use strict';

  window.FurnostylesListingConfig = {

    /* Firestore collection names */
    COLLECTIONS: {
      LISTINGS:        'listings',
      PROPERTIES:      'properties',
      REPAIR_PROJECTS: 'repairProjects'
    },

    /* Listing lifecycle statuses */
    STATUS: {
      PENDING:  'pending',
      ACTIVE:   'active',
      REJECTED: 'rejected',
      ARCHIVED: 'archived',
      DRAFT:    'draft'
    },

    /* Listing sub-types (stored in listingType field) */
    LISTING_TYPES: {
      PRODUCT:    'product',
      FURNITURE:  'furniture',
      SECONDHAND: 'secondhand',
      SOURCING:   'sourcing',
      MATERIAL:   'material',
      APPLIANCE:  'appliance',
      DECOR:      'decor',
      OTHER:      'other'
    },

    /* Property sub-types */
    PROPERTY_TYPES: {
      APARTMENT:   'apartment',
      HOUSE:       'house',
      VILLA:       'villa',
      TOWNHOUSE:   'townhouse',
      COMMERCIAL:  'commercial',
      OFFICE:      'office',
      LAND:        'land',
      WAREHOUSE:   'warehouse'
    },

    /* Property listing modes */
    PROPERTY_LISTING_MODES: {
      SALE:    'sale',
      RENT:    'rent',
      AIRBNB:  'airbnb',
      LEASE:   'lease'
    },

    /* Seller types */
    SELLER_TYPES: {
      INDIVIDUAL:   'individual',
      VENDOR:       'vendor',
      MANUFACTURER: 'manufacturer',
      ARTISAN:      'artisan',
      IMPORTER:     'importer'
    },

    /* Repair job types */
    REPAIR_TYPES: {
      FURNITURE_REPAIR: 'furniture_repair',
      PLUMBING:         'plumbing',
      ELECTRICAL:       'electrical',
      PAINTING:         'painting',
      GYPSUM_CEILING:   'gypsum_ceiling',
      FLOORING:         'flooring',
      ROOFING:          'roofing',
      WELDING:          'welding',
      UPHOLSTERY:       'upholstery',
      RENOVATION:       'renovation',
      APPLIANCE:        'appliance',
      OTHER:            'other'
    },

    /* Minimum images required for any listing */
    MIN_IMAGES: 3,

    /* Image sources tracking */
    IMAGE_SOURCES: {
      FILE: 'file',
      URL:  'url'
    }
  };

}());
