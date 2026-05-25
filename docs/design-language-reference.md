# Furnostyles Design Language Reference

**Document Type:** Design System | **Date:** 2026-05-22 | **Version:** 1.0

---

## How to Use This Document

This document defines the visual identity and design language for Furnostyles. Use it to:

- Maintain consistent design across all pages
- Apply correct colors, typography, and spacing
- Use proper button and card styles
- Implement premium hover effects and shadows
- Ensure the premium Furnostyles brand identity

**This is a reference document. Follow these guidelines for all design decisions.**

---

## Colors

The Furnostyles color palette is designed to convey luxury, trust, and sophistication.

### Primary Colors

| Color | CSS Variable | Hex | Usage |
|-------|--------------|-----|-------|
| **Primary Black** | `--color-primary` | #1a1a1a | Headings, text, backgrounds |
| **Accent Gold** | `--color-accent` | #c9a227 | Buttons, highlights, accents |
| **Accent Gold Light** | `--color-accent-light` | #e8c76a | Hover states, subtle highlights |
| **White** | `--color-white` | #ffffff | Backgrounds, text on dark |
| **Light Gray** | `--color-gray-light` | #f5f5f5 | Section backgrounds |
| **Medium Gray** | `--color-gray-medium` | #888888 | Secondary text, borders |
| **Dark Gray** | `--color-gray-dark` | #333333 | Body text |

### Semantic Colors

| Color | CSS Variable | Hex | Usage |
|-------|--------------|-----|-------|
| **Success** | `--color-success` | #27ae60 | Success messages, confirmations |
| **Error** | `--color-error` | #e74c3c | Error messages, warnings |
| **Warning** | `--color-warning` | #f39c12 | Warning messages |
| **Info** | `--color-info` | #3498db | Information messages |

### Color Usage Rules

| Rule | Why |
|------|-----|
| Primary black for headings | Creates strong visual hierarchy |
| Accent gold sparingly | Maintains premium feel, avoids overuse |
| Light gray for section backgrounds | Creates visual separation |
| White for card backgrounds | Clean, premium appearance |
| Semantic colors only for UI feedback | Clear communication of system state |

---

## Typography

The Furnostyles typography system is designed for readability and elegance.

### Font Families

| Usage | Font Family | Fallback |
|-------|-------------|---------|
| **Headings** | Playfair Display | Georgia, serif |
| **Body** | Inter | Helvetica, Arial, sans-serif |
| **Accent** | Lato | Arial, sans-serif |

### Font Sizes

| Element | Desktop | Mobile | CSS Variable |
|---------|---------|--------|--------------|
| **H1** | 48px | 32px | `--font-size-h1` |
| **H2** | 36px | 28px | `--font-size-h2` |
| **H3** | 28px | 24px | `--font-size-h3` |
| **H4** | 24px | 20px | `--font-size-h4` |
| **Body** | 16px | 16px | `--font-size-body` |
| **Small** | 14px | 14px | `--font-size-small` |
| **Caption** | 12px | 12px | `--font-size-caption` |

### Font Weights

| Weight | Usage | CSS Variable |
|--------|-------|--------------|
| **Light (300)** | Subtle text, captions | `--font-weight-light` |
| **Regular (400)** | Body text | `--font-weight-regular` |
| **Medium (500)** | Emphasis, subheadings | `--font-weight-medium` |
| **Semi-Bold (600)** | Buttons, links | `--font-weight-semibold` |
| **Bold (700)** | Headings | `--font-weight-bold` |

### Line Heights

| Element | Line Height | CSS Variable |
|---------|-------------|--------------|
| **Headings** | 1.2 | `--line-height-heading` |
| **Body** | 1.6 | `--line-height-body` |
| **Compact** | 1.4 | `--line-height-compact` |

### Typography Rules

| Rule | Why |
|------|-----|
| Serif for headings | Elegant, premium feel |
| Sans-serif for body | Readability |
| Consistent line heights | Improves readability |
| Limit font weights | Avoids visual clutter |
| Use hierarchy consistently | Guides user attention |

