# Furnostyles Future Platform Expansion Architecture

**Date:** 2026-05-22  
**Workspace:** `furnostyles-clean-rebuild/`  
**Status:** Strategy document — no code to be written yet  

---

## Executive Summary

This document describes how the current Furnostyles brand website will safely expand into a full-service e-commerce, marketplace, and property management platform. The goal is to build a clean, scalable architecture that adds features without destroying what already works.

**Build order principle:** Start with the simplest version of each feature. Prove it works. Then expand. Never build everything at once.

---

## 1. Recommended Future Folder Architecture

### Current State

```
furnostyles-clean-rebuild/
├── index.html
├── about.html
├── services.html
├── repairs.html
├── portfolio.html
├── contact.html
├── blogs.html
├── blogs/
│   ├── article-data.js
│   ├── article-utils.js
│   └── modern-luxury-interior-design-kenya.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── shared/
│   ├── layout/
│   ├── firebase/
│   └── uploads/
└── docs/
```

### Recommended Future State (after full expansion)

```
furnostyles-clean-rebuild/
├── public/                          # Static pages (no auth needed)
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── repairs.html
│   ├── portfolio.html
│   ├── contact.html
│   ├── blogs.html
│   ├── blog-template.html
│   ├── blogs/
│   ├── marketplace.html             # Landing page (browse only)
│   └── product-detail.html          # Public product view
│
├── client/                          # Client dashboard (auth required)
│   ├── dashboard.html
│   ├── orders.html
│   ├── saved-articles.html
│   ├── messages.html
│   ├── profile.html
│   └── request-service.html
│
├── vendor/                          # Vendor/supplier dashboard
│   ├── dashboard.html
│   ├── products.html
│   ├── orders.html
│   ├── messages.html
│   ├── analytics.html
│   └── profile.html
│
├── admin/                           # Admin control panel
│   ├── dashboard.html
│   ├── users.html
│   ├── products.html
│   ├── orders.html
│   ├── content.html               # Blog, SEO, pages
│   ├── reports.html
│   └── settings.html
│
├── marketplace/                     # Product browsing (public + auth hybrid)
│   ├── index.html
│   ├── category.html
│   ├── search.html
│   └── product.html
│
├── realestate/                      # Property management section
│   ├── index.html
│   ├── listings.html
│   ├── property-detail.html
│   └── landlord-tools.html
│
├── assets/
│   ├── css/
│   │   ├── global.css             # Variables, resets, utilities
│   │   ├── layout.css             # Header, footer, grid
│   │   ├── components.css         # Buttons, cards, forms
│   │   ├── blog.css               # Article styles
│   │   ├── marketplace.css        # Product grid, filters
│   │   ├── dashboard.css          # Client/vendor/admin UI
│   │   ├── checkout.css           # Cart, payment forms
│   │   └── responsive.css         # All breakpoints
│   │
│   ├── js/
│   │   ├── app.js                 # Global utilities
│   │   ├── blog.js                # Article page logic
│   │   ├── marketplace.js         # Product browsing logic
│   │   ├── cart.js                # Shopping cart
│   │   ├── checkout.js            # Payment flow
│   │   ├── auth.js                # Login, register, session
│   │   ├── dashboard.js           # Shared dashboard utilities
│   │   └── notifications.js     # Toast, alerts, messages
│   │
│   └── images/
│       ├── blogs/
│       ├── products/
│       ├── portfolio/
│       ├── realestate/
│       └── uploads/               # User-generated content
│
├── shared/
│   ├── layout/                    # Header, footer renderers
│   ├── firebase/                  # Firebase config + bridges
│   ├── uploads/                   # Upload bridge + UI
│   ├── components/                # Reusable HTML/JS components
│   │   ├── product-card.js
│   │   ├── service-card.js
│   │   ├── notification-toast.js
│   │   ├── search-bar.js
│   │   └── filter-sidebar.js
│   └── lib/                       # Third-party helpers
│       └── payment-sdk.js
│
├── docs/                          # Architecture + strategy docs
│   ├── SEO-BLOG-REBUILD-PLAN.md
│   ├── seo-content-roadmap.md
│   └── future-platform-expansion.md
│
└── scripts/                       # Build/deployment helpers
    ├── compress-images.js
    ├── generate-sitemap.js
    └── verify-links.js
```

### Why This Structure?

| Folder | Purpose | Auth Level |
|--------|---------|------------|
| `public/` | Marketing + content pages anyone can see | None |
| `client/` | Customer dashboard (orders, messages, requests) | Client login |
| `vendor/` | Supplier dashboard (products, orders, analytics) | Vendor login |
| `admin/` | Internal operations (users, content, reports) | Admin login |
| `marketplace/` | Product browsing (some pages public, some require login) | Hybrid |
| `realestate/` | Property listings and landlord tools | Hybrid |
| `shared/` | Components used across all folders | All |

