# Furnostyles Reusable Component Library System

**Date:** 2026-05-22 | **Scope:** Brand website, blog, services, portfolio, future marketplace and dashboards  
**Read this before creating any new page, component, or CSS class.**

---

## 1. Global Layout Components

### The `premium-layout` Wrapper

Every public page uses the same root layout structure.

```html
<div class="premium-layout">
  <main class="premium-main">
    <!-- Page-specific content goes here -->
  </main>
</div>
```

### Rules

| Rule | Requirement |
|------|-------------|
| Always use `premium-layout` as the outer wrapper on every page. | No page should skip this. |
| Always use `premium-main` for the primary content area. | Do not invent new wrapper names. |
| No inline styles on `premium-layout` or `premium-main`. | All styling comes from CSS. |
| No sidebar markup inside `premium-layout`. | Sidebar is a future concern, not current. |

### What `premium-layout` Controls

- Page max-width and horizontal centering
- Top padding to clear the fixed header
- Bottom padding to clear floating action buttons
- Minimum height to push the footer down

### What `premium-main` Controls

- Content width constraints
- Section spacing within the page
- Flexbox or grid behaviour for page-specific layouts

---

## 2. Header Component Architecture

### Structure

The header is a **shared, mounted component** loaded by JavaScript on every page. It must never be hard-coded into individual pages.

```html
<!-- Mount point (appears once per page, empty until JS loads) -->
<div id="fns-header-mount"></div>
```

### Header CSS Classes

| Class | Element | Purpose |
|-------|---------|---------|
| `premium-topbar` | Top thin bar | Promotions, phone number, trust badges |
| `premium-header` | Main header | Brand, navigation, search, actions |
| `premium-brand` | Logo link | Links to `index.html`. No inline styles. |
| `fld-youtube-search` | Search wrapper | Search input + button |
| `fld-icon-actions` | Action icons | Cart, alerts, account buttons |

### Header Rules

| Rule | Requirement |
|------|-------------|
| Header is loaded by JS, not copied into every HTML file. | Mount point only. |
| No inline styles on `premium-topbar`, `premium-header`, or `premium-brand`. | All styles in CSS. |
| All buttons must be properly closed. | Self-closing tags cause layout bugs. |
| Logo always links to `index.html`. | Consistent home navigation. |
| Search input + button inside `fld-youtube-search`. | Do not create new search markup. |
| Cart, alerts, account buttons inside `fld-icon-actions`. | Icon order: cart, alerts, account. |

### Header State Classes (Future)

```css
.premium-header--scrolled       /* Applied when user scrolls past 50px */
.premium-header--transparent    /* For hero-overlay pages */
```

---

## 3. Footer Component Architecture

### Structure

The footer is a **shared, mounted component** loaded by JavaScript on every page.

```html
<!-- Mount point -->
<div id="fld-footer-mount"></div>
```

### Footer CSS Classes

| Class | Element | Purpose |
|-------|---------|---------|
| `fld-commerce-footer` | Footer container | Full-width dark footer |
| `fld-footer-grid` | Grid wrapper | 4-column grid on desktop |
| `fld-footer-col` | Column | Services, company, resources, contact |
| `fld-footer-bottom` | Bottom bar | Copyright, legal links |

### Footer Rules

| Rule | Requirement |
|------|-------------|
| Footer is loaded by JS, not copied into pages. | Mount point only. |
| Copyright uses `&copy;` entity, not the symbol directly. | `&copy; 2026 Furnostyles` |
| All links use absolute paths (`/services.html`). | Prevents broken links on nested pages. |
| Social media links open in new tab with `rel="noopener noreferrer"`. | Security best practice. |
| Footer contains key page links: services, blog, portfolio, contact, about, marketplace (future). | Consistent navigation. |

---

## 4. Future Sidebar Component Strategy

### Current State

There is **no sidebar** on any public page. The `premium-layout` contains only `premium-main`.

```html
<!-- CURRENT: No sidebar -->
<div class="premium-layout">
  <main class="premium-main">
    <!-- Content only -->
  </main>
</div>

<!-- FUTURE: Sidebar added safely -->
<div class="premium-layout">
  <main class="premium-main">
    <!-- Content -->
  </main>
  <aside class="premium-sidebar" id="fns-sidebar-mount">
    <!-- Loaded by JS, not hard-coded -->
  </aside>
</div>
```

### Sidebar Rules (For When It Is Built)

| Rule | Requirement |
|------|-------------|
| Sidebar is optional, not required for any page to function. | Pages without a sidebar must look correct. |
| Sidebar is loaded by JS, not hard-coded into pages. | Use a mount point: `<aside id="fns-sidebar-mount"></aside>` |
| Sidebar CSS is in a separate file: `assets/css/sidebar.css`. | Do not mix sidebar styles into `style.css`. |
| Mobile: sidebar stacks below main content or becomes an off-canvas drawer. | Never squeeze content on mobile. |
| Sidebar content is contextual: related products, recent articles, service CTAs. | Not a repeat of the main navigation. |
| No sidebar on homepage, contact, or simple landing pages. | Only on blog, marketplace, and dashboard pages. |

---

## 5. Button Component System

### Button Hierarchy

| Class | Style | Usage |
|-------|-------|-------|
| `fns-btn` | Base button | Do not use alone. Extend with modifiers. |
| `fns-btn--primary` | Gold background, dark text | Main CTAs: "Request a Quote", "Shop Now" |
| `fns-btn--secondary` | Dark background, gold border | Secondary actions: "Learn More", "View Portfolio" |
| `fns-btn--ghost` | Transparent, gold text + border | Low-priority: "Read Article", "See Details" |
| `fns-btn--light` | White background, dark text | On dark backgrounds |

### Button Sizes

| Modifier | Size | Usage |
|----------|------|-------|
| `fns-btn--sm` | Small (padding 8px 16px, font 14px) | Inline actions, card buttons |
| `fns-btn--md` | Medium (padding 12px 24px, font 16px) | Default. Most CTAs. |
| `fns-btn--lg` | Large (padding 16px 32px, font 18px) | Hero CTAs, prominent actions |
| `fns-btn--full` | Full-width | Mobile forms, checkout buttons |

### Button Examples

```html
<!-- Primary CTA -->
<a href="contact.html" class="fns-btn fns-btn--primary fns-btn--lg">
  Request a Free Consultation
</a>

<!-- Secondary action -->
<a href="portfolio.html" class="fns-btn fns-btn--secondary fns-btn--md">
  View Our Portfolio
</a>

<!-- Ghost link -->
<a href="blogs/modern-luxury-interior-design-kenya.html" class="fns-btn fns-btn--ghost fns-btn--sm">
  Read the Full Guide
</a>

<!-- Light button on dark background -->
<a href="services.html" class="fns-btn fns-btn--light fns-btn--md">
  Explore Services
</a>
```

