# Furnostyles Clean Rebuild Blueprint

**Analysis Date:** May 21, 2026  
**Goal:** Rebuild Furnostyles website with clean code, same brand, same pages, same premium design direction, no old errors

---

## Executive Summary

Furnostyles is a premium home improvement platform combining:
- Interior design services
- Bespoke furniture
- Construction finishing
- Home repairs & maintenance
- Marketplace for products/materials
- Real estate property support
- Multi-role account system (client, vendor, provider, admin)

**Current State:** Site has mixed legacy code, inconsistent implementations, some broken patterns, but strong brand identity and comprehensive feature set.

**Rebuild Strategy:** Keep the brand, pages, and premium design direction. Rebuild with clean, consistent code following established patterns.

---

## 1. Homepage Structure Analysis

### Current Homepage (index.html)

**Structure:**
```
- HEAD: css/style.css, shared/uploads/upload-bridge.css, shared/layout/footer.css
- BODY:
  - .premium-topbar (brand tagline + contact info)
  - .premium-header (brand logo + search + icon actions)
  - .premium-layout
    - .premium-main
      - Hero banner with gradient overlay
      - Marketplace link strip (horizontal scroll)
      - Hero cards (3 main categories)
      - Home stats (4 metrics)
      - Services section (6 featured services + "view all")
      - Project showcase (4 project cards)
      - Repair ad section (split layout)
      - Marketplace preview (4 featured products)
      - Real estate section (4 model cards)
      - Why choose us (3 testimonials)
      - Request category section (4 action cards)
  - Float buttons (cart, WhatsApp)
  - Footer mount point
  - Scripts: main.js, firebase-config.js, firebase-bridge.js, upload-bridge.js, footer-data.js, footer-render.js
```

**Key Patterns to Keep:**
- No sidebar layout (centered content max-width 1400px)
- Premium hero with gradient overlays
- Horizontal scroll link strips
- Card-based sections with consistent styling
- Floating action buttons
- Footer rendered via JS

**Issues to Fix:**
- Mixed inline styles in some sections
- Inconsistent CSS class naming
- Some broken image references
- Footer implementation has two approaches (static vs JS-rendered)

---

## 2. Header Structure Analysis

### Current Header Pattern

**Required Structure (from memory):**
```html
<div class="premium-topbar">
  <span><strong>Furnostyles</strong> Personal Luxury. Elevated.</span>
  <span><b>Kasarani, Nairobi</b><b>+254 713 639 205</b><b>furnostyles@gmail.com</b></span>
</div>

<header class="premium-header">
  <a class="premium-brand" href="index.html">
    <img src="assets/images/logo.png" alt="Furnostyles Logo" onerror="this.remove()">
    <span>Furnostyles</span>
  </a>

  <div class="fld-youtube-search">
    <input type="search" id="siteSearch" placeholder="Search furniture, services, marketplace...">
    <button type="button" onclick="searchSite()">Search</button>
  </div>

  <div class="fld-icon-actions">
    <button class="fld-icon-btn" id="fldCartBtn">
      <span aria-hidden="true">🛒</span>
      <span class="fld-badge" id="fldCartCount" data-cart-count>0</span>
    </button>
    <button class="fld-icon-btn" id="fldAlertsBtn">
      <span aria-hidden="true">🔔</span>
      <span class="fld-badge" id="fldAlertsCount" data-alert-count>0</span>
    </button>
    <button class="fld-avatar-btn" id="fldAccountBtn">
      <span class="avatar-icon" id="fldAccountAvatar">👤</span>
      <span class="user-name" hidden></span>
    </button>
  </div>
</header>
```

**Rules:**
- No inline styles on topbar, header, or brand
- All buttons properly closed
- Search button has onclick="searchSite()"
- Cart count uses data-cart-count attribute
- Footer uses &copy; entity for copyright

**Rebuild Notes:**
- Standardize this header across ALL pages
- Ensure no sidebar CSS linked
- Keep emoji icons or replace with SVG icons
- Maintain aria-labels for accessibility

---

## 3. Footer Structure Analysis

### Current Footer Approaches

**Two Implementations Found:**