**Key rule:** Keep public and private pages in separate folders. This makes security audits simple — if a file is not in `public/`, it should require authentication.

---

## 2. Marketplace Architecture Plan

### Phase 1: Browse-Only Marketplace (Build First)

**What it is:** A product catalogue where visitors can browse, search, and filter products. No cart. No checkout. Just "request a quote" or "contact us for pricing."

**Why this first:** Lower risk. No payment integration needed. Tests whether users actually want these products before building complex checkout flows.

```
marketplace/index.html       # Product grid with filters
marketplace/category.html    # Category-specific browsing
marketplace/product.html     # Individual product detail
```

**Features in Phase 1:**
- Product grid with images, name, price, category
- Category sidebar filter
- Search bar
- Sort by price, newest, popularity
- Product detail page with specs, images, "Request Quote" button
- "Related products" section
- "Save to wishlist" (localStorage, no login needed)

### Phase 2: Cart + Wishlist (Build After Phase 1 Proves Value)

**What it is:** Add a real cart. Users can add products, see totals, but checkout still redirects to WhatsApp or contact form.

**Features:**
- Floating cart button with item count
- Cart page with quantity adjustment, remove items
- Wishlist (requires login or localStorage)
- Cart persistence across sessions

### Phase 3: Full Checkout (Build After Phase 2 is Stable)

**What it is:** Complete purchase flow with payment integration.

**Features:**
- Checkout page with shipping details
- Payment integration (M-Pesa, Paystack, Stripe)
- Order confirmation + receipt
- Order history in client dashboard

**Architecture decisions:**
- Product data starts as static JSON files, moves to Firebase when vendor uploads begin
- Product images stored in Firebase Storage or Cloudflare R2
- Prices can be hidden behind "Request Quote" for custom furniture (B2B model)

---

## 3. Vendor Dashboard Architecture Plan

### What It Is

A simple dashboard where approved suppliers can:
- Add/edit their products
- View orders placed for their products
- Respond to customer messages
- Update their business profile

### Folder: `vendor/`

```
vendor/
├── index.html              # Redirects to login if not authenticated
├── dashboard.html          # Summary: sales, orders, messages
├── products.html           # CRUD for vendor's own products
├── orders.html             # Orders containing vendor's products
├── messages.html           # Chat with customers/admin
├── analytics.html          # Simple charts (sales, views)
└── profile.html            # Business info, bank details for payouts
```

### Build Order

| Phase | Feature | When |
|-------|---------|------|
| 1 | Vendor login + dashboard shell | After marketplace Phase 1 |
| 2 | Product upload form (name, price, images, description) | After marketplace Phase 1 |
| 3 | Order notifications | After marketplace Phase 2 |
| 4 | Messaging with customers | After marketplace Phase 3 |
| 5 | Analytics and payouts | After 10+ active vendors |

**Key rule:** Vendors can only see and edit their own products. This is enforced in Firebase security rules, not just the UI.

---

## 4. Client Dashboard Architecture Plan

### What It Is

A simple dashboard where customers can:
- View their service requests and orders
- Save articles and products
- Message Furnostyles or vendors
- Update their profile and addresses
- Track project progress

### Folder: `client/`

```
client/
├── index.html              # Redirects to login if not authenticated
├── dashboard.html          # Summary: orders, messages, saved items
├── orders.html             # Purchase history + service requests
├── saved-articles.html     # Bookmarked blog posts
├── wishlist.html           # Saved marketplace products
├── messages.html           # Chat with Furnostyles/vendors
├── profile.html            # Personal info, addresses, preferences
└── request-service.html    # Submit interior design/repair requests
```

### Build Order

| Phase | Feature | When |
|-------|---------|------|
| 1 | Login/register + profile | After marketplace Phase 2 |
| 2 | Order history + service requests | After marketplace Phase 3 |
| 3 | Saved articles + wishlist | After blog has 10+ articles |
| 4 | Messaging | After vendor messaging exists |
| 5 | Project tracking dashboard | After service request volume grows |

---

## 5. Admin System Architecture Plan

### What It Is

An internal control panel for Furnostyles staff to manage everything.

### Folder: `admin/`

```
admin/
├── index.html              # Login (separate from client/vendor)
├── dashboard.html          # KPIs: orders, users, revenue, traffic
├── users.html              # All users (clients, vendors, staff)
│   ├── clients/
│   ├── vendors/
│   └── admins/
├── products.html           # All marketplace products
│   ├── pending/            # Awaiting approval
│   ├── approved/
│   └── flagged/
├── orders.html             # All orders + fulfilment status
├── content.html            # Blog posts, pages, SEO meta
│   ├── blog-posts/
│   ├── pages/
│   └── seo/
├── messages.html           # Internal + customer support chat
├── reports.html            # Sales, traffic, vendor performance
└── settings.html           # Platform config, categories, banners
```

### Build Order

