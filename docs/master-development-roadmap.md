# Furnostyles Master Development Roadmap

**Date:** 2026-05-22 | **Status:** Planning | **Target:** 500+ page premium platform

---

## Overview

This roadmap transforms the Furnostyles clean rebuild into a full premium digital platform — safely, in the correct order, and without breaking what already works.

### Roadmap Principles

| Principle | Meaning |
|-----------|---------|
| **Build in phases** | Each phase completes before the next begins. No skipping. |
| **Stabilize before expanding** | Every phase must be stable and tested before adding the next layer. |
| **Centralize by default** | Shared patterns live in one place; duplication is forbidden. |
| **Document as you build** | Architecture docs are updated with every phase. |
| **Test before deploying** | Every phase has a testing gate before it goes live. |
| **Preserve static hosting** | Cloudflare Pages compatibility is maintained until a phase explicitly requires dynamic infrastructure. |

### Phase Summary

| Phase | Name | Core Deliverable | Static Hosting Compatible |
|-------|------|----------------|--------------------------|
| 1 | Brand Foundation | Complete public site with all core pages | Yes |
| 2 | SEO & Content Expansion | 500+ pages of optimized content | Yes |
| 3 | Advanced UX | Sidebar, mega-nav, search, filters | Yes |
| 4 | Service Request System | Quotes, bookings, inquiry tracking | Partial (Firebase) |
| 5 | Marketplace Foundation | Product listings, categories, sourcing | Partial (Firebase) |
| 6 | Accounts & Dashboards | Client/vendor/admin accounts | No (requires backend) |
| 7 | Payments & Commerce | Cart, checkout, M-Pesa, orders | No (requires backend) |
| 8 | Real Estate Expansion | Property listings, dashboards | No (requires backend) |
| 9 | Platform Scaling | CDN, analytics, AI, automation | No (requires backend) |
| 10 | Future Ecosystem | Mobile app, API, SaaS | No (requires backend) |

---

## PHASE 1 — Brand Foundation

**Goal:** Build the complete public-facing Furnostyles site with all core pages, shared components, and a reusable layout system.

### 1.1 Goals

| # | Goal | Deliverable |
|---|------|-------------|
| 1 | Homepage | `index.html` with hero, services preview, portfolio preview, blog preview, CTA |
| 2 | Services section | `services/index.html` + individual service pages (interior design, repairs, etc.) |
| 3 | Repairs section | `repairs/index.html` + repair service pages |
| 4 | Portfolio section | `portfolio/index.html` + project detail pages |
| 5 | Blog section | `blogs/index.html` + individual article pages |
| 6 | Contact page | `contact.html` with full contact form |
| 7 | Reusable layout system | `style.css`, `main.js`, shared header/footer, consistent page template |
| 8 | Navigation system | Centralized `navigation-data.js`, working header nav, footer nav, mobile menu |
| 9 | SEO foundation | Meta tags, canonical URLs, OG images, structured data, sitemap |
| 10 | Performance baseline | Lighthouse 90+ mobile, Core Web Vitals pass, <1.5MB mobile pages |

### 1.2 Recommended Order

```
1. Finalize index.html as the master template
   |
   v
2. Build shared header.html and footer.html
   |
   v
3. Build shared CSS (style.css) with all design tokens and components
   |
   v
4. Build shared JS (main.js) with component loader and navigation
   |
   v
5. Create navigation-data.js with all links
   |
   v
6. Build services/index.html and individual service pages
   |
   v
7. Build repairs/index.html and individual repair pages
   |
   v
8. Build portfolio/index.html and project detail pages
   |
   v
9. Build blogs/index.html and article pages
   |
   v
10. Build contact.html with full form
   |
   v
11. Generate sitemap.xml and robots.txt
   |
   v
12. Run full testing checklist
   |
   v
13. Deploy Phase 1
```

### 1.3 Dependencies

| Dependency | Source | Why Needed |
|------------|--------|------------|
| Clean rebuild project structure | Already exists | Foundation folder layout |
| `docs/page-template-system.md` | Already exists | Page structure rules |
| `docs/navigation-and-routing-system.md` | Already exists | URL and nav rules |
| `docs/forms-and-lead-system.md` | Already exists | Form structure and validation |
| `docs/performance-and-optimization-system.md` | Already exists | Performance budgets |
| `docs/security-and-project-safety.md` | Already exists | Safety rules |
| Content (text, images) | Team provides | Page content |

### 1.4 Risks to Avoid

| Risk | Prevention |
|------|------------|
| Inconsistent page layouts | Use `index.html` as the only template; copy, never reinvent |
| Broken internal links | Add every new page to `navigation-data.js` and test all links |
| Missing meta tags | Copy `<head>` structure exactly from `index.html` |
| Unoptimized images | Compress, resize, and convert to WebP before upload |
| Forms without validation | Use `form-validation.js` for every form; do not build custom |
| Layout shifts | Add `width` and `height` to every image |
| Blocking scripts | All scripts use `defer`; no exceptions |

### 1.5 What Should Remain Centralized

| Item | Location |
|------|----------|
| Design tokens | `style.css` |
| Layout styles | `style.css` |
| Button, card, form styles | `style.css` |
| Header HTML | `shared/header.html` |
| Footer HTML | `shared/footer.html` |
| Navigation data | `js/navigation-data.js` |
| Form validation | `js/form-validation.js` |
| Shared utilities | `js/main.js` |
| Page template structure | `docs/page-template-system.md` |

### 1.6 What Should Never Be Duplicated

| Item | Why |
|------|-----|
| `<head>` structure | Copy from `index.html`; never rewrite from memory |
| Layout grid CSS | One `.premium-layout` system for all pages |
| Header/footer code | Loaded dynamically from shared files |
| Navigation links | Centralized in `navigation-data.js` |
| Form validation logic | One engine handles all forms |
| Button styles | `.fns-btn*` classes in `style.css` |
| Colour/spacing values | CSS variables in `style.css` |

### 1.7 Testing Requirements

| Test | How | Pass Criteria |
|------|-----|---------------|
| Lighthouse performance | Chrome DevTools | >= 90 on mobile |
| Lighthouse accessibility | Chrome DevTools | = 100 |
| Core Web Vitals | PageSpeed Insights | LCP < 2.5s, CLS < 0.1 |
| Internal links | Manual click-through | No 404s |
| Responsive design | DevTools + real devices | Works on mobile, tablet, desktop |
| Form validation | Manual testing | All required fields validate |
| SEO meta tags | View page source | Title, description, canonical, OG present |
| Sitemap | Submit to Google Search Console | All pages indexed |

