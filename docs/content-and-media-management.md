# Furnostyles Content and Media Management System

**Date:** 2026-05-22 | **Workspace:** `furnostyles-clean-rebuild/` | **Hosting:** Cloudflare Pages (static)

---

## What This Guide Is

This document defines how all images, videos, and media assets are organised, named, sized, compressed, and maintained on the Furnostyles website. It exists to prevent the chaos of scattered files, broken image links, unnamed photos, and bloated page loads.

**Read this before uploading any image. Read this before creating a new page that contains media.**

---

## 1. Recommended Image Folder Structure

### Principle

Every image lives in one folder, organised by **purpose** (not by date or by who uploaded it). This makes finding, replacing, and updating images trivial.

### Current Structure

```
assets/images/
├── blogs/                    # Blog article images only
│   ├── blog-1-hero.jpg
│   ├── blog-1-inline-1.jpg
│   └── blog-1-inline-2.jpg
│
├── portfolio/                # Before/after project photos
│   ├── portfolio-living-room-kilimani-01.jpg
│   ├── portfolio-living-room-kilimani-02.jpg
│   └── portfolio-kitchen-lavington-01.jpg
│
├── services/                 # Service page visuals
│   ├── service-interior-design-hero.jpg
│   ├── service-repairs-hero.jpg
│   └── service-finishing-hero.jpg
│
├── heroes/                   # Page hero images (not blog-specific)
│   ├── hero-home.jpg
│   ├── hero-about.jpg
│   └── hero-contact.jpg
│
├── icons/                    # UI icons (SVG preferred)
│   ├── icon-phone.svg
│   ├── icon-email.svg
│   └── icon-location.svg
│
├── logos/                    # Brand logos and variants
│   ├── logo-dark.svg
│   ├── logo-light.svg
│   └── favicon.ico
│
└── placeholders/             # Placeholder images during development
    ├── placeholder-hero.jpg
    ├── placeholder-product.jpg
    └── placeholder-portfolio.jpg
```

### Future Structure (After Marketplace Launch)

```
assets/images/
├── blogs/
├── portfolio/
├── services/
├── heroes/
├── icons/
├── logos/
├── placeholders/
└── products/                 # Marketplace product images (future)
    ├── thumbnails/           # 400x300 compressed versions
    ├── detail/               # 1200x1200 full-size versions
    └── vendor-uploads/       # Raw uploads before processing
```

### Why This Structure?

| Folder | Why Separated |
|--------|--------------|
| `blogs/` | Blog images change often. Separate folder = easy to batch-update. |
| `portfolio/` | Portfolio photos are high-resolution. Keeping them separate prevents accidental blog compression. |
| `services/` | Service heroes are wide banners. Different dimensions from blog images. |
| `heroes/` | Page heroes are reused on multiple pages. Central location prevents duplication. |
| `icons/` | SVG icons are tiny and vector. They never need compression. |
| `products/` | **Future:** Vendor uploads need processing pipeline. Raw vs. compressed must be separated. |
| `placeholders/` | Temporary images that must be replaced before launch. Easy to find and audit. |

---

## 2. Recommended Video Folder Structure

### Current Policy: No Self-Hosted Videos

Videos are **not** stored in `assets/videos/`. Self-hosted video files are too large for static hosting and slow down page loads.

### Video Hosting Strategy

| Platform | Use For | Embed Method |
|----------|---------|-------------|
| **YouTube** | Portfolio showcases, before/after tours, design tips | YouTube iframe embed |
| **Vimeo** | Premium portfolio content (cleaner player, no ads) | Vimeo iframe embed |
| **Wistia** | Sales videos, service explainers (detailed analytics) | Wistia iframe embed |
| **Cloudflare Stream** | **Future:** High-volume video hosting with adaptive streaming | Cloudflare Stream embed |

### Video Metadata Storage

Store video metadata in a JSON file, not hardcoded in HTML:

```javascript
// shared/data/videos.js (future)
window.FurnostylesVideos = [
  {
    id: 'portfolio-living-room-kilimani',
    title: 'Modern Living Room Transformation — Kilimani, Nairobi',
    platform: 'youtube',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'assets/images/portfolio/portfolio-living-room-kilimani-01.jpg',
    category: 'portfolio',
    page: 'portfolio.html'
  }
];
```

### If You Must Self-Host (Rare)

Only for very short clips (< 10 seconds) like animated hero backgrounds:

```
assets/videos/
└── heroes/
    └── hero-home-background.mp4   # Must be < 1MB, muted, autoplay, loop
```

**Requirements for self-hosted video:**
- Maximum 10 seconds duration
- Maximum 1MB file size
- Muted, autoplay, loop, no controls
- MP4 format (H.264 codec)
- No audio track (or silent)

---

## 3. Naming Conventions for Media

### The Naming Formula

```
[category]-[descriptive-name]-[number].[extension]
```

| Part | Rules | Examples |
|------|-------|----------|
| **Category** | Required. Matches folder purpose. | `blog-`, `portfolio-`, `service-`, `hero-`, `product-` |
| **Descriptive Name** | Required. What is in the image? Where? | `modern-living-room-nairobi`, `kitchen-renovation-lavington` |
| **Number** | Optional. Use when multiple images of same topic. | `01`, `02`, `03` |
| **Extension** | Required. Prefer `.jpg` for photos, `.svg` for icons, `.webp` when supported. | `.jpg`, `.png`, `.svg`, `.webp` |

