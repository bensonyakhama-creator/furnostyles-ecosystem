# Furnostyles Deployment and Production-Readiness Guide

**Date:** 2026-05-22 | **Workspace:** `furnostyles-clean-rebuild/` | **Hosting:** Cloudflare Pages

---

## 1. Local Development Workflow

**Always work in:** `furnostyles-clean-rebuild/` only. Never edit `furnostyles-fresh-structure/` (old site, reference only).

**Start a local server** — do not open HTML files directly:

| Tool | Command |
|------|---------|
| VS Code Live Server | Right-click `index.html` → "Open with Live Server" |
| Node http-server | `npx http-server -p 8080` |
| Python | `python -m http.server 8080` |

**After every save, test:**
- [ ] Page loads with no console errors (F12 → Console)
- [ ] Header and footer render
- [ ] All internal links work
- [ ] Images load (even as placeholders)
- [ ] Mobile layout works (DevTools device mode: 375px, 768px, 1440px)
- [ ] No inline styles on `.premium-topbar`, `.premium-header`, `.premium-brand`
- [ ] All buttons properly closed
- [ ] No sidebar HTML/CSS/JS (unless building sidebar)
- [ ] `&copy;` entity for copyright symbol

---

## 2. Safe Testing Workflow

### Three-Environment Rule

```
Local (your computer)
  → Preview (Cloudflare Pages preview deployment)
    → Production (furnostyles.com)
```

**Before any change goes live:**
1. Test on local server at three screen sizes
2. Commit to a feature branch (not `main`)
3. Push to GitHub → Cloudflare creates a preview URL
4. Test on preview URL with real HTTPS
5. Merge to `main` only after preview passes

**Cross-browser priority:** Chrome (critical) → Safari (critical) → Firefox (high) → Edge (high).

---

## 3. Live Server Workflow

Use a local HTTP server, not `file://` paths. Relative paths like `../assets/css/global.css` only resolve correctly over HTTP.

**Test on real phones:** Find your computer's IP (`ipconfig`), ensure phone and computer share WiFi, then visit `http://192.168.1.X:8080` on the phone.

---

## 4. File Organization Rules

### Golden Rule
Every file has one home and one job. Never duplicate logic.

| Folder | What Goes Here | What Does NOT |
|--------|---------------|---------------|
| `assets/css/` | Stylesheets only | No JS, no images |
| `assets/js/` | JavaScript only | No CSS, no images |
| `assets/images/` | Images only | No CSS, no JS |
| `shared/layout/` | Header/footer renderers | No page-specific code |
| `shared/components/` | Reusable UI components | No page-specific code |
| `blogs/` | Blog articles + utilities | No service pages |
| `client/` | **Future** client dashboard | Nothing public-facing |
| `vendor/` | **Future** vendor dashboard | Nothing public-facing |
| `admin/` | **Future** admin panel | Nothing public-facing |
| `marketplace/` | **Future** marketplace pages | No dashboard code |
| `docs/` | Strategy documents | No code |

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| HTML pages | `kebab-case.html` | `contact.html`, `blog-modern-luxury.html` |
| CSS | `feature.css` | `blog.css`, `marketplace.css` |
| JS | `feature.js` | `blog.js`, `cart.js` |
| Images | `descriptive-name.jpg` | `hero-living-room.jpg` |
| Blog articles | `blog-topic-slug.html` | `blog-modern-luxury-interior-design-kenya.html` |

**Path rule:** Always use relative paths from the current file. From `/blogs/article.html`: `href="../services.html"`. Never use `C:/Users/...` paths.

---

## 5. How to Safely Add New Pages

**Step 1: Choose the template**

| Page Type | Copy This | Rename To |
|-----------|-----------|-----------|
| Public info page | `about.html` | `your-page.html` |
| Blog article | `blogs/modern-luxury-interior-design-kenya.html` | `blogs/blog-your-topic.html` |

**Step 2: Update `<head>` with unique SEO**

