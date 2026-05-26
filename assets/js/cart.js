/**
 * FURNOSTYLES — CART.JS
 * =====================
 * File: assets/js/cart.js
 * Purpose: Unified cart system for all marketplaces
 *          Cart item schema: { id, title, price, quantity, type, image, category, marketplace }
 *          Types: product | service | sourcing | secondhand | realestate | materials
 *          Handles: add, remove, update qty, clear, get total, render cart page
 *          Updates all cart badges on change
 *
 * No external libraries. Vanilla JS only.
 */

(function() {
  'use strict';

  // Cart storage key - unified across the site
  const CART_KEY = 'furnostyles_cart';

  // Cart state
  let cart = [];

  // Initialize cart from localStorage
  function init() {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) {
        cart = JSON.parse(savedCart);
      }
    } catch (e) {
      console.error('Failed to load cart:', e);
      cart = [];
    }
    updateCartBadges();
  }

  // Save cart to localStorage
  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      updateCartBadges();
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }

  // Update all cart badges in the UI
  function updateCartBadges() {
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    // Update floating cart badge
    const cartBadge = document.querySelector('[data-cart-count]');
    if (cartBadge) {
      cartBadge.textContent = totalCount;
      cartBadge.style.display = totalCount > 0 ? 'inline' : 'none';
    }

    // Update header cart icon badge
    const headerCartBtn = document.getElementById('fldCartBtn');
    if (headerCartBtn) {
      let badge = headerCartBtn.querySelector('.cart-badge');
      if (totalCount > 0) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'cart-badge';
          headerCartBtn.appendChild(badge);
        }
        badge.textContent = totalCount;
        badge.style.display = 'block';
      } else if (badge) {
        badge.style.display = 'none';
      }
    }

    // Update any data-fns-cart-count elements
    document.querySelectorAll('[data-fns-cart-count]').forEach(el => {
      el.textContent = totalCount;
    });
  }

  // Add item to cart
  function addToCart(product, quantity = 1) {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return false;
    }

    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.title || product.name,
        price: parseFloat(product.price) || 0,
        quantity: quantity,
        type: product.type || 'product',
        image: product.image || product.images?.[0] || 'assets/images/default-product.jpg',
        category: product.category || '',
        marketplace: product.marketplace || 'furniture',
        addedAt: new Date().toISOString()
      });
    }

    saveCart();
    return true;
  }

  // Remove item from cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
  }

  // Update item quantity
  function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
        saveCart();
      }
    }
  }

  // Clear entire cart
  function clearCart() {
    cart = [];
    saveCart();
  }

  // Get cart total
  function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Get cart item count
  function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Get all cart items
  function getCartItems() {
    return [...cart];
  }

  // Render cart on cart page
  function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartEmpty = document.getElementById('cart-empty');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    if (!cartContainer) return;

    if (cart.length === 0) {
      if (cartEmpty) cartEmpty.style.display = 'block';
      if (cartItems) cartItems.style.display = 'none';
      return;
    }

    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartItems) cartItems.style.display = 'block';

    if (cartItems) {
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-details">
            <h3 class="cart-item-title">${item.title}</h3>
            <p class="cart-item-meta">${item.category} • ${item.marketplace}</p>
            <p class="cart-item-price">KES ${item.price.toLocaleString()}</p>
          </div>
          <div class="cart-item-quantity">
            <button class="qty-btn minus" onclick="FurnostylesCart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn plus" onclick="FurnostylesCart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
          </div>
          <div class="cart-item-total">KES ${(item.price * item.quantity).toLocaleString()}</div>
          <button class="cart-item-remove" onclick="FurnostylesCart.removeFromCart('${item.id}')">Remove</button>
        </div>
      `).join('');
    }

    if (cartTotal) {
      cartTotal.textContent = 'KES ' + getCartTotal().toLocaleString();
    }

    if (cartCount) {
      cartCount.textContent = getCartCount();
    }
  }

  // Export public API
  window.FurnostylesCart = {
    init,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getCartItems,
    renderCart
  };

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-render cart if on cart page
  if (window.location.pathname.includes('cart.html')) {
    document.addEventListener('DOMContentLoaded', renderCart);
  }

  console.log('[Cart] FurnostylesCart module loaded');

})();