---

## Spacing

The Furnostyles spacing system ensures consistent layout and breathing room.

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | 4px | Small gaps, icon spacing |
| `--spacing-sm` | 8px | Small margins, padding |
| `--spacing-md` | 16px | Standard margins, padding |
| `--spacing-lg` | 24px | Section spacing |
| `--spacing-xl` | 32px | Large section spacing |
| `--spacing-2xl` | 48px | Major section spacing |
| `--spacing-3xl` | 64px | Hero spacing |

### Component Spacing

| Component | Padding | Margin |
|-----------|---------|--------|
| **Button** | 12px 24px | 0 |
| **Card** | 24px | 0 |
| **Section** | 0 | 64px 0 |
| **Container** | 0 24px | 0 |
| **Form Input** | 12px 16px | 0 0 16px |

### Spacing Rules

| Rule | Why |
|------|-----|
| Use spacing tokens | Consistency |
| 8px grid system | Alignment |
| Generous section spacing | Premium feel |
| Consistent padding | Polished appearance |

---

## Buttons

The Furnostyles button system is designed for clarity and elegance.

### Button Variants

| Variant | Class | Background | Text | Border |
|---------|-------|------------|------|--------|
| **Primary** | `.fns-btn--primary` | Accent gold | White | None |
| **Secondary** | `.fns-btn--secondary` | Primary black | White | None |
| **Outline** | `.fns-btn--outline` | Transparent | Accent gold | Accent gold |
| **Ghost** | `.fns-btn--ghost` | Transparent | Primary black | None |

### Button Sizes

| Size | Class | Padding | Font Size |
|------|-------|---------|-----------|
| **Small** | `.fns-btn--sm` | 8px 16px | 14px |
| **Medium** | `.fns-btn--md` | 12px 24px | 16px |
| **Large** | `.fns-btn--lg` | 16px 32px | 18px |

### Button States

| State | Background | Text | Border |
|-------|------------|------|--------|
| **Hover** | Accent gold light | White | None |
| **Active** | Darker accent | White | None |
| **Disabled** | Light gray | Medium gray | None |

### Button Rules

| Rule | Why |
|------|-----|
| Primary for main CTAs | Clear hierarchy |
| Outline for secondary actions | Visual distinction |
| Consistent padding | Polished appearance |
| Hover states for feedback | User feedback |

---

## Cards

The Furnostyles card system is designed for content presentation and elegance.

### Card Variants

| Variant | Class | Background | Border | Shadow |
|---------|-------|------------|--------|--------|
| **Default** | `.fns-card` | White | Light gray | Subtle |
| **Elevated** | `.fns-card--elevated` | White | None | Medium |
| **Dark** | `.fns-card--dark` | Primary black | None | Subtle |

### Card Components

| Component | Class | Description |
|-----------|-------|-------------|
| **Card Header** | `.fns-card__header` | Card title area |
| **Card Body** | `.fns-card__body` | Main content area |
| **Card Footer** | `.fns-card__footer` | Actions area |
| **Card Image** | `.fns-card__image` | Image container |

### Card Spacing

| Element | Padding |
|---------|---------|
| **Card** | 24px |
| **Card Header** | 0 0 16px 0 |
| **Card Body** | 0 0 24px 0 |
| **Card Footer** | 16px 0 0 0 |

### Card Rules

| Rule | Why |
|------|-----|
| White background for cards | Clean, premium |
| Subtle shadows | Depth without clutter |
| Consistent padding | Polished appearance |
| Image at top | Standard pattern |

---

## Hover Effects

The Furnostyles hover effects are designed for subtle, premium feedback.

### Hover Effects

| Element | Hover Effect | Duration |
|---------|--------------|----------|
| **Button** | Background color change | 200ms |
| **Link** | Color change + underline | 200ms |
| **Card** | Elevation increase | 300ms |
| **Image** | Slight zoom | 300ms |

### Hover Transitions

| Property | Duration | Easing |
|----------|----------|--------|
| **Background** | 200ms | ease-in-out |
| **Color** | 200ms | ease-in-out |
| **Transform** | 300ms | ease-out |
| **Box Shadow** | 300ms | ease-out |