```html
<title>Descriptive Title | Furnostyles</title>
<meta name="description" content="Unique description under 160 chars.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://furnostyles.com/your-page.html">
```

**Step 3: Wire up shared components**

```html
<div id="fns-header-mount"></div>
<div id="fld-footer-mount"></div>
<script src="shared/layout/header-data.js" defer></script>
<script src="shared/layout/header-render.js" defer></script>
<script src="shared/layout/footer-data.js" defer></script>
<script src="shared/layout/footer-render.js" defer></script>
```

**Step 4: Add navigation link in `header-data.js`** if this page belongs in the main menu.

**Step 5: Test locally** using the per-page checklist (Section 1).

**Step 6: Add to sitemap** (Section 16).

**What NOT to do:**
- Do not copy from `furnostyles-fresh-structure/` (broken old code).
- Do not create pages without `<title>` and meta description.
- Do not hardcode navigation in every page.
- Do not use inline styles on structural elements.
- Do not add a sidebar unless explicitly building the sidebar feature.

---

## 6. How to Safely Update Shared Components

**Before changing any shared file, find every page that uses it:**

```powershell
Select-String -Path "*.html" -Pattern "header-render\.js"
```

**After changing a shared component, test on EVERY page that uses it.** Check mobile and tablet. Check console errors. Click every link inside the component.

### Component Dependency Map

| Component | Used On | Test These Pages |
|-----------|---------|-----------------|
| `header-render.js` | All pages | `index.html`, `blogs.html`, `contact.html`, any blog article |
| `footer-render.js` | All pages | Same as above |
| `global.css` | All pages | All pages |
| `blog.css` | Blog only | All blog articles |
| `article-data.js` | Blog listing + articles | `blogs.html`, all articles |

---

## 7. How to Safely Add Future Sidebar Later

**The sidebar is a CSS modifier, not a default.** The CSS already supports this:

```css
.fns-page-layout { grid-template-columns: 1fr; }
.fns-page-layout--with-sidebar { grid-template-columns: 1fr 280px; }
```

**Pages that MAY have a sidebar (when built):**
- Blog listing / category page
- Marketplace browse
- Dashboard pages

**Pages that must NEVER have a sidebar:**
- Blog articles, product detail, service pages, about/contact, checkout

**When adding a sidebar page:**
1. Use `fns-page-layout--with-sidebar` class
2. Create `assets/css/sidebar.css` (new file, loaded only on sidebar pages)
3. Load sidebar CSS only where needed
4. Test 5 existing non-sidebar pages to confirm nothing changed

---

## 8. CSS Management Strategy

### Current CSS Files

| File | Purpose | Load On |
|------|---------|---------|
| `global.css` | Variables, resets, utilities | All pages |
| `layout.css` | Grid, containers, spacing | All pages |
| `components.css` | Buttons, cards, badges, forms | All pages |
| `blog.css` | Blog hero, content, TOC, FAQ, CTA | Blog pages only |
| `responsive.css` | All breakpoints | All pages |
| `footer.css` | Footer-specific styles | All pages |

### CSS Rules

| Rule | Why |
|------|-----|
| One file per concern | `blog.css` for blog things. `marketplace.css` for marketplace things. |
| Load only what the page needs | Do not load `marketplace.css` on a blog article. |
| Use CSS variables for all colours | `var(--fns-gold-primary)` not `#d4af37`. |
| No inline styles on structural elements | Topbar, header, brand must use classes. |
| Mobile-first media queries | Base styles for mobile. Add complexity for larger screens. |
| Class prefix: `fns-` | Prevents conflicts with third-party libraries. |

### Adding New CSS

1. Is it used on multiple page types? → Add to `global.css`, `layout.css`, or `components.css`.
2. Is it specific to one feature? → Create a new file (e.g., `marketplace.css`).
3. Load it only where needed: `<link rel="stylesheet" href="../assets/css/marketplace.css">`
4. Document the new file in this guide.

---

## 9. JS Management Strategy