### 1.8 Deployment Checkpoints

| Checkpoint | Verification |
|------------|--------------|
| All core pages exist and render correctly | Visual check on all page types |
| Shared components load on every page | Header and footer visible everywhere |
| Navigation works on every page | All internal links functional |
| Forms validate and submit correctly | Test every form type |
| Lighthouse scores meet targets | Performance >= 90, accessibility = 100 |
| Mobile experience is acceptable | Test on real mobile device |
| No console errors | Browser console clean |

---

## PHASE 2 — SEO & Content Expansion

**Goal:** Scale from a 10-page site to a 500+ page content platform with optimized articles, category pages, and location-specific SEO.

### 2.1 Goals

| # | Goal | Deliverable |
|---|------|-------------|
| 1 | Cornerstone articles | 20+ long-form pillar articles (2000+ words) covering interior design topics |
| 2 | Category pages | Blog categories, service categories, portfolio categories |
| 3 | Internal linking architecture | Every article links to 3-5 related articles; breadcrumb navigation |
| 4 | Media optimization | All images WebP with JPEG fallback; lazy loading; responsive srcset |
| 5 | Location SEO | Pages for "Interior Design in [Nairobi neighbourhood]", "Furniture in [city]" |
| 6 | Content scaling workflow | Reusable article template; content brief system; editorial calendar |
| 7 | Structured data | JSON-LD for articles, services, local business, breadcrumbs |
| 8 | XML sitemap automation | Sitemap updates automatically when new pages are added |
| 9 | Search-friendly URLs | Semantic URLs: `/blogs/modern-living-room-ideas.html` |
| 10 | Content freshness system | Quarterly content audits; update old articles with new information |

### 2.2 Recommended Order

```
1. Create reusable article page template
   |
   v
2. Create reusable category page template
   |
   v
3. Create content brief template (for writers)
   |
   v
4. Write and publish first 5 cornerstone articles
   |
   v
5. Build category index pages (blogs, services, portfolio)
   |
   v
6. Implement breadcrumb navigation on all pages
   |
   v
7. Add JSON-LD structured data to all page types
   |
   v
8. Create location-specific landing pages (Nairobi neighbourhoods, Kenyan cities)
   |
   v
9. Implement internal linking strategy (related articles, prev/next)
   |
   v
10. Set up editorial calendar and content scaling workflow
   |
   v
11. Generate updated sitemap.xml
   |
   v
12. Submit updated sitemap to search engines
   |
   v
13. Run full testing checklist
   |
   v
14. Deploy Phase 2
```

### 2.3 Dependencies

| Dependency | Source | Phase Needed |
|------------|--------|--------------|
| Phase 1 complete | Previous phase | All pages must exist before adding content |
| Article page template | Phase 2 | Reusable template for all articles |
| Category page template | Phase 2 | Reusable template for all categories |
| Content writers | External | Articles need to be written |
| Image assets | Team/photographer | Articles need photographs |
| Keyword research | SEO team | Location pages need target keywords |

### 2.4 Risks to Avoid

| Risk | Prevention |
|------|------------|
| Thin content (low-word-count pages) | Minimum 800 words for articles; minimum 300 for location pages |
| Duplicate content | Canonical URLs; no copying articles between pages |
| Keyword stuffing | Write for humans first, search engines second |
| Broken links in articles | Link checker run before every deploy |
| Unoptimized images | Compress and convert all article images before upload |
| Missing structured data | Validate with Google's Rich Results Test |
| URL changes breaking links | Use 301 redirects in `_redirects` file |

### 2.5 What Should Remain Centralized

| Item | Location |
|------|----------|
| Article template | `docs/page-template-system.md` |
| Article CSS | `css/blog.css` |
| Article data | `js/article-data.js` |
| Category CSS | `css/blog.css` |
| Breadcrumb component | `js/main.js` |
| Structured data patterns | `docs/page-template-system.md` |
| Sitemap generation logic | `js/sitemap-generator.js` (future) |

### 2.6 What Should Never Be Duplicated

| Item | Why |
|------|-----|
| Article HTML structure | Use the reusable template; never hand-code each article differently |
| Category page structure | One template handles all categories |
| Breadcrumb logic | One function generates breadcrumbs for all pages |
| Structured data patterns | One JSON-LD template per page type |
| OG image dimensions | All OG images 1200x630px |

### 2.7 Testing Requirements

| Test | How | Pass Criteria |
|------|-----|---------------|
| Article pages render correctly | Visual check | Consistent layout, images load, text readable |
| Category pages list content correctly | Visual check | Pagination works, cards display properly |
| Breadcrumbs show correct path | Manual check | Every page shows accurate breadcrumb |
| Structured data validates | Google Rich Results Test | No errors, all required fields present |
| Internal links work | Link checker | Zero broken internal links |
| Sitemap is complete | XML validator | All pages listed, proper format |
| Location pages rank locally | Google Search Console | Indexed and receiving impressions |

### 2.8 Deployment Checkpoints

| Checkpoint | Verification |
|------------|--------------|
| First 5 cornerstone articles published | Live and indexed |
| Category pages functional | All categories have working index pages |
| Breadcrumbs on all pages | Visual verification |
| Structured data validated | Google Rich Results Test pass |
| Sitemap submitted to Google | Search Console confirmation |
| Location pages live | At least 10 neighbourhood/city pages published |
| Content workflow documented | Writers can follow the content brief template |

---

## PHASE 3 — Advanced UX

**Goal:** Add premium user experience features: sidebar navigation, mega menus, search, filters, and polished animations.

### 3.1 Goals

| # | Goal | Deliverable |
|------|------|-------------|
| 1 | Reusable sidebar | Opt-in sidebar for selected pages; mobile drawer; CSS-only fallback |
| 2 | Mega navigation | Multi-column dropdown menus for services and portfolio categories |
| 3 | Search system | Client-side search of `article-data.js`; search results page |
| 4 | Filters | Portfolio filter by room type, style, budget; blog filter by category |
| 5 | Improved animations | CSS-only transitions; `prefers-reduced-motion` support; 60fps on mobile |
| 6 | Accessibility improvements | ARIA live regions, skip links, focus trapping in modals, keyboard navigation |
| 7 | Scroll-based effects | Gentle parallax on hero images; sticky navigation; reading progress bar |
| 8 | Loading states | Skeleton screens for async content; loading spinners for forms |
| 9 | Toast notifications | Success/error toasts for form submissions and cart actions |
| 10 | Offline-friendly | Service Worker (future) for caching; offline page fallback |

