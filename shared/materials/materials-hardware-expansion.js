/**
 * FURNOSTYLES — MATERIALS & HARDWARE EXPANSION
 * ==============================================
 * File: shared/materials/materials-hardware-expansion.js
 * Purpose: Expanded materials and hardware ecosystem architecture for tools,
 *          machines, fittings, tiles, gypsum, boards, plumbing, electrical, paints,
 *          hardware, cement, roofing, finishing materials, and preparation for
 *          Furnostyles, vendor, dropshipping, and imported products.
 */

(function () {
  'use strict';

  /**
   * TOOLS & MACHINES EXPANSION
   */
  var ToolsMachinesExpansion = {
    categories: {
      powerTools: ['drills', 'saws', 'sanders', 'routers', 'grinders'],
      handTools: ['hammers', 'screwdrivers', 'pliers', 'wrenches', 'cutting-tools'],
      measuring: ['tape-measures', 'levels', 'squares', 'lasers', 'calipers'],
      machinery: ['table-saws', 'planers', 'jointers', 'drill-presses', 'lathes'],
      safety: ['safety-goggles', 'gloves', 'helmets', 'ear-protection', 'masks']
    },
    sourcing: {
      furnostyles: 'furnostyles-branded-tools',
      vendors: 'vetted-vendor-tools',
      imports: 'imported-tools',
      rental: 'tool-rental-services'
    }
  };

  /**
   * FITTINGS & FIXTURES EXPANSION
   */
  var FittingsFixturesExpansion = {
    categories: {
      doorHardware: ['door-handles', 'locks', 'hinges', 'door-stops', 'knockers'],
      cabinetHardware: ['cabinet-handles', 'cabinet-hinges', 'drawer-slides', 'latches'],
      fasteners: ['screws', 'nails', 'bolts', 'anchors', 'nails'],
      structural: ['brackets', 'plates', 'ties', 'connectors', 'hangers'],
      plumbing: ['pipes', 'fittings', 'valves', 'faucets', 'drains'],
      electrical: ['switches', 'outlets', 'breakers', 'wires', 'conduits']
    },
    sourcing: {
      furnostyles: 'furnostyles-branded-fittings',
      vendors: 'vetted-vendor-fittings',
      imports: 'imported-fittings',
      specialty: 'specialty-fittings'
    }
  };

  /**
   * TILES & FLOORING EXPANSION
   */
  var TilesFlooringExpansion = {
    categories: {
      ceramicTiles: ['floor-tiles', 'wall-tiles', 'mosaic-tiles', 'porcelain-tiles'],
      naturalStone: ['granite', 'marble', 'slate', 'limestone', 'travertine'],
      vinyl: ['luxury-vinyl', 'vinyl-planks', 'vinyl-tiles'],
      laminate: ['laminate-flooring', 'engineered-wood'],
      hardwood: ['solid-hardwood', 'engineered-hardwood', 'bamboo'],
      carpet: ['broadloom', 'carpet-tiles', 'area-rugs']
    },
    sourcing: {
      furnostyles: 'furnostyles-branded-tiles',
      vendors: 'vetted-vendor-tiles',
      imports: 'imported-tiles',
      local: 'local-quarry-tiles'
    }
  };

  /**
   * GYPSUM & BOARDS EXPANSION
   */
  var GypsumBoardsExpansion = {
    categories: {
      gypsumBoard: ['standard-gypsum', 'fire-resistant', 'moisture-resistant', 'soundproof'],
      cementBoard: ['cement-board', 'backer-board', 'tile-backer'],
      insulation: ['insulation-boards', 'foam-boards', 'mineral-wool'],
      partition: ['partition-boards', 'acoustic-panels'],
      decorative: ['decorative-panels', 'wall-panels', 'ceiling-panels']
    },
    sourcing: {
      furnostyles: 'furnostyles-branded-boards',
      vendors: 'vetted-vendor-boards',
      imports: 'imported-boards',
      local: 'local-manufacturer-boards'
    }
  };

  /**
   * PLUMBING SUPPLIES EXPANSION
   */
  var PlumbingSuppliesExpansion = {
    categories: {
      pipes: ['pvc-pipes', 'copper-pipes', 'pe-pipes', 'ppr-pipes', 'steel-pipes'],
      fittings: ['elbows', 'tees', 'couplings', 'adapters', 'unions'],
      fixtures: ['sinks', 'toilets', 'faucets', 'showers', 'bathtubs'],
      valves: ['gate-valves', 'ball-valves', 'check-valves', 'pressure-valves'],
      tools: ['pipe-wrenches', 'plungers', 'snake-tools', 'sealants', 'tape']
    },
    sourcing: {
      furnostyles: 'furnostyles-branded-plumbing',
      vendors: 'vetted-vendor-plumbing',
      imports: 'imported-plumbing',
      local: 'local-manufacturer-plumbing'
    }
  };

  /**
   * ELECTRICAL SUPPLIES EXPANSION
   */
  var ElectricalSuppliesExpansion = {
    categories: {
      wiring: ['romex', 'thhn', 'service-wire', 'low-voltage', 'coaxial'],
      devices: ['switches', 'outlets', 'dimmers', 'timers', 'sensors'],
      lighting: ['fixtures', 'bulbs', 'led-strips', 'transformers', 'controls'],
      panels: ['breaker-panels', 'sub-panels', 'load-centers', 'fuses'],
      safety: ['gfci', 'afci', 'surge-protectors', 'detectors', 'alarms']
    },
    sourcing: {
      furnostyles: 'furnostyles-branded-electrical',
      vendors: 'vetted-vendor-electrical',
      imports: 'imported-electrical',
      local: 'local-manufacturer-electrical'
    }
  };

  /**
   * PAINTS & FINISHING EXPANSION
   */
  var PaintsFinishingExpansion = {
    categories: {
      interiorPaint: ['flat', 'eggshell', 'satin', 'semi-gloss', 'high-gloss'],
      exteriorPaint: ['flat', 'satin', 'semi-gloss', 'elastomeric'],
      primer: ['oil-based', 'water-based', 'multi-purpose'],
      stains: ['wood-stains', 'concrete-stains', 'deck-stains'],
      coatings: ['varnish', 'lacquer', 'shellac', 'polyurethane'],
      sealants: ['caulk', 'sealant', 'grout', 'adhesive', 'tape']
    },
    sourcing: {
      furnostyles: 'furnostyles-branded-paints',
      vendors: 'vetted-vendor-paints',
      imports: 'imported-paints',
      local: 'local-manufacturer-paints'
    }
  };

  /**
   * HARDWARE EXPANSION
   */
  var HardwareExpansion = {
    categories: {
      generalHardware: ['nails', 'screws', 'bolts', 'nuts', 'washers'],
      specialtyHardware: ['hooks', 'hangers', 'brackets', 'anchors', 'ties'],
      securityHardware: ['locks', 'deadbolts', 'smart-locks', 'security-cameras'],
      storageHardware: ['shelving', 'racks', 'organizers', 'hooks'],
      displayHardware: ['display-stands', 'hangers', 'brackets']
    },
    sourcing: {
      furnostyles: 'furnostyles-branded-hardware',
      vendors: 'vetted-vendor-hardware',
      imports: 'imported-hardware',
      local: 'local-manufacturer-hardware'
    }
  };

  /**
   * CEMENT & BUILDING MATERIALS EXPANSION
   */
  var CementBuildingExpansion = {
    categories: {
      cement: ['portland-cement', 'masonry-cement', 'ready-mix'],
      concrete: ['ready-mix', 'concrete-blocks', 'pavers'],
      aggregates: ['sand', 'gravel', 'crushed-stone', 'lime'],
      masonry: ['bricks', 'blocks', 'stone', 'adhesives'],
      reinforcement: ['rebar', 'wire-mesh', 'fiber-mesh']
    },
    sourcing: {
      furnostyles: 'furnostyles-branded-cement',
      vendors: 'vetted-vendor-cement',
      imports: 'imported-cement',
      local: 'local-quarry-materials'
    }
  };

  /**
   * ROOFING MATERIALS EXPANSION
   */
  var RoofingMaterialsExpansion = {
    categories: {
      shingles: ['asphalt-shingles', 'architectural-shingles', 'metal-shingles'],
      metalRoofing: ['standing-seam', 'corrugated', 'metal-tiles'],
      tiles: ['clay-tiles', 'concrete-tiles', 'slate-tiles'],
      flatRoofing: ['membranes', 'built-up', 'modified-bitumen'],
      accessories: ['flashing', 'underlayment', 'ventilation', 'gutters']
    },
    sourcing: {
      furnostyles: 'furnostyles-branded-roofing',
      vendors: 'vetted-vendor-roofing',
      imports: 'imported-roofing',
      local: 'local-manufacturer-roofing'
    }
  };

  /**
   * FINISHING MATERIALS EXPANSION
   */
  var FinishingMaterialsExpansion = {
    categories: {
      wallFinishes: ['wallpaper', 'wall-decals', 'paneling', 'wainscoting'],
      floorFinishes: ['floor-finishes', 'sealers', 'polishes', 'cleaners'],
      trim: ['baseboards', 'crown-molding', 'trim', 'casing'],
      decorative: ['moldings', 'cornices', 'medallions', 'accents'],
      protective: ['coatings', 'sealants', 'waterproofing', 'fire-retardant']
    },
    sourcing: {
      furnostyles: 'furnostyles-branded-finishing',
      vendors: 'vetted-vendor-finishing',
      imports: 'imported-finishing',
      local: 'local-manufacturer-finishing'
    }
  };

  /**
   * PRODUCT SOURCING STRATEGY
   * Prepare architecture for Furnostyles, vendor, dropshipping, imported products
   */
  var ProductSourcingStrategy = {
    furnostyles: {
      branding: 'furnostyles-branded-products',
      quality: 'furnostyles-quality-controlled',
      pricing: 'furnostyles-pricing',
      availability: 'furnostyles-inventory'
    },
    vendors: {
      vetting: 'vetted-vendor-products',
      quality: 'vendor-quality-standards',
      pricing: 'vendor-pricing-with-margin',
      fulfillment: 'vendor-fulfillment'
    },
    dropshipping: {
      sourcing: 'furnostyles-sourced-dropshipping',
      suppliers: 'supplier-managed-fulfillment',
      quality: 'furnostyles-quality-gate',
      customer: 'furnostyles-customer-experience'
    },
    imports: {
      sourcing: 'global-sourcing-network',
      suppliers: 'international-suppliers',
      quality: 'import-quality-control',
      logistics: 'furnostyles-logistics-management'
    }
  };

  /**
   * MATERIALS ECOSYSTEM INTEGRATION STRATEGY
   */
  var MaterialsEcosystemIntegrationStrategy = {
    repairs: {
      connection: 'materials → repairs connection',
      supply: 'repair-material-supply',
      recommendations: 'material-recommendations-for-repairs'
    },
    construction: {
      connection: 'materials → construction connection',
      supply: 'construction-material-supply',
      coordination: 'construction-material-coordination'
    },
    artisans: {
      connection: 'materials → artisans connection',
      supply: 'artisan-material-supply',
      coordination: 'artisan-material-coordination'
    },
    sourcing: {
      connection: 'materials → sourcing connection',
      requests: 'material-sourcing-requests',
      custom: 'custom-material-sourcing'
    }
  };

  /**
   * EXPORT MATERIALS & HARDWARE EXPANSION
   */
  window.FurnostylesMaterialsHardwareExpansion = {
    ToolsMachinesExpansion: ToolsMachinesExpansion,
    FittingsFixturesExpansion: FittingsFixturesExpansion,
    TilesFlooringExpansion: TilesFlooringExpansion,
    GypsumBoardsExpansion: GypsumBoardsExpansion,
    PlumbingSuppliesExpansion: PlumbingSuppliesExpansion,
    ElectricalSuppliesExpansion: ElectricalSuppliesExpansion,
    PaintsFinishingExpansion: PaintsFinishingExpansion,
    HardwareExpansion: HardwareExpansion,
    CementBuildingExpansion: CementBuildingExpansion,
    RoofingMaterialsExpansion: RoofingMaterialsExpansion,
    FinishingMaterialsExpansion: FinishingMaterialsExpansion,
    ProductSourcingStrategy: ProductSourcingStrategy,
    MaterialsEcosystemIntegrationStrategy: MaterialsEcosystemIntegrationStrategy
  };

}());
