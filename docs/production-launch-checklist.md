# Furnostyles Production Launch Preparation System

**Date:** 2026-05-22 | **Status:** Planning | **Target:** Professional public launch

---

## Overview

This document prepares the Furnostyles platform for a future professional public launch. It prevents repeating past deployment and architecture problems by establishing rigorous pre-launch, launch, and post-launch workflows.

### Launch Principles

| Principle | Meaning |
|-----------|---------|
| **Check before launch** | Every item on every checklist is verified before the site goes live. |
| **Test like a user** | Navigate the site as a first-time visitor would. |
| **No shortcuts** | Skipping a checklist item because "it probably works" causes failures. |
| **Document everything** | Every launch step, issue, and resolution is recorded. |
| **Have a rollback plan** | Know exactly how to undo the launch if something goes wrong. |

---

## 1. Final Pre-Launch Checklist

This is the master checklist. All items must pass before launch.

### Structure Verification

- [ ] All HTML pages have a valid `<!DOCTYPE html>` declaration.
- [ ] Every page has `<html lang="en">`.
- [ ] Every page has `<meta charset="UTF-8">` in `<head>`.
- [ ] Every page has `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- [ ] Every page has a unique `<title>` tag (no two pages share the same title).
- [ ] Every page has a unique `<meta name="description">`.
- [ ] Every page has a `<link rel="canonical" href="...">` pointing to itself.
- [ ] Every page has OG meta tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.
- [ ] Every page links to `css/style.css` in `<head>`.
- [ ] Every page loads `js/main.js` before `</body>`.
- [ ] Every page has the header mount point: `<div id="fns-header-mount"></div>`.
- [ ] Every page has the footer mount point: `<div id="fld-footer-mount"></div>`.
- [ ] Every page uses `.premium-layout` > `.premium-main` structure.
- [ ] No page contains `<aside class="premium-sidebar">`.
- [ ] No inline styles on `.premium-topbar`, `.premium-header`, or `.premium-brand`.
- [ ] All buttons are properly closed (`<button>...</button>` or `<a>...</a>`).
- [ ] All `<img>` tags have `alt` attributes.
- [ ] All external links use `rel="noopener noreferrer" target="_blank"`.

### Content Verification

- [ ] Homepage content is complete and accurate.
- [ ] Services pages have real service descriptions.
- [ ] Repairs pages have real repair service descriptions.
- [ ] Portfolio pages have real project descriptions and images.
- [ ] Blog pages have real article content.
- [ ] Contact page has working contact information.
- [ ] Copyright notice uses `&copy;` entity, not (c) or copyright text.
- [ ] No placeholder text ("Lorem ipsum", "Coming soon", "TODO") on any public page.
- [ ] No broken image links on any page.
- [ ] No broken CSS or JS links on any page.

### Functionality Verification

- [ ] Navigation menu works on desktop.
- [ ] Mobile menu toggles correctly on all pages.
- [ ] Search function returns results (if implemented).
- [ ] All forms validate correctly on blur and submit.
- [ ] Form honeypot field is present and hidden on every form.
- [ ] Form success/error messages display correctly.
- [ ] WhatsApp chat float links to correct number (`254713639205`).
- [ ] Cart float displays correct count (if applicable).

---

## 2. SEO Readiness Checklist

### On-Page SEO

- [ ] Every page has a unique, descriptive `<title>` (50-60 characters).
- [ ] Every page has a unique `<meta name="description">` (150-160 characters).
- [ ] Every page has a canonical URL pointing to the HTTPS version.
- [ ] Heading hierarchy is correct: one `<h1>` per page, logical `<h2>`-`<h6>` order.
- [ ] No skipped heading levels (e.g., `<h1>` -> `<h3>` without `<h2>`).
- [ ] Keywords are present in titles, headings, and first paragraph naturally.
- [ ] Internal links use descriptive anchor text (not "click here").
- [ ] All images have descriptive `alt` text.
- [ ] No hidden text or keyword stuffing.

### Technical SEO

- [ ] `robots.txt` exists at project root and allows all relevant pages.
- [ ] `sitemap.xml` exists at project root and lists all pages with correct URLs.
- [ ] Sitemap uses HTTPS URLs, not HTTP.
- [ ] Sitemap `lastmod` dates are accurate.
- [ ] No JavaScript-rendered content that search engines cannot see.
- [ ] Pages load in under 3 seconds (measured with PageSpeed Insights).
- [ ] No render-blocking resources in `<head>` (CSS should not block; JS uses `defer`).
- [ ] Structured data (JSON-LD) present on key pages (Organization, LocalBusiness, Article).

### Off-Page SEO (Future)

- [ ] Google Search Console property claimed.
- [ ] Sitemap submitted to Google Search Console.
- [ ] Bing Webmaster Tools property claimed.
- [ ] Social media profiles linked in footer.
- [ ] Backlink outreach plan documented.

---

## 3. Responsive / Mobile Testing Checklist

### Device Testing

- [ ] Test on a real iPhone (Safari, Chrome).
- [ ] Test on a real Android phone (Chrome, Samsung Internet).
- [ ] Test on a real iPad (Safari, Chrome).
- [ ] Test on a real Android tablet (Chrome).
- [ ] Test on a desktop browser (Chrome, Firefox, Edge, Safari).
- [ ] Test on a laptop browser at various widths.

### Visual Checks

- [ ] Layout does not break at any screen width between 320px and 2560px.
- [ ] No horizontal scrolling on any page at any width.
- [ ] Text is readable without zooming (minimum 16px on mobile inputs).
- [ ] Touch targets are at least 44x44px.
- [ ] Images do not overflow their containers.
- [ ] Forms are usable on mobile (inputs large enough, labels visible).
- [ ] Navigation is accessible on mobile (hamburger menu works, items tappable).
- [ ] Footer is readable and usable on mobile.
- [ ] Floating elements (cart, chat) do not cover content on mobile.

### Functional Checks

- [ ] Mobile menu opens and closes correctly.
- [ ] All links are tappable on mobile.
- [ ] Forms submit correctly on mobile.
- [ ] Scroll performance is smooth on mobile.
- [ ] No zoom on form input focus (viewport meta tag configured correctly).

---

## 4. Performance Testing Checklist

### Lighthouse Audit

- [ ] Performance score >= 90 on mobile.
- [ ] Performance score >= 95 on desktop.
- [ ] Accessibility score = 100.
- [ ] Best Practices score >= 90.
- [ ] SEO score = 100.

### Core Web Vitals

- [ ] Largest Contentful Paint (LCP) < 2.5 seconds on mobile.
- [ ] First Input Delay (FID) < 100 milliseconds.
- [ ] Cumulative Layout Shift (CLS) < 0.1.
- [ ] Time to First Byte (TTFB) < 600 milliseconds.

### Asset Optimization

- [ ] All CSS is minified.
- [ ] All JavaScript is minified.
- [ ] All images are compressed (WebP where supported, JPEG fallback).
- [ ] No images larger than 200KB on any page.
- [ ] No unused CSS rules (audit with Chrome Coverage tool).
- [ ] No unused JavaScript (audit with Chrome Coverage tool).
- [ ] Fonts load with `font-display: swap`.
- [ ] No render-blocking fonts.

### Page Weight

- [ ] Total page weight under 1.5MB on mobile.
- [ ] Total page weight under 2MB on desktop.
- [ ] Number of requests under 50 per page.

---

## 5. Accessibility Testing Checklist

### Automated Testing

- [ ] Lighthouse accessibility score = 100 on all page types.
- [ ] axe DevTools shows zero errors on all page types.
- [ ] WAVE tool shows zero errors on all page types.
- [ ] Pa11y scan passes on all page types.

### Manual Testing

- [ ] All interactive elements are reachable by keyboard (Tab key).
- [ ] Focus indicators are visible on all focusable elements.
- [ ] Focus order follows the visual reading order.
- [ ] Skip link present on all pages (jumps to main content).
- [ ] All images have meaningful `alt` text.
- [ ] Decorative images have empty `alt=""`.
- [ ] All form inputs have associated `<label>` elements.
- [ ] Error messages are associated with the correct form field (ARIA).
- [ ] Color contrast ratios meet WCAG AA: text >= 4.5:1, large text >= 3:1.
- [ ] Text is readable at 200% zoom.
- [ ] Page works with screen reader (test with NVDA or VoiceOver).
- [ ] No content is conveyed by color alone.
- [ ] No auto-playing audio or video without user control.

### ARIA

- [ ] Navigation has `role="navigation"` or `<nav>`.
- [ ] Main content has `role="main"` or `<main>`.
- [ ] Buttons have `role="button"` or are `<button>` elements.
- [ ] Live regions used for dynamic content updates.
- [ ] Modal dialogs trap focus and return focus on close.

---

## 6. Internal Link Testing Workflow

Internal links are the backbone of navigation. Broken links destroy user trust and SEO.

### Link Testing Steps

```
1. Open the homepage in a browser.
2. Click every link in the header navigation.
3. Click every link in the footer navigation.
4. Click every internal link in the main content of the homepage.
5. Repeat for every page type: home, services, repairs, portfolio, blog, contact.
6. Verify no 404 errors.
7. Verify no broken images (broken image icon).
8. Verify external links open in a new tab.
```

### Automated Link Testing

- [ ] Use a link checker tool (e.g., Screaming Frog, Xenu, or online checker).
- [ ] Scan the entire site for broken internal links.
- [ ] Scan for broken external links (report, do not necessarily fix third-party issues).
- [ ] Verify all anchor links (e.g., `#section-id`) point to existing IDs.

