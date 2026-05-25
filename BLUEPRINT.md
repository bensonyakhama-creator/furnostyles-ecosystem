# Furnostyles Clean Rebuild — Blueprint

> Study-based blueprint only. No site files created yet.
> Reference site: `furnostyles-fresh-structure/`
> Do NOT edit the reference site.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| **Name** | Furnostyles |
| **Tagline** | Personal Luxury. Elevated. |
| **Primary blue** | `#061f29` / `#072d3a` |
| **Gold accent** | `#d4af37` / `#f0d36f` (light) |
| **Background** | `#eef2f4` (soft grey-blue) |
| **Text** | `#10262e` (near black) |
| **Muted text** | `#60757d` |
| **Font** | Inter → ui-sans-serif → system-ui → Arial |
| **Phone** | +254 713 639 205 |
| **Email** | furnostyles@gmail.com |
| **Address** | Kasarani Mwiki Road, Hunters, Kasarani, Nairobi, Kenya |
| **WhatsApp** | https://wa.me/254713639205 |
| **Hosting** | Cloudflare Pages (static) |

---

## 2. What is Wrong with the Current Site (do not repeat these)

- `css/style.css` is **234 KB** — one giant bloated file for the entire site
- `services.html` has **hundreds of lines of inline `<style>` tags** inside the page
- `cart.html` has **broken emoji characters** (`??` instead of emoji) — encoding issue
- `realestate.html` is **552 bytes** — basically a stub with no content
- `homepage.html` had the **entire homepage pasted as a paragraph** inside a hero `<p>` tag
- Multiple `DOMContentLoaded` listeners firing in `main.js` causing conflicts
- Footer was mounted via JS but was **invisible** due to global CSS overrides
- No consistent naming — pages mix `.premium-*`, `.fld-*`, `.fa-*` with no system
- `firebase-config.js` still uses **placeholder values** — Firebase not connected
- Inline `style=""` on structural elements throughout every page
- `dropshipping.html` at root is **54 bytes** — empty stub
- No shared header component — every page duplicates the same 30 lines of header HTML
- Broken CSS cascade — global styles override component styles randomly

---

## 3. Site Map (all pages to rebuild)

### Public Pages
```
index.html                      — Homepage
marketplace.html                — Main marketplace hub
services.html                   — All services listing
interior-design.html            — Interior design service page
repairs.html                    — Repairs & maintenance
materials.html                  — Materials supply
realestate.html                 — Real estate support (currently a stub — needs full page)
property-management.html        — Property management
about.html                      — About Furnostyles
contact.html                    — Contact & enquiry
investment.html                 — Investment opportunities
portfolio.html                  — Project portfolio / showcase
blogs.html                      — Blog listing hub
news.html                       — News/announcements
advertise.html                  — Advertise on Furnostyles
cart.html                       — Unified cart
checkout.html                   — Checkout
product-detail.html             — Single product detail
buyer-protection.html           — Buyer protection policy
return-policy.html              — Returns policy
vendor-policy.html              — Vendor policy
service-policy.html             — Service policy
dispute-policy.html             — Dispute resolution
privacy-policy.html             — Privacy policy
shipping-policy.html            — Shipping policy
warranty-policy.html            — Warranty policy
```

### Marketplace Sub-pages
```
pages/market/secondhand.html         — Browse secondhand listings
pages/market/sell-secondhand.html    — List a used item for sale
pages/market/dropshipping.html       — Imported / dropshipping products
pages/market/product-sourcing.html   — Request product sourcing
pages/market/product-reviews.html    — Product reviews
```

### Account & Auth
```
accounts/auth/login.html             — Login / signup
accounts/register.html               — Registration
```

### Dashboards (role-based)
```
client/dashboard.html                          — Client dashboard
accounts/vendor/vendor-dashboard.html          — Vendor seller center
accounts/vendor/vendor-upload.html             — Vendor product upload
accounts/vendor/seller-store.html              — Vendor storefront
accounts/vendor/vendor-chat.html               — Vendor buyer messages
accounts/vendor/provider-account.html          — Provider/contractor account
accounts/property-owner/dashboard.html         — Property owner dashboard
accounts/provider/dashboard.html               — Service provider dashboard
admin/admin-pro.html                           — Admin control panel
admin/users/users.html                         — User management
admin/orders.html                              — Orders management
admin/products.html                            — Product moderation
admin/vendors.html                             — Vendor management
admin/properties.html                          — Property listings management
admin/messages/messages.html                   — Support messages
```