1. **Static Footer (marketplace.html, services.html, cart.html):**
```html
<footer class="fld-commerce-footer">
  <div class="fld-footer-top">
    <div class="fld-footer-brand">...</div>
    <div class="fld-footer-newsletter">...</div>
  </div>
  <div class="fld-footer-grid">
    <div><h3>Customer Service</h3>...</div>
    <div><h3>Marketplace</h3>...</div>
    <div><h3>Sourcing & Supply</h3>...</div>
    <div><h3>Services</h3>...</div>
    <div><h3>Company</h3>...</div>
  </div>
  <div class="fld-footer-bottom">
    <p>&copy; Furnostyles ...</p>
  </div>
</footer>
```

2. **JS-Rendered Footer (index.html):**
```html
<div id="fld-footer-mount"></div>
<script defer src="shared/layout/footer-data.js"></script>
<script defer src="shared/layout/footer-render.js"></script>
```

**Shared CSS (footer.css):**
- BEM naming: `.fld-footer__top`, `.fld-footer__brand`, etc.
- Advanced features: social links, emergency CTA, trust badges, payment badges, service areas, app download, search bar
- Responsive breakpoints at 1000px, 720px, 480px

**Rebuild Decision:**
- Use JS-rendered footer for consistency
- Keep footer.css BEM structure
- Configure via footer-data.js
- Ensure &copy; entity usage
- Include social links, contact info, newsletter

---

## 4. Marketplace Idea Analysis

### Current Marketplace (marketplace.html)

**Core Features:**
- Hero section with stats (10K+ products, Global network, Verified sellers, Premium import)
- Horizontal link strip (All Products, Secondhand, Sell Used, Imported, Sourcing, Reviews, Installation, Cart)
- Trusted brands scroll (supplier network display)
- Dynamic marketplace panel with:
  - Search input
  - Category filter (Furniture, Boards, Tiles, Paint, Plumbing, Electrical, Hardware, Lighting, etc.)
  - Type filter (Direct, Dropshipping, Secondhand, Sourcing)
  - Sort options (price low-high, high-low, newest)
  - Category button grid
  - Product sourcing card
- Marketplace product grid (loaded via JS)
- Featured sections (Secondhand, Dropshipping, Sourcing, Reviews)
- Global sourcing network section
- Ecosystem connections section

**Data Sources:**
- Demo items (100 items in main.js)
- Firebase marketplace collection
- Firebase vendorProducts collection
- Secondhand listings
- Dropshipping supplier links

**Rebuild Notes:**
- Keep the multi-source product loading pattern
- Standardize the filter UI
- Clean up the product card HTML generation
- Ensure consistent pricing display (KSh format)
- Maintain the supplier link vs cart button logic

---

## 5. Account System Analysis

### Current Account Structure

**Authentication Pages:**
- `accounts/auth/login.html` - Unified login/register with role selection
- `accounts/register.html` - Redirects to login.html
- Roles: client, vendor, supplier, propertyOwner, agent, provider, contractor, admin, superAdmin

**Enterprise Account System (shared/accounts/enterprise-accounts.js):**
- Firebase Auth integration (prepared, needs real keys)
- Local storage fallback
- Role-based routing
- Email verification prepared
- Password strength scoring

**Dashboard Redirects:**
- `accounts/dashboard.html` → redirects to client/dashboard.html
- `admin/dashboard.html` → redirects to admin/admin-pro.html

**Client Dashboard (client/dashboard.html):**
- Sidebar navigation
- User info display
- Stats cards (Orders, Saved Items, Messages, Requests)
- Quick action grid (Orders, Supplier Chat, Saved Property, Service Requests, Reviews, Notifications)
- Activity feed

**Vendor Dashboard (vendor/vendor-dashboard.html):**
- Product upload form
- Category selection
- Image/video upload fields
- Premium header + sidebar layout

**Rebuild Notes:**
- Standardize on enterprise-accounts.js pattern
- Keep role-based dashboard routing
- Clean up the redirect pages
- Ensure consistent dashboard UI patterns
- Implement proper Firebase Auth when keys available

---

## 6. Dashboard Roles System Analysis

### Current Role Structure

**Roles Identified:**
1. **Client/Buyer** - Shopping, orders, saved items, service requests
2. **Vendor/Seller** - Product uploads, store management, sales tracking
3. **Supplier** - Material supply, bulk orders, vendor relationships
4. **Property Owner** - Property listings, rental management, staging
5. **Real Estate Agent** - Property listings, client management, commissions
6. **Service Provider** - Service bookings, job management, reviews
7. **Contractor** - Project management, team coordination, materials
8. **Admin** - Platform management, user moderation, content approval
9. **Super Admin** - Full system control, billing, configuration

