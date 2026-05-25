/**
 * FURNOSTYLES — PRODUCT CATEGORY ARCHITECTURE
 * =============================================
 * File: shared/marketplace/product-category-architecture.js
 * Purpose: Centralized product category architecture for furniture, materials,
 *          services, real estate, secondhand, and sourcing/imports.
 * 
 * This file DOES NOT implement category systems.
 * It only defines the strategy and structure for future category systems.
 * 
 * Load order: After marketplace-data-architecture.js
 * 
 * Usage: This strategy will be used when category systems are implemented
 */

(function () {
  'use strict';

  /**
   * FURNITURE CATEGORIES
   * Centralized furniture category hierarchy
   */
  var FurnitureCategories = {
    main: 'furniture',
    subcategories: [
      {
        id: 'living-room',
        name: 'Living Room',
        items: ['sofas', 'sectionals', 'coffee-tables', 'tv-stands', 'bookshelves', 'accent-chairs']
      },
      {
        id: 'bedroom',
        name: 'Bedroom',
        items: ['beds', 'mattresses', 'nightstands', 'dressers', 'wardrobes', 'bedside-tables']
      },
      {
        id: 'dining',
        name: 'Dining',
        items: ['dining-tables', 'dining-chairs', 'buffets', 'sideboards', 'bar-stools']
      },
      {
        id: 'office',
        name: 'Office',
        items: ['desks', 'office-chairs', 'bookcases', 'filing-cabinets', 'conference-tables']
      },
      {
        id: 'outdoor',
        name: 'Outdoor',
        items: ['patio-furniture', 'garden-furniture', 'outdoor-dining', 'outdoor-lounge']
      }
    ]
  };

  /**
   * MATERIALS CATEGORIES
   * Centralized materials category hierarchy
   */
  var MaterialsCategories = {
    main: 'materials',
    subcategories: [
      {
        id: 'flooring',
        name: 'Flooring',
        items: ['hardwood', 'laminate', 'vinyl', 'tile', 'carpet']
      },
      {
        id: 'paint',
        name: 'Paint',
        items: ['interior-paint', 'exterior-paint', 'primer', 'stains', 'finishes']
      },
      {
        id: 'hardware',
        name: 'Hardware',
        items: ['door-handles', 'cabinet-handles', 'hinges', 'locks', 'fasteners']
      },
      {
        id: 'lighting',
        name: 'Lighting',
        items: ['fixtures', 'bulbs', 'switches', 'wiring', 'accessories']
      },
      {
        id: 'plumbing',
        name: 'Plumbing',
        items: ['pipes', 'faucets', 'fixtures', 'valves', 'accessories']
      }
    ]
  };

  /**
   * SERVICES CATEGORIES
   * Centralized services category hierarchy
   */
  var ServicesCategories = {
    main: 'services',
    subcategories: [
      {
        id: 'interior-design',
        name: 'Interior Design',
        items: ['consultation', 'space-planning', 'color-consultation', '3d-rendering']
      },
      {
        id: 'renovation',
        name: 'Renovation',
        items: ['kitchen-renovation', 'bathroom-renovation', 'full-home-renovation', 'commercial-renovation']
      },
      {
        id: 'construction',
        name: 'Construction',
        items: ['new-build', 'extensions', 'structural-work', 'foundation-work']
      },
      {
        id: 'installation',
        name: 'Installation',
        items: ['furniture-assembly', 'fixture-installation', 'appliance-installation']
      },
      {
        id: 'maintenance',
        name: 'Maintenance',
        items: ['plumbing', 'electrical', 'hvac', 'general-repairs']
      }
    ]
  };

  /**
   * REAL ESTATE CATEGORIES
   * Centralized real estate category hierarchy
   */
  var RealEstateCategories = {
    main: 'real-estate',
    subcategories: [
      {
        id: 'residential',
        name: 'Residential',
        items: ['apartments', 'houses', 'townhouses', 'condos', 'villas']
      },
      {
        id: 'commercial',
        name: 'Commercial',
        items: ['offices', 'retail-spaces', 'warehouses', 'restaurants', 'hotels']
      },
      {
        id: 'land',
        name: 'Land',
        items: ['residential-lots', 'commercial-lots', 'agricultural-land', 'development-sites']
      },
      {
        id: 'rental',
        name: 'Rental',
        items: ['apartments', 'houses', 'commercial-spaces', 'vacation-rentals']
      }
    ]
  };

  /**
   * SECONDHAND CATEGORIES
   * Centralized secondhand category hierarchy
   */
  var SecondhandCategories = {
    main: 'secondhand',
    subcategories: [
      {
        id: 'furniture',
        name: 'Furniture',
        items: ['sofas', 'chairs', 'tables', 'storage', 'decor']
      },
      {
        id: 'appliances',
        name: 'Appliances',
        items: ['kitchen-appliances', 'laundry-appliances', 'small-appliances']
      },
      {
        id: 'electronics',
        name: 'Electronics',
        items: ['tvs', 'audio', 'computers', 'gaming']
      },
      {
        id: 'decor',
        name: 'Decor',
        items: ['rugs', 'artwork', 'lighting', 'accessories']
      }
    ]
  };

  /**
   * SOURCING/IMPORTS CATEGORIES
   * Centralized sourcing/imports category hierarchy
   */
  var SourcingCategories = {
    main: 'sourcing',
    subcategories: [
      {
        id: 'furniture-sourcing',
        name: 'Furniture Sourcing',
        items: ['international-furniture', 'custom-furniture', 'bulk-orders']
      },
      {
        id: 'materials-sourcing',
        name: 'Materials Sourcing',
        items: ['raw-materials', 'finishing-materials', 'specialty-materials']
      },
      {
        id: 'manufacturing',
        name: 'Manufacturing',
        items: ['custom-manufacturing', 'contract-manufacturing', 'prototyping']
      },
      {
        id: 'logistics',
        name: 'Logistics',
        items: ['shipping', 'customs', 'warehousing', 'distribution']
      }
    ]
  };

  /**
   * CATEGORY HIERARCHY STRATEGY
   * Centralized category hierarchy management
   */
  var CategoryHierarchyStrategy = {
    /**
     * Get category tree
     */
    getCategoryTree: function (categoryType) {
      var categories = {
        furniture: FurnitureCategories,
        materials: MaterialsCategories,
        services: ServicesCategories,
        'real-estate': RealEstateCategories,
        secondhand: SecondhandCategories,
        sourcing: SourcingCategories
      };
      return categories[categoryType] || null;
    },
    
    /**
     * Get all categories
     */
    getAllCategories: function () {
      return {
        furniture: FurnitureCategories,
        materials: MaterialsCategories,
        services: ServicesCategories,
        'real-estate': RealEstateCategories,
        secondhand: SecondhandCategories,
        sourcing: SourcingCategories
      };
    },
    
    /**
     * Get subcategory items
     */
    getSubcategoryItems: function (categoryType, subcategoryId) {
      var tree = this.getCategoryTree(categoryType);
      if (!tree) return [];
      
      var subcategory = tree.subcategories.find(function (sub) {
        return sub.id === subcategoryId;
      });
      
      return subcategory ? subcategory.items : [];
    },
    
    /**
     * Validate category path
     */
    validateCategoryPath: function (categoryType, subcategoryId, itemId) {
      var items = this.getSubcategoryItems(categoryType, subcategoryId);
      return items.indexOf(itemId) !== -1;
    }
  };

  /**
   * EXPORT PRODUCT CATEGORY ARCHITECTURE
   */
  window.FurnostylesProductCategoryArchitecture = {
    FurnitureCategories: FurnitureCategories,
    MaterialsCategories: MaterialsCategories,
    ServicesCategories: ServicesCategories,
    RealEstateCategories: RealEstateCategories,
    SecondhandCategories: SecondhandCategories,
    SourcingCategories: SourcingCategories,
    CategoryHierarchyStrategy: CategoryHierarchyStrategy
  };

}());
