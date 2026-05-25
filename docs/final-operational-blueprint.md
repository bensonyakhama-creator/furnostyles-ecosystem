# Furnostyles Final Operational Blueprint

**Document Type:** Master Operational Reference | **Date:** 2026-05-22 | **Version:** 1.0 | **Phase:** 1 — Brand Foundation

---

## How to Use This Document

This is the ultimate master operational reference for Furnostyles. Read this first before any development, architecture decision, deployment, or AI-assisted edit.

---

## 1. Executive Platform Vision

Furnostyles is a premium Kenyan interior design, furniture, and real estate platform built to scale to 500+ pages without architectural chaos.

> **Vision:** Become Kenya's most trusted premium platform for interior design inspiration, services, furniture sourcing, and property solutions.

| Attribute | Value |
|-----------|-------|
| **Name** | Furnostyles |
| **Tagline** | Premium Interior Design & Furniture |
| **Tone** | Professional, warm, authoritative, aspirational |
| **Audience** | Homeowners, Airbnb hosts, property developers, design enthusiasts |
| **Differentiator** | Premium curation, local expertise, end-to-end service |

### What Furnostyles Is

- Content platform (blog, portfolio, service guides)
- Service marketplace (quotes, bookings, consultations)
- Product marketplace (furniture, decor, furnishings)
- Property platform (listings, Airbnb partnerships)
- Future digital ecosystem (mobile, AI, SaaS)

### What Furnostyles Is Not (Yet)

- Not a custom backend (uses Firebase + static hosting)
- Not a React/Vue/Angular SPA (uses static HTML + JS)
- Not a social network
- Not a generic e-commerce clone

---

## 2. Brand Identity Principles

| Element | Specification |
|---------|---------------|
| **Layout** | Clean, spacious, grid-based |
| **Colours** | Design tokens in `style.css` (neutral base, warm accent) |
| **Typography** | Premium serif headings, clean sans-serif body |
| **Imagery** | High-quality photography, lifestyle shots |
| **Animations** | Subtle, 60fps, respects `prefers-reduced-motion` |

### Naming Conventions

| Prefix | Meaning | Example |
|--------|---------|---------|
| `fns-` | Furnostyles components | `.fns-btn`, `.fns-card` |
| `fld-` | Legacy commerce | `.fld-commerce-footer` |
| `premium-` | Structural elements | `.premium-layout`, `.premium-header` |

### Brand Rules

- No inline styles on `.premium-topbar`, `.premium-header`, `.premium-brand`
- All buttons properly closed
- Copyright as `&copy;` entity
- Consistent professional tone across all content

---

## 3. Core Architecture Philosophy

### The Four Pillars

| Pillar | Principle |
|--------|-----------|
| **Read** | Understand architecture before changing anything |
| **Centralize** | Reuse patterns rather than rewriting them |
| **Minimize** | Change the smallest amount of code needed |
| **Verify** | Test in browser before declaring done |

### Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Static HTML, not SPA | Cloudflare Pages compatibility, SEO, speed, simplicity |
| Shared components via `fetch()` | One source of truth; no duplication |
| Centralized navigation data | One link store; automatic updates |
| Layered CSS | Design tokens first; layout second; components third; utilities last |
| Namespaced JS (`Furnostyles.*`) | Prevents global collisions |
| Conditional feature loading | Feature CSS/JS loaded only where needed |
| Firebase for backend (future) | Managed service; no custom servers |
| Cloudflare Pages for hosting | Global CDN, automatic SSL, zero server maintenance |

### Forbidden Patterns

| Pattern | Why Forbidden |
|---------|---------------|
| React/Vue/Angular for static content | Unnecessary bundle; kills SEO |
| Custom backend server | Adds complexity without benefit |
| Single-page app architecture | Breaks static hosting; destroys SEO |
| Multiple CSS frameworks | Conflicting styles; specificity wars |
| Inline styles on structural elements | Inconsistent layout; unmaintainable |
| Hardcoded navigation in page HTML | Adding a page requires editing every file |

---

## 4. Shared Reusable Systems Overview

### Shared HTML Components

| Component | File | Mount Point | Loaded By |
|-----------|------|-------------|-----------|
| Header | `shared/header.html` | `#fns-header-mount` | `main.js` via `fetch()` |
| Footer | `shared/footer.html` | `#fld-footer-mount` | `main.js` via `fetch()` |

### Shared CSS Layers

| Layer | File | Contains | Scope |
|-------|------|----------|-------|
| Design tokens | `style.css` (top) | Colours, typography, spacing, breakpoints | Global |
| Reset/normalize | `style.css` | Cross-browser consistency | Global |
| Layout | `style.css` | Grid system, header, footer, main | Global |
| Components | `style.css` | Buttons, cards, forms, navigation | Global |
| Utilities | `style.css` (bottom) | Helper classes, text utilities | Global |
| Upload bridge | `shared/uploads/upload-bridge.css` | Upload widget styles | Conditional |

### Shared JavaScript

| File | Purpose | Scope |
|------|---------|-------|
| `main.js` | Component loader, navigation, utilities | Every page |
| `navigation-data.js` | Navigation link store | Every page |
| `form-validation.js` | Validation, honeypot, spam checks | All form pages |
| `article-data.js` | Blog article metadata | Blog pages |
| `firebase-config.js` | Firebase config (placeholder) | Future: all pages |
| `firebase-bridge.js` | Firebase helpers (placeholder) | Future: all pages |
| `upload-bridge.js` | Upload widget functionality | Pages with uploads |

