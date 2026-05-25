# Furnostyles Reusable Security and Project Safety Architecture

**Date:** 2026-05-22 | **Status:** Planning

---

## 1. Safe Project Editing Principles

| Pillar | Principle | Meaning |
|--------|-----------|---------|
| **Read before editing** | Understand existing architecture before changing anything. | Every `docs/` file exists to be read first. |
| **Centralize before duplicating** | Reuse existing patterns rather than rewriting them. | Duplication is the #1 cause of maintenance debt. |
| **Edit minimally** | Change the smallest amount of code that achieves the goal. | Small changes are easy to review and revert. |
| **Test before declaring done** | Verify in a browser before considering complete. | "Looks right" is not the same as "works." |

### Safe Editing Rules

| Rule | Requirement |
|------|-------------|
| Read the relevant `docs/` document before editing any file. | Reference the architecture guide first. |
| Never edit a file you have not viewed in full. | Open and scroll through to understand structure. |
| Never delete a file without confirming it is not referenced elsewhere. | Search for the filename across the project. |
| Never rename a file without updating all references. | Search and replace across all HTML/CSS/JS. |
| Never add a new CSS class without checking if one already exists. | Search `style.css` for similar patterns. |
| Never add a new JS function without checking if one already exists. | Search `js/` for similar utilities. |
| Never change shared components without testing on every page type. | Header/footer changes affect all pages. |
| Never commit or deploy without a working local preview. | Always verify in browser first. |

---

## 2. AI-Assisted Development Safety Workflow

### Before Asking AI to Edit

| Step | Action |
|------|--------|
| 1 | Open the file and verify its current state. |
| 2 | Reference exact file path and line numbers. |
| 3 | State whether the file is shared or page-specific. |
| 4 | Mention constraints: "Do not touch the layout grid." |
| 5 | Reference the relevant architecture document. |

### AI Editing Rules

| Rule | Requirement |
|------|-------------|
| AI must read the full file before editing. | No edits based on assumptions. |
| AI must preserve all existing CSS classes unless told to rename. | Accidental deletion breaks styling. |
| AI must preserve all existing `id` attributes. | IDs are used for labels, ARIA, and JS hooks. |
| AI must not add inline styles to structural elements. | Breaks design token consistency. |
| AI must not add new global CSS variables without documenting them. | Variables affect the entire site. |
| AI must not remove accessibility attributes (`aria-*`, `role`, `alt`). | Accessibility is non-negotiable. |
| AI must not change `<h1>` tags or heading hierarchy without instruction. | SEO and screen reader structure depends on headings. |
| AI must verify all HTML tags are properly closed after editing. | Unclosed tags break rendering. |
| AI must not duplicate existing code. | Search for existing patterns first. |

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

---

## 3. Backup and Versioning Strategy

| Method | Frequency | Protects |
|--------|-----------|----------|
| **Cloudflare Pages deployments** | Every deploy | Live site is recoverable |
| **IDE version control** | Continuous | File-level undo |
| **Manual folder snapshots** | Before major changes | Full project copy before risky refactors |

### Snapshot Workflow

```
Before major change:
  1. Copy entire project folder.
  2. Name: furnostyles-YYYY-MM-DD-before-purpose
  3. Edit the original folder.
  4. Test thoroughly.
  5. If broken, restore from snapshot.
  6. If working, keep snapshot 30 days then delete.
```

### Versioning Rules

| Rule | Requirement |
|------|-------------|
| Always snapshot before touching shared files (`style.css`, `main.js`, header, footer). | Mistakes affect every page. |
| Always snapshot before deleting more than one file. | Hard to undo manually. |
| Always snapshot before refactoring more than 3 files. | Ripple effects are unpredictable. |
| Name snapshots with date and purpose. | `furnostyles-2026-05-22-before-nav-refactor` |
| Keep the last 5 snapshots. | Older ones can be deleted. |
| Never work directly on live production files. | Edit local project, then deploy. |

---

## 4. File Deletion Safety Rules

### Before Deleting Any File

| Step | Action |
|------|--------|
| 1 | Search the entire project for references to the filename. |
| 2 | Check if the file is listed in any architecture document. |
| 3 | Verify the file is not a shared component. |
| 4 | If unsure, rename instead of deleting. |
| 5 | Test in browser after renaming/deleting. |

### File Deletion Rules

| Rule | Requirement |
|------|-------------|
| Never delete `style.css`, `main.js`, or any shared component file. | Foundation of the entire site. |
| Never delete a file referenced in more than one HTML file. | Broken links across multiple pages. |
| Never delete image assets without checking OG meta tags. | Social sharing images are in `<meta>` tags. |
| Never delete `firebase-config.js` or `firebase-bridge.js`. | Breaks future integration. |
| Never delete `_headers` or `_redirects` from project root. | Controls Cloudflare Pages behaviour. |
| When deleting a page HTML file, remove its internal links. | Prevents 404 errors. |

---

## 5. Shared CSS Editing Safety Rules

### Shared CSS Architecture

| Layer | File | Contains |
|-------|------|----------|
| **Design tokens** | `style.css` (top) | Colours, typography, spacing, breakpoints |
| **Layout** | `style.css` | Grid system, header, footer, main content |
| **Components** | `style.css` | Buttons, cards, forms, navigation |
| **Utilities** | `style.css` (bottom) | Helper classes, text utilities |
| **Feature CSS** | `css/blog.css`, etc. | Page-type-specific styles only |

