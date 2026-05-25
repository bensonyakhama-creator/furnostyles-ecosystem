/**
 * FURNOSTYLES — ECOSYSTEM NAVIGATION ARCHITECTURE
 * =================================================
 * File: shared/navigation/ecosystem-navigation-architecture.js
 * Purpose: Central ecosystem navigation architecture defining the 10 main pillars
 *          of the Furnostyles Ecosystem Platform.
 */

(function () {
  'use strict';

  /**
   * ECOSYSTEM NAVIGATION PILLARS
   * Main navigation pillars for the Furnostyles Ecosystem Platform
   */
  var EcosystemNavigationPillars = {
    /**
     * PILLAR 1: FURNOSTYLES
     * Company profile ecosystem
     */
    furnostyles: {
      title: 'Furnostyles',
      description: 'About Us, Our Story, Our Ecosystem',
      icon: 'company',
      sections: {
        about: 'About Us',
        story: 'Our Story',
        mission: 'Our Mission',
        vision: 'Our Vision',
        values: 'Our Values',
        team: 'Our Team',
        process: 'Our Process',
        expertise: 'Our Expertise',
        projects: 'Our Projects',
        capabilities: 'Our Capabilities'
      },
      priority: 1,
      position: 'first'
    },

    /**
     * PILLAR 2: FURNITURE
     * Custom furniture + marketplace + repairs + consultation
     */
    furniture: {
      title: 'Furniture',
      description: 'Custom Furniture, Marketplace, Repairs, Consultation',
      icon: 'furniture',
      sections: {
        custom: 'Custom Furniture',
        marketplace: 'Furniture Marketplace',
        repairs: 'Furniture Repairs',
        consultation: 'Furniture Consultation',
        showcase: 'Furniture Showcase',
        education: 'Furniture Education',
        sourcing: 'Furniture Sourcing',
        imports: 'Imported Furniture',
        secondhand: 'Secondhand Furniture'
      },
      priority: 2,
      position: 'second'
    },

    /**
     * PILLAR 3: MATERIALS & HARDWARE
     * Construction + fittings + tools + boards + plumbing + electrical + dropshipping
     */
    materialsHardware: {
      title: 'Materials & Hardware',
      description: 'Construction Materials, Tools, Fittings, Plumbing, Electrical',
      icon: 'materials',
      sections: {
        construction: 'Construction Materials',
        tools: 'Tools & Machines',
        fittings: 'Fittings & Fixtures',
        tiles: 'Tiles & Flooring',
        gypsum: 'Gypsum & Boards',
        plumbing: 'Plumbing Supplies',
        electrical: 'Electrical Supplies',
        paints: 'Paints & Finishing',
        hardware: 'Hardware',
        cement: 'Cement & Building',
        roofing: 'Roofing Materials',
        dropshipping: 'Dropshipping Products'
      },
      priority: 3,
      position: 'third'
    },

    /**
     * PILLAR 4: REPAIRS & RENOVATIONS
     * VERY LARGE ecosystem
     */
    repairsRenovations: {
      title: 'Repairs & Renovations',
      description: 'Electrical, Plumbing, Painting, Renovations, Maintenance',
      icon: 'repairs',
      sections: {
        electrical: 'Electrical Repairs',
        sockets: 'Socket Replacement',
        lighting: 'Lighting Services',
        plumbing: 'Plumbing Repairs',
        furniture: 'Furniture Repairs',
        carpet: 'Carpet Cleaning & Repairs',
        ceilings: 'Ceiling Repairs',
        roofing: 'Roofing Services',
        waterproofing: 'Waterproofing',
        painting: 'Painting Services',
        gypsum: 'Gypsum Installation',
        flooring: 'Flooring Services',
        welding: 'Welding Services',
        handyman: 'Handyman Services',
        office: 'Office Repairs',
        maintenance: 'Home Maintenance',
        appliances: 'Appliance Installation',
        renovations: 'Renovations'
      },
      priority: 4,
      position: 'fourth',
      prominence: 'high'
    },

    /**
     * PILLAR 5: REAL ESTATE & PROPERTY
     * Property sales + management + upgrades + Airbnb + maintenance
     */
    realEstateProperty: {
      title: 'Real Estate & Property',
      description: 'Properties for Sale, Rentals, Management, Airbnb Upgrades',
      icon: 'realestate',
      sections: {
        sales: 'Properties for Sale',
        rentals: 'Property Rentals',
        leasing: 'Property Leasing',
        management: 'Property Management',
        airbnb: 'Airbnb Setup',
        staging: 'Property Staging',
        renovations: 'Property Renovations',
        maintenance: 'Property Maintenance',
        upgrades: 'Property Upgrades',
        investment: 'Investment Guidance'
      },
      priority: 5,
      position: 'fifth'
    },

    /**
     * PILLAR 6: MARKETPLACE
     * All ecosystems connected
     */
    marketplace: {
      title: 'Marketplace',
      description: 'All Products, Services, and Ecosystems Connected',
      icon: 'marketplace',
      sections: {
        all: 'All Products',
        furniture: 'Furniture',
        materials: 'Materials',
        services: 'Services',
        properties: 'Properties',
        sourcing: 'Sourcing',
        secondhand: 'Secondhand',
        featured: 'Featured Collections',
        new: 'New Arrivals',
        trending: 'Trending'
      },
      priority: 6,
      position: 'sixth'
    },

    /**
     * PILLAR 7: SOURCING & IMPORTS
     * Imports + Alibaba sourcing + supplier sourcing + dropshipping
     */
    sourcingImports: {
      title: 'Sourcing & Imports',
      description: 'Global Sourcing, Imports, Custom Sourcing, Dropshipping',
      icon: 'sourcing',
      sections: {
        imports: 'Imported Collections',
        alibaba: 'Alibaba Sourcing',
        suppliers: 'Supplier Sourcing',
        custom: 'Custom Sourcing',
        requests: 'Sourcing Requests',
        dropshipping: 'Dropshipping',
        logistics: 'Logistics & Customs',
        quality: 'Quality Control'
      },
      priority: 7,
      position: 'seventh'
    },

    /**
     * PILLAR 8: SECONDHAND
     * Open community-driven marketplace
     */
    secondhand: {
      title: 'Secondhand',
      description: 'Pre-owned Items, Community Marketplace',
      icon: 'secondhand',
      sections: {
        browse: 'Browse Secondhand',
        list: 'List Item',
        furniture: 'Secondhand Furniture',
        appliances: 'Secondhand Appliances',
        electronics: 'Secondhand Electronics',
        decor: 'Secondhand Decor',
        community: 'Community'
      },
      priority: 8,
      position: 'eighth',
      style: 'community-driven'
    },

    /**
     * PILLAR 9: BLOGS & GUIDES
     * Traffic + authority + education
     */
    blogsGuides: {
      title: 'Blogs & Guides',
      description: 'Expert Articles, Guides, Tutorials, Insights',
      icon: 'blog',
      sections: {
        repairs: 'Repair Guides',
        furniture: 'Furniture Articles',
        interiors: 'Interior Design',
        construction: 'Construction Guides',
        investment: 'Property Investment',
        sourcing: 'Sourcing Guides',
        maintenance: 'Maintenance Tips',
        airbnb: 'Airbnb Upgrades',
        renovations: 'Renovation Guides',
        management: 'Property Management'
      },
      priority: 9,
      position: 'ninth',
      purpose: 'seo-traffic'
    },

    /**
     * PILLAR 10: CONSULTATIONS & PROJECTS
     * Project planning + quotations + ecosystem guidance
     */
    consultationsProjects: {
      title: 'Consultations & Projects',
      description: 'Project Planning, Quotations, Ecosystem Guidance',
      icon: 'consultation',
      sections: {
        consultation: 'Book Consultation',
        planning: 'Project Planning',
        quotations: 'Request Quotation',
        guidance: 'Ecosystem Guidance',
        interior: 'Interior Design Consultation',
        renovation: 'Renovation Consultation',
        sourcing: 'Sourcing Consultation',
        property: 'Property Consultation',
        airbnb: 'Airbnb Consultation'
      },
      priority: 10,
      position: 'tenth',
      cta: 'action-oriented'
    }
  };

  /**
   * NAVIGATION HIERARCHY STRUCTURE
   * How navigation is structured
   */
  var NavigationHierarchyStructure = {
    primary: {
      level: 'primary-navigation',
      pillars: ['furnostyles', 'furniture', 'materialsHardware', 'repairsRenovations', 'realEstateProperty'],
      display: 'top-navigation-bar'
    },
    secondary: {
      level: 'secondary-navigation',
      pillars: ['marketplace', 'sourcingImports', 'secondhand', 'blogsGuides', 'consultationsProjects'],
      display: 'secondary-navigation'
    },
    tertiary: {
      level: 'tertiary-navigation',
      type: 'section-based',
      display: 'dropdown-or-sidebar'
    }
  };

  /**
   * NAVIGATION INTEGRATION STRUCTURE
   * How navigation connects ecosystems
   */
  var NavigationIntegrationStructure = {
    crossPillar: {
      repairsToMaterials: 'repairs → materials connection',
      realEstateToFurniture: 'real estate → furniture connection',
      sourcingToMarketplace: 'sourcing → marketplace connection',
      blogsToServices: 'blogs → services connection',
      consultationsToAll: 'consultations → all ecosystems connection'
    },
    contextual: {
      product: 'product → related services navigation',
      service: 'service → related products navigation',
      blog: 'blog → related services navigation',
      project: 'project → ecosystem navigation'
    }
  };

  /**
   * NAVIGATION UX STRUCTURE
   * Navigation user experience
   */
  var NavigationUXStructure = {
    principles: {
      clarity: 'clear pillar naming',
      discoverability: 'easy ecosystem discovery',
      hierarchy: 'logical information hierarchy',
      consistency: 'consistent navigation patterns'
    },
    mobile: {
      responsive: 'mobile-responsive navigation',
      hamburger: 'hamburger menu for mobile',
      quickAccess: 'quick access to key pillars'
    },
    desktop: {
      megaMenu: 'mega menu for complex pillars',
      breadcrumbs: 'breadcrumb navigation',
      search: 'integrated search across ecosystems'
    }
  };

  /**
   * EXPORT ECOSYSTEM NAVIGATION ARCHITECTURE
   */
  window.FurnostylesEcosystemNavigationArchitecture = {
    EcosystemNavigationPillars: EcosystemNavigationPillars,
    NavigationHierarchyStructure: NavigationHierarchyStructure,
    NavigationIntegrationStructure: NavigationIntegrationStructure,
    NavigationUXStructure: NavigationUXStructure
  };

}());
