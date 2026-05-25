# Furnostyles Platform Readiness Transition Document

**Document Type:** Transition Guide | **Date:** 2026-05-22 | **Version:** 1.0 | **Current Phase:** 1 — Brand Foundation

---

## How to Use This Document

This document explains when and how the project should safely transition from a clean brand website to advanced platform development. Use it to:

- Understand what must be stable before advancing phases
- Identify checkpoints before adding complex features
- Recognize signs of architectural health or chaos
- Follow safe rules for future expansion
- Guide AI-assisted refactors without breaking the architecture

**This is a decision-making document, not a build guide.**

---

## 1. What Parts of the Brand Website Are Considered Stable

The brand website (Phase 1) must be stable before any advanced platform features are added.

### Stable Systems (Ready for Phase 2)

| System | Stability Criteria | Current Status |
|--------|-------------------|----------------|
| **Layout system** | `.premium-layout` and `.premium-main` work on all breakpoints | Complete |
| **Design tokens** | CSS variables for colours, fonts, spacing | Complete |
| **Component system** | Buttons, cards, forms styled consistently | Complete |
| **Header/footer** | Dynamic loading works on all pages | Complete |
| **Navigation data** | Centralized in `js/navigation-data.js` | Complete |
| **Form validation** | Centralized in `js/form-validation.js` | Complete |
| **Spam prevention** | Honeypot, time check, rate limit working | Complete |
| **Image organization** | Organized subfolders, naming convention | Complete |
| **CSS architecture** | Single `style.css` with layers | Complete |
| **JS architecture** | Namespaced functions, no global pollution | Complete |

### Stability Checklist

Before advancing to Phase 2 (SEO & Content Expansion), verify:

- [ ] All core pages (home, services, portfolio, contact) are created
- [ ] All pages use the template structure from `index.html`
- [ ] Header and footer load correctly on every page
- [ ] Zero console errors on all pages
- [ ] Lighthouse performance >= 90 on all major pages
- [ ] Lighthouse accessibility = 100 on all major pages
- [ ] All images optimized (WebP, compressed)
- [ ] All internal links work (zero 404s)
- [ ] All external links work and open in new tab
- [ ] All pages have unique meta tags
- [ ] Responsive design verified on all breakpoints
- [ ] No inline styles on structural elements
- [ ] No sidebar HTML, CSS, or JS anywhere
- [ ] All documentation is up to date

### What "Stable" Means

A system is stable when:

- It follows the documented architecture
- It has been tested on all breakpoints
- It has zero console errors
- It has been documented
- It can be reused without modification
- Changes to it do not break other systems

---

## 2. What Must Be Completed Before Marketplace Begins

The marketplace (Phase 5) requires certain prerequisites to be complete.

### Prerequisites for Marketplace

| Prerequisite | Phase | Why Required |
|--------------|-------|--------------|
| **Brand website stable** | 1 | Foundation must be solid before adding complexity |
| **SEO foundation complete** | 2 | Marketplace pages need SEO infrastructure |
| **Advanced UX complete** | 3 | Marketplace needs search, filters, sorting |
| **Service request system complete** | 4 | Marketplace needs lead capture integration |
| **Accounts/dashboards complete** | 6 | Vendors need accounts to manage products |
| **Payments complete** | 7 | Marketplace needs transaction processing |

### Marketplace Readiness Checklist

Before starting Phase 5 (Marketplace Foundation), verify:

- [ ] Phase 1 (Brand Foundation) is complete and stable
- [ ] Phase 2 (SEO & Content) is complete and stable
- [ ] Phase 3 (Advanced UX) is complete and stable
- [ ] Phase 4 (Service Request System) is complete and stable
- [ ] Phase 6 (Accounts & Dashboards) is complete and stable
- [ ] Phase 7 (Payments & Commerce) is complete and stable
- [ ] Firebase Firestore is active with security rules
- [ ] Firebase Authentication is active with role-based access
- [ ] Payment providers (M-Pesa, Paystack, Stripe) are set up
- [ ] Vendor onboarding workflow is documented
- [ ] Product moderation workflow is documented
- [ ] Marketplace conditional loading strategy is documented

### Why These Prerequisites Matter

| Prerequisite | Risk if Skipped |
|--------------|-----------------|
| Brand website unstable | Marketplace built on shaky foundation |
| No SEO foundation | Marketplace pages won't rank |
| No search/filters | Users cannot find products |
| No accounts | No way to manage vendors |
| No payments | No way to process transactions |
| No Firebase | No backend for product data |

### Marketplace Safety Rules

| Rule | Why |
|------|-----|
| Marketplace CSS loads conditionally | Prevents bloat on non-marketplace pages |
| Marketplace JS loads conditionally | Prevents bloat on non-marketplace pages |
| Marketplace pages use opt-in layout | Prevents layout regression on other pages |
| Vendor accounts require approval | Prevents low-quality products |
| Product data centralized in Firestore | Prevents data drift |

---

## 3. What Must Be Completed Before Sidebar Reintegration

The sidebar (Phase 3) requires certain prerequisites to avoid the old squeezing problem.

### Prerequisites for Sidebar

| Prerequisite | Phase | Why Required |
|--------------|-------|--------------|
| **Brand website stable** | 1 | Layout system must be solid before adding sidebar |
| **Responsive design verified** | 1 | Sidebar must not break mobile layout |
| **CSS Grid mastery** | 1 | Sidebar uses CSS Grid, not float calculations |
| **Drawer pattern designed** | 3 | Mobile sidebar must be off-canvas |
| **Conditional loading strategy** | 3 | Sidebar JS must load only on pages with sidebar |

