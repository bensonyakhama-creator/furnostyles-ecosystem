/**
 * FURNOSTYLES — SERVICES DEMO DATA
 * ================================
 * File: shared/demo-data/services-demo.js
 * Purpose: Demo services for marketplace testing
 * 
 * This is TEST/DUMMY data for demonstration purposes only.
 * No real payments, no real users, no real transactions.
 */

window.FurnostylesServicesDemo = {
  services: [
    // PLUMBING (6 items)
    {
      id: "srv-001",
      title: "Emergency Plumbing Services",
      category: "Plumbing",
      location: "Nairobi",
      responseTime: "30 minutes",
      rating: 4.8,
      featured: true,
      image: "assets/images/bed-burgundy-velvet-headboard.jpg",
      description: "24/7 emergency plumbing. Leaks, blockages, burst pipes.",
      provider: "PlumbPro Kenya"
    },
    {
      id: "srv-002",
      title: "Bathroom Installation",
      category: "Plumbing",
      location: "Westlands",
      responseTime: "Same day",
      rating: 4.7,
      featured: false,
      image: "assets/images/bed-brown-panel-headboard.jpg",
      description: "Complete bathroom installation. Tiling, fixtures, plumbing.",
      provider: "Elite Bathrooms"
    },
    {
      id: "srv-003",
      title: "Water Heater Installation",
      category: "Plumbing",
      location: "Karen",
      responseTime: "24 hours",
      rating: 4.9,
      featured: false,
      image: "assets/images/bed-grey-geometric-headboard.jpg",
      description: "Water heater installation and repair. Solar and electric.",
      provider: "PlumbPro Kenya"
    },
    {
      id: "srv-004",
      title: "Drainage System Installation",
      category: "Plumbing",
      location: "Kisumu",
      responseTime: "2-3 days",
      rating: 4.6,
      featured: false,
      image: "assets/images/bed-grey-stripe-teal-bench.jpg",
      description: "Complete drainage systems. Residential and commercial.",
      provider: "Lake Region Plumbing"
    },
    {
      id: "srv-005",
      title: "Pipe Repair and Replacement",
      category: "Plumbing",
      location: "Mombasa",
      responseTime: "Same day",
      rating: 4.7,
      featured: false,
      image: "assets/images/tv-unit-white-gold-handles.jpg",
      description: "Pipe repair and replacement. Leak detection and fixing.",
      provider: "Coastal Plumbing Services"
    },
    {
      id: "srv-006",
      title: "Septic Tank Services",
      category: "Plumbing",
      location: "Nakuru",
      responseTime: "24 hours",
      rating: 4.5,
      featured: false,
      image: "assets/images/tv-unit-white-oak.jpg",
      description: "Septic tank installation, pumping, and maintenance.",
      provider: "Rift Valley Plumbing"
    },

    // ELECTRICAL (6 items)
    {
      id: "srv-007",
      title: "Electrical Installation",
      category: "Electrical",
      location: "Nairobi",
      responseTime: "Same day",
      rating: 4.8,
      featured: true,
      image: "assets/images/sofa-grey-sectional-luxury.jpg",
      description: "Complete electrical installation. Wiring, panels, outlets.",
      provider: "ElectroWorld Kenya"
    },
    {
      id: "srv-008",
      title: "Solar Panel Installation",
      category: "Electrical",
      location: "Westlands",
      responseTime: "2-3 days",
      rating: 4.9,
      featured: false,
      image: "assets/images/sofa-gold-set-curtains.jpg",
      description: "Solar panel installation. Residential and commercial systems.",
      provider: "Solar Solutions Kenya"
    },
    {
      id: "srv-009",
      title: "Emergency Electrical Repairs",
      category: "Electrical",
      location: "Karen",
      responseTime: "30 minutes",
      rating: 4.7,
      featured: false,
      image: "assets/images/sofa-grey-u-shaped-teal.jpg",
      description: "24/7 emergency electrical repairs. Power outages, faults.",
      provider: "ElectroWorld Kenya"
    },
    {
      id: "srv-010",
      title: "Lighting Installation",
      category: "Electrical",
      location: "Kisumu",
      responseTime: "Same day",
      rating: 4.6,
      featured: false,
      image: "assets/images/sofa-cream-sectional-set.jpg",
      description: "Indoor and outdoor lighting installation. LED and traditional.",
      provider: "Lake Region Electrical"
    },
    {
      id: "srv-011",
      title: "Generator Installation",
      category: "Electrical",
      location: "Mombasa",
      responseTime: "1-2 days",
      rating: 4.7,
      featured: false,
      image: "assets/images/sofa-living-room-patterned.jpg",
      description: "Generator installation and maintenance. Backup power.",
      provider: "Coastal Electrical"
    },
    {
      id: "srv-012",
      title: "Home Automation Setup",
      category: "Electrical",
      location: "Nakuru",
      responseTime: "2-3 days",
      rating: 4.8,
      featured: false,
      image: "assets/images/table-coffee-hardwood-1.jpg",
      description: "Smart home automation. Lighting, security, climate.",
      provider: "Rift Valley Electrical"
    },

    // FURNITURE REPAIR (5 items)
    {
      id: "srv-013",
      title: "Sofa Repair and Upholstery",
      category: "Furniture Repair",
      location: "Nairobi",
      responseTime: "3-5 days",
      rating: 4.7,
      featured: true,
      image: "assets/images/table-coffee-hardwood-2.jpg",
      description: "Sofa repair and reupholstery. Fabric replacement, frame repair.",
      provider: "Furniture Fix Kenya"
    },
    {
      id: "srv-014",
      title: "Bed Frame Repair",
      category: "Furniture Repair",
      location: "Westlands",
      responseTime: "2-3 days",
      rating: 4.6,
      featured: false,
      image: "assets/images/2.jpg",
      description: "Bed frame repair and reinforcement. All types.",
      provider: "Furniture Fix Kenya"
    },
    {
      id: "srv-015",
      title: "Cabinet Repair",
      category: "Furniture Repair",
      location: "Karen",
      responseTime: "3-4 days",
      rating: 4.8,
      featured: false,
      image: "assets/images/bedroom-staging-modern-1.jpg",
      description: "Kitchen and cabinet repair. Hinges, drawers, doors.",
      provider: "Elite Woodwork"
    },
    {
      id: "srv-016",
      title: "Chair Repair",
      category: "Furniture Repair",
      location: "Kisumu",
      responseTime: "2-3 days",
      rating: 4.5,
      featured: false,
      image: "assets/images/sofa-cream-bubble-wood-table.jpg",
      description: "Chair repair and restoration. All materials.",
      provider: "Lake Region Woodwork"
    },
    {
      id: "srv-017",
      title: "Table Repair",
      category: "Furniture Repair",
      location: "Mombasa",
      responseTime: "3-4 days",
      rating: 4.6,
      featured: false,
      image: "assets/images/sofa-brown-l-shaped-ottoman.jpg",
      description: "Table repair and refinishing. Dining, coffee, office tables.",
      provider: "Coastal Woodwork"
    },

    // PAINTING (5 items)
    {
      id: "srv-018",
      title: "Interior Painting",
      category: "Painting",
      location: "Nairobi",
      responseTime: "2-3 days",
      rating: 4.8,
      featured: true,
      image: "assets/images/sofa-grey-l-shaped-teal.jpg",
      description: "Professional interior painting. All surfaces and finishes.",
      provider: "PaintPro Kenya"
    },
    {
      id: "srv-019",
      title: "Exterior Painting",
      category: "Painting",
      location: "Westlands",
      responseTime: "3-5 days",
      rating: 4.7,
      featured: false,
      image: "assets/images/sofa-teal-velvet-set.jpg",
      description: "Exterior house painting. Weather-resistant finishes.",
      provider: "PaintPro Kenya"
    },
    {
      id: "srv-020",
      title: "Wallpaper Installation",
      category: "Painting",
      location: "Karen",
      responseTime: "2-3 days",
      rating: 4.9,
      featured: false,
      image: "assets/images/living-room-modern-orange.jpg",
      description: "Wallpaper installation and removal. Premium designs.",
      provider: "Elite Decorators"
    },
    {
      id: "srv-021",
      title: "Texture Painting",
      category: "Painting",
      location: "Kisumu",
      responseTime: "3-4 days",
      rating: 4.6,
      featured: false,
      image: "assets/images/living-room-beige-cozy.jpg",
      description: "Texture and faux finish painting. Specialty techniques.",
      provider: "Lake Region Painters"
    },
    {
      id: "srv-022",
      title: "Commercial Painting",
      category: "Painting",
      location: "Mombasa",
      responseTime: "5-7 days",
      rating: 4.7,
      featured: false,
      image: "assets/images/property-kitchen-dining.jpg",
      description: "Commercial painting services. Offices, retail, industrial.",
      provider: "Coastal Painters"
    },

    // GYPSUM (5 items)
    {
      id: "srv-023",
      title: "Gypsum Ceiling Installation",
      category: "Gypsum",
      location: "Nairobi",
      responseTime: "2-3 days",
      rating: 4.8,
      featured: true,
      image: "assets/images/property-living-furnished.jpg",
      description: "Gypsum ceiling installation. Modern designs and lighting.",
      provider: "Gypsum Experts Kenya"
    },
    {
      id: "srv-024",
      title: "Gypsum Partitioning",
      category: "Gypsum",
      location: "Westlands",
      responseTime: "2-3 days",
      rating: 4.7,
      featured: false,
      image: "assets/images/table-nesting-black-glass-1.jpg",
      description: "Gypsum partition walls. Office and residential.",
      provider: "Gypsum Experts Kenya"
    },
    {
      id: "srv-025",
      title: "Gypsum Cornice Installation",
      category: "Gypsum",
      location: "Karen",
      responseTime: "1-2 days",
      rating: 4.9,
      featured: false,
      image: "assets/images/table-nesting-black-glass-2.jpg",
      description: "Gypsum cornice installation. Decorative ceiling borders.",
      provider: "Elite Gypsum"
    },
    {
      id: "srv-026",
      title: "Gypsum Repair",
      category: "Gypsum",
      location: "Kisumu",
      responseTime: "Same day",
      rating: 4.6,
      featured: false,
      image: "assets/images/sofa-cream-set-marble.jpg",
      description: "Gypsum ceiling and wall repair. Crack fixing.",
      provider: "Lake Region Gypsum"
    },
    {
      id: "srv-027",
      title: "False Ceiling Design",
      category: "Gypsum",
      location: "Mombasa",
      responseTime: "3-4 days",
      rating: 4.7,
      featured: false,
      image: "assets/images/property-luxury-villa.jpg",
      description: "Custom false ceiling design. Modern and traditional.",
      provider: "Coastal Gypsum"
    },

    // TILING (4 items)
    {
      id: "srv-028",
      title: "Floor Tiling",
      category: "Tiling",
      location: "Nairobi",
      responseTime: "3-5 days",
      rating: 4.8,
      featured: true,
      image: "assets/images/bed-dark-wood-ottomans.jpg",
      description: "Professional floor tiling. All tile types and patterns.",
      provider: "Tile Masters Kenya"
    },
    {
      id: "srv-029",
      title: "Wall Tiling",
      category: "Tiling",
      location: "Westlands",
      responseTime: "2-3 days",
      rating: 4.7,
      featured: false,
      image: "assets/images/bedroom-staging-modern-2.jpg",
      description: "Wall tiling for bathrooms and kitchens. Waterproof.",
      provider: "Tile Masters Kenya"
    },
    {
      id: "srv-030",
      title: "Tile Repair",
      category: "Tiling",
      location: "Karen",
      responseTime: "Same day",
      rating: 4.6,
      featured: false,
      image: "assets/images/bed-dark-headboard-blue.jpg",
      description: "Tile repair and replacement. Crack and chip fixing.",
      provider: "Elite Tiling"
    },
    {
      id: "srv-031",
      title: "Mosaic Tiling",
      category: "Tiling",
      location: "Kisumu",
      responseTime: "4-5 days",
      rating: 4.8,
      featured: false,
      image: "assets/images/bathroom-grey-modern.jpg",
      description: "Mosaic tile installation. Custom designs and patterns.",
      provider: "Lake Region Tiling"
    },

    // WATERPROOFING (4 items)
    {
      id: "srv-032",
      title: "Roof Waterproofing",
      category: "Waterproofing",
      location: "Nairobi",
      responseTime: "2-3 days",
      rating: 4.8,
      featured: true,
      image: "assets/images/table-coffee-round-wood.jpg",
      description: "Roof waterproofing. Leak prevention and repair.",
      provider: "Waterproof Kenya"
    },
    {
      id: "srv-033",
      title: "Bathroom Waterproofing",
      category: "Waterproofing",
      location: "Westlands",
      responseTime: "1-2 days",
      rating: 4.9,
      featured: false,
      image: "assets/images/bed-dark-wood-suite-1.jpg",
      description: "Bathroom waterproofing. Wet area protection.",
      provider: "Waterproof Kenya"
    },
    {
      id: "srv-034",
      title: "Basement Waterproofing",
      category: "Waterproofing",
      location: "Karen",
      responseTime: "3-4 days",
      rating: 4.7,
      featured: false,
      image: "assets/images/bed-burgundy-velvet-headboard.jpg",
      description: "Basement waterproofing. Damp proofing and sealing.",
      provider: "Elite Waterproofing"
    },
    {
      id: "srv-035",
      title: "Tank Waterproofing",
      category: "Waterproofing",
      location: "Kisumu",
      responseTime: "2-3 days",
      rating: 4.6,
      featured: false,
      image: "assets/images/bed-brown-panel-headboard.jpg",
      description: "Water tank waterproofing. Leak prevention.",
      provider: "Lake Region Waterproofing"
    },

    // ROOFING (4 items)
    {
      id: "srv-036",
      title: "Roof Installation",
      category: "Roofing",
      location: "Nairobi",
      responseTime: "5-7 days",
      rating: 4.8,
      featured: true,
      image: "assets/images/bed-grey-geometric-headboard.jpg",
      description: "Complete roof installation. All roofing materials.",
      provider: "Roofing Masters Kenya"
    },
    {
      id: "srv-037",
      title: "Roof Repair",
      category: "Roofing",
      location: "Westlands",
      responseTime: "Same day",
      rating: 4.7,
      featured: false,
      image: "assets/images/bed-grey-stripe-teal-bench.jpg",
      description: "Roof leak repair. Emergency and scheduled.",
      provider: "Roofing Masters Kenya"
    },
    {
      id: "srv-038",
      title: "Gutter Installation",
      category: "Roofing",
      location: "Karen",
      responseTime: "1-2 days",
      rating: 4.6,
      featured: false,
      image: "assets/images/tv-unit-white-gold-handles.jpg",
      description: "Gutter installation and repair. Water drainage.",
      provider: "Elite Roofing"
    },
    {
      id: "srv-039",
      title: "Roof Inspection",
      category: "Roofing",
      location: "Mombasa",
      responseTime: "Same day",
      rating: 4.7,
      featured: false,
      image: "assets/images/tv-unit-white-oak.jpg",
      description: "Professional roof inspection. Condition assessment.",
      provider: "Coastal Roofing"
    },

    // RENOVATIONS (4 items)
    {
      id: "srv-040",
      title: "Home Renovation",
      category: "Renovations",
      location: "Nairobi",
      responseTime: "2-4 weeks",
      rating: 4.8,
      featured: true,
      image: "assets/images/sofa-grey-sectional-luxury.jpg",
      description: "Complete home renovation. Design to finish.",
      provider: "Renovation Kenya"
    },
    {
      id: "srv-041",
      title: "Kitchen Renovation",
      category: "Renovations",
      location: "Westlands",
      responseTime: "1-2 weeks",
      rating: 4.9,
      featured: false,
      image: "assets/images/sofa-gold-set-curtains.jpg",
      description: "Kitchen renovation. Cabinets, appliances, finishes.",
      provider: "Elite Renovations"
    },
    {
      id: "srv-042",
      title: "Bathroom Renovation",
      category: "Renovations",
      location: "Karen",
      responseTime: "1-2 weeks",
      rating: 4.8,
      featured: false,
      image: "assets/images/sofa-grey-u-shaped-teal.jpg",
      description: "Bathroom renovation. Complete makeover.",
      provider: "Elite Renovations"
    },
    {
      id: "srv-043",
      title: "Office Renovation",
      category: "Renovations",
      location: "Kisumu",
      responseTime: "2-3 weeks",
      rating: 4.7,
      featured: false,
      image: "assets/images/sofa-cream-sectional-set.jpg",
      description: "Office renovation. Modern workspace design.",
      provider: "Lake Region Renovations"
    },

    // CARPENTRY (4 items)
    {
      id: "srv-044",
      title: "Custom Carpentry",
      category: "Carpentry",
      location: "Nairobi",
      responseTime: "1-2 weeks",
      rating: 4.8,
      featured: true,
      image: "assets/images/sofa-living-room-patterned.jpg",
      description: "Custom carpentry work. Built-ins, shelving, furniture.",
      provider: "Woodcraft Kenya"
    },
    {
      id: "srv-045",
      title: "Door Installation",
      category: "Carpentry",
      location: "Westlands",
      responseTime: "1-2 days",
      rating: 4.7,
      featured: false,
      image: "assets/images/table-coffee-hardwood-1.jpg",
      description: "Door installation and repair. All types.",
      provider: "Woodcraft Kenya"
    },
    {
      id: "srv-046",
      title: "Window Installation",
      category: "Carpentry",
      location: "Karen",
      responseTime: "2-3 days",
      rating: 4.6,
      featured: false,
      image: "assets/images/table-coffee-hardwood-2.jpg",
      description: "Window installation. Wood, aluminum, uPVC.",
      provider: "Elite Carpentry"
    },
    {
      id: "srv-047",
      title: "Staircase Construction",
      category: "Carpentry",
      location: "Kisumu",
      responseTime: "1-2 weeks",
      rating: 4.7,
      featured: false,
      image: "assets/images/2.jpg",
      description: "Custom staircase construction. All designs.",
      provider: "Lake Region Carpentry"
    },

    // WELDING (4 items)
    {
      id: "srv-048",
      title: "Metal Fabrication",
      category: "Welding",
      location: "Nairobi",
      responseTime: "3-5 days",
      rating: 4.7,
      featured: true,
      image: "assets/images/bedroom-staging-modern-1.jpg",
      description: "Custom metal fabrication. Gates, railings, structures.",
      provider: "Metalworks Kenya"
    },
    {
      id: "srv-049",
      title: "Gate Welding",
      category: "Welding",
      location: "Westlands",
      responseTime: "2-3 days",
      rating: 4.8,
      featured: false,
      image: "assets/images/sofa-cream-bubble-wood-table.jpg",
      description: "Custom gate welding. Design and installation.",
      provider: "Metalworks Kenya"
    },
    {
      id: "srv-050",
      title: "Balcony Railing",
      category: "Welding",
      location: "Karen",
      responseTime: "2-3 days",
      rating: 4.6,
      featured: false,
      image: "assets/images/sofa-brown-l-shaped-ottoman.jpg",
      description: "Balcony railing installation. Safety and style.",
      provider: "Elite Metalworks"
    },
    {
      id: "srv-051",
      title: "Steel Structure",
      category: "Welding",
      location: "Mombasa",
      responseTime: "1-2 weeks",
      rating: 4.7,
      featured: false,
      image: "assets/images/sofa-grey-l-shaped-teal.jpg",
      description: "Steel structure fabrication. Commercial and industrial.",
      provider: "Coastal Metalworks"
    },

    // INTERIOR DESIGN (4 items)
    {
      id: "srv-052",
      title: "Interior Design Consultation",
      category: "Interior Design",
      location: "Nairobi",
      responseTime: "1 week",
      rating: 4.9,
      featured: true,
      image: "assets/images/sofa-teal-velvet-set.jpg",
      description: "Professional interior design consultation. Space planning.",
      provider: "Design Studio Kenya"
    },
    {
      id: "srv-053",
      title: "Space Planning",
      category: "Interior Design",
      location: "Westlands",
      responseTime: "3-5 days",
      rating: 4.8,
      featured: false,
      image: "assets/images/living-room-modern-orange.jpg",
      description: "Space planning and layout optimization. All rooms.",
      provider: "Design Studio Kenya"
    },
    {
      id: "srv-054",
      title: "Color Consultation",
      category: "Interior Design",
      location: "Karen",
      responseTime: "1-2 days",
      rating: 4.7,
      featured: false,
      image: "assets/images/living-room-beige-cozy.jpg",
      description: "Color consultation. Paint, decor, and harmony.",
      provider: "Elite Design"
    },
    {
      id: "srv-055",
      title: "3D Visualization",
      category: "Interior Design",
      location: "Kisumu",
      responseTime: "1 week",
      rating: 4.8,
      featured: false,
      image: "assets/images/property-kitchen-dining.jpg",
      description: "3D interior visualization. See before you build.",
      provider: "Lake Region Design"
    },

    // PROPERTY MAINTENANCE (4 items)
    {
      id: "srv-056",
      title: "Property Maintenance",
      category: "Property Maintenance",
      location: "Nairobi",
      responseTime: "Weekly",
      rating: 4.8,
      featured: true,
      image: "assets/images/property-living-furnished.jpg",
      description: "Regular property maintenance. Preventive care.",
      provider: "Property Care Kenya"
    },
    {
      id: "srv-057",
      title: "Garden Maintenance",
      category: "Property Maintenance",
      location: "Westlands",
      responseTime: "Weekly",
      rating: 4.7,
      featured: false,
      image: "assets/images/table-nesting-black-glass-1.jpg",
      description: "Garden maintenance. Lawn care, plants, irrigation.",
      provider: "Green Thumb Kenya"
    },
    {
      id: "srv-058",
      title: "Pool Maintenance",
      category: "Property Maintenance",
      location: "Karen",
      responseTime: "Weekly",
      rating: 4.9,
      featured: false,
      image: "assets/images/table-nesting-black-glass-2.jpg",
      description: "Swimming pool maintenance. Cleaning and chemicals.",
      provider: "Pool Pro Kenya"
    },
    {
      id: "srv-059",
      title: "Pest Control",
      category: "Property Maintenance",
      location: "Kisumu",
      responseTime: "Same day",
      rating: 4.6,
      featured: false,
      image: "assets/images/sofa-cream-set-marble.jpg",
      description: "Pest control services. All pests and prevention.",
      provider: "Lake Region Pest Control"
    },

    // AIRBNB SETUP (3 items)
    {
      id: "srv-060",
      title: "Airbnb Furnishing",
      category: "Airbnb Setup",
      location: "Nairobi",
      responseTime: "2-3 weeks",
      rating: 4.9,
      featured: true,
      image: "assets/images/property-luxury-villa.jpg",
      description: "Complete Airbnb furnishing. Design to ready.",
      provider: "Airbnb Kenya Experts"
    },
    {
      id: "srv-061",
      title: "Airbnb Photography",
      category: "Airbnb Setup",
      location: "Westlands",
      responseTime: "2-3 days",
      rating: 4.8,
      featured: false,
      image: "assets/images/bed-dark-wood-ottomans.jpg",
      description: "Professional Airbnb photography. Listing optimization.",
      provider: "Airbnb Kenya Experts"
    },
    {
      id: "srv-062",
      title: "Airbnb Management",
      category: "Airbnb Setup",
      location: "Karen",
      responseTime: "Ongoing",
      rating: 4.7,
      featured: false,
      image: "assets/images/bedroom-staging-modern-2.jpg",
      description: "Airbnb property management. Guest communication.",
      provider: "Airbnb Kenya Experts"
    },

    // OFFICE SETUP (3 items)
    {
      id: "srv-063",
      title: "Office Setup",
      category: "Office Setup",
      location: "Nairobi",
      responseTime: "1-2 weeks",
      rating: 4.8,
      featured: true,
      image: "assets/images/bed-dark-headboard-blue.jpg",
      description: "Complete office setup. Furniture, IT, layout.",
      provider: "Office Solutions Kenya"
    },
    {
      id: "srv-064",
      title: "Office Furniture Installation",
      category: "Office Setup",
      location: "Westlands",
      responseTime: "2-3 days",
      rating: 4.7,
      featured: false,
      image: "assets/images/bathroom-grey-modern.jpg",
      description: "Office furniture installation. Desks, chairs, storage.",
      provider: "Office Solutions Kenya"
    },
    {
      id: "srv-065",
      title: "Office IT Setup",
      category: "Office Setup",
      location: "Karen",
      responseTime: "3-5 days",
      rating: 4.8,
      featured: false,
      image: "assets/images/table-coffee-round-wood.jpg",
      description: "Office IT setup. Network, computers, security.",
      provider: "Tech Office Solutions"
    }
  ],

  // Categories for filtering
  categories: [
    "Plumbing",
    "Electrical",
    "Furniture Repair",
    "Painting",
    "Gypsum",
    "Tiling",
    "Waterproofing",
    "Roofing",
    "Renovations",
    "Carpentry",
    "Welding",
    "Interior Design",
    "Property Maintenance",
    "Airbnb Setup",
    "Office Setup"
  ],

  // Locations for filtering
  locations: [
    "Nairobi",
    "Westlands",
    "Karen",
    "Kisumu",
    "Mombasa",
    "Nakuru"
  ],

  // Response times for filtering
  responseTimes: [
    "30 minutes",
    "Same day",
    "24 hours",
    "1-2 days",
    "2-3 days",
    "3-5 days",
    "1-2 weeks",
    "2-4 weeks",
    "Ongoing"
  ]
};