### 3.2 Recommended Order

```
1. Read docs/future-sidebar-strategy.md
   |
   v
2. Build sidebar CSS (css/sidebar.css) without affecting existing pages
   |
   v
3. Build sidebar JS with localStorage state and accessibility
   |
   v
4. Add sidebar to one test page first
   |
   v
5. Build mega navigation CSS and JS
   |
   v
6. Add mega nav to header on desktop
   |
   v
7. Build client-side search component
   |
   v
8. Create search results page template
   |
   v
9. Build portfolio filter system
   |
   v
10. Build blog filter system
   |
   v
11. Add CSS animations (card hover, button press, fade-ins)
   |
   v
12. Add accessibility enhancements (skip links, ARIA, focus management)
   |
   v
13. Test everything on mobile, tablet, desktop
   |
   v
14. Run full testing checklist
   |
   v
15. Deploy Phase 3
```

### 3.3 Dependencies

| Dependency | Source | Phase Needed |
|------------|--------|--------------|
| Phase 1 complete | Previous phase | Layout and pages must exist |
| Phase 2 complete | Previous phase | Content must exist for search and filters |
| `docs/future-sidebar-strategy.md` | Already exists | Sidebar architecture guide |
| `docs/performance-and-optimization-system.md` | Already exists | Animation performance rules |
| `docs/security-and-project-safety.md` | Already exists | UX change safety rules |

### 3.4 Risks to Avoid

| Risk | Prevention |
|------|------------|
| Sidebar breaking existing pages | Opt-in only; test every page type before adding sidebar |
| Mega nav blocking content | Close on outside click; Escape key closes; do not auto-open |
| Search being slow | Client-side search of `article-data.js` only; server search comes later |
| Animations hurting performance | Animate only `transform` and `opacity`; test on low-end devices |
| Accessibility regressions | Run axe/WAVE after every UX change |
| Layout shifts from new components | Reserve space; add explicit dimensions |
| JavaScript bloat | Feature JS is loaded only on pages that need it |

### 3.5 What Should Remain Centralized

| Item | Location |
|------|----------|
| Sidebar CSS | `css/sidebar.css` |
| Sidebar JS | `js/sidebar.js` |
| Sidebar data | Shared data file |
| Mega nav CSS | `style.css` |
| Mega nav data | `js/navigation-data.js` |
| Search logic | `js/search.js` |
| Filter logic | `js/filters.js` |
| Animation CSS | `style.css` |
| Accessibility utilities | `js/main.js` |

### 3.6 What Should Never Be Duplicated

| Item | Why |
|------|-----|
| Sidebar HTML | One shared component, loaded dynamically |
| Mega nav HTML | One shared component in header |
| Search input component | One search bar, shared across pages |
| Filter logic | One engine handles portfolio and blog filters |
| Animation keyframes | Define once in `style.css`; reuse with classes |
| Focus trap logic | One utility function for all modals/overlays |

### 3.7 Testing Requirements

| Test | How | Pass Criteria |
|------|-----|---------------|
| Sidebar works on opt-in pages | Manual check | Opens, closes, state persists, accessible |
| Sidebar does not affect non-sidebar pages | Visual check | Layout identical to Phase 1 |
| Mega nav opens and closes correctly | Manual check | Hover/click to open, click outside to close, Escape to close |
| Search returns relevant results | Manual check | Results ranked by relevance; no empty results for common queries |
| Filters update results correctly | Manual check | Selecting a filter shows only matching items |
| Animations are smooth | DevTools Performance | 60fps on desktop, no jank on mobile |
| Accessibility passes | axe + WAVE | Zero errors after UX changes |
| Keyboard navigation works | Tab through entire page | All interactive elements reachable |

### 3.8 Deployment Checkpoints

| Checkpoint | Verification |
|------------|--------------|
| Sidebar tested on at least 3 page types | Home, blog, portfolio |
| Mega nav functional on desktop | All dropdowns open and close correctly |
| Search returns results from article data | Search page displays relevant articles |
| Portfolio filters work | Filter by room, style, budget |
| Animations smooth on low-end mobile | Test on budget Android device |
| Accessibility scan passes | axe and WAVE zero errors |
| No console errors | Browser console clean |

---

## PHASE 4 — Service Request System

**Goal:** Enable clients to request quotes, book consultations, and track inquiries through integrated forms, WhatsApp, and a future CRM.

### 4.1 Goals

| # | Goal | Deliverable |
|---|------|-------------|
| 1 | Quote request forms | Service-specific quote forms with budget, timeline, property details |
| 2 | Booking forms | Appointment scheduling with date/time preferences |
| 3 | Inquiry tracking | Firebase Firestore stores all submissions with status |
| 4 | WhatsApp integration | Pre-filled WhatsApp messages from form data; WhatsApp Business API (future) |
| 5 | Lead pipeline | Status tracking: new -> contacted -> qualified -> quoted -> accepted |
| 6 | Auto-reply emails | Confirmation emails to users; notification emails to team (future) |
| 7 | Team assignment | Leads assigned to team members in the CRM |
| 8 | Follow-up reminders | Automated reminders for uncontacted leads (future) |
| 9 | Client portal foundation | Simple page where clients can view their inquiry status (future) |
| 10 | Analytics dashboard | Track form conversion rates, lead sources, response times (future) |

### 4.2 Recommended Order

```
1. Integrate Firebase (firestore) for form submissions
   |
   v
2. Update form validation to write to Firestore
   |
   v
3. Build quote request forms for each service
   |
   v
4. Build booking/appointment forms
   |
   v
5. Add WhatsApp pre-fill links to all forms
   |
   v
6. Build simple lead status viewer (admin-only, password-protected)
   |
   v
7. Set up Firebase Cloud Functions for email notifications (future)
   |
   v
8. Build team assignment workflow (future)
   |
   v
9. Add follow-up automation (future)
   |
   v
10. Test all form types end-to-end
   |
   v
11. Deploy Phase 4
```

### 4.3 Dependencies

| Dependency | Source | Phase Needed |
|------------|--------|--------------|
| Phase 1 complete | Previous phase | Forms and pages must exist |
| Firebase project | Firebase Console | Backend for form storage |
| `docs/forms-and-lead-system.md` | Already exists | Form architecture guide |
| Email service | SendGrid/Mailgun (future) | Team notification emails |
| WhatsApp Business API | Meta (future) | Automated WhatsApp messages |

### 4.4 Risks to Avoid

