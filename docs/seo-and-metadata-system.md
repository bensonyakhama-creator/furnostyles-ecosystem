# Furnostyles SEO and Metadata Management System

**Date:** 2026-05-22 | **Scope:** Brand website, blog, services, portfolio, future marketplace  
**Read this before creating or editing any page.**

---

## 1. SEO Architecture Principles

SEO is built into every page structure. Goals: make it obvious to Google what each page is about, why it matters, and how it connects to other pages.

| Principle | Meaning |
|-----------|---------|
| One page, one purpose | Every page targets one primary keyword topic. |
| Content first, optimisation second | Write for humans. Then verify search engines can understand it. |
| Consistency across the site | Same heading hierarchy, meta structure, and linking patterns everywhere. |
| Technical SEO is non-negotiable | Speed, mobile-friendliness, and crawlability are prerequisites. |
| Local context is built in | Nairobi and Kenya context appears naturally across all content. |

---

## 2. Meta Title Standards

### Formula

```
Primary Keyword - Secondary Context | Brand Name
```

### Rules

| Rule | Requirement | Example |
|------|-------------|---------|
| Length | 50-60 characters max | "Interior Design Nairobi - Services & Trends | Furnostyles" (55) |
| Primary keyword first | Most important keyword at the start | "Interior Design Nairobi" not "Furnostyles — Interior Design" |
| Brand name last | Separated by pipe `|` | `... | Furnostyles` |
| Unique per page | No two pages share the same title | Every page has a distinct focus |
| No keyword stuffing | One primary keyword, one secondary at most | Natural, not a list of keywords |

### Examples

| Page | Title | Length |
|------|-------|--------|
| Homepage | Premium Interior Design & Home Finishing in Nairobi \| Furnostyles | 58 |
| Blog article | Modern Luxury Interior Design Trends in Kenya 2026 \| Furnostyles | 63 |
| Services | Interior Design, Repairs & House Finishing \| Furnostyles | 55 |
| Contact | Contact Furnostyles — Interior Design in Nairobi | 48 |

```html
<title>Modern Luxury Interior Design Trends in Kenya 2026 | Furnostyles</title>
```

---

## 3. Meta Description Standards

### Formula

```
[What the page offers] + [Why it matters] + [Call to action or context]
```

### Rules

| Rule | Requirement | Example |
|------|-------------|---------|
| Length | 150-160 characters | Google truncates after ~160 |
| Include primary keyword | Appears naturally | "Discover modern luxury interior design trends in Kenya..." |
| Active voice | Speak to the reader | "Discover the latest trends..." not "This article discusses trends." |
| Include a benefit | What will the reader gain? | "...to create a home that feels expensive and welcoming." |
| Unique per page | Never copy the same description | Every page distinct |

### Examples

| Page | Description | Length |
|------|-------------|--------|
| Homepage | Furnostyles delivers premium interior design, house finishing, and repair services in Nairobi. Transform your space with expert craftsmanship. | 152 |
| Blog | Discover the top modern luxury interior design trends in Kenya for 2026. From open-plan living to sustainable materials, learn how to elevate your Nairobi home. | 160 |
| Contact | Get in touch with Furnostyles for interior design consultations, house finishing quotes, and home repair services in Nairobi. Call or WhatsApp us today. | 155 |

```html
<meta name="description" content="Discover the top modern luxury interior design trends in Kenya for 2026.">
```

---

## 4. Heading Hierarchy Standards

### Rules

| Rule | Requirement |
|------|-------------|
| One H1 per page | Exactly one. Never more, never zero. |
| H1 contains primary keyword | Naturally, not forced. |
| H2s divide major sections | Each major section gets an H2. |
| H3s divide H2 subsections | Subsections under an H2. |
| No skipped levels | H1 -> H2 -> H3. Never H1 -> H3. |
| Headings are descriptive | Should make sense out of context. |
| No headings for styling | Use CSS for big bold text. |

### Example Hierarchy (Blog)

```html
<h1>Modern Luxury Interior Design Trends in Kenya 2026</h1>

<h2>Why Interior Design Matters for Nairobi Homes</h2>
  <h3>The Cost of Poor Design</h3>

<h2>Top 5 Interior Design Trends for 2026</h2>
  <h3>1. Open-Plan Living Spaces</h3>
  <h3>2. Sustainable and Natural Materials</h3>

<h2>Frequently Asked Questions</h2>
  <h3>How much does interior design cost in Nairobi?</h3>

<h2>Conclusion: Start Your Design Journey</h2>
```

### Checklist

- [ ] Exactly one `<h1>` on the page.
- [ ] H1 contains the primary keyword naturally.
- [ ] H2s for every major section.
- [ ] No skipped heading levels.
- [ ] No heading used purely for styling.

---

## 5. URL Slug Standards