### Button Rules

| Rule | Requirement |
|------|-------------|
| Never use a bare `<button>` without a class. | Always include `fns-btn` + modifier. |
| CTA text is action-oriented. | "Get a Quote", "Book Now", "Shop Tiles" — not "Submit" or "Click Here". |
| Minimum touch target: 44px height. | Accessibility requirement. |
| Buttons have consistent border-radius. | Use `var(--fns-radius-md)` (8px) or `var(--fns-radius-lg)` (12px). |
| Disabled state uses `aria-disabled="true"` and visual opacity. | Not just `disabled` attribute alone. |
| Loading state adds `fns-btn--loading` with spinner. | Prevents double submission. |

---

## 6. Card Component System

### Base Card

```html
<div class="fns-card">
  <div class="fns-card__media">
    <img src="..." alt="..." loading="lazy">
  </div>
  <div class="fns-card__body">
    <h3 class="fns-card__title">Card Title</h3>
    <p class="fns-card__text">Card description text.</p>
    <div class="fns-card__actions">
      <a href="..." class="fns-btn fns-btn--ghost fns-btn--sm">Read More</a>
    </div>
  </div>
</div>
```

### Card Variants

| Modifier | Usage |
|----------|-------|
| `fns-card--article` | Blog article cards with category pill and date |
| `fns-card--service` | Service cards with icon and description |
| `fns-card--portfolio` | Portfolio cards with hover overlay |
| `fns-card--product` | Product cards with price and badge (future) |
| `fns-card--testimonial` | Testimonial cards with quote and avatar |
| `fns-card--featured` | Highlighted card with gold border and badge |

### Card Layout Patterns

```html
<!-- Grid of cards -->
<div class="fns-card-grid">
  <div class="fns-card">...</div>
  <div class="fns-card">...</div>
  <div class="fns-card">...</div>
</div>

<!-- Horizontal card -->
<div class="fns-card fns-card--horizontal">
  <div class="fns-card__media">...</div>
  <div class="fns-card__body">...</div>
</div>
```

### Card Rules

| Rule | Requirement |
|------|-------------|
| All cards use the same shadow and border-radius. | Consistency across the site. |
| Card images use `loading="lazy"` unless first card in first row. | Performance. |
| Card titles are `<h3>` inside a card grid, never `<h2>`. | Heading hierarchy. |
| Cards in a grid have equal heights. | Use `display: flex` on the grid. |
| Featured card gets `fns-card--featured` with visual distinction. | Gold border, "Featured" badge. |

---

## 7. Hero Section System

### Homepage Hero

```html
<section class="fns-hero">
  <div class="fns-hero__content">
    <h1 class="fns-hero__title">Transform Your Space with Furnostyles</h1>
    <p class="fns-hero__subtitle">
      Premium interior design, house finishing, and home repair services in Nairobi.
    </p>
    <div class="fns-hero__actions">
      <a href="contact.html" class="fns-btn fns-btn--primary fns-btn--lg">Get a Free Quote</a>
      <a href="portfolio.html" class="fns-btn fns-btn--secondary fns-btn--lg">View Our Work</a>
    </div>
  </div>
  <div class="fns-hero__media">
    <img src="assets/images/heroes/hero-homepage.jpg" alt="..." fetchpriority="high">
  </div>
</section>
```

### Blog Hero

```html
<header class="fns-blog-hero">
  <div class="fns-blog-hero__content">
    <span class="fns-pill">Interior Design</span>
    <h1 class="fns-blog-hero__title">Modern Luxury Interior Design Trends in Kenya 2026</h1>
    <p class="fns-blog-hero__meta">
      <time datetime="2026-05-22">May 22, 2026</time>
      <span class="fns-dot"></span>
      <span class="fns-reading-time">8 min read</span>
    </p>
  </div>
  <div class="fns-blog-hero__media">
    <img src="assets/images/blogs/blog-1-hero.jpg" alt="...">
  </div>
</header>
```

### Hero Rules

| Rule | Requirement |
|------|-------------|
| Every page has exactly one hero section. | Consistent entry point for users. |
| Hero H1 contains the primary keyword. | SEO critical. |
| Hero image is the LCP element and uses `fetchpriority="high"`. | Performance. |
| Hero image is under 300KB with WebP + JPEG fallback. | Speed. |
| Hero has a clear CTA on the homepage and service pages. | Conversion. |
| Blog hero has category pill, title, and meta line. | Blog-specific structure. |
| Hero text has safe zone (centre 60% of image) for overlay legibility. | Design. |

---

## 8. CTA Section System

### Inline Blog CTA

```html
<section class="fns-blog-cta">
  <h3 class="fns-blog-cta__title">Ready to Transform Your Home?</h3>
  <p class="fns-blog-cta__text">
    Book a free consultation with our Nairobi interior designers and start your project today.
  </p>
  <div class="fns-blog-cta__actions">
    <a href="contact.html" class="fns-btn fns-btn--primary fns-btn--md">Book a Consultation</a>
    <a href="services.html" class="fns-btn fns-btn--ghost fns-btn--md">Explore Services</a>
  </div>
</section>
```

### Standalone CTA Box

```html
<section class="fns-cta-box">
  <div class="fns-cta-box__content">
    <h2 class="fns-cta-box__title">Get Your Free Design Quote</h2>
    <p class="fns-cta-box__text">
      Tell us about your project and receive a detailed quote within 24 hours.
    </p>
    <a href="contact.html" class="fns-btn fns-btn--primary fns-btn--lg">Request a Quote</a>
  </div>
</section>
```

### CTA Rules

| Rule | Requirement |
|------|-------------|
| Every blog article ends with a CTA to a service or contact page. | Conversion from content. |
| Every service page has a CTA near the top and bottom. | Capture leads at any scroll position. |
| CTA text is specific, not generic. | "Book a Free Consultation" not "Contact Us". |
| Primary CTA is visually dominant. | Larger button, contrasting colour. |
| Secondary CTA is lower visual priority. | Ghost or secondary button style. |
| CTA sections use `fns-section-dark` for visual contrast. | Gold and dark theme. |

---

## 9. Form Component System

### Text Input

```html
<div class="fns-form-group">
  <label class="fns-form-label" for="fullName">Full Name</label>
  <input type="text" id="fullName" name="fullName" class="fns-form-input" placeholder="John Doe" required>
</div>
```