| Risk | Prevention |
|------|------------|
| Form data lost | Firebase Firestore with offline persistence enabled |
| Spam submissions | Honeypot + time check + rate limiting + Firebase security rules |
| Sensitive data exposed | Firestore rules restrict reads to authenticated admin users |
| Broken forms after Firebase integration | Test every form type after adding Firebase write |
| Client confusion about status | Clear status labels and next-step messages |
| Team missing leads | Real-time Firebase listeners + email notifications |

### 4.5 What Should Remain Centralized

| Item | Location |
|------|----------|
| Form validation engine | `js/form-validation.js` |
| Form submission handler | `js/form-handler.js` |
| Firebase config | `shared/firebase/firebase-config.js` |
| Firestore security rules | Firebase Console + documented in architecture |
| Lead data model | `docs/forms-and-lead-system.md` |
| Spam detection | `js/form-validation.js` |
| WhatsApp link generator | `js/form-handler.js` |

### 4.6 What Should Never Be Duplicated

| Item | Why |
|------|-----|
| Form submission logic | One handler writes to Firebase for all form types |
| Firebase initialization | One `firebase.initializeApp()` call |
| Lead status definitions | One enum: `new`, `contacted`, `qualified`, `quoted`, `accepted` |
| Spam prevention code | One `isSpamSubmission()` function |
| Email template structure | One template for team notifications, one for client auto-replies |

### 4.7 Testing Requirements

| Test | How | Pass Criteria |
|------|-----|---------------|
| Forms submit to Firestore | Firebase Console | Submissions appear in `leads` collection |
| Form validation still works | Manual check | All validation rules fire before submission |
| Spam prevention works | Automated test | Honeypot, time check, rate limit all functional |
| WhatsApp links pre-fill correctly | Click test | WhatsApp opens with correct message text |
| Firestore security rules block unauthorized reads | Manual test | Unauthenticated users cannot read leads |
| Lead status updates correctly | Admin viewer | Status changes persist in Firestore |
| Email notifications sent (future) | Inbox check | Team receives new lead alert |

### 4.8 Deployment Checkpoints

| Checkpoint | Verification |
|------------|--------------|
| All form types submit to Firestore | Firebase Console shows submissions |
| Spam prevention active | Honeypot and rate limiting tested |
| Security rules restrict access | Only admin can view leads |
| WhatsApp integration works | Pre-filled message opens correctly |
| Admin viewer functional | Team can see and update lead status |
| No regressions in existing forms | Contact form still works as before |

---

## PHASE 5 — Marketplace Foundation

**Goal:** Build the core marketplace infrastructure: product listings, categories, product detail pages, and vendor sourcing pages.

### 5.1 Goals

| # | Goal | Deliverable |
|---|------|-------------|
| 1 | Marketplace homepage | `marketplace/index.html` with featured products, categories, search |
| 2 | Category pages | `marketplace/categories/furniture.html`, `lighting.html`, etc. |
| 3 | Product cards | Reusable card component with image, title, price, vendor, rating |
| 4 | Product detail pages | `marketplace/products/product-slug.html` with gallery, specs, vendor info |
| 5 | Vendor sourcing pages | Information for vendors on how to join and list products |
| 6 | Product search | Search by name, category, price range, vendor |
| 7 | Product filters | Filter by category, price, rating, availability |
| 8 | Wishlist/saved items | Client can save products for later (requires accounts — Phase 6) |
| 9 | Product data store | Firebase Firestore collection for products, vendors, categories |
| 10 | Vendor application form | Multi-step form for vendors to apply (stored in Firestore) |

### 5.2 Recommended Order

```
1. Design marketplace page templates (homepage, category, product detail)
   |
   v
2. Build marketplace CSS (css/marketplace.css) — feature-specific only
   |
   v
3. Build marketplace homepage with static product data
   |
   v
4. Build category page template
   |
   v
5. Build product card component
   |
   v
6. Build product detail page template
   |
   v
7. Create product data structure in Firestore
   |
   v
8. Load product data dynamically from Firestore
   |
   v
9. Build product search and filters
   |
   v
10. Build vendor sourcing/information pages
   |
   v
11. Build vendor application form
   |
   v
12. Test marketplace on mobile and desktop
   |
   v
13. Deploy Phase 5
```

### 5.3 Dependencies

| Dependency | Source | Phase Needed |
|------------|--------|--------------|
| Phase 1 complete | Previous phase | Layout and shared components |
| Phase 3 complete | Previous phase | Search and filter systems |
| Phase 4 complete | Previous phase | Firebase integration, forms |
| Firebase Firestore | Firebase Console | Product and vendor data storage |
| Product images | Vendors/team | Product photographs |
| Vendor information | Vendors | Vendor profiles and product details |

### 5.4 Risks to Avoid

| Risk | Prevention |
|------|------------|
| Marketplace breaking existing pages | Marketplace is a separate section; shared components remain unchanged |
| Product data inconsistency | Strict Firestore schema; validate all writes |
| Vendor data quality issues | Admin approval required before products appear publicly |
| Search being slow on large catalogs | Client-side pagination; server-side search for 1000+ products (future) |
| Images slowing page load | Product thumbnails max 200x200px; lazy load all images |
| Duplicate product listings | Unique SKU or product ID for every item |
| Marketplace CSS leaking to other pages | `css/marketplace.css` loaded only on marketplace pages |

### 5.5 What Should Remain Centralized

| Item | Location |
|------|----------|
| Layout system | `style.css` (`.premium-layout`) |
| Header/footer | `shared/header.html`, `shared/footer.html` |
| Navigation data | `js/navigation-data.js` |
| Product card component CSS | `css/marketplace.css` |
| Product data model | Firestore + documented in architecture |
| Search logic | `js/search.js` (extended for products) |
| Filter logic | `js/filters.js` (extended for products) |
| Firebase config | `shared/firebase/firebase-config.js` |

### 5.6 What Should Never Be Duplicated

| Item | Why |
|------|-----|
| Product card HTML | One reusable card component |
| Category page structure | One template for all categories |
| Product detail page structure | One template for all products |
| Firebase product read logic | One function fetches products with filters |
| Vendor profile structure | One template for all vendor pages |

### 5.7 Testing Requirements

| Test | How | Pass Criteria |
|------|-----|---------------|
| Marketplace homepage renders | Visual check | Products display in grid, categories visible |
| Category pages list products | Visual check | Correct products appear per category |
| Product detail pages load | Visual check | Gallery, specs, vendor info display |
| Product search works | Manual check | Returns relevant products |
| Product filters work | Manual check | Price, category, rating filters functional |
| Mobile marketplace is usable | Real mobile device | Touch targets >= 44px, no horizontal scroll |
| Firebase product reads are secure | Manual test | Unauthenticated users can only read public fields |
| Vendor application form submits | Manual check | Application stored in Firestore |

