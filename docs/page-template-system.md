# Furnostyles Reusable Page-Template System

**Date:** 2026-05-22 | **Status:** Planning

---

## 1. Standard Public Page Structure

Every public page follows the same skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[150-160 chars]">
  <title>[Page Title] | Furnostyles</title>

  <meta property="og:title" content="[Page Title] | Furnostyles">
  <meta property="og:description" content="[Desc]">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://furnostyles.com/[slug].html">
  <meta property="og:image" content="https://furnostyles.com/assets/images/og/[slug]-og.jpg">

  <link rel="canonical" href="https://furnostyles.com/[slug].html">
  <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="assets/css/style.css">
</head>

<body data-page-type="public">
  <div id="fns-header-mount"></div>

  <div class="premium-layout">
    <main class="premium-main" id="main-content">
      <section class="fns-page-hero">
        <div class="fns-container">
          <h1>[Keyword-rich H1]</h1>
          <p class="fns-page-hero__subtitle">[Subtitle]</p>
        </div>
      </section>

      <section class="fns-section">
        <div class="fns-container">[Content]</div>
      </section>

      <section class="fns-section fns-section--dark">
        <div class="fns-container">
          <div class="fns-cta-box">
            <h2>[CTA heading]</h2>
            <p>[Supporting text]</p>
            <a href="contact.html" class="fns-btn fns-btn--primary">[Specific action]</a>
          </div>
        </div>
      </section>
    </main>
  </div>

  <div id="fld-footer-mount"></div>

  <a class="cart-float" href="cart.html">Cart <span data-cart-count="">0</span></a>
  <a class="chat-float" href="https://wa.me/254713639205" target="_blank">WhatsApp Chat</a>

  <script defer src="assets/js/main.js"></script>
</body>
</html>
```

**Rules:** `lang="en"`, `viewport`, `data-page-type`, mount points, and CTA are mandatory.

---

## 2. Standard Blog Page Structure

```html
<body data-page-type="blog" data-article-slug="[slug]">
  <div id="fns-header-mount"></div>
  <div class="premium-layout">
    <main class="premium-main" id="main-content">
      <section class="fns-blog-hero">
        <div class="fns-container">
          <span class="fns-blog-category">[Category]</span>
          <h1>[Article H1]</h1>
          <div class="fns-blog-meta">
            <span>[Date]</span>
            <span data-reading-time>[X] min read</span>
          </div>
        </div>
      </section>

      <div class="fns-blog-layout fns-blog-layout--no-sidebar">
        <article class="fns-blog-article">
          <p class="fns-blog-intro">[Opening]</p>
          <nav class="fns-blog-toc" aria-label="Article contents"><h2>Table of Contents</h2></nav>

          <section><h2 id="section-1">[Heading]</h2><p>[Text]</p></section>

          <section class="fns-faq-section">
            <h2>FAQ</h2>
            <details class="fns-faq-item">
              <summary>[Question]</summary>
              <p>[Answer]</p>
            </details>
          </section>

          <div class="fns-blog-cta">
            <p>[Contextual CTA]</p>
            <a href="../services.html" class="fns-btn fns-btn--primary">[Action]</a>
          </div>

          <div id="fns-related-articles-mount"></div>
        </article>
      </div>
    </main>
  </div>
  <div id="fld-footer-mount"></div>

  <script defer src="../assets/js/main.js"></script>
  <script src="../blogs/article-data.js"></script>
  <script src="../blogs/article-utils.js"></script>
  <script defer src="../assets/js/blog.js"></script>
</body>
```

**Rules:** `data-article-slug`, `article:published_time`, `BlogPosting` schema, native `<details>` FAQ, and related-articles mount point are mandatory.

---

## 3. Standard Service Page Structure

```html
<body data-page-type="service" data-service="[slug]">
  <div id="fns-header-mount"></div>
  <div class="premium-layout">
    <main class="premium-main" id="main-content">
      <section class="fns-page-hero">
        <div class="fns-container">
          <h1>[Service] in Nairobi, Kenya</h1>
          <p class="fns-page-hero__subtitle">[Value proposition]</p>
        </div>
      </section>

      <section class="fns-section"><div class="fns-container">
        <h2>What We Offer</h2>
        <ul class="fns-list"><li>[Benefit]</li></ul>
      </div></section>

      <section class="fns-section fns-section--alt"><div class="fns-container">
        <h2>Our Process</h2>
        <div class="fns-steps">
          <div class="fns-step"><span class="fns-step__number">01</span><h3>[Step]</h3><p>[Desc]</p></div>
        </div>
      </div></section>

      <section class="fns-section"><div class="fns-container">
        <h2>Recent Projects</h2>
        <div class="fns-card-grid fns-card-grid--3" id="fns-service-portfolio-mount"></div>
      </div></section>

      <section class="fns-section fns-section--alt"><div class="fns-container">
        <h2>FAQ</h2>
        <details class="fns-faq-item"><summary>[Q]</summary><p>[A]</p></details>
      </div></section>

      <section class="fns-section fns-section--dark"><div class="fns-container">
        <div class="fns-cta-box">
          <h2>Ready to [action]?</h2>
          <a href="../contact.html" class="fns-btn fns-btn--primary">Request a Free Quote</a>
        </div>
      </div></section>
    </main>
  </div>
  <div id="fld-footer-mount"></div>
  <script defer src="../assets/js/main.js"></script>
</body>
```

**Rules:** H1 includes location, process steps are numbered, FAQ is mandatory, CTA is specific.

---

## 4. Standard Portfolio Page Structure

```html
<body data-page-type="portfolio" data-project="[slug]">
  <div id="fns-header-mount"></div>
  <div class="premium-layout">
    <main class="premium-main" id="main-content">
      <section class="fns-page-hero">
        <div class="fns-container">
          <span class="fns-portfolio-location">[Location]</span>
          <h1>[Project Name]</h1>
          <p class="fns-page-hero__subtitle">[Type] — [Date]</p>
        </div>
      </section>

      <section class="fns-section"><div class="fns-container">
        <div class="fns-portfolio-gallery">
          <img src="../assets/images/portfolio/[slug]-hero.jpg" alt="[Alt]" class="fns-portfolio-gallery__hero">
          <div class="fns-portfolio-gallery__grid">
            <img src="../assets/images/portfolio/[slug]-1.jpg" alt="[Alt]" loading="lazy">
          </div>
        </div>
      </div></section>

      <section class="fns-section fns-section--alt"><div class="fns-container">
        <div class="fns-portfolio-details">
          <div class="fns-portfolio-details__col"><h2>The Brief</h2><p>[Brief]</p></div>
          <div class="fns-portfolio-details__col"><h2>Our Solution</h2><p>[Solution]</p></div>
        </div>
      </div></section>

      <section class="fns-section"><div class="fns-container">
        <h2>Services Used</h2>
        <div class="fns-tag-list">
          <a href="services/interior-design.html" class="fns-tag">Interior Design</a>
        </div>
      </div></section>

      <section class="fns-section fns-section--alt"><div class="fns-container">
        <h2>Related Projects</h2>
        <div class="fns-card-grid fns-card-grid--3" id="fns-related-projects-mount"></div>
      </div></section>

      <section class="fns-section fns-section--dark"><div class="fns-container">
        <div class="fns-cta-box">
          <h2>Inspired by this project?</h2>
          <a href="../contact.html" class="fns-btn fns-btn--primary">Start Your Project</a>
        </div>
      </div></section>
    </main>
  </div>
  <div id="fld-footer-mount"></div>
  <script defer src="../assets/js/main.js"></script>
