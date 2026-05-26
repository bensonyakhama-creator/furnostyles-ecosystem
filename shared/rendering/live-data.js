/**
 * Furnostyles Live Data Widget
 * Displays live news, stock market, and forex data
 */

(function() {
  'use strict';

  window.FurnostylesLiveWidget = {
    init: function() {
      this.renderNewsWidget();
      this.renderStockWidget();
      this.renderForexWidget();
    },

    renderNewsWidget: function() {
      const newsContainer = document.getElementById('live-news-widget');
      if (!newsContainer) return;

      // Demo news data
      const newsItems = [
        { title: 'Kenya Construction Sector Grows 12% in Q4', time: '2 hours ago', category: 'Business' },
        { title: 'Furniture Prices Rise Due to Material Costs', time: '4 hours ago', category: 'Market' },
        { title: 'New Real Estate Regulations Announced', time: '6 hours ago', category: 'Policy' },
        { title: 'Interior Design Trends for 2026 Revealed', time: '8 hours ago', category: 'Design' },
        { title: 'Sustainable Materials Gain Popularity', time: '10 hours ago', category: 'Environment' }
      ];

      let html = `
        <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #1a2540;">📰 Live News</h3>
            <span style="font-size: 12px; color: #28a745; font-weight: 600;">● Live</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
      `;

      newsItems.forEach(item => {
        html += `
          <div style="padding: 12px; background: #f8f9fa; border-radius: 8px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
            <div style="font-size: 13px; font-weight: 600; color: #1a2540; margin-bottom: 4px;">${item.title}</div>
            <div style="display: flex; gap: 8px; font-size: 11px; color: #8090a0;">
              <span style="background: #0b3b46; color: #fff; padding: 2px 8px; border-radius: 4px;">${item.category}</span>
              <span>${item.time}</span>
            </div>
          </div>
        `;
      });

      html += `
          </div>
          <button style="width: 100%; margin-top: 16px; padding: 10px; background: #0b3b46; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600;">View All News</button>
        </div>
      `;

      newsContainer.innerHTML = html;
    },

    renderStockWidget: function() {
      const stockContainer = document.getElementById('live-stock-widget');
      if (!stockContainer) return;

      // Demo stock data
      const stocks = [
        { symbol: 'NSE: EABL', name: 'East African Breweries', price: 234.50, change: 2.35, changePercent: 1.01 },
        { symbol: 'NSE: KCB', name: 'KCB Group', price: 45.20, change: -0.80, changePercent: -1.74 },
        { symbol: 'NSE: SAFARICOM', name: 'Safaricom', price: 28.75, change: 0.45, changePercent: 1.59 },
        { symbol: 'NSE: EQUITY', name: 'Equity Bank', price: 42.30, change: 1.20, changePercent: 2.93 },
        { symbol: 'NSE: COOP', name: 'Co-operative Bank', price: 13.80, change: 0.25, changePercent: 1.85 }
      ];

      let html = `
        <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #1a2540;">📈 Stock Market</h3>
            <span style="font-size: 12px; color: #28a745; font-weight: 600;">● Live</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
      `;

      stocks.forEach(stock => {
        const changeColor = stock.change >= 0 ? '#28a745' : '#dc3545';
        const changeIcon = stock.change >= 0 ? '▲' : '▼';
        
        html += `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: #f8f9fa; border-radius: 8px;">
            <div>
              <div style="font-size: 13px; font-weight: 700; color: #1a2540;">${stock.symbol}</div>
              <div style="font-size: 11px; color: #8090a0;">${stock.name}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 14px; font-weight: 700; color: #1a2540;">KES ${stock.price.toFixed(2)}</div>
              <div style="font-size: 12px; color: ${changeColor}; font-weight: 600;">${changeIcon} ${Math.abs(stock.changePercent).toFixed(2)}%</div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
          <button style="width: 100%; margin-top: 16px; padding: 10px; background: #0b3b46; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600;">View All Stocks</button>
        </div>
      `;

      stockContainer.innerHTML = html;
    },

    renderForexWidget: function() {
      const forexContainer = document.getElementById('live-forex-widget');
      if (!forexContainer) return;

      // Demo forex data
      const forexRates = [
        { pair: 'USD/KES', rate: 129.50, change: 0.25, changePercent: 0.19 },
        { pair: 'EUR/KES', rate: 140.20, change: -0.30, changePercent: -0.21 },
        { pair: 'GBP/KES', rate: 164.80, change: 0.45, changePercent: 0.27 },
        { pair: 'UGX/KES', rate: 0.035, change: 0.001, changePercent: 2.94 },
        { pair: 'TZS/KES', rate: 0.058, change: -0.002, changePercent: -3.33 }
      ];

      let html = `
        <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; padding: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #1a2540;">💱 Forex Rates</h3>
            <span style="font-size: 12px; color: #28a745; font-weight: 600;">● Live</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
      `;

      forexRates.forEach(rate => {
        const changeColor = rate.change >= 0 ? '#28a745' : '#dc3545';
        const changeIcon = rate.change >= 0 ? '▲' : '▼';
        
        html += `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: #f8f9fa; border-radius: 8px;">
            <div style="font-size: 14px; font-weight: 700; color: #1a2540;">${rate.pair}</div>
            <div style="text-align: right;">
              <div style="font-size: 14px; font-weight: 700; color: #1a2540;">${rate.rate.toFixed(3)}</div>
              <div style="font-size: 12px; color: ${changeColor}; font-weight: 600;">${changeIcon} ${Math.abs(rate.changePercent).toFixed(2)}%</div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
          <button style="width: 100%; margin-top: 16px; padding: 10px; background: #0b3b46; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600;">View All Rates</button>
        </div>
      `;

      forexContainer.innerHTML = html;
    }
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    if (window.FurnostylesLiveWidget) {
      window.FurnostylesLiveWidget.init();
    }
  });

})();
