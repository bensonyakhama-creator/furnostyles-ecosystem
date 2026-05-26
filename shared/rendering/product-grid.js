/**
 * Furnostyles Product Grid Renderer
 * Renders product listings with search, filters, and sorting
 */

(function() {
  'use strict';

  window.FurnostylesProductGrid = {
    currentProducts: [],
    filteredProducts: [],
    currentPage: 1,
    itemsPerPage: 24,
    currentFilters: {
      category: 'all',
      priceMin: 0,
      priceMax: 100000000,
      location: 'all',
      rating: 0,
      search: ''
    },
    currentSort: 'relevance',

    init: function(marketplaceType) {
      this.marketplaceType = marketplaceType || 'furniture';
      this.loadProducts();
      this.renderGrid();
      this.bindEvents();
    },

    loadProducts: function() {
      if (window.FurnostylesDemoProducts) {
        this.currentProducts = window.FurnostylesDemoProducts[this.marketplaceType] || [];
        this.filteredProducts = [...this.currentProducts];
      }
    },

    applyFilters: function() {
      this.filteredProducts = this.currentProducts.filter(product => {
        // Category filter
        if (this.currentFilters.category !== 'all' && product.category !== this.currentFilters.category) {
          return false;
        }

        // Price filter
        if (product.price < this.currentFilters.priceMin || product.price > this.currentFilters.priceMax) {
          return false;
        }

        // Location filter
        if (this.currentFilters.location !== 'all' && product.location !== this.currentFilters.location) {
          return false;
        }

        // Rating filter
        if (parseFloat(product.rating) < this.currentFilters.rating) {
          return false;
        }

        // Search filter
        if (this.currentFilters.search) {
          const searchLower = this.currentFilters.search.toLowerCase();
          const searchableText = `${product.title} ${product.category} ${product.description} ${product.seller}`.toLowerCase();
          if (!searchableText.includes(searchLower)) {
            return false;
          }
        }

        return true;
      });

      this.applySort();
    },

    applySort: function() {
      switch (this.currentSort) {
        case 'price-low':
          this.filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          this.filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          this.filteredProducts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
          break;
        case 'newest':
          this.filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
          break;
        case 'reviews':
          this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
          break;
        default:
          // relevance - featured first
          this.filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }
    },

    renderGrid: function() {
      const gridContainer = document.getElementById('product-grid-container');
      if (!gridContainer) return;

      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      const pageProducts = this.filteredProducts.slice(startIndex, endIndex);

      if (pageProducts.length === 0) {
        gridContainer.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
            <div style="font-size: 48px; margin-bottom: 20px;">🔍</div>
            <h3 style="color: var(--fns-petrol-blue); margin-bottom: 10px;">No products found</h3>
            <p style="color: var(--fns-text-light);">Try adjusting your filters or search terms</p>
          </div>
        `;
        return;
      }

      let html = '<div class="mp-grid">';
      pageProducts.forEach(product => {
        html += this.renderProductCard(product);
      });
      html += '</div>';

      // Pagination
      const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
      if (totalPages > 1) {
        html += this.renderPagination(totalPages);
      }

      gridContainer.innerHTML = html;
    },

    renderProductCard: function(product) {
      const discountBadge = product.discount > 0 
        ? `<span class="mp-badge mp-badge-featured">-${product.discount}%</span>` 
        : '';
      
      const featuredBadge = product.featured 
        ? `<span class="mp-badge mp-badge-type">Featured</span>` 
        : '';

      const priceDisplay = product.discount > 0
        ? `<span style="text-decoration: line-through; color: #999; font-size: 13px; margin-right: 8px;">KES ${product.originalPrice.toLocaleString()}</span>
           <span style="font-size: 18px; font-weight: 800; color: #0b3b46;">KES ${product.price.toLocaleString()}</span>`
        : `<span style="font-size: 18px; font-weight: 800; color: #0b3b46;">KES ${product.price.toLocaleString()}</span>`;

      const stockColor = product.stock === 'In Stock' || product.stock === 'Available' ? '#28a745' : '#dc3545';

      return `
        <a href="product-detail.html?id=${product.id}" class="mp-card">
          <div class="mp-card-img-wrap">
            <img src="${product.image}" alt="${product.title}" class="mp-card-img" loading="lazy">
            ${discountBadge}
            ${featuredBadge}
          </div>
          <div class="mp-card-body">
            <div class="mp-card-cat">${product.category}</div>
            <div class="mp-card-title">${product.title}</div>
            <div class="mp-card-desc">${product.description.substring(0, 80)}...</div>
            <div style="display: flex; align-items: center; gap: 8px; margin: 8px 0;">
              <span style="color: #ffc107; font-size: 14px;">★ ${product.rating}</span>
              <span style="color: #8090a0; font-size: 12px;">(${product.reviews} reviews)</span>
            </div>
            <div class="mp-card-location">📍 ${product.location} • ${product.seller}</div>
            <div style="margin: 8px 0;">${priceDisplay}</div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: auto;">
              <span style="color: ${stockColor}; font-size: 12px; font-weight: 600;">● ${product.stock}</span>
            </div>
          </div>
        </a>
      `;
    },

    renderPagination: function(totalPages) {
      let html = '<div style="display: flex; justify-content: center; gap: 8px; margin-top: 32px; flex-wrap: wrap;">';
      
      // Previous button
      html += `<button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} data-page="${this.currentPage - 1}">← Previous</button>`;
      
      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
          html += `<button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
          html += '<span style="padding: 8px 12px;">...</span>';
        }
      }
      
      // Next button
      html += `<button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} data-page="${this.currentPage + 1}">Next →</button>`;
      
      html += '</div>';
      return html;
    },

    bindEvents: function() {
      // Search input
      const searchInput = document.getElementById('product-search');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.currentFilters.search = e.target.value;
          this.currentPage = 1;
          this.applyFilters();
          this.renderGrid();
        });
      }

      // Category filter
      const categorySelect = document.getElementById('filter-category');
      if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
          this.currentFilters.category = e.target.value;
          this.currentPage = 1;
          this.applyFilters();
          this.renderGrid();
        });
      }

      // Price range
      const priceMin = document.getElementById('filter-price-min');
      const priceMax = document.getElementById('filter-price-max');
      if (priceMin && priceMax) {
        const applyPriceFilter = () => {
          this.currentFilters.priceMin = parseInt(priceMin.value) || 0;
          this.currentFilters.priceMax = parseInt(priceMax.value) || 100000000;
          this.currentPage = 1;
          this.applyFilters();
          this.renderGrid();
        };
        priceMin.addEventListener('change', applyPriceFilter);
        priceMax.addEventListener('change', applyPriceFilter);
      }

      // Location filter
      const locationSelect = document.getElementById('filter-location');
      if (locationSelect) {
        locationSelect.addEventListener('change', (e) => {
          this.currentFilters.location = e.target.value;
          this.currentPage = 1;
          this.applyFilters();
          this.renderGrid();
        });
      }

      // Rating filter
      const ratingSelect = document.getElementById('filter-rating');
      if (ratingSelect) {
        ratingSelect.addEventListener('change', (e) => {
          this.currentFilters.rating = parseFloat(e.target.value);
          this.currentPage = 1;
          this.applyFilters();
          this.renderGrid();
        });
      }

      // Sort
      const sortSelect = document.getElementById('sort-products');
      if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
          this.currentSort = e.target.value;
          this.applyFilters();
          this.renderGrid();
        });
      }

      // Pagination clicks
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('pagination-btn') && !e.target.disabled) {
          this.currentPage = parseInt(e.target.dataset.page);
          this.renderGrid();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  };

  // Add pagination styles
  const style = document.createElement('style');
  style.textContent = `
    .pagination-btn {
      padding: 8px 16px;
      border: 1.5px solid #dce4f0;
      background: #fff;
      color: #1a2540;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
    }
    .pagination-btn:hover:not(:disabled) {
      background: #0b3b46;
      color: #fff;
      border-color: #0b3b46;
    }
    .pagination-btn.active {
      background: #c9a227;
      color: #fff;
      border-color: #c9a227;
    }
    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);

})();
