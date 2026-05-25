# Furnostyles Future Implementation Queue and Phase Tracker

**Document Type:** Implementation Tracker | **Date:** 2026-05-22 | **Version:** 1.0 | **Current Phase:** 1 — Brand Foundation

---

## How to Use This Document

This document organizes all remaining future platform work into manageable, safe, scalable phases. Use it to:

- Track what systems are complete and stable
- Identify what is intentionally postponed
- Plan future work in dependency-aware order
- Understand risks and requirements for each phase
- Maintain clean architecture principles during expansion

**This is a planning document, not a build guide. Work through phases sequentially.**

---

## 1. Current Completed Systems

These systems are complete and stable as of Phase 1 completion.

### Completed Systems

| System | Status | Location | Notes |
|--------|--------|----------|-------|
| **Layout system** | Complete | `css/style.css` | `.premium-layout`, `.premium-main` working on all breakpoints |
| **Design tokens** | Complete | `css/style.css` | CSS variables for colours, fonts, spacing |
| **Component system** | Complete | `css/style.css` | Buttons, cards, forms styled consistently |
| **Header component** | Complete | `shared/header.html` | Dynamic loading via `fetch()` |
| **Footer component** | Complete | `shared/footer.html` | Dynamic loading via `fetch()` |
| **Navigation data** | Complete | `js/navigation-data.js` | Centralized link store |
| **Article data** | Complete | `js/article-data.js` | Centralized article metadata |
| **Article utilities** | Complete | `js/article-utils.js` | Article listing, related articles |
| **Form validation** | Complete | `js/form-validation.js` | Centralized validation engine |
| **Spam prevention** | Complete | `js/form-validation.js` | Honeypot, time check, rate limit |
| **Firebase config placeholder** | Complete | `shared/firebase/firebase-config.js` | Public keys only (not active) |
| **Firebase bridge placeholder** | Complete | `shared/firebase/firebase-bridge.js` | Placeholder (not active) |
| **Upload bridge CSS** | Complete | `shared/uploads/upload-bridge.css` | File upload styles |
| **Upload bridge JS** | Complete | `shared/uploads/upload-bridge.js` | File upload logic |
| **Image organization** | Complete | `assets/images/` | Organized subfolders, naming convention |
| **CSS architecture** | Complete | `css/style.css` | Single file with layers |
| **JS architecture** | Complete | `js/` | Namespaced functions, no global pollution |
| **Documentation** | Complete | `docs/` | 13 comprehensive documents |

### Stability Verification

All completed systems have been verified to:

- [ ] Follow documented architecture
- [ ] Have zero console errors
- [ ] Work on all breakpoints (320px, 768px, 1024px, 1440px)
- [ ] Be documented in `docs/` folder
- [ ] Be reusable without modification
- [ ] Not break other systems when changed

---

## 2. Stable Systems Ready for Production

These systems are stable and can be deployed to production immediately.

### Production-Ready Systems

| System | Production Readiness | Notes |
|--------|---------------------|-------|
| **Layout system** | Ready | Tested on all breakpoints |
| **Design tokens** | Ready | No changes needed |
| **Component system** | Ready | Buttons, cards, forms consistent |
| **Header/footer** | Ready | Dynamic loading works |
| **Navigation** | Ready | Centralized data store |
| **Form validation** | Ready | Spam prevention active |
| **Image organization** | Ready | Optimized and organized |
| **CSS architecture** | Ready | Single source of truth |
| **JS architecture** | Ready | Namespaced, no pollution |

### Production Deployment Checklist

Before deploying to production:

- [ ] All core pages created (home, services, portfolio, contact)
- [ ] All pages use template structure
- [ ] Header/footer load on every page
- [ ] Zero console errors on all pages
- [ ] Lighthouse performance >= 90
- [ ] Lighthouse accessibility = 100
- [ ] All images optimized (WebP, compressed)
- [ ] All internal links work (zero 404s)
- [ ] All external links work
- [ ] All pages have unique meta tags
- [ ] Responsive design verified
- [ ] No inline styles on structural elements
- [ ] No sidebar anywhere
- [ ] Documentation up to date
- [ ] Cloudflare Pages project set up
- [ ] Custom domain connected
- [ ] SSL active
- [ ] Preview URL tested
- [ ] Rollback plan documented

---

## 3. Systems Intentionally Postponed

These systems are intentionally postponed to future phases to maintain clean architecture.

### Postponed Systems

| System | Target Phase | Why Postponed | Current Status |
|--------|--------------|---------------|----------------|
| **Sidebar** | Phase C | Layout must be stable first; opt-in only | Not built |
| **Search functionality** | Phase C | Requires advanced UX foundation | Not built |
| **Filtering/sorting** | Phase C | Requires advanced UX foundation | Not built |
| **Marketplace** | Phase D | Requires accounts, payments first | Not built |
| **Product listings** | Phase D | Requires marketplace foundation | Not built |
| **Product cards** | Phase D | Requires marketplace foundation | Not built |
| **Vendor accounts** | Phase E | Requires marketplace foundation | Not built |
| **Client accounts** | Phase E | Requires Firebase Auth first | Not built |
| **Admin dashboards** | Phase E | Requires Firebase Auth first | Not built |
| **Cart system** | Phase F | Requires marketplace, accounts first | Not built |
| **Checkout** | Phase F | Requires marketplace, accounts first | Not built |
| **M-Pesa integration** | Phase F | Requires cart, checkout first | Not built |
| **Paystack integration** | Phase F | Requires cart, checkout first | Not built |
| **Stripe integration** | Phase F | Requires cart, checkout first | Not built |
| **Property listings** | Phase G | Requires marketplace, payments first | Not built |
| **Agent accounts** | Phase G | Requires accounts foundation first | Not built |
| **Airbnb integration** | Phase G | Requires real estate foundation first | Not built |
| **Firebase active** | Phase 4+ | Requires form system stable first | Placeholder only |
| **Cloud Functions** | Phase 4+ | Requires Firebase active first | Not built |

### Postponement Philosophy

