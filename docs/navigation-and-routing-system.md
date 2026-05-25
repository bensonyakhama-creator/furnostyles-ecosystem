# Furnostyles Reusable Navigation and Routing System

**Date:** 2026-05-22 | **Status:** Planning

---

## 1. Main Navigation Structure

Furnostyles uses a single source of truth for all navigation links. Every link derives from a central navigation data structure.

### Navigation Philosophy

| Principle | Rule |
|-----------|------|
| **One source of truth** | Links live in one file, not scattered across HTML. |
| **Declarative over imperative** | Pages declare navigation needs; JS renders links. |
| **Relative paths everywhere** | Site works locally, on preview, and in production. |
| **No hard-coded URLs in HTML** | Every `href` is generated or references the central data store. |
| **Consistent ordering** | Header, footer, and sidebar follow the same section priority. |

### Primary Navigation Sections

| Priority | Section | Pages | Audience |
|----------|---------|-------|----------|
| 1 | **Brand** | Homepage | All visitors |
| 2 | **Services** | Interior Design, House Finishing, Furniture Repairs | Potential clients |
| 3 | **Portfolio** | Project galleries | Potential clients |
| 4 | **Blog** | Articles, guides, tips | Researchers, SEO traffic |
| 5 | **Marketplace** (future) | Products, categories | Shoppers |
| 6 | **Account** (future) | Dashboard, orders, settings | Logged-in users |

---

## 2. Header Navigation Rules

The header contains primary navigation for all visitors, loaded into `#fns-header-mount`.

```html
<!-- shared/header.html -->
<div class="premium-topbar">
  <span class="premium-topbar__message">Premium Interior Design & House Finishing in Nairobi</span>
</div>
<header class="premium-header">
  <a class="premium-brand" href="index.html">Furnostyles</a>
  <nav class="premium-nav" aria-label="Main navigation">
    <ul class="premium-nav__list">
      <li><a href="index.html" class="premium-nav__link">Home</a></li>
      <li class="premium-nav__item--has-dropdown">
        <a href="services/index.html" class="premium-nav__link">Services</a>
        <ul class="premium-nav__dropdown">
          <li><a href="services/interior-design.html">Interior Design</a></li>
          <li><a href="services/house-finishing.html">House Finishing</a></li>
          <li><a href="services/furniture-repairs.html">Furniture & Repairs</a></li>
        </ul>
      </li>
      <li><a href="portfolio/index.html" class="premium-nav__link">Portfolio</a></li>
      <li><a href="blogs/index.html" class="premium-nav__link">Blog</a></li>
      <li><a href="contact.html" class="premium-nav__link">Contact</a></li>
    </ul>
  </nav>
  <div class="fld-youtube-search">
    <input type="search" placeholder="Search..." aria-label="Site search">
    <button type="submit">Search</button>
  </div>
  <div class="fld-icon-actions">
    <a href="cart.html" aria-label="Cart"><span data-cart-count="">0</span></a>
    <a href="alerts.html" aria-label="Notifications"></a>
    <a href="account.html" aria-label="Account"></a>
  </div>
</header>
```

### Header Navigation Rules

| Rule | Requirement |
|------|-------------|
| Header loaded from `shared/header.html` into `#fns-header-mount`. | Never write header markup in individual pages. |
| Navigation uses `<nav>` with `aria-label="Main navigation"`. | Accessibility landmark. |
| Active page visually indicated with `aria-current="page"`. | Screen readers and sighted users know the current page. |
| Dropdowns use nested `<ul>` structures. | Keyboard accessible, screen-reader friendly. |
| Maximum 6 top-level items. | Cognitive load: users scan 5-7 items easily. |
| Search always visible in header. | Users can search from any page. |
| Cart, alerts, account icons always visible. | Core actions accessible everywhere. |
| No sidebar toggle on pages without sidebars. | Toggle only appears when `data-page-type` supports it. |

---

## 3. Footer Navigation Rules

The footer contains supplementary navigation, legal links, and contact info, loaded into `#fld-footer-mount`.

```html
<!-- shared/footer.html -->
<footer class="fld-commerce-footer">
  <div class="fld-footer-grid">
    <div class="fld-footer__col">
      <h3 class="fld-footer__title">Furnostyles</h3>
      <p>Premium interior design, house finishing, and furniture services in Nairobi, Kenya.</p>
    </div>
    <div class="fld-footer__col">
      <h3 class="fld-footer__title">Services</h3>
      <ul class="fld-footer__list">
        <li><a href="services/interior-design.html">Interior Design</a></li>
        <li><a href="services/house-finishing.html">House Finishing</a></li>
        <li><a href="services/furniture-repairs.html">Furniture & Repairs</a></li>
      </ul>
    </div>
    <div class="fld-footer__col">
      <h3 class="fld-footer__title">Company</h3>
      <ul class="fld-footer__list">
        <li><a href="about.html">About Us</a></li>
        <li><a href="portfolio/index.html">Portfolio</a></li>
        <li><a href="blogs/index.html">Blog</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="fld-footer__col">
      <h3 class="fld-footer__title">Legal</h3>
      <ul class="fld-footer__list">
        <li><a href="privacy.html">Privacy Policy</a></li>
        <li><a href="terms.html">Terms of Service</a></li>
      </ul>
    </div>
  </div>
  <div class="fld-footer-bottom">
    <p>&copy; 2026 Furnostyles. All rights reserved.</p>
    <div class="fld-footer__social">
      <a href="[Facebook]" aria-label="Facebook">FB</a>
      <a href="[Instagram]" aria-label="Instagram">IG</a>
      <a href="[LinkedIn]" aria-label="LinkedIn">LI</a>
    </div>
  </div>
</footer>
```

### Footer Navigation Rules

| Rule | Requirement |
|------|-------------|
| Footer loaded from `shared/footer.html` into `#fld-footer-mount`. | Never write footer markup in individual pages. |
| Footer contains all primary page categories. | Users who scroll to bottom can find any section. |
| Service links in footer match header dropdown exactly. | Same links, same order, same labels. |
| Legal pages linked in footer only. | Privacy, terms — not needed in primary header. |
| Social links open in new tabs with `rel="noopener noreferrer"`. | External links security best practice. |
| Copyright year is current. | Update once in `shared/footer.html`. |
| Footer uses `&copy;` entity, not the symbol. | Consistent encoding across environments. |

