# Furnostyles Reusable Performance and Optimization Strategy

**Date:** 2026-05-22 | **Status:** Planning

---

## 1. CSS Optimization Strategy

CSS is the first visual layer users see. Optimizing it ensures pages paint quickly and remain responsive.

### Current Architecture

| File | Purpose | Size Budget |
|------|---------|-------------|
| `css/style.css` | Global styles, design tokens, typography, buttons, layout grid | < 50 KB |
| `css/blog.css` | Blog-specific card styles, article typography, pagination | < 15 KB |
| `css/portfolio.css` | Gallery styles, filter buttons, project cards | < 15 KB |
| `css/page-[type].css` | Page-specific overrides only | < 10 KB |

### Optimization Techniques

| Technique | How | Benefit |
|-----------|-----|---------|
| **Concatenation** | All global styles in one `style.css` | Single HTTP request for critical CSS |
| **Minification** | Remove whitespace, comments, redundant semicolons | ~30% size reduction |
| **Unused rule removal** | Audit with browser DevTools Coverage panel | Smaller file, faster parsing |
| **CSS variables** | `--fns-accent: #c5a059` instead of hard-coded hex | Smaller file, easier theming |
| **Avoid `@import`** | Use `<link>` tags instead | `@import` blocks rendering |
| **Mobile-first media queries** | Base styles for mobile, `min-width` for larger screens | Smaller CSS for mobile users |
| **Limit selectors** | Prefer classes over descendants and siblings | Faster selector matching |
| **Containment** | `contain: layout paint` for isolated components | Reduced repaint area |

### CSS Loading Order

```html
<head>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/blog.css" media="screen">
</head>
```

### CSS Rules

| Rule | Requirement |
|------|-------------|
| Total CSS per page must be under 50 KB. | Prevents render-blocking bloat. |
| No inline `<style>` blocks in page HTML. | All styles in external files for caching. |
| No `!important` except for utilities. | Easier to override, smaller specificity wars. |
| CSS is minified in production. | Dev environment may use readable CSS. |
| Unused CSS is audited quarterly. | Remove dead rules before they accumulate. |

---

## 2. JS Optimization Strategy

JavaScript powers interactivity but can block rendering if loaded incorrectly.

### Current Architecture

| File | Purpose | Size Budget | Loading |
|------|---------|-------------|---------|
| `js/main.js` | Global behaviour, header/footer loading, navigation, cart counter | < 40 KB | `defer` |
| `js/navigation-data.js` | Central navigation link store | < 10 KB | `defer` |
| `js/article-data.js` | Blog article metadata | < 20 KB | `defer` |
| `js/article-utils.js` | Related articles, search, listing render | < 15 KB | `defer` |
| `js/form-validation.js` | Validation engine, spam checks | < 10 KB | `defer` |
| `js/page-[type].js` | Page-specific behaviour only | < 10 KB | `defer` |

### Optimization Techniques

| Technique | How | Benefit |
|-----------|-----|---------|
| **`defer` attribute** | `<script defer src="js/main.js">` | JS downloads in parallel, executes after HTML parse |
| **Code splitting** | Feature JS (blog, portfolio) only on relevant pages | Smaller initial JS bundle |
| **Minification** | Remove whitespace, shorten variable names | ~40% size reduction |
| **Event delegation** | One listener on parent, not one per child | Fewer listeners, less memory |
| **Debounced handlers** | `debounce(resizeHandler, 200)` | Prevents excessive event firing |
| **Lazy initialization** | Only init components when visible or needed | Faster initial page load |
| **No jQuery or large frameworks** | Vanilla JS only | Smaller bundle, no dependency risk |

### JS Rules

| Rule | Requirement |
|------|-------------|
| All scripts use `defer`, never `async` for dependent scripts. | `async` breaks execution order; `defer` preserves it. |
| Total JS per page must be under 100 KB. | Prevents long parse and execution times. |
| No scripts in `<head>` without `defer`. | Blocks HTML parsing. |
| No inline `<script>` blocks in page HTML. | Keeps JS cacheable and maintainable. |
| Global variables are minimized. | Namespace under `Furnostyles.*` or module pattern. |
| Third-party scripts (analytics, chat widgets) load last. | Do not block own code with external dependencies. |

---

## 3. Shared Asset Loading Strategy

Assets that appear on every page should be loaded once and cached aggressively.

### Shared Assets

| Asset | Location | Loading Strategy |
|-------|----------|------------------|
| **Global CSS** | `css/style.css` | `<link>` in `<head>` |
| **Global JS** | `js/main.js` | `defer` before `</body>` |
| **Header HTML** | `shared/header.html` | `fetch()` on page load, cached in memory |
| **Footer HTML** | `shared/footer.html` | `fetch()` on page load, cached in memory |
| **Logo SVG** | `assets/images/logos/logo.svg` | Inline in header or cached via `<link rel="preload">` |
| **Icons** | Inline SVG or icon font | Inline SVG preferred (no extra request) |

### Asset Loading Pattern

```javascript
const FurnostylesShared = {
  cache: new Map(),
  async loadComponent(url, mountId) {
    if (this.cache.has(url)) {
      document.getElementById(mountId).innerHTML = this.cache.get(url);
      return;
    }
    try {
      const response = await fetch(url);
      const html = await response.text();
      this.cache.set(url, html);
      document.getElementById(mountId).innerHTML = html;
    } catch (err) {
      console.error('Failed to load shared component:', err);
    }
  }
};

Promise.all([
  FurnostylesShared.loadComponent('shared/header.html', 'fns-header-mount'),
  FurnostylesShared.loadComponent('shared/footer.html', 'fld-footer-mount')
]);
```

### Asset Loading Rules

| Rule | Requirement |
|------|-------------|
| Header and footer fetched in parallel with `Promise.all`. | Faster than sequential loading. |
| Shared components cached in memory after first load. | Subsequent pages reuse cached HTML instantly. |
| Asset URLs use relative paths. | Works on local, preview, and production. |
| No blocking requests for shared components. | Always fetch asynchronously. |
| Logo and critical icons are preloaded. | `<link rel="preload" as="image" href="...">` |