### Good Examples

```
blog-1-hero-modern-luxury-interior.jpg
blog-1-inline-tile-flooring-closeup.jpg
portfolio-living-room-kilimani-01.jpg
portfolio-living-room-kilimani-02.jpg
service-interior-design-consultation.jpg
hero-home-living-room-wide.jpg
product-porcelain-tile-60x60-grey-01.jpg
icon-phone.svg
```

### Bad Examples (Never Do This)

```
IMG_20240522_143022.jpg           # Camera default. Meaningless.
image1.jpg                         # No context. Cannot search.
photo.jpg                          # Too generic.
screenshot.png                     # What is it a screenshot of?
Untitled-1.jpg                     # Default from design tool.
final-version-2-REALLY-final.jpg   # Version chaos. Use one name.
```

### Special Characters Rule

| Allowed | Not Allowed | Why |
|---------|-------------|-----|
| Lowercase letters | Uppercase letters | URLs are case-sensitive. Lowercase prevents 404s. |
| Hyphens `-` | Spaces ` ` | Spaces become `%20` in URLs. Ugly and error-prone. |
| Hyphens `-` | Underscores `_` | Hyphens are word separators in SEO. Underscores are not. |
| Numbers `0-9` | Special characters `&$#@` | Special characters break URLs and file systems. |

---

## 4. Hero Image Standards

### What Is a Hero Image?

The large banner image at the top of a page. It is the first visual impression. It must be high quality, fast loading, and properly sized.

### Hero Image Specifications

| Property | Requirement | Why |
|----------|-------------|-----|
| **Dimensions** | 1920x1080px (16:9) | Standard widescreen. Covers all desktop screens. |
| **Safe Zone** | Keep critical content in the centre 60% | Edges may be cropped on different screen sizes. |
| **Max File Size** | 300KB | Hero images block the first paint. Must load fast. |
| **Format** | WebP with JPEG fallback | Best compression with wide support. |
| **Colour Profile** | sRGB | Ensures consistent colours across devices. |
| **Subject** | Real project photos, not stock images | Authenticity matters for trust. |

### Hero Image Implementation

```html
<picture>
  <source srcset="assets/images/heroes/hero-home.webp" type="image/webp">
  <img src="assets/images/heroes/hero-home.jpg"
       alt="Modern luxury living room interior designed by Furnostyles in Nairobi"
       width="1920" height="1080"
       fetchpriority="high">
</picture>
```

**Key attributes:**
- `fetchpriority="high"` tells the browser to load this image first.
- `width` and `height` prevent layout shift (CLS).
- `<picture>` with WebP fallback provides best compression.

### Hero Image Checklist

- [ ] Real photo from an actual Furnostyles project (or high-quality representative)
- [ ] No text burned into the image (use HTML overlay for text)
- [ ] Darkened or neutral background area where text will sit
- [ ] Compressed to under 300KB
- [ ] Descriptive alt text with location
- [ ] width and height attributes present

---

## 5. Blog Image Standards

### Blog Image Types

| Type | Dimensions | Max Size | Use Case |
|------|-----------|----------|----------|
| **Hero** | 1200x800px (3:2) | 200KB | Top of article, featured image |
| **Inline Wide** | 1200x675px (16:9) | 150KB | Full-width image within article |
| **Inline Standard** | 800x600px (4:3) | 100KB | Medium image within article |
| **Inline Detail** | 600x600px (1:1) | 80KB | Close-up, detail shot |
| **Thumbnail** | 400x300px (4:3) | 50KB | Related articles, blog listing |

### Blog Image Naming

```
blog-[article-number]-[type]-[description].[ext]
```

Examples:

```
blog-1-hero-modern-luxury-living.jpg
blog-1-inline-wide-open-plan-layout.jpg
blog-1-inline-standard-wood-flooring.jpg
blog-1-inline-detail-brass-hardware.jpg
blog-2-hero-gypsum-ceiling-design.jpg
```

### Blog Image Implementation

```html
<!-- Hero image -->
<picture>
  <source srcset="../assets/images/blogs/blog-1-hero-modern-luxury-living.webp" type="image/webp">
  <img src="../assets/images/blogs/blog-1-hero-modern-luxury-living.jpg"
       alt="Modern luxury living room with open plan layout in Nairobi Kenya"
       width="1200" height="800"
       fetchpriority="high">
</picture>

<!-- Inline image (below the fold — lazy load) -->
<picture>
  <source srcset="../assets/images/blogs/blog-1-inline-standard-wood-flooring.webp" type="image/webp">
  <img src="../assets/images/blogs/blog-1-inline-standard-wood-flooring.jpg"
       alt="Dark hardwood flooring installed in a Nairobi apartment"
       width="800" height="600"
       loading="lazy">
</picture>
```

### Blog Image Rules

- [ ] Every blog article has exactly one hero image.
- [ ] Hero image is named with the article number.
- [ ] Inline images use `loading="lazy"` (they are below the fold).
- [ ] All blog images have descriptive alt text.
- [ ] No stock-photo-generic images. Use real project photos or high-quality original photography.
- [ ] Images are relevant to the paragraph they accompany.

---

## 6. Service Image Standards

### Service Page Image Types

