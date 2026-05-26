/**
 * FURNOSTYLES — HEADER DATA
 * ==========================
 * File: shared/layout/header-data.js
 * Purpose: Centralised config for the shared site header.
 *          Consumed by header-render.js via window.FurnostylesHeaderData.
 *
 * Load before: header-render.js
 */

window.FurnostylesHeaderData = {

  brand: {
    name:    "Furnostyles",
    tagline: "Your One-Stop Marketplace",
    href:    "/index.html",
    logo:    "/assets/images/logo.png"
  },

  topbar: {
    enabled: true,
    brandName: "Furnostyles",
    tagline: "Your One-Stop Marketplace",
    phone: "+254 713 639 205",
    email: "furnostyles@gmail.com"
  },

  // Top navigation bar (Jumia-style)
  topNav: {
    enabled: true,
    links: [
      { label: "Sell on Furnostyles", href: "/upload.html", highlight: true },
      { label: "Sign In", href: "/login.html" },
      { label: "My Account", href: "/dashboard.html" },
      { label: "Orders", href: "/orders.html" },
      { label: "Wishlist", href: "/wishlist.html" },
      { label: "Shipping", href: "/shipping.html" },
      { label: "Help Center", href: "/help.html" },
      { label: "Cart", href: "/cart.html", icon: "cart" }
    ]
  },

  // Main category navigation (Jumia-style)
  categories: {
    enabled: true,
    items: [
      { label: "Official Stores", href: "/official-stores.html" },
      { label: "Furniture", href: "/furniture.html" },
      { label: "Home Decor", href: "/home-decor.html" },
      { label: "Appliances", href: "/appliances.html" },
      { label: "Services", href: "/services.html" },
      { label: "Repairs", href: "/repairs.html" },
      { label: "Property", href: "/property.html" },
      { label: "Marketplace", href: "/marketplace.html" },
      { label: "Lighting", href: "/lighting.html" },
      { label: "Kitchen", href: "/kitchen.html" }
    ]
  },

  search: {
    enabled:     true,
    placeholder: "Search furniture, services, marketplace...",
    categories: ["All", "Products", "Services", "Property"]
  },

  // Promotional banners (Jumia-style)
  promotions: {
    enabled: true,
    items: [
      { text: "Marketplace", href: "/marketplace.html", highlight: true },
      { text: "Free Delivery Nationwide", href: "/delivery.html", subtext: "Orders Above KSh 5,000" },
      { text: "Sell on Marketplace", href: "/upload.html", subtext: "Reach Millions Of Buyers" },
      { text: "Flash Sales", href: "/flash-sales.html", highlight: true }
    ]
  },

  // Delivery hooks
  delivery: {
    enabled: true,
    locations: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika"],
    info: "Free delivery on orders above KSh 5,000",
    tracking: true
  },

  nav: [
    { label: "Home",        href: "/index.html" },
    { label: "Marketplace", href: "/marketplace.html" },
    { label: "Services",    href: "/services.html" },
    { label: "Repairs",     href: "/repairs.html" },
    { label: "Dashboard",  href: "/dashboard.html" },
    { label: "Dropshipping", href: "/dropshipping-dashboard.html" },
    { label: "Sell",        href: "/upload.html" },
    { label: "Contact",     href: "/contact.html" }
  ],

  floats: {
    cart: {
      enabled: true,
      href:    "/cart.html",
      label:   "Cart"
    },
    whatsapp: {
      enabled: true,
      href:    "https://wa.me/254713639205",
      label:   "WhatsApp Chat"
    }
  }

};
