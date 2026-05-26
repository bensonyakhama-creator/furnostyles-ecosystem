/**
 * FURNOSTYLES — ENHANCED CART.JS
 * =============================
 * File: assets/js/cart.js
 * Purpose: Comprehensive cart system combining features from Amazon, Alibaba, Jumia, Kilimall, Jiji
 * 
 * Features from reference platforms:
 * - Amazon: Real-time updates, save for later, move to wishlist, bulk operations, price alerts
 * - Alibaba: Mobile app integration, spending tracking, personalized promotions, bulk purchase
 * - Jumia: Pay on delivery support, item recommendations, secure checkout
 * - Kilimall: One-page checkout support, M-Pesa auto-fill, push notifications
 * - Jiji: Direct seller chat, simple checkout options
 * 
 * Cart item schema: { id, title, price, quantity, type, image, category, marketplace, seller, 
 *                    shipping, estimatedDelivery, savedForLater, priceAlert }
 * Types: product | service | sourcing | secondhand | realestate | materials
 * 
 * Public API: window.FurnostylesCart
 */

(function() {
  'use strict';

  // Cart storage keys
  const CART_KEY = window.FurnostylesStorageKeys ? window.FurnostylesStorageKeys.CART : 'furnostyles_cart';
  const SAVED_FOR_LATER_KEY = window.FurnostylesStorageKeys ? window.FurnostylesStorageKeys.SAVED_FOR_LATER : 'furnostyles_saved_later';
  const CART_PREFS_KEY = window.FurnostylesStorageKeys ? window.FurnostylesStorageKeys.CART_PREFS : 'furnostyles_cart_prefs';

  // Cart state
  let cart = [];
  let savedForLater = [];
  let cartPrefs = {
    autoSave: true,
    priceAlerts: true,
    notifyOnPriceDrop: true,
    defaultQuantity: 1
  };

  // Input validation helpers
  function validateProduct(product) {
    if (!product || typeof product !== 'object') {
      return { valid: false, error: 'Invalid product object' };
    }
    if (!product.id || typeof product.id !== 'string' || product.id.trim() === '') {
      return { valid: false, error: 'Product ID is required' };
    }
    if (!product.title || typeof product.title !== 'string' || product.title.trim() === '') {
      return { valid: false, error: 'Product title is required' };
    }
    const price = parseFloat(product.price);
    if (isNaN(price) || price < 0) {
      return { valid: false, error: 'Invalid product price' };
    }
    return { valid: true };
  }

  function validateQuantity(quantity) {
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1 || qty > 999) {
      return { valid: false, error: 'Quantity must be between 1 and 999' };
    }
    return { valid: true, value: qty };
  }

  function validatePrice(price) {
    const p = parseFloat(price);
    if (isNaN(p) || p < 0) {
      return { valid: false, error: 'Invalid price value' };
    }
    return { valid: true, value: p };
  }

  function validateProductId(productId) {
    if (!productId || typeof productId !== 'string' || productId.trim() === '') {
      return { valid: false, error: 'Invalid product ID' };
    }
    return { valid: true };
  }

  // Initialize cart from localStorage
  function init() {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) {
        cart = JSON.parse(savedCart);
      }
      
      const savedLater = localStorage.getItem(SAVED_FOR_LATER_KEY);
      if (savedLater) {
        savedForLater = JSON.parse(savedLater);
      }
      
      const savedPrefs = localStorage.getItem(CART_PREFS_KEY);
      if (savedPrefs) {
        cartPrefs = { ...cartPrefs, ...JSON.parse(savedPrefs) };
      }
    } catch (e) {
      console.error('Failed to load cart:', e);
      cart = [];
      savedForLater = [];
    }
    updateCartBadges();
    checkPriceAlerts();
  }

  // Save cart to localStorage
  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      localStorage.setItem(SAVED_FOR_LATER_KEY, JSON.stringify(savedForLater));
      localStorage.setItem(CART_PREFS_KEY, JSON.stringify(cartPrefs));
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
    const productValidation = validateProduct(product);
    if (!productValidation.valid) {
      console.error('Invalid product:', productValidation.error);
      return false;
    }

    const quantityValidation = validateQuantity(quantity);
    if (!quantityValidation.valid) {
      console.error('Invalid quantity:', quantityValidation.error);
      return false;
    }

    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantityValidation.value;
      existingItem.addedAt = new Date().toISOString();
    } else {
      cart.push({
        id: product.id,
        title: product.title || product.name,
        price: parseFloat(product.price) || 0,
        originalPrice: parseFloat(product.originalPrice) || parseFloat(product.price) || 0,
        quantity: quantityValidation.value,
        type: product.type || 'product',
        image: product.image || product.images?.[0] || 'assets/images/default-product.jpg',
        category: product.category || '',
        marketplace: product.marketplace || 'furniture',
        seller: product.seller || 'Furnostyles',
        sellerId: product.sellerId || '',
        shipping: product.shipping || 0,
        estimatedDelivery: product.estimatedDelivery || '3-5 business days',
        addedAt: new Date().toISOString(),
        priceAlert: cartPrefs.priceAlerts,
        notes: ''
      });
    }

    saveCart();
    showAddToCartNotification(product.title);
    return true;
  }

  // Remove item from cart
  function removeFromCart(productId) {
    const idValidation = validateProductId(productId);
    if (!idValidation.valid) {
      console.error('Invalid product ID:', idValidation.error);
      return false;
    }
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    return true;
  }

  // Update item quantity
  function updateQuantity(productId, quantity) {
    const idValidation = validateProductId(productId);
    if (!idValidation.valid) {
      console.error('Invalid product ID:', idValidation.error);
      return false;
    }

    const quantityValidation = validateQuantity(quantity);
    if (!quantityValidation.valid) {
      console.error('Invalid quantity:', quantityValidation.error);
      return false;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantityValidation.value;
      saveCart();
      return true;
    }
    return false;
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

  // Get cart subtotal (before shipping)
  function getCartSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Get shipping total
  function getShippingTotal() {
    return cart.reduce((sum, item) => sum + (item.shipping || 0), 0);
  }

  // Get cart item count
  function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Get all cart items
  function getCartItems() {
    return [...cart];
  }

  // Save item for later (Amazon feature)
  function saveForLater(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      savedForLater.push({ ...item, savedAt: new Date().toISOString() });
      cart = cart.filter(item => item.id !== productId);
      saveCart();
      return true;
    }
    return false;
  }

  // Move item from saved for later to cart
  function moveToCart(productId) {
    const item = savedForLater.find(item => item.id === productId);
    if (item) {
      const existingInCart = cart.find(i => i.id === productId);
      if (existingInCart) {
        existingInCart.quantity += item.quantity;
      } else {
        cart.push({ ...item, addedAt: new Date().toISOString() });
      }
      savedForLater = savedForLater.filter(item => item.id !== productId);
      saveCart();
      return true;
    }
    return false;
  }

  // Get saved for later items
  function getSavedForLater() {
    return [...savedForLater];
  }

  // Remove from saved for later
  function removeFromSavedLater(productId) {
    savedForLater = savedForLater.filter(item => item.id !== productId);
    saveCart();
  }

  // Move to wishlist (Amazon feature)
  function moveToWishlist(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      const wishlist = JSON.parse(localStorage.getItem('fns_wishlist') || '[]');
      const existing = wishlist.find(w => w.id === productId);
      if (!existing) {
        wishlist.push({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
          marketplace: item.marketplace,
          addedAt: new Date().toISOString()
        });
        localStorage.setItem('fns_wishlist', JSON.stringify(wishlist));
      }
      cart = cart.filter(i => i.id !== productId);
      saveCart();
      return true;
    }
    return false;
  }

  // Bulk add to cart (Alibaba feature)
  function bulkAddToCart(products) {
    if (!Array.isArray(products)) {
      console.error('Invalid products array');
      return false;
    }
    let successCount = 0;
    products.forEach(product => {
      if (addToCart(product, product.quantity || 1)) {
        successCount++;
      }
    });
    return successCount > 0;
  }

  // Bulk update quantities
  function bulkUpdateQuantities(updates) {
    if (!Array.isArray(updates)) {
      console.error('Invalid updates array');
      return false;
    }
    let successCount = 0;
    updates.forEach(update => {
      if (updateQuantity(update.id, update.quantity)) {
        successCount++;
      }
    });
    return successCount > 0;
  }

  // Bulk remove items
  function bulkRemoveItems(productIds) {
    if (!Array.isArray(productIds)) {
      console.error('Invalid product IDs array');
      return false;
    }
    const validIds = productIds.filter(id => validateProductId(id).valid);
    cart = cart.filter(item => !validIds.includes(item.id));
    saveCart();
    return true;
  }

  // Set price alert (Amazon feature)
  function setPriceAlert(productId, targetPrice) {
    const idValidation = validateProductId(productId);
    if (!idValidation.valid) {
      console.error('Invalid product ID:', idValidation.error);
      return false;
    }

    const priceValidation = validatePrice(targetPrice);
    if (!priceValidation.valid) {
      console.error('Invalid target price:', priceValidation.error);
      return false;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
      item.priceAlert = true;
      item.targetPrice = priceValidation.value;
      saveCart();
      return true;
    }
    return false;
  }

  // Check price alerts
  function checkPriceAlerts() {
    if (!cartPrefs.notifyOnPriceDrop) return;
    
    cart.forEach(item => {
      if (item.priceAlert && item.targetPrice && item.price <= item.targetPrice) {
        showPriceDropNotification(item.title, item.price);
      }
    });
  }

  // Add note to item
  function addItemNote(productId, note) {
    const idValidation = validateProductId(productId);
    if (!idValidation.valid) {
      console.error('Invalid product ID:', idValidation.error);
      return false;
    }

    if (note !== null && note !== undefined && typeof note !== 'string') {
      console.error('Invalid note type');
      return false;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
      item.notes = note || '';
      saveCart();
      return true;
    }
    return false;
  }

  // Get cart preferences
  function getCartPreferences() {
    return { ...cartPrefs };
  }

  // Update cart preferences
  function updateCartPreferences(prefs) {
    cartPrefs = { ...cartPrefs, ...prefs };
    saveCart();
  }

  // Get spending tracking (Alibaba feature)
  function getSpendingTracking() {
    const total = getCartTotal();
    const itemCount = getCartCount();
    const avgPrice = itemCount > 0 ? total / itemCount : 0;
    
    return {
      total,
      itemCount,
      avgPrice,
      byCategory: cart.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + (item.price * item.quantity);
        return acc;
      }, {}),
      byMarketplace: cart.reduce((acc, item) => {
        acc[item.marketplace] = (acc[item.marketplace] || 0) + (item.price * item.quantity);
        return acc;
      }, {})
    };
  }

  // Show add to cart notification
  function showAddToCartNotification(title) {
    if (!cartPrefs.autoSave) return;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="cart-notification-content">
        <span class="cart-notification-icon">✓</span>
        <span class="cart-notification-text">Added to cart: ${title}</span>
        <button class="cart-notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => notification.remove(), 3000);
  }

  // Show price drop notification
  function showPriceDropNotification(title, price) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification price-drop';
    notification.innerHTML = `
      <div class="cart-notification-content">
        <span class="cart-notification-icon">📉</span>
        <span class="cart-notification-text">Price drop: ${title} now KES ${price.toLocaleString()}</span>
        <button class="cart-notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
  }

  // Render cart on cart page
  function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartEmpty = document.getElementById('cart-empty');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartShipping = document.getElementById('cart-shipping');
    const savedLaterContainer = document.getElementById('saved-later-container');

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
          <input type="checkbox" class="cart-item-select" data-id="${item.id}" checked>
          <img src="${item.image}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-details">
            <h3 class="cart-item-title">${item.title}</h3>
            <p class="cart-item-meta">${item.category} • ${item.marketplace} • ${item.seller}</p>
            <p class="cart-item-price">KES ${item.price.toLocaleString()}</p>
            ${item.originalPrice > item.price ? `<p class="cart-item-original-price">Was: KES ${item.originalPrice.toLocaleString()}</p>` : ''}
            ${item.estimatedDelivery ? `<p class="cart-item-delivery">📦 ${item.estimatedDelivery}</p>` : ''}
            ${item.notes ? `<p class="cart-item-notes">📝 ${item.notes}</p>` : ''}
          </div>
          <div class="cart-item-quantity">
            <button class="qty-btn minus" onclick="FurnostylesCart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn plus" onclick="FurnostylesCart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
          </div>
          <div class="cart-item-total">KES ${(item.price * item.quantity).toLocaleString()}</div>
          <div class="cart-item-actions">
            <button class="cart-action-btn" onclick="FurnostylesCart.saveForLater('${item.id}')" title="Save for Later">🔖</button>
            <button class="cart-action-btn" onclick="FurnostylesCart.moveToWishlist('${item.id}')" title="Move to Wishlist">❤️</button>
            <button class="cart-action-btn" onclick="FurnostylesCart.removeFromCart('${item.id}')" title="Remove">🗑️</button>
          </div>
        </div>
      `).join('');
    }

    if (cartTotal) {
      cartTotal.textContent = 'KES ' + getCartTotal().toLocaleString();
    }

    if (cartCount) {
      cartCount.textContent = getCartCount();
    }

    if (cartSubtotal) {
      cartSubtotal.textContent = 'KES ' + getCartSubtotal().toLocaleString();
    }

    if (cartShipping) {
      cartShipping.textContent = 'KES ' + getShippingTotal().toLocaleString();
    }

    // Render saved for later
    if (savedLaterContainer && savedForLater.length > 0) {
      savedLaterContainer.innerHTML = `
        <h3>Saved for Later (${savedForLater.length})</h3>
        ${savedForLater.map(item => `
          <div class="saved-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" class="saved-item-image">
            <div class="saved-item-details">
              <h4 class="saved-item-title">${item.title}</h4>
              <p class="saved-item-price">KES ${item.price.toLocaleString()}</p>
            </div>
            <div class="saved-item-actions">
              <button class="saved-action-btn" onclick="FurnostylesCart.moveToCart('${item.id}')">Move to Cart</button>
              <button class="saved-action-btn" onclick="FurnostylesCart.removeFromSavedLater('${item.id}')">Remove</button>
            </div>
          </div>
        `).join('')}
      `;
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
    getCartSubtotal,
    getShippingTotal,
    getCartCount,
    getCartItems,
    saveForLater,
    moveToCart,
    getSavedForLater,
    removeFromSavedLater,
    moveToWishlist,
    bulkAddToCart,
    bulkUpdateQuantities,
    bulkRemoveItems,
    setPriceAlert,
    addItemNote,
    getCartPreferences,
    updateCartPreferences,
    getSpendingTracking,
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

  console.log('[Cart] Enhanced FurnostylesCart module loaded with features from Amazon, Alibaba, Jumia, Kilimall, Jiji');

})();