### Shared Assets

| Folder | Purpose |
|--------|---------|
| `assets/images/` | Site images, backgrounds, icons |
| `assets/favicon/` | Favicon and touch icons |
| `assets/fonts/` | Self-hosted web fonts |

---

## 5. Current Completed Systems

### Architecture Documents

| Document | Purpose |
|----------|---------|
| `docs/page-template-system.md` | HTML structure, `<head>` requirements, layout |
| `docs/navigation-and-routing-system.md` | URL structure, navigation data, internal linking |
| `docs/forms-and-lead-system.md` | Form structure, validation, spam prevention |
| `docs/performance-and-optimization-system.md` | Optimization, image strategy, Core Web Vitals |
| `docs/security-and-project-safety.md` | 30-section safety guide |
| `docs/master-development-roadmap.md` | 10-phase roadmap |
| `docs/production-launch-checklist.md` | 25-section launch preparation |
| `docs/platform-architecture-summary.md` | Master onboarding |
| `docs/developer-handoff-and-ai-continuity.md` | Continuity and AI safety |
| `docs/final-operational-blueprint.md` | This document |

### Implemented Code

| System | File | Status |
|--------|------|--------|
| Master page template | `index.html` | Complete |
| Shared header | `shared/header.html` | Complete |
| Shared footer | `shared/footer.html` | Complete |
| Design tokens and CSS | `css/style.css` | Complete |
| Component loader | `js/main.js` | Complete |
| Navigation data | `js/navigation-data.js` | Complete |
| Form validation | `js/form-validation.js` | Complete |
| Firebase config | `shared/firebase/firebase-config.js` | Placeholder |
| Firebase bridge | `shared/firebase/firebase-bridge.js` | Placeholder |
| Upload bridge CSS | `shared/uploads/upload-bridge.css` | Complete |
| Upload bridge JS | `shared/uploads/upload-bridge.js` | Complete |

---

## 6. Current Clean Folder Architecture

```
furnostyles-clean-rebuild/
|-- index.html                    # Homepage (master template)
|-- css/
|   |-- style.css                 # Shared CSS
|   |-- blog.css                  # Future
|   |-- marketplace.css           # Future
|   |-- dashboard.css             # Future
|   |-- property.css              # Future
|   |-- sidebar.css               # Future
|-- js/
|   |-- main.js                   # Component loader, utilities
|   |-- navigation-data.js        # Navigation links
|   |-- article-data.js           # Blog metadata
|   |-- article-utils.js          # Blog helpers
|   |-- form-validation.js        # Form validation
|   |-- form-handler.js           # Future
|   |-- search.js                 # Future
|   |-- filters.js                # Future
|   |-- cart.js                   # Future
|   |-- checkout.js               # Future
|   |-- auth.js                   # Future
|   |-- analytics.js              # Future
|   |-- notifications.js          # Future
|   |-- chat.js                   # Future
|   |-- property-search.js        # Future
|   |-- property-filters.js       # Future
|-- shared/
|   |-- header.html               # Shared header
|   |-- footer.html               # Shared footer
|   |-- firebase/
|   |   |-- firebase-config.js     # Public config only
|   |   |-- firebase-bridge.js    # Firebase helpers
|   |-- uploads/
|   |   |-- upload-bridge.css     # Upload styles
|   |   |-- upload-bridge.js      # Upload JS
|-- assets/
|   |-- images/                   # All site images
|   |-- favicon/                  # Favicon files
|   |-- fonts/                    # Web fonts
|   |-- README.md                 # Asset inventory
|-- services/                     # Service pages
|-- repairs/                      # Repair pages
|-- portfolio/                    # Portfolio pages
|-- blogs/                        # Blog articles
|-- marketplace/                  # Future
|-- contact.html                  # Contact page
|-- docs/                         # 10 architecture documents
|-- _headers                      # Future: Cloudflare headers
|-- _redirects                    # Future: Cloudflare redirects
|-- robots.txt                    # Future
|-- sitemap.xml                   # Future
|-- README.md                     # Project overview
```

### Folder Rules

| Rule | Requirement |
|------|-------------|
| `css/` — stylesheets only | No JS, no images, no HTML |
| `js/` — JavaScript only | No CSS, no images, no HTML |
| `assets/` — static assets only | No code, no docs |
| `shared/` — reusable components only | No page-specific content |
| `docs/` — documentation only | No code, no assets |
| Page folders — HTML only | Shared assets live in `css/`, `js/`, `assets/` |

---

## 7. Reusable Header / Footer Strategy

### Dynamic Loading

```javascript
// js/main.js
async function loadSharedComponents() {
  const header = await fetch('shared/header.html').then(r => r.text());
  document.getElementById('fns-header-mount').innerHTML = header;
  const footer = await fetch('shared/footer.html').then(r => r.text());
  document.getElementById('fld-footer-mount').innerHTML = footer;
}
```

### Header Structure

```html
<div class="premium-topbar">...</div>
<header class="premium-header">
  <a class="premium-brand" href="index.html">Furnostyles</a>
  <div class="fld-youtube-search">...</div>
  <div class="fld-icon-actions">...</div>
</header>
```

### Footer Structure

```html
<footer class="fld-commerce-footer">
  <p>&copy; 2026 Furnostyles. All rights reserved.</p>
</footer>
```

### Page Integration

Every page must include mount points before `</body>`:

```html
<div id="fns-header-mount"></div>
<!-- ... content inside .premium-layout > .premium-main ... -->
<div id="fld-footer-mount"></div>
<script defer src="js/main.js"></script>
```

### Safety Rules

| Rule | Requirement |
|------|-------------|
| Never remove mount points | Components have nowhere to render |
| Never change mount point ID without updating `main.js` | Loader references the ID |
| Never add blocking synchronous loading | Always use `fetch()` asynchronously |
| Test changes on every page type | Changes affect all pages |
| Header/footer HTML lives in `shared/` only | No inline code in pages |

---

## 8. Future Sidebar Reintegration Philosophy

**Not to be built yet.** Document only.

### Core Philosophy

The sidebar is an **opt-in enhancement**, not a forced structural change. Pages without a sidebar must look identical before and after the sidebar system exists.

### Principles

| Principle | Implementation |
|-----------|--------------|
| **Opt-in only** | `.premium-layout--with-sidebar` required |
| **No squeezing** | Non-sidebar pages unchanged |
| **No JS dependency** | CSS-only fallback |
| **Mobile-first** | Hidden on mobile; drawer pattern |

### Implementation

```html
<div class="premium-layout premium-layout--with-sidebar">
  <aside class="premium-sidebar">...</aside>
  <main class="premium-main">...</main>
</div>
```

| File | Purpose | Load Condition |
|------|---------|----------------|
| `css/sidebar.css` | Sidebar styles | Conditional on sidebar pages |
| `js/sidebar.js` | State, accessibility | Conditional on sidebar pages |
| Shared data file | Sidebar content | Loaded dynamically |

### Safety Rules

| Rule | Requirement |
|------|-------------|
| Sidebar CSS never loaded on non-sidebar pages | Conditional `<link>` only |
| Sidebar HTML never added to pages that do not need it | No empty `<aside>` tags |
| Read `docs/future-sidebar-strategy.md` before implementing | Full architecture there |

---

## 9. Blog / Content Ecosystem Strategy

### Content Philosophy

Content is the primary growth engine. The platform scales from 10 pages to 500+ through systematic content production using reusable templates.

### Content Types

| Type | Template | Data Store | Example |
|------|----------|------------|---------|
| Blog article | Reusable template | `js/article-data.js` | `/blogs/modern-living-room-ideas.html` |
| Service page | Service template | Static HTML | `/services/interior-design.html` |
| Portfolio project | Portfolio template | Static HTML | `/portfolio/karen-home-renovation.html` |
| Location page | Location template | Static HTML | `/locations/interior-design-nairobi.html` |

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

### Quality Standards

| Standard | Requirement |
|----------|-------------|
| Minimum length | 800 words (cornerstone: 2000+) |
| Featured image | 1200x630px for OG sharing |
| Internal links | At least 3 per article |
| Heading hierarchy | One `<h1>`, logical `<h2>`-`<h3>` |
| Meta description | Unique, 150-160 characters |
| No placeholder text | "Lorem ipsum" and "Coming soon" forbidden |

### Scaling Workflow

```
1. Content brief -> 2. Write -> 3. HTML from template
4. Add to article-data.js -> 5. Internal links
6. Featured image + OG tags -> 7. Update sitemap
8. Test -> 9. Deploy -> 10. Submit to Search Console
```

---

## 10. SEO Scaling Strategy

### On-Page SEO (Every Page)

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unique Page Title — Furnostyles</title>
  <meta name="description" content="Unique 150-160 char description">
  <link rel="canonical" href="https://furnostyles.com/page-url.html">
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Description">
  <meta property="og:image" content="https://furnostyles.com/assets/og.jpg">
  <meta property="og:url" content="https://furnostyles.com/page-url.html">
</head>
```

### Technical SEO

| Element | File | Requirement |
|---------|------|-------------|
| `robots.txt` | Project root | Allows all pages; points to sitemap |
| `sitemap.xml` | Project root | All HTTPS URLs; accurate `lastmod` |
| Structured data | In page | JSON-LD for Organization, Article |
| Semantic HTML | Every page | `<header>`, `<nav>`, `<main>`, `<footer>` |
| Heading hierarchy | Every page | One `<h1>`; no skipped levels |

### SEO by Phase

| Phase | Focus |
|-------|-------|
| Phase 1 | Foundation: meta tags, sitemap, semantic HTML |
| Phase 2 | Expansion: 500+ pages, cornerstone articles, location SEO |
| Phase 3 | Advanced: breadcrumbs, structured data, internal linking |
| Phase 4+ | Monitoring: Search Console, analytics, conversions |

---

## 11. Internal Linking Ecosystem

### Philosophy

Internal links distribute authority, guide users, and help search engines understand structure.

### Rules

| Rule | Requirement |
|------|-------------|
| Every page linked from at least one other page | No orphans |
| Every new page added to `navigation-data.js` | Visibility |
| Relative paths only | No hardcoded domain names |
| Descriptive anchor text | "Interior design services" not "click here" |
| 3-5 related article links per article | Content clusters |
| Breadcrumbs on all pages (future) | Show hierarchy |

### Architecture

```
Homepage
  |-- Services (Interior Design, Repairs, ...)
  |-- Portfolio (Project 1, Project 2, ...)
  |-- Blog (Article 1, Article 2, ...)
  |-- Contact