### Sidebar Readiness Checklist

Before starting Phase 3 (Advanced UX) sidebar implementation, verify:

- [ ] Phase 1 (Brand Foundation) is complete and stable
- [ ] Responsive design tested on all breakpoints (320px, 768px, 1024px, 1440px)
- [ ] No horizontal scroll on any breakpoint
- [ ] CSS Grid layout system is working correctly
- [ ] Mobile drawer pattern is designed and documented
- [ ] Sidebar opt-in strategy is documented (`.premium-layout--with-sidebar`)
- [ ] Sidebar conditional loading strategy is documented
- [ ] Sidebar CSS file (`css/sidebar.css`) is created but not loaded
- [ ] Sidebar JS file (`js/sidebar.js`) is created but not loaded
- [ ] Sidebar HTML component is created but not loaded
- [ ] Non-sidebar pages are tested and confirmed unchanged

### Sidebar Safety Rules

| Rule | Why |
|------|-----|
| Sidebar is opt-in only | Not every page needs a sidebar |
| Sidebar uses CSS Grid | No squeezing calculations |
| Mobile sidebar is drawer pattern | No content squeezing on mobile |
| Sidebar CSS loads conditionally | No bloat on non-sidebar pages |
| Sidebar JS loads conditionally | No bloat on non-sidebar pages |
| Non-sidebar pages remain unchanged | No regression risk |

### The Old Sidebar Mistake

**Old mistake:** Sidebar was forced into every page with fixed pixel width, causing content squeezing on mobile.

**New approach:** Sidebar is opt-in, uses CSS Grid, and mobile sidebar is a drawer pattern.

---

## 4. What Must Be Completed Before Accounts/Dashboards

Accounts and dashboards (Phase 6) require certain prerequisites to avoid duplication and security issues.

### Prerequisites for Accounts/Dashboards

| Prerequisite | Phase | Why Required |
|--------------|-------|--------------|
| **Brand website stable** | 1 | Foundation must be solid before adding authentication |
| **Firebase project set up** | 4 | Backend infrastructure needed |
| **Firestore security rules written** | 4 | Security rules must exist before collections |
| **Service request system complete** | 4 | Dashboards need data to display |
| **Payment system complete** | 7 | Client dashboards need order history |

### Accounts/Dashboards Readiness Checklist

Before starting Phase 6 (Accounts & Dashboards), verify:

- [ ] Phase 1 (Brand Foundation) is complete and stable
- [ ] Phase 4 (Service Request System) is complete and stable
- [ ] Firebase project is created in Firebase Console
- [ ] Firebase Authentication is enabled
- [ ] Firestore database is created
- [ ] Firestore security rules are written and tested
- [ ] Account types are documented (client, vendor, admin, agent)
- [ ] Role-based access control is documented
- [ ] Dashboard architecture is documented
- [ ] Dashboard CSS (`css/dashboard.css`) is created but not loaded
- [ ] Dashboard JS (`js/auth.js`, `js/dashboard.js`) is created but not loaded
- [ ] Login page template is created
- [ ] Registration page template is created
- [ ] Password reset flow is documented
- [ ] Email verification is enabled in Firebase Auth
- [ ] MFA for admin accounts is documented

### Accounts/Dashboards Safety Rules

| Rule | Why |
|------|-----|
| Centralized authentication | Firebase Auth is single source of truth |
| Centralized user data | Firestore `users` collection is single source of truth |
| Role-based access control | Firestore security rules enforce permissions |
| Dashboard CSS loads conditionally | No bloat on non-dashboard pages |
| Dashboard JS loads conditionally | No bloat on non-dashboard pages |
| Security rules before collections | Prevents open database |
| Email verification required | Prevents fake accounts |

### The Old Duplication Mistake

**Old mistake (hypothetical):** Login forms on every page, user profile HTML duplicated, no central authentication.

**New approach:** Single login page, centralized Firebase Auth, Firestore security rules, conditional dashboard loading.

---

## 5. What Must Be Completed Before Firebase Integration

Firebase integration (Phase 4+) requires certain prerequisites to avoid security and data issues.

### Prerequisites for Firebase Integration

| Prerequisite | Phase | Why Required |
|--------------|-------|--------------|
| **Brand website stable** | 1 | Frontend must be solid before adding backend |
| **Form system complete** | 1 | Forms need Firebase to store submissions |
| **Spam prevention complete** | 1 | Firebase needs clean data, not spam |
| **Security headers configured** | 1 | Firebase needs secure frontend |
| **Firebase project planned** | 4 | Architecture must be planned before implementation |

### Firebase Readiness Checklist

Before activating Firebase (Phase 4), verify:

- [ ] Phase 1 (Brand Foundation) is complete and stable
- [ ] Form validation is working (`js/form-validation.js`)
- [ ] Spam prevention is working (honeypot, time check, rate limit)
- [ ] `_headers` file is created with security headers
- [ ] Firebase project is created in Firebase Console
- [ ] Firebase config file (`shared/firebase/firebase-config.js`) has public API keys only
- [ ] Firebase bridge file (`shared/firebase/firebase-bridge.js`) is created
- [ ] Firestore security rules are written (before creating collections)
- [ ] Data models are documented (leads, products, users, orders)
- [ ] Input sanitization requirements are documented
- [ ] Firebase App Check is documented (future)

### Firebase Safety Rules

| Rule | Why |
|------|-----|
| Public keys only in config | Private keys in config = security breach |
| Security rules before collections | Open rules = data theft |
| Input sanitization before storage | Unsanitized data = injection attacks |
| Validate all inputs server-side | Client-side validation can be bypassed |
| Monitor usage and costs | Unexpected costs = budget overrun |
| Test with test data first | Production data corruption risk |

