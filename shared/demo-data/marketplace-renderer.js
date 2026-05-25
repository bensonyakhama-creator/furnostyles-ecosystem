/**
 * FURNOSTYLES — MARKETPLACE RENDERER
 * =================================
 * File: shared/demo-data/marketplace-renderer.js
 * Purpose: Reusable marketplace rendering functions for demo data
 * 
 * This file provides reusable functions to render demo data
 * across all marketplace pages without hardcoding HTML.
 */

window.FurnostylesMarketplaceRenderer = {
  /**
   * Render product cards from demo data
   * @param {Array} products - Array of product objects
   * @param {String} containerId - ID of container to render into
   * @param {Object} options - Rendering options
   */
  renderProducts: function(products, containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('Container not found:', containerId);
      return;
    }

    const {
      limit = 12,
      showFeatured = false,
      category = null,
      location = null,
      minPrice = null,
      maxPrice = null
    } = options;

    let filteredProducts = products;

    // Filter by featured
    if (showFeatured) {
      filteredProducts = filteredProducts.filter(p => p.featured);
    }

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Filter by location
    if (location) {
      filteredProducts = filteredProducts.filter(p => p.location === location);
    }

    // Filter by price range
    if (minPrice !== null) {
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    }
    if (maxPrice !== null) {
      filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }

    // Limit results
    filteredProducts = filteredProducts.slice(0, limit);

    // Clear container
    container.innerHTML = '';

    // Render product cards
    filteredProducts.forEach(product => {
      const card = this.createProductCard(product);
      container.appendChild(card);
    });

    // Show count
    const countElement = document.getElementById(containerId + '-count');
    if (countElement) {
      countElement.textContent = filteredProducts.length + ' items';
    }
  },

  /**
   * Create a product card element
   * @param {Object} product - Product object
   * @returns {HTMLElement} - Product card element
   */
  createProductCard: function(product) {
    const card = document.createElement('a');
    card.className = 'mp-card';
    card.setAttribute('data-id', product.id);
    card.href = `product-detail.html?id=${product.id}&type=demo`;

    const priceFormatted = this.formatPrice(product.price);
    const featuredBadge = product.featured ? '<span class="mp-badge mp-badge-featured">Featured</span>' : '';
    const conditionBadge = product.condition ? `<span class="mp-badge mp-badge-type">${product.condition}</span>` : '';

    card.innerHTML = `
      <div class="mp-card-img-wrap">
        <img src="${product.image}" alt="${product.title}" class="mp-card-img" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'mp-card-img-placeholder\\'>🪑</div>'">
        ${featuredBadge}
        ${conditionBadge}
      </div>
      <div class="mp-card-body">
        <h3 class="mp-card-title">${product.title}</h3>
        <p class="mp-card-cat">${product.category}</p>
        <p class="mp-card-location">${product.location}</p>
        <p class="mp-card-desc">${product.description}</p>
        <p class="mp-card-price">${priceFormatted}</p>
        <span class="mp-card-cta">View Details</span>
      </div>
    `;

    return card;
  },

  /**
   * Render service cards from demo data
   * @param {Array} services - Array of service objects
   * @param {String} containerId - ID of container to render into
   * @param {Object} options - Rendering options
   */
  renderServices: function(services, containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('Container not found:', containerId);
      return;
    }

    const {
      limit = 12,
      showFeatured = false,
      category = null,
      location = null
    } = options;

    let filteredServices = services;

    // Filter by featured
    if (showFeatured) {
      filteredServices = filteredServices.filter(s => s.featured);
    }

    // Filter by category
    if (category) {
      filteredServices = filteredServices.filter(s => s.category === category);
    }

    // Filter by location
    if (location) {
      filteredServices = filteredServices.filter(s => s.location === location);
    }

    // Limit results
    filteredServices = filteredServices.slice(0, limit);

    // Clear container
    container.innerHTML = '';

    // Render service cards
    filteredServices.forEach(service => {
      const card = this.createServiceCard(service);
      container.appendChild(card);
    });

    // Show count
    const countElement = document.getElementById(containerId + '-count');
    if (countElement) {
      countElement.textContent = filteredServices.length + ' services';
    }
  },

  /**
   * Create a service card element
   * @param {Object} service - Service object
   * @returns {HTMLElement} - Service card element
   */
  createServiceCard: function(service) {
    const card = document.createElement('a');
    card.className = 'mp-card';
    card.setAttribute('data-id', service.id);
    card.href = `repair-detail.html?id=${service.id}&type=demo`;

    const featuredBadge = service.featured ? '<span class="mp-badge mp-badge-featured">Featured</span>' : '';
    const ratingStars = this.renderRatingStars(service.rating);

    card.innerHTML = `
      <div class="mp-card-img-wrap">
        <img src="${service.image}" alt="${service.title}" class="mp-card-img" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'mp-card-img-placeholder\\'>🔧</div>'">
        ${featuredBadge}
      </div>
      <div class="mp-card-body">
        <h3 class="mp-card-title">${service.title}</h3>
        <p class="mp-card-cat">${service.category}</p>
        <p class="mp-card-location">${service.location}</p>
        <p class="mp-card-desc">${service.description}</p>
        <p class="mp-card-price">${ratingStars} (${service.rating})</p>
        <span class="mp-card-cta">Book Service</span>
      </div>
    `;

    return card;
  },

  /**
   * Render property cards from demo data
   * @param {Array} properties - Array of property objects
   * @param {String} containerId - ID of container to render into
   * @param {Object} options - Rendering options
   */
  renderProperties: function(properties, containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('Container not found:', containerId);
      return;
    }

    const {
      limit = 12,
      showFeatured = false,
      category = null,
      location = null,
      minPrice = null,
      maxPrice = null
    } = options;

    let filteredProperties = properties;

    // Filter by featured
    if (showFeatured) {
      filteredProperties = filteredProperties.filter(p => p.featured);
    }

    // Filter by category
    if (category) {
      filteredProperties = filteredProperties.filter(p => p.category === category);
    }

    // Filter by location
    if (location) {
      filteredProperties = filteredProperties.filter(p => p.location.includes(location));
    }

    // Filter by price range
    if (minPrice !== null) {
      filteredProperties = filteredProperties.filter(p => p.price >= minPrice);
    }
    if (maxPrice !== null) {
      filteredProperties = filteredProperties.filter(p => p.price <= maxPrice);
    }

    // Limit results
    filteredProperties = filteredProperties.slice(0, limit);

    // Clear container
    container.innerHTML = '';

    // Render property cards
    filteredProperties.forEach(property => {
      const card = this.createPropertyCard(property);
      container.appendChild(card);
    });

    // Show count
    const countElement = document.getElementById(containerId + '-count');
    if (countElement) {
      countElement.textContent = filteredProperties.length + ' properties';
    }
  },

  /**
   * Create a property card element
   * @param {Object} property - Property object
   * @returns {HTMLElement} - Property card element
   */
  createPropertyCard: function(property) {
    const card = document.createElement('a');
    card.className = 'mp-card';
    card.setAttribute('data-id', property.id);
    card.href = `property-detail.html?id=${property.id}&type=demo`;

    const priceFormatted = this.formatPrice(property.price);
    const featuredBadge = property.featured ? '<span class="mp-badge mp-badge-featured">Featured</span>' : '';
    const specs = [];
    if (property.bedrooms > 0) specs.push(`🛏 ${property.bedrooms} Bed`);
    if (property.bathrooms > 0) specs.push(`🚿 ${property.bathrooms} Bath`);
    const specsInfo = specs.length > 0 ? `<p class="mp-card-location">${specs.join(' • ')}</p>` : '';

    card.innerHTML = `
      <div class="mp-card-img-wrap">
        <img src="${property.image}" alt="${property.title}" class="mp-card-img" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'mp-card-img-placeholder\\'>🏠</div>'">
        ${featuredBadge}
      </div>
      <div class="mp-card-body">
        <h3 class="mp-card-title">${property.title}</h3>
        <p class="mp-card-cat">${property.category}</p>
        <p class="mp-card-location">${property.location}</p>
        ${specsInfo}
        <p class="mp-card-desc">${property.description}</p>
        <p class="mp-card-price">${priceFormatted} <small>(${property.priceType})</small></p>
        <span class="mp-card-cta">View Property</span>
      </div>
    `;

    return card;
  },

  /**
   * Render vendor cards from demo data
   * @param {Array} vendors - Array of vendor objects
   * @param {String} containerId - ID of container to render into
   * @param {Object} options - Rendering options
   */
  renderVendors: function(vendors, containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('Container not found:', containerId);
      return;
    }

    const {
      limit = 12,
      type = null,
      location = null,
      minRating = null
    } = options;

    let filteredVendors = vendors;

    // Filter by type
    if (type) {
      filteredVendors = filteredVendors.filter(v => v.type === type);
    }

    // Filter by location
    if (location) {
      filteredVendors = filteredVendors.filter(v => v.location === location);
    }

    // Filter by rating
    if (minRating !== null) {
      filteredVendors = filteredVendors.filter(v => v.rating >= minRating);
    }

    // Limit results
    filteredVendors = filteredVendors.slice(0, limit);

    // Clear container
    container.innerHTML = '';

    // Render vendor cards
    filteredVendors.forEach(vendor => {
      const card = this.createVendorCard(vendor);
      container.appendChild(card);
    });

    // Show count
    const countElement = document.getElementById(containerId + '-count');
    if (countElement) {
      countElement.textContent = filteredVendors.length + ' vendors';
    }
  },

  /**
   * Create a vendor card element
   * @param {Object} vendor - Vendor object
   * @returns {HTMLElement} - Vendor card element
   */
  createVendorCard: function(vendor) {
    const card = document.createElement('div');
    card.className = 'fns-vendor-card';
    card.setAttribute('data-id', vendor.id);

    const verifiedBadge = vendor.verified ? '<span class="fns-badge fns-badge-verified">✓ Verified</span>' : '';
    const ratingStars = this.renderRatingStars(vendor.rating);

    card.innerHTML = `
      <div class="fns-vendor-header">
        <img src="${vendor.logo}" alt="${vendor.name}" class="fns-vendor-logo">
        <div class="fns-vendor-info">
          <h3 class="fns-vendor-name">${vendor.name}</h3>
          <p class="fns-vendor-type">${vendor.type}</p>
          <p class="fns-vendor-location">${vendor.location}</p>
        </div>
        ${verifiedBadge}
      </div>
      <div class="fns-vendor-meta">
        <span class="fns-vendor-rating">${ratingStars} (${vendor.rating})</span>
        <span class="fns-vendor-products">${vendor.products} products</span>
      </div>
      <p class="fns-vendor-description">${vendor.description}</p>
      <div class="fns-vendor-footer">
        <span class="fns-vendor-contact">${vendor.contact}</span>
        <button class="fns-btn fns-btn-primary fns-btn-sm">View Store</button>
      </div>
    `;

    return card;
  },

  /**
   * Format price in KSh
   * @param {Number} price - Price value
   * @returns {String} - Formatted price string
   */
  formatPrice: function(price) {
    return 'KSh ' + price.toLocaleString();
  },

  /**
   * Render rating stars
   * @param {Number} rating - Rating value (0-5)
   * @returns {String} - HTML string of stars
   */
  renderRatingStars: function(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (hasHalfStar) {
      stars += '½';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars += '☆';
    }

    return stars;
  },

  /**
   * Render loading state
   * @param {HTMLElement} container - Container element
   */
  renderLoadingGrid: function(container) {
    if (!container) return;
    container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--fns-text-muted);">Loading listings...</div>';
  },

  /**
   * Render grid with items (for backward compatibility)
   * @param {HTMLElement} container - Container element
   * @param {Array} items - Array of items to render
   */
  renderGrid: function(container, items) {
    if (!container || !items) return;
    container.innerHTML = '';
    
    // Add grid class if not present
    if (!container.classList.contains('mp-grid')) {
      container.classList.add('mp-grid');
    }
    
    items.forEach(item => {
      let card;
      if (item.type === 'property' || item.bedrooms) {
        card = this.createPropertyCard(item);
      } else if (item.type === 'service' || item.responseTime) {
        card = this.createServiceCard(item);
      } else {
        card = this.createProductCard(item);
      }
      container.appendChild(card);
    });
    
    // Update count display
    const countEl = document.getElementById('mpCountEl');
    if (countEl) {
      countEl.textContent = items.length + ' items';
    }
  },

  /**
   * Render featured items section
   * @param {String} marketplaceType - Type of marketplace
   * @param {String} containerId - Container ID
   */
  renderFeaturedSection: function(marketplaceType, containerId = 'mpFeaturedGrid') {
    let data;
    switch (marketplaceType) {
      case 'furniture':
        data = window.FurnostylesFurnitureDemo?.products;
        break;
      case 'materials':
      case 'material':
        data = window.FurnostylesMaterialsDemo?.products;
        break;
      case 'secondhand':
        data = window.FurnostylesSecondhandDemo?.products;
        break;
      case 'property':
        data = window.FurnostylesPropertyDemo?.properties;
        break;
      case 'sourcing':
        data = window.FurnostylesSourcingDemo?.products;
        break;
      case 'services':
        data = window.FurnostylesServicesDemo?.services;
        break;
      default:
        return;
    }

    if (!data) return;

    const featured = data.filter(item => item.featured).slice(0, 8);
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    container.classList.add('mp-grid');

    featured.forEach(item => {
      let card;
      if (marketplaceType === 'property') {
        card = this.createPropertyCard(item);
      } else if (marketplaceType === 'services') {
        card = this.createServiceCard(item);
      } else {
        card = this.createProductCard(item);
      }
      container.appendChild(card);
    });
  },

  /**
   * Render newest items section
   * @param {String} marketplaceType - Type of marketplace
   * @param {String} containerId - Container ID
   */
  renderNewestSection: function(marketplaceType, containerId = 'mpNewestGrid') {
    let data;
    switch (marketplaceType) {
      case 'furniture':
        data = window.FurnostylesFurnitureDemo?.products;
        break;
      case 'materials':
      case 'material':
        data = window.FurnostylesMaterialsDemo?.products;
        break;
      case 'secondhand':
        data = window.FurnostylesSecondhandDemo?.products;
        break;
      case 'property':
        data = window.FurnostylesPropertyDemo?.properties;
        break;
      case 'sourcing':
        data = window.FurnostylesSourcingDemo?.products;
        break;
      case 'services':
        data = window.FurnostylesServicesDemo?.services;
        break;
      default:
        return;
    }

    if (!data) return;

    const newest = data.slice(0, 8);
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    container.classList.add('mp-grid');

    newest.forEach(item => {
      let card;
      if (marketplaceType === 'property') {
        card = this.createPropertyCard(item);
      } else if (marketplaceType === 'services') {
        card = this.createServiceCard(item);
      } else {
        card = this.createProductCard(item);
      }
      container.appendChild(card);
    });
  },

  /**
   * Render recommended items section
   * @param {String} marketplaceType - Type of marketplace
   * @param {String} containerId - Container ID
   */
  renderRecommendedSection: function(marketplaceType, containerId = 'mpRecommendedGrid') {
    let data;
    switch (marketplaceType) {
      case 'furniture':
        data = window.FurnostylesFurnitureDemo?.products;
        break;
      case 'materials':
      case 'material':
        data = window.FurnostylesMaterialsDemo?.products;
        break;
      case 'secondhand':
        data = window.FurnostylesSecondhandDemo?.products;
        break;
      case 'property':
        data = window.FurnostylesPropertyDemo?.properties;
        break;
      case 'sourcing':
        data = window.FurnostylesSourcingDemo?.products;
        break;
      case 'services':
        data = window.FurnostylesServicesDemo?.services;
        break;
      default:
        return;
    }

    if (!data) return;

    // Random selection for recommendations
    const recommended = data.sort(() => Math.random() - 0.5).slice(0, 8);
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    container.classList.add('mp-grid');

    recommended.forEach(item => {
      let card;
      if (marketplaceType === 'property') {
        card = this.createPropertyCard(item);
      } else if (marketplaceType === 'services') {
        card = this.createServiceCard(item);
      } else {
        card = this.createProductCard(item);
      }
      container.appendChild(card);
    });
  },

  /**
   * Render related services section
   * @param {String} containerId - Container ID
   */
  renderRelatedServices: function(containerId = 'mpRelatedServicesGrid') {
    const data = window.FurnostylesServicesDemo?.services;
    if (!data) return;

    const services = data.slice(0, 6);
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    container.classList.add('mp-grid');

    services.forEach(service => {
      const card = this.createServiceCard(service);
      container.appendChild(card);
    });
  },

  /**
   * Render category tabs
   * @param {String} marketplaceType - Type of marketplace
   * @param {String} containerId - Container ID
   */
  renderCategoryTabs: function(marketplaceType, containerId = 'mpCategoryTabs') {
    let categories = [];
    switch (marketplaceType) {
      case 'furniture':
        categories = ['Living Room', 'Bedroom', 'Dining', 'Office', 'Outdoor', 'Kids'];
        break;
      case 'materials':
      case 'material':
        categories = ['Tiles', 'Paint', 'Plumbing', 'Electrical', 'Hardware', 'Boards'];
        break;
      case 'secondhand':
        categories = ['Furniture', 'Appliances', 'Decor', 'Clearance', 'Renovation Leftovers'];
        break;
      case 'property':
        categories = ['Rentals', 'For Sale', 'Airbnb Setup', 'Staging', 'Commercial'];
        break;
      case 'sourcing':
        categories = ['Furniture', 'Materials', 'Decor', 'Custom Orders', 'Bulk Import'];
        break;
      case 'services':
        categories = ['Interior Design', 'Repairs', 'Carpentry', 'Plumbing', 'Electrical', 'Renovation'];
        break;
      default:
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    container.className = 'mp-category-tabs';

    categories.forEach((cat, index) => {
      const tab = document.createElement('button');
      tab.className = 'mp-category-tab' + (index === 0 ? ' active' : '');
      tab.textContent = cat;
      tab.onclick = function() {
        document.querySelectorAll('.mp-category-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      };
      container.appendChild(tab);
    });
  },

  /**
   * Initialize marketplace with demo data
   * @param {String} marketplaceType - Type of marketplace (furniture, materials, etc.)
   * @param {String} containerId - Optional container ID (defaults to mpMainGrid)
   */
  initializeMarketplace: function(marketplaceType, containerId = 'mpMainGrid') {
    // Load demo data based on marketplace type
    let data;

    switch (marketplaceType) {
      case 'furniture':
        data = window.FurnostylesFurnitureDemo?.products;
        break;
      case 'materials':
      case 'material':
        data = window.FurnostylesMaterialsDemo?.products;
        break;
      case 'secondhand':
        data = window.FurnostylesSecondhandDemo?.products;
        break;
      case 'property':
        data = window.FurnostylesPropertyDemo?.properties;
        break;
      case 'sourcing':
        data = window.FurnostylesSourcingDemo?.products;
        break;
      case 'services':
        data = window.FurnostylesServicesDemo?.services;
        break;
      default:
        console.error('Unknown marketplace type:', marketplaceType);
        return;
    }

    if (!data) {
      console.error('Demo data not found for:', marketplaceType);
      return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
      console.error('Container not found:', containerId);
      return;
    }

    // Render based on data type
    if (marketplaceType === 'property') {
      this.renderProperties(data, containerId, { limit: 24 });
    } else if (marketplaceType === 'services') {
      this.renderServices(data, containerId, { limit: 24 });
    } else {
      this.renderProducts(data, containerId, { limit: 24 });
    }

    // Render additional sections
    this.renderCategoryTabs(marketplaceType);
    this.renderFeaturedSection(marketplaceType);
    this.renderNewestSection(marketplaceType);
    this.renderRecommendedSection(marketplaceType);
    
    // Render related services for non-service marketplaces
    if (marketplaceType !== 'services') {
      this.renderRelatedServices();
    }
  }
};

/**
 * Mock Public Filter for demo data compatibility
 * This provides a mock implementation of FurnostylesPublicFilter
 * to work with the existing inline scripts
 */
window.FurnostylesPublicFilter = {
  getApprovedByType: function(type) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data;
        switch(type) {
          case 'furniture':
            data = window.FurnostylesFurnitureDemo?.products || [];
            break;
          case 'material':
          case 'materials':
            data = window.FurnostylesMaterialsDemo?.products || [];
            break;
          case 'secondhand':
            data = window.FurnostylesSecondhandDemo?.products || [];
            break;
          case 'sourcing':
            data = window.FurnostylesSourcingDemo?.products || [];
            break;
          default:
            data = [];
        }
        resolve(data.slice(0, 24));
      }, 100);
    });
  },
  
  getApprovedProperties: function() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = window.FurnostylesPropertyDemo?.properties || [];
        resolve(data.slice(0, 24));
      }, 100);
    });
  },
  
  getApprovedRepairs: function() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = window.FurnostylesServicesDemo?.services || [];
        resolve(data.slice(0, 24));
      }, 100);
    });
  },
  
  getApprovedListings: function() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const furniture = window.FurnostylesFurnitureDemo?.products || [];
        const materials = window.FurnostylesMaterialsDemo?.products || [];
        const secondhand = window.FurnostylesSecondhandDemo?.products || [];
        const all = [...furniture, ...materials, ...secondhand];
        resolve(all.slice(0, 24));
      }, 100);
    });
  },
  
  sortItems: function(items, sortKey) {
    const sorted = [...items];
    switch(sortKey) {
      case 'price_low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        // Keep original order (simulating newest first)
        break;
    }
    return sorted;
  }
};