| Type | Dimensions | Max Size | Use Case |
|------|-----------|----------|----------|
| **Hero** | 1920x1080px | 300KB | Top of service page |
| **Process Step** | 800x600px | 100KB | Visual for each step in the process |
| **Before/After** | 1200x800px (each) | 150KB each | Split comparison image |
| **Team/Workmanship** | 800x800px | 100KB | Trust-building photos |

### Service Image Naming

```
service-[service-slug]-[type]-[description].[ext]
```

Examples:

```
service-interior-design-hero-living-room.jpg
service-interior-design-process-consultation.jpg
service-interior-design-process-design.jpg
service-interior-design-before-after-kilimani.jpg
service-repairs-hero-handyman-at-work.jpg
```

### Service Image Implementation

```html
<!-- Service hero -->
<img src="assets/images/services/service-interior-design-hero-living-room.jpg"
     alt="Professional interior designer measuring a living room in Nairobi"
     width="1920" height="1080"
     fetchpriority="high">

<!-- Before/After comparison -->
<div class="fns-before-after">
  <img src="assets/images/services/service-interior-design-before-after-kilimani-before.jpg"
       alt="Living room before Furnostyles renovation in Kilimani"
       loading="lazy">
  <img src="assets/images/services/service-interior-design-before-after-kilimani-after.jpg"
       alt="Living room after Furnostyles renovation in Kilimani"
       loading="lazy">
</div>
```

---

## 7. Portfolio Image Standards

### Portfolio Image Types

| Type | Dimensions | Max Size | Use Case |
|------|-----------|----------|----------|
| **Gallery Full** | 1600x1200px | 250KB | Click-to-expand gallery view |
| **Gallery Grid** | 600x450px | 80KB | Grid thumbnail on portfolio page |
| **Hero Showcase** | 1920x1080px | 300KB | Featured project banner |
| **Detail Shot** | 800x800px | 100KB | Close-up of craftsmanship |

### Portfolio Image Naming

```
portfolio-[room-type]-[location]-[number].[ext]
```

Examples:

```
portfolio-living-room-kilimani-01.jpg
portfolio-living-room-kilimani-02.jpg
portfolio-living-room-kilimani-03.jpg
portfolio-kitchen-lavington-01.jpg
portfolio-bedroom-karen-01.jpg
portfolio-detail-brass-handle-kilimani-01.jpg
```

### Portfolio Image Rules

- [ ] Every project has a minimum of 3 photos (wide, medium, detail).
- [ ] Before and after are stored as separate images, not a single split image.
- [ ] Images are shot in good lighting. No blurry or dark photos.
- [ ] Each photo tells a story. Avoid "random room corner" shots.
- [ ] Location is included in the filename for SEO.

---

## 8. Marketplace Product Image Standards (Future)

### Product Image Types

| Type | Dimensions | Max Size | Use Case |
|------|-----------|----------|----------|
| **Thumbnail** | 400x400px | 50KB | Product grid, search results |
| **Card** | 600x600px | 80KB | Product card hover state |
| **Detail Main** | 1200x1200px | 150KB | Product detail page hero |
| **Detail Gallery** | 1200x1200px | 150KB each | Additional angles, close-ups |
| **Zoom** | 2400x2400px | 300KB | Click-to-zoom high resolution |

### Product Image Naming

```
product-[category]-[product-slug]-[angle]-[number].[ext]
```

Examples:

```
product-flooring-porcelain-tile-60x60-grey-front-01.jpg
product-flooring-porcelain-tile-60x60-grey-angle-01.jpg
product-flooring-porcelain-tile-60x60-grey-detail-01.jpg
product-furniture-sofa-linen-grey-front-01.jpg
product-lighting-pendant-gold-lifestyle-01.jpg
```

### Product Image Rules (When Marketplace Launches)

- [ ] Minimum 3 images per product: front, angle, detail.
- [ ] White or neutral background for main product photos.
- [ ] One lifestyle/context image showing the product in a room.
- [ ] Consistent lighting and colour temperature across all product photos.
- [ ] No watermarks. Clean images only.
- [ ] Dimensions and weight visible in image alt text or caption.

---

## 9. Recommended Image Sizes

### Quick Reference Table

| Use Case | Width | Height | Aspect Ratio | Max File Size | Format |
|----------|-------|--------|-------------|---------------|--------|
| Page hero | 1920px | 1080px | 16:9 | 300KB | WebP + JPEG |
| Blog hero | 1200px | 800px | 3:2 | 200KB | WebP + JPEG |
| Blog inline wide | 1200px | 675px | 16:9 | 150KB | WebP + JPEG |
| Blog inline standard | 800px | 600px | 4:3 | 100KB | WebP + JPEG |
| Blog inline detail | 600px | 600px | 1:1 | 80KB | WebP + JPEG |
| Blog thumbnail | 400px | 300px | 4:3 | 50KB | WebP + JPEG |
| Service hero | 1920px | 1080px | 16:9 | 300KB | WebP + JPEG |
| Service process | 800px | 600px | 4:3 | 100KB | WebP + JPEG |
| Portfolio gallery full | 1600px | 1200px | 4:3 | 250KB | WebP + JPEG |
| Portfolio grid | 600px | 450px | 4:3 | 80KB | WebP + JPEG |
| Portfolio detail | 800px | 800px | 1:1 | 100KB | WebP + JPEG |
| Product thumbnail | 400px | 400px | 1:1 | 50KB | WebP + JPEG |
| Product card | 600px | 600px | 1:1 | 80KB | WebP + JPEG |
| Product detail | 1200px | 1200px | 1:1 | 150KB | WebP + JPEG |
| Product zoom | 2400px | 2400px | 1:1 | 300KB | WebP + JPEG |
| Team photo | 800px | 800px | 1:1 | 100KB | WebP + JPEG |
| Icon | 48px | 48px | 1:1 | 5KB | SVG |
| Logo | 400px | 100px | 4:1 | 10KB | SVG |
| Favicon | 32px | 32px | 1:1 | 5KB | ICO / PNG |
| Social share | 1200px | 630px | 1.91:1 | 150KB | PNG / JPEG |

