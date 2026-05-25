# Furnostyles Platform Architecture Summary and Onboarding Guide

**Date:** 2026-05-22 | **Status:** Architecture Complete | **Phase:** Foundation (Phase 1)

---

## How to Use This Document

This is the master onboarding document for the Furnostyles platform. Read this first before editing any code, adding any feature, or asking AI to make any change.

### Who Should Read This

| Role | Sections to Read |
|------|------------------|
| **New developer** | All sections |
| **AI assistant** | All sections before any edit |
| **Project manager** | 1-5, 18-21, 24-26 |
| **Content creator** | 8-9, 14, 22-23 |
| **Designer** | 6-7, 10-12 |

---

## 1. Project Vision

Furnostyles is a premium Kenyan interior design, furniture, and real estate platform. It connects clients with interior design services, furniture products, property listings, and a curated marketplace of vendors.

### Vision Statement

> To become Kenya's most trusted premium platform for interior design inspiration, services, furniture sourcing, and property solutions — built on clean architecture that scales to 500+ pages without chaos.

### What Furnostyles Is

- A **content platform** with blog articles, portfolio projects, and service guides.
- A **service marketplace** where clients request quotes and book consultations.
- A **product marketplace** where vendors list furniture, decor, and furnishings.
- A **property platform** for real estate listings and Airbnb upgrade partnerships.
- A **digital ecosystem** that will eventually include mobile apps, AI recommendations, and SaaS possibilities.

### What Furnostyles Is Not (Yet)

- Not a custom-built backend with servers (uses Firebase + static hosting).
- Not a React/Vue/Angular single-page app (uses static HTML + JS).
- Not a social network (no public user profiles or feeds).
- Not a generic e-commerce clone (premium focus, curated vendors).

---

## 2. Brand Direction

### Brand Identity

| Element | Value |
|---------|-------|
| **Name** | Furnostyles |
| **Tagline** | *Premium Interior Design & Furniture* |
| **Tone** | Professional, warm, authoritative, aspirational |
| **Audience** | Homeowners, Airbnb hosts, property developers, interior design enthusiasts in Kenya and East Africa |
| **Differentiator** | Premium curation, local expertise, end-to-end service (design + products + properties) |

### Design Language

| Element | Specification |
|---------|---------------|
| **Layout** | Clean, spacious, grid-based |
| **Colours** | Defined in `style.css` design tokens (neutral base with warm accent) |
| **Typography** | Premium serif for headings, clean sans-serif for body |
| **Imagery** | High-quality photography, lifestyle shots, professional interiors |
| **Spacing** | Generous whitespace, consistent rhythm |
| **Animations** | Subtle, purposeful, 60fps, respects `prefers-reduced-motion` |

### Naming Conventions

| Prefix | Meaning | Example |
|--------|---------|---------|
| `fns-` | Furnostyles new/premium components | `.fns-btn`, `.fns-card` |
| `fld-` | Furnostyles legacy commerce components | `.fld-commerce-footer` |
| `premium-` | Layout and structural classes | `.premium-layout`, `.premium-header` |

---

## 3. Core Platform Goals

### Short-Term (Phase 1 — Current)

| # | Goal | Status |
|---|------|--------|
| 1 | Complete public-facing site with all core pages | In progress |
| 2 | Reusable layout system shared across all pages | In progress |
| 3 | Shared header/footer loaded dynamically | In progress |
| 4 | Centralized navigation data | In progress |
| 5 | Working contact and inquiry forms | In progress |
| 6 | SEO foundation (meta tags, sitemap, structured data) | In progress |
| 7 | Performance baseline (Lighthouse 90+) | In progress |
| 8 | Accessibility baseline (WCAG AA, axe zero errors) | In progress |

### Medium-Term (Phases 2-5)

| # | Goal | Timeline |
|---|------|----------|
| 1 | 500+ SEO-optimized content pages | Phase 2 |
| 2 | Advanced UX (sidebar, mega-nav, search, filters) | Phase 3 |
| 3 | Service request system (quotes, bookings, WhatsApp) | Phase 4 |
| 4 | Marketplace foundation (products, categories, vendors) | Phase 5 |

### Long-Term (Phases 6-10)

| # | Goal | Timeline |
|---|------|----------|
| 1 | Client/vendor/admin accounts and dashboards | Phase 6 |
| 2 | Full e-commerce (cart, checkout, M-Pesa, Paystack, Stripe) | Phase 7 |
| 3 | Real estate expansion (listings, property dashboards) | Phase 8 |
| 4 | Platform scaling (CDN, analytics, AI, automation) | Phase 9 |
| 5 | Future ecosystem (PWA, API, chat, SaaS) | Phase 10 |

---

## 4. Current Completed Systems

These architecture documents are complete and must be read before building the corresponding feature.

| Document | Purpose | Read Before |
|----------|---------|-------------|
| `docs/page-template-system.md` | HTML page structure, `<head>` requirements, layout grid | Building any new page |
| `docs/navigation-and-routing-system.md` | URL structure, navigation data, internal linking rules | Changing navigation or adding pages |
| `docs/forms-and-lead-system.md` | Form structure, validation rules, honeypot, spam prevention | Building or editing any form |
| `docs/performance-and-optimization-system.md` | CSS/JS optimization, image strategy, Core Web Vitals | Any performance-related change |
| `docs/security-and-project-safety.md` | 30-section safety guide covering editing, AI, deletion, shared components, layout, Firebase, auth, payments, deployment | Any major change |
| `docs/master-development-roadmap.md` | 10-phase development roadmap with goals, dependencies, risks | Planning any new feature |
| `docs/production-launch-checklist.md` | 25-section launch preparation system | Before any public launch |

### Completed Code Systems

| System | Status | Location |
|--------|--------|----------|
| `index.html` master template | Complete | `index.html` |
| Shared header | Complete | `shared/header.html` |
| Shared footer | Complete | `shared/footer.html` |
| Design tokens and shared CSS | Complete | `css/style.css` |
| Shared component loader | Complete | `js/main.js` |
| Navigation data store | Complete | `js/navigation-data.js` |
| Form validation engine | Complete | `js/form-validation.js` |
| Firebase config placeholder | Complete | `shared/firebase/firebase-config.js` |
| Firebase bridge placeholder | Complete | `shared/firebase/firebase-bridge.js` |
| Upload bridge | Complete | `shared/uploads/upload-bridge.js` |
| Upload bridge CSS | Complete | `shared/uploads/upload-bridge.css` |