### Rules

| Rule | Requirement | Example |
|------|-------------|---------|
| Lowercase only | All letters lowercase | `modern-luxury-interior-design` |
| Hyphens as separators | Words separated by hyphens | `interior-design-nairobi` |
| No spaces | Never use spaces | Spaces become `%20` |
| No special characters | No `&`, `?`, `#`, `@` | Clean URLs only |
| No dates in slugs | Unless genuinely time-sensitive | `modern-luxury-interior-design` not `...-2026` |
| Remove stop words | `a`, `an`, `the`, `in`, `and`, `of` if possible | `interior-design-nairobi` not `interior-design-in-nairobi` |
| Primary keyword included | Slug contains main keyword | `house-finishing-nairobi` |
| Short and descriptive | Under 60 characters | Concise |
| Permanent | Never change after publishing | Changing breaks links and rankings |
| Use `.html` extension | Static hosting compatibility | `...-kenya.html` |

### Examples

| Page | Slug |
|------|------|
| Blog: Modern luxury interior design | `blogs/modern-luxury-interior-design-kenya.html` |
| Blog: Living room design ideas | `blogs/living-room-design-ideas-kenya.html` |
| Service: House finishing | `house-finishing-nairobi.html` |
| Product (future) | `marketplace/porcelain-floor-tile-60x60-grey.html` |

---

## 6. Internal Linking Strategy

### Rules

| Rule | Requirement | Example |
|------|-------------|---------|
| Every page links to at least 2 other pages | No orphan pages | Blog links to related articles and services |
| Descriptive anchor text | Link text describes destination | "our interior design services" not "click here" |
| Link to cornerstone content often | Cornerstone articles get most internal links | Every relevant blog links to main service page |
| Contextual links | Link makes sense in the sentence | "We recommend durable porcelain tiles for Nairobi homes." |
| Max 2 marketplace links per blog | Blog should not feel like advertising | One service link, one product link |
| Service pages link to related services | Cross-sell naturally | House finishing page links to interior design |
| Footer contains key page links | Consistent navigation | Services, blog, portfolio, contact, about |
| Avoid excessive links | 3-5 internal links per blog is ideal | Too many dilute value |

### Anchor Text Examples

| Bad | Why Bad | Good |
|-----|---------|------|
| "Click here" | No keyword, no context | "Explore our interior design portfolio" |
| "Read more" | Generic | "Learn more about house finishing in Nairobi" |
| "This page" | Vague | "Our complete house finishing service guide" |
| URL as text | Looks spammy | "Furnostyles interior design services" |

---

## 7. Canonical URL Strategy

### Rules

| Rule | Requirement |
|------|-------------|
| Absolute URL | Full URL including `https://` and domain |
| Consistent format | All pages use same URL format |
| Self-referencing | Page canonicals to itself unless explicitly a duplicate |
| HTTPS only | Never use `http://` in canonical |

### Implementation

```html
<link rel="canonical" href="https://furnostyles.com/blogs/modern-luxury-interior-design-kenya.html">
```

### When to Change Canonical

| Scenario | Solution |
|----------|----------|
| Page accessible with/without `.html` | Canonical to preferred version |
| URL parameters (sorting, filtering) | Canonical to parameter-less version |
| HTTP vs HTTPS | Always canonical to HTTPS |
| WWW vs non-WWW | Pick one, canonical to that |

---

## 8. Open Graph / Social Sharing Strategy

### Required Tags on Every Shareable Page

```html
<meta property="og:title" content="Modern Luxury Interior Design Trends in Kenya 2026 | Furnostyles">
<meta property="og:description" content="Discover the top modern luxury interior design trends in Kenya for 2026.">
<meta property="og:image" content="https://furnostyles.com/assets/images/blogs/blog-1-hero.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Modern luxury living room interior designed by Furnostyles in Nairobi">
<meta property="og:url" content="https://furnostyles.com/blogs/modern-luxury-interior-design-kenya.html">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Furnostyles">
<meta property="og:locale" content="en_KE">

<meta property="article:published_time" content="2026-05-22T08:00:00+03:00">
<meta property="article:modified_time" content="2026-05-22T08:00:00+03:00">
<meta property="article:author" content="Furnostyles Editorial">
<meta property="article:section" content="Interior Design">
<meta property="article:tag" content="Interior Design">
<meta property="article:tag" content="Nairobi">
<meta property="article:tag" content="Kenya">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Modern Luxury Interior Design Trends in Kenya 2026 | Furnostyles">
<meta name="twitter:description" content="Discover the top modern luxury interior design trends in Kenya for 2026.">
<meta name="twitter:image" content="https://furnostyles.com/assets/images/blogs/blog-1-hero.jpg">
<meta name="twitter:image:alt" content="Modern luxury living room interior designed by Furnostyles in Nairobi">
```