### Firebase Integration Workflow

```
1. Create Firebase project in Firebase Console.
2. Enable Authentication (Email/Password).
3. Enable Firestore database.
4. Write security rules (before creating collections).
5. Add public API keys to firebase-config.js.
6. Implement firebase-bridge.js functions.
7. Test with test data in a test environment.
8. Verify security rules block unauthorized access.
9. Enable in production after testing.
10. Monitor usage and set budget alerts.
```

---

## 6. What Must Be Completed Before Payments

Payments (Phase 7) require certain prerequisites to avoid legal and security issues.

### Prerequisites for Payments

| Prerequisite | Phase | Why Required |
|--------------|-------|--------------|
| **Accounts/dashboards complete** | 6 | Users need accounts to make payments |
| **Marketplace complete** | 5 | Payments need products to purchase |
| **Firebase complete** | 4 | Payments need backend for order data |
| **Security headers configured** | 1 | Payments need secure frontend |
| **Kenyan financial licenses** | External | Legal requirement for payment processing |

### Payments Readiness Checklist

Before starting Phase 7 (Payments & Commerce), verify:

- [ ] Phase 5 (Marketplace) is complete and stable
- [ ] Phase 6 (Accounts & Dashboards) is complete and stable
- [ ] Phase 4 (Firebase) is complete and stable
- [ ] Firebase Firestore is active with security rules
- [ ] Firebase Authentication is active with role-based access
- [ ] M-Pesa API account is set up
- [ ] Paystack account is set up
- [ ] Stripe account is set up (if international customers)
- [ ] Kenyan financial licenses are obtained (consult legal counsel)
- [ ] PCI compliance rules are documented
- [ ] Test vs production keys are documented
- [ ] Cart system (`js/cart.js`) is created
- [ ] Checkout flow (`js/checkout.js`) is created
- [ ] Server-side payment validation (Cloud Functions) is documented
- [ ] Webhook endpoints are documented
- [ ] Idempotency keys are documented
- [ ] Refund workflow is documented
- [ ] Pricing display in KES is documented
- [ ] Sandbox testing is completed for all providers

### Payments Safety Rules

| Rule | Why |
|------|-----|
| Never store card details | Storing cards = legal liability; PCI violation |
| Always use test keys in development | Real charges during development = disaster |
| Verify webhook signatures | Spoofed notifications = fraud |
| Use idempotency keys | Duplicate charges = customer disputes |
| Server-side validation | Client-side can be bypassed |
| Consult legal counsel | Missing licenses = legal shutdown |

### Payment Integration Workflow

```
1. Register with M-Pesa, Paystack, and Stripe.
2. Obtain sandbox/test keys.
3. Implement cart system (js/cart.js).
4. Implement checkout flow (js/checkout.js).
5. Implement server-side validation (Cloud Functions).
6. Set up webhook endpoints.
7. Test all payment flows in sandbox.
8. Verify idempotency keys work.
9. Obtain necessary Kenyan financial licenses.
7. Switch to production keys.
8. Monitor first transactions closely.
```

---

## 7. What Must Be Completed Before Real Estate Expansion

Real estate expansion (Phase 8) requires certain prerequisites to avoid feature conflicts.

### Prerequisites for Real Estate

| Prerequisite | Phase | Why Required |
|--------------|-------|--------------|
| **Marketplace complete** | 5 | Real estate needs marketplace infrastructure |
| **Accounts/dashboards complete** | 6 | Agents need accounts to manage listings |
| **Payments complete** | 7 | Real estate transactions need payment processing |
| **Property data model documented** | 8 | Firestore schema must be planned |

### Real Estate Readiness Checklist

Before starting Phase 8 (Real Estate Expansion), verify:

- [ ] Phase 5 (Marketplace) is complete and stable
- [ ] Phase 6 (Accounts & Dashboards) is complete and stable
- [ ] Phase 7 (Payments) is complete and stable
- [ ] Property data model is documented (Firestore `properties` collection)
- [ ] Property categories are documented
- [ ] Property search filters are documented
- [ ] Agent account type is documented
- [ ] Agent dashboard is documented
- [ ] Airbnb partnership packages are documented
- [ ] Property verification workflow is documented
- [ ] Property inquiry forms are documented
- [ ] `properties/` folder is created
- [ ] `js/property-search.js` is created
- [ ] `js/property-filters.js` is created
- [ ] Property images follow optimization standards

### Real Estate Safety Rules

| Rule | Why |
|------|-----|
| Conditional loading for property JS | No bloat on non-property pages |
| Property verification required | Fake listings = legal liability |
| Apply same image standards | Unoptimized images = poor UX |
| Agent accounts require approval | Prevents unverified agents |
| Airbnb partnership documented | Clear business terms |

---

## 8. Recommended Stability Checkpoints

Stability checkpoints ensure the architecture remains healthy as features are added.

### Stability Checkpoint Schedule

| Checkpoint | When | What to Verify |
|------------|------|----------------|
| **Pre-Phase 2** | Before SEO & Content | Brand website stability |
| **Pre-Phase 3** | Before Advanced UX | Layout system stability |
| **Pre-Phase 4** | Before Firebase | Frontend stability |
| **Pre-Phase 5** | Before Marketplace | All previous phases stable |
| **Pre-Phase 6** | Before Accounts | Firebase stability |
| **Pre-Phase 7** | Before Payments | Accounts stability |
| **Pre-Phase 8** | Before Real Estate | Payments stability |
| **Post-Phase 8** | After all phases | Full platform stability |

