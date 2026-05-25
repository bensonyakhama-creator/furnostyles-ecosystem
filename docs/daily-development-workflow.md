# Furnostyles Daily Development Workflow

**Document Type:** Operational Workflow Guide | **Date:** 2026-05-22 | **Version:** 1.0 | **Phase:** 1 — Brand Foundation

---

## How to Use This Document

This is the permanent daily workflow system for safely running, editing, expanding, testing, and maintaining Furnostyles without architectural chaos. Follow these workflows every time you work on the project.

---

## 1. Daily Startup Workflow

Every work session begins the same way. This prevents surprises and ensures you are working from a known good state.

### Step-by-Step Startup

```
1. Open VS Code / Windsurf to the project root:
   furnostyles-clean-rebuild/

2. Verify the active branch / workspace state:
   - Check that you are on the correct branch (if using Git).
   - Verify no uncommitted changes from a previous session unless intentional.

3. Open the project README:
   README.md — confirms the current phase and any in-progress work.

4. Open the master operational blueprint:
   docs/final-operational-blueprint.md — refresh on current constraints.

5. Start a local preview server:
   - Use VS Code "Live Server" extension, or
   - Use Python: python -m http.server 8080, or
   - Use Node: npx serve .

6. Open index.html in browser and verify:
   - Header loads correctly.
   - Footer loads correctly.
   - No console errors.
   - Visual appearance matches expectations.

7. Check the browser console for any pre-existing errors.
   - If errors exist from a previous session, fix them before starting new work.

8. Review the TODO list in your IDE or project notes.
   - Pick one focused task for this session.
   - Do not start multiple unrelated tasks.
```

### Startup Checklist

- [ ] Project root is correct (`furnostyles-clean-rebuild/`)
- [ ] Workspace state is clean (no unexpected uncommitted changes)
- [ ] README reviewed for current phase
- [ ] Blueprint reviewed for constraints
- [ ] Local preview server running
- [ ] `index.html` loads correctly in browser
- [ ] Header and footer render correctly
- [ ] Console shows zero errors
- [ ] One focused task selected for this session

---

## 2. Recommended VS Code / Windsurf Workflow

### Workspace Setup

| Recommendation | Why |
|----------------|-----|
| Open the project root (`furnostyles-clean-rebuild/`) | Ensures relative paths work correctly in all tools |
| Enable auto-save | Prevents losing work; deploys always use saved files |
| Install "Live Server" extension | Instant local preview on save |
| Install "Prettier" for HTML/CSS formatting | Consistent formatting |
| Pin `index.html` as reference tab | Always visible for copying structure |

### Recommended Open Tabs

Keep these files visible at all times while working:

| File | Purpose |
|------|---------|
| `index.html` | Reference template for new pages |
| `shared/header.html` | Reference for header structure |
| `shared/footer.html` | Reference for footer structure |
| `css/style.css` | Reference for design tokens and shared styles |
| `js/navigation-data.js` | Reference for navigation structure |

### File Explorer Discipline

| Rule | Requirement |
|------|-------------|
| Use the folder tree, not search, to understand structure. | Search finds files; the tree shows relationships. |
| Before creating a new file, check if a similar file exists. | Prevents duplication. |
| Before deleting a file, search for all references to it. | Prevents broken links and imports. |
| Before moving a file, search for all references to its path. | Prevents broken relative paths. |

---

## 3. Recommended AI Prompting Workflow

When working with AI (this assistant, Copilot, ChatGPT, Claude, etc.), structure your prompts to prevent dangerous changes.

### The SAFE Prompt Template

```
S — Scope: What exactly should be changed?
A — Avoid: What must NOT be touched?
F — File: What is the exact file path?
E — Existing: What is the current relevant code?
```

### Example SAFE Prompt

```
Scope: Add a new "Outdoor Living" service card to the services index page.
Avoid: Do not change the CSS. Do not touch shared components.
File: services/index.html
Existing: The page currently has 4 service cards in a grid. I need a 5th card with title "Outdoor Living", description "Transform your balcony, patio, or garden into a stylish outdoor retreat.", and link "services/outdoor-living.html".
```

### Dangerous Prompt Patterns to Avoid

| Dangerous Prompt | Why It Is Dangerous |
|------------------|---------------------|
| "Make the site look better" | Vague; AI may rewrite shared CSS and break every page. |
| "Refactor the CSS" | Loses design tokens, breaks layout. |
| "Clean up the JavaScript" | May delete functions that are called somewhere. |
| "Add a sidebar" | Violates current phase constraint. |
| "Move files around" | Breaks every relative path in every HTML file. |
| "Delete unused files" | AI cannot reliably detect all references. |
| "Convert to React/Vue" | Destroys static hosting and SEO. |

### AI Pre-Edit Checklist

Before asking AI to edit anything:

- [ ] I have specified the exact file path.
- [ ] I have stated what must NOT be changed.
- [ ] I have provided the current relevant code.
- [ ] I have confirmed this is a page-specific change (not shared).
- [ ] I have a snapshot of the project folder.

---

## 4. Safe Editing Order

When editing multiple files, follow this order to prevent cascading breakage.

### The Safe Edit Sequence

```
Step 1: Read (never skip)
   - Open every file you plan to edit.
   - Scroll through the entire file.
   - Note the structure, existing classes, IDs, and functions.

Step 2: Plan
   - Write down exactly what you will change in each file.
   - Identify if any change affects shared components.
   - If a shared component is affected, test plan must cover all pages.

Step 3: Snapshot
   - Copy the entire project folder.
   - Name it: furnostyles-YYYY-MM-DD-before-task-name

Step 4: Edit shared files FIRST
   - Edit shared CSS, shared JS, shared HTML before page files.
   - Shared changes cascade to pages; pages must be tested after.

Step 5: Edit page files SECOND
   - Edit individual pages after shared files are stable.

Step 6: Test locally
   - Open affected pages in browser.
   - Check console for errors.
   - Verify visual appearance.
   - Run Lighthouse if layout or performance affected.

Step 7: Test shared changes on all page types
   - If shared CSS/JS changed: test home, services, portfolio, blog, contact.
   - Test mobile, tablet, desktop.

Step 8: If tests pass, proceed. If not, restore from snapshot.
```

### Editing Order Rules

| Rule | Why |
|------|-----|
| Always read before editing. | Prevents accidental breakage. |
| Always edit shared files before page files. | Shared changes cascade; pages must be tested after. |
| Never edit more than one shared system at a time. | If CSS and JS both break, debugging is harder. |
| Never edit while the preview server is not running. | You cannot verify changes without a preview. |

---

## 5. How to Safely Create New Pages