---

## 4. Future Sidebar Navigation Strategy

When sidebar is implemented (see `future-sidebar-strategy.md`), it contains context-aware navigation.

### Sidebar Navigation by Context

| Page Type | Sidebar Navigation Content |
|-----------|---------------------------|
| **Blog listing** | Category filter, popular articles, newsletter signup, service CTA |
| **Blog article** | Related articles, category list, reading progress, service CTA |
| **Marketplace category** (future) | Subcategory tree, price filter, material filter, brand filter, sort |
| **Marketplace product** (future) | Related products, "people also viewed", category breadcrumb, vendor info |
| **Dashboard** (future) | Role-based menu (Overview, Orders, Products, Analytics, Settings, Logout) |

### Sidebar Navigation Rules

| Rule | Requirement |
|------|-------------|
| Sidebar navigation generated from central navigation data store. | Not hard-coded per page. |
| Active category/article visually highlighted. | Users know where they are in hierarchy. |
| Collapsible sections use `<details>` or `aria-expanded`. | Accessible expand/collapse. |
| Filter links update URL query string without reloading. | `?material=porcelain&price_max=10000` |
| Dashboard sidebar links are role-based. | Vendors see different links than clients or admins. |
| Sidebar navigation state remembered in `localStorage`. | User preferences persist. |

---

## 5. Internal Linking Architecture

### Link Categories

| Category | Purpose | Example |
|----------|---------|---------|
| **Navigational** | Move between major sections | Header menu, footer links, sidebar |
| **Contextual** | Connect related content within a page | Blog article linking to a service page |
| **Breadcrumb** | Show hierarchy, enable upward navigation | Home > Services > Interior Design |
| **Cross-reference** | Link between parallel content types | Service page linking to a relevant blog article |

### Internal Link Rules

| Rule | Requirement |
|------|-------------|
| All internal links use relative paths. | `services/interior-design.html` not absolute URLs. |
| Links between content types follow cross-reference matrix. | Service pages link to related blog articles; blogs link to related services. |
| Anchor text is descriptive. | "Explore our interior design services" not "click here". |
| No orphan pages. | Every page linked from at least one other page. |
| No broken links. | Check all links before every deployment. |
| External links use `target="_blank" rel="noopener noreferrer"`. | Security and performance. |
| PDFs and downloads indicate file type. | "Download Brochure (PDF, 2MB)". |

### Cross-Reference Matrix

| From | Link To | Anchor Text Example |
|------|---------|---------------------|
| Blog article (interior design) | `services/interior-design.html` | "Explore our interior design services" |
| Service page (interior design) | Relevant blog article | "Read our guide to modern luxury interior design in Kenya" |
| Portfolio project | Service pages used | "See our interior design process" |
| Portfolio project | Related projects | "View more living room projects" |
| About page | Portfolio, team, contact | "View our work", "Meet the team", "Get in touch" |
| Contact page | Services, portfolio | "Learn about our services", "See our projects" |

---

## 6. Blog Navigation Structure

### Blog Listing Page Navigation

```html
<nav class="fns-blog-categories" aria-label="Blog categories">
  <a href="blogs/index.html" class="fns-blog-categories__link fns-blog-categories__link--active">All</a>
  <a href="blogs/category/interior-design.html" class="fns-blog-categories__link">Interior Design</a>
  <a href="blogs/category/house-finishing.html" class="fns-blog-categories__link">House Finishing</a>
  <a href="blogs/category/furniture-repairs.html" class="fns-blog-categories__link">Furniture & Repairs</a>
</nav>

<nav class="fns-pagination" aria-label="Blog pagination">
  <a href="?page=1" class="fns-pagination__link fns-pagination__link--active">1</a>
  <a href="?page=2" class="fns-pagination__link">2</a>
  <a href="?page=3" class="fns-pagination__link">3</a>
</nav>
```

### Blog Article Navigation

```html
<!-- Table of Contents -->
<nav class="fns-blog-toc" aria-label="Article contents">
  <h2>Table of Contents</h2>
  <ol>
    <li><a href="#understanding-modern-design">Understanding Modern Interior Design</a></li>
    <li><a href="#choosing-materials">Choosing the Right Materials</a></li>
  </ol>
</nav>

<!-- Inline contextual link -->
<p>If you're considering a full home transformation, <a href="../services/interior-design.html">our interior design services</a> include everything from concept to completion.</p>

<!-- Related articles (loaded dynamically) -->
<div id="fns-related-articles-mount"></div>
```

### Blog Navigation Rules

| Rule | Requirement |
|------|-------------|
| Category pills visible on blog listing page. | Users can filter by topic. |
| Active category visually distinct with `--active` modifier. | Current category is obvious. |
| Pagination accessible with `aria-label`. | Screen readers announce pagination. |
| TOC links use descriptive anchor text. | `id="choosing-materials"` not `id="section-2"`. |
| Every blog article links to at least one service page. | Drives traffic from content to conversion pages. |
| Related articles load from `article-data.js`. | Never hard-code related article lists. |
| Blog articles do not link externally in first paragraph. | Keep readers on site initially. |

---

## 7. Service-Page Navigation Structure

### Service Listing Page

```html
<section class="fns-section">
  <div class="fns-container">
    <div class="fns-card-grid fns-card-grid--3">
      <a href="services/interior-design.html" class="fns-card fns-card--service">
        <h3>Interior Design</h3>
        <p>Transform your living spaces with expert design.</p>
        <span class="fns-btn fns-btn--ghost">Learn More</span>
      </a>
      <a href="services/house-finishing.html" class="fns-card fns-card--service">
        <h3>House Finishing</h3>
        <p>Complete finishing solutions for new and existing homes.</p>
        <span class="fns-btn fns-btn--ghost">Learn More</span>
      </a>
      <a href="services/furniture-repairs.html" class="fns-card fns-card--service">
        <h3>Furniture & Repairs</h3>
        <p>Restore, repair, and customize your furniture.</p>
        <span class="fns-btn fns-btn--ghost">Learn More</span>
      </a>
    </div>
  </div>
</section>
```

### Individual Service Page Navigation