</body>
```

**Rules:** Gallery images use `loading="lazy"`, location is prominent, service tags link internally, related projects load dynamically.

---

## 5. Future Marketplace Page Structure

**Not to be built yet.** Document only.

```html
<body data-page-type="marketplace" data-sidebar-category="[slug]">
  <div id="fns-header-mount"></div>
  <div class="premium-layout premium-layout--with-sidebar">
    <aside class="fns-sidebar" id="fns-sidebar-mount"></aside>
    <main class="premium-main" id="main-content">
      <section class="fns-marketplace-header">
        <div class="fns-container">
          <h1>[Category]</h1>
          <p class="fns-marketplace-header__count">[X] products</p>
        </div>
      </section>
      <section class="fns-section">
        <div class="fns-container">
          <div class="fns-card-grid fns-card-grid--4" id="fns-product-grid"></div>
          <nav class="fns-pagination" aria-label="Product pagination"></nav>
        </div>
      </section>
    </main>
  </div>
  <div id="fld-footer-mount"></div>
  <script defer src="../assets/js/main.js"></script>
  <script defer src="../assets/js/sidebar.js"></script>
  <script defer src="../assets/js/marketplace.js"></script>
</body>
```

**Rules:** Product grid rendered by JS, pagination accessible, sort/filter updates URL params.

---

## 6. Future Product Page Structure

**Not to be built yet.** Document only.

```html
<body data-page-type="product" data-product-id="[id]">
  <div id="fns-header-mount"></div>
  <div class="premium-layout">
    <main class="premium-main" id="main-content">
      <nav class="fns-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><a href="../../index.html">Home</a></li>
          <li><a href="../[category].html">[Category]</a></li>
          <li aria-current="page">[Product]</li>
        </ol>
      </nav>

      <section class="fns-section"><div class="fns-container">
        <div class="fns-product-detail">
          <div class="fns-product-detail__gallery">
            <img src="../../assets/images/products/[slug]-hero.jpg" alt="[Alt]">
          </div>
          <div class="fns-product-detail__info">
            <h1>[Product Name]</h1>
            <p class="fns-product-detail__price">KES [price]</p>
            <p class="fns-product-detail__desc">[Description]</p>
            <div class="fns-product-detail__actions">
              <button class="fns-btn fns-btn--primary" data-add-to-cart data-product-id="[id]">Add to Cart</button>
            </div>
          </div>
        </div>
      </div></section>

      <section class="fns-section fns-section--alt"><div class="fns-container">
        <h2>You May Also Like</h2>
        <div class="fns-card-grid fns-card-grid--4" id="fns-related-products-mount"></div>
      </div></section>
    </main>
  </div>
  <div id="fld-footer-mount"></div>
  <script defer src="../../assets/js/main.js"></script>
  <script defer src="../../assets/js/marketplace.js"></script>
</body>
```

**Rules:** Breadcrumb mandatory, price in KES, `data-product-id` on buttons, related products dynamic, product schema included.

---

## 7. Future Dashboard Page Structure

**Not to be built yet.** Document only.

```html
<head>
  <meta name="robots" content="noindex, nofollow">
  <link rel="stylesheet" href="../assets/css/dashboard.css">
</head>
<body data-page-type="dashboard" data-user-role="[vendor|client|admin]">
  <div id="fns-header-mount"></div>
  <div class="fns-dashboard-layout">
    <aside class="fns-dashboard-sidebar" id="fns-sidebar-mount"></aside>
    <main class="fns-dashboard-main" id="main-content">
      <header class="fns-dashboard-header"><h1>[Title]</h1></header>
      <section class="fns-dashboard-section">[Content]</section>
    </main>
  </div>
  <script defer src="../assets/js/main.js"></script>
  <script defer src="../assets/js/sidebar.js"></script>
  <script defer src="../assets/js/dashboard.js"></script>
</body>
```

**Rules:** `noindex` mandatory, `data-user-role` determines visible content, separate `fns-dashboard-*` namespace, auth check before content load.

---

## 8. Recommended HTML Layout Skeleton

All pages share this base skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Title] | Furnostyles</title>
  <meta name="description" content="[Desc]">
  <meta property="og:title" content="[Title]">
  <meta property="og:description" content="[Desc]">
  <meta property="og:type" content="[type]">
  <meta property="og:url" content="[URL]">
  <meta property="og:image" content="[Image]">
  <link rel="canonical" href="[URL]">
  <link rel="icon" href="[path]/assets/images/favicon.ico">
  <link rel="stylesheet" href="[path]/assets/css/style.css">
</head>
<body data-page-type="[type]">
  <div id="fns-header-mount"></div>
  <div class="premium-layout [premium-layout--with-sidebar]">
    <aside class="fns-sidebar" id="fns-sidebar-mount"></aside>
    <main class="premium-main" id="main-content">
      <section class="fns-page-hero"><div class="fns-container"><h1>[H1]</h1></div></section>
      <section class="fns-section"><div class="fns-container">[Content]</div></section>
      <section class="fns-section fns-section--dark"><div class="fns-container"><div class="fns-cta-box">[CTA]</div></div></section>
    </main>
  </div>
  <div id="fld-footer-mount"></div>
  <a class="cart-float" href="[path]/cart.html">Cart <span data-cart-count="">0</span></a>
  <a class="chat-float" href="https://wa.me/254713639205" target="_blank">WhatsApp Chat</a>
  <script defer src="[path]/assets/js/main.js"></script>
</body>
</html>
```

**Order:** Header mount → Layout wrapper → Sidebar (optional) → Main content → Hero → Content → CTA → Footer mount → Floats → Scripts.

---

## 9. Shared Header/Footer Loading Workflow

Header and footer are loaded by JS into mount points from single source files.

```javascript
// main.js
function loadSharedComponents() {
  const headerMount = document.getElementById('fns-header-mount');
  if (headerMount) {
    fetch('shared/header.html')
      .then(r => r.text())
      .then(html => headerMount.innerHTML = html)
      .catch(() => headerMount.innerHTML = '<!-- Header failed -->');
  }
  const footerMount = document.getElementById('fld-footer-mount');
  if (footerMount) {
    fetch('shared/footer.html')
      .then(r => r.text())
      .then(html => footerMount.innerHTML = html)
      .catch(() => footerMount.innerHTML = '<!-- Footer failed -->');
  }
}
loadSharedComponents();
```