### 5.8 Deployment Checkpoints

| Checkpoint | Verification |
|------------|--------------|
| Marketplace homepage live | Products and categories visible |
| At least 3 category pages live | Furniture, lighting, decor |
| At least 10 product detail pages live | Real product data |
| Search and filters functional | Manual testing |
| Vendor sourcing page live | Information for potential vendors |
| Vendor application form functional | Submissions stored in Firestore |
| No regressions on existing pages | Home, blog, portfolio still work correctly |

---

## PHASE 6 — Accounts & Dashboards

**Goal:** Build the account system that enables clients, vendors, and admins to manage their profiles, projects, products, and platform settings.

### 6.1 Goals

| # | Goal | Deliverable |
|---|------|-------------|
| 1 | Client registration | Email/password sign-up with email verification |
| 2 | Client login | Secure authentication with Firebase Auth |
| 3 | Client profile | Name, phone, address, saved projects, order history |
| 4 | Client dashboard | View inquiries, saved products, appointments, project status |
| 5 | Vendor registration | Application flow with business verification |
| 6 | Vendor login | Separate auth flow for approved vendors |
| 7 | Vendor profile | Business name, description, logo, product listings |
| 8 | Vendor dashboard | Manage products, view orders, track payouts, analytics |
| 9 | Admin system | Manage users, approve vendors, moderate content, view analytics |
| 10 | Notifications | In-app and email notifications for orders, messages, approvals |

### 6.2 Recommended Order

```
1. Set up Firebase Authentication
   |
   v
2. Build client registration and login pages
   |
   v
3. Build client profile page
   |
   v
4. Build client dashboard (inquiries, saved items, appointments)
   |
   v
5. Build vendor application form and approval workflow
   |
   v
6. Build vendor registration and login
   |
   v
7. Build vendor profile page
   |
   v
8. Build vendor dashboard (products, orders, analytics)
   |
   v
9. Build admin login and dashboard
   |
   v
10. Build user management (view, edit, suspend users)
   |
   v
11. Build vendor approval workflow
   |
   v
12. Build notification system
   |
   v
13. Test all account flows end-to-end
   |
   v
14. Deploy Phase 6
```

### 6.3 Dependencies

| Dependency | Source | Phase Needed |
|------------|--------|--------------|
| Phase 4 complete | Previous phase | Firebase integration, forms |
| Phase 5 complete | Previous phase | Marketplace, vendor system |
| Firebase Authentication | Firebase Console | User accounts |
| Firebase Firestore | Firebase Console | User data, profiles |
| `docs/security-and-project-safety.md` | Already exists | Auth security rules |
| Email service | SendGrid/Mailgun | Verification and notification emails |

### 6.4 Risks to Avoid

| Risk | Prevention |
|------|------------|
| Weak authentication | Firebase Auth enforces password complexity; enable MFA for admins |
| Data leakage between users | Firestore security rules isolate user data by UID |
| Vendor approval bypass | Admin approval required; no automatic vendor activation |
| Session hijacking | Short session tokens; secure cookies; HTTPS only |
| Admin account compromise | MFA mandatory for admin accounts |
| Notification spam | Rate limiting on notifications; user preferences for email frequency |
| Dashboard performance issues | Pagination for large data sets; lazy load widgets |

### 6.5 What Should Remain Centralized

| Item | Location |
|------|----------|
| Authentication logic | Firebase Auth + `js/auth.js` |
| User data model | Firestore + documented in architecture |
| Role definitions | Firestore + security rules |
| Dashboard layout | `css/dashboard.css` |
| Notification system | `js/notifications.js` |
| Firebase config | `shared/firebase/firebase-config.js` |

### 6.6 What Should Never Be Duplicated

| Item | Why |
|------|-----|
| Auth state management | One `onAuthStateChanged` listener |
| Login form | One component for client and vendor (role determined after login) |
| User profile structure | One data model for all user types |
| Dashboard navigation | One sidebar nav for all dashboards |
| Notification logic | One system sends all notifications |

### 6.7 Testing Requirements

| Test | How | Pass Criteria |
|------|-----|---------------|
| Registration creates user in Firebase Auth | Firebase Console | User appears with correct email |
| Email verification sent | Inbox check | Verification email received |
| Login redirects to correct dashboard | Manual check | Client -> client dashboard; vendor -> vendor dashboard |
| Profile updates persist | Manual check | Changes saved to Firestore |
| Firestore rules isolate data | Manual test | User A cannot read User B's data |
| Admin can suspend users | Admin dashboard | Suspended user cannot log in |
| Vendor approval workflow works | Admin dashboard | Approved vendor sees vendor dashboard |
| Notifications deliver correctly | Manual check | In-app and email notifications received |

### 6.8 Deployment Checkpoints

| Checkpoint | Verification |
|------------|--------------|
| Client registration and login live | New users can sign up and log in |
| Client dashboard functional | Users can view inquiries and saved items |
| Vendor application and approval live | Vendors can apply; admins can approve |
| Vendor dashboard functional | Vendors can manage products |
| Admin dashboard functional | Admins can manage users and vendors |
| Notification system active | Users receive relevant notifications |
| No auth regressions | Existing pages still work without login |

---

## PHASE 7 — Payments & Commerce

**Goal:** Enable end-to-end e-commerce: cart, checkout, payment processing (M-Pesa, Paystack, Stripe), order tracking, and invoicing.

### 7.1 Goals

| # | Goal | Deliverable |
|---|------|-------------|
| 1 | Shopping cart | Add to cart, update quantity, remove items, persistent cart across sessions |
| 2 | Checkout flow | Address entry, shipping options, payment method selection, order review |
| 3 | M-Pesa integration | STK push for Kenyan mobile payments |
| 4 | Paystack integration | Card payments, bank transfers |
| 5 | Stripe integration | International card payments |
| 6 | Order tracking | Order status: pending -> paid -> processing -> shipped -> delivered |
| 7 | Order history | Client can view all past orders with details |
| 8 | Invoicing | PDF invoice generation for every order |
| 9 | Refund system | Admin-initiated refunds with reason tracking |
| 10 | Sales analytics | Revenue, orders, top products, vendor performance (admin dashboard) |

### 7.2 Recommended Order

