# Furnostyles Developer Handoff and AI Continuity System

**Date:** 2026-05-22 | **Status:** Active Development | **Phase:** 1 — Brand Foundation

---

## How to Use This Document

This document ensures that any future developer, AI assistant, or project collaborator can safely continue the Furnostyles platform without losing architecture understanding or repeating past mistakes.

**Read this document first** before making any code change, adding any feature, or asking AI to edit anything.

---

## 1. Current Project Status

| Aspect | Status |
|--------|--------|
| **Project phase** | Phase 1 — Brand Foundation (in progress) |
| **Site type** | Static HTML website hosted on Cloudflare Pages |
| **Primary purpose** | Premium interior design, furniture, and real estate content platform |
| **Target audience** | Homeowners, Airbnb hosts, property developers in Kenya and East Africa |
| **Current page count** | Homepage + partial service pages (expanding to full site) |
| **Firebase integration** | Not yet active (config placeholders exist) |
| **Backend** | None yet (static hosting only) |
| **Marketplace** | Not yet built (future Phase 5) |
| **User accounts** | Not yet built (future Phase 6) |
| **Sidebar** | Not yet built (future Phase 3) |

### What Exists Now

- `index.html` — complete homepage and master template
- `shared/header.html` — reusable header component
- `shared/footer.html` — reusable footer component
- `css/style.css` — design tokens, layout, components, utilities
- `js/main.js` — shared component loader, navigation utilities
- `js/navigation-data.js` — centralized navigation link store
- `js/form-validation.js` — form validation and spam prevention
- `js/article-data.js` — blog article metadata (placeholder)
- `shared/firebase/` — Firebase config and bridge placeholders
- `shared/uploads/` — upload bridge CSS and JS
- `docs/` — 8 architecture documents (see section 2)

### What Does Not Exist Yet

- Individual service, repair, portfolio, and blog pages
- Blog index and category pages
- Contact page with full form
- `sitemap.xml` and `robots.txt`
- `_headers` and `_redirects` for Cloudflare Pages
- Complete asset library (images, favicon, fonts)

---

## 2. Completed Systems

These systems are fully documented and partially or fully implemented.

### Architecture Documents

| Document | Purpose | Read Before |
|----------|---------|-------------|
| `docs/page-template-system.md` | HTML structure, `<head>` requirements, layout grid | Building any page |
| `docs/navigation-and-routing-system.md` | URL structure, navigation data, internal linking | Changing navigation |
| `docs/forms-and-lead-system.md` | Form structure, validation, spam prevention | Building/editing forms |
| `docs/performance-and-optimization-system.md` | CSS/JS optimization, image strategy, Core Web Vitals | Performance changes |
| `docs/security-and-project-safety.md` | 30-section safety guide for editing, AI, deployment | Any major change |
| `docs/master-development-roadmap.md` | 10-phase development roadmap with dependencies | Planning new features |
| `docs/production-launch-checklist.md` | 25-section launch preparation system | Before any launch |
| `docs/platform-architecture-summary.md` | Master onboarding document for the entire platform | First read for anyone new |

### Implemented Code Systems

| System | File | Status |
|--------|------|--------|
| Master page template | `index.html` | Complete |
| Shared header component | `shared/header.html` | Complete |
| Shared footer component | `shared/footer.html` | Complete |
| Design tokens and shared CSS | `css/style.css` | Complete |
| Shared component loader | `js/main.js` | Complete |
| Navigation data store | `js/navigation-data.js` | Complete |
| Form validation engine | `js/form-validation.js` | Complete |
| Article metadata store | `js/article-data.js` | Placeholder |
| Firebase config | `shared/firebase/firebase-config.js` | Placeholder |
| Firebase bridge | `shared/firebase/firebase-bridge.js` | Placeholder |
| Upload bridge CSS | `shared/uploads/upload-bridge.css` | Complete |
| Upload bridge JS | `shared/uploads/upload-bridge.js` | Complete |

---

## 3. Shared Reusable Systems

These systems are used across every page. Editing them affects the entire site.

### Shared HTML Components

| Component | File | Mount Point | Loaded By |
|-----------|------|-------------|-----------|
| Header | `shared/header.html` | `#fns-header-mount` | `main.js` via `fetch()` |
| Footer | `shared/footer.html` | `#fld-footer-mount` | `main.js` via `fetch()` |

### Shared CSS Layers

