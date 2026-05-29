/**
 * FURNOSTYLES — NEWS PAGE
 * =========================
 * File: assets/js/news.js
 * Purpose: Fetch and display news articles from Firestore
 *          Provides filtering by category
 */

(function() {
  'use strict';

  var newsGrid = document.getElementById('newsGrid');
  var newsLoading = document.getElementById('newsLoading');
  var newsEmpty = document.getElementById('newsEmpty');
  var filterButtons = document.querySelectorAll('.news-filter-btn');
  var currentFilter = 'all';

  // Sample news data (fallback if Firestore not available)
  var sampleNews = [
    {
      id: 1,
      title: 'Furnostyles Expands to Mombasa with New Showroom',
      category: 'announcements',
      excerpt: 'We are thrilled to announce the opening of our new showroom in Mombasa, bringing premium furniture and home solutions to the coastal region. The 5,000 sq ft showroom features our complete collection including luxury sofas, dining sets, bedroom furniture, and custom pieces.',
      date: '2026-05-29',
      image: 'assets/images/hero.jpg'
    },
    {
      id: 2,
      title: 'June Flash Sale: Up to 40% Off Selected Items',
      category: 'promotions',
      excerpt: 'Don\'t miss our biggest sale of the year! Get up to 40% off on selected furniture pieces, home decor items, and renovation materials. Sale runs from June 1-15, 2026. Visit our Nairobi showroom or shop online.',
      date: '2026-05-29',
      image: 'assets/images/product-1.jpg'
    },
    {
      id: 3,
      title: 'Platform Update: Enhanced User Dashboard',
      category: 'updates',
      excerpt: 'We have improved our user dashboard with new features for better order tracking and account management.',
      date: '2026-05-26',
      image: 'assets/images/product-2.jpg'
    },
    {
      id: 4,
      title: 'Kenya Interior Design Trends 2026',
      category: 'industry',
      excerpt: 'Discover the latest interior design trends shaping the Kenyan market this year.',
      date: '2026-05-25',
      image: 'assets/images/product-3.jpg'
    },
    {
      id: 5,
      title: 'New Vendor Partnership Program',
      category: 'announcements',
      excerpt: 'Join our expanded vendor program and reach thousands of customers across Kenya.',
      date: '2026-05-24',
      image: 'assets/images/product-4.jpg'
    }
  ];

  var allNews = sampleNews; // Will be replaced with Firestore data

  function renderNews(news) {
    newsGrid.innerHTML = news.map(function(item) {
      return '<div class="news-card" data-category="' + item.category + '">' +
        '<div class="news-card-image">' +
          '<img src="' + (item.image || 'assets/images/hero.jpg') + '" alt="' + item.title + '" onerror="this.src=\'assets/images/hero.jpg\'">' +
        '</div>' +
        '<div class="news-card-content">' +
          '<span class="news-card-category ' + item.category + '">' + item.category.charAt(0).toUpperCase() + item.category.slice(1) + '</span>' +
          '<h3 class="news-card-title">' + item.title + '</h3>' +
          '<p class="news-card-excerpt">' + item.excerpt + '</p>' +
          '<div class="news-card-meta">' +
            '<span class="news-card-date">' + formatDate(item.date) + '</span>' +
            '<a href="#" class="news-card-read-more">Read More →</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function formatDate(dateStr) {
    var date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function filterNews(category) {
    currentFilter = category;
    var filtered = category === 'all' ? allNews : allNews.filter(function(item) {
      return item.category === category;
    });
    renderNews(filtered);
  }

  function fetchNewsFromFirestore() {
    if (window.FurnostylesFirebase && window.FurnostylesFirebase.firestore) {
      var db = window.FurnostylesFirebase.firestore;
      var newsCollection = db.collection('news');
      
      // Get news ordered by date (newest first)
      newsCollection.orderBy('date', 'desc').limit(20).get()
        .then(function(querySnapshot) {
          var newsData = [];
          querySnapshot.forEach(function(doc) {
            var data = doc.data();
            newsData.push({
              id: doc.id,
              title: data.title || '',
              category: data.category || 'announcements',
              excerpt: data.excerpt || '',
              date: data.date || new Date().toISOString(),
              image: data.image || 'assets/images/hero.jpg'
            });
          });
          
          allNews = newsData.length > 0 ? newsData : sampleNews;
          newsLoading.style.display = 'none';
          
          if (allNews.length > 0) {
            newsGrid.style.display = 'grid';
            filterNews(currentFilter);
          } else {
            newsEmpty.style.display = 'block';
          }
        })
        .catch(function(error) {
          console.error('Error fetching news from Firestore:', error);
          // Fallback to sample data
          allNews = sampleNews;
          newsLoading.style.display = 'none';
          newsGrid.style.display = 'grid';
          filterNews(currentFilter);
        });
    } else {
      // Firebase not available, use sample data
      allNews = sampleNews;
      newsLoading.style.display = 'none';
      newsGrid.style.display = 'grid';
      filterNews(currentFilter);
    }
  }

  function initNews() {
    // Try to fetch from Firestore first
    fetchNewsFromFirestore();
  }

  // Filter button click handlers
  filterButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterButtons.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      filterNews(this.getAttribute('data-filter'));
    });
  });

  // Initialize
  initNews();

})();