### Current JS Files

| File | Purpose | Load On |
|------|---------|---------|
| `app.js` | Global utilities, layout loading | All pages |
| `blog.js` | Reading time, TOC, smooth scroll, FAQ, lazy images | Blog pages only |
| `article-utils.js` | Component renderers, search, recommendations | Blog pages |
| `article-data.js` | Article metadata store | Blog pages |
| `header-render.js` / `footer-render.js` | Header/footer injection | All pages |
| `firebase-config.js` / `firebase-bridge.js` | Firebase setup | All pages (when active) |

### JS Rules

| Rule | Why |
|------|-----|
| One file per concern | `cart.js` for cart logic. `checkout.js` for checkout. |
| Load only what the page needs | Do not load `checkout.js` on the homepage. |
| Use `defer` on all scripts | Prevents blocking page render. |
| IIFE wrapper | `(function(){ 'use strict'; ... })()` keeps variables local. |
| Null checks before DOM access | `if (!element) return;` prevents crashes. |
| Public APIs on `window` | `window.FurnostylesArticles = Articles;` for cross-file access. |

### Adding New JS

1. Small addition to existing feature? → Add to existing file (e.g., `blog.js`).
2. New feature? → Create new file (e.g., `cart.js`).
3. Load it where needed: `<script src="assets/js/cart.js" defer></script>`
4. Document the new file in this guide.

---

## 10. Image Optimization Workflow

### Before Adding Any Image

**Step 1: Choose the format**

| Format | Use For | Avoid For |
|--------|---------|-----------|
| **WebP** | All photos (with JPEG fallback) | Not supported in very old Safari |
| **JPEG** | Fallback for WebP | Images needing transparency |
| **PNG** | Images with transparency | Photos (too large) |
| **SVG** | Icons, logos | Complex photos |

**Step 2: Resize to correct dimensions**

| Use Case | Max Dimensions |
|----------|---------------|
| Blog hero | 1200x800px |
| Blog inline | 800x600px |
| Product thumbnail | 400x300px |
| Product detail | 1200x1200px |
| Portfolio gallery | 1600x1200px |

**Never upload a 4000x3000px camera photo directly.**

**Step 3: Compress**

| Tool | Target |
|------|--------|
| Squoosh (squoosh.app) | Hero: < 200KB, Inline: < 100KB |
| TinyPNG (tinypng.com) | Same targets |

**Step 4: Add descriptive alt text**

```html
<img src="hero-living-room.jpg" alt="Modern luxury living room interior in Nairobi Kenya">
```

**Step 5: Use lazy loading for below-fold images**

```html
<img src="image.jpg" alt="Description" loading="lazy">
```

### Image Naming

```
Good:  hero-living-room-nairobi.jpg
Good:  blog-1-interior-design-kenya.jpg
Bad:   IMG_20240522_143022.jpg
Bad:   image1.jpg
```

---

## 11. SEO Checklist Before Deployment

### Every Page Must Have

| Element | Requirement | How to Check |
|---------|-------------|--------------|
| `<title>` | Unique, 50–60 chars, includes primary keyword | View page source |
| `<meta name="description">` | Unique, 150–160 chars | View page source |
| `<meta name="robots" content="index, follow">` | Present on public pages | View page source |
| `<link rel="canonical">` | Points to preferred URL | View page source |
| One H1 | Contains primary keyword naturally | Inspect element |
| Heading hierarchy | H1 → H2 → H3, no skipped levels | Inspect element |
| Image alt text | Descriptive, < 125 chars | Inspect element |
| Internal links | Minimum 2 per page | Click every link |
| Mobile-friendly | Passes Google test | Chrome DevTools |
| Fast loading | < 3 seconds on 3G | Lighthouse |

### Blog Articles Additional Checks

- [ ] Article + FAQ schema markup in `<head>`
- [ ] Table of contents with anchor links
- [ ] Reading time displayed
- [ ] Author specified in meta and on page
- [ ] Publish date visible and in schema