/**
 * Mock Repair Renderer for services marketplace
 */
window.FurnostylesRepairRenderer = {
  renderLoadingGrid: function(container) {
    if (!container) return;
    container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--fns-text-muted);">Loading services...</div>';
  },
  
  renderGrid: function(container, items) {
    if (!container || !items) return;
    container.innerHTML = '';
    
    items.forEach(item => {
      const card = window.FurnostylesMarketplaceRenderer.createServiceCard(item);
      container.appendChild(card);
    });
  }
};

/**
 * Mock Property Renderer for real estate marketplace
 */
window.FurnostylesPropertyRenderer = {
  renderLoadingGrid: function(container) {
    if (!container) return;
    container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--fns-text-muted);">Loading properties...</div>';
  },
  
  renderGrid: function(container, items) {
    if (!container || !items) return;
    container.innerHTML = '';
    
    items.forEach(item => {
      const card = window.FurnostylesMarketplaceRenderer.createPropertyCard(item);
      container.appendChild(card);
    });
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // Check for marketplace type in data attribute
    const marketplaceContainer = document.querySelector('[data-marketplace-type]');
    if (marketplaceContainer) {
      const marketplaceType = marketplaceContainer.getAttribute('data-marketplace-type');
      window.FurnostylesMarketplaceRenderer.initializeMarketplace(marketplaceType);
    }
  });
} else {
  // DOM already loaded
  const marketplaceContainer = document.querySelector('[data-marketplace-type]');
  if (marketplaceContainer) {
    const marketplaceType = marketplaceContainer.getAttribute('data-marketplace-type');
    window.FurnostylesMarketplaceRenderer.initializeMarketplace(marketplaceType);
  }
}