---

## 4. Image Optimization Workflow

Images are typically the largest assets on a page. Optimizing them is the highest-impact performance improvement.

### Image Format Strategy

| Format | Use Case | Notes |
|--------|----------|-------|
| **WebP** | All new photographs and illustrations | 25-35% smaller than JPEG with same quality |
| **JPEG** | Photographs where WebP support is uncertain | Fallback format |
| **PNG** | Logos, icons, images with transparency | Only when transparency is needed |
| **SVG** | Logos, icons, simple illustrations | Scalable, tiny file size |
| **AVIF** (future) | High-quality photographs | Even smaller than WebP |

### Optimization Techniques

| Technique | How | Benefit |
|-----------|-----|---------|
| **Compress at source** | Export from design tool at 80% quality | Smaller file without visible loss |
| **Resize to display size** | Do not serve 2000px image in 800px container | Dramatic size reduction |
| **Use `<picture>` for formats** | WebP with JPEG fallback | Modern browsers get WebP; old browsers get JPEG |
| **Remove metadata** | Strip EXIF data from exported images | Smaller file, no privacy leaks |
| **Use consistent dimensions** | Blog hero always 1200x630, portfolio thumbs 400x300 | Predictable sizes, easier caching |

### Image Example

```html
<picture>
  <source srcset="assets/images/hero/home-hero.webp" type="image/webp">
  <img src="assets/images/hero/home-hero.jpg"
       alt="Modern luxury living room designed by Furnostyles"
       width="1200" height="630"
       fetchpriority="high"
       decoding="async">
</picture>
```

### Image Rules

| Rule | Requirement |
|------|-------------|
| Hero/above-fold images use `fetchpriority="high"`. | Browser prioritizes these for early paint. |
| Below-fold images use `loading="lazy"`. | Deferred until user scrolls near them. |
| All images have explicit `width` and `height`. | Prevents layout shift (CLS). |
| All images have descriptive `alt` text. | Accessibility and SEO. |
| Image file names are descriptive. | `living-room-makeover-nairobi.jpg` not `IMG_1234.jpg`. |
| OG images are 1200x630px and under 200KB. | Social sharing performance. |
| Total image weight above the fold is under 300KB. | Fast Largest Contentful Paint (LCP). |

---

## 5. Lazy Loading Strategy

Lazy loading defers loading of non-critical resources until they are needed.

### What to Lazy Load

| Resource | Lazy Loading Method | Trigger |
|----------|---------------------|---------|
| **Below-fold images** | `loading="lazy"` | Image enters viewport |
| **Below-fold iframes** | `loading="lazy"` | Iframe enters viewport |
| **Non-critical CSS** | `media="print"` + JS swap | After initial render |
| **Non-critical JS** | Dynamic `import()` or `<script>` injection | After user interaction or idle time |
| **Offscreen components** | Intersection Observer | Component enters viewport |
| **Modals/overlays** | Preload on hover/click | User interaction |

### Lazy Loading Example

```html
<img src="assets/images/portfolio/project-1-thumb.jpg"
     alt="Karen family home living room"
     width="400" height="300"
     loading="lazy"
     decoding="async">
```

```javascript
const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const mount = entry.target;
      if (mount.id === 'fns-related-articles-mount') {
        renderRelatedArticles(mount);
      }
      lazyObserver.unobserve(mount);
    }
  });
}, { rootMargin: '200px' });

document.querySelectorAll('[data-lazy-load="true"]').forEach(el => {
  lazyObserver.observe(el);
});
```

### Lazy Loading Rules

| Rule | Requirement |
|------|-------------|
| Hero images never use `loading="lazy"`. | They must load immediately. |
| First 2-3 portfolio/blog images do not lazy load. | They are likely above the fold. |
| Lazy loaded images still have `width` and `height`. | Prevents layout shift even before load. |
| `rootMargin: '200px'` gives a 200px buffer. | Images start loading before they are visible. |
| Intersection Observer is preferred over scroll events. | Better performance, native browser API. |
| Disconnect observers after content loads. | Prevents unnecessary checks. |

---

## 6. Responsive Image Strategy

Serving appropriately sized images for each device prevents mobile users from downloading desktop-sized files.

### Responsive Image Approaches

| Approach | Use Case | Example |
|----------|----------|---------|
| **Srcset with sizes** | Same image at multiple resolutions | `srcset="img-400.jpg 400w, img-800.jpg 800w, img-1200.jpg 1200w"` |
| **Art direction with `<picture>`** | Different crops for different devices | Portrait crop on mobile, landscape on desktop |
| **Format fallback with `<picture>`** | WebP with JPEG fallback | `<source type="image/webp">` + `<img src=".jpg">` |

### Responsive Image Example

```html
<picture>
  <source
    srcset="assets/images/hero/home-hero-800.webp 800w,
            assets/images/hero/home-hero-1200.webp 1200w,
            assets/images/hero/home-hero-1600.webp 1600w"
    sizes="(max-width: 800px) 100vw, 1200px"
    type="image/webp">
  <source
    srcset="assets/images/hero/home-hero-800.jpg 800w,
            assets/images/hero/home-hero-1200.jpg 1200w,
            assets/images/hero/home-hero-1600.jpg 1600w"
    sizes="(max-width: 800px) 100vw, 1200px">
  <img src="assets/images/hero/home-hero-1200.jpg"
       alt="Modern luxury living room designed by Furnostyles"
       width="1200" height="630"
       fetchpriority="high"
       decoding="async">
</picture>
```

### Responsive Image Rules

| Rule | Requirement |
|------|-------------|
| Generate 3 sizes for every important image: small (400-600w), medium (800-1000w), large (1200-1600w). | Covers mobile, tablet, and desktop. |
| Use `sizes` attribute to tell the browser the display size. | Browser picks the optimal file from srcset. |
| Blog card thumbnails are max 400px wide. | No need for full-resolution images in listings. |
| Portfolio gallery images are max 800px wide in listings. | Full-resolution only in the detail page lightbox. |
| Hero images have the largest srcset. | They are the most visually impactful and largest display. |