### Technical SEO

- [ ] `sitemap.xml` exists and is valid
- [ ] `robots.txt` exists, allows public pages
- [ ] HTTPS on all pages
- [ ] No broken internal links
- [ ] No duplicate content
- [ ] Structured data where applicable

---

## 12. Performance Checklist

### Before Every Deployment

Run Lighthouse in Chrome DevTools on these pages:
- `index.html`
- `blogs.html`
- `blogs/modern-luxury-interior-design-kenya.html`
- `services.html`
- `contact.html`

### Target Scores

| Metric | Target | Minimum |
|--------|--------|---------|
| Performance | 90+ | 75 |
| Accessibility | 95+ | 90 |
| Best Practices | 95+ | 90 |
| SEO | 100 | 95 |

### Optimisation Steps

| Step | Action | Impact |
|------|--------|--------|
| 1 | Compress images to WebP with JPEG fallback | -30–50% page weight |
| 2 | Add `defer` to all `<script>` tags | Faster first paint |
| 3 | Inline critical CSS, defer non-critical | Faster FCP |
| 4 | Lazy load below-fold images | Faster initial load |
| 5 | Minify CSS/JS (Cloudflare does this) | -20% file size |
| 6 | Enable browser caching | Faster repeat visits |

---

## 13. Cloudflare Pages Deployment Steps

### Prerequisites

- Git repository on GitHub
- Cloudflare account (free tier is sufficient)

### Step 1: Connect Repository

1. Cloudflare Dashboard → **Workers & Pages** → **Create a project**
2. **Pages** → **Connect to Git**
3. Authorise Cloudflare → select `furnostyles-clean-rebuild` repository
4. Production branch: `main`

### Step 2: Build Settings (Static Site)

| Setting | Value |
|---------|-------|
| Framework preset | None |
| Build command | (leave empty) |
| Build output directory | `/` (root) |

### Step 3: Add Environment Variables

| Variable | Value |
|----------|-------|
| `FIREBASE_API_KEY` | Your Firebase API key |
| `FIREBASE_AUTH_DOMAIN` | `furnostyles.firebaseapp.com` |
| `FIREBASE_PROJECT_ID` | `furnostyles` |

**Use test keys for preview deployments. Only live keys for production.**

### Step 4: Deploy

1. Push to `main` branch → Cloudflare auto-deploys
2. Production URL: `https://furnostyles.pages.dev`

### Step 5: Preview Deployments

Every branch push creates a preview URL:
```
https://[branch-name].furnostyles.pages.dev
```
Test on preview before merging to `main`.

### Step 6: Custom Domain (When Ready)

1. Cloudflare Pages settings → **Custom domains**
2. Add `furnostyles.com`
3. Add DNS records as instructed
4. SSL certificate auto-provisions

---

## 14. Domain Connection Strategy

### Current State (Development)

- Local: `http://localhost:8080`
- Preview: `https://[branch].furnostyles.pages.dev`
- Production: `https://furnostyles.pages.dev`

### Custom Domain Setup

```
Domain: furnostyles.com
  → DNS managed by Cloudflare
    → CNAME to Cloudflare Pages
      → SSL auto-provisioned
        → HTTPS enforced
```

### Future Subdomains

| Subdomain | Purpose | When |
|-----------|---------|------|
| `www.furnostyles.com` | Main site | At launch |
| `admin.furnostyles.com` | Admin dashboard | After admin system |
| `api.furnostyles.com` | API endpoints | After backend features |

### Required DNS Record

```
Type: CNAME
Name: @ (apex)
Target: furnostyles.pages.dev
Proxy status: Proxied (orange cloud)
```

---

## 15. Robots.txt Strategy

Create `/robots.txt` in the root folder:

```
# Allow all crawlers to access public content
User-agent: *
Allow: /

# Block private/dashboard areas (future)
Disallow: /client/
Disallow: /vendor/
Disallow: /admin/

# Block search result/filtered pages (prevents duplicate content)
Disallow: /marketplace/search?
Disallow: /*?sort=
Disallow: /*?filter=

# Sitemap location
Sitemap: https://furnostyles.com/sitemap.xml
```