**Rules:** Mount points must exist. Fetch failures insert fallback comment. Paths are relative to page location. Never inline header/footer markup.

---

## 10. Future Sidebar-Safe Layout Workflow

When sidebar is implemented, pages opt in explicitly:

```html
<body data-page-type="blog">
  <div class="premium-layout premium-layout--with-sidebar">
    <aside class="fns-sidebar" id="fns-sidebar-mount"></aside>
    <main class="premium-main" id="main-content">[Content]</main>
  </div>
</body>
```

**Rules:** Opt-in only (`--with-sidebar` added manually). No sidebar on homepage/contact/about. Sidebar CSS loaded per page. Sidebar JS checks mount point before init. Main content has `min-width: 320px`. Footer outside layout wrapper.

---

## 11. Shared CSS Loading Order

```html
<!-- 1. Global styles (every page) -->
<link rel="stylesheet" href="assets/css/style.css">

<!-- 2. Feature-specific styles (only when needed) -->
<link rel="stylesheet" href="assets/css/blog.css">      <!-- Blog only -->
<link rel="stylesheet" href="assets/css/marketplace.css"> <!-- Future marketplace -->
<link rel="stylesheet" href="assets/css/sidebar.css">    <!-- Future sidebar pages -->
<link rel="stylesheet" href="assets/css/dashboard.css"> <!-- Future dashboard -->

<!-- 3. Page-specific overrides (rare, last resort) -->
<link rel="stylesheet" href="assets/css/page-[type].css">
```

| File | Contains | Loaded On |
|------|----------|-----------|
| `style.css` | Variables, reset, typography, buttons, cards, forms, header, footer, layout | Every page |
| `blog.css` | Blog hero, article layout, TOC, FAQ, images, quotes, CTAs | Blog only |
| `marketplace.css` (future) | Product cards, grids, filters, pagination, product detail | Marketplace only |
| `sidebar.css` (future) | Sidebar base, states, overlay, off-canvas, backdrop | Sidebar pages only |
| `dashboard.css` (future) | Dashboard layout, stat cards, data tables, charts | Dashboard only |
| `page-[type].css` | Rare single-page overrides | One page only |

**Rules:** `style.css` always first. Feature CSS after global. Page-specific CSS last. Max 3 CSS files per page. All files use same design tokens.

---

## 12. Shared JS Loading Order

```html
<!-- 1. Data stores (before logic that uses them) -->
<script src="blogs/article-data.js"></script>
<script src="blogs/article-utils.js"></script>

<!-- 2. Global logic (every page) -->
<script defer src="assets/js/main.js"></script>

<!-- 3. Feature-specific logic (only when needed) -->
<script defer src="assets/js/blog.js"></script>
<script defer src="assets/js/sidebar.js"></script>      <!-- Future -->
<script defer src="assets/js/marketplace.js"></script> <!-- Future -->
<script defer src="assets/js/dashboard.js"></script>   <!-- Future -->

<!-- 4. Page-specific logic (rare) -->
<script defer src="assets/js/page-[type].js"></script>
```

| File | Contains | Loaded On |
|------|----------|-----------|
| `main.js` | Header/footer loader, nav, cart counter, chat float, utilities | Every page |
| `article-data.js` | Article metadata store | Blog only |
| `article-utils.js` | Article helpers (rendering, sorting, filtering) | Blog only |
| `blog.js` | Reading time, TOC, smooth scroll, FAQ, lazy images, related articles, search | Blog only |
| `sidebar.js` (future) | Sidebar controller, templates, state, focus trap | Sidebar pages only |
| `marketplace.js` (future) | Product grid, filters, cart interactions, pagination | Marketplace only |
| `dashboard.js` (future) | Auth checks, role-based rendering, charts, real-time updates | Dashboard only |
| `page-[type].js` | Rare page-specific interactions | One page only |

**Rules:** Data stores before dependent logic. All scripts use `defer` unless blocking required. No inline JS. No `async` on interdependent scripts. Feature scripts check for mount points.

---

## 13. SEO Metadata Placement Standards

### Required on Every Page

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interior Design Services in Nairobi | Furnostyles</title>
  <meta name="description" content="Transform your home with Furnostyles premium interior design services in Nairobi. Expert designers, quality finishes, free consultations.">
  <link rel="canonical" href="https://furnostyles.com/services/interior-design.html">
</head>
```

### Open Graph

```html
<meta property="og:title" content="[Title] | Furnostyles">
<meta property="og:description" content="[Description]">
<meta property="og:type" content="website"> <!-- article for blog, product for product -->
<meta property="og:url" content="[Canonical URL]">
<meta property="og:image" content="[OG image URL]">
<meta property="og:site_name" content="Furnostyles">
```

### Structured Data by Page Type

| Page Type | Schema | Required Fields |
|-----------|--------|-----------------|
| Homepage | `Organization` | Name, URL, logo, contact point |
| Service | `Service` | Name, description, provider, area served |
| Blog | `BlogPosting` | Headline, author, datePublished, publisher |
| Product (future) | `Product` | Name, description, image, offers |
| Portfolio | `CreativeWork` | Name, description, image, author |

### Metadata Rules

| Rule | Requirement |
|------|-------------|
| `<title>` is first after charset/viewport. | Search engines weigh early tags more. |
| `<meta name="description">` follows `<title>`. | Consistent ordering. |
| Canonical uses absolute `https://` paths. | Prevents duplicate content issues. |
| JSON-LD is last in `<head>` or end of `<body>`. | Does not block rendering. |
| No meta keywords tag. | Google ignores it; signals outdated SEO. |
| No duplicate `<title>` or `<meta name="description">`. | One of each per page. |

---

## 14. Image Placement Standards

### Requirements by Page Type

| Page Type | Hero | Content | Gallery | OG Image |
|-----------|------|---------|---------|----------|
| Public page | Recommended | As needed | N/A | Required |
| Blog article | Required | Recommended | N/A | Required |
| Service page | Required | Recommended | Optional | Required |
| Portfolio page | Required | N/A | Required | Required |
| Product page (future) | Required | Required | Required | Required |

### Image HTML Pattern

```html
<!-- Hero -->
<img src="assets/images/hero/[slug]-hero.jpg" alt="[Descriptive alt]"
     width="1200" height="600" fetchpriority="high" class="fns-hero__image">

<!-- Content -->
<figure class="fns-blog-image">
  <img src="assets/images/blog/[slug]-[n].jpg" alt="[Alt]"
       width="800" height="500" loading="lazy" class="fns-blog-image__img">
  <figcaption class="fns-blog-image__caption">[Caption]</figcaption>
</figure>

<!-- Gallery -->
<img src="assets/images/portfolio/[slug]-[n].jpg" alt="[Alt]"
     width="600" height="400" loading="lazy" class="fns-portfolio-gallery__img">
```