### Stability Checklist

At each checkpoint, verify:

- [ ] All previous phases are complete
- [ ] Zero console errors on all pages
- [ ] Lighthouse performance >= 90 on all major pages
- [ ] Lighthouse accessibility = 100 on all major pages
- [ ] All internal links work (zero 404s)
- [ ] All external links work
- [ ] Responsive design verified on all breakpoints
- [ ] No inline styles on structural elements
- [ ] No sidebar on non-opt-in pages
- [ ] All shared components load correctly
- [ ] All conditional loading works as expected
- [ ] Documentation is up to date
- [ ] Backup/snapshot created before proceeding

### Stability Failure Criteria

If any of these fail, do not proceed to the next phase:

| Failure | Action |
|---------|--------|
| Console errors on any page | Fix before proceeding |
| Lighthouse performance < 90 | Fix before proceeding |
| Lighthouse accessibility < 100 | Fix before proceeding |
| Broken internal links | Fix before proceeding |
| Responsive layout breaks | Fix before proceeding |
| Inline styles on structural elements | Fix before proceeding |
| Sidebar on non-opt-in pages | Fix before proceeding |
| Shared component fails to load | Fix before proceeding |
| Documentation outdated | Update before proceeding |

---

## 9. Recommended Performance Checkpoints

Performance checkpoints ensure the platform remains fast as features are added.

### Performance Checkpoint Schedule

| Checkpoint | When | Target |
|------------|------|--------|
| **Pre-Phase 2** | Before SEO & Content | Lighthouse >= 90 |
| **Pre-Phase 3** | Before Advanced UX | Lighthouse >= 90 |
| **Pre-Phase 4** | Before Firebase | Lighthouse >= 90 |
| **Pre-Phase 5** | Before Marketplace | Lighthouse >= 90 |
| **Pre-Phase 6** | Before Accounts | Lighthouse >= 90 |
| **Pre-Phase 7** | Before Payments | Lighthouse >= 90 |
| **Pre-Phase 8** | Before Real Estate | Lighthouse >= 90 |
| **Monthly** | Ongoing | Lighthouse >= 90 |

### Performance Checklist

At each checkpoint, verify:

- [ ] Lighthouse performance >= 90 on homepage
- [ ] Lighthouse performance >= 90 on service pages
- [ ] Lighthouse performance >= 90 on blog pages
- [ ] Lighthouse performance >= 90 on portfolio pages
- [ ] Lighthouse performance >= 90 on contact page
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] TBT (Total Blocking Time) < 200ms
- [ ] All images optimized (WebP, compressed)
- [ ] All images have `width` and `height` attributes
- [ ] Below-the-fold images have `loading="lazy"`
- [ ] Non-critical JS is deferred
- [ ] Critical CSS is inline (if needed)
- [ ] Font loading uses `font-display: swap`
- [ ] No render-blocking resources

### Performance Failure Criteria

If any of these fail, do not proceed to the next phase:

| Failure | Action |
|---------|--------|
| Lighthouse performance < 90 | Optimize before proceeding |
| LCP > 2.5s | Optimize images or defer JS |
| CLS > 0.1 | Add image dimensions |
| TBT > 200ms | Defer non-critical JS |
| Unoptimized images | Optimize before proceeding |
| Missing image dimensions | Add before proceeding |

---

## 10. Recommended SEO Checkpoints

SEO checkpoints ensure the platform remains search-friendly as content is added.

### SEO Checkpoint Schedule

| Checkpoint | When | What to Verify |
|------------|------|----------------|
| **Pre-Phase 2** | Before SEO & Content | Meta tag infrastructure |
| **Pre-Phase 3** | Before Advanced UX | Internal linking |
| **Pre-Phase 5** | Before Marketplace | Product SEO |
| **Pre-Phase 8** | Before Real Estate | Property SEO |
| **Monthly** | Ongoing | Search Console data |

### SEO Checklist

At each checkpoint, verify:

- [ ] `robots.txt` exists and is correct
- [ ] `sitemap.xml` exists and is submitted
- [ ] All pages have unique `<title>` tags
- [ ] All pages have unique `<meta name="description">` (150-160 chars)
- [ ] All pages have one `<h1>` tag
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] All images have descriptive `alt` text
- [ ] All internal links work (zero 404s)
- [ ] All external links open in new tab
- [ ] Canonical URLs are correct
- [ ] OG tags are present on major pages
- [ ] Structured data (JSON-LD) is present where applicable
- [ ] Google Search Console is registered
- [ ] Bing Webmaster Tools is registered
- [ ] No duplicate content exists
- [ ] No thin content (< 300 words) exists

### SEO Failure Criteria

If any of these fail, do not proceed to the next phase:

| Failure | Action |
|---------|--------|
| Duplicate meta descriptions | Fix before proceeding |
| Missing `alt` text on images | Add before proceeding |
| Broken internal links | Fix before proceeding |
| Duplicate content | Remove or consolidate before proceeding |
| Thin content | Expand or remove before proceeding |
| Missing sitemap | Create before proceeding |

---

## 11. Recommended Architecture Checkpoints

Architecture checkpoints ensure the codebase remains clean and maintainable as features are added.

### Architecture Checkpoint Schedule

