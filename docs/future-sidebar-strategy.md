# Furnostyles Future Sidebar Reintegration Strategy

**Date:** 2026-05-22 | **Status:** Planning — Not Yet Implemented  
**Goal:** Design a sidebar system that will never recreate the old layout instability, squeezing, or architectural chaos.

---

## 1. Why the Old Sidebar System Caused Layout Instability

| Problem | What Happened | Why It Matters |
|---------|-------------|----------------|
| **Fixed width squeezed content** | Sidebar took 280px; main content shrank. On tablets, text became unreadable. | Users left because text was too narrow. |
| **Sidebar CSS leaked into global styles** | Sidebar margins and grid rules were in `style.css`, affecting every page. | Pages without sidebars had broken spacing. |
| **Sidebar was hard-coded into every page** | Each HTML file contained its own sidebar markup. | Updating the sidebar meant editing every page. |
| **No mobile strategy** | Sidebar disappeared on mobile with no replacement. | Mobile users lost navigation access. |
| **Content and sidebar competed for space** | On smaller laptops (1366px), layout exceeded viewport, causing horizontal scroll. | Professional sites do not scroll horizontally. |
| **Different sidebars on different pages** | Blog had one, marketplace another, services none. No shared logic. | Every page felt like a different website. |
| **Sidebar state was not remembered** | Collapsed on one page, open again on the next. | Annoying, repetitive interactions. |

**Core lesson:** A sidebar is layout-critical. If designed poorly, the entire page breaks.

---

## 2. Safe Sidebar Architecture Principles

| Principle | Rule | Rationale |
|-----------|------|-----------|
| **Opt-in only** | No page has a sidebar unless it explicitly requests one. | Current no-sidebar pages must never break. |
| **Content-first width** | Main content gets priority. Sidebar takes leftover space, never the other way around. | Content readability is sacred. |
| **Mount point pattern** | Sidebar HTML is loaded by JS into a mount point, not hard-coded. | One source of truth, easy updates. |
| **Separate CSS file** | All sidebar styles live in `sidebar.css`, loaded only on pages that need it. | No leaked styles into global CSS. |
| **Mobile-first collapse** | On mobile and tablet, sidebar is hidden, collapsed, or overlaid. | No content squeezing ever again. |
| **State persistence** | Sidebar open/close state is saved in `localStorage` and respected across pages. | User preference is remembered. |
| **No sidebar on simple pages** | Homepage, contact, about, and landing pages never have sidebars. | Sidebars add noise where not needed. |
| **Graceful degradation** | If JS fails, the page still works — the sidebar does not appear, content fills the space. | The site never breaks. |

---

## 3. Difference Between Sidebar Types

### Overlay Sidebar
- Slides in from left/right, covering part of the page. Main content does not move.
- **Pros:** Content never squeezes. Works on any screen. Simple CSS.
- **Cons:** Obscures content. Requires overlay click/swipe to close.
- **Best for:** Mobile navigation, filter panels, quick settings.

### Push Sidebar
- Pushes main content to the right. Content width shrinks to make room.
- **Pros:** Sidebar and content both fully visible. Feels integrated.
- **Cons:** Content squeezes when open. Needs careful min-width handling.
- **Best for:** Desktop dashboards, admin panels, documentation sites.

### Collapsible Sidebar
- Always present but can collapse to a narrow icon bar (e.g., 64px). Expands on hover/click.
- **Pros:** Users choose between full nav and max content. Icon-only saves space.
- **Cons:** More complex CSS and JS. Tooltips needed for icon-only mode.
- **Best for:** Dashboards users use daily.

### Hybrid Responsive Sidebar
- **Desktop:** Push sidebar (visible by default, collapsible)
- **Tablet:** Overlay sidebar (hidden by default, triggered by button)
- **Mobile:** Off-canvas overlay (slide-in from edge, full-screen or near-full-screen)
- **Pros:** Optimal experience on every device. Content never squeezes on small screens.
- **Cons:** Most complex to implement. Needs thorough testing.
- **Best for:** Multi-device platforms like Furnostyles marketplace + blog + dashboard.

---

## 4. Recommended Furnostyles Sidebar Approach

**Decision: Hybrid Responsive Sidebar**