### Open Graph Rules

| Element | Requirement |
|---------|-------------|
| `og:title` | Same as meta title or slightly shorter |
| `og:description` | Same as meta description |
| `og:image` | Absolute URL. 1200x630px. Under 200KB. |
| `og:image:alt` | Descriptive alt text |
| `og:url` | Canonical URL of the page |
| `og:type` | `website` for standard pages, `article` for blog, `product` for products |
| `og:locale` | `en_KE` for English (Kenya) |
| `twitter:card` | `summary_large_image` for blog and product, `summary` for simple pages |

---

## 9. Structured Data / Schema Strategy

### Schema Types by Page

| Page Type | Primary Schema | Secondary Schema |
|-----------|---------------|------------------|
| Homepage | `Organization` | `WebSite`, `LocalBusiness` |
| Blog article | `Article` | `FAQPage`, `BreadcrumbList` |
| Service page | `Service` | `LocalBusiness`, `FAQPage` |
| Portfolio | `ImageGallery` | `BreadcrumbList` |
| Contact | `ContactPage` | `LocalBusiness` |
| About | `AboutPage` | `Organization` |
| Product (future) | `Product` | `Offer`, `AggregateRating` |
| Category (future) | `CollectionPage` | `BreadcrumbList` |

### Article Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Modern Luxury Interior Design Trends in Kenya 2026",
  "description": "Discover the top modern luxury interior design trends in Kenya for 2026.",
  "image": "https://furnostyles.com/assets/images/blogs/blog-1-hero.jpg",
  "author": { "@type": "Organization", "name": "Furnostyles Editorial" },
  "publisher": {
    "@type": "Organization",
    "name": "Furnostyles",
    "logo": { "@type": "ImageObject", "url": "https://furnostyles.com/assets/images/logos/logo-dark.png" }
  },
  "datePublished": "2026-05-22T08:00:00+03:00",
  "dateModified": "2026-05-22T08:00:00+03:00",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://furnostyles.com/blogs/modern-luxury-interior-design-kenya.html"
  }
}
</script>
```

### FAQ Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does interior design cost in Nairobi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Interior design costs in Nairobi typically range from KES 50,000 for a single room to KES 500,000+ for a full-home package."
      }
    }
  ]
}
</script>
```

