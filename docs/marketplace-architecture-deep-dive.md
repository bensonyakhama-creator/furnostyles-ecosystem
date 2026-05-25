# Marketplace Architecture Deep Dive

**Document Type:** Marketplace Architecture | **Date:** 2026-05-22 | **Version:** 1.0 | **Status:** Future Implementation (Phase 5)

---

## How to Use This Document

This document provides a deep dive into the marketplace architecture for Furnostyles. Use it to:

- Understand the marketplace data model
- Plan category and product structures
- Design vendor and sourcing systems
- Implement filtering and search
- Ensure scalability and performance
- Guide AI-assisted marketplace implementation

**This is a planning document. Do not implement marketplace until Phase 5.**

---

## Categories

### Category Hierarchy

The marketplace uses a flat category structure with subcategories for simplicity and scalability.

| Category | Subcategories | Description |
|----------|---------------|-------------|
| **Furniture** | Sofas, Chairs, Tables, Beds, Storage | Home furniture |
| **Decor** | Rugs, Lighting, Wall Art, Mirrors, Clocks | Home decor items |
| **Kitchen** | Appliances, Cookware, Dining, Storage | Kitchen essentials |
| **Bedroom** | Bedding, Mattresses, Nightstands, Dressers | Bedroom essentials |
| **Bathroom** | Towels, Accessories, Storage, Fixtures | Bathroom essentials |
| **Office** | Desks, Chairs, Storage, Accessories | Home office furniture |
| **Outdoor** | Patio Furniture, Garden Decor, Lighting | Outdoor living |
| **Lighting** | Ceiling Lights, Lamps, Outdoor Lighting | Lighting fixtures |
| **Textiles** | Curtains, Rugs, Bedding, Throws | Fabric items |
| **Accessories** | Vases, Sculptures, Candles, Planters | Decorative accessories |

### Category Data Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Category ID (slug) |
| `name` | string | Category name |
| `description` | string | Category description |
| `image` | string | Category image URL |
| `subcategories` | array | Array of subcategory objects |
| `productCount` | number | Number of products in category |
| `isActive` | boolean | Category active status |

### Category Page Structure

```
Category Page:
- Hero section (category image, title, description)
- Subcategory navigation
- Product grid (12-24 products per page)
- Filters sidebar (price, material, color)
- Pagination
```

---

## Products

### Product Data Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Auto-generated ID |
| `vendorId` | string | Vendor UID |
| `categoryId` | string | Category ID |
| `subcategoryId` | string | Subcategory ID |
| `name` | string | Product name |
| `description` | string | Product description (500+ words) |
| `price` | number | Price in KES |
| `comparePrice` | number | Original price (for discounts) |
| `images` | array | Array of image URLs (3-5 images) |
| `thumbnail` | string | Thumbnail image URL |
| `material` | string | Material (wood, metal, fabric, etc.) |
| `color` | string | Color |
| `dimensions` | object | Dimensions object (length, width, height) |
| `weight` | number | Weight in kg |
| `stock` | number | Stock quantity |
| `sku` | string | Stock keeping unit |
| `tags` | array | Array of tags for search |
| `status` | string | active, inactive, out of stock |
| `featured` | boolean | Featured product flag |
| `rating` | number | Average rating (1-5) |
| `reviewCount` | number | Number of reviews |
| `createdAt` | timestamp | Product creation date |
| `updatedAt` | timestamp | Last update date |

### Product Image Requirements

| Requirement | Specification |
|-------------|---------------|
| **Format** | WebP (primary), JPG (fallback) |
| **Size** | 1200x1200px (square), 1200x1600px (portrait) |
| **File Size** | < 500KB per image |
| **Number** | Minimum 3, maximum 5 images |
| **Naming** | `{productId}-{index}.webp` |

### Product Card Component

```html
<div class="fns-card fns-card--product">
  <div class="fns-card__image">
    <img src="{thumbnail}" alt="{name}" loading="lazy">
    {featuredBadge}
  </div>
  <div class="fns-card__body">
    <h3 class="fns-card__title">{name}</h3>
    <p class="fns-card__price">KES {price}</p>
    <p class="fns-card__vendor">{vendorName}</p>
    <button class="fns-btn fns-btn--primary fns-btn--sm">Add to Cart</button>
  </div>
</div>
```