```
1. Build cart system (localStorage first, then Firestore)
   |
   v
2. Build checkout page with address and shipping
   |
   v
3. Integrate M-Pesa API (sandbox first)
   |
   v
4. Integrate Paystack API (sandbox first)
   |
   v
5. Integrate Stripe API (sandbox first)
   |
   v
6. Build order creation flow (payment success -> create order in Firestore)
   |
   v
7. Build order tracking page for clients
   |
   v
8. Build order management for vendors
   |
   v
9. Build order management for admin
   |
   v
10. Build PDF invoice generation
   |
   v
11. Build refund workflow
   |
   v
12. Add sales analytics to admin dashboard
   |
   v
13. Test all payment flows with sandbox/test keys
   |
   v
14. Deploy Phase 7
```

### 7.3 Dependencies

| Dependency | Source | Phase Needed |
|------------|--------|--------------|
| Phase 5 complete | Previous phase | Marketplace with products |
| Phase 6 complete | Previous phase | Accounts and dashboards |
| M-Pesa API | Safaricom | Kenyan mobile payments |
| Paystack account | Paystack | Card and bank payments |
| Stripe account | Stripe | International payments |
| Firebase Cloud Functions | Firebase | Secure payment processing |
| `docs/security-and-project-safety.md` | Already exists | Payment safety rules |

### 7.4 Risks to Avoid

| Risk | Prevention |
|------|------------|
| Real charges during testing | Always use sandbox/test API keys |
| Payment data exposure | Never store card numbers; use tokenization |
| Duplicate charges | Idempotency keys on all payment requests |
| Failed payments not handled | Graceful error messages; retry options |
| Order data inconsistency | Transactions: payment success + order creation are atomic |
| Refund abuse | Only admins can initiate refunds; reason required |
| Currency confusion | Display prices in KES throughout; convert at checkout if needed |
| Fraud | Address verification, velocity checks, manual review for large orders |

### 7.5 What Should Remain Centralized

| Item | Location |
|------|----------|
| Cart logic | `js/cart.js` |
| Checkout flow | `js/checkout.js` |
| Payment processing | Firebase Cloud Functions |
| Order data model | Firestore + documented in architecture |
| Invoice template | One PDF template for all orders |
| Refund logic | Admin dashboard only |

### 7.6 What Should Never Be Duplicated

| Item | Why |
|------|-----|
| Cart state management | One cart store (Firestore after login, localStorage before) |
| Checkout form structure | One checkout flow for all payment methods |
| Payment success handler | One function creates orders after any successful payment |
| Order status definitions | One enum for all order types |
| Invoice generation | One template generates all invoices |

### 7.7 Testing Requirements

| Test | How | Pass Criteria |
|------|-----|---------------|
| Cart persists across sessions | Close and reopen browser | Cart items still present |
| M-Pesa STK push triggers | Sandbox test | Push notification simulated |
| Paystack card payment succeeds | Sandbox test card | Payment successful in test mode |
| Stripe payment succeeds | Test card | Payment successful in test mode |
| Order created after payment | Firestore check | Order document exists with correct items |
| Order status updates correctly | Manual check | Status changes through the pipeline |
| Invoice PDF generates correctly | Download test | PDF contains correct order details |
| Refund updates order status | Admin test | Order marked as refunded |
| Sales analytics accurate | Admin dashboard | Revenue matches order totals |

### 7.8 Deployment Checkpoints

| Checkpoint | Verification |
|------------|--------------|
| Cart functional on marketplace | Products can be added, updated, removed |
| Checkout flow complete | Address, shipping, payment, review all functional |
| M-Pesa sandbox tested | STK push works in test mode |
| Paystack sandbox tested | Card payment works in test mode |
| Stripe sandbox tested | Card payment works in test mode |
| Order tracking live | Clients can view order status |
| Vendor order management live | Vendors can see and manage their orders |
| Admin sales analytics live | Revenue and order data visible |
| No payment regressions | Test keys only; no real charges |

---

## PHASE 8 — Real Estate Expansion

**Goal:** Extend Furnostyles into property services: property listings for sale/rent, property management dashboards, Airbnb upgrade partnerships, and property inquiry workflows.

### 8.1 Goals

| # | Goal | Deliverable |
|---|------|-------------|
| 1 | Property listings | Properties for sale and rent with photos, descriptions, pricing |
| 2 | Property search | Search by location, price, bedrooms, property type |
| 3 | Property detail pages | Full property info, photo gallery, virtual tour link, contact agent |
| 4 | Property dashboards | Property owners can list, manage, and track their properties |
| 5 | Airbnb upgrade integration | Partnership page for Airbnb hosts seeking Furnostyles interior upgrades |
| 6 | Property inquiry forms | Inquiries routed to property owners or Furnostyles agents |
| 7 | Agent profiles | Licensed real estate agent profiles with listings and contact info |
| 8 | Property analytics | Views, inquiries, and conversion rates per property |
| 9 | Lease management | Track leases, rent payments, maintenance requests (future) |
| 10 | Document management | Store property documents, contracts, and inspection reports (future) |

### 8.2 Recommended Order

```
1. Design property page templates (listing, detail, search)
   |
   v
2. Build property CSS (css/property.css)
   |
   v
3. Create property data model in Firestore
   |
   v
4. Build property search and filter system
   |
   v
5. Build property listing pages
   |
   v
6. Build property detail pages
   |
   v
7. Build property owner dashboard
   |
   v
8. Build Airbnb upgrade partnership page
   |
   v
9. Build property inquiry form
   |
   v
10. Build agent profile system
   |
   v
11. Add property analytics to admin dashboard
   |
   v
12. Test property flows end-to-end
   |
   v
13. Deploy Phase 8
```

### 8.3 Dependencies

| Dependency | Source | Phase Needed |
|------------|--------|--------------|
| Phase 3 complete | Previous phase | Search and filters |
| Phase 6 complete | Previous phase | Accounts and dashboards |
| Phase 7 complete | Previous phase | Payments (for tenant payments, future) |
| Property data | Property owners/agents | Property photos and details |
| Real estate agents | External partners | Agent profiles and listings |
| Airbnb partnership terms | Legal/team | Partnership page content |

### 8.4 Risks to Avoid

| Risk | Prevention |
|------|------------|
| Property data inaccuracy | Verified listings only; agent confirmation required |
| Fake property listings | Agent verification; listing approval workflow |
| Legal compliance | Consult Kenyan real estate law; disclaimers on all listings |
| Property photos unoptimized | Compress and resize all property images |
| Overlapping with existing marketplace | Clear separation: marketplace = products; properties = real estate |
| Tenant data privacy | GDPR/Kenyan data protection compliance |
| Payment disputes | Clear terms of service; escrow for deposits (future) |

### 8.5 What Should Remain Centralized