### Organization Schema (Homepage)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Furnostyles",
  "url": "https://furnostyles.com",
  "logo": "https://furnostyles.com/assets/images/logos/logo-dark.png",
  "description": "Premium interior design, house finishing, and home repair services in Nairobi, Kenya.",
  "address": { "@type": "PostalAddress", "addressLocality": "Nairobi", "addressCountry": "KE" },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+254-713-639-205",
    "contactType": "customer service",
    "areaServed": "KE",
    "availableLanguage": "English"
  }
}
</script>
```

### Validation

Before publishing: copy JSON-LD into [Google Rich Results Test](https://search.google.com/test/rich-results) and confirm zero errors.

---

## 10. Blog SEO Standards

### Checklist Before Publishing

- [ ] Title is 50-60 characters, keyword first, brand last.
- [ ] Meta description is 150-160 characters, includes keyword, has benefit.
- [ ] Canonical URL is absolute and self-referencing.
- [ ] Open Graph tags present with 1200x630 image.
- [ ] Schema markup includes `Article` + `FAQPage` (if FAQs exist).
- [ ] H1 contains primary keyword naturally.
- [ ] H2s divide article into clear sections.
- [ ] No skipped heading levels.
- [ ] Table of contents links to every H2.
- [ ] Reading time calculated and displayed.
- [ ] Publish date visible and in schema.
- [ ] Author specified.
- [ ] 2-3 internal links to related articles or service pages.
- [ ] Every image has descriptive alt text.
- [ ] Hero image is 1200x800px, under 200KB, WebP fallback.
- [ ] URL slug is concise, keyword-rich, permanent.
- [ ] Word count: 2500-4000 for cornerstone, 1200-2000 for supporting, 600-1000 for quick tips.
- [ ] First paragraph includes primary keyword naturally.
- [ ] Conclusion includes CTA to a service page.
- [ ] FAQ section with 3-5 questions if topic warrants.

### URL Pattern

```
https://furnostyles.com/blogs/[descriptive-slug].html
```

---

## 11. Service Page SEO Standards

### Checklist

- [ ] Title includes service name + location.
- [ ] Meta description includes service benefit + location + CTA.
- [ ] H1 is the service name (e.g., "House Finishing Services in Nairobi").
- [ ] H2s cover: What is it, process, benefits, projects, CTA.
- [ ] Service schema included.
- [ ] LocalBusiness schema included.
- [ ] Internal links to related services and portfolio.
- [ ] CTA to contact form is prominent.
- [ ] Images show real work (not stock photos).
- [ ] FAQ section answers common service questions.

### URL Pattern

```
https://furnostyles.com/[service-slug].html
```

---

## 12. Portfolio SEO Standards

### Checklist

- [ ] Title includes "portfolio" + location + brand.
- [ ] Meta description describes portfolio scope.
- [ ] H1 is "Interior Design Portfolio — Nairobi & Kenya Projects" or similar.
- [ ] Each project has its own section with H2.
- [ ] Images have descriptive alt text with location.
- [ ] Schema includes `ImageGallery` or `CreativeWork`.
- [ ] Internal links to related services and blog articles.
- [ ] CTA to contact page.

---

## 13. Future Marketplace SEO Strategy

### Page Types and Targets

| Page Type | Primary Keyword | Schema |
|-----------|---------------|--------|
| Marketplace homepage | "buy building materials Nairobi" | `WebSite`, `Organization` |
| Category page | "floor tiles Nairobi" | `CollectionPage` |
| Product page | "porcelain tile 60x60 grey Nairobi" | `Product`, `Offer` |
| Search results | Variable | None (noindex) |

### URL Patterns (Future)

```
https://furnostyles.com/marketplace/
https://furnostyles.com/marketplace/flooring-materials.html
https://furnostyles.com/marketplace/porcelain-floor-tile-60x60-grey.html
```

### Marketplace Rules

- [ ] Every product has unique title and meta description.
- [ ] Product URLs include product name + key specs.
- [ ] Category pages have descriptive H1s and intro text.
- [ ] Search result pages are `noindex`.
- [ ] Filtered/sorted URLs canonical to base category page.
- [ ] Product schema includes price, availability, seller.

---

## 14. Future Product SEO Strategy

### Product Page Elements

| Element | Requirement |
|---------|-------------|
| Title | Product name + key spec + brand |
| Meta description | Product benefit + use case + price hint + CTA |
| H1 | Full product name |
| H2s | Description, Specifications, Reviews, Related Products |
| Images | 3+ images with descriptive alt text |
| Price | Visible and in schema |
| Availability | In stock / out of stock in schema |
| Breadcrumbs | Home > Category > Subcategory > Product |
| Related products | 3-4 similar products |

### Product Keyword Examples

| Type | Example |
|------|---------|
| Product + spec | "porcelain floor tile 60x60" |
| Product + spec + location | "porcelain floor tile 60x60 Nairobi" |
| Product + colour | "grey porcelain floor tile" |
| Product + use case | "floor tile for bathroom Nairobi" |

---

## 15. Location-Based SEO for Nairobi / Kenya

### Location Integration

| Page | Primary Keyword | With Location |
|------|----------------|---------------|
| Homepage | "interior design services" | "Premium interior design services in Nairobi, Kenya" |
| Services | "house finishing" | "House finishing services in Nairobi and across Kenya" |
| Blog | "modern luxury interior design" | "Modern luxury interior design trends in Kenya" |
| Portfolio | "interior design portfolio" | "Interior design portfolio — Nairobi & Kenya projects" |
| Contact | "contact interior designer" | "Contact Furnostyles — Interior designers in Nairobi" |

### LocalBusiness Schema

```json
{
  "@type": "LocalBusiness",
  "name": "Furnostyles",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Nairobi",
    "addressCountry": "KE"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "-1.2921", "longitude": "36.8219" },
  "telephone": "+254-713-639-205",
  "priceRange": "$$$",
  "areaServed": { "@type": "City", "name": "Nairobi" }
}
```

---

## 16. Image SEO Strategy

### Checklist

- [ ] Descriptive filename with keywords: `modern-living-room-nairobi.jpg`
- [ ] Alt text under 125 characters, describes image, includes location.
- [ ] Dimensions specified in HTML: `width="1200" height="800"`
- [ ] Lazy loading for below-fold images: `loading="lazy"`
- [ ] WebP format with JPEG fallback.
- [ ] Compressed to target file size.
- [ ] Structured data references the image URL.

### Filename Formula

```
[primary-keyword]-[location]-[context].[ext]
```

Examples:

```
modern-living-room-nairobi-furnostyles.jpg
kitchen-renovation-lavington-before.jpg
hardwood-flooring-installation-kilimani.jpg
```

---

## 17. Keyword Clustering Strategy

### Cluster Structure

```
Cluster 1: Interior Design
├── Cornerstone: "Interior Design in Nairobi — Complete Guide"
├── Supporting: "Living Room Design Ideas for Nairobi Homes"
├── Supporting: "Bedroom Interior Design Trends Kenya"
└── Quick Tip: "5 Colour Schemes That Work in Kenyan Homes"

