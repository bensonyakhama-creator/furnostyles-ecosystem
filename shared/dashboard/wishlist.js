/**
 * Furnostyles Wishlist System
 * Unified wishlist with price drop alerts
 */

(function() {
  'use strict';

  window.FurnostylesWishlist = {
    wishlist: [],

    init: function() {
      this.loadWishlist();
      this.renderWishlist();
      this.bindEvents();
    },

    loadWishlist: function() {
      this.wishlist = JSON.parse(localStorage.getItem('fns_wishlist') || '[]');
    },

    saveWishlist: function() {
      localStorage.setItem('fns_wishlist', JSON.stringify(this.wishlist));
    },

    addToWishlist: function(product) {
      const existingItem = this.wishlist.find(item => item.id === product.id);
      
      if (existingItem) {
        this.showNotification('Product already in wishlist');
        return;
      }

      this.wishlist.push({
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        seller: product.seller,
        category: product.category,
        marketplace: product.marketplace,
        addedAt: new Date().toISOString()
      });

      this.saveWishlist();
      
      // Track wishlist for marketing
      if (window.FurnostylesUnifiedDashboard && window.FurnostylesUnifiedDashboard.marketingHooks) {
        window.FurnostylesUnifiedDashboard.marketingHooks.trackWishlist(product.id);
      }

      this.showNotification('Added to wishlist');
    },

    removeFromWishlist: function(productId) {
      this.wishlist = this.wishlist.filter(item => item.id !== productId);
      this.saveWishlist();
      this.renderWishlist();
    },

    moveToCart: function(productId) {
      const item = this.wishlist.find(item => item.id === productId);
      if (item && window.FurnostylesShoppingCart) {
        window.FurnostylesShoppingCart.addToCart(item, 1);
        this.removeFromWishlist(productId);
      }
    },

    checkPriceDrops: function() {
      // Demo price drop check - in production, this would compare with current prices
      const priceDrops = this.wishlist.filter(item => 
        item.originalPrice && item.originalPrice > item.price
      );
      return priceDrops;
    },

    renderWishlist: function() {
      const wishlistContainer = document.getElementById('wishlist-container');
      if (!wishlistContainer) return;

      if (this.wishlist.length === 0) {
        wishlistContainer.innerHTML = `
          <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 64px; margin-bottom: 20px;">❤️</div>
            <h3 style="color: var(--fns-petrol-blue); margin-bottom: 12px;">Your wishlist is empty</h3>
            <p style="color: var(--fns-text-light); margin-bottom: 24px;">Save items you love to your wishlist</p>
            <a href="marketplace.html" style="display: inline-block; padding: 12px 32px; background: var(--fns-gold-primary); color: var(--fns-petrol-blue); text-decoration: none; border-radius: 8px; font-weight: 700;">Browse Marketplace</a>
          </div>
        `;
        return;
      }

      const priceDrops = this.checkPriceDrops();

      let html = '';
      
      if (priceDrops.length > 0) {
        html += `
          <div style="background: #d4edda; border: 1.5px solid #c3e6cb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 24px;">🎉</span>
              <div>
                <div style="font-size: 16px; font-weight: 700; color: #155724;">${priceDrops.length} item(s) on sale!</div>
                <div style="font-size: 13px; color: #155724;">Prices have dropped on your wishlist items</div>
              </div>
            </div>
          </div>
        `;
      }

      html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">';
      
      this.wishlist.forEach(item => {
        const hasPriceDrop = item.originalPrice && item.originalPrice > item.price;
        
        html += `
          <div style="background: #fff; border: 1.5px solid ${hasPriceDrop ? '#28a745' : '#dce4f0'}; border-radius: 12px; overflow: hidden; position: relative;">
            ${hasPriceDrop ? '<span style="position: absolute; top: 12px; right: 12px; background: #28a745; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; z-index: 1;">Price Drop!</span>' : ''}
            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 200px; object-fit: cover;">
            <div style="padding: 16px;">
              <div style="font-size: 12px; color: #8090a0; margin-bottom: 4px;">${item.marketplace} • ${item.category}</div>
              <div style="font-size: 16px; font-weight: 700; color: #1a2540; margin-bottom: 8px;">${item.title}</div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                ${hasPriceDrop ? `<span style="text-decoration: line-through; color: #999; font-size: 13px;">KES ${item.originalPrice.toLocaleString()}</span>` : ''}
                <span style="font-size: 18px; font-weight: 700; color: #0b3b46;">KES ${item.price.toLocaleString()}</span>
              </div>
              <div style="display: flex; gap: 8px;">
                <button onclick="window.FurnostylesWishlist.moveToCart('${item.id}')" style="flex: 1; padding: 10px; background: #0b3b46; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;">Add to Cart</button>
                <button onclick="window.FurnostylesWishlist.removeFromWishlist('${item.id}')" style="padding: 10px 16px; background: #fff; color: #dc3545; border: 1.5px solid #dce4f0; border-radius: 6px; cursor: pointer; font-size: 13px;">Remove</button>
              </div>
            </div>
          </div>
        `;
      });

      html += '</div>';
      wishlistContainer.innerHTML = html;
    },

    showNotification: function(message) {
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #0b3b46;
        color: #fff;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
      `;
      notification.textContent = message;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    },

    bindEvents: function() {
      // Add event listeners for wishlist interactions
    }
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    if (window.FurnostylesWishlist) {
      window.FurnostylesWishlist.init();
    }
  });

})();