| Checkpoint | When | What to Verify |
|------------|------|----------------|
| **Pre-Phase 2** | Before SEO & Content | CSS/JS centralization |
| **Pre-Phase 3** | Before Advanced UX | No layout corruption |
| **Pre-Phase 4** | Before Firebase | No duplication |
| **Pre-Phase 5** | Before Marketplace | Conditional loading |
| **Pre-Phase 6** | Before Accounts | Data centralization |
| **Pre-Phase 7** | Before Payments | Security rules |
| **Pre-Phase 8** | Before Real Estate | Feature isolation |
| **Monthly** | Ongoing | Code quality |

### Architecture Checklist

At each checkpoint, verify:

- [ ] CSS is centralized in `css/style.css` (no duplicate CSS files)
- [ ] JS is centralized in shared files (no duplicate logic)
- [ ] Data is centralized in data files (`navigation-data.js`, `article-data.js`)
- [ ] Components are in `shared/` folder (no hardcoded header/footer)
- [ ] No inline styles on structural elements
- [ ] No sidebar on non-opt-in pages
- [ ] Conditional loading works for feature-specific CSS/JS
- [ ] Class naming follows conventions (`.premium-`, `.fns-`, `.fld-`)
- [ ] File naming follows conventions (kebab-case)
- [ ] Folder structure is organized (css/, js/, shared/, assets/)
- [ ] No global JS pollution (functions namespaced under `Furnostyles.*`)
- [ ] Documentation is up to date
- [ ] No copy-pasted code between pages

### Architecture Failure Criteria

If any of these fail, do not proceed to the next phase:

| Failure | Action |
|---------|--------|
| Duplicate CSS files | Merge into `style.css` before proceeding |
| Duplicate JS logic | Centralize before proceeding |
| Hardcoded header/footer | Convert to dynamic loading before proceeding |
| Inline styles on structural elements | Convert to CSS classes before proceeding |
| Sidebar on non-opt-in pages | Remove before proceeding |
| Global JS pollution | Namespace under `Furnostyles.*` before proceeding |
| Copy-pasted code | Centralize before proceeding |

---

## 12. Recommended Deployment Checkpoints

Deployment checkpoints ensure the deployment process remains safe and reversible.

### Deployment Checkpoint Schedule

| Checkpoint | When | What to Verify |
|------------|------|----------------|
| **Pre-Phase 2** | Before SEO & Content | Preview URL workflow |
| **Pre-Phase 3** | Before Advanced UX | Rollback tested |
| **Pre-Phase 4** | Before Firebase | Firebase config safe |
| **Pre-Phase 5** | Before Marketplace | Conditional loading verified |
| **Pre-Phase 6** | Before Accounts | Security rules verified |
| **Pre-Phase 7** | Before Payments | Test keys verified |
| **Pre-Phase 8** | Before Real Estate | Full platform verified |
| **Every deploy** | Ongoing | Safety checklist |

### Deployment Checklist

Before every deployment, verify:

- [ ] All changes saved
- [ ] Local preview works correctly
- [ ] Zero console errors on all affected pages
- [ ] Lighthouse scores meet targets
- [ ] All internal links tested
- [ ] No placeholder text on public pages
- [ ] Project snapshot created (for medium/high risk changes)
- [ ] Preview URL tested on mobile and desktop
- [ ] Preview Lighthouse scores acceptable
- [ ] Production deploy marked correctly
- [ ] Live site verified after production deploy
- [ ] 30-minute monitoring complete
- [ ] Rollback plan documented

### Deployment Safety Rules

| Rule | Why |
|------|-----|
| Never deploy during peak traffic hours | Support may not be available if issues arise |
| Never deploy on Friday evening | Weekend support may be unavailable |
| Always have a rollback plan | Know the last working deploy ID or snapshot location |
| Test the preview URL before production | Never push directly to production without preview testing |
| Do not delete old deploys immediately | Keep the last 5 deploys for rollback |
| Monitor the live site for 30 minutes after deployment | Catch issues before users report them |

### Deployment Failure Criteria

If any of these fail, do not deploy:

| Failure | Action |
|---------|--------|
| Console errors on preview | Fix before deploying |
| Lighthouse scores below target | Fix before deploying |
| Broken links on preview | Fix before deploying |
| Placeholder text on preview | Complete content before deploying |
| No snapshot for high-risk change | Create snapshot before deploying |
| No rollback plan | Document rollback plan before deploying |

---

## 13. Future Scalability Checkpoints

Scalability checkpoints ensure the platform can handle growth without breaking.

### Scalability Checkpoint Schedule

| Checkpoint | When | What to Verify |
|------------|------|----------------|
| **Pre-Phase 5** | Before Marketplace | Data model scalability |
| **Pre-Phase 6** | Before Accounts | User scalability |
| **Pre-Phase 7** | Before Payments | Transaction scalability |
| **Pre-Phase 8** | Before Real Estate | Property scalability |
| **Quarterly** | Ongoing | Infrastructure capacity |

### Scalability Checklist

At each checkpoint, verify:

- [ ] Data models can handle 10x growth (Firestore schema)
- [ ] Search performance is acceptable (indexes, pagination)
- [ ] Image storage is scalable (CDN, Cloud Storage)
- [ ] Payment processing can handle volume (provider limits)
- [ ] User authentication can handle volume (Firebase limits)
- [ ] Conditional loading prevents bloat (feature CSS/JS not loaded everywhere)
- [ ] Code splitting is implemented (feature-specific files)
- [ ] Caching strategy is effective (Cloudflare CDN)
- [ ] Database queries are optimized (Firestore indexes)
- [ ] API rate limits are documented (for future integrations)
- [ ] Monitoring is set up (Firebase console, Cloudflare analytics)

### Scalability Failure Criteria

If any of these fail, do not proceed to the next phase:

| Failure | Action |
|---------|--------|
| Data model cannot scale | Redesign schema before proceeding |
| Search performance degrades | Add indexes or pagination before proceeding |
| Image storage not scalable | Implement CDN before proceeding |
| Payment provider limits too low | Choose different provider before proceeding |
| No conditional loading | Implement before proceeding |
| No monitoring | Set up monitoring before proceeding |

---

## 14. What Signs Indicate the Architecture Is Healthy

These signs indicate the architecture is healthy and ready for expansion.

### Health Indicators

| Indicator | Healthy Sign | Unhealthy Sign |
|-----------|---------------|----------------|
| **CSS** | Single `style.css` with layers | Multiple CSS files with duplicates |
| **JS** | Centralized shared files, namespaced | Duplicate logic, global pollution |
| **Components** | Dynamic loading from `shared/` | Hardcoded in every page |
| **Data** | Centralized in data files | Hardcoded in HTML |
| **Layout** | CSS Grid, no sidebar squeezing | Float-based, sidebar squeezing |
| **Performance** | Lighthouse >= 90 | Lighthouse < 90 |
| **SEO** | Unique meta tags, no duplicates | Duplicate meta tags |
| **Documentation** | Comprehensive `docs/` folder | Missing or outdated docs |
| **Deployment** | Preview URL tested, rollback plan | Direct production edits |
| **Console** | Zero errors | Red error messages |

### Health Checklist

The architecture is healthy if:

- [ ] All shared systems are centralized
- [ ] No duplication exists in CSS, JS, or HTML
- [ ] All pages use the template structure
- [ ] All components load dynamically
- [ ] Lighthouse scores meet targets
- [ ] Zero console errors
- [ ] Documentation is comprehensive and up to date
- [ ] Deployment workflow is safe and tested
- [ ] Rollback plan is documented
- [ ] Conditional loading is implemented for features

### Health Score

| Score | Criteria |
|-------|----------|
| **10/10** | All health indicators are healthy |
| **8-9/10** | Most indicators healthy; minor issues to fix |
| **5-7/10** | Some indicators unhealthy; needs attention |
| **0-4/10** | Architecture is chaotic; needs rebuild |

**Do not proceed to next phase if health score is below 8/10.**

---

## 15. What Signs Indicate the Architecture Is Becoming Chaotic Again

These signs indicate the architecture is regressing into chaos.

### Chaos Indicators

| Indicator | Chaos Sign | Action Required |
|-----------|------------|----------------|
| **CSS** | New CSS files created for single pages | Merge into `style.css` |
| **JS** | New JS files with duplicate logic | Centralize in shared files |
| **Components** | Header/footer hardcoded in new pages | Convert to dynamic loading |
| **Data** | Navigation links hardcoded in new pages | Add to `navigation-data.js` |
| **Layout** | Inline styles on structural elements | Convert to CSS classes |
| **Sidebar** | Sidebar added to non-opt-in pages | Remove or make opt-in |
| **Performance** | Lighthouse scores dropping | Optimize before proceeding |
| **SEO** | Duplicate meta tags appearing | Fix before proceeding |
| **Documentation** | Docs not updated after changes | Update docs immediately |
| **Deployment** | Direct production edits | Enforce preview workflow |

### Early Warning Signs

Watch for these early warning signs:

- New CSS files appearing in `css/` folder
- New JS files appearing in `js/` folder without clear purpose
- Pages not using the template structure
- Inline styles on `.premium-*` elements
- Sidebar appearing on pages without opt-in
- Lighthouse scores dropping below 90
- Console errors appearing
- Documentation becoming outdated
- Deployment workflow being skipped

### Chaos Recovery Workflow

If chaos indicators appear:

```
1. Stop all new feature development.
2. Identify all chaos indicators.
3. Prioritize by impact (high, medium, low).
4. Fix high-impact issues first (duplicated systems, layout breaks).
5. Fix medium-impact issues (performance, SEO).
6. Fix low-impact issues (documentation, naming).
7. Run health checklist.
8. If health score >= 8/10, resume development.
9. If health score < 8/10, continue fixing.
```

---

## 16. Safe Rules for Future Expansion

These rules must be followed when adding new features to prevent chaos.

### Expansion Rules

| Rule | Why | Enforcement |
|------|-----|-------------|
| **Centralize before creating** | Duplication causes technical debt | Search existing patterns before creating new |
| **Use the template** | Template ensures consistency | All new pages copy from `index.html` |
| **Conditional loading** | Prevents bloat | Feature CSS/JS loads only on relevant pages |
| **Document before building** | Future developers need guidance | Create docs before or alongside features |
| **Test on all breakpoints** | Layout breaks on mobile | Test 320px, 768px, 1024px, 1440px |
| **Snapshot before major changes** | Irreversible breakage risk | Snapshot before shared component edits |
| **No inline styles on layout** | Violates CSS discipline | Use CSS classes only |
| **No sidebar without opt-in** | Causes squeezing | Sidebar only with `.premium-layout--with-sidebar` |
| **Namespaced JS functions** | Global pollution | Use `Furnostyles.*` namespace |
| **Update navigation data** | Orphan pages | Add new pages to `navigation-data.js` |

### Expansion Decision Tree

Before adding a new feature:

```
1. Does this feature require a new page?
   Yes -> Copy from index.html template
   No -> Proceed to 2

2. Does this feature require new CSS?
   Yes -> Add to css/style.css (not new file)
   No -> Proceed to 3

3. Does this feature require new JS?
   Yes -> Add to js/ (namespaced, conditional loading)
   No -> Proceed to 4

4. Does this feature affect shared components?
   Yes -> Snapshot first, test on all pages
   No -> Proceed to 5

5. Is this feature for all pages or specific pages?
   All pages -> Add to shared CSS/JS
   Specific pages -> Conditional loading

6. Is documentation updated?
   Yes -> Proceed to build
   No -> Update docs first
```

