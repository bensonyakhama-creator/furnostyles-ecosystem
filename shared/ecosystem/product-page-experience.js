/**
 * FURNOSTYLES — PRODUCT PAGE EXPERIENCE ARCHITECTURE
 * ===================================================
 * File: shared/ecosystem/product-page-experience.js
 * Purpose: Central product page experience architecture for products first, then details,
 *          supplier, related products, imported alternatives, secondhand alternatives,
 *          Furnostyles recommendations, services, installation, and repairs.
 */

(function () {
  'use strict';

  /**
   * PRODUCTS FIRST STRUCTURE
   * Product-focused page structure
   */
  var ProductsFirstStructure = {
    layout: {
      primary: 'product-primary-focus',
      secondary: 'ecosystem-secondary',
      hierarchy: 'product-details-then-ecosystem'
    },
    presentation: {
      gallery: 'product-gallery-primary',
      details: 'product-details-prominent',
      ecosystem: 'ecosystem-options-below'
    }
  };

  /**
   * PRODUCT DETAILS STRUCTURE
   * Product information display
   */
  var ProductDetailsStructure = {
    sections: {
      gallery: 'product-image-gallery',
      information: 'product-information',
      specifications: 'product-specifications',
      pricing: 'product-pricing',
      availability: 'product-availability'
    },
    display: {
      clear: 'clear-and-concise',
      comprehensive: 'comprehensive-details',
      visual: 'visual-presentation',
      interactive: 'interactive-experience'
    }
  };

  /**
   * SUPPLIER INFORMATION STRUCTURE
   * Supplier information display (secondary)
   */
  var SupplierInformationStructure = {
    positioning: {
      secondary: 'secondary-to-product',
      disclosure: 'transparent-but-not-prominent',
      trust: 'furnostyles-vetted-badge'
    },
    display: {
      name: 'supplier-name',
      location: 'supplier-location',
      rating: 'supplier-rating',
      verification: 'verification-status'
    }
  };

  /**
   * RELATED PRODUCTS STRUCTURE
   * Related product recommendations
   */
  var RelatedProductsStructure = {
    types: {
      similar: 'similar-products',
      complementary: 'complementary-products',
      upgrades: 'upgrade-options',
      alternatives: 'alternative-products'
    },
    sourcing: {
      furnostyles: 'furnostyles-products-first',
      vendors: 'vetted-vendor-products',
      imports: 'imported-alternatives',
      secondhand: 'secondhand-options'
    }
  };

  /**
   * IMPORTED ALTERNATIVES STRUCTURE
   * Imported product alternatives
   */
  var ImportedAlternativesStructure = {
    display: {
      section: 'imported-alternatives-section',
      comparison: 'product-comparison',
      pricing: 'price-comparison',
      quality: 'quality-indicators'
    },
    positioning: {
      secondary: 'secondary-option',
      transparent: 'transparent-sourcing',
      furnostyles: 'furnostyles-guaranteed'
    }
  };

  /**
   * SECONDHAND ALTERNATIVES STRUCTURE
   * Secondhand product alternatives
   */
  var SecondhandAlternativesStructure = {
    display: {
      section: 'secondhand-alternatives-section',
      condition: 'condition-indicators',
      pricing: 'price-comparison',
      availability: 'availability-status'
    },
    integration: {
      repairs: 'repair-service-suggestions',
      restoration: 'restoration-options',
      inspection: 'inspection-services'
    }
  };

  /**
   * FURNOSTYLES RECOMMENDATIONS STRUCTURE
   * Furnostyles ecosystem recommendations
   */
  var FurnostylesRecommendationsStructure = {
    types: {
      services: 'related-services',
      materials: 'related-materials',
      consultations: 'consultation-services',
      projects: 'project-services'
    },
    display: {
      prominent: 'prominent-display',
      contextual: 'contextually-relevant',
      actionable: 'actionable-recommendations'
    }
  };

  /**
   * SERVICES STRUCTURE
   * Service recommendations
   */
  var ServicesStructure = {
    types: {
      installation: 'installation-services',
      repair: 'repair-services',
      maintenance: 'maintenance-services',
      consultation: 'consultation-services'
    },
    integration: {
      product: 'product-specific-services',
      ecosystem: 'ecosystem-services',
      scheduling: 'service-scheduling'
    }
  };

  /**
   * INSTALLATION SERVICES STRUCTURE
   * Installation service integration
   */
  var InstallationServicesStructure = {
    display: {
      section: 'installation-services-section',
      pricing: 'installation-pricing',
      scheduling: 'scheduling-options',
      artisans: 'artisan-information'
    },
    process: {
      request: 'installation-request',
      routing: 'artisan-routing',
      scheduling: 'installation-scheduling',
      execution: 'installation-execution'
    }
  };

  /**
   * REPAIR SERVICES STRUCTURE
   * Repair service integration
   */
  var RepairServicesStructure = {
    display: {
      section: 'repair-services-section',
      types: 'repair-types',
      pricing: 'repair-pricing',
      scheduling: 'repair-scheduling'
    },
    integration: {
      product: 'product-specific-repairs',
      materials: 'repair-material-supply',
      artisans: 'repair-artisan-coordination'
    }
  };

  /**
   * PRODUCT PAGE ECOSYSTEM HOOK STRUCTURE
   * How product pages hook users back into ecosystem
   */
  var ProductPageEcosystemHookStructure = {
    hooks: {
      services: 'service-recommendations',
      materials: 'material-suggestions',
      consultations: 'consultation-ctas',
      projects: 'project-service-ctas'
    },
    customerJourney: {
      product: 'product-discovery',
      details: 'product-details',
      ecosystem: 'ecosystem-exploration',
      conversion: 'service-conversion'
    }
  };

  /**
   * EXPORT PRODUCT PAGE EXPERIENCE ARCHITECTURE
   */
  window.FurnostylesProductPageExperience = {
    ProductsFirstStructure: ProductsFirstStructure,
    ProductDetailsStructure: ProductDetailsStructure,
    SupplierInformationStructure: SupplierInformationStructure,
    RelatedProductsStructure: RelatedProductsStructure,
    ImportedAlternativesStructure: ImportedAlternativesStructure,
    SecondhandAlternativesStructure: SecondhandAlternativesStructure,
    FurnostylesRecommendationsStructure: FurnostylesRecommendationsStructure,
    ServicesStructure: ServicesStructure,
    InstallationServicesStructure: InstallationServicesStructure,
    RepairServicesStructure: RepairServicesStructure,
    ProductPageEcosystemHookStructure: ProductPageEcosystemHookStructure
  };

}());
