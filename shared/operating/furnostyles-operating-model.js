/**
 * FURNOSTYLES — FURNOSTYLES OPERATING MODEL
 * =========================================
 * File: shared/operating/furnostyles-operating-model.js
 * Purpose: Furnostyles operating model architecture defining how customers,
 *          vendors, artisans, contractors, suppliers, sourcing partners,
 *          property owners, and project clients operate within the ecosystem,
 *          with Furnostyles at the center.
 */

(function () {
  'use strict';

  /**
   * FURNOSTYLES CENTRAL POSITIONING
   * How Furnostyles sits at the center of the ecosystem
   */
  var FurnostylesCentralPositioning = {
    role: {
      coordinator: 'ecosystem-coordinator',
      trustLayer: 'trust-layer-provider',
      ecosystemOwner: 'ecosystem-owner',
      recommendationEngine: 'recommendation-engine',
      serviceAuthority: 'service-authority',
      sourcingAuthority: 'sourcing-authority',
      projectAuthority: 'project-authority'
    },
    positioning: {
      central: 'central-ecosystem-hub',
      primary: 'primary-customer-interface',
      authority: 'quality-and-trust-authority',
      orchestrator: 'ecosystem-orchestrator'
    },
    philosophy: {
      customerFirst: 'customer-first-philosophy',
      qualityControl: 'quality-control-authority',
      ecosystemIntegration: 'deep-ecosystem-integration',
      longTerm: 'long-term-relationship-focus'
    }
  };

  /**
   * CUSTOMER OPERATING MODEL
   * How customers operate within the ecosystem
   */
  var CustomerOperatingModel = {
    relationship: {
      primary: 'primary-relationship-with-furnostyles',
      direct: 'direct-furnostyles-interface',
      trusted: 'trust-furnostyles-not-individual-providers'
    },
    journey: {
      discovery: 'discover-through-furnostyles',
      engagement: 'engage-with-furnostyles-ecosystem',
      transaction: 'transact-through-furnostyles',
      support: 'support-from-furnostyles'
    },
    experience: {
      coordinated: 'coordinated-ecosystem-experience',
      trusted: 'trusted-furnostyles-guarantee',
      intelligent: 'intelligent-recommendations',
      project: 'project-focused-guidance'
    }
  };

  /**
   * VENDOR OPERATING MODEL
   * How vendors operate within the ecosystem
   */
  var VendorOperatingModel = {
    relationship: {
      secondary: 'secondary-to-furnostyles',
      vetted: 'vetted-by-furnostyles',
      managed: 'managed-by-furnostyles'
    },
    operations: {
      listing: 'list-products-through-furnostyles',
      fulfillment: 'fulfill-through-furnostyles-coordination',
      support: 'support-through-furnostyles',
      payment: 'receive-payment-through-furnostyles'
    },
    authority: {
      quality: 'furnostyles-quality-standards',
      branding: 'furnostyles-branding-primary',
      customer: 'customer-belongs-to-furnostyles'
    }
  };

  /**
   * ARTISAN OPERATING MODEL
   * How artisans operate within the ecosystem
   */
  var ArtisanOperatingModel = {
    relationship: {
      secondary: 'secondary-to-furnostyles',
      vetted: 'vetted-by-furnostyles',
      routed: 'routed-by-furnostyles'
    },
    operations: {
      availability: 'set-availability-through-furnostyles',
      routing: 'receive-jobs-through-furnostyles',
      execution: 'execute-with-furnostyles-standards',
      payment: 'receive-payment-through-furnostyles'
    },
    authority: {
      quality: 'furnostyles-quality-control',
      ratings: 'furnostyles-rating-system',
      guarantee: 'furnostyles-service-guarantee'
    }
  };

  /**
   * CONTRACTOR OPERATING MODEL
   * How contractors operate within the ecosystem
   */
  var ContractorOperatingModel = {
    relationship: {
      secondary: 'secondary-to-furnostyles',
      vetted: 'vetted-by-furnostyles',
      coordinated: 'coordinated-by-furnostyles'
    },
    operations: {
      projects: 'receive-projects-through-furnostyles',
      teams: 'manage-teams-with-furnostyles-standards',
      execution: 'execute-with-furnostyles-coordination',
      payment: 'receive-payment-through-furnostyles'
    },
    authority: {
      quality: 'furnostyles-quality-standards',
      project: 'furnostyles-project-coordination',
      guarantee: 'furnostyles-project-guarantee'
    }
  };

  /**
   * SUPPLIER OPERATING MODEL
   * How suppliers operate within the ecosystem
   */
  var SupplierOperatingModel = {
    relationship: {
      secondary: 'secondary-to-furnostyles',
      vetted: 'vetted-by-furnostyles',
      managed: 'managed-by-furnostyles'
    },
    operations: {
      products: 'supply-products-through-furnostyles',
      quality: 'meet-furnostyles-quality-standards',
      logistics: 'coordinate-logistics-with-furnostyles',
      payment: 'receive-payment-through-furnostyles'
    },
    authority: {
      quality: 'furnostyles-quality-gate',
      sourcing: 'furnostyles-sourcing-authority',
      customer: 'customer-interface-through-furnostyles'
    }
  };

  /**
   * SOURCING PARTNER OPERATING MODEL
   * How sourcing partners operate within the ecosystem
   */
  var SourcingPartnerOperatingModel = {
    relationship: {
      secondary: 'secondary-to-furnostyles',
      vetted: 'vetted-by-furnostyles',
      coordinated: 'coordinated-by-furnostyles'
    },
    operations: {
      sourcing: 'source-through-furnostyles-guidance',
      quality: 'meet-furnostyles-quality-standards',
      logistics: 'coordinate-with-furnostyles',
      payment: 'receive-payment-through-furnostyles'
    },
    authority: {
      sourcing: 'furnostyles-sourcing-authority',
      quality: 'furnostyles-quality-control',
      customer: 'customer-experience-by-furnostyles'
    }
  };

  /**
   * PROPERTY OWNER OPERATING MODEL
   * How property owners operate within the ecosystem
   */
  var PropertyOwnerOperatingModel = {
    relationship: {
      primary: 'primary-relationship-with-furnostyles',
      direct: 'direct-furnostyles-interface',
      longTerm: 'long-term-relationship-focus'
    },
    operations: {
      management: 'manage-through-furnostyles',
      maintenance: 'maintain-through-furnostyles',
      upgrades: 'upgrade-through-furnostyles',
      investment: 'invest-through-furnostyles'
    },
    experience: {
      coordinated: 'coordinated-property-ecosystem',
      trusted: 'trusted-furnostyles-property-authority',
      intelligent: 'intelligent-property-recommendations',
      longTerm: 'long-term-property-partnership'
    }
  };

  /**
   * PROJECT CLIENT OPERATING MODEL
   * How project clients operate within the ecosystem
   */
  var ProjectClientOperatingModel = {
    relationship: {
      primary: 'primary-relationship-with-furnostyles',
      direct: 'direct-furnostyles-interface',
      guided: 'guided-by-furnostyles'
    },
    operations: {
      consultation: 'consult-through-furnostyles',
      planning: 'plan-with-furnostyles',
      execution: 'execute-with-furnostyles-coordination',
      support: 'supported-by-furnostyles'
    },
    experience: {
      coordinated: 'coordinated-project-experience',
      trusted: 'trusted-furnostyles-project-authority',
      intelligent: 'intelligent-project-guidance',
      complete: 'complete-project-partnership'
    }
  };

  /**
   * ECOSYSTEM OPERATING PHILOSOPHY
   */
  var EcosystemOperatingPhilosophy = {
    central: {
      furnostyles: 'furnostyles-at-center',
      authority: 'furnostyles-as-authority',
      coordinator: 'furnostyles-as-coordinator'
    },
    trust: {
      guarantee: 'furnostyles-guarantees-quality',
      vetting: 'furnostyles-vets-all-providers',
      control: 'furnostyles-controls-experience'
    },
    integration: {
      deep: 'deep-ecosystem-integration',
      intelligent: 'intelligent-ecosystem-connections',
      coordinated: 'coordinated-ecosystem-operations'
    },
    longTerm: {
      relationship: 'long-term-relationship-focus',
      retention: 'ecosystem-retention-strategy',
      growth: 'ecosystem-growth-opportunities'
    }
  };

  /**
   * EXPORT FURNOSTYLES OPERATING MODEL
   */
  window.FurnostylesOperatingModel = {
    FurnostylesCentralPositioning: FurnostylesCentralPositioning,
    CustomerOperatingModel: CustomerOperatingModel,
    VendorOperatingModel: VendorOperatingModel,
    ArtisanOperatingModel: ArtisanOperatingModel,
    ContractorOperatingModel: ContractorOperatingModel,
    SupplierOperatingModel: SupplierOperatingModel,
    SourcingPartnerOperatingModel: SourcingPartnerOperatingModel,
    PropertyOwnerOperatingModel: PropertyOwnerOperatingModel,
    ProjectClientOperatingModel: ProjectClientOperatingModel,
    EcosystemOperatingPhilosophy: EcosystemOperatingPhilosophy
  };

}());