### Image Rules

| Rule | Requirement |
|------|-------------|
| Every image has an `alt` attribute. | Accessibility and SEO. |
| `width` and `height` attributes present. | Prevents layout shift (CLS). |
| Hero images use `fetchpriority="high"`. | First meaningful image loads faster. |
| Below-fold images use `loading="lazy"`. | Defer loading until scroll. |
| Image filenames are descriptive and hyphenated. | `modern-living-room-makeover-hero.jpg` |
| No spaces or special characters in filenames. | Prevents URL encoding issues. |
| OG images are 1200x630px. | Optimal for social sharing. |
| Hero images are max 200KB. | Performance budget. |
| Content images are max 100KB. | Performance budget. |

---

## 15. CTA Placement Standards

### Every Public Page Ends With a CTA

Users should always have a clear next step. No page should be a dead end.

### CTA Types by Page

| Page Type | CTA Text Example | Target |
|-----------|-----------------|--------|
| Homepage | "Get a Free Design Consultation" | Contact page |
| Blog article | "Request a Consultation for Your Project" | Contact page |
| Service page | "Request a Free Quote" | Contact page |
| Portfolio page | "Start Your Project" | Contact page |
| About page | "Meet Our Team" or "Contact Us" | Contact/team page |
| Contact page | "Send Message" | Form submit |

### CTA HTML Pattern

```html
<section class="fns-section fns-section--dark">
  <div class="fns-container">
    <div class="fns-cta-box">
      <h2>[Action-oriented heading]</h2>
      <p>[Supporting sentence with benefit]</p>
      <a href="contact.html" class="fns-btn fns-btn--primary">[Specific action text]</a>
    </div>
  </div>
</section>
```

### Inline Blog CTA

```html
<div class="fns-blog-cta">
  <p>[Contextual sentence linking article to service]</p>
  <a href="../services/interior-design.html" class="fns-btn fns-btn--primary">Explore Interior Design Services</a>
</div>
```

### CTA Rules

| Rule | Requirement |
|------|-------------|
| CTA heading is action-oriented. | "Ready to transform your home?" not "Contact Us". |
| CTA button text is specific. | "Request a Free Quote" not "Click Here". |
| Every blog article has an inline CTA. | Contextual link to relevant service. |
| Every blog article ends with a box CTA. | Final conversion opportunity. |
| CTA colour is `fns-btn--primary` (gold). | Stands out against dark section background. |
| CTA section uses `fns-section--dark`. | Visual separation from content. |

---

## 16. Responsive Layout Standards

### Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| `xs` | < 576px | Small phones |
| `sm` | 576-767px | Large phones |
| `md` | 768-991px | Tablets |
| `lg` | 992-1199px | Laptops |
| `xl` | >= 1200px | Desktop |

### Responsive Patterns

| Component | Mobile (< 768px) | Tablet (768-991px) | Desktop (>= 992px) |
|-----------|-----------------|-------------------|-------------------|
| **Layout** | Single column | Single column | Sidebar only if opted in |
| **Card grid** | 1 column | 2 columns | 3 or 4 columns |
| **Header** | Hamburger menu | Full nav visible | Full nav visible |
| **Hero** | Stacked, full-width | Stacked, full-width | Side-by-side if image+text |
| **Footer** | Stacked columns | 2-column grid | 4-column grid |
| **CTA** | Full-width button | Full-width button | Button auto-width |
| **Forms** | Full-width inputs | Full-width inputs | Max-width 600px centred |

### Responsive CSS Pattern

```css
/* Mobile first: base styles for all screens */
.fns-card-grid {
  display: grid;
  gap: var(--fns-spacing-lg);
  grid-template-columns: 1fr; /* Mobile: 1 column */
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .fns-card-grid--2 { grid-template-columns: repeat(2, 1fr); }
  .fns-card-grid--3 { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop: full columns */
@media (min-width: 992px) {
  .fns-card-grid--3 { grid-template-columns: repeat(3, 1fr); }
  .fns-card-grid--4 { grid-template-columns: repeat(4, 1fr); }
}
```

### Responsive Rules

| Rule | Requirement |
|------|-------------|
| CSS is mobile-first. | Base styles for mobile, media queries enhance for larger screens. |
| No fixed widths on containers. | Use `max-width` with percentage-based padding. |
| Touch targets are minimum 44x44px. | Buttons, links, form inputs. |
| Font sizes do not shrink below 16px on mobile. | Prevents iOS zoom on form focus. |
| Images are responsive. | `max-width: 100%; height: auto;` |
| Tables scroll horizontally on mobile. | `overflow-x: auto` wrapper. |

---

## 17. Accessibility Standards

### Per-Page Accessibility Checklist

Every page must pass this checklist before publication:

- [ ] `<html lang="en">` is present.
- [ ] `<title>` is descriptive and unique.
- [ ] `viewport` meta is present.
- [ ] All images have meaningful `alt` text.
- [ ] Heading hierarchy is logical (`h1` → `h2` → `h3`, no skips).
- [ ] All interactive elements are keyboard accessible.
- [ ] Focus indicators are visible (`outline` or `box-shadow`).
- [ ] Colour contrast is at least 4.5:1 for text.
- [ ] Links are underlined or clearly distinguishable from text.
- [ ] Form inputs have associated `<label>` elements.
- [ ] Error messages are associated with inputs using `aria-describedby`.
- [ ] Skip-to-content link is present (future enhancement).
- [ ] No autoplaying audio or video.
- [ ] No content flashes more than 3 times per second.

### ARIA Usage Guide

| When to Use | Attribute | Example |
|-------------|-----------|---------|
| Landmark regions | `role="main"`, `role="complementary"` | `<main role="main">` |
| Current page | `aria-current="page"` | Active nav link |
| Expanded state | `aria-expanded="true/false"` | Accordion, sidebar section |
| Live updates | `aria-live="polite"` | Cart counter, notification toast |
| Described by | `aria-describedby="id"` | Form input with help text |
| Hidden content | `aria-hidden="true"` | Decorative icons, hidden overlays |

### Accessibility Rules

| Rule | Requirement |
|------|-------------|
| Do not use ARIA if native HTML element exists. | `<button>` is better than `<div role="button">`. |
| `aria-label` supplements, never replaces, visible text. | Screen reader users and sighted users get same info. |
| Focus order follows visual order. | `Tab` moves top-to-bottom, left-to-right. |
| All modals trap focus and can be closed with Escape. | Standard pattern for overlays. |
| Dashboard pages are `noindex` but still accessible. | Private pages must meet WCAG for users who access them. |