### Safe CSS Editing Rules

| Rule | Requirement |
|------|-------------|
| Read the CSS section before making changes. | Understand selectors and scope. |
| Adding a new component? Place it in the correct layer. | Do not mix tokens with utilities. |
| Modifying a shared class? Search for all uses first. | `.fns-btn` is used on every form. |
| Never change a CSS variable value without checking all uses. | `--fns-accent` affects buttons, links, borders. |
| Never remove a CSS class used in any HTML file. | Search the project for the class name first. |
| Never increase specificity unnecessarily. | Prefer `.fns-card` over `.premium-layout .fns-card`. |
| Never add `!important` to shared component classes. | Makes overrides impossible. |
| Feature CSS must not redefine shared components. | Override with modifiers, not duplicates. |
| Test on at least 3 page types. | Home, blog, portfolio are good test cases. |
| Document new CSS variables in architecture docs. | Future editors need to know what exists. |

---

## 6. Shared JS Editing Safety Rules

### Shared JS Architecture

| File | Purpose | Scope |
|------|---------|-------|
| `main.js` | Header/footer loading, navigation, cart counter | Every page |
| `navigation-data.js` | Navigation link store | Every page |
| `article-data.js` | Blog article metadata | Blog pages |
| `article-utils.js` | Related articles, search, listing render | Blog pages |
| `form-validation.js` | Validation engine, spam checks | All forms |
| `firebase-bridge.js` | Firebase integration helpers | Future: all pages |

### Safe JS Editing Rules

| Rule | Requirement |
|------|-------------|
| Read the full function before editing. | Understand inputs, outputs, side effects. |
| Adding a new global function? Namespace under `Furnostyles.*`. | Prevents naming collisions. |
| Modifying a shared function? Check all call sites first. | `loadComponent()` is called on every page. |
| Never delete a function without confirming no callers. | Search for the function name across the project. |
| Never change function signatures without updating all callers. | Renaming a parameter breaks every caller. |
| Always handle errors in async functions. | Unhandled rejections break shared components. |
| Never add global event listeners without cleanup. | Memory leaks accumulate. |
| Feature JS must not redefine shared utilities. | Use shared utilities, do not duplicate. |
| Test on at least 3 page types. | Verify on home, blog, portfolio. |
| Use `console.error` for errors, `console.warn` for warnings. | Clean console output in production. |

---

## 7. Shared Component Editing Rules

| Component | File | Mount Point | Affected Pages |
|-----------|------|-------------|--------------|
| **Header** | `shared/header.html` | `#fns-header-mount` | All pages |
| **Footer** | `shared/footer.html` | `#fld-footer-mount` | All pages |
| **Navigation data** | `js/navigation-data.js` | Loaded by `main.js` | All pages |
| **Form validation** | `js/form-validation.js` | Loaded by form pages | All forms |
| **Firebase config** | `shared/firebase/firebase-config.js` | Before `</body>` | Future: all pages |

### Safe Component Editing Rules

| Rule | Requirement |
|------|-------------|
| Edit shared components only when necessary. | Widest blast radius. |
| Before editing, snapshot the project. | Rollback if change breaks multiple pages. |
| After editing, test every page type. | Home, services, portfolio, blog, contact. |
| Never remove a mount point from a page. | Component has nowhere to render. |
| Never change a mount point ID without updating `main.js`. | `main.js` references the ID to inject content. |
| Never add blocking synchronous loading for shared components. | Always use `fetch()` asynchronously. |
| If a shared component needs a new CSS class, add it to `style.css`. | No inline or page-specific styles for shared components. |
| If a shared component needs new JS, add it to `main.js`. | Do not scatter shared logic across page files. |
| Document shared component changes in architecture docs. | Future editors must know the component evolved. |

---

## 8. Layout-System Safety Rules

The layout system is the structural foundation. Corrupting it breaks every page.

### Layout Architecture

```html
<div class="premium-layout">
  <main class="premium-main">
    <!-- Page content goes here -->
  </main>
</div>
```

### Layout Safety Rules

| Rule | Requirement |
|------|-------------|
| Never remove `.premium-layout` from any page. | Controls overall page structure. |
| Never remove `.premium-main` from any page. | Semantic main content area. |
| Never add `<aside class="premium-sidebar">` to any page yet. | Sidebar is a future feature, not current. |
| Never add inline styles to `.premium-layout` or `.premium-main`. | Layout behaviour must be consistent. |
| Never change flexbox/grid properties of `.premium-layout` without testing every page. | Affects all pages. |
| Page content must go inside `.premium-main`, not outside `.premium-layout`. | Content outside may render incorrectly. |
| Never add a second `.premium-layout` on one page. | Nested structures break spacing. |
| Never change header or footer structure without updating all pages. | Shared components. |
| If a page needs a special layout, use a modifier class. | `.premium-layout--wide`, not a second layout system. |
| Test layout changes on mobile, tablet, and desktop. | Responsive behaviour must remain intact. |

---

## 9. Future Sidebar Safety Rules

**Not to be built yet.** Document only.

| Principle | Implementation |
|-----------|--------------|
| **Opt-in only** | Only pages with `.premium-layout--with-sidebar` get a sidebar |
| **No squeezing** | Pages without sidebar must not change layout |
| **No JS dependency** | Sidebar must work with CSS-only fallbacks |
| **Mobile-first** | Sidebar hidden on mobile; drawer pattern instead |