| Item | Location |
|------|----------|
| Property data model | Firestore + documented in architecture |
| Property search logic | `js/property-search.js` |
| Property filter logic | `js/property-filters.js` |
| Property card component | `css/property.css` |
| Dashboard layout | `css/dashboard.css` |
| Inquiry form handler | `js/form-handler.js` |

### 8.6 What Should Never Be Duplicated

| Item | Why |
|------|-----|
| Property listing structure | One template for all property listings |
| Property detail page structure | One template for all property details |
| Search/filter logic | One engine handles property search |
| Property inquiry form | One form routes to correct agent/owner |
| Property document storage | One system for all property documents |

### 8.7 Testing Requirements

| Test | How | Pass Criteria |
|------|-----|---------------|
| Property search returns results | Manual check | Relevant properties displayed |
| Property filters work | Manual check | Price, location, type filters functional |
| Property detail pages load | Visual check | Gallery, specs, agent info display |
| Property owner dashboard works | Manual check | Owner can add and manage listings |
| Property inquiry form submits | Manual check | Inquiry stored and routed correctly |
| Airbnb partnership page renders | Visual check | Content and CTA visible |
| Mobile property search usable | Real mobile device | Touch-friendly, no horizontal scroll |

### 8.8 Deployment Checkpoints

| Checkpoint | Verification |
|------------|--------------|
| Property search page live | Search and filters functional |
| At least 10 property listings live | Real or sample property data |
| Property detail pages functional | Gallery and agent contact working |
| Property owner dashboard live | Owners can manage listings |
| Airbnb partnership page live | CTA and information visible |
| Property inquiry form functional | Submissions routed correctly |
| No regressions on existing marketplace | Products and cart still work |

---

## PHASE 9 — Platform Scaling

**Goal:** Optimize the platform for scale: performance, media delivery, analytics, AI-assisted workflows, and automation.

### 9.1 Goals

| # | Goal | Deliverable |
|---|------|-------------|
| 1 | Performance optimization | Lighthouse 95+ on all pages; sub-2-second LCP |
| 2 | CDN scaling | Cloudflare Image Resizing; Cloudflare R2 for media storage |
| 3 | Analytics | Google Analytics 4; Firebase Analytics; custom event tracking |
| 4 | Search analytics | Track what users search for; identify content gaps |
| 5 | Conversion analytics | Track form submissions, cart additions, checkout completions |
| 6 | AI-assisted content | AI-generated content briefs; image optimization suggestions |
| 7 | AI recommendations | Product recommendations based on browsing history |
| 8 | Automated workflows | Auto-assign leads; auto-respond to common inquiries |
| 9 | Email automation | Welcome series; abandoned cart; follow-up sequences |
| 10 | A/B testing framework | Test page variations, CTAs, and pricing |

### 9.2 Recommended Order

```
1. Audit current performance and identify bottlenecks
   |
   v
2. Implement Cloudflare Image Resizing for all images
   |
   v
3. Implement CDN caching for static assets
   |
   v
4. Set up Google Analytics 4 and Firebase Analytics
   |
   v
5. Implement custom event tracking (search, cart, checkout, forms)
   |
   v
6. Build analytics dashboard (admin view)
   |
   v
7. Integrate AI content tools (content brief generation)
   |
   v
8. Build product recommendation engine
   |
   v
9. Build automated lead assignment workflow
   |
   v
10. Set up email automation sequences
   |
   v
11. Implement A/B testing framework
   |
   v
12. Test all automated workflows
   |
   v
13. Deploy Phase 9
```

### 9.3 Dependencies

| Dependency | Source | Phase Needed |
|------------|--------|--------------|
| All previous phases | Previous phases | Platform must be functional before optimizing |
| Google Analytics account | Google | Traffic analytics |
| Cloudflare Pro/Business | Cloudflare | Image Resizing, advanced caching |
| AI service | OpenAI/Claude | Content and recommendation AI |
| Email automation platform | Mailchimp/ConvertKit | Email sequences |
| A/B testing tool | Optimizely/Google Optimize | A/B testing |

### 9.4 Risks to Avoid

| Risk | Prevention |
|------|------------|
| Analytics slowing the site | Load analytics scripts asynchronously; use server-side tracking where possible |
| AI recommendations being irrelevant | Start with simple rules-based recommendations; add ML later |
| Email automation being spammy | Strict opt-in; clear unsubscribe; rate limiting |
| A/B tests breaking functionality | Test one variable at a time; monitor conversion rates |
| CDN costs spiraling | Set usage alerts; optimize image sizes; purge unused assets |
| Data privacy violations | GDPR/Kenyan data protection compliance; anonymize user data |
| Over-automation losing human touch | Keep human oversight on all automated decisions |

### 9.5 What Should Remain Centralized

| Item | Location |
|------|----------|
| Analytics configuration | `js/analytics.js` |
| Event tracking definitions | `js/analytics.js` |
| AI recommendation engine | Firebase Cloud Functions |
| Email automation triggers | Firebase Cloud Functions + email platform |
| A/B test configuration | Admin dashboard |
| CDN settings | Cloudflare dashboard + `_headers` file |

### 9.6 What Should Never Be Duplicated

| Item | Why |
|------|-----|
| Analytics tracking code | One `gtag()` or `firebase.analytics()` initialization |
| Event naming conventions | One schema for all tracked events |
| AI model training data | One dataset for recommendations |
| Email template designs | One design system for all emails |
| A/B test logic | One framework handles all experiments |

### 9.7 Testing Requirements

| Test | How | Pass Criteria |
|------|-----|---------------|
| Performance meets targets | Lighthouse | 95+ performance score |
| CDN images load faster | WebPageTest | Faster image delivery than origin |
| Analytics events fire correctly | Real-time reports | Events appear in GA4/Firebase |
| Recommendations are relevant | Manual check | Recommended products match user interests |
| Email automation triggers correctly | Test subscribers | Emails sent at correct intervals |
| A/B tests randomize correctly | Statistical check | Equal traffic distribution |

### 9.8 Deployment Checkpoints

| Checkpoint | Verification |
|------------|--------------|
| Lighthouse 95+ on all page types | Performance audit |
| CDN images serving from edge | WebPageTest or DevTools |
| Analytics collecting data | Real-time dashboard shows events |
| Admin analytics dashboard live | Revenue, orders, traffic visible |
| AI recommendations live | Product recommendations displaying |
| Email automation sequences active | Welcome emails sending to new users |
| A/B testing framework functional | Admin can create and monitor tests |
| No performance regressions | Existing pages still fast |

---

