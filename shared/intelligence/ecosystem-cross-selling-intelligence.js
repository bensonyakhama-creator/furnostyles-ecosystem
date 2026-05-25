/**
 * FURNOSTYLES — ECOSYSTEM CROSS-SELLING INTELLIGENCE
 * ===================================================
 * File: shared/intelligence/ecosystem-cross-selling-intelligence.js
 * Purpose: Ecosystem cross-selling intelligence architecture where products trigger services,
 *          services trigger sourcing, sourcing triggers projects, properties trigger upgrades,
 *          repairs trigger maintenance, and consultations trigger ecosystem journeys.
 */

(function () {
  'use strict';

  /**
   * PRODUCTS TRIGGER SERVICES INTELLIGENCE
   */
  var ProductsTriggerServicesIntelligence = {
    triggers: {
      purchase: 'product-purchase-trigger',
      browsing: 'product-browsing-trigger',
      cart: 'add-to-cart-trigger'
    },
    logic: {
      category: 'category-based-service-matching',
      complexity: 'complexity-based-service-suggestion',
      diy: 'diy-assessment-and-professional-alternative'
    },
    examples: {
      tiles: 'buy-tiles-recommends-installer',
      furniture: 'buy-furniture-recommends-delivery-setup',
      materials: 'buy-materials-recommends-contractor',
      appliances: 'buy-appliances-recommends-installation',
      lighting: 'buy-lighting-recommends-electrician'
    }
  };

  /**
   * SERVICES TRIGGER SOURCING INTELLIGENCE
   */
  var ServicesTriggerSourcingIntelligence = {
    triggers: {
      request: 'service-request-trigger',
      booking: 'service-booking-trigger',
      consultation: 'service-consultation-trigger'
    },
    logic: {
      requirements: 'service-requirement-analysis',
      materials: 'material-requirement-matching',
      tools: 'tool-requirement-matching'
    },
    examples: {
      repair: 'repair-request-recommends-materials-tools',
      renovation: 'renovation-request-recommends-materials',
      installation: 'installation-request-recommends-products',
      maintenance: 'maintenance-request-recommends-supplies'
    }
  };

  /**
   * SOURCING TRIGGERS PROJECTS INTELLIGENCE
   */
  var SourcingTriggersProjectsIntelligence = {
    triggers: {
      request: 'sourcing-request-trigger',
      search: 'sourcing-search-trigger',
      interest: 'sourcing-interest-trigger'
    },
    logic: {
      complexity: 'sourcing-complexity-analysis',
      custom: 'custom-sourcing-need-analysis',
      volume: 'volume-requirement-analysis'
    },
    examples: {
      custom: 'custom-product-request-triggers-project',
      bulk: 'bulk-sourcing-request-triggers-project',
      import: 'import-sourcing-request-triggers-project',
      unique: 'unique-requirement-triggers-project'
    }
  };

  /**
   * PROPERTIES TRIGGER UPGRADES INTELLIGENCE
   */
  var PropertiesTriggerUpgradesIntelligence = {
    triggers: {
      purchase: 'property-purchase-trigger',
      rental: 'property-rental-trigger',
      assessment: 'property-assessment-trigger'
    },
    logic: {
      type: 'property-type-analysis',
      style: 'style-preference-analysis',
      budget: 'budget-consideration-analysis'
    },
    examples: {
      home: 'home-purchase-recommends-upgrades',
      office: 'office-purchase-recommends-upgrades',
      airbnb: 'airbnb-property-recommends-upgrades',
      renovation: 'renovation-project-recommends-upgrades'
    }
  };

  /**
   * REPAIRS TRIGGER MAINTENANCE INTELLIGENCE
   */
  var RepairsTriggerMaintenanceIntelligence = {
    triggers: {
      repair: 'repair-request-trigger',
      assessment: 'repair-assessment-trigger',
      completion: 'repair-completion-trigger'
    },
    logic: {
      age: 'product-age-analysis',
      condition: 'product-condition-analysis',
      value: 'upgrade-value-analysis'
    },
    examples: {
      appliance: 'appliance-repair-recommends-maintenance',
      flooring: 'flooring-repair-recommends-maintenance',
      fixtures: 'fixture-repair-recommends-maintenance',
      systems: 'system-repair-recommends-maintenance'
    }
  };

  /**
   * CONSULTATIONS TRIGGER ECOSYSTEM JOURNEYS INTELLIGENCE
   */
  var ConsultationsTriggerEcosystemJourneysIntelligence = {
    triggers: {
      booking: 'consultation-booking-trigger',
      completion: 'consultation-completion-trigger',
      recommendation: 'consultation-recommendation-trigger'
    },
    logic: {
      scope: 'consultation-scope-analysis',
      potential: 'ecosystem-potential-analysis',
      readiness: 'customer-readiness-analysis'
    },
    examples: {
      interior: 'interior-consultation-triggers-furnishing-journey',
      renovation: 'renovation-consultation-triggers-renovation-journey',
      property: 'property-consultation-triggers-property-journey',
      sourcing: 'sourcing-consultation-triggers-sourcing-journey'
    }
  };

  /**
   * ECOSYSTEM CROSS-SELLING INTEGRATION STRUCTURE
   */
  var EcosystemCrossSellingIntegrationStructure = {
    circular: {
      products: 'products-feed-services-feed-products',
      services: 'services-feed-sourcing-feed-services',
      projects: 'projects-feed-upgrades-feed-projects'
    },
    continuous: {
      engagement: 'continuous-ecosystem-engagement',
      value: 'continuous-value-delivery',
      retention: 'continuous-ecosystem-retention'
    },
    intelligent: {
      contextual: 'contextual-ecosystem-feeding',
      personalized: 'personalized-ecosystem-feeding',
      predictive: 'predictive-ecosystem-feeding'
    }
  };

  /**
   * EXPORT ECOSYSTEM CROSS-SELLING INTELLIGENCE
   */
  window.FurnostylesEcosystemCrossSellingIntelligence = {
    ProductsTriggerServicesIntelligence: ProductsTriggerServicesIntelligence,
    ServicesTriggerSourcingIntelligence: ServicesTriggerSourcingIntelligence,
    SourcingTriggersProjectsIntelligence: SourcingTriggersProjectsIntelligence,
    PropertiesTriggerUpgradesIntelligence: PropertiesTriggerUpgradesIntelligence,
    RepairsTriggerMaintenanceIntelligence: RepairsTriggerMaintenanceIntelligence,
    ConsultationsTriggerEcosystemJourneysIntelligence: ConsultationsTriggerEcosystemJourneysIntelligence,
    EcosystemCrossSellingIntegrationStructure: EcosystemCrossSellingIntegrationStructure
  };

}());