| Principle | Application |
|-----------|-------------|
| **Foundation first** | Build foundation before adding complexity |
| **Dependency awareness** | Do not build features that depend on incomplete systems |
| **Phase discipline** | Complete each phase before advancing |
| **Opt-in only** | Features like sidebar are opt-in, not forced |
| **Conditional loading** | Feature CSS/JS loads only on relevant pages |

---

## 4. Systems Waiting for Future Phases

These systems are waiting for specific future phases to begin.

### Phase-Dependent Systems

| System | Waiting For | Trigger |
|--------|-------------|---------|
| **Cornerstone articles** | Phase B (SEO Expansion) | Phase 1 complete and stable |
| **Location pages** | Phase B (SEO Expansion) | Phase 1 complete and stable |
| **Article clusters** | Phase B (SEO Expansion) | Phase 1 complete and stable |
| **Schema markup** | Phase B (SEO Expansion) | Phase 1 complete and stable |
| **Internal linking optimization** | Phase B (SEO Expansion) | Phase 1 complete and stable |
| **Sidebar system** | Phase C (Sidebar Reintegration) | Phase 2 complete and stable |
| **Category navigation** | Phase C (Sidebar Reintegration) | Phase 2 complete and stable |
| **Marketplace foundation** | Phase D (Marketplace) | Phase 3 complete and stable |
| **Product cards** | Phase D (Marketplace) | Phase 3 complete and stable |
| **Product detail pages** | Phase D (Marketplace) | Phase 3 complete and stable |
| **Sourcing pages** | Phase D (Marketplace) | Phase 3 complete and stable |
| **Filtering/search** | Phase D (Marketplace) | Phase 3 complete and stable |
| **Client accounts** | Phase E (Accounts) | Phase 4 complete and stable |
| **Vendor accounts** | Phase E (Accounts) | Phase 4 complete and stable |
| **Provider accounts** | Phase E (Accounts) | Phase 4 complete and stable |
| **Admin dashboards** | Phase E (Accounts) | Phase 4 complete and stable |
| **Notifications** | Phase E (Accounts) | Phase 4 complete and stable |
| **Cart system** | Phase F (Commerce) | Phase 5 complete and stable |
| **Checkout** | Phase F (Commerce) | Phase 5 complete and stable |
| **M-Pesa** | Phase F (Commerce) | Phase 5 complete and stable |
| **Paystack** | Phase F (Commerce) | Phase 5 complete and stable |
| **Stripe** | Phase F (Commerce) | Phase 5 complete and stable |
| **Order tracking** | Phase F (Commerce) | Phase 5 complete and stable |
| **Property listings** | Phase G (Real Estate) | Phase 7 complete and stable |
| **Property dashboards** | Phase G (Real Estate) | Phase 7 complete and stable |
| **Property inquiries** | Phase G (Real Estate) | Phase 7 complete and stable |
| **Airbnb integration** | Phase G (Real Estate) | Phase 7 complete and stable |
| **Performance optimization** | Phase H (Scaling) | Phase 8 complete and stable |
| **CDN/media scaling** | Phase H (Scaling) | Phase 8 complete and stable |
| **Analytics** | Phase H (Scaling) | Phase 8 complete and stable |
| **Automation** | Phase H (Scaling) | Phase 8 complete and stable |
| **AI workflows** | Phase H (Scaling) | Phase 8 complete and stable |

### Phase Transition Rules

| Rule | Why |
|------|-----|
| Complete current phase before starting next | Foundation must be solid |
| All stability checkpoints must pass | Prevents regression |
| Health score must be >= 8/10 | Architecture must be healthy |
| Documentation must be updated | Future developers need guidance |
| Snapshot before phase transition | Irreversible breakage risk |

---

## PHASE A — Brand Website Refinement

**Goal:** Complete the brand website with all core pages, images, and polish before advancing to SEO.

### Queue Items

#### A1. Additional Service Pages

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase 1 complete, template system stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 1st in Phase A |
| **Risks to Avoid** | Duplicating navigation, breaking template structure |
| **What Must Remain Centralized** | Navigation data (`js/navigation-data.js`), header/footer |
| **Testing Requirements** | Template structure, navigation links, responsive design |

**Description:** Create dedicated pages for each service offering (interior design, renovations, consultations, etc.).

**Implementation Steps:**
1. Copy from `index.html` template.
2. Write unique service description (500+ words).
3. Add service images (optimized WebP).
4. Add page to `js/navigation-data.js`.
5. Test on all breakpoints.
6. Verify navigation links work.

---

#### A2. Additional Portfolio Pages

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase 1 complete, portfolio folder structure |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 2nd in Phase A |
| **Risks to Avoid** | Unoptimized images, missing client permissions |
| **What Must Remain Centralized** | Header/footer, navigation data |
| **Testing Requirements** | Image loading, responsive layout, navigation |

**Description:** Create dedicated pages for 3-5 best projects with before/after images and client testimonials.

**Implementation Steps:**
1. Copy from `index.html` template.
2. Write project description (300+ words).
3. Add project images (optimized WebP, 1200px width).
4. Obtain client permission for public display.
5. Add page to `js/navigation-data.js`.
6. Test on all breakpoints.

---

#### A3. Additional Cornerstone Articles

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase 1 complete, blog system stable |
| **Estimated Complexity** | High |
| **Recommended Order** | 3rd in Phase A |
| **Risks to Avoid** | Thin content, duplicate content, keyword stuffing |
| **What Must Remain Centralized** | Article data (`js/article-data.js`), header/footer |
| **Testing Requirements** | Article loading, internal links, meta tags |

**Description:** Write 3-5 cornerstone articles (2000+ words each) targeting competitive keywords.

**Implementation Steps:**
1. Research top keywords for Kenyan interior design.
2. Write article (2000+ words, unique content).
3. Create featured image (1200x630px WebP).
4. Add metadata to `js/article-data.js`.
5. Create article HTML from template.
6. Add internal links to related content.
7. Test on all breakpoints.

---

#### A4. Image Optimization

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase 1 complete, images gathered |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 4th in Phase A |
| **Risks to Avoid** | Unoptimized images, wrong file formats, missing alt text |
| **What Must Remain Centralized** | Image organization (`assets/images/` subfolders) |
| **Testing Requirements** | Image loading, Lighthouse performance, CLS |

