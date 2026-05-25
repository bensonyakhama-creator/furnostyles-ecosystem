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
    tagline: "Personal Luxury. Elevated.",
    href:    "/index.html",
    logo:    "/assets/images/logo.png"
  },

  topbar: {
    enabled: true,
    left:    "Delivery to all major towns in Kenya and beyond.",
    right:   "Kasarani, Nairobi &nbsp;&bull;&nbsp; +254 713 639 205 &nbsp;&bull;&nbsp; furnostyles@gmail.com"
  },

  search: {
    enabled:     true,
    placeholder: "Search furniture, services, marketplace...",
    categories: ["All", "Products", "Services", "Property"]
  },

  nav: [
    { label: "Home",        href: "/index.html" },
    { label: "Marketplace", href: "/marketplace.html" },
    { label: "Furniture",   href: "/furniture.html" },
    { label: "Services",    href: "/services.html" },
    { label: "Repairs",     href: "/repairs.html" },
    { label: "Sourcing",    href: "/sourcing.html" },
    { label: "Real Estate", href: "/realestate.html" },
    { label: "Blogs",       href: "/blogs.html" },
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