### Sidebar Rules (Future)

| Rule | Requirement |
|------|-------------|
| Sidebar HTML is never added to pages that do not need it. | No empty `<aside>` tags. |
| Sidebar CSS is loaded only on pages that use it. | Separate `css/sidebar.css` loaded conditionally. |
| Sidebar does not break layout of existing pages. | Existing pages must look identical after sidebar CSS is added. |
| Sidebar state (open/closed) is saved to `localStorage`. | User preference persists across pages. |
| Sidebar is fully accessible (keyboard, screen reader). | Tab trapping, focus management, ARIA. |
| Sidebar content is never hardcoded in individual pages. | Loaded from shared data source. |
| Read `docs/future-sidebar-strategy.md` before implementing. | Full sidebar architecture documented there. |

---

## 10. Firebase Integration Safety Strategy

**Not to be built yet.** Document only.

| Principle | Implementation |
|-----------|--------------|
| **Configuration is public but minimal** | `firebase-config.js` contains only API keys and project IDs |
| **Security rules restrict writes** | Firestore rules validate data before allowing writes |
| **Client-side validation is not enough** | Always validate server/Firestore side as well |
| **Sensitive operations use Cloud Functions** | Payments, admin actions, email in Cloud Functions |
| **Environment separation** | Different Firebase projects for dev and production |

### Firebase Safety Rules (Future)

| Rule | Requirement |
|------|-------------|
| `firebase-config.js` must never contain private keys or passwords. | API keys are public; service account keys are private. |
| Firestore security rules must be written and tested before any collection is created. | Open rules allow anyone to read/write your database. |
| All form data is sanitized before Firestore write. | Strip HTML tags, trim strings, validate types. |
| Authentication state is checked before sensitive reads/writes. | Unauthenticated users must not access private data. |
| Cloud Functions validate all input parameters. | Never trust client-side validation alone. |
| Firebase Analytics does not track personally identifiable information. | Privacy law compliance. |
| Firebase Hosting is only used if Cloudflare Pages is insufficient. | Prefer current static hosting unless Firebase features needed. |
| Document the Firebase data model in architecture docs. | Future developers must understand the schema. |
| Back up Firestore data regularly. | Automated exports to Cloud Storage. |
| Monitor Firebase usage to prevent unexpected billing. | Budget alerts and usage limits. |

---

## 11. Future Authentication Security Strategy

**Not to be built yet.** Document only.

| Rule | Requirement |
|------|-------------|
| Use Firebase Authentication or comparable managed service. | Do not build custom authentication from scratch. |
| Passwords must be minimum 8 characters with complexity requirements. | Enforced by auth provider. |
| Email verification required before account activation. | Prevents fake accounts. |
| Session tokens expire after reasonable time (24 hours or less). | Limits window of compromise. |
| Password reset flows do not reveal whether email exists. | Prevents account enumeration attacks. |
| Admin accounts use multi-factor authentication (MFA). | Protects privileged access. |
| Rate limiting applied to login attempts. | Prevents brute-force attacks. |
| User roles stored in Firestore, not client-side. | Client-side role checks can be bypassed. |
| Authentication state verified server-side for every protected action. | Client-side checks are for UI only. |
| Log all authentication events (login, logout, password change). | Audit trail for security incidents. |

---

## 12. Future Payment Integration Safety Considerations

**Not to be built yet.** Document only.

| Rule | Requirement |
|------|-------------|
| Never store credit card numbers, CVV codes, or PINs. | Use PCI-compliant processors (Stripe, M-Pesa, Paystack). |
| All payment processing happens server-side or via secure provider SDK. | Client-side handling is not PCI-compliant. |
| Payment forms use HTTPS only. | Never transmit payment data over HTTP. |
| Webhooks from payment providers verified with signatures. | Prevents spoofed payment notifications. |
| Idempotency keys prevent duplicate charges. | Same request processes once. |
| Refund permissions restricted to admin roles. | Vendors cannot issue refunds without approval. |
| Payment logs stored securely and audited regularly. | Detect fraud and resolve disputes. |
| Test payments use sandbox/test keys, never production keys. | Prevents accidental real charges. |
| Display clear pricing in local currency (KES). | Transparency and trust. |
| Compliance with Kenyan financial regulations. | Consult legal counsel for tax and licensing. |

---

## 13. Asset and Media Safety Workflow

| Rule | Requirement |
|------|-------------|
| All images optimized before upload. | Compress, resize, convert to WebP before adding. |
| All images have descriptive, hyphenated file names. | `karen-home-living-room-800.webp` not `IMG_1234.jpg`. |
| Never delete an image referenced in any HTML, CSS, or OG meta tag. | Search for filename across the project. |
| Never rename an image without updating all references. | Broken images look unprofessional. |
| Keep source files (RAW, PSD, Figma) outside the project folder. | Source files are large and do not belong in deployment. |
| Maintain an `assets/README.md` inventory of custom assets. | Lists what was created, by whom, and why. |
| Do not use copyrighted images without license. | Use original photography, licensed stock, or royalty-free. |
| SVG icons optimized (SVGO) before inclusion. | Removes unnecessary metadata and paths. |
| Font files licensed for web use. | Self-hosted fonts require proper licensing. |
| Total image payload per page under 1.5MB mobile, 2MB desktop. | Performance budget prevents bloat. |

