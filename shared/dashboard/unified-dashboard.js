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
        <div class="fns-role-switcher">
          <div class="fns-role-switcher-header">
            <div class="fns-role-switcher-title">
              <h2>Welcome, ${this.currentUser?.displayName || 'User'}</h2>
              <p>Switch between your roles seamlessly</p>
            </div>
            <div class="fns-role-buttons">
      `;

      roles.forEach(role => {
        const isActive = this.currentRole === role.id;
        const isAvailable = this.availableRoles.includes(role.id);
        
        html += `
          <button 
            class="fns-role-btn ${isActive ? 'active' : ''}"
            onclick="window.FurnostylesUnifiedDashboard.switchRole('${role.id}')"
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
          <div class="fns-role-stats">
            <div class="fns-role-stat">
              <div class="fns-role-stat-value">${this.availableRoles.length}</div>
              <div class="fns-role-stat-label">Active Roles</div>
            </div>
            <div class="fns-role-stat">
              <div class="fns-role-stat-value">${this.currentRole}</div>
              <div class="fns-role-stat-label">Current Role</div>
            </div>
            <div class="fns-role-stat">
              <div class="fns-role-stat-value">1</div>
              <div class="fns-role-stat-label">Account</div>
            </div>
          </div>
        </div>
      `;

      return html;
    },

    // Render customer dashboard
    renderCustomerDashboard: function() {
      // Get real data from localStorage
      const cart = JSON.parse(localStorage.getItem('fns_shopping_cart') || localStorage.getItem('furnostyles_cart') || '[]');
      const wishlist = JSON.parse(localStorage.getItem('fns_wishlist') || '[]');
      const uploads = JSON.parse(localStorage.getItem('fns_uploads') || '[]');
      
      const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      const cartTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      
      return `
        <div class="fns-dashboard-grid">
          ${this.renderDashboardCard('🛒', 'Shopping Cart', cartCount + ' items', 'KES ' + cartTotal.toLocaleString(), '#0b3b46', 'cart')}
          ${this.renderDashboardCard('📦', 'My Uploads', uploads.length + ' items', 'Active listings', '#c9a227', 'uploads')}
          ${this.renderDashboardCard('❤️', 'Wishlist', wishlist.length + ' items', 'Saved items', '#dc3545', 'wishlist')}
          ${this.renderDashboardCard('📍', 'Location', 'Nairobi', 'Default location', '#28a745', 'location')}
        </div>

        <div class="fns-content-grid">
          <div class="fns-dashboard-panel">
            <h3>My Uploads</h3>
            ${this.renderMyUploadsList(uploads)}
          </div>
          <div class="fns-dashboard-panel">
            <h3>Quick Actions</h3>
            <div class="fns-quick-actions">
              <button onclick="window.location.href='furniture-marketplace.html'" class="fns-quick-action-btn primary">🛍️ Continue Shopping</button>
              <button onclick="window.location.href='cart.html'" class="fns-quick-action-btn">🛒 View Cart</button>
              <button onclick="window.location.href='upload.html'" class="fns-quick-action-btn">📤 Sell Item</button>
              <button onclick="window.location.href='dropshipping-dashboard.html'" class="fns-quick-action-btn">📦 Dropshipping</button>
              <button onclick="window.location.href='services-marketplace.html'" class="fns-quick-action-btn">🔧 Services</button>
              <button onclick="window.location.href='realestate-marketplace.html'" class="fns-quick-action-btn">🏠 Real Estate</button>
              <button onclick="window.location.href='secondhand-marketplace.html'" class="fns-quick-action-btn">♻️ Second Hand</button>
              <button onclick="window.location.href='sourcing-marketplace.html'" class="fns-quick-action-btn">🏗️ Sourcing</button>
              <button onclick="window.location.href='materials-marketplace.html'" class="fns-quick-action-btn">🧱 Materials</button>
              <button onclick="window.location.href='about.html'" class="fns-quick-action-btn gold">ℹ️ About Us</button>
            </div>
          </div>
        </div>

        <div class="fns-dashboard-panel">
          <h3>Marketplaces</h3>
          <div class="fns-marketplace-grid">
            ${this.renderMarketplaceLinks()}
          </div>
        </div>
      `;
    },

    // Render vendor dashboard
    renderVendorDashboard: function() {
      return `
        <div class="fns-dashboard-grid">
          ${this.renderDashboardCard('📦', 'Products', '45 listed', '12 active', '#0b3b46', 'products')}
          ${this.renderDashboardCard('💰', 'Earnings', 'KES 125,000', '+23% this month', '#28a745', 'earnings')}
          ${this.renderDashboardCard('📋', 'Orders', '28 pending', '15 shipped', '#c9a227', 'vendor-orders')}
          ${this.renderDashboardCard('⭐', 'Rating', '4.8/5.0', '142 reviews', '#ffc107', 'rating')}
        </div>

        <div class="fns-content-grid">
          <div class="fns-dashboard-panel">
            <h3>Sales Analytics</h3>
            <div class="fns-chart-placeholder">
              [Chart: Sales over last 30 days]
            </div>
          </div>
          <div class="fns-dashboard-panel">
            <h3>Quick Actions</h3>
            <div class="fns-quick-actions">
              <button onclick="window.location.href='upload.html'" class="fns-quick-action-btn primary">📤 Add New Product</button>
              <button onclick="window.location.href='dropshipping-dashboard.html'" class="fns-quick-action-btn">📦 Dropshipping</button>
              <button onclick="window.location.href='furniture-marketplace.html'" class="fns-quick-action-btn">🛍️ Browse Market</button>
              <button onclick="window.location.href='services-marketplace.html'" class="fns-quick-action-btn">🔧 Services</button>
              <button onclick="window.location.href='materials-marketplace.html'" class="fns-quick-action-btn">🧱 Materials</button>
              <button onclick="window.location.href='sourcing-marketplace.html'" class="fns-quick-action-btn">🏗️ Sourcing</button>
              <button onclick="window.location.href='realestate-marketplace.html'" class="fns-quick-action-btn">🏠 Real Estate</button>
              <button onclick="window.location.href='secondhand-marketplace.html'" class="fns-quick-action-btn">♻️ Second Hand</button>
            </div>
          </div>
        </div>

        <div class="fns-dashboard-panel">
          <h3>Recent Orders</h3>
          ${this.renderVendorOrders()}
        </div>
      `;
    },

    // Render admin dashboard
    renderAdminDashboard: function() {
      return `
        <div class="fns-dashboard-grid">
          ${this.renderDashboardCard('👥', 'Users', '1,245 total', '89 new today', '#0b3b46', 'users')}
          ${this.renderDashboardCard('🏪', 'Vendors', '156 active', '23 pending', '#c9a227', 'vendors')}
          ${this.renderDashboardCard('💵', 'Revenue', 'KES 2.4M', '+18% this week', '#28a745', 'revenue')}
          ${this.renderDashboardCard('📊', 'Analytics', 'Real-time', 'Live data', '#17a2b8', 'analytics')}
        </div>

        <div class="fns-content-grid">
          <div class="fns-dashboard-panel">
            <h3>Platform Analytics</h3>
            <div class="fns-analytics-grid">
              <div class="fns-analytics-item">
                <div class="fns-analytics-item-label">Page Views</div>
                <div class="fns-analytics-item-value">45,231</div>
              </div>
              <div class="fns-analytics-item">
                <div class="fns-analytics-item-label">Conversions</div>
                <div class="fns-analytics-item-value">3.2%</div>
              </div>
              <div class="fns-analytics-item">
                <div class="fns-analytics-item-label">Avg Session</div>
                <div class="fns-analytics-item-value">4:32</div>
              </div>
              <div class="fns-analytics-item">
                <div class="fns-analytics-item-label">Bounce Rate</div>
                <div class="fns-analytics-item-value">32%</div>
              </div>
            </div>
          </div>
          <div class="fns-dashboard-panel">
            <h3>Admin Actions</h3>
            <div class="fns-quick-actions">
              <button onclick="window.location.href='furniture-marketplace.html'" class="fns-quick-action-btn primary">🛍️ Browse Market</button>
              <button onclick="window.location.href='upload.html'" class="fns-quick-action-btn">📤 Add Product</button>
              <button onclick="window.location.href='dropshipping-dashboard.html'" class="fns-quick-action-btn">📦 Dropshipping</button>
              <button onclick="window.location.href='services-marketplace.html'" class="fns-quick-action-btn">🔧 Services</button>
              <button onclick="window.location.href='materials-marketplace.html'" class="fns-quick-action-btn">🧱 Materials</button>
              <button onclick="window.location.href='realestate-marketplace.html'" class="fns-quick-action-btn">🏠 Real Estate</button>
              <button onclick="window.location.href='secondhand-marketplace.html'" class="fns-quick-action-btn">♻️ Second Hand</button>
              <button onclick="window.location.href='sourcing-marketplace.html'" class="fns-quick-action-btn">🏗️ Sourcing</button>
            </div>
          </div>
        </div>

        <div class="fns-dashboard-panel">
          <h3>Pending Vendor Approvals</h3>
          ${this.renderPendingVendors()}
        </div>
      `;
    },

    // Helper: Render dashboard card
    renderDashboardCard: function(icon, title, value, subtitle, color, id) {
      return `
        <div class="fns-dashboard-card">
          <div class="fns-dashboard-card-header">
            <span class="fns-dashboard-card-icon">${icon}</span>
            <span class="fns-dashboard-card-badge" style="color: ${color}; background: ${color}15;">View All</span>
          </div>
          <div class="fns-dashboard-card-value">${value}</div>
          <div class="fns-dashboard-card-subtitle">${subtitle}</div>
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

      let html = '<div class="fns-orders-list">';
      orders.forEach(order => {
        const statusClass = order.status === 'Delivered' ? 'delivered' : order.status === 'Shipped' ? 'shipped' : 'processing';
        html += `
          <div class="fns-order-item">
            <div class="fns-order-item-info">
              <div class="fns-order-item-info-title">${order.product}</div>
              <div class="fns-order-item-info-meta">${order.id} • ${order.date}</div>
            </div>
            <div style="text-align: right;">
              <div class="fns-order-item-price">${order.total}</div>
              <div class="fns-order-item-status ${statusClass}">${order.status}</div>
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

      let html = '<div class="fns-orders-list">';
      orders.forEach(order => {
        const statusClass = order.status === 'New' ? 'new' : order.status === 'Processing' ? 'shipped' : 'shipped';
        html += `
          <div class="fns-order-item">
            <div class="fns-order-item-info">
              <div class="fns-order-item-info-title">${order.customer}</div>
              <div class="fns-order-item-info-meta">${order.product} • ${order.id}</div>
            </div>
            <div style="text-align: right;">
              <div class="fns-order-item-price">${order.total}</div>
              <div class="fns-order-item-status ${statusClass}">${order.status}</div>
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

      let html = '<div class="fns-orders-list">';
      vendors.forEach(vendor => {
        html += `
          <div class="fns-vendor-item">
            <div class="fns-vendor-item-info">
              <div class="fns-vendor-item-info-name">${vendor.name}</div>
              <div class="fns-vendor-item-info-meta">${vendor.type} • Applied: ${vendor.applied}</div>
            </div>
            <div class="fns-vendor-actions">
              <button class="fns-vendor-action-btn approve">Approve</button>
              <button class="fns-vendor-action-btn reject">Reject</button>
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
          <a href="${mp.href}" class="fns-marketplace-link" style="--mp-color: ${mp.color}">
            <span class="fns-marketplace-icon">${mp.icon}</span>
            <div class="fns-marketplace-info">
              <div class="fns-marketplace-info-title">${mp.name}</div>
              <div class="fns-marketplace-info-subtitle">Browse listings</div>
            </div>
          </a>
        `;
      });
      return html;
    },

    // Helper: Render my uploads list
    renderMyUploadsList: function(uploads) {
      if (!uploads || uploads.length === 0) {
        return `
          <div class="fns-uploads-empty">
            <div class="fns-uploads-empty-icon">📦</div>
            <p>No uploads yet</p>
            <button onclick="window.location.href='upload.html'" class="fns-uploads-empty-btn">Upload Item</button>
          </div>
        `;
      }

      let html = '<div class="fns-uploads-list">';
      uploads.slice(0, 5).forEach(upload => {
        const image = upload.images && upload.images[0] ? upload.images[0] : 'assets/images/default-product.jpg';
        const statusClass = upload.status === 'active' ? 'active' : 'pending';
        html += `
          <div class="fns-upload-item">
            <img src="${image}" alt="${upload.title}" class="fns-upload-item-image">
            <div class="fns-upload-item-content">
              <div class="fns-upload-item-title">${upload.title}</div>
              <div class="fns-upload-item-price">KES ${upload.price.toLocaleString()}</div>
              <div class="fns-upload-item-meta">${upload.type} • ${upload.category}</div>
            </div>
            <div style="text-align: right;">
              <span class="fns-upload-item-status ${statusClass}">${upload.status}</span>
            </div>
          </div>
        `;
      });
      
      if (uploads.length > 5) {
        html += `<button onclick="window.location.href='upload.html'" class="fns-quick-action-btn" style="margin-top: 8px;">View all ${uploads.length} uploads</button>`;
      }
      
      html += '</div>';
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