### Link Quality Checks

- [ ] No orphan pages (pages not linked from anywhere).
- [ ] No circular redirects.
- [ ] No links to `localhost` or preview URLs in production code.
- [ ] All internal links use relative paths, not absolute URLs with domain.
- [ ] All folder paths end with a trailing slash when linking to `index.html`.

---

## 7. Shared Component Testing Workflow

Shared components (header, footer, navigation) affect every page. A single bug becomes a site-wide bug.

### Header Testing

- [ ] Header loads on every page type.
- [ ] Brand logo links to `index.html`.
- [ ] Navigation links are correct and functional.
- [ ] Mobile menu toggle works on all pages.
- [ ] Search input (if present) is functional.
- [ ] Cart and account icons are visible and linked.
- [ ] Header is sticky/fixed correctly (if designed to be).
- [ ] Header does not overlap content on any page.

### Footer Testing

- [ ] Footer loads on every page type.
- [ ] Footer links are correct and functional.
- [ ] Social media links are correct and open in new tabs.
- [ ] Copyright year is current.
- [ ] Footer is not cut off or overlapped by content on any page.
- [ ] Footer layout is consistent across all pages.

### Navigation Data Testing

- [ ] `js/navigation-data.js` contains all current pages.
- [ ] No broken links in navigation data.
- [ ] Navigation hierarchy matches page structure.
- [ ] New pages are added to navigation data before deployment.

