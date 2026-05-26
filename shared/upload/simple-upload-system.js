/**
 * Furnostyles Simple Upload System
 * Unified, easy-to-use upload system for all users
 * Works with localStorage by default, no Firebase required
 */

(function() {
  'use strict';

  window.FurnostylesSimpleUpload = {
    uploads: [],

    init: function() {
      this.loadUploads();
    },

    loadUploads: function() {
      const stored = localStorage.getItem('fns_uploads');
      if (stored) {
        this.uploads = JSON.parse(stored);
      }
    },

    saveUploads: function() {
      localStorage.setItem('fns_uploads', JSON.stringify(this.uploads));
    },

    // Simple image upload - converts to data URL
    uploadImage: function(file) {
      return new Promise((resolve, reject) => {
        if (!file) {
          resolve(null);
          return;
        }

        // Check if it's an image
        if (!file.type.startsWith('image/')) {
          reject(new Error('Please upload an image file'));
          return;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          reject(new Error('Image must be less than 5MB'));
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = () => {
          reject(new Error('Failed to read image'));
        };
        reader.readAsDataURL(file);
      });
    },

    // Upload multiple images
    uploadImages: function(files) {
      const promises = Array.from(files).map(file => this.uploadImage(file));
      return Promise.all(promises);
    },

    // Create a new listing
    createListing: function(data) {
      const listing = {
        id: 'listing-' + Date.now(),
        type: data.type || 'product',
        title: data.title,
        description: data.description,
        price: parseFloat(data.price) || 0,
        category: data.category || 'general',
        condition: data.condition || 'new',
        location: data.location || 'Nairobi',
        images: data.images || [],
        seller: {
          name: data.sellerName || 'Anonymous',
          phone: data.sellerPhone || '',
          email: data.sellerEmail || ''
        },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.uploads.push(listing);
      this.saveUploads();
      return listing;
    },

    // Get all uploads
    getAllUploads: function() {
      return this.uploads;
    },

    // Get uploads by type
    getUploadsByType: function(type) {
      return this.uploads.filter(u => u.type === type);
    },

    // Get upload by ID
    getUploadById: function(id) {
      return this.uploads.find(u => u.id === id);
    },

    // Delete upload
    deleteUpload: function(id) {
      this.uploads = this.uploads.filter(u => u.id !== id);
      this.saveUploads();
    },

    // Update upload
    updateUpload: function(id, data) {
      const index = this.uploads.findIndex(u => u.id === id);
      if (index !== -1) {
        this.uploads[index] = { ...this.uploads[index], ...data, updatedAt: new Date().toISOString() };
        this.saveUploads();
        return this.uploads[index];
      }
      return null;
    },

    // Render upload form
    renderForm: function(containerId, options = {}) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const types = options.types || ['product', 'service', 'property'];
      const categories = options.categories || ['Furniture', 'Electronics', 'Materials', 'Services', 'Other'];
      const conditions = options.conditions || ['New', 'Like New', 'Good', 'Fair', 'Used'];

      let html = `
        <div id="simple-upload-form" style="max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="font-size: 24px; font-weight: 700; color: #1a2540; margin: 0 0 24px;">Upload Item</h2>
          
          <form id="upload-form" onsubmit="window.FurnostylesSimpleUpload.handleSubmit(event)">
            <!-- Type Selection -->
            <div style="margin-bottom: 20px;">
              <label style="display: block; font-size: 14px; font-weight: 600; color: #1a2540; margin-bottom: 8px;">What are you listing?</label>
              <select name="type" required style="width: 100%; padding: 12px; border: 1.5px solid #dce4f0; border-radius: 8px; font-size: 14px;">
                ${types.map(t => `<option value="${t.toLowerCase()}">${t.charAt(0).toUpperCase() + t.slice(1)}</option>`).join('')}
              </select>
            </div>

            <!-- Title -->
            <div style="margin-bottom: 20px;">
              <label style="display: block; font-size: 14px; font-weight: 600; color: #1a2540; margin-bottom: 8px;">Title *</label>
              <input type="text" name="title" required placeholder="e.g., Modern Sofa Set" style="width: 100%; padding: 12px; border: 1.5px solid #dce4f0; border-radius: 8px; font-size: 14px;">
            </div>

            <!-- Description -->
            <div style="margin-bottom: 20px;">
              <label style="display: block; font-size: 14px; font-weight: 600; color: #1a2540; margin-bottom: 8px;">Description *</label>
              <textarea name="description" required rows="4" placeholder="Describe your item..." style="width: 100%; padding: 12px; border: 1.5px solid #dce4f0; border-radius: 8px; font-size: 14px;"></textarea>
            </div>

            <!-- Price & Category -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
              <div>
                <label style="display: block; font-size: 14px; font-weight: 600; color: #1a2540; margin-bottom: 8px;">Price (KES) *</label>
                <input type="number" name="price" required placeholder="0" style="width: 100%; padding: 12px; border: 1.5px solid #dce4f0; border-radius: 8px; font-size: 14px;">
              </div>
              <div>
                <label style="display: block; font-size: 14px; font-weight: 600; color: #1a2540; margin-bottom: 8px;">Category</label>
                <select name="category" style="width: 100%; padding: 12px; border: 1.5px solid #dce4f0; border-radius: 8px; font-size: 14px;">
                  ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- Condition & Location -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
              <div>
                <label style="display: block; font-size: 14px; font-weight: 600; color: #1a2540; margin-bottom: 8px;">Condition</label>
                <select name="condition" style="width: 100%; padding: 12px; border: 1.5px solid #dce4f0; border-radius: 8px; font-size: 14px;">
                  ${conditions.map(c => `<option value="${c.toLowerCase()}">${c}</option>`).join('')}
                </select>
              </div>
              <div>
                <label style="display: block; font-size: 14px; font-weight: 600; color: #1a2540; margin-bottom: 8px;">Location</label>
                <input type="text" name="location" value="Nairobi" style="width: 100%; padding: 12px; border: 1.5px solid #dce4f0; border-radius: 8px; font-size: 14px;">
              </div>
            </div>

            <!-- Image Upload -->
            <div style="margin-bottom: 20px;">
              <label style="display: block; font-size: 14px; font-weight: 600; color: #1a2540; margin-bottom: 8px;">Photos (up to 5)</label>
              <div id="image-dropzone" style="border: 2px dashed #dce4f0; border-radius: 8px; padding: 32px; text-align: center; cursor: pointer; transition: all 0.3s;" ondragover="this.style.borderColor='#c9a227'; this.style.background='#fafafa'" ondragleave="this.style.borderColor='#dce4f0'; this.style.background='#fff'" ondrop="window.FurnostylesSimpleUpload.handleDrop(event)" onclick="document.getElementById('image-input').click()">
                <div style="font-size: 32px; margin-bottom: 8px;">📷</div>
                <div style="font-size: 14px; color: #8090a0; margin-bottom: 4px;">Drag & drop photos here</div>
                <div style="font-size: 12px; color: #a0b0c0;">or click to browse</div>
                <input type="file" id="image-input" multiple accept="image/*" style="display: none;" onchange="window.FurnostylesSimpleUpload.handleFileSelect(event)">
              </div>
              <div id="image-preview" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 8px; margin-top: 12px;"></div>
            </div>

            <!-- Seller Info -->
            <div style="margin-bottom: 24px;">
              <label style="display: block; font-size: 14px; font-weight: 600; color: #1a2540; margin-bottom: 8px;">Your Contact Info</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <input type="text" name="sellerName" placeholder="Your name" style="width: 100%; padding: 12px; border: 1.5px solid #dce4f0; border-radius: 8px; font-size: 14px;">
                <input type="tel" name="sellerPhone" placeholder="Phone number" style="width: 100%; padding: 12px; border: 1.5px solid #dce4f0; border-radius: 8px; font-size: 14px;">
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" id="submit-btn" style="width: 100%; padding: 14px; background: #c9a227; color: #fff; border: none; border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s;">
              Publish Listing
            </button>
          </form>

          <!-- Status Messages -->
          <div id="upload-status" style="margin-top: 20px;"></div>
        </div>
      `;

      container.innerHTML = html;
      this.uploadedImages = [];
    },

    handleDrop: function(event) {
      event.preventDefault();
      event.stopPropagation();
      const dropzone = document.getElementById('image-dropzone');
      dropzone.style.borderColor = '#dce4f0';
      dropzone.style.background = '#fff';

      const files = event.dataTransfer.files;
      this.processFiles(files);
    },

    handleFileSelect: function(event) {
      const files = event.target.files;
      this.processFiles(files);
    },

    processFiles: async function(files) {
      const preview = document.getElementById('image-preview');
      const maxImages = 5;

      for (let i = 0; i < Math.min(files.length, maxImages - this.uploadedImages.length); i++) {
        try {
          const dataUrl = await this.uploadImage(files[i]);
          this.uploadedImages.push(dataUrl);

          // Add preview
          const img = document.createElement('div');
          img.style.cssText = 'position: relative; aspect-ratio: 1; border-radius: 8px; overflow: hidden;';
          img.innerHTML = `
            <img src="${dataUrl}" style="width: 100%; height: 100%; object-fit: cover;">
            <button type="button" onclick="window.FurnostylesSimpleUpload.removeImage(${this.uploadedImages.length - 1})" style="position: absolute; top: 4px; right: 4px; width: 24px; height: 24px; background: rgba(0,0,0,0.6); color: #fff; border: none; border-radius: 50%; cursor: pointer; font-size: 14px;">×</button>
          `;
          preview.appendChild(img);
        } catch (error) {
          console.error('Upload error:', error);
          alert(error.message);
        }
      }
    },

    removeImage: function(index) {
      this.uploadedImages.splice(index, 1);
      const preview = document.getElementById('image-preview');
      preview.innerHTML = '';
      this.uploadedImages.forEach((dataUrl, i) => {
        const img = document.createElement('div');
        img.style.cssText = 'position: relative; aspect-ratio: 1; border-radius: 8px; overflow: hidden;';
        img.innerHTML = `
          <img src="${dataUrl}" style="width: 100%; height: 100%; object-fit: cover;">
          <button type="button" onclick="window.FurnostylesSimpleUpload.removeImage(${i})" style="position: absolute; top: 4px; right: 4px; width: 24px; height: 24px; background: rgba(0,0,0,0.6); color: #fff; border: none; border-radius: 50%; cursor: pointer; font-size: 14px;">×</button>
        `;
        preview.appendChild(img);
      });
    },

    handleSubmit: async function(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const status = document.getElementById('upload-status');
      const submitBtn = document.getElementById('submit-btn');

      // Show loading
      submitBtn.disabled = true;
      submitBtn.textContent = 'Publishing...';
      status.innerHTML = '<div style="padding: 16px; background: #f0f4ff; border-radius: 8px; text-align: center; color: #1a2540;">⏳ Publishing your listing...</div>';

      try {
        const data = {
          type: formData.get('type'),
          title: formData.get('title'),
          description: formData.get('description'),
          price: formData.get('price'),
          category: formData.get('category'),
          condition: formData.get('condition'),
          location: formData.get('location'),
          images: this.uploadedImages,
          sellerName: formData.get('sellerName'),
          sellerPhone: formData.get('sellerPhone')
        };

        const listing = this.createListing(data);

        // Show success
        status.innerHTML = `
          <div style="padding: 16px; background: #f0faf4; border: 1px solid #b6dfc6; border-radius: 8px;">
            <div style="font-size: 20px; margin-bottom: 8px;">✅</div>
            <div style="font-weight: 700; color: #1a6e3a; margin-bottom: 8px;">Listing Published!</div>
            <div style="font-size: 13px; color: #4a7a5a;">Your item is now live on the marketplace.</div>
            <button type="button" onclick="window.location.reload()" style="margin-top: 12px; padding: 8px 16px; background: #1a6e3a; color: #fff; border: none; border-radius: 6px; cursor: pointer;">Add Another</button>
          </div>
        `;

        form.reset();
        this.uploadedImages = [];
        document.getElementById('image-preview').innerHTML = '';

      } catch (error) {
        status.innerHTML = `
          <div style="padding: 16px; background: #fff5f5; border: 1px solid #f5c0c0; border-radius: 8px;">
            <div style="font-size: 20px; margin-bottom: 8px;">⚠️</div>
            <div style="font-weight: 700; color: #cc1a1a; margin-bottom: 8px;">Publishing Failed</div>
            <div style="font-size: 13px; color: #8a2020;">${error.message}</div>
          </div>
        `;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Publish Listing';
      }
    },

    // Render user's uploads
    renderMyUploads: function(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const uploads = this.getAllUploads();

      if (uploads.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 48px 24px; color: #8090a0;">
            <div style="font-size: 48px; margin-bottom: 16px;">📦</div>
            <p style="font-size: 16px; font-weight: 600; color: #1a2540; margin: 0 0 8px;">No listings yet</p>
            <p style="font-size: 14px; margin: 0;">Upload your first item to get started.</p>
          </div>
        `;
        return;
      }

      let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">';
      
      uploads.forEach(upload => {
        const image = upload.images[0] || 'assets/images/default-product.jpg';
        html += `
          <div style="background: #fff; border: 1.5px solid #dce4f0; border-radius: 12px; overflow: hidden;">
            <img src="${image}" alt="${upload.title}" style="width: 100%; height: 200px; object-fit: cover;">
            <div style="padding: 16px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px; font-size: 11px;">${upload.type}</span>
                <span style="background: #e8f5e9; color: #2e7d32; padding: 4px 8px; border-radius: 4px; font-size: 11px;">${upload.status}</span>
              </div>
              <h3 style="font-size: 16px; font-weight: 700; color: #1a2540; margin: 0 0 8px;">${upload.title}</h3>
              <p style="font-size: 14px; font-weight: 700; color: #0b3b46; margin: 0 0 12px;">KES ${upload.price.toLocaleString()}</p>
              <div style="display: flex; gap: 8px;">
                <button onclick="window.FurnostylesSimpleUpload.deleteUpload('${upload.id}'); window.location.reload()" style="flex: 1; padding: 8px; background: #f0f0f0; color: #1a2540; border: none; border-radius: 6px; font-size: 12px; cursor: pointer;">Delete</button>
              </div>
            </div>
          </div>
        `;
      });
      
      html += '</div>';
      container.innerHTML = html;
    }
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    if (window.FurnostylesSimpleUpload) {
      window.FurnostylesSimpleUpload.init();
    }
  });

})();
