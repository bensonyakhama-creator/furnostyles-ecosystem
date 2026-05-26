/**
 * Furnostyles Dropshipping System
 * Commission-based dropshipping with supplier payment routing
 */

(function() {
  'use strict';

  window.FurnostylesDropshipping = {
    dropshipProducts: [],
    orders: [],
    commissions: [],
    suppliers: [],

    init: function() {
      this.loadDropshipProducts();
      this.loadOrders();
      this.loadCommissions();
      this.loadSuppliers();
    },

    loadDropshipProducts: function() {
      const stored = localStorage.getItem('fns_dropship_products');
      if (stored) {
        this.dropshipProducts = JSON.parse(stored);
      } else {
        // Demo dropshipping products
        this.dropshipProducts = [
          {
            id: 'dropship-001',
            title: 'Italian Leather Sofa - Premium Collection',
            description: 'Genuine Italian leather sofa with solid wood frame. Direct from Italy with manufacturer warranty.',
            supplierName: 'Milano Furniture Direct',
            supplierCountry: 'Italy',
            supplierUrl: 'https://example-supplier.com/product/123',
            supplierPrice: 120000,
            retailPrice: 180000,
            commissionRate: 15,
            commissionAmount: 18000,
            image: 'assets/images/sofa-1.jpg',
            category: 'Furniture',
            shippingTime: '14-21 days',
            moq: 1,
            stockAvailable: true,
            isActive: true,
            createdAt: new Date().toISOString()
          },
          {
            id: 'dropship-002',
            title: 'Spanish Marble Tiles - Premium Grade',
            description: 'High-quality Spanish marble tiles for luxury flooring. Direct from Spanish quarries.',
            supplierName: 'Marble Espana',
            supplierCountry: 'Spain',
            supplierUrl: 'https://example-supplier.com/product/456',
            supplierPrice: 4500,
            retailPrice: 6500,
            commissionRate: 12,
            commissionAmount: 780,
            image: 'assets/images/tiles-1.jpg',
            category: 'Materials',
            shippingTime: '21-28 days',
            moq: 50,
            stockAvailable: true,
            isActive: true,
            createdAt: new Date().toISOString()
          },
          {
            id: 'dropship-003',
            title: 'German Smart Home Lighting System',
            description: 'Premium smart lighting system with app control. Direct from German manufacturer.',
            supplierName: 'TechLight Germany',
            supplierCountry: 'Germany',
            supplierUrl: 'https://example-supplier.com/product/789',
            supplierPrice: 35000,
            retailPrice: 52000,
            commissionRate: 18,
            commissionAmount: 9360,
            image: 'assets/images/lighting-1.jpg',
            category: 'Electronics',
            shippingTime: '10-14 days',
            moq: 5,
            stockAvailable: true,
            isActive: true,
            createdAt: new Date().toISOString()
          }
        ];
        this.saveDropshipProducts();
      }
    },

    saveDropshipProducts: function() {
      localStorage.setItem('fns_dropship_products', JSON.stringify(this.dropshipProducts));
    },

    loadOrders: function() {
      const stored = localStorage.getItem('fns_dropship_orders');
      if (stored) {
        this.orders = JSON.parse(stored);
      }
    },

    saveOrders: function() {
      localStorage.setItem('fns_dropship_orders', JSON.stringify(this.orders));
    },

    loadCommissions: function() {
      const stored = localStorage.getItem('fns_dropship_commissions');
      if (stored) {
        this.commissions = JSON.parse(stored);
      }
    },

    saveCommissions: function() {
      localStorage.setItem('fns_dropship_commissions', JSON.stringify(this.commissions));
    },

    loadSuppliers: function() {
      const stored = localStorage.getItem('fns_dropship_suppliers');
      if (stored) {
        this.suppliers = JSON.parse(stored);
      } else {
        // Demo suppliers
        this.suppliers = [
          {
            id: 'supplier-001',
            name: 'Milano Furniture Direct',
            country: 'Italy',
            email: 'orders@milanofurniture.com',
            phone: '+39 02 1234567',
            paymentMethod: 'Bank Transfer',
            bankDetails: {
              bank: 'Banca Intesa',
              account: 'IT1234567890',
              swift: 'BACCITMM'
            },
            rating: 4.8,
            totalOrders: 156,
            onTimeDelivery: 95,
            isActive: true
          },
          {
            id: 'supplier-002',
            name: 'Marble Espana',
            country: 'Spain',
            email: 'export@marbleespana.com',
            phone: '+34 91 2345678',
            paymentMethod: 'Bank Transfer',
            bankDetails: {
              bank: 'Santander',
              account: 'ES9876543210',
              swift: 'CAIXESBB'
            },
            rating: 4.6,
            totalOrders: 89,
            onTimeDelivery: 92,
            isActive: true
          },
          {
            id: 'supplier-003',
            name: 'TechLight Germany',
            country: 'Germany',
            email: 'b2b@techlight.de',
            phone: '+49 30 1234567',
            paymentMethod: 'Bank Transfer',
            bankDetails: {
              bank: 'Deutsche Bank',
              account: 'DE1234567890',
              swift: 'DEUTDEFF'
            },
            rating: 4.9,
            totalOrders: 234,
            onTimeDelivery: 98,
            isActive: true
          }
        ];
        this.saveSuppliers();
      }
    },

    saveSuppliers: function() {
      localStorage.setItem('fns_dropship_suppliers', JSON.stringify(this.suppliers));
    },

    addDropshipProduct: function(product) {
      const newProduct = {
        id: 'dropship-' + Date.now(),
        supplierName: product.supplierName,
        supplierCountry: product.supplierCountry,
        supplierUrl: product.supplierUrl,
        supplierPrice: parseFloat(product.supplierPrice),
        retailPrice: parseFloat(product.retailPrice),
        commissionRate: parseFloat(product.commissionRate),
        commissionAmount: parseFloat(product.retailPrice) * (parseFloat(product.commissionRate) / 100),
        image: product.image || 'assets/images/default-product.jpg',
        category: product.category,
        shippingTime: product.shippingTime,
        moq: parseInt(product.moq),
        stockAvailable: true,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      this.dropshipProducts.push(newProduct);
      this.saveDropshipProducts();
      return newProduct;
    },

    processDropshipOrder: function(product, customerDetails, quantity) {
      const productData = this.dropshipProducts.find(p => p.id === product.id);
      if (!productData) {
        return { success: false, error: 'Product not found' };
      }

      const totalAmount = productData.retailPrice * quantity;
      const supplierAmount = productData.supplierPrice * quantity;
      const commissionAmount = productData.commissionAmount * quantity;

      const order = {
        id: 'dropship-order-' + Date.now(),
        productId: product.id,
        productTitle: product.title,
        supplierName: productData.supplierName,
        supplierCountry: productData.supplierCountry,
        supplierUrl: productData.supplierUrl,
        supplierPrice: productData.supplierPrice,
        retailPrice: productData.retailPrice,
        commissionRate: productData.commissionRate,
        quantity: quantity,
        totalAmount: totalAmount,
        supplierAmount: supplierAmount,
        commissionAmount: commissionAmount,
        customerDetails: customerDetails,
        status: 'pending_payment',
        createdAt: new Date().toISOString(),
        paymentStatus: 'pending',
        shippingStatus: 'pending'
      };

      this.orders.push(order);
      this.saveOrders();

      return { success: true, order: order };
    },

    routeToSupplier: function(orderId) {
      const order = this.orders.find(o => o.id === orderId);
      if (!order) {
        return { success: false, error: 'Order not found' };
      }

      // Update order status
      order.status = 'redirected_to_supplier';
      order.redirectedAt = new Date().toISOString();
      this.saveOrders();

      // Redirect to supplier
      window.open(order.supplierUrl, '_blank');

      return { success: true, order: order };
    },

    confirmSupplierPayment: function(orderId) {
      const order = this.orders.find(o => o.id === orderId);
      if (!order) {
        return { success: false, error: 'Order not found' };
      }

      order.status = 'supplier_paid';
      order.paymentStatus = 'paid';
      order.supplierPaidAt = new Date().toISOString();
      this.saveOrders();

      // Record commission
      const commission = {
        id: 'commission-' + Date.now(),
        orderId: order.id,
        productId: order.productId,
        productTitle: order.productTitle,
        supplierName: order.supplierName,
        amount: order.commissionAmount,
        rate: order.commissionRate,
        status: 'pending',
        createdAt: new Date().toISOString(),
        expectedPayoutDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      this.commissions.push(commission);
      this.saveCommissions();

      return { success: true, commission: commission };
    },

    confirmSupplierShipment: function(orderId, trackingNumber) {
      const order = this.orders.find(o => o.id === orderId);
      if (!order) {
        return { success: false, error: 'Order not found' };
      }

      order.status = 'shipped';
      order.shippingStatus = 'shipped';
      order.trackingNumber = trackingNumber;
      order.shippedAt = new Date().toISOString();
      this.saveOrders();

      return { success: true, order: order };
    },

    completeOrder: function(orderId) {
      const order = this.orders.find(o => o.id === orderId);
      if (!order) {
        return { success: false, error: 'Order not found' };
      }

      order.status = 'completed';
      order.completedAt = new Date().toISOString();
      this.saveOrders();

      // Mark commission as payable
      const commission = this.commissions.find(c => c.orderId === orderId);
      if (commission) {
        commission.status = 'payable';
        this.saveCommissions();
      }

      return { success: true, order: order };
    },

    getCommissionStats: function() {
      const totalCommissions = this.commissions.reduce((sum, c) => sum + c.amount, 0);
      const pendingCommissions = this.commissions
        .filter(c => c.status === 'pending')
        .reduce((sum, c) => sum + c.amount, 0);
      const payableCommissions = this.commissions
        .filter(c => c.status === 'payable')
        .reduce((sum, c) => sum + c.amount, 0);
      const paidCommissions = this.commissions
        .filter(c => c.status === 'paid')
        .reduce((sum, c) => sum + c.amount, 0);

      return {
        total: totalCommissions,
        pending: pendingCommissions,
        payable: payableCommissions,
        paid: paidCommissions,
        count: this.commissions.length
      };
    },

    getOrdersByStatus: function(status) {
      return this.orders.filter(o => o.status === status);
    },

    getActiveDropshipProducts: function() {
      return this.dropshipProducts.filter(p => p.isActive);
    },

    getSupplierPerformance: function(supplierId) {
      const supplierOrders = this.orders.filter(o => o.supplierName === supplierId);
      const completedOrders = supplierOrders.filter(o => o.status === 'completed');
      
      return {
        totalOrders: supplierOrders.length,
        completedOrders: completedOrders.length,
        totalRevenue: supplierOrders.reduce((sum, o) => sum + o.supplierAmount, 0),
        totalCommission: supplierOrders.reduce((sum, o) => sum + o.commissionAmount, 0)
      };
    },

    renderDropshipProducts: function(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const activeProducts = this.getActiveDropshipProducts();
      
      let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">';
      
      activeProducts.forEach(product => {
        const profit = product.retailPrice - product.supplierPrice;
        const profitMargin = ((profit / product.retailPrice) * 100).toFixed(1);
        
        html += `
          <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; overflow: hidden; transition: all 0.3s;">
            <div style="position: relative;">
              <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 200px; object-fit: cover;">
              <span style="position: absolute; top: 10px; right: 10px; background: #c9a227; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">${product.commissionRate}% Commission</span>
            </div>
            <div style="padding: 16px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px; font-size: 11px;">${product.supplierCountry}</span>
                <span style="background: #e8f5e9; color: #2e7d32; padding: 4px 8px; border-radius: 4px; font-size: 11px;">${product.shippingTime}</span>
              </div>
              <h3 style="font-size: 16px; font-weight: 700; color: #1a2540; margin: 0 0 8px; line-height: 1.4;">${product.title}</h3>
              <p style="font-size: 13px; color: #8090a0; margin: 0 0 12px; line-height: 1.5;">${product.description}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div>
                  <div style="font-size: 18px; font-weight: 700; color: #0b3b46;">KES ${product.retailPrice.toLocaleString()}</div>
                  <div style="font-size: 12px; color: #8090a0;">Supplier: KES ${product.supplierPrice.toLocaleString()}</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 14px; font-weight: 700; color: #2e7d32;">+KES ${profit.toLocaleString()}</div>
                  <div style="font-size: 11px; color: #8090a0;">${profitMargin}% margin</div>
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button onclick="window.FurnostylesDropship.editProduct('${product.id}')" style="flex: 1; padding: 10px; background: #0b3b46; color: #fff; border: none; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">Edit</button>
                <button onclick="window.FurnostylesDropship.toggleProduct('${product.id}')" style="padding: 10px 16px; background: #f0f0f0; color: #1a2540; border: none; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">${product.isActive ? 'Pause' : 'Activate'}</button>
              </div>
            </div>
          </div>
        `;
      });
      
      html += '</div>';
      container.innerHTML = html;
    },

    editProduct: function(productId) {
      const product = this.dropshipProducts.find(p => p.id === productId);
      if (!product) return;
      
      // Open edit modal (to be implemented)
      alert('Edit product: ' + product.title);
    },

    toggleProduct: function(productId) {
      const product = this.dropshipProducts.find(p => p.id === productId);
      if (!product) return;
      
      product.isActive = !product.isActive;
      this.saveDropshipProducts();
      
      // Re-render if container exists
      const container = document.getElementById('dropship-products-container');
      if (container) {
        this.renderDropshipProducts('dropship-products-container');
      }
    }
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    if (window.FurnostylesDropshipping) {
      window.FurnostylesDropshipping.init();
    }
  });

})();