---

## 7. Font Loading Strategy

Web fonts can block rendering if loaded incorrectly. Furnostyles uses a minimal, performant approach.

### Current Font Strategy

| Decision | Rationale |
|----------|-----------|
| **System font stack as primary** | `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif` | Zero loading time, native feel |
| **Premium display font loaded optionally** | Only for headings/brand if needed | Reduces total font payload |
| **Maximum 2 font families** | One for body, one for headings | Fewer requests, faster render |
| **WOFF2 format** | Smallest web font format | ~30% smaller than WOFF |
| **`font-display: swap`** | Show fallback font immediately, swap when loaded | Prevents invisible text (FOIT) |

### Font Loading Example

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
               Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
               'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

@font-face {
  font-family: 'Furnostyles Display';
  src: url('../fonts/furnostyles-display.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

h1, h2, h3, .premium-brand {
  font-family: 'Furnostyles Display', Georgia, serif;
}
```

### Font Loading Rules

| Rule | Requirement |
|------|-------------|
| `font-display: swap` on all `@font-face` declarations. | Prevents invisible text during load. |
| Preload critical fonts with `<link rel="preload">`. | `<link rel="preload" as="font" type="font/woff2" href="..." crossorigin>` |
| Limit total font payload to under 100KB. | Prefer system fonts to minimize downloads. |
| Do not use `@import` for Google Fonts or other font services. | Use `<link>` in `<head>` or self-host. |
| Subset fonts if only a few characters are needed. | Dramatically reduces file size for limited use. |
| Variable fonts (future) replace multiple weight files. | One file serves all weights. |

---

## 8. Critical Rendering Path Strategy

The critical rendering path is the sequence of steps the browser takes to convert HTML, CSS, and JS into pixels on the screen.

### Critical Path Priorities

| Priority | Resource | Action |
|----------|----------|--------|
| 1 | HTML | Download and parse immediately (always critical) |
| 2 | Critical CSS | Inline or load in `<head>` without blocking |
| 3 | Hero image | Preload with `fetchpriority="high"` |
| 4 | Web fonts (if any) | Preload with `<link rel="preload">` |
| 5 | Above-fold content | Ensure no layout shift from deferred resources |
| 6 | Non-critical CSS | Load with `media="print"` swap or `defer` |
| 7 | JS | Load with `defer` so it does not block parse |
| 8 | Below-fold images | Lazy load |

### Preload Critical Resources

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Furnostyles — Premium Interior Design in Nairobi</title>

  <link rel="preload" as="image" href="assets/images/hero/home-hero.webp" type="image/webp">
  <link rel="preload" as="font" href="assets/fonts/furnostyles-display.woff2"
        type="font/woff2" crossorigin="anonymous">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/blog.css" media="print"
        onload="this.media='screen'">
</head>
```

### Critical Rendering Path Rules

| Rule | Requirement |
|------|-------------|
| `<meta charset>` and `<meta viewport>` are the first tags in `<head>`. | Browser needs these to parse correctly. |
| `<title>` is before any render-blocking resource. | Browser can show the tab title immediately. |
| Preconnect to external domains. | `<link rel="preconnect" href="https://fonts.googleapis.com">` |
| DNS-prefetch for third-party resources. | `<link rel="dns-prefetch" href="//cdn.example.com">` |
| Inline critical CSS only if it is under 14KB. | Fits in a single HTTP round-trip; otherwise use external file. |
| Defer all non-critical CSS. | Do not block rendering for below-fold styles. |

---

## 9. Cloudflare Pages Optimization Considerations

Furnostyles is deployed on Cloudflare Pages, which provides several built-in optimizations.

### Built-In Optimizations

| Feature | Benefit | Configuration |
|---------|---------|-------------|
| **Automatic minification** | HTML, CSS, JS minified on deploy | Enabled by default |
| **Brotli compression** | Smaller file sizes than gzip | Enabled by default |
| **HTTP/2 and HTTP/3** | Parallel asset loading | Enabled by default |
| **Global CDN** | Assets served from edge locations | Automatic |
| **Edge caching** | Static assets cached at 300+ locations | Automatic for static files |
| **TLS 1.3** | Faster secure connections | Enabled by default |

### Cloudflare Pages Rules

| Rule | Requirement |
|------|-------------|
| Use `_headers` file for custom cache headers. | Control caching per file type. |
| Use `_redirects` file for URL redirects. | Clean URLs without server-side logic. |
| Enable "Always Online" for critical pages. | Serves cached version if origin is down. |
| Use Cloudflare Image Resizing (future) | Serve responsive images from the edge. |
| Enable Early Hints (103 status) | Browser starts loading assets before full response. |

### Example `_headers` File

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600, must-revalidate

/shared/*
  Cache-Control: public, max-age=1800, must-revalidate
```

---

## 10. Cache Strategy Recommendations

Effective caching reduces repeated downloads and speeds up repeat visits.

### Cache Strategy by Asset Type

| Asset Type | Cache Duration | Rationale |
|------------|----------------|-----------|
| **HTML pages** | 1 hour (`max-age=3600`) | Content changes frequently |
| **Shared components** | 30 minutes (`max-age=1800`) | Header/footer may change |
| **CSS/JS files** | 1 year (`max-age=31536000`) | Use versioned filenames for cache busting |
| **Images** | 1 year (`max-age=31536000`) | Use versioned or hashed filenames |
| **Fonts** | 1 year (`max-age=31536000`) | Fonts rarely change |
| **Favicon** | 1 week (`max-age=604800`) | May change for branding updates |

### Cache Busting with Versioned Filenames

When CSS or JS changes, use a versioned filename to force browsers to download the new version:

```html
<link rel="stylesheet" href="css/style.v2.css">
```

### Cache Rules

| Rule | Requirement |
|------|-------------|
| Version CSS and JS filenames when they change. | `style.v1.css` to `style.v2.css`. |
| Never cache HTML for more than a few hours. | Content may change without warning. |
| Use `immutable` for truly unchanging assets. | Browsers know the file will never change. |
| `must-revalidate` ensures stale content is not served. | Forces re-check after expiry. |
| Test cache behaviour in DevTools Network panel. | Verify headers and cache hits. |

---

## 11. Static Hosting Performance Advantages

Furnostyles uses static hosting (Cloudflare Pages), which provides inherent performance benefits over dynamic server-rendered sites.

### Advantages of Static Hosting

| Advantage | Explanation |
|-----------|-------------|
| **No server-side processing** | HTML is pre-built; no PHP, Node.js, or database queries on every request. |
| **Instant global CDN** | Files are cached at 300+ edge locations worldwide. |
| **No cold starts** | Every request is served from cache; no server boot time. |
| **Predictable performance** | Response times are consistent regardless of traffic. |
| **DDoS resistance** | CDN absorbs traffic spikes automatically. |
| **Lower bandwidth costs** | Compression and caching reduce data transfer. |
| **Simpler scaling** | No database connection pools or server capacity to manage. |

### What Static Hosting Cannot Do (and Workarounds)

| Limitation | Workaround |
|------------|------------|
| No server-side form processing | Use client-side validation + Firebase/Firestore for submission storage |
| No server-side rendering (SSR) | Use static HTML with client-side hydration for dynamic content |
| No server-side search | Use client-side search of `article-data.js` or Algolia (future) |
| No server-side authentication | Use Firebase Auth (future) for client-side auth |
| No dynamic URL routing | Use `404.html` with client-side router (future) or static file structure |

### Static Hosting Rules

| Rule | Requirement |
|------|-------------|
| Leverage the CDN for all assets. | Do not bypass CDN with direct origin requests. |
| Use `fetch()` for dynamic content, not server APIs. | Client-side data loading is the static hosting pattern. |
| Pre-build as much content as possible. | Blog listings, sitemaps, and navigation should be static HTML. |
| Client-side JS handles interactivity, not server logic. | Search, filtering, and form submission are JS-driven. |

---

## 12. Future CDN/Media Optimization Strategy

**Not to be built yet.** Document only.

As the site scales to hundreds of portfolio images, blog photos, and marketplace product images, a dedicated media optimization strategy becomes essential.

### Cloudflare Image Resizing (Future)

```html
<img src="https://furnostyles.com/cdn-cgi/image/width=800,quality=80,format=webp/
              uploads/portfolio/living-room-1.jpg"
     alt="Living room design"
     width="800" height="450"
     loading="lazy">
```

### CDN Media Rules (Future)

| Rule | Requirement |
|------|-------------|
| Upload full-resolution images to a central storage. | Cloudflare R2 or Firebase Storage. |
| Serve resized versions via CDN URL parameters. | No need to generate multiple file versions manually. |
| Use `format=webp` automatically. | CDN converts to WebP for supporting browsers. |
| Use `quality=80` as default. | Good balance of quality and size. |
| Cache resized images at the edge. | Same transformation request served from cache. |
| Use signed URLs for private/protected images. | Dashboard or client-only images. |

### Image Pipeline (Future Build Tool)

```
Source image (high-res PNG/RAW)
    |
    v
Build tool generates:
    - 400w JPEG thumbnail
    - 800w WebP medium
    - 1200w WebP large
    - 1600w WebP hero
    - 1200x630 OG image
    |
    v
All variants uploaded to CDN
```

---

## 13. Blog Performance Strategy

Blogs can accumulate many images and long text. Optimizing them ensures fast reading experiences.

### Blog-Specific Optimizations

| Technique | Implementation | Rationale |
|-----------|--------------|-----------|
| **Article listing thumbnails** | 400px wide, WebP, lazy loaded | Small images in card grids |
| **Article hero images** | 1200px wide, WebP, `fetchpriority="high"` | Largest image above the fold |
| **Inline article images** | Max 800px wide, WebP, `loading="lazy"` | Content images below the fold |
| **Native `<details>` for TOC/FAQ** | No JS needed for expand/collapse | Lightweight, accessible |
| **Client-side search** | Search `article-data.js` directly | No server request needed |
| **Pagination, not infinite scroll** | Static page numbers | Better for SEO, simpler for accessibility |
| **Related articles loaded dynamically** | Intersection Observer | Only load when user scrolls to the section |

### Blog Image Example

```html
<!-- Blog listing card thumbnail -->
<img src="assets/images/blogs/modern-luxury-400.webp"
     alt="Modern luxury living room in Nairobi"
     width="400" height="250"
     loading="lazy"
     decoding="async">

<!-- Blog article hero -->
<picture>
  <source srcset="assets/images/blogs/modern-luxury-1200.webp 1200w"
          type="image/webp">
  <img src="assets/images/blogs/modern-luxury-1200.jpg"
       alt="Modern luxury living room designed by Furnostyles in Nairobi"
       width="1200" height="630"
       fetchpriority="high"
       decoding="async">
</picture>
```

### Blog Performance Rules

| Rule | Requirement |
|------|-------------|
| Blog listing page loads under 500KB total. | Many small thumbnails, not large images. |
| Blog article page loads under 1MB total. | Hero image + content images + CSS/JS. |
| Article text is in static HTML, not rendered by JS. | SEO and fast initial paint. |
| Reading progress bar (future) uses `requestAnimationFrame`. | Smooth, non-blocking animation. |
| Social sharing buttons (future) load after page is interactive. | Do not block critical path. |

---

## 14. Future Marketplace Performance Considerations

**Not to be built yet.** Document only.

Marketplace pages have unique performance challenges: many product images, filters, sorting, and pagination.

### Marketplace Performance Strategy

| Challenge | Solution |
|-----------|----------|
| **100+ product images on category page** | Virtual scrolling or pagination; lazy load all thumbnails |
| **Filter updates trigger re-renders** | Debounce filter changes; batch DOM updates |
| **Large product catalog** | Client-side pagination with server-side search (Algolia/Firestore) |
| **Product detail pages with many images** | Lazy load gallery images; preload first 2 images only |
| **Cart state across pages** | LocalStorage + event-driven updates; no full-page reloads |

### Marketplace Rules (Future)

| Rule | Requirement |
|------|-------------|
| Category pages load first 12 products, paginate the rest. | Prevents overwhelming the browser with 100+ DOM nodes. |
| Product thumbnails are 200x200px max. | Small enough for dense grids. |
| Filter sidebar updates use `requestAnimationFrame`. | Smooth UI without blocking the main thread. |
| Cart updates are optimistic (UI updates before server confirms). | Faster perceived performance. |
| Search uses debounced input (300ms). | Prevents excessive queries while typing. |
| Product detail pages preload next/prev product data. | Faster browsing between products. |

---

## 15. Future Dashboard Performance Considerations

**Not to be built yet.** Document only.

Dashboards are internal tools where user experience and speed directly affect productivity.

### Dashboard Performance Strategy

| Challenge | Solution |
|-----------|----------|
| **Real-time data updates** | Firebase listeners with throttled UI updates |
| **Large data tables** | Virtual scrolling for tables with 100+ rows |
| **Charts and analytics** | Load chart library on demand, not on every page |
| **Multiple widget panels** | Lazy load widgets below the fold |
| **Frequent navigation between pages** | SPA-style routing (client-side) to avoid full reloads |

### Dashboard Rules (Future)

| Rule | Requirement |
|------|-------------|
| Dashboard initial load is under 2MB total. | Internal tools can be heavier than public pages, but not excessive. |
| Data tables use pagination or virtual scrolling. | Never render 1000+ rows at once. |
| Charts load only on analytics pages. | Code-split chart libraries. |
| Real-time listeners disconnect when the component unmounts. | Prevents memory leaks and unnecessary network usage. |
| Dashboard uses client-side routing for navigation. | Faster transitions between dashboard pages. |
| Session data is cached in memory, not re-fetched on every navigation. | Reduces Firebase reads. |

---

## 16. Core Web Vitals Strategy

Core Web Vitals are Google's key performance metrics. Meeting them improves search rankings and user experience.

### The Three Core Web Vitals

| Metric | Target | What It Measures |
|--------|--------|----------------|
| **Largest Contentful Paint (LCP)** | < 2.5 seconds | Time until the largest visible element (usually hero image) is rendered |
| **First Input Delay (FID)** | < 100 milliseconds | Time until the page responds to the first user interaction |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Visual stability — how much the page layout shifts unexpectedly |

### Optimizing Each Metric

| Metric | Optimization |
|--------|-------------|
| **LCP** | Preload hero image, inline critical CSS, reduce server response time, optimize images |
| **FID** | Defer JS, break long tasks, use web workers for heavy computation |
| **CLS** | Set explicit `width` and `height` on all images, reserve space for dynamically loaded content, avoid inserting content above existing content |

### Core Web Vitals Rules

| Rule | Requirement |
|------|-------------|
| Measure Core Web Vitals on every page before launch. | Use PageSpeed Insights, Lighthouse, or Chrome DevTools. |
| LCP target is under 2.5 seconds on 3G. | Kenyan users may have slower connections. |
| CLS target is under 0.1 on all pages. | No layout shift from images, ads, or dynamic content. |
| FID target is under 100ms. | JavaScript must not block interaction. |
| Test on real devices, not just emulators. | Actual mobile performance often differs from DevTools emulation. |

---

## 17. Mobile Performance Optimization

Mobile users make up the majority of web traffic in Kenya. Mobile performance is not optional.

### Mobile-Specific Optimizations

| Optimization | How |
|--------------|-----|
| **Reduce above-fold payload** | Hero image + CSS + minimal JS under 500KB |
| **Use `loading="lazy"` for all below-fold images** | Mobile screens are tall; most images are below the fold |
| **Avoid heavy animations** | Simple CSS transitions, not complex JS animations |
| **Reduce DOM size** | Max 1500 nodes; flatten nesting where possible |
| **Optimize for low-memory devices** | Unload offscreen content, minimize global state |
| **Test on real 3G/4G** | Use Chrome DevTools throttling or actual mobile data |
| **Touch response time** | JavaScript should not block touch events for > 50ms |

### Mobile Performance Rules

| Rule | Requirement |
|------|-------------|
| Mobile pages load in under 3 seconds on 3G. | Target for the primary audience. |
| Total page weight on mobile is under 1.5MB. | Larger than desktop limit because of images, but still constrained. |
| No render-blocking resources on mobile. | Defer all non-critical CSS and JS. |
| Font size is minimum 16px to prevent iOS zoom. | Also an accessibility requirement. |
| Touch targets are minimum 44x44px. | Accessibility and usability. |
| Test on low-end Android devices. | The majority of Kenyan mobile users. |

---

## 18. SEO-Performance Relationship

Performance and SEO are deeply connected. Google uses page speed as a ranking factor.

### How Performance Affects SEO

| Factor | Performance Impact | SEO Impact |
|--------|-------------------|------------|
| **Page speed** | Faster pages rank higher | Direct ranking signal since 2021 |
| **Core Web Vitals** | LCP, FID, CLS metrics | Direct ranking signal |
| **Mobile-friendliness** | Fast mobile experience | Mobile-first indexing |
| **Bounce rate** | Slow pages cause users to leave | Higher bounce rate lowers rankings |
| **Crawl budget** | Fast pages are crawled more frequently | More pages indexed |
| **Structured data** | Fast pages render structured data correctly | Rich snippets in search results |

### SEO-Performance Rules

| Rule | Requirement |
|------|-------------|
| Every page must pass Core Web Vitals. | Minimum for competitive SEO. |
| XML sitemap is generated and submitted. | Helps crawlers find all pages quickly. |
| Robots.txt allows crawling of all public content. | No accidental blocking of important pages. |
| Canonical URLs are absolute and correct. | Prevents duplicate content penalties. |
| OG images are optimized and under 200KB. | Social sharing loads fast, indirectly affects engagement signals. |
| Internal links are fast to follow. | No broken links that waste crawl budget. |

---

## 19. How to Avoid Layout Shifts

Layout Shift (CLS) occurs when visible elements move after the initial render. It frustrates users and hurts Core Web Vitals.

### Common Causes of Layout Shift

| Cause | Solution |
|-------|----------|
| **Images without width/height** | Always set explicit `width` and `height` |
| **Web fonts loading late** | Use `font-display: swap` and preload fonts |
| **Ads or embeds loading dynamically** | Reserve space with CSS `min-height` |
| **Content injected above existing content** | Never insert banners, notifications, or results above the fold after load |
| **Images loading and pushing text down** | Reserve space with aspect ratio boxes |

### Aspect Ratio Box Pattern

```css
.fns-aspect-box {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  background: var(--fns-surface);
}

.fns-aspect-box img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

```html
<div class="fns-aspect-box">
  <img src="portfolio/living-room.webp"
       alt="Living room"
       width="800" height="450"
       loading="lazy">
</div>
```

### Layout Shift Rules

| Rule | Requirement |
|------|-------------|
| Every `<img>` has explicit `width` and `height`. | Browser reserves space before the image loads. |
| Every `<iframe>` and `<video>` has explicit dimensions. | Same principle as images. |
| Dynamic content (related articles, ads) reserves space. | Use `min-height` or skeleton placeholders. |
| Fonts use `font-display: swap`. | Fallback font appears immediately; no invisible text gap. |
| Do not load content above the fold after initial render. | No banners that push content down. |
| Skeleton screens are preferred over spinners for async content. | Skeleton preserves layout while loading. |

---

## 20. How to Avoid Render-Blocking Assets

Render-blocking resources delay the browser from painting the page. Eliminating them is critical for fast LCP.

### Eliminating Render Blockers

| Asset | Current State | Optimized State |
|-------|--------------|---------------|
| **Global CSS** | `<link>` in `<head>` (render-blocking) | Keep as is — CSS is critical; ensure it is minified and under 50KB |
| **Feature CSS** | `<link>` in `<head>` (render-blocking) | Load with `media="print"` then swap, or inline critical rules |
| **JS** | `<script src>` without `defer` | Add `defer` to all scripts |
| **Fonts** | `@font-face` without `font-display` | Add `font-display: swap` |
| **Third-party CSS** | `<link>` for Google Fonts, widgets | Self-host fonts, defer widget CSS |

### Deferred CSS Loading

```html
<link rel="preload" href="css/blog.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/blog.css"></noscript>
```

### Render-Blocking Rules

| Rule | Requirement |
|------|-------------|
| Only critical CSS is loaded in `<head>`. | Global `style.css` is acceptable; everything else is deferred. |
| All JS is deferred or loaded after `DOMContentLoaded`. | Never put blocking scripts in `<head>`. |
| Third-party scripts (analytics, chat) load after own JS. | Do not let external code block your content. |
| Inline critical CSS only if it is truly critical and under 14KB. | External files are cacheable; inline CSS is not. |
| Preload critical resources with `<link rel="preload">`. | Hero images, fonts, and critical CSS. |

---

## 21. Future Animation/Performance Guidelines

**Not to be built yet.** Document only.

Animations enhance the premium brand experience but can hurt performance if implemented poorly.

### Animation Performance Rules

| Rule | Requirement |
|------|-------------|
| Animate only `transform` and `opacity`. | These properties do not trigger layout or paint. |
| Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`. | These trigger layout recalculation (expensive). |
| Use `will-change` sparingly and remove after animation. | `will-change` reserves GPU memory; do not leave it on. |
| Prefer CSS transitions over JS animation libraries. | CSS animations run on the compositor thread. |
| Limit simultaneous animations. | Too many animations cause frame drops. |
| Respect `prefers-reduced-motion`. | Users with motion sensitivity should see instant state changes. |
| Test animations on low-end mobile devices. | 60fps on desktop may be 15fps on a budget Android. |

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Examples

| Animation | Property | Use Case |
|-----------|----------|----------|
| Card hover lift | `transform: translateY(-4px)` | Portfolio and blog cards |
| Button press | `transform: scale(0.98)` | All buttons |
| Fade in | `opacity` | Lazy-loaded images, modal open |
| Slide in | `transform: translateX()` | Mobile menu, sidebar |

---

## 22. Asset Naming and Versioning Strategy

Consistent naming and versioning ensure cache busting works correctly and assets are easy to locate.

### Naming Conventions

| Asset Type | Pattern | Example |
|------------|---------|---------|
| **Global CSS** | `css/style.v{N}.css` | `css/style.v2.css` |
| **Feature CSS** | `css/{feature}.v{N}.css` | `css/blog.v1.css` |
| **Global JS** | `js/main.v{N}.js` | `js/main.v3.js` |
| **Feature JS** | `js/{feature}.v{N}.js` | `js/article-utils.v2.js` |
| **Hero images** | `assets/images/hero/{slug}-{width}.{ext}` | `assets/images/hero/home-hero-1200.webp` |
| **Blog images** | `assets/images/blogs/{slug}-{width}.{ext}` | `assets/images/blogs/modern-luxury-800.webp` |
| **Portfolio images** | `assets/images/portfolio/{slug}-{width}.{ext}` | `assets/images/portfolio/karen-home-400.webp` |
| **OG images** | `assets/images/og/{slug}-og.{ext}` | `assets/images/og/home-og.jpg` |
| **Icons** | `assets/icons/{name}.svg` | `assets/icons/cart.svg` |
| **Fonts** | `assets/fonts/{name}.{format}` | `assets/fonts/furnostyles-display.woff2` |

### Versioning Rules

| Rule | Requirement |
|------|-------------|
| Increment version number when file content changes. | `style.v1.css` -> `style.v2.css`. |
| Update all references in HTML when version changes. | Search and replace across the project. |
| Use semantic versioning for major build releases. | `v1`, `v2` for breaking changes; build tools may use hashes. |
| Do not use query strings for cache busting. | `style.css?v=2` is unreliable; some CDNs ignore query strings. |
| Keep old versions for one release cycle. | Allows instant rollback if a new version breaks something. |
| Image versions change when the image content changes. | `home-hero-v2.webp` if the hero image is updated. |
| File names are descriptive and hyphenated. | `living-room-makeover-nairobi-800.webp` not `IMG_1234.jpg`. |

---

## 23. AI-Safe Optimization Workflow

When an AI assistant (or human developer) modifies the site, these rules prevent performance regressions.

### AI Optimization Editing Rules

| Step | Action | Rationale |
|------|--------|-----------|
| **1. Read this document first.** | Before any performance-related change, read `performance-and-optimization-system.md`. | Understand budgets, priorities, and constraints. |
| **2. Measure before changing.** | Run Lighthouse on the page before any optimization. | Baseline prevents subjective improvements that actually hurt. |
| **3. Check asset size budgets.** | CSS < 50KB, JS < 100KB, hero images < 300KB. | No change should push a page over budget. |
| **4. Add `width` and `height` to every new image.** | Prevents layout shift (CLS). | Non-negotiable for all images. |
| **5. Use `loading="lazy"` for below-fold images.** | Do not lazy load hero images. | Correct lazy loading preserves LCP. |
| **6. Add `defer` to every new script.** | Never add blocking scripts to `<head>`. | Preserves fast first paint. |
| **7. Minify CSS and JS before production.** | Use build tool or manual minification. | Reduces file size for users. |
| **8. Audit unused CSS with DevTools Coverage.** | Before declaring a page complete, check for dead rules. | Prevents accumulation of unused styles. |
| **9. Test on mobile throttling (3G).** | Chrome DevTools > Performance > 3G preset. | Kenyan users may have slower connections. |
| **10. Test for layout shift after any content change.** | Run Lighthouse CLS audit after adding images, embeds, or dynamic content. | CLS must remain under 0.1. |
| **11. Verify cache headers are correct.** | Check `_headers` file or Cloudflare dashboard. | Wrong headers cause unnecessary re-downloads. |
| **12. Do not add third-party scripts without measuring impact.** | Load the script, run Lighthouse, compare before/after. | Third-party scripts are the #1 cause of performance regression. |
| **13. Run the performance checklist before deployment.** | Section 25 catches errors before they reach users. | Final safety net. |

### AI Optimization Danger Zone

| Dangerous Action | Why It Breaks Performance |
|------------------|-------------------------|
| Adding inline styles or scripts | Not cacheable, increases HTML size, hard to maintain. |
| Adding large JS frameworks (React, Vue, Angular) for simple features | Massive bundle size, long parse time, unnecessary for static sites. |
| Loading Google Fonts with `@import` | Blocks rendering; use `<link>` or self-host instead. |
| Serving unoptimized images | 5MB JPEGs instead of 200KB WebPs destroy LCP. |
| Forgetting `width` and `height` on images | Layout shift (CLS) increases, hurts Core Web Vitals. |
| Adding `async` to dependent scripts | Breaks execution order, causes runtime errors. |
| Adding blocking CSS for below-fold content | Delays first paint for no benefit. |
| Using `!important` everywhere | Increases specificity wars, makes CSS harder to optimize. |
| Adding autoplay video backgrounds | Massive bandwidth usage, slows page load, annoys users. |
| Loading social media widgets in `<head>` | Facebook, Twitter, Instagram widgets are heavy and block rendering. |
| Adding infinite scroll without virtual scrolling | DOM grows indefinitely, crashes low-memory devices. |
| Forgetting to test on 3G throttling | "Works on my machine" does not mean fast for users. |

---

## 24. Recommended Testing Tools and Workflow

### Testing Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| **Chrome DevTools Lighthouse** | Core Web Vitals, performance score, accessibility, SEO | Before every deployment |
| **Chrome DevTools Performance panel** | Flame charts, long tasks, render-blocking resources | When debugging slow pages |
| **Chrome DevTools Network panel** | Asset sizes, load order, cache headers | When auditing asset loading |
| **Chrome DevTools Coverage panel** | Unused CSS and JS percentages | Quarterly cleanup |
| **PageSpeed Insights (web)** | Field data + lab data, mobile and desktop | Before every deployment |
| **WebPageTest** | Detailed waterfall, video comparison, connection throttling | Deep-dive performance analysis |
| **GTmetrix** | Page speed grade, YSlow recommendations | Quick comparative testing |
| **axe DevTools** | Accessibility errors | Before every deployment |
| **WAVE** | Accessibility evaluation | Before every deployment |
| **Squoosh** | Image compression and format comparison | When optimizing images |
| **ImageOptim** | Batch image compression | Before uploading new images |

### Testing Workflow

```
Before any deployment:
    |
    v
1. Run Lighthouse on desktop and mobile.
    |
    v
2. Verify all 3 Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1).
    |
    v
3. Check Network panel for asset sizes and loading order.
    |
    v
4. Check Coverage panel for unused CSS/JS.
    |
    v
5. Run PageSpeed Insights for field data validation.
    |
    v
6. Test on 3G throttling in DevTools.
    |
    v
7. Test on a real low-end Android device.
    |
    v
8. Run axe and WAVE accessibility scans.
    |
    v
9. Compress any new images with Squoosh or ImageOptim.
    |
    v
10. Run the Section 25 performance checklist.
    |
    v
Deploy.
```

### Testing Rules

| Rule | Requirement |
|------|-------------|
| Lighthouse performance score must be >= 90 on mobile. | 90+ is "good" in Google's eyes. |
| Lighthouse accessibility score must be 100. | Accessibility is non-negotiable. |
| PageSpeed Insights "Pass" on all Core Web Vitals. | Both lab and field data if available. |
| Test on real devices, not just emulators. | DevTools emulation is close but not identical. |
| Test every page type (home, blog, portfolio, service, contact). | Different page types have different performance profiles. |
| Re-test after any third-party script is added. | Third-party scripts are the most common regression source. |
| Document test results in a shared location. | Spreadsheet or project wiki for tracking over time. |

---

## 25. Performance Checklist Before Deployment

### Asset Optimization Checklist

- [ ] All CSS files are minified.
- [ ] All JS files are minified.
- [ ] Total CSS per page is under 50KB.
- [ ] Total JS per page is under 100KB.
- [ ] All images are compressed (quality 80% or lower).
- [ ] Hero images are WebP with JPEG fallback.
- [ ] All images have explicit `width` and `height` attributes.
- [ ] Below-fold images use `loading="lazy"`.
- [ ] Hero images use `fetchpriority="high"`.
- [ ] OG images are 1200x630px and under 200KB.
- [ ] SVG icons are optimized (SVGO or similar).
- [ ] Fonts use `font-display: swap`.
- [ ] Fonts are WOFF2 format.

### Loading Strategy Checklist

- [ ] Critical CSS is loaded in `<head>`.
- [ ] Non-critical CSS is deferred or loaded with `media="print"` swap.
- [ ] All scripts use `defer`.
- [ ] No blocking scripts in `<head>`.
- [ ] Third-party scripts load after own JS.
- [ ] Hero image is preloaded with `<link rel="preload">`.
- [ ] Critical fonts are preloaded with `<link rel="preload">`.
- [ ] Shared components (header/footer) are fetched asynchronously.

### Layout Stability Checklist

- [ ] Every `<img>` has explicit `width` and `height`.
- [ ] Every `<iframe>` and `<video>` has explicit dimensions.
- [ ] Dynamic content reserves space with `min-height` or skeleton placeholders.
- [ ] Fonts use `font-display: swap`.
- [ ] No content is injected above the fold after initial render.
- [ ] Skeleton screens are used for async content where possible.

### Core Web Vitals Checklist

- [ ] LCP is under 2.5 seconds on mobile.
- [ ] LCP is under 2.5 seconds on desktop.
- [ ] FID is under 100ms.
- [ ] CLS is under 0.1 on all pages.
- [ ] Lighthouse performance score is >= 90 on mobile.
- [ ] Lighthouse performance score is >= 90 on desktop.
- [ ] PageSpeed Insights shows "Pass" for all Core Web Vitals.

### Mobile Performance Checklist

- [ ] Page loads in under 3 seconds on 3G throttling.
- [ ] Total page weight is under 1.5MB on mobile.
- [ ] No render-blocking resources on mobile.
- [ ] Font size is minimum 16px.
- [ ] Touch targets are minimum 44x44px.
- [ ] Tested on a real low-end Android device.
- [ ] No horizontal scrolling.

### SEO and Accessibility Checklist

- [ ] Lighthouse accessibility score is 100.
- [ ] axe scan shows zero errors.
- [ ] WAVE scan shows zero errors.
- [ ] XML sitemap is up to date.
- [ ] Robots.txt allows all public content.
- [ ] Canonical URLs are correct.
- [ ] OG images are present and optimized.

### Cache and Hosting Checklist

- [ ] `_headers` file defines correct cache durations.
- [ ] CSS and JS files are versioned if changed.
- [ ] Static assets use `immutable` cache directive.
- [ ] HTML pages use `must-revalidate`.
- [ ] Cloudflare Pages build succeeded with no errors.
- [ ] All assets are served over HTTPS.
- [ ] No 404 errors for any referenced asset.

---

## Document Summary

| # | Section | Purpose |
|---|---------|---------|
| 1 | CSS optimization strategy | File budgets, minification, loading order, rules. |
| 2 | JS optimization strategy | Defer, code splitting, minification, event delegation, rules. |
| 3 | Shared asset loading strategy | Parallel fetching, memory caching, preload, rules. |
| 4 | Image optimization workflow | Formats, compression, `<picture>`, sizing, alt text, rules. |
| 5 | Lazy loading strategy | Native lazy loading, Intersection Observer, what/when to lazy load. |
| 6 | Responsive image strategy | Srcset, sizes, art direction, format fallback, rules. |
| 7 | Font loading strategy | System font stack, WOFF2, font-display: swap, preload, rules. |
| 8 | Critical rendering path strategy | Preload, preconnect, priority order, inline CSS threshold. |
| 9 | Cloudflare Pages optimization | Built-in optimizations, `_headers`, `_redirects`, cache control. |
| 10 | Cache strategy recommendations | Duration by asset type, cache busting, immutable, rules. |
| 11 | Static hosting performance advantages | No cold starts, CDN, DDoS resistance, limitations and workarounds. |
| 12 | Future CDN/media optimization strategy | Cloudflare Image Resizing, build pipeline, signed URLs. |
| 13 | Blog performance strategy | Thumbnail sizing, hero images, pagination, related articles. |
| 14 | Future marketplace performance considerations | Pagination, virtual scrolling, debounced filters, optimistic cart. |
| 15 | Future dashboard performance considerations | Real-time listeners, virtual scrolling, code-split charts, SPA routing. |
| 16 | Core Web Vitals strategy | LCP, FID, CLS targets, optimization techniques, measurement. |
| 17 | Mobile performance optimization | Above-fold payload, lazy loading, DOM size, 3G testing, low-end devices. |
| 18 | SEO-performance relationship | Page speed ranking signals, Core Web Vitals, crawl budget, bounce rate. |
| 19 | How to avoid layout shifts | Aspect ratio boxes, explicit dimensions, font-display swap, skeleton screens. |
| 20 | How to avoid render-blocking assets | Deferred CSS, deferred JS, preloading, inline threshold, third-party rules. |
| 21 | Future animation/performance guidelines | Transform and opacity only, will-change, prefers-reduced-motion, low-end testing. |
| 22 | Asset naming/versioning strategy | Descriptive hyphenated names, version increments, no query strings, rollback safety. |
| 23 | AI-safe optimization workflow | 13 editing rules, 12 danger-zone actions that break performance. |
| 24 | Recommended testing tools and workflow | Lighthouse, PageSpeed Insights, WebPageTest, axe, Squoosh, 10-step testing workflow. |
| 25 | Performance checklist before deployment | 50+ items across 7 categories: assets, loading, layout stability, Core Web Vitals, mobile, SEO/accessibility, cache/hosting. |

**This document must be read before any performance-related change is made to the Furnostyles platform.**