---

## 18. Performance Standards

### Performance Budget per Page Type

| Resource | Budget | Rationale |
|----------|--------|-----------|
| **Total page weight** | < 1MB | Fast load on 3G connections in Kenya. |
| **CSS (all files)** | < 50KB | Parsed quickly, minimal render-blocking. |
| **JS (all files)** | < 100KB | Defer prevents blocking; keep bundle small. |
| **Images (above fold)** | < 300KB total | Hero + first content images. |
| **Images (below fold)** | Lazy-loaded | No budget limit, but compress individually. |
| **Fonts** | < 100KB | Use system fonts + one premium font max. |
| **Third-party scripts** | < 50KB | Firebase, analytics only. Defer all. |
| **Time to First Byte (TTFB)** | < 200ms | Static hosting on Cloudflare should be fast. |
| **Largest Contentful Paint (LCP)** | < 2.5s | Hero image or H1 should render quickly. |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Fixed by image dimensions and font loading. |

### Performance Techniques

| Technique | Implementation |
|-----------|----------------|
| Lazy loading | `loading="lazy"` on all below-fold images. |
| `fetchpriority="high"` | On hero image and above-fold content. |
| CSS deferred loading | `media="print"` trick or `rel="preload"` for non-critical CSS. |
| JS defer | All scripts use `defer` except data stores. |
| Image compression | WebP format, 80% quality, max dimensions as specified. |
| Minification | CSS and JS are minified for production. |
| Gzip/Brotli | Enabled on Cloudflare by default. |
| Cache headers | Static assets cached for 1 year with content hashing (future). |
| Preconnect | `<link rel="preconnect" href="https://fonts.googleapis.com">` |
| DNS prefetch | `<link rel="dns-prefetch" href="https://firebase.googleapis.com">` |

### Performance Rules

| Rule | Requirement |
|------|-------------|
| No render-blocking resources in `<head>` except critical CSS. | `style.css` is critical; other CSS can be deferred. |
| No JavaScript in `<head>` that is not deferred. | Blocks HTML parsing. |
| No images larger than their display size. | Resize before upload. |
| No unused CSS rules. | Periodically audit with coverage tools. |
| No unused JS functions. | Tree-shake if using a bundler (future). |

---

## 19. Naming Conventions

### File Naming

| Type | Pattern | Example |
|------|---------|---------|
| **HTML pages** | `kebab-case.html` | `interior-design-services.html` |
| **Blog articles** | `kebab-case.html` in `/blogs/` | `modern-luxury-interior-design-kenya.html` |
| **CSS files** | `kebab-case.css` | `style.css`, `blog.css`, `marketplace.css` |
| **JS files** | `kebab-case.js` | `main.js`, `blog.js`, `sidebar.js` |
| **Image files** | `kebab-case-descriptive.jpg` | `living-room-renovation-hero.jpg` |
| **Folder names** | `kebab-case` | `assets/`, `blogs/`, `marketplace/`, `dashboard/` |

### CSS Class Naming

| Pattern | Example |
|---------|---------|
| **Block** | `fns-section`, `fns-card`, `fns-btn` |
| **Element** | `fns-card__title`, `fns-btn__icon` |
| **Modifier** | `fns-btn--primary`, `fns-section--dark` |
| **Page-specific block** | `fns-blog-hero`, `fns-marketplace-header` |
| **Layout modifier** | `premium-layout--with-sidebar` |
| **State class** | `fns-sidebar--open`, `fns-card--featured` |

### ID Naming

| Purpose | Pattern | Example |
|---------|---------|---------|
| **Mount points** | `fns-[component]-mount` | `fns-header-mount`, `fns-sidebar-mount` |
| **Content anchor** | `main-content` | `id="main-content"` |
| **JS hooks** | `data-*` attributes preferred | `data-page-type="blog"` |

### Naming Rules

| Rule | Requirement |
|------|-------------|
| All CSS classes use `fns-` prefix. | Prevents collision with third-party libraries. |
| No generic class names (`container`, `wrapper`, `box`, `row`). | Use `fns-container`, `fns-section`, `fns-flex-row`. |
| File names match their purpose. | `blog.css` contains blog styles, not random styles. |
| Folder structure is flat and predictable. | No deeply nested folders (max 3 levels from root). |
| Version numbers are not in filenames. | Use Git for versioning, not `style-v2.css`. |

---

## 20. Internal Linking Conventions

### Link Structure

All internal links use relative paths from the current page:

| From Page | To Page | Link Pattern |
|-----------|---------|--------------|
| Root page (`index.html`) | Service page | `services/interior-design.html` |
| Blog article | Service page | `../services/interior-design.html` |
| Service page | Blog article | `../blogs/article-slug.html` |
| Marketplace category | Product page | `product/product-slug.html` |
| Any page | Contact page | `contact.html` or `../contact.html` |

### Anchor Link Standards

```html
<!-- Table of contents link -->
<a href="#section-1">Understanding Modern Interior Design</a>

<!-- Section heading with matching ID -->
<h2 id="section-1">Understanding Modern Interior Design</h2>
```

### Link Rules

| Rule | Requirement |
|------|-------------|
| All internal links are relative. | Easier to test locally and on preview domains. |
| External links use `target="_blank"` and `rel="noopener noreferrer"`. | Security and performance best practice. |
| Links to PDFs or downloads indicate the file type. | `Download Brochure (PDF)` |
| Broken links are checked before every deployment. | Use a link checker or manual audit. |
| Anchor IDs are descriptive, not numbered alone. | `id="choosing-materials"` not `id="section-3"`. |
| No `javascript:void(0)` links. | Use `<button>` for actions, `<a>` for navigation. |
| No empty `href=""` or `href="#"`. | Always point to a real destination or use `<button>`. |

### Service-to-Blog Linking Strategy

| Service Page | Links To Blog Article | Anchor Text |
|--------------|----------------------|-------------|
| `interior-design.html` | `modern-luxury-interior-design-kenya.html` | "Read our guide to modern luxury interior design in Kenya" |
| `house-finishing.html` | `house-finishing-cost-guide-nairobi.html` | "See our house finishing cost guide for Nairobi" |
| `furniture-repairs.html` | `furniture-restoration-vs-replacement.html` | "Learn when to restore versus replace furniture" |

### Blog-to-Service Linking Strategy

| Blog Article | Links To Service Page | Anchor Text |
|--------------|----------------------|-------------|
| `modern-luxury-interior-design-kenya.html` | `interior-design.html` | "Explore our interior design services" |
| `house-finishing-cost-guide-nairobi.html` | `house-finishing.html` | "Request a house finishing quote" |
| `furniture-restoration-vs-replacement.html` | `furniture-repairs.html` | "Get a free furniture repair assessment" |

---

## 21. Recommended Reusable Section Blocks

