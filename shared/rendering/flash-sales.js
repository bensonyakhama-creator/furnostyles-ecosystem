/**
 * Furnostyles Flash Sales System
 * Limited-time offers with countdown timers
 */

(function() {
  'use strict';

  window.FurnostylesFlashSales = {
    activeSales: [],
    countdownIntervals: {},

    init: function() {
      this.loadFlashSales();
      this.renderFlashSaleBanner();
      this.startCountdowns();
    },

    loadFlashSales: function() {
      // Demo flash sales data
      this.activeSales = [
        {
          id: 'flash-001',
          title: 'Mega Furniture Sale',
          description: 'Up to 60% off on premium furniture',
          discount: 60,
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
          products: ['furniture-001', 'furniture-002', 'furniture-003', 'furniture-004', 'furniture-005'],
          stockLimit: 50,
          sold: 32,
          marketplace: 'furniture'
        },
        {
          id: 'flash-002',
          title: 'Building Materials Blitz',
          description: '30% off on construction materials',
          discount: 30,
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
          products: ['materials-001', 'materials-002', 'materials-003'],
          stockLimit: 100,
          sold: 78,
          marketplace: 'materials'
        },
        {
          id: 'flash-003',
          title: 'Secondhand Clearance',
          description: 'Up to 70% off on pre-owned items',
          discount: 70,
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
          products: ['secondhand-001', 'secondhand-002', 'secondhand-003', 'secondhand-004'],
          stockLimit: 30,
          sold: 15,
          marketplace: 'secondhand'
        }
      ];
    },

    renderFlashSaleBanner: function() {
      const bannerContainer = document.getElementById('flash-sale-banner');
      if (!bannerContainer) return;

      const currentSale = this.getCurrentSale();
      if (!currentSale) {
        bannerContainer.style.display = 'none';
        return;
      }

      const timeLeft = this.getTimeLeft(currentSale.endTime);
      const progressPercent = ((currentSale.sold / currentSale.stockLimit) * 100).toFixed(0);
      const isUrgent = timeLeft.hours < 2;

      let html = `
        <div style="background: linear-gradient(135deg, ${isUrgent ? '#dc3545' : '#c9a227'} 0%, ${isUrgent ? '#c82333' : '#b8941f'} 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -50%; right: -10%; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
          <div style="position: absolute; bottom: -30%; left: -5%; width: 150px; height: 150px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
          
          <div style="position: relative; z-index: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
              <div>
                <span style="background: rgba(255,255,255,0.2); color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">⚡ Flash Sale</span>
                <h2 style="margin: 8px 0 4px; font-size: 28px; font-weight: 800; color: #fff;">${currentSale.title}</h2>
                <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 14px;">${currentSale.description}</p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 48px; font-weight: 800; color: #fff;">-${currentSale.discount}%</div>
                <div style="color: rgba(255,255,255,0.9); font-size: 14px;">OFF</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 24px; margin-bottom: 16px;">
              <div style="display: flex; gap: 12px;">
                <div style="background: rgba(255,255,255,0.2); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 70px;">
                  <div id="flash-hours" style="font-size: 24px; font-weight: 700; color: #fff;">${String(timeLeft.hours).padStart(2, '0')}</div>
                  <div style="font-size: 11px; color: rgba(255,255,255,0.8); text-transform: uppercase;">Hours</div>
                </div>
                <div style="font-size: 24px; font-weight: 700; color: #fff;">:</div>
                <div style="background: rgba(255,255,255,0.2); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 70px;">
                  <div id="flash-minutes" style="font-size: 24px; font-weight: 700; color: #fff;">${String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div style="font-size: 11px; color: rgba(255,255,255,0.8); text-transform: uppercase;">Minutes</div>
                </div>
                <div style="font-size: 24px; font-weight: 700; color: #fff;">:</div>
                <div style="background: rgba(255,255,255,0.2); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 70px;">
                  <div id="flash-seconds" style="font-size: 24px; font-weight: 700; color: #fff;">${String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div style="font-size: 11px; color: rgba(255,255,255,0.8); text-transform: uppercase;">Seconds</div>
                </div>
              </div>

              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: rgba(255,255,255,0.9); font-size: 13px;">
                  <span>${currentSale.sold} sold</span>
                  <span>${currentSale.stockLimit} available</span>
                </div>
                <div style="background: rgba(255,255,255,0.3); height: 8px; border-radius: 4px; overflow: hidden;">
                  <div style="background: #fff; height: 100%; width: ${progressPercent}%; border-radius: 4px; transition: width 0.3s;"></div>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 12px;">
              <button onclick="window.location.href='#flash-sale-products'" style="flex: 1; padding: 14px 24px; background: #fff; color: ${isUrgent ? '#dc3545' : '#c9a227'}; border: none; border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer;">Shop Now</button>
              <button onclick="window.FurnostylesFlashSales.viewAllSales()" style="padding: 14px 24px; background: rgba(255,255,255,0.2); color: #fff; border: 1.5px solid rgba(255,255,255,0.4); border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">View All Sales</button>
            </div>
          </div>
        </div>
      `;

      bannerContainer.innerHTML = html;
    },

    getCurrentSale: function() {
      const now = new Date();
      return this.activeSales.find(sale => {
        const start = new Date(sale.startTime);
        const end = new Date(sale.endTime);
        return now >= start && now <= end;
      });
    },

    getTimeLeft: function(endTime) {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end - now;

      if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    },

    startCountdowns: function() {
      // Clear existing intervals
      Object.values(this.countdownIntervals).forEach(interval => clearInterval(interval));
      this.countdownIntervals = {};

      // Update countdown every second
      this.countdownIntervals.main = setInterval(() => {
        this.updateCountdownDisplay();
      }, 1000);
    },

    updateCountdownDisplay: function() {
      const currentSale = this.getCurrentSale();
      if (!currentSale) {
        this.renderFlashSaleBanner();
        return;
      }

      const timeLeft = this.getTimeLeft(currentSale.endTime);
      
      const hoursEl = document.getElementById('flash-hours');
      const minutesEl = document.getElementById('flash-minutes');
      const secondsEl = document.getElementById('flash-seconds');

      if (hoursEl) hoursEl.textContent = String(timeLeft.hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(timeLeft.minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(timeLeft.seconds).padStart(2, '0');

      // Update progress bar
      const progressPercent = ((currentSale.sold / currentSale.stockLimit) * 100).toFixed(0);
      const progressBar = document.querySelector('#flash-sale-banner .bg-white');
      if (progressBar) {
        progressBar.style.width = progressPercent + '%';
      }

      // Re-render if sale ended
      if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        this.renderFlashSaleBanner();
      }
    },

    viewAllSales: function() {
      // Track flash sale view for marketing
      if (window.FurnostylesUnifiedDashboard && window.FurnostylesUnifiedDashboard.marketingHooks) {
        const saleData = {
          userId: window.FurnostylesUnifiedDashboard.currentUser?.uid,
          action: 'view_all_flash_sales',
          timestamp: new Date().toISOString()
        };
        window.FurnostylesUnifiedDashboard.marketingHooks.saveMarketingEvent('flash_sale_view', saleData);
      }

      window.location.href = 'flash-sales.html';
    },

    getFlashSaleProducts: function(saleId) {
      const sale = this.activeSales.find(s => s.id === saleId);
      if (!sale) return [];

      // In production, this would fetch actual products
      // For demo, return mock products
      return sale.products.map((productId, index) => ({
        id: productId,
        title: `Flash Sale Product ${index + 1}`,
        price: Math.floor(Math.random() * 50000) + 10000,
        originalPrice: Math.floor(Math.random() * 80000) + 50000,
        discount: sale.discount,
        image: 'assets/images/sofa-1.jpg',
        category: 'Flash Sale',
        rating: (4 + Math.random()).toFixed(1),
        reviews: Math.floor(Math.random() * 200) + 50,
        seller: 'Furnostyles',
        location: 'Nairobi',
        stock: 'In Stock',
        description: 'Premium quality product available at flash sale price',
        isFlashSale: true,
        flashSaleId: saleId
      }));
    },

    applyFlashSaleDiscount: function(product, saleId) {
      const sale = this.activeSales.find(s => s.id === saleId);
      if (!sale) return product;

      return {
        ...product,
        originalPrice: product.price,
        price: Math.floor(product.price * (1 - sale.discount / 100)),
        discount: sale.discount,
        isFlashSale: true,
        flashSaleId: saleId
      };
    }
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    if (window.FurnostylesFlashSales) {
      window.FurnostylesFlashSales.init();
    }
  });

})();