### Never Upload These Sizes

| What | Why |
|------|-----|
| Camera raw (4000x3000px+) | Browser scales down anyway. Wastes bandwidth. |
| 10MB+ images | Will crash mobile connections. |
| BMP or TIFF | No browser benefit. Huge file size. |
| Uncompressed PNG photos | PNG is for transparency, not photos. Use JPEG/WebP. |

---

## 10. Compression/Optimization Workflow

### The Three-Step Process

**Step 1: Resize to target dimensions**

Use any image editor (Photoshop, GIMP, Canva, Photopea) or command-line tools:

```bash
# ImageMagick (if installed)
convert input.jpg -resize 1200x800 -quality 85 output.jpg

# Or use an online tool: squoosh.app
```

**Step 2: Compress**

| Tool | Type | Best For |
|------|------|----------|
| **Squoosh** (squoosh.app) | Web app | Side-by-side quality comparison |
| **TinyPNG** (tinypng.com) | Web app | Batch compression (up to 20 images) |
| **ImageOptim** (Mac) | Desktop app | Drag-and-drop batch processing |
| **Squoosh CLI** | Command line | Automated build pipelines |
| **Sharp** (Node.js) | Code library | Automated server-side processing (future) |

**Compression targets:**

| Image Type | Quality Target | Max File Size |
|-----------|---------------|---------------|
| Hero / Banner | 80-85% quality | 300KB |
| Blog inline | 75-80% quality | 150KB |
| Thumbnail / Small | 70-75% quality | 50KB |
| Icon / Logo | Lossless (SVG) | 10KB |

**Step 3: Convert to WebP with JPEG fallback**

Squoosh can export both formats simultaneously. Or use ImageMagick:

```bash
# Create WebP version
cjpeg -quality 85 input.jpg > output.jpg
cwebp -q 85 input.jpg -o output.webp
```

### Batch Compression Script (Future)

```javascript
// scripts/compress-images.js (future)
// Uses Sharp library to batch-resize and compress all images
// Run before every deployment
const sharp = require('sharp');
const glob = require('glob');
const path = require('path');

// Compress all blog images to 1200px width, 80% quality, WebP + JPEG
```

---

## 11. Lazy Loading Strategy

### What Is Lazy Loading?

Images below the fold (not visible when the page first loads) are loaded only when the user scrolls near them. This makes the initial page load much faster.

### Native Lazy Loading (Recommended)

Use the browser's built-in lazy loading:

```html
<!-- Above the fold — load immediately -->
<img src="hero.jpg" alt="..." fetchpriority="high">

<!-- Below the fold — lazy load -->
<img src="blog-inline.jpg" alt="..." loading="lazy">
```

| Attribute | Use For | Browser Support |
|-----------|---------|----------------|
| `loading="lazy"` | Any image below the fold | All modern browsers |
| `fetchpriority="high"` | Hero images, critical above-fold images | Chrome, Edge, Opera |
| `fetchpriority="low"` | Decorative images, low-priority assets | Chrome, Edge, Opera |

### JavaScript Fallback (For Older Browsers)

If IntersectionObserver is needed for more control:

```javascript
// Already implemented in blog.js for images with loading="lazy"
// This is a backup for browsers that do not support native lazy loading
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading
} else {
  // Load a polyfill or use IntersectionObserver
}
```

### Lazy Loading Rules

| Image Location | Lazy Load? | Why |
|---------------|-----------|-----|
| Page hero | **No** | Must load immediately. |
| Blog hero | **No** | Top of article. Load immediately. |
| Blog inline images | **Yes** | Below the fold. Use `loading="lazy"`. |
| Portfolio gallery | **Yes** | Most thumbnails are below fold. |
| Product thumbnails | **Yes** | Grid images are below fold. |
| Product detail main | **No** | Primary product image. Load immediately. |
| Product detail gallery | **Yes** | Secondary images. |
| Footer logos | **Yes** | Always below fold. |

---

## 12. Placeholder Image Strategy

### What Is a Placeholder?

A temporary image used during development or when the real image is not yet available. Placeholders must be clearly marked and easy to find for replacement.

### Placeholder Rules

| Rule | Implementation |
|------|----------------|
| Placeholders live in `assets/images/placeholders/` only | Prevents mixing with real images. |
| Placeholders are named with "placeholder-" prefix | Easy to search and audit. |
| Every placeholder must have a replacement task | Add to a todo list or project tracker. |
| Placeholders are never used on production | Launch checklist must include "all placeholders replaced." |
| Placeholders are low resolution | Discourages accidental production use. |

### Placeholder Types