## PHASE 10 — Future Ecosystem

**Goal:** Extend Furnostyles beyond the web platform into a full digital ecosystem: mobile app, APIs, live systems, messaging, and SaaS possibilities.

### 10.1 Goals

| # | Goal | Deliverable |
|---|------|-------------|
| 1 | Mobile app strategy | Progressive Web App (PWA) first; native app feasibility study |
| 2 | PWA implementation | Offline support, push notifications, home screen install |
| 3 | API development | REST/GraphQL API for external integrations and mobile apps |
| 4 | Live systems | Real-time chat between clients and vendors/agents |
| 5 | Messaging platform | In-app messaging; SMS notifications; email integration |
| 6 | AI recommendations | Advanced ML-based product, property, and service recommendations |
| 7 | AI chatbot | Customer support chatbot trained on Furnostyles knowledge base |
| 8 | SaaS possibilities | White-label platform for other interior design businesses |
| 9 | Franchise support | Multi-location support for Furnostyles franchises |
| 10 | International expansion | Multi-currency, multi-language, regional marketplaces |

### 10.2 Recommended Order

```
1. Implement PWA (service worker, manifest, offline page)
   |
   v
2. Add push notifications for orders and messages
   |
   v
3. Design API architecture (REST or GraphQL)
   |
   v
4. Build core API endpoints (products, properties, users, orders)
   |
   v
5. Build real-time chat system (Firebase Realtime Database or Firestore)
   |
   v
6. Integrate SMS notifications (Twilio/Africa's Talking)
   |
   v
7. Enhance AI recommendations with ML models
   |
   v
8. Build and train AI chatbot
   |
   v
9. Conduct SaaS feasibility study
   |
   v
10. Design franchise architecture
   |
   v
11. Plan international expansion (language, currency, legal)
   |
   v
12. Test all new systems end-to-end
   |
   v
13. Deploy Phase 10
```

### 10.3 Dependencies

| Dependency | Source | Phase Needed |
|------------|--------|--------------|
| All previous phases | Previous phases | Full platform must exist |
| Mobile development team | External | PWA and native app |
| API developers | Internal/external | API design and implementation |
| AI/ML platform | Google Cloud/AWS/Azure | Advanced recommendations and chatbot |
| SMS provider | Twilio/Africa's Talking | SMS notifications |
| Legal counsel | External | International expansion, franchise law |
| `docs/security-and-project-safety.md` | Already exists | API security, data protection |

### 10.4 Risks to Avoid

| Risk | Prevention |
|------|------------|
| PWA not working offline | Test service worker thoroughly; provide offline fallback page |
| API security vulnerabilities | Authentication, rate limiting, input validation on all endpoints |
| Chat system performance | Firebase Realtime Database scales well; implement pagination |
| SMS costs spiraling | Rate limiting; SMS only for critical notifications |
| AI chatbot giving wrong answers | Extensive training data; human handoff for complex queries |
| SaaS over-engineering | Start with a single white-label client; iterate |
| International legal issues | Consult local counsel in each target market |
| Franchise quality control | Strict brand guidelines; training program; audits |

### 10.5 What Should Remain Centralized

| Item | Location |
|------|----------|
| PWA configuration | `manifest.json`, service worker |
| API documentation | API docs (Swagger/OpenAPI) |
| Authentication (API) | Firebase Auth or OAuth 2.0 |
| Chat system | Firebase Realtime Database + `js/chat.js` |
| AI models | Cloud Functions + ML platform |
| Brand guidelines | `docs/brand-guidelines.md` |

### 10.6 What Should Never Be Duplicated

| Item | Why |
|------|-----|
| API response format | One consistent JSON schema |
| Authentication logic | One auth system for web, app, and API |
| Chat message structure | One data model for all messages |
| AI training data | One curated dataset |
| Brand assets | One source for logos, colours, fonts |

### 10.7 Testing Requirements

| Test | How | Pass Criteria |
|------|-----|---------------|
| PWA installs correctly | Chrome DevTools | Install prompt appears; app works offline |
| API endpoints return correct data | Postman/curl | All endpoints return expected JSON |
| API authentication works | Manual test | Unauthorized requests rejected |
| Chat messages deliver in real time | Manual test | Messages appear instantly |
| Push notifications arrive | Manual test | Notification received on device |
| SMS notifications deliver | Manual test | SMS received on mobile |
| AI chatbot answers common questions | Manual test | Correct answers for FAQ |

### 10.8 Deployment Checkpoints

| Checkpoint | Verification |
|------------|--------------|
| PWA installable and functional | Chrome Lighthouse PWA audit passes |
| Core API endpoints live | Postman collection tests pass |
| Real-time chat functional | Messages send and receive correctly |
| Push notifications working | Notifications arrive on test devices |
| SMS notifications working | Test SMS received |
| AI chatbot answering correctly | FAQ coverage tested |
| No regressions on existing platform | All previous features still work |
| International expansion plan documented | Language, currency, legal requirements listed |

---

## Document Summary

| Phase | Name | Core Deliverable | Static Hosting |
|-------|------|------------------|----------------|
| 1 | Brand Foundation | Complete public site | Yes |
| 2 | SEO & Content Expansion | 500+ content pages | Yes |
| 3 | Advanced UX | Sidebar, search, filters, animations | Yes |
| 4 | Service Request System | Quotes, bookings, inquiry tracking | Partial |
| 5 | Marketplace Foundation | Product listings, vendor system | Partial |
| 6 | Accounts & Dashboards | Client/vendor/admin accounts | No |
| 7 | Payments & Commerce | Cart, checkout, M-Pesa, orders | No |
| 8 | Real Estate Expansion | Property listings, dashboards | No |
| 9 | Platform Scaling | CDN, analytics, AI, automation | No |
| 10 | Future Ecosystem | PWA, API, chat, SaaS | No |

### Critical Rules

| Rule | Requirement |
|------|-------------|
| Never skip a phase. | Each phase builds on the previous. |
| Never start Phase N+1 before Phase N is stable. | Unstable foundations create exponential problems. |
| Document the current phase in the project README. | Everyone must know what phase the project is in. |
| Read `docs/security-and-project-safety.md` before any major change. | Safety first. |
| Read the relevant architecture document before building any feature. | Architecture knowledge prevents mistakes. |
| Test thoroughly before every deployment. | "Looks right" is not the same as "works." |
| Keep snapshots before every major change. | Rollback when things go wrong. |
| Update architecture documents after every phase. | Documents must stay in sync with code. |

**This roadmap must be read before any phase begins. The current phase must be documented in the project README.**