**Dashboard Locations:**
- Client: `client/dashboard.html`
- Vendor: `vendor/vendor-dashboard.html`
- Provider: `accounts/provider/dashboard.html`
- Property Owner: `accounts/property-owner/dashboard.html`
- Admin: `admin/admin-pro.html`

**Rebuild Notes:**
- Keep the 9-role system
- Standardize dashboard layouts
- Implement role-based permissions
- Create consistent navigation patterns
- Ensure proper routing between dashboards

---

## 7. Services Pages Analysis

### Current Services (services.html)

**Structure:**
- Hero section with "Luxury Services" branding
- Editorial command center (service-first philosophy)
- Category panels (9 categories with images):
  1. Interior Design (20 services)
  2. Furniture (20 services)
  3. Construction Finishing (25 services)
  4. Plumbing (20 services)
  5. Electrical (20 services)
  6. Repairs (40 services)
  7. Real Estate (15 services)
  8. Marketplace (10 services)
  9. On-Demand Home Services (10 services)
- Featured services grid (6 cards)
- Search/filter panel
- Connected ecosystem links

**Service Data (JSON in services.html):**
- 160+ individual services with:
  - id, title, slug, category
  - focus description
  - image reference
  - page path

**Rebuild Notes:**
- Keep the category-first approach
- Extract service data to external JSON file
- Create individual service detail pages
- Maintain the service-first philosophy
- Ensure SEO-friendly URLs

---

## 8. Blog Pages Analysis

### Current Blogs (blogs.html)

**Structure:**
- Magazine-style hero (lead story + side stories)
- Reading paths (4 category-based entry points)
- Topic editorial grid (13 categories):
  - Interior Design, Repairs, Furniture, Materials, Real Estate
  - Lighting, Kitchens, Bedrooms, Ceilings, Airbnb Furnishing
  - Flooring, Bathrooms, Living Rooms, Furniture Buying Guide
- Latest thinking section (6 recent articles)
- Searchable archive (hidden until search/category selected)

**Blog Data (JSON in blogs.html):**
- 20+ blog articles with:
  - title, category, dataCategory
  - image, excerpt, href

**Rebuild Notes:**
- Keep the magazine-style layout
- Extract blog data to external JSON
- Create individual blog detail pages
- Maintain category-based navigation
- Ensure blog-to-service connections

---

## 9. Cart/Checkout Implementation Analysis

### Current Cart (cart.html)

**Universal Cart Features:**
- Multi-item type support:
  - Marketplace items (direct, secondhand, imported)
  - Service bookings
  - Sourcing requests
  - Future platform credits (games/subscriptions)
  - Saved for later (wishlist)
- Status cards (Cart Items, Marketplace, Services, Saved Later)
- Platform cart layout (main + summary sidebar)
- Options: delivery estimate, installation support, inspection verification
- Promo code system (FURNO5, LUXE10)
- Save cart for later

**Storage Keys:**
- fldCart, furnostylesCart (legacy)
- fldServiceCart
- fldSourcingCart
- fldGameCreditsCart
- fldSavedProducts
- fldCheckoutPackage

**Current Checkout (checkout.html):**
- Customer details form
- Order type selection (9 types)
- Fulfillment preference (6 options)
- Payment method selection (6 options: M-Pesa, Card, PayPal, Deposit, Escrow, Manual)
- Buyer protection options
- Order summary with subtotal/delivery/installation/discount/total
- Future payment integration notes

**Rebuild Notes:**
- Keep the universal cart concept
- Standardize storage key naming
- Clean up the cart item normalization
- Implement real payment integrations
- Add order tracking
- Create order history page

---

## 10. Firebase Usage Analysis

### Current Firebase Setup

**Configuration (shared/firebase/firebase-config.js):**
- Placeholder config (needs real keys)
- Standard Firebase v10 structure

**Bridge Pattern (shared/firebase/firebase-bridge.js):**
- Dual-mode operation:
  - Local mode (localStorage) when no real config
  - Firebase mode when real config present
- API methods:
  - save(collectionName, data)
  - list(collectionName)
  - uploadFiles(folder, files)
  - getUser(), setUser(profile)
- Dynamic module loading (firebase-app, firebase-auth, firebase-firestore, firebase-storage)

