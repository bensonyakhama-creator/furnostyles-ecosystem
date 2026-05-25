/**
 * Furnostyles Cart Service
 * Manages cart items, totals, and persistence for future checkout.
 */

(function () {
  'use strict';

  function _val() { return window.FurnostylesCommerceValidation; }

  /**
   * Adds or updates an item in the cart.
   */
  function addToCart(item, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));
    var v = _val();
    if (v) {
      var check = v.validateCartItem(item);
      if (!check.valid) return Promise.reject(new Error(check.error));
    }

    // For now, use localStorage as cart persistence
    var cart = JSON.parse(localStorage.getItem('furnostyles_cart') || '[]');
    var existingIndex = cart.findIndex(function (c) { return c.id === item.id; });

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += (item.quantity || 1);
    } else {
      cart.push({
        id: item.id,
        title: item.title || 'Untitled',
        price: item.price || 0,
        quantity: item.quantity || 1,
        category: item.category || 'furniture',
        vendorId: item.vendorId || null
      });
    }

    localStorage.setItem('furnostyles_cart', JSON.stringify(cart));
    return Promise.resolve(cart);
  }

  /**
   * Removes an item from the cart.
   */
  function removeFromCart(itemId) {
    var cart = JSON.parse(localStorage.getItem('furnostyles_cart') || '[]');
    cart = cart.filter(function (c) { return c.id !== itemId; });
    localStorage.setItem('furnostyles_cart', JSON.stringify(cart));
    return Promise.resolve(cart);
  }

  /**
   * Fetches current cart and calculates totals.
   */
  function getCart() {
    var cart = JSON.parse(localStorage.getItem('furnostyles_cart') || '[]');
    var total = cart.reduce(function (sum, item) {
      return sum + (Number(item.price) * Number(item.quantity));
    }, 0);
    return {
      items: cart,
      total: total,
      count: cart.length
    };
  }

  /**
   * Clears the cart after successful order.
   */
  function clearCart() {
    localStorage.removeItem('furnostyles_cart');
    return Promise.resolve();
  }

  window.FurnostylesCartService = {
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    getCart: getCart,
    clearCart: clearCart
  };

}());