| Layer | Location | Contains | Scope |
|-------|----------|----------|-------|
| Design tokens | `style.css` (top) | Colours, typography, spacing, breakpoints | Global |
| Reset/normalize | `style.css` | Cross-browser consistency | Global |
| Layout | `style.css` | Grid system, header, footer, main content | Global |
| Components | `style.css` | Buttons, cards, forms, navigation | Global |
| Utilities | `style.css` (bottom) | Helper classes, text utilities | Global |
| Upload bridge | `shared/uploads/upload-bridge.css` | Upload widget styles | Conditional |

### Shared JavaScript Files

| File | Purpose | Scope |
|------|---------|-------|
| `main.js` | Header/footer loading, navigation, cart counter, shared utilities | Every page |
| `navigation-data.js` | Centralized navigation link store | Every page |
| `form-validation.js` | Validation engine, honeypot, spam checks | All form pages |
| `article-data.js` | Blog article metadata | Blog pages |
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

## 4. Current Clean Architecture Principles

These principles were established during the clean rebuild to prevent the problems of the past.

| Principle | Meaning | Why It Matters |
|-----------|---------|--------------|
| **Read before editing** | Understand existing architecture before changing anything | Prevents accidental breaking of shared systems |
| **Centralize before duplicating** | Reuse existing patterns rather than rewriting them | Prevents maintenance debt and inconsistencies |
| **Edit minimally** | Change the smallest amount of code that achieves the goal | Small changes are easy to review and revert |
| **Test before declaring done** | Verify in a browser before considering complete | "Looks right" is not the same as "works" |
| **Static-first** | Build as static HTML until dynamic features are genuinely needed | Cloudflare Pages is fast, cheap, and reliable |
| **Feature CSS/JS is conditional** | Load feature-specific code only on pages that need it | Prevents bloat and cross-page bugs |
| **No inline styles on structural elements** | CSS classes only for `.premium-topbar`, `.premium-header`, `.premium-brand` | Ensures consistent layout across all pages |
| **Namespace global JS** | All globals under `Furnostyles.*` | Prevents naming collisions |
| **Semantic HTML** | Use `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>` | Accessibility and SEO |
| **Progressive enhancement** | Core functionality works without JavaScript | Accessibility and resilience |

---

## 5. Why the Old Site Architecture Failed

Understanding past failures prevents repeating them.

### Problems with the Previous Architecture

| Problem | Cause | Impact |
|---------|-------|--------|
| **Inconsistent page layouts** | Every page was built from scratch with different HTML structures | Maintenance nightmare; every change required editing every page |
| **Duplicated CSS** | Same styles copied across multiple files | Changes in one place did not apply elsewhere; bloat |
| **Duplicated JavaScript** | Same functions copied into multiple page files | Bugs fixed in one file remained in others |
| **Hardcoded navigation** | Navigation links embedded in every page HTML | Adding a new page required editing every file |
| **Inline styles** | Structural elements had `style="..."` attributes | Layout broke unpredictably; inconsistent design |
| **Missing meta tags** | Many pages lacked SEO meta tags, canonical URLs, or OG data | Poor search engine visibility |
| **Unoptimized images** | Large uncompressed images loaded on every page | Slow load times, poor mobile experience |
| **No form validation** | Forms submitted without client-side checks | Spam, invalid data, poor user experience |
| **No shared components** | Header and footer code repeated on every page | Any header change required editing every file |
| **No documentation** | No architecture docs existed | New team members could not understand the system |
| **Unsafe AI editing** | AI made changes without reading full files or understanding scope | Shared components broken, styles corrupted, files deleted |
| **No testing workflow** | Changes were deployed without verification | Broken pages went live |
| **No rollback plan** | No snapshots or version history | Broken deployments were hard to recover |

### Lessons Learned

| Lesson | Implementation in Clean Rebuild |
|--------|---------------------------------|
| One master template for all pages | `index.html` is the only template; all pages copy from it |
| Centralized shared components | `shared/header.html` and `shared/footer.html` loaded dynamically |
| Centralized navigation data | `js/navigation-data.js` — one link store for the entire site |
| Layered CSS architecture | `style.css` with design tokens, layout, components, utilities |
| Namespaced JavaScript | `Furnostyles.*` global namespace prevents collisions |
| Architecture documents | Every system is documented in `docs/` |
| AI-safe editing rules | `docs/security-and-project-safety.md` defines AI editing constraints |
| Testing workflow | `docs/production-launch-checklist.md` defines pre-deployment checks |
| Snapshot and rollback | Snapshots before major changes; Cloudflare Pages deploy history |