| Type | Dimensions | Example Filename |
|------|-----------|------------------|
| Hero placeholder | 1920x1080 | `placeholder-hero.jpg` |
| Blog placeholder | 1200x800 | `placeholder-blog.jpg` |
| Portfolio placeholder | 800x600 | `placeholder-portfolio.jpg` |
| Product placeholder | 600x600 | `placeholder-product.jpg` |
| Team placeholder | 400x400 | `placeholder-team.jpg` |

### Placeholder Implementation

```html
<!-- During development -->
<img src="assets/images/placeholders/placeholder-hero.jpg"
     alt="PLACEHOLDER: Modern living room hero image"
     data-replace-with="assets/images/heroes/hero-home.jpg">

<!-- The data-replace-with attribute documents what should replace it -->
```

### Placeholder Audit Command

Before every deployment, search for remaining placeholders:

```powershell
# PowerShell
Select-String -Path "*.html" -Pattern "placeholder"

# This should return zero results before launch
```

---

## 13. How to Safely Replace Media Later

### The Problem

Replacing an image seems simple: delete old, add new. But if the filename changes, every page that references it breaks.

### Safe Replacement Process

**Option A: Keep the Same Filename (Recommended)**

1. Create the new image with the exact same filename as the old one.
2. Replace the file in the folder.
3. Hard refresh the browser (Ctrl+Shift+R) to clear cache.
4. Verify the new image loads on all pages that use it.
5. Commit the change.

**Option B: Change the Filename (Requires HTML Updates)**

1. Create the new image with a new filename.
2. Add it to the correct folder.
3. Update every HTML reference to the old filename.
4. Use search to find all references:
   ```powershell
   Select-String -Path "*.html" -Pattern "old-filename.jpg"
   ```
5. Update all matches.
6. Delete the old image file.
7. Test every affected page.
8. Commit the change.

### Never Do This

- Do not rename an image and forget to update HTML references.
- Do not delete an old image before confirming no page references it.
- Do not replace an image without checking if it is used on multiple pages.

### Image Reference Tracking (Future)

When the site has 50+ images, maintain a reference spreadsheet or JSON:

```javascript
// shared/data/image-registry.js (future)
window.FurnostylesImageRegistry = {
  "hero-home.jpg": {
    pages: ["index.html", "about.html"],
    alt: "Modern luxury living room in Nairobi",
    category: "heroes"
  },
  "blog-1-hero.jpg": {
    pages: ["blogs/modern-luxury-interior-design-kenya.html"],
    alt: "Modern luxury living room interior",
    category: "blogs"
  }
};
```

---

## 14. SEO Image Naming Strategy

### Why Image Names Matter for SEO

Search engines read image filenames. A descriptive name like `modern-living-room-nairobi.jpg` tells Google what the image contains. A name like `IMG_1234.jpg` tells Google nothing.

### SEO Naming Rules

| Rule | Example |
|------|---------|
| Include the primary keyword | `modern-luxury-interior-design-nairobi.jpg` |
| Include location when relevant | `kilimani-apartment-renovation.jpg` |
| Include room type | `living-room-furniture-arrangement.jpg` |
| Use descriptive adjectives | `dark-hardwood-flooring-installation.jpg` |
| Keep it under 60 characters | `modern-living-room-nairobi-furnostyles.jpg` (good) |
| Never use generic names | `image1.jpg` (bad) |

### SEO Image URL Structure

The full URL of an image is part of its SEO value:

```
Good:  https://furnostyles.com/assets/images/blogs/blog-1-hero-modern-luxury-living.jpg
Bad:   https://furnostyles.com/assets/images/IMG_20240522_143022.jpg
```

A clean URL path reinforces the image's context.

---

## 15. Alt Text Strategy

### What Is Alt Text?

Alt text (alternative text) describes an image for:
- Screen readers (accessibility)
- Search engines (SEO)
- Users when images fail to load

### Alt Text Rules

| Rule | Example |
|------|---------|
| Be descriptive | "Modern living room with dark wood flooring and brass pendant lights" |
| Include keywords naturally | "Interior design consultation in Nairobi Kenya" |
| Keep it under 125 characters | Screen readers typically stop at 125 characters. |
| Never say "image of" or "picture of" | Screen readers already announce it as an image. |
| Describe what is in the image, not what it represents | "Interior designer measuring a wall with a tape measure" (not "Professionalism") |
| For decorative images, use empty alt | `alt=""` tells screen readers to skip it. |

### Alt Text by Image Type

| Image Type | Alt Text Formula | Example |
|------------|-----------------|---------|
| **Hero** | [What] in [location] by [brand] | "Modern luxury living room interior designed by Furnostyles in Nairobi" |
| **Blog inline** | [What] showing [detail] in [context] | "Dark hardwood flooring installed in an open-plan Nairobi apartment" |
| **Portfolio** | [Room type] [before/after] by [brand] in [location] | "Living room after renovation by Furnostyles in Kilimani, Nairobi" |
| **Service process** | [Team member] [doing what] during [service] | "Furnostyles designer presenting mood boards during a client consultation" |
| **Product** | [Product name] in [colour/material] [angle/view] | "Porcelain floor tile 60x60cm in grey, front view" |
| **Team** | [Name], [role] at [brand] | "Jane Wanjiku, Lead Interior Designer at Furnostyles" |
| **Logo** | [Brand] logo | "Furnostyles logo" |
| **Icon** | [Action] icon | "Phone icon" |
| **Decorative** | Empty `alt=""` | Divider line, background texture |

### Alt Text Checklist