Cluster 2: House Finishing
├── Cornerstone: "House Finishing Services in Nairobi — Full Guide"
├── Supporting: "Gypsum Ceiling Installation Cost in Kenya"
├── Supporting: "Best Flooring Materials for Nairobi Homes"
└── Quick Tip: "How Long Does House Finishing Take?"

Cluster 3: Furniture & Repairs
├── Cornerstone: "Furniture Repair and Restoration in Nairobi"
├── Supporting: "Custom Furniture Makers in Kenya"
└── Quick Tip: "How to Maintain Wooden Furniture in Nairobi's Climate"

Cluster 4: Real Estate & Rentals
├── Cornerstone: "Interior Design for Rental Properties in Nairobi"
├── Supporting: "Airbnb Design Tips for Nairobi Hosts"
└── Quick Tip: "Budget-Friendly Upgrades That Increase Rental Value"

Cluster 5: Marketplace (Future)
├── Cornerstone: "Buy Building Materials Online in Nairobi"
├── Category: "Floor Tiles in Nairobi — Types, Prices & Suppliers"
└── Product: "Porcelain Floor Tile 60x60 Grey"
```

### Cluster Rules

| Rule | Implementation |
|------|----------------|
| One cornerstone per cluster | Most comprehensive article on the topic. |
| Supporting articles link to cornerstone | Every supporting article links up. |
| Cornerstone links to all supporting articles | Acts as a content hub. |
| No two pages target same primary keyword | Each page has distinct focus. |
| Internal links connect the cluster | Supporting articles link to each other where relevant. |

---

## 18. Cornerstone Content Strategy

### Rules

| Rule | Requirement |
|------|-------------|
| 2500-4000 words | Comprehensive coverage |
| Targets most competitive keyword | Broadest, highest-volume keyword in cluster |
| Updated regularly | Review and refresh every 6 months |
| Most internal links point to it | Supporting articles all link to cornerstone |
| Includes table of contents | Easy navigation for long articles |
| Includes FAQ section | Captures long-tail keyword traffic |
| Strong CTA to services | Primary conversion goal is service inquiry |
| Professional images | Real project photos, not stock |

### Current Cornerstones

| Article | Target Keyword | Status |
|---------|---------------|--------|
| Modern Luxury Interior Design Trends in Kenya | "interior design trends Kenya" | Published |
| House Finishing Services in Nairobi (future) | "house finishing Nairobi" | Planned |
| Furniture Repair and Restoration Guide (future) | "furniture repair Nairobi" | Planned |
| Interior Design for Rental Properties (future) | "rental interior design Nairobi" | Planned |

### Update Schedule

| Action | Frequency | Owner |
|--------|-----------|-------|
| Review for outdated information | Every 6 months | Content lead |
| Add new internal links to recent articles | Every 3 months | Content lead |
| Update `dateModified` in schema | Every 6 months | Developer |
| Check Search Console performance | Monthly | SEO lead |
| Refresh images if better photos available | Annually | Designer |

---

## 19. Content Freshness / Update Strategy

### Rules

| Rule | Implementation |
|------|----------------|
| Update cornerstone articles every 6 months | Refresh statistics, trends, examples |
| Update supporting articles annually | Check for outdated information |
| Change `dateModified` in schema when updated | Signals freshness to search engines |
| Add "Updated" note at top of revised articles | "Updated May 2026 with new pricing and trends." |
| Do not change URL when updating | Preserve rankings and backlinks |
| Do not change primary keyword unless topic shifted | Maintains topical relevance |

### Audit Schedule

| Frequency | Action | Owner |
|-----------|--------|-------|
| Monthly | Check Search Console for declining pages | SEO lead |
| Quarterly | Full content audit — identify thin or outdated pages | Content lead |
| Every 6 months | Update all cornerstone articles | Content lead |
| Annually | Full site content refresh — update or retire old pages | Content lead |

---

## 20. Sitemap Management Strategy

### Current Static Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://furnostyles.com/index.html</loc>
    <lastmod>2026-05-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Rules

| Rule | Requirement |
|------|-------------|
| Include only indexable pages | Do not include noindex pages or dashboards |
| Absolute URLs | Full `https://furnostyles.com/...` |
| lastmod reflects actual last update | Update date when page content changes |
| Priority reflects page importance | Homepage = 1.0, utility pages = 0.4 |
| Valid XML | Test at xml-sitemap.com or Search Console |
| Submitted to Search Console | After every significant update |
| Max 50,000 URLs | Split into multiple sitemaps if site grows beyond this |

### Priority Guide

| Priority | Used For |
|----------|----------|
| 1.0 | Homepage |
| 0.9 | Services, contact, main landing pages |
| 0.8 | About, portfolio, individual blog articles |
| 0.6 | Blog listing, category pages |
| 0.4 | Utility pages (privacy policy, terms) |

### Future: Automated Sitemap