---

## 6. What Was Intentionally Rebuilt

During the clean rebuild, these decisions were made deliberately.

### Rebuilt: Page Template System

| Before | After |
|--------|-------|
| Every page had different HTML structure | One `index.html` master template; all pages copy it exactly |
| Inline styles on structural elements | CSS classes only; no inline styles on `.premium-topbar`, `.premium-header`, `.premium-brand` |
| Missing or inconsistent `<head>` | Every page has identical `<head>` structure with unique title/description |

### Rebuilt: Shared Components

| Before | After |
|--------|-------|
| Header HTML copied into every page | `shared/header.html` loaded dynamically by `js/main.js` |
| Footer HTML copied into every page | `shared/footer.html` loaded dynamically by `js/main.js` |
| Navigation links hardcoded per page | `js/navigation-data.js` centralizes all links |

### Rebuilt: CSS Architecture

| Before | After |
|--------|-------|
| Scattered CSS across multiple files | `style.css` with 5-layer architecture (tokens, reset, layout, components, utilities) |
| No design tokens | CSS variables for colours, spacing, typography at top of `style.css` |
| Duplicate button/card styles | Single `.fns-btn*`, `.fns-card*` classes reused everywhere |

### Rebuilt: JavaScript Architecture

| Before | After |
|--------|-------|
| Functions scattered across page files | Centralized in `js/main.js` with `Furnostyles.*` namespace |
| No form validation | `js/form-validation.js` with honeypot, time check, rate limiting |
| No spam prevention | 6-layer spam strategy documented and implemented |

### Rebuilt: Documentation

| Before | After |
|--------|-------|
| No architecture docs | 8 complete architecture documents in `docs/` |
| No safety rules | `docs/security-and-project-safety.md` with 30 sections |
| No roadmap | `docs/master-development-roadmap.md` with 10 phases |
| No launch checklist | `docs/production-launch-checklist.md` with 25 sections |

---

## 7. Current Folder Structure Overview

```
furnostyles-clean-rebuild/
|
|-- index.html                    # Homepage (master template for all pages)
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
|   |-- platform-architecture-summary.md
|   |-- developer-handoff-and-ai-continuity.md    # This document
|   |-- future-sidebar-strategy.md              # Sidebar architecture (future)
|   |-- brand-guidelines.md                     # Brand guidelines (future)
|
|-- _headers                      # Cloudflare Pages headers (future)
|-- _redirects                    # Cloudflare Pages redirects (future)
|-- robots.txt                    # Search engine crawling rules (future)
|-- sitemap.xml                   # XML sitemap (future)
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
| Page folders contain only HTML. | Shared assets live in `css/`, `js/`, `assets/`. |

---

## 8. Shared Component System Overview

Shared components are loaded dynamically so that one change updates every page automatically.

### How Shared Components Work

```javascript
// js/main.js
async function loadSharedComponents() {
  // Fetch header HTML and inject into mount point
  const header = await fetch('shared/header.html').then(r => r.text());
  document.getElementById('fns-header-mount').innerHTML = header;

  // Fetch footer HTML and inject into mount point
  const footer = await fetch('shared/footer.html').then(r => r.text());
  document.getElementById('fld-footer-mount').innerHTML = footer;
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadSharedComponents);
```

### Why This Approach

| Benefit | Explanation |
|---------|-------------|
| **One source of truth** | Edit `shared/header.html` once; every page updates |
| **No duplication** | Header HTML is not copied into any page file |
| **Cache-friendly** | `fetch()` responses can be cached by the browser |
| **Static hosting compatible** | No server-side rendering required |

### Important Notes

- Components load asynchronously after `DOMContentLoaded`.
- There may be a brief flash of unstyled content before components load — this is normal for static sites.
- For production, consider inlining critical header CSS or using a build step.

---

## 9. Footer / Header Reusable Architecture

### Header Architecture

The header is defined in `shared/header.html` and loaded into every page via `#fns-header-mount`.

```html
<!-- In shared/header.html -->
<div class="premium-topbar">
  <!-- Contact info, social links -->
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

### Footer Architecture

The footer is defined in `shared/footer.html` and loaded into every page via `#fld-footer-mount`.

```html
<!-- In shared/footer.html -->
<footer class="fld-commerce-footer">
  <!-- Footer grid: About, Services, Contact, Social -->
  <p>&copy; 2026 Furnostyles. All rights reserved.</p>
</footer>
```