---

## 14. Path and Reference Safety Strategy

| Rule | Requirement |
|------|-------------|
| Always use relative paths for internal links. | `services/interior-design.html` not full domain URLs. |
| Never use absolute paths with domain name in internal links. | Breaks local testing and previews. |
| Always end folder paths with slash when linking to `index.html`. | `blogs/` not `blogs` — ensures correct resolution. |
| Never hardcode domain name except in `sitemap.xml` and canonical tags. | Everywhere else must use relative paths. |
| When moving a file, search for all references and update them. | Find-and-replace across all files. |
| When creating a new page, add it to navigation data and sitemap. | Invisible pages do not exist for users or search engines. |
| Test all internal links after any file move or rename. | Click through or use a link checker. |
| External links use `rel="noopener noreferrer"` and `target="_blank"`. | Security and performance best practice. |
| Asset paths must match actual folder structure. | Mismatched paths cause 404 errors. |
| When adding a new asset folder, document it in architecture docs. | Future editors need to know where things belong. |

---

## 15. Form Security Considerations

| Rule | Requirement |
|------|-------------|
| All forms use client-side validation. | Immediate feedback, prevents obvious spam. |
| All form data sanitized before any storage or transmission. | Strip HTML tags, trim whitespace, escape special characters. |
| Forms use `novalidate` to disable browser tooltips. | Custom validation UX is more consistent. |
| Honeypot fields present on every form. | Catches simple bots without CAPTCHA friction. |
| Time-based spam checks prevent rapid submissions. | Reject forms submitted in under 3 seconds. |
| Rate limiting (client-side) prevents abuse. | Max 3 submissions per session. |
| When Firebase is integrated, Firestore security rules validate all writes. | Client-side validation is not enough. |
| Never log or display raw user input without sanitization. | Prevents XSS attacks. |
| CSRF tokens are not needed for static-hosted forms. | CSRF applies to server-side session-based forms. |
| HTTPS is required for all form submissions. | Prevents man-in-the-middle attacks. |

---

## 16. Spam Prevention Strategy

| Layer | Implementation | Effectiveness |
|-------|--------------|-------------|
| **Honeypot field** | Hidden input bots fill but humans ignore | Catches simple bots |
| **Time-based check** | Reject submissions under 3 seconds | Catches instant bots |
| **Rate limiting** | Max 3 submissions per `sessionStorage` | Prevents repeated abuse |
| **Simple math challenge** | "What is 3 + 5?" on high-traffic forms | Catches sophisticated bots |
| **reCAPTCHA v3** (future) | Invisible scoring | Only if honeypot fails |
| **Firebase App Check** (future) | Device attestation | Validates legitimate app instances |

### Spam Prevention Rules

| Rule | Requirement |
|------|-------------|
| Honeypot field is visually hidden but not `display: none`. | `position: absolute; left: -9999px;` — some bots detect `display: none`. |
| Honeypot field has `tabindex="-1"` and `aria-hidden="true"`. | Screen readers and keyboard users never encounter it. |
| Time check is lenient (3 seconds minimum). | Fast typers should not be blocked. |
| Math challenge is optional and only for high-traffic forms. | Do not add friction to every form. |
| Never use CAPTCHA by default. | Only if honeypot and time checks fail to stop spam. |
| When Firebase is integrated, server-side validation is the final spam check. | Client-side checks can be bypassed. |

---

## 17. Future Admin Dashboard Protection Considerations

**Not to be built yet.** Document only.

| Rule | Requirement |
|------|-------------|
| Admin dashboard is behind authentication and authorization. | Unauthenticated users must not access any admin functionality. |
| Admin routes are protected by Firebase Auth guards. | Client-side and server-side checks. |
| Role-based access control (RBAC) restricts actions. | Vendors see vendor data; admins see everything. |
| Admin actions are logged with timestamp and user ID. | Audit trail for accountability. |
| Sensitive operations (refunds, user deletion) require confirmation. | Prevent accidental destructive actions. |
| Admin dashboard uses a different Firebase project or restricted collection. | Separation of concerns and data isolation. |
| Admin sessions timeout after inactivity (15 minutes). | Prevents unattended access. |
| Admin passwords are strong and changed regularly. | Enforce complexity and rotation. |
| Admin access is reviewed quarterly. | Remove access for departed team members. |
| Admin dashboard is not linked from public navigation. | Obscurity is not security, but it reduces attack surface. |

---

## 18. Future Vendor-System Security Considerations

**Not to be built yet.** Document only.

| Rule | Requirement |
|------|-------------|
| Vendor accounts are separate from client accounts. | Different registration flows, different permissions. |
| Vendor applications are reviewed and approved by admins. | No automatic vendor activation. |
| Vendor profiles display only public information. | No internal notes or sensitive data exposed publicly. |
| Vendor product listings are moderated before appearing publicly. | Admin approval prevents inappropriate content. |
| Vendor payouts are verified and logged. | Financial accountability and fraud prevention. |
| Vendor ratings and reviews are verified purchases only. | Prevents fake reviews. |
| Vendor data is isolated from other vendors. | One vendor cannot see another vendor's sales or customers. |
| Vendor account suspension preserves order history. | Do not delete data; mark as suspended. |
| Vendor contracts and terms are accepted before activation. | Legal protection for the platform. |
| Vendor communications (messages to clients) are logged. | Dispute resolution and accountability. |

