/**
 * FURNOSTYLES — ARTICLE UTILITIES
 * =================================
 * File: blogs/article-utils.js
 * Purpose: Reusable component renderers and article helpers.
 *          Static-hosting compatible. Works with article-data.js.
 *
 * Usage:
 *   <script src="blogs/article-data.js"></script>
 *   <script src="blogs/article-utils.js"></script>
 *   // Access via window.FurnostylesArticleUtils
 */

(function () {
  'use strict';

  /* ============================================================
     CONFIG
  ============================================================ */

  var CONFIG = {
    baseImagePath: '../assets/images/blogs/',
    placeholderImage: '../assets/images/blogs/blog-1.jpg',
    maxRelatedArticles: 3,
    maxRelatedServices: 4,
    readingTimeWPM: 200
  };

  /* ============================================================
     SAFE HTML HELPERS
  ============================================================ */

  function escapeHtml(text) {
    if (text == null) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function when(condition, html) {
    return condition ? (html || '') : '';
  }

  /* ============================================================
     COMPONENT RENDERERS
  ============================================================ */

  function renderHero(article) {
    if (!article) return '';
    var img = article.heroImage || CONFIG.placeholderImage;
    var alt = escapeHtml(article.heroAlt || article.title);
    var cat = escapeHtml(article.category ? getCategoryLabel(article.category) : 'Guide');
    var title = escapeHtml(article.title);
    var intro = escapeHtml(article.description);
    var author = escapeHtml(article.author || 'Furnostyles Editorial');
    var time = article.readingTime || estimateReadingTime(article.wordCount);
    var date = article.updatedDate || article.publishedDate || 'Updated 2026';

    return (
      '<section class="fns-blog-hero">' +
        '<div class="fns-container">' +
          '<div class="fns-blog-hero-layout">' +
            '<div class="fns-blog-hero-image">' +
              '<img id="articleHeroImage" src="' + escapeHtml(img) + '" alt="' + alt + '">' +
            '</div>' +
            '<div class="fns-blog-hero-content">' +
              '<span id="articleCategory" class="fns-blog-category">' + cat + '</span>' +
              '<h1 id="articleTitle" class="fns-blog-title">' + title + '</h1>' +
              '<p id="articleIntro" class="fns-blog-intro">' + intro + '</p>' +
              '<div class="fns-blog-meta">' +
                '<span class="fns-blog-author">By ' + author + '</span>' +
                '<span class="fns-blog-reading-time">' + time + ' min read</span>' +
                '<span class="fns-blog-date">' + escapeHtml(date) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  function renderTOC(sections, title) {
    if (!sections || !sections.length) return '';
    title = title || 'Table of Contents';
    var items = sections.map(function (s) {
      return '<li><a href="#' + escapeHtml(s.id) + '">' + escapeHtml(s.title) + '</a></li>';
    }).join('');

    return (
      '<section class="fns-section fns-section-light fns-section-sm">' +
        '<div class="fns-container">' +
          '<div class="fns-blog-toc">' +
            '<h3 class="fns-blog-toc-title">' + escapeHtml(title) + '</h3>' +
            '<ul class="fns-blog-toc-list">' + items + '</ul>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  function renderCTA(options) {
    options = options || {};
    var title = escapeHtml(options.title || 'Ready to Start Your Project?');
    var description = escapeHtml(options.description || 'Contact Furnostyles for a free consultation and detailed quotation.');
    var primaryText = escapeHtml(options.primaryText || 'Request a Quote');
    var primaryUrl = escapeHtml(options.primaryUrl || '../contact.html');
    var secondaryText = escapeHtml(options.secondaryText || 'Explore Services');
    var secondaryUrl = escapeHtml(options.secondaryUrl || '../services.html');
    var tertiaryText = options.tertiaryText ? escapeHtml(options.tertiaryText) : null;
    var tertiaryUrl = options.tertiaryUrl ? escapeHtml(options.tertiaryUrl) : null;

    var tertiaryBtn = tertiaryText
      ? '<a href="' + tertiaryUrl + '" class="fns-btn fns-btn-outline">' + tertiaryText + '</a>'
      : '';

    return (
      '<section class="fns-blog-cta">' +
        '<h2 class="fns-blog-cta-title">' + title + '</h2>' +
        '<p class="fns-blog-cta-description">' + description + '</p>' +
        '<div class="fns-blog-cta-actions">' +
          '<a href="' + primaryUrl + '" class="fns-btn fns-btn-primary">' + primaryText + '</a>' +
          '<a href="' + secondaryUrl + '" class="fns-btn fns-btn-outline">' + secondaryText + '</a>' +
          tertiaryBtn +
        '</div>' +
      '</section>'
    );
  }

  function renderQuote(text, attribution) {
    if (!text) return '';
    var attr = attribution ? '<cite>' + escapeHtml(attribution) + '</cite>' : '';
    return (
      '<blockquote class="fns-blog-quote">' + escapeHtml(text) + attr + '</blockquote>'
    );
  }

  function renderImage(src, alt, caption) {
    if (!src) return '';
    var cap = caption ? '<figcaption>' + escapeHtml(caption) + '</figcaption>' : '';
    return (
      '<figure class="fns-blog-image">' +
        '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt || '') + '" loading="lazy">' +
        cap +
      '</figure>'
    );
  }

  function renderFAQ(faqs) {
    if (!faqs || !faqs.length) return '';
    var items = faqs.map(function (f, i) {
      var openAttr = i === 0 ? ' open' : '';
      return (
        '<details class="fns-faq-item"' + openAttr + '>' +
          '<summary class="fns-faq-summary">' + escapeHtml(f.question) + '</summary>' +
          '<p class="fns-faq-content">' + escapeHtml(f.answer) + '</p>' +
        '</details>'
      );
    }).join('');

    return (
      '<section class="fns-blog-faq">' +
        '<h2 class="fns-blog-heading">Frequently Asked Questions</h2>' +
        items +
      '</section>'
    );
  }

  function renderConclusion(text, ctas) {
    text = text || 'The best interior design results come from connecting planning, products, materials, service execution and long-term maintenance.';
    var ctaHtml = ctas ? renderCTA(ctas) : '';
    return (
      '<div class="fns-blog-section">' +
        '<h2 class="fns-blog-heading">Final Thoughts</h2>' +
        '<p>' + escapeHtml(text) + '</p>' +
      '</div>' +
      ctaHtml
    );
  }

  /* ============================================================
     RELATED CONTENT RENDERERS
  ============================================================ */

  function renderRelatedArticles(slug, count) {
    var data = window.FurnostylesArticles;
    if (!data) return '';
    var articles = data.getRelated(slug, count || CONFIG.maxRelatedArticles);
    if (!articles.length) return '';

    var cards = articles.map(function (a) {
      var img = a.heroImage || CONFIG.placeholderImage;
      var catLabel = a.category ? getCategoryLabel(a.category) : 'Guide';
      return (
        '<div class="fns-card">' +
          '<img src="' + escapeHtml(img) + '" alt="' + escapeHtml(a.heroAlt || a.title) + '" class="fns-card-image" style="height: 200px;">' +
          '<span class="fns-badge fns-badge-gold">' + escapeHtml(catLabel) + '</span>' +
          '<h3 class="fns-card-title fns-mt-sm">' + escapeHtml(a.title) + '</h3>' +
          '<p class="fns-card-description">' + escapeHtml(truncate(a.description, 100)) + '</p>' +
          '<a href="' + escapeHtml(a.slug) + '.html" class="fns-card-link">Read More &rarr;</a>' +
        '</div>'
      );
    }).join('');

    return (
      '<section class="fns-section fns-section-dark">' +
        '<div class="fns-container">' +
          '<div class="fns-section-header">' +
            '<h2>Continue Reading</h2>' +
            '<p>More guides from Furnostyles</p>' +
          '</div>' +
          '<div class="fns-grid fns-grid-3">' + cards + '</div>' +
        '</div>' +
      '</section>'
    );
  }

  function renderRelatedServices(slug) {
    var data = window.FurnostylesArticles;
    if (!data) return '';
    var services = data.getRelatedServices(slug);
    if (!services.length) return '';

    var links = services.map(function (s) {
      return '<li><a href="' + escapeHtml(s.url) + '">' + escapeHtml(s.name) + '</a> <span class="fns-service-desc">' + escapeHtml(s.description) + '</span></li>';
    }).join('');

    return (
      '<div class="fns-blog-related-services">' +
        '<h3>Related Services</h3>' +
        '<ul class="fns-blog-sidebar-list">' + links + '</ul>' +
      '</div>'
    );
  }

  function renderArticleNav() {
    return (
      '<section class="fns-section fns-section-light fns-section-sm">' +
        '<div class="fns-container">' +
          '<nav class="fns-blog-nav">' +
            '<a href="../blogs.html">All Guides</a>' +
            '<a href="../services.html">Services</a>' +
            '<a href="../repairs.html">Repairs</a>' +
            '<a href="../portfolio.html">Portfolio</a>' +
            '<a href="../contact.html">Contact</a>' +
          '</nav>' +
        '</div>' +
      '</section>'
    );
  }

  /* ============================================================
     SCHEMA MARKUP
  ============================================================ */

  function generateSchema(article) {
    if (!article || !article.schema) return '';
    var s = article.schema;
    var schema = {
      '@context': 'https://schema.org',
      '@type': s.type || 'Article',
      headline: s.headline || article.title,
      description: article.description,
      image: s.image || CONFIG.placeholderImage,
      author: {
        '@type': 'Organization',
        name: s.author && s.author.name ? s.author.name : 'Furnostyles Editorial'
      },
      publisher: {
        '@type': 'Organization',
        name: s.publisher && s.publisher.name ? s.publisher.name : 'Furnostyles',
        logo: {
          '@type': 'ImageObject',
          url: s.publisher && s.publisher.logo ? s.publisher.logo : ''
        }
      }
    };
    if (s.datePublished) schema.datePublished = s.datePublished;
    if (s.dateModified) schema.dateModified = s.dateModified;
    if (article.keywords && article.keywords.length) schema.keywords = article.keywords.join(', ');

    return '<script type="application/ld+json">' + JSON.stringify(schema) + '</script>';
  }

  function generateFAQSchema(faqs) {
    if (!faqs || !faqs.length) return '';
    var schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(function (f) {
        return {
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        };
      })
    };
    return '<script type="application/ld+json">' + JSON.stringify(schema) + '</script>';
  }

  /* ============================================================
     UTILITY FUNCTIONS
  ============================================================ */

  function estimateReadingTime(wordCount) {
    if (!wordCount) return 8;
    return Math.ceil(wordCount / CONFIG.readingTimeWPM);
  }

  function getCategoryLabel(categoryId) {
    var data = window.FurnostylesArticles;
    if (!data) {
      var labels = {
        'interior-design': 'Interior Design',
        'construction-finishing': 'Construction',
        'repairs-maintenance': 'Repairs',
        'furniture-fittings': 'Furniture',
        'real-estate': 'Real Estate',
        'commercial': 'Commercial',
        'luxury': 'Luxury',
        'buying-guides': 'Buying Guide'
      };
      return labels[categoryId] || 'Guide';
    }
    var cat = data.getCategoryById(categoryId);
    return cat ? cat.label : 'Guide';
  }

  function truncate(text, maxLength) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
  }

  function slugify(text) {
    return String(text).toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /* ============================================================
     CATEGORY PAGE HELPERS
  ============================================================ */

  function renderCategoryCards(categoryId, count) {
    var data = window.FurnostylesArticles;
    if (!data) return '';
    var articles = data.getByCategory(categoryId).filter(function (a) { return a.status === 'published'; });
    if (count) articles = articles.slice(0, count);

    if (!articles.length) return '<p class="fns-text-muted">No articles in this category yet.</p>';

    return articles.map(function (a) {
      var img = a.heroImage || CONFIG.placeholderImage;
      var tierLabel = a.tier === 'cornerstone' ? 'Cornerstone' : 'Guide';
      return (
        '<article class="fns-card fns-card-article">' +
          '<a href="' + escapeHtml(a.slug) + '.html" class="fns-card-link-block">' +
            '<img src="' + escapeHtml(img) + '" alt="' + escapeHtml(a.heroAlt || a.title) + '" class="fns-card-image" loading="lazy">' +
            '<span class="fns-badge fns-badge-gold">' + escapeHtml(tierLabel) + '</span>' +
            '<h3 class="fns-card-title">' + escapeHtml(a.title) + '</h3>' +
            '<p class="fns-card-description">' + escapeHtml(truncate(a.description, 120)) + '</p>' +
            '<span class="fns-card-meta">' + (a.readingTime || 8) + ' min read</span>' +
          '</a>' +
        '</article>'
      );
    }).join('');
  }

  function renderFeaturedArticleCards(count) {
    var data = window.FurnostylesArticles;
    if (!data) return '';
    var articles = data.getFeatured(count || 3);
    if (!articles.length) return '';

    return articles.map(function (a) {
      var img = a.heroImage || CONFIG.placeholderImage;
      var catLabel = getCategoryLabel(a.category);
      return (
        '<div class="fns-card fns-card-featured">' +
          '<a href="' + escapeHtml(a.slug) + '.html" class="fns-card-link-block">' +
            '<img src="' + escapeHtml(img) + '" alt="' + escapeHtml(a.heroAlt || a.title) + '" class="fns-card-image" loading="lazy">' +
            '<span class="fns-badge fns-badge-gold">' + escapeHtml(catLabel) + '</span>' +
            '<h3 class="fns-card-title">' + escapeHtml(a.title) + '</h3>' +
            '<p class="fns-card-description">' + escapeHtml(truncate(a.description, 120)) + '</p>' +
            '<span class="fns-card-meta">' + (a.readingTime || 8) + ' min read &middot; Featured</span>' +
          '</a>' +
        '</div>'
      );
    }).join('');
  }

  /* ============================================================
     SEARCH & RECOMMENDATION HELPERS
  ============================================================ */

  function renderSearchInput(targetId) {
    targetId = targetId || 'fns-article-search';
    return (
      '<div class="fns-article-search">' +
        '<input type="search" id="' + escapeHtml(targetId) + '" placeholder="Search articles, topics, materials..." aria-label="Search articles">' +
        '<button type="button" class="fns-btn fns-btn-primary" onclick="FurnostylesArticleUtils.handleSearch(\'' + escapeHtml(targetId) + '\')">Search</button>' +
      '</div>'
    );
  }

  function renderSearchResults(query, containerId) {
    var data = window.FurnostylesArticles;
    if (!data) return;
    var results = data.search(query);
    var container = document.getElementById(containerId);
    if (!container) return;

    if (!results.length) {
      container.innerHTML = '<p class="fns-text-muted">No articles found for "' + escapeHtml(query) + '".</p>';
      return;
    }

    container.innerHTML = results.map(function (a) {
      return (
        '<article class="fns-card fns-card-article">' +
          '<a href="' + escapeHtml(a.slug) + '.html" class="fns-card-link-block">' +
            '<h3 class="fns-card-title">' + escapeHtml(a.title) + '</h3>' +
            '<p class="fns-card-description">' + escapeHtml(truncate(a.description, 120)) + '</p>' +
            '<span class="fns-card-meta">' + escapeHtml(getCategoryLabel(a.category)) + ' &middot; ' + (a.readingTime || 8) + ' min read</span>' +
          '</a>' +
        '</article>'
      );
    }).join('');
  }

  function handleSearch(inputId) {
    var input = document.getElementById(inputId || 'fns-article-search');
    if (!input) return;
    var query = input.value.trim();
    if (!query) return;

    // Look for a results container near the input
    var container = input.closest('.fns-article-search') && input.closest('.fns-article-search').nextElementSibling;
    if (!container) {
      container = document.getElementById('fns-search-results');
    }
    if (!container) {
      // Create results container if missing
      var wrapper = document.createElement('div');
      wrapper.id = 'fns-search-results';
      wrapper.className = 'fns-search-results';
      input.parentNode.parentNode.appendChild(wrapper);
      container = wrapper;
    }

    renderSearchResults(query, container.id);
  }

  function recommendForArticle(slug, count) {
    var data = window.FurnostylesArticles;
    if (!data) return [];

    // Priority: 1) relatedArticles, 2) same category, 3) same tier
    var article = data.getBySlug(slug);
    if (!article) return [];

    var related = data.getRelated(slug, count);
    if (related.length >= (count || 3)) return related;

    var needed = (count || 3) - related.length;
    var sameCat = data.getByCategory(article.category).filter(function (a) {
      return a.slug !== slug && a.status === 'published' && !article.relatedArticles.includes(a.slug);
    });

    var extras = sameCat.slice(0, needed);
    return related.concat(extras);
  }

  /* ============================================================
     PUBLIC API
  ============================================================ */

  window.FurnostylesArticleUtils = {
    /* Config */
    config: CONFIG,

    /* Component renderers */
    renderHero: renderHero,
    renderTOC: renderTOC,
    renderCTA: renderCTA,
    renderQuote: renderQuote,
    renderImage: renderImage,
    renderFAQ: renderFAQ,
    renderConclusion: renderConclusion,
    renderArticleNav: renderArticleNav,
    renderRelatedArticles: renderRelatedArticles,
    renderRelatedServices: renderRelatedServices,

    /* Schema */
    generateSchema: generateSchema,
    generateFAQSchema: generateFAQSchema,

    /* Page helpers */
    renderCategoryCards: renderCategoryCards,
    renderFeaturedArticleCards: renderFeaturedArticleCards,
    renderSearchInput: renderSearchInput,
    renderSearchResults: renderSearchResults,
    handleSearch: handleSearch,
    recommendForArticle: recommendForArticle,

    /* Utilities */
    estimateReadingTime: estimateReadingTime,
    getCategoryLabel: getCategoryLabel,
    truncate: truncate,
    slugify: slugify,
    escapeHtml: escapeHtml
  };

})();
