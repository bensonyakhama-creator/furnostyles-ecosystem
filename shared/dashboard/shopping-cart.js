/**
 * Furnostyles Shopping Cart System
 * Unified cart with cross-marketplace support
 */

(function() {
  'use strict';

  window.FurnostylesShoppingCart = {
    cart: [],
    cartTotal: 0,

    init: function() {
      this.loadCart();
      this.renderCart();
      this.bindEvents();
    },

    loadCart: function() {
      // Try both keys for compatibility
      const fnsCart = localStorage.getItem('fns_shopping_cart');
      const furnostylesCart = localStorage.getItem('furnostyles_cart');
      
      if (furnostylesCart && !fnsCart) {
        // Migrate from old key to new key
        this.cart = JSON.parse(furnostylesCart);
        localStorage.setItem('fns_shopping_cart', furnostylesCart);
      } else {
        this.cart = JSON.parse(fnsCart || '[]');
      }
      this.calculateTotal();
    },

    saveCart: function() {
      // Save to both keys for compatibility
      const cartData = JSON.stringify(this.cart);
      localStorage.setItem('fns_shopping_cart', cartData);
      localStorage.setItem('furnostyles_cart', cartData);
      this.calculateTotal();
    },

    calculateTotal: function() {
      this.cartTotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    addToCart: function(product, quantity = 1) {
      const existingItem = this.cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          seller: product.seller,
          category: product.category,
          quantity: quantity,
          marketplace: product.marketplace
        });
      }

      this.saveCart();
      
      // Track add to cart for marketing
      if (window.FurnostylesUnifiedDashboard && window.FurnostylesUnifiedDashboard.marketingHooks) {
        window.FurnostylesUnifiedDashboard.marketingHooks.trackAddToCart(product.id, quantity);
      }

      this.showNotification('Product added to cart');
    },

    removeFromCart: function(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      this.saveCart();
      this.renderCart();
    },

    updateQuantity: function(productId, quantity) {
      const item = this.cart.find(item => item.id === productId);
      if (item) {
        item.quantity = Math.max(1, quantity);
        this.saveCart();
        this.renderCart();
      }
    },

    clearCart: function() {
      this.cart = [];
      this.saveCart();
      this.renderCart();
    },

    renderCart: function() {
      const cartContainer = document.getElementById('cart-container');
      if (!cartContainer) return;

      if (this.cart.length === 0) {
        cartContainer.innerHTML = `
          <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 64px; margin-bottom: 20px;">🛒</div>
            <h3 style="color: var(--fns-petrol-blue); margin-bottom: 12px;">Your cart is empty</h3>
            <p style="color: var(--fns-text-light); margin-bottom: 24px;">Start shopping to add items to your cart</p>
            <a href="marketplace.html" style="display: inline-block; padding: 12px 32px; background: var(--fns-gold-primary); color: var(--fns-petrol-blue); text-decoration: none; border-radius: 8px; font-weight: 700;">Browse Marketplace</a>
          </div>
        `;
        return;
      }

      let html = '<div style="display: grid; grid-template-columns: 1fr 350px; gap: 24px;">';
      
      // Cart items
      html += '<div style="display: flex; flex-direction: column; gap: 16px;">';
      this.cart.forEach(item => {
        html += `
          <div style="display: flex; gap: 16px; padding: 16px; background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px;">
            <img src="${item.image}" alt="${item.title}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-size: 14px; color: #8090a0; margin-bottom: 4px;">${item.marketplace} • ${item.category}</div>
                <div style="font-size: 16px; font-weight: 700; color: #1a2540; margin-bottom: 4px;">${item.title}</div>
                <div style="font-size: 13px; color: #8090a0;">Sold by: ${item.seller}</div>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <button onclick="window.FurnostylesShoppingCart.updateQuantity('${item.id}', ${item.quantity - 1})" style="width: 32px; height: 32px; border: 1.5px solid #dce4f0; background: #fff; border-radius: 6px; cursor: pointer; font-size: 18px;">-</button>
                  <span style="font-size: 16px; font-weight: 700; color: #1a2540; min-width: 32px; text-align: center;">${item.quantity}</span>
                  <button onclick="window.FurnostylesShoppingCart.updateQuantity('${item.id}', ${item.quantity + 1})" style="width: 32px; height: 32px; border: 1.5px solid #dce4f0; background: #fff; border-radius: 6px; cursor: pointer; font-size: 18px;">+</button>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 18px; font-weight: 700; color: #0b3b46;">KES ${(item.price * item.quantity).toLocaleString()}</div>
                  <button onclick="window.FurnostylesShoppingCart.removeFromCart('${item.id}')" style="font-size: 12px; color: #dc3545; background: none; border: none; cursor: pointer; text-decoration: underline;">Remove</button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      html += '</div>';

      // Order summary
      html += `
        <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 24px; height: fit-content; position: sticky; top: 80px;">
          <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 700; color: #1a2540;">Order Summary</h3>
          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; font-size: 14px; color: #8090a0;">
              <span>Subtotal (${this.cart.length} items)</span>
              <span style="color: #1a2540; font-weight: 600;">KES ${this.cartTotal.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 14px; color: #8090a0;">
              <span>Shipping</span>
              <span style="color: #1a2540; font-weight: 600;">Calculated at checkout</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 14px; color: #8090a0;">
              <span>Tax</span>
              <span style="color: #1a2540; font-weight: 600;">KES ${(this.cartTotal * 0.16).toLocaleString()}</span>
            </div>
          </div>
          <div style="padding: 16px 0; border-top: 1.5px solid #dce4f0; border-bottom: 1.5px solid #dce4f0; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; color: #1a2540;">
              <span>Total</span>
              <span>KES ${(this.cartTotal * 1.16).toLocaleString()}</span>
            </div>
          </div>
          <button onclick="window.FurnostylesShoppingCart.checkout()" style="width: 100%; padding: 16px; background: #0b3b46; color: #fff; border: none; border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer; margin-bottom: 12px;">Proceed to Checkout</button>
          <button onclick="window.FurnostylesShoppingCart.clearCart()" style="width: 100%; padding: 12px; background: #fff; color: #dc3545; border: 1.5px solid #dce4f0; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">Clear Cart</button>
        </div>
      `;

      html += '</div>';
      cartContainer.innerHTML = html;
    },

    checkout: function() {
      // Track checkout initiation for marketing
      if (window.FurnostylesUnifiedDashboard && window.FurnostylesUnifiedDashboard.marketingHooks) {
        const checkoutData = {
          userId: window.FurnostylesUnifiedDashboard.currentUser?.uid,
          cartValue: this.cartTotal,
          itemCount: this.cart.length,
          items: this.cart.map(item => ({ id: item.id, quantity: item.quantity })),
          timestamp: new Date().toISOString()
        };
        window.FurnostylesUnifiedDashboard.marketingHooks.saveMarketingEvent('checkout_initiated', checkoutData);
      }

      window.location.href = 'checkout.html';
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
      // Add event listeners for cart interactions
    }
  };

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    if (window.FurnostylesShoppingCart) {
      window.FurnostylesShoppingCart.init();
    }
  });

})();