| Phase | Feature | When |
|-------|---------|------|
| 1 | Admin login + user management | Before any vendor/client dashboards |
| 2 | Product approval workflow | When vendor uploads begin |
| 3 | Content management (blog, pages) | When blog scaling requires non-dev updates |
| 4 | Order management + fulfilment | When marketplace checkout is live |
| 5 | Reports and analytics | When there is data to report on |

**Critical rule:** Admin login must be completely separate from client/vendor login. Different Firebase auth providers, different redirect logic. Never allow an admin session to leak into a client page.

---

## 6. Product Categories Architecture

### Category Tree (Start Simple)

```
Marketplace
├── Materials
│   ├── Flooring
│   │   ├── Tiles
│   │   ├── Wood & Laminate
│   │   ├── Vinyl & SPC
│   │   └── Epoxy & Resin
│   ├── Wall Finishes
│   │   ├── Paint
│   │   ├── Wallpaper
│   │   ├── Cladding
│   │   └── Texture & Plaster
│   ├── Ceilings
│   │   ├── Gypsum Boards
│   │   └── T&G Wood
│   └── Hardware
│       ├── Electrical
│       ├── Plumbing
│       └── Fixtures
│
├── Furniture
│   ├── Living Room
│   │   ├── Sofas
│   │   ├── Coffee Tables
│   │   └── TV Units
│   ├── Bedroom
│   │   ├── Beds
│   │   ├── Wardrobes
│   │   └── Nightstands
│   ├── Dining
│   │   ├── Tables
│   │   └── Chairs
│   └── Kitchen
│       ├── Cabinets
│       └── Islands
│
├── Lighting
│   ├── Indoor
│   │   ├── Ceiling Lights
│   │   ├── Wall Lights
│   │   └── Table/Floor Lamps
│   └── Outdoor
│
└── Decor
    ├── Curtains & Blinds
    ├── Rugs & Carpets
    └── Art & Accessories
```

### Implementation

- Categories stored in a single JSON file initially: `assets/data/categories.json`
- When vendors need to select categories, move to Firebase Firestore
- Each product has exactly one category + optional tags
- Category pages are static HTML with dynamic filtering via JS

**Rule:** Do not allow vendors to create new categories. Only admin can add categories. This prevents category chaos.

---

## 7. Future Sidebar Strategy

### When to Add a Sidebar

Add a sidebar **only** when the page genuinely needs one. Not every page needs a sidebar.

### Sidebar Rules

| Page Type | Sidebar? | Why |
|-----------|----------|-----|
| Blog article (cornerstone) | **No** | Content should be the full focus. 840px max-width is optimal for reading. |
| Blog article (supporting) | **No** | Same reason. |
| Blog listing / category page | **Yes** | Filter by category, featured articles, newsletter signup. |
| Marketplace browse | **Yes** | Category filter, price range, sort options, brand filter. |
| Product detail | **No** | Product info is the focus. Related products go below. |
| Dashboard pages | **Yes** | Navigation menu, quick stats, notifications. |
| Public info pages | **No** | Services, about, contact should be clean and focused. |

### Sidebar Architecture

```css
/* Sidebar exists only when explicitly added */
.fns-page-layout {
  display: grid;
  grid-template-columns: 1fr; /* Default: no sidebar */
  gap: var(--fns-spacing-xl);
}

.fns-page-layout--with-sidebar {
  grid-template-columns: 1fr 280px;
}

@media (max-width: 1024px) {
  .fns-page-layout--with-sidebar {
    grid-template-columns: 1fr; /* Stack on tablet */
  }
  .fns-sidebar {
    order: 2; /* Move below content on mobile */
  }
}
```

```html
<!-- Only pages that need a sidebar use this -->
<div class="fns-page-layout fns-page-layout--with-sidebar">
  <main class="fns-main-content">...</main>
  <aside class="fns-sidebar">...</aside>
</div>
```

**Key rule:** The sidebar is a CSS modifier, not a default. Most pages do not have one.

---

## 8. Shared Reusable Component Strategy

### Philosophy

Build once. Use everywhere. Components should be self-contained HTML/CSS/JS blocks that accept data and render consistently.

### Component Inventory

| Component | Used In | Data Source |
|-----------|---------|-------------|
| **Header** | All pages | `shared/layout/header-render.js` |
| **Footer** | All pages | `shared/layout/footer-render.js` |
| **Product Card** | Marketplace, vendor dashboard | Static JSON or Firestore |
| **Service Card** | Services, blog CTAs | Static HTML |
| **Article Card** | Blog listing, related articles | `article-data.js` |
| **Search Bar** | Marketplace, blog, header | User input + JS filter |
| **Filter Sidebar** | Marketplace, blog listing | Static config + JS state |
| **Notification Toast** | All pages | JS events |
| **Modal/Dialog** | All pages | JS trigger |
| **Form Fields** | Contact, checkout, dashboards | Reusable CSS classes |
| **Image Gallery** | Product detail, portfolio | Static HTML + JS |
| **Cart Float** | All pages (when cart exists) | localStorage or Firestore |
| **Chat Float** | All pages | WhatsApp link (now) → custom chat (future) |

