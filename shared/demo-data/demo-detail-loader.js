/**
 * FURNOSTYLES — DEMO DETAIL LOADER
 * =================================
 * File: shared/demo-data/demo-detail-loader.js
 * Purpose: Load and display demo data on detail pages
 * 
 * This script handles loading demo data from URL parameters
 * and populating detail pages when no Firebase data exists.
 */

window.FurnostylesDemoDetailLoader = {
  /**
   * Get URL parameter
   * @param {String} name - Parameter name
   * @returns {String|null} - Parameter value
   */
  getUrlParam: function(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  },

  /**
   * Load demo product data
   * @returns {Object|null} - Product data or null
   */
  loadDemoProduct: function() {
    const id = this.getUrlParam('id');
    const type = this.getUrlParam('type');
    
    if (type !== 'demo' || !id) return null;
    
    // Search in all product demo data
    const allProducts = [
      ...(window.FurnostylesFurnitureDemo?.products || []),
      ...(window.FurnostylesMaterialsDemo?.products || []),
      ...(window.FurnostylesSecondhandDemo?.products || []),
      ...(window.FurnostylesSourcingDemo?.products || [])
    ];
    
    return allProducts.find(p => p.id === id) || null;
  },

  /**
   * Load demo property data
   * @returns {Object|null} - Property data or null
   */
  loadDemoProperty: function() {
    const id = this.getUrlParam('id');
    const type = this.getUrlParam('type');
    
    if (type !== 'demo' || !id) return null;
    
    const properties = window.FurnostylesPropertyDemo?.properties || [];
    return properties.find(p => p.id === id) || null;
  },

  /**
   * Load demo service data
   * @returns {Object|null} - Service data or null
   */
  loadDemoService: function() {
    const id = this.getUrlParam('id');
    const type = this.getUrlParam('type');
    
    if (type !== 'demo' || !id) return null;
    
    const services = window.FurnostylesServicesDemo?.services || [];
    return services.find(s => s.id === id) || null;
  },

  /**
   * Populate product detail page
   * @param {Object} product - Product data
   */
  populateProductDetail: function(product) {
    if (!product) return;

    // Update title
    document.title = `${product.title} | Furnostyles`;
    
    // Update breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb-nav');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <a href="index.html" style="color: var(--fns-text-light); text-decoration: none; font-size: 14px;">Home</a>
        <span style="color: var(--fns-gold-primary); margin: 0 8px;">›</span>
        <a href="furniture-marketplace.html" style="color: var(--fns-text-light); text-decoration: none; font-size: 14px;">Marketplace</a>
        <span style="color: var(--fns-gold-primary); margin: 0 8px;">›</span>
        <a href="#" style="color: var(--fns-text-light); text-decoration: none; font-size: 14px;">${product.category}</a>
        <span style="color: var(--fns-gold-primary); margin: 0 8px;">›</span>
        <span style="color: var(--fns-white); font-size: 14px; font-weight: 600;">${product.title}</span>
      `;
    }

    // Update main image
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
      mainImage.src = product.image;
      mainImage.alt = product.title;
    }

    // Update thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail-grid img');
    thumbnails.forEach((thumb, index) => {
      thumb.src = product.image;
      thumb.alt = `${product.title} - View ${index + 1}`;
    });

    // Update product info
    const categoryBadge = document.querySelector('.category-badge');
    if (categoryBadge) {
      categoryBadge.textContent = product.category.toUpperCase();
    }

    const title = document.querySelector('.product-title');
    if (title) title.textContent = product.title;

    const price = document.querySelector('.price');
    if (price) {
      price.textContent = 'KSh ' + product.price.toLocaleString();
    }

    const location = document.querySelector('.location');
    if (location) {
      location.innerHTML = `<span style="width: 10px; height: 10px; background: #22c55e; border-radius: 50%;"></span> ${product.location}`;
    }

    const description = document.querySelector('.description');
    if (description) description.textContent = product.description;
  },

  /**
   * Populate property detail page
   * @param {Object} property - Property data
   */
  populatePropertyDetail: function(property) {
    if (!property) return;

    // Update title
    document.title = `${property.title} | Furnostyles`;
    
    // Update breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb-nav');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <a href="index.html" style="color: var(--fns-text-light); text-decoration: none; font-size: 14px;">Home</a>
        <span style="color: var(--fns-gold-primary); margin: 0 8px;">›</span>
        <a href="realestate-marketplace.html" style="color: var(--fns-text-light); text-decoration: none; font-size: 14px;">Real Estate</a>
        <span style="color: var(--fns-gold-primary); margin: 0 8px;">›</span>
        <a href="#" style="color: var(--fns-text-light); text-decoration: none; font-size: 14px;">${property.category}</a>
        <span style="color: var(--fns-gold-primary); margin: 0 8px;">›</span>
        <span style="color: var(--fns-white); font-size: 14px; font-weight: 600;">${property.title}</span>
      `;
    }

    // Update main image
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
      mainImage.src = property.image;
      mainImage.alt = property.title;
    }

    // Update property info
    const categoryBadge = document.querySelector('.category-badge');
    if (categoryBadge) {
      categoryBadge.textContent = property.category.toUpperCase();
    }

    const title = document.querySelector('.property-title');
    if (title) title.textContent = property.title;

    const price = document.querySelector('.price');
    if (price) {
      price.textContent = 'KSh ' + property.price.toLocaleString() + ' (' + property.priceType + ')';
    }

    const location = document.querySelector('.location');
    if (location) {
      location.innerHTML = `<span style="width: 10px; height: 10px; background: #22c55e; border-radius: 50%;"></span> ${property.location}`;
    }

    const description = document.querySelector('.description');
    if (description) description.textContent = property.description;

    // Update specs
    const specsContainer = document.querySelector('.property-specs');
    if (specsContainer) {
      let specsHtml = '';
      if (property.bedrooms > 0) specsHtml += `<span>🛏 ${property.bedrooms} Bedrooms</span>`;
      if (property.bathrooms > 0) specsHtml += `<span>🚿 ${property.bathrooms} Bathrooms</span>`;
      specsContainer.innerHTML = specsHtml;
    }
  },

  /**
   * Populate service detail page
   * @param {Object} service - Service data
   */
  populateServiceDetail: function(service) {
    if (!service) return;

    // Update title
    document.title = `${service.title} | Furnostyles`;
    
    // Update breadcrumb
    const breadcrumb = document.querySelector('.dtl-breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <a href="index.html">Home</a> &rsaquo;
        <a href="services-marketplace.html">Services</a> &rsaquo;
        <span>${service.title}</span>
      `;
    }

    // Update detail container
    const detailContainer = document.getElementById('dtlDetail');
    if (detailContainer) {
      detailContainer.innerHTML = `
        <div class="dtl-hero">
          <div class="dtl-gallery">
            <img src="${service.image}" alt="${service.title}" class="dtl-main-img">
          </div>
          <div class="dtl-info">
            <span class="dtl-badge">${service.category}</span>
            <h1>${service.title}</h1>
            <p class="dtl-location">${service.location}</p>
            <p class="dtl-rating">⭐ ${service.rating} (${service.rating}/5)</p>
            <p class="dtl-response">⏱ Response: ${service.responseTime}</p>
            <p class="dtl-description">${service.description}</p>
            <div class="dtl-cta">
              <a href="https://wa.me/254713639205" class="btn primary" target="_blank">WhatsApp</a>
              <a href="contact.html" class="btn secondary">Request Quote</a>
            </div>
          </div>
        </div>
      `;
    }
  },

  /**
   * Initialize detail page
   * @param {String} pageType - 'product', 'property', or 'service'
   */
  initialize: function(pageType) {
    let data;
    
    switch (pageType) {
      case 'product':
        data = this.loadDemoProduct();
        if (data) this.populateProductDetail(data);
        break;
      case 'property':
        data = this.loadDemoProperty();
        if (data) this.populatePropertyDetail(data);
        break;
      case 'service':
        data = this.loadDemoService();
        if (data) this.populateServiceDetail(data);
        break;
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // Determine page type from URL
    const path = window.location.pathname;
    if (path.includes('product-detail')) {
      window.FurnostylesDemoDetailLoader.initialize('product');
    } else if (path.includes('property-detail')) {
      window.FurnostylesDemoDetailLoader.initialize('property');
    } else if (path.includes('repair-detail')) {
      window.FurnostylesDemoDetailLoader.initialize('service');
    }
  });
} else {
  // DOM already loaded
  const path = window.location.pathname;
  if (path.includes('product-detail')) {
    window.FurnostylesDemoDetailLoader.initialize('product');
  } else if (path.includes('property-detail')) {
    window.FurnostylesDemoDetailLoader.initialize('property');
  } else if (path.includes('repair-detail')) {
    window.FurnostylesDemoDetailLoader.initialize('service');
  }
}