### Section Block Library

These blocks can be copied and reused across pages with minimal modification.

#### Hero Section

```html
<section class="fns-page-hero">
  <div class="fns-container">
    <h1>[Page H1]</h1>
    <p class="fns-page-hero__subtitle">[Subtitle]</p>
  </div>
</section>
```

#### Text + Image Section

```html
<section class="fns-section">
  <div class="fns-container">
    <div class="fns-grid fns-grid--2">
      <div class="fns-grid__col">
        <h2>[Heading]</h2>
        <p>[Paragraph]</p>
        <a href="[link]" class="fns-btn fns-btn--primary">[Action]</a>
      </div>
      <div class="fns-grid__col">
        <img src="[path]" alt="[Alt]" width="600" height="400" loading="lazy">
      </div>
    </div>
  </div>
</section>
```

#### Feature List Section

```html
<section class="fns-section fns-section--alt">
  <div class="fns-container">
    <h2>[Heading]</h2>
    <div class="fns-card-grid fns-card-grid--3">
      <div class="fns-card fns-card--feature">
        <span class="fns-card__icon">[Icon]</span>
        <h3>[Feature title]</h3>
        <p>[Feature description]</p>
      </div>
      <!-- Repeat -->
    </div>
  </div>
</section>
```

#### Testimonial Section

```html
<section class="fns-section">
  <div class="fns-container">
    <blockquote class="fns-quote">
      <p>"[Testimonial text]"</p>
      <footer>— [Name], [Location/Role]</footer>
    </blockquote>
  </div>
</section>
```

#### CTA Section

```html
<section class="fns-section fns-section--dark">
  <div class="fns-container">
    <div class="fns-cta-box">
      <h2>[Heading]</h2>
      <p>[Supporting text]</p>
      <a href="contact.html" class="fns-btn fns-btn--primary">[Action]</a>
    </div>
  </div>
</section>
```

#### FAQ Section

```html
<section class="fns-section fns-section--alt">
  <div class="fns-container">
    <h2>Frequently Asked Questions</h2>
    <details class="fns-faq-item">
      <summary>[Question]</summary>
      <p>[Answer]</p>
    </details>
  </div>
</section>
```

### Section Block Rules

| Rule | Requirement |
|------|-------------|
| Every section uses `fns-section` or `fns-section--alt`/`--dark`. | Consistent vertical spacing and background alternation. |
| Every section wraps content in `fns-container`. | Controls max-width and horizontal padding. |
| Alternating backgrounds improve readability. | White → light grey → white → dark (CTA). |
| No section is longer than 3 viewport heights. | Break long content into multiple sections. |
| Section headings are `h2` unless nested. | Only one `h1` per page (in hero). |

---

## 22. Which Page Parts Should Always Remain Centralized

### Non-Negotiable Centralized Components

| Component | Central Location | Why Centralized |
|-----------|------------------|-----------------|
| **Header HTML** | `shared/header.html` | One update changes all pages. |
| **Footer HTML** | `shared/footer.html` | One update changes all pages. |
| **Header CSS** | `style.css` (`.premium-header`) | Consistent header appearance everywhere. |
| **Footer CSS** | `style.css` (`.fld-commerce-footer`) | Consistent footer appearance everywhere. |
| **CSS variables (design tokens)** | `style.css` `:root` | Colours, spacing, fonts, shadows in one place. |
| **Button styles** | `style.css` (`.fns-btn`) | All buttons look identical. |
| **Card base styles** | `style.css` (`.fns-card`) | All cards share the same foundation. |
| **Form styles** | `style.css` (`.fns-form-*`) | All forms behave identically. |
| **Typography scale** | `style.css` (headings, body text) | Font sizes are consistent across all pages. |
| **Layout grid** | `style.css` (`.fns-container`, `.fns-grid`) | Page widths and gutters are uniform. |
| **Floating actions** | `main.js` + `style.css` | Cart float and WhatsApp chat are always present. |
| **Page loader / spinner** | `main.js` + `style.css` | One loading indicator for the entire site. |

### What This Means in Practice

If a designer wants to change the header background colour from petrol to navy, only one CSS rule in `style.css` needs to change. Every page updates automatically because no page defines its own header styles.

If a developer wants to add a new button variant (e.g., danger red), they add one modifier class in `style.css` (`.fns-btn--danger`). Every page can use it immediately without individual updates.

---

## 23. Which Page Parts Should Never Be Duplicated Manually

### The Forbidden Duplication List

| Item | Why It Must Not Be Duplicated | Safe Alternative |
|------|------------------------------|------------------|
| **Header HTML** | Updating 500+ pages one by one is impossible. | Load from `shared/header.html` into `#fns-header-mount`. |
| **Footer HTML** | Same as header. | Load from `shared/footer.html` into `#fld-footer-mount`. |
| **Navigation links** | Link rot and inconsistency. | Define once in `shared/header.html`. |
| **Copyright notice** | Year and text must be uniform. | Define once in `shared/footer.html`. |
| **CSS variable definitions** | Scattered tokens create visual chaos. | Define once in `style.css` `:root`. |
| **Typography rules** | Inconsistent fonts and sizes look unprofessional. | Define once in `style.css`. |
| **Button styles** | Buttons that look different on different pages confuse users. | Define once in `style.css`; use modifiers per context. |
| **Form validation logic** | Copy-pasted validation is buggy and inconsistent. | Define once in `main.js` or a dedicated forms module. |
| **Analytics tracking code** | Missing tracking on some pages breaks data integrity. | Include once in `main.js` that loads on every page. |
| **Cart counter logic** | Cart state must be synchronized everywhere. | Define once in `main.js`. |
| **Floating action buttons** | Cart float and WhatsApp chat must appear on every page identically. | Define once in `main.js` + `style.css`. |
| **Page loader / spinner** | Inconsistent loading UX feels broken. | Define once globally. |
| **Social media share links** | Share URLs must be accurate and consistent. | Generate dynamically from page metadata. |

### What This Prevents

By centralizing these parts, the site avoids:
- **Broken links** on outdated pages while new pages have correct links.
- **Visual inconsistency** where the same button looks different on different pages.
- **Maintenance nightmares** where a simple copyright year update requires editing hundreds of files.
- **Analytics gaps** where some pages are not tracked because the tracking code was forgotten.

---

## 24. Future AI-Safe Editing Workflow

### How AI Assistants Should Safely Edit Pages

When an AI assistant (or any developer) edits a Furnostyles page, they must follow this workflow to avoid breaking the architecture.

### Step-by-Step AI Editing Rules