- [ ] Every functional image has descriptive alt text.
- [ ] No alt text exceeds 125 characters.
- [ ] No alt text says "image of" or "picture of."
- [ ] Decorative images use `alt=""` (not missing alt attribute).
- [ ] Alt text includes location for local SEO ("in Nairobi", "in Kenya").

---

## 16. Cloudflare Pages Media Considerations

### What Cloudflare Pages Provides

| Feature | Benefit |
|---------|---------|
| **Global CDN** | Images served from 200+ locations worldwide. Fast everywhere. |
| **Automatic HTTPS** | All images served securely. |
| **Asset caching** | Static images cached at edge for fast repeat visits. |
| **Brotli compression** | Text assets compressed automatically. |
| **Free tier** | 1GB storage + 10GB transfer per month. |

### Limitations to Know

| Limitation | Impact | Workaround |
|------------|--------|------------|
| 1GB storage on free tier | Cannot host thousands of high-res images | Compress aggressively. Use WebP. |
| 10GB monthly transfer | Heavy-traffic sites may exceed | Upgrade to Pro or use external CDN for media. |
| No server-side image processing | Cannot resize images on the fly | Pre-generate all sizes. Upload multiple versions. |
| No video hosting | Videos must be hosted elsewhere | Use YouTube, Vimeo, or Cloudflare Stream. |

### When to Upgrade

| Scenario | Action |
|----------|--------|
| Storage exceeds 800MB | Audit and delete unused images. Compress remaining. |
| Storage exceeds 1GB | Move images to Cloudflare R2 or Firebase Storage. |
| Transfer exceeds 8GB/month | Upgrade to Cloudflare Pro or use R2 for media. |
| Need video hosting | Use Cloudflare Stream or YouTube/Vimeo. |

---

## 17. Future CDN/Media Scaling Strategy

### Phase 1: Static Hosting (Current)

All images in `assets/images/`. Served by Cloudflare Pages CDN.

**Capacity:** ~500 images at current compression levels.

### Phase 2: External Image Storage (When Needed)

When image volume exceeds Cloudflare Pages free tier:

| Option | Cost | Best For |
|--------|------|----------|
| **Cloudflare R2** | $0.015/GB/month | Large image volumes, same ecosystem |
| **Firebase Storage** | $0.026/GB/month | Already using Firebase for auth/database |
| **AWS S3 + CloudFront** | ~$0.023/GB/month | Enterprise scale, complex setup |
| **ImageKit** | Free tier: 20GB | On-the-fly resizing, optimisation |
| **Cloudinary** | Free tier: 25GB | On-the-fly resizing, effects, CDN |

### Phase 3: Dynamic Image Resizing (Future)

Instead of uploading 4 sizes of every image, upload one high-res version and let a service generate sizes on demand:

```
Original upload: product-porcelain-tile.jpg (2400x2400)

Thumbnail request: ImageKit resizes to 400x400 on the fly
Detail request: ImageKit resizes to 1200x1200 on the fly
```

**Services that do this:** ImageKit, Cloudinary, Cloudflare Images.

**When to implement:** After marketplace has 100+ products and manual resizing becomes unsustainable.

---

## 18. Recommended Thumbnail System

### What Is a Thumbnail?

A small, compressed version of an image used in grids, cards, and listings. Thumbnails load fast and do not waste bandwidth on pages where the user only sees a preview.

### Thumbnail Sizes

| Context | Dimensions | Max Size |
|---------|-----------|----------|
| Blog listing card | 400x300px | 50KB |
| Portfolio grid | 600x450px | 80KB |
| Product grid | 400x400px | 50KB |
| Related articles | 400x300px | 50KB |
| Team member card | 400x400px | 50KB |

### Thumbnail Naming

Use a `-thumb` suffix or store in a `thumbnails/` subfolder:

```
Option A (suffix):
  blog-1-hero.jpg
  blog-1-hero-thumb.jpg

Option B (subfolder — recommended for large collections):
  blogs/blog-1-hero.jpg
  blogs/thumbnails/blog-1-hero.jpg
```

**Recommendation:** Use the subfolder approach (`thumbnails/`) for the marketplace. Use the suffix approach for blog articles.

### Thumbnail Implementation

```html
<!-- Blog listing page -->
<img src="assets/images/blogs/blog-1-hero-thumb.jpg"
     alt="Modern luxury living room interior in Nairobi"
     width="400" height="300"
     loading="lazy">

<!-- Blog article page (full size) -->
<img src="assets/images/blogs/blog-1-hero.jpg"
     alt="Modern luxury living room interior in Nairobi"
     width="1200" height="800"
     fetchpriority="high">
```

### Thumbnail Generation

| Tool | How |
|------|-----|
| Squoosh | Resize to 400px width, export as WebP + JPEG |
| ImageMagick | `convert input.jpg -resize 400x300 -quality 75 output-thumb.jpg` |
| Sharp (Node.js) | Automated script for batch generation |

---

## 19. Recommended Featured-Image Workflow

### What Is a Featured Image?

The primary image that represents a page, article, or product. It appears in:
- Social media shares (Open Graph, Twitter Card)
- Search results (rich snippets)
- Blog listing pages
- Related content sections

### Featured Image Rules