### Textarea

```html
<div class="fns-form-group">
  <label class="fns-form-label" for="message">Project Details</label>
  <textarea id="message" name="message" class="fns-form-input fns-form-input--textarea" rows="5"
    placeholder="Describe your project..."></textarea>
</div>
```

### Select / Dropdown

```html
<div class="fns-form-group">
  <label class="fns-form-label" for="serviceType">Service Type</label>
  <select id="serviceType" name="serviceType" class="fns-form-input fns-form-input--select">
    <option value="">Select a service</option>
    <option value="interior-design">Interior Design</option>
    <option value="house-finishing">House Finishing</option>
    <option value="repairs">Furniture Repairs</option>
  </select>
</div>
```

### Checkbox

```html
<div class="fns-form-group">
  <label class="fns-form-check">
    <input type="checkbox" name="newsletter" class="fns-form-check__input">
    <span class="fns-form-check__label">Subscribe to our newsletter</span>
  </label>
</div>
```

### Form Rules

| Rule | Requirement |
|------|-------------|
| Every input has a `<label>` with matching `for` attribute. | Accessibility. |
| Required fields use the `required` attribute. | HTML5 validation. |
| Error states add `fns-form-input--error` and an error message. | Visual feedback. |
| Form inputs have 44px minimum height. | Touch target accessibility. |
| Form submits via `fetch` or `XMLHttpRequest`, not full page reload. | Smooth UX. |
| Submit button shows loading state during submission. | Prevents double submission. |
| Success message replaces the form or appears below it. | Clear confirmation. |
| Form data is validated client-side and server-side. | Security. |

---

## 10. Blog Component System

### Article Layout

```html
<article class="fns-blog-article">
  <header class="fns-blog-hero">...</header>

  <div class="fns-blog-layout fns-blog-layout--no-sidebar">
    <div class="fns-blog-content">
      <!-- Article content -->
    </div>
  </div>
</article>
```

### Table of Contents

```html
<nav class="fns-blog-toc" aria-label="Table of Contents">
  <h2 class="fns-blog-toc__title">Contents</h2>
  <ul class="fns-blog-toc__list">
    <li><a href="#why-interior-design-matters" class="fns-blog-toc__link">Why Interior Design Matters</a></li>
    <li><a href="#top-5-trends" class="fns-blog-toc__link">Top 5 Interior Design Trends</a></li>
    <li><a href="#faq" class="fns-blog-toc__link">Frequently Asked Questions</a></li>
  </ul>
</nav>
```

### Content Blocks

| Class | Usage |
|-------|-------|
| `fns-blog-section` | Major content sections |
| `fns-blog-heading` | Section headings (styled H2/H3) |
| `fns-blog-list` | Styled ordered/unordered lists |
| `fns-blog-image` | Inline article images with captions |
| `fns-blog-quote` | Pull quotes |
| `fns-blog-cta` | Inline call-to-action sections |
| `fns-faq-item` | FAQ accordion items |

### Blog Rules

| Rule | Requirement |
|------|-------------|
| Blog layout uses `fns-blog-layout--no-sidebar`. | Current design has no sidebar. |
| TOC links use IDs matching H2 text (kebab-case). | `id="why-interior-design-matters"` |
| TOC link highlighting is handled by `blog.js`. | Do not add custom highlight logic. |
| Every image has a caption using `fns-blog-image__caption`. | Context for readers and SEO. |
| FAQ items use `<details>` and `<summary>`. | Native accordion, no JS dependency. |
| Reading time is calculated and displayed in the hero. | `blog.js` handles this automatically. |

---

## 11. Service Card System

### Service Card

```html
<div class="fns-card fns-card--service">
  <div class="fns-card__icon">
    <img src="assets/icons/service-interior-design.svg" alt="Interior Design Icon" width="48" height="48">
  </div>
  <h3 class="fns-card__title">Interior Design</h3>
  <p class="fns-card__text">
    Complete interior design services for homes, offices, and commercial spaces in Nairobi.
  </p>
  <a href="interior-design-nairobi.html" class="fns-btn fns-btn--ghost fns-btn--sm">Learn More</a>
</div>
```

### Service Grid

```html
<section class="fns-section">
  <div class="fns-section-header">
    <h2>Our Services</h2>
    <p>Comprehensive interior solutions for every space.</p>
  </div>
  <div class="fns-card-grid fns-card-grid--3">
    <div class="fns-card fns-card--service">...</div>
    <div class="fns-card fns-card--service">...</div>
    <div class="fns-card fns-card--service">...</div>
  </div>
</section>
```

### Service Card Rules

| Rule | Requirement |
|------|-------------|
| Service cards link to their dedicated service page. | Every card is clickable to more detail. |
| Service cards have a consistent icon style. | Line icons, 48x48px, monochrome or gold. |
| Service card grid uses `fns-card-grid--3` on desktop. | 3 columns for services. |
| Service card grid stacks to 1 column on mobile. | Responsive. |
| Service pages use the same card component for "Related Services". | Reuse, do not rebuild. |

---

## 12. Portfolio Card System

### Portfolio Card

```html
<div class="fns-card fns-card--portfolio">
  <div class="fns-card__media">
    <img src="assets/images/portfolio/portfolio-living-room-kilimani-01.jpg"
         alt="Modern living room after renovation by Furnostyles in Kilimani, Nairobi"
         loading="lazy">
    <div class="fns-card__overlay">
      <span class="fns-card__location">Kilimani, Nairobi</span>
      <h3 class="fns-card__title">Modern Living Room Renovation</h3>
    </div>
  </div>
</div>
```

### Portfolio Grid

```html
<div class="fns-portfolio-grid">
  <div class="fns-card fns-card--portfolio">...</div>
  <div class="fns-card fns-card--portfolio fns-card--portfolio--wide">...</div>
  <div class="fns-card fns-card--portfolio">...</div>
</div>
```

### Portfolio Card Rules

| Rule | Requirement |
|------|-------------|
| Portfolio images show real work, not stock photos. | Authenticity builds trust. |
| Portfolio cards have a hover overlay with project name and location. | Interactive discovery. |
| Portfolio grid supports mixed sizes with `--wide` and `--tall` modifiers. | Visual interest. |
| Portfolio cards link to the project detail or a lightbox gallery. | Deeper exploration. |
| Alt text includes location. | "Modern living room after renovation... in Kilimani, Nairobi" |

---

## 13. Future Marketplace Product Card System

### Product Card (Future)