```html
<!-- Related Services -->
<section class="fns-section">
  <div class="fns-container">
    <h2>Related Services</h2>
    <div class="fns-service-links">
      <a href="house-finishing.html" class="fns-service-links__item">House Finishing</a>
      <a href="furniture-repairs.html" class="fns-service-links__item">Furniture & Repairs</a>
    </div>
  </div>
</section>

<!-- Service to blog cross-link -->
<section class="fns-section fns-section--alt">
  <div class="fns-container">
    <h2>Learn More</h2>
    <p>Read our <a href="../blogs/modern-luxury-interior-design-kenya.html">guide to modern luxury interior design in Kenya</a> for inspiration.</p>
  </div>
</section>
```

### Service Navigation Rules

| Rule | Requirement |
|------|-------------|
| Service cards on overview page link to individual service pages. | Each service has its own dedicated page. |
| Service pages link to other related services. | Cross-selling related offerings. |
| Service pages link to relevant blog articles. | Content marketing drives engagement. |
| Service pages link to relevant portfolio projects. | Proof of work builds trust. |
| Every service page has a prominent CTA to contact/book. | Conversion is the primary goal. |
| Service pages include FAQ sections with anchor links. | SEO and user experience. |

---

## 8. Portfolio Navigation Structure

### Portfolio Listing Page

```html
<nav class="fns-portfolio-filter" aria-label="Portfolio filters">
  <a href="portfolio/index.html" class="fns-portfolio-filter__link fns-portfolio-filter__link--active">All</a>
  <a href="portfolio/category/living-room.html" class="fns-portfolio-filter__link">Living Room</a>
  <a href="portfolio/category/kitchen.html" class="fns-portfolio-filter__link">Kitchen</a>
  <a href="portfolio/category/bedroom.html" class="fns-portfolio-filter__link">Bedroom</a>
</nav>

<div class="fns-card-grid fns-card-grid--3" id="fns-portfolio-grid">
  <!-- Projects rendered by JS -->
</div>
```

### Portfolio Project Page Navigation

```html
<nav class="fns-breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="../index.html">Home</a></li>
    <li><a href="index.html">Portfolio</a></li>
    <li aria-current="page">Lavington Penthouse</li>
  </ol>
</nav>

<div class="fns-tag-list">
  <a href="../services/interior-design.html" class="fns-tag">Interior Design</a>
  <a href="../services/house-finishing.html" class="fns-tag">House Finishing</a>
</div>

<section class="fns-section">
  <div class="fns-container">
    <h2>Related Projects</h2>
    <div class="fns-card-grid fns-card-grid--3" id="fns-related-projects-mount"></div>
  </div>
</section>
```

### Portfolio Navigation Rules

| Rule | Requirement |
|------|-------------|
| Portfolio listing has category filters. | Users can browse by room type. |
| Project detail pages have breadcrumbs. | Users understand hierarchy. |
| Project pages link to services used. | Connects portfolio proof to service offerings. |
| Related projects load dynamically. | Based on category, location, or services used. |
| Portfolio images link to project detail pages. | Clicking any image opens the full case study. |
| Project pages have previous/next project links. | Encourages browsing. |

---

## 9. Future Marketplace Category Navigation

**Not to be built yet.** Document only.

```javascript
// navigation-data.js (future marketplace section)
const marketplaceCategories = [
  {
    name: 'Flooring Materials',
    slug: 'flooring-materials',
    subcategories: [
      { name: 'Floor Tiles', slug: 'floor-tiles' },
      { name: 'Hardwood Flooring', slug: 'hardwood-flooring' },
      { name: 'Vinyl Flooring', slug: 'vinyl-flooring' }
    ]
  },
  {
    name: 'Kitchen & Bath',
    slug: 'kitchen-bath',
    subcategories: [
      { name: 'Kitchen Cabinets', slug: 'kitchen-cabinets' },
      { name: 'Countertops', slug: 'countertops' }
    ]
  }
];
```

### Marketplace Navigation Rules (Future)

| Rule | Requirement |
|------|-------------|
| Category tree rendered from central data store. | Not hard-coded in HTML. |
| Subcategories collapsible in sidebar. | Clean UI for deep category trees. |
| Active category and subcategory highlighted. | Visual orientation for users. |
| Breadcrumbs show full category path. | Home > Marketplace > Flooring Materials > Floor Tiles. |
| Filter selections update the URL. | Shareable filtered views. |
| Sort options accessible with `aria-label`. | Dropdown or button group. |
| Product cards link to product detail pages. | Consistent click target. |
| Pagination or infinite scroll implemented accessibly. | Screen readers announce new content. |

---

## 10. Future Dashboard Navigation Structure

**Not to be built yet.** Document only.

```html
<aside class="fns-dashboard-sidebar" id="fns-sidebar-mount">
  <div class="fns-dashboard-sidebar__brand">
    <img src="/assets/images/logos/logo-icon.svg" alt="Furnostyles" width="32">
    <span class="fns-dashboard-sidebar__brand-text">Furnostyles</span>
  </div>
  <nav class="fns-dashboard-sidebar__nav" aria-label="Dashboard navigation">
    <a href="/dashboard/" class="fns-dashboard-sidebar__link fns-dashboard-sidebar__link--active"
       data-role="vendor|admin">
      <span class="fns-dashboard-sidebar__icon">&#8962;</span>
      <span class="fns-dashboard-sidebar__text">Overview</span>
    </a>
    <a href="/dashboard/orders.html" class="fns-dashboard-sidebar__link" data-role="vendor|admin|client">
      <span class="fns-dashboard-sidebar__icon">&#128196;</span>
      <span class="fns-dashboard-sidebar__text">Orders</span>
      <span class="fns-dashboard-sidebar__badge">3</span>
    </a>
    <a href="/dashboard/products.html" class="fns-dashboard-sidebar__link" data-role="vendor|admin">
      <span class="fns-dashboard-sidebar__icon">&#128230;</span>
      <span class="fns-dashboard-sidebar__text">Products</span>
    </a>
    <a href="/dashboard/clients.html" class="fns-dashboard-sidebar__link" data-role="admin">
      <span class="fns-dashboard-sidebar__icon">&#128100;</span>
      <span class="fns-dashboard-sidebar__text">Clients</span>
    </a>
  </nav>
  <div class="fns-dashboard-sidebar__footer">
    <a href="/dashboard/settings.html" class="fns-dashboard-sidebar__link" data-role="all">
      <span class="fns-dashboard-sidebar__icon">&#9881;</span>
      <span class="fns-dashboard-sidebar__text">Settings</span>
    </a>
    <button class="fns-dashboard-sidebar__link" data-logout data-role="all">
      <span class="fns-dashboard-sidebar__icon">&#9094;</span>
      <span class="fns-dashboard-sidebar__text">Log Out</span>
    </button>
  </div>
</aside>
```