---

## 4. Header — Exact Structure (same across all public pages)

```html
<div class="fns-topbar">
  <span><strong>Furnostyles</strong> — Personal Luxury. Elevated.</span>
  <span>Kasarani, Nairobi · +254 713 639 205 · furnostyles@gmail.com</span>
</div>

<header class="fns-header">
  <a class="fns-brand" href="/index.html">
    <img src="/assets/images/logo.png" alt="Furnostyles" onerror="this.remove()">
    <span>Furnostyles</span>
  </a>
  <form class="fns-search" data-fns-search role="search">
    <input type="search" placeholder="Search furniture, services, marketplace...">
    <button type="submit">Search</button>
  </form>
  <div class="fns-header-actions">
    <button type="button" data-fns-cart-btn>
      🛒 <span data-fns-cart-count>0</span>
    </button>
    <button type="button" data-fns-alerts-btn>
      🔔 <span data-fns-alerts-count>0</span>
    </button>
    <button type="button" data-fns-account-btn>
      <span data-fns-avatar>👤</span>
      <span data-fns-username hidden></span>
    </button>
  </div>
</header>
```

**Rules:**
- No inline styles on header elements ever
- `fns-header` is sticky, glassmorphism backdrop
- Header compacts on scroll via JS class `.is-compact`
- Brand shows logo image, falls back to text if image missing
- Cart count reads from localStorage `cart` key
- Account state driven by `FurnostylesFirebase.getUser()`

**Floating elements (outside layout, after main):**
```html
<a class="fns-float-cart" href="cart.html">Cart <span data-fns-cart-count>0</span></a>
<a class="fns-float-chat" href="https://wa.me/254713639205" target="_blank" rel="noopener noreferrer">WhatsApp Chat</a>
```

---

## 5. Footer — Structure and Data

Footer is rendered by `js/footer.js` from a config object. Mount point:
```html
<div id="fns-footer-mount"></div>
```

**Sections rendered (in order):**
1. Announcement bar (gold, dismissible)
2. Emergency repair CTA (dark red, WhatsApp CTA + phone)
3. Top section: brand info left + newsletter signup right
4. Quick contact pill row (WhatsApp, Call, Email)
5. Business hours pill row
6. Trust badges pill row
7. Payment methods pill row
8. 5-column link grid
9. Social links row
10. Copyright bottom bar + Back to Top button

**Footer brand data:**
- Name, tagline, address, phone, email
- Hours: Mon–Fri 8–6, Sat 9–4, Sun Closed

**5 footer columns:**
1. Customer Service — Help Center, Checkout, Cart, My Account, Contact
2. Marketplace — Main, Secondhand, Sell Used, Imported, Reviews
3. Sourcing & Supply — Sourcing, Materials, Vendor Upload, Provider, Advertise
4. Services — All, Interior Design, Repairs, Real Estate, Property Mgmt
5. Company — About, Blogs, Investment, Admin, Contact

---

## 6. CSS Architecture (new, clean)

**One class prefix: `fns-` for all new rebuild classes. No exceptions.**

```
css/
├── base.css        — variables, reset, body, typography, utilities
├── layout.css      — topbar, header, footer, float buttons, page shell
├── components.css  — buttons, cards, badges, pills, forms, grids
├── pages.css       — page-specific sections (hero, strip, section heads, etc.)
└── dashboard.css   — all dashboard/account sidebar layouts
```

**CSS variables (in base.css):**
```css
:root {
  --fns-blue:       #061f29;
  --fns-blue-2:     #0b2f3a;
  --fns-blue-3:     #0d3b47;
  --fns-gold:       #d4af37;
  --fns-gold-light: #f0d36f;
  --fns-bg:         #eef2f4;
  --fns-card:       rgba(255,255,255,0.88);
  --fns-text:       #10262e;
  --fns-muted:      #60757d;
  --fns-border:     rgba(6,31,41,0.10);
  --fns-shadow:     0 24px 60px rgba(6,31,41,0.14);
  --fns-shadow-s:   0 14px 30px rgba(6,31,41,0.09);
  --fns-radius-xl:  34px;
  --fns-radius-lg:  26px;
  --fns-radius-md:  18px;
  --fns-max:        1240px;
}
```

**Rules:**
- Zero inline styles on structural elements
- Zero `<style>` blocks inside HTML pages
- All CSS lives in the four files above
- Each page only loads what it needs: `base.css` + `layout.css` + `components.css` + `pages.css`
- Dashboards load `base.css` + `dashboard.css`