### Component Change Protocol

```
Before changing any shared component:
    1. Snapshot the entire project.
    2. Make the change.
    3. Test on every page type: home, services, repairs, portfolio, blog, contact.
    4. Test on mobile and desktop.
    5. Verify no console errors.
    6. Deploy only after all tests pass.
```

---

## 8. Media / Image Verification Workflow

Images are the most common cause of slow pages and broken layouts.

### Image Quality Checks

- [ ] Every image has a descriptive, hyphenated file name.
- [ ] No file names like `IMG_1234.jpg`, `image1.png`, or `Untitled`.
- [ ] Product/property images are high quality but optimized.
- [ ] No blurry or pixelated images.
- [ ] No images with visible watermarks (unless licensed).
- [ ] No images with text that should be HTML (logos exempt).

### Image Technical Checks

- [ ] Every image has `width` and `height` attributes to prevent layout shifts.
- [ ] Every image has a `srcset` for responsive sizing (if applicable).
- [ ] Every image has a WebP version with JPEG/PNG fallback.
- [ ] Every image is under 200KB (thumbnail) or 500KB (hero/large).
- [ ] SVG icons are optimized (SVGO) and have `aria-hidden="true"`.
- [ ] No missing `alt` attributes.
- [ ] No broken image links (check browser console for 404s).

### Image Asset Inventory

Maintain a simple inventory:

```
assets/
  images/
    README.md  <-- List all custom images, sources, and licenses
```

- [ ] `assets/README.md` exists and lists all custom images.
- [ ] Stock photo licenses are documented.
- [ ] Original photography is credited if required.

---

## 9. Blog / Article Publishing Checklist

Each blog article must meet quality standards before publication.

### Content Quality

- [ ] Article is at least 800 words (cornerstone articles: 2000+).
- [ ] Article has a clear, descriptive title.
- [ ] Article has a unique meta description.
- [ ] Article has a featured image (1200x630px for OG).
- [ ] Article has at least 3 internal links to related articles.
- [ ] Article has at least 2 outbound links to authoritative sources.
- [ ] Article has a clear conclusion or call-to-action.
- [ ] No spelling or grammar errors (use Grammarly or similar).
- [ ] No placeholder text.

### Technical Quality

- [ ] Article uses the reusable article template.
- [ ] Article has proper heading hierarchy (`<h1>` title, `<h2>` sections, `<h3>` subsections).
- [ ] Article images have `alt` text and are optimized.
- [ ] Article has JSON-LD structured data for Article type.
- [ ] Article is added to `js/article-data.js`.
- [ ] Article URL is semantic: `/blogs/article-slug.html`.
- [ ] Article is linked from the blog index page.

### Publishing Workflow

```
1. Write article in a content brief template.
2. Review for grammar, accuracy, and SEO.
3. Add to article data store.
4. Create HTML page using article template.
5. Add internal links to and from related articles.
6. Add featured image with OG tags.
7. Test the article page (mobile, desktop, Lighthouse).
8. Update sitemap.xml.
9. Deploy.
10. Submit to Google Search Console for indexing.
```

---

## 10. Cloudflare Pages Deployment Workflow

Cloudflare Pages is the production hosting platform. Deployments must be safe and reversible.

### Pre-Deployment Steps

- [ ] All changes are saved in the IDE.
- [ ] A local snapshot of the project folder exists (named with date and purpose).
- [ ] The local preview works correctly (open `index.html` in browser).
- [ ] The browser console shows zero errors.
- [ ] Lighthouse scores meet targets.
- [ ] All checklist items in sections 1-9 are verified.

### Deployment Steps

```
1. Push code to the connected Git repository (or upload directly).
2. Wait for Cloudflare Pages build to complete.
3. Open the preview URL generated by Cloudflare Pages.
4. Verify the preview URL works correctly:
   - Homepage loads.
   - All page types load.
   - Navigation works.
   - Forms validate.
   - Images load.
   - No console errors.
5. If preview is good, mark deploy as production (or merge to main branch).
6. Verify the live production URL works.
```

### Post-Deployment Verification

- [ ] Live site loads correctly on desktop.
- [ ] Live site loads correctly on mobile.
- [ ] All internal links work on the live site.
- [ ] All images load on the live site.
- [ ] Forms work on the live site.
- [ ] `robots.txt` is accessible at `domain.com/robots.txt`.
- [ ] `sitemap.xml` is accessible at `domain.com/sitemap.xml`.
- [ ] `_headers` file is serving correct cache headers.
- [ ] `_redirects` file is working (if any redirects configured).

### Deployment Safety Rules

| Rule | Requirement |
|------|-------------|
| Never deploy on Friday evening. | If something breaks, the team may not be available. |
| Never deploy during peak traffic hours. | Deploy during low-traffic periods. |
| Always have a rollback plan. | Know the last working deploy ID or snapshot location. |
| Test the preview URL before production. | Never push directly to production without preview. |
| Monitor the live site for 30 minutes after deployment. | Catch issues before users report them. |
| Keep the last 5 deploys in Cloudflare Pages. | Rollback to previous deploy if needed. |