### Component File Structure

```
shared/components/
├── product-card/
│   ├── product-card.html      # Template
│   ├── product-card.css       # Styles
│   └── product-card.js        # Render logic
├── service-card/
│   ├── service-card.html
│   ├── service-card.css
│   └── service-card.js
├── article-card/
│   ├── article-card.html
│   ├── article-card.css
│   └── article-card.js
├── search-bar/
│   ├── search-bar.html
│   ├── search-bar.css
│   └── search-bar.js
├── notification-toast/
│   ├── toast.css
│   └── toast.js
└── modal/
    ├── modal.css
    └── modal.js
```

**Rule:** Each component has its own folder with HTML, CSS, and JS. Load only what the page needs. Do not put all component CSS in one giant file.

---

## 9. Firebase Integration Strategy

### What Firebase Handles

| Feature | Firebase Service | When to Add |
|---------|---------------|-------------|
| User authentication | Firebase Auth | Phase: client/vendor login |
| User data | Cloud Firestore | Phase: user profiles |
| Product data | Cloud Firestore | Phase: vendor uploads |
| Order data | Cloud Firestore | Phase: marketplace checkout |
| Blog data | Cloud Firestore (optional) | Phase: admin CMS |
| Image uploads | Firebase Storage | Phase: vendor uploads |
| Real-time chat | Firestore + Cloud Functions | Phase: messaging |
| Notifications | Firebase Cloud Messaging | Phase: mobile app |
| Analytics | Google Analytics + Firebase | Phase: always |

### Security Rules Philosophy

Firestore security rules are the only real security in a static-hosted app. Never trust the frontend.

```javascript
// Example Firestore security rule pattern
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // Vendors can only edit their own products
    match /products/{productId} {
      allow read: if true; // Public
      allow create: if request.auth != null && request.auth.token.role == 'vendor';
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.vendorId;
    }
    // Admins can do everything
    match /{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.role == 'admin';
    }
  }
}
```

### Firebase Cost Control

| Service | Free Tier | When to Worry |
|---------|-----------|---------------|
| Auth | 10,000 users/month | Not for years |
| Firestore | 1GB storage, 50k reads/day | At ~500 active users |
| Storage | 5GB | At ~1000 product images |
| Hosting | 1GB + 10GB transfer | Always sufficient |

**Rule:** Start on the Spark (free) plan. Upgrade to Blaze (pay-as-you-go) only when revenue justifies it.

---

## 10. Cart and Checkout Architecture

### Cart Data Model

```javascript
// Cart stored in localStorage for guests, Firestore for logged-in users
{
  items: [
    {
      productId: 'abc123',
      name: 'Porcelain Floor Tile 60x60',
      price: 1200,       // In KES
      quantity: 25,
      image: '../assets/images/products/tile-1.jpg',
      vendorId: 'vendor-456',
      category: 'flooring'
    }
  ],
  subtotal: 30000,
  shipping: 1500,
  total: 31500,
  updatedAt: '2026-05-22T10:00:00Z'
}
```

### Cart Persistence Strategy

| User Type | Cart Storage | Sync |
|-----------|-------------|------|
| Guest (not logged in) | localStorage | None |
| Logged-in user | Firestore + localStorage | Sync on login |
| User logs in with localStorage cart | Firestore | Merge carts, clear localStorage |

### Checkout Flow

```
Cart Page
  → Review items, adjust quantities
  → Enter shipping details
  → Select payment method (M-Pesa / Paystack / Card)
  → Confirm order
  → Payment gateway redirect
  → Callback / webhook confirmation
  → Order confirmation page
  → Email receipt (Firebase Extensions or Cloud Functions)
```

### Order Data Model

```javascript
{
  orderId: 'FNS-2026-0001',
  userId: 'user-123',
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  items: [ /* cart items */ ],
  shipping: { name, phone, address, county, notes },
  payment: { method, transactionId, amount, paidAt },
  createdAt: '2026-05-22T10:00:00Z',
  updatedAt: '2026-05-22T10:05:00Z'
}
```

---

## 11. M-Pesa / Paystack / Stripe Integration Points

### Recommended Approach: Start with One, Add Others

**Phase 1:** M-Pesa only. It is the dominant payment method in Kenya.

**Phase 2:** Add Paystack (handles M-Pesa + cards + bank transfer in one integration).

**Phase 3:** Add Stripe for international cards.

### M-Pesa Integration (Daraja API)

| Component | Implementation |
|-----------|---------------|
| STK Push | User enters phone number → API triggers push → User confirms on phone |
| Callback URL | Firebase Cloud Function receives payment confirmation |
| Status check | Poll transaction status if callback fails |
| Fallback | If STK push fails, show manual paybill/till number |