---

## 7. JavaScript Architecture

```
js/
├── core.js     — header compact scroll, cart count, account state, search, alerts, back-to-top
├── footer.js   — footer config data + renderer (all-in-one, no external dependency)
└── firebase.js — Firebase bridge (dual-mode: local first, Firebase when keys present)
```

**Rules:**
- Each page gets ONE `DOMContentLoaded` listener
- No `onclick=""` attributes in HTML. All events via `addEventListener`
- No emoji characters hardcoded in JS strings (use HTML entities or Unicode escapes)
- `firebase.js` is the cleaned version of the existing bridge (it works well, keep the concept)
- `core.js` handles: search redirect, cart count from localStorage, account display, header compact

**Script loading order (every public page):**
```html
<script src="/js/firebase.js" defer></script>
<script src="/js/core.js" defer></script>
<script src="/js/footer.js" defer></script>
<!-- page-specific script last if needed -->
```

---

## 8. Firebase Data Model

From `firebase-data-plan.json` — keep this structure in rebuild:

| Collection | Key Fields |
|---|---|
| `users` | uid, role, name, email, phone, status, createdAt |
| `products` | title, category, price, images, videos, vendorId, status |
| `properties` | title, type, location, price, images, ownerId, verificationStatus |
| `services` | title, category, providerId, images, status |
| `uploads` | uploadType, title, ownerId, status, createdAt |
| `orders` | buyerId, items, status, paymentStatus |
| `reports` | reporterId, targetType, targetId, reason, status |

**User Roles:**
client · vendor · propertyOwner · agent · provider · contractor · instructor · support · admin · superAdmin

**Firebase mode:**
- Works in **local mode** (localStorage) when no real Firebase keys are present
- Switches to **live Firebase** when real keys are added to `firebase-config.js`
- This dual-mode bridge is the correct pattern — keep it

---

## 9. Marketplace — How it Works

**marketplace.html** is the hub. It has:
- Hero section with search + filters
- Category tabs or filter strip: All, Furniture, Materials, Decor, Lighting, etc.
- Product grid (dynamically rendered from Firebase or localStorage)
- Links to sub-pages for Secondhand, Imported, Sourcing, Reviews

**Sub-pages:**
| Page | Purpose |
|---|---|
| `secondhand.html` | Browse used items listed by sellers |
| `sell-secondhand.html` | Form to list your used item |
| `dropshipping.html` | Imported products via Alibaba/Jumia supplier links |
| `product-sourcing.html` | Request form — user describes what they want, Furnostyles sources it |
| `product-reviews.html` | Community product reviews |

**Cart logic:**
- localStorage key: `cart` — array of `{id, title, price, qty, type, image}`
- Types: `product`, `service`, `sourcing-request`, `secondhand`
- Cart page reads array, renders items, shows total
- Checkout reads cart, takes payment method + delivery info

---

## 10. Account System — Dashboard Roles

All dashboards share the same layout:
```html
<div class="fns-dash">
  <aside class="fns-dash-sidebar">...</aside>
  <main class="fns-dash-main">...</main>
</div>
```

| Role | Dashboard | Key Features |
|---|---|---|
| **Client** | `client/dashboard.html` | Orders, saved items, request history, profile |
| **Vendor** | `accounts/vendor/vendor-dashboard.html` | Products, orders, store, buyer chat, analytics |
| **Property Owner** | `accounts/property-owner/dashboard.html` | Property listings, rental enquiries, maintenance |
| **Provider** | `accounts/provider/dashboard.html` | Service requests, calendar, job history |
| **Admin** | `admin/admin-pro.html` | Users, uploads, moderation, orders, reports |

**Auth flow:**
- Login: `accounts/auth/login.html` — email/password via Firebase Auth or localStorage mock
- On login: store user profile via `FurnostylesFirebase.setUser(profile)`
- On page load: `FurnostylesFirebase.getUser()` — redirect if not logged in
- Role-based redirect: each dashboard checks `role` from user profile

---

## 11. Page Sections Reference

