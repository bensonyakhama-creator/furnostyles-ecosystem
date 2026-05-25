/**
 * Furnostyles Commission Engine
 * Calculates and records platform commissions for vendors, providers, and sourcing partners.
 */

(function () {
  'use strict';

  /**
   * Calculates commission based on order type and total.
   */
  function calculateCommission(order) {
    var total = Number(order.total) || 0;
    var rate = 0.15; // Default 15% platform commission

    if (order.orderType === 'sourcing') {
      rate = 0.20; // 20% for sourcing
    } else if (order.orderType === 'service' || order.orderType === 'repair') {
      rate = 0.18; // 18% for services
    } else if (order.orderType === 'property') {
      rate = 0.10; // 10% for property listings
    }

    var commissionAmount = total * rate;
    var vendorAmount = total - commissionAmount;

    return {
      commissionRate: rate,
      commissionAmount: commissionAmount,
      vendorAmount: vendorAmount
    };
  }

  /**
   * Records commission in Firestore.
   */
  function recordCommission(orderId, commissionData, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var doc = {
      orderId: orderId,
      vendorId: commissionData.vendorId || null,
      providerId: commissionData.providerId || null,
      commissionRate: commissionData.commissionRate,
      commissionAmount: commissionData.commissionAmount,
      vendorAmount: commissionData.vendorAmount,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    return bridge.create('commissions', doc);
  }

  /**
   * Fetches commissions by vendor ID.
   */
  function getCommissionsByVendor(vendorId, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    return bridge.list('commissions', {
      where: [{ field: 'vendorId', operator: '==', value: vendorId }]
    });
  }

  /**
   * Fetches commissions by provider ID.
   */
  function getCommissionsByProvider(providerId, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    return bridge.list('commissions', {
      where: [{ field: 'providerId', operator: '==', value: providerId }]
    });
  }

  window.FurnostylesCommissionEngine = {
    calculateCommission: calculateCommission,
    recordCommission: recordCommission,
    getCommissionsByVendor: getCommissionsByVendor,
    getCommissionsByProvider: getCommissionsByProvider
  };

}());