**Architecture:**
```
Frontend (checkout.js)
  → Firebase Cloud Function (processPayment)
    → Daraja API (STK Push)
      → User phone (confirmation)
    ← Daraja Callback (success/failure)
  ← Cloud Function updates Firestore order status
    → Frontend listens to Firestore (real-time status update)
```

### Paystack Integration

| Component | Implementation |
|-----------|---------------|
| Popup | Paystack JS popup on checkout page |
| Callback | Redirect to confirmation page with reference |
| Webhook | Firebase Cloud Function verifies transaction |
| Refunds | Admin dashboard triggers Paystack refund API |

### Stripe Integration

| Component | Implementation |
|-----------|---------------|
| Card element | Stripe Elements on checkout page |
| Payment intent | Server-side intent creation via Cloud Function |
| 3D Secure | Handled automatically by Stripe.js |
| Webhook | Cloud Function listens for `payment_intent.succeeded` |

### Payment Security Rules

- Never store card numbers. Stripe/Paystack handle this.
- M-Pesa PIN is never entered on your site. It is entered on the user's phone.
- All payment processing happens server-side (Cloud Functions), never in the browser.
- Webhook endpoints must verify signatures to prevent spoofing.

---

## 12. SEO Protection Strategy While Scaling

### Risk: Dynamic Content Breaks SEO

When you move from static HTML to Firebase-driven content, search engines may not see the content.

### Protection Strategy

| Technique | Implementation | Priority |
|-----------|---------------|----------|
| **Static HTML fallback** | Keep blog articles as real HTML files. Do not render them entirely from JS. | **Critical** |
| **Pre-rendering** | Use Cloudflare Pages prerendering or Firebase Hosting prerendering for dynamic pages | High |
| **Sitemap** | Generate `sitemap.xml` with all static URLs. Update weekly via script. | **Critical** |
| **Meta tags in HTML** | Every page must have real `<title>` and `<meta name="description">` in the HTML, not injected by JS | **Critical** |
| **Canonical URLs** | Every page has a canonical link. Prevents duplicate content when URLs have query params | High |
| **Structured data** | JSON-LD schema in `<head>` for articles, products, organisations | High |
| **Robots.txt** | Allow everything except `/admin/`, `/vendor/`, `/client/` | High |
| **URL structure** | Keep URLs simple and permanent: `/blogs/article-slug.html`, `/marketplace/product-slug.html` | **Critical** |
| **Image alt text** | Every product and blog image has descriptive alt text | High |
| **Page speed** | Lazy loading, image compression, minimal JS on public pages | **Critical** |

### What NOT to Do

- Do not render blog content entirely from `article-data.js` with empty HTML shells. Google may not execute JS fully.
- Do not use hash-based routing (`/#/product/123`). Use real URLs.
- Do not change URLs after publishing. If a URL must change, implement a 301 redirect.
- Do not block CSS/JS files in robots.txt. Google needs to render the page correctly.

---

## 13. Performance Optimization Strategy

### Current Priorities (Before Any Expansion)

| Metric | Target | How |
|--------|--------|-----|
| First Contentful Paint | < 1.5s | Inline critical CSS, defer non-critical |
| Largest Contentful Paint | < 2.5s | Hero image optimization, lazy loading |
| Time to Interactive | < 3.5s | Defer non-essential JS |
| Cumulative Layout Shift | < 0.1 | Define image dimensions, avoid late-loading fonts |

### As Platform Scales

| Technique | When | Implementation |
|-----------|------|----------------|
| **Image compression** | Always | WebP with JPEG fallback. Max 200KB inline, 400KB hero. |
| **Lazy loading** | Always | `loading="lazy"` on all below-fold images. IntersectionObserver for JS-driven images. |
| **CSS splitting** | When marketplace launches | Load `marketplace.css` only on marketplace pages. |
| **JS code splitting** | When dashboard launches | Load `dashboard.js` only on dashboard pages. |
| **CDN** | Always | Cloudflare Pages includes CDN. Firebase Hosting includes CDN. |
| **Caching** | Always | Aggressive caching for images, CSS, JS. Short cache for HTML. |
| **Service worker** | When PWA is needed | Cache static assets for offline browsing. |
| **Database indexing** | When Firestore queries slow down | Index frequently queried fields (category, status, userId). |

### Performance Budget

```
Public page (blog, services, about):
  HTML: < 50KB
  CSS: < 30KB (total, split across files)
  JS: < 50KB (total, excluding deferred)
  Images: < 500KB first view
  Total page weight: < 1MB

Dashboard page (client, vendor, admin):
  HTML: < 30KB
  CSS: < 40KB (includes charts, tables)
  JS: < 150KB (includes chart library, table sorting)
  Images: Minimal (mostly icons)
  Total page weight: < 500KB
```

---