### The New Page Workflow

```
1. Open index.html as the reference template.
   - Copy the entire file.
   - Paste into the new file.

2. Change only these elements:
   - <title> — unique page title
   - <meta name="description"> — unique 150-160 char description
   - <link rel="canonical"> — correct page URL
   - <meta property="og:*"> — correct OG tags for this page
   - <main class="premium-main"> content — page-specific content
   - <h1> — unique page heading

3. Do NOT change:
   - <head> structure (meta charset, viewport, stylesheets)
   - <link rel="stylesheet" href="css/style.css">
   - <script defer src="js/main.js"></script>
   - Mount point IDs (#fns-header-mount, #fld-footer-mount)
   - Layout structure (.premium-layout > .premium-main)
   - Floating elements (cart-float, chat-float)

4. Add the new page to js/navigation-data.js.
   - If the page should appear in navigation, add it here.

5. Update the sitemap.xml (or add to sitemap list for later generation).

6. Test the new page locally.
   - Open in browser.
   - Check console for errors.
   - Verify header and footer load.
   - Verify links work.
   - Run Lighthouse audit.

7. If tests pass, the page is ready for deployment.
```

### New Page Checklist

- [ ] Copied from `index.html` as reference
- [ ] `<title>` is unique and descriptive
- [ ] `<meta name="description">` is unique (150-160 chars)
- [ ] `<link rel="canonical">` points to correct URL
- [ ] OG meta tags updated for this page
- [ ] `<h1>` is unique and descriptive
- [ ] No placeholder text ("Lorem ipsum", "Coming soon")
- [ ] Added to `js/navigation-data.js` (if in nav)
- [ ] Added to sitemap
- [ ] Tested locally: loads, no console errors, header/footer render
- [ ] Lighthouse audit: performance >= 90, accessibility = 100

---

## 6. How to Safely Edit Shared Components

Shared components (header, footer, CSS, JS) affect every page. Extra caution is required.

### Before Editing a Shared Component

```
1. Open the shared component file.
   - shared/header.html, shared/footer.html, css/style.css, js/main.js, etc.

2. Read the entire file from top to bottom.
   - Understand the full structure.
   - Note every class name, ID, and function.

3. Search for all references across the project.
   - If editing a CSS class: search all HTML files for that class.
   - If editing a JS function: search all JS and HTML files for calls.
   - If editing header/footer: verify mount points on every page.

4. Create a project snapshot.
   - Copy entire project folder before any change.

5. Make the smallest possible change.
   - Change one thing at a time.
   - Do not refactor while fixing.

6. Test on every page type.
   - index.html (home)
   - services/*.html
   - portfolio/*.html
   - blogs/*.html
   - contact.html
   - Test mobile, tablet, desktop.

7. If any page breaks, restore from snapshot and try again.
```

### Shared Component Safety Rules

| Rule | Requirement |
|------|-------------|
| Never remove a class without checking all HTML files that use it. | Broken styling on affected pages. |
| Never rename a function without checking all call sites. | JavaScript errors on every caller. |
| Never change mount point IDs without updating main.js. | Components fail to render. |
| Never add blocking (synchronous) loading to shared components. | Freezes page render. |
| Test shared changes on at least 3 different page types. | Ensures no hidden breakage. |

---

## 7. How to Safely Edit CSS

### Before Editing CSS

```
1. Open css/style.css.
2. Identify which layer you are editing:
   - Design tokens (top) — colours, fonts, spacing variables
   - Layout — .premium-layout, .premium-header, .premium-main
   - Components — .fns-btn*, .fns-card*, .fns-form*
   - Utilities — helper classes

3. Search for all uses of the class or variable you plan to change.
   - Use VS Code global search (Ctrl+Shift+F).
   - Search for the class name or variable name.

4. If the class/variable is used in multiple files, plan the change carefully.
   - Will the change improve all pages or break some?
   - If it might break some, create a new modifier class instead.

5. Make the smallest change possible.

6. Test on at least 3 page types.
   - Home, a content page, a form page.

7. Check Lighthouse scores after the change.
   - CSS changes can affect CLS (Cumulative Layout Shift).
```

### CSS Safety Rules

| Rule | Requirement |
|------|-------------|
| Never add `!important` to shared component classes. | Makes future overrides impossible. |
| Never increase specificity unnecessarily. | Prefer `.fns-card` over `.premium-main .fns-card`. |
| Never remove a CSS class without searching all HTML files. | Broken styling on affected pages. |
| Never change a CSS variable without checking all uses. | Variables are global; affects the entire site. |
| Never redefine a shared component in page-specific CSS. | Use modifier classes instead. |
| Document new CSS variables in the architecture docs. | Future editors need to know what exists. |

### When to Add a New CSS File

| Condition | Action |
|-----------|--------|
| Styles used on only 1-2 pages | Page-specific `<style>` or small CSS file in page folder |
| Styles used on 3+ pages but not global | New CSS file in `css/`, loaded conditionally |
| Styles for a future feature (marketplace, dashboard) | New CSS file, loaded only on relevant pages |
| Changes to shared components | Edit `css/style.css` directly |

---

## 8. How to Safely Edit JS

### Before Editing JS

```
1. Open the JS file you intend to edit.
2. Read the full function from start to finish.
   - Understand inputs, outputs, and side effects.
   - Note what DOM elements it touches.
   - Note what other functions it calls.

3. Search for all call sites.
   - Use VS Code global search (Ctrl+Shift+F).
   - Search for the function name.

4. If the function is called in multiple files, plan carefully.
   - Will the change improve all callers or break some?
   - If it might break some, create a new function instead.

5. If adding a new global function, namespace it under Furnostyles.*.

6. Make the smallest change possible.

7. Test on all pages that call the function.

8. Check the browser console for errors after the change.
```

### JS Safety Rules

| Rule | Requirement |
|------|-------------|
| Read the full function before editing. | Understand inputs, outputs, side effects. |
| Adding a new global function? Namespace under `Furnostyles.*`. | Prevents naming collisions. |
| Modifying a shared function? Check all call sites first. | `loadComponent()` is called on every page. |
| Never delete a function without confirming no callers. | Search across the project. |
| Always handle errors in async functions. | Unhandled rejections break shared components. |
| Never add global event listeners without cleanup. | Memory leaks accumulate. |
| Feature JS must not redefine shared utilities. | Use shared utilities, do not duplicate. |

### When to Add a New JS File

| Condition | Action |
|-----------|--------|
| Logic used on only 1-2 pages | Page-specific `<script>` or small JS file |
| Logic used on 3+ pages but not global | New JS file in `js/`, loaded conditionally |
| Logic for a future feature | New JS file, loaded only on relevant pages |
| Changes to shared utilities | Edit `js/main.js` or dedicated utility file |