Furnostyles should use a hybrid responsive sidebar because:
1. Desktop users benefit from persistent navigation and filters.
2. Mobile users (most of Kenya's internet traffic) need full-width content.
3. Tablet users need a middle ground.
4. The site serves multiple purposes (blog, marketplace, dashboard).

### Behaviour Summary

| Device | Width | Sidebar Behaviour | Default State |
|--------|-------|-------------------|---------------|
| Desktop | >= 1200px | Push sidebar | Open (can be collapsed) |
| Laptop | 992-1199px | Push sidebar | Collapsed (icons only) |
| Tablet | 768-991px | Overlay sidebar | Closed, toggle button visible |
| Mobile | < 768px | Off-canvas overlay | Closed, toggle button visible |

### Sidebar Content by Context

| Page Type | Sidebar Content |
|-----------|-----------------|
| **Blog articles** | Related articles, category list, newsletter signup, service CTA |
| **Blog listing** | Category filter, search, popular articles, tag cloud |
| **Marketplace category** | Subcategory filter, price range, material filter, brand filter |
| **Marketplace product** | Related products, "people also viewed", category nav |
| **Dashboard (future)** | Navigation menu, user profile, quick stats, notification badge |

---

## 5. How Sidebar Should Behave on Desktop, Tablet, and Mobile

### Desktop (>= 1200px)
- Sidebar visible on the left. Width: **280px**. Main content: `calc(100% - 280px)`.
- Can be **collapsed to 64px icon bar** via toggle button.
- Toggle state saved to `localStorage`.
- Resize handle (future): min 200px, max 360px.

```html
<div class="premium-layout premium-layout--with-sidebar">
  <aside class="fns-sidebar" id="fns-sidebar-mount" data-sidebar-state="open">
    <!-- Loaded by JS -->
  </aside>
  <main class="premium-main">
    <!-- Content -->
  </main>
</div>
```

### Laptop (992-1199px)
- Sidebar **collapsed to 64px icon bar by default**.
- Hovering or clicking an icon expands sidebar to full width temporarily.
- Main content gets almost full width. Prevents content-squeezing.

### Tablet (768-991px)
- Sidebar **completely hidden by default**.
- **Toggle button** in header opens sidebar as an **overlay** sliding from the left.
- Clicking outside or pressing Escape closes it. Main content stays full-width.

```html
<div class="fns-sidebar-overlay" data-sidebar-close></div>
<aside class="fns-sidebar fns-sidebar--overlay" id="fns-sidebar-mount">
  <!-- Loaded by JS -->
</aside>
```

### Mobile (< 768px)
- Sidebar **completely hidden by default**.
- **Hamburger menu or filter button** triggers off-canvas panel from the left.
- Full-width or near-full-width panel. Close button at top. Page dimmed with overlay.
- Swipe left on sidebar closes it.

---

## 6. How to Avoid Content Squeezing

### The Golden Rule
**The main content area must never be narrower than 320px. If sidebar + content + margins would push content below 320px, the sidebar must switch to overlay mode or collapse.**

### Technical Safeguards

| Safeguard | Implementation |
|-----------|----------------|
| Min-content-width check | If `viewport - sidebar - margins < 680px`, force overlay mode. |
| CSS `min-width` on main content | `premium-main { min-width: 320px; }` |
| Sidebar max-width cap | Sidebar never exceeds 360px. |
| Container max-width | Overall layout container caps at 1440px. |
| No sidebar on pages under 768px wide | Below tablet width, sidebar is always overlay/off-canvas. |
| Collapsible by default on laptops | 992-1199px range always starts with collapsed sidebar. |

### CSS Safety Net

```css
.premium-layout--with-sidebar {
  display: flex;
  gap: var(--fns-spacing-lg);
}

.premium-main {
  flex: 1 1 auto;
  min-width: 320px; /* NEVER narrower than this */
}

.fns-sidebar {
  flex: 0 0 280px;
  max-width: 360px;
}

/* If container is too narrow, sidebar becomes overlay */
@media (max-width: 1099px) {
  .premium-layout--with-sidebar .fns-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    transform: translateX(-100%);
    z-index: 1000;
  }
  .fns-sidebar--open {
    transform: translateX(0);
  }
}
```

### The 680px Threshold
Readable text columns need 45-75 characters per line. At 16px font with 1.7 line height, 680px provides approximately 65 characters per line — optimal reading width.

---

## 7. Recommended CSS Layout Structure

### Sidebar CSS File: `assets/css/sidebar.css`

Loaded **only** on pages that need a sidebar. Never touches `style.css`.

```css
/* ============================================================
   SIDEBAR BASE
   ============================================================ */

.fns-sidebar {
  --sidebar-width: 280px;
  --sidebar-collapsed-width: 64px;

  background: var(--fns-white);
  border-right: 1px solid var(--fns-border);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  width: var(--sidebar-width);
  transition: width var(--fns-transition-base), transform var(--fns-transition-base);
}

/* ============================================================
   SIDEBAR STATES
   ============================================================ */

.fns-sidebar--collapsed {
  width: var(--sidebar-collapsed-width);
}

.fns-sidebar--collapsed .fns-sidebar__text {
  display: none; /* Hide text, show icons only */
}

.fns-sidebar--open {
  transform: translateX(0);
}

.fns-sidebar--closed {
  transform: translateX(-100%);
}

/* ============================================================
   SIDEBAR OVERLAY (tablet)
   ============================================================ */

.fns-sidebar--overlay {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  transform: translateX(-100%);
  box-shadow: var(--fns-shadow-lg);
}

.fns-sidebar--overlay.fns-sidebar--open {
  transform: translateX(0);
}

/* Backdrop for overlay mode */
.fns-sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--fns-transition-base), visibility var(--fns-transition-base);
}

.fns-sidebar-backdrop--visible {
  opacity: 1;
  visibility: visible;
}

/* ============================================================
   SIDEBAR OFF-CANVAS (mobile)
   ============================================================ */

.fns-sidebar--offcanvas {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 85vw;
  max-width: 320px;
  z-index: 1000;
  transform: translateX(-100%);
  box-shadow: var(--fns-shadow-lg);
}

.fns-sidebar--offcanvas.fns-sidebar--open {
  transform: translateX(0);
}

/* ============================================================
   LAYOUT WITH SIDEBAR
   ============================================================ */

.premium-layout--with-sidebar {
  display: flex;
  gap: var(--fns-spacing-lg);
}

@media (min-width: 1200px) {
  .premium-layout--with-sidebar {
    padding-left: 0;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .fns-sidebar {
    width: var(--sidebar-collapsed-width);
  }
}

@media (max-width: 991px) {
  .premium-layout--with-sidebar {
    display: block; /* Sidebar is fixed, main content is full width */
  }
}
```

### Key CSS Principles

| Principle | Implementation |
|-----------|----------------|
| No sidebar styles in `style.css` | Everything lives in `sidebar.css`. |
| Sidebar is `position: sticky` on desktop | Scrolls with the page but stays visible. |
| Sidebar is `position: fixed` on mobile/tablet | Overlays the content, never pushes it. |
| Layout uses `display: flex` with `gap` | No margin hacks, no float-based layouts. |
| Transitions are smooth | `transform` and `width` animate cleanly. |

---

## 8. Recommended JS Interaction Strategy

### Sidebar Controller

```javascript
// assets/js/sidebar.js (future)

const SidebarController = {
  mountId: 'fns-sidebar-mount',
  stateKey: 'fnsSidebarState',
  backdropClass: 'fns-sidebar-backdrop',

  init() {
    this.mount = document.getElementById(this.mountId);
    if (!this.mount) return; // Page has no sidebar

    this.loadSidebarContent();
    this.restoreState();
    this.bindEvents();
    this.applyResponsiveMode();
  },

  loadSidebarContent() {
    const pageType = document.body.dataset.pageType || 'default';
    const content = this.getSidebarTemplate(pageType);
    this.mount.innerHTML = content;
  },

  getSidebarTemplate(pageType) {
    const templates = {
      blog: this.blogSidebarTemplate(),
      marketplace: this.marketplaceSidebarTemplate(),
      dashboard: this.dashboardSidebarTemplate(),
      default: this.defaultSidebarTemplate()
    };
    return templates[pageType] || templates.default;
  },

  restoreState() {
    const saved = localStorage.getItem(this.stateKey);
    if (saved) {
      const state = JSON.parse(saved);
      if (state.collapsed && window.innerWidth >= 992) {
        this.collapse();
      }
    }
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-sidebar-toggle]');
      if (toggle) this.toggle();

      const closeBtn = e.target.closest('[data-sidebar-close]');
      if (closeBtn) this.close();

      const backdrop = e.target.closest('.' + this.backdropClass);
      if (backdrop) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.applyResponsiveMode(), 150);
    });
  },

  applyResponsiveMode() {
    const width = window.innerWidth;
    const sidebar = this.mount;

    if (width >= 1200) {
      sidebar.classList.remove('fns-sidebar--overlay', 'fns-sidebar--offcanvas');
    } else if (width >= 992) {
      sidebar.classList.remove('fns-sidebar--overlay', 'fns-sidebar--offcanvas');
      this.collapse();
    } else {
      sidebar.classList.add('fns-sidebar--overlay');
      this.close();
    }
  },

  toggle() {
    const sidebar = this.mount;
    if (sidebar.classList.contains('fns-sidebar--open')) {
      this.close();
    } else {
      this.open();
    }
  },

  open() {
    this.mount.classList.add('fns-sidebar--open');
    this.showBackdrop();
    this.trapFocus();
  },

  close() {
    this.mount.classList.remove('fns-sidebar--open');
    this.hideBackdrop();
    this.releaseFocus();
  },

  collapse() {
    this.mount.classList.add('fns-sidebar--collapsed');
    localStorage.setItem(this.stateKey, JSON.stringify({ collapsed: true }));
  },

  expand() {
    this.mount.classList.remove('fns-sidebar--collapsed');
    localStorage.setItem(this.stateKey, JSON.stringify({ collapsed: false }));
  },

  showBackdrop() {
    const backdrop = document.querySelector('.' + this.backdropClass);
    if (backdrop) backdrop.classList.add('fns-sidebar-backdrop--visible');
  },

  hideBackdrop() {
    const backdrop = document.querySelector('.' + this.backdropClass);
    if (backdrop) backdrop.classList.remove('fns-sidebar-backdrop--visible');
  },

  trapFocus() {
    const focusable = this.mount.querySelector('button, [href], input, select, textarea');
    if (focusable) focusable.focus();
  },

  releaseFocus() {
    const toggle = document.querySelector('[data-sidebar-toggle]');
    if (toggle) toggle.focus();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SidebarController.init());
} else {
  SidebarController.init();
}
```

### JS Rules

| Rule | Implementation |
|------|----------------|
| Sidebar only initializes if mount point exists. | `if (!this.mount) return;` |
| State is saved to `localStorage`. | Collapsed/expanded preference persists. |
| Events use delegation. | One listener handles all sidebar toggles. |
| Resize is debounced. | 150ms delay prevents excessive recalculation. |
| Focus is managed. | Trap focus in sidebar when open, return to trigger when closed. |
| Escape key closes sidebar. | Standard UX pattern. |
| Backdrop click closes sidebar. | Intuitive dismissal. |

---

## 9. Shared Reusable Sidebar Architecture

### The Sidebar as a Plugin

The sidebar behaves like a plugin any page can opt into:

```html
<!-- Page opts into sidebar -->
<body data-page-type="blog">
  <div class="premium-layout premium-layout--with-sidebar">
    <aside class="fns-sidebar" id="fns-sidebar-mount"></aside>
    <main class="premium-main" id="main-content">
      <!-- Page content -->
    </main>
  </div>
</body>
```

```html
<!-- Page does NOT opt into sidebar (default) -->
<body>
  <div class="premium-layout">
    <main class="premium-main" id="main-content">
      <!-- Page content -->
    </main>
  </div>
</body>
```

### Sidebar Template System

Different pages need different sidebar content:

```javascript
// sidebar-templates.js (future)

const SidebarTemplates = {
  blog() {
    return `
      <div class="fns-sidebar__section">
        <h3 class="fns-sidebar__title">Categories</h3>
        <ul class="fns-sidebar__list">
          <li><a href="/blogs/category/interior-design.html">Interior Design</a></li>
          <li><a href="/blogs/category/house-finishing.html">House Finishing</a></li>
          <li><a href="/blogs/category/furniture-repairs.html">Furniture & Repairs</a></li>
        </ul>
      </div>
      <div class="fns-sidebar__section">
        <h3 class="fns-sidebar__title">Popular Articles</h3>
        <div data-sidebar-popular></div>
      </div>
      <div class="fns-sidebar__section">
        <a href="/contact.html" class="fns-btn fns-btn--primary fns-btn--sm fns-btn--full">
          Request a Consultation
        </a>
      </div>
    `;
  },

  marketplace() {
    return `
      <div class="fns-sidebar__section">
        <h3 class="fns-sidebar__title">Categories</h3>
        <!-- Category tree -->
      </div>
      <div class="fns-sidebar__section">
        <h3 class="fns-sidebar__title">Filter by Price</h3>
        <!-- Price range slider -->
      </div>
      <div class="fns-sidebar__section">
        <h3 class="fns-sidebar__title">Material</h3>
        <!-- Checkbox filters -->
      </div>
    `;
  },

  dashboard() {
    return `
      <nav class="fns-sidebar__nav">
        <a href="/dashboard/" class="fns-sidebar__link fns-sidebar__link--active">
          <span class="fns-sidebar__icon">&#8962;</span>
          <span class="fns-sidebar__text">Dashboard</span>
        </a>
        <a href="/dashboard/orders.html" class="fns-sidebar__link">
          <span class="fns-sidebar__icon">&#128196;</span>
          <span class="fns-sidebar__text">Orders</span>
        </a>
      </nav>
    `;
  }
};
```

### Shared Sidebar Components

All sidebars share these components, defined once in `sidebar.css`:

| Component | Class | Usage |
|-----------|-------|-------|
| Section | `fns-sidebar__section` | Groups of related content |
| Title | `fns-sidebar__title` | Section headings |
| List | `fns-sidebar__list` | Navigation or link lists |
| Link | `fns-sidebar__link` | Individual links |
| Active link | `fns-sidebar__link--active` | Current page indicator |
| Icon | `fns-sidebar__icon` | Icon-only display in collapsed mode |
| Text | `fns-sidebar__text` | Label text (hidden in collapsed mode) |
| Toggle | `fns-sidebar__toggle` | Collapse/expand button |
| Close | `fns-sidebar__close` | Close button for overlay mode |

---

## 10. Sidebar Data / Source Strategy

### Static Data (Current / Blog)

For blog and simple pages, sidebar content is static HTML:
- Categories are hard-coded because they change infrequently.
- Popular articles are populated by `article-utils.js` from `article-data.js`.
- Service CTAs are static links.

### Dynamic Data (Future / Marketplace & Dashboard)

| Data Source | Content | How It Loads |
|-------------|---------|--------------|
| `article-data.js` | Popular articles, recent articles | Client-side JS reads the data store |
| Firebase Firestore (future) | Product categories, filter counts | JS fetches on page load, cached |
| Firebase Auth (future) | User name, avatar, role | JS reads auth state |
| Static JSON | Category tree, price ranges | Fetched once, cached in memory |

### Loading Strategy

```javascript
// Priority loading order
async function loadSidebarData() {
  // 1. Load static template immediately
  renderSidebarTemplate();

  // 2. Load dynamic data in parallel
  const [articles, categories] = await Promise.all([
    fetchPopularArticles(),
    fetchCategories()
  ]);

  // 3. Inject into already-rendered sidebar
  injectPopularArticles(articles);
  injectCategories(categories);
}
```

### Rules

| Rule | Requirement |
|------|-------------|
| Static content renders immediately. | No blank sidebar while data loads. |
| Dynamic content fills in asynchronously. | Skeleton placeholders while loading. |
| Failed data loads do not break the sidebar. | Static content remains visible. |
| Data is cached. | Categories and filters fetched once per session. |

---

## 11. Marketplace Category Expansion Strategy

### Category Tree Sidebar

```html
<div class="fns-sidebar__section">
  <h3 class="fns-sidebar__title">Categories</h3>
  <ul class="fns-sidebar__tree">
    <li class="fns-sidebar__tree-item">
      <button class="fns-sidebar__tree-toggle" aria-expanded="false">
        Flooring Materials
      </button>
      <ul class="fns-sidebar__tree-children">
        <li><a href="/marketplace/floor-tiles.html">Floor Tiles</a></li>
        <li><a href="/marketplace/hardwood-flooring.html">Hardwood Flooring</a></li>
        <li><a href="/marketplace/vinyl-flooring.html">Vinyl Flooring</a></li>
      </ul>
    </li>
    <li class="fns-sidebar__tree-item">
      <button class="fns-sidebar__tree-toggle" aria-expanded="false">
        Kitchen & Bath
      </button>
      <ul class="fns-sidebar__tree-children">
        <li><a href="/marketplace/kitchen-cabinets.html">Kitchen Cabinets</a></li>
        <li><a href="/marketplace/countertops.html">Countertops</a></li>
      </ul>
    </li>
  </ul>
</div>
```

### Filter Sidebar

```html
<div class="fns-sidebar__section">
  <h3 class="fns-sidebar__title">Filter by Price</h3>
  <input type="range" min="0" max="50000" value="25000" class="fns-sidebar__range">
</div>

<div class="fns-sidebar__section">
  <h3 class="fns-sidebar__title">Material</h3>
  <label class="fns-form-check">
    <input type="checkbox" name="material" value="porcelain">
    <span>Porcelain</span>
  </label>
</div>
```

### Marketplace Sidebar Rules

| Rule | Requirement |
|------|-------------|
| Category tree is collapsible. | Users can expand/collapse. State remembered. |
| Active category is highlighted. | Users know where they are. |
| Filters update URL query params without page reload. | `?material=porcelain&price_max=10000` |
| Filter state is preserved across category pages. | Users do not re-select filters. |
| "Clear all filters" button visible when filters are active. | Easy reset. |
| Filter counts loaded dynamically. | "Porcelain (24)" helps informed choices. |

---

## 12. Future Dashboard Sidebar Strategy

### Dashboard Sidebar Differences

| Aspect | Blog/Marketplace Sidebar | Dashboard Sidebar |
|--------|-------------------------|-------------------|
| Purpose | Content discovery, filtering | Navigation, primary menu |
| Visibility | Optional, collapsible | Essential, usually persistent |
| Content | Widgets, links, filters | Menu items, user profile, quick actions |
| Collapsed state | Icon-only or hidden | Icon-only (tooltips required) |
| Mobile behaviour | Overlay/off-canvas | Overlay (dashboard unusable without nav) |
| Active state | Highlight current filter/category | Highlight current page |
| User-specific | No | Yes (role-based menu items) |

### Dashboard Sidebar Structure

```html
<aside class="fns-dashboard-sidebar" id="fns-sidebar-mount">
  <div class="fns-dashboard-sidebar__brand">
    <img src="/assets/images/logos/logo-icon.svg" alt="Furnostyles" width="32">
    <span class="fns-dashboard-sidebar__brand-text">Furnostyles</span>
  </div>

  <nav class="fns-dashboard-sidebar__nav">
    <a href="/dashboard/" class="fns-dashboard-sidebar__link fns-dashboard-sidebar__link--active">
      <span class="fns-dashboard-sidebar__icon">&#8962;</span>
      <span class="fns-dashboard-sidebar__text">Overview</span>
    </a>
    <a href="/dashboard/orders.html" class="fns-dashboard-sidebar__link">
      <span class="fns-dashboard-sidebar__icon">&#128196;</span>
      <span class="fns-dashboard-sidebar__text">Orders</span>
      <span class="fns-dashboard-sidebar__badge">3</span>
    </a>
    <a href="/dashboard/products.html" class="fns-dashboard-sidebar__link">
      <span class="fns-dashboard-sidebar__icon">&#128230;</span>
      <span class="fns-dashboard-sidebar__text">Products</span>
    </a>
  </nav>

  <div class="fns-dashboard-sidebar__footer">
    <a href="/dashboard/settings.html" class="fns-dashboard-sidebar__link">
      <span class="fns-dashboard-sidebar__icon">&#9881;</span>
      <span class="fns-dashboard-sidebar__text">Settings</span>
    </a>
    <button class="fns-dashboard-sidebar__link" data-logout>
      <span class="fns-dashboard-sidebar__icon">&#9094;</span>
      <span class="fns-dashboard-sidebar__text">Log Out</span>
    </button>
  </div>
</aside>
```

### Dashboard Sidebar Rules

| Rule | Requirement |
|------|-------------|
| Dashboard sidebar uses its own namespace (`fns-dashboard-sidebar-*`). | No collision with public site sidebar. |
| Dashboard sidebar always present on desktop. | Never fully hidden — collapsed to icons at minimum. |
| Menu items are role-based. | Admins see "Users" and "Reports". Vendors see "My Products". Clients see "My Requests". |
| Active page clearly highlighted. | Users always know where they are. |
| Notification badges update in real-time. | Firebase listeners for live data. |
| Logout always accessible from sidebar footer. | Standard dashboard pattern. |

---

## 13. Sidebar Accessibility Considerations

### Keyboard Navigation

| Action | Key | Behaviour |
|--------|-----|-----------|
| Open sidebar | Toggle button | Sidebar appears, focus moves to first link |
| Close sidebar | `Escape` or close button | Sidebar hides, focus returns to toggle button |
| Navigate links | `Tab` / `Shift + Tab` | Move between sidebar links |
| Activate link | `Enter` | Navigate to link target |
| Toggle section | `Enter` on section header | Expand/collapse category/filter section |

### Screen Reader Support

```html
<aside class="fns-sidebar" id="fns-sidebar-mount" role="complementary" aria-label="Page sidebar">
  <nav class="fns-sidebar__nav" aria-label="Sidebar navigation">
    <!-- Links -->
  </nav>
</aside>
```

### ARIA Attributes

| Attribute | Where | Purpose |
|-----------|-------|---------|
| `role="complementary"` | `<aside class="fns-sidebar">` | Identifies sidebar as complementary content |
| `aria-label="Page sidebar"` | `<aside>` | Names the sidebar for screen readers |
| `aria-expanded="true/false"` | Collapsible section toggles | Indicates open/closed state |
| `aria-current="page"` | Active sidebar link | Indicates current page |
| `aria-hidden="true"` | Sidebar when closed in overlay mode | Prevents access to hidden content |

### Focus Management
1. When sidebar opens, focus moves to the first focusable element inside it.
2. When sidebar closes, focus returns to the element that triggered it.
3. In overlay mode, focus is trapped inside the sidebar (`Tab` cycles within).

---

## 14. Performance Considerations

### CSS Performance

| Strategy | Implementation |
|----------|----------------|
| Sidebar CSS is lazy-loaded | `<link rel="stylesheet" href="assets/css/sidebar.css">` only on pages that need it. |
| No sidebar styles in global CSS | `style.css` contains no sidebar rules. |
| Use `transform` for animations | `translateX` for slide-in/out. GPU-accelerated. |
| Avoid `width` animation where possible | Toggle visibility instead of animating layout properties. |
| Containment for sidebar | `contain: layout` on sidebar to isolate layout calculations. |

### JS Performance

| Strategy | Implementation |
|----------|----------------|
| Sidebar JS is lazy-loaded | `sidebar.js` loaded via `defer` only on pages that need it. |
| Debounce resize handler | 150ms debounce on window resize. |
| Cache sidebar templates | Templates stored in memory after first render. |
| Avoid re-rendering identical content | Diff new template against current DOM before replacing. |
| Use `requestIdleCallback` for non-urgent data loading. | Load dynamic content when browser is idle. |

### Rendering Performance

| Strategy | Implementation |
|----------|----------------|
| Sticky sidebar uses `position: sticky` | No JS scroll listeners needed. |
| Overlay backdrop uses `will-change: opacity` | Hint to browser for smooth fade. |
| No sidebar layout calculation on pages without sidebar | `SidebarController.init()` returns early if mount point missing. |

---

## 15. How to Safely Test Sidebar Before Global Rollout

### Step 1: Create a Test Page

Create a dedicated test page not linked from main navigation:

```
furnostyles-clean-rebuild/test-sidebar.html
```

### Step 2: Test on All Devices

| Device | Width | Test |
|--------|-------|------|
| Small mobile | 320px | Sidebar off-canvas. Full-width content. No horizontal scroll. |
| Large mobile | 414px | Off-canvas. Toggle button accessible. |
| Tablet portrait | 768px | Overlay. Full-width content. |
| Tablet landscape | 1024px | Collapsed (64px). Wide content. |
| Small laptop | 1280px | Open (280px) or collapsed. Readable content. |
| Desktop | 1440px | Open. Comfortable reading width. |
| Large desktop | 1920px | Open. Layout container caps at max-width. |

### Step 3: Test Content Squeezing

On each device, verify:
- [ ] Main content never narrower than 320px.
- [ ] Text is readable (45-75 characters per line).
- [ ] Images do not overflow containers.
- [ ] No horizontal scroll appears.
- [ ] Buttons and links remain tappable (44x44px minimum).

### Step 4: Test Without JavaScript

Disable JavaScript and verify:
- [ ] Page content is still visible and readable.
- [ ] Navigation works (header and footer links).
- [ ] Sidebar does not block content.
- [ ] Forms still submit.

### Step 5: Test Accessibility

- [ ] Sidebar can be opened and closed with keyboard only.
- [ ] Screen reader announces sidebar state (open/closed).
- [ ] Focus is trapped in overlay mode.
- [ ] Focus returns to toggle button when sidebar closes.
- [ ] Colour contrast meets WCAG AA.

### Step 6: Gradual Rollout

1. **Week 1:** Test page only. Internal review.
2. **Week 2:** Add sidebar to one blog article. Monitor for issues.
3. **Week 3:** Add sidebar to all blog articles if no issues.
4. **Week 4:** Add sidebar to blog listing page.
5. **Month 2:** Add sidebar to marketplace pages (when marketplace is built).
6. **Month 3+:** Add sidebar to dashboard pages (when dashboard is built).

---

## 16. How Future Pages Should Register Sidebar Links

### Page Registration System

Pages declare their sidebar needs via `data-*` attributes on `<body>`:

```html
<!-- Blog article page -->
<body data-page-type="blog" data-sidebar-context="interior-design">

<!-- Marketplace category page -->
<body data-page-type="marketplace" data-sidebar-category="flooring-materials">

<!-- Dashboard orders page -->
<body data-page-type="dashboard" data-user-role="vendor">

<!-- Page with no sidebar -->
<body>
```

### Sidebar Context Object

```javascript
// sidebar-context.js (future)

const SidebarContext = {
  getCurrentPage() {
    const body = document.body;
    return {
      type: body.dataset.pageType || null,
      category: body.dataset.sidebarCategory || null,
      context: body.dataset.sidebarContext || null,
      userRole: body.dataset.userRole || 'guest'
    };
  },

  shouldShowSidebar() {
    const page = this.getCurrentPage();
    return ['blog', 'marketplace', 'dashboard'].includes(page.type);
  },

  getSidebarTemplateName() {
    const page = this.getCurrentPage();
    if (page.type === 'dashboard') return 'dashboard';
    if (page.type === 'marketplace') return 'marketplace';
    if (page.type === 'blog') return 'blog';
    return 'default';
  }
};
```

### Rules

| Rule | Requirement |
|------|-------------|
| Every page that needs a sidebar must have `data-page-type`. | Without it, the sidebar does not initialize. |
| Page type is validated against an allowlist. | Unknown page types are ignored. |
| Context data is optional. | Blog articles may specify `data-sidebar-context` for related articles. |
| Dashboard pages must specify `data-user-role`. | Role determines which menu items appear. |
| No JavaScript error if `data-*` attributes are missing. | Graceful fallback to no sidebar. |

---

## 17. What Should Never Be Hardcoded Again

### The Forbidden List

| Item | Old Mistake | Safe Approach |
|------|-------------|---------------|
| **Sidebar HTML in every page** | Every page had its own sidebar markup. | Mount point pattern: `<aside id="fns-sidebar-mount"></aside>` |
| **Sidebar width in multiple places** | Width was repeated in CSS, JS, and HTML. | CSS variable `--sidebar-width: 280px;` in one file. |
| **Category links in every page** | Each blog page had its own category list. | Single `sidebar-templates.js` with shared category data. |
| **Sidebar open/close state per page** | Each page managed its own state. | Central `localStorage` key `fnsSidebarState`. |
| **Page-specific sidebar CSS** | Blog had one CSS file, marketplace another. | Single `sidebar.css` with modifiers for different contexts. |
| **Breakpoint values scattered across files** | Media queries had different widths in CSS and JS. | CSS custom properties or a shared `breakpoints.js` config. |
| **Hardcoded image paths in sidebar** | Sidebar featured images with absolute paths. | Dynamic loading from `article-data.js` or Firebase. |
| **Sidebar toggle button markup in every page** | Each page had its own hamburger icon. | Header component renders toggle button based on `data-page-type`. |

---

## 18. Which Sidebar Behaviours Should Remain Centralized

### Centralized Behaviours

| Behaviour | Where It Lives | Why Centralized |
|-----------|---------------|----------------|
| **Sidebar open/close state** | `localStorage` key `fnsSidebarState` | Users expect consistency across pages. |
| **Responsive mode switching** | `SidebarController.applyResponsiveMode()` | One source of truth for breakpoint behaviour. |
| **Focus management** | `SidebarController.trapFocus()` / `releaseFocus()` | Accessibility must be consistent everywhere. |
| **Backdrop visibility** | `SidebarController.showBackdrop()` / `hideBackdrop()` | One overlay style for all overlay sidebars. |
| **Keyboard shortcuts** | `SidebarController.bindEvents()` | Escape key and other shortcuts work the same on every page. |
| **Template selection** | `SidebarController.getSidebarTemplate()` | Logic for choosing which sidebar to show lives in one place. |
| **Animation timing** | CSS custom properties `--fns-transition-base` | All sidebars animate at the same speed. |
| **Z-index stacking** | CSS class `fns-sidebar--overlay` | One z-index value prevents layering conflicts. |

### What Can Be Page-Specific

| Item | Where It Lives | Why Page-Specific |
|------|---------------|-------------------|
| **Sidebar content/template** | `SidebarTemplates` object or per-page JSON | Blog needs categories; marketplace needs filters. |
| **Active link highlight** | Per-page `aria-current="page"` | Each page knows which link is active. |
| **Dynamic data** | Page-specific JS or Firebase listeners | Dashboard badges update per-user; blog popular articles vary by category. |
| **Toggle button visibility** | Header component | Some pages have no sidebar, so no toggle button. |

---

## 19. How Sidebar Should Integrate with Shared Header/Footer

### Header Integration

The shared header (loaded into `#fns-header-mount`) must be sidebar-aware:

```html
<!-- Header renders conditionally based on page type -->
<header class="premium-header">
  <a class="premium-brand" href="index.html">Furnostyles</a>

  <!-- Toggle button only appears when page has a sidebar -->
  <button class="fns-sidebar__toggle" data-sidebar-toggle aria-label="Toggle sidebar" hidden>
    <span class="fns-sidebar__toggle-icon"></span>
  </button>

  <div class="fld-youtube-search">
    <!-- Search input + button -->
  </div>

  <div class="fld-icon-actions">
    <!-- Cart, alerts, account buttons -->
  </div>
</header>
```

```javascript
// In header loader or main.js
function showSidebarToggle() {
  const toggle = document.querySelector('[data-sidebar-toggle]');
  if (toggle && SidebarContext.shouldShowSidebar()) {
    toggle.hidden = false;
  }
}
```

### Footer Integration

The footer is unaffected by the sidebar. It always spans the full width of the page:

```html
<footer class="fld-commerce-footer">
  <!-- Footer content -->
</footer>
```

The footer does not need to know about the sidebar. It sits below the layout container.

### Layout Container Rules

```html
<!-- With sidebar: main content shrinks, footer still full-width -->
<body data-page-type="blog">
  <div class="premium-layout premium-layout--with-sidebar">
    <aside class="fns-sidebar" id="fns-sidebar-mount"></aside>
    <main class="premium-main" id="main-content">
      <!-- Content -->
    </main>
  </div>
  <footer class="fld-commerce-footer">
    <!-- Footer content -->
  </footer>
</body>
```

| Rule | Requirement |
|------|-------------|
| **Footer is always full-width.** | It does not shrink when sidebar is open. |
| **Header toggle button is controlled by JS.** | It appears only on pages with `data-page-type` that supports sidebars. |
| **Header does not duplicate sidebar markup.** | The sidebar mount point is a separate `<aside>`. |
| **Floating action buttons (cart, chat) stay visible.** | They float above the sidebar overlay. |

---

## 20. Recommended Future Implementation Order

### Phase 1: Foundation (Month 1)
1. Create `assets/css/sidebar.css` with base styles and states.
2. Create `assets/js/sidebar.js` with `SidebarController`.
3. Create `test-sidebar.html` for isolated testing.
4. Verify no CSS leaks into `style.css`.
5. Test on all devices and screen sizes.

### Phase 2: Blog Sidebar (Month 2)
1. Add `data-page-type="blog"` to blog article pages.
2. Add `sidebar.css` and `sidebar.js` to blog pages only.
3. Implement blog sidebar template (categories, popular articles, CTA).
4. Monitor for layout issues and user feedback.
5. Roll out to all blog articles once stable.

### Phase 3: Blog Listing Sidebar (Month 2-3)
1. Add sidebar to `blogs.html` listing page.
2. Implement category filter and search in sidebar.
3. Test filter interactions and URL updates.

### Phase 4: Marketplace Sidebar (Month 4-6)
1. Build marketplace category tree sidebar.
2. Implement filter sidebar (price, material, brand).
3. Test with real product data.
4. Verify performance with 100+ categories.

### Phase 5: Dashboard Sidebar (Month 6-9)
1. Build `fns-dashboard-sidebar-*` namespace.
2. Implement role-based menu items.
3. Add real-time notification badges.
4. Test with vendor, client, and admin roles.

### Phase 6: Refinement (Month 9-12)
1. Collect user feedback on sidebar usability.
2. A/B test collapsed vs. open default on desktop.
3. Optimize animation performance.
4. Add keyboard shortcuts (e.g., `Ctrl + B` to toggle).
5. Document final sidebar behaviour in component library.

### Backward Compatibility Checklist

At every phase, verify:
- [ ] Pages without sidebars are unchanged.
- [ ] No horizontal scroll on any device.
- [ ] No CSS leaks from `sidebar.css`.
- [ ] No JS errors on pages without mount points.
- [ ] Accessibility passes (keyboard, screen reader, focus).
- [ ] Performance budget maintained (< 50KB for sidebar CSS + JS).

---

## Summary

| Principle | Decision |
|-----------|----------|
| **Sidebar type** | Hybrid responsive (push desktop, overlay tablet, off-canvas mobile) |
| **Opt-in mechanism** | `data-page-type` on `<body>` + mount point `<aside id="fns-sidebar-mount">` |
| **CSS strategy** | Separate `sidebar.css`, lazy-loaded per page |
| **JS strategy** | Separate `sidebar.js`, mount point check, state persistence |
| **Content protection** | `min-width: 320px` on main content, overlay below 1099px |
| **Template system** | `SidebarTemplates` object with blog/marketplace/dashboard variants |
| **Data strategy** | Static content renders immediately; dynamic data loads asynchronously |
| **Testing strategy** | Isolated test page → one blog article → all blog articles → marketplace → dashboard |
| **Integration** | Header toggle button controlled by page type; footer unaffected |
| **Accessibility** | Keyboard navigation, focus management, ARIA attributes, WCAG AA |

**This document must be reviewed before any sidebar code is written.**
