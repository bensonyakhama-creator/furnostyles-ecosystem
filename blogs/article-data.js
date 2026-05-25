/**
 * FURNOSTYLES — ARTICLE DATA STORE
 * ==================================
 * File: blogs/article-data.js
 * Purpose: Central metadata store for all Furnostyles blog articles.
 *          Static-hosting compatible. No backend required.
 *
 * Usage:
 *   <script src="blogs/article-data.js"></script>
 *   // Access via window.FurnostylesArticles
 *
 * This file is the single source of truth for:
 *   - Article metadata (titles, descriptions, categories, etc.)
 *   - Article relationships (related articles, related services)
 *   - Category definitions
 *   - Service definitions for linking
 */

(function () {
  'use strict';

  /* ============================================================
     CATEGORY DEFINITIONS
  ============================================================ */

  var CATEGORIES = [
    { id: 'interior-design', label: 'Interior Design', slug: 'interior-design', description: 'Design guides for homes, apartments and living spaces in Kenya.', featured: true },
    { id: 'construction-finishing', label: 'Construction & Finishing', slug: 'construction-finishing', description: 'House finishing, materials, ceilings, walls and floors.', featured: true },
    { id: 'repairs-maintenance', label: 'Repairs & Maintenance', slug: 'repairs-maintenance', description: 'Home repairs, maintenance tips and property value protection.', featured: true },
    { id: 'furniture-fittings', label: 'Furniture & Fittings', slug: 'furniture-fittings', description: 'Custom furniture, built-in wardrobes, kitchen cabinets and more.', featured: true },
    { id: 'real-estate', label: 'Real Estate & Property', slug: 'real-estate', description: 'Airbnb design, rental finishing and investment property interiors.', featured: true },
    { id: 'commercial', label: 'Commercial Spaces', slug: 'commercial', description: 'Office, shop, restaurant and hospitality interior design.', featured: false },
    { id: 'luxury', label: 'Luxury Living', slug: 'luxury', description: 'Premium and executive home interior design.', featured: false },
    { id: 'buying-guides', label: 'Buying Guides', slug: 'buying-guides', description: 'How to choose materials, contractors and design services.', featured: false }
  ];

  /* ============================================================
     SERVICE DEFINITIONS
     (for related-services blocks and internal linking)
  ============================================================ */

  var SERVICES = [
    { id: 'interior-design', name: 'Interior Design', url: '../services.html', description: 'Full-service interior design for homes and commercial spaces.', icon: 'design' },
    { id: 'house-finishing', name: 'House Finishing', url: '../services.html', description: 'Complete finishing from ceiling to floor for new and existing homes.', icon: 'finish' },
    { id: 'repairs', name: 'Home Repairs', url: '../repairs.html', description: 'Expert repairs for leaks, cracks, electrical and plumbing issues.', icon: 'repair' },
    { id: 'custom-furniture', name: 'Custom Furniture', url: '../services.html', description: 'Built-in wardrobes, kitchen cabinets, sofas and dining sets made to order.', icon: 'furniture' },
    { id: 'property-finishing', name: 'Property Finishing', url: '../realestate.html', description: 'Finishing services for rentals, Airbnbs and investment properties.', icon: 'property' },
    { id: 'portfolio', name: 'View Portfolio', url: '../portfolio.html', description: 'See real Furnostyles projects across Nairobi and Kenya.', icon: 'portfolio' },
    { id: 'contact', name: 'Contact Us', url: '../contact.html', description: 'Request a free consultation and detailed quotation.', icon: 'contact' }
  ];

  /* ============================================================
     ARTICLE METADATA
     All article paths are relative to /blogs/
  ============================================================ */

  var ARTICLES = [
    /* ===================== CORNERSTONE ARTICLES ===================== */
    {
      slug: 'modern-luxury-interior-design-kenya',
      title: 'The Complete Guide to Premium Interior Design in Kenya',
      description: 'A premium guide to interior design in Kenya. Learn how to plan, choose materials, light your space, select furniture and create a luxury home in Nairobi and beyond.',
      keywords: ['interior design Kenya', 'Nairobi interior designer', 'luxury home design Kenya', 'modern house interior', 'living room design Nairobi'],
      category: 'interior-design',
      tier: 'cornerstone',
      featured: true,
      status: 'published',
      publishedDate: '2026-05-22',
      updatedDate: '2026-05-22',
      readingTime: 12,
      wordCount: 3239,
      heroImage: '../assets/images/blogs/blog-1.jpg',
      heroAlt: 'Premium interior design in a modern Kenyan home with luxury finishes and custom furniture',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'trends', title: 'What Defines Luxury Interior Design in Kenya Today' },
        { id: 'planning', title: 'How to Plan Your Interior Design Project' },
        { id: 'materials', title: 'Choosing Materials That Last in the Kenyan Climate' },
        { id: 'lighting', title: 'Lighting Design: The Most Underrated Element' },
        { id: 'furniture', title: 'Furniture, Fixtures and Custom Fittings' },
        { id: 'ceilings', title: 'Ceiling Design: Gypsum, T and G, and Modern Options' },
        { id: 'finishes', title: 'Wall and Floor Finishes That Elevate a Space' },
        { id: 'budgeting', title: 'Budgeting for Interior Design in Kenya' },
        { id: 'mistakes', title: 'Common Mistakes to Avoid' },
        { id: 'how-furnostyles-helps', title: 'How Furnostyles Can Help' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['interior-design', 'custom-furniture', 'repairs', 'portfolio', 'contact'],
      relatedArticles: ['living-room-design-kenya', 'gypsum-ceiling-kenya', 'flooring-materials-kenya'],
      faqs: [
        { question: 'How much does interior design cost in Kenya?', answer: 'Interior design costs in Kenya vary widely depending on scope and finish level. A single-room refresh might cost KES 100,000–300,000. A full 3-bedroom home finishing project typically ranges from KES 1,500,000 to KES 4,000,000. Luxury finishes for large homes can exceed KES 5,000,000. Furnostyles provides detailed written quotations before any work begins.' },
        { question: 'How long does a full interior design project take?', answer: 'A typical full-home interior project in Kenya takes 8–16 weeks from design approval to completion. Smaller projects like a single room or kitchen renovation can be completed in 3–6 weeks. Large luxury homes with extensive custom work may take 20–24 weeks.' },
        { question: 'Should I hire an interior designer or do it myself?', answer: 'For small updates, DIY is reasonable. For full home finishing, kitchen design, custom furniture, or commercial spaces, professional interior design saves money, time and stress. The cost of fixing poor DIY decisions usually exceeds the cost of hiring a professional from the start.' },
        { question: 'What is the best flooring for Kenyan homes?', answer: 'Porcelain tiles are the most practical choice for most Kenyan homes. They resist water, scratches and stains, they are easy to clean, and they stay cool in warm weather. For living rooms and bedrooms where warmth is desired, engineered wood or SPC vinyl are excellent alternatives.' },
        { question: 'Can Furnostyles work with my existing furniture?', answer: 'Yes. We regularly design around existing furniture that clients want to keep. During the initial consultation, we assess what you already own, what condition it is in, and how it fits into the new design.' },
        { question: 'Do you offer interior design for rentals and Airbnbs?', answer: 'Yes. Furnostyles has extensive experience designing for rental properties and short-term rentals. For rentals, we prioritise durable materials, easy maintenance, and finishes that appeal to a broad range of tenants. For Airbnbs, we focus on photogenic design, guest comfort, and efficient use of space.' }
      ],
      schema: {
        type: 'Article',
        headline: 'The Complete Guide to Premium Interior Design in Kenya',
        image: 'https://furnostyles.com/assets/images/blogs/blog-1.jpg',
        datePublished: '2026-05-22',
        dateModified: '2026-05-22',
        author: { name: 'Furnostyles Editorial' },
        publisher: { name: 'Furnostyles', logo: 'https://furnostyles.com/assets/images/logo.png' }
      }
    },

    /* ===================== PLANNED CORNERSTONE ARTICLES ===================== */
    {
      slug: 'house-finishing-kenya',
      title: 'House Finishing in Kenya: From Shell to Move-In Ready',
      description: 'A complete guide to house finishing in Kenya. Learn about ceilings, walls, floors, kitchens and how to budget for a full finishing project in Nairobi.',
      keywords: ['house finishing Kenya', 'construction finishing Nairobi', 'home finishing cost', 'shell to finish Kenya'],
      category: 'construction-finishing',
      tier: 'cornerstone',
      featured: true,
      status: 'planned',
      publishedDate: null,
      updatedDate: null,
      readingTime: 14,
      wordCount: null,
      heroImage: '../assets/images/blogs/blog-2.jpg',
      heroAlt: 'House finishing in progress with gypsum ceiling, tiled floors and painted walls in a Kenyan home',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'what-is-finishing', title: 'What House Finishing Actually Includes' },
        { id: 'ceiling-finishing', title: 'Ceiling Finishing: Your Fifth Wall' },
        { id: 'wall-finishing', title: 'Wall Finishing: Paint, Texture and Cladding' },
        { id: 'floor-finishing', title: 'Floor Finishing: Tiles, Wood and Beyond' },
        { id: 'kitchen-bathroom', title: 'Kitchen and Bathroom Finishing' },
        { id: 'electrical-lighting', title: 'Electrical and Lighting Installation' },
        { id: 'sequence', title: 'The Right Sequence for Finishing Work' },
        { id: 'budgeting', title: 'Budgeting for Full House Finishing' },
        { id: 'mistakes', title: 'Common Finishing Mistakes to Avoid' },
        { id: 'how-furnostyles-helps', title: 'How Furnostyles Can Help' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['house-finishing', 'interior-design', 'repairs', 'contact'],
      relatedArticles: ['gypsum-ceiling-kenya', 'flooring-materials-kenya', 'wall-finishing-kenya'],
      faqs: [
        { question: 'How much does full house finishing cost in Kenya?', answer: 'Full house finishing in Kenya typically costs KES 1,500,000 to KES 5,000,000 for a 3–4 bedroom home, depending on materials, size and finish level.' },
        { question: 'What is the correct order for finishing a house?', answer: 'The standard sequence is: structural repairs, electrical and plumbing rough-in, ceiling, wall finishing, flooring, kitchen and bathroom fittings, painting touch-ups, then furniture and decoration.' },
        { question: 'How long does house finishing take?', answer: 'A typical 3-bedroom house finishing project takes 10–16 weeks. Larger homes or luxury finishes may take 20–24 weeks.' }
      ],
      schema: {
        type: 'Article',
        headline: 'House Finishing in Kenya: From Shell to Move-In Ready',
        image: 'https://furnostyles.com/assets/images/blogs/blog-2.jpg',
        datePublished: null,
        author: { name: 'Furnostyles Editorial' },
        publisher: { name: 'Furnostyles', logo: 'https://furnostyles.com/assets/images/logo.png' }
      }
    },

    {
      slug: 'home-repairs-maintenance-kenya',
      title: 'Smart Home Repairs and Maintenance That Protect Property Value',
      description: 'Learn which home repairs are worth doing, how to budget for maintenance, and how Furnostyles helps protect your property value in Kenya.',
      keywords: ['home repairs Kenya', 'property maintenance Nairobi', 'house repair services', 'increase home value Kenya'],
      category: 'repairs-maintenance',
      tier: 'cornerstone',
      featured: true,
      status: 'planned',
      publishedDate: null,
      updatedDate: null,
      readingTime: 12,
      wordCount: null,
      heroImage: '../assets/images/blogs/blog-3.jpg',
      heroAlt: 'Home repair work being completed by professional technicians in a Kenyan home',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'common-repairs', title: 'Common Home Repairs in Kenya' },
        { id: 'preventive-maintenance', title: 'Preventive Maintenance That Saves Money' },
        { id: 'repair-vs-renovate', title: 'Repair or Renovate: How to Decide' },
        { id: 'budgeting', title: 'Budgeting for Repairs and Maintenance' },
        { id: 'value-impact', title: 'How Repairs Affect Property Value' },
        { id: 'mistakes', title: 'Mistakes That Make Repairs More Expensive' },
        { id: 'how-furnostyles-helps', title: 'How Furnostyles Can Help' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['repairs', 'house-finishing', 'property-finishing', 'contact'],
      relatedArticles: ['house-finishing-kenya', 'preventive-maintenance-checklist'],
      faqs: [
        { question: 'How much do home repairs cost in Kenya?', answer: 'Repair costs vary by scope. Small repairs (leak fixes, electrical) range from KES 5,000–30,000. Major repairs (structural, re-wiring) can cost KES 100,000–500,000+' },
        { question: 'Should I repair or renovate?', answer: 'Repair when the structure is sound and only finishes are damaged. Renovate when layout, systems or structure need changing. Furnostyles can assess and advise.' }
      ],
      schema: {
        type: 'Article',
        headline: 'Smart Home Repairs and Maintenance That Protect Property Value',
        image: 'https://furnostyles.com/assets/images/blogs/blog-3.jpg',
        author: { name: 'Furnostyles Editorial' },
        publisher: { name: 'Furnostyles', logo: 'https://furnostyles.com/assets/images/logo.png' }
      }
    },

    {
      slug: 'custom-furniture-kenya',
      title: 'Custom Furniture and Built-in Fittings for Kenyan Homes',
      description: 'A guide to custom furniture in Kenya: built-in wardrobes, kitchen cabinets, sofas and dining sets made to fit your space and style.',
      keywords: ['custom furniture Kenya', 'built-in wardrobes Nairobi', 'kitchen cabinets Kenya', 'sofa design Kenya'],
      category: 'furniture-fittings',
      tier: 'cornerstone',
      featured: true,
      status: 'planned',
      publishedDate: null,
      updatedDate: null,
      readingTime: 11,
      wordCount: null,
      heroImage: '../assets/images/blogs/blog-4.jpg',
      heroAlt: 'Custom built-in wardrobe and kitchen cabinets in a modern Kenyan home',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'built-in-wardrobes', title: 'Built-in Wardrobes and Storage' },
        { id: 'kitchen-cabinets', title: 'Kitchen Cabinet Design and Materials' },
        { id: 'sofas-living', title: 'Custom Sofas and Living Room Furniture' },
        { id: 'bathroom-vanity', title: 'Bathroom Vanities and Fittings' },
        { id: 'materials', title: 'Materials That Last in Kenya' },
        { id: 'budgeting', title: 'Budgeting for Custom Furniture' },
        { id: 'mistakes', title: 'Common Mistakes When Buying Custom Furniture' },
        { id: 'how-furnostyles-helps', title: 'How Furnostyles Can Help' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['custom-furniture', 'interior-design', 'portfolio', 'contact'],
      relatedArticles: ['kitchen-cabinets-kenya', 'built-in-wardrobes-kenya', 'living-room-design-kenya'],
      faqs: [
        { question: 'How much does custom furniture cost in Kenya?', answer: 'Custom wardrobes range from KES 80,000–250,000 depending on size and materials. Kitchen cabinets start around KES 150,000 for a standard layout. Sofas range from KES 60,000–200,000.' },
        { question: 'How long does custom furniture take?', answer: 'Lead times are typically 4–8 weeks for wardrobes and kitchen cabinets. Sofas and dining sets take 3–5 weeks.' }
      ],
      schema: {
        type: 'Article',
        headline: 'Custom Furniture and Built-in Fittings for Kenyan Homes',
        image: 'https://furnostyles.com/assets/images/blogs/blog-4.jpg',
        author: { name: 'Furnostyles Editorial' },
        publisher: { name: 'Furnostyles', logo: 'https://furnostyles.com/assets/images/logo.png' }
      }
    },

    {
      slug: 'property-finishing-rentals-airbnb-kenya',
      title: 'Property Finishing for Rentals, Airbnbs and Investment Homes',
      description: 'Learn how to finish rental properties and Airbnbs for durability, appeal and strong returns. A guide for Kenyan landlords and investors.',
      keywords: ['Airbnb design Kenya', 'rental property finishing', 'investment property interior', 'real estate finishing Kenya'],
      category: 'real-estate',
      tier: 'cornerstone',
      featured: true,
      status: 'planned',
      publishedDate: null,
      updatedDate: null,
      readingTime: 13,
      wordCount: null,
      heroImage: '../assets/images/blogs/blog-5.jpg',
      heroAlt: 'A beautifully finished Airbnb rental property in Nairobi Kenya',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'airbnb-design', title: 'Airbnb Interior Design That Gets Booked' },
        { id: 'rental-finishing', title: 'Rental Property Finishing for Long-Term Value' },
        { id: 'investment-homes', title: 'Investment Property Finishing Strategy' },
        { id: 'durable-materials', title: 'Materials That Survive High Turnover' },
        { id: 'photography', title: 'Designing for Photography and Reviews' },
        { id: 'budgeting', title: 'Budgeting for Rental and Airbnb Finishing' },
        { id: 'mistakes', title: 'Mistakes That Cost Landlords Money' },
        { id: 'how-furnostyles-helps', title: 'How Furnostyles Can Help' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['property-finishing', 'house-finishing', 'interior-design', 'contact'],
      relatedArticles: ['house-finishing-kenya', 'home-repairs-maintenance-kenya', 'living-room-design-kenya'],
      faqs: [
        { question: 'How much should I spend on Airbnb finishing?', answer: 'Budget KES 300,000–800,000 for a 1–2 bedroom Airbnb, depending on location and target nightly rate. High-end properties in Kilimani or Westlands may require KES 1,000,000+ to compete.' },
        { question: 'What materials work best for rentals?', answer: 'Porcelain tiles (not ceramic), quartz countertops, powder-coated metals, and washable paint finishes. Avoid solid wood, light fabrics, and anything that stains easily.' }
      ],
      schema: {
        type: 'Article',
        headline: 'Property Finishing for Rentals, Airbnbs and Investment Homes',
        image: 'https://furnostyles.com/assets/images/blogs/blog-5.jpg',
        author: { name: 'Furnostyles Editorial' },
        publisher: { name: 'Furnostyles', logo: 'https://furnostyles.com/assets/images/logo.png' }
      }
    },

    /* ===================== SUPPORTING ARTICLES (planned) ===================== */
    {
      slug: 'living-room-design-kenya',
      title: 'How to Design a Living Room That Feels Spacious in Kenyan Homes',
      description: 'Layout, lighting and furniture tips to make any Kenyan living room feel larger, brighter and more comfortable.',
      keywords: ['living room design Kenya', 'small living room ideas', 'open plan layout', 'living room furniture arrangement'],
      category: 'interior-design',
      tier: 'supporting',
      featured: false,
      status: 'planned',
      publishedDate: null,
      updatedDate: null,
      readingTime: 9,
      wordCount: null,
      heroImage: '../assets/images/blogs/blog-6.jpg',
      heroAlt: 'A spacious, well-lit living room in a Nairobi apartment',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'layout', title: 'Living Room Layout Principles' },
        { id: 'small-space', title: 'Small Living Room Solutions' },
        { id: 'lighting', title: 'Lighting for Living Rooms' },
        { id: 'furniture', title: 'Choosing Living Room Furniture' },
        { id: 'colour', title: 'Colour and Texture' },
        { id: 'mistakes', title: 'Common Mistakes' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['interior-design', 'custom-furniture', 'portfolio'],
      relatedArticles: ['modern-luxury-interior-design-kenya', 'flooring-materials-kenya', 'lighting-design-kenya'],
      faqs: [],
      schema: null
    },

    {
      slug: 'gypsum-ceiling-kenya',
      title: 'Gypsum Ceiling Design, Installation and Cost in Kenya',
      description: 'Everything you need to know about gypsum ceilings in Kenya: design options, installation process, costs and maintenance.',
      keywords: ['gypsum ceiling Kenya', 'ceiling design Nairobi', 'gypsum installation cost', 'false ceiling Kenya'],
      category: 'construction-finishing',
      tier: 'supporting',
      featured: false,
      status: 'planned',
      publishedDate: null,
      updatedDate: null,
      readingTime: 10,
      wordCount: null,
      heroImage: '../assets/images/blogs/blog-7.jpg',
      heroAlt: 'Modern gypsum ceiling with recessed lighting in a Kenyan living room',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'types', title: 'Types of Gypsum Ceilings' },
        { id: 'design', title: 'Ceiling Design Ideas' },
        { id: 'installation', title: 'Installation Process' },
        { id: 'cost', title: 'Cost Breakdown' },
        { id: 'maintenance', title: 'Maintenance and Repairs' },
        { id: 'mistakes', title: 'Common Mistakes' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['house-finishing', 'interior-design', 'repairs'],
      relatedArticles: ['house-finishing-kenya', 'lighting-design-kenya', 'wall-finishing-kenya'],
      faqs: [],
      schema: null
    },

    {
      slug: 'flooring-materials-kenya',
      title: 'Flooring Materials Guide: Tiles, Wood, Epoxy and SPC for Kenyan Homes',
      description: 'Compare flooring materials for Kenyan homes. Durability, cost, maintenance and style for every room.',
      keywords: ['flooring materials Kenya', 'tile flooring Nairobi', 'epoxy floor Kenya', 'SPC flooring', 'wooden floor Kenya'],
      category: 'construction-finishing',
      tier: 'supporting',
      featured: false,
      status: 'planned',
      publishedDate: null,
      updatedDate: null,
      readingTime: 11,
      wordCount: null,
      heroImage: '../assets/images/blogs/blog-8.jpg',
      heroAlt: 'Various flooring materials including tiles, wood and epoxy in a Kenyan home showroom',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'tiles', title: 'Porcelain and Ceramic Tiles' },
        { id: 'wood', title: 'Engineered and Solid Wood' },
        { id: 'spc', title: 'SPC and Vinyl Flooring' },
        { id: 'epoxy', title: 'Epoxy and Polished Concrete' },
        { id: 'room-guide', title: 'Room-by-Room Flooring Guide' },
        { id: 'cost', title: 'Cost Comparison' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['house-finishing', 'interior-design', 'portfolio'],
      relatedArticles: ['house-finishing-kenya', 'gypsum-ceiling-kenya', 'wall-finishing-kenya'],
      faqs: [],
      schema: null
    },

    {
      slug: 'kitchen-cabinets-kenya',
      title: 'Kitchen Cabinet Design, Materials and Installation in Kenya',
      description: 'A complete guide to kitchen cabinets in Kenya: materials, layouts, costs and how to work with cabinet makers.',
      keywords: ['kitchen cabinets Kenya', 'custom kitchen Nairobi', 'cabinet materials', 'kitchen design Kenya'],
      category: 'furniture-fittings',
      tier: 'supporting',
      featured: false,
      status: 'planned',
      publishedDate: null,
      updatedDate: null,
      readingTime: 10,
      wordCount: null,
      heroImage: '../assets/images/blogs/blog-9.jpg',
      heroAlt: 'Modern kitchen with custom cabinets and quartz countertops in a Kenyan home',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'layout', title: 'Kitchen Layout Types' },
        { id: 'materials', title: 'Cabinet Materials Compared' },
        { id: 'countertops', title: 'Countertop Options' },
        { id: 'hardware', title: 'Hardware and Fittings' },
        { id: 'installation', title: 'Installation Process' },
        { id: 'budgeting', title: 'Budgeting for Kitchen Cabinets' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['custom-furniture', 'house-finishing', 'interior-design'],
      relatedArticles: ['custom-furniture-kenya', 'house-finishing-kenya', 'flooring-materials-kenya'],
      faqs: [],
      schema: null
    },

    {
      slug: 'common-home-repairs-kenya',
      title: 'Common Home Repairs in Kenya: Leaks, Cracks, Electrical and Plumbing',
      description: 'A practical guide to the most common home repairs in Kenya. What to fix first, how much it costs, and when to call a professional.',
      keywords: ['home repairs Kenya', 'house leak repair Nairobi', 'electrical repair', 'plumbing repair'],
      category: 'repairs-maintenance',
      tier: 'supporting',
      featured: false,
      status: 'planned',
      publishedDate: null,
      updatedDate: null,
      readingTime: 9,
      wordCount: null,
      heroImage: '../assets/images/blogs/blog-10.jpg',
      heroAlt: 'Professional repair technician fixing a plumbing issue in a Kenyan home',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'leaks', title: 'Roof and Pipe Leaks' },
        { id: 'cracks', title: 'Wall and Floor Cracks' },
        { id: 'electrical', title: 'Electrical Issues' },
        { id: 'plumbing', title: 'Plumbing Problems' },
        { id: 'when-to-call', title: 'When to Call a Professional' },
        { id: 'costs', title: 'Repair Cost Guide' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['repairs', 'house-finishing', 'contact'],
      relatedArticles: ['home-repairs-maintenance-kenya', 'house-finishing-kenya'],
      faqs: [],
      schema: null
    },

    {
      slug: 'airbnb-design-kenya',
      title: 'Airbnb and Short-Term Rental Interior Design in Kenya',
      description: 'Design your Airbnb or short-term rental to stand out, earn great reviews and maximise bookings in Nairobi and beyond.',
      keywords: ['Airbnb design Kenya', 'short-term rental interior', 'guest house finishing Nairobi', 'Airbnb furniture'],
      category: 'real-estate',
      tier: 'supporting',
      featured: false,
      status: 'planned',
      publishedDate: null,
      updatedDate: null,
      readingTime: 10,
      wordCount: null,
      heroImage: '../assets/images/blogs/blog-11.jpg',
      heroAlt: 'A stylishly furnished Airbnb apartment in Nairobi with modern interior design',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'guest-experience', title: 'Designing for Guest Experience' },
        { id: 'photography', title: 'Designing for Photos and Reviews' },
        { id: 'durability', title: 'Durable Materials for High Turnover' },
        { id: 'budget', title: 'Budgeting for Airbnb Design' },
        { id: 'mistakes', title: 'Airbnb Design Mistakes' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['property-finishing', 'interior-design', 'custom-furniture'],
      relatedArticles: ['property-finishing-rentals-airbnb-kenya', 'living-room-design-kenya'],
      faqs: [],
      schema: null
    },

    {
      slug: 'lighting-design-kenya',
      title: 'Lighting Design for Kenyan Homes: Natural Light, LEDs and Ambiance',
      description: 'Master home lighting in Kenya. From natural daylight to LED systems, learn how to layer light for every room.',
      keywords: ['home lighting design Kenya', 'LED lighting Nairobi', 'natural light design', 'ambient lighting'],
      category: 'interior-design',
      tier: 'supporting',
      featured: false,
      status: 'planned',
      publishedDate: null,
      updatedDate: null,
      readingTime: 9,
      wordCount: null,
      heroImage: '../assets/images/blogs/blog-12.jpg',
      heroAlt: 'Layered lighting design in a modern Kenyan living room with ambient and task lighting',
      author: 'Furnostyles Editorial',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'layers', title: 'The Three Layers of Light' },
        { id: 'natural', title: 'Maximising Natural Light' },
        { id: 'led', title: 'LED and Smart Lighting' },
        { id: 'room-guide', title: 'Room-by-Room Lighting Guide' },
        { id: 'mistakes', title: 'Common Lighting Mistakes' },
        { id: 'faq', title: 'Frequently Asked Questions' }
      ],
      relatedServices: ['interior-design', 'house-finishing', 'portfolio'],
      relatedArticles: ['modern-luxury-interior-design-kenya', 'living-room-design-kenya', 'gypsum-ceiling-kenya'],
      faqs: [],
      schema: null
    }
  ];

  /* ============================================================
     PUBLIC API
  ============================================================ */

  window.FurnostylesArticles = {
    /* --- Data Access --- */
    getAll: function () { return ARTICLES; },
    getCategories: function () { return CATEGORIES; },
    getServices: function () { return SERVICES; },

    getBySlug: function (slug) {
      for (var i = 0; i < ARTICLES.length; i++) {
        if (ARTICLES[i].slug === slug) return ARTICLES[i];
      }
      return null;
    },

    getByCategory: function (categoryId) {
      return ARTICLES.filter(function (a) { return a.category === categoryId; });
    },

    getByTier: function (tier) {
      return ARTICLES.filter(function (a) { return a.tier === tier; });
    },

    getFeatured: function (count) {
      var featured = ARTICLES.filter(function (a) { return a.featured === true && a.status === 'published'; });
      return count ? featured.slice(0, count) : featured;
    },

    getPublished: function () {
      return ARTICLES.filter(function (a) { return a.status === 'published'; });
    },

    getPlanned: function () {
      return ARTICLES.filter(function (a) { return a.status === 'planned'; });
    },

    getRelated: function (slug, count) {
      var article = this.getBySlug(slug);
      if (!article || !article.relatedArticles) return [];
      count = count || 3;
      var related = [];
      for (var i = 0; i < article.relatedArticles.length && related.length < count; i++) {
        var ra = this.getBySlug(article.relatedArticles[i]);
        if (ra) related.push(ra);
      }
      return related;
    },

    getRelatedServices: function (slug) {
      var article = this.getBySlug(slug);
      if (!article || !article.relatedServices) return [];
      return article.relatedServices.map(function (sid) {
        for (var i = 0; i < SERVICES.length; i++) {
          if (SERVICES[i].id === sid) return SERVICES[i];
        }
        return null;
      }).filter(function (s) { return s !== null; });
    },

    /* --- Search & Filter --- */
    search: function (query) {
      if (!query) return [];
      query = query.toLowerCase();
      return ARTICLES.filter(function (a) {
        if (a.status !== 'published') return false;
        var inTitle = a.title.toLowerCase().indexOf(query) !== -1;
        var inDesc = a.description.toLowerCase().indexOf(query) !== -1;
        var inKeywords = a.keywords && a.keywords.some(function (k) { return k.toLowerCase().indexOf(query) !== -1; });
        return inTitle || inDesc || inKeywords;
      });
    },

    filter: function (criteria) {
      return ARTICLES.filter(function (a) {
        if (criteria.category && a.category !== criteria.category) return false;
        if (criteria.tier && a.tier !== criteria.tier) return false;
        if (criteria.status && a.status !== criteria.status) return false;
        if (criteria.featured === true && a.featured !== true) return false;
        if (criteria.featured === false && a.featured === true) return false;
        return true;
      });
    },

    /* --- Category helpers --- */
    getCategoryById: function (id) {
      for (var i = 0; i < CATEGORIES.length; i++) {
        if (CATEGORIES[i].id === id) return CATEGORIES[i];
      }
      return null;
    },

    getFeaturedCategories: function () {
      return CATEGORIES.filter(function (c) { return c.featured === true; });
    }
  };

})();