---

## 9. How to Safely Add Blog Articles

### Blog Article Workflow

```
1. Write the article content.
   - Minimum 800 words (cornerstone: 2000+).
   - Use the Furnostyles tone: professional, warm, authoritative.
   - Include at least 3 internal links to related articles.

2. Prepare the featured image.
   - Dimensions: 1200x630px.
   - Format: WebP.
   - File name: descriptive, hyphenated.
   - Save to: assets/images/blog/article-name-1200.webp

3. Create the HTML page.
   - Copy from index.html as template.
   - Update <title>, <meta description>, <canonical>, OG tags.
   - Add article content inside .premium-main.
   - Use semantic HTML: <article>, <header>, <section>.
   - One <h1> for the article title.
   - Logical <h2>-<h3> progression.

4. Add to js/article-data.js.
   - Include id, title, excerpt, category, date, image, url.

5. Update internal links.
   - Add links TO this article from 3-5 related articles.
   - Add links FROM this article to related articles.

6. Update sitemap.xml.

7. Test the article page locally.
   - Loads correctly.
   - No console errors.
   - Images load.
   - Internal links work.
   - Lighthouse audit passes.

8. Deploy.
```

### Blog Article Checklist

- [ ] Content written (800+ words, no placeholders)
- [ ] Featured image prepared (1200x630px WebP)
- [ ] HTML page created from `index.html` template
- [ ] `<title>`, `<meta description>`, `<canonical>`, OG tags unique
- [ ] Semantic HTML with proper heading hierarchy
- [ ] Added to `js/article-data.js`
- [ ] Internal links to/from related articles
- [ ] Added to sitemap
- [ ] Tested locally
- [ ] Lighthouse audit: performance >= 90, accessibility = 100

---

## 10. How to Safely Add Media / Images

### Image Preparation Workflow

```
1. Source or create the image.
   - Original photography, licensed stock, or royalty-free.
   - Never use copyrighted images without license.

2. Optimize the image.
   - Resize to final display dimensions.
   - Compress (TinyPNG, Squoosh, or similar).
   - Convert to WebP.
   - Create responsive sizes if needed (400w, 800w, 1200w).

3. Name the file descriptively.
   - Format: context-subject-size.webp
   - Example: blog-modern-living-room-800.webp
   - Example: portfolio-karen-renovation-hero-1200.webp
   - No spaces, no special characters, lowercase.

4. Place in the correct folder.
   - Blog images -> assets/images/blog/
   - Portfolio images -> assets/images/portfolio/
   - Product images -> assets/images/products/ (future)
   - Property images -> assets/images/properties/ (future)
   - Backgrounds -> assets/images/backgrounds/
   - Icons -> assets/images/icons/

5. Reference in HTML.
   - Use relative paths: assets/images/blog/file-name.webp
   - Include width and height attributes.
   - Use loading="lazy" for below-the-fold images.
   - Use srcset for responsive images.

6. Test the image loads correctly.
   - Open the page in browser.
   - Verify the image appears.
   - Check console for 404 errors.

7. Update assets/README.md with image details.
```

### Image Safety Rules

| Rule | Requirement |
|------|-------------|
| Optimize before upload. | Compress, resize, convert to WebP. |
| Never delete an image referenced in any file. | Search across project first. |
| Use descriptive file names. | No `IMG_1234.jpg`; use `karen-living-room-800.webp`. |
| Include width and height attributes. | Prevents layout shift (CLS). |
| Use `loading="lazy"` for below-the-fold images. | Improves page load performance. |
| Keep source files outside the project. | RAW, PSD, Figma not in deployment. |
| Maintain assets/README.md inventory. | Tracks what exists and why. |

---

## 11. How to Safely Test Responsive Layouts

### Responsive Testing Workflow

```
1. Open Chrome DevTools (F12).

2. Toggle Device Toolbar (Ctrl+Shift+M or click the icon).

3. Test these breakpoints:
   - Mobile: 320px - 480px
   - Tablet: 768px - 1024px
   - Desktop: 1024px - 1440px
   - Large desktop: 1440px+

4. On each breakpoint, verify:
   - Header is readable and clickable.
   - Content fits within viewport (no horizontal scroll).
   - Images scale correctly.
   - Text is readable (not too small, not overlapping).
   - Buttons and links are tappable (min 44px touch target).
   - Footer is visible and readable.

5. Test actual devices if available.
   - iPhone (Safari)
   - Android (Chrome)
   - iPad (Safari)

6. Record any issues.
   - Screenshot the problem.
   - Note the breakpoint and browser.
   - Fix before deployment.
```

### Responsive Testing Checklist

| Breakpoint | Devices to Test | Key Checks |
|------------|-----------------|------------|
| 320px-480px | iPhone SE, Android small | No horizontal scroll, readable text, tappable buttons |
| 768px-1024px | iPad, iPad Mini | Layout adapts, images scale, navigation accessible |
| 1024px-1440px | Laptop, small desktop | Full layout, side-by-side content, no wasted space |
| 1440px+ | Large desktop, 4K | Content centered, max-width respected, no stretching |

---

## 12. How to Safely Test Links

### Link Testing Workflow

```
1. Internal link testing:
   - Open every page in browser.
   - Click every internal link.
   - Verify it goes to the correct page.
   - Verify no 404 errors.

2. Navigation link testing:
   - Click every link in the header navigation.
   - Click every link in the footer.
   - Verify all pages are reachable from navigation.

3. Anchor link testing:
   - Click every "jump to section" link.
   - Verify the page scrolls to the correct section.
   - Verify the target ID exists.

4. External link testing:
   - Click every external link (social media, WhatsApp, partners).
   - Verify they open in a new tab (target="_blank").
   - Verify they go to the correct destination.

5. Automated link checking (optional but recommended):
   - Use an online link checker.
   - Or use a VS Code extension.
   - Run before every deployment.
```

### Link Testing Checklist

- [ ] All internal links work (zero 404s)
- [ ] All navigation links work
- [ ] All anchor links jump to correct sections
- [ ] All external links open in new tab
- [ ] All external links go to correct destinations
- [ ] No links to `localhost` or preview URLs in production
- [ ] No broken image references (zero 404s in Network tab)

---

## 13. How to Safely Test Performance

### Lighthouse Testing Workflow