## 14. Image/Media Management Strategy

### Source Types

| Source | Examples | Storage |
|--------|----------|---------|
| Furnostyles portfolio | Before/after photos, project galleries | `assets/images/portfolio/` |
| Blog articles | Article heroes, inline images | `assets/images/blogs/` |
| Product photos | Vendor-uploaded product images | Firebase Storage |
| User uploads | Profile photos, project reference images | Firebase Storage |
| Real estate | Property photos, floor plans | Firebase Storage |

### Image Pipeline

```
Upload (vendor/user)
  → Cloud Function (resize + compress + convert to WebP)
    → Firebase Storage (store original + 3 sizes)
      → CDN delivery (Cloudflare or Firebase CDN)
```

### Required Image Sizes

| Size | Dimensions | Use Case |
|------|-----------|----------|
| Thumbnail | 300x200 | Product grids, article cards |
| Medium | 600x400 | Product detail galleries, blog inline |
| Large | 1200x800 | Hero images, portfolio fullscreen |
| Original | Unchanged | Admin download, print materials |

### Alt Text Policy

- Every image must have alt text.
- Blog images: descriptive, keyword-rich where natural.
- Product images: "[Product name] in [colour/material] — [angle/view]"
- Portfolio images: "[Room type] interior design by Furnostyles in [location]"
- Decorative images: empty alt (`alt=""`)

---

## 15. Blog-to-Markplace Linking Strategy

### Philosophy

The blog is the top of the funnel. The marketplace is the bottom. Every blog article should create a natural path to a product or service.

### Linking Rules

| Blog Topic | Links To | Anchor Text Example |
|------------|----------|---------------------|
| Flooring guide | `/marketplace/category/flooring` | "Browse flooring materials" |
| Kitchen cabinets | `/marketplace/category/kitchen/cabinets` | "Shop kitchen cabinets" |
| Lighting design | `/marketplace/category/lighting` | "View lighting products" |
| Custom furniture | `/marketplace/category/furniture` | "Explore custom furniture" |
| Interior design services | `/services.html` | "Request a design consultation" |
| Repairs | `/repairs.html` | "Book a repair inspection" |

### Contextual Linking Rules

1. **Maximum 2 marketplace links per blog article.** More feels like advertising.
2. **Links must be relevant to the section.** A flooring article should not link to lighting products mid-paragraph.
3. **Always include a service/contact CTA.** The primary conversion is a service request, not a product sale.
4. **Product links are secondary CTAs.** They appear after the main service CTA or in a dedicated "Products Mentioned" section.
5. **Track link clicks.** Use `data-track` attributes to measure which blog topics drive marketplace traffic.

### Product Mention Block (Future Component)

```html
<div class="fns-product-mention">
  <h4>Products Mentioned in This Guide</h4>
  <div class="fns-product-mini-grid">
    <!-- Dynamically populated from article-data.js relatedProducts -->
  </div>
</div>
```

---

## 16. Service-Request Workflow Strategy

### What It Is

A system where customers can request interior design, repairs, or finishing services directly through the website.

### Workflow

```
Customer
  → Visits /services.html or reads a blog
    → Clicks "Request a Quote"
      → Fills service request form
        → Form data saved to Firestore
          → Admin notification (email + dashboard alert)
            → Admin assigns to team member
              → Team member contacts customer
                → Site visit scheduled
                  → Quotation prepared
                    → Customer approves quotation
                      → Project begins
                        → Progress updates in client dashboard
                          → Project complete
                            → Review request sent
```

### Service Request Data Model

```javascript
{
  requestId: 'SR-2026-0001',
  userId: 'user-123',              // null for guest requests
  name: 'John Kamau',
  phone: '+254712345678',
  email: 'john@example.com',
  serviceType: 'interior-design' | 'repairs' | 'house-finishing' | 'custom-furniture',
  propertyType: 'apartment' | 'house' | 'commercial' | 'rental' | 'airbnb',
  location: 'Kilimani, Nairobi',
  budget: '1-3m' | '3-5m' | '5-10m' | '10m+',
  timeline: 'asap' | '1-3months' | '3-6months' | 'flexible',
  description: 'Detailed notes from customer',
  status: 'new' | 'contacted' | 'site-visit-scheduled' | 'quotation-sent' | 'approved' | 'in-progress' | 'completed' | 'cancelled',
  assignedTo: 'staff-id-456',
  createdAt: '2026-05-22T10:00:00Z',
  updatedAt: '2026-05-22T10:00:00Z'
}
```

### Build Order

| Phase | Feature | When |
|-------|---------|------|
| 1 | Simple contact form → email | Now (already exists) |
| 2 | Service request form → Firestore | After client dashboard exists |
| 3 | Admin dashboard to manage requests | After Phase 2 |
| 4 | Client dashboard to track progress | After Phase 3 |
| 5 | Automated status notifications | After Phase 4 |

---