```html
<div class="fns-card fns-card--product" data-product-id="FLR-001">
  <div class="fns-card__badge fns-card__badge--new">New</div>
  <div class="fns-card__media">
    <img src="assets/images/products/product-porcelain-tile-thumb.jpg"
         alt="Porcelain Floor Tile 60x60 Grey"
         loading="lazy">
  </div>
  <div class="fns-card__body">
    <span class="fns-card__category">Floor Tiles</span>
    <h3 class="fns-card__title">Porcelain Floor Tile 60x60 Grey</h3>
    <div class="fns-card__rating">
      <span class="fns-stars" data-rating="4.5"></span>
      <span class="fns-card__reviews">(12 reviews)</span>
    </div>
    <div class="fns-card__price">
      <span class="fns-card__price-current">KES 1,200</span>
      <span class="fns-card__price-old">KES 1,500</span>
    </div>
    <div class="fns-card__actions">
      <button class="fns-btn fns-btn--primary fns-btn--sm fns-btn--full">Add to Cart</button>
    </div>
  </div>
</div>
```

### Product Card Modifiers

| Modifier | Usage |
|----------|-------|
| `fns-card__badge--new` | Recently added products |
| `fns-card__badge--sale` | Discounted products |
| `fns-card__badge--bestseller` | Popular products |
| `fns-card__badge--out-of-stock` | Currently unavailable |

### Product Card Rules (Future)

| Rule | Requirement |
|------|-------------|
| Product card uses the same base `fns-card` as blog and service cards. | Consistent foundation. |
| Product cards have `data-product-id` for cart interactions. | JavaScript targeting. |
| Price always includes currency (KES) and uses comma separators. | Clarity for Kenyan users. |
| "Add to Cart" uses a button, not a link. | Action, not navigation. |
| Out-of-stock cards are visually muted and button is disabled. | Clear state. |
| Product cards link to product detail page (click on title or image). | Navigation + action separation. |
| Product grid uses `fns-card-grid--4` on desktop. | 4 columns for marketplace. |
| Product grid uses `fns-card-grid--2` on tablet, 1 column on mobile. | Responsive. |

---

## 14. Future Dashboard UI System

### Dashboard Layout (Future)

```html
<div class="fns-dashboard">
  <aside class="fns-dashboard__sidebar">
    <nav class="fns-dashboard__nav">...</nav>
  </aside>
  <main class="fns-dashboard__main">
    <header class="fns-dashboard__header">...</header>
    <div class="fns-dashboard__content">...</div>
  </main>
</div>
```

### Dashboard Components (Future)

| Component | Class | Usage |
|-----------|-------|-------|
| Stats card | `fns-stat-card` | Revenue, orders, users |
| Data table | `fns-data-table` | Order lists, product lists |
| Pagination | `fns-pagination` | Table navigation |
| Filter bar | `fns-filter-bar` | Search, sort, filter controls |
| Status badge | `fns-status-badge` | Pending, completed, cancelled |
| Chart container | `fns-chart` | Sales charts, traffic graphs |
| Activity feed | `fns-activity-feed` | Recent actions, notifications |

### Dashboard Rules (Future)

| Rule | Requirement |
|------|-------------|
| Dashboard CSS is in a separate file: `assets/css/dashboard.css`. | Do not mix with public site CSS. |
| Dashboard layout is fixed sidebar with scrollable main area. | Standard admin pattern. |
| Dashboard uses a lighter colour scheme (white backgrounds, grey borders). | Different from the brand site. |
| Dashboard components do not appear on public pages. | Separation of concerns. |
| Dashboard forms use the same `fns-form-*` classes as public forms. | Reuse where possible. |
| Dashboard tables are responsive with horizontal scroll on mobile. | Do not squish data. |

---

## 15. Modal / Popup Strategy

### Modal Structure

```html
<div class="fns-modal" id="quoteModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" hidden>
  <div class="fns-modal__overlay" data-modal-close></div>
  <div class="fns-modal__content">
    <header class="fns-modal__header">
      <h2 id="modalTitle" class="fns-modal__title">Request a Quote</h2>
      <button class="fns-modal__close" data-modal-close aria-label="Close modal">&times;</button>
    </header>
    <div class="fns-modal__body">
      <!-- Form or content -->
    </div>
  </div>
</div>
```

### Modal Rules

| Rule | Requirement |
|------|-------------|
| Modals use `role="dialog"` and `aria-modal="true"`. | Accessibility. |
| Modal has a visible close button and closes on Escape key. | Keyboard accessibility. |
| Modal has an overlay that also closes the modal when clicked. | Intuitive UX. |
| Focus is trapped inside the modal when open. | Accessibility. |
| Focus returns to the trigger element when modal closes. | Accessibility. |
| Modal is hidden by default (`hidden` attribute) and shown via JS. | No flash on load. |
| Body scroll is locked when modal is open. | Prevent background scrolling. |
| Modals are used sparingly. | Do not replace page navigation with modals. |

### When to Use Modals

| Use Case | Example |
|----------|---------|
| Quick quote form | "Request a Quote" button opens a modal with a short form. |
| Image gallery lightbox | Portfolio image opens in a modal at full resolution. |
| Terms acceptance | Marketplace checkout requires accepting terms. |
| Confirmation dialog | "Are you sure you want to delete this?" |

### When NOT to Use Modals

| Avoid | Use Instead |
|-------|-------------|
| Full page content | A dedicated page |
| Blog articles | A dedicated blog page |
| Service details | A dedicated service page |
| Product details | A dedicated product page |
| Checkout flow | A dedicated checkout page |

---

## 16. Notification / Alert Strategy

### Toast Notification

```html
<div class="fns-toast fns-toast--success" role="alert" aria-live="polite">
  <span class="fns-toast__icon">&#10003;</span>
  <span class="fns-toast__message">Your quote request has been sent successfully.</span>
  <button class="fns-toast__close" aria-label="Dismiss notification">&times;</button>
</div>
```

### Inline Alert

```html
<div class="fns-alert fns-alert--info" role="alert">
  <span class="fns-alert__icon">&#9432;</span>
  <p class="fns-alert__text">Free consultations are available for projects over KES 100,000.</p>
</div>
```

### Alert Types

| Modifier | Colour | Usage |
|----------|--------|-------|
| `fns-alert--info` | Blue / petrol | Informational messages |
| `fns-alert--success` | Green / gold | Confirmation, success |
| `fns-alert--warning` | Amber / orange | Caution, important notice |
| `fns-alert--error` | Red / crimson | Error, failure, validation issues |

### Notification Rules