```
1. Open Chrome DevTools (F12).

2. Go to the Lighthouse tab.

3. Select these categories:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

4. Select "Mobile" device.

5. Click "Analyze page load".

6. Review the scores:
   - Performance: target >= 90
   - Accessibility: target = 100
   - Best Practices: target >= 90
   - SEO: target = 100

7. If scores are below target, review the diagnostics:
   - Largest Contentful Paint (LCP) — target < 2.5s
   - Cumulative Layout Shift (CLS) — target < 0.1
   - Total Blocking Time (TBT) — target < 200ms

8. Fix the highest-impact issues first.

9. Re-run Lighthouse after fixes.

10. Repeat for every major page type:
    - Homepage
    - Service page
    - Portfolio page
    - Blog article
    - Contact page
```

### Performance Testing Checklist

| Metric | Target | Action if Failing |
|--------|--------|-------------------|
| Performance | >= 90 | Optimize images, defer non-critical JS, remove unused CSS |
| Accessibility | = 100 | Add alt text, fix colour contrast, ensure keyboard navigation |
| Best Practices | >= 90 | Fix console errors, use HTTPS, correct image aspect ratios |
| SEO | = 100 | Add meta descriptions, fix canonical URLs, ensure mobile-friendly |
| LCP | < 2.5s | Optimize hero image, preload critical resources |
| CLS | < 0.1 | Add width/height to images, reserve space for dynamic content |

---

## 14. How to Safely Deploy Updates

### Deployment Workflow

```
1. Pre-deployment verification:
   - All changes saved in IDE.
   - Local preview works correctly.
   - Browser console shows zero errors.
   - Lighthouse scores meet targets.
   - All internal links tested.
   - No placeholder text on public pages.

2. Create a project snapshot.
   - Copy the entire project folder.
   - Name it: furnostyles-YYYY-MM-DD-before-deploy

3. Deploy to Cloudflare Pages preview URL.
   - Use the Cloudflare dashboard or CLI.
   - Wait for the preview build to complete.

4. Test the preview URL.
   - Open on mobile and desktop.
   - Test all page types.
   - Verify header and footer load.
   - Verify console shows zero errors.
   - Run Lighthouse on preview URL.

5. If preview tests pass, mark as production deploy.

6. Verify the live site.
   - Open the live domain in browser.
   - Test homepage, a content page, and a form page.
   - Verify console shows zero errors.

7. Monitor for 30 minutes.
   - Check for error reports.
   - Check for broken functionality.
   - If issues arise, roll back to the previous deploy.
```

### Deployment Checklist

- [ ] All changes saved
- [ ] Local preview works
- [ ] Zero console errors
- [ ] Lighthouse scores meet targets
- [ ] All internal links tested
- [ ] No placeholder text
- [ ] Project snapshot created
- [ ] Preview URL tested on mobile and desktop
- [ ] Preview Lighthouse scores acceptable
- [ ] Live site verified after production deploy
- [ ] 30-minute monitoring complete

### Deployment Safety Rules

| Rule | Requirement |
|------|-------------|
| Never deploy during peak traffic hours. | Deploy during low-traffic periods. |
| Never deploy on Friday evening. | Support may not be available if issues arise. |
| Always have a rollback plan. | Know the last working deploy ID or snapshot location. |
| Test the preview URL before production. | Never push directly to production without preview testing. |
| Do not delete old deploys immediately. | Keep the last 5 deploys for rollback. |
| Monitor the live site for 30 minutes after deployment. | Catch issues before users report them. |

---

## 15. How to Create Backups Before Major Edits

### Snapshot Workflow

```
Before any major edit (shared component change, CSS refactor, new feature, etc.):

1. Close the IDE or save all files.

2. Copy the entire project folder.
   - Windows: Right-click -> Copy -> Paste -> Rename.
   - Or use command line: xcopy /E /I furnostyles-clean-rebuild furnostyles-YYYY-MM-DD-before-purpose

3. Name the snapshot clearly:
   - furnostyles-2026-05-22-before-sidebar-refactor
   - furnostyles-2026-05-22-before-new-service-pages
   - furnostyles-2026-05-22-before-css-cleanup

4. Store the snapshot outside the working folder.
   - Desktop, Documents, or a dedicated backups folder.

5. Proceed with the edit in the original folder.

6. If anything breaks, restore from the snapshot:
   - Delete the broken project folder.
   - Rename the snapshot back to the original name.
   - Or copy the snapshot contents back into the original folder.

7. After successful deployment, keep the snapshot for 30 days.
   - Then delete to save space.
```

### When to Create a Snapshot

| Trigger | Action |
|---------|--------|
| Editing a shared component (header, footer, CSS, JS) | Snapshot required |
| Creating more than 3 new pages | Snapshot required |
| Refactoring any code | Snapshot required |
| Adding a new feature | Snapshot required |
| Editing a single page with no shared changes | Snapshot recommended but optional |
| Fixing a typo on one page | Snapshot optional |

### Backup Safety Rules

| Rule | Requirement |
|------|-------------|
| Always snapshot before shared component edits. | Shared changes affect every page; hard to undo manually. |
| Name snapshots with date and purpose. | `furnostyles-YYYY-MM-DD-before-purpose` |
| Keep snapshots outside the working folder. | Prevents accidental overwriting. |
| Do not rely on undo (Ctrl+Z) for major changes. | Undo buffer is limited and session-bound. |
| Test from the snapshot before declaring success. | The snapshot is the true backup, not just a copy. |

---

## 16. How to Avoid Duplicated Systems

Duplication is the fastest way to create technical debt. Follow these rules to prevent it.

### The Duplication Test

Before creating any new file, function, or style, ask:

```
1. Does something like this already exist in the project?
   - Search css/style.css for similar styles.
   - Search js/ for similar functions.
   - Search shared/ for similar components.

2. If it exists, can I reuse it?
   - Reuse the existing pattern rather than creating a new one.
   - Add a modifier class if you need a variation.

3. If it does not exist, will it be used on more than 2 pages?
   - Yes -> Centralize it (shared CSS, shared JS, shared component).
   - No -> Keep it page-specific.
```

### Duplication Prevention Rules

| Rule | Requirement |
|------|-------------|
| Search before creating. | Use VS Code global search (Ctrl+Shift+F). |
| Reuse before rewriting. | If a pattern exists, use it. |
| Centralize patterns used on 3+ pages. | Shared CSS, shared JS, shared data. |
| Never copy-paste shared code between pages. | If it is shared, it belongs in a shared file. |
| Document new patterns in architecture docs. | Future editors need to know what exists. |

### Common Duplication Traps

| Trap | Prevention |
|------|------------|
| Copying `<head>` from an old project | Always copy from `index.html` |
| Writing new button styles for every page | Use `.fns-btn*` classes from `style.css` |
| Writing new form styles for every form | Use `.fns-form*` classes from `style.css` |
| Hardcoding navigation in page HTML | Use `js/navigation-data.js` |
| Rewriting validation logic per form | Use `js/form-validation.js` |