```

### Testing

- Run link checker before every deployment
- Zero broken internal links
- Zero broken external links
- No `localhost` or preview URLs in production

---

## 12. CSS and JS Architecture Philosophy

### CSS Philosophy

Layers of increasing specificity: tokens at top; utilities at bottom.

| Layer | Location | Purpose |
|-------|----------|---------|
| Design tokens | `style.css` (top) | CSS variables for colours, fonts, spacing |
| Reset/normalize | `style.css` | Cross-browser consistency |
| Layout | `style.css` | `.premium-layout` grid, header, footer |
| Components | `style.css` | `.fns-btn*`, `.fns-card*`, `.fns-form*` |
| Utilities | `style.css` (bottom) | Helper classes |

### CSS Safety Rules

| Rule | Requirement |
|------|-------------|
| Never `!important` on shared components | Makes overrides impossible |
| Never increase specificity unnecessarily | Prefer `.fns-card` over nested selectors |
| Never remove a class used in HTML | Search project first |
| Never change a variable without checking uses | Variables are global |
| Feature CSS must not redefine shared components | Override with modifiers |

### JS Philosophy

Shared utilities in `main.js`; feature logic in dedicated files loaded conditionally.

| File | Purpose | Scope |
|------|---------|-------|
| `main.js` | Component loader, navigation, utilities | Every page |
| `form-validation.js` | Validation, spam prevention | All form pages |
| `search.js` | Client-side search | Search pages (future) |
| `filters.js` | Content filtering | Filter pages (future) |

### JS Safety Rules

| Rule | Requirement |
|------|-------------|
| Read full function before editing | Understand inputs, outputs, side effects |
| Namespace globals under `Furnostyles.*` | Prevents collisions |
| Check call sites before modifying shared functions | `loadComponent()` is universal |
| Handle errors in async functions | Unhandled rejections break components |
| Never add global listeners without cleanup | Memory leaks |

---

## 13. Media and Image Management Philosophy

### Image Philosophy

Every image optimized before upload.

| Aspect | Requirement |
|--------|-------------|
| Format | WebP primary; JPEG/PNG fallback |
| Optimization | Compress, resize, convert before upload |
| Responsive | `srcset` for multiple sizes |
| Lazy loading | `loading="lazy"` below the fold |
| Dimensions | `width` and `height` attributes required |
| Naming | Descriptive, hyphenated: `karen-home-living-room-800.webp` |
| Hero max | 500KB |
| Thumbnail max | 200KB |
| Page payload | < 1.5MB mobile; < 2MB desktop |

### Video Philosophy

| Aspect | Requirement |
|--------|-------------|
| Hosting | YouTube/Vimeo embed (not self-hosted) |
| Thumbnail | Custom thumbnail image |
| Lazy loading | Load iframe only in viewport |
| Accessibility | Captions, transcript link |

### Asset Governance

| Rule | Requirement |
|------|-------------|
| Optimize before upload | Compress, resize, WebP |
| Never delete referenced images | Search across project first |
| Source files outside project | RAW, PSD, Figma not in deployment |
| Maintain `assets/README.md` | Inventory of assets and licenses |
| No copyrighted images without license | Original, licensed stock, or royalty-free |

---

## 14. Forms and Lead Generation Philosophy

### Form Philosophy

Forms are the primary conversion mechanism. They must be fast, trustworthy, and spam-protected.

### Components

| Component | File | Purpose |
|-----------|------|---------|
| Validation engine | `js/form-validation.js` | Field validation, honeypot, time check, rate limit |
| Form handler | `js/form-handler.js` | Submission, Firebase write, WhatsApp (future) |
| Form styles | `style.css` `.fns-form*` | Consistent styling |

### Spam Prevention (Multi-Layered)

| Layer | Implementation | Catches |
|-------|--------------|---------|
| Honeypot field | Hidden input bots fill | Simple bots |
| Time-based check | Reject under 3 seconds | Instant bots |
| Rate limiting | Max 3 per `sessionStorage` | Repeated abuse |
| Math challenge (future) | "What is 3 + 5?" | Sophisticated bots |
| reCAPTCHA v3 (future) | Invisible scoring | Advanced bots |
| Firebase App Check (future) | Device attestation | App validation |

### Form Types

| Form | Fields | Destination (Future) |
|------|--------|----------------------|
| Contact | Name, email, phone, message | Firestore `leads` |
| Quote request | Name, email, phone, service, budget, timeline | Firestore `leads` |
| Booking | Name, email, phone, date, time, service | Firestore `leads` |
| Vendor application | Business name, email, description | Firestore `vendor-applications` |

### Safety Rules

| Rule | Requirement |
|------|-------------|
| Client-side validation on all forms | Immediate feedback |
| Sanitize data before storage | Strip HTML, trim whitespace |
| Honeypot on every form | Catch simple bots |
| Time-based spam checks | Reject under 3 seconds |
| Rate limiting | Max 3 submissions per session |
| HTTPS for all submissions | Prevents MITM attacks |

---

## 15. Future Marketplace Architecture Overview

**Not to be built yet.** Document only.

### Structure

| Page | URL | Purpose |
|------|-----|---------|
| Marketplace homepage | `marketplace/index.html` | Featured products, categories, search |
| Category page | `marketplace/categories/[category].html` | Listings per category |
| Product detail | `marketplace/products/[slug].html` | Gallery, specs, vendor info |
| Vendor sourcing | `marketplace/sell-with-us.html` | Info for potential vendors |

### Data Model (Future)

```javascript
// Firestore: products
{
  id: 'product-slug',
  name: 'Modern Velvet Sofa',
  category: 'furniture',
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

### Safety Rules

| Rule | Requirement |
|------|-------------|
| Marketplace CSS/JS loaded conditionally | Only on marketplace pages |
| Shared components unchanged | Same header/footer |
| Strict Firestore schema | Validate all writes |
| Admin moderation for vendors | Approve before public visibility |

---

## 16. Future Dashboard / Account Architecture Overview

**Not to be built yet.** Document only.

### Account Types

| Type | Role | Dashboard |
|------|------|-----------|
| **Client** | Browse, inquire, purchase, save favourites | Client dashboard |
| **Vendor** | List products, manage orders, view analytics | Vendor dashboard |
| **Admin** | Manage users, approve vendors, moderate content | Admin dashboard |
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

## 17. Firebase Future Integration Overview

**Not to be built yet.** Document only.

### Services by Phase

| Service | Purpose | Phase |
|---------|---------|-------|
| **Firebase Authentication** | User accounts | Phase 6 |
| **Cloud Firestore** | Product data, user data, orders, leads | Phase 4+ |
| **Firebase Cloud Functions** | Payment processing, email notifications | Phase 4+ |
| **Firebase Analytics** | App usage tracking | Phase 9 |
| **Firebase Hosting** | Only if Cloudflare Pages insufficient | Future |

### Configuration

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
// This file contains ONLY public API keys.
// Service account keys NEVER go here.
```

### Safety Rules

| Rule | Requirement |
|------|-------------|
| `firebase-config.js` never contains private keys | API keys are public; service account keys are private |
| Firestore security rules written before collection creation | Open rules allow anyone to read/write |
| All data sanitized before Firestore write | Strip HTML, trim strings, validate types |
| Auth state checked before sensitive reads/writes | Unauthenticated users cannot access private data |
| Cloud Functions validate all input | Never trust client-side validation alone |

---

## 18. Payment System Integration Roadmap

**Not to be built yet.** Document only.

### Providers

| Provider | Method | Phase |
|----------|--------|-------|
| **M-Pesa** | STK push (Kenyan mobile payments) | Phase 7 |
| **Paystack** | Card payments, bank transfers | Phase 7 |
| **Stripe** | International card payments | Phase 7 |

### Safety Rules

| Rule | Requirement |
|------|-------------|
| Never store credit card numbers, CVV, or PINs | Use PCI-compliant processors |
| Payment processing server-side or via secure SDK | Client-side not PCI-compliant |
| Payment forms use HTTPS only | Never transmit over HTTP |
| Verify webhooks with signatures | Prevents spoofed notifications |
| Idempotency keys prevent duplicate charges | Same request processes once |
| Refund permissions restricted to admin | Vendors cannot issue refunds without approval |
| Test payments use sandbox keys only | Prevents accidental real charges |
| Display pricing in local currency (KES) | Transparency and trust |
| Comply with Kenyan financial regulations | Consult legal counsel |

---

## 19. Real Estate Ecosystem Integration

**Not to be built yet.** Document only.

### Scope

| Feature | Phase | Description |
|---------|-------|-------------|
| Property listings | Phase 8 | Browse properties for sale/rent |
| Property search | Phase 8 | Filter by location, price, type |
| Agent accounts | Phase 8 | Agents list and manage properties |
| Airbnb partnership | Phase 8 | Design packages for Airbnb hosts |
| Property inquiry forms | Phase 8 | Request viewing or information |

### Architecture

| Element | Location | Notes |
|---------|----------|-------|
| Property listing pages | `properties/` | Static or Firestore-powered |
| Property detail pages | `properties/[slug].html` | Dynamic routing (future) |
| Property data model | Firestore | `properties` collection |
| Property search/filter | `js/property-search.js`, `js/property-filters.js` | Loaded conditionally |

---

## 20. Performance and Optimization Philosophy

### Performance Budgets

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Performance (mobile) | >= 90 | Chrome DevTools |
| Lighthouse Accessibility | = 100 | Chrome DevTools |
| Largest Contentful Paint (LCP) | < 2.5s | PageSpeed Insights |
| Cumulative Layout Shift (CLS) | < 0.1 | PageSpeed Insights |
| Page weight (mobile) | < 1.5MB | Chrome DevTools |
| Page weight (desktop) | < 2MB | Chrome DevTools |

### Optimization Strategies

| Strategy | Implementation |
|----------|--------------|
| CSS optimization | Minified, unused rules removed |
| JS optimization | Minified, deferred loading |
| Image optimization | WebP, `srcset`, lazy loading |
| Font optimization | Self-hosted, `font-display: swap` |
| Lazy loading | Below-the-fold images and non-critical JS |
| CDN caching | Cloudflare edge caching |
| Code splitting | Feature JS/CSS loaded only where needed |

### Monitoring Schedule

| Frequency | Action |
|-----------|--------|
| Before every deployment | Lighthouse audit on all major page types |
| Monthly | Review Core Web Vitals in Search Console |
| Quarterly | Full performance audit |

---

## 21. Security and Project Safety Philosophy

### Safety Mindset

Every edit must be reversible. Every change must be tested. No assumption is safe without verification.

### Decision Authority

| Decision | Authority |
|----------|-----------|
| Add new page | Developer (following template) |
| Change shared CSS/JS | Senior developer + peer review |
| Change layout system | Architecture review required |
| Add new feature | Read roadmap; check phase requirements |
| Deploy to production | Developer + verification checklist |
| Skip a roadmap phase | Architecture review required |
| Add third-party service | Security and performance review |

### Documentation Triggers

| Trigger | Documentation Required |
|---------|--------------------------|
| New feature added | Update relevant architecture doc |
| Shared component changed | Update component documentation |
| New CSS variable added | Document in `style.css` and architecture doc |
| New page type created | Add to `page-template-system.md` |
| Phase completed | Update project README |
| Major bug fixed | Document root cause in incident log |

### Code Quality

| Standard | Requirement |
|----------|-------------|
| Self-documenting code | Clear names, descriptive files, logical structure |
| No dead code | Remove unused CSS, JS, HTML promptly |
| No orphaned files | Delete or document unreferenced files |
| README files | Every major folder has a README |
| Change log | Document major changes, who made them, why |
| Peer review | Major changes require second pair of eyes |
| Regular audits | Quarterly review of unused CSS, broken links |

---

## 22. Cloudflare Pages Deployment Philosophy

### Why Cloudflare Pages

| Advantage | Benefit |
|-----------|---------|
| **Global CDN** | Fast loading worldwide |
| **Automatic SSL** | HTTPS with zero configuration |
| **Edge caching** | Reduced server load, faster repeat visits |
| **Branch previews** | Test changes before production |
| **Zero server maintenance** | No servers to patch or manage |
| **Static-first** | Matches our architecture perfectly |

### Deployment Workflow

```
1. Deploy to Cloudflare Pages preview URL
2. Verify preview URL on all page types
3. Verify on mobile and desktop
4. Mark as production deploy
5. Verify live site loads correctly
6. Monitor for 30 minutes
```

### Safety Rules

| Rule | Requirement |
|------|-------------|
| Never deploy during peak traffic | Deploy during low-traffic periods |
| Never deploy Friday evening | Support may not be available |
| Always have rollback plan | Know last working deploy ID |
| Test preview URL before production | Never push directly to production |
| Keep last 5 deploys | Rollback capability |
| Monitor 30 minutes after deployment | Catch issues before users report |

---

## 23. AI-Assisted Development Governance

### AI Danger Zone

| Dangerous Request | Why It Is Dangerous |
|-------------------|---------------------|
| "Rewrite the entire CSS file" | Loses design tokens, breaks every page |
| "Refactor all JavaScript" | Breaks event listeners and shared components |
| "Change all class names" | Breaks every reference across every page |
| "Add a sidebar to every page" | Violates "no sidebar yet" rule |
| "Move all files into new folders" | Breaks every relative path |
| "Delete files you think are unused" | AI cannot reliably detect all references |
| "Convert to single-page app" | Destroys static hosting and SEO |
| "Add React/Vue/Angular" | Massive bundle; unnecessary for static site |
| "Add a backend/API server" | Violates static hosting architecture |
| "Restructure the navigation" | Breaks internal links and breadcrumbs |

### Safe AI Editing Checklist

- [ ] AI has read the full file before editing
- [ ] AI has read the relevant architecture document
- [ ] The request is specific and scoped (not "make it better")
- [ ] The file is backed up or a snapshot exists
- [ ] The change is tested on a preview URL before production
- [ ] The change does not affect shared components (or they are tested)

### Pre-Edit Steps

| Step | Action |
|------|--------|
| 1 | Open the file; verify its current state |
| 2 | Reference exact file path and line numbers |
| 3 | State whether the file is shared or page-specific |
| 4 | Mention constraints: "Do not touch the layout grid" |
| 5 | Reference the relevant architecture document |

---

## 24. Long-Term Scalability Principles

### The Scalability Formula

**Scalability = Centralization + Documentation + Testing + Constraints**

| Principle | Implementation |
|-----------|--------------|
| **Centralization** | Shared components, shared data, shared styles, shared scripts |
| **Documentation** | Every decision documented; every change logged |
| **Testing** | Before every deployment; after every shared component change |
| **Constraints** | No skipping phases; no premature optimization; no scope creep |

### Scalability Rules

| Rule | Requirement |
|------|-------------|
| If a pattern appears on more than 2 pages, centralize it. | Duplication breeds inconsistency. |
| If a style is used on more than 2 pages, put it in `style.css`. | Page-specific CSS is for exceptions only. |
| If a function is used on more than 2 pages, put it in a shared JS file. | Copy-paste code is a maintenance liability. |
| If data is referenced on more than 2 pages, put it in a shared data file. | Central data stores prevent drift. |
| Never create a second `style.css` or `main.js`. | Splitting the foundation creates confusion. |
| Never inline shared styles or scripts in individual pages. | Inline code is not cacheable and hard to maintain. |
| Document the current phase in the project README. | Everyone knows what phase the project is in. |
| Do not add features from future phases to the current phase. | Resist scope creep. |
| When moving to a new phase, re-test the entire site. | New integrations may break existing features. |
| Keep architecture documents up to date. | Stale documentation is worse than no documentation. |

---

## 25. What Must Remain Centralized Forever

These items must never be duplicated across pages.

| Item | Central Location | Why Centralized |
|------|------------------|-----------------|
| Design tokens | `style.css` (top) | One source of truth for colours, fonts, spacing |
| Layout styles | `style.css` | Every page uses the same grid and structure |
| Button styles | `style.css` `.fns-btn*` | Consistent buttons everywhere |
| Card styles | `style.css` `.fns-card*` | Consistent cards everywhere |
| Form styles | `style.css` `.fns-form*` | Consistent forms everywhere |
| Navigation data | `js/navigation-data.js` | One link store for entire site |
| Header HTML | `shared/header.html` | One header for all pages |
| Footer HTML | `shared/footer.html` | One footer for all pages |
| Form validation | `js/form-validation.js` | One validation engine for all forms |
| Spam detection | `js/form-validation.js` | One honeypot/time-check logic |
| Firebase config | `shared/firebase/firebase-config.js` | One config for all Firebase features |
| Article data | `js/article-data.js` | One source for blog metadata |
| Shared utilities | `js/main.js` | Reusable functions, not duplicated |

---

## 26. What Should Never Be Duplicated Again

These 14 items caused the old architecture to fail. Never duplicate them.

| Item | Why | Central Location |
|------|-----|------------------|
| `<head>` structure | Inconsistent meta tags break SEO | Copy from `index.html` |
| Layout grid CSS | Multiple layout systems break pages | `style.css` `.premium-layout` |
| Header HTML | Changes require editing every file | `shared/header.html` |
| Footer HTML | Changes require editing every file | `shared/footer.html` |
| Navigation links | Adding a page requires editing every file | `js/navigation-data.js` |
| Button styles | Inconsistent buttons across pages | `style.css` `.fns-btn*` |
| Card styles | Inconsistent cards across pages | `style.css` `.fns-card*` |
| Form validation | Bugs fixed in one form remain in others | `js/form-validation.js` |
| Spam prevention | Inconsistent spam protection | `js/form-validation.js` |
| Form styles | Inconsistent forms across pages | `style.css` `.fns-form*` |
| Utility functions | Same logic rewritten differently | `js/main.js` |
| Colour values | Inconsistent colours | `style.css` CSS variables |
| Spacing values | Inconsistent spacing | `style.css` CSS variables |
| Typography styles | Inconsistent fonts and sizes | `style.css` CSS variables |

---

## 27. Recommended Development Order for Future Phases

| Phase | Name | Key Deliverables | Prerequisites |
|-------|------|------------------|---------------|
| **1** | Brand Foundation | Homepage, services, repairs, portfolio, blog, contact, layout | None (current) |
| **2** | SEO & Content Expansion | 500+ pages, cornerstone articles, location SEO | Phase 1 stable |
| **3** | Advanced UX | Sidebar, mega-nav, search, filters, animations | Phase 2 stable |
| **4** | Service Request System | Quotes, bookings, inquiry tracking, WhatsApp | Phase 3 stable |
| **5** | Marketplace Foundation | Product listings, categories, vendor sourcing | Phase 4 stable |
| **6** | Accounts & Dashboards | Client/vendor/admin accounts, dashboards | Phase 5 stable |
| **7** | Payments & Commerce | Cart, checkout, M-Pesa, Paystack, Stripe | Phase 6 stable |
| **8** | Real Estate Expansion | Property listings, dashboards, Airbnb | Phase 7 stable |
| **9** | Platform Scaling | CDN, analytics, AI, automation | Phase 8 stable |
| **10** | Future Ecosystem | PWA, API, chat, SaaS | Phase 9 stable |

### Dependency Rules

| Rule | Requirement |
|------|-------------|
| Never skip a phase | Each phase builds on the previous |
| Never build Phase N+1 before Phase N is stable | Unstable foundations create exponential problems |
| Document the current phase in the project README | Everyone knows the current phase |
| Do not add features from future phases to current phase | Resist scope creep |
| When moving to a new phase, update all architecture docs | Future features need new documentation |
| When moving to a new phase, re-test the entire site | New integrations may break existing features |

---

## 28. Safe Testing Workflow Before Deployment

### Pre-Edit Testing

```
1. Open the file you intend to edit.
   - Scroll through the entire file.
   - Note the structure, classes, IDs.
   - Identify shared vs. page-specific code.

2. Search for references.
   - CSS class? Search all HTML files.
   - JS function? Search all JS files.
   - Shared component? Identify all pages that use it.

3. Read the relevant architecture document.
   - Understand the safety rules.

4. Create a project snapshot.
   - Copy entire project folder.
   - Name: furnostyles-YYYY-MM-DD-before-purpose

5. Make the edit.

6. Test locally.
   - Open affected pages in browser.
   - Check console for errors.
   - Verify visual appearance.
   - Run Lighthouse if layout affected.

7. Test shared component changes on every page type.
   - Home, services, portfolio, blog, contact.
   - Mobile, tablet, desktop.

8. If tests pass, deploy. If not, restore from snapshot.
```

### Pre-Deployment Testing

- [ ] All changes saved in IDE
- [ ] Local snapshot created
- [ ] Local preview works correctly
- [ ] Browser console shows zero errors
- [ ] Lighthouse scores meet targets (performance >= 90, accessibility = 100)
- [ ] All internal links work
- [ ] No placeholder text on public pages
- [ ] No `localhost` or preview URLs in production code

---

## 29. Safe Refactor Workflow

### What Is a Refactor?

A refactor improves code structure without changing external behaviour. Refactors are inherently risky because they touch many files.

### Refactor Rules

| Rule | Requirement |
|------|-------------|
| Never refactor without a snapshot | Create full project backup first |
| Never refactor more than one system at a time | If refactoring CSS, do not touch JS |
| Never refactor during active development | Wait until current features are stable |
| Never refactor without a test plan | Know how to verify the refactor worked |
| Never refactor without reading all affected files | Search for all references first |
| Never refactor shared components without testing every page | Changes affect the entire site |
| Never refactor to "make it better" without a specific problem | "Better" is subjective; solve a real issue |
| Document the reason for the refactor | Future editors need to know why |
| Verify Lighthouse scores after refactor | Refactors can accidentally hurt performance |

### Safe Refactor Checklist

- [ ] Identify the specific problem (not "make it better")
- [ ] Create project snapshot
- [ ] Search for all references to the code being refactored
- [ ] Read all affected files completely
- [ ] Make the smallest change that solves the problem
- [ ] Test on local preview
- [ ] Test on all page types if shared components affected
- [ ] Verify Lighthouse scores
- [ ] Deploy to preview URL
- [ ] Verify preview URL on mobile and desktop
- [ ] If all tests pass, deploy to production
- [ ] Monitor for 30 minutes after production deploy

---

## 30. Final Long-Term Vision for Furnostyles

### The 10-Year Vision

Furnostyles evolves from a premium interior design website into a comprehensive digital ecosystem serving Kenya and East Africa.

### Evolution Path

| Phase | State |
|-------|-------|
| **Now (Phase 1)** | Premium static website with services, portfolio, blog, and contact |
| **Phase 2** | Content-rich platform with 500+ SEO-optimized pages |
| **Phase 3** | Advanced UX with sidebar, search, filters, and animations |
| **Phase 4** | Service request system with quotes, bookings, and WhatsApp integration |
| **Phase 5** | Marketplace foundation with curated vendors and product listings |
| **Phase 6** | Full account system with client, vendor, and admin dashboards |
| **Phase 7** | Complete commerce with M-Pesa, Paystack, and Stripe |
| **Phase 8** | Real estate expansion with property listings and Airbnb partnerships |
| **Phase 9** | Platform scaling with analytics, AI recommendations, and automation |
| **Phase 10** | Future ecosystem with PWA, API, real-time chat, and SaaS possibilities |

### The Core Principle That Never Changes

> **Read, centralize, minimize, verify.**
>
> No matter how large the platform becomes, these four pillars ensure that every change is safe, every feature is maintainable, and the architecture scales without chaos.

### Platform Quality Commitments

| Commitment | Forever |
|------------|---------|
| **Accessibility** | Every feature accessible to all users |
| **Performance** | Lighthouse 90+ performance, 100 accessibility |
| **Security** | No shortcuts; privacy-first by design |
| **Documentation** | Every decision documented; every change logged |
| **Testing** | No deployment without verification |
| **Centralization** | Shared systems stay shared; duplication never tolerated |

### What Makes Furnostyles Different

Most platforms grow messy over time. Furnostyles is built on the belief that **clean architecture is a competitive advantage**. When competitors struggle with technical debt, Furnostyles scales smoothly because every decision was documented, every system was centralized, and every phase was completed before the next began.

### Final Governance Principle

> **The architecture outlasts the team that built it.**
>
> Every document, every rule, and every system in this blueprint is designed so that a new developer or AI session can safely continue work without breaking what exists. The platform is not a collection of files — it is a **governed, documented, scalable organism** that improves with every phase.

---

## Document Summary

| # | Section | Purpose |
|---|---------|---------|
| 1 | Executive platform vision | What Furnostyles is and is not |
| 2 | Brand identity principles | Design language, naming, rules |
| 3 | Core architecture philosophy | Four pillars, decisions, forbidden patterns |
| 4 | Shared reusable systems overview | Header, footer, CSS, JS, assets |
| 5 | Current completed systems | Architecture docs and code systems |
| 6 | Current clean folder architecture | Folder tree and governance rules |
| 7 | Reusable header/footer strategy | Dynamic loading, structure, safety |
| 8 | Future sidebar reintegration philosophy | Opt-in enhancement, safety rules |
| 9 | Blog/content ecosystem strategy | Content types, data store, scaling workflow |
| 10 | SEO scaling strategy | On-page, technical, phase-by-phase |
| 11 | Internal linking ecosystem | Linking rules, architecture, testing |
| 12 | CSS and JS architecture philosophy | Layered CSS, file organization, safety |
| 13 | Media and image management philosophy | Image optimization, video, asset governance |
| 14 | Forms and lead generation philosophy | Components, spam prevention, safety |
| 15 | Future marketplace architecture | Structure, data model, safety |
| 16 | Future dashboard/account architecture | Account types, auth, dashboard layout |
| 17 | Firebase future integration | Services by phase, config, safety |
| 18 | Payment system integration | Providers, PCI, compliance |
| 19 | Real estate ecosystem | Scope, architecture, data model |
| 20 | Performance and optimization | Budgets, strategies, monitoring |
| 21 | Security and project safety | Decision authority, documentation, quality |
| 22 | Cloudflare Pages deployment | Advantages, workflow, safety |
| 23 | AI-assisted development governance | Danger zone, safe editing, pre-edit steps |
| 24 | Long-term scalability principles | Centralization, documentation, testing, constraints |
| 25 | What must remain centralized forever | 13 items with locations |
| 26 | What should never be duplicated again | 14 items that caused past failures |
| 27 | Recommended development order | 10-phase roadmap with dependency rules |
| 28 | Safe testing workflow | 8-step pre-edit and pre-deployment testing |
| 29 | Safe refactor workflow | Refactor rules and checklist |
| 30 | Final long-term vision | 10-year evolution, quality commitments, governance |

**This document is the single source of truth for Furnostyles architecture, workflow, governance, and scaling strategy. Read it before any code change, deployment, or AI-assisted edit.**
