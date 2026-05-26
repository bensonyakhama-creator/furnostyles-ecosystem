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
        // Demo dropshipping products (Alibaba/AliExpress style)
        this.dropshipProducts = [
          {
            id: 'dropship-001',
            title: 'Modern Sectional Sofa Set - L Shape',
            description: 'Premium L-shaped sectional sofa with high-density foam. Direct from Alibaba supplier with free shipping to Kenya.',
            supplierName: 'Furniture King Factory',
            supplierCountry: 'China',
            supplierUrl: 'https://alibaba.com/product/123456',
            supplierPrice: 85000,
            retailPrice: 150000,
            commissionRate: 15,
            commissionAmount: 22500,
            image: 'assets/images/sofa-1.jpg',
            category: 'Furniture',
            shippingTime: '15-25 days',
            moq: 1,
            stockAvailable: true,
            supplierStock: 500,
            supplierRating: 4.8,
            supplierOrders: 15000,
            supplierResponseRate: 98,
            isActive: true,
            createdAt: new Date().toISOString()
          },
          {
            id: 'dropship-002',
            title: 'Luxury Marble Floor Tiles - 60x60cm',
            description: 'High-grade marble tiles with polished finish. Alibaba Gold Supplier with verified factory.',
            supplierName: 'Stone World Trading',
            supplierCountry: 'China',
            supplierUrl: 'https://alibaba.com/product/789012',
            supplierPrice: 3200,
            retailPrice: 5500,
            commissionRate: 12,
            commissionAmount: 660,
            image: 'assets/images/tiles-1.jpg',
            category: 'Materials',
            shippingTime: '20-30 days',
            moq: 100,
            stockAvailable: true,
            supplierStock: 10000,
            supplierRating: 4.9,
            supplierOrders: 25000,
            supplierResponseRate: 99,
            isActive: true,
            createdAt: new Date().toISOString()
          },
          {
            id: 'dropship-003',
            title: 'Smart LED Strip Lights - WiFi Control',
            description: 'RGB LED strip lights with app control. AliExpress Top Seller with fast shipping.',
            supplierName: 'LED Tech Pro',
            supplierCountry: 'China',
            supplierUrl: 'https://aliexpress.com/item/345678',
            supplierPrice: 2500,
            retailPrice: 4500,
            commissionRate: 20,
            commissionAmount: 900,
            image: 'assets/images/lighting-1.jpg',
            category: 'Electronics',
            shippingTime: '7-15 days',
            moq: 10,
            stockAvailable: true,
            supplierStock: 50000,
            supplierRating: 4.7,
            supplierOrders: 100000,
            supplierResponseRate: 97,
            isActive: true,
            createdAt: new Date().toISOString()
          },
          {
            id: 'dropship-004',
            title: 'Ergonomic Office Chair - Mesh Back',
            description: 'Premium ergonomic office chair with lumbar support. Alibaba Verified Supplier.',
            supplierName: 'Office Comfort Plus',
            supplierCountry: 'China',
            supplierUrl: 'https://alibaba.com/product/456789',
            supplierPrice: 12000,
            retailPrice: 22000,
            commissionRate: 18,
            commissionAmount: 3960,
            image: 'assets/images/chair-1.jpg',
            category: 'Furniture',
            shippingTime: '12-20 days',
            moq: 5,
            stockAvailable: true,
            supplierStock: 8000,
            supplierRating: 4.6,
            supplierOrders: 8000,
            supplierResponseRate: 96,
            isActive: true,
            createdAt: new Date().toISOString()
          },
          {
            id: 'dropship-005',
            title: 'Ceramic Vases Set - Handmade',
            description: 'Set of 3 handmade ceramic vases. AliExpress Choice with free shipping.',
            supplierName: 'Home Decor Art',
            supplierCountry: 'China',
            supplierUrl: 'https://aliexpress.com/item/567890',
            supplierPrice: 3500,
            retailPrice: 6500,
            commissionRate: 25,
            commissionAmount: 1625,
            image: 'assets/images/vase-1.jpg',
            category: 'Decor',
            shippingTime: '10-18 days',
            moq: 20,
            stockAvailable: true,
            supplierStock: 30000,
            supplierRating: 4.8,
            supplierOrders: 45000,
            supplierResponseRate: 98,
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
        // Demo suppliers (Alibaba/AliExpress style)
        this.suppliers = [
          {
            id: 'supplier-001',
            name: 'Furniture King Factory',
            country: 'China',
            platform: 'Alibaba',
            platformUrl: 'https://alibaba.com/store/furnitureking',
            email: 'sales@furnitureking.cn',
            phone: '+86 138 1234 5678',
            wechat: 'furnitureking',
            paymentMethod: 'Alibaba Trade Assurance',
            paymentTerms: 'T/T, L/C, Western Union',
            bankDetails: {
              bank: 'Bank of China',
              account: 'CN1234567890',
              swift: 'BKCHCNBJ'
            },
            verificationLevel: 'Gold Supplier',
            verifiedSince: '2018',
            rating: 4.8,
            totalOrders: 15000,
            onTimeDelivery: 95,
            responseRate: 98,
            responseTime: '< 2 hours',
            mainProducts: ['Sofas', 'Sectionals', 'Living Room Sets'],
            factoryLocation: 'Foshan, Guangdong',
            factorySize: '5000 sqm',
            employees: 150,
            isActive: true
          },
          {
            id: 'supplier-002',
            name: 'Stone World Trading',
            country: 'China',
            platform: 'Alibaba',
            platformUrl: 'https://alibaba.com/store/stoneworld',
            email: 'export@stoneworld.cn',
            phone: '+86 139 8765 4321',
            wechat: 'stoneworld',
            paymentMethod: 'Alibaba Trade Assurance',
            paymentTerms: 'T/T, L/C, PayPal',
            bankDetails: {
              bank: 'ICBC',
              account: 'CN0987654321',
              swift: 'ICBKCNBJ'
            },
            verificationLevel: 'Verified Supplier',
            verifiedSince: '2016',
            rating: 4.9,
            totalOrders: 25000,
            onTimeDelivery: 97,
            responseRate: 99,
            responseTime: '< 1 hour',
            mainProducts: ['Marble Tiles', 'Granite', 'Ceramic Tiles'],
            factoryLocation: 'Xiamen, Fujian',
            factorySize: '8000 sqm',
            employees: 200,
            isActive: true
          },
          {
            id: 'supplier-003',
            name: 'LED Tech Pro',
            country: 'China',
            platform: 'AliExpress',
            platformUrl: 'https://aliexpress.com/store/ledtechpro',
            email: 'support@ledtechpro.com',
            phone: '+86 137 1111 2222',
            wechat: 'ledtechpro',
            paymentMethod: 'AliExpress Secure Payment',
            paymentTerms: 'Credit Card, PayPal, WebMoney',
            bankDetails: {
              bank: 'China Construction Bank',
              account: 'CN5555555555',
              swift: 'CCBCCNBJ'
            },
            verificationLevel: 'Top Seller',
            verifiedSince: '2019',
            rating: 4.7,
            totalOrders: 100000,
            onTimeDelivery: 94,
            responseRate: 97,
            responseTime: '< 4 hours',
            mainProducts: ['LED Lights', 'Smart Lighting', 'Strip Lights'],
            factoryLocation: 'Shenzhen, Guangdong',
            factorySize: '3000 sqm',
            employees: 80,
            isActive: true
          },
          {
            id: 'supplier-004',
            name: 'Office Comfort Plus',
            country: 'China',
            platform: 'Alibaba',
            platformUrl: 'https://alibaba.com/store/officecomfort',
            email: 'b2b@officecomfort.cn',
            phone: '+86 136 3333 4444',
            wechat: 'officecomfort',
            paymentMethod: 'Alibaba Trade Assurance',
            paymentTerms: 'T/T, L/C',
            bankDetails: {
              bank: 'Agricultural Bank of China',
              account: 'CN4444444444',
              swift: 'ABOCCNBJ'
            },
            verificationLevel: 'Gold Supplier',
            verifiedSince: '2017',
            rating: 4.6,
            totalOrders: 8000,
            onTimeDelivery: 93,
            responseRate: 96,
            responseTime: '< 3 hours',
            mainProducts: ['Office Chairs', 'Desks', 'Workstations'],
            factoryLocation: 'Ningbo, Zhejiang',
            factorySize: '4000 sqm',
            employees: 120,
            isActive: true
          },
          {
            id: 'supplier-005',
            name: 'Home Decor Art',
            country: 'China',
            platform: 'AliExpress',
            platformUrl: 'https://aliexpress.com/store/homedecorart',
            email: 'sales@homedecorart.com',
            phone: '+86 135 5555 6666',
            wechat: 'homedecorart',
            paymentMethod: 'AliExpress Secure Payment',
            paymentTerms: 'Credit Card, PayPal',
            bankDetails: {
              bank: 'Bank of Communications',
              account: 'CN6666666666',
              swift: 'COMMCNBJ'
            },
            verificationLevel: 'Choice Seller',
            verifiedSince: '2020',
            rating: 4.8,
            totalOrders: 45000,
            onTimeDelivery: 96,
            responseRate: 98,
            responseTime: '< 2 hours',
            mainProducts: ['Vases', 'Decor', 'Home Accessories'],
            factoryLocation: 'Yiwu, Zhejiang',
            factorySize: '2000 sqm',
            employees: 50,
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
      
      let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">';
      
      activeProducts.forEach(product => {
        const profit = product.retailPrice - product.supplierPrice;
        const profitMargin = ((profit / product.retailPrice) * 100).toFixed(1);
        const supplier = this.suppliers.find(s => s.name === product.supplierName);
        const platform = supplier ? supplier.platform : 'Unknown';
        const platformColor = platform === 'Alibaba' ? '#ff6a00' : '#ff4747';
        
        html += `
          <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; overflow: hidden; transition: all 0.3s;">
            <div style="position: relative;">
              <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 200px; object-fit: cover;">
              <div style="position: absolute; top: 10px; left: 10px; display: flex; gap: 8px;">
                <span style="background: ${platformColor}; color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;">${platform}</span>
                <span style="background: #c9a227; color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;">${product.commissionRate}% Commission</span>
              </div>
            </div>
            <div style="padding: 16px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px; font-size: 11px;">${product.supplierCountry}</span>
                <span style="background: #e8f5e9; color: #2e7d32; padding: 4px 8px; border-radius: 4px; font-size: 11px;">${product.shippingTime}</span>
                <span style="background: #e3f2fd; color: #1976d2; padding: 4px 8px; border-radius: 4px; font-size: 11px;">MOQ: ${product.moq}</span>
              </div>
              <h3 style="font-size: 16px; font-weight: 700; color: #1a2540; margin: 0 0 8px; line-height: 1.4;">${product.title}</h3>
              <p style="font-size: 13px; color: #8090a0; margin: 0 0 12px; line-height: 1.5;">${product.description}</p>
              
              <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                <div style="font-size: 12px; color: #8090a0; margin-bottom: 4px;">Supplier: ${product.supplierName}</div>
                <div style="display: flex; gap: 16px; font-size: 12px;">
                  <span>⭐ ${product.supplierRating || 'N/A'}</span>
                  <span>📦 ${product.supplierStock ? product.supplierStock.toLocaleString() + ' in stock' : 'N/A'}</span>
                  <span>💬 ${product.supplierResponseRate || 'N/A'}% response</span>
                </div>
              </div>
              
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
                <button onclick="window.FurnostylesDropship.viewSupplierProduct('${product.id}')" style="padding: 10px 16px; background: ${platformColor}; color: #fff; border: none; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">View Source</button>
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

    viewSupplierProduct: function(productId) {
      const product = this.dropshipProducts.find(p => p.id === productId);
      if (!product) return;
      
      // Open supplier product URL in new tab
      window.open(product.supplierUrl, '_blank');
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