---

## 17. How to Avoid Layout Corruption

Layout corruption happens when the grid system is violated or shared layout classes are modified incorrectly.

### Layout Protection Rules

| Rule | Requirement |
|------|-------------|
| Never remove `.premium-layout` from any page. | This is the root grid container. |
| Never remove `.premium-main` from any page. | This is the content container. |
| Never add inline styles to `.premium-layout` or `.premium-main`. | Use CSS classes or CSS variables. |
| Never change the grid definition of `.premium-layout` without testing every page. | The grid affects all pages. |
| Never add content outside `.premium-layout` except for floats. | Floating elements go after `</div>` closing `.premium-layout`. |
| Never nest a `.premium-layout` inside another `.premium-layout`. | Nested grids create unpredictable spacing. |

### Layout Safety Checklist

When creating or editing a page:

- [ ] Page has exactly one `.premium-layout` wrapper
- [ ] Page has exactly one `.premium-main` inside it
- [ ] No inline styles on `.premium-layout`, `.premium-main`, `.premium-header`, `.premium-topbar`, `.premium-brand`
- [ ] Floating elements (`cart-float`, `chat-float`) are outside `.premium-layout`
- [ ] Header mount point (`#fns-header-mount`) is before `.premium-layout`
- [ ] Footer mount point (`#fld-footer-mount`) is after `.premium-layout`
- [ ] Content is inside `.premium-main`, not between `.premium-layout` and `.premium-main`

### Fixing Layout Corruption

If a page layout breaks:

```
1. Open index.html and compare structure.
2. Verify the page has the same outer structure as index.html.
3. Check for missing or extra closing tags.
4. Check for inline styles on layout elements.
5. Check for nested .premium-layout containers.
6. Restore from snapshot if you cannot identify the cause.
```

---

## 18. How to Avoid Sidebar-Related Issues

**No sidebar exists yet.** These rules prevent accidental sidebar introduction.

### Sidebar Restraint Rules

| Rule | Requirement |
|------|-------------|
| Never add `<aside class="premium-sidebar">` to any page. | Sidebar is a future Phase 3 feature. |
| Never add `sidebar.css` to any page. | Sidebar styles do not exist yet. |
| Never add `sidebar.js` to any page. | Sidebar scripts do not exist yet. |
| Never add sidebar-related classes to shared components. | Shared components must work without sidebar. |
| If a design mockup includes a sidebar, document it as future. | Do not implement it yet. |

### Sidebar Exception Process

If you believe a page genuinely needs a sidebar now:

```
1. Read docs/final-operational-blueprint.md section 8.
2. Read docs/master-development-roadmap.md Phase 3.
3. Confirm the project is actually in Phase 3.
4. If yes, follow the opt-in sidebar implementation.
5. If no, do not add the sidebar. Use an alternative layout.
```

### Sidebar Alternative Layouts

If you need multi-column content before Phase 3:

```html
<!-- Use CSS Grid inside .premium-main, not a sidebar -->
<main class="premium-main">
  <div class="fns-two-column-grid">
    <div class="fns-column-primary">Main content</div>
    <div class="fns-column-secondary">Related links, CTA</div>
  </div>
</main>
```

This keeps content inside `.premium-main` without introducing a sidebar element.

---

## 19. How to Safely Work with Future Marketplace Features

**Not to be built yet.** Document only.

### Marketplace Restraint

| Rule | Requirement |
|------|-------------|
| Do not create `marketplace/` folder yet. | Phase 5 feature. |
| Do not create product listing pages yet. | Phase 5 feature. |
| Do not create `cart.html` checkout flow yet. | Phase 7 feature. |
| Do not add e-commerce meta tags yet. | Phase 5+ feature. |
| Do not add product schema markup yet. | Phase 5+ feature. |

### Marketplace Preparation (Safe Now)

| Action | Safe? | Notes |
|--------|-------|-------|
| Document marketplace structure in docs/ | Yes | Architecture docs are always safe |
| Plan product data model | Yes | Document only |
| Reserve `marketplace/` folder in docs | Yes | Mentions it in folder architecture |
| Add marketplace CSS file | No | Not needed until Phase 5 |
| Add marketplace JS file | No | Not needed until Phase 5 |
| Create product HTML pages | No | Phase 5 feature |

### When Marketplace Is Ready (Phase 5)

```
1. Read docs/final-operational-blueprint.md section 15.
2. Create marketplace/ folder.
3. Create marketplace.css and marketplace.js.
4. Load conditionally on marketplace pages only.
5. Ensure shared header/footer remain unchanged.
6. Test every marketplace page on mobile and desktop.
```

---

## 20. How to Safely Work with Future Dashboards / Accounts

**Not to be built yet.** Document only.

### Dashboard Restraint

| Rule | Requirement |
|------|-------------|
| Do not create login pages yet. | Phase 6 feature. |
| Do not create registration pages yet. | Phase 6 feature. |
| Do not create `dashboard/` folder yet. | Phase 6 feature. |
| Do not add auth-related JS yet. | Phase 6 feature. |
| Do not add session management yet. | Phase 6 feature. |

### Dashboard Preparation (Safe Now)

| Action | Safe? | Notes |
|--------|-------|-------|
| Document account types in docs/ | Yes | Architecture docs are always safe |
| Plan authentication strategy | Yes | Document only |
| Reserve `dashboard.css` in folder architecture | Yes | Listed as future file |
| Add Firebase Auth code | No | Not needed until Phase 6 |
| Create login HTML page | No | Phase 6 feature |
| Add user role checks | No | Phase 6 feature |

### When Dashboards Are Ready (Phase 6)

```
1. Read docs/final-operational-blueprint.md section 16.
2. Read docs/master-development-roadmap.md Phase 6.
3. Implement Firebase Authentication.
4. Create dashboard CSS and JS files.
5. Create dashboard pages (client, vendor, admin).
6. Implement role-based access control.
7. Test all dashboard types on mobile and desktop.
```

---

## 21. AI Safety Checklist Before Accepting Refactors

AI can suggest refactors that are technically correct but architecturally dangerous. Always review before accepting.

### Refactor Review Checklist

Before accepting any AI-suggested refactor:

- [ ] **Did the AI read the full file?** If not, ask it to read before editing.
- [ ] **Did the AI read the relevant architecture document?** If not, provide it.
- [ ] **Does the refactor change shared components?** If yes, verify all pages are tested.
- [ ] **Does the refactor rename classes or functions?** If yes, verify all references are updated.
- [ ] **Does the refactor move files?** If yes, verify all paths are updated.
- [ ] **Does the refactor delete code?** If yes, verify no callers exist.
- [ ] **Does the refactor add dependencies?** If yes, verify they are necessary and compatible.
- [ ] **Does the refactor change the layout system?** If yes, reject it unless explicitly requested.
- [ ] **Does the refactor "improve" without a specific problem?** If yes, reject it. Refactors need a reason.
- [ ] **Did you create a snapshot before the refactor?** If not, create one now.

### Refactor Red Flags

| Red Flag | Action |
|----------|--------|
| AI suggests rewriting `style.css` | Reject. Design tokens must be preserved. |
| AI suggests changing all class names | Reject. Every HTML file references those classes. |
| AI suggests moving all JS into one file | Reject. Conditional loading is intentional. |
| AI suggests converting to a framework | Reject. Static hosting is intentional. |
| AI suggests "cleaning up" without specifics | Reject. Vague refactors are dangerous. |
| AI suggests deleting "unused" files | Reject. AI cannot reliably detect all references. |

### Safe Refactor Acceptance

Only accept refactors that:

1. Solve a specific, documented problem.
2. Touch only the files directly related to that problem.
3. Do not change shared components (or explicitly test all pages).
4. Do not rename classes, functions, or files.
5. Do not add new dependencies.
6. Have been tested on a local preview.

---

## 22. Recommended Folder Discipline Rules

Folder discipline prevents the project from becoming a disorganized mess as it scales.

### Folder Rules

| Folder | Contains | Does NOT Contain |
|--------|----------|------------------|
| `css/` | Stylesheets only | JavaScript, images, HTML |
| `js/` | JavaScript only | CSS, images, HTML |
| `assets/` | Static assets only | Code, documentation |
| `shared/` | Reusable components only | Page-specific content |
| `docs/` | Documentation only | Code, assets |
| Page folders | HTML only | Shared assets (use `../css/`, `../js/`, `../assets/`) |

### Subfolder Discipline

| Rule | Requirement |
|------|-------------|
| Blog images go in `assets/images/blog/`. | Not `assets/images/` root. |
| Portfolio images go in `assets/images/portfolio/`. | Not `assets/images/` root. |
| Product images (future) go in `assets/images/products/`. | Pre-planned folder. |
| Property images (future) go in `assets/images/properties/`. | Pre-planned folder. |
| Feature CSS (future) goes in `css/`. | `marketplace.css`, `dashboard.css`, etc. |
| Feature JS (future) goes in `js/`. | `cart.js`, `checkout.js`, etc. |

### File Placement Test

When creating a new file, ask:

```
1. What type of file is this? (CSS, JS, HTML, image, doc)
2. Is it shared across pages or page-specific?
3. Shared -> css/, js/, shared/, or assets/
4. Page-specific -> Inside the relevant page folder
5. Documentation -> docs/
```

---

## 23. Recommended Naming Discipline Rules

Consistent naming makes the project readable and searchable.

### HTML File Naming

| Type | Format | Example |
|------|--------|---------|
| Page files | `kebab-case.html` | `interior-design.html`, `contact.html` |
| Index pages | `index.html` | `services/index.html` |
| Shared components | `descriptive-name.html` | `header.html`, `footer.html` |

### CSS File Naming

| Type | Format | Example |
|------|--------|---------|
| Shared styles | `style.css` | `css/style.css` |
| Feature styles | `feature-name.css` | `css/marketplace.css` |
| Upload bridge | `upload-bridge.css` | `shared/uploads/upload-bridge.css` |

### JS File Naming

| Type | Format | Example |
|------|--------|---------|
| Shared utilities | `main.js` | `js/main.js` |
| Data stores | `*-data.js` | `js/navigation-data.js`, `js/article-data.js` |
| Feature scripts | `feature-name.js` | `js/cart.js`, `js/search.js` |
| Validation | `form-validation.js` | `js/form-validation.js` |

### Image File Naming

| Type | Format | Example |
|------|--------|---------|
| Blog images | `blog-topic-size.webp` | `blog-modern-living-room-800.webp` |
| Portfolio images | `portfolio-project-size.webp` | `portfolio-karen-renovation-1200.webp` |
| Backgrounds | `bg-context-size.webp` | `bg-hero-home-1920.webp` |
| Icons | `icon-name.svg` | `icon-phone.svg`, `icon-email.svg` |

### Class Naming

| Prefix | Usage | Example |
|--------|-------|---------|
| `.premium-` | Layout/structural | `.premium-layout`, `.premium-header` |
| `.fns-` | Furnostyles components | `.fns-btn`, `.fns-card` |
| `.fld-` | Legacy commerce | `.fld-commerce-footer` |
| `.is-` / `.has-` | State modifiers | `.is-active`, `.has-dropdown` |

---

## 24. Recommended Debugging Workflow

When something breaks, follow this systematic approach instead of guessing.

### The DEBUG Method

```
D — Document: Write down exactly what is broken.
E — Examine: Open DevTools and look for errors.
B — Bisect: Comment out recent changes to isolate the cause.
U — Uncover: Search the codebase for the root cause.
G — Guard: Fix the root cause, not the symptom.
```

### Step-by-Step Debugging

```
1. Document the problem.
   - What is broken? (layout, functionality, styling, performance)
   - Which page(s) are affected?
   - When did it last work correctly?

2. Examine the browser console.
   - Open DevTools (F12) -> Console tab.
   - Look for red error messages.
   - Look for yellow warnings.
   - Note the file and line number of any errors.

3. Examine the Network tab.
   - Open DevTools -> Network tab.
   - Reload the page (Ctrl+R).
   - Look for red (failed) requests.
   - Common failures: 404 images, 404 CSS, 404 JS.

4. Examine the Elements tab.
   - Open DevTools -> Elements tab.
   - Inspect the broken element.
   - Check if the expected classes are present.
   - Check if styles are applied (look for strikethrough = overridden).

5. Bisect recent changes.
   - If you made multiple changes, undo them one at a time.
   - Test after each undo to identify which change caused the issue.
   - Or restore from snapshot and re-apply changes one at a time.

6. Search for the root cause.
   - Use VS Code global search (Ctrl+Shift+F).
   - Search for the class name, function name, or error message.
   - Check all files that reference the broken element.

7. Fix the root cause.
   - Do not add a workaround that hides the symptom.
   - Fix the actual cause of the problem.
   - Test the fix on all affected pages.
```

### Common Errors and Fixes

