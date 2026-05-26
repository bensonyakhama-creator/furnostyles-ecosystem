/**
 * Furnostyles Complete Dashboard Logic
 * Handles all dashboard functionality
 */

(function() {
  'use strict';

  // Dashboard State
  const DashboardState = {
    currentUser: null,
    orders: [],
    wishlist: [],
    addresses: [],
    payments: [],
    messages: [],
    reviews: [],
    uploads: [],
    tickets: [],
    currentTab: 'overview',
    currentFilter: 'all'
  };

  // Initialize Dashboard
  function initDashboard() {
    // Check authentication
    const userSession = localStorage.getItem('fns_local_user') || 
                       localStorage.getItem('furnostyles_user');
    
    if (!userSession) {
      window.location.href = 'login.html';
      return;
    }

    // Load user data
    try {
      DashboardState.currentUser = JSON.parse(userSession);
    } catch (e) {
      console.error('Failed to parse user session:', e);
      window.location.href = 'login.html';
      return;
    }

    // Load all data
    loadAllData();

    // Update UI
    updateUserInfo();
    updateStats();
    renderRecentOrders();
    renderAllOrders();
    renderWishlist();
    renderAddresses();
    renderPayments();
    renderMessages();
    renderReviews();
    renderUploads();
    renderTickets();

    // Setup event listeners
    setupEventListeners();

    console.log('Dashboard initialized');
  }

  // Load All Data from localStorage
  function loadAllData() {
    // Orders
    DashboardState.orders = JSON.parse(localStorage.getItem('fns_orders') || '[]');
    
    // Wishlist
    DashboardState.wishlist = JSON.parse(localStorage.getItem('fns_wishlist') || '[]');
    
    // Addresses
    DashboardState.addresses = JSON.parse(localStorage.getItem('fns_addresses') || '[]');
    
    // Payments
    DashboardState.payments = JSON.parse(localStorage.getItem('fns_payments') || '[]');
    
    // Messages
    DashboardState.messages = JSON.parse(localStorage.getItem('fns_messages') || '[]');
    
    // Reviews
    DashboardState.reviews = JSON.parse(localStorage.getItem('fns_reviews') || '[]');
    
    // Uploads
    DashboardState.uploads = JSON.parse(localStorage.getItem('fns_uploads') || '[]');
    
    // Tickets
    DashboardState.tickets = JSON.parse(localStorage.getItem('fns_tickets') || '[]');
  }

  // Update User Info in Sidebar
  function updateUserInfo() {
    const user = DashboardState.currentUser;
    const avatar = document.getElementById('fnsUserAvatar');
    const name = document.getElementById('fnsUserName');
    const email = document.getElementById('fnsUserEmail');

    if (avatar && user) {
      const initials = getInitials(user.fullName || user.email || 'User');
      avatar.textContent = initials;
    }

    if (name && user) {
      name.textContent = user.fullName || user.displayName || 'User';
    }

    if (email && user) {
      email.textContent = user.email || 'user@example.com';
    }
  }

  // Get Initials from Name
  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  // Update Stats on Overview
  function updateStats() {
    document.getElementById('fnsStatOrders').textContent = DashboardState.orders.length;
    document.getElementById('fnsStatWishlist').textContent = DashboardState.wishlist.length;
    document.getElementById('fnsStatAddresses').textContent = DashboardState.addresses.length;
    document.getElementById('fnsStatUploads').textContent = DashboardState.uploads.length;

    // Update badges
    document.getElementById('fnsOrderCount').textContent = DashboardState.orders.length;
    document.getElementById('fnsWishlistCount').textContent = DashboardState.wishlist.length;
    document.getElementById('fnsMessageCount').textContent = DashboardState.messages.filter(m => !m.read).length;

    // Update cart count in header
    updateCartCount();
  }

  // Update Cart Count in Header
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('fns_shopping_cart') || 
                        localStorage.getItem('furnostyles_cart') || '[]');
    const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    // Update floating cart badge
    const cartBadge = document.querySelector('[data-cart-count]');
    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.style.display = cartCount > 0 ? 'inline' : 'none';
    }

    // Update header cart icon badge if it exists
    const headerCartBtn = document.getElementById('fldCartBtn');
    if (headerCartBtn && cartCount > 0) {
      if (!headerCartBtn.querySelector('.cart-badge')) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = cartCount;
        headerCartBtn.appendChild(badge);
      } else {
        headerCartBtn.querySelector('.cart-badge').textContent = cartCount;
      }
    }
  }

  // Render Recent Orders
  function renderRecentOrders() {
    const container = document.getElementById('fnsRecentOrders');
    if (!container) return;

    const recentOrders = DashboardState.orders.slice(0, 3);

    if (recentOrders.length === 0) {
      container.innerHTML = '<div class="fns-empty-state">No recent orders</div>';
      return;
    }

    container.innerHTML = recentOrders.map(order => renderOrderItem(order)).join('');
  }

  // Render All Orders
  function renderAllOrders() {
    const container = document.getElementById('fnsAllOrders');
    if (!container) return;

    let filteredOrders = DashboardState.orders;

    if (DashboardState.currentFilter !== 'all') {
      filteredOrders = DashboardState.orders.filter(order => 
        order.status.toLowerCase() === DashboardState.currentFilter
      );
    }

    if (filteredOrders.length === 0) {
      container.innerHTML = '<div class="fns-empty-state">No orders found</div>';
      return;
    }

    container.innerHTML = filteredOrders.map(order => renderOrderItem(order)).join('');
  }

  // Render Single Order Item
  function renderOrderItem(order) {
    const statusClass = order.status.toLowerCase();
    return `
      <div class="fns-order-item">
        <img src="${order.image || 'assets/images/default-product.jpg'}" alt="${order.title}" class="fns-order-image">
        <div class="fns-order-details">
          <div class="fns-order-id">Order #${order.id}</div>
          <div class="fns-order-title">${order.title}</div>
          <div class="fns-order-meta">
            <span>${order.date}</span>
            <span>•</span>
            <span>${order.quantity} item(s)</span>
          </div>
        </div>
        <div class="fns-order-status ${statusClass}">${order.status}</div>
        <div class="fns-order-price">KES ${order.total.toLocaleString()}</div>
      </div>
    `;
  }

  // Render Wishlist
  function renderWishlist() {
    const container = document.getElementById('fnsWishlistGrid');
    if (!container) return;

    if (DashboardState.wishlist.length === 0) {
      container.innerHTML = '<div class="fns-empty-state">Your wishlist is empty</div>';
      return;
    }

    container.innerHTML = DashboardState.wishlist.map(item => `
      <div class="fns-wishlist-item">
        <img src="${item.image || 'assets/images/default-product.jpg'}" alt="${item.title}" class="fns-wishlist-image">
        <div class="fns-wishlist-details">
          <div class="fns-wishlist-title">${item.title}</div>
          <div class="fns-wishlist-price">KES ${item.price.toLocaleString()}</div>
          <div class="fns-wishlist-actions">
            <button class="fns-wishlist-btn primary" onclick="addToCart('${item.id}')">Add to Cart</button>
            <button class="fns-wishlist-btn secondary" onclick="removeFromWishlist('${item.id}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Addresses
  function renderAddresses() {
    const container = document.getElementById('fnsAddressesList');
    if (!container) return;

    if (DashboardState.addresses.length === 0) {
      container.innerHTML = '<div class="fns-empty-state">No addresses saved</div>';
      return;
    }

    container.innerHTML = DashboardState.addresses.map((address, index) => `
      <div class="fns-address-card ${address.default ? 'default' : ''}">
        ${address.default ? '<span class="fns-address-badge">Default</span>' : ''}
        <div class="fns-address-name">${address.name}</div>
        <div class="fns-address-text">${address.address}, ${address.city}, ${address.country}</div>
        <div class="fns-address-phone">${address.phone}</div>
        <div class="fns-address-actions">
          <button class="fns-address-btn" onclick="editAddress(${index})">Edit</button>
          <button class="fns-address-btn" onclick="setDefaultAddress(${index})">Set Default</button>
          <button class="fns-address-btn" onclick="deleteAddress(${index})">Delete</button>
        </div>
      </div>
    `).join('');
  }

  // Render Payments
  function renderPayments() {
    const container = document.getElementById('fnsPaymentsList');
    if (!container) return;

    if (DashboardState.payments.length === 0) {
      container.innerHTML = '<div class="fns-empty-state">No payment methods saved</div>';
      return;
    }

    container.innerHTML = DashboardState.payments.map((payment, index) => `
      <div class="fns-payment-card">
        <div class="fns-payment-icon">${payment.type === 'card' ? '💳' : payment.type === 'mpesa' ? '📱' : '🏦'}</div>
        <div class="fns-payment-details">
          <div class="fns-payment-type">${payment.type === 'card' ? 'Credit Card' : payment.type === 'mpesa' ? 'M-Pesa' : 'Bank Transfer'}</div>
          <div class="fns-payment-number">${payment.number || payment.account}</div>
        </div>
        ${payment.default ? '<span class="fns-payment-default">Default</span>' : ''}
        <div class="fns-payment-actions">
          <button class="fns-address-btn" onclick="setDefaultPayment(${index})">Set Default</button>
          <button class="fns-address-btn" onclick="deletePayment(${index})">Remove</button>
        </div>
      </div>
    `).join('');
  }

  // Render Messages
  function renderMessages() {
    const container = document.getElementById('fnsMessagesList');
    if (!container) return;

    if (DashboardState.messages.length === 0) {
      container.innerHTML = '<div class="fns-empty-state">No messages</div>';
      return;
    }

    container.innerHTML = DashboardState.messages.map((message, index) => `
      <div class="fns-message-item ${!message.read ? 'unread' : ''}" onclick="openMessage(${index})">
        <div class="fns-message-avatar">${message.sender[0]}</div>
        <div class="fns-message-details">
          <div class="fns-message-sender">${message.sender}</div>
          <div class="fns-message-subject">${message.subject}</div>
          <div class="fns-message-time">${message.time}</div>
        </div>
        ${!message.read ? '<div class="fns-message-badge"></div>' : ''}
      </div>
    `).join('');
  }

  // Render Reviews
  function renderReviews() {
    const container = document.getElementById('fnsReviewsList');
    if (!container) return;

    if (DashboardState.reviews.length === 0) {
      container.innerHTML = '<div class="fns-empty-state">No reviews yet</div>';
      return;
    }

    container.innerHTML = DashboardState.reviews.map((review, index) => `
      <div class="fns-review-item">
        <div class="fns-review-header">
          <div class="fns-review-product">${review.product}</div>
          <div class="fns-review-rating">${'⭐'.repeat(review.rating)}</div>
          <div class="fns-review-date">${review.date}</div>
        </div>
        <div class="fns-review-text">${review.text}</div>
        <div class="fns-review-actions">
          <button class="fns-address-btn" onclick="editReview(${index})">Edit</button>
          <button class="fns-address-btn" onclick="deleteReview(${index})">Delete</button>
        </div>
      </div>
    `).join('');
  }

  // Render Uploads
  function renderUploads() {
    const container = document.getElementById('fnsUploadsList');
    if (!container) return;

    if (DashboardState.uploads.length === 0) {
      container.innerHTML = '<div class="fns-empty-state">No uploads yet</div>';
      return;
    }

    container.innerHTML = DashboardState.uploads.map((upload, index) => `
      <div class="fns-upload-item">
        <img src="${upload.images && upload.images[0] ? upload.images[0] : 'assets/images/default-product.jpg'}" alt="${upload.title}" class="fns-upload-image">
        <div class="fns-upload-details">
          <div class="fns-upload-title">${upload.title}</div>
          <div class="fns-upload-price">KES ${upload.price.toLocaleString()}</div>
          <span class="fns-upload-status ${upload.status || 'pending'}">${upload.status || 'Pending'}</span>
          <div class="fns-upload-actions">
            <button class="fns-address-btn" onclick="editUpload(${index})">Edit</button>
            <button class="fns-address-btn" onclick="deleteUpload(${index})">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Support Tickets
  function renderTickets() {
    const container = document.getElementById('fnsTicketsList');
    if (!container) return;

    if (DashboardState.tickets.length === 0) {
      container.innerHTML = '<div class="fns-empty-state">No support tickets</div>';
      return;
    }

    container.innerHTML = DashboardState.tickets.map((ticket, index) => `
      <div class="fns-ticket-item">
        <div class="fns-ticket-details">
          <div class="fns-ticket-id">Ticket #${ticket.id}</div>
          <div class="fns-ticket-subject">${ticket.subject}</div>
          <div class="fns-ticket-status ${ticket.status.toLowerCase()}">${ticket.status}</div>
        </div>
        <div class="fns-ticket-actions">
          <button class="fns-address-btn" onclick="viewTicket(${index})">View</button>
        </div>
      </div>
    `).join('');
  }

  // Setup Event Listeners
  function setupEventListeners() {
    // Tab Navigation
    document.querySelectorAll('.fns-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.dataset.tab;
        switchTab(tab);
      });
    });

    // Order Filters
    document.querySelectorAll('.fns-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.fns-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        DashboardState.currentFilter = btn.dataset.filter;
        renderAllOrders();
      });
    });

    // Profile Form
    const profileForm = document.getElementById('fnsProfileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProfile();
      });
    }

    // Password Form
    const passwordForm = document.getElementById('fnsPasswordForm');
    if (passwordForm) {
      passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        changePassword();
      });
    }

    // Add Address Button
    const addAddressBtn = document.getElementById('fnsAddAddressBtn');
    if (addAddressBtn) {
      addAddressBtn.addEventListener('click', addAddress);
    }

    // Add Payment Button
    const addPaymentBtn = document.getElementById('fnsAddPaymentBtn');
    if (addPaymentBtn) {
      addPaymentBtn.addEventListener('click', addPayment);
    }

    // New Ticket Button
    const newTicketBtn = document.getElementById('fnsNewTicketBtn');
    if (newTicketBtn) {
      newTicketBtn.addEventListener('click', createTicket);
    }

    // Delete Account Button
    const deleteAccountBtn = document.getElementById('fnsDeleteAccountBtn');
    if (deleteAccountBtn) {
      deleteAccountBtn.addEventListener('click', deleteAccount);
    }
  }

  // Switch Tab
  function switchTab(tabName) {
    // Update navigation
    document.querySelectorAll('.fns-nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.tab === tabName) {
        item.classList.add('active');
      }
    });

    // Update content
    document.querySelectorAll('.fns-tab-content').forEach(content => {
      content.classList.remove('active');
    });

    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) {
      targetTab.classList.add('active');
    }

    DashboardState.currentTab = tabName;
  }

  // Save Profile
  function saveProfile() {
    const fullName = document.getElementById('fnsFullName').value;
    const email = document.getElementById('fnsEmail').value;
    const phone = document.getElementById('fnsPhone').value;

    if (!fullName || !email) {
      alert('Please fill in all required fields');
      return;
    }

    DashboardState.currentUser.fullName = fullName;
    DashboardState.currentUser.email = email;
    DashboardState.currentUser.phone = phone;

    localStorage.setItem('fns_local_user', JSON.stringify(DashboardState.currentUser));
    updateUserInfo();

    alert('Profile updated successfully!');
  }

  // Change Password
  function changePassword() {
    const currentPassword = document.getElementById('fnsCurrentPassword').value;
    const newPassword = document.getElementById('fnsNewPassword').value;
    const confirmPassword = document.getElementById('fnsConfirmPassword').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // In a real app, this would verify with the backend
    alert('Password changed successfully!');
    
    // Clear form
    document.getElementById('fnsPasswordForm').reset();
  }

  // Add Address
  function addAddress() {
    const name = prompt('Enter address name (e.g., Home, Office):');
    if (!name) return;

    const address = prompt('Enter street address:');
    if (!address) return;

    const city = prompt('Enter city:');
    if (!city) return;

    const country = prompt('Enter country:');
    if (!country) return;

    const phone = prompt('Enter phone number:');
    if (!phone) return;

    const newAddress = {
      name,
      address,
      city,
      country,
      phone,
      default: DashboardState.addresses.length === 0
    };

    DashboardState.addresses.push(newAddress);
    localStorage.setItem('fns_addresses', JSON.stringify(DashboardState.addresses));
    renderAddresses();
    updateStats();

    alert('Address added successfully!');
  }

  // Set Default Address
  function setDefaultAddress(index) {
    DashboardState.addresses.forEach((addr, i) => {
      addr.default = i === index;
    });
    localStorage.setItem('fns_addresses', JSON.stringify(DashboardState.addresses));
    renderAddresses();
  }

  // Delete Address
  function deleteAddress(index) {
    if (!confirm('Are you sure you want to delete this address?')) return;

    DashboardState.addresses.splice(index, 1);
    localStorage.setItem('fns_addresses', JSON.stringify(DashboardState.addresses));
    renderAddresses();
    updateStats();
  }

  // Add Payment Method
  function addPayment() {
    const type = prompt('Enter payment type (card/mpesa/bank):');
    if (!type) return;

    const number = prompt('Enter card number/account:');
    if (!number) return;

    const newPayment = {
      type,
      number,
      default: DashboardState.payments.length === 0
    };

    DashboardState.payments.push(newPayment);
    localStorage.setItem('fns_payments', JSON.stringify(DashboardState.payments));
    renderPayments();

    alert('Payment method added successfully!');
  }

  // Set Default Payment
  function setDefaultPayment(index) {
    DashboardState.payments.forEach((payment, i) => {
      payment.default = i === index;
    });
    localStorage.setItem('fns_payments', JSON.stringify(DashboardState.payments));
    renderPayments();
  }

  // Delete Payment
  function deletePayment(index) {
    if (!confirm('Are you sure you want to remove this payment method?')) return;

    DashboardState.payments.splice(index, 1);
    localStorage.setItem('fns_payments', JSON.stringify(DashboardState.payments));
    renderPayments();
  }

  // Create Support Ticket
  function createTicket() {
    const subject = prompt('Enter ticket subject:');
    if (!subject) return;

    const description = prompt('Describe your issue:');
    if (!description) return;

    const newTicket = {
      id: Date.now(),
      subject,
      description,
      status: 'Open',
      createdAt: new Date().toISOString()
    };

    DashboardState.tickets.push(newTicket);
    localStorage.setItem('fns_tickets', JSON.stringify(DashboardState.tickets));
    renderTickets();

    alert('Support ticket created successfully!');
  }

  // Delete Account
  function deleteAccount() {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;

    if (!confirm('This will permanently delete all your data. Are you absolutely sure?')) return;

    // Clear all data
    localStorage.removeItem('fns_local_user');
    localStorage.removeItem('fns_orders');
    localStorage.removeItem('fns_wishlist');
    localStorage.removeItem('fns_addresses');
    localStorage.removeItem('fns_payments');
    localStorage.removeItem('fns_messages');
    localStorage.removeItem('fns_reviews');
    localStorage.removeItem('fns_uploads');
    localStorage.removeItem('fns_tickets');

    alert('Account deleted successfully');
    window.location.href = 'index.html';
  }

  // Global functions for inline onclick handlers
  window.addToCart = function(id) {
    const item = DashboardState.wishlist.find(w => w.id === id);
    if (item) {
      const cart = JSON.parse(localStorage.getItem('fns_shopping_cart') || 
                          localStorage.getItem('furnostyles_cart') || '[]');
      const existing = cart.find(c => c.id === id);
      
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: 1
        });
      }
      
      localStorage.setItem('fns_shopping_cart', JSON.stringify(cart));
      localStorage.setItem('furnostyles_cart', JSON.stringify(cart));
      alert('Added to cart!');
    }
  };

  window.removeFromWishlist = function(id) {
    DashboardState.wishlist = DashboardState.wishlist.filter(w => w.id !== id);
    localStorage.setItem('fns_wishlist', JSON.stringify(DashboardState.wishlist));
    renderWishlist();
    updateStats();
  };

  window.editAddress = function(index) {
    alert('Edit address functionality - implement modal for editing');
  };

  window.setDefaultAddress = setDefaultAddress;
  window.deleteAddress = deleteAddress;

  window.setDefaultPayment = setDefaultPayment;
  window.deletePayment = deletePayment;

  window.openMessage = function(index) {
    DashboardState.messages[index].read = true;
    localStorage.setItem('fns_messages', JSON.stringify(DashboardState.messages));
    renderMessages();
    updateStats();
    alert(DashboardState.messages[index].text);
  };

  window.editReview = function(index) {
    alert('Edit review functionality - implement modal for editing');
  };

  window.deleteReview = function(index) {
    if (!confirm('Delete this review?')) return;
    DashboardState.reviews.splice(index, 1);
    localStorage.setItem('fns_reviews', JSON.stringify(DashboardState.reviews));
    renderReviews();
  };

  window.editUpload = function(index) {
    window.location.href = 'upload.html';
  };

  window.deleteUpload = function(index) {
    if (!confirm('Delete this listing?')) return;
    DashboardState.uploads.splice(index, 1);
    localStorage.setItem('fns_uploads', JSON.stringify(DashboardState.uploads));
    renderUploads();
    updateStats();
  };

  window.viewTicket = function(index) {
    const ticket = DashboardState.tickets[index];
    alert(`Ticket #${ticket.id}\nSubject: ${ticket.subject}\nStatus: ${ticket.status}\n\n${ticket.description}`);
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', initDashboard);

})();