| Step | Action | Rationale |
|------|--------|-----------|
| **1. Read this document first.** | Before editing any page, the AI must read `page-template-system.md`. | Ensures the editor understands the standards. |
| **2. Check existing page structure.** | Read the target page HTML to understand its current layout and `data-page-type`. | Prevents accidental structure changes. |
| **3. Identify mount points.** | Note where `#fns-header-mount`, `#fld-footer-mount`, and other mounts are located. | Mount points must never be moved or removed. |
| **4. Preserve `<head>` order.** | Meta tags, title, canonical, OG, and CSS links must stay in the documented order. | SEO and performance depend on this order. |
| **5. Use existing CSS classes only.** | Do not invent new classes unless absolutely necessary. | New classes must be added to `style.css` with BEM naming. |
| **6. If a new class is needed, add it to `style.css`.** | Never add `<style>` blocks or inline styles to individual pages. | Prevents scattered CSS. |
| **7. Use `data-*` attributes for JS hooks.** | Do not add inline `onclick` or `onload` handlers. | Clean separation of concerns. |
| **8. If new JS is needed, add it to a `.js` file.** | Do not add `<script>` blocks inside page HTML. | Keeps JS maintainable and cacheable. |
| **9. Verify relative paths are correct.** | Blog pages use `../assets/`; root pages use `assets/`. | Broken paths are the most common AI mistake. |
| **10. Ensure heading hierarchy is preserved.** | Do not add extra `h1` tags. Do not skip heading levels. | Accessibility and SEO. |
| **11. Add or update OG image reference.** | Every page must have a unique OG image path. | Social sharing appearance. |
| **12. Run the testing checklist mentally.** | Before declaring the edit complete, verify all 25 checklist items (Section 25). | Catches errors before deployment. |
| **13. If a sidebar is mentioned, check `future-sidebar-strategy.md`.** | Do not implement sidebar without reading the strategy document. | Prevents layout instability. |
| **14. If a new page type is created, document it here.** | Update `page-template-system.md` with the new structure. | Keeps documentation in sync with code. |

### AI Danger Zone

The following actions will **always** break the site and must never be performed by an AI without explicit human confirmation:

| Dangerous Action | Why It Breaks the Site |
|------------------|------------------------|
| Removing `#fns-header-mount` or `#fld-footer-mount` | Header and footer will not load. |
| Adding inline styles to structural elements | Overrides design tokens, creates inconsistency. |
| Duplicating header/footer HTML into a page | Creates maintenance debt and inconsistency. |
| Changing `data-page-type` without updating dependent JS | Analytics, sidebar, and feature detection break. |
| Adding `<script>` inside `<head>` without `defer` | Blocks HTML parsing, slows page load. |
| Changing relative paths to absolute paths | Breaks local testing and preview deployments. |
| Inventing new class names without adding to `style.css` | Styles will not apply, elements look broken. |
| Deleting existing `<meta>` tags | SEO and social sharing break. |
| Adding a second `<h1>` | Confuses search engines and screen readers. |
| Hard-coding related articles, products, or projects | Content becomes stale immediately. Use mount points. |

---

## 25. Recommended Page Testing Checklist Before Publishing

Every page must pass this checklist before it is deployed to production.

### Structure Checklist

- [ ] `<!DOCTYPE html>` is present.
- [ ] `<html lang="en">` is present.
- [ ] `<meta charset="UTF-8">` is present.
- [ ] `<meta name="viewport">` is present.
- [ ] `<title>` is 50-60 characters, unique, and keyword-rich.
- [ ] `<meta name="description">` is 150-160 characters.
- [ ] Canonical URL is absolute with `https://`.
- [ ] OG tags are present and complete.
- [ ] Favicon link is present.
- [ ] CSS loads in correct order: global → feature → page-specific.
- [ ] JS loads in correct order: data → global → feature → page-specific.
- [ ] `data-page-type` attribute is on `<body>`.

### Content Checklist

- [ ] Exactly one `<h1>` per page.
- [ ] Heading hierarchy is logical (no skipped levels).
- [ ] All images have `alt` text.
- [ ] All images have `width` and `height` attributes.
- [ ] Hero image uses `fetchpriority="high"`.
- [ ] Below-fold images use `loading="lazy"`.
- [ ] Every link has a valid `href` (no `#`, no `javascript:void(0)`).
- [ ] External links use `target="_blank" rel="noopener noreferrer"`.
- [ ] CTA is present at the end of the page.
- [ ] CTA button text is specific and action-oriented.
- [ ] Blog articles have inline CTA linking to a service page.
- [ ] FAQ section is present on service pages.
- [ ] No placeholder text ("Lorem ipsum", "Coming soon") remains.

### Accessibility Checklist

- [ ] Page passes WAVE or axe browser extension scan.
- [ ] Keyboard navigation works (Tab through all interactive elements).
- [ ] Focus indicator is visible on all focusable elements.
- [ ] Colour contrast meets WCAG AA (4.5:1 for text).
- [ ] Form inputs have `<label>` elements.
- [ ] Native HTML elements are preferred over ARIA roles.
- [ ] No autoplaying media.

### Performance Checklist

- [ ] Page weight is under 1MB.
- [ ] No render-blocking JS in `<head>`.
- [ ] Images are compressed (WebP or optimized JPEG).
- [ ] No unused CSS rules on this page.
- [ ] No console errors when loading the page.

### SEO Checklist

- [ ] Structured data JSON-LD is present (if applicable).
- [ ] Internal links to at least 2 other Furnostyles pages.
- [ ] Internal links from at least 2 other Furnostyles pages (verify in sitemap or manually).
- [ ] URL slug is descriptive and hyphenated.
- [ ] OG image is 1200x630px and under 200KB.
- [ ] Page is in the XML sitemap.

### Responsive Checklist

- [ ] Page looks correct on mobile (320px width).
- [ ] Page looks correct on tablet (768px width).
- [ ] Page looks correct on desktop (1440px width).
- [ ] No horizontal scroll on any device.
- [ ] Touch targets are 44x44px minimum.
- [ ] Text is readable without zooming.

### Cross-Browser Checklist

- [ ] Renders correctly in Chrome.
- [ ] Renders correctly in Firefox.
- [ ] Renders correctly in Safari (if available).
- [ ] Renders correctly in Edge.

---

## 26. Future Scalability Strategy for 500+ Pages

### The Challenge

Furnostyles will eventually have hundreds of pages:
- 50+ service area pages (Nairobi, Mombasa, Kisumu, etc.)
- 200+ blog articles
- 100+ portfolio projects
- 500+ marketplace product pages
- 50+ dashboard pages (vendor, client, admin)

Manually creating and maintaining 500+ HTML files is impossible. The page-template system must support automated generation and bulk updates.

### Strategy 1: Template-Based Generation

Instead of writing each page by hand, use a template engine or static site generator (future decision):

```
Source:           templates/public-page.html
Data:             content/services/interior-design-nairobi.md
Generated output: public/services/interior-design-nairobi.html
```