### Page Integration

Every page must include:

```html
<!-- Mount points before </body> -->
<div id="fns-header-mount"></div>
<!-- ... page content ... -->
<div id="fld-footer-mount"></div>

<!-- Scripts before </body> -->
<script defer src="js/main.js"></script>
```

### Header/Footer Safety Rules

| Rule | Requirement |
|------|-------------|
| Never remove mount points from any page. | Components have nowhere to render. |
| Never change a mount point ID without updating `main.js`. | Loader references the ID to inject content. |
| Never add blocking synchronous loading. | Always use `fetch()` asynchronously. |
| Test header/footer changes on every page type. | Changes affect all pages. |
| Header/footer HTML lives in `shared/` only. | No inline header/footer code in pages. |
| Copyright uses `&copy;` entity. | Not (c) or "copyright" text. |

---

## 10. Future Sidebar Reintegration Strategy

**Not to be built yet.** Document only.

### Sidebar Principles

| Principle | Implementation |
|-----------|--------------|
| **Opt-in only** | Only pages with `.premium-layout--with-sidebar` get a sidebar |
| **No squeezing** | Pages without sidebar must not change layout |
| **No JS dependency** | Sidebar must work with CSS-only fallbacks |
| **Mobile-first** | Sidebar hidden on mobile; drawer pattern instead |

### How to Add Sidebar Later

```html
<!-- Opt-in page only -->
<div class="premium-layout premium-layout--with-sidebar">
  <aside class="premium-sidebar">...</aside>
  <main class="premium-main">...</main>
</div>
```

| File | Purpose |
|------|---------|
| `css/sidebar.css` | Sidebar styles only; loaded conditionally on sidebar pages |
| `js/sidebar.js` | Sidebar state (localStorage), accessibility handlers |
| Shared data file | Sidebar content (not hardcoded per page) |

### Sidebar Safety Rules

| Rule | Requirement |
|------|-------------|
| Sidebar CSS is never loaded on pages without sidebar. | Conditional `<link>` tag only. |
| Sidebar HTML is never added to pages that do not need it. | No empty `<aside>` tags. |
| Pages without sidebar must look identical to before. | Test every non-sidebar page after adding sidebar CSS. |
| Read `docs/future-sidebar-strategy.md` before implementing. | Full architecture documented there. |

---

## 11. Blog / Content System Overview

### Content Types

| Type | Template | Data Store | Example URL |
|------|----------|------------|-------------|
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
| Featured image size | 1200x630px for OG social sharing |
| Internal links per article | At least 3 to related articles |
| Heading hierarchy | One `<h1>`, logical `<h2>`-`<h3>` progression |
| Meta description | Unique, 150-160 characters |

---

## 12. SEO System Overview

### On-Page SEO (Every Page)

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

| Element | File | Requirement |
|---------|------|-------------|
| `robots.txt` | Project root | Allows all public pages; points to sitemap |
| `sitemap.xml` | Project root | Lists all HTTPS URLs with accurate `lastmod` |
| Structured data | In page | JSON-LD for Organization, LocalBusiness, Article |
| Semantic HTML | In every page | `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>` |
| Heading hierarchy | In every page | One `<h1>`, no skipped levels |
| Internal links | In content | Descriptive anchor text, minimum 3 per article |

### SEO Scaling by Phase

| Phase | SEO Activity |
|-------|--------------|
| Phase 1 | Foundation: meta tags, sitemap, semantic HTML |
| Phase 2 | Content expansion: 500+ pages, cornerstone articles, location SEO |
| Phase 3 | Advanced: breadcrumbs, structured data, internal linking architecture |
| Phase 4+ | Monitoring: Search Console, analytics, conversion tracking |

---

## 13. CSS Architecture Overview

### 5-Layer Architecture

| Layer | Location | Purpose |
|-------|----------|---------|
| **Design tokens** | `style.css` (top) | CSS variables for colours, fonts, spacing, breakpoints |
| **Reset/normalize** | `style.css` | Cross-browser consistency |
| **Layout** | `style.css` | `.premium-layout` grid, header, footer, main content |
| **Components** | `style.css` | `.fns-btn*`, `.fns-card*`, `.fns-form*`, navigation |
| **Utilities** | `style.css` (bottom) | Helper classes, text utilities |

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
| Never increase specificity unnecessarily. | Prefer `.fns-card` over nested selectors. |
| Never remove a CSS class used in any HTML file. | Search the project first. |
| Never change a CSS variable without checking all uses. | Variables are global. |
| Feature CSS must not redefine shared components. | Override with modifiers, not duplicates. |
| Document new CSS variables in architecture docs. | Future editors need to know what exists. |