**Description:** Optimize all images for performance (compress, resize, convert to WebP).

**Implementation Steps:**
1. Gather all images.
2. Compress using TinyPNG or similar.
3. Resize to appropriate dimensions (800px blog, 1200px portfolio, 1920px backgrounds).
4. Convert to WebP format.
5. Rename using naming convention.
6. Place in correct subfolder.
7. Add `width` and `height` attributes in HTML.
8. Add descriptive `alt` text.
9. Test Lighthouse performance.

---

#### A5. Responsiveness Polishing

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase 1 complete, all pages created |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 5th in Phase A |
| **Risks to Avoid** | Horizontal scroll, touch targets too small, content overlapping |
| **What Must Remain Centralized** | CSS (`css/style.css`), layout system |
| **Testing Requirements** | All breakpoints (320px, 768px, 1024px, 1440px), actual devices |

**Description:** Polish responsive design on all breakpoints to ensure perfect mobile experience.

**Implementation Steps:**
1. Test all pages on 320px breakpoint.
2. Test all pages on 768px breakpoint.
3. Test all pages on 1024px breakpoint.
4. Test all pages on 1440px breakpoint.
5. Fix any horizontal scroll issues.
6. Verify touch targets >= 44px on mobile.
7. Test on actual mobile device (iPhone, Android).
8. Fix any content overlapping issues.

---

### Phase A Completion Criteria

Phase A is complete when:

- [ ] All service pages created (minimum 5)
- [ ] All portfolio pages created (minimum 3)
- [ ] All cornerstone articles published (minimum 3)
- [ ] All images optimized (WebP, compressed, named correctly)
- [ ] Responsive design polished on all breakpoints
- [ ] Lighthouse performance >= 90 on all pages
- [ ] Zero console errors on all pages
- [ ] All internal links work
- [ ] Health score >= 8/10

---

## PHASE B — SEO Expansion

**Goal:** Build the SEO foundation and create high-value content to drive organic traffic.

### Queue Items

#### B1. Article Clusters

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase A complete, cornerstone articles published |
| **Estimated Complexity** | High |
| **Recommended Order** | 1st in Phase B |
| **Risks to Avoid** | Thin content, duplicate content, broken internal links |
| **What Must Remain Centralized** | Article data (`js/article-data.js`), navigation data |
| **Testing Requirements** | Internal links, meta tags, structured data |

**Description:** Create article clusters around core topics (living room, bedroom, kitchen, etc.) with internal linking.

**Implementation Steps:**
1. Identify core topics (5-10 clusters).
2. Write 3-5 articles per cluster (800+ words each).
3. Create internal links between cluster articles.
4. Add cluster navigation to article pages.
5. Update `js/article-data.js` with cluster metadata.
6. Add structured data (Article schema).
7. Test internal links.

---

#### B2. Location SEO

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase A complete, service pages stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 2nd in Phase B |
| **Risks to Avoid** | Duplicate content, thin content, inaccurate location info |
| **What Must Remain Centralized** | Navigation data, header/footer |
| **Testing Requirements** | Meta tags, internal links, local schema |

**Description:** Create location-specific landing pages ("Interior Design Nairobi", "Interior Design Mombasa", etc.).

**Implementation Steps:**
1. Identify target locations (Nairobi, Mombasa, Kisumu, etc.).
2. Create location page for each (500+ words unique content).
3. Add location-specific keywords.
4. Add local business schema (JSON-LD).
5. Add location-specific contact information.
6. Add internal links to relevant services.
7. Add page to `js/navigation-data.js`.
8. Test on all breakpoints.

---

#### B3. Schema Markup

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase A complete, pages stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 3rd in Phase B |
| **Risks to Avoid** | Invalid schema, missing required fields, duplicate schema |
| **What Must Remain Centralized** | Page templates, article data |
| **Testing Requirements** | Schema validation tool, rich snippets test |

**Description:** Implement structured data (JSON-LD) for Organization, LocalBusiness, Article, and BreadcrumbList.

**Implementation Steps:**
1. Add Organization schema to homepage.
2. Add LocalBusiness schema to contact page.
3. Add Article schema to all blog articles.
4. Add BreadcrumbList schema to all pages.
5. Validate schema using Google Rich Results Test.
6. Test rich snippets in Search Console.
7. Fix any validation errors.

---

#### B4. Internal Linking Optimization

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase A complete, article clusters created |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 4th in Phase B |
| **Risks to Avoid** | Broken links, over-linking, irrelevant links |
| **What Must Remain Centralized** | Article data, navigation data |
| **Testing Requirements** | Link checker, zero 404s |

**Description:** Build comprehensive internal link ecosystem between articles, services, and portfolio.

**Implementation Steps:**
1. Audit all internal links.
2. Add links from articles to related services.
3. Add links from services to related articles.
4. Add links from portfolio to related services.
5. Add contextual links within article content.
6. Verify zero broken links (404s).
7. Run link checker tool.

---

#### B5. Content Scaling

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase A complete, article clusters created |
| **Estimated Complexity** | High |
| **Recommended Order** | 5th in Phase B |
| **Risks to Avoid** | Thin content, duplicate content, inconsistent quality |
| **What Must Remain Centralized** | Article data, content calendar |
| **Testing Requirements** | Content quality, SEO performance |

**Description:** Create 6-month content calendar and publish 10+ additional high-quality articles.

**Implementation Steps:**
1. Create 6-month content calendar.
2. Assign topics and deadlines.
3. Write 10+ articles (800+ words each).
4. Optimize each article for target keyword.
5. Add internal links to each article.
6. Publish according to calendar.
7. Monitor SEO performance in Search Console.

---

### Phase B Completion Criteria

Phase B is complete when:

- [ ] Article clusters created (5-10 clusters, 3-5 articles each)
- [ ] Location pages created (5-10 locations)
- [ ] Schema markup implemented (Organization, LocalBusiness, Article, BreadcrumbList)
- [ ] Internal link ecosystem comprehensive
- [ ] Content calendar created and actionable
- [ ] 10+ additional articles published
- [ ] Lighthouse SEO score = 100 on all major pages
- [ ] Zero broken internal links
- [ ] Health score >= 8/10

