/**
 * FURNOSTYLES — CUSTOMER LIFECYCLE ECOSYSTEM
 * ==========================================
 * File: shared/lifecycle/customer-lifecycle-ecosystem.js
 * Purpose: Customer lifecycle ecosystem architecture for discover blog, discover product,
 *          request consultation, buy materials, request installer, request project support,
 *          request maintenance, request sourcing, and return for upgrades.
 */

(function () {
  'use strict';

  /**
   * DISCOVER BLOG STAGE
   */
  var DiscoverBlogStage = {
    entry: {
      seo: 'seo-driven-discovery',
      social: 'social-media-discovery',
      referral: 'referral-discovery'
    },
    engagement: {
      reading: 'blog-article-reading',
      exploration: 'ecosystem-exploration',
      education: 'education-consumption'
    },
    conversion: {
      consultation: 'blog-to-consultation-cta',
      product: 'blog-to-product-cta',
      service: 'blog-to-service-cta'
    }
  };

  /**
   * DISCOVER PRODUCT STAGE
   */
  var DiscoverProductStage = {
    entry: {
      search: 'product-search-discovery',
      category: 'category-browsing',
      recommendation: 'recommendation-discovery'
    },
    engagement: {
      viewing: 'product-detail-viewing',
      comparison: 'product-comparison',
      research: 'product-research'
    },
    conversion: {
      purchase: 'product-purchase',
      consultation: 'product-to-consultation-cta',
      service: 'product-to-service-cta'
    }
  };

  /**
   * REQUEST CONSULTATION STAGE
   */
  var RequestConsultationStage = {
    entry: {
      blog: 'blog-to-consultation',
      product: 'product-to-consultation',
      direct: 'direct-consultation-request'
    },
    process: {
      booking: 'consultation-booking',
      preparation: 'consultation-preparation',
      execution: 'consultation-execution'
    },
    conversion: {
      project: 'consultation-to-project',
      purchase: 'consultation-to-purchase',
      service: 'consultation-to-service'
    }
  };

  /**
   * BUY MATERIALS STAGE
   */
  var BuyMaterialsStage = {
    entry: {
      project: 'project-to-materials',
      diy: 'diy-to-materials',
      recommendation: 'recommendation-to-materials'
    },
    process: {
      selection: 'material-selection',
      purchase: 'material-purchase',
      delivery: 'material-delivery'
    },
    conversion: {
      service: 'materials-to-service',
      project: 'materials-to-project',
      upgrade: 'materials-to-upgrade'
    }
  };

  /**
   * REQUEST INSTALLER STAGE
   */
  var RequestInstallerStage = {
    entry: {
      product: 'product-to-installer',
      materials: 'materials-to-installer',
      diy: 'diy-to-installer'
    },
    process: {
      request: 'installer-request',
      routing: 'artisan-routing',
      scheduling: 'installation-scheduling'
    },
    conversion: {
      service: 'installer-to-service',
      project: 'installer-to-project',
      maintenance: 'installer-to-maintenance'
    }
  };

  /**
   * REQUEST PROJECT SUPPORT STAGE
   */
  var RequestProjectSupportStage = {
    entry: {
      consultation: 'consultation-to-project',
      property: 'property-to-project',
      upgrade: 'upgrade-to-project'
    },
    process: {
      planning: 'project-planning',
      coordination: 'project-coordination',
      execution: 'project-execution'
    },
    conversion: {
      materials: 'project-to-materials',
      services: 'project-to-services',
      maintenance: 'project-to-maintenance'
    }
  };

  /**
   * REQUEST MAINTENANCE STAGE
   */
  var RequestMaintenanceStage = {
    entry: {
      property: 'property-to-maintenance',
      project: 'project-to-maintenance',
      seasonal: 'seasonal-to-maintenance'
    },
    process: {
      scheduling: 'maintenance-scheduling',
      execution: 'maintenance-execution',
      monitoring: 'maintenance-monitoring'
    },
    conversion: {
      upgrade: 'maintenance-to-upgrade',
      renovation: 'maintenance-to-renovation',
      contract: 'maintenance-to-contract'
    }
  };

  /**
   * REQUEST SOURCING STAGE
   */
  var RequestSourcingStage = {
    entry: {
      product: 'product-to-sourcing',
      project: 'project-to-sourcing',
      custom: 'custom-sourcing-request'
    },
    process: {
      consultation: 'sourcing-consultation',
      search: 'supplier-search',
      vetting: 'supplier-vetting'
    },
    conversion: {
      purchase: 'sourcing-to-purchase',
      partnership: 'sourcing-to-partnership',
      import: 'sourcing-to-import'
    }
  };

  /**
   * RETURN FOR UPGRADES STAGE
   */
  var ReturnForUpgradesStage = {
    entry: {
      purchase: 'purchase-to-upgrade',
      project: 'project-to-upgrade',
      maintenance: 'maintenance-to-upgrade'
    },
    process: {
      assessment: 'upgrade-assessment',
      recommendation: 'upgrade-recommendation',
      planning: 'upgrade-planning'
    },
    conversion: {
      purchase: 'upgrade-to-purchase',
      service: 'upgrade-to-service',
      project: 'upgrade-to-project'
    }
  };

  /**
   * CUSTOMER LIFECYCLE JOURNEY STRUCTURE
   */
  var CustomerLifecycleJourneyStructure = {
    discovery: {
      blog: 'discover-blog-stage',
      product: 'discover-product-stage',
      consultation: 'request-consultation-stage'
    },
    engagement: {
      materials: 'buy-materials-stage',
      installer: 'request-installer-stage',
      project: 'request-project-support-stage'
    },
    retention: {
      maintenance: 'request-maintenance-stage',
      sourcing: 'request-sourcing-stage',
      upgrade: 'return-for-upgrades-stage'
    }
  };

  /**
   * LIFECYCLE ECOSYSTEM INTEGRATION STRUCTURE
   */
  var LifecycleEcosystemIntegrationStructure = {
    blog: {
      products: 'blog-to-product-connection',
      services: 'blog-to-service-connection',
      consultations: 'blog-to-consultation-connection'
    },
    product: {
      services: 'product-to-service-connection',
      consultations: 'product-to-consultation-connection',
      projects: 'product-to-project-connection'
    },
    consultation: {
      projects: 'consultation-to-project-connection',
      materials: 'consultation-to-materials-connection',
      services: 'consultation-to-service-connection'
    },
    materials: {
      services: 'materials-to-service-connection',
      projects: 'materials-to-project-connection',
      upgrades: 'materials-to-upgrade-connection'
    }
  };

  /**
   * LONG-TERM RETENTION STRATEGY
   */
  var LongTermRetentionStrategy = {
    engagement: {
      ongoing: 'ongoing-ecosystem-engagement',
      value: 'continuous-value-delivery',
      relationship: 'long-term-relationship-building'
    },
    ecosystem: {
      cross: 'cross-ecosystem-engagement',
      intelligent: 'intelligent-ecosystem-recommendations',
      coordinated: 'coordinated-ecosystem-experience'
    },
    loyalty: {
      rewards: 'ecosystem-loyalty-rewards',
      benefits: 'long-term-customer-benefits',
      recognition: 'customer-recognition'
    }
  };

  /**
   * EXPORT CUSTOMER LIFECYCLE ECOSYSTEM
   */
  window.FurnostylesCustomerLifecycleEcosystem = {
    DiscoverBlogStage: DiscoverBlogStage,
    DiscoverProductStage: DiscoverProductStage,
    RequestConsultationStage: RequestConsultationStage,
    BuyMaterialsStage: BuyMaterialsStage,
    RequestInstallerStage: RequestInstallerStage,
    RequestProjectSupportStage: RequestProjectSupportStage,
    RequestMaintenanceStage: RequestMaintenanceStage,
    RequestSourcingStage: RequestSourcingStage,
    ReturnForUpgradesStage: ReturnForUpgradesStage,
    CustomerLifecycleJourneyStructure: CustomerLifecycleJourneyStructure,
    LifecycleEcosystemIntegrationStructure: LifecycleEcosystemIntegrationStructure,
    LongTermRetentionStrategy: LongTermRetentionStrategy
  };

}());