When the site has 20+ pages, generate automatically:

```javascript
// scripts/generate-sitemap.js (future)
// Scans all HTML files, extracts URLs, generates sitemap.xml
// Run before every deployment
```

---

## 21. Robots.txt Strategy

```
# Allow all crawlers to access public content
User-agent: *
Allow: /

# Block private/dashboard areas
Disallow: /client/
Disallow: /vendor/
Disallow: /admin/

# Block search results and filtered pages (prevents duplicate content)
Disallow: /marketplace/search?
Disallow: /*?sort=
Disallow: /*?filter=

# Sitemap location
Sitemap: https://furnostyles.com/sitemap.xml
```

### Rules

| Page Type | robots.txt Rule |
|-----------|----------------|
| Public pages | `Allow` |
| Blog articles | `Allow` |
| Client/vendor/admin dashboards | `Disallow` |
| Search result pages | `Disallow` |
| Filtered/sorted URLs | `Disallow` |

---

## 22. Google Search Console Workflow

### Step 1: Add Property

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property**
3. Enter `https://furnostyles.com` (domain) or `https://furnostyles.com/` (URL prefix)
4. Verify ownership via DNS record or HTML file

### Step 2: Submit Sitemap

1. Go to **Sitemaps**
2. Enter `sitemap.xml`
3. Click **Submit**

### Step 3: Monitor Reports

| Report | What It Shows | Action When Issues |
|--------|--------------|-------------------|
| Performance | Impressions, clicks, CTR, position | Optimise underperforming pages |
| Coverage | Indexed, excluded, errors | Fix errors immediately |
| Core Web Vitals | Page speed (LCP, FID, CLS) | Fix any "Poor" scores |
| Mobile Usability | Mobile issues | Fix all — mobile is critical in Kenya |
| Security Issues | Hacked/malware | Act immediately |

### Step 4: URL Inspection

Before publishing: enter URL in **URL Inspection** -> **Test live URL** -> confirm Google can render it.

---

## 23. Future Analytics Strategy

### What to Track

| Metric | Tool | Purpose |
|--------|------|---------|
| Page views | GA4 | Which pages are popular |
| Sessions | GA4 | How long users stay |
| Bounce rate | GA4 | Are users finding what they need? |
| Traffic sources | GA4 | Where users come from |
| Search queries | Search Console | Which keywords drive traffic |
| CTA clicks | GA4 Events | Which CTAs convert |
| Form submissions | GA4 Events | Lead generation volume |
| Cart events (future) | GA4 Events | E-commerce funnel |

### GA4 Setup

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Event Tracking (Future)

```javascript
gtag('event', 'cta_click', { 'event_category': 'engagement', 'event_label': 'request_quote' });
gtag('event', 'form_submit', { 'event_category': 'lead', 'event_label': 'service_request' });
```

---

## 24. Future Multilingual SEO Considerations

### If Furnostyles Adds Swahili Content (Future)

| Element | Implementation |
|---------|---------------|
| Language attribute | `<html lang="sw">` for Swahili pages |
| Hreflang tags | Tell Google which language each page is in |
| URL structure | Subfolder approach recommended: `/sw/blog-article.html` |
| Content translation | Professional human translation, not machine translation |
| Keyword research | Swahili keywords may differ from English direct translations |
| Schema locale | `"inLanguage": "sw"` |

### Hreflang Example (Future)

```html
<link rel="alternate" hreflang="en" href="https://furnostyles.com/blogs/modern-luxury-interior-design-kenya.html">
<link rel="alternate" hreflang="sw" href="https://furnostyles.com/sw/blogs/mitindo-ya-ubunifu-wa-ndani-kenya.html">
<link rel="alternate" hreflang="x-default" href="https://furnostyles.com/blogs/modern-luxury-interior-design-kenya.html">
```

### When to Consider Multilingual

- When 20%+ of target audience prefers Swahili for search.
- When analytics shows significant traffic from Swahili-speaking regions.
- Only after English content is comprehensive and ranking well.

---

## 25. Performance and Core Web Vitals

### Target Scores

| Metric | Target | Minimum | What It Measures |
|--------|--------|---------|-----------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | < 4.0s | How fast main content loads |
| **FID** (First Input Delay) | < 100ms | < 300ms | How fast page responds to first interaction |
| **CLS** (Cumulative Layout Shift) | < 0.1 | < 0.25 | Visual stability (no jumping content) |
| **INP** (Interaction to Next Paint) | < 200ms | < 500ms | Overall responsiveness |

### Performance Checklist

- [ ] Hero images under 300KB, with width/height attributes.
- [ ] All scripts use `defer`.
- [ ] CSS is split by feature, loaded only where needed.
- [ ] Below-fold images use `loading="lazy"`.
- [ ] No render-blocking resources.
- [ ] Font files are preloaded if custom fonts are used.
- [ ] Third-party scripts (analytics, chat) are loaded asynchronously.