---

## 5. Shared Reusable Systems

These systems are shared across all pages. Editing them affects the entire site.

### Shared HTML Components

| Component | File | Mount Point | Loaded By |
|-----------|------|-------------|-----------|
| Header | `shared/header.html` | `#fns-header-mount` | `main.js` |
| Footer | `shared/footer.html` | `#fld-footer-mount` | `main.js` |

### Shared CSS

| Layer | File | Contains |
|-------|------|----------|
| Design tokens | `style.css` (top) | Colours, typography, spacing, breakpoints |
| Layout | `style.css` | Grid system, header, footer, main content |
| Components | `style.css` | Buttons, cards, forms, navigation |
| Utilities | `style.css` (bottom) | Helper classes, text utilities |
| Upload bridge | `shared/uploads/upload-bridge.css` | Upload widget styles |

### Shared JavaScript

| File | Purpose | Scope |
|------|---------|-------|
| `main.js` | Header/footer loading, navigation, cart counter | Every page |
| `navigation-data.js` | Navigation link store | Every page |
| `form-validation.js` | Validation engine, spam checks | All form pages |
| `firebase-config.js` | Firebase configuration (placeholder) | Future: all pages |
| `firebase-bridge.js` | Firebase integration helpers (placeholder) | Future: all pages |
| `upload-bridge.js` | Upload widget functionality | Pages with uploads |

### Shared Assets

| Folder | Purpose |
|--------|---------|
| `assets/images/` | Site images, backgrounds, icons |
| `assets/favicon/` | Favicon and touch icons |
| `assets/fonts/` | Self-hosted web fonts |

---

## 6. Header / Footer Architecture

### Header Structure

The header is loaded dynamically from `shared/header.html` into `#fns-header-mount` on every page.

```html
<!-- In shared/header.html -->
<div class="premium-topbar">
  <!-- Top bar content: contact info, social links -->
</div>
<header class="premium-header">
  <a class="premium-brand" href="index.html">Furnostyles</a>
  <div class="fld-youtube-search">
    <input type="search" placeholder="Search...">
    <button>Search</button>
  </div>
  <div class="fld-icon-actions">
    <a href="cart.html">Cart</a>
    <a href="alerts.html">Alerts</a>
    <a href="account.html">Account</a>
  </div>
</header>
```

### Footer Structure

The footer is loaded dynamically from `shared/footer.html` into `#fld-footer-mount` on every page.

```html
<!-- In shared/footer.html -->
<footer class="fld-commerce-footer">
  <!-- Footer grid: About, Services, Contact, Social -->
  <p>&copy; 2026 Furnostyles. All rights reserved.</p>
</footer>
```

### Loading Mechanism

```javascript
// In js/main.js
async function loadSharedComponents() {
  const header = await fetch('shared/header.html').then(r => r.text());
  document.getElementById('fns-header-mount').innerHTML = header;

  const footer = await fetch('shared/footer.html').then(r => r.text());
  document.getElementById('fld-footer-mount').innerHTML = footer;
}
```

### Header/Footer Safety Rules

| Rule | Requirement |
|------|-------------|
| Never remove the mount points from any page. | Components have nowhere to render. |
| Never change a mount point ID without updating `main.js`. | Loader references the ID to inject content. |
| Never add blocking synchronous loading for shared components. | Always use `fetch()` asynchronously. |
| Test header/footer changes on every page type. | Header changes affect all pages. |
| Header/footer HTML lives in `shared/` only. | No inline header/footer code in pages. |

---

## 7. Future Sidebar Strategy

**Not to be built yet.** Document only.

### Sidebar Principles

| Principle | Implementation |
|-----------|--------------|
| **Opt-in only** | Only pages with `.premium-layout--with-sidebar` get a sidebar |
| **No squeezing** | Pages without sidebar must not change layout |
| **No JS dependency** | Sidebar must work with CSS-only fallbacks |
| **Mobile-first** | Sidebar hidden on mobile; drawer pattern instead |

### Sidebar Architecture

```html
<!-- Opt-in page only -->
<div class="premium-layout premium-layout--with-sidebar">
  <aside class="premium-sidebar">...</aside>
  <main class="premium-main">...</main>
</div>
```

| File | Purpose |
|------|---------|
| `css/sidebar.css` | Sidebar styles only; loaded conditionally |
| `js/sidebar.js` | Sidebar state (localStorage), accessibility |
| Shared data file | Sidebar content (not hardcoded per page) |

### Sidebar Safety Rules

| Rule | Requirement |
|------|-------------|
| Sidebar CSS is never loaded on pages without sidebar. | `css/sidebar.css` loaded conditionally. |
| Sidebar HTML is never added to pages that do not need it. | No empty `<aside>` tags. |
| Sidebar does not break layout of existing pages. | Existing pages must look identical after sidebar CSS exists. |
| Read `docs/future-sidebar-strategy.md` before implementing. | Full sidebar architecture documented there. |

---

## 8. Blog / Content Architecture

### Content Types

| Type | Template | Data Store | Example |
|------|----------|------------|---------|
| Blog article | Reusable article template | `js/article-data.js` | `/blogs/modern-living-room-ideas.html` |
| Service page | Service detail template | Static HTML | `/services/interior-design.html` |
| Portfolio project | Portfolio detail template | Static HTML | `/portfolio/karen-home-renovation.html` |
| Location page | Location landing template | Static HTML | `/locations/interior-design-nairobi.html` |
| Category index | Category listing template | Static HTML | `/blogs/index.html` |

### Article Data Store

```javascript
// js/article-data.js
const FurnostylesArticles = [
  {
    id: 'modern-living-room-ideas',
    title: 'Modern Living Room Ideas for Nairobi Homes',
    excerpt: '...',
    category: 'living-room',
    date: '2026-05-15',
    image: 'assets/images/blog/modern-living-room-800.webp',
    url: 'blogs/modern-living-room-ideas.html'
  }
];
```