| Rule | Implementation |
|------|----------------|
| Every blog article has exactly one featured image | The hero image doubles as the featured image. |
| Every service page has one featured image | Used for social sharing. |
| Every portfolio project has one featured image | The best "after" photo. |
| Every product has one featured image | The front-facing product photo. |
| Featured images are 1200x630px for social sharing | Open Graph and Twitter Card optimal size. |

### Featured Image Meta Tags

```html
<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:image" content="https://furnostyles.com/assets/images/blogs/blog-1-hero.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Modern luxury living room interior designed by Furnostyles in Nairobi">

<!-- Twitter Card -->
<meta name="twitter:image" content="https://furnostyles.com/assets/images/blogs/blog-1-hero.jpg">
<meta name="twitter:image:alt" content="Modern luxury living room interior designed by Furnostyles in Nairobi">
```

### Featured Image Checklist

- [ ] Every shareable page has an `og:image` meta tag.
- [ ] Image URL is absolute (starts with `https://`), not relative.
- [ ] Image dimensions are 1200x630px.
- [ ] Image file size is under 200KB.
- [ ] Image has descriptive `og:image:alt` text.
- [ ] Image looks good when cropped to a square (some platforms use square crops).

---

## 20. Rules to Avoid Broken Media Paths

### The Most Common Cause of Broken Images

A page references an image using the wrong path. This happens when:
- The page is in a different folder depth than the image.
- The image was moved but the reference was not updated.
- The filename has a typo.
- The extension is wrong (`.jpg` vs `.jpeg` vs `.webp`).

### Path Rules

| Rule | Correct | Incorrect |
|------|---------|-----------|
| Use relative paths from the current file | `../assets/images/blogs/blog-1.jpg` | `/assets/images/...` (may not work on local) |
| Match folder depth | From `blogs/`: `../assets/images/...` | From `blogs/`: `assets/images/...` (missing `../`) |
| Match exact filename | `blog-1-hero.jpg` | `blog-1-hero.jpeg` (different extension) |
| Match case | `blog-1-hero.jpg` | `Blog-1-Hero.jpg` (case-sensitive on Linux servers) |
| No spaces | `blog-1-hero.jpg` | `blog 1 hero.jpg` |
| No special characters | `blog-1-hero.jpg` | `blog&1#hero.jpg` |

### Path Verification Checklist

Before committing any page with new images:

- [ ] Open the page in a local server.
- [ ] Confirm every image loads (no broken image icon).
- [ ] Right-click image → "Open image in new tab" → confirm the URL is correct.
- [ ] Check browser console for 404 errors.
- [ ] Test from a page in a different folder (e.g., from `blogs/` and from root).

### Automated Path Checking (Future)

```javascript
// scripts/verify-links.js (future)
// Scans all HTML files for image references
// Checks if the referenced file exists
// Reports any broken paths before deployment
```

---

## 21. How Future AI-Generated Images Should Be Organized

### When to Use AI-Generated Images

| Appropriate | Not Appropriate |
|-------------|----------------|
| Blog article illustrations | Portfolio project photos (must be real) |
| Social media graphics | Before/after comparisons (must be real) |
| Decorative backgrounds | Product photos (must be real) |
| Concept mood boards | Team photos (must be real) |

### AI Image Organization

| Rule | Implementation |
|------|----------------|
| AI images live in a dedicated subfolder | `assets/images/ai-generated/` |
| AI images are clearly marked in filename | `ai-mood-board-modern-living.jpg` |
| AI images are not used in portfolio | Portfolio must show real work. |
| AI images include a disclaimer if required | "Concept illustration generated with AI" |
| AI images follow the same compression standards | Resize, compress, WebP + JPEG fallback. |

### AI Image Naming

```
ai-[type]-[description].[ext]
```

Examples:

```
ai-mood-board-scandinavian-bedroom.jpg
ai-concept-minimalist-kitchen.jpg
ai-social-media-interior-tips-banner.jpg
```

### AI Image Disclosure

If an AI-generated image is prominently featured (e.g., a blog hero or social media post), add a small caption or note:

```html
<figure>
  <img src="assets/images/ai-generated/ai-mood-board-scandinavian-bedroom.jpg"
       alt="Concept mood board for a Scandinavian bedroom design">
  <figcaption>Concept illustration generated with AI</figcaption>
</figure>
```

---

## 22. Video Hosting Recommendations

### Recommended Platforms

| Platform | Best For | Cost | Kenya Load Speed |
|----------|----------|------|-----------------|
| **YouTube** | Portfolio showcases, tips, educational content | Free | Good (Google CDN) |
| **Vimeo** | Premium portfolio, ad-free experience | Free tier / paid | Good (Fastly CDN) |
| **Wistia** | Sales videos, detailed analytics | Paid | Good (Fastly CDN) |
| **Cloudflare Stream** | High-volume, custom player, no branding | $1/1000 minutes | Excellent (Cloudflare CDN) |
| **Loom** | Quick team communications, async updates | Free tier | Good |

### Embedding YouTube Videos

```html
<!-- Lazy-loaded iframe (loads only when user scrolls near it) -->
<div class="fns-video-embed" data-video-id="VIDEO_ID">
  <img src="assets/images/videos/video-thumbnail.jpg"
       alt="Modern living room transformation by Furnostyles"
       loading="lazy">
  <button class="fns-video-play">Play</button>
</div>

<script>
  // Load iframe only when user clicks play
  document.querySelectorAll('.fns-video-embed').forEach(function(el) {
    el.querySelector('.fns-video-play').addEventListener('click', function() {
      var videoId = el.dataset.videoId;
      el.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '" 
        frameborder="0" allowfullscreen loading="lazy"></iframe>';
    });
  });
</script>
```

