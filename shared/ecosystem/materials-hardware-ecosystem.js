/**
 * FURNOSTYLES — MATERIALS & HARDWARE ECOSYSTEM ARCHITECTURE
 * ===========================================================
 * File: shared/ecosystem/materials-hardware-ecosystem.js
 * Purpose: Central materials and hardware ecosystem architecture for construction
 *          materials, hardware, furniture materials, tools, machines, fittings,
 *          plumbing, electrical, and finishing materials.
 */

(function () {
  'use strict';

  /**
   * CONSTRUCTION MATERIALS STRUCTURE
   * Construction materials ecosystem
   */
  var ConstructionMaterialsStructure = {
    categories: {
      flooring: ['hardwood', 'laminate', 'vinyl', 'tile', 'carpet'],
      walls: ['drywall', 'cement-board', 'insulation', 'paneling'],
      structural: ['lumber', 'steel', 'concrete', 'bricks', 'blocks'],
      roofing: ['shingles', 'metal-roofing', 'tiles', 'membranes'],
      exterior: ['siding', 'stucco', 'stone', 'brick-veneer']
    },
    sourcing: {
      furnostyles: 'furnostyles-supplied-materials',
      vendors: 'vetted-vendor-materials',
      imports: 'imported-materials',
      suppliers: 'direct-supplier-materials'
    },
    customerExperience: {
      browsing: 'browse-materials-by-furnostyles',
      consultation: 'material-consultation',
      delivery: 'material-delivery-service',
      installation: 'installation-coordination'
    }
  };

  /**
   * HARDWARE STRUCTURE
   * Hardware ecosystem
   */
  var HardwareStructure = {
    categories: {
      doorHardware: ['door-handles', 'locks', 'hinges', 'door-stops'],
      cabinetHardware: ['cabinet-handles', 'cabinet-hinges', 'drawer-slides'],
      fasteners: ['screws', 'nails', 'bolts', 'anchors'],
      structural: ['brackets', 'plates', 'ties', 'connectors'],
      security: ['deadbolts', 'smart-locks', 'security-cameras']
    },
    integration: {
      furniture: 'furniture-hardware-supply',
      construction: 'construction-hardware-supply',
      repairs: 'repair-hardware-supply',
      installations: 'installation-hardware-supply'
    }
  };

  /**
   * FURNITURE MATERIALS STRUCTURE
   * Furniture materials ecosystem
   */
  var FurnitureMaterialsStructure = {
    categories: {
      wood: ['hardwood', 'softwood', 'plywood', 'mdf', 'particle-board'],
      upholstery: ['fabric', 'leather', 'vinyl', 'microfiber'],
      metals: ['steel', 'aluminum', 'iron', 'brass'],
      glass: ['tempered', 'laminated', 'mirrored'],
      composites: ['laminate', 'veneer', 'solid-surface']
    },
    services: {
      sourcing: 'furniture-material-sourcing',
      consultation: 'material-consultation',
      supply: 'material-supply',
      custom: 'custom-material-orders'
    }
  };

  /**
   * TOOLS & MACHINES STRUCTURE
   * Tools and machinery ecosystem
   */
  var ToolsMachinesStructure = {
    categories: {
      powerTools: ['drills', 'saws', 'sanders', 'routers'],
      handTools: ['hammers', 'screwdrivers', 'pliers', 'wrenches'],
      measuring: ['tape-measures', 'levels', 'squares', 'lasers'],
      machinery: ['table-saws', 'planers', 'jointers', 'drill-presses'],
      safety: ['goggles', 'gloves', 'helmets', 'ear-protection']
    },
    rental: {
      availability: 'tool-rental-service',
      delivery: 'tool-delivery',
      training: 'tool-training',
      maintenance: 'tool-maintenance'
    }
  };

  /**
   * FITTINGS & FIXTURES STRUCTURE
   * Fittings and fixtures ecosystem
   */
  var FittingsFixturesStructure = {
    categories: {
      plumbing: ['pipes', 'fittings', 'valves', 'faucets'],
      electrical: ['wires', 'cables', 'switches', 'outlets'],
      lighting: ['fixtures', 'bulbs', 'switches', 'dimmers'],
      hvac: ['vents', 'ducts', 'registers', 'thermostats'],
      decorative: ['cabinet-pulls', 'knobs', 'hooks', 'racks']
    },
    integration: {
      installations: 'installation-services',
      repairs: 'repair-services',
      upgrades: 'upgrade-options',
      consultations: 'expert-consultations'
    }
  };

  /**
   * PLUMBING SUPPLIES STRUCTURE
   * Plumbing supplies ecosystem
   */
  var PlumbingSuppliesStructure = {
    categories: {
      pipes: ['pvc', 'copper', 'pe', 'cast-iron'],
      fittings: ['elbows', 'tees', 'couplings', 'adapters'],
      fixtures: ['sinks', 'toilets', 'faucets', 'showers'],
      valves: ['gate-valves', 'ball-valves', 'check-valves', 'pressure-valves'],
      tools: ['pipe-wrenches', 'plungers', 'snake-tools', 'sealants']
    },
    services: {
      consultation: 'plumbing-consultation',
      supply: 'plumbing-supply',
      installation: 'plumbing-installation',
      repair: 'plumbing-repair'
    }
  };

  /**
   * ELECTRICAL SUPPLIES STRUCTURE
   * Electrical supplies ecosystem
   */
  var ElectricalSuppliesStructure = {
    categories: {
      wiring: ['romex', 'thhn', 'service-wire', 'low-voltage'],
      devices: ['switches', 'outlets', 'dimmers', 'timers'],
      lighting: ['fixtures', 'bulbs', 'led-strips', 'transformers'],
      panels: ['breaker-panels', 'sub-panels', 'fuses', 'breakers'],
      safety: ['gfci', 'afci', 'surge-protectors', 'detectors']
    },
    services: {
      consultation: 'electrical-consultation',
      supply: 'electrical-supply',
      installation: 'electrical-installation',
      inspection: 'electrical-inspection'
    }
  };

  /**
   * FINISHING MATERIALS STRUCTURE
   * Finishing materials ecosystem
   */
  var FinishingMaterialsStructure = {
    categories: {
      paint: ['interior-paint', 'exterior-paint', 'primer', 'stain'],
      coatings: ['varnish', 'lacquer', 'shellac', 'polyurethane'],
      sealants: ['caulk', 'sealant', 'grout', 'adhesive'],
      wallCoverings: ['wallpaper', 'wall-decals', 'paneling', 'wainscoting'],
      flooring: ['finish-coatings', 'sealers', 'polishes', 'cleaners']
    },
    services: {
      consultation: 'finishing-consultation',
      application: 'finishing-application',
      repair: 'finishing-repair',
      maintenance: 'finishing-maintenance'
    }
  };

  /**
   * EXPORT MATERIALS & HARDWARE ECOSYSTEM ARCHITECTURE
   */
  window.FurnostylesMaterialsHardwareEcosystem = {
    ConstructionMaterialsStructure: ConstructionMaterialsStructure,
    HardwareStructure: HardwareStructure,
    FurnitureMaterialsStructure: FurnitureMaterialsStructure,
    ToolsMachinesStructure: ToolsMachinesStructure,
    FittingsFixturesStructure: FittingsFixturesStructure,
    PlumbingSuppliesStructure: PlumbingSuppliesStructure,
    ElectricalSuppliesStructure: ElectricalSuppliesStructure,
    FinishingMaterialsStructure: FinishingMaterialsStructure
  };

}());