### Content Scaling Strategy

| Action | How |
|--------|-----|
| Add new blog post | Create HTML from template; add to `article-data.js`; update sitemap |
| Add new service | Create HTML from template; add to navigation data; update sitemap |
| Add new portfolio | Create HTML from template; add images; update sitemap |
| Add new location | Create HTML from template; target local SEO keywords; update sitemap |

### Content Quality Standards

| Standard | Requirement |
|----------|-------------|
| Minimum article length | 800 words (cornerstone: 2000+) |
| Featured image size | 1200x630px for OG sharing |
| Internal links per article | At least 3 to related articles |
| Heading hierarchy | One `<h1>`, logical `<h2>`-`<h3>` progression |
| Meta description | Unique, 150-160 characters |

---

## 9. SEO Architecture

### On-Page SEO

Every page must include:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unique Page Title — Furnostyles</title>
  <meta name="description" content="Unique 150-160 character description">
  <link rel="canonical" href="https://furnostyles.com/page-url.html">
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Description">
  <meta property="og:image" content="https://furnostyles.com/assets/images/og-image.jpg">
  <meta property="og:url" content="https://furnostyles.com/page-url.html">
  <meta property="og:type" content="website">
</head>
```

### Technical SEO

| Element | Location | Requirement |
|---------|----------|-------------|
| `robots.txt` | Project root | Allows all public pages; points to sitemap |
| `sitemap.xml` | Project root | Lists all HTTPS URLs with accurate `lastmod` |
| Structured data | In page `<head>` or `<body>` | JSON-LD for Organization, LocalBusiness, Article |
| Semantic HTML | In every page | `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>` |
| Heading hierarchy | In every page | One `<h1>`, no skipped levels |
| Internal links | In content | Descriptive anchor text, minimum 3 per article |

### SEO Scaling

| Phase | SEO Activity |
|-------|--------------|
| Phase 1 | Foundation: meta tags, sitemap, semantic HTML |
| Phase 2 | Content expansion: 500+ pages, cornerstone articles, location SEO |
| Phase 3 | Advanced: breadcrumbs, structured data, internal linking architecture |
| Phase 4+ | Monitoring: Search Console, analytics, conversion tracking |

---

## 10. CSS Architecture

### Layered Architecture

| Layer | Location | Purpose | Scope |
|-------|----------|---------|-------|
| **Design tokens** | `style.css` (top) | Colours, fonts, spacing, breakpoints | Global |
| **Reset/normalize** | `style.css` | Cross-browser consistency | Global |
| **Layout** | `style.css` | Grid system, header, footer, main | Global |
| **Components** | `style.css` | Buttons, cards, forms, navigation | Global |
| **Utilities** | `style.css` (bottom) | Helper classes, text utilities | Global |
| **Feature CSS** | `css/blog.css`, `css/marketplace.css`, etc. | Page-type-specific styles only | Conditional |

### Naming Convention

| Prefix | Usage | Example |
|--------|-------|---------|
| `.premium-` | Layout and structural elements | `.premium-layout`, `.premium-main` |
| `.fns-` | Furnostyles components | `.fns-btn`, `.fns-card`, `.fns-form` |
| `.fld-` | Legacy commerce components | `.fld-commerce-footer` |

### CSS Safety Rules

| Rule | Requirement |
|------|-------------|
| Never add `!important` to shared component classes. | Makes overrides impossible. |
| Never increase specificity unnecessarily. | Prefer `.fns-card` over `.premium-layout .fns-card`. |
| Never remove a CSS class used in any HTML file. | Search the project first. |
| Never change a CSS variable value without checking all uses. | `--fns-accent` affects buttons, links, borders. |
| Feature CSS must not redefine shared components. | Override with modifiers, not duplicates. |
| Document new CSS variables in architecture docs. | Future editors need to know what exists. |

---

## 11. JS Architecture

### File Organization

| File | Purpose | Scope |
|------|---------|-------|
| `main.js` | Header/footer loading, navigation, cart counter, shared utilities | Every page |
| `navigation-data.js` | Navigation link store | Every page |
| `article-data.js` | Blog article metadata | Blog pages |
| `article-utils.js` | Related articles, search, listing render | Blog pages |
| `form-validation.js` | Validation engine, spam checks | All form pages |
| `firebase-bridge.js` | Firebase integration helpers | Future: all pages |
| `search.js` | Client-side search | Pages with search |
| `filters.js` | Content filtering | Pages with filters |

### Namespace Convention

All global functions and objects are namespaced under `Furnostyles.*` to prevent collisions.

```javascript
// Good
Furnostyles.loadComponent = function() { ... };
Furnostyles.validateForm = function() { ... };

// Bad (pollutes global scope)
function loadComponent() { ... }
```

### JS Safety Rules

| Rule | Requirement |
|------|-------------|
| Read the full function before editing. | Understand inputs, outputs, side effects. |
| Adding a new global function? Namespace under `Furnostyles.*`. | Prevents naming collisions. |
| Modifying a shared function? Check all call sites first. | `loadComponent()` is called on every page. |
| Never delete a function without confirming no callers. | Search for the function name across the project. |
| Always handle errors in async functions. | Unhandled rejections break shared components. |
| Never add global event listeners without cleanup. | Memory leaks accumulate. |
| Feature JS must not redefine shared utilities. | Use shared utilities, do not duplicate. |

---

## 12. Media Architecture

### Image Strategy

| Aspect | Requirement |
|--------|-------------|
| Format | WebP primary, JPEG/PNG fallback |
| Optimization | Compress, resize, convert before upload |
| Responsive | `srcset` for multiple sizes |
| Lazy loading | `loading="lazy"` for below-the-fold images |
| Dimensions | `width` and `height` attributes on every image |
| File naming | Descriptive, hyphenated: `karen-home-living-room-800.webp` |
| Hero images | Max 500KB |
| Thumbnails | Max 200KB |
| Total page payload | < 1.5MB mobile, < 2MB desktop |

### Video Strategy

| Aspect | Requirement |
|--------|-------------|
| Hosting | YouTube/Vimeo embed (not self-hosted) |
| Thumbnail | Custom thumbnail image |
| Lazy loading | Load iframe only when in viewport |
| Accessibility | Captions, transcript link |

### Asset Folder Structure

```
assets/
  images/
    blog/           # Blog article images
    portfolio/      # Portfolio project images
    products/       # Product images (future)
    properties/       # Property images (future)
    backgrounds/    # Site background images
    icons/          # SVG icons
  favicon/
  fonts/
  README.md         # Asset inventory and licenses