| Benefit | Explanation |
|---------|-------------|
| One template change updates all pages. | Update the hero section in `public-page.html` and regenerate. |
| Content is separate from markup. | Writers edit Markdown; developers maintain templates. |
| Consistent structure guaranteed. | Template enforces all checklist items automatically. |
| Bulk updates are trivial. | Change the CTA text in one place, regenerate 500 pages. |

### Strategy 2: Mount Point Architecture

Even without a generator, the mount point pattern scales infinitely:

```html
<!-- This same HTML works for 500+ pages -->
<div id="fns-header-mount"></div>
<div class="premium-layout">
  <main class="premium-main">[Unique content]</main>
</div>
<div id="fld-footer-mount"></div>
```

The header, footer, and shared components load dynamically. Only the `<main>` content changes per page.

### Strategy 3: Data-Driven Content

Dynamic content (blog articles, products, projects) should not be hard-coded:

| Content Type | Data Source | Rendering |
|--------------|-------------|-----------|
| Blog articles | `article-data.js` | `article-utils.js` renders lists, related articles, search results |
| Products (future) | Firebase Firestore | `marketplace.js` renders grids, filters, pagination |
| Projects | Static JSON or Firestore | `portfolio.js` renders galleries and related projects |
| Service areas | Static JSON | `services.js` renders location-specific content |

### Strategy 4: Folder Architecture for Scale

```
furnostyles-clean-rebuild/
  index.html                          # Homepage (root)
  about.html                          # About page
  contact.html                        # Contact page
  blogs/
    index.html                        # Blog listing
    modern-luxury-interior-design-kenya.html
    house-finishing-cost-guide-nairobi.html
    ... (200+ articles)
  services/
    index.html                        # Services overview
    interior-design.html
    house-finishing.html
    furniture-repairs.html
    ... (location-specific pages in future)
  portfolio/
    index.html                        # Portfolio overview
    project-slug-1.html
    project-slug-2.html
    ... (100+ projects)
  marketplace/                        # Future
    index.html                        # Marketplace home
    category-slug.html
    product/
      product-slug.html
      ... (500+ products)
  dashboard/                          # Future
    index.html
    orders.html
    products.html
    ... (50+ dashboard pages)
```

### Strategy 5: Automation for Bulk Operations

| Operation | Manual Approach (Current) | Automated Approach (Future) |
|-----------|---------------------------|----------------------------|
| Add a new blog article | Copy template, edit HTML, add to `article-data.js` | Write Markdown, run generator, auto-updates data store |
| Update CTA on all pages | Edit 500 HTML files | Edit one template, regenerate all |
| Add a new CSS variable | Update `style.css` only | Update `style.css`, auto-injected into all pages |
| Rename a service page | Find and replace in 500+ files | Update routing config, regenerate |
| Update footer copyright year | Edit `shared/footer.html` once | Already centralized — no change needed |
| Add analytics tracking | Edit `main.js` once | Already centralized — no change needed |

### Strategy 6: URL Strategy for 500+ Pages

| Page Type | URL Pattern | Example |
|-----------|-------------|---------|
| Homepage | `/` or `/index.html` | `furnostyles.com/` |
| Public page | `/[page-slug].html` | `furnostyles.com/about.html` |
| Blog listing | `/blogs/index.html` | `furnostyles.com/blogs/` |
| Blog article | `/blogs/[article-slug].html` | `furnostyles.com/blogs/modern-luxury-interior-design-kenya.html` |
| Service page | `/services/[service-slug].html` | `furnostyles.com/services/interior-design.html` |
| Portfolio page | `/portfolio/[project-slug].html` | `furnostyles.com/portfolio/lavington-penthouse.html` |
| Marketplace category | `/marketplace/[category-slug].html` | `furnostyles.com/marketplace/flooring-materials.html` |
| Product page | `/marketplace/product/[product-slug].html` | `furnostyles.com/marketplace/product/italian-marble-tiles.html` |
| Dashboard page | `/dashboard/[page-slug].html` | `furnostyles.com/dashboard/orders.html` |

### Strategy 7: Component Reuse at Scale

As the site grows, the same components appear on more pages:

| Component | Pages Used On | Maintenance |
|-----------|--------------|-------------|
| Header | All 500+ pages | Edit `shared/header.html` once |
| Footer | All 500+ pages | Edit `shared/footer.html` once |
| Hero section | 200+ public pages | Update template once |
| CTA box | 400+ public pages | Update template once |
| Card grid | 100+ listing pages | Update `style.css` once |
| FAQ accordion | 50+ service pages | Update `style.css` once |
| Product card | 500+ marketplace pages | Update `marketplace.css` once |
| Blog card | 200+ blog references | Update `blog.css` once |

### Summary: The 500-Page Promise

| Principle | How It Scales |
|-----------|---------------|
| **Mount points** | Header/footer load dynamically on 500+ pages without code duplication. |
| **Centralized CSS** | One `style.css` file controls the appearance of 500+ pages. |
| **Centralized JS** | One `main.js` file powers shared functionality on 500+ pages. |
| **Data stores** | `article-data.js` and future Firestore collections drive content without HTML edits. |
| **Templates** | A future generator turns Markdown + templates into 500+ HTML files with perfect consistency. |
| **Checklists** | The testing checklist in Section 25 scales to any number of pages. |

---

## Document Summary

| # | Section | Purpose |
|---|---------|---------|
| 1-7 | Page structures (public, blog, service, portfolio, marketplace, product, dashboard) | Skeletons for every page type Furnostyles will ever need. |
| 8 | HTML layout skeleton | The universal base that all pages extend. |
| 9 | Header/footer loading | How shared components load dynamically. |
| 10 | Sidebar-safe layout | Future-proof opt-in for sidebar pages. |
| 11-12 | CSS/JS loading order | Exact load sequence to prevent conflicts. |
| 13 | SEO metadata | Where and how to place every meta tag. |
| 14 | Image placement | Standards for heroes, content, galleries, and OG images. |
| 15 | CTA placement | Every page ends with a conversion opportunity. |
| 16 | Responsive layout | Breakpoints and patterns for all devices. |
| 17 | Accessibility | Per-page WCAG AA checklist and ARIA guide. |
| 18 | Performance | Budgets and techniques for fast loads on Kenyan networks. |
| 19 | Naming conventions | Files, classes, IDs, and folders. |
| 20 | Internal linking | Relative paths, anchor links, and service/blog cross-linking. |
| 21 | Reusable section blocks | Copy-paste ready blocks for common layouts. |
| 22 | Centralized components | What must never be defined per-page. |
| 23 | Never duplicate manually | The forbidden duplication list. |
| 24 | AI-safe editing workflow | 14 rules for safe AI-assisted page edits. |
| 25 | Testing checklist | 25+ items to verify before publishing any page. |
| 26 | Scalability strategy | How the system supports 500+ pages without chaos. |

**This document must be read before any new page is created or any existing page is modified.**