### Expansion Prohibitions

| Prohibition | Why |
|-------------|-----|
| Do not create new CSS files for single pages | Causes duplication |
| Do not hardcode header/footer | Causes maintenance nightmare |
| Do not add sidebar without opt-in | Causes layout squeezing |
| Do not use inline styles on layout | Violates CSS discipline |
| Do not duplicate JS logic | Causes bugs in one place not fixed in others |
| Do not skip documentation | Future developers cannot understand |
| Do not skip testing | Broken functionality |
| Do not skip snapshot | Irreversible breakage |

---

## 17. Safe Rules for Future AI-Assisted Refactors

These rules must be followed when using AI to refactor code.

### AI Refactor Rules

| Rule | Why | Enforcement |
|------|-----|-------------|
| **AI must read the full file** | AI cannot edit what it hasn't seen | Ask AI to read before editing |
| **AI must read relevant docs** | AI needs context to make safe changes | Provide architecture docs |
| **Refactor must solve a specific problem** | Vague refactors are dangerous | Document the problem first |
| **Refactor must touch minimal files** | Broad changes increase risk | Limit scope to problem area |
| **Refactor must not rename classes** | Renaming breaks references | Avoid renaming unless absolutely necessary |
| **Refactor must not move files** | Moving breaks paths | Avoid moving unless absolutely necessary |
| **Refactor must not delete code** | Deleting may break callers | Verify no callers exist first |
| **Refactor must be tested** | Untested refactors break things | Test on all affected pages |
| **Snapshot before refactor** | Irreversible breakage risk | Snapshot before shared component changes |

### AI Refactor Safety Checklist

Before accepting any AI-suggested refactor:

- [ ] Did the AI read the full file?
- [ ] Did the AI read the relevant architecture document?
- [ ] Does the refactor solve a specific, documented problem?
- [ ] Does the refactor touch only the files directly related to the problem?
- [ ] Does the refactor change shared components? If yes, verify all pages are tested.
- [ ] Does the refactor rename classes or functions? If yes, verify all references are updated.
- [ ] Does the refactor move files? If yes, verify all paths are updated.
- [ ] Does the refactor delete code? If yes, verify no callers exist.
- [ ] Does the refactor add dependencies? If yes, verify they are necessary and compatible.
- [ ] Did you create a snapshot before the refactor?

### AI Refactor Red Flags

| Red Flag | Action |
|----------|--------|
| AI suggests rewriting `style.css` | Reject. Design tokens must be preserved. |
| AI suggests changing all class names | Reject. Every HTML file references those classes. |
| AI suggests moving all JS into one file | Reject. Conditional loading is intentional. |
| AI suggests converting to a framework | Reject. Static hosting is intentional. |
| AI suggests "cleaning up" without specifics | Reject. Vague refactors are dangerous. |
| AI suggests deleting "unused" files | Reject. AI cannot reliably detect all references. |
| AI suggests adding a sidebar | Reject. Sidebar is Phase 3 opt-in only. |
| AI suggests adding marketplace features | Reject. Marketplace is Phase 5. |

### Safe AI Refactor Acceptance

Only accept refactors that:

1. Solve a specific, documented problem.
2. Touch only the files directly related to that problem.
3. Do not change shared components (or explicitly test all pages).
4. Do not rename classes, functions, or files.
5. Do not add new dependencies.
6. Have been tested on a local preview.

---

## 18. Which Systems Must Always Remain Isolated

These systems must remain isolated to prevent cross-contamination and instability.

### Isolated Systems

| System | Why Isolated | Isolation Method |
|--------|--------------|-----------------|
| **Marketplace CSS/JS** | Not needed on non-marketplace pages | Conditional loading on marketplace pages only |
| **Dashboard CSS/JS** | Not needed on non-dashboard pages | Conditional loading on dashboard pages only |
| **Sidebar CSS/JS** | Not needed on non-sidebar pages | Conditional loading on opt-in pages only |
| **Payment processing** | Not needed on non-payment pages | Conditional loading on checkout pages only |
| **Property search** | Not needed on non-property pages | Conditional loading on property pages only |
| **Admin features** | Not needed for public users | Role-based access control |
| **Firebase Auth** | Not needed for anonymous users | Conditional loading on login/dashboard pages |

### Isolation Enforcement

| Rule | Why |
|------|-----|
| Feature CSS loads only on relevant pages | Prevents bloat |
| Feature JS loads only on relevant pages | Prevents bloat |
| Admin features require role check | Prevents unauthorized access |
| Payment processing only on checkout | Prevents security exposure |
| Property search only on property pages | Prevents unnecessary complexity |

### Isolation Failure Criteria

If any of these fail, fix immediately:

| Failure | Action |
|---------|--------|
| Marketplace CSS loaded on homepage | Implement conditional loading |
| Dashboard JS loaded on contact page | Implement conditional loading |
| Sidebar loaded on non-opt-in page | Remove or make opt-in |
| Payment processing on non-checkout page | Implement conditional loading |
| Admin features accessible to public | Implement role-based access control |

---

## 19. Which Systems Must Always Remain Centralized

These systems must remain centralized to prevent duplication and inconsistency.

### Centralized Systems