---

## PHASE C — Sidebar Reintegration

**Goal:** Reintroduce the sidebar system with opt-in only, mobile drawer pattern, and conditional loading to avoid the old squeezing problem.

### Queue Items

#### C1. Shared Sidebar System

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase B complete, layout system stable, CSS Grid mastery |
| **Estimated Complexity** | High |
| **Recommended Order** | 1st in Phase C |
| **Risks to Avoid** | Sidebar squeezing content, sidebar on non-opt-in pages, mobile layout breaks |
| **What Must Remain Centralized** | Layout system (`.premium-layout`), header/footer |
| **Testing Requirements** | All breakpoints, mobile drawer pattern, non-opt-in pages unchanged |

**Description:** Create shared sidebar system with opt-in layout modifier (`.premium-layout--with-sidebar`).

**Implementation Steps:**
1. Create `css/sidebar.css` with sidebar styles.
2. Create `js/sidebar.js` with sidebar logic.
3. Create `shared/sidebar.html` component.
4. Implement opt-in layout (`.premium-layout--with-sidebar`).
5. Implement mobile drawer pattern (off-canvas).
6. Add conditional loading (sidebar CSS/JS only on opt-in pages).
7. Test on all breakpoints.
8. Verify non-opt-in pages unchanged.

---

#### C2. Category Navigation

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase C1 complete, sidebar system stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 2nd in Phase C |
| **Risks to Avoid** | Broken navigation links, inconsistent categories, mobile UX issues |
| **What Must Remain Centralized** | Navigation data (`js/navigation-data.js`) |
| **Testing Requirements** | Navigation links, mobile drawer, category filtering |

**Description:** Add category navigation to sidebar for filtering content (blog categories, service categories, etc.).

**Implementation Steps:**
1. Define category structure in `js/navigation-data.js`.
2. Add category links to sidebar HTML.
3. Implement category filtering logic.
4. Add category indicators on pages.
5. Test navigation links.
6. Test mobile drawer category navigation.

---

#### C3. Responsive Sidebar Testing

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase C1 complete, sidebar system implemented |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 3rd in Phase C |
| **Risks to Avoid** | Content squeezing on mobile, drawer not working, sidebar overlapping content |
| **What Must Remain Centralized** | Layout system, CSS Grid |
| **Testing Requirements** | All breakpoints, actual mobile devices, touch targets |

**Description:** Thoroughly test sidebar on all breakpoints to ensure no content squeezing.

**Implementation Steps:**
1. Test sidebar on 320px breakpoint (drawer mode).
2. Test sidebar on 768px breakpoint (drawer mode).
3. Test sidebar on 1024px breakpoint (desktop mode).
4. Test sidebar on 1440px breakpoint (desktop mode).
5. Test on actual mobile device (iPhone, Android).
6. Verify no content squeezing.
7. Verify touch targets >= 44px on mobile.
8. Fix any layout issues.

---

#### C4. Accessibility Testing

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase C1 complete, sidebar system stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 4th in Phase C |
| **Risks to Avoid** | Keyboard navigation not working, screen reader issues, focus traps |
| **What Must Remain Centralized** | Semantic HTML, ARIA attributes |
| **Testing Requirements** | Keyboard navigation, screen reader, focus management |

**Description:** Ensure sidebar is accessible via keyboard and screen readers.

**Implementation Steps:**
1. Test keyboard navigation (Tab, Enter, Escape).
2. Add ARIA attributes to sidebar.
3. Implement focus management (focus trap when open).
4. Test with screen reader (NVDA, JAWS).
5. Fix any accessibility issues.
6. Verify Lighthouse accessibility = 100.

---

#### C5. Safe Rollout Strategy

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase C1-C4 complete, sidebar fully tested |
| **Estimated Complexity** | Low |
| **Recommended Order** | 5th in Phase C |
| **Risks to Avoid** | Breaking non-opt-in pages, regression, performance degradation |
| **What Must Remain Centralized** | Conditional loading, opt-in modifier |
| **Testing Requirements** | Preview URL, rollback plan, monitoring |

**Description:** Roll out sidebar to opt-in pages only with monitoring and rollback plan.

**Implementation Steps:**
1. Select first opt-in page (e.g., blog index).
2. Add `.premium-layout--with-sidebar` to page.
3. Deploy to preview URL.
4. Test thoroughly on preview.
5. Deploy to production.
6. Monitor for 30 minutes.
7. Roll back if issues arise.
8. Gradually add sidebar to other opt-in pages.

---

### Phase C Completion Criteria

Phase C is complete when:

- [ ] Shared sidebar system created with opt-in layout
- [ ] Category navigation implemented
- [ ] Responsive sidebar tested on all breakpoints
- [ ] Accessibility verified (keyboard, screen reader)
- [ ] Safe rollout strategy executed
- [ ] Non-opt-in pages verified unchanged
- [ ] Zero content squeezing on mobile
- [ ] Lighthouse accessibility = 100
- [ ] Health score >= 8/10

---

## PHASE D — Marketplace Foundation

**Goal:** Build the marketplace foundation with category pages, product cards, product detail pages, sourcing pages, and filtering/search.

### Queue Items

#### D1. Category Pages

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase C complete, sidebar system stable, navigation data stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 1st in Phase D |
| **Risks to Avoid** | Broken navigation, duplicate content, inconsistent categories |
| **What Must Remain Centralized** | Navigation data, header/footer, layout system |
| **Testing Requirements** | Navigation links, responsive design, performance |

**Description:** Create category pages for marketplace (furniture, decor, lighting, etc.).

**Implementation Steps:**
1. Define category structure in `js/navigation-data.js`.
2. Create `marketplace/` folder.
3. Create category pages from template.
4. Add category descriptions (500+ words).
5. Add category images (optimized WebP).
6. Add category to navigation.
7. Test on all breakpoints.

---

#### D2. Product Cards

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase D1 complete, category pages stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 2nd in Phase D |
| **Risks to Avoid** | Inconsistent card styling, broken links, unoptimized images |
| **What Must Remain Centralized** | CSS (`css/style.css` card styles), product data |
| **Testing Requirements** | Card layout, responsive design, image loading |