---

## 14. JS Architecture Overview

### File Organization

| File | Purpose | Scope |
|------|---------|-------|
| `main.js` | Header/footer loading, navigation, cart counter, utilities | Every page |
| `navigation-data.js` | Navigation link store | Every page |
| `article-data.js` | Blog article metadata | Blog pages |
| `article-utils.js` | Related articles, search, listing render | Blog pages |
| `form-validation.js` | Validation engine, spam checks | All form pages |
| `firebase-bridge.js` | Firebase helpers | Future: all pages |
| `search.js` | Client-side search | Pages with search (future) |
| `filters.js` | Content filtering | Pages with filters (future) |

### Namespace Convention

All global functions and objects use the `Furnostyles.*` namespace.

```javascript
// Correct
Furnostyles.loadComponent = function() { ... };
Furnostyles.validateForm = function() { ... };

// Incorrect (pollutes global scope)
function loadComponent() { ... }
```

### JS Safety Rules

| Rule | Requirement |
|------|-------------|
| Read the full function before editing. | Understand inputs, outputs, side effects. |
| Adding a new global function? Namespace under `Furnostyles.*`. | Prevents naming collisions. |
| Modifying a shared function? Check all call sites first. | `loadComponent()` is called on every page. |
| Never delete a function without confirming no callers. | Search across the project. |
| Always handle errors in async functions. | Unhandled rejections break shared components. |
| Never add global event listeners without cleanup. | Memory leaks accumulate. |
| Feature JS must not redefine shared utilities. | Use shared utilities, do not duplicate. |

---

## 15. Forms and Lead System Overview

### Form System Components

| Component | File | Purpose |
|-----------|------|---------|
| Validation engine | `js/form-validation.js` | Field validation, honeypot, time check, rate limit |
| Form handler | `js/form-handler.js` | Submission logic, Firebase write, WhatsApp integration (future) |
| Form styles | `style.css` `.fns-form*` | Consistent form styling |

### Spam Prevention Layers

| Layer | Implementation |
|-------|--------------|
| **Honeypot field** | Hidden input bots fill but humans ignore |
| **Time-based check** | Reject submissions under 3 seconds |
| **Rate limiting** | Max 3 submissions per `sessionStorage` |
| **Simple math challenge** | "What is 3 + 5?" on high-traffic forms (future) |
| **reCAPTCHA v3** | Invisible scoring (future) |
| **Firebase App Check** | Device attestation (future) |

### Form Types

| Form | Fields | Destination (Future) |
|------|--------|----------------------|
| Contact form | Name, email, phone, message | Firestore `leads` collection |
| Quote request | Name, email, phone, service, budget, timeline | Firestore `leads` collection |
| Booking form | Name, email, phone, date, time, service | Firestore `leads` collection |
| Vendor application | Business name, email, description | Firestore `vendor-applications` |

### Form Safety Rules

| Rule | Requirement |
|------|-------------|
| All forms use client-side validation. | Immediate feedback. |
| All form data sanitized before storage. | Strip HTML tags, trim whitespace. |
| Honeypot fields present on every form. | Catches simple bots. |
| Time-based spam checks prevent rapid submissions. | Reject forms under 3 seconds. |
| Rate limiting prevents abuse. | Max 3 submissions per session. |
| HTTPS required for all form submissions. | Prevents man-in-the-middle attacks. |

---

## 16. Future Marketplace Expansion Plan

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

### Marketplace Expansion Safety Rules

| Rule | Requirement |
|------|-------------|
| Marketplace CSS loaded only on marketplace pages. | `css/marketplace.css` conditionally loaded. |
| Marketplace JS loaded only on marketplace pages. | `js/marketplace.js` conditionally loaded. |
| Shared components (header/footer) remain unchanged. | Marketplace uses same shared components. |
| Product data validated before storage. | Strict Firestore schema. |
| Vendor applications approved before public visibility. | Admin moderation workflow. |

---

## 17. Future Dashboard / Account Plan

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

## 18. Future Firebase Integration Points

**Not to be built yet.** Document only.

### Firebase Services

