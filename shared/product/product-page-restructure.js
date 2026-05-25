/**
 * FURNOSTYLES — PRODUCT PAGE RESTRUCTURE
 * ======================================
 * File: shared/product/product-page-restructure.js
 * Purpose: Product page restructure architecture for products first, then seller/supplier,
 *          connecting to related products, repairs, installation services, consultation,
 *          imported alternatives, secondhand alternatives, and upgrades.
 */

(function () {
  'use strict';

  /**
   * PRODUCTS FIRST STRATEGY
   * Prioritize products on product pages
   */
  var ProductsFirstStrategy = {
    layout: {
      primary: 'product-primary-focus',
      secondary: 'ecosystem-secondary',
      hierarchy: 'product-details-then-ecosystem'
    },
    presentation: {
      gallery: 'product-gallery-primary',
      details: 'product-details-prominent',
      ecosystem: 'ecosystem-options-below-fold'
    }
  };

  /**
   * SELLER/SUPPLIER REVEAL STRATEGY
   * Reveal seller/supplier after product focus
   */
  var SellerSupplierRevealStrategy = {
    positioning: {
      secondary: 'secondary-to-product',
      disclosure: 'transparent-but-not-prominent',
      trust: 'furnostyles-vetted-badge'
    },
    display: {
      name: 'supplier-name-secondary',
      location: 'supplier-location',
      rating: 'supplier-rating',
      verification: 'verification-status',
      furnostyles: 'furnostyles-guarantee-prominent'
    }
  };

  /**
   * RELATED PRODUCTS CONNECTION STRATEGY
   */
  var RelatedProductsConnectionStrategy = {
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
    },
    display: {
      section: 'related-products-section',
      comparison: 'product-comparison',
      pricing: 'price-comparison',
      quality: 'quality-indicators'
    }
  };

  /**
   * REPAIRS CONNECTION STRATEGY
   */
  var RepairsConnectionStrategy = {
    services: {
      installation: 'installation-services',
      repair: 'repair-services',
      maintenance: 'maintenance-services',
      restoration: 'restoration-services'
    },
    integration: {
      product: 'product-specific-repairs',
      materials: 'repair-material-supply',
      artisans: 'repair-artisan-coordination'
    },
    display: {
      section: 'repair-services-section',
      types: 'repair-types',
      pricing: 'repair-pricing',
      scheduling: 'repair-scheduling'
    }
  };

  /**
   * INSTALLATION SERVICES CONNECTION STRATEGY
   */
  var InstallationServicesConnectionStrategy = {
    services: {
      professional: 'professional-installation',
      diy: 'diy-installation-guides',
      consultation: 'installation-consultation'
    },
    integration: {
      materials: 'installation-material-supply',
      artisans: 'installation-artisan-coordination',
      scheduling: 'installation-scheduling'
    },
    display: {
      section: 'installation-services-section',
      pricing: 'installation-pricing',
      booking: 'installation-booking',
      timeline: 'installation-timeline'
    }
  };

  /**
   * CONSULTATION CONNECTION STRATEGY
   */
  var ConsultationConnectionStrategy = {
    services: {
      product: 'product-consultation',
      design: 'design-consultation',
      project: 'project-consultation',
      sourcing: 'sourcing-consultation'
    },
    integration: {
      experts: 'expert-consultation',
      booking: 'consultation-booking',
      followUp: 'consultation-follow-up'
    },
    display: {
      section: 'consultation-services-section',
      experts: 'expert-profiles',
      booking: 'consultation-booking-cta',
      value: 'consultation-value-proposition'
    }
  };

  /**
   * IMPORTED ALTERNATIVES CONNECTION STRATEGY
   */
  var ImportedAlternativesConnectionStrategy = {
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
    },
    sourcing: {
      global: 'global-sourcing',
      quality: 'quality-controlled',
      logistics: 'furnostyles-managed'
    }
  };

  /**
   * SECONDHAND ALTERNATIVES CONNECTION STRATEGY
   */
  var SecondhandAlternativesConnectionStrategy = {
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
    },
    community: {
      sellers: 'seller-profiles',
      reviews: 'seller-reviews',
      trust: 'trust-indicators'
    }
  };

  /**
   * RECOMMENDED UPGRADES CONNECTION STRATEGY
   */
  var RecommendedUpgradesConnectionStrategy = {
    types: {
      product: 'product-upgrades',
      accessories: 'accessory-upgrades',
      materials: 'material-upgrades',
      services: 'service-upgrades'
    },
    display: {
      section: 'recommended-upgrades-section',
      comparison: 'upgrade-comparison',
      value: 'upgrade-value-proposition',
      pricing: 'upgrade-pricing'
    },
    integration: {
      sourcing: 'upgrade-sourcing',
      installation: 'upgrade-installation',
      consultation: 'upgrade-consultation'
    }
  };

  /**
   * PRODUCT PAGE ECOSYSTEM HOOK STRATEGY
   * Hook users back into the ecosystem
   */
  var ProductPageEcosystemHookStrategy = {
    hooks: {
      services: 'service-recommendations',
      materials: 'material-suggestions',
      consultations: 'consultation-ctas',
      projects: 'project-service-ctas',
      repairs: 'repair-service-ctas'
    },
    placement: {
      strategic: 'strategic-hook-placement',
      contextual: 'contextually-relevant',
      actionable: 'actionable-ctas'
    },
    customerJourney: {
      product: 'product-discovery',
      details: 'product-details',
      ecosystem: 'ecosystem-exploration',
      conversion: 'service-conversion'
    }
  };

  /**
   * PRODUCT PAGE TRUST STRATEGY
   */
  var ProductPageTrustStrategy = {
    furnostyles: {
      guarantee: 'furnostyles-guarantee-prominent',
      vetting: 'furnostyles-vetting-indicated',
      quality: 'furnostyles-quality-standards'
    },
    supplier: {
      verification: 'supplier-verification',
      rating: 'supplier-rating',
      history: 'supplier-history'
    },
    product: {
      quality: 'quality-indicators',
      authenticity: 'authenticity-guarantee',
      warranty: 'warranty-information'
    }
  };

  /**
   * PRODUCT PAGE MOBILE STRATEGY
   */
  var ProductPageMobileStrategy = {
    layout: {
      responsive: 'mobile-responsive-layout',
      simplified: 'simplified-mobile-view',
      prioritized: 'priority-information-first'
    },
    interactions: {
      quick: 'quick-actions',
      swipe: 'swipe-navigation',
      tap: 'tap-to-expand'
    },
    ecosystem: {
      accessible: 'ecosystem-options-accessible',
      collapsible: 'collapsible-ecosystem-sections',
      progressive: 'progressive-disclosure'
    }
  };

  /**
   * EXPORT PRODUCT PAGE RESTRUCTURE
   */
  window.FurnostylesProductPageRestructure = {
    ProductsFirstStrategy: ProductsFirstStrategy,
    SellerSupplierRevealStrategy: SellerSupplierRevealStrategy,
    RelatedProductsConnectionStrategy: RelatedProductsConnectionStrategy,
    RepairsConnectionStrategy: RepairsConnectionStrategy,
    InstallationServicesConnectionStrategy: InstallationServicesConnectionStrategy,
    ConsultationConnectionStrategy: ConsultationConnectionStrategy,
    ImportedAlternativesConnectionStrategy: ImportedAlternativesConnectionStrategy,
    SecondhandAlternativesConnectionStrategy: SecondhandAlternativesConnectionStrategy,
    RecommendedUpgradesConnectionStrategy: RecommendedUpgradesConnectionStrategy,
    ProductPageEcosystemHookStrategy: ProductPageEcosystemHookStrategy,
    ProductPageTrustStrategy: ProductPageTrustStrategy,
    ProductPageMobileStrategy: ProductPageMobileStrategy
  };

}());