**Description:** Create product card component for displaying products in grid/list views.

**Implementation Steps:**
1. Use existing `.fns-card` styles from `style.css`.
2. Create product card HTML structure.
3. Add product image (optimized WebP).
4. Add product title, price, description.
5. Add "Add to Cart" button.
6. Test card layout on all breakpoints.
7. Verify image loading.

---

#### D3. Product Detail Pages

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase D2 complete, product cards stable |
| **Estimated Complexity** | High |
| **Recommended Order** | 3rd in Phase D |
| **Risks to Avoid** | Broken product links, missing product data, inconsistent layout |
| **What Must Remain Centralized** | Product data (Firestore), header/footer, layout system |
| **Testing Requirements** | Product data loading, responsive design, add to cart |

**Description:** Create product detail pages with full product information, images, and add-to-cart functionality.

**Implementation Steps:**
1. Create product detail page template.
2. Add product images (optimized WebP, multiple angles).
3. Add product title, description, specifications.
4. Add pricing (KES).
5. Add "Add to Cart" button.
6. Add related products section.
7. Test on all breakpoints.
8. Verify add-to-cart functionality (placeholder).

---

#### D4. Sourcing Pages

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase D3 complete, product detail pages stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 4th in Phase D |
| **Risks to Avoid** | Broken form, missing validation, spam submissions |
| **What Must Remain Centralized** | Form validation (`js/form-validation.js`), header/footer |
| **Testing Requirements** | Form validation, spam prevention, responsive design |

**Description:** Create vendor sourcing page for suppliers to apply to sell on marketplace.

**Implementation Steps:**
1. Create sourcing page from template.
2. Add vendor application form.
3. Use existing form validation (`js/form-validation.js`).
4. Add spam prevention (honeypot, time check, rate limit).
5. Add vendor requirements description.
6. Test form validation.
7. Test spam prevention.
8. Test on all breakpoints.

---

#### D5. Filtering/Search

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase D1 complete, category pages stable, product data stable |
| **Estimated Complexity** | High |
| **Recommended Order** | 5th in Phase D |
| **Risks to Avoid** | Broken filters, slow search performance, inconsistent results |
| **What Must Remain Centralized** | Product data (Firestore), search logic |
| **Testing Requirements** | Filter functionality, search performance, responsive design |

**Description:** Implement filtering and search functionality for marketplace products.

**Implementation Steps:**
1. Define filter options (category, price, material, etc.).
2. Create `js/marketplace-filter.js` (namespaced under `Furnostyles.Marketplace.filter`).
3. Create `js/marketplace-search.js` (namespaced under `Furnostyles.Marketplace.search`).
4. Implement client-side filtering (placeholder for now).
5. Implement client-side search (placeholder for now).
6. Add filter UI to category pages.
7. Add search UI to header or sidebar.
8. Test filter functionality.
9. Test search functionality.
10. Test performance on mobile.

---

### Phase D Completion Criteria

Phase D is complete when:

- [ ] Category pages created (minimum 5 categories)
- [ ] Product cards implemented
- [ ] Product detail pages created
- [ ] Sourcing page created with form
- [ ] Filtering/search implemented
- [ ] Marketplace CSS loads conditionally
- [ ] Marketplace JS loads conditionally
- [ ] Non-marketplace pages unchanged
- [ ] Lighthouse performance >= 90
- [ ] Health score >= 8/10

---

## PHASE E — Accounts & Dashboards

**Goal:** Implement client accounts, vendor accounts, provider accounts, admin dashboards, and notifications with Firebase Authentication and Firestore.

### Queue Items

#### E1. Client Accounts

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase D complete, Firebase Auth enabled, Firestore security rules written |
| **Estimated Complexity** | High |
| **Recommended Order** | 1st in Phase E |
| **Risks to Avoid** | Security vulnerabilities, duplicate user data, broken auth flow |
| **What Must Remain Centralized** | Firebase Auth (single source of truth), Firestore `users` collection |
| **Testing Requirements** | Auth flow, role checks, security rules, responsive design |

**Description:** Implement client account registration, login, profile management.

**Implementation Steps:**
1. Enable Firebase Authentication (Email/Password).
2. Write Firestore security rules for `users` collection.
3. Create `login.html` page from template.
4. Create `register.html` page from template.
5. Create `profile.html` page from template.
6. Implement `js/auth.js` (namespaced under `Furnostyles.Auth`).
7. Implement email verification.
8. Test auth flow (register, verify email, login, logout).
9. Test security rules (unauthorized access blocked).
10. Test on all breakpoints.

---

#### E2. Vendor Accounts

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase E1 complete, client accounts stable |
| **Estimated Complexity** | High |
| **Recommended Order** | 2nd in Phase E |
| **Risks to Avoid** | Unauthorized vendor access, duplicate vendor data, broken approval flow |
| **What Must Remain Centralized** | Firebase Auth, Firestore `users` collection, Firestore `vendors` collection |
| **Testing Requirements** | Vendor registration, approval flow, role checks, security rules |

**Description:** Implement vendor account registration with approval workflow.

**Implementation Steps:**
1. Add `vendor` role to Firestore security rules.
2. Create `vendor-register.html` page from template.
3. Implement vendor registration form.
4. Implement vendor approval workflow (admin approval required).
5. Add vendor dashboard access after approval.
6. Test vendor registration.
7. Test approval workflow.
8. Test vendor dashboard access.
9. Test security rules (unapproved vendors blocked).

---

#### E3. Provider Accounts

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase E2 complete, vendor accounts stable |
| **Estimated Complexity** | High |
| **Recommended Order** | 3rd in Phase E |
| **Risks to Avoid** | Unauthorized provider access, duplicate provider data, broken verification |
| **What Must Remain Centralized** | Firebase Auth, Firestore `users` collection, Firestore `providers` collection |
| **Testing Requirements** | Provider registration, verification flow, role checks, security rules |

**Description:** Implement service provider accounts (contractors, designers) with verification.

