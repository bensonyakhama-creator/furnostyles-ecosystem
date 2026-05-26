/**
 * Furnostyles Demo Products Data
 * 100+ products per marketplace (600+ total)
 * Generated for testing and demonstration
 */

(function() {
  'use strict';

  // Available images from assets/images
  const availableImages = [
    '1700913605754.jpg', '1700913611107.jpg', '1700913648279~3.jpg', '1700913658958~3.jpg',
    '1708799346915.jpg', '1710589254094.jpg', '1729806727925.jpg', '1730367885340.jpg',
    '1731438647947.jpg', '1732338086460.jpg', '1736746016993.jpg', '1746604163381.jpg',
    '1746683136170.jpg', '2.jpg', '254723404456_status_65623d4f2a68427fb48572b8b5601413.jpg',
    '464605278_399493566566020_4619312308634317938_n.jpg', '464800206_588622243743776_3108156736869662648_n.jpg',
    '464806747_588622313743769_3292953230547585113_n.jpg', '464841329_588621657077168_5986741594657638484_n.jpg',
    '465441634_575582948303648_6029823290549615334_n.jpg', '465652367_122129117696445292_2158594203849677933_n.jpg',
    '468369064_122179687736161389_5287743432668211361_n.jpg', '468395676_122179687544161389_6781856815836741460_n.jpg',
    '474130226_17954680202900293_7791435035514198423_n.jpg', '474393178_17954680211900293_5411768272626330408_n.jpg',
    '504272247_1963366681121359_3214441538834075884_n.jpg', '581246339_1441759664619885_5111824661593264898_n.jpg',
    'IMG-20230923-WA0107.jpg', 'IMG-20230923-WA0108.jpg', 'IMG-20230923-WA0109.jpg',
    'IMG-20251001-WA0053.jpg', 'IMG_20230722_162931.jpg', 'IMG_20230729_051626~4.jpg',
    'IMG_20230729_051836.jpg', 'IMG_20231110_175843.jpg', 'IMG_20231110_180107.jpg',
    'IMG_20251128_144552_MP.jpg', 'Screenshot_20230722-163009.jpg'
  ];

  // Helper to get random image
  function getRandomImage() {
    return 'assets/images/' + availableImages[Math.floor(Math.random() * availableImages.length)];
  }

  // Helper to generate random price
  function randomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Helper to generate random rating
  function randomRating() {
    return (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
  }

  // Helper to generate random review count
  function randomReviews() {
    return Math.floor(Math.random() * 500) + 10;
  }

  // Helper to generate random location
  const locations = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Naivasha'];
  function randomLocation() {
    return locations[Math.floor(Math.random() * locations.length)];
  }

  // Helper to generate seller names
  const sellers = ['Furnostyles', 'Premium Interiors Kenya', 'Luxury Home Decor', 'Elite Furniture', 'Modern Living', 'Classic Designs', 'Urban Comfort', 'Elegant Spaces'];
  function randomSeller() {
    return sellers[Math.floor(Math.random() * sellers.length)];
  }

  // FURNITURE MARKETPLACE - 120 products
  const furnitureCategories = ['Sofas', 'Beds', 'Dining Tables', 'Chairs', 'Wardrobes', 'Desks', 'Cabinets', 'TV Stands', 'Coffee Tables', 'Bookshelves'];
  const furnitureMaterials = ['Solid Wood', 'Velvet', 'Leather', 'Fabric', 'Mahogany', 'Oak', 'Pine', 'Upholstered'];
  
  const furnitureProducts = [];
  for (let i = 1; i <= 120; i++) {
    const category = furnitureCategories[Math.floor(Math.random() * furnitureCategories.length)];
    const material = furnitureMaterials[Math.floor(Math.random() * furnitureMaterials.length)];
    furnitureProducts.push({
      id: 'furn-' + i,
      title: `${material} ${category} - Premium ${category}`,
      category: category,
      subcategory: ['Living Room', 'Bedroom', 'Dining Room', 'Office', 'Outdoor'][Math.floor(Math.random() * 5)],
      price: randomPrice(15000, 250000),
      originalPrice: randomPrice(20000, 300000),
      discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 5 : 0,
      rating: randomRating(),
      reviews: randomReviews(),
      image: getRandomImage(),
      seller: randomSeller(),
      sellerRating: randomRating(),
      location: randomLocation(),
      condition: 'New',
      stock: Math.random() > 0.2 ? 'In Stock' : 'Limited Stock',
      featured: Math.random() > 0.8,
      description: `Premium ${category.toLowerCase()} made from ${material.toLowerCase()}. Handcrafted with attention to detail for lasting quality and elegance.`,
      specifications: {
        material: material,
        dimensions: `${randomPrice(100, 250)}cm x ${randomPrice(50, 150)}cm x ${randomPrice(40, 100)}cm`,
        color: ['Brown', 'Black', 'Grey', 'Beige', 'White', 'Navy'][Math.floor(Math.random() * 6)],
        assembly: 'Required',
        warranty: '2 Years'
      }
    });
  }

  // MATERIALS MARKETPLACE - 120 products
  const materialCategories = ['Tiles', 'Paint', 'Gypsum Boards', 'Cement', 'Steel Bars', 'Plumbing', 'Electrical', 'Flooring', 'Roofing', 'Hardware'];
  const materialBrands = ['Bamburi', 'Sarrai', 'DuraCoat', 'Basco', 'Crown', 'Mabati', 'Kenpipe', 'Solar'];
  
  const materialsProducts = [];
  for (let i = 1; i <= 120; i++) {
    const category = materialCategories[Math.floor(Math.random() * materialCategories.length)];
    const brand = materialBrands[Math.floor(Math.random() * materialBrands.length)];
    materialsProducts.push({
      id: 'mat-' + i,
      title: `${brand} ${category} - ${category} ${randomPrice(50, 500)} Units`,
      category: category,
      subcategory: ['Building', 'Finishing', 'Plumbing', 'Electrical', 'Structural'][Math.floor(Math.random() * 5)],
      price: randomPrice(500, 50000),
      originalPrice: randomPrice(600, 60000),
      discount: Math.random() > 0.5 ? Math.floor(Math.random() * 25) + 5 : 0,
      rating: randomRating(),
      reviews: randomReviews(),
      image: getRandomImage(),
      seller: randomSeller(),
      sellerRating: randomRating(),
      location: randomLocation(),
      condition: 'New',
      stock: Math.random() > 0.2 ? 'In Stock' : 'Bulk Order',
      featured: Math.random() > 0.8,
      description: `High-quality ${category.toLowerCase()} from ${brand}. Certified and tested for construction excellence.`,
      specifications: {
        brand: brand,
        quantity: `${randomPrice(10, 1000)} units`,
        grade: 'Premium',
        certification: 'KEBS Certified'
      }
    });
  }

  // SERVICES MARKETPLACE - 100 products
  const serviceCategories = ['Interior Design', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Renovation', 'Installation', 'Repair', 'Consultation', 'Maintenance'];
  const serviceProviders = ['Furnostyles Services', 'Expert Solutions', 'Pro Contractors', 'Master Craftsmen', 'Premium Services Kenya'];
  
  const servicesProducts = [];
  for (let i = 1; i <= 100; i++) {
    const category = serviceCategories[Math.floor(Math.random() * serviceCategories.length)];
    const provider = serviceProviders[Math.floor(Math.random() * serviceProviders.length)];
    servicesProducts.push({
      id: 'serv-' + i,
      title: `Professional ${category} Services by ${provider}`,
      category: category,
      subcategory: ['Home', 'Commercial', 'Industrial', 'Emergency'][Math.floor(Math.random() * 4)],
      price: randomPrice(2000, 100000),
      originalPrice: randomPrice(2500, 120000),
      discount: Math.random() > 0.5 ? Math.floor(Math.random() * 20) + 5 : 0,
      rating: randomRating(),
      reviews: randomReviews(),
      image: getRandomImage(),
      seller: provider,
      sellerRating: randomRating(),
      location: randomLocation(),
      condition: 'Service',
      stock: 'Available',
      featured: Math.random() > 0.8,
      description: `Expert ${category.toLowerCase()} services with ${randomPrice(5, 20)} years experience. Licensed and insured professionals.`,
      specifications: {
        provider: provider,
        responseTime: `${randomPrice(1, 24)} hours`,
        availability: 'Monday - Saturday',
        insurance: 'Fully Insured'
      }
    });
  }

  // REAL ESTATE MARKETPLACE - 80 products
  const propertyTypes = ['Apartment', 'House', 'Land', 'Commercial Space', 'Office', 'Warehouse'];
  const propertyLocations = ['Nairobi Westlands', 'Nairobi Kilimani', 'Mombasa Nyali', 'Kisumu Milimani', 'Nakuru CBD', 'Eldoret'];
  
  const realestateProducts = [];
  for (let i = 1; i <= 80; i++) {
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const location = propertyLocations[Math.floor(Math.random() * propertyLocations.length)];
    realestateProducts.push({
      id: 'prop-' + i,
      title: `${type} in ${location} - ${randomPrice(1, 10)} Bedroom${randomPrice(1, 10) > 1 ? 's' : ''}`,
      category: type,
      subcategory: ['Sale', 'Rent', 'Lease'][Math.floor(Math.random() * 3)],
      price: randomPrice(500000, 50000000),
      originalPrice: randomPrice(600000, 55000000),
      discount: Math.random() > 0.5 ? Math.floor(Math.random() * 15) + 3 : 0,
      rating: randomRating(),
      reviews: randomReviews(),
      image: getRandomImage(),
      seller: randomSeller(),
      sellerRating: randomRating(),
      location: location,
      condition: 'New',
      stock: 'Available',
      featured: Math.random() > 0.8,
      description: `Beautiful ${type.toLowerCase()} located in ${location}. Prime location with excellent amenities.`,
      specifications: {
        bedrooms: randomPrice(1, 6),
        bathrooms: randomPrice(1, 4),
        size: `${randomPrice(50, 500)} sqm`,
        parking: randomPrice(1, 3) + ' spaces'
      }
    });
  }

  // SECONDHAND MARKETPLACE - 100 products
  const secondhandCategories = ['Furniture', 'Appliances', 'Electronics', 'Kitchen Items', 'Decor', 'Tools', 'Fitness', 'Books'];
  const conditions = ['Like New', 'Good', 'Fair'];
  
  const secondhandProducts = [];
  for (let i = 1; i <= 100; i++) {
    const category = secondhandCategories[Math.floor(Math.random() * secondhandCategories.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    secondhandProducts.push({
      id: 'used-' + i,
      title: `Used ${category} - ${condition} Condition`,
      category: category,
      subcategory: ['Home', 'Kitchen', 'Office', 'Outdoor'][Math.floor(Math.random() * 4)],
      price: randomPrice(1000, 50000),
      originalPrice: randomPrice(5000, 100000),
      discount: Math.random() > 0.3 ? Math.floor(Math.random() * 60) + 30 : 0,
      rating: randomRating(),
      reviews: randomReviews(),
      image: getRandomImage(),
      seller: randomSeller(),
      sellerRating: randomRating(),
      location: randomLocation(),
      condition: condition,
      stock: Math.random() > 0.3 ? 'Available' : 'Sold',
      featured: Math.random() > 0.8,
      description: `Quality ${category.toLowerCase()} in ${condition.toLowerCase()} condition. Fully inspected and tested.`,
      specifications: {
        condition: condition,
        age: `${randomPrice(1, 5)} years`,
        originalPrice: randomPrice(5000, 100000),
        inspection: 'Quality Checked'
      }
    });
  }

  // SOURCING MARKETPLACE - 80 products
  const sourcingCategories = ['Furniture', 'Materials', 'Electronics', 'Textiles', 'Machinery', 'Auto Parts', 'Chemicals', 'Food Products'];
  const sourcingOrigins = ['China', 'Turkey', 'UAE', 'India', 'Vietnam', 'Thailand', 'Germany', 'Italy'];
  
  const sourcingProducts = [];
  for (let i = 1; i <= 80; i++) {
    const category = sourcingCategories[Math.floor(Math.random() * sourcingCategories.length)];
    const origin = sourcingOrigins[Math.floor(Math.random() * sourcingOrigins.length)];
    sourcingProducts.push({
      id: 'src-' + i,
      title: `${category} from ${origin} - Bulk Order`,
      category: category,
      subcategory: ['Import', 'Wholesale', 'Dropshipping'][Math.floor(Math.random() * 3)],
      price: randomPrice(10000, 500000),
      originalPrice: randomPrice(12000, 600000),
      discount: Math.random() > 0.5 ? Math.floor(Math.random() * 20) + 5 : 0,
      rating: randomRating(),
      reviews: randomReviews(),
      image: getRandomImage(),
      seller: randomSeller(),
      sellerRating: randomRating(),
      location: origin,
      condition: 'New',
      stock: 'Bulk Order',
      moq: randomPrice(10, 500),
      featured: Math.random() > 0.8,
      description: `Premium ${category.toLowerCase()} sourced directly from ${origin}. High quality at competitive prices.`,
      specifications: {
        origin: origin,
        moq: randomPrice(10, 500) + ' units',
        shipping: 'FOB/CIF',
        leadTime: `${randomPrice(15, 60)} days`
      }
    });
  }

  // Export all products
  window.FurnostylesDemoProducts = {
    furniture: furnitureProducts,
    materials: materialsProducts,
    services: servicesProducts,
    realestate: realestateProducts,
    secondhand: secondhandProducts,
    sourcing: sourcingProducts,
    all: [...furnitureProducts, ...materialsProducts, ...servicesProducts, ...realestateProducts, ...secondhandProducts, ...sourcingProducts]
  };

  console.log('[Demo Products] Loaded:', {
    furniture: furnitureProducts.length,
    materials: materialsProducts.length,
    services: servicesProducts.length,
    realestate: realestateProducts.length,
    secondhand: secondhandProducts.length,
    sourcing: sourcingProducts.length,
    total: window.FurnostylesDemoProducts.all.length
  });

})();