### Dashboard Navigation Rules (Future)

| Rule | Requirement |
|------|-------------|
| Dashboard sidebar links are role-based. | `data-role` filters visible links per user type. |
| Admin sees all links. | Vendors see vendor links + settings + logout. |
| Clients see client-specific links. | My orders, my requests, saved items, settings. |
| Active page clearly highlighted. | Current page link has `--active` modifier. |
| Notification badges update in real-time. | Firebase listeners for live counts. |
| Logout always accessible. | Bottom of sidebar, visible to all roles. |
| Dashboard URLs use `/dashboard/` prefix. | Clear separation from public site URLs. |
| Dashboard pages are `noindex`. | Must not appear in search results. |

---

## 11. URL Structure Standards

### URL Patterns by Page Type

| Page Type | Pattern | Example |
|-----------|---------|---------|
| Homepage | `/` or `/index.html` | `furnostyles.com/` |
| Public page | `/[slug].html` | `furnostyles.com/about.html` |
| Service listing | `/services/index.html` | `furnostyles.com/services/` |
| Service page | `/services/[slug].html` | `furnostyles.com/services/interior-design.html` |
| Portfolio listing | `/portfolio/index.html` | `furnostyles.com/portfolio/` |
| Portfolio project | `/portfolio/[slug].html` | `furnostyles.com/portfolio/lavington-penthouse.html` |
| Blog listing | `/blogs/index.html` | `furnostyles.com/blogs/` |
| Blog article | `/blogs/[slug].html` | `furnostyles.com/blogs/modern-luxury-interior-design-kenya.html` |
| Blog category | `/blogs/category/[slug].html` | `furnostyles.com/blogs/category/interior-design.html` |
| Marketplace home (future) | `/marketplace/index.html` | `furnostyles.com/marketplace/` |
| Marketplace category (future) | `/marketplace/[slug].html` | `furnostyles.com/marketplace/flooring-materials.html` |
| Product page (future) | `/marketplace/product/[slug].html` | `furnostyles.com/marketplace/product/italian-marble-tiles.html` |
| Dashboard (future) | `/dashboard/[slug].html` | `furnostyles.com/dashboard/orders.html` |

### URL Rules

| Rule | Requirement |
|------|-------------|
| URLs use kebab-case (hyphenated lowercase). | `interior-design.html` not `interiorDesign.html`. |
| URLs are descriptive and keyword-rich. | `modern-luxury-interior-design-kenya.html` not `article-12.html`. |
| No query parameters in canonical URLs. | `?page=2` is for UX, not canonical indexing. |
| Category pages use `/category/` subpath. | Clear hierarchy. |
| Product pages use `/product/` subpath. | Prevents slug collision. |
| Dashboard URLs prefixed with `/dashboard/`. | Clear separation from public content. |
| No trailing slashes in canonical URLs. | Consistency. |
| No `.php`, `.asp`, or other extensions. | Static `.html` only. |

---

## 12. Relative vs Absolute Path Strategy

### When to Use Relative Paths

| Context | Example | Reason |
|---------|---------|--------|
| Internal page links | `services/interior-design.html` | Works locally, on preview, and in production. |
| CSS/JS file references | `../assets/css/style.css` | Correct resolution regardless of domain. |
| Image sources | `../assets/images/hero/home-hero.jpg` | Portable across environments. |
| Header/footer fetch URLs | `shared/header.html` | Relative to page location. |

### When to Use Absolute Paths

| Context | Example | Reason |
|---------|---------|--------|
| Canonical URLs | `https://furnostyles.com/services/interior-design.html` | Tells search engines the definitive URL. |
| OG image URLs | `https://furnostyles.com/assets/images/og/article-og.jpg` | Social platforms need absolute URLs. |
| Structured data | `"url": "https://furnostyles.com/"` | Schema.org requires absolute URLs. |
| External links | `https://wa.me/254713639205` | External resources are always absolute. |
| Sitemap URLs | `https://furnostyles.com/sitemap.xml` | Sitemap specification requires absolute URLs. |

### Path Resolution by Page Depth

| Page Location | To Root | To `assets/` | To `shared/` | To `blogs/` |
|---------------|---------|--------------|--------------|-------------|
| Root (`index.html`) | `./` | `assets/` | `shared/` | `blogs/` |
| `/services/` | `../` | `../assets/` | `../shared/` | `../blogs/` |
| `/blogs/` | `../` | `../assets/` | `../shared/` | `./` |
| `/marketplace/product/` | `../../` | `../../assets/` | `../../shared/` | `../../blogs/` |
| `/dashboard/` | `../` | `../assets/` | `../shared/` | `../blogs/` |

### Path Rules

| Rule | Requirement |
|------|-------------|
| Always use relative paths for internal links and assets. | Prevents broken links on preview deployments. |
| Always use absolute paths for canonical, OG, and schema. | Search engines and social platforms require them. |
| Never use root-relative paths starting with `/`. | Breaks on subdirectory deployments. |
| Verify paths when moving a page to a different folder depth. | Most common cause of broken assets. |

---

## 13. Breadcrumb Strategy

### Breadcrumb Structure

```html
<!-- Portfolio project page -->
<nav class="fns-breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="../index.html">Home</a></li>
    <li><a href="index.html">Portfolio</a></li>
    <li aria-current="page">Lavington Penthouse</li>
  </ol>
</nav>

<!-- Product page (future) -->
<nav class="fns-breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="../../index.html">Home</a></li>
    <li><a href="../index.html">Marketplace</a></li>
    <li><a href="../flooring-materials.html">Flooring Materials</a></li>
    <li aria-current="page">Italian Marble Tiles</li>
  </ol>
</nav>
```

### Breadcrumb Rules