**Implementation Steps:**
1. Add `provider` role to Firestore security rules.
2. Create `provider-register.html` page from template.
3. Implement provider registration form.
4. Implement provider verification workflow (document upload, admin review).
5. Add provider dashboard access after verification.
6. Test provider registration.
7. Test verification workflow.
8. Test provider dashboard access.
9. Test security rules (unverified providers blocked).

---

#### E4. Admin Dashboards

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase E1-E3 complete, all account types stable |
| **Estimated Complexity** | High |
| **Recommended Order** | 4th in Phase E |
| **Risks to Avoid** | Unauthorized admin access, broken dashboard functionality, data exposure |
| **What Must Remain Centralized** | Firebase Auth, Firestore security rules, dashboard components |
| **Testing Requirements** | Admin access, dashboard functionality, security rules, responsive design |

**Description:** Implement admin dashboard for managing users, vendors, providers, content.

**Implementation Steps:**
1. Add `admin` role to Firestore security rules.
2. Create `admin/dashboard.html` page from template.
3. Implement user management (view, edit, ban users).
4. Implement vendor management (approve, reject vendors).
5. Implement provider management (verify, reject providers).
6. Implement content management (edit articles, pages).
7. Test admin access (only admins can access).
8. Test dashboard functionality.
9. Test security rules (non-admins blocked).
10. Test on all breakpoints.

---

#### E5. Notifications

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase E4 complete, admin dashboards stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 5th in Phase E |
| **Risks to Avoid** | Spam notifications, broken notification delivery, privacy violations |
| **What Must Remain Centralized** | Firestore `notifications` collection, notification logic |
| **Testing Requirements** | Notification delivery, notification display, privacy controls |

**Description:** Implement notification system for users (order updates, approval status, etc.).

**Implementation Steps:**
1. Create Firestore `notifications` collection.
2. Add notification security rules.
3. Implement notification display in user dashboard.
4. Implement notification preferences (opt-in/opt-out).
5. Test notification delivery.
6. Test notification display.
7. Test notification preferences.
8. Test privacy controls.

---

### Phase E Completion Criteria

Phase E is complete when:

- [ ] Client accounts implemented (register, login, profile)
- [ ] Vendor accounts implemented (registration, approval)
- [ ] Provider accounts implemented (registration, verification)
- [ ] Admin dashboards implemented (user, vendor, provider, content management)
- [ ] Notifications implemented (delivery, display, preferences)
- [ ] Firebase Auth enabled and configured
- [ ] Firestore security rules written and tested
- [ ] Dashboard CSS loads conditionally
- [ ] Dashboard JS loads conditionally
- [ ] Non-dashboard pages unchanged
- [ ] Health score >= 8/10

---

## PHASE F — Commerce & Payments

**Goal:** Implement cart system, checkout, M-Pesa, Paystack, Stripe, and order tracking.

### Queue Items

#### F1. Cart System

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase D complete, Phase E complete, product data stable |
| **Estimated Complexity** | High |
| **Recommended Order** | 1st in Phase F |
| **Risks to Avoid** | Cart data loss, broken cart calculations, security vulnerabilities |
| **What Must Remain Centralized** | Cart logic, product data (Firestore) |
| **Testing Requirements** | Add to cart, remove from cart, quantity updates, cart calculations |

**Description:** Implement shopping cart with add/remove items, quantity updates, and calculations.

**Implementation Steps:**
1. Create `js/cart.js` (namespaced under `Furnostyles.Cart`).
2. Implement add to cart functionality.
3. Implement remove from cart functionality.
4. Implement quantity update functionality.
5. Implement cart calculations (subtotal, total).
6. Add cart icon to header with item count.
7. Create `cart.html` page from template.
8. Test add to cart.
9. Test remove from cart.
10. Test quantity updates.
11. Test cart calculations.
12. Test on all breakpoints.

---

#### F2. Checkout

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase F1 complete, cart system stable |
| **Estimated Complexity** | High |
| **Recommended Order** | 2nd in Phase F |
| **Risks to Avoid** | Broken checkout flow, data loss, security vulnerabilities |
| **What Must Remain Centralized** | Checkout logic, order data (Firestore) |
| **Testing Requirements** | Checkout flow, form validation, order creation |

**Description:** Implement checkout flow with shipping, billing, and order summary.

**Implementation Steps:**
1. Create `checkout.html` page from template.
2. Create `js/checkout.js` (namespaced under `Furnostyles.Checkout`).
3. Implement shipping information form.
4. Implement billing information form.
5. Implement order summary display.
6. Implement order creation in Firestore.
7. Use existing form validation (`js/form-validation.js`).
8. Test checkout flow.
9. Test form validation.
10. Test order creation.
11. Test on all breakpoints.

---

#### F3. M-Pesa

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase F2 complete, checkout stable, M-Pesa API account |
| **Estimated Complexity** | High |
| **Recommended Order** | 3rd in Phase F |
| **Risks to Avoid** | Payment failures, duplicate charges, security breaches |
| **What Must Remain Centralized** | Payment logic, order data (Firestore), M-Pesa API keys (server-side) |
| **Testing Requirements** | Sandbox testing, idempotency, webhook handling |

**Description:** Integrate M-Pesa payment processing for Kenyan customers.

**Implementation Steps:**
1. Register with Safaricom M-Pesa API.
2. Obtain sandbox/test API keys.
3. Implement M-Pesa STK Push (Lipa na M-Pesa).
4. Implement server-side validation (Cloud Functions).
5. Implement webhook endpoints for payment confirmation.
6. Implement idempotency keys to prevent duplicate charges.
7. Test in sandbox environment.
8. Verify idempotency keys work.
9. Switch to production API keys.
10. Monitor first transactions.

---

#### F4. Paystack

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase F2 complete, checkout stable, Paystack account |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 4th in Phase F |
| **Risks to Avoid** | Payment failures, duplicate charges, security breaches |
| **What Must Remain Centralized** | Payment logic, order data (Firestore), Paystack API keys (server-side) |
| **Testing Requirements** | Sandbox testing, idempotency, webhook handling |

**Description:** Integrate Paystack payment processing for card payments.