---

## 11. Domain Connection Workflow

Connecting a custom domain to Cloudflare Pages is the final step before public launch.

### Domain Setup Steps

```
1. Purchase domain through Cloudflare Registrar (recommended) or transfer existing domain.
2. Add the domain to the Cloudflare Pages project.
3. Verify DNS records:
   - CNAME record pointing to Cloudflare Pages (if using apex domain, use A/AAAA records).
4. Wait for DNS propagation (up to 24 hours, usually much faster).
5. Verify HTTPS is enforced (Cloudflare provides SSL automatically).
6. Verify www redirects to non-www (or vice versa) as configured.
7. Verify the domain loads the correct site.
```

### Domain Verification Checklist

- [ ] Domain is accessible via HTTPS (not HTTP).
- [ ] `http://domain.com` redirects to `https://domain.com`.
- [ ] `www.domain.com` redirects to `domain.com` (or as configured).
- [ ] No mixed content warnings (all resources load over HTTPS).
- [ ] SSL certificate is valid (Cloudflare handles this automatically).
- [ ] DNS propagation complete (check with `dig` or online DNS checker).

### Domain Safety Rules

| Rule | Requirement |
|------|-------------|
| Always use HTTPS. | Never serve content over HTTP. |
| Always redirect www to non-www (or vice versa). | Prevent duplicate content issues. |
| Never change DNS records during a deployment. | DNS changes + code changes = hard-to-debug issues. |
| Document all DNS records. | Future team members need to understand the setup. |

---

## 12. SSL / Security Checklist

Security is non-negotiable for a premium platform.

### SSL / HTTPS

- [ ] Site loads over HTTPS on all pages.
- [ ] No mixed content warnings (no HTTP resources on HTTPS pages).
- [ ] HSTS header configured (Cloudflare can enforce this).
- [ ] SSL certificate is valid and not expired.
- [ ] Redirect from HTTP to HTTPS is active.

### Content Security

- [ ] No sensitive data (API keys, passwords) in client-side code.
- [ ] `firebase-config.js` contains only public API keys (never service account keys).
- [ ] No exposed database credentials.
- [ ] No exposed email server credentials.

### Form Security

- [ ] All forms use HTTPS.
- [ ] Form data is sanitized before storage or transmission.
- [ ] Honeypot fields present on all forms.
- [ ] Rate limiting active on all forms.
- [ ] CSRF protection where applicable (server-side forms).

### Header Security

- [ ] `_headers` file configures secure headers:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Content-Security-Policy` (configured appropriately)

---

## 13. Robots.txt Verification

`robots.txt` tells search engines which pages to crawl and which to ignore.

### Robots.txt Requirements

- [ ] `robots.txt` exists at the project root (`/robots.txt`).
- [ ] `robots.txt` is accessible at `https://domain.com/robots.txt`.
- [ ] `User-agent: *` allows access to all public pages.
- [ ] `Disallow:` paths are intentional and documented.
- [ ] `Sitemap:` directive points to the correct sitemap URL.
- [ ] No `Disallow: /` that blocks the entire site.

### Example Robots.txt

```
User-agent: *
Allow: /

# Prevent crawling of admin/staging pages (future)
# Disallow: /admin/
# Disallow: /staging/

Sitemap: https://furnostyles.com/sitemap.xml
```

### Common Robots.txt Mistakes

| Mistake | Why It Is Bad |
|---------|---------------|
| `Disallow: /` | Blocks the entire site from search engines. |
| Missing `Sitemap:` | Search engines may not find the sitemap. |
| Blocking CSS/JS files | Search engines need these to render pages correctly. |
| Typos in paths | `Disallow: /blogs` blocks `/blogs/` but also `/blogs-interior-design.html`. |

---

## 14. Sitemap Verification

The sitemap is the search engine's map of your site.

### Sitemap Requirements

- [ ] `sitemap.xml` exists at the project root (`/sitemap.xml`).
- [ ] `sitemap.xml` is accessible at `https://domain.com/sitemap.xml`.
- [ ] Sitemap uses HTTPS URLs exclusively.
- [ ] Sitemap uses the correct domain (not localhost or preview URLs).
- [ ] Every public HTML page is listed in the sitemap.
- [ ] No duplicate URLs in the sitemap.
- [ ] `lastmod` dates are accurate (updated when page content changes).
- [ ] `changefreq` values are reasonable (e.g., `weekly` for blog, `monthly` for services).
- [ ] `priority` values reflect page importance (homepage = 1.0, blog = 0.5).
- [ ] Sitemap is valid XML (validate with an XML validator).

### Sitemap Maintenance

| Trigger | Action |
|---------|--------|
| New page published | Add to sitemap; update `lastmod`; resubmit to Google. |
| Page deleted | Remove from sitemap; add 301 redirect if URL changed. |
| Page content updated | Update `lastmod` date for that URL. |
| New blog article | Add to sitemap with today's date. |

### Common Sitemap Mistakes

| Mistake | Why It Is Bad |
|---------|---------------|
| HTTP URLs | Search engines prefer HTTPS; mixed protocols cause issues. |
| Missing pages | Unlisted pages may not be indexed. |
| Orphan URLs | URLs in sitemap that are not linked from anywhere confuse search engines. |
| Future dates in `lastmod` | Signals untrustworthy data to search engines. |