**Collections Referenced:**
- carts/{userId}/items
- marketplace
- vendorProducts
- orders
- payments
- checkoutSessions
- userOrders/{userId}/orders
- vendorOrders/{vendorId}/orders
- serviceBookings
- sourcingRequests

**Rebuild Notes:**
- Keep the dual-mode pattern
- Standardize collection naming
- Add proper error handling
- Implement real-time listeners where needed
- Add data validation rules

---

## 11. Colors, Fonts, Layout & Brand Identity Analysis

### Brand Colors

**Primary Palette:**
- Petrol Dark: #0b2f3a, #072d3a, #061f29, #041820, #031218 (gradient shades)
- Gold Accent: #d4af37, #c49b2d, #c9a227 (hierarchy)
- Background: #d9dde0, #cfd5d9, #cfd5d9 (light grays)
- Text: #111, #333, #52636b (dark grays)
- White: #ffffff
- Border: #aeb7bd, #b8c0c5, rgba(255,255,255,0.10)

**Status Colors:**
- Success: #5cb85c
- Warning: #f0ad4e
- Info: #5bc0de
- Danger: #d9534f, #8b1e1e

### Typography

**Font Family:**
- Primary: Arial, sans-serif
- No custom font loading currently

**Font Sizes:**
- H1: 50px (hero), 44px (blog lead)
- H2: 28-36px (section headers)
- H3: 16-22px (card titles)
- Body: 13-18px
- Small: 11-13px

### Layout Patterns

**Container System:**
- .premium-layout: max-width 1400px, centered
- .premium-main: full width with padding
- No sidebar (centered content)

**Grid Systems:**
- 4-column: hero cards, home stats, service categories
- 3-column: services grid, testimonials, blog topics
- 2-column: repair ad, blog hero, service command center

**Responsive Breakpoints:**
- 1100px: 4→3 columns
- 760px: 3→2 columns, mobile header
- 480px: 2→1 column, full mobile

### Brand Identity

**Tagline:** "Personal Luxury. Elevated."

**Contact Info:**
- Location: Kasarani Mwiki Road, Hunters, Kasarani, Nairobi, Kenya
- Phone: +254 713 639 205
- Email: furnostyles@gmail.com
- WhatsApp: https://wa.me/254713639205

**Brand Promise:** Premium interiors, marketplace, sourcing, furniture, repairs and property solutions.

**Rebuild Notes:**
- Keep the color palette exactly
- Consider adding a premium font (Google Fonts)
- Maintain the layout patterns
- Standardize responsive breakpoints
- Keep the brand tagline and contact info

---

## Rebuild Implementation Plan

### Phase 1: Foundation (Week 1)

**1.1 Project Setup**
```
furnostyles-clean-rebuild/
├── index.html
├── css/
│   ├── style.css (main stylesheet)
│   └── variables.css (colors, fonts, spacing)
├── js/
│   ├── main.js (global functions)
│   ├── cart.js (cart logic)
│   └── firebase-bridge.js (Firebase integration)
├── shared/
│   ├── firebase/
│   │   ├── firebase-config.js
│   │   └── firebase-bridge.js
│   ├── layout/
│   │   ├── footer.css
│   │   ├── footer-data.js
│   │   └── footer-render.js
│   ├── uploads/
│   │   ├── upload-bridge.css
│   │   └── upload-bridge.js
│   └── accounts/
│       ├── enterprise-accounts.css
│       └── enterprise-accounts.js
├── assets/
│   ├── images/
│   └── icons/
└── data/
    ├── services.json
    ├── blogs.json
    └── marketplace.json
```

**1.2 Core Templates**
- Create base HTML template with required header/footer structure
- Implement CSS variables for brand colors
- Set up responsive grid system
- Create component CSS classes (cards, buttons, forms)

### Phase 2: Public Pages (Week 2-3)

**2.1 Homepage**
- Rebuild index.html with clean structure
- Implement hero with gradient overlay
- Create horizontal link strip component
- Build hero cards, stats, services preview sections
- Add project showcase and testimonials
- Implement request category section

**2.2 Marketplace**
- Rebuild marketplace.html
- Implement search/filter UI
- Create product card component
- Build category filter grid
- Add trusted brands scroll
- Implement product sourcing card

**2.3 Services**
- Rebuild services.html
- Extract service data to JSON
- Create category panel component
- Build featured services grid
- Implement search/filter panel
- Add connected ecosystem links

