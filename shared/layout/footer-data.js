/**
 * FURNOSTYLES — FOOTER DATA
 * ==========================
 * File: shared/layout/footer-data.js
 * Purpose: Centralised config for the shared site footer.
 *          Consumed by footer-render.js via window.FurnostylesFooterData.
 *
 * This is a CLEAN COPY from the reference site's footer-data.js.
 * Load before: footer-render.js
 */

window.FurnostylesFooterData = {

  brand: {
    name:    "Furnostyles",
    tagline: "Personal Luxury. Elevated.",
    address: "Kasarani Mwiki Road, Hunters, Kasarani, Nairobi, Kenya",
    phone:   "+254 713 639 205",
    email:   "furnostyles@gmail.com"
  },

  columns: [
    {
      heading: "Furnostyles",
      links: [
        { label: "About Us",              href: "about.html" },
        { label: "Our Ecosystem",         href: "ecosystem.html" },
        { label: "Portfolio",             href: "portfolio.html" },
        { label: "Projects",              href: "projects.html" },
        { label: "Project Guidance",      href: "project-guidance.html" },
        { label: "Artisan Ecosystem",     href: "artisan-ecosystem.html" },
        { label: "Contact Us",            href: "contact.html" }
      ]
    },
    {
      heading: "Repairs & Services",
      links: [
        { label: "All Repairs",           href: "repairs.html" },
        { label: "Emergency Repair",      href: "routing-urgent-repair-requests.html" },
        { label: "Plumbing Repairs",      href: "repair-leaking-taps.html" },
        { label: "Electrical Repairs",    href: "repair-socket-replacement.html" },
        { label: "Painting & Walls",      href: "repair-wall-repainting.html" },
        { label: "Gypsum Ceilings",       href: "repair-gypsum.html" },
        { label: "All Services",          href: "services.html" }
      ]
    },
    {
      heading: "Marketplace",
      links: [
        { label: "Main Marketplace",      href: "marketplace.html" },
        { label: "Services Marketplace",  href: "services-marketplace.html" },
        { label: "Materials Market",      href: "materials-marketplace.html" },
        { label: "Secondhand Market",     href: "secondhand-marketplace.html" },
        { label: "Sourcing Marketplace",  href: "sourcing-marketplace.html" },
        { label: "Real Estate Market",    href: "realestate-marketplace.html" },
        { label: "Furniture Market",      href: "furniture-marketplace.html" }
      ]
    },
    {
      heading: "Furniture",
      links: [
        { label: "All Furniture",         href: "furniture-marketplace.html" },
        { label: "Sofas & Living",        href: "furniture-sofas.html" },
        { label: "Beds & Bedrooms",       href: "furniture-beds.html" },
        { label: "Wardrobes",             href: "furniture-wardrobes.html" },
        { label: "Dining Sets",           href: "furniture-dining.html" },
        { label: "Office Furniture",      href: "furniture-office.html" },
        { label: "Secondhand Furniture",  href: "furniture-secondhand.html" }
      ]
    },
    {
      heading: "Materials & Hardware",
      links: [
        { label: "All Materials",         href: "materials.html" },
        { label: "Floor & Wall Tiles",    href: "materials-tiles.html" },
        { label: "Paint & Primers",       href: "materials-paints.html" },
        { label: "Gypsum & Boards",       href: "materials-gypsum.html" },
        { label: "Electrical Fittings",   href: "materials-electrical-fittings.html" },
        { label: "Plumbing Fittings",     href: "materials-plumbing-fittings.html" },
        { label: "Hardware & Tools",      href: "materials-hardware.html" }
      ]
    },
    {
      heading: "Property & Real Estate",
      links: [
        { label: "Real Estate",           href: "realestate.html" },
        { label: "Property Management",   href: "property-management.html" },
        { label: "Landlord Services",     href: "property-landlord-services.html" },
        { label: "Airbnb Upgrades",       href: "property-airbnb-upgrades.html" },
        { label: "Property Lifecycle",    href: "property-lifecycle-hub.html" },
        { label: "Landlord Daily Hub",    href: "landlord-daily-hub.html" },
        { label: "Property Maintenance",  href: "property-maintenance.html" }
      ]
    },
    {
      heading: "Guides & Inspiration",
      links: [
        { label: "All Blogs & Guides",    href: "blogs.html" },
        { label: "Repair Guides",         href: "blog-repair-guides.html" },
        { label: "Renovation Guides",     href: "blog-renovation-guides.html" },
        { label: "Gypsum Designs",        href: "inspiration-gypsum-designs.html" },
        { label: "Kitchen Upgrades",      href: "inspiration-kitchen-upgrades.html" },
        { label: "Luxury Interiors",      href: "inspiration-luxury-interiors.html" },
        { label: "Maintenance Schedules", href: "content-maintenance-schedules.html" }
      ]
    },
    {
      heading: "Quick Actions",
      links: [
        { label: "Get a Quote",           href: "cta-request-quote.html" },
        { label: "Free Consultation",     href: "cta-consultation-request.html" },
        { label: "Daily Discovery",       href: "daily-discovery-hub.html" },
        { label: "Problem Solver",        href: "problem-solving-hub.html" },
        { label: "Ecosystem Map",         href: "ecosystem-continuity-hub.html" },
        { label: "Secondhand Deals",      href: "secondhand-engagement-hub.html" },
        { label: "Recommend Engine",      href: "recommend-engine.html" }
      ]
    },
    {
      heading: "Legal & Policies",
      links: [
        { label: "All Legal Policies",     href: "legal-policies.html" },
        { label: "Terms of Service",      href: "legal-policies.html#terms" },
        { label: "Privacy Policy",        href: "legal-policies.html#privacy" },
        { label: "Refund Policy",         href: "legal-policies.html#refund" },
        { label: "Vendor Agreement",     href: "legal-policies.html#vendor" },
        { label: "Dispute Resolution",    href: "legal-policies.html#dispute" }
      ]
    }
  ],

  socialLinks: [
    { name: "WhatsApp Chat",       icon: "whatsapp",  url: "https://wa.me/254713639205",               enabled: true  },
    { name: "Facebook",            icon: "facebook",  url: "https://www.facebook.com/furnostyles", enabled: true  },
    { name: "Instagram",           icon: "instagram", url: "https://www.instagram.com/furnostyles",enabled: true  },
    { name: "YouTube",             icon: "youtube",   url: "https://www.youtube.com/@furnostyles", enabled: true  },
    { name: "TikTok",              icon: "tiktok",    url: "https://www.tiktok.com/@furnostyles",  enabled: true  },
    { name: "Twitter/X",           icon: "twitter",   url: "https://twitter.com/furnostyles",     enabled: true  },
    { name: "LinkedIn",            icon: "linkedin",  url: "https://linkedin.com/company/furnostyles", enabled: true  }
  ],

  backToTop: { enabled: true, text: "Back to Top" },

  newsletter: {
    enabled:     true,
    heading:     "Stay in the Loop",
    description: "Get updates on premium furniture, deals, sourcing offers and marketplace launches.",
    placeholder: "Enter your email address",
    buttonText:  "Subscribe",
    disclaimer:  "No spam. Unsubscribe anytime."
  },

  quickContact: {
    enabled: true,
    label:   "Need help? Reach us directly:",
    whatsapp: {
      label: "Chat on WhatsApp",
      url:   "https://wa.me/254713639205?text=Hello%20Furnostyles%2C%20I%27d%20like%20to%20enquire."
    },
    phone: { label: "Call: +254 713 639 205", url: "tel:+254713639205" },
    email: { label: "furnostyles@gmail.com",  url: "mailto:furnostyles@gmail.com" }
  },

  businessHours: {
    enabled: true,
    heading: "Business Hours",
    hours: [
      { day: "Mon \u2013 Fri", time: "8:00 AM \u2013 6:00 PM" },
      { day: "Saturday",       time: "9:00 AM \u2013 4:00 PM" },
      { day: "Sunday",         time: "Closed" }
    ],
    note: "Emergency repairs available on request outside hours."
  },

  trustBadges: {
    enabled: true,
    items: [
      { label: "500+ Projects Completed", icon: "\u2713" },
      { label: "50+ Countries Sourced", icon: "\u2605" },
      { label: "100% Verified Suppliers", icon: "\u2B50" },
      { label: "15+ Years Experience", icon: "\uD83D\uDCCD" },
      { label: "East Africa's Premier", icon: "\uD83D\uDD12" }
    ]
  },

  paymentBadges: {
    enabled: true,
    heading: "Accepted Payments",
    note:    "Secure payments. Online gateway coming soon.",
    methods: [
      { label: "M-Pesa",       icon: "\uD83D\uDCF1", key: "mpesa",    comingSoon: false },
      { label: "Bank Transfer",icon: "\uD83C\uDFE6", key: "bank",     comingSoon: false },
      { label: "Cash",         icon: "\uD83D\uDCB5", key: "cash",     comingSoon: false },
      { label: "Card Payments",icon: "\uD83D\uDCB3", key: "card",     comingSoon: false },
      { label: "PesaPal",      icon: "\uD83D\uDCB8", key: "pesapal",  comingSoon: false },
      { label: "Airtel Money", icon: "\uD83D\uDCF1", key: "airtel",   comingSoon: false },
      { label: "Cryptocurrency",icon: "\u20BF", key: "crypto",   comingSoon: false },
      { label: "PayPal",       icon: "\uD83D\uDCB3", key: "paypal",   comingSoon: true  }
    ]
  },

  serviceAreas: {
    enabled: true,
    heading: "Delivery Areas",
    areas: [
      "Nairobi CBD", "Westlands", "Kilimani", "Lavington", "Karen", "Muthaiga", "Upper Hill", "Hurlingham",
      "Parklands", "Eastleigh", "Thika Road", "Nairobi West", "South B & C", "Langata", "Riverside", "Kileleshwa",
      "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Machakos", "Kajiado", "Naivasha",
      "Nyeri", "Meru", "Kitale", "Kakamega", "Kisii", "Bungoma", "Busia", "Migori",
      "Malindi", "Lamu", "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Lodwar",
      "Kakuma", "Moyale", "Narok", "Bomet", "Kericho", "Baringo", "Laikipia", "Samburu"
    ],
    note: "Nationwide delivery available across Kenya and beyond."
  },

  emergencyCTA: {
    enabled:     true,
    heading:     "Emergency Repair?",
    description: "Fast response for urgent plumbing, electrical, roofing and structural repairs in Nairobi.",
    buttonText:  "Request Emergency Repair",
    href:        "/contact.html?service=Emergency+Repair",
    phone:       "+254 713 639 205"
  },

  announcementBar: { enabled: false, message: "", type: "promo" },

  appDownload: { enabled: false },

  footerSearch: {
    enabled:     true,
    placeholder: "Search services, products, guides...",
    buttonText:  "Search"
  },

  copyright: {
    text:     "Furnostyles. Premium interiors, furniture, sourcing, marketplace and property solutions.",
    yearAuto: true
  }

};