| Error | Likely Cause | Fix |
|-------|--------------|-----|
| `404 (Not Found)` for CSS/JS/image | Wrong relative path | Check path from page location to asset |
| `Uncaught ReferenceError` | Missing JS file or wrong load order | Check `<script>` tags; check file exists |
| `Uncaught TypeError: Cannot read property` | DOM element missing | Check element ID; check script runs after DOM |
| Header/footer not rendering | Mount point missing or wrong ID | Check `#fns-header-mount` and `#fld-footer-mount` |
| Layout broken on one page | Missing closing tag or extra `<div>` | Validate HTML; compare with `index.html` |
| Styles not applied | Class name typo or CSS not loaded | Check class spelling; check `<link rel="stylesheet">` |
| Images not loading | Wrong path or file missing | Check `src` path; verify file exists in `assets/` |

---

## 25. Recommended Production Workflow

When the site is live and receiving traffic, follow this production workflow for every change.

### Production Change Workflow

```
1. Plan the change.
   - Document what you will change and why.
   - Identify if it is a bug fix, content update, or feature addition.
   - Estimate risk (low, medium, high).

2. For medium/high risk changes, create a snapshot.
   - Copy entire project folder.
   - Name: furnostyles-YYYY-MM-DD-before-change-description

3. Make the change locally.
   - Edit in the working folder.
   - Save all files.

4. Test locally.
   - Open affected pages in browser.
   - Check console for errors.
   - Verify visual appearance.
   - Run Lighthouse if layout affected.

5. For shared component changes, test all page types.
   - Home, services, portfolio, blog, contact.
   - Mobile, tablet, desktop.

6. Deploy to preview URL.
   - Cloudflare Pages preview.
   - Test preview URL thoroughly.

7. If preview tests pass, deploy to production.
   - Mark as production deploy.

8. Verify live site.
   - Open live domain in browser.
   - Test affected pages.
   - Check console for errors.

9. Monitor for 30 minutes.
   - Watch for error reports.
   - Watch for broken functionality.

10. If issues arise, roll back.
    - Use Cloudflare Pages rollback.
    - Or restore from snapshot and redeploy.
```

### Production Change Risk Levels

| Risk | Examples | Snapshot Required? | Preview Required? |
|------|----------|-------------------|-------------------|
| **Low** | Fix typo, update text, swap image | Optional | Optional |
| **Medium** | New page, update shared CSS class, add navigation link | Required | Required |
| **High** | Refactor CSS, refactor JS, change layout system, add feature | Required | Required |

---

## 26. Recommended Long-Term Maintenance Workflow

Maintenance keeps the platform healthy over time. Schedule it regularly.

### Weekly Maintenance

| Task | Time | Tool |
|------|------|------|
| Review browser console on live site | 5 min | Chrome DevTools |
| Check for broken links | 10 min | Online link checker |
| Review site analytics (future) | 10 min | Google Analytics / Firebase |

### Monthly Maintenance

| Task | Time | Tool |
|------|------|------|
| Lighthouse audit on all major page types | 30 min | Chrome DevTools |
| Review Core Web Vitals in Search Console | 15 min | Google Search Console |
| Check for outdated content | 20 min | Manual review |
| Review and respond to form submissions | 15 min | Firestore dashboard (future) |

### Quarterly Maintenance

| Task | Time | Tool |
|------|------|------|
| Full performance audit | 1 hour | Lighthouse, PageSpeed Insights |
| Review and remove unused CSS | 1 hour | Chrome DevTools Coverage tab |
| Review and remove unused JS | 1 hour | Chrome DevTools Coverage tab |
| Review and archive old assets | 30 min | Manual review of `assets/` |
| Update architecture documents if changed | 1 hour | Review all docs/ files |
| Security review (dependencies, config) | 30 min | Review `shared/firebase/`, headers |

### Annual Maintenance

| Task | Time |
|------|------|
| Review entire architecture for fitness | 2 hours |
| Update roadmap based on business goals | 1 hour |
| Review and renew domain, hosting, SSL | 30 min |
| Review and renew third-party subscriptions | 30 min |

---

## 27. Common Mistakes to Avoid

These mistakes have been made before. Do not repeat them.

### The Fatal Fourteen

| # | Mistake | Consequence | Prevention |
|---|---------|-------------|------------|
| 1 | Adding inline styles to structural elements | Inconsistent layout across pages | Use CSS classes only; never `style="..."` on `.premium-*` elements |
| 2 | Duplicating `<head>` content across pages | Inconsistent SEO; maintenance nightmare | Copy from `index.html`; centralize all `<head>` structure |
| 3 | Hardcoding navigation links in page HTML | Adding a page requires editing every file | Use `js/navigation-data.js` |
| 4 | Copy-pasting CSS between pages | Inconsistent styling; massive file sizes | Centralize in `css/style.css` |
| 5 | Copy-pasting JS between pages | Inconsistent behaviour; bugs in one place fixed, not others | Centralize in `js/` shared files |
| 6 | Adding a sidebar before Phase 3 | Layout breaks; violates roadmap | Wait for Phase 3; use alternatives |
| 7 | Renaming classes without updating all references | Broken styling on affected pages | Search all files before renaming |
| 8 | Deleting files without checking references | 404 errors; broken functionality | Search all files before deleting |
| 9 | Moving files without updating paths | 404 errors for CSS, JS, images | Search all references before moving |
| 10 | Deploying without testing | Broken live site; lost credibility | Always test preview URL first |
| 11 | Adding placeholder text ("Coming soon") | Unprofessional appearance; SEO penalty | Only deploy complete, reviewed content |
| 12 | Using unoptimized images | Slow page load; poor Lighthouse scores | Compress, resize, convert to WebP before upload |
| 13 | Skipping the snapshot before major edits | Irreversible breakage; lost work | Snapshot before every shared component edit |
| 14 | Accepting AI refactors without review | Broken architecture; lost design tokens | Review every AI suggestion against the checklist |

---

## 28. What Should Always Remain Centralized

These items must never be duplicated. They are the foundation of the platform.

| Item | Central Location | Why It Must Stay Centralized |
|------|------------------|------------------------------|
| Design tokens (colours, fonts, spacing) | `style.css` (top) | One source of truth |
| Layout styles (grid, header, footer) | `style.css` | Every page uses the same structure |
| Button styles | `style.css` `.fns-btn*` | Consistent buttons everywhere |
| Card styles | `style.css` `.fns-card*` | Consistent cards everywhere |
| Form styles | `style.css` `.fns-form*` | Consistent forms everywhere |
| Navigation data | `js/navigation-data.js` | One link store for entire site |
| Header HTML | `shared/header.html` | One header for all pages |
| Footer HTML | `shared/footer.html` | One footer for all pages |
| Form validation rules | `js/form-validation.js` | One engine for all forms |
| Spam detection logic | `js/form-validation.js` | One honeypot/time-check for all forms |
| Firebase config | `shared/firebase/firebase-config.js` | One config for all Firebase features |
| Article metadata | `js/article-data.js` | One source for blog content |
| Shared utilities | `js/main.js` | Reusable functions, not duplicated |