| Service | Purpose | Phase |
|---------|---------|-------|
| **Firebase Authentication** | User accounts | Phase 6 |
| **Cloud Firestore** | Product data, user data, orders, leads | Phase 4+ |
| **Firebase Cloud Functions** | Payment processing, email notifications | Phase 4+ |
| **Firebase Analytics** | App usage tracking | Phase 9 |
| **Firebase Hosting** | Only if Cloudflare Pages insufficient | Future |

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

## 19. Future Payment Integration Points

**Not to be built yet.** Document only.

### Payment Providers

| Provider | Method | Phase |
|----------|--------|-------|
| **M-Pesa** | STK push (Kenyan mobile payments) | Phase 7 |
| **Paystack** | Card payments, bank transfers | Phase 7 |
| **Stripe** | International card payments | Phase 7 |

### Payment Safety Rules

| Rule | Requirement |
|------|-------------|
| Never store credit card numbers, CVV codes, or PINs. | Use PCI-compliant processors. |
| All payment processing happens server-side or via secure provider SDK. | Client-side handling is not PCI-compliant. |
| Payment forms use HTTPS only. | Never transmit payment data over HTTP. |
| Webhooks from payment providers verified with signatures. | Prevents spoofed notifications. |
| Idempotency keys prevent duplicate charges. | Same request processes once. |
| Refund permissions restricted to admin roles. | Vendors cannot issue refunds without approval. |
| Test payments use sandbox/test keys, never production keys. | Prevents accidental real charges. |
| Display clear pricing in local currency (KES). | Transparency and trust. |
| Compliance with Kenyan financial regulations. | Consult legal counsel for tax and licensing. |

---

## 20. Performance and Optimization Principles

### Performance Budgets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance (mobile) | >= 90 | Chrome DevTools |
| Lighthouse Accessibility | = 100 | Chrome DevTools |
| Largest Contentful Paint (LCP) | < 2.5s | PageSpeed Insights |
| Cumulative Layout Shift (CLS) | < 0.1 | PageSpeed Insights |
| Total page weight (mobile) | < 1.5MB | Chrome DevTools |
| Total page weight (desktop) | < 2MB | Chrome DevTools |

### Optimization Strategies

| Strategy | Implementation |
|----------|--------------|
| **CSS optimization** | Minified, unused rules removed |
| **JS optimization** | Minified, deferred loading |
| **Image optimization** | WebP format, responsive srcset, lazy loading |
| **Font optimization** | Self-hosted, `font-display: swap` |
| **Lazy loading** | Images below the fold, non-critical JS |
| **CDN caching** | Cloudflare edge caching |
| **Code splitting** | Feature JS/CSS loaded only where needed |

### Performance Monitoring

| Frequency | Action |
|-----------|--------|
| Before every deployment | Lighthouse audit on all major page types |
| Monthly | Review Core Web Vitals in Google Search Console |
| Quarterly | Full performance audit |

---

## 21. Governance and Safety Rules

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
| New page type created | Add to `page-template-system.md` |
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

## 23. Testing Workflow Before Edits

Before making any edit, verify the current state of the system.

### Pre-Edit Testing Steps

```
1. Open the file you intend to edit.
   - Scroll through the entire file.
   - Note the structure, existing classes, and IDs.
   - Identify shared vs. page-specific code.

2. Search for references to the file or function.
   - If editing a CSS class, search all HTML files for that class.
   - If editing a JS function, search all JS files for calls to that function.
   - If editing a shared component, identify all pages that use it.

3. Check the relevant architecture document.
   - Read the section that covers the system you are editing.
   - Verify you understand the safety rules.

4. Create a snapshot of the project.
   - Copy the entire project folder.
   - Name it: furnostyles-YYYY-MM-DD-before-purpose.

5. Make the edit in the original folder.

6. Test the change locally.
   - Open the affected page(s) in a browser.
   - Check the console for errors.
   - Verify visual appearance.
   - Run Lighthouse audit if layout or performance affected.

7. If the change affects shared components, test on every page type.
   - Home, services, portfolio, blog, contact.
   - Mobile, tablet, desktop.

8. If tests pass, deploy. If tests fail, restore from snapshot.
```

---

## 24. Deployment Workflow Overview

### Pre-Deployment

- [ ] All changes saved in IDE.
- [ ] Local snapshot created.
- [ ] Local preview works correctly.
- [ ] Browser console shows zero errors.
- [ ] Lighthouse scores meet targets.

### Deployment Steps