**Implementation Steps:**
1. Register with Paystack.
2. Obtain sandbox/test API keys.
3. Implement Paystack inline checkout.
4. Implement server-side validation (Cloud Functions).
5. Implement webhook endpoints for payment confirmation.
6. Implement idempotency keys to prevent duplicate charges.
7. Test in sandbox environment.
8. Verify idempotency keys work.
9. Switch to production API keys.
10. Monitor first transactions.

---

#### F5. Stripe

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase F2 complete, checkout stable, Stripe account |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 5th in Phase F |
| **Risks to Avoid** | Payment failures, duplicate charges, security breaches |
| **What Must Remain Centralized** | Payment logic, order data (Firestore), Stripe API keys (server-side) |
| **Testing Requirements** | Sandbox testing, idempotency, webhook handling |

**Description:** Integrate Stripe payment processing for international customers.

**Implementation Steps:**
1. Register with Stripe.
2. Obtain sandbox/test API keys.
3. Implement Stripe Checkout.
4. Implement server-side validation (Cloud Functions).
5. Implement webhook endpoints for payment confirmation.
6. Implement idempotency keys to prevent duplicate charges.
7. Test in sandbox environment.
8. Verify idempotency keys work.
9. Switch to production API keys.
10. Monitor first transactions.

---

#### F6. Order Tracking

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase F3-F5 complete, payments stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 6th in Phase F |
| **Risks to Avoid** | Broken order status updates, data inconsistency, privacy violations |
| **What Must Remain Centralized** | Order data (Firestore), order status logic |
| **Testing Requirements** | Order status updates, order history display, privacy controls |

**Description:** Implement order tracking system for customers to view order status and history.

**Implementation Steps:**
1. Add `orders` collection to Firestore.
2. Add order status fields (pending, paid, shipped, delivered).
3. Create `orders.html` page from template.
4. Implement order history display.
5. Implement order status updates.
6. Add order tracking to user dashboard.
7. Test order status updates.
8. Test order history display.
9. Test privacy controls (users see only their orders).

---

### Phase F Completion Criteria

Phase F is complete when:

- [ ] Cart system implemented (add, remove, quantity, calculations)
- [ ] Checkout implemented (shipping, billing, order summary)
- [ ] M-Pesa integrated (sandbox tested, production ready)
- [ ] Paystack integrated (sandbox tested, production ready)
- [ ] Stripe integrated (sandbox tested, production ready)
- [ ] Order tracking implemented (status updates, history)
- [ ] Payment JS loads conditionally
- [ ] Non-payment pages unchanged
- [ ] Idempotency keys implemented
- [ ] Webhook endpoints implemented
- [ ] Health score >= 8/10

---

## PHASE G — Real Estate Expansion

**Goal:** Implement property listings, dashboards, inquiries, and Airbnb/interior upgrade integration.

### Queue Items

#### G1. Property Listings

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase F complete, payments stable, Firestore stable |
| **Estimated Complexity** | High |
| **Recommended Order** | 1st in Phase G |
| **Risks to Avoid** | Duplicate property data, broken property search, unoptimized images |
| **What Must Remain Centralized** | Property data (Firestore), search logic |
| **Testing Requirements** | Property display, search functionality, responsive design |

**Description:** Create property listing pages with images, details, and inquiry forms.

**Implementation Steps:**
1. Create `properties/` folder.
2. Add `properties` collection to Firestore.
3. Create property listing page template.
4. Create property detail page template.
5. Add property images (optimized WebP).
6. Add property details (location, price, features).
7. Implement property search functionality.
8. Implement property filtering (location, price, type).
9. Test property display.
10. Test search functionality.
11. Test on all breakpoints.

---

#### G2. Property Dashboards

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase G1 complete, property listings stable, agent accounts |
| **Estimated Complexity** | High |
| **Recommended Order** | 2nd in Phase G |
| **Risks to Avoid** | Unauthorized agent access, broken dashboard functionality, data exposure |
| **What Must Remain Centralized** | Agent accounts, property data (Firestore), dashboard components |
| **Testing Requirements** | Agent access, dashboard functionality, security rules |

**Description:** Implement agent dashboards for managing property listings and inquiries.

**Implementation Steps:**
1. Add `agent` role to Firestore security rules.
2. Create `agent/dashboard.html` page from template.
3. Implement property listing management (add, edit, delete).
4. Implement inquiry management (view, respond to inquiries).
5. Test agent access (only agents can access).
6. Test dashboard functionality.
7. Test security rules (non-agents blocked).
8. Test on all breakpoints.

---

#### G3. Property Inquiries

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase G1 complete, property listings stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 3rd in Phase G |
| **Risks to Avoid** | Broken inquiry forms, spam inquiries, missing notifications |
| **What Must Remain Centralized** | Inquiry data (Firestore), form validation |
| **Testing Requirements** | Inquiry form, spam prevention, notification delivery |

**Description:** Implement property inquiry forms with spam prevention and notifications.

**Implementation Steps:**
1. Add `inquiries` collection to Firestore.
2. Add inquiry security rules.
3. Implement inquiry form on property detail pages.
4. Use existing form validation (`js/form-validation.js`).
5. Add spam prevention (honeypot, time check, rate limit).
6. Implement inquiry notifications to agents.
7. Test inquiry form.
8. Test spam prevention.
9. Test notification delivery.

---

#### G4. Airbnb/Interior Upgrade Integration

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase G2 complete, agent dashboards stable, Airbnb partnership |
| **Estimated Complexity** | High |
| **Recommended Order** | 4th in Phase G |
| **Risks to Avoid** | Broken API integration, data inconsistency, partnership violations |
| **What Must Remain Centralized** | Partnership data, integration logic |
| **Testing Requirements** | API integration, data sync, package display |

**Description:** Integrate Airbnb partnership packages and interior upgrade services.

**Implementation Steps:**
1. Document Airbnb partnership packages.
2. Create partnership package pages.
3. Implement interior upgrade service booking.
4. Implement Airbnb property sync (if API available).
5. Test partnership package display.
6. Test interior upgrade booking.
7. Test data sync (if applicable).

---

### Phase G Completion Criteria

Phase G is complete when:

- [ ] Property listings implemented (display, search, filtering)
- [ ] Property dashboards implemented (agent management)
- [ ] Property inquiries implemented (forms, notifications)
- [ ] Airbnb/interior upgrade integration implemented
- [ ] Property CSS loads conditionally
- [ ] Property JS loads conditionally
- [ ] Non-property pages unchanged
- [ ] Health score >= 8/10

---

## PHASE H — Platform Scaling

**Goal:** Optimize performance, scale CDN/media, implement analytics, automation, and AI workflows.

### Queue Items

#### H1. Performance Optimization

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase G complete, all features stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 1st in Phase H |
| **Risks to Avoid** | Performance regression, broken functionality, cache issues |
| **What Must Remain Centralized** | Performance strategy, caching rules |
| **Testing Requirements** | Lighthouse scores, cache effectiveness, load testing |

**Description:** Optimize platform performance with advanced techniques (code splitting, advanced caching, etc.).

**Implementation Steps:**
1. Run Lighthouse audit on all major pages.
2. Identify performance bottlenecks.
3. Implement code splitting for feature-specific JS.
4. Implement advanced caching strategies (Cloudflare cache rules).
5. Optimize critical rendering path.
6. Implement service worker for offline support (optional).
7. Test Lighthouse scores (target >= 95).
8. Test cache effectiveness.
9. Run load testing.

---

#### H2. CDN/Media Scaling

| Priority | High |
|----------|------|
| **Dependency Requirements** | Phase H1 complete, performance optimized |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 2nd in Phase H |
| **Risks to Avoid** | Broken image links, increased costs, cache invalidation issues |
| **What Must Remain Centralized** | Media storage strategy, CDN configuration |
| **Testing Requirements** | Image loading, cache invalidation, cost monitoring |

**Description:** Scale media storage with Cloud Storage and CDN for better performance.

**Implementation Steps:**
1. Set up Firebase Cloud Storage.
2. Configure Cloudflare CDN for images.
3. Implement image optimization pipeline (automatic WebP conversion).
4. Implement cache invalidation strategy.
5. Migrate existing images to Cloud Storage.
6. Test image loading.
7. Test cache invalidation.
8. Monitor costs.

---

#### H3. Analytics

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase H2 complete, CDN stable |
| **Estimated Complexity** | Medium |
| **Recommended Order** | 3rd in Phase H |
| **Risks to Avoid** | Privacy violations, data collection errors, performance impact |
| **What Must Remain Centralized** | Analytics configuration, privacy policy |
| **Testing Requirements** | Data collection, privacy compliance, performance impact |

**Description:** Implement analytics (Google Analytics, Firebase Analytics) for data-driven decisions.

**Implementation Steps:**
1. Set up Google Analytics 4.
2. Set up Firebase Analytics.
3. Implement event tracking (page views, add to cart, purchases).
4. Implement conversion tracking.
5. Update privacy policy.
6. Test data collection.
7. Verify privacy compliance.
8. Test performance impact.

---

#### H4. Automation

| Priority | Medium |
|----------|--------|
| **Dependency Requirements** | Phase H3 complete, analytics stable |
| **Estimated Complexity** | High |
| **Recommended Order** | 4th in Phase H |
| **Risks to Avoid** | Broken automation, data errors, security vulnerabilities |
| **What Must Remain Centralized** | Automation logic, Cloud Functions |
| **Testing Requirements** | Automation workflows, error handling, security |

**Description:** Implement automation (email notifications, order processing, content scheduling) with Cloud Functions.

**Implementation Steps:**
1. Set up Firebase Cloud Functions.
2. Implement automated email notifications (order confirmation, shipping updates).
3. Implement automated order processing (payment confirmation triggers order status).
4. Implement content scheduling (auto-publish articles).
5. Test automation workflows.
6. Test error handling.
7. Test security (unauthorized triggers blocked).

---

#### H5. AI Workflows

| Priority | Low |
|----------|-------|
| **Dependency Requirements** | Phase H4 complete, automation stable |
| **Estimated Complexity** | High |
| **Recommended Order** | 5th in Phase H |
| **Risks to Avoid** | AI hallucinations, data privacy violations, cost overruns |
| **What Must Remain Centralized** | AI integration logic, API keys (server-side) |
| **Testing Requirements** | AI accuracy, privacy compliance, cost monitoring |

**Description:** Implement AI workflows (content generation, recommendations, chat support) with careful governance.

**Implementation Steps:**
1. Define AI use cases (content suggestions, product recommendations, chat support).
2. Select AI provider (OpenAI, Anthropic, etc.).
3. Implement AI integration (server-side Cloud Functions).
4. Implement AI governance (human review, content moderation).
5. Test AI accuracy.
6. Test privacy compliance.
7. Monitor costs.
8. Document AI safety rules.

---

### Phase H Completion Criteria

Phase H is complete when:

- [ ] Performance optimized (Lighthouse >= 95)
- [ ] CDN/media scaled (Cloud Storage, Cloudflare CDN)
- [ ] Analytics implemented (Google Analytics, Firebase Analytics)
- [ ] Automation implemented (email, order processing, content scheduling)
- [ ] AI workflows implemented (with governance)
- [ ] Health score >= 8/10
- [ ] Platform ready for long-term scaling

---

## Summary

This implementation queue organizes all remaining future platform work into 8 manageable phases:

- **Phase A:** Brand Website Refinement (service pages, portfolio, articles, images, responsiveness)
- **Phase B:** SEO Expansion (article clusters, location SEO, schema, internal links, content scaling)
- **Phase C:** Sidebar Reintegration (sidebar system, category navigation, testing, accessibility, rollout)
- **Phase D:** Marketplace Foundation (categories, product cards, detail pages, sourcing, filtering/search)
- **Phase E:** Accounts & Dashboards (client, vendor, provider, admin, notifications)
- **Phase F:** Commerce & Payments (cart, checkout, M-Pesa, Paystack, Stripe, order tracking)
- **Phase G:** Real Estate Expansion (listings, dashboards, inquiries, Airbnb integration)
- **Phase H:** Platform Scaling (performance, CDN, analytics, automation, AI)

**Follow this queue sequentially. Complete each phase before advancing to the next. Maintain clean architecture principles throughout.**