### Centralization Enforcement

| Rule | Requirement |
|------|-------------|
| If a pattern appears on more than 2 pages, centralize it. | Duplication breeds inconsistency. |
| If a style is used on more than 2 pages, put it in `style.css`. | Page-specific CSS is for exceptions only. |
| If a function is used on more than 2 pages, put it in a shared JS file. | Copy-paste code is a maintenance liability. |
| If data is referenced on more than 2 pages, put it in a shared data file. | Central data stores prevent drift. |
| Never create a second `style.css` or `main.js`. | Splitting the foundation creates confusion. |
| Never inline shared styles or scripts in individual pages. | Inline code is not cacheable and hard to maintain. |

---

## 29. What Should Never Be Duplicated Again

These 14 items caused the old architecture to fail. Never duplicate them.

| Item | Why It Failed Before | Central Location |
|------|---------------------|------------------|
| `<head>` structure | Inconsistent meta tags broke SEO | Copy from `index.html` |
| Layout grid CSS | Multiple layout systems broke pages | `style.css` `.premium-layout` |
| Header HTML | Changes required editing every file | `shared/header.html` |
| Footer HTML | Changes required editing every file | `shared/footer.html` |
| Navigation links | Adding a page required editing every file | `js/navigation-data.js` |
| Button styles | Inconsistent buttons across pages | `style.css` `.fns-btn*` |
| Card styles | Inconsistent cards across pages | `style.css` `.fns-card*` |
| Form validation | Bugs fixed in one form remained in others | `js/form-validation.js` |
| Spam prevention | Inconsistent spam protection | `js/form-validation.js` |
| Form styles | Inconsistent forms across pages | `style.css` `.fns-form*` |
| Utility functions | Same logic rewritten differently | `js/main.js` |
| Colour values | Inconsistent colours | `style.css` CSS variables |
| Spacing values | Inconsistent spacing | `style.css` CSS variables |
| Typography styles | Inconsistent fonts and sizes | `style.css` CSS variables |

---

## 30. Furnostyles Long-Term Professional Development Philosophy

### The Core Belief

> **Clean architecture is a competitive advantage.**
>
> When competitors struggle with technical debt, Furnostyles scales smoothly because every decision was documented, every system was centralized, and every phase was completed before the next began.

### The Professional Standard

Furnostyles is not a side project. It is a premium platform with professional standards.

| Standard | Commitment |
|----------|------------|
| **Accessibility** | Every feature works for every user |
| **Performance** | Lighthouse 90+ performance, 100 accessibility |
| **Security** | No shortcuts; privacy-first by design |
| **Documentation** | Every decision documented; every change logged |
| **Testing** | No deployment without verification |
| **Centralization** | Shared systems stay shared; duplication never tolerated |
| **Phase discipline** | No skipping phases; no premature features |
| **Reversibility** | Every edit must be reversible via snapshot |

### The Developer Mindset

| Mindset | Application |
|---------|-------------|
| **Read first** | Open the file and understand it before changing it |
| **Centralize second** | Reuse existing patterns before creating new ones |
| **Minimize third** | Change the smallest amount of code that achieves the goal |
| **Verify always** | Test in browser before considering the task done |

### The Long-Term Vision

Furnostyles will grow from a static website to a comprehensive digital ecosystem:

- **Now:** Premium content platform
- **Phase 2-3:** SEO powerhouse with advanced UX
- **Phase 4-5:** Service and product marketplace
- **Phase 6-7:** Full commerce with accounts and payments
- **Phase 8:** Real estate and property platform
- **Phase 9-10:** AI-powered ecosystem with mobile and SaaS

At every stage, the architecture remains clean, documented, and governable. The platform does not accumulate technical debt because every developer who works on it follows the same disciplined workflow.

### The Final Rule

> **The architecture outlasts the team that built it.**
>
> Every document, every rule, and every system is designed so that a new developer or AI session can safely continue work without breaking what exists. The platform is not a collection of files — it is a governed, documented, scalable organism that improves with every phase.

---

## Document Summary

| # | Section | Purpose |
|---|---------|---------|
| 1 | Daily startup workflow | Begin every work session correctly |
| 2 | VS Code / Windsurf workflow | IDE setup and file discipline |
| 3 | AI prompting workflow | SAFE template for AI requests |
| 4 | Safe editing order | Read, plan, snapshot, edit, test sequence |
| 5 | How to safely create new pages | Copy from `index.html`, update content, test |
| 6 | How to safely edit shared components | Read, search, snapshot, test on all pages |
| 7 | How to safely edit CSS | Layer awareness, search references, test |
| 8 | How to safely edit JS | Read functions, check call sites, namespace |
| 9 | How to safely add blog articles | Content, image, HTML, data, links, test |
| 10 | How to safely add media/images | Optimize, name, place, reference, test |
| 11 | How to safely test responsive layouts | DevTools breakpoints, actual devices |
| 12 | How to safely test links | Internal, navigation, anchor, external |
| 13 | How to safely test performance | Lighthouse workflow and targets |
| 14 | How to safely deploy updates | Pre-verify, snapshot, preview, monitor |
| 15 | How to create backups | Snapshot workflow and naming |
| 16 | How to avoid duplicated systems | Search, reuse, centralize |
| 17 | How to avoid layout corruption | Layout protection rules and safety checklist |
| 18 | How to avoid sidebar-related issues | Restraint rules and alternative layouts |
| 19 | How to safely work with future marketplace | Document only; no implementation |
| 20 | How to safely work with future dashboards | Document only; no implementation |
| 21 | AI safety checklist before accepting refactors | 10-point review and red flags |
| 22 | Recommended folder discipline rules | Folder contents and placement test |
| 23 | Recommended naming discipline rules | File and class naming conventions |
| 24 | Recommended debugging workflow | DEBUG method and common errors |
| 25 | Recommended production workflow | Risk-based change management |
| 26 | Recommended long-term maintenance workflow | Weekly, monthly, quarterly, annual tasks |
| 27 | Common mistakes to avoid | The Fatal Fourteen with consequences |
| 28 | What should always remain centralized | 13 items with locations |
| 29 | What should never be duplicated again | 14 items that caused past failures |
| 30 | Long-term professional development philosophy | Standards, mindset, vision, final rule |

**Follow this workflow every time you work on Furnostyles. It is the difference between a platform that scales and a platform that collapses under its own weight.**