| Rule | Requirement |
|------|-------------|
| Toasts appear at the top-right of the viewport. | Standard position. |
| Toasts auto-dismiss after 5 seconds unless hovered. | Do not require manual dismissal. |
| Toasts stack (newest on top, older pushed down). | Multiple notifications. |
| Inline alerts stay until the user dismisses them or the condition changes. | Persistent context. |
| All alerts use `role="alert"` and `aria-live="polite"`. | Screen reader announcements. |
| Error alerts include what went wrong and how to fix it. | Actionable messages. |
| Success toasts after form submission confirm the action. | User feedback. |

---

## 17. Responsive Component Behavior

### Breakpoints

| Name | Width | Target |
|------|-------|--------|
| `xs` | < 480px | Small mobile phones |
| `sm` | 480-767px | Large mobile phones |
| `md` | 768-991px | Tablets |
| `lg` | 992-1199px | Small laptops |
| `xl` | 1200px+ | Desktops and large screens |

### CSS Custom Properties for Breakpoints

```css
:root {
  --fns-bp-sm: 480px;
  --fns-bp-md: 768px;
  --fns-bp-lg: 992px;
  --fns-bp-xl: 1200px;
}
```

### Responsive Patterns

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Card grid | 3-4 columns | 2 columns | 1 column |
| Hero | Side-by-side text + image | Stacked, image first | Stacked, image first, smaller text |
| Blog layout | Full-width content (no sidebar) | Full-width | Full-width |
| Service cards | 3 columns | 2 columns | 1 column, full-width |
| Portfolio grid | 3 columns, mixed sizes | 2 columns | 1 column |
| Footer grid | 4 columns | 2 columns | 1 column |
| Navigation | Horizontal links | Hamburger menu | Hamburger menu |
| CTA buttons | Side-by-side | Stacked, full-width | Stacked, full-width |
| Forms | 2-column layout | 2-column | 1 column |

### Responsive Rules

| Rule | Requirement |
|------|-------------|
| Mobile-first CSS. | Base styles for mobile, use `min-width` media queries to add complexity. |
| No `px` units for font sizes on mobile. | Use `rem` or CSS variables for accessibility. |
| Touch targets minimum 44x44px. | Buttons, links, form inputs. |
| No horizontal scroll on any page. | Content must fit the viewport. |
| Images scale proportionally. | `max-width: 100%; height: auto;` |
| Tables become horizontal scroll or card-based on mobile. | Never squish table columns. |

---

## 18. Hover / Animation Standards

### Transition Tokens

```css
:root {
  --fns-transition-fast: 150ms ease;
  --fns-transition-base: 250ms ease;
  --fns-transition-slow: 400ms ease;
}
```

### Hover Patterns

| Element | Hover Effect | Duration |
|---------|-------------|----------|
| Buttons | Background darkens/lightens, slight scale(1.02) | 150ms |
| Cards | translateY(-4px), shadow increases | 250ms |
| Links | Underline appears, colour shifts to gold | 150ms |
| Portfolio images | Overlay fades in, text slides up | 250ms |
| Navigation links | Underline from left to right | 200ms |
| Icons | Slight scale(1.1), colour shift | 150ms |

### Animation Rules

| Rule | Requirement |
|------|-------------|
| Use `transform` and `opacity` for animations. | GPU-accelerated, does not trigger layout reflow. |
| Avoid animating `width`, `height`, `top`, `left`. | These trigger layout recalculation and hurt performance. |
| All animations respect `prefers-reduced-motion`. | Disable animations for users who prefer reduced motion. |
| Loading spinners use CSS animation, not GIFs. | Smaller file size, crisp at any size. |
| No parallax effects. | They hurt performance and cause accessibility issues. |
| Stagger animations for card grids (appear one by one on scroll). | Max 50ms delay between items. |

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 19. Typography Component Standards

### Type Scale

| Class | Font Size | Line Height | Usage |
|-------|-----------|-------------|-------|
| `fns-text-display` | 48px / 3rem | 1.1 | Hero titles (desktop) |
| `fns-text-h1` | 36px / 2.25rem | 1.2 | Page H1s |
| `fns-text-h2` | 28px / 1.75rem | 1.3 | Section titles |
| `fns-text-h3` | 22px / 1.375rem | 1.4 | Card titles, subsection headings |
| `fns-text-h4` | 18px / 1.125rem | 1.5 | Minor headings |
| `fns-text-body-lg` | 18px / 1.125rem | 1.7 | Lead paragraphs |
| `fns-text-body` | 16px / 1rem | 1.7 | Body text |
| `fns-text-body-sm` | 14px / 0.875rem | 1.6 | Captions, meta text |
| `fns-text-caption` | 12px / 0.75rem | 1.5 | Labels, timestamps |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `var(--fns-weight-normal)` | 400 | Body text |
| `var(--fns-weight-medium)` | 500 | Emphasis, labels |
| `var(--fns-weight-bold)` | 700 | Headings, buttons |

### Typography Rules

| Rule | Requirement |
|------|-------------|
| Use `rem` units for all font sizes. | Accessibility: respects user browser settings. |
| Maximum 2 font families on the site. | One for headings, one for body (or the same for both). |
| Body text is minimum 16px. | Readability standard. |
| Line height is 1.5-1.7 for body text. | Comfortable reading. |
| Headings use tighter line height (1.1-1.3). | Visual impact. |
| Text colour uses CSS variables, not hard-coded hex. | Consistent theming. |

---

## 20. Color Usage Rules

### Brand Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--fns-gold-primary` | `#D4AF37` | Primary buttons, accents, highlights |
| `--fns-gold-light` | `#E8C84A` | Hover states, gradients |
| `--fns-gold-dark` | `#B8962E` | Active states, borders |
| `--fns-petrol-dark` | `#1A3A3A` | Dark sections, header, footer |
| `--fns-petrol-mid` | `#2A5A5A` | Secondary dark elements |
| `--fns-grey-dark` | `#333333` | Primary text |
| `--fns-grey-mid` | `#666666` | Secondary text |
| `--fns-grey-light` | `#F5F5F5` | Light backgrounds |
| `--fns-white` | `#FFFFFF` | Page background, card backgrounds |
| `--fns-black` | `#000000` | Maximum contrast |

### Semantic Colours

| Token | Value | Usage |
|-------|-------|-------|
| `--fns-success` | `#28A745` | Success messages, confirmations |
| `--fns-warning` | `#FFC107` | Warnings, cautions |
| `--fns-error` | `#DC3545` | Errors, validation failures |
| `--fns-info` | `#17A2B8` | Informational messages |

### Colour Rules