| Page Type | robots.txt Rule |
|-----------|----------------|
| Public pages | `Allow` |
| Blog articles | `Allow` |
| Dashboards | `Disallow` |
| Search/filter URLs | `Disallow` |

---

## 16. Sitemap Strategy

Create `/sitemap.xml` in the root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://furnostyles.com/index.html</loc>
    <lastmod>2026-05-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://furnostyles.com/services.html</loc>
    <lastmod>2026-05-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://furnostyles.com/blogs.html</loc>
    <lastmod>2026-05-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://furnostyles.com/blogs/modern-luxury-interior-design-kenya.html</loc>
    <lastmod>2026-05-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Priority guide:**

| Priority | Used For |
|----------|----------|
| 1.0 | Homepage |
| 0.9 | Services, contact, main landing pages |
| 0.8 | About, portfolio, individual blog articles |
| 0.6 | Blog listing, category pages |
| 0.4 | Utility pages (privacy policy, terms) |

**Future:** When the site has 20+ pages, generate the sitemap automatically with a script (`scripts/generate-sitemap.js`) and run it before every deployment.

---

## 17. Google Search Console Setup

### Step 1: Add Property

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property**
3. Enter `https://furnostyles.com` (domain property) or `https://furnostyles.com/` (URL prefix)
4. Verify ownership via DNS record or HTML file upload

### Step 2: Submit Sitemap

1. Go to **Sitemaps** in Search Console
2. Enter `sitemap.xml`
3. Click **Submit**

### Step 3: Monitor These Reports

| Report | Shows | Action When Issues |
|--------|-------|-------------------|
| **Performance** | Impressions, clicks, CTR, position | Optimise underperforming pages |
| **Coverage** | Indexed, excluded, errors | Fix errors immediately |
| **Core Web Vitals** | Page speed (LCP, FID, CLS) | Fix any "Poor" scores |
| **Mobile Usability** | Mobile issues | Fix all — mobile is critical in Kenya |
| **Security Issues** | Hacked/malware | Act immediately |

### Step 4: URL Inspection

Before publishing a new page, enter the URL in **URL Inspection** → **Test live URL** → confirm Google can render it and the title/description appear correctly.

---

## 18. Analytics Strategy

### What to Track

| Metric | Tool | Why |
|--------|------|-----|
| Page views | GA4 | Which pages are popular |
| Sessions | GA4 | How long users stay |
| Bounce rate | GA4 | Are users finding what they need? |
| Traffic sources | GA4 | Where users come from |
| Search queries | Search Console | Which keywords drive traffic |
| CTA clicks | GA4 Events | Which CTAs convert |
| Form submissions | GA4 Events | Lead generation volume |
| Cart events | GA4 Events | E-commerce funnel (future) |

### Google Analytics 4 Setup

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get measurement ID (`G-XXXXXXXXXX`)
3. Add to every page `<head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Privacy Compliance

- Add a privacy policy page explaining data collection
- Use GA4 without cookies where possible to avoid consent banners
- If using cookies, add a cookie consent banner

---

## 19. Backup and Versioning Workflow

### Git Workflow

```
main (production)
  └── develop (staging)
        └── feature/blog-article-2
        └── fix/header-mobile