| Rule | Requirement |
|------|-------------|
| Breadcrumbs use `<nav>` with `aria-label="Breadcrumb"`. | Screen reader landmark. |
| Breadcrumbs use an ordered list `<ol>`. | Communicates sequence and hierarchy. |
| Current page uses `<li aria-current="page">` with no link. | Indicates current location without making it clickable. |
| Breadcrumbs reflect site hierarchy, not click path. | Consistent regardless of how user arrived. |
| Breadcrumbs present on all pages except homepage. | Homepage is the root; no upward navigation needed. |
| Breadcrumb schema JSON-LD is included. | Rich snippets in search results. |

### Breadcrumb Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://furnostyles.com/" },
    { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://furnostyles.com/portfolio/" },
    { "@type": "ListItem", "position": 3, "name": "Lavington Penthouse" }
  ]
}
</script>
```

---

## 14. Search/Navigation Integration Strategy

### Site Search

```html
<div class="fld-youtube-search">
  <input type="search" placeholder="Search products, services, articles..."
         aria-label="Site search" id="fns-site-search">
  <button type="submit" id="fns-site-search-btn">Search</button>
</div>
```

### Search Behaviour

| Search Type | Implementation | Result |
|-------------|--------------|--------|
| **Blog article search** | Client-side search of `article-data.js` | Instant results, no server needed |
| **Product search** (future) | Firebase Firestore query | Real-time product matching |
| **Service search** | Static page matching | Redirect to relevant service page |
| **Portfolio search** | Static page matching | Redirect to relevant portfolio page |

### Search Rules

| Rule | Requirement |
|------|-------------|
| Search input has a visible label or `aria-label`. | Accessibility. |
| Search button is keyboard accessible. | Enter key triggers search. |
| Search results page has a clear heading. | "Search results for 'interior design'" |
| No results state is helpful. | Suggest related terms or popular content. |
| Search results are accessible. | Proper heading hierarchy, keyboard navigable. |
| Search is debounced if using live filtering. | 200ms delay prevents excessive queries. |

---

## 15. Mobile Navigation Strategy

### Mobile Header Behaviour

On mobile (< 768px), header navigation collapses into a hamburger menu.

```html
<header class="premium-header">
  <a class="premium-brand" href="index.html">Furnostyles</a>
  <button class="premium-nav__toggle" aria-label="Toggle navigation" aria-expanded="false">
    <span class="premium-nav__toggle-icon"></span>
  </button>
  <div class="fld-youtube-search fld-youtube-search--compact">
    <input type="search" placeholder="Search...">
  </div>
  <div class="fld-icon-actions fld-icon-actions--compact">
    <a href="cart.html" aria-label="Cart"><span data-cart-count="">0</span></a>
  </div>
</header>

<nav class="premium-nav premium-nav--mobile" aria-label="Mobile navigation" hidden>
  <ul class="premium-nav__list">
    <li><a href="index.html">Home</a></li>
    <li><a href="services/index.html">Services</a></li>
    <li><a href="portfolio/index.html">Portfolio</a></li>
    <li><a href="blogs/index.html">Blog</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

### Mobile Navigation Rules

| Rule | Requirement |
|------|-------------|
| Hamburger menu uses `aria-expanded` and `aria-label`. | Screen readers announce state. |
| Mobile nav opens as an overlay, not by squeezing content. | Content remains full-width. |
| Overlay can be closed by clicking outside, pressing Escape, or clicking close button. | Multiple dismissal methods. |
| Focus is trapped within the mobile menu when open. | Keyboard users cannot Tab behind the overlay. |
| Mobile nav links are large touch targets (min 44px). | Easy tapping on small screens. |
| Dropdown items are visible by default in mobile menu. | No nested tapping required. |
| Mobile nav does not load a separate page. | Client-side toggle only. |

---

## 16. Future Mega-Menu Strategy

**Not to be built yet.** Document only.

When the marketplace launches, the header may need a mega-menu for product categories.

```html
<li class="premium-nav__item--has-megamenu">
  <a href="marketplace/index.html" class="premium-nav__link">Marketplace</a>
  <div class="premium-nav__megamenu">
    <div class="premium-nav__megamenu-col">
      <h4>Flooring Materials</h4>
      <ul>
        <li><a href="marketplace/floor-tiles.html">Floor Tiles</a></li>
        <li><a href="marketplace/hardwood-flooring.html">Hardwood Flooring</a></li>
      </ul>
    </div>
    <div class="premium-nav__megamenu-col">
      <h4>Kitchen & Bath</h4>
      <ul>
        <li><a href="marketplace/kitchen-cabinets.html">Kitchen Cabinets</a></li>
        <li><a href="marketplace/countertops.html">Countertops</a></li>
      </ul>
    </div>
  </div>
</li>
```

### Mega-Menu Rules (Future)

| Rule | Requirement |
|------|-------------|
| Mega-menu triggered by hover on desktop, click on mobile. | Consistent with platform conventions. |
| Mega-menu content loaded from category data store. | Not hard-coded in HTML. |
| Featured/promoted categories can be highlighted. | Editorial control over prominence. |
| Mega-menu is keyboard accessible. | Tab through columns, Escape to close. |
| Mobile mega-menu becomes a collapsible list. | Same content, different presentation. |
| Mega-menu does not block other header elements. | Search and icons remain accessible. |

---

## 17. Future Marketplace Filtering/Navigation Strategy

**Not to be built yet.** Document only.

```html
<!-- Filter sidebar (future) -->
<div class="fns-sidebar__section">
  <h3 class="fns-sidebar__title">Filter by Price</h3>
  <input type="range" min="0" max="50000" value="25000" class="fns-sidebar__range"
         data-filter="price_max">
  <div class="fns-sidebar__range-labels">
    <span>KES 0</span>
    <span>KES 50,000+</span>
  </div>
</div>

<div class="fns-sidebar__section">
  <h3 class="fns-sidebar__title">Material</h3>
  <label class="fns-form-check">
    <input type="checkbox" name="material" value="porcelain" data-filter="material">
    <span>Porcelain</span>
  </label>
  <label class="fns-form-check">
    <input type="checkbox" name="material" value="ceramic" data-filter="material">
    <span>Ceramic</span>
  </label>
</div>

<button class="fns-btn fns-btn--ghost" data-filters-clear>Clear All Filters</button>
```

### Filter Navigation Rules (Future)

