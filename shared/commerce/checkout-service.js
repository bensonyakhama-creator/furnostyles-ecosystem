/**
 * Furnostyles Checkout Service
 * Orchestrates order creation from cart and checkout form data.
 */

(function () {
  'use strict';

  function _val() { return window.FurnostylesCommerceValidation; }
  function _cart() { return window.FurnostylesCartService; }
  function _order() { return window.FurnostylesOrderService; }

  /**
   * Validates checkout form and creates order.
   */
  function processCheckout(checkoutData, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var v = _val();
    if (v) {
      var check = v.validateCheckoutForm(checkoutData);
      if (!check.valid) return Promise.reject(new Error(check.errors.join(', ')));
    }

    var cart = _cart ? _cart.getCart() : { items: [], total: 0 };
    if (cart.items.length === 0) return Promise.reject(new Error('Cart is empty'));

    var orderData = {
      customerId: checkoutData.customerId || 'guest',
      customerName: checkoutData.fullName,
      customerEmail: checkoutData.email,
      customerPhone: checkoutData.phone,
      deliveryAddress: checkoutData.address,
      city: checkoutData.city,
      items: cart.items,
      total: cart.total,
      paymentMethod: checkoutData.paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      orderType: 'product',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (_order) {
      return _order.createOrder(orderData, bridge).then(function (order) {
        return _cart.clearCart().then(function () {
          return order;
        });
      });
    }

    return Promise.reject(new Error('Order service not available.'));
  }

  window.FurnostylesCheckoutService = {
    processCheckout: processCheckout
  };

}());