---

## Vendors

### Vendor Data Model

| Field | Type | Description |
|-------|------|-------------|
| `uid` | string | Firebase Auth UID (document ID) |
| `businessName` | string | Business name |
| `description` | string | Business description (300+ words) |
| `logo` | string | Business logo URL |
| `coverImage` | string | Cover image URL |
| `category` | string | Primary category |
| `location` | string | Business location |
| `address` | object | Address object |
| `phone` | string | Business phone |
| `email` | string | Business email |
| `website` | string | Business website (optional) |
| `status` | string | pending, approved, rejected, suspended |
| `rating` | number | Average rating (1-5) |
| `reviewCount` | number | Number of reviews |
| `productCount` | number | Number of active products |
| `createdAt` | timestamp | Vendor registration date |
| `updatedAt` | timestamp | Last update date |

### Vendor Profile Page Structure

```
Vendor Profile Page:
- Hero section (cover image, logo, business name)
- Vendor info (location, rating, product count)
- Vendor description
- Product grid (vendor's products)
- Contact button
- Reviews section
```

---

## Sourcing

### Sourcing Page Structure

```
Sourcing Page:
- Hero section (title, description, CTA)
- Vendor benefits (why sell on Furnostyles)
- Requirements (what vendors need)
- Application form
- FAQ section
```

### Vendor Application Form

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `businessName` | text | Yes | Business name |
| `contactName` | text | Yes | Contact person name |
| `email` | email | Yes | Business email |
| `phone` | text | Yes | Business phone |
| `category` | select | Yes | Primary category |
| `description` | textarea | Yes | Business description |
| `website` | url | No | Business website |
| `logo` | file | No | Business logo |

### Vendor Approval Workflow

```
1. Vendor submits application via sourcing page.
2. Application saved to Firestore (status: pending).
3. Admin receives notification.
4. Admin reviews application.
5. Admin approves or rejects.
6. If approved:
   - Vendor status updated (status: approved)
   - Vendor dashboard access granted
   - Welcome email sent
7. If rejected:
   - Vendor status updated (status: rejected)
   - Rejection email sent
```

---

## Filtering

### Filter Options

| Filter | Type | Options |
|--------|------|---------|
| **Price** | Range | Min-max price slider |
| **Category** | Checkbox | All categories |
| **Material** | Checkbox | Wood, metal, fabric, glass, etc. |
| **Color** | Checkbox | Color swatches |
| **Rating** | Checkbox | 4+, 3+, 2+, 1+ stars |
| **Vendor** | Checkbox | Vendor names |
| **Availability** | Checkbox | In stock, out of stock |

### Filter Implementation

```javascript
// Client-side filtering (Phase 5)
// Server-side filtering (Phase 6+ with Cloud Functions)

function filterProducts(products, filters) {
  return products.filter(product => {
    // Price filter
    if (filters.price.min && product.price < filters.price.min) return false;
    if (filters.price.max && product.price > filters.price.max) return false;
    
    // Category filter
    if (filters.category.length && !filters.category.includes(product.categoryId)) return false;
    
    // Material filter
    if (filters.material.length && !filters.material.includes(product.material)) return false;
    
    // Rating filter
    if (filters.rating && product.rating < filters.rating) return false;
    
    // Availability filter
    if (filters.availability === 'in-stock' && product.stock === 0) return false;
    
    return true;
  });
}
```

### Filter UI Component

```html
<div class="fns-filters">
  <div class="fns-filters__section">
    <h4>Price Range</h4>
    <input type="range" min="0" max="100000" step="1000">
  </div>
  <div class="fns-filters__section">
    <h4>Category</h4>
    <label><input type="checkbox" value="furniture"> Furniture</label>
    <label><input type="checkbox" value="decor"> Decor</label>
  </div>
  <div class="fns-filters__section">
    <h4>Material</h4>
    <label><input type="checkbox" value="wood"> Wood</label>
    <label><input type="checkbox" value="metal"> Metal</label>
  </div>
</div>
```

---

## Product Pages

### Product Detail Page Structure