---

## 15. Google Search Console Verification

Google Search Console is the control panel for how Google sees your site.

### Setup Steps

```
1. Go to https://search.google.com/search-console
2. Add property: Domain (recommended) or URL prefix.
3. Verify ownership:
   - Domain: Add TXT record to DNS (Cloudflare DNS recommended).
   - URL prefix: Upload HTML verification file to project root.
4. Submit sitemap.xml.
5. Request indexing for homepage and key pages.
6. Check for coverage errors (excluded, valid with warnings, errors).
7. Check for mobile usability errors.
8. Check for Core Web Vitals status.
```

### Verification Checklist

- [ ] Property verified in Google Search Console.
- [ ] Sitemap submitted and status shows "Success".
- [ ] Coverage report shows zero errors.
- [ ] Mobile usability report shows zero errors.
- [ ] Core Web Vitals report shows "Good" status for all page groups.
- [ ] HTTPS report shows no issues.
- [ ] Manual actions report shows no penalties.
- [ ] Security issues report shows no problems.

### Post-Launch Monitoring

| Frequency | Action |
|-----------|--------|
| Weekly | Check coverage and mobile usability reports. |
| Monthly | Review search performance (clicks, impressions, CTR). |
| Quarterly | Review Core Web Vitals trends. |
| After every deployment | Check for new coverage errors. |

---

## 16. Analytics Setup Workflow

Analytics measure what users do on the site. Without data, decisions are guesses.

### Google Analytics 4 Setup

```
1. Create GA4 property in Google Analytics.
2. Add data stream for the website (https://furnostyles.com).
3. Copy the Measurement ID (G-XXXXXXXXXX).
4. Add the GA4 script to every page (ideally via a shared component).
5. Configure enhanced measurement (page views, scrolls, outbound clicks, site search).
6. Set up conversions (form submissions, contact clicks, etc.).
7. Add custom events for Furnostyles-specific actions.
8. Verify data is flowing (Real-time report shows active users).
```

### Firebase Analytics Setup (Future)

```
1. Enable Firebase Analytics in the Firebase project.
2. Link Firebase Analytics to Google Analytics 4 property.
3. Track custom events: search, cart_add, checkout_begin, purchase.
4. Set user properties: user_type (client, vendor, admin).
```

### Analytics Verification Checklist

- [ ] GA4 script is present on all pages.
- [ ] Real-time report shows at least one active user (test yourself).
- [ ] Page views are tracked correctly.
- [ ] Outbound clicks are tracked.
- [ ] Form submissions are tracked as conversions.
- [ ] Site search queries are tracked.
- [ ] No personally identifiable information (PII) is sent to analytics.

### Privacy Compliance

- [ ] Cookie consent banner implemented (if required by jurisdiction).
- [ ] Privacy policy page exists and is linked in footer.
- [ ] Users can opt out of analytics tracking.
- [ ] Data retention settings configured in GA4.

---

## 17. Backup / Versioning Workflow Before Launch

Before launch, create a complete, named snapshot of the working site.

### Pre-Launch Snapshot

```
1. Copy the entire project folder.
2. Name it: furnostyles-launch-YYYY-MM-DD
3. Store it in a safe location (external drive, cloud storage).
4. Verify the snapshot is complete (all files, all folders).
5. Document the snapshot location and date.
6. This snapshot is the "last known good" before public launch.
```

### Versioning Rules for Launch

| Rule | Requirement |
|------|-------------|
| Snapshot before every major change after launch. | Pre-deployment safety net. |
| Name snapshots with date and purpose. | `furnostyles-2026-06-01-before-blog-expansion` |
| Keep the last 5 snapshots. | Delete older ones to save space. |
| Never work directly on the live site. | Edit local copy, test, then deploy. |
| Cloudflare Pages retains deploy history. | Rollback to previous deploy if needed. |

### Post-Launch Snapshot Schedule

| Trigger | Action |
|---------|--------|
| Before deploying new pages | Snapshot current state. |
| Before adding Firebase integration | Snapshot static-only state. |
| Before major design changes | Snapshot current design state. |
| Monthly | Create a dated backup regardless of changes. |

---

## 18. AI-Refactor Freeze Rules Before Deployment

AI-assisted development is powerful but dangerous near launch. Freeze rules prevent last-minute destruction.

### AI Freeze Rules (Active from 48 hours before launch)

| Rule | Requirement |
|------|-------------|
| **No new features** | Do not ask AI to add any feature not already planned. |
| **No refactoring** | Do not ask AI to "clean up" or "improve" code. |
| **No renames** | Do not ask AI to rename files, classes, or functions. |
| **No deletions** | Do not ask AI to delete files or code blocks. |
| **No style changes** | Do not ask AI to change colours, fonts, or spacing. |
| **No new dependencies** | Do not ask AI to add new libraries or frameworks. |
| **Only bug fixes allowed** | AI may fix verified bugs with minimal, targeted changes. |
| **Only content updates allowed** | AI may update text content if requested. |
| **Read before edit** | AI must read the full file before any edit. |
| **Preserve all existing code** | AI must not remove working code to add new code. |

### Pre-Launch AI Danger Zone