---

## 19. Future Upload and File-Management Considerations

**Not to be built yet.** Document only.

| Rule | Requirement |
|------|-------------|
| Client-side validation checks file type, size, and count before upload. | Prevents unnecessary uploads. |
| Server-side validation re-checks file type and size. | Client-side checks can be bypassed. |
| Accepted file types are explicitly whitelisted. | `image/jpeg`, `image/png`, `image/webp` — not wildcards. |
| Maximum file size is enforced on both client and server. | Prevents denial-of-service via large uploads. |
| Uploaded files are scanned for malware. | Virus scanning before storage. |
| File names are sanitized and randomized on storage. | Remove special characters, add UUID prefix. |
| Original file names are not exposed in public URLs. | `uploads/abc123-image.webp` not `uploads/user-file.jpg`. |
| Upload directories are not browsable. | Disable directory listing. |
| User upload quotas are enforced. | Prevent storage abuse. |
| Old uploads are archived or deleted per retention policy. | Manage storage costs and compliance. |
| Image uploads are resized to maximum dimensions. | Do not store 10MB original uploads if 2MB is the max display size. |

---

## 20. Future API Integration Safety Strategy

**Not to be built yet.** Document only.

| Rule | Requirement |
|------|-------------|
| API keys are never hardcoded in client-side JavaScript. | Use environment variables and server-side proxies. |
| API requests are authenticated and rate-limited. | Prevent abuse and unexpected billing. |
| API responses are validated before use. | Do not trust external data; validate schema and types. |
| API errors are handled gracefully. | Show user-friendly messages, not raw error dumps. |
| API retries use exponential backoff. | Prevent thundering herd on failing services. |
| API timeouts are set to reasonable values. | Do not hang indefinitely on slow responses. |
| Third-party API integrations are documented. | What service, what data, why it is needed. |
| Third-party APIs have fallback behaviour. | If the API is down, the page still works. |
| API data is cached where appropriate. | Reduce repeated requests and improve speed. |
| Monitor API usage and costs. | Budget alerts for paid APIs. |
| API integrations are tested in staging before production. | Never test new integrations on the live site. |

---

## 21. Cloudflare Pages Deployment Safety Workflow

Deployments make changes live. A safe workflow prevents broken sites in production.

### Deployment Workflow

```
Before deploying:
    |
    v
1. Verify all changes are saved in the IDE.
    |
    v
2. Run a local preview (open index.html in browser).
    |
    v
3. Check the browser console for errors.
    |
    v
4. Navigate to every page type (home, services, portfolio, blog, contact).
    |
    v
5. Test responsive behaviour (mobile, tablet, desktop).
    |
    v
6. Run Lighthouse audit (performance >= 90, accessibility = 100).
    |
    v
7. Verify internal links work.
    |
    v
8. Verify external links open correctly.
    |
    v
9. Verify images load and are not broken.
    |
    v
10. Verify forms validate correctly.
    |
    v
11. Deploy to Cloudflare Pages.
    |
    v
12. Verify the live site loads correctly.
    |
    v
13. Check the live site on a mobile device.
```

### Deployment Safety Rules

| Rule | Requirement |
|------|-------------|
| Never deploy during peak traffic hours. | Deploy during low-traffic periods to minimize impact. |
| Never deploy on Friday evening. | If something breaks, the team may not be available to fix it. |
| Always have a rollback plan. | Know the last working deploy ID or snapshot location. |
| Test the preview URL before marking the deploy as production. | Cloudflare Pages generates a preview URL for every commit. |
| Verify `_headers` and `_redirects` are correct before deploying. | Wrong headers break caching; wrong redirects break URLs. |
| Do not delete old deploys immediately. | Keep the last 5 deploys for rollback. |
| Monitor the live site for 30 minutes after deployment. | Catch issues before users report them. |
| Have a communication plan for deployment issues. | Who to contact, how to communicate downtime. |

---

## 22. Production vs Development Workflow

Distinguishing between production and development prevents accidental changes to the live site.

### Environment Separation

| Aspect | Development | Production |
|--------|-------------|------------|
| **URL** | `localhost` or preview URL | `furnostyles.com` |
| **Firebase** | Firebase dev project | Firebase production project |
| **Analytics** | Disabled or dev tracking ID | Live tracking ID |
| **Error reporting** | Verbose console logging | Minimal logging, error tracking service |
| **CSS/JS** | Readable, unminified | Minified, concatenated |
| **Images** | Full resolution for editing | Optimized, compressed |

### Environment Safety Rules

| Rule | Requirement |
|------|-------------|
| Never use production API keys in development. | Prevents accidental data pollution. |
| Never use production Firebase project in development. | Test data must not contaminate live data. |
| Never commit sensitive credentials to the project folder. | Use environment variables or external config. |
| Development previews use `noindex` to prevent search indexing. | `<meta name="robots" content="noindex">` on preview URLs. |
| Development changes are tested before merging to production. | Local preview -> staging preview -> production. |
| Production changes are logged. | Document what changed, why, and who authorized it. |
| Production deploys require a second pair of eyes for major changes. | Peer review prevents mistakes. |

---