## 17. Real Estate Section Strategy

### What It Is

A dedicated section for landlords, Airbnb hosts, and property investors to access Furnostyles services tailored to rental properties.

### Pages

```
realestate/
├── index.html              # Overview: services for property owners
├── listings.html           # Showcase of finished properties (portfolio)
├── property-detail.html    # Individual property showcase
├── landlord-tools.html     # Calculators, checklists, guides
├── airbnb-design.html      # Dedicated Airbnb service page
└── rental-finishing.html   # Dedicated rental finishing page
```

### Integration Points

| Feature | Integration | When |
|---------|-------------|------|
| Property listings | Pull from portfolio database | After 5+ rental projects completed |
| Cost calculator | JavaScript calculator for finishing budgets | After marketplace Phase 1 |
| Landlord dashboard | Part of client dashboard | After client dashboard exists |
| Tenant-ready checklist | Downloadable PDF + web version | Now (static page) |
| Airbnb styling packages | Product bundles in marketplace | After marketplace Phase 2 |

### Content Strategy

- Blog articles about Airbnb and rentals link to `realestate/` pages.
- Real estate pages link to relevant marketplace categories (durable materials, furniture packages).
- Real estate pages link to service request forms.

---

## 18. Security and Authentication Strategy

### Authentication Flow

```
Login Page
  → Firebase Auth (email/password, Google, phone)
    → Custom claims set in Cloud Function (role: client | vendor | admin)
      → Redirect based on role
        → Client → /client/dashboard.html
        → Vendor → /vendor/dashboard.html
        → Admin → /admin/dashboard.html
```

### Role-Based Access Control

| Role | Can Access | Cannot Access |
|------|-----------|-------------|
| **Guest** | Public pages, browse marketplace, read blogs | Dashboards, orders, messages |
| **Client** | Public pages + client dashboard | Vendor dashboard, admin panel |
| **Vendor** | Public pages + vendor dashboard | Other vendors' data, admin panel |
| **Admin** | Everything | Nothing |

### Security Checklist

- [ ] Firebase Auth with email verification
- [ ] Custom claims for role-based access
- [ ] Firestore security rules enforced on every read/write
- [ ] Admin pages blocked by Cloudflare Access or Firebase Hosting rewrite rules
- [ ] HTTPS only (enforced by Cloudflare / Firebase)
- [ ] Content Security Policy (CSP) headers to prevent XSS
- [ ] No sensitive data in localStorage (only auth tokens, which Firebase handles securely)
- [ ] API keys restricted by domain (Firebase API key)
- [ ] Cloud Functions validate authentication on every request
- [ ] Rate limiting on login attempts (Firebase built-in + Cloud Function guards)

### Data Privacy (Kenya POPIA Compliance)

| Requirement | Implementation |
|-------------|----------------|
| Consent for data collection | Checkbox on registration |
| Right to access data | "Download my data" button in client profile |
| Right to delete data | "Delete my account" button + admin action |
| Data minimisation | Only collect what is needed for service delivery |
| Secure storage | Firebase Auth + Firestore (encrypted at rest) |
| No sharing without consent | Privacy policy + no third-party sales |

---

## 19. Cloudflare Pages Deployment Strategy

### Why Cloudflare Pages

- **Free hosting** for static sites (generous limits)
- **Global CDN** (200+ locations)
- **Automatic HTTPS**
- **Build pipeline** (Git integration)
- **Analytics** included
- **Firebase Hosting** is the alternative, but Cloudflare Pages has better performance for static content

### Recommended Setup

```
GitHub Repository
  → Cloudflare Pages (auto-build on push)
    → Preview deployments for pull requests
    → Production deployment for main branch
      → Custom domain: furnostyles.com
        → Cloudflare DNS + SSL
          → Cloudflare Workers (for edge functions if needed)
```

### Build Configuration

```yaml
# cloudflare-pages.yml (conceptual)
build:
  command: "npm run build"  # If build step needed
  output_dir: "./"          # Static files root
  
deploy:
  branch: main
  preview_branches: [develop, feature/*]
```

### Firebase + Cloudflare Hybrid

| Service | Host | Why |
|---------|------|-----|
| Static pages (HTML, CSS, JS) | Cloudflare Pages | Faster, cheaper for static content |
| Firebase Auth | Firebase | Built-in authentication |
| Firestore database | Firebase | Real-time data |
| Firebase Storage | Firebase | Image/file storage |
| Cloud Functions | Firebase | Server-side logic |
| CDN | Cloudflare + Firebase | Both provide CDN |

**Domain setup:**
- `furnostyles.com` → Cloudflare Pages (main site)
- `api.furnostyles.com` → Firebase Cloud Functions (API endpoints)
- `admin.furnostyles.com` → Cloudflare Pages (admin panel, protected by Cloudflare Access)

### Environment Variables (Secrets)