### Testing

Run Lighthouse in Chrome DevTools on these pages before every deployment:
- `index.html`
- `blogs.html`
- Longest blog article
- `services.html`
- `contact.html`

---

## 26. Duplicate Content Prevention Rules

### What Counts as Duplicate Content

| Issue | Solution |
|-------|----------|
| Same content on multiple pages | Merge into one page, or canonical to the preferred version. |
| URL variations (with/without `.html`, parameters) | Canonical to the clean URL. |
| Boilerplate text repeated across pages | Keep boilerplate minimal. Make each page's unique content dominant. |
| Copied product descriptions (future) | Write unique descriptions for each product. Do not copy manufacturer text. |
| Copied blog content from other sites | Never. Write original content only. |
| Pagination (future blog categories) | Use `rel="next"` and `rel="prev"`, or canonical to the first page. |

### Prevention Checklist

- [ ] Every page has a unique title.
- [ ] Every page has a unique meta description.
- [ ] Every page has unique H1 and H2 content.
- [ ] Canonical URL points to the preferred version.
- [ ] Noindex is used on search result pages and filtered pages.
- [ ] Robots.txt blocks duplicate-prone URLs.

---

## 27. AI Content Quality Rules

### When Using AI for Content Assistance

| Rule | Implementation |
|------|---------------|
| AI generates outlines and drafts, humans edit and verify | AI is a starting point, not the final product. |
| All facts are verified | AI can hallucinate statistics, prices, and regulations. Verify every claim. |
| All content is fact-checked for Nairobi/Kenya context | AI may generate generic advice that does not apply locally. |
| Content is reviewed for tone and brand voice | AI output must sound like Furnostyles, not generic. |
| No keyword stuffing | AI may over-optimise. Edit for natural language. |
| All placeholder text is replaced | "Lorem ipsum" and generic examples must be replaced with real content. |
| Original research and examples are added | AI cannot provide real client stories or project photos. Add these manually. |
| Content is checked for plagiarism | Run through Copyscape or similar before publishing. |
| Human writes the conclusion and CTA | These are the most conversion-critical parts. Do not automate. |

### AI Content Is Acceptable For

- Outlines and structure suggestions
- Draft paragraphs (heavily edited)
- FAQ question generation (answers verified)
- Meta description variations (human-selected)
- Keyword research suggestions (human-validated)

### AI Content Is NOT Acceptable For

- Final published copy without human review
- Pricing or legal information
- Client testimonials or case studies
- Medical, safety, or regulatory advice
- Any content that could harm the brand if inaccurate

---

## 28. Future Category / Tag Architecture

### Blog Categories

| Category | Slug | Description |
|----------|------|-------------|
| Interior Design | `interior-design` | Room design, styles, trends, planning |
| House Finishing | `house-finishing` | Materials, installation, costs, timelines |
| Furniture & Repairs | `furniture-repairs` | Custom furniture, restoration, maintenance |
| Real Estate | `real-estate` | Rental design, Airbnb, landlord tips |
| Materials Guide | `materials-guide` | Product comparisons, buying guides |
| DIY & Tips | `diy-tips` | Small projects, budget hacks, maintenance |

### Category Page Structure (Future)

```
https://furnostyles.com/blogs/category/interior-design.html
```

Each category page:
- Has its own H1, meta title, and meta description.
- Lists articles in that category.
- Links to the cornerstone article for that cluster.
- Is linked from the blog listing page.

### Tag Strategy (Future)

Tags are more specific than categories. Use sparingly:

| Tag Examples | Used On |
|-------------|---------|
| `living-room`, `kitchen`, `bedroom` | Room-specific articles |
| `nairobi`, `mombasa`, `kisumu` | Location-specific articles |
| `budget-friendly`, `luxury`, `minimalist` | Style or budget focus |
| `renovation`, `new-build`, `rental` | Project type |

### Category vs Tag Rules

| Aspect | Category | Tag |
|--------|----------|-----|
| Number | 5-8 max | 20-30 max |
| Purpose | Broad topic buckets | Specific cross-cutting topics |
| URL | `/blogs/category/[slug].html` | `/blogs/tag/[slug].html` (noindex) |
| SEO | Indexable | Consider noindex to prevent thin content |
| Navigation | Main blog menu | Footer or sidebar filter only |

---

## 29. Metadata Workflow Before Publishing

### The 10-Step Publishing Checklist

Before any page goes live, run through this checklist:

**Step 1: Content Review**
- [ ] Content is original and fact-checked.
- [ ] Content matches the brand voice.
- [ ] No placeholder text remains.