| Rule | Requirement |
|------|-------------|
| Filters update the URL query string. | `?material=porcelain&price_max=10000` |
| Filter state persists when navigating between category pages. | Users do not re-select filters. |
| "Clear all filters" button visible when filters are active. | Easy reset. |
| Active filter count displayed. | "Filters (3)" informs users something is applied. |
| Filter options sorted alphabetically or by count. | Predictable ordering. |
| Filter count shows available results per option. | "Porcelain (24)" helps decision-making. |
| Sort dropdown separate from filters. | Sorting is not filtering; keep them distinct. |
| Mobile filters open in an overlay panel. | Full-screen filter experience on small devices. |

---

## 18. Navigation Accessibility Standards

### Keyboard Navigation

| Key | Action | Context |
|-----|--------|---------|
| `Tab` | Move to next focusable element | All pages |
| `Shift + Tab` | Move to previous focusable element | All pages |
| `Enter` | Activate link or button | All interactive elements |
| `Escape` | Close mobile menu, sidebar, or overlay | Open navigation panels |
| `Space` | Toggle checkbox or expand/collapse | Filters, accordions |
| `Arrow Down` | Move to next item in dropdown | Dropdown menus |
| `Arrow Up` | Move to previous item in dropdown | Dropdown menus |
| `Home` | Jump to first item in list | Dropdowns, pagination |
| `End` | Jump to last item in list | Dropdowns, pagination |

### ARIA for Navigation

| Element | ARIA Attribute | Purpose |
|---------|--------------|---------|
| `<nav>` | `aria-label="Main navigation"` | Names the navigation landmark |
| Active link | `aria-current="page"` | Indicates current page |
| Dropdown toggle | `aria-expanded="true/false"` | Indicates dropdown state |
| Dropdown trigger | `aria-haspopup="true"` | Indicates expandable content |
| Mobile toggle | `aria-controls="nav-id"` | Associates toggle with menu |
| Breadcrumb | `aria-label="Breadcrumb"` | Names breadcrumb navigation |
| Current breadcrumb | `aria-current="page"` | Indicates current page in trail |
| Search input | `aria-label="Site search"` | Labels search field |
| Live region | `aria-live="polite"` | Announces dynamic content changes |

### Focus Management

| Scenario | Behaviour |
|----------|-----------|
| Mobile menu opens | Focus moves to first link in the menu |
| Mobile menu closes | Focus returns to the hamburger toggle button |
| Dropdown opens | Focus moves to first dropdown item |
| Dropdown closes | Focus returns to the dropdown trigger |
| Sidebar opens (overlay) | Focus moves to first sidebar link |
| Sidebar closes | Focus returns to the sidebar toggle button |
| Modal opens | Focus is trapped within the modal |
| Modal closes | Focus returns to the element that opened it |

### Accessibility Rules

| Rule | Requirement |
|------|-------------|
| All navigation is operable with keyboard only. | No mouse dependency. |
| Focus indicators are visible (min 2px outline). | Users can see where focus is. |
| Navigation landmarks use `<nav>` or `role="navigation"`. | Screen reader users can jump to navigation. |
| Skip links are provided for keyboard users. | "Skip to main content" link at top of page. |
| Colour is not the only indicator of state. | Active links use underline + colour change. |
| Touch targets are minimum 44x44px. | Mobile accessibility. |

---

## 19. Navigation Performance Considerations

### Loading Strategy

| Resource | Strategy | Reason |
|----------|----------|--------|
| Header HTML | Fetch once, cache in memory | Avoid repeated network requests |
| Footer HTML | Fetch once, cache in memory | Avoid repeated network requests |
| Navigation data | Load with `defer`, cache in memory | Single source of truth for all nav |
| Dropdown CSS | Part of `style.css` | Already loaded, no extra request |
| Mobile menu CSS | Part of `style.css` | Hidden by default, toggled with class |
| Mega-menu content (future) | Load on hover/click, lazy | Not needed until user interacts |
| Filter options (future) | Load with category page, cache | Options change infrequently |

### Performance Rules

| Rule | Requirement |
|------|-------------|
| Navigation data loaded once per session. | Cached in a global variable after first load. |
| Header and footer fetched in parallel. | `Promise.all` for concurrent loading. |
| No blocking JS for navigation rendering. | `defer` all scripts; use mount points. |
| Mobile menu is CSS-only toggle where possible. | No JS needed for basic open/close. |
| Dropdown hover delays are minimal (< 150ms). | Prevent accidental triggers without feeling sluggish. |
| Navigation images (icons, logos) are SVG or inline. | No extra HTTP requests for small icons. |
| Active state is applied client-side, not server-side. | Static hosting compatible. |

---

## 20. Shared Navigation Data-Source Strategy

### Central Navigation Data Store

```javascript
// assets/js/navigation-data.js (future)
const FurnostylesNavigation = {
  header: [
    { label: 'Home', url: 'index.html', type: 'page' },
    {
      label: 'Services',
      url: 'services/index.html',
      type: 'dropdown',
      children: [
        { label: 'Interior Design', url: 'services/interior-design.html' },
        { label: 'House Finishing', url: 'services/house-finishing.html' },
        { label: 'Furniture & Repairs', url: 'services/furniture-repairs.html' }
      ]
    },
    { label: 'Portfolio', url: 'portfolio/index.html', type: 'page' },
    { label: 'Blog', url: 'blogs/index.html', type: 'page' },
    { label: 'Contact', url: 'contact.html', type: 'page' }
  ],
  footer: {
    services: [
      { label: 'Interior Design', url: 'services/interior-design.html' },
      { label: 'House Finishing', url: 'services/house-finishing.html' },
      { label: 'Furniture & Repairs', url: 'services/furniture-repairs.html' }
    ],
    company: [
      { label: 'About Us', url: 'about.html' },
      { label: 'Portfolio', url: 'portfolio/index.html' },
      { label: 'Blog', url: 'blogs/index.html' },
      { label: 'Contact', url: 'contact.html' }
    ],
    legal: [
      { label: 'Privacy Policy', url: 'privacy.html' },
      { label: 'Terms of Service', url: 'terms.html' }
    ]
  },
  blogCategories: [
    { label: 'Interior Design', slug: 'interior-design', url: 'blogs/category/interior-design.html' },
    { label: 'House Finishing', slug: 'house-finishing', url: 'blogs/category/house-finishing.html' }
  ],
  serviceLinks: {
    'interior-design': {
      relatedServices: ['house-finishing'],
      relatedArticles: ['modern-luxury-interior-design-kenya'],
      relatedProjects: ['lavington-penthouse']
    }
  }
};
```

