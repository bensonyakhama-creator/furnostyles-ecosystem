/**
 * FURNOSTYLES — BLOG JAVASCRIPT
 * =============================
 * File: assets/js/blog.js
 * Purpose: Blog article page functionality - TOC, FAQ, reading time, article tracking
 */

(function () {
  'use strict';

  /* ============================================================
     READING TIME CALCULATOR
  ============================================================ */

  function calculateReadingTime() {
    var articleContent = document.querySelector('.fns-blog-content');
    if (!articleContent) return;

    var text = articleContent.textContent || articleContent.innerText;
    var words = text.trim().split(/\s+/).length;
    var wordsPerMinute = 200;
    var readingTime = Math.ceil(words / wordsPerMinute);

    var readingTimeElement = document.querySelector('.fns-blog-reading-time');
    if (readingTimeElement) {
      readingTimeElement.textContent = readingTime + ' min read';
    }
  }

  /* ============================================================
     TABLE OF CONTENTS HIGHLIGHTING
  ============================================================ */

  function initTableOfContents() {
    var tocLinks = document.querySelectorAll('.fns-blog-toc-list a');
    var sections = document.querySelectorAll('.fns-blog-section');

    if (!tocLinks.length || !sections.length) return;

    function highlightSection() {
      var scrollPosition = window.scrollY + 100;

      sections.forEach(function (section, index) {
        var sectionTop = section.offsetTop;
        var sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          tocLinks.forEach(function (link) {
            link.classList.remove('fns-toc-active');
          });
          if (tocLinks[index]) {
            tocLinks[index].classList.add('fns-toc-active');
          }
        }
      });
    }

    window.addEventListener('scroll', highlightSection);
    highlightSection();
  }

  /* ============================================================
     SMOOTH SCROLL FOR TOC LINKS
  ============================================================ */

  function initSmoothScroll() {
    var tocLinks = document.querySelectorAll('.fns-blog-toc-list a, .fns-blog-sidebar-list a');

    tocLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          var target = document.querySelector(href);
          if (target) {
            var offsetTop = target.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  /* ============================================================
     ARTICLE INTERACTION TRACKING
  ============================================================ */

  function trackArticleInteraction() {
    var articleTitle = document.getElementById('articleTitle');
    var articleCategory = document.getElementById('articleCategory');
    
    if (!articleTitle) return;

    var articleData = {
      title: articleTitle.textContent || 'Unknown Article',
      category: articleCategory ? articleCategory.textContent : 'Blog',
      url: window.location.href,
      timestamp: new Date().toISOString()
    };

    // Store recently viewed articles
    var recentlyViewed = JSON.parse(localStorage.getItem('fnsRecentlyViewedArticles') || '[]');
    
    // Remove if already exists (move to top)
    recentlyViewed = recentlyViewed.filter(function (item) {
      return item.url !== articleData.url;
    });
    
    // Add to beginning
    recentlyViewed.unshift(articleData);
    
    // Keep only last 10
    if (recentlyViewed.length > 10) {
      recentlyViewed = recentlyViewed.slice(0, 10);
    }
    
    localStorage.setItem('fnsRecentlyViewedArticles', JSON.stringify(recentlyViewed));

    // Track article interest for marketing
    var articleInterests = JSON.parse(localStorage.getItem('fnsArticleInterests') || '[]');
    
    var interestExists = articleInterests.some(function (interest) {
      return interest.category === articleData.category;
    });
    
    if (!interestExists) {
      articleInterests.push({
        category: articleData.category,
        count: 1,
        lastViewed: articleData.timestamp
      });
    } else {
      articleInterests.forEach(function (interest) {
        if (interest.category === articleData.category) {
          interest.count++;
          interest.lastViewed = articleData.timestamp;
        }
      });
    }
    
    localStorage.setItem('fnsArticleInterests', JSON.stringify(articleInterests));
  }

  /* ============================================================
     SAVE ARTICLE FOR LATER
  ============================================================ */

  function initSaveArticle() {
    var saveButtons = document.querySelectorAll('[data-save-article]');
    
    saveButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var articleTitle = document.getElementById('articleTitle');
        var articleCategory = document.getElementById('articleCategory');
        
        if (!articleTitle) return;

        var savedArticle = {
          title: articleTitle.textContent || 'Unknown Article',
          category: articleCategory ? articleCategory.textContent : 'Blog',
          url: window.location.href,
          savedAt: new Date().toISOString()
        };

        var savedArticles = JSON.parse(localStorage.getItem('fnsSavedArticles') || '[]');
        
        // Check if already saved
        var alreadySaved = savedArticles.some(function (article) {
          return article.url === savedArticle.url;
        });
        
        if (alreadySaved) {
          alert('This article is already saved.');
          return;
        }
        
        savedArticles.unshift(savedArticle);
        localStorage.setItem('fnsSavedArticles', JSON.stringify(savedArticles));
        
        alert('Article saved! You can view your saved articles from your account.');
        
        // Update button state
        button.textContent = 'Saved ✓';
        button.disabled = true;
      });
    });
  }

  /* ============================================================
     ARTICLE SCROLL PROGRESS
  ============================================================ */

  function initScrollProgress() {
    var progressBar = document.createElement('div');
    progressBar.className = 'fns-scroll-progress';
    progressBar.style.cssText = 'position: fixed; top: 0; left: 0; height: 3px; background: var(--fns-gold-primary); width: 0%; z-index: 9999; transition: width 0.1s;';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  /* ============================================================
     DYNAMIC RELATED ARTICLES (uses article-data.js)
  ============================================================ */

  function loadRelatedArticles() {
    var data = window.FurnostylesArticles;
    var utils = window.FurnostylesArticleUtils;
    if (!data || !utils) return;

    // Derive slug from URL (e.g., /blogs/article-slug.html -> article-slug)
    var path = window.location.pathname;
    var slugMatch = path.match(/\/blogs\/(.+?)\.html/);
    if (!slugMatch) return;
    var slug = slugMatch[1];

    // Try to inject related articles into the page
    var relatedContainer = document.getElementById('fns-related-articles-mount');
    if (relatedContainer) {
      var html = utils.renderRelatedArticles(slug, 3);
      if (html) relatedContainer.innerHTML = html;
    }

    // Store category for recommendations
    var article = data.getBySlug(slug);
    if (article && article.category) {
      sessionStorage.setItem('fnsCurrentArticleCategory', article.category);
    }
  }

  /* ============================================================
     FAQ ACCORDION ENHANCEMENT
  ============================================================ */

  function initFAQAccordion() {
    var faqItems = document.querySelectorAll('.fns-faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var summary = item.querySelector('.fns-faq-summary');
      if (!summary) return;

      summary.addEventListener('click', function () {
        // Close other open items for accordion behavior
        var isOpen = item.hasAttribute('open');
        if (!isOpen) {
          faqItems.forEach(function (otherItem) {
            if (otherItem !== item && otherItem.hasAttribute('open')) {
              otherItem.removeAttribute('open');
            }
          });
        }
      });
    });
  }

  /* ============================================================
     LAZY IMAGE LOADING
  ============================================================ */

  function initLazyImages() {
    if ('IntersectionObserver' in window) {
      var imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '50px' });

      var lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach(function (img) {
        imageObserver.observe(img);
      });
    }
  }

  /* ============================================================
     READING TIME FROM METADATA
  ============================================================ */

  function applyReadingTimeFromMeta() {
    var data = window.FurnostylesArticles;
    if (!data) return;

    var path = window.location.pathname;
    var slugMatch = path.match(/\/blogs\/(.+?)\.html/);
    if (!slugMatch) return;

    var article = data.getBySlug(slugMatch[1]);
    if (!article || !article.readingTime) return;

    var el = document.querySelector('.fns-blog-reading-time');
    if (el) {
      el.textContent = article.readingTime + ' min read';
    }
  }

  /* ============================================================
     SEARCH INTEGRATION
  ============================================================ */

  function initSearch() {
    var searchInputs = document.querySelectorAll('.fns-article-search input');
    searchInputs.forEach(function (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var utils = window.FurnostylesArticleUtils;
          if (utils) utils.handleSearch(input.id);
        }
      });
    });
  }

  /* ============================================================
     INITIALISATION
  ============================================================ */

  function init() {
    // Apply reading time from metadata (overrides calculation if available)
    applyReadingTimeFromMeta();

    // Calculate and display reading time (fallback if no metadata)
    calculateReadingTime();

    // Initialize table of contents
    initTableOfContents();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Initialize FAQ accordion
    initFAQAccordion();

    // Initialize lazy image loading
    initLazyImages();

    // Track article interaction
    trackArticleInteraction();

    // Initialize save article buttons
    initSaveArticle();

    // Initialize scroll progress bar
    initScrollProgress();

    // Load related articles from data store
    loadRelatedArticles();

    // Initialize search
    initSearch();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