| Rule | Requirement |
|------|-------------|
| Always use CSS variables, never hard-coded hex codes in component CSS. | Theming and consistency. |
| Text on dark backgrounds uses `var(--fns-white)` or `var(--fns-text-light)`. | Readability. |
| Text on light backgrounds uses `var(--fns-grey-dark)`. | Readability. |
| Gold text on dark backgrounds only. | Gold on white has poor contrast. |
| Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text. | WCAG AA compliance. |
| Interactive elements have visible focus states. | Outline or background change on focus. |
| Disabled elements use reduced opacity (0.5) plus `cursor: not-allowed`. | Clear state. |

---

## 21. Spacing System

### Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--fns-spacing-xs` | 4px | Tight gaps, icon margins |
| `--fns-spacing-sm` | 8px | Inline spacing, small gaps |
| `--fns-spacing-md` | 16px | Default padding, card gaps |
| `--fns-spacing-lg` | 24px | Section gaps, card padding |
| `--fns-spacing-xl` | 32px | Section padding, grid gaps |
| `--fns-spacing-2xl` | 48px | Major section margins |
| `--fns-spacing-3xl` | 64px | Hero padding, large section margins |
| `--fns-spacing-4xl` | 96px | Page-level vertical padding |

### Spacing Rules

| Rule | Requirement |
|------|-------------|
| Use spacing tokens, not arbitrary pixel values. | Consistent rhythm across the site. |
| Vertical spacing between sections is at least `--fns-spacing-xl`. | Clear visual separation. |
| Card internal padding is `--fns-spacing-md` to `--fns-spacing-lg`. | Comfortable content breathing room. |
| Grid gaps use `--fns-spacing-md` or `--fns-spacing-lg`. | Consistent card spacing. |
| No margin or padding larger than `--fns-spacing-4xl`. | If you need more, reconsider the layout. |
| Component margin is applied at the parent level, not inside the component. | Prevents margin collapsing issues. |

---

## 22. Grid System

### CSS Grid Patterns

```css
/* 3-column grid for services */
.fns-card-grid--3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--fns-spacing-lg);
}

/* 4-column grid for products (future) */
.fns-card-grid--4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--fns-spacing-md);
}

/* Auto-fill grid for blog cards */
.fns-card-grid--auto {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--fns-spacing-lg);
}
```

### Flexbox Patterns

```css
/* Horizontal alignment */
.fns-flex-row {
  display: flex;
  align-items: center;
  gap: var(--fns-spacing-md);
}

/* Vertical stack */
.fns-flex-col {
  display: flex;
  flex-direction: column;
  gap: var(--fns-spacing-md);
}

/* Space between */
.fns-flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Centered */
.fns-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Grid Rules

| Rule | Requirement |
|------|-------------|
| Use CSS Grid for card grids and page layouts. | Two-dimensional control. |
| Use Flexbox for component internals (buttons in a row, form labels + inputs). | One-dimensional control. |
| Grid columns should not go below 280px minimum for card grids. | Prevent squished cards. |
| Grid gaps use spacing tokens, not `margin` on children. | Cleaner CSS. |
| All grids are responsive with media queries for tablet and mobile. | No broken layouts. |

---

## 23. Accessibility / Component Usability Rules

### WCAG 2.1 AA Compliance

| Principle | Requirement |
|-----------|-------------|
| Perceivable | Text alternatives for images, captions for media, colour not the only means of conveying info. |
| Operable | All functionality available via keyboard, no time limits, skip links for navigation. |
| Understandable | Readable text, predictable navigation, error prevention and correction. |
| Robust | Compatible with assistive technologies, valid HTML. |

### Accessibility Checklist for Components

- [ ] All images have `alt` text. Decorative images use `alt=""`.
- [ ] All form inputs have `<label>` elements.
- [ ] All interactive elements are keyboard-focusable. (`<button>`, `<a>`, `<input>`, not `<div onclick>`).
- [ ] Focus order is logical (top to bottom, left to right).
- [ ] Focus indicators are visible (outline or background change).
- [ ] Colour contrast is 4.5:1 minimum for normal text.
- [ ] Font size is resizable (use `rem`, not `px` for text).
- [ ] Animations respect `prefers-reduced-motion`.
- [ ] ARIA roles and labels are used where native semantics are insufficient.
- [ ] Skip navigation link is present on every page (`<a href="#main-content">Skip to content</a>`).
- [ ] Language attribute is set on `<html>`: `<html lang="en">`.

### ARIA Usage Guide

| Use ARIA When | Do Not Use ARIA When |
|---------------|----------------------|
| Custom components without native HTML equivalents (tabs, modals) | Native elements already convey meaning (`<button>`, `<nav>`, `<main>`) |
| Announcing dynamic content updates | Just for styling |
| Describing complex widget relationships | As a substitute for semantic HTML |

---

## 24. Reusable JS Interaction Rules

### Mount Pattern

Shared components are loaded into mount points rather than hard-coded:

```javascript
// Header mount
function mountHeader() {
  const mount = document.getElementById('fns-header-mount');
  if (!mount) return;
  mount.innerHTML = renderHeader();
}

// Footer mount
function mountFooter() {
  const mount = document.getElementById('fld-footer-mount');
  if (!mount) return;
  mount.innerHTML = renderFooter();
}
```

### Data Attribute Hooks

Use `data-*` attributes for JavaScript targeting, not CSS classes:

```html
<button class="fns-btn fns-btn--primary" data-modal-open="quoteModal">
  Request a Quote
</button>

<button class="fns-btn fns-btn--ghost" data-accordion-toggle>
  Show Details
</button>
```

```javascript
// Event delegation for data attributes
document.addEventListener('click', function(e) {
  const modalTrigger = e.target.closest('[data-modal-open]');
  if (modalTrigger) {
    openModal(modalTrigger.dataset.modalOpen);
  }

  const accordionTrigger = e.target.closest('[data-accordion-toggle]');
  if (accordionTrigger) {
    toggleAccordion(accordionTrigger);
  }
});
```

### JS Component Rules

| Rule | Requirement |
|------|-------------|
| All scripts use `defer`. | Non-blocking page render. |
| Feature detection before using modern APIs. | Check `if ('IntersectionObserver' in window)` before using it. |
| Graceful degradation. | If JS fails, the page still works (forms submit, navigation works). |
| No inline JavaScript. | All JS is in external files. |
| Event delegation for dynamic elements. | Attach listeners to parent, not individual elements. |
| Throttle scroll and resize events. | Use `requestAnimationFrame` or debounce (100ms minimum). |
| Store user preferences in `localStorage` (theme, saved articles). | Persistent UX. |
| Never store sensitive data in `localStorage`. | Security. |

---

## 25. Component Naming Conventions

### BEM-Inspired Naming

Furnostyles uses a modified BEM (Block Element Modifier) naming convention:

```
[block]__[element]--[modifier]

