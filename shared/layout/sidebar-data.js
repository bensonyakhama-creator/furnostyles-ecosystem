/**
 * FURNOSTYLES — SIDEBAR DATA
 * ===========================
 * File: shared/layout/sidebar-data.js
 * Purpose: Centralised nav config for dashboard sidebars.
 *          Each role has its own nav links array.
 *          Consumed by sidebar-render.js via window.FurnostylesSidebarData.
 *
 * Roles: client | vendor | propertyOwner | provider | admin
 * Load before: sidebar-render.js
 */

window.FurnostylesSidebarData = {

  brand: {
    name: "Furnostyles",
    href: "/index.html"
  },

  roles: {
    client: {
      label: "Client",
      nav: [
        { label: "Dashboard",      href: "/dashboards/client/index.html",   icon: "\uD83C\uDFE0" },
        { label: "My Orders",      href: "/dashboards/client/orders.html",   icon: "\uD83D\uDCE6" },
        { label: "Saved Items",    href: "/dashboards/client/saved-items.html",   icon: "\u2665" },
        { label: "Marketplace",    href: "/marketplace.html",        icon: "\uD83D\uDED2" },
        { label: "Services",       href: "/services.html",           icon: "\uD83D\uDD27" },
        { label: "Cart",           href: "/cart.html",               icon: "\uD83D\uDED2" }
      ]
    },
    vendor: {
      label: "Vendor / Supplier",
      nav: [
        { label: "Vendor Dashboard", href: "/dashboards/vendor/index.html", icon: "\uD83C\uDFEA" },
        { label: "Upload Product",   href: "/vendor/upload.html",    icon: "\uD83D\uDCE4" },
        { label: "Orders",           href: "/dashboards/vendor/orders.html", icon: "\uD83D\uDCE6" },
        { label: "Marketplace",      href: "/marketplace.html",      icon: "\uD83D\uDED2" }
      ]
    },
    admin: {
      label: "Admin",
      nav: [
        { label: "Admin Panel",    href: "/dashboards/admin/index.html",    icon: "\uD83D\uDEE1" },
        { label: "Users",          href: "/dashboards/admin/users.html",    icon: "\uD83D\uDC65" },
        { label: "Products",       href: "/dashboards/admin/products.html",    icon: "\uD83D\uDCE6" },
        { label: "Orders",         href: "/dashboards/admin/orders.html",    icon: "\uD83D\uDCCB" },
        { label: "Marketplace",    href: "/marketplace.html",        icon: "\uD83D\uDED2" }
      ]
    }
  }

};
