/**
 * FURNOSTYLES — REGISTER MODAL
 * ==============================
 * File: shared/auth/register-modal.js
 * Purpose: Creates a popup modal for account creation
 *          Can be triggered from header buttons or anywhere
 *
 * Usage:
 *   window.FurnostylesRegisterModal.open()
 *   window.FurnostylesRegisterModal.close()
 */

(function () {
  'use strict';

  var modal = null;
  var overlay = null;

  /* ============================================================
     CREATE MODAL HTML
     ============================================================ */

  function createModal() {
    // Create overlay
    overlay = document.createElement('div');
    overlay.className = 'fns-register-modal-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;

    // Create modal
    modal = document.createElement('div');
    modal.className = 'fns-register-modal';
    modal.style.cssText = `
      background: white;
      border-radius: 12px;
      max-width: 450px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;

    modal.innerHTML = `
      <div class="fns-register-modal-header" style="
        padding: 24px 24px 16px;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <div>
          <h2 style="margin: 0; font-size: 20px; color: #333;">Create Account</h2>
          <p style="margin: 4px 0 0; font-size: 14px; color: #666;">Join Furnostyles for premium furniture, materials, and services</p>
        </div>
        <button type="button" class="fns-modal-close" style="
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        ">&times;</button>
      </div>

      <div class="fns-register-modal-body" style="padding: 24px;">
        <form id="fnsRegisterForm">
          <div class="fns-form-group" style="margin-bottom: 16px;">
            <label for="regFullName" style="
              display: block;
              font-size: 14px;
              font-weight: 600;
              color: #333;
              margin-bottom: 6px;
            ">Full Name <span style="color: #ff4444;">*</span></label>
            <input type="text" id="regFullName" name="fullName" required placeholder="John Doe" style="
              width: 100%;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-size: 14px;
              box-sizing: border-box;
            ">
          </div>

          <div class="fns-form-group" style="margin-bottom: 16px;">
            <label for="regEmail" style="
              display: block;
              font-size: 14px;
              font-weight: 600;
              color: #333;
              margin-bottom: 6px;
            ">Email Address <span style="color: #ff4444;">*</span></label>
            <input type="email" id="regEmail" name="email" required placeholder="your@email.com" style="
              width: 100%;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-size: 14px;
              box-sizing: border-box;
            ">
          </div>

          <div class="fns-form-group" style="margin-bottom: 16px;">
            <label for="regPhone" style="
              display: block;
              font-size: 14px;
              font-weight: 600;
              color: #333;
              margin-bottom: 6px;
            ">Phone Number <span style="color: #ff4444;">*</span></label>
            <input type="tel" id="regPhone" name="phone" required placeholder="+254 7XX XXX XXX" style="
              width: 100%;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-size: 14px;
              box-sizing: border-box;
            ">
          </div>

          <div class="fns-form-group" style="margin-bottom: 16px;">
            <label for="regPassword" style="
              display: block;
              font-size: 14px;
              font-weight: 600;
              color: #333;
              margin-bottom: 6px;
            ">Password <span style="color: #ff4444;">*</span></label>
            <input type="password" id="regPassword" name="password" required placeholder="Create a strong password" style="
              width: 100%;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-size: 14px;
              box-sizing: border-box;
            ">
          </div>

          <div class="fns-form-group" style="margin-bottom: 16px;">
            <label for="regConfirmPassword" style="
              display: block;
              font-size: 14px;
              font-weight: 600;
              color: #333;
              margin-bottom: 6px;
            ">Confirm Password <span style="color: #ff4444;">*</span></label>
            <input type="password" id="regConfirmPassword" name="confirmPassword" required placeholder="Confirm your password" style="
              width: 100%;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-size: 14px;
              box-sizing: border-box;
            ">
          </div>

          <div class="fns-form-group" style="margin-bottom: 16px;">
            <label for="regRole" style="
              display: block;
              font-size: 14px;
              font-weight: 600;
              color: #333;
              margin-bottom: 6px;
            ">Account Type</label>
            <select id="regRole" name="role" style="
              width: 100%;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-size: 14px;
              box-sizing: border-box;
              background: white;
            ">
              <option value="client">Client (Buyer)</option>
              <option value="individual-seller">Individual Seller (Secondhand)</option>
              <option value="individual-landlord">Individual Landlord</option>
              <option value="vendor">Business Vendor</option>
              <option value="provider">Service Provider</option>
              <option value="property-owner">Property Owner</option>
            </select>
          </div>

          <div class="fns-form-group" style="margin-bottom: 20px;">
            <label style="display: flex; align-items: flex-start; gap: 8px; cursor: pointer; font-size: 13px; color: #666;">
              <input type="checkbox" id="regTerms" name="terms" required style="margin-top: 2px;">
              <span>I agree to the <a href="terms-of-service.html" target="_blank" style="color: #d4af37;">Terms of Service</a> and <a href="privacy-policy.html" target="_blank" style="color: #d4af37;">Privacy Policy</a></span>
            </label>
          </div>

          <button type="submit" class="fns-register-submit" style="
            width: 100%;
            padding: 14px;
            background: #d4af37;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s ease;
          ">Create Account</button>
        </form>

        <div class="fns-register-divider" style="
          display: flex;
          align-items: center;
          margin: 24px 0;
          color: #999;
          font-size: 14px;
        ">
          <span style="flex: 1; height: 1px; background: #e0e0e0;"></span>
          <span style="padding: 0 16px;">or</span>
          <span style="flex: 1; height: 1px; background: #e0e0e0;"></span>
        </div>

        <button type="button" id="fnsGoogleSignIn" class="fns-google-signin" style="
          width: 100%;
          padding: 12px;
          background: white;
          color: #333;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: background 0.3s ease;
        ">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </button>

        <p class="fns-register-footer" style="
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
          color: #666;
        ">
          Already have an account? <a href="login.html" class="fns-login-link" style="color: #d4af37; font-weight: 600;">Sign in</a>
        </p>
      </div>
    `;

    // Append modal to overlay
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Add event listeners
    setupEventListeners();
  }

  /* ============================================================
     SETUP EVENT LISTENERS
     ============================================================ */

  function setupEventListeners() {
    // Close button
    var closeBtn = modal.querySelector('.fns-modal-close');
    closeBtn.addEventListener('click', close);

    // Close on overlay click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        close();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.style.display === 'flex') {
        close();
      }
    });

    // Form submission
    var form = modal.querySelector('#fnsRegisterForm');
    form.addEventListener('submit', handleFormSubmit);

    // Google sign-in
    var googleBtn = modal.querySelector('#fnsGoogleSignIn');
    googleBtn.addEventListener('click', handleGoogleSignIn);

    // Button hover effects
    var submitBtn = modal.querySelector('.fns-register-submit');
    submitBtn.addEventListener('mouseenter', function () {
      this.style.background = '#c49a2f';
    });
    submitBtn.addEventListener('mouseleave', function () {
      this.style.background = '#d4af37';
    });

    googleBtn.addEventListener('mouseenter', function () {
      this.style.background = '#f5f5f5';
    });
    googleBtn.addEventListener('mouseleave', function () {
      this.style.background = 'white';
    });
  }

  /* ============================================================
     HANDLE FORM SUBMIT
     ============================================================ */

  function handleFormSubmit(e) {
    e.preventDefault();

    var form = e.target;
    var fullName = form.fullName.value;
    var email = form.email.value;
    var phone = form.phone.value;
    var password = form.password.value;
    var confirmPassword = form.confirmPassword.value;
    var role = form.role.value;

    // Validation
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    // Check if Firebase Auth is available
    if (window.FurnostylesAuth) {
      window.FurnostylesAuth.registerWithEmailAndPassword(email, password, fullName, phone, role)
        .then(function () {
          close();
          // Redirect to appropriate page based on role
          window.location.href = getDashboardForRole(role);
        })
        .catch(function (error) {
          alert('Registration failed: ' + error.message);
        });
    } else {
      // Fallback for demo
      console.log('Registration data:', { fullName, email, phone, role });
      alert('Registration successful! (Demo mode - Firebase Auth not loaded)');
      close();
    }
  }

  /* ============================================================
     HANDLE GOOGLE SIGN-IN
     ============================================================ */

  function handleGoogleSignIn() {
    if (window.FurnostylesAuth && window.FurnostylesAuth.signInWithGoogle) {
      window.FurnostylesAuth.signInWithGoogle()
        .then(function () {
          close();
          window.location.href = 'dashboards/client/index.html';
        })
        .catch(function (error) {
          alert('Google sign-in failed: ' + error.message);
        });
    } else {
      alert('Google sign-in not available. Please use email registration.');
    }
  }

  /* ============================================================
     GET DASHBOARD FOR ROLE
     ============================================================ */

  function getDashboardForRole(role) {
    var dashboards = {
      'client': 'dashboards/client/index.html',
      'individual-seller': 'dashboards/vendor/index.html',
      'individual-landlord': 'dashboards/property-owner/index.html',
      'vendor': 'dashboards/vendor/index.html',
      'provider': 'dashboards/provider/index.html',
      'contractor': 'dashboards/contractor/index.html',
      'property-owner': 'dashboards/property-owner/index.html',
      'agent': 'dashboards/agent/index.html',
      'admin': 'dashboards/admin/index.html',
      'super-admin': 'dashboards/super-admin/index.html'
    };
    return dashboards[role] || 'dashboards/client/index.html';
  }

  /* ============================================================
     PUBLIC API
     ============================================================ */

  function open() {
    if (!modal) {
      createModal();
    }
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (overlay) {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // Export API
  window.FurnostylesRegisterModal = {
    open: open,
    close: close
  };

  console.log('[RegisterModal] Register modal module loaded');

}());