## 23. Testing-Before-Deployment Checklist

### Structure Checklist

- [ ] All HTML tags are properly closed and nested.
- [ ] No duplicate `id` attributes on the same page.
- [ ] `<head>` contains correct meta charset, viewport, and title.
- [ ] `<main>` content is inside `.premium-layout` > `.premium-main`.
- [ ] Header and footer mount points are present.
- [ ] Scripts are before `</body>` and use `defer` where appropriate.
- [ ] CSS links are in `<head>`.
- [ ] No inline styles on structural elements.
- [ ] No sidebar HTML, JS, or CSS on public pages.

### Functionality Checklist

- [ ] Navigation links work on every page.
- [ ] Internal links do not produce 404 errors.
- [ ] External links use `target="_blank"` and `rel="noopener noreferrer"`.
- [ ] Forms validate correctly on blur and submit.
- [ ] Form honeypot field is present and hidden.
- [ ] Success and error messages display correctly.
- [ ] Cart counter updates correctly (if applicable).
- [ ] Search function works (if applicable).
- [ ] Mobile menu toggles correctly.

### Visual Checklist

- [ ] Layout is consistent across all page types.
- [ ] No layout shifts during page load.
- [ ] Images load and are not broken.
- [ ] Fonts render correctly.
- [ ] Buttons are styled consistently.
- [ ] Forms are styled consistently.
- [ ] Responsive behaviour works on mobile, tablet, and desktop.
- [ ] No horizontal scrolling on mobile.

### Performance Checklist

- [ ] Lighthouse performance score >= 90 on mobile.
- [ ] Lighthouse accessibility score = 100.
- [ ] Core Web Vitals pass (LCP < 2.5s, CLS < 0.1).
- [ ] Total page weight under 1.5MB on mobile.
- [ ] Images are optimized (WebP where possible).
- [ ] CSS is minified.
- [ ] JS is minified and deferred.

### Security Checklist

- [ ] No sensitive data in client-side code.
- [ ] No exposed API keys or passwords.
- [ ] HTTPS is used for all external resources.
- [ ] Form data is sanitized.
- [ ] User input is escaped before display.
- [ ] OG images and meta tags are present.

---

## 24. Emergency Rollback and Recovery Workflow

When a deployment breaks the live site, speed of recovery is critical.

### Rollback Workflow

```
Problem detected on live site:
    |
    v
1. Identify the severity (broken layout, broken functionality, security issue).
    |
    v
2. If the issue is minor and a fix is known, apply the fix and redeploy.
    |
    v
3. If the issue is major or the fix is unknown, roll back immediately.
    |
    v
4. Cloudflare Pages rollback:
    - Go to Cloudflare Dashboard > Pages > Deployments.
    - Find the last known good deploy.
    - Mark it as the active deployment.
    |
    v
5. If Cloudflare rollback is not possible, restore from local snapshot.
    - Replace the project folder with the pre-deployment snapshot.
    - Redeploy from the snapshot.
    |
    v
6. Verify the live site is working after rollback.
    |
    v
7. Investigate the cause of the failure in the development environment.
    |
    v
8. Fix the issue, test thoroughly, and deploy again.
```

### Rollback Rules

| Rule | Requirement |
|------|-------------|
| Always know the ID of the last known good deploy. | Document it before every new deployment. |
| Never attempt to fix a critical issue directly on the live site. | Roll back first, fix in development, then redeploy. |
| Always verify the rollback worked before declaring the incident resolved. | Test the live site on multiple devices and browsers. |
| Communicate the rollback to the team. | Everyone must know the site was rolled back and why. |
| Document the incident after recovery. | What went wrong, how it was fixed, how to prevent it. |
| Keep snapshots of the last 5 working states. | Multiple rollback points increase safety. |

---

## 25. What Should NEVER Be Edited Blindly

These files and systems are too critical to edit without full understanding.

### The Never-Edit-Blindly List

| Item | Why It Is Dangerous | Safe Alternative |
|------|---------------------|------------------|
| `style.css` design tokens section | Changes cascade to every page | Read `page-template-system.md` first; change one variable at a time |
| `main.js` shared component loader | Breaks header/footer on every page | Read the full function; test on every page type |
| `navigation-data.js` | Breaks navigation across the entire site | Understand the data structure; validate JSON before saving |
| `firebase-config.js` | Wrong config breaks all Firebase features | Verify project ID and API key with Firebase console |
| `_headers` and `_redirects` | Wrong headers break caching; wrong redirects break URLs | Test with `curl` or browser DevTools before deploying |
| Any file referenced in 5+ other files | Ripple effect is hard to predict | Search for all references; update them all together |
| HTML `<head>` structure in `index.html` | Meta tags, charset, viewport, canonical — SEO-critical | Copy the exact structure to new pages; never remove existing tags |
| Layout grid CSS (`.premium-layout`, `.premium-main`) | Breaks the structural foundation of every page | Test on every page type after any change |
| Form validation engine (`form-validation.js`) | Breaks all forms on the site | Test every form type after any change |
| Header/footer mount point IDs | Shared components have nowhere to render | Never change an ID without updating `main.js` |
| Image paths in OG meta tags | Broken OG images hurt social sharing | Verify image exists and path is correct |
| Cloudflare Pages build settings | Wrong settings prevent deployment | Document settings; do not change without reason |

---