| Dangerous Request | Why It Is Forbidden Before Launch |
|-------------------|----------------------------------|
| "Refactor the CSS" | May break layout on pages not tested. |
| "Make it look better" | Subjective; may introduce inconsistencies. |
| "Add a sidebar" | Violates "no sidebar yet" rule; untested. |
| "Change all class names" | Breaks every page reference. |
| "Optimize all images" | May change dimensions and cause layout shifts. |
| "Add animations" | May hurt performance on low-end devices. |
| "Restructure the folders" | Breaks all relative paths. |

### Safe AI Requests Before Launch

| Safe Request | Why It Is Safe |
|--------------|----------------|
| "Fix the typo on line 45" | Minimal, targeted text change. |
| "Update the copyright year" | Single-line text change. |
| "Add alt text to this image" | Accessibility improvement, no structural change. |
| "Fix the broken link to services.html" | Corrects an error without structural change. |

---

## 19. Emergency Rollback Workflow

If the launch breaks the live site, recover quickly.

### Rollback Trigger

Rollback immediately if:
- The site is completely down (404 on all pages).
- Critical functionality is broken (forms, navigation, checkout).
- Security vulnerability is discovered.
- Major layout corruption on mobile or desktop.
- Google Search Console reports critical errors post-launch.

### Rollback Steps

```
1. Identify the severity of the issue.
2. If minor and fixable quickly (typo, single broken link), fix and redeploy.
3. If major or unknown cause, roll back immediately:
   a. Cloudflare Pages rollback:
      - Dashboard > Pages > Deployments.
      - Find last known good deploy.
      - Mark as active production deploy.
   b. If Cloudflare rollback fails:
      - Restore from pre-launch snapshot.
      - Redeploy from snapshot.
4. Verify live site works after rollback.
5. Notify the team that a rollback occurred.
6. Investigate the cause in the development environment.
7. Fix the issue, test thoroughly, and redeploy.
8. Document the incident: what went wrong, why, how it was fixed.
```

### Rollback Checklist

- [ ] Last known good deploy ID is documented before launch.
- [ ] Pre-launch snapshot is accessible and verified.
- [ ] Team knows who is authorized to perform rollback.
- [ ] Communication plan exists for notifying users of downtime.

---

## 20. Future Update Workflow After Launch

After launch, the site must be updated safely without breaking the live site.

### Safe Update Workflow

```
1. Read the relevant architecture document before planning the change.
2. Write a brief proposal: what, why, which files affected.
3. Identify which pages need testing after the change.
4. Create a snapshot of the current project.
5. Make the change in the local development copy.
6. Test locally (browser preview, Lighthouse, responsive check).
7. Test on a Cloudflare Pages preview URL.
8. Review with a second person (peer review for major changes).
9. Deploy to production.
10. Verify live site for 30 minutes.
11. Document the change.
```

### Update Categories

| Category | Examples | Safety Level |
|----------|----------|--------------|
| **Content update** | New blog post, text change, image swap | Low risk |
| **New page** | New service page, new portfolio project | Low risk if using existing template |
| **Shared component change** | Header update, footer update | High risk — test every page type |
| **CSS change** | New component style, design token change | Medium risk — test multiple page types |
| **JS change** | New utility function, form logic update | Medium risk — test all affected forms |
| **Architecture change** | New folder structure, new build process | High risk — extensive testing required |
| **Third-party integration** | New Firebase feature, new API | High risk — test end-to-end |

### Update Safety Rules

| Rule | Requirement |
|------|-------------|
| Never deploy on Friday evening. | Recovery time may be limited. |
| Never deploy during peak hours. | Minimize user impact. |
| Always snapshot before shared component changes. | Wide blast radius. |
| Always test on preview URL before production. | Catch issues before users see them. |
| Always monitor for 30 minutes after deployment. | Catch issues quickly. |
| Document every change. | Future team needs to know what happened. |

---

## 21. How to Safely Deploy New Pages Later

Adding new pages is the most common post-launch activity. Doing it safely preserves site integrity.

### New Page Deployment Workflow

```
1. Copy an existing page of the same type as a template.
   (e.g., copy services/interior-design.html for a new service)
2. Update the content: title, headings, text, images.
3. Update the meta tags: title, description, canonical, OG.
4. Add the page to navigation-data.js if it should appear in nav.
5. Add internal links to the new page from relevant existing pages.
6. Add the page to sitemap.xml.
7. Test the new page locally:
   - Visual check (mobile, desktop).
   - Lighthouse check.
   - Link check (internal and external links work).
8. Deploy via Cloudflare Pages preview first.
9. Verify preview URL.
10. Deploy to production.
11. Submit the new URL to Google Search Console for indexing.
```

### New Page Safety Rules

| Rule | Requirement |
|------|-------------|
| Always use the existing page template. | Never create a page from scratch; copy and modify. |
| Always update meta tags. | Every page needs unique SEO data. |
| Always add to sitemap. | Unlisted pages may not be indexed. |
| Always add internal links. | Orphan pages confuse users and search engines. |
| Never use absolute URLs with domain name. | Relative paths only for internal links. |
| Always test before deploying. | Visual, Lighthouse, link checks. |

### What to Centralize for New Pages

| Centralized Item | Why |
|------------------|-----|
| Page template | Consistent structure |
| `style.css` | Consistent styling |
| `navigation-data.js` | Automatic nav updates |
| `sitemap.xml` | Automatic indexing |
| Form validation | Consistent form behaviour |