```
Product Detail Page:
- Breadcrumb navigation
- Product gallery (main image + thumbnails)
- Product info (name, price, description)
- Product details (material, dimensions, weight)
- Vendor info (name, rating, link to profile)
- Add to cart button
- Quantity selector
- Related products
- Reviews section
- FAQ section
```

### Product Gallery Component

```html
<div class="fns-gallery">
  <div class="fns-gallery__main">
    <img src="{mainImage}" alt="{productName}">
  </div>
  <div class="fns-gallery__thumbnails">
    <img src="{thumb1}" alt="Thumbnail 1">
    <img src="{thumb2}" alt="Thumbnail 2">
    <img src="{thumb3}" alt="Thumbnail 3">
  </div>
</div>
```

### Product Schema Markup

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "{productName}",
  "image": "{productImage}",
  "description": "{productDescription}",
  "brand": {
    "@type": "Brand",
    "name": "{vendorName}"
  },
  "offers": {
    "@type": "Offer",
    "price": "{price}",
    "priceCurrency": "KES",
    "availability": "https://schema.org/InStock"
  }
}
```

---

## Search Architecture

### Search Implementation Strategy

| Phase | Implementation | Description |
|-------|----------------|-------------|
| **Phase 5** | Client-side search | Simple text search on product names |
| **Phase 6** | Firestore queries | Firestore text search (limited) |
| **Phase 7** | Algolia integration | Full-text search with filters |
| **Phase 8** | AI-powered search | Semantic search, recommendations |

### Client-Side Search (Phase 5)

```javascript
function searchProducts(products, query) {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
```

### Search UI Component

```html
<div class="fns-search">
  <input type="text" placeholder="Search products..." class="fns-search__input">
  <button class="fns-search__button">Search</button>
</div>
<div class="fns-search__results">
  <!-- Search results -->
</div>
```

### Search Analytics

| Metric | Description |
|--------|-------------|
| **Search Queries** | Track top search queries |
| **Zero Results** | Track queries with no results |
| **Click-Through Rate** | Track search result clicks |
| **Conversion Rate** | Track search-to-purchase conversion |

---

## Marketplace Performance

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Page Load** | < 2s | Lighthouse |
| **Product Grid Load** | < 1s | Lighthouse |
| **Filter Application** | < 500ms | JavaScript timing |
| **Search Response** | < 300ms | JavaScript timing |
| **Image Load** | < 500ms | Lighthouse |

### Optimization Strategies

| Strategy | Implementation |
|----------|----------------|
| **Image Optimization** | WebP format, lazy loading, CDN |
| **Pagination** | Limit products per page (24) |
| **Caching** | Cache product data, category data |
| **Code Splitting** | Load marketplace JS only on marketplace pages |
| **Indexing** | Firestore indexes for filtering queries |

---

## Marketplace Security

### Security Rules

| Rule | Implementation |
|------|----------------|
| **Vendor Isolation** | Vendors can only manage their own products |
| **Product Approval** | Admin must approve products before live |
| **Price Validation** | Prevent negative prices |
| **Stock Validation** | Prevent negative stock |
| **Image Validation** | Validate image size, type before upload |

### Moderation Workflow

```
1. Vendor uploads product.
2. Product saved to Firestore (status: pending).
3. Admin receives notification.
4. Admin reviews product (images, description, price).
5. Admin approves or rejects.
6. If approved:
   - Product status updated (status: active)
   - Product visible in marketplace
7. If rejected:
   - Product status updated (status: rejected)
   - Vendor notified with reason
```

---

## Summary

The marketplace architecture covers:

- **Categories:** Flat hierarchy with 10 main categories
- **Products:** Comprehensive data model with images, pricing, reviews
- **Vendors:** Vendor profiles, approval workflow, product management
- **Sourcing:** Vendor application form, approval process
- **Filtering:** Price, category, material, color, rating, availability
- **Product Pages:** Gallery, info, vendor, related products, reviews
- **Search Architecture:** Client-side to AI-powered search evolution
- **Performance:** Targets and optimization strategies
- **Security:** Vendor isolation, product approval, moderation

**Follow this architecture when implementing marketplace in Phase 5. Maintain scalability and security throughout.**