Store in Cloudflare Pages dashboard:
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `PAYSTACK_PUBLIC_KEY`
- `STRIPE_PUBLIC_KEY`

**Never commit API keys to Git.** Use `.env.example` for documentation, `.env` for local (gitignored).

---

## 20. Long-Term Maintenance Strategy

### Weekly Tasks (15 minutes)

| Task | Owner | Tool |
|------|-------|------|
| Check for broken links | Developer | `scripts/verify-links.js` |
| Review contact form submissions | Admin | Email / dashboard |
| Check site uptime | Admin | Cloudflare / UptimeRobot |
| Review Search Console | SEO Lead | Google Search Console |

### Monthly Tasks (2 hours)

| Task | Owner | Tool |
|------|-------|------|
| Update cornerstone articles | Content Writer | CMS / HTML editor |
| Review and approve vendor products | Admin | Admin dashboard |
| Check site speed | Developer | PageSpeed Insights |
| Backup Firestore data | Developer | Firebase export |
| Review analytics | SEO Lead | Google Analytics |
| Compress new images | Developer | `scripts/compress-images.js` |

### Quarterly Tasks (1 day)

| Task | Owner | Tool |
|------|-------|------|
| Full content audit | Content Lead | Spreadsheet + Search Console |
| Security review | Developer | Firebase rules audit, dependency check |
| Update dependencies | Developer | npm audit, Firebase SDK updates |
| Performance audit | Developer | Lighthouse, WebPageTest |
| SEO audit | SEO Lead | Screaming Frog, Ahrefs |
| Plan next quarter features | All | Roadmap meeting |

### Annual Tasks (1 week)

| Task | Owner | Tool |
|------|-------|------|
| Full architecture review | Tech Lead | Document current state |
| Technology stack review | Tech Lead | Evaluate new tools |
| Cost review | Founder | Firebase billing, Cloudflare billing |
| Team training | Founder | New features, security, SEO |
| Disaster recovery test | Developer | Restore from backup |
| Legal compliance review | Founder | POPIA, terms of service |

### Documentation Standards

| Document | Location | Updated When |
|----------|----------|--------------|
| Architecture decisions | `docs/adr/` | Every major decision |
| API documentation | `docs/api/` | Every new endpoint |
| Component library | `shared/components/README.md` | Every new component |
| Onboarding guide | `docs/onboarding.md` | Every new hire |
| Deployment guide | `docs/deployment.md` | Every deployment change |

### Version Control Rules

- **Branch naming:** `feature/marketplace-phase-1`, `fix/blog-image-loading`, `hotfix/payment-webhook`
- **Commit messages:** `feat: add product card component`, `fix: resolve cart persistence bug`
- **Pull requests:** Required for all changes to `main`. Minimum 1 review.
- **Releases:** Tag releases as `v1.0.0`, `v1.1.0`. Follow semantic versioning.

---

## Build Priority Summary

### Phase 1: Foundation (Now — Month 1)
- [ ] Complete 5 cornerstone blog articles (SEO foundation)
- [ ] Stabilise blog CSS/JS system
- [ ] Implement sitemap generation
- [ ] Set up Cloudflare Pages deployment
- [ ] Connect Google Analytics + Search Console

### Phase 2: Public Expansion (Month 2–3)
- [ ] Build marketplace browse-only pages
- [ ] Add product category structure
- [ ] Integrate blog-to-marketplace links
- [ ] Add real estate section landing pages
- [ ] Expand to 10 blog articles

### Phase 3: Authentication (Month 4–5)
- [ ] Firebase Auth setup
- [ ] Client registration + login
- [ ] Client dashboard shell
- [ ] Admin dashboard shell
- [ ] Service request form → Firestore

### Phase 4: Commerce (Month 6–8)
- [ ] Cart functionality
- [ ] Checkout flow
- [ ] M-Pesa integration
- [ ] Order management in admin
- [ ] Vendor registration + dashboard
- [ ] Vendor product upload

### Phase 5: Scale (Month 9–12)
- [ ] Messaging system
- [ ] Notifications
- [ ] Advanced analytics
- [ ] Mobile app consideration
- [ ] International payment methods
- [ ] Automation (email, status updates)

---

## Final Principles

1. **Start simple.** The browse-only marketplace is more valuable than a broken checkout.
2. **Measure everything.** If a feature does not get used, remove it.
3. **Security first.** Never expose admin endpoints. Always validate auth server-side.
4. **SEO is permanent.** Every URL change costs traffic. Plan URLs before publishing.
5. **Speed is a feature.** A fast site converts better and ranks higher.
6. **Content drives traffic.** The blog is the engine. Everything else converts that traffic.
7. **Mobile first.** Most Kenyan users browse on mobile. Test on real phones, not just browser emulators.
8. **Document as you build.** Future you (and future team members) will thank you.

---

*Document version 1.0. Created 2026-05-22. No code to be written until current blog foundation is complete.*