### Data Store Rules

| Rule | Requirement |
|------|-------------|
| Navigation data is the single source of truth. | Header, footer, sidebar, breadcrumbs all reference this file. |
| Adding a new page requires only one data entry. | Update `navigation-data.js`, not individual HTML files. |
| URLs in the data store use relative paths. | Correct resolution from any page depth. |
| Labels in the data store use title case. | "Interior Design" not "interior design". |
| The data store is versioned with the site. | Changes are tracked in Git. |
| Active page highlighting is computed client-side. | Compare `window.location.pathname` against data store URLs. |

---

## 21. Which Navigation Parts Must Remain Centralized

### Non-Negotiable Centralized Navigation

| Component | Central Location | Why Centralized |
|-----------|------------------|-----------------|
| **Header navigation links** | `shared/header.html` or `navigation-data.js` | One update changes all pages. |
| **Footer navigation links** | `shared/footer.html` or `navigation-data.js` | One update changes all pages. |
| **Navigation link labels** | `navigation-data.js` | Consistent naming everywhere. |
| **Navigation link order** | `navigation-data.js` | Same priority across header and footer. |
| **Dropdown menu items** | `navigation-data.js` | Services dropdown matches footer services column. |
| **Blog categories** | `navigation-data.js` | Category pills, sidebar, and filters use same data. |
| **Service cross-references** | `navigation-data.js` | Related services, articles, and projects defined once. |
| **URL patterns** | `navigation-data.js` | All routing logic derives from one source. |
| **Breadcrumb logic** | `navigation-data.js` + JS | Breadcrumbs computed from hierarchy data. |
| **Active page detection** | `main.js` | One function highlights current page everywhere. |

---

## 22. Which Links Should Never Be Hardcoded Repeatedly

### The Forbidden Hardcoding List

| Link Type | Why Hardcoding Is Dangerous | Safe Alternative |
|-----------|---------------------------|------------------|
| **Header menu links** | Changing one URL requires editing every page. | Load from `shared/header.html` or `navigation-data.js`. |
| **Footer column links** | Footer links change (new pages, renamed pages). | Load from `shared/footer.html` or `navigation-data.js`. |
| **Service dropdown items** | New services must be added to every page. | Rendered from `navigation-data.js`. |
| **Blog category links** | Categories expand over time. | Rendered from `navigation-data.js`. |
| **Social media links** | URLs change (new usernames, platforms). | Defined once in `footer.html` or config. |
| **Legal page links** | Privacy/terms URLs should be centralized. | Defined once in `footer.html`. |
| **Related article links** | Articles become outdated; new ones published. | Loaded dynamically from `article-data.js`. |
| **Related project links** | Projects are added continuously. | Loaded dynamically from portfolio data store. |
| **Related product links** (future) | Products change constantly. | Loaded dynamically from Firestore. |
| **Breadcrumb parents** | Parent pages may move or be renamed. | Computed from `navigation-data.js` hierarchy. |
| **Internal CTA links** | "Contact us" links to the same page everywhere. | Use a constant or data store reference. |

---

## 23. How Future Pages Should Register Themselves Safely

### Page Registration System

New pages declare their navigation presence via the central data store, not by editing HTML.

```javascript
// To add a new service page:

// 1. Add to navigation-data.js
FurnostylesNavigation.header[1].children.push({
  label: 'Custom Furniture',
  url: 'services/custom-furniture.html'
});

FurnostylesNavigation.footer.services.push({
  label: 'Custom Furniture',
  url: 'services/custom-furniture.html'
});

// 2. Add cross-references
FurnostylesNavigation.serviceLinks['custom-furniture'] = {
  relatedServices: ['interior-design', 'furniture-repairs'],
  relatedArticles: ['choosing-custom-furniture-nairobi'],
  relatedProjects: ['karen-custom-kitchen']
};

// 3. Add breadcrumb parent
FurnostylesNavigation.breadcrumbs['custom-furniture'] = {
  parent: 'services/index.html',
  label: 'Custom Furniture'
};
```

### Registration Rules

| Rule | Requirement |
|------|-------------|
| New pages registered in `navigation-data.js` before launch. | Navigation is aware of the page. |
| New pages added to the XML sitemap. | Search engines discover the page. |
| New pages link to at least 2 existing pages. | No orphan pages. |
| New pages are linked from at least 2 existing pages. | Discoverability. |
| New blog articles added to `article-data.js`. | Related articles, search, and category pages work. |
| New service pages added to the service cross-reference map. | Related services, articles, and projects render correctly. |
| New portfolio projects added to the portfolio data store. | Related projects and service links work. |
| URLs validated before registration. | No typos, no conflicts, correct relative paths. |

---

## 24. Future AI-Safe Navigation Editing Workflow

### AI Navigation Editing Rules

| Step | Action | Rationale |
|------|--------|-----------|
| **1. Read this document first.** | Before editing navigation, read `navigation-and-routing-system.md`. | Ensures understanding of architecture. |
| **2. Check existing navigation structure.** | Read `navigation-data.js` or `shared/header.html` to understand current links. | Prevents accidental duplication or deletion. |
| **3. Identify all locations where a link appears.** | Header, footer, sidebar, breadcrumbs, cross-references. | Changing one without the others creates inconsistency. |
| **4. Update the central data store first.** | `navigation-data.js` is the source of truth. | All rendered navigation derives from here. |
| **5. Update shared HTML files second.** | `shared/header.html` and `shared/footer.html`. | Static files that serve as fallback. |
| **6. Verify relative paths are correct.** | Blog pages use `../services/`; root pages use `services/`. | Broken paths are the most common navigation error. |
| **7. Update breadcrumb hierarchy if needed.** | Breadcrumbs computed from `navigation-data.js`. | Parent pages must exist and be correct. |
| **8. Update cross-references.** | Related services, articles, projects in `navigation-data.js`. | Related content links must stay current. |
| **9. Add new page to the XML sitemap.** | Ensure search engines can discover it. | SEO discoverability. |
| **10. Verify no duplicate labels.** | Two pages cannot have the same label. | Users get confused by identical link text pointing to different URLs. |
| **11. Test on mobile.** | Collapsed navigation must show the new link correctly. | Mobile is where most navigation bugs appear. |
| **12. Run the testing checklist.** | Section 25 checklist before declaring complete. | Catches errors before deployment. |