### Homepage (`index.html`) sections:
1. Hero — heading, tagline, 3 CTAs (Services, Marketplace, Real Estate)
2. Quick link strip — scrollable pill nav
3. Category cards (3) — Services, Marketplace, Property
4. Stats bar — 10+ Categories, 24/7, 100% Custom, 1 Platform
5. Services preview grid (6 cards)
6. Project showcase / portfolio grid
7. Repair ad banner (dark, CTA)
8. Marketplace product preview (4 products)
9. Real estate section (4 model cards)
10. Why Furnostyles / testimonials (3 cards)
11. Request category section (4 cards with images)
12. Footer

### Services (`services.html`) sections:
1. Hero
2. Category panel grid (image-background cards per service category)
3. Quick service links grid
4. Full services card grid (all individual services)
5. How it works (4-step process)
6. FAQ accordion
7. Footer

### Marketplace (`marketplace.html`) sections:
1. Hero with stats (10K+ products, Global suppliers, Verified)
2. Search + filter bar
3. Product grid (dynamic)
4. Sub-marketplace links (Secondhand, Imported, Sourcing, Reviews)
5. Footer

---

## 12. Shared Components Checklist

| Component | File | Notes |
|---|---|---|
| Topbar | `css/layout.css` | Dark blue, brand name + contact info |
| Header | `css/layout.css` + `js/core.js` | Sticky, glassmorphism, search, cart, account |
| Footer | `js/footer.js` + `css/layout.css` | Full rendered from data config |
| Float buttons | `css/layout.css` | Cart float + WhatsApp chat float |
| Cards | `css/components.css` | Reveal animation via IntersectionObserver |
| Buttons | `css/components.css` | Gold, dark, light, outline variants |
| Badges/pills | `css/components.css` | Used in footer rows and strip nav |
| Form inputs | `css/components.css` | Search, newsletter, enquiry forms |
| Dashboard shell | `css/dashboard.css` + `js/core.js` | Sidebar + main layout for all dashboards |

---

## 13. Folder Structure (target)

```
furnostyles-clean-rebuild/
├── assets/
│   └── images/              (copied from original)
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── pages.css
│   └── dashboard.css
├── js/
│   ├── core.js
│   ├── footer.js
│   └── firebase.js
├── pages/
│   └── market/
│       ├── secondhand.html
│       ├── sell-secondhand.html
│       ├── dropshipping.html
│       ├── product-sourcing.html
│       └── product-reviews.html
├── accounts/
│   ├── auth/
│   │   └── login.html
│   ├── vendor/
│   │   ├── vendor-dashboard.html
│   │   ├── vendor-upload.html
│   │   ├── seller-store.html
│   │   └── vendor-chat.html
│   ├── property-owner/
│   │   └── dashboard.html
│   └── provider/
│       └── dashboard.html
├── client/
│   └── dashboard.html
├── admin/
│   ├── admin-pro.html
│   ├── orders.html
│   ├── products.html
│   ├── vendors.html
│   ├── properties.html
│   └── users/
│       └── users.html
├── index.html
├── marketplace.html
├── services.html
├── interior-design.html
├── repairs.html
├── materials.html
├── realestate.html
├── property-management.html
├── about.html
├── contact.html
├── investment.html
├── portfolio.html
├── blogs.html
├── cart.html
├── checkout.html
├── product-detail.html
└── [policy pages]
```

---

## 14. Build Order (recommended sequence)

1. **CSS files** — base, layout, components, pages, dashboard
2. **JS files** — firebase.js, core.js, footer.js
3. **index.html** — homepage (template for all other public pages)
4. **marketplace.html**
5. **services.html**
6. **cart.html + checkout.html**
7. **accounts/auth/login.html**
8. **client/dashboard.html** (dashboard template)
9. **All other dashboards** (vendor, property-owner, provider, admin)
10. **All remaining public pages** (interior-design, repairs, materials, realestate, about, contact, etc.)
11. **Marketplace sub-pages**
12. **Policy pages**

---

## 15. Build Rules

- Class prefix: `fns-` on everything
- No inline styles anywhere
- No `<style>` blocks in HTML files
- No `onclick=""` attributes — all via `addEventListener`
- No broken emoji encoding — use Unicode escapes (`\u{1F6D2}`) or HTML entities
- Footer always works — rendered by `footer.js` from config, never hardcoded
- Header always consistent — same HTML, same classes, same JS behavior
- Firebase bridge: local mode by default, live when real keys are added
- Every page: one `DOMContentLoaded` listener maximum
- Images use `loading="lazy"` and `onerror` fallback
- All links use root-relative paths (`/marketplace.html` not `../marketplace.html`)
- Pages are static HTML, Cloudflare Pages compatible, no build step required