### Hover Rules

| Rule | Why |
|------|-----|
| Subtle transitions | Premium feel |
| Consistent duration | Predictable UX |
| No jarring effects | Professional appearance |
| Feedback on all interactables | User guidance |

---

## Shadows

The Furnostyles shadow system is designed for depth and elegance.

### Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | 0 2px 4px rgba(0,0,0,0.1) | Small elements |
| `--shadow-md` | 0 4px 8px rgba(0,0,0,0.1) | Cards, buttons |
| `--shadow-lg` | 0 8px 16px rgba(0,0,0,0.1) | Elevated cards |
| `--shadow-xl` | 0 16px 32px rgba(0,0,0,0.1) | Modals, overlays |

### Shadow Usage

| Element | Shadow |
|---------|--------|
| **Button** | `--shadow-md` |
| **Card** | `--shadow-md` |
| **Elevated Card** | `--shadow-lg` |
| **Modal** | `--shadow-xl` |
| **Dropdown** | `--shadow-lg` |

### Shadow Rules

| Rule | Why |
|------|-----|
| Subtle shadows | Premium feel |
| Consistent elevation | Visual hierarchy |
| No colored shadows | Professional appearance |
| Black with low opacity | Natural depth |

---

## Premium Furnostyles Visual Identity

The Furnostyles visual identity is defined by luxury, sophistication, and trust.

### Visual Identity Principles

| Principle | Application |
|-----------|-------------|
| **Luxury** | Gold accents, serif headings, generous spacing |
| **Sophistication** | Clean layouts, subtle shadows, refined typography |
| **Trust** | Consistent design, professional appearance, quality imagery |
| **Premium** | High-quality images, polished interactions, attention to detail |

### Brand Personality

| Trait | Expression |
|--------|------------|
| **Elegant** | Serif headings, refined typography |
| **Professional** | Clean layouts, consistent spacing |
| **Trustworthy** | Quality imagery, polished design |
| **Premium** | Gold accents, subtle shadows, generous spacing |

### Visual Identity Rules

| Rule | Why |
|------|-----|
| Gold accents sparingly | Luxury feel, not tacky |
| Serif for headings | Elegance, sophistication |
| Generous spacing | Premium feel |
| High-quality images | Professional appearance |
| Subtle animations | Refined interactions |

---

## Design System Implementation

### CSS Variables

All design tokens are implemented as CSS variables in `css/style.css`:

```css
:root {
  /* Colors */
  --color-primary: #1a1a1a;
  --color-accent: #c9a227;
  --color-accent-light: #e8c76a;
  --color-white: #ffffff;
  --color-gray-light: #f5f5f5;
  --color-gray-medium: #888888;
  --color-gray-dark: #333333;

  /* Typography */
  --font-size-h1: 48px;
  --font-size-h2: 36px;
  --font-size-h3: 28px;
  --font-size-h4: 24px;
  --font-size-body: 16px;
  --font-size-small: 14px;
  --font-size-caption: 12px;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 16px rgba(0,0,0,0.1);
  --shadow-xl: 0 16px 32px rgba(0,0,0,0.1);
}
```

### Design System Usage

When creating new components:

1. Use existing CSS variables
2. Follow spacing scale
3. Use button variants
4. Use card variants
5. Apply hover effects
6. Use shadow scale
7. Maintain visual identity principles

---

## Summary

The Furnostyles design language is defined by:

- **Colors:** Primary black, accent gold, semantic colors
- **Typography:** Serif headings, sans-serif body, consistent hierarchy
- **Spacing:** 8px grid system, generous section spacing
- **Buttons:** Primary, secondary, outline, ghost variants
- **Cards:** Default, elevated, dark variants
- **Hover Effects:** Subtle transitions, consistent duration
- **Shadows:** Subtle elevation, consistent scale
- **Visual Identity:** Luxury, sophistication, trust, premium

**Follow this design language for all design decisions to maintain the premium Furnostyles brand identity.**