```
1. Deploy to Cloudflare Pages preview URL.
2. Verify preview URL on all page types.
3. Verify on mobile and desktop.
4. Mark as production deploy.
5. Verify live site loads correctly.
6. Monitor for 30 minutes.
```

### Deployment Safety Rules

| Rule | Requirement |
|------|-------------|
| Never deploy during peak traffic hours. | Deploy during low-traffic periods. |
| Never deploy on Friday evening. | If something breaks, the team may not be available. |
| Always have a rollback plan. | Know the last working deploy ID or snapshot location. |
| Test the preview URL before production. | Never push directly to production without preview. |
| Do not delete old deploys immediately. | Keep the last 5 deploys for rollback. |
| Monitor the live site for 30 minutes after deployment. | Catch issues before users report them. |

---

## 25. Recommended Future Development Order

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

## 26. What Should Never Be Duplicated Again

These items caused the old architecture to fail. They must never be duplicated.

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

## 27. What Must Always Remain Centralized

Centralization ensures consistency. These items must never be duplicated across pages.

| Item | Central Location | Why Centralized |
|------|------------------|-----------------|
| **Design tokens** | `style.css` top section | One source of truth for colours, fonts, spacing |
| **Layout styles** | `style.css` | Every page uses the same grid and structure |
| **Button styles** | `style.css` `.fns-btn*` | Consistent buttons everywhere |
| **Card styles** | `style.css` `.fns-card*` | Consistent cards everywhere |
| **Form styles** | `style.css` `.fns-form*` | Consistent forms everywhere |
| **Navigation data** | `js/navigation-data.js` | One link store for the entire site |
| **Header HTML** | `shared/header.html` | One header for all pages |
| **Footer HTML** | `shared/footer.html` | One footer for all pages |
| **Form validation rules** | `js/form-validation.js` | One validation engine for all forms |
| **Spam detection** | `js/form-validation.js` | One honeypot/time-check logic for all forms |
| **Firebase config** | `shared/firebase/firebase-config.js` | One config for all Firebase features |
| **Article data** | `js/article-data.js` | One source for blog content metadata |
| **Shared utilities** | `js/main.js` or dedicated utility file | Reusable functions, not duplicated |

### Centralization Rules

| Rule | Requirement |
|------|-------------|
| If a pattern appears on more than 2 pages, centralize it. | Duplication breeds inconsistency. |
| If a style is used on more than 2 pages, put it in `style.css`. | Page-specific CSS is for exceptions only. |
| If a function is used on more than 2 pages, put it in a shared JS file. | Copy-paste code is a maintenance liability. |
| If data is referenced on more than 2 pages, put it in a shared data file. | Central data stores prevent drift. |
| Never create a second `style.css` or `main.js`. | Splitting the foundation creates confusion. |
| Never inline shared styles or scripts in individual pages. | Inline code is not cacheable and hard to maintain. |

---

## 28. Known Limitations / Current Unfinished Areas

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

## 29. Recommended Next Immediate Tasks

### Current Status: Phase 1 — Brand Foundation (In Progress)

Complete these tasks before moving to any other phase.

- [ ] Build `services/index.html` and all individual service pages.
- [ ] Build `repairs/index.html` and all individual repair pages.
- [ ] Build `portfolio/index.html` and all project detail pages.
- [ ] Build `blogs/index.html` and all article pages.
- [ ] Build `contact.html` with fully functional contact form.
- [ ] Add all new pages to `js/navigation-data.js`.
- [ ] Create `sitemap.xml` listing all pages.
- [ ] Create `robots.txt` allowing all public pages.
- [ ] Create `_headers` for Cloudflare Pages cache and security headers.
- [ ] Optimize and upload all required images to `assets/images/`.
- [ ] Test every page on mobile, tablet, and desktop.
- [ ] Run Lighthouse audit on all pages (performance >= 90, accessibility = 100).
- [ ] Verify all internal links work.
- [ ] Verify no console errors on any page.
- [ ] Verify no placeholder text on any public page.

### After Phase 1 Is Complete

The next phase is **Phase 2: SEO & Content Expansion**.

Read `docs/master-development-roadmap.md` for full Phase 2 details.

---

## 30. Quick Onboarding Instructions for a New Developer or AI Session

### Step 1: Read This Document

Read all 30 sections of this document before touching any code.

### Step 2: Read the Architecture Documents

Read these in order:

1. `docs/platform-architecture-summary.md` — Master overview
2. `docs/page-template-system.md` — How to build a new page
3. `docs/navigation-and-routing-system.md` — How URLs and navigation work
4. `docs/forms-and-lead-system.md` — How forms work
5. `docs/security-and-project-safety.md` — Safety rules for editing
6. `docs/performance-and-optimization-system.md` — Performance requirements

### Step 3: Understand the Master Template

Open `index.html` and study:

- `<head>` structure (copy this exactly for every new page)
- `.premium-layout` > `.premium-main` structure
- Header and footer mount points
- Script loading order
- Floating elements (cart, chat)

### Step 4: Understand the Shared Systems

Open and review:

- `shared/header.html` — What the header contains
- `shared/footer.html` — What the footer contains
- `css/style.css` — Design tokens, layout, components, utilities
- `js/main.js` — How shared components load
- `js/navigation-data.js` — How navigation is structured
- `js/form-validation.js` — How forms validate

### Step 5: Understand the Folder Rules

| Folder | Contains |
|--------|----------|
| `css/` | Stylesheets only |
| `js/` | JavaScript only |
| `assets/` | Static assets only (images, fonts, favicon) |
| `shared/` | Reusable components only (header, footer, firebase, uploads) |
| `docs/` | Documentation only |
| Page folders (`services/`, `blogs/`, etc.) | HTML only |

### Step 6: Before Making Any Change

1. Read the relevant architecture document.
2. Create a snapshot of the project folder.
3. Identify if the change affects shared components.
4. Test locally after making the change.
5. Deploy via preview URL before production.

### Step 7: Ask for Help

If you are unsure about any change:

- Read the relevant `docs/` file first.
- Check `docs/security-and-project-safety.md` for safety rules.
- Check `docs/master-development-roadmap.md` for phase requirements.
- When in doubt, do not make the change without clarification.

---

## Document Summary

| # | Section | Purpose |
|---|---------|---------|
| 1 | Current project status | What exists now, what does not, current phase. |
| 2 | Completed systems | Architecture documents and code systems that are complete. |
| 3 | Shared reusable systems | Header, footer, CSS layers, JS files, assets. |
| 4 | Current clean architecture principles | 10 principles that guide all development. |
| 5 | Why the old site architecture failed | 13 problems and the lessons learned from each. |
| 6 | What was intentionally rebuilt | Specific before/after comparisons of the rebuild. |
| 7 | Current folder structure overview | Complete folder tree with rules. |
| 8 | Shared component system overview | How dynamic component loading works and why. |
| 9 | Footer/header reusable architecture | Header/footer structure, loading mechanism, safety rules. |
| 10 | Future sidebar reintegration strategy | Opt-in sidebar with conditional loading and safety rules. |
| 11 | Blog/content system overview | Content types, data store, scaling strategy, quality standards. |
| 12 | SEO system overview | On-page, technical, and scaling SEO strategy. |
| 13 | CSS architecture overview | 5-layer system, naming conventions, safety rules. |
| 14 | JS architecture overview | File organization, namespace convention, safety rules. |
| 15 | Forms and lead system overview | Validation engine, spam prevention, form types, safety rules. |
| 16 | Future marketplace expansion plan | Structure, data model, conditional loading, safety rules. |
| 17 | Future dashboard/account plan | Account types, auth strategy, dashboard architecture. |
| 18 | Future Firebase integration points | Services by phase, config example, safety rules. |
| 19 | Future payment integration points | Providers, safety rules, compliance. |
| 20 | Performance and optimization principles | Budgets, strategies, monitoring schedule. |
| 21 | Governance and safety rules | Decision authority, documentation triggers, code quality. |
| 22 | AI-safe editing workflow | Pre-edit steps, danger zone, safe editing checklist. |
| 23 | Testing workflow before edits | 8-step pre-edit testing process. |
| 24 | Deployment workflow overview | Pre-deployment, deployment, safety rules. |
| 25 | Recommended future development order | 10-phase roadmap with dependency rules. |
| 26 | What should never be duplicated again | 14 items that caused past failures. |
| 27 | What must always remain centralized | 13 centralized items with locations and rationale. |
| 28 | Known limitations/current unfinished areas | Technical, feature, and content limitations by phase. |
| 29 | Recommended next immediate tasks | 15-item Phase 1 completion checklist. |
| 30 | Quick onboarding instructions | 7-step onboarding for new developers and AI sessions. |

**This document must be read before any code change, feature addition, or AI-assisted edit to the Furnostyles platform.**