### AI Navigation Danger Zone

| Dangerous Action | Why It Breaks Navigation |
|------------------|--------------------------|
| Hard-coding a new link in one page only | Other pages do not show the link; users get lost. |
| Removing a link from header but not footer | Inconsistency confuses users. |
| Changing a URL in one place but not others | Broken links on pages that still reference the old URL. |
| Adding a new category without updating category pages | Filter dropdowns and category lists are out of sync. |
| Changing breadcrumb hierarchy without updating data store | Breadcrumbs show incorrect or broken parent links. |
| Using absolute paths for internal navigation | Breaks on local testing and preview deployments. |
| Duplicating navigation HTML in individual pages | Creates maintenance debt; updates become impossible. |
| Removing `aria-label` from `<nav>` elements | Screen reader users cannot identify navigation landmarks. |
| Changing link text without updating cross-references | Anchor text mismatch breaks contextual linking. |
| Adding navigation links inside `<head>` or outside `<body>` | Invalid HTML, unpredictable rendering. |

---

## 25. Recommended Testing Checklist Before Deployment

### Navigation Structure Checklist

- [ ] Header loads from `shared/header.html` into `#fns-header-mount`.
- [ ] Footer loads from `shared/footer.html` into `#fld-footer-mount`.
- [ ] All header navigation links have valid `href` values.
- [ ] All footer navigation links have valid `href` values.
- [ ] Header and footer service links match exactly (same labels, same URLs, same order).
- [ ] Active page is visually indicated in header navigation.
- [ ] Active page uses `aria-current="page"`.
- [ ] Dropdown menus have nested `<ul>` structures.
- [ ] Dropdown toggle has `aria-expanded` attribute.
- [ ] No orphan pages (every page linked from at least one other page).

### Mobile Navigation Checklist

- [ ] Hamburger menu visible on screens < 768px.
- [ ] Hamburger menu hidden on screens >= 768px.
- [ ] Mobile menu opens as an overlay.
- [ ] Mobile menu can be closed by Escape key.
- [ ] Mobile menu can be closed by clicking outside.
- [ ] Focus is trapped within the mobile menu when open.
- [ ] Mobile menu links are minimum 44px touch targets.
- [ ] Mobile menu does not require a page reload.

### Link Integrity Checklist

- [ ] All internal links use relative paths.
- [ ] All external links use `target="_blank" rel="noopener noreferrer"`.
- [ ] No broken internal links (run link checker).
- [ ] No `javascript:void(0)` or `#` placeholder links.
- [ ] No links to pages that do not exist.
- [ ] Blog articles link to at least one service page.
- [ ] Service pages link to relevant blog articles and portfolio projects.
- [ ] Portfolio projects link to services used.
- [ ] Breadcrumbs are present on all non-homepage pages.
- [ ] Breadcrumb current page uses `aria-current="page"` with no link.

### Accessibility Checklist

- [ ] All `<nav>` elements have `aria-label`.
- [ ] Keyboard navigation works through all navigation elements.
- [ ] Focus indicator is visible on all focusable navigation elements.
- [ ] Skip link is present at the top of every page.
- [ ] Mobile menu toggle has `aria-label` and `aria-expanded`.
- [ ] Colour is not the only indicator of active state.
- [ ] Touch targets are minimum 44x44px.
- [ ] Screen reader can identify current page in navigation.

### SEO Checklist

- [ ] Canonical URLs are absolute with `https://`.
- [ ] Breadcrumb JSON-LD schema is present on non-homepage pages.
- [ ] XML sitemap includes all new pages.
- [ ] URL slugs are descriptive and hyphenated.
- [ ] No duplicate content across similar navigation pages.

### Performance Checklist

- [ ] Navigation data loaded once per session (cached).
- [ ] Header and footer fetched in parallel.
- [ ] No render-blocking JS for navigation.
- [ ] Mobile menu toggle is CSS-only where possible.
- [ ] Navigation icons are SVG or inline (no extra requests).

---

## Document Summary

| # | Section | Purpose |
|---|---------|---------|
| 1 | Main navigation structure | Philosophy and primary sections. |
| 2 | Header navigation rules | Header structure, loading, accessibility. |
| 3 | Footer navigation rules | Footer structure, loading, legal links. |
| 4 | Future sidebar navigation | Context-aware sidebar strategy. |
| 5 | Internal linking architecture | Link categories, rules, cross-reference matrix. |
| 6 | Blog navigation | Category filters, pagination, TOC, related articles. |
| 7 | Service-page navigation | Service cards, cross-links, CTAs. |
| 8 | Portfolio navigation | Filters, breadcrumbs, service tags, related projects. |
| 9 | Marketplace category navigation (future) | Category tree, filters, breadcrumbs. |
| 10 | Dashboard navigation (future) | Role-based sidebar, notification badges. |
| 11 | URL structure standards | Patterns and rules for every page type. |
| 12 | Relative vs absolute paths | When to use each, path resolution table. |
| 13 | Breadcrumb strategy | Structure, rules, and JSON-LD schema. |
| 14 | Search integration | Site search behaviour and rules. |
| 15 | Mobile navigation | Hamburger menu, overlay, focus management. |
| 16 | Mega-menu strategy (future) | Category display in header. |
| 17 | Marketplace filtering (future) | Filter UI, URL params, mobile overlay. |
| 18 | Accessibility standards | Keyboard navigation, ARIA, focus management. |
| 19 | Performance considerations | Loading strategy, caching, parallel fetching. |
| 20 | Shared data-source strategy | Central `navigation-data.js` structure. |
| 21 | Centralized navigation parts | 10 non-negotiable centralized components. |
| 22 | Forbidden hardcoding list | 11 link types that must never be hard-coded. |
| 23 | Page registration | How new pages safely register in navigation. |
| 24 | AI-safe editing workflow | 12 rules and 10 danger-zone actions for AI editors. |
| 25 | Testing checklist | 30+ items across 5 categories before deployment. |

**This document must be read before any navigation change is made on the Furnostyles platform.**