| System | Central Location | Why Centralized |
|--------|------------------|----------------|
| **Design tokens** | `css/style.css` (top) | One source of truth for colours, fonts, spacing |
| **Layout styles** | `css/style.css` | Every page uses the same structure |
| **Button styles** | `css/style.css` `.fns-btn*` | Consistent buttons everywhere |
| **Card styles** | `css/style.css` `.fns-card*` | Consistent cards everywhere |
| **Form styles** | `css/style.css` `.fns-form*` | Consistent forms everywhere |
| **Navigation data** | `js/navigation-data.js` | One link store for entire site |
| **Header HTML** | `shared/header.html` | One header for all pages |
| **Footer HTML** | `shared/footer.html` | One footer for all pages |
| **Form validation** | `js/form-validation.js` | One engine for all forms |
| **Spam prevention** | `js/form-validation.js` | One honeypot/time-check for all forms |
| **Firebase config** | `shared/firebase/firebase-config.js` | One config for all Firebase features |
| **Article metadata** | `js/article-data.js` | One source for blog content |
| **Shared utilities** | `js/main.js` | Reusable functions, not duplicated |

### Centralization Enforcement

| Rule | Why |
|------|-----|
| If a pattern appears on more than 2 pages, centralize it | Duplication breeds inconsistency |
| If a style is used on more than 2 pages, put it in `style.css` | Page-specific CSS is for exceptions only |
| If a function is used on more than 2 pages, put it in a shared JS file | Copy-paste code is a maintenance liability |
| If data is referenced on more than 2 pages, put it in a shared data file | Central data stores prevent drift |
| Never create a second `style.css` or `main.js` | Splitting the foundation creates confusion |
| Never inline shared styles or scripts in individual pages | Inline code is not cacheable and hard to maintain |

### Centralization Failure Criteria

If any of these fail, fix immediately:

| Failure | Action |
|---------|--------|
| Duplicate CSS files | Merge into `style.css` |
| Duplicate JS logic | Centralize in shared files |
| Hardcoded navigation links | Add to `navigation-data.js` |
| Hardcoded header/footer | Convert to dynamic loading |
| Inline shared styles | Convert to CSS classes |
| Inline shared scripts | Convert to external JS files |

---

## 20. Recommended Next Immediate Development Phase After Brand-Site Completion

After Phase 1 (Brand Foundation) is complete, the next phase is Phase 2 (SEO & Content Expansion).

### Phase 2: SEO & Content Expansion

**Goal:** Build the SEO foundation and create high-value content to drive organic traffic.

### Phase 2 Prerequisites

- [ ] Phase 1 (Brand Foundation) is complete and stable
- [ ] Brand website passes all stability checkpoints
- [ ] Brand website passes all performance checkpoints
- [ ] Brand website passes all architecture checkpoints
- [ ] Health score is >= 8/10

### Phase 2 Objectives

| Objective | Description |
|-----------|-------------|
| **Cornerstone content** | Write 3-5 cornerstone articles (2000+ words each) targeting competitive keywords |
| **Location pages** | Create location-specific landing pages ("Interior Design Nairobi", "Interior Design Mombasa") |
| **Service-area pages** | Create pages for all service areas |
| **Internal linking** | Build internal link ecosystem between articles, services, and portfolio |
| **Content calendar** | Create 6-month content calendar |
| **SEO infrastructure** | Implement structured data (JSON-LD), optimize meta tags, submit sitemap |
| **Blog expansion** | Publish 10+ high-quality articles (800+ words each) |
| **Keyword research** | Conduct keyword research for Kenyan interior design market |

### Phase 2 Deliverables

- [ ] 3-5 cornerstone articles published
- [ ] 5-10 location pages created
- [ ] 10+ blog articles published
- [ ] Internal link ecosystem built
- [ ] Content calendar created
- [ ] Structured data implemented
- [ ] Google Search Console set up
- [ ] Bing Webmaster Tools set up
- [ ] Keyword research documented
- [ ] SEO performance baseline documented

### Phase 2 Success Criteria

Phase 2 is successful if:

- [ ] All cornerstone articles are 2000+ words
- [ ] All blog articles are 800+ words
- [ ] All pages have unique meta tags
- [ ] All pages have structured data
- [ ] Internal linking ecosystem is comprehensive
- [ ] Lighthouse SEO score = 100 on all major pages
- [ ] Sitemap is submitted to search engines
- [ ] Content calendar is realistic and actionable

### Phase 2 Safety Rules

| Rule | Why |
|------|-----|
| Do not skip Phase 1 completion | Foundation must be solid before SEO |
| Do not create thin content | Thin content has no SEO value |
| Do not duplicate content | Duplicate content causes SEO penalty |
| Do not keyword-stuff | Keyword stuffing causes SEO penalty |
| Do not skip internal linking | Internal links boost SEO |
| Do not skip structured data | Structured data enables rich snippets |
| Do not skip sitemap | Sitemap helps search engines discover pages |

### After Phase 2

After Phase 2 is complete and stable, proceed to Phase 3 (Advanced UX), which includes:

- Search functionality
- Filtering and sorting
- Sidebar reintegration (opt-in only)
- Advanced UI components

---

## Summary

The Furnostyles platform will transition from a clean brand website to an advanced platform through a phased approach. Each phase must be complete and stable before advancing to the next. Stability, performance, SEO, architecture, deployment, and scalability checkpoints ensure the platform remains healthy. Safe rules for expansion and AI-assisted refactors prevent regression. Isolated systems prevent bloat, and centralized systems prevent duplication.

**The core philosophy: Clean architecture is a competitive advantage.**

**Follow this transition guide to ensure the platform scales smoothly without accumulating technical debt.**