```

### Branch Rules

| Branch | Purpose | Direct Push? |
|--------|---------|--------------|
| `main` | Production code | **No** — only via pull request |
| `develop` | Integration | Tech lead only |
| `feature/*` | New features | Yes, with review |
| `fix/*` | Bug fixes | Yes, with review |
| `hotfix/*` | Critical fixes | Tech lead only |

### Commit Message Format

```
type: short description (under 50 chars)

Longer explanation (wrap at 72 chars).

- Bullet points for details
- Fixes #123
```

| Type | Used For | Example |
|------|----------|---------|
| `feat:` | New feature | `feat: add modern luxury blog article` |
| `fix:` | Bug fix | `fix: resolve mobile header overlap` |
| `docs:` | Documentation | `docs: update deployment guide` |
| `style:` | CSS changes | `style: adjust blog heading spacing` |
| `refactor:` | Restructuring | `refactor: extract CTA component` |
| `chore:` | Maintenance | `chore: compress portfolio images` |

### Backup Strategy

| Asset | Backup Method | Frequency |
|-------|--------------|-----------|
| Code | Git (GitHub) | Every commit |
| Firestore data | Firebase export | Monthly |
| Uploaded images | Firebase Storage + local copy | After every batch upload |

---

## 20. AI-Assisted Development Safety Rules

### The Problem

AI assistants can generate code that works locally but breaks in production. They can create duplicate CSS, add inline styles, import unnecessary libraries, skip accessibility, and use outdated patterns.

### Safety Rules

| Rule | Why |
|------|-----|
| **Never run AI-generated commands without reading them** | AI might suggest destructive operations. |
| **Never copy old code from `furnostyles-fresh-structure/`** | Contains broken CSS, inline styles, old sidebar code. |
| **Always review AI-generated CSS** | Check for inline styles, missing prefixes, class conflicts. |
| **Always review AI-generated HTML** | Check for unclosed tags, missing accessibility, old sidebar code. |
| **Always test AI-generated JS** | Run in browser console first. Check for undefined variables. |
| **Never let AI add external libraries** | Refuse jQuery, Bootstrap, CDN links unless explicitly approved. |
| **Always run the per-page checklist** | After any AI-assisted change, test thoroughly (Section 1). |
| **Never let AI edit shared components without review** | A header change can break every page. |
| **Always check relative paths** | AI often generates incorrect `../` counts. |
| **Never accept placeholder text as final** | Replace "Lorem ipsum" with real content. |
| **Always verify SEO elements** | AI may omit title, meta description, canonical URL. |

### Before Accepting Any AI Change

1. Does this follow the `fns-` naming convention?
2. Does this load only on pages that need it?
3. Does this work on mobile, tablet, and desktop?
4. Does this have console errors?
5. Does this preserve SEO elements?
6. Does this use the shared header/footer system?
7. Does this avoid inline styles on structural elements?
8. Does this not create a sidebar unless explicitly requested?

---

## 21. What Should NEVER Be Edited Blindly

### Critical Infrastructure Files

| File | Why Dangerous | What Breaks If Damaged |
|------|---------------|------------------------|
| `index.html` | Homepage — most visited page | Bad first impression for all visitors |
| `assets/css/global.css` | CSS variables used by every page | Colours, spacing, fonts break everywhere |
| `assets/css/layout.css` | Grid system and containers | Every page layout breaks |
| `shared/layout/header-render.js` | Header injected on every page | Every page loses navigation |
| `shared/layout/footer-render.js` | Footer injected on every page | Every page loses footer and links |
| `shared/layout/header-data.js` | Navigation menu data | Wrong or missing links in header |
| `blogs/article-data.js` | Central article metadata store | Blog listing, search, related articles break |
| `assets/js/app.js` | Global application logic | Layout loading and utilities fail |

### Safe Editing Process for Critical Files

1. **Copy the file** → Save as `[filename].backup-[date].js`
2. **Make your change**
3. **Test on at least 5 pages** that use the file
4. **Check mobile and tablet**
5. **Check console for errors**
6. **Only then commit**

---

## 22. How to Avoid Duplicated Layouts and Dashboard Chaos

### The Mistake That Must Not Repeat

The old site (`furnostyles-fresh-structure/`) had:
- Multiple versions of the same layout
- Inline styles scattered across files
- Sidebar code copied into pages that did not need it
- Header/footer duplicated in every file
- Broken CSS that only worked on one page

### Prevention System

| Rule | Implementation |
|------|----------------|
| **One header renderer** | `shared/layout/header-render.js` renders the header for every page. No page contains its own header HTML. |
| **One footer renderer** | `shared/layout/footer-render.js` renders the footer for every page. |
| **One CSS variable system** | `assets/css/global.css` defines all colours, spacing, fonts. No hardcoded values in page CSS. |
| **No inline styles** | Use classes. If a style is needed once, create a utility class. |
| **No sidebar by default** | The sidebar is a modifier class. Most pages do not have one. |
| **Template-based page creation** | Copy an existing page as a template. Do not start from scratch. |
| **Shared component library** | `shared/components/` contains reusable blocks. Do not copy component code between pages. |
| **No old code imports** | Never copy from `furnostyles-fresh-structure/`. Reference it visually, not via copy-paste. |
| **Code review for shared files** | Any change to `global.css`, `header-render.js`, or `footer-render.js` requires review. |

### Dashboard Boundary Rule

When dashboards are built (client, vendor, admin), they must be completely separate from public pages:

| Aspect | Public Pages | Dashboard Pages |
|--------|-------------|-----------------|
| Folder | Root, `blogs/`, `marketplace/` | `client/`, `vendor/`, `admin/` |
| Auth | None required | Login required |
| CSS | `global.css`, `layout.css`, `components.css` | Plus `dashboard.css` |
| JS | `app.js`, `blog.js`, etc. | Plus `dashboard.js`, `auth.js` |
| Header | Shared header renderer | Dashboard-specific navigation |
| Footer | Shared footer renderer | Minimal or no footer |
| SEO | Full optimisation | Blocked by robots.txt |

**Never mix dashboard code into public pages. Never mix public page navigation into dashboards.**

---

## 23. Recommended Order for Future Expansion

### Phase 1: Brand Site Foundation (Complete First)

| # | Feature | Why First |
|---|---------|-----------|
| 1 | Homepage (`index.html`) | Face of the business |
| 2 | About page | Trust and credibility |
| 3 | Services page | What Furnostyles offers |
| 4 | Repairs page | High-demand service |
| 5 | Portfolio page | Proof of work |
| 6 | Contact page | Conversion point |
| 7 | Blog system (5 cornerstone articles) | SEO traffic engine |

### Phase 2: Content Growth (After Phase 1 Stable)

| # | Feature | Why Now |
|---|---------|---------|
| 8 | 10 total blog articles | More SEO coverage |
| 9 | Blog category pages | Better navigation |
| 10 | Portfolio expansion | More project showcases |
| 11 | Real estate landing pages | New service vertical |

### Phase 3: Lead Capture (After Content Drives Traffic)

| # | Feature | Why Now |
|---|---------|---------|
| 12 | Service request form | Convert readers to leads |
| 13 | Email newsletter signup | Build audience |
| 14 | WhatsApp integration | Instant contact |
| 15 | Client dashboard shell | Track requests |

### Phase 4: Marketplace Browse (After Lead System Works)

| # | Feature | Why Now |
|---|---------|---------|
| 16 | Marketplace landing page | Product catalogue |
| 17 | Category browsing pages | Organised discovery |
| 18 | Product detail pages | Individual product info |
| 19 | Search and filter | Find products easily |

### Phase 5: Commerce (After Marketplace Proves Demand)

| # | Feature | Why Now |
|---|---------|---------|
| 20 | User accounts (client) | Save carts, view orders |
| 21 | Shopping cart | Add products |
| 22 | Checkout flow | Collect shipping, payment |
| 23 | M-Pesa integration | Primary payment method |
| 24 | Order management | Track orders, fulfilment |

### Phase 6: Ecosystem (After Commerce Stable)

| # | Feature | Why Now |
|---|---------|---------|
| 25 | Vendor accounts | Suppliers sell on platform |
| 26 | Vendor dashboard | Product upload, order management |
| 27 | Admin dashboard | Oversee everything |
| 28 | Messaging system | Customer-vendor communication |
| 29 | Notifications | Order updates, messages |
| 30 | Mobile app consideration | Scale to app when justified |

### Prove Before Building

Each phase must demonstrate value before the next phase begins:

- **Blog Phase:** Is search traffic growing? Are people reading?
- **Lead Capture Phase:** Are people submitting service requests?
- **Marketplace Phase:** Are people browsing products? Is there demand?
- **Commerce Phase:** Are people adding to cart? Is checkout used?
- **Vendor Phase:** Are vendors interested in joining?

If a phase does not show traction, fix the current phase first. Do not rush to the next phase.

---

## 24. Recommended Production Folder Structure

### Current Structure (Now)

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
│   │   ├── global.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── blog.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── app.js
│   │   └── blog.js
│   └── images/
│       ├── blogs/
│       └── portfolio/
├── shared/
│   ├── layout/
│   │   ├── header-data.js
│   │   ├── header-render.js
│   │   ├── footer-data.js
│   │   ├── footer-render.js
│   │   └── footer.css
│   ├── firebase/
│   │   ├── firebase-config.js
│   │   └── firebase-bridge.js
│   └── uploads/
│       ├── upload-bridge.css
│       └── upload-bridge.js
├── docs/
│   ├── SEO-BLOG-REBUILD-PLAN.md
│   ├── seo-content-roadmap.md
│   ├── future-platform-expansion.md
│   └── deployment-and-production-guide.md
└── README.md
```

### Production Structure (After Full Expansion)

```
furnostyles-clean-rebuild/
├── public/                          # Public-facing pages
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── repairs.html
│   ├── portfolio.html
│   ├── contact.html
│   ├── blogs.html
│   ├── blogs/
│   │   ├── article-data.js
│   │   ├── article-utils.js
│   │   ├── article-*.html
│   │   └── category-*.html
│   ├── marketplace/
│   │   ├── index.html
│   │   ├── category.html
│   │   ├── product.html
│   │   └── search.html
│   ├── realestate/
│   │   ├── index.html
│   │   ├── listings.html
│   │   └── property-detail.html
│   ├── robots.txt
│   └── sitemap.xml
│
├── client/                          # Client dashboard
│   ├── index.html
│   ├── dashboard.html
│   ├── orders.html
│   ├── messages.html
│   └── profile.html
│
├── vendor/                          # Vendor dashboard
│   ├── index.html
│   ├── dashboard.html
│   ├── products.html
│   ├── orders.html
│   └── profile.html
│
├── admin/                           # Admin dashboard
│   ├── index.html
│   ├── dashboard.html
│   ├── users.html
│   ├── products.html
│   ├── orders.html
│   └── content.html
│
├── assets/
│   ├── css/
│   │   ├── global.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── blog.css
│   │   ├── marketplace.css
│   │   ├── dashboard.css
│   │   ├── checkout.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── app.js
│   │   ├── blog.js
│   │   ├── marketplace.js
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   └── notifications.js
│   └── images/
│       ├── blogs/
│       ├── products/
│       ├── portfolio/
│       ├── realestate/
│       └── uploads/
│
├── shared/
│   ├── layout/
│   │   ├── header-data.js
│   │   ├── header-render.js
│   │   ├── footer-data.js
│   │   ├── footer-render.js
│   │   └── footer.css
│   ├── components/
│   │   ├── product-card/
│   │   ├── service-card/
│   │   ├── article-card/
│   │   ├── search-bar/
│   │   ├── notification-toast/
│   │   └── modal/
│   ├── firebase/
│   │   ├── firebase-config.js
│   │   └── firebase-bridge.js
│   └── uploads/
│       ├── upload-bridge.css
│       └── upload-bridge.js
│
├── docs/
│   ├── SEO-BLOG-REBUILD-PLAN.md
│   ├── seo-content-roadmap.md
│   ├── future-platform-expansion.md
│   ├── deployment-and-production-guide.md
│   └── onboarding.md
│
└── README.md
```

---

*Document version 1.0. Created 2026-05-22. Read before every coding session.*