## 26. What Must Always Remain Centralized

Centralization ensures consistency. These items must never be duplicated across pages.

### Centralized Items

| Item | Central Location | Why Centralized |
|------|------------------|-----------------|
| **Design tokens** | `style.css` top section | One source of truth for colours, fonts, spacing |
| **Layout styles** | `style.css` | Every page uses the same grid and structure |
| **Button styles** | `style.css` `.fns-btn*` | Consistent buttons everywhere |
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

## 27. Long-Term Maintainability Principles

The site must remain easy to maintain for years, even as the team changes.

### Maintainability Principles

| Principle | Implementation |
|-----------|--------------|
| **Self-documenting code** | Clear class names, descriptive file names, logical folder structure |
| **Architecture documents** | Every `docs/` file explains why decisions were made, not just what |
| **Consistent naming** | `fns-` prefix for Furnostyles components, `fld-` for legacy commerce |
| **Versioned assets** | `style.v2.css` makes it clear what changed and when |
| **No dead code** | Remove unused CSS, JS, and HTML promptly |
| **No orphaned files** | If a file is not referenced, delete it or document why it exists |
| **README files** | Every major folder has a README explaining its purpose |
| **Change log** | Document major changes, who made them, and why |
| **Peer review** | Major changes require a second pair of eyes |
| **Regular audits** | Quarterly review of unused CSS, broken links, and outdated content |

### Maintainability Rules

| Rule | Requirement |
|------|-------------|
| New team members must read all `docs/` files before editing code. | Architecture knowledge prevents mistakes. |
| Code must be readable by someone who did not write it. | Comments explain why, not what; code explains what. |
| Folder structure must be intuitive. | `css/`, `js/`, `assets/images/`, `shared/` — no surprises. |
| File names must be descriptive. | `interior-design.html` not `page3.html`. |
| Class names must be semantic. | `.fns-service-card` not `.box-1`. |
| Magic numbers must be CSS variables. | `--fns-gap: 1.5rem` not `margin: 24px`. |
| Dependencies must be documented. | If a page needs `blog.css`, document why. |
| Legacy code must be marked clearly. | `/* LEGACY: fld-commerce styles — do not expand */` |
| Technical debt must be tracked. | TODO comments with ticket numbers or dates. |
| Regular cleanup sprints must be scheduled. | Quarterly removal of unused code and assets. |

---

## 28. Future Scalability Without Architecture Chaos

As Furnostyles grows, the architecture must scale without becoming unmanageable.

### Scalability Principles

| Principle | Implementation |
|-----------|--------------|
| **Pages are files, not database entries** | Static HTML files scale infinitely with a CDN |
| **Shared components load dynamically** | Header/footer fetched from shared files, not duplicated |
| **Data is centralized** | Navigation, articles, and products live in shared data stores |
| **CSS is modular** | Feature CSS loaded only where needed |
| **JS is modular** | Feature JS loaded only where needed |
| **Images are optimized and responsive** | Multiple sizes, lazy loading, CDN delivery |
| **URLs are semantic and stable** | `/services/interior-design.html` not `/page?id=123` |
| **SEO is built-in** | Static HTML, structured data, sitemaps, canonical URLs |

### Scalability Rules

| Rule | Requirement |
|------|-------------|
| Adding a new page must not require changing shared components. | Drop in a new HTML file, add it to navigation data, done. |
| Adding a new blog post must not require code changes. | Add to `article-data.js` and create the HTML page. |
| Adding a new service must not require layout changes. | Use the existing service page template. |
| Adding a new portfolio project must not require CSS changes. | Use the existing portfolio card and detail templates. |
| The site must support 500+ pages without performance degradation. | Static files + CDN = infinite horizontal scaling. |
| The site must support 1000+ images without management chaos. | Naming conventions, folder structure, and asset inventory. |
| New features must integrate with existing architecture, not replace it. | Build on top, do not tear down and rebuild. |
| Feature flags (future) allow gradual rollouts. | Enable new features for a subset of users first. |
| A/B testing (future) uses query parameters or routing, not duplicate pages. | Prevent content duplication for SEO. |

---

## 29. Recommended Project Review Workflow Before Major Changes

Major changes (new features, redesigns, refactoring) must follow a review process.

### Major Change Review Workflow

```
Proposing a major change:
    |
    v
1. Write a brief proposal (1-2 paragraphs) explaining the goal and impact.
    |
    v
2. Identify which files will be affected.
    |
    v
3. Identify which architecture documents need updating.
    |
    v
4. Create a snapshot of the current project.
    |
    v
5. Implement the change in a separate copy or branch.
    |
    v
6. Test the change thoroughly (all page types, mobile, desktop, Lighthouse).
    |
    v
7. Review the change with a second person (peer review).
    |
    v
8. Update architecture documents to reflect the change.
    |
    v
9. Deploy to a preview URL first.
    |
    v
10. Verify the preview URL works correctly.
    |
    v
11. Deploy to production.
    |
    v
12. Monitor the live site for 30 minutes.
```

### Major Change Rules

| Rule | Requirement |
|------|-------------|
| A "major change" is anything affecting 3+ files or a shared component. | Small changes can be made directly; large changes need review. |
| Every major change must have a written proposal. | Forces clarity of purpose and scope. |
| Every major change must have a peer reviewer. | Second pair of eyes catches mistakes. |
| Every major change must update the relevant architecture document. | Documents must stay in sync with code. |
| Every major change must be tested on a preview URL before production. | Never test major changes directly on the live site. |
| Every major change must have a rollback plan. | Know how to undo it if something goes wrong. |