fns-card              (block)
fns-card__title       (element)
fns-card--featured    (modifier)
fns-card__media--wide (element with modifier)
```

### Naming Rules

| Rule | Requirement | Example |
|------|-------------|---------|
| Prefix all classes with `fns-`. | Prevents collisions with third-party CSS. | `fns-btn`, `fns-card` |
| Use double underscore `__` for elements. | Clear parent-child relationship. | `fns-card__title` |
| Use double dash `--` for modifiers. | Clear variant indication. | `fns-btn--primary` |
| All lowercase, hyphens only. | No camelCase, no underscores (except BEM separators). | `fns-blog-hero` |
| No IDs for styling. | IDs have high specificity and are hard to override. | Use classes only. |
| No generic class names. | `.container`, `.wrapper`, `.box` are forbidden. | Use `.fns-container`, `.fns-hero-wrapper`. |
| JavaScript hooks use `data-*` attributes, not classes. | Separation of concerns. | `data-modal-open="id"` |

### Forbidden Class Names

Never use these on any page:

```css
/* Too generic — will collide */
.container, .wrapper, .box, .item, .title, .text, .button

/* Too vague */
.left, .right, .center, .clear, .hidden

/* Framework collisions */
.row, .col, .col-*, .span-*, .pull-*, .push-*
```

---

## 26. Component Folder Structure

### Current Structure

```
furnostyles-clean-rebuild/
├── assets/
│   ├── css/
│   │   ├── style.css              # Global styles, variables, layout, header, footer
│   │   ├── blog.css               # Blog-specific styles (hero, content, TOC, FAQ)
│   │   └── (future) sidebar.css   # Sidebar styles (when built)
│   │   └── (future) dashboard.css # Dashboard styles (when built)
│   ├── js/
│   │   ├── main.js                # Shared: header mount, footer mount, navigation, cart float
│   │   ├── blog.js                # Blog-specific: TOC, reading time, FAQ, lazy images
│   │   ├── article-data.js        # Centralized article metadata store
│   │   └── article-utils.js       # Reusable article rendering utilities
│   ├── images/
│   │   ├── heroes/                # Homepage, service, portfolio hero images
│   │   ├── blogs/                 # Blog article images
│   │   ├── portfolio/             # Portfolio project images
│   │   ├── services/              # Service page images
│   │   ├── icons/                 # SVG icons for service cards, UI elements
│   │   ├── logos/                 # Brand logos (dark, light, favicon)
│   │   └── placeholders/          # Placeholder images (temporary only)
│   └── fonts/                     # (future) Custom font files if needed
├── blogs/
│   ├── article-data.js            # Centralized article metadata
│   ├── article-utils.js           # Reusable article rendering functions
│   ├── blogs.html                 # Blog listing page
│   └── [article-slug].html        # Individual blog articles
├── shared/                        # (future) Firebase config, auth bridges, upload bridges
├── docs/                          # Architecture and planning documents
└── index.html                     # Homepage
```

### CSS File Strategy

| File | Scope | Rules |
|------|-------|-------|
| `style.css` | Global | Variables, reset, layout, header, footer, buttons, cards, forms, hero, sections. No page-specific styles. |
| `blog.css` | Blog only | Article layout, TOC, content blocks, images, quotes, CTAs, FAQ. Load only on blog pages. |
| `sidebar.css` (future) | Sidebar only | Sidebar layout, widgets, filters. Load only on pages with sidebar. |
| `dashboard.css` (future) | Dashboard only | Tables, charts, stat cards, navigation. Completely separate from public site. |
| `marketplace.css` (future) | Marketplace only | Product cards, filters, checkout UI. Load only on marketplace pages. |

### Rules

| Rule | Requirement |
|------|-------------|
| One CSS file per major feature area. | Do not put all styles in one file. |
| Page-specific CSS is loaded via `<link>` in the page `<head>`. | Blog articles load `blog.css`. Dashboard loads `dashboard.css`. |
| Global CSS (`style.css`) is loaded on every page. | Consistent foundation. |
| No inline styles in HTML. | All styling in CSS files. |
| Component CSS is grouped by component, not by page. | If a card style is needed on the blog and the marketplace, it lives in the global CSS. |

---

## 27. How Future AI Edits Should Safely Modify Components

### AI Component Editing Rules

When using AI to edit or create components, follow these safety rules:

| Rule | Requirement |
|------|-------------|
| **AI must read this document first** before creating any new component. | Consistency over creativity. |
| **AI must check for existing classes** before creating new ones. | Search `style.css` and `blog.css` for similar patterns. |
| **AI must use the existing CSS variable system.** | No hard-coded colours or spacing values. |
| **AI must not create generic class names.** | No `.container`, `.wrapper`, `.box`. Use `fns-` prefix. |
| **AI must not duplicate existing components.** | If a card component exists, extend it with a modifier. Do not create a second card system. |
| **AI must not modify `style.css` without understanding the cascade.** | Global CSS changes affect every page. |
| **AI must preserve the mount pattern** for header and footer. | Do not hard-code header HTML into new pages. |
| **AI must not add inline styles.** | All styles belong in CSS files. |
| **AI must preserve heading hierarchy.** | Do not change `<h1>` to `<h2>` or skip levels. |
| **AI must test components in context.** | A component that looks good alone may break the page layout. |
| **AI must not remove accessibility attributes.** | `alt`, `aria-*`, `role`, `label` must be preserved. |
| **AI must not change existing URLs or slugs** without creating a redirect. | SEO and link integrity. |

### AI Component Creation Checklist

Before creating a new component, AI must confirm:

- [ ] A similar component does not already exist.
- [ ] The component uses `fns-` prefix naming.
- [ ] The component uses existing CSS variables for colours and spacing.
- [ ] The component is documented with HTML example and usage rules.
- [ ] The component is responsive (mobile, tablet, desktop).
- [ ] The component is accessible (keyboard, screen reader, contrast).
- [ ] The component does not duplicate layout logic from `premium-layout` or `premium-main`.
- [ ] The component is added to this document in the correct section.

---

## 28. Which Components Must Remain Centralized

### Non-Negotiable Centralized Components

These components are loaded once and shared across all pages. They must never be copied into individual pages.

| Component | Mount Point | CSS File | Why Centralized |
|-----------|-------------|----------|-----------------|
| **Header** | `#fns-header-mount` | `style.css` | Consistent navigation, search, and actions on every page. |
| **Footer** | `#fld-footer-mount` | `style.css` | Consistent links, copyright, and social media on every page. |
| **Cart float** | Hard-coded after `premium-layout` | `style.css` | Persistent cart access from any page. |
| **Chat float** | Hard-coded after `premium-layout` | `style.css` | Persistent WhatsApp access from any page. |
| **CSS variables** | `:root` in `style.css` | `style.css` | Single source of truth for colours, spacing, fonts, breakpoints. |
| **Base typography** | `style.css` | `style.css` | Consistent font sizes, line heights, and heading styles. |
| **Button system** | `style.css` | `style.css` | All buttons use the same base styles and modifiers. |
| **Card base** | `style.css` | `style.css` | All cards share the same shadow, radius, and padding. |
| **Form base** | `style.css` | `style.css` | All forms share the same input styles and validation patterns. |