---

## 22. How to Safely Expand Marketplace Later

The marketplace is a future phase. When the time comes, expand it without breaking the existing site.

### Marketplace Expansion Workflow

```
1. Read docs/master-development-roadmap.md Phase 5.
2. Read docs/security-and-project-safety.md sections 17-18.
3. Design marketplace page templates separate from existing pages.
4. Build marketplace CSS in css/marketplace.css only.
5. Build marketplace JS in js/marketplace.js only.
6. Build marketplace pages in marketplace/ folder.
7. Load marketplace CSS/JS only on marketplace pages.
8. Integrate Firebase for product data storage.
9. Test marketplace pages independently.
10. Test that existing pages are unaffected.
11. Deploy via preview URL.
12. Deploy to production.
```

### Marketplace Expansion Safety Rules

| Rule | Requirement |
|------|-------------|
| Marketplace CSS must not affect non-marketplace pages. | Feature CSS loaded conditionally. |
| Marketplace JS must not affect non-marketplace pages. | Feature JS loaded conditionally. |
| Shared components (header/footer) must remain unchanged. | Marketplace uses the same shared components. |
| Navigation must link to marketplace but not break existing links. | Add to nav data, do not remove existing entries. |
| Product data must be validated before storage. | Strict Firestore schema. |
| Vendor applications must be approved before public visibility. | Admin moderation workflow. |

### What Must Remain Unchanged

| Item | Why |
|------|-----|
| `style.css` design tokens | Marketplace uses the same tokens |
| `style.css` layout system | Marketplace pages use `.premium-layout` |
| `main.js` shared component loader | Same header/footer for marketplace |
| `navigation-data.js` structure | Add entries, do not change structure |
| `js/form-validation.js` | Marketplace forms use the same validation |

---

## 23. How to Safely Reintroduce Sidebar Later

The sidebar is a future Phase 3 feature. When the time comes, add it without breaking existing pages.

### Sidebar Reintroduction Workflow

```
1. Read docs/future-sidebar-strategy.md.
2. Read docs/security-and-project-safety.md section 9.
3. Build sidebar CSS in css/sidebar.css only.
4. Build sidebar JS in js/sidebar.js only.
5. Load sidebar CSS/JS only on pages that opt in.
6. Add sidebar HTML only to pages that need it.
7. Use modifier class: .premium-layout--with-sidebar.
8. Test on one page type first (e.g., blog).
9. Verify non-sidebar pages are unaffected.
10. Add sidebar to additional page types one at a time.
11. Deploy via preview URL.
12. Deploy to production.
```

### Sidebar Safety Rules

| Rule | Requirement |
|------|-------------|
| Sidebar is opt-in only. | Only pages with `.premium-layout--with-sidebar` get a sidebar. |
| Pages without sidebar must look identical to before. | No squeezing, no layout shifts. |
| Sidebar CSS is loaded conditionally. | `<link rel="stylesheet" href="css/sidebar.css">` only on sidebar pages. |
| Sidebar JS is loaded conditionally. | `<script src="js/sidebar.js"></script>` only on sidebar pages. |
| Sidebar works without JavaScript. | CSS-only fallback for accessibility. |
| Sidebar is hidden on mobile. | Drawer pattern instead of squeezed layout. |
| Sidebar state persists across pages. | `localStorage` remembers open/closed. |

### Sidebar Danger Zone

| Dangerous Action | Why It Is Dangerous |
|------------------|---------------------|
| Adding sidebar CSS to all pages | May break layout on pages not designed for it. |
| Adding sidebar HTML to all pages | Pages without sidebar content will have empty sidebars. |
| Changing `.premium-layout` globally | Breaks every page that does not have a sidebar. |
| Removing `.premium-main` to make room for sidebar | Destroys the semantic structure. |

---

## 24. Common Production Mistakes to Avoid

These mistakes have caused launches to fail. Learn from them.

### Deployment Mistakes

| Mistake | Why It Fails | Prevention |
|---------|--------------|------------|
| Deploying on Friday evening | No one is available to fix issues over the weekend. | Deploy Tuesday-Thursday, mid-morning. |
| Deploying without preview testing | Broken code goes straight to users. | Always test preview URL first. |
| Deploying without a snapshot | No rollback option if something breaks. | Snapshot before every deployment. |
| Deleting old deploys immediately | Cannot roll back to previous version. | Keep last 5 deploys. |
| Not monitoring after deployment | Issues go unnoticed for hours. | Monitor for 30 minutes post-deploy. |

### Content Mistakes

| Mistake | Why It Fails | Prevention |
|---------|--------------|------------|
| Placeholder text on public pages | Looks unprofessional; damages trust. | Search for "Lorem", "Coming soon", "TODO" before launch. |
| Broken images | Looks unprofessional; hurts SEO. | Check browser console for 404 images. |
| Missing meta descriptions | Lower click-through rates from search. | Verify every page has unique meta description. |
| Duplicate page titles | Confuses search engines and users. | Verify every page has unique title. |
| Orphan pages | Users and search engines cannot find them. | Every page must be linked from somewhere. |

### Technical Mistakes

