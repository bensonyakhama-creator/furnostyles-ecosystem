/**
 * Furnostyles Global Location & Shipping System
 * Supports global expansion with location-based product filtering
 */

(function() {
  'use strict';

  window.FurnostylesLocation = {
    userLocation: null,
    supportedRegions: [],
    shippingZones: [],
    localServices: [],

    init: function() {
      this.loadSupportedRegions();
      this.loadShippingZones();
      this.detectUserLocation();
    },

    loadSupportedRegions: function() {
      const stored = localStorage.getItem('fns_supported_regions');
      if (stored) {
        this.supportedRegions = JSON.parse(stored);
      } else {
        // Supported regions for global expansion
        this.supportedRegions = [
          {
            id: 'ke-nairobi',
            country: 'Kenya',
            city: 'Nairobi',
            code: 'KE',
            currency: 'KES',
            language: 'en',
            timezone: 'Africa/Nairobi',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: true,
            supportedSuppliers: ['local', 'regional', 'international'],
            avgShippingDays: 2,
            regions: ['Kasarani', 'Westlands', 'Eastlands', 'CBD', 'South B', 'South C', 'Karen', 'Lavington', 'Kileleshwa', 'Kilimani']
          },
          {
            id: 'ke-mombasa',
            country: 'Kenya',
            city: 'Mombasa',
            code: 'KE',
            currency: 'KES',
            language: 'en',
            timezone: 'Africa/Nairobi',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: true,
            supportedSuppliers: ['local', 'regional', 'international'],
            avgShippingDays: 5,
            regions: ['Nyali', 'Mombasa Island', 'Kizingo', 'Tudor', 'Malindi']
          },
          {
            id: 'ke-kisumu',
            country: 'Kenya',
            city: 'Kisumu',
            code: 'KE',
            currency: 'KES',
            language: 'en',
            timezone: 'Africa/Nairobi',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: true,
            supportedSuppliers: ['local', 'regional'],
            avgShippingDays: 7,
            regions: ['CBD', 'Milimani', 'Nyalenda', 'Manyatta']
          },
          {
            id: 'tz-dar-es-salaam',
            country: 'Tanzania',
            city: 'Dar es Salaam',
            code: 'TZ',
            currency: 'TZS',
            language: 'en',
            timezone: 'Africa/Dar_es_Salaam',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: false,
            supportedSuppliers: ['regional', 'international'],
            avgShippingDays: 5,
            regions: ['City Centre', 'Sinza', 'Mlimani', 'Masaki']
          },
          {
            id: 'ug-kampala',
            country: 'Uganda',
            city: 'Kampala',
            code: 'UG',
            currency: 'UGX',
            language: 'en',
            timezone: 'Africa/Kampala',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: false,
            supportedSuppliers: ['regional', 'international'],
            avgShippingDays: 6,
            regions: ['CBD', 'Kololo', 'Nakasero', 'Makindye']
          },
          {
            id: 'rw-kigali',
            country: 'Rwanda',
            city: 'Kigali',
            code: 'RW',
            currency: 'RWF',
            language: 'en',
            timezone: 'Africa/Kigali',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: false,
            supportedSuppliers: ['regional', 'international'],
            avgShippingDays: 7,
            regions: ['CBD', 'Kiyovu', 'Nyarugenge', 'Gasabo']
          },
          {
            id: 'ng-lagos',
            country: 'Nigeria',
            city: 'Lagos',
            code: 'NG',
            currency: 'NGN',
            language: 'en',
            timezone: 'Africa/Lagos',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: true,
            supportedSuppliers: ['international'],
            avgShippingDays: 10,
            regions: ['Ikeja', 'Victoria Island', 'Lekki', 'Mainland']
          },
          {
            id: 'gh-accra',
            country: 'Ghana',
            city: 'Accra',
            code: 'GH',
            currency: 'GHS',
            language: 'en',
            timezone: 'Africa/Accra',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: true,
            supportedSuppliers: ['international'],
            avgShippingDays: 10,
            regions: ['CBD', 'Osu', 'Labadi', 'Airport Residential']
          },
          {
            id: 'za-johannesburg',
            country: 'South Africa',
            city: 'Johannesburg',
            code: 'ZA',
            currency: 'ZAR',
            language: 'en',
            timezone: 'Africa/Johannesburg',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: true,
            supportedSuppliers: ['international'],
            avgShippingDays: 12,
            regions: ['Sandton', 'Rosebank', 'CBD', 'Soweto']
          },
          {
            id: 'ae-dubai',
            country: 'United Arab Emirates',
            city: 'Dubai',
            code: 'AE',
            currency: 'AED',
            language: 'en',
            timezone: 'Asia/Dubai',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: true,
            supportedSuppliers: ['international'],
            avgShippingDays: 8,
            regions: ['Downtown', 'Marina', 'JBR', 'Business Bay']
          },
          {
            id: 'uk-london',
            country: 'United Kingdom',
            city: 'London',
            code: 'GB',
            currency: 'GBP',
            language: 'en',
            timezone: 'Europe/London',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: true,
            supportedSuppliers: ['international'],
            avgShippingDays: 14,
            regions: ['Central London', 'North London', 'South London', 'East London', 'West London']
          },
          {
            id: 'us-new-york',
            country: 'United States',
            city: 'New York',
            code: 'US',
            currency: 'USD',
            language: 'en',
            timezone: 'America/New_York',
            shippingAvailable: true,
            localDelivery: true,
            pickupAvailable: true,
            supportedSuppliers: ['international'],
            avgShippingDays: 15,
            regions: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']
          }
        ];
        this.saveSupportedRegions();
      }
    },

    saveSupportedRegions: function() {
      localStorage.setItem('fns_supported_regions', JSON.stringify(this.supportedRegions));
    },

    loadShippingZones: function() {
      const stored = localStorage.getItem('fns_shipping_zones');
      if (stored) {
        this.shippingZones = JSON.parse(stored);
      } else {
        // Shipping zones for global logistics
        this.shippingZones = [
          {
            id: 'zone-1',
            name: 'Local - Nairobi',
            regions: ['ke-nairobi'],
            shippingMethods: ['same-day', 'next-day', 'standard'],
            baseRate: 500,
            freeShippingThreshold: 50000,
            avgDays: 2
          },
          {
            id: 'zone-2',
            name: 'Regional - Kenya',
            regions: ['ke-mombasa', 'ke-kisumu'],
            shippingMethods: ['standard', 'express'],
            baseRate: 1500,
            freeShippingThreshold: 75000,
            avgDays: 5
          },
          {
            id: 'zone-3',
            name: 'East Africa',
            regions: ['tz-dar-es-salaam', 'ug-kampala', 'rw-kigali'],
            shippingMethods: ['standard', 'express'],
            baseRate: 3500,
            freeShippingThreshold: 100000,
            avgDays: 7
          },
          {
            id: 'zone-4',
            name: 'West Africa',
            regions: ['ng-lagos', 'gh-accra'],
            shippingMethods: ['standard', 'express'],
            baseRate: 8000,
            freeShippingThreshold: 150000,
            avgDays: 10
          },
          {
            id: 'zone-5',
            name: 'Southern Africa',
            regions: ['za-johannesburg'],
            shippingMethods: ['standard', 'express'],
            baseRate: 10000,
            freeShippingThreshold: 200000,
            avgDays: 12
          },
          {
            id: 'zone-6',
            name: 'Middle East',
            regions: ['ae-dubai'],
            shippingMethods: ['standard', 'express', 'air-freight'],
            baseRate: 15000,
            freeShippingThreshold: 300000,
            avgDays: 8
          },
          {
            id: 'zone-7',
            name: 'Europe',
            regions: ['uk-london'],
            shippingMethods: ['standard', 'express', 'air-freight'],
            baseRate: 25000,
            freeShippingThreshold: 500000,
            avgDays: 14
          },
          {
            id: 'zone-8',
            name: 'North America',
            regions: ['us-new-york'],
            shippingMethods: ['standard', 'express', 'air-freight'],
            baseRate: 30000,
            freeShippingThreshold: 600000,
            avgDays: 15
          }
        ];
        this.saveShippingZones();
      }
    },

    saveShippingZones: function() {
      localStorage.setItem('fns_shipping_zones', JSON.stringify(this.shippingZones));
    },

    detectUserLocation: function() {
      // Check if location is already stored
      const storedLocation = localStorage.getItem('fns_user_location');
      if (storedLocation) {
        this.userLocation = JSON.parse(storedLocation);
        return;
      }

      // Detect using browser geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.reverseGeocode(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.log('Geolocation error:', error);
            // Default to Nairobi if geolocation fails
            this.setUserLocation('ke-nairobi');
          }
        );
      } else {
        // Default to Nairobi
        this.setUserLocation('ke-nairobi');
      }
    },

    reverseGeocode: function(lat, lng) {
      // In production, this would call a geocoding API
      // For now, default to Nairobi
      this.setUserLocation('ke-nairobi');
    },

    setUserLocation: function(regionId) {
      const region = this.supportedRegions.find(r => r.id === regionId);
      if (region) {
        this.userLocation = region;
        localStorage.setItem('fns_user_location', JSON.stringify(region));
        this.updateUIForLocation();
      }
    },

    updateUIForLocation: function() {
      // Update currency display
      if (this.userLocation) {
        document.documentElement.setAttribute('data-currency', this.userLocation.currency);
        document.documentElement.setAttribute('data-region', this.userLocation.id);
      }
    },

    getShippingZone: function(regionId) {
      for (const zone of this.shippingZones) {
        if (zone.regions.includes(regionId)) {
          return zone;
        }
      }
      return null;
    },

    calculateShipping: function(regionId, orderValue) {
      const zone = this.getShippingZone(regionId);
      if (!zone) return { cost: 0, method: 'pickup', days: 0 };

      // Check for free shipping
      if (orderValue >= zone.freeShippingThreshold) {
        return { cost: 0, method: 'free', days: zone.avgDays };
      }

      return {
        cost: zone.baseRate,
        method: 'standard',
        days: zone.avgDays
      };
    },

    canShipTo: function(regionId, product) {
      const region = this.supportedRegions.find(r => r.id === regionId);
      if (!region) return false;

      // Check if product supports shipping to this region
      if (product.shippingRegions && !product.shippingRegions.includes(regionId)) {
        return false;
      }

      // Check supplier type compatibility
      if (product.supplierType && !region.supportedSuppliers.includes(product.supplierType)) {
        return false;
      }

      return region.shippingAvailable;
    },

    filterProductsByLocation: function(products, regionId) {
      if (!regionId) return products;

      return products.filter(product => this.canShipTo(regionId, product));
    },

    getLocalServices: function(regionId, serviceType) {
      // Return local construction/home improvement services
      const region = this.supportedRegions.find(r => r.id === regionId);
      if (!region) return [];

      // In production, this would query a database
      // For now, return demo local services
      return [
        {
          id: 'service-001',
          name: 'Furnostyles Construction',
          type: 'construction',
          region: regionId,
          location: region.city,
          rating: 4.9,
          services: ['Home Renovation', 'Construction', 'Interior Design'],
          distance: 0,
          isOwn: true
        },
        {
          id: 'service-002',
          name: 'Furnostyles Installation',
          type: 'installation',
          region: regionId,
          location: region.city,
          rating: 4.8,
          services: ['Furniture Assembly', 'Fixture Installation', 'Mounting'],
          distance: 0,
          isOwn: true
        },
        {
          id: 'service-003',
          name: 'Furnostyles Repairs',
          type: 'repairs',
          region: regionId,
          location: region.city,
          rating: 4.7,
          services: ['Furniture Repair', 'Upholstery', 'Restoration'],
          distance: 0,
          isOwn: true
        }
      ];
    },

    getNearbySuppliers: function(regionId, productCategory) {
      // Get suppliers that can ship to this region
      const region = this.supportedRegions.find(r => r.id === regionId);
      if (!region) return [];

      // In production, this would query a database
      // For now, return demo nearby suppliers
      return [
        {
          id: 'local-001',
          name: 'Nairobi Furniture Works',
          type: 'local',
          region: regionId,
          location: region.city,
          rating: 4.6,
          categories: ['Furniture', 'Custom'],
          distance: 5,
          avgShippingDays: 2
        },
        {
          id: 'regional-001',
          name: 'East Africa Materials',
          type: 'regional',
          region: regionId,
          location: 'Mombasa',
          rating: 4.5,
          categories: ['Materials', 'Construction'],
          distance: 500,
          avgShippingDays: 5
        }
      ];
    },

    formatCurrency: function(amount, regionId) {
      const region = regionId 
        ? this.supportedRegions.find(r => r.id === regionId)
        : this.userLocation;
      
      if (!region) return 'KES ' + amount.toLocaleString();

      const currencySymbols = {
        'KES': 'KES',
        'TZS': 'TZS',
        'UGX': 'UGX',
        'RWF': 'RWF',
        'NGN': '₦',
        'GHS': 'GH₵',
        'ZAR': 'R',
        'AED': 'AED',
        'GBP': '£',
        'USD': '$'
      };

      const symbol = currencySymbols[region.currency] || region.currency;
      return symbol + ' ' + amount.toLocaleString();
    },

    convertCurrency: function(amount, fromCurrency, toCurrency) {
      // In production, this would call a currency API
      // For now, use fixed rates
      const rates = {
        'KES': 1,
        'TZS': 22,
        'UGX': 36,
        'RWF': 10,
        'NGN': 3.5,
        'GHS': 0.06,
        'ZAR': 0.06,
        'AED': 0.03,
        'GBP': 0.006,
        'USD': 0.0077
      };

      const inKES = amount / rates[fromCurrency];
      return inKES * rates[toCurrency];
    },

    renderLocationSelector: function(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      let html = '<div style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: #f8f9fa; border-radius: 8px;">';
      html += '<span style="font-size: 16px;">📍</span>';
      html += '<select id="location-select" onchange="window.FurnostylesLocation.changeLocation(this.value)" style="padding: 6px 12px; border: 1px solid #dce4f0; border-radius: 6px; font-size: 13px; background: #fff;">';
      
      this.supportedRegions.forEach(region => {
        const selected = this.userLocation && this.userLocation.id === region.id ? 'selected' : '';
        html += `<option value="${region.id}" ${selected}>${region.city}, ${region.country}</option>`;
      });
      
      html += '</select>';
      html += '</div>';
      
      container.innerHTML = html;
    },

    changeLocation: function(regionId) {
      this.setUserLocation(regionId);
      // Reload page to apply location changes
      window.location.reload();
    },

    renderShippingInfo: function(containerId, regionId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const region = this.supportedRegions.find(r => r.id === regionId) || this.userLocation;
      if (!region) return;

      const zone = this.getShippingZone(region.id);

      let html = '<div style="background: #f8f9fa; padding: 16px; border-radius: 8px;">';
      html += '<h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #1a2540;">Shipping to ' + region.city + ', ' + region.country + '</h4>';
      
      if (zone) {
        html += '<div style="font-size: 13px; color: #8090a0; margin-bottom: 8px;">';
        html += '<div>📦 Base rate: ' + this.formatCurrency(zone.baseRate, region.id) + '</div>';
        html += '<div>🚚 Free shipping on orders over ' + this.formatCurrency(zone.freeShippingThreshold, region.id) + '</div>';
        html += '<div>⏱️ Average delivery: ' + zone.avgDays + ' days</div>';
        html += '</div>';
      }

      if (region.localDelivery) {
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #dce4f0; font-size: 12px; color: #10b981;">';
        html += '✓ Local delivery available';
        if (region.pickupAvailable) {
          html += '<br>✓ Pickup available';
        }
        html += '</div>';
      }

      html += '</div>';
      container.innerHTML = html;
    }
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    if (window.FurnostylesLocation) {
      window.FurnostylesLocation.init();
    }
  });

})();
