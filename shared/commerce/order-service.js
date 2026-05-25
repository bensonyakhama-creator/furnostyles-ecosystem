/**
 * Furnostyles Order Service
 * Manages order creation, status updates, and vendor/provider assignment.
 */

(function () {
  'use strict';

  /**
   * Creates a new order in Firestore.
   */
  function createOrder(orderData, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var doc = {
      orderId: 'ORD-' + Date.now().toString(36).toUpperCase(),
      customerId: orderData.customerId || 'guest',
      vendorId: orderData.vendorId || null,
      providerId: orderData.providerId || null,
      orderType: orderData.orderType || 'product',
      items: orderData.items || [],
      total: orderData.total || 0,
      paymentStatus: 'pending',
      assignmentStatus: 'pending',
      commissionStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return bridge.create('orders', doc);
  }

  /**
   * Updates order status (payment, assignment, commission).
   */
  function updateOrderStatus(orderId, updates, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var updateData = Object.assign({}, updates, {
      updatedAt: new Date().toISOString()
    });

    return bridge.update('orders', orderId, updateData);
  }

  /**
   * Fetches orders by customer ID.
   */
  function getOrdersByCustomer(customerId, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    return bridge.list('orders', {
      where: [{ field: 'customerId', operator: '==', value: customerId }]
    });
  }

  /**
   * Fetches orders by vendor ID.
   */
  function getOrdersByVendor(vendorId, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    return bridge.list('orders', {
      where: [{ field: 'vendorId', operator: '==', value: vendorId }]
    });
  }

  window.FurnostylesOrderService = {
    createOrder: createOrder,
    updateOrderStatus: updateOrderStatus,
    getOrdersByCustomer: getOrdersByCustomer,
    getOrdersByVendor: getOrdersByVendor
  };

}());