| Mistake | Why It Fails | Prevention |
|---------|--------------|------------|
| Mixed HTTP/HTTPS content | Browser security warnings; broken resources. | All resources load over HTTPS. |
| Exposed API keys | Security vulnerability; potential abuse. | Audit all JS files for private credentials. |
| No form validation | Spam floods; invalid data. | Test every form before launch. |
| No mobile testing | 60%+ of users are on mobile; broken mobile = lost users. | Test on real mobile devices. |
| Unclosed HTML tags | Layout breaks; rendering issues. | Validate HTML with a validator. |
| Inline styles on structural elements | Inconsistent layout; hard to maintain. | CSS classes only for `.premium-topbar`, `.premium-header`, `.premium-brand`. |

### SEO Mistakes

| Mistake | Why It Fails | Prevention |
|---------|--------------|------------|
| Missing sitemap | Search engines miss pages. | Submit sitemap to Google Search Console. |
| Blocking robots.txt | Entire site invisible to search engines. | Verify `Disallow:` does not block `/`. |
| No canonical URLs | Duplicate content penalties. | Every page has a canonical tag. |
| Broken internal links | Lost link equity; poor user experience. | Run link checker before launch. |
| Slow page speed | Lower rankings; higher bounce rates. | Lighthouse 90+ performance score. |

---

## 25. Long-Term Maintenance Checklist

A launched site requires ongoing care. This checklist keeps the platform healthy.

### Daily

- [ ] Check that the live site loads.
- [ ] Check that contact forms work (submit a test inquiry).
- [ ] Monitor uptime (Cloudflare provides basic uptime monitoring).

### Weekly

- [ ] Check Google Search Console for new errors.
- [ ] Review analytics for unusual traffic drops or spikes.
- [ ] Check for broken links (automated tool or manual spot-check).
- [ ] Verify contact form submissions are received.

### Monthly

- [ ] Run Lighthouse audit on all major page types.
- [ ] Review and update content that is outdated.
- [ ] Check for unused CSS or JS (Chrome Coverage tool).
- [ ] Review and respond to user feedback.
- [ ] Update copyright year if needed.
- [ ] Verify SSL certificate validity.
- [ ] Test backup restoration (restore a snapshot to verify it works).

### Quarterly

- [ ] Full content audit: update old articles, remove outdated pages.
- [ ] SEO audit: review keyword rankings, update meta descriptions.
- [ ] Performance audit: identify and fix new performance regressions.
- [ ] Accessibility audit: run axe/WAVE on all page types.
- [ ] Security audit: review Firebase rules, check for exposed credentials.
- [ ] Review and prune old snapshots (keep last 5, delete older).
- [ ] Review architecture documents for accuracy.
- [ ] Update dependencies (Firebase SDK, analytics scripts, etc.).

### Annually

- [ ] Domain renewal verification.
- [ ] SSL certificate renewal (Cloudflare handles this automatically).
- [ ] Full platform review: what worked, what did not, what to improve.
- [ ] Update long-term roadmap based on business goals.
- [ ] Review and update privacy policy and terms of service.
- [ ] Audit all third-party integrations for necessity and cost.

---

## Document Summary

| # | Section | Purpose |
|---|---------|---------|
| 1 | Final pre-launch checklist | 40+ structure, content, and functionality checks. |
| 2 | SEO readiness checklist | On-page, technical, and off-page SEO verification. |
| 3 | Responsive/mobile testing checklist | Device testing, visual checks, functional checks. |
| 4 | Performance testing checklist | Lighthouse, Core Web Vitals, asset optimization, page weight. |
| 5 | Accessibility testing checklist | Automated + manual testing, ARIA, colour contrast. |
| 6 | Internal link testing workflow | Link testing steps, automated tools, quality checks. |
| 7 | Shared component testing workflow | Header, footer, nav data testing + change protocol. |
| 8 | Media/image verification workflow | Image quality, technical checks, asset inventory. |
| 9 | Blog/article publishing checklist | Content quality, technical quality, publishing workflow. |
| 10 | Cloudflare Pages deployment workflow | Pre-deployment, deployment, post-deployment steps. |
| 11 | Domain connection workflow | Domain setup, verification, safety rules. |
| 12 | SSL/security checklist | HTTPS, content security, form security, headers. |
| 13 | Robots.txt verification | Requirements, example, common mistakes. |
| 14 | Sitemap verification | Requirements, maintenance, common mistakes. |
| 15 | Google Search Console verification | Setup steps, verification checklist, monitoring schedule. |
| 16 | Analytics setup workflow | GA4 setup, Firebase Analytics, verification, privacy. |
| 17 | Backup/versioning workflow | Pre-launch snapshot, versioning rules, snapshot schedule. |
| 18 | AI-refactor freeze rules | 48-hour freeze rules, danger zone, safe requests. |
| 19 | Emergency rollback workflow | Trigger conditions, rollback steps, checklist. |
| 20 | Future update workflow | Safe update workflow, update categories, safety rules. |
| 21 | Safe new page deployment | New page workflow, safety rules, centralization. |
| 22 | Safe marketplace expansion | Expansion workflow, safety rules, what must remain unchanged. |
| 23 | Safe sidebar reintroduction | Reintroduction workflow, safety rules, danger zone. |
| 24 | Common production mistakes | Deployment, content, technical, and SEO mistakes with prevention. |
| 25 | Long-term maintenance checklist | Daily, weekly, monthly, quarterly, and annual tasks. |

**This document must be read and all checklists completed before the Furnostyles platform is launched publicly.**