**Why lazy-load the iframe:** YouTube iframes load heavy JavaScript. Lazy loading prevents this from blocking the page.

### Video SEO

| Element | Requirement |
|---------|-------------|
| Video title | Descriptive, includes keyword and location |
| Video description | Detailed, includes links to related pages |
| Video thumbnail | Custom thumbnail (1280x720px), not auto-generated |
| Video transcript | Upload transcript for accessibility and SEO |
| Video schema | Include `VideoObject` structured data on the page |

---

## 23. Social Media Media-Export Strategy

### Social Media Image Sizes

| Platform | Image Type | Dimensions | Aspect Ratio |
|----------|-----------|------------|-------------|
| **Facebook** | Shared link image | 1200x630px | 1.91:1 |
| **Facebook** | Post image | 1200x1200px | 1:1 |
| **Instagram** | Feed post | 1080x1080px | 1:1 |
| **Instagram** | Story | 1080x1920px | 9:16 |
| **Instagram** | Reel cover | 1080x1920px | 9:16 |
| **Twitter/X** | Shared link | 1200x628px | 1.91:1 |
| **Twitter/X** | Post image | 1200x675px | 16:9 |
| **LinkedIn** | Shared link | 1200x627px | 1.91:1 |
| **LinkedIn** | Post image | 1200x1200px | 1:1 |
| **Pinterest** | Pin | 1000x1500px | 2:3 |
| **WhatsApp** | Status | 1080x1920px | 9:16 |

### Social Media Export Workflow

1. **Create the master image** in Canva, Photoshop, or Figma at the highest needed resolution.
2. **Export platform-specific versions** from the master.
3. **Name files with platform suffix**:
   ```
   blog-1-hero-facebook.jpg
   blog-1-hero-instagram.jpg
   blog-1-hero-pinterest.jpg
   ```
4. **Store in a dedicated folder** (future):
   ```
   assets/images/social/
   ├── blog-1-hero-facebook.jpg
   ├── blog-1-hero-instagram.jpg
   └── blog-1-hero-pinterest.jpg
   ```
5. **Use the correct image for each platform's meta tag**:
   ```html
   <meta property="og:image" content="https://furnostyles.com/assets/images/social/blog-1-hero-facebook.jpg">
   ```

### Social Media Templates (Future)

Create reusable Canva/Figma templates for:
- Blog article announcements
- Portfolio project showcases
- Tips and educational content
- Before/after reveals
- Client testimonials

This ensures consistent branding and faster content creation.

---

## 24. Backup/Media Archive Strategy

### What Needs Backing Up

| Asset | Location | Backup Method | Frequency |
|-------|----------|--------------|-----------|
| Website images | `assets/images/` | Git + cloud storage | Every commit |
| Raw photo originals | Local computer / external drive | External HDD + cloud | After every photoshoot |
| Design files | Canva / Figma / Photoshop | Native cloud sync + export | After every design session |
| Social media exports | Local computer | Cloud folder (Google Drive / Dropbox) | After every batch export |
| Video originals | Local computer / external drive | External HDD + cloud | After every video shoot |

### Recommended Backup Structure (Cloud Storage)

```
Furnostyles-Archive/
├── 2026/
│   ├── 01-January/
│   │   ├── photoshoot-kilimani-living-room/
│   │   │   ├── raw/
│   │   │   ├── edited/
│   │   │   └── exported/
│   │   └── social-media-batch-1/
│   └── 05-May/
│       ├── photoshoot-lavington-kitchen/
│       └── blog-article-1-media/
├── Brand-Assets/
│   ├── logos/
│   ├── colour-palette/
│   ├── fonts/
│   └── templates/
└── Video-Archive/
    ├── 2026/
    └── raw/
```

### Backup Rules

| Rule | Why |
|------|-----|
| Organise by year and month | Easy to find old assets. |
| Keep raw and edited versions separate | Raw = full quality. Edited = web-ready. |
| Never delete raw photos | You may need a different crop or edit later. |
| Use descriptive folder names | `photoshoot-kilimani-living-room` not `shoot-1`. |
| Sync to at least two locations | Local drive + cloud (Google Drive, Dropbox, OneDrive). |
| Test restores periodically | A backup you cannot restore is useless. |

### Git for Code, Cloud Storage for Media

| Asset | Use Git? | Use Cloud Storage? | Why |
|-------|----------|-------------------|-----|
| HTML, CSS, JS | Yes | No | Small, text-based, version-controlled. |
| Compressed web images | Yes | Yes | Git tracks them. Cloud storage is backup. |
| Raw photo originals | No | Yes | Too large for Git. Binary files bloat repositories. |
| Video files | No | Yes | Far too large for Git. |
| Design files (.psd, .fig) | No | Yes | Binary, large, not diffable. |

### Disaster Recovery

If the website is ever corrupted or lost:

1. Clone the Git repository (all code and compressed images restored).
2. Re-upload to Cloudflare Pages.
3. Site is live again in minutes.

If images are accidentally deleted from the repo:

1. Recover from Git history: `git checkout [commit] -- assets/images/`
2. Or recover from cloud storage backup.

---

*Document version 1.0. Created 2026-05-22. Read before uploading any image.*