### What "Centralized" Means

- The HTML is generated once (in JS) and injected into mount points.
- The CSS is defined once (in `style.css`) and loaded on every page.
- If the header logo changes, you change it in one place, and every page updates.
- If the button colour changes, you change one CSS variable, and every button updates.

---

## 29. Which Components Should Never Be Duplicated

### Forbidden Duplications

| Component | Why It Must Not Be Duplicated | What Happens If Duplicated |
|-----------|------------------------------|---------------------------|
| **Header markup** | Copied headers drift out of sync. One page has old navigation, another has new. | Inconsistent UX, broken links, missing features. |
| **Footer markup** | Copied footers have outdated copyright years, broken social links, missing legal pages. | Legal risk, broken links, stale content. |
| **CSS reset / base styles** | Multiple resets override each other unpredictably. | Layout bugs, specificity wars. |
| **CSS variables** | Defining `--fns-gold-primary` in two files creates confusion about which value wins. | Inconsistent colours across pages. |
| **Button base styles** | A second button system means some buttons look different for no reason. | Visual inconsistency, maintenance burden. |
| **Card base styles** | A second card system breaks the grid and spacing rhythm. | Layout misalignment, unequal card heights. |
| **Grid system** | Multiple grid systems create conflicting breakpoints and column widths. | Responsive bugs, broken layouts on tablets. |
| **Form validation logic** | Copied validation logic has different rules on different pages. | User confusion, security gaps. |
| **Favicon and meta tags** | Each page should reference the same favicon and base meta template. | Missing favicon, inconsistent social sharing. |

### How to Extend Without Duplicating

| Instead Of | Do This |
|-------------|---------|
| Copying header HTML into a new page | Use the mount point: `<div id="fns-header-mount"></div>` |
| Creating a new button class `.my-button` | Extend: `fns-btn fns-btn--primary fns-btn--lg` |
| Creating a new card class `.product-box` | Extend: `fns-card fns-card--product` |
| Creating a new grid class `.my-grid` | Extend: `fns-card-grid fns-card-grid--4` |
| Writing new form styles from scratch | Extend: `fns-form-group`, `fns-form-input` |
| Copying CSS variables into a new file | Import or reference the global `style.css` |

---

## 30. Recommended Future Design Expansion Strategy

### Phase 1: Brand Site Foundation (Now)

Focus on perfecting the components that exist today:

- [ ] Header and footer are polished and responsive.
- [ ] Button system covers all CTA needs.
- [ ] Card system handles services, portfolio, and blog.
- [ ] Hero system works for homepage, services, and blog.
- [ ] Form system handles contact and service requests.
- [ ] Blog layout is fully featured (TOC, FAQ, images, CTAs).
- [ ] All CSS variables are documented and consistent.
- [ ] Accessibility checklist passes on every component.

### Phase 2: Component Refinement (Month 2-3)

Add missing components that the brand site needs:

- [ ] Testimonial card component (`fns-card--testimonial`).
- [ ] Stats / counter component for the homepage.
- [ ] Process step component (numbered steps for services).
- [ ] Before/after image slider component.
- [ ] Video embed component with lazy-loaded iframe.
- [ ] Social proof bar (trust badges, partner logos).
- [ ] Breadcrumb component (`fns-breadcrumb`).

### Phase 3: Sidebar & Blog Enhancement (Month 4-6)

Introduce the sidebar and expand blog capabilities:

- [ ] Sidebar CSS file created (`sidebar.css`).
- [ ] Sidebar mount point added to blog and marketplace pages.
- [ ] Sidebar widgets: recent articles, related services, newsletter signup.
- [ ] Blog category filter component.
- [ ] Blog search component.
- [ ] Author bio card component.
- [ ] Tag cloud component (consider noindex for tag pages).

### Phase 4: Marketplace Components (Month 7-12, Future)

Build product-specific components without breaking existing ones:

- [ ] Product card component (`fns-card--product`) with price, badge, rating.
- [ ] Product filter sidebar (price range, material, colour, brand).
- [ ] Product quick view modal.
- [ ] Cart drawer / mini-cart component.
- [ ] Checkout form component (extends base form system).
- [ ] Order summary card component.
- [ ] Review / rating component (`fns-stars`, `fns-review`).

### Phase 5: Dashboard Components (Month 13-18, Future)

Create a completely separate design system for admin/vendor/client dashboards:

- [ ] Dashboard layout component (`fns-dashboard`).
- [ ] Data table component with sorting and pagination.
- [ ] Stat card component (`fns-stat-card`).
- [ ] Status badge component (`fns-status-badge`).
- [ ] Chart container component (integrates with Chart.js or similar).
- [ ] Activity feed component.
- [ ] Notification centre component.

### Phase 6: Advanced Interactions (Month 19+, Future)

Add polish and advanced UX patterns:

- [ ] Smooth scroll animations for page sections.
- [ ] Image gallery lightbox component.
- [ ] Sticky navigation for long pages.
- [ ] Infinite scroll for blog and product listings.
- [ ] Dark mode toggle (extends CSS variable system).
- [ ] Custom select dropdown component (replaces native `<select>` for design consistency).
- [ ] Date picker component for booking/request forms.

### Design Expansion Rules

| Rule | Requirement |
|------|-------------|
| New phases do not break existing components. | Backward compatibility is mandatory. |
| New components extend the base system, do not replace it. | `fns-card--product` extends `fns-card`, does not replace it. |
| Dashboard components live in a separate namespace (`fns-dashboard-*`). | No collision with public site components. |
| Every new component is documented in this document before it is built. | Living documentation. |
| Every new component passes the accessibility checklist. | No exceptions. |
| Component changes are tested on all affected pages. | A button change affects the homepage, services, blog, and future marketplace. |

---

*Document version 1.0. Created 2026-05-22. Read before creating or editing any component.*