```

### Media Safety Rules

| Rule | Requirement |
|------|-------------|
| All images optimized before upload. | Compress, resize, convert to WebP. |
| All images have descriptive, hyphenated file names. | No `IMG_1234.jpg`. |
| Never delete an image referenced in any HTML, CSS, or OG meta tag. | Search for filename across the project. |
| Keep source files outside the project folder. | RAW, PSD, Figma files do not belong in deployment. |
| Maintain an `assets/README.md` inventory. | Lists what was created, by whom, and why. |
| Do not use copyrighted images without license. | Use original photography, licensed stock, or royalty-free. |
| SVG icons optimized before inclusion. | SVGO removes unnecessary metadata. |
| Font files licensed for web use. | Self-hosted fonts require proper licensing. |

---

## 13. Navigation Architecture

### Navigation Data Store

All navigation links are stored in `js/navigation-data.js` and rendered dynamically.

```javascript
// js/navigation-data.js
const FurnostylesNavigation = {
  primary: [
    { label: 'Home', url: 'index.html' },
    { label: 'Services', url: 'services/index.html' },
    { label: 'Portfolio', url: 'portfolio/index.html' },
    { label: 'Blog', url: 'blogs/index.html' },
    { label: 'Contact', url: 'contact.html' }
  ],
  services: [
    { label: 'Interior Design', url: 'services/interior-design.html' },
    { label: 'Repairs', url: 'repairs/index.html' }
  ]
};
```

### URL Structure

| Section | URL Pattern | Example |
|---------|-------------|---------|
| Homepage | `index.html` | `/index.html` |
| Services | `services/[service-name].html` | `/services/interior-design.html` |
| Repairs | `repairs/[repair-name].html` | `/repairs/furniture-repair.html` |
| Portfolio | `portfolio/[project-name].html` | `/portfolio/karen-home-renovation.html` |
| Blog | `blogs/[article-slug].html` | `/blogs/modern-living-room-ideas.html` |
| Blog index | `blogs/index.html` | `/blogs/index.html` |
| Contact | `contact.html` | `/contact.html` |
| Marketplace (future) | `marketplace/[page].html` | `/marketplace/index.html` |

### Navigation Safety Rules

| Rule | Requirement |
|------|-------------|
| Every new page must be added to `navigation-data.js`. | Invisible pages do not exist for users. |
| Every page must be linked from at least one other page. | Orphan pages confuse users and search engines. |
| All internal links use relative paths. | `services/interior-design.html` not full domain URLs. |
| Never rename a page without updating all references. | Search and replace across all files. |
| Test navigation after any navigation data change. | Verify all links work. |

---

## 14. Form / Lead Architecture

### Form System Overview

All forms use a centralized validation engine with spam prevention built in.

| Component | File | Purpose |
|-----------|------|---------|
| Validation engine | `js/form-validation.js` | Field validation, honeypot, time check, rate limit |
| Form handler | `js/form-handler.js` | Submission logic, Firebase write, WhatsApp integration |
| Form styles | `style.css` `.fns-form*` | Consistent form styling |

### Spam Prevention Layers

| Layer | Implementation | Effectiveness |
|-------|--------------|-------------|
| **Honeypot field** | Hidden input bots fill but humans ignore | Catches simple bots |
| **Time-based check** | Reject submissions under 3 seconds | Catches instant bots |
| **Rate limiting** | Max 3 submissions per `sessionStorage` | Prevents repeated abuse |
| **Simple math challenge** | "What is 3 + 5?" on high-traffic forms | Catches sophisticated bots |
| **reCAPTCHA v3** (future) | Invisible scoring | Only if honeypot fails |
| **Firebase App Check** (future) | Device attestation | Validates legitimate app instances |

### Form Types

| Form | Fields | Destination |
|------|--------|-------------|
| Contact form | Name, email, phone, message, subject | Firestore `leads` collection (future) |
| Quote request | Name, email, phone, service, budget, timeline | Firestore `leads` collection (future) |
| Booking form | Name, email, phone, date, time, service | Firestore `leads` collection (future) |
| Vendor application | Business name, email, phone, description, products | Firestore `vendor-applications` (future) |

### Form Safety Rules

| Rule | Requirement |
|------|-------------|
| All forms use client-side validation. | Immediate feedback, prevents obvious spam. |
| All form data sanitized before storage or transmission. | Strip HTML tags, trim whitespace. |
| Honeypot fields present on every form. | Catches simple bots without CAPTCHA friction. |
| Time-based spam checks prevent rapid submissions. | Reject forms submitted in under 3 seconds. |
| Rate limiting (client-side) prevents abuse. | Max 3 submissions per session. |
| When Firebase is integrated, Firestore security rules validate all writes. | Client-side validation is not enough. |
| HTTPS is required for all form submissions. | Prevents man-in-the-middle attacks. |

---

## 15. Future Marketplace Architecture

**Not to be built yet.** Document only.

### Marketplace Structure

| Page | URL | Purpose |
|------|-----|---------|
| Marketplace homepage | `marketplace/index.html` | Featured products, categories, search |
| Category page | `marketplace/categories/[category].html` | Product listings per category |
| Product detail | `marketplace/products/[product-slug].html` | Gallery, specs, vendor info, CTA |
| Vendor sourcing | `marketplace/sell-with-us.html` | Information for potential vendors |

### Marketplace Data Model (Future)

```javascript
// Firestore collection: products
{
  id: 'product-slug',
  name: 'Modern Velvet Sofa',
  category: 'furniture',
  subcategory: 'sofas',
  price: 45000,
  currency: 'KES',
  vendorId: 'vendor-id',
  images: ['url1.webp', 'url2.webp'],
  description: '...',
  specs: { dimensions: '...', material: '...' },
  status: 'active',
  createdAt: timestamp
}
```

### Marketplace Safety Rules

| Rule | Requirement |
|------|-------------|
| Marketplace CSS loaded only on marketplace pages. | `css/marketplace.css` conditionally loaded. |
| Marketplace JS loaded only on marketplace pages. | `js/marketplace.js` conditionally loaded. |
| Shared components (header/footer) remain unchanged. | Marketplace uses same shared components. |
| Product data validated before storage. | Strict Firestore schema. |
| Vendor applications approved before public visibility. | Admin moderation workflow. |

---

## 16. Future Dashboard / Account Architecture

**Not to be built yet.** Document only.

### Account Types

| Type | Role | Dashboard |
|------|------|-----------|
| **Client** | Browse, inquire, purchase, save favourites | Client dashboard |
| **Vendor** | List products, manage orders, view analytics | Vendor dashboard |
| **Admin** | Manage users, approve vendors, moderate content, view all analytics | Admin dashboard |
| **Property Agent** | List properties, manage inquiries | Agent dashboard (future) |

### Authentication Strategy

| Aspect | Implementation |
|--------|--------------|
| **Provider** | Firebase Authentication |
| **Methods** | Email/password, Google sign-in (future) |
| **Security** | Password complexity, email verification, MFA for admins |
| **Session** | 24-hour expiration, secure cookies |
| **Roles** | Stored in Firestore, enforced by security rules |

### Dashboard Architecture

| Element | Location |
|---------|----------|
| Dashboard layout | `css/dashboard.css` |
| Dashboard navigation | Shared sidebar component |
| Dashboard widgets | Modular, lazy-loaded |
| Data fetching | Firebase SDK with real-time listeners |

---

## 17. Firebase Future Integration Points

**Not to be built yet.** Document only.

### Firebase Services Used

| Service | Purpose | Phase |
|---------|---------|-------|
| **Firebase Authentication** | User accounts (client, vendor, admin) | Phase 6 |
| **Cloud Firestore** | Product data, user data, orders, leads, inquiries | Phase 4+ |
| **Firebase Cloud Functions** | Payment processing, email notifications, server-side validation | Phase 4+ |
| **Firebase Analytics** | App usage tracking | Phase 9 |
| **Firebase Hosting** | Only if Cloudflare Pages is insufficient | Future |

### Firebase Configuration

```javascript
// shared/firebase/firebase-config.js
const firebaseConfig = {
  apiKey: "public-api-key",
  authDomain: "furnostyles.firebaseapp.com",
  projectId: "furnostyles",
  storageBucket: "furnostyles.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
// Note: This file contains ONLY public API keys.
// Service account keys and private credentials NEVER go here.
```

### Firebase Safety Rules

| Rule | Requirement |
|------|-------------|
| `firebase-config.js` must never contain private keys or passwords. | API keys are public; service account keys are private. |
| Firestore security rules must be written and tested before any collection is created. | Open rules allow anyone to read/write your database. |
| All form data is sanitized before Firestore write. | Strip HTML tags, trim strings, validate types. |
| Authentication state is checked before sensitive reads/writes. | Unauthenticated users must not access private data. |
| Cloud Functions validate all input parameters. | Never trust client-side validation alone. |

---

## 18. Cloudflare Pages Deployment Strategy

### Deployment Architecture

| Element | Configuration |
|---------|---------------|
| **Hosting** | Cloudflare Pages (static site hosting) |
| **CDN** | Cloudflare global CDN (automatic) |
| **SSL** | Cloudflare automatic SSL (Let's Encrypt) |
| **DNS** | Cloudflare DNS (recommended) |
| **Headers** | `_headers` file for cache control and security headers |
| **Redirects** | `_redirects` file for URL redirects |

### Deployment Workflow

```
1. Verify all changes saved in IDE.
2. Run local preview (open index.html in browser).
3. Check browser console for errors.
4. Navigate to every page type.
5. Test responsive behaviour.
6. Run Lighthouse audit (performance >= 90, accessibility = 100).
7. Verify internal links work.
8. Verify external links open correctly.
9. Verify images load.
10. Verify forms validate correctly.
11. Deploy to Cloudflare Pages.
12. Verify live site loads correctly.
13. Check live site on a mobile device.
```

### Deployment Safety Rules

| Rule | Requirement |
|------|-------------|
| Never deploy during peak traffic hours. | Deploy during low-traffic periods. |
| Never deploy on Friday evening. | If something breaks, the team may not be available. |
| Always have a rollback plan. | Know the last working deploy ID or snapshot location. |
| Test the preview URL before marking deploy as production. | Cloudflare Pages generates a preview URL for every commit. |
| Verify `_headers` and `_redirects` are correct before deploying. | Wrong headers break caching; wrong redirects break URLs. |
| Do not delete old deploys immediately. | Keep the last 5 deploys for rollback. |
| Monitor the live site for 30 minutes after deployment. | Catch issues before users report them. |

---

## 19. Security and Project Safety Principles

### Core Safety Pillars

| Pillar | Principle |
|--------|-----------|
| **Read before editing** | Understand existing architecture before changing anything. |
| **Centralize before duplicating** | Reuse existing patterns rather than rewriting them. |
| **Edit minimally** | Change the smallest amount of code that achieves the goal. |
| **Test before declaring done** | Verify in a browser before considering complete. |

### Forbidden Actions

| Action | Why Forbidden |
|--------|---------------|
| Delete `style.css`, `main.js`, or shared component files | Foundation of the entire site |
| Delete a file referenced in 5+ other files | Ripple effect is unpredictable |
| Change all class names at once | Breaks every reference across every page |
| Add a sidebar to every page | Violates "no sidebar yet" rule; untested |
| Move all files into new folders | Breaks every relative path |
| Delete files you "think" are unused | AI cannot reliably detect all references |
| Convert everything to a single-page app | Destroys static hosting and SEO |
| Add React/Vue/Angular | Massive bundle, unnecessary for static site |
| Add a backend/API server | Violates static hosting architecture |
| Restructure the navigation | Breaks internal links and breadcrumbs |

### AI Editing Rules

| Rule | Requirement |
|------|-------------|
| AI must read the full file before editing. | No edits based on assumptions. |
| AI must preserve all existing CSS classes unless told to rename. | Accidental deletion breaks styling. |
| AI must preserve all existing `id` attributes. | IDs are used for labels, ARIA, and JS hooks. |
| AI must not add inline styles to structural elements. | Breaks design token consistency. |
| AI must not add new global CSS variables without documenting them. | Variables affect the entire site. |
| AI must not remove accessibility attributes. | Accessibility is non-negotiable. |
| AI must not change `<h1>` tags or heading hierarchy without instruction. | SEO and screen reader structure depends on headings. |
| AI must verify all HTML tags are properly closed after editing. | Unclosed tags break rendering. |
| AI must not duplicate existing code. | Search for existing patterns first. |

---

## 20. Performance Strategy

### Performance Budgets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance (mobile) | >= 90 | Chrome DevTools |
| Lighthouse Accessibility | = 100 | Chrome DevTools |
| Largest Contentful Paint (LCP) | < 2.5s | PageSpeed Insights |
| Cumulative Layout Shift (CLS) | < 0.1 | PageSpeed Insights |
| Total page weight (mobile) | < 1.5MB | Chrome DevTools |
| Total page weight (desktop) | < 2MB | Chrome DevTools |
| Time to First Byte (TTFB) | < 600ms | WebPageTest |

### Optimization Strategies

| Strategy | Implementation |
|----------|--------------|
| **CSS optimization** | Minified, unused rules removed, critical CSS inlined |
| **JS optimization** | Minified, deferred loading, tree-shaking where possible |
| **Image optimization** | WebP format, responsive srcset, lazy loading, compression |
| **Font optimization** | Self-hosted, `font-display: swap`, subsetting |
| **Lazy loading** | Images below the fold, non-critical JS, feature CSS |
| **CDN caching** | Cloudflare edge caching, long cache headers for static assets |
| **Code splitting** | Feature JS/CSS loaded only where needed |

### Performance Monitoring

| Frequency | Action |
|-----------|--------|
| Before every deployment | Lighthouse audit on all major page types |
| Monthly | Review Core Web Vitals in Google Search Console |
| Quarterly | Full performance audit; identify and fix regressions |
| After major changes | Lighthouse audit on affected page types |

---

## 21. Governance Rules

These rules govern how the project is maintained, expanded, and protected from chaos.

### Decision-Making Authority

| Decision | Authority |
|----------|-----------|
| Add a new page | Developer (following template) |
| Change shared CSS/JS | Senior developer + peer review |
| Change layout system | Architecture review required |
| Add a new feature | Read roadmap; check phase requirements |
| Deploy to production | Developer + verification checklist |
| Skip a roadmap phase | Not allowed without architecture review |
| Add a new third-party service | Security and performance review |

### Documentation Requirements

| Trigger | Documentation Required |
|---------|--------------------------|
| New feature added | Update relevant architecture doc |
| Shared component changed | Update component documentation |
| New CSS variable added | Document in `style.css` and architecture doc |
| New page type created | Add to page-template-system.md |
| Phase completed | Update project README with current phase |
| Major bug fixed | Document root cause and fix in incident log |

### Code Quality Standards

| Standard | Requirement |
|----------|-------------|
| Self-documenting code | Clear class names, descriptive file names, logical structure |
| No dead code | Remove unused CSS, JS, and HTML promptly |
| No orphaned files | If a file is not referenced, delete it or document why it exists |
| README files | Every major folder has a README explaining its purpose |
| Change log | Document major changes, who made them, and why |
| Peer review | Major changes require a second pair of eyes |
| Regular audits | Quarterly review of unused CSS, broken links, outdated content |

---

## 22. AI-Safe Editing Workflow

This workflow ensures AI-assisted development is safe and does not break the platform.

### Before Asking AI to Edit

| Step | Action |
|------|--------|
| 1 | Open the file and verify its current state. |
| 2 | Reference exact file path and line numbers. |
| 3 | State whether the file is shared or page-specific. |
| 4 | Mention constraints: "Do not touch the layout grid." |
| 5 | Reference the relevant architecture document. |

### AI Danger Zone

| Dangerous Request | Why It Is Dangerous |
|-------------------|---------------------|
| "Rewrite the entire CSS file" | Loses design tokens, breaks every page. |
| "Refactor all JavaScript" | Breaks event listeners and shared components. |
| "Change all class names" | Breaks every reference across every page. |
| "Add a sidebar to every page" | Violates "no sidebar yet" rule. |
| "Move all files into new folders" | Breaks every relative path in every HTML file. |
| "Delete files you think are unused" | AI cannot reliably detect all references. |
| "Convert everything to a single-page app" | Destroys static hosting and SEO. |
| "Add React/Vue/Angular" | Massive bundle, unnecessary for static site. |
| "Add a backend/API server" | Violates static hosting architecture. |
| "Restructure the navigation" | Breaks internal links and breadcrumbs. |

### Safe AI Editing Checklist

- [ ] AI has read the full file before editing.
- [ ] AI has read the relevant architecture document.
- [ ] The request is specific and scoped (not "make it better").
- [ ] The file is backed up or a snapshot exists.
- [ ] The change is tested on a preview URL before production.
- [ ] The change does not affect shared components (or they are tested).

---

## 23. Folder Structure Overview

```
furnostyles-clean-rebuild/
|
|-- index.html                    # Homepage (master template)
|
|-- css/
|   |-- style.css                 # Shared CSS: tokens, layout, components, utilities
|   |-- blog.css                  # Blog-specific styles (future)
|   |-- marketplace.css           # Marketplace-specific styles (future)
|   |-- dashboard.css             # Dashboard-specific styles (future)
|   |-- property.css              # Property-specific styles (future)
|   |-- sidebar.css               # Sidebar-specific styles (future)
|
|-- js/
|   |-- main.js                   # Shared component loader, navigation, utilities
|   |-- navigation-data.js        # Centralized navigation links
|   |-- article-data.js           # Blog article metadata
|   |-- article-utils.js          # Blog listing, search, related articles
|   |-- form-validation.js        # Form validation and spam prevention
|   |-- form-handler.js           # Form submission logic (future)
|   |-- search.js                 # Client-side search (future)
|   |-- filters.js                # Content filtering (future)
|   |-- cart.js                   # Shopping cart (future)
|   |-- checkout.js               # Checkout flow (future)
|   |-- auth.js                   # Authentication logic (future)
|   |-- analytics.js              # Analytics tracking (future)
|   |-- notifications.js          # Notification system (future)
|   |-- chat.js                   # Real-time chat (future)
|   |-- property-search.js        # Property search (future)
|   |-- property-filters.js       # Property filters (future)
|
|-- shared/
|   |-- header.html               # Shared header component
|   |-- footer.html               # Shared footer component
|   |-- firebase/
|   |   |-- firebase-config.js     # Firebase configuration (public keys only)
|   |   |-- firebase-bridge.js    # Firebase integration helpers
|   |-- uploads/
|   |   |-- upload-bridge.css     # Upload widget styles
|   |   |-- upload-bridge.js      # Upload widget functionality
|
|-- assets/
|   |-- images/
|   |   |-- blog/                 # Blog article images
|   |   |-- portfolio/            # Portfolio project images
|   |   |-- products/             # Product images (future)
|   |   |-- properties/           # Property images (future)
|   |   |-- backgrounds/          # Site background images
|   |   |-- icons/                # SVG icons
|   |-- favicon/                  # Favicon and touch icons
|   |-- fonts/                    # Self-hosted web fonts
|   |-- README.md                 # Asset inventory and licenses
|
|-- services/                     # Service pages
|   |-- index.html
|   |-- interior-design.html
|   |-- [other-services].html
|
|-- repairs/                      # Repair service pages
|   |-- index.html
|   |-- [repair-pages].html
|
|-- portfolio/                    # Portfolio project pages
|   |-- index.html
|   |-- [project-pages].html
|
|-- blogs/                        # Blog articles
|   |-- index.html
|   |-- [article-pages].html
|
|-- marketplace/                  # Marketplace pages (future)
|   |-- index.html
|   |-- categories/
|   |-- products/
|   |-- sell-with-us.html
|
|-- contact.html                  # Contact page
|
|-- docs/                         # Architecture documents
|   |-- page-template-system.md
|   |-- navigation-and-routing-system.md
|   |-- forms-and-lead-system.md
|   |-- performance-and-optimization-system.md
|   |-- security-and-project-safety.md
|   |-- master-development-roadmap.md
|   |-- production-launch-checklist.md
|   |-- platform-architecture-summary.md    # This document
|   |-- future-sidebar-strategy.md          # Sidebar architecture (future)
|   |-- brand-guidelines.md                 # Brand guidelines (future)
|
|-- _headers                      # Cloudflare Pages headers
|-- _redirects                    # Cloudflare Pages redirects
|-- robots.txt                    # Search engine crawling rules
|-- sitemap.xml                   # XML sitemap
|-- README.md                     # Project overview and current phase
```

### Folder Rules

| Rule | Requirement |
|------|-------------|
| `css/` contains only stylesheets. | No JS, no images, no HTML. |
| `js/` contains only JavaScript. | No CSS, no images, no HTML. |
| `assets/` contains only static assets. | No code, no docs. |
| `shared/` contains only reusable components. | No page-specific content. |
| `docs/` contains only documentation. | No code, no assets. |
| Page folders (`services/`, `blogs/`, etc.) contain only HTML. | Shared assets live in `css/`, `js/`, `assets/`. |

---

## 24. Recommended Future Development Order

This is the safe order for building the platform. Never skip a phase.

| Phase | Name | Key Deliverables | Prerequisites |
|-------|------|------------------|---------------|
| **1** | Brand Foundation | Homepage, services, repairs, portfolio, blog, contact, layout system | None (current) |
| **2** | SEO & Content Expansion | 500+ pages, cornerstone articles, location SEO, structured data | Phase 1 stable |
| **3** | Advanced UX | Sidebar, mega-nav, search, filters, animations, accessibility | Phase 2 stable |
| **4** | Service Request System | Quotes, bookings, inquiry tracking, WhatsApp, Firebase leads | Phase 3 stable |
| **5** | Marketplace Foundation | Product listings, categories, product detail pages, vendor sourcing | Phase 4 stable |
| **6** | Accounts & Dashboards | Client/vendor/admin accounts, profiles, dashboards, notifications | Phase 5 stable |
| **7** | Payments & Commerce | Cart, checkout, M-Pesa, Paystack, Stripe, order tracking | Phase 6 stable |
| **8** | Real Estate Expansion | Property listings, property dashboards, Airbnb partnership | Phase 7 stable |
| **9** | Platform Scaling | CDN, analytics, AI, automation, A/B testing | Phase 8 stable |
| **10** | Future Ecosystem | PWA, API, chat, SaaS, international expansion | Phase 9 stable |

### Phase Dependency Rules

| Rule | Requirement |
|------|-------------|
| Never skip a phase. | Each phase builds on the previous one. |
| Never build Phase N+1 before Phase N is stable. | Unstable foundations create exponential problems. |
| Document the current phase in the project README. | Everyone knows what phase the project is in. |
| Do not add features from future phases to the current phase. | Resist scope creep. |
| When moving to a new phase, update all architecture documents. | Future-phase features need new documentation. |
| When moving to a new phase, re-test the entire site. | New integrations may break existing features. |

---

## 25. Current Known Limitations

These limitations are intentional at the current phase. They will be addressed in future phases.

### Technical Limitations

| Limitation | Reason | Addressed In |
|------------|--------|--------------|
| No backend server | Static hosting on Cloudflare Pages | Firebase Cloud Functions (Phase 4+) |
| No user accounts | Authentication not yet implemented | Firebase Auth (Phase 6) |
| No real-time data | No database connected | Firestore (Phase 4+) |
| No search index | Client-side search only | Server-side search (Phase 9) |
| No payment processing | No commerce backend | M-Pesa/Paystack/Stripe (Phase 7) |
| No email automation | No email service connected | SendGrid/Mailgun (Phase 4+) |
| No analytics tracking | No analytics code deployed | GA4/Firebase Analytics (Phase 9) |

### Feature Limitations

| Limitation | Reason | Addressed In |
|------------|--------|--------------|
| No sidebar | Future Phase 3 feature | Advanced UX (Phase 3) |
| No marketplace | Future Phase 5 feature | Marketplace Foundation (Phase 5) |
| No vendor system | Requires accounts and marketplace | Accounts & Dashboards (Phase 6) |
| No property listings | Future Phase 8 feature | Real Estate Expansion (Phase 8) |
| No mobile app | Future Phase 10 feature | Future Ecosystem (Phase 10) |
| No AI recommendations | Future Phase 9 feature | Platform Scaling (Phase 9) |

### Content Limitations

| Limitation | Reason | Addressed In |
|------------|--------|--------------|
| Limited blog articles | Content still being produced | SEO & Content Expansion (Phase 2) |
| Limited portfolio projects | Projects still being documented | SEO & Content Expansion (Phase 2) |
| No location-specific pages | Local SEO not yet started | SEO & Content Expansion (Phase 2) |
| No cornerstone articles | Long-form content not yet produced | SEO & Content Expansion (Phase 2) |

---

## 26. Recommended Next Immediate Development Phase

### Current Status: Phase 1 — Brand Foundation (In Progress)

The immediate next phase is completing **Phase 1: Brand Foundation**. All core public pages must be built, tested, and stable before any other work begins.

### Phase 1 Completion Checklist

- [ ] `index.html` homepage is complete with hero, services preview, portfolio preview, blog preview, and CTA.
- [ ] `services/index.html` and all individual service pages are complete.
- [ ] `repairs/index.html` and all individual repair pages are complete.
- [ ] `portfolio/index.html` and all project detail pages are complete.
- [ ] `blogs/index.html` and all article pages are complete.
- [ ] `contact.html` is complete with a fully functional contact form.
- [ ] `shared/header.html` loads correctly on every page.
- [ ] `shared/footer.html` loads correctly on every page.
- [ ] `js/navigation-data.js` contains all current pages.
- [ ] `css/style.css` contains all design tokens, layout styles, and component styles.
- [ ] `js/main.js` loads shared components and handles navigation correctly.
- [ ] `js/form-validation.js` validates all forms and prevents spam.
- [ ] All pages pass Lighthouse performance >= 90 on mobile.
- [ ] All pages pass Lighthouse accessibility = 100.
- [ ] All pages have unique meta titles and descriptions.
- [ ] `sitemap.xml` lists all current pages.
- [ ] `robots.txt` allows all public pages.
- [ ] Internal links are working on all pages.
- [ ] Images are optimized and loading correctly.
- [ ] Mobile menu works on all pages.
- [ ] No console errors on any page.
- [ ] No placeholder text on any public page.

### After Phase 1 Is Complete

Once all items above are checked, the next phase is **Phase 2: SEO & Content Expansion**.

Read `docs/master-development-roadmap.md` for full Phase 2 details.

### What Not to Do Yet

| Do Not Do | Why |
|-----------|-----|
| Build the sidebar | Phase 3 feature; not yet needed |
| Build the marketplace | Phase 5 feature; requires Firebase and accounts |
| Build user accounts | Phase 6 feature; requires Firebase Auth |
| Add payment processing | Phase 7 feature; requires marketplace and accounts |
| Add property listings | Phase 8 feature; requires marketplace infrastructure |
| Add AI recommendations | Phase 9 feature; requires data and analytics |
| Add a mobile app | Phase 10 feature; requires full platform |
| Restructure the project | Phase 1 must be stable first |
| Add new frameworks or libraries | Keep the stack simple during foundation |

---

## Document Summary

| # | Section | Purpose |
|---|---------|---------|
| 1 | Project vision | What Furnostyles is and is not. |
| 2 | Brand direction | Identity, design language, naming conventions. |
| 3 | Core platform goals | Short-term, medium-term, and long-term goals by phase. |
| 4 | Current completed systems | Architecture documents and code systems that exist now. |
| 5 | Shared reusable systems | Header, footer, CSS layers, JS files, assets. |
| 6 | Header/footer architecture | Dynamic loading mechanism and safety rules. |
| 7 | Future sidebar strategy | Opt-in, no squeezing, CSS-only fallback, mobile drawer. |
| 8 | Blog/content architecture | Content types, data store, scaling strategy, quality standards. |
| 9 | SEO architecture | On-page, technical, and scaling SEO strategy. |
| 10 | CSS architecture | 5-layer system, naming conventions, safety rules. |
| 11 | JS architecture | File organization, namespace convention, safety rules. |
| 12 | Media architecture | Image strategy, video strategy, folder structure, safety rules. |
| 13 | Navigation architecture | Data store, URL structure, safety rules. |
| 14 | Form/lead architecture | Validation engine, spam prevention, form types, safety rules. |
| 15 | Future marketplace architecture | Structure, data model, safety rules. |
| 16 | Future dashboard/account architecture | Account types, auth strategy, dashboard architecture. |
| 17 | Firebase future integration points | Services, configuration, safety rules. |
| 18 | Cloudflare Pages deployment strategy | Deployment workflow, safety rules. |
| 19 | Security and project safety principles | Four pillars, forbidden actions, AI editing rules. |
| 20 | Performance strategy | Budgets, optimization strategies, monitoring schedule. |
| 21 | Governance rules | Decision-making authority, documentation requirements, code quality. |
| 22 | AI-safe editing workflow | Pre-edit steps, danger zone, safe editing checklist. |
| 23 | Folder structure overview | Complete folder tree with rules. |
| 24 | Recommended future development order | 10-phase roadmap with dependency rules. |
| 25 | Current known limitations | Technical, feature, and content limitations by phase. |
| 26 | Recommended next immediate development phase | Phase 1 completion checklist and what not to do yet. |

**This document must be read before any code change, feature addition, or AI-assisted edit to the Furnostyles platform.**