**Step 2: Heading Review**
- [ ] Exactly one H1.
- [ ] H1 contains the primary keyword naturally.
- [ ] H2s and H3s create a clear outline.
- [ ] No skipped heading levels.

**Step 3: Meta Review**
- [ ] Title is 50-60 characters, keyword first, brand last.
- [ ] Description is 150-160 characters, includes keyword and benefit.
- [ ] Canonical URL is absolute and correct.
- [ ] No duplicate title or description with any existing page.

**Step 4: Open Graph Review**
- [ ] `og:title`, `og:description`, `og:image` present.
- [ ] Image is 1200x630px, under 200KB.
- [ ] Image URL is absolute.
- [ ] Twitter Card tags present.

**Step 5: Schema Review**
- [ ] JSON-LD block present.
- [ ] Validated in Google's Rich Results Test.
- [ ] No errors or warnings.

**Step 6: Internal Link Review**
- [ ] Minimum 2 internal links to other pages.
- [ ] Anchor text is descriptive.
- [ ] All links work (click every one).

**Step 7: Image Review**
- [ ] Every image has descriptive alt text.
- [ ] Every image is compressed to target size.
- [ ] Hero/first images have width/height attributes.
- [ ] Below-fold images use `loading="lazy"`.

**Step 8: URL Review**
- [ ] Slug is concise, keyword-rich, permanent.
- [ ] No special characters or spaces.
- [ ] Lowercase with hyphens.

**Step 9: Performance Review**
- [ ] Page loads in under 3 seconds.
- [ ] No console errors.
- [ ] Mobile layout works correctly.
- [ ] Lighthouse score: Performance 75+, Accessibility 90+, SEO 95+.

**Step 10: Post-Publish Actions**
- [ ] Add page to sitemap.
- [ ] Submit URL to Google Search Console (URL Inspection -> Request Indexing).
- [ ] Share on social media with proper tags.
- [ ] Add internal link from relevant existing pages.

---

## 30. Long-Term SEO Scaling Roadmap

### Phase 1: Foundation (Now — Month 2)

| # | Action | Target |
|---|--------|--------|
| 1 | Complete 5 cornerstone blog articles | 5 published, fully optimised |
| 2 | Set up Google Search Console | Property verified, sitemap submitted |
| 3 | Set up Google Analytics 4 | Tracking code on all pages |
| 4 | Create and submit sitemap | All public pages listed |
| 5 | Implement schema on all pages | Article, Organization, LocalBusiness |
| 6 | Optimise homepage for target keywords | "interior design Nairobi" focus |
| 7 | Build internal link structure | Every page links to 2+ others |
| 8 | Compress and optimise all images | WebP + JPEG, lazy loading |

### Phase 2: Content Expansion (Month 3-6)

| # | Action | Target |
|---|--------|--------|
| 9 | Publish 10 total blog articles | Mix of cornerstone and supporting |
| 10 | Create blog category pages | 5-6 category landing pages |
| 11 | Expand portfolio with SEO-optimised projects | Each project has dedicated section |
| 12 | Build real estate content cluster | 3-4 articles on rental/Airbnb design |
| 13 | Add FAQ schema to service pages | Rich results for service queries |
| 14 | Begin link building outreach | Guest posts, partnerships, directories |

### Phase 3: Authority Building (Month 7-12)

| # | Action | Target |
|---|--------|--------|
| 15 | Publish 20 total blog articles | Full coverage of priority clusters |
| 16 | Earn 10+ backlinks from reputable sites | Local directories, design blogs |
| 17 | Achieve first page rankings for 5 target keywords | Search Console position report |
| 18 | Launch Google Business Profile | Verified, linked to website |
| 19 | Add review schema to service pages | Star ratings in search results |
| 20 | Optimise for voice search | Natural language, question-based content |

### Phase 4: Marketplace SEO (Month 13-18, Future)

| # | Action | Target |
|---|--------|--------|
| 21 | Optimise marketplace category pages | Each category has unique content |
| 22 | Implement product schema on all products | Price, availability, reviews in search |
| 23 | Build product review system | Authentic reviews, review schema |
| 24 | Optimise for "buy" intent keywords | "buy floor tiles Nairobi", etc. |
| 25 | Create buying guides for top categories | Cornerstone content for marketplace |

### Phase 5: Scale & Dominate (Month 19+, Future)

| # | Action | Target |
|---|--------|--------|
| 26 | Consider multilingual SEO (Swahili) | If audience justifies it |
| 27 | Expand to neighbouring cities | Mombasa, Kisumu, Nakuru content |
| 28 | Launch video SEO | YouTube channel, video schema |
| 29 | Build email list from organic traffic | Newsletter signup on blog |
| 30 | Quarterly content audits | Continuous optimisation cycle |

---

*Document version 1.0. Created 2026-05-22. Read before creating or editing any page.*