---

## 30. Recommended Safe Expansion Order for Future Features

Features must be added in a specific order to prevent chaos and dependency issues.

### Safe Expansion Order

| Phase | Feature | Prerequisites | Why This Order |
|-------|---------|-------------|----------------|
| **Phase 1: Foundation** (Current) | Static pages, shared header/footer, forms, blog, portfolio | None | Core site must be stable before adding complexity |
| **Phase 2: Content** | More blog posts, more portfolio projects, more service pages | Phase 1 | Content scales without technical changes |
| **Phase 3: Data** | Firebase integration, Firestore for leads and form submissions | Phase 1 | Backend adds functionality without changing frontend structure |
| **Phase 4: Accounts** | Client accounts, saved projects, favourites | Phase 3 | Accounts need a backend to store user data |
| **Phase 5: Marketplace** | Vendor system, product listings, search, filters | Phase 3 + 4 | Marketplace needs accounts and a backend |
| **Phase 6: Payments** | M-Pesa/Stripe integration, checkout, invoices | Phase 5 | Payments need a working marketplace and account system |
| **Phase 7: Dashboard** | Admin dashboard, vendor dashboard, analytics | Phase 4 + 5 + 6 | Dashboards need data from accounts, marketplace, and payments |
| **Phase 8: Advanced** | AI recommendations, advanced search, multi-language | Phase 7 | Advanced features need a mature platform |

### Expansion Order Rules

| Rule | Requirement |
|------|-------------|
| Never skip a phase. | Each phase builds on the previous one. |
| Never build Phase N+1 before Phase N is stable. | Unstable foundations create exponential problems. |
| Document the current phase in the project README. | Everyone knows what phase the project is in. |
| Do not add features from future phases to the current phase. | Resist scope creep. |
| When moving to a new phase, update all architecture documents. | Future-phase features need new documentation. |
| When moving to a new phase, re-test the entire site. | New integrations may break existing features. |
| When moving to a new phase, train the team on the new architecture. | Everyone must understand the new systems. |

---

## Document Summary

| # | Section | Purpose |
|---|---------|---------|
| 1 | Safe project editing principles | Four safety pillars and 8 editing rules. |
| 2 | AI-assisted development safety | 9 AI editing rules, 10 danger-zone actions. |
| 3 | Backup and versioning strategy | Snapshot workflow, versioning rules, rollback safety. |
| 4 | File deletion safety | 6-step pre-deletion check, 6 deletion rules. |
| 5 | Shared CSS editing safety | 5-layer CSS architecture, 10 editing rules. |
| 6 | Shared JS editing safety | 6-file JS architecture, 10 editing rules. |
| 7 | Shared component editing safety | 5 shared components, 9 editing rules. |
| 8 | Layout-system safety | Layout architecture, 10 structural safety rules. |
| 9 | Future sidebar safety | Opt-in, no squeezing, CSS-only fallback, mobile-first drawer. |
| 10 | Firebase integration safety | 5 principles, 10 Firebase safety rules. |
| 11 | Future authentication security | 10 auth rules (managed service, MFA, RBAC, audit logs). |
| 12 | Future payment integration safety | 10 payment safety rules (PCI compliance, webhooks, idempotency). |
| 13 | Asset and media safety | 10 asset rules (optimization, naming, licensing, inventory). |
| 14 | Path and reference safety | 10 path rules (relative paths, no hardcoded domains, link testing). |
| 15 | Form security | 10 form security rules (validation, sanitization, honeypot, HTTPS). |
| 16 | Spam prevention | 6-layer strategy, 6 spam prevention rules. |
| 17 | Future admin dashboard protection | 10 admin safety rules (auth guards, RBAC, session timeout, audit logs). |
| 18 | Future vendor-system security | 10 vendor safety rules (approval, moderation, data isolation, logging). |
| 19 | Future upload/file-management safety | 11 upload rules (validation, scanning, sanitization, quotas, retention). |
| 20 | Future API integration safety | 11 API safety rules (no client-side keys, rate limiting, fallbacks, caching). |
| 21 | Cloudflare Pages deployment safety | 13-step deployment workflow, 8 deployment safety rules. |
| 22 | Production vs development workflow | Environment separation table, 7 environment safety rules. |
| 23 | Testing-before-deployment checklist | 40+ items across 5 categories: structure, functionality, visual, performance, security. |
| 24 | Emergency rollback/recovery workflow | 8-step rollback process, 6 rollback rules. |
| 25 | What should NEVER be edited blindly | 12 critical items with danger explanations and safe alternatives. |
| 26 | What must always remain centralized | 12 centralized items with locations and rationale. |
| 27 | Long-term maintainability principles | 10 maintainability principles, 10 maintainability rules. |
| 28 | Future scalability without chaos | 8 scalability principles, 9 scalability rules. |
| 29 | Project review workflow before major changes | 12-step review process, 6 major change rules. |
| 30 | Safe expansion order for future features | 8-phase roadmap (foundation to content to data to accounts to marketplace to payments to dashboard to advanced). |

**This document must be read before any major change, deployment, or feature addition to the Furnostyles platform.**
