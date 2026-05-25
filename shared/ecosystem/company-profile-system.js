/**
 * FURNOSTYLES — COMPANY PROFILE SYSTEM ARCHITECTURE
 * ===================================================
 * File: shared/ecosystem/company-profile-system.js
 * Purpose: Central company profile system architecture defining who we are,
 *          what we do, our ecosystem, expertise, projects, process, and capabilities.
 */

(function () {
  'use strict';

  /**
   * WHO WE ARE STRUCTURE
   * Company identity and mission
   */
  var WhoWeAreStructure = {
    identity: {
      name: 'Furnostyles',
      tagline: 'Your Trusted Interior Design & Property Improvement Ecosystem',
      mission: 'To provide comprehensive, trusted, and premium interior design, construction, repair, and property improvement services through a centralized ecosystem.',
      vision: 'To become the leading authority in interior design and property improvement across East Africa and beyond.',
      values: ['quality', 'trust', 'innovation', 'customer-satisfaction', 'sustainability']
    },
    story: {
      founded: 'year',
      journey: 'company-journey-narrative',
      milestones: 'key-milestones',
      growth: 'growth-story'
    }
  };

  /**
   * WHAT WE DO STRUCTURE
   * Core services and offerings
   */
  var WhatWeDoStructure = {
    coreServices: {
      interiorDesign: 'professional-interior-design-services',
      construction: 'new-construction-and-renovations',
      repairs: 'comprehensive-repair-services',
      sourcing: 'global-sourcing-and-imports',
      realEstate: 'property-sales-and-management',
      consultations: 'expert-consultation-services'
    },
    ecosystemServices: {
      furniture: 'furniture-making-and-sales',
      materials: 'construction-materials-supply',
      hardware: 'hardware-and-tools-supply',
      secondhand: 'secondhand-marketplace',
      installations: 'professional-installation-services',
      maintenance: 'ongoing-maintenance-services'
    }
  };

  /**
   * OUR ECOSYSTEM STRUCTURE
   * Complete ecosystem overview
   */
  var OurEcosystemStructure = {
    ecosystems: {
      furniture: {
        making: 'custom-furniture-manufacturing',
        showcase: 'furniture-showcase-gallery',
        education: 'furniture-design-education',
        consultation: 'furniture-consultation',
        marketplace: 'furniture-marketplace',
        sourcing: 'furniture-sourcing',
        imports: 'imported-furniture',
        secondhand: 'secondhand-furniture',
        repairs: 'furniture-repairs'
      },
      materials: {
        construction: 'construction-materials',
        hardware: 'hardware-supply',
        furniture: 'furniture-materials',
        tools: 'tools-and-machinery',
        fittings: 'fittings-and-fixtures',
        plumbing: 'plumbing-supplies',
        electrical: 'electrical-supplies',
        finishing: 'finishing-materials'
      },
      repairs: {
        socket: 'socket-replacement',
        plumbing: 'plumbing-repairs',
        painting: 'painting-services',
        electrical: 'electrical-repairs',
        gypsum: 'gypsum-installation',
        ceilings: 'ceiling-work',
        furniture: 'furniture-repairs',
        carpet: 'carpet-repairs',
        renovations: 'renovation-services',
        maintenance: 'maintenance-services',
        installations: 'installation-services',
        welding: 'welding-services',
        handyman: 'handyman-services',
        flooring: 'flooring-services',
        roofing: 'roofing-services',
        waterproofing: 'waterproofing-services',
        appliance: 'appliance-repair',
        office: 'office-repairs'
      },
      realEstate: {
        sales: 'property-sales',
        rentals: 'property-rentals',
        leasing: 'property-leasing',
        management: 'property-management',
        maintenance: 'property-maintenance',
        staging: 'property-staging',
        airbnb: 'airbnb-upgrades',
        renovations: 'property-renovations',
        repairs: 'property-repairs',
        investment: 'property-investment'
      }
    }
  };

  /**
   * OUR EXPERTISE STRUCTURE
    * Areas of expertise and specialization
   */
  var OurExpertiseStructure = {
    primaryExpertise: {
      interiorDesign: 'interior-design-expertise',
      construction: 'construction-expertise',
      repairs: 'repair-expertise',
      sourcing: 'sourcing-expertise',
      projectManagement: 'project-management-expertise'
    },
    specializedExpertise: {
      customFurniture: 'custom-furniture-design',
      propertyUpgrades: 'property-upgrade-specialization',
      airbnbOptimization: 'airbnb-optimization',
      renovation: 'renovation-specialization',
      sustainableDesign: 'sustainable-design-expertise'
    }
  };

  /**
   * OUR PROJECTS STRUCTURE
   * Project showcase and portfolio
   */
  var OurProjectsStructure = {
    projectCategories: {
      residential: 'residential-projects',
      commercial: 'commercial-projects',
      renovations: 'renovation-projects',
      airbnb: 'airbnb-projects',
      customFurniture: 'custom-furniture-projects',
      propertyUpgrades: 'property-upgrade-projects'
    },
    projectDetails: {
      images: 'project-gallery',
      description: 'project-description',
      timeline: 'project-timeline',
      budget: 'project-budget-range',
      challenges: 'project-challenges',
      solutions: 'project-solutions',
      results: 'project-results'
    }
  };

  /**
   * OUR PROCESS STRUCTURE
   * How we work with customers
   */
  var OurProcessStructure = {
    phases: {
      consultation: 'initial-consultation',
      design: 'design-and-planning',
      sourcing: 'sourcing-and-procurement',
      execution: 'execution-and-implementation',
      delivery: 'delivery-and-handover',
      support: 'ongoing-support'
    },
    qualityAssurance: {
      vetting: 'provider-vetting-process',
      qualityControl: 'quality-control-checks',
      customerApproval: 'customer-approval-stages',
      satisfaction: 'satisfaction-guarantee'
    }
  };

  /**
   * OUR CAPABILITIES STRUCTURE
   * What we can deliver
   */
  var OurCapabilitiesStructure = {
    scale: {
      smallProjects: 'small-residential-projects',
      mediumProjects: 'medium-commercial-projects',
      largeProjects: 'large-scale-developments',
      ongoing: 'ongoing-maintenance-contracts'
    },
    resources: {
      team: 'in-house-team',
      artisans: 'vetted-artisan-network',
      suppliers: 'global-supplier-network',
      facilities: 'production-facilities',
      technology: 'design-and-management-technology'
    },
    guarantees: {
      quality: 'quality-guarantee',
      timeline: 'timeline-guarantee',
      support: 'ongoing-support',
      satisfaction: 'customer-satisfaction-guarantee'
    }
  };

  /**
   * EXPORT COMPANY PROFILE SYSTEM ARCHITECTURE
   */
  window.FurnostylesCompanyProfileSystem = {
    WhoWeAreStructure: WhoWeAreStructure,
    WhatWeDoStructure: WhatWeDoStructure,
    OurEcosystemStructure: OurEcosystemStructure,
    OurExpertiseStructure: OurExpertiseStructure,
    OurProjectsStructure: OurProjectsStructure,
    OurProcessStructure: OurProcessStructure,
    OurCapabilitiesStructure: OurCapabilitiesStructure
  };

}());