**2.4 Blogs**
- Rebuild blogs.html
- Extract blog data to JSON
- Create magazine hero component
- Build reading paths grid
- Implement topic editorial grid
- Add searchable archive

### Phase 3: Account System (Week 4)

**3.1 Authentication**
- Rebuild accounts/auth/login.html
- Implement enterprise-accounts.js integration
- Add role selection form
- Implement Firebase Auth (when keys available)

**3.2 Dashboards**
- Rebuild client/dashboard.html
- Rebuild vendor/vendor-dashboard.html
- Rebuild provider dashboard
- Rebuild property-owner dashboard
- Standardize dashboard layouts

### Phase 4: Commerce (Week 5)

**4.1 Cart**
- Rebuild cart.html
- Clean up universal cart logic
- Standardize storage keys
- Implement cart item normalization
- Add save for later functionality

**4.2 Checkout**
- Rebuild checkout.html
- Clean up checkout form
- Implement payment method selection
- Add order summary calculation
- Prepare for payment integrations

### Phase 5: Integration & Polish (Week 6)

**5.1 Firebase Integration**
- Add real Firebase config
- Test Firestore collections
- Implement file upload
- Add real-time listeners

**5.2 Performance & SEO**
- Optimize images
- Add meta tags
- Implement lazy loading
- Add structured data

**5.3 Testing**
- Cross-browser testing
- Mobile responsiveness testing
- Form validation testing
- Payment flow testing

---

## Critical Rules for Rebuild

### DO NOT:
- Copy broken code directly
- Use inline styles on structural elements
- Include sidebar HTML, JS, or CSS
- Forget to properly close buttons
- Use © symbol instead of &copy; entity
- Mix CSS naming conventions

### MUST:
- Follow the index.html template structure
- Use premium-topbar and premium-header classes
- Include required CSS links
- Implement floating buttons (cart, WhatsApp)
- Use data-cart-count attribute
- Render footer via JS
- Maintain brand colors and fonts
- Keep the no-sidebar layout

---

## File-by-File Rebuild Checklist

### Core Files
- [ ] index.html (homepage)
- [ ] css/style.css (main stylesheet)
- [ ] css/variables.css (new - design tokens)
- [ ] js/main.js (global functions)
- [ ] shared/firebase/firebase-config.js
- [ ] shared/firebase/firebase-bridge.js
- [ ] shared/layout/footer.css
- [ ] shared/layout/footer-data.js
- [ ] shared/layout/footer-render.js
- [ ] shared/uploads/upload-bridge.css
- [ ] shared/uploads/upload-bridge.js

### Public Pages
- [ ] marketplace.html
- [ ] services.html
- [ ] blogs.html
- [ ] interior-design.html
- [ ] repairs.html
- [ ] materials.html
- [ ] realestate.html
- [ ] property-management.html
- [ ] contact.html
- [ ] about.html
- [ ] portfolio.html
- [ ] investment.html

### Commerce Pages
- [ ] cart.html
- [ ] checkout.html
- [ ] product-detail.html

### Marketplace Sub-pages
- [ ] pages/market/secondhand.html
- [ ] pages/market/sell-secondhand.html
- [ ] pages/market/dropshipping.html
- [ ] pages/market/product-sourcing.html
- [ ] pages/market/product-reviews.html

### Account Pages
- [ ] accounts/auth/login.html
- [ ] accounts/register.html
- [ ] client/dashboard.html
- [ ] vendor/vendor-dashboard.html
- [ ] vendor/provider-account.html
- [ ] vendor/vendor-upload.html
- [ ] accounts/provider/dashboard.html
- [ ] accounts/property-owner/dashboard.html
- [ ] admin/admin-pro.html

### Blog Pages
- [ ] Individual blog detail pages (20+)

### Service Pages
- [ ] Individual service detail pages (160+)

### Data Files
- [ ] data/services.json
- [ ] data/blogs.json
- [ ] data/marketplace.json

---

## Next Steps

1. **Review this blueprint** with user approval
2. **Create the new folder structure**: `furnostyles-clean-rebuild/`
3. **Set up foundation files** (Phase 1)
4. **Begin systematic rebuild** following the phased approach
5. **Test each phase** before moving to the next
6. **Migrate Firebase config** when ready
7. **Deploy and monitor** the new clean site

---

**Blueprint Version:** 1.0  
**Status:** Ready for review and implementation
