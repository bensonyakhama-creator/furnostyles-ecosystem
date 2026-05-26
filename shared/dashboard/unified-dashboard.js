/**
 * Furnostyles Unified Dashboard System
 * Hybrid dashboard with role switching and data collection hooks
 * Single account, multiple roles - seamless switching
 */

(function() {
  'use strict';

  window.FurnostylesUnifiedDashboard = {
    currentUser: null,
    currentRole: null,
    availableRoles: [],
    dashboardData: {},
    marketingHooks: {},

    // Initialize dashboard
    init: function() {
      this.loadUserSession();
      this.initializeMarketingHooks();
      this.renderDashboard();
      this.bindEvents();
    },

    // Load user session with roles
    loadUserSession: function() {
      const userSession = localStorage.getItem('fns_local_user');
      if (userSession) {
        this.currentUser = JSON.parse(userSession);
        this.availableRoles = this.currentUser.roles || ['customer'];
        this.currentRole = this.currentUser.activeRole || this.availableRoles[0];
      }
    },

    // Initialize marketing data collection hooks
    initializeMarketingHooks: function() {
      // Product view tracking
      this.marketingHooks.trackProductView = function(productId, productData) {
        const viewData = {
          userId: window.FurnostylesUnifiedDashboard.currentUser?.uid,
          productId: productId,
          category: productData.category,
          price: productData.price,
          timestamp: new Date().toISOString(),
          sessionId: sessionStorage.getItem('fns_session_id') || this.generateSessionId()
        };
        this.saveMarketingEvent('product_view', viewData);
      };

      // Search tracking
      this.marketingHooks.trackSearch = function(searchTerm, filters) {
        const searchData = {
          userId: window.FurnostylesUnifiedDashboard.currentUser?.uid,
          searchTerm: searchTerm,
          filters: filters,
          timestamp: new Date().toISOString(),
          sessionId: sessionStorage.getItem('fns_session_id')
        };
        this.saveMarketingEvent('search', searchData);
      };

      // Add to cart tracking
      this.marketingHooks.trackAddToCart = function(productId, quantity) {
        const cartData = {
          userId: window.FurnostylesUnifiedDashboard.currentUser?.uid,
          productId: productId,
          quantity: quantity,
          timestamp: new Date().toISOString(),
          sessionId: sessionStorage.getItem('fns_session_id')
        };
        this.saveMarketingEvent('add_to_cart', cartData);
      };

      // Wishlist tracking
      this.marketingHooks.trackWishlist = function(productId) {
        const wishlistData = {
          userId: window.FurnostylesUnifiedDashboard.currentUser?.uid,
          productId: productId,
          timestamp: new Date().toISOString()
        };
        this.saveMarketingEvent('wishlist', wishlistData);
      };

      // Category browsing tracking
      this.marketingHooks.trackCategoryView = function(category) {
        const categoryData = {
          userId: window.FurnostylesUnifiedDashboard.currentUser?.uid,
          category: category,
          timestamp: new Date().toISOString(),
          sessionId: sessionStorage.getItem('fns_session_id')
        };
        this.saveMarketingEvent('category_view', categoryData);
      };

      // Generate session ID
      this.generateSessionId = function() {
        const sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('fns_session_id', sessionId);
        return sessionId;
      };

      // Save marketing event to localStorage (demo - would go to analytics backend)
      this.saveMarketingEvent = function(eventType, data) {
        const events = JSON.parse(localStorage.getItem('fns_marketing_events') || '[]');
        events.push({ type: eventType, data: data });
        localStorage.setItem('fns_marketing_events', JSON.stringify(events.slice(-1000))); // Keep last 1000 events
      };
    },

    // Switch between roles
    switchRole: function(newRole) {
      if (!this.availableRoles.includes(newRole)) {
        alert('You do not have access to this role');
        return;
      }

      this.currentRole = newRole;
      this.currentUser.activeRole = newRole;
      localStorage.setItem('fns_local_user', JSON.stringify(this.currentUser));
      
      // Track role switch for marketing
      this.marketingHooks.trackRoleSwitch = function(fromRole, toRole) {
        const switchData = {
          userId: window.FurnostylesUnifiedDashboard.currentUser?.uid,
          fromRole: fromRole,
          toRole: toRole,
          timestamp: new Date().toISOString()
        };
        this.saveMarketingEvent('role_switch', switchData);
      };
      this.marketingHooks.trackRoleSwitch(this.currentUser.activeRole, newRole);

      this.renderDashboard();
    },

    // Render dashboard based on current role
    renderDashboard: function() {
      const dashboardContainer = document.getElementById('unified-dashboard-container');
      if (!dashboardContainer) return;

      let html = '';

      // Role switcher
      html += this.renderRoleSwitcher();

      // Dashboard content based on role
      switch (this.currentRole) {
        case 'customer':
          html += this.renderCustomerDashboard();
          break;
        case 'vendor':
        case 'provider':
          html += this.renderVendorDashboard();
          break;
        case 'admin':
          html += this.renderAdminDashboard();
          break;
        default:
          html += this.renderCustomerDashboard();
      }

      dashboardContainer.innerHTML = html;
    },

    // Render role switcher
    renderRoleSwitcher: function() {
      const roles = [
        { id: 'customer', name: 'Customer', icon: '🛒' },
        { id: 'vendor', name: 'Vendor', icon: '🏪' },
        { id: 'provider', name: 'Service Provider', icon: '🔧' },
        { id: 'admin', name: 'Admin', icon: '⚙️' }
      ];

      let html = `
        <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <div>
              <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #1a2540;">Welcome, ${this.currentUser?.displayName || 'User'}</h2>
              <p style="margin: 4px 0 0; color: #8090a0; font-size: 14px;">Switch between your roles seamlessly</p>
            </div>
            <div style="display: flex; gap: 8px;">
      `;

      roles.forEach(role => {
        const isActive = this.currentRole === role.id;
        const isAvailable = this.availableRoles.includes(role.id);
        
        html += `
          <button 
            onclick="window.FurnostylesUnifiedDashboard.switchRole('${role.id}')"
            style="
              padding: 10px 16px;
              border: 1.5px solid ${isActive ? '#c9a227' : isAvailable ? '#dce4f0' : '#e9ecef'};
              background: ${isActive ? '#c9a227' : isAvailable ? '#fff' : '#f8f9fa'};
              color: ${isActive ? '#fff' : isAvailable ? '#1a2540' : '#a0aabb'};
              border-radius: 8px;
              cursor: ${isAvailable ? 'pointer' : 'not-allowed'};
              font-size: 13px;
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 6px;
              transition: all 0.2s;
              opacity: ${isAvailable ? '1' : '0.5'};
            "
            ${!isAvailable ? 'disabled' : ''}
          >
            ${role.icon} ${role.name}
            ${isActive ? '✓' : ''}
          </button>
        `;
      });

      html += `
            </div>
          </div>
          <div style="display: flex; gap: 16px; padding-top: 16px; border-top: 1.5px solid #dce4f0;">
            <div style="flex: 1; text-align: center; padding: 12px; background: #f8f9fa; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: 700; color: #0b3b46;">${this.availableRoles.length}</div>
              <div style="font-size: 12px; color: #8090a0;">Active Roles</div>
            </div>
            <div style="flex: 1; text-align: center; padding: 12px; background: #f8f9fa; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: 700; color: #0b3b46;">${this.currentRole}</div>
              <div style="font-size: 12px; color: #8090a0;">Current Role</div>
            </div>
            <div style="flex: 1; text-align: center; padding: 12px; background: #f8f9fa; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: 700; color: #0b3b46;">1</div>
              <div style="font-size: 12px; color: #8090a0;">Account</div>
            </div>
          </div>
        </div>
      `;

      return html;
    },

    // Render customer dashboard
    renderCustomerDashboard: function() {
      return `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 24px;">
          ${this.renderDashboardCard('🛒', 'Shopping Cart', '12 items', 'KES 245,000', '#0b3b46', 'cart')}
          ${this.renderDashboardCard('📦', 'Orders', '5 active', '3 pending', '#c9a227', 'orders')}
          ${this.renderDashboardCard('❤️', 'Wishlist', '28 items', '4 price drops', '#dc3545', 'wishlist')}
          ${this.renderDashboardCard('📍', 'Addresses', '3 saved', 'Default: Nairobi', '#28a745', 'addresses')}
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 24px;">
          <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 24px;">
            <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1a2540;">Recent Orders</h3>
            ${this.renderRecentOrders()}
          </div>
          <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 24px;">
            <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1a2540;">Quick Actions</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button onclick="window.location.href='furniture-marketplace.html'" style="padding: 12px; background: #0b3b46; color: #fff; border: none; border-radius: 8px; cursor: pointer; text-align: left;">🛍️ Continue Shopping</button>
              <button onclick="window.location.href='cart.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🛒 View Cart</button>
              <button onclick="window.location.href='upload.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">📤 Sell Item</button>
              <button onclick="window.location.href='dropshipping-dashboard.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">📦 Dropshipping</button>
              <button onclick="window.location.href='services-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🔧 Services</button>
              <button onclick="window.location.href='realestate-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🏠 Real Estate</button>
              <button onclick="window.location.href='secondhand-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">♻️ Second Hand</button>
              <button onclick="window.location.href='sourcing-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🏗️ Sourcing</button>
              <button onclick="window.location.href='materials-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🧱 Materials</button>
              <button onclick="window.location.href='about.html'" style="padding: 12px; background: #c9a227; color: #fff; border: none; border-radius: 8px; cursor: pointer; text-align: left;">ℹ️ About Us</button>
            </div>
          </div>
        </div>

        <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 24px;">
          <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1a2540;">Marketplaces</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
            ${this.renderMarketplaceLinks()}
          </div>
        </div>
      `;
    },

    // Render vendor dashboard
    renderVendorDashboard: function() {
      return `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 24px;">
          ${this.renderDashboardCard('📦', 'Products', '45 listed', '12 active', '#0b3b46', 'products')}
          ${this.renderDashboardCard('💰', 'Earnings', 'KES 125,000', '+23% this month', '#28a745', 'earnings')}
          ${this.renderDashboardCard('📋', 'Orders', '28 pending', '15 shipped', '#c9a227', 'vendor-orders')}
          ${this.renderDashboardCard('⭐', 'Rating', '4.8/5.0', '142 reviews', '#ffc107', 'rating')}
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 24px;">
          <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 24px;">
            <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1a2540;">Sales Analytics</h3>
            <div style="height: 200px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #8090a0;">
              [Chart: Sales over last 30 days]
            </div>
          </div>
          <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 24px;">
            <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1a2540;">Quick Actions</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button onclick="window.location.href='upload.html'" style="padding: 12px; background: #0b3b46; color: #fff; border: none; border-radius: 8px; cursor: pointer; text-align: left;">📤 Add New Product</button>
              <button onclick="window.location.href='dropshipping-dashboard.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">📦 Dropshipping</button>
              <button onclick="window.location.href='furniture-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🛍️ Browse Market</button>
              <button onclick="window.location.href='services-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🔧 Services</button>
              <button onclick="window.location.href='materials-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🧱 Materials</button>
              <button onclick="window.location.href='sourcing-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🏗️ Sourcing</button>
              <button onclick="window.location.href='realestate-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🏠 Real Estate</button>
              <button onclick="window.location.href='secondhand-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">♻️ Second Hand</button>
            </div>
          </div>
        </div>

        <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 24px;">
          <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1a2540;">Recent Orders</h3>
          ${this.renderVendorOrders()}
        </div>
      `;
    },

    // Render admin dashboard
    renderAdminDashboard: function() {
      return `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 24px;">
          ${this.renderDashboardCard('👥', 'Users', '1,245 total', '89 new today', '#0b3b46', 'users')}
          ${this.renderDashboardCard('🏪', 'Vendors', '156 active', '23 pending', '#c9a227', 'vendors')}
          ${this.renderDashboardCard('💵', 'Revenue', 'KES 2.4M', '+18% this week', '#28a745', 'revenue')}
          ${this.renderDashboardCard('📊', 'Analytics', 'Real-time', 'Live data', '#17a2b8', 'analytics')}
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 24px;">
          <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 24px;">
            <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1a2540;">Platform Analytics</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 12px; color: #8090a0; margin-bottom: 4px;">Page Views</div>
                <div style="font-size: 24px; font-weight: 700; color: #0b3b46;">45,231</div>
              </div>
              <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 12px; color: #8090a0; margin-bottom: 4px;">Conversions</div>
                <div style="font-size: 24px; font-weight: 700; color: #28a745;">3.2%</div>
              </div>
              <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 12px; color: #8090a0; margin-bottom: 4px;">Avg Session</div>
                <div style="font-size: 24px; font-weight: 700; color: #c9a227;">4:32</div>
              </div>
              <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 12px; color: #8090a0; margin-bottom: 4px;">Bounce Rate</div>
                <div style="font-size: 24px; font-weight: 700; color: #dc3545;">32%</div>
              </div>
            </div>
          </div>
          <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 24px;">
            <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1a2540;">Admin Actions</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button onclick="window.location.href='furniture-marketplace.html'" style="padding: 12px; background: #0b3b46; color: #fff; border: none; border-radius: 8px; cursor: pointer; text-align: left;">🛍️ Browse Market</button>
              <button onclick="window.location.href='upload.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">📤 Add Product</button>
              <button onclick="window.location.href='dropshipping-dashboard.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">📦 Dropshipping</button>
              <button onclick="window.location.href='services-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🔧 Services</button>
              <button onclick="window.location.href='materials-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🧱 Materials</button>
              <button onclick="window.location.href='realestate-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🏠 Real Estate</button>
              <button onclick="window.location.href='secondhand-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">♻️ Second Hand</button>
              <button onclick="window.location.href='sourcing-marketplace.html'" style="padding: 12px; background: #fff; color: #1a2540; border: 1.5px solid #dce4f0; border-radius: 8px; cursor: pointer; text-align: left;">🏗️ Sourcing</button>
            </div>
          </div>
        </div>

        <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 24px;">
          <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1a2540;">Pending Vendor Approvals</h3>
          ${this.renderPendingVendors()}
        </div>
      `;
    },

    // Helper: Render dashboard card
    renderDashboardCard: function(icon, title, value, subtitle, color, id) {
      return `
        <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span style="font-size: 32px;">${icon}</span>
            <span style="font-size: 12px; color: ${color}; font-weight: 600; background: ${color}15; padding: 4px 12px; border-radius: 20px;">View All</span>
          </div>
          <div style="font-size: 28px; font-weight: 700; color: #1a2540; margin-bottom: 4px;">${value}</div>
          <div style="font-size: 13px; color: #8090a0;">${subtitle}</div>
        </div>
      `;
    },

    // Helper: Render recent orders
    renderRecentOrders: function() {
      const orders = [
        { id: 'ORD-001', product: 'Premium 3-Seater Sofa', status: 'Shipped', date: '2026-05-25', total: 'KES 95,000' },
        { id: 'ORD-002', product: 'King Size Bed', status: 'Processing', date: '2026-05-24', total: 'KES 75,000' },
        { id: 'ORD-003', product: 'Dining Table Set', status: 'Delivered', date: '2026-05-20', total: 'KES 45,000' }
      ];

      let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';
      orders.forEach(order => {
        const statusColor = order.status === 'Delivered' ? '#28a745' : order.status === 'Shipped' ? '#c9a227' : '#17a2b8';
        html += `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #f8f9fa; border-radius: 8px;">
            <div>
              <div style="font-size: 14px; font-weight: 600; color: #1a2540;">${order.product}</div>
              <div style="font-size: 12px; color: #8090a0;">${order.id} • ${order.date}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 14px; font-weight: 700; color: #0b3b46;">${order.total}</div>
              <div style="font-size: 12px; color: ${statusColor}; font-weight: 600;">${order.status}</div>
            </div>
          </div>
        `;
      });
      html += '</div>';
      return html;
    },

    // Helper: Render vendor orders
    renderVendorOrders: function() {
      const orders = [
        { id: 'V-ORD-001', customer: 'John Doe', product: 'Custom Sofa', status: 'New', total: 'KES 120,000' },
        { id: 'V-ORD-002', customer: 'Jane Smith', product: 'Dining Set', status: 'Processing', total: 'KES 85,000' },
        { id: 'V-ORD-003', customer: 'Mike Johnson', product: 'Office Desk', status: 'Shipped', total: 'KES 55,000' }
      ];

      let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';
      orders.forEach(order => {
        const statusColor = order.status === 'New' ? '#28a745' : order.status === 'Processing' ? '#c9a227' : '#17a2b8';
        html += `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #f8f9fa; border-radius: 8px;">
            <div>
              <div style="font-size: 14px; font-weight: 600; color: #1a2540;">${order.customer}</div>
              <div style="font-size: 12px; color: #8090a0;">${order.product} • ${order.id}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 14px; font-weight: 700; color: #0b3b46;">${order.total}</div>
              <div style="font-size: 12px; color: ${statusColor}; font-weight: 600;">${order.status}</div>
            </div>
          </div>
        `;
      });
      html += '</div>';
      return html;
    },

    // Helper: Render pending vendors
    renderPendingVendors: function() {
      const vendors = [
        { name: 'Premium Interiors Kenya', type: 'Furniture', applied: '2026-05-24', status: 'Pending Review' },
        { name: 'Elite Home Decor', type: 'Materials', applied: '2026-05-23', status: 'Documents Needed' },
        { name: 'Master Craftsmen', type: 'Services', applied: '2026-05-22', status: 'Pending Review' }
      ];

      let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';
      vendors.forEach(vendor => {
        html += `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #f8f9fa; border-radius: 8px;">
            <div>
              <div style="font-size: 14px; font-weight: 600; color: #1a2540;">${vendor.name}</div>
              <div style="font-size: 12px; color: #8090a0;">${vendor.type} • Applied: ${vendor.applied}</div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button style="padding: 8px 16px; background: #28a745; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Approve</button>
              <button style="padding: 8px 16px; background: #dc3545; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">Reject</button>
            </div>
          </div>
        `;
      });
      html += '</div>';
      return html;
    },

    // Helper: Render marketplace links
    renderMarketplaceLinks: function() {
      const marketplaces = [
        { name: 'Furniture Marketplace', icon: '🛋️', href: 'furniture-marketplace.html', color: '#0b3b46' },
        { name: 'Materials Marketplace', icon: '🧱', href: 'materials-marketplace.html', color: '#c9a227' },
        { name: 'Services Marketplace', icon: '🔧', href: 'services-marketplace.html', color: '#28a745' },
        { name: 'Real Estate Marketplace', icon: '🏠', href: 'realestate-marketplace.html', color: '#17a2b8' },
        { name: 'Second Hand Marketplace', icon: '♻️', href: 'secondhand-marketplace.html', color: '#6c757d' },
        { name: 'Sourcing Marketplace', icon: '🏗️', href: 'sourcing-marketplace.html', color: '#dc3545' }
      ];

      let html = '';
      marketplaces.forEach(mp => {
        html += `
          <a href="${mp.href}" style="display: flex; align-items: center; gap: 12px; padding: 16px; background: #f8f9fa; border: 1.5px solid #dce4f0; border-radius: 8px; text-decoration: none; transition: all 0.2s;" onmouseover="this.style.borderColor='${mp.color}'; this.style.background='${mp.color}15'" onmouseout="this.style.borderColor='#dce4f0'; this.style.background='#f8f9fa'">
            <span style="font-size: 28px;">${mp.icon}</span>
            <div>
              <div style="font-size: 14px; font-weight: 600; color: #1a2540;">${mp.name}</div>
              <div style="font-size: 12px; color: #8090a0;">Browse listings</div>
            </div>
          </a>
        `;
      });
      return html;
    },

    // Helper: Render recommended products
    renderRecommendedProducts: function() {
      const products = [
        { name: 'Luxury Velvet Sofa', price: 'KES 125,000', image: 'assets/images/sofa-1.jpg' },
        { name: 'King Size Bed', price: 'KES 75,000', image: 'assets/images/interior-bedroom.jpg' },
        { name: 'Dining Table Set', price: 'KES 45,000', image: 'assets/images/interior-living.jpg' },
        { name: 'Executive Desk', price: 'KES 55,000', image: 'assets/images/interior-office.jpg' }
      ];

      let html = '';
      products.forEach(product => {
        html += `
          <div style="border: 1.5px solid #dce4f0; border-radius: 8px; overflow: hidden; cursor: pointer;">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 120px; object-fit: cover;">
            <div style="padding: 12px;">
              <div style="font-size: 13px; font-weight: 600; color: #1a2540; margin-bottom: 4px;">${product.name}</div>
              <div style="font-size: 14px; font-weight: 700; color: #0b3b46;">${product.price}</div>
            </div>
          </div>
        `;
      });
      return html;
    },

    // Bind events
    bindEvents: function() {
      // Add event listeners for dashboard interactions
      document.addEventListener('click', (e) => {
        if (e.target.closest('[data-action]')) {
          const action = e.target.closest('[data-action]').dataset.action;
          this.handleDashboardAction(action);
        }
      });
    },

    // Handle dashboard actions
    handleDashboardAction: function(action) {
      switch (action) {
        case 'cart':
          window.location.href = 'cart.html';
          break;
        case 'orders':
          window.location.href = 'orders.html';
          break;
        case 'wishlist':
          window.location.href = 'wishlist.html';
          break;
        case 'products':
          window.location.href = 'vendor/product-upload.html';
          break;
        default:
          console.log('Action:', action);
      }
    }
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    if (window.FurnostylesUnifiedDashboard) {
      window.FurnostylesUnifiedDashboard.init();
    }
  });

})();
