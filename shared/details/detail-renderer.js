/**
 * Furnostyles Detail Renderer
 * Renders product, property, and repair detail pages.
 * Load order: detail-layout.css → detail-ui.js → detail-renderer.js
 */
(function () {
  'use strict';

  function _e(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function _price(v,p) { if(!v&&v!==0)return ''; var b='KSh\u00a0'+Number(v).toLocaleString(); return (p&&p!=='total')?b+' / '+p:b; }
  function _fmt(iso) { try{return new Date(iso).toLocaleDateString('en-KE',{year:'numeric',month:'long',day:'numeric'});}catch(e){return '';} }
  function _wa(t) { return 'https://wa.me/254713639205?text='+encodeURIComponent('Hi Furnostyles, I\'m interested in: '+(t||'a listing')+'. Please provide more details.'); }
  function _con(id,type,t) { return 'contact.html?from=detail&id='+encodeURIComponent(id||'')+'&type='+encodeURIComponent(type||'')+'&title='+encodeURIComponent(t||''); }

  function _gallery(imgs, title, icon) {
    var src = (imgs||[]).filter(function(u){return u&&u.indexOf('data:')!==0;});
    if(!src.length) return '<div class="dtl-gallery-placeholder">'+icon+'</div>';
    var th = src.length>1 ? '<div class="dtl-gallery-thumbs">'+src.map(function(u,i){
      return '<button class="dtl-gallery-thumb'+(i===0?' active':'')+'" data-src="'+_e(u)+'" aria-label="Image '+(i+1)+'"><img src="'+_e(u)+'" alt="'+_e(title)+'" loading="lazy"></button>';
    }).join('')+'</div>' : '';
    return '<div class="dtl-gallery-main-wrap"><img class="dtl-gallery-main" src="'+_e(src[0])+'" alt="'+_e(title)+'"></div>'+th;
  }

  function _videos(videos, title) {
    var vids = (videos||[]).filter(function(u){return u&&u.indexOf('data:')!==0;});
    if(!vids.length) return '';
    return '<div class="dtl-videos-section"><h2 class="dtl-section-title">Videos</h2><div class="dtl-videos-grid">'+vids.map(function(u,i){
      return '<div class="dtl-video-wrapper"><video src="'+_e(u)+'" controls preload="metadata" style="width:100%;height:auto;border-radius:8px;background:#000;"></video></div>';
    }).join('')+'</div></div>';
  }

  function _wireGallery(el) {
    if(!el) return;
    var main = el.querySelector('.dtl-gallery-main');
    if(!main) return;
    el.querySelectorAll('.dtl-gallery-thumb').forEach(function(b){
      b.addEventListener('click', function(){
        main.style.opacity='0';
        setTimeout(function(){ main.src=b.getAttribute('data-src'); main.style.opacity='1'; },120);
        el.querySelectorAll('.dtl-gallery-thumb').forEach(function(x){x.classList.remove('active');});
        b.classList.add('active');
      });
    });
  }

  function _trust(type) {
    var map={listing:['Admin Reviewed','Quality Checked','Verified Seller','Premium Grade'],property:['Admin Verified','Agency Checked','Location Confirmed','Quality Assured'],repair:['Admin Verified','Before/After Documented','Quality Checked','Provider Verified']};
    var badges=(map[type]||map.listing).map(function(t){return '<div class="dtl-trust-badge">\u2713 '+_e(t)+'</div>';}).join('');
    return '<div class="dtl-trust-layer"><div class="dtl-trust-eyebrow">Furnostyles Trust Layer</div><h3 class="dtl-trust-title">Every listing is moderated before you see it</h3><p class="dtl-trust-sub">Our admin team reviews all content for quality, accuracy and safety before it goes public.</p><div class="dtl-trust-grid">'+badges+'</div></div>';
  }

  function _fields(rows) {
    return '<div class="dtl-field-grid">'+rows.filter(function(r){return r.v;}).map(function(r){
      return '<div class="dtl-field-item"><div class="dtl-field-label">'+_e(r.l)+'</div><div class="dtl-field-value">'+_e(String(r.v))+'</div></div>';
    }).join('')+'</div>';
  }

  function _vendor(sellerType) {
    var m={individual:'Independent Seller',workshop:'Workshop / Artisan',supplier:'Verified Supplier',agent:'Property Agent',contractor:'Contractor'};
    return '<div class="dtl-vendor-stub"><div class="dtl-vendor-stub-eyebrow">Listing provider</div><div class="dtl-vendor-row"><div class="dtl-vendor-avatar">\uD83D\uDC64</div><div><div class="dtl-vendor-name">'+_e(m[sellerType]||'Furnostyles Vendor')+'</div><div class="dtl-vendor-note">Vendor profile coming soon \u2014 contact via Furnostyles for inquiries.</div></div></div></div>';
  }

  function renderListingDetail(c, L) {
    if(!c||!L) return;
    var id=L.id||'', price=_price(L.price);
    var typeMap={furniture:'Furniture',material:'Material',sourcing:'Sourcing',secondhand:'Secondhand',product:'Product'};
    var badges=[
      L.listingType?'<span class="dtl-badge dtl-badge-type">'+_e(typeMap[L.listingType]||L.listingType)+'</span>':'',
      L.category?'<span class="dtl-badge dtl-badge-category">'+_e(L.category)+'</span>':'',
      L.condition?'<span class="dtl-badge dtl-badge-cond">'+_e(L.condition)+'</span>':'',
      L.listingType==='sourcing'?'<span class="dtl-badge dtl-badge-sourcing">\uD83C\uDF0D Import/Sourcing</span>':'',
      L.featured?'<span class="dtl-badge dtl-badge-featured">\u2605 Featured</span>':''
    ].join('');
    c.innerHTML=
      '<div class="dtl-hero">'+
        '<div class="dtl-gallery">'+_gallery(L.images,L.title,'\uD83D\uDECB')+'</div>'+
        '<div class="dtl-info">'+
          '<h1 class="dtl-info-title">'+_e(L.title||'Listing')+'</h1>'+
          (price?'<div class="dtl-info-price">'+price+'</div>':'')+
          '<div class="dtl-badges">'+badges+'</div>'+
          (L.location?'<div class="dtl-info-location">\uD83D\uDCCD\u00a0'+_e(L.location)+'</div>':'')+
          (L.description?'<p class="dtl-info-desc-short">'+_e(L.description.substring(0,180)+(L.description.length>180?'\u2026':''))+'</p>':'')+
          '<div class="dtl-cta-block">'+
            '<a class="dtl-cta-btn dtl-cta-primary" href="'+_e(_con(id,'listing',L.title))+'">💬 Request Consultation</a>'+
            '<a class="dtl-cta-btn dtl-cta-wa" href="'+_e(_wa(L.title))+'" target="_blank" rel="noopener">📱 WhatsApp Inquiry</a>'+
            '<span class="dtl-cta-btn dtl-cta-soon">🛒 Add to Cart — coming soon</span>'+
          '</div>'+
        '</div>'+
      '</div>'+
      _videos(L.videos, L.title)+
      '<div class="dtl-section"><h2 class="dtl-section-title">Description</h2><p class="dtl-desc">'+_e(L.description||'No description provided.')+'</p></div>'+
      '<div class="dtl-section dtl-section-alt"><h2 class="dtl-section-title">Details &amp; Specifications</h2>'+_fields([{l:'Category',v:L.category},{l:'Sub-category',v:L.subcategory},{l:'Condition',v:L.condition},{l:'Seller Type',v:L.sellerType},{l:'Location',v:L.location},{l:'Price',v:price},{l:'Listed',v:_fmt(L.createdAt)}])+'</div>'+
      _trust('listing')+
      '<div class="dtl-ecosystem"><h2 class="dtl-ecosystem-title">Complete Your Space with Furnostyles</h2><p class="dtl-ecosystem-sub">Beyond the product — Furnostyles connects you to the full home transformation ecosystem.</p><div class="dtl-ecosystem-grid">'+
        '<a class="dtl-ecosystem-card" href="services-marketplace.html"><span class="dtl-ecosystem-icon">🔨</span><span class="dtl-ecosystem-label">Installation &amp; Renovation</span><span class="dtl-ecosystem-desc">Expert repair and renovation teams</span></a>'+
        '<a class="dtl-ecosystem-card" href="materials-marketplace.html"><span class="dtl-ecosystem-icon">🧱</span><span class="dtl-ecosystem-label">Building Materials</span><span class="dtl-ecosystem-desc">Premium materials and supplies</span></a>'+
        '<a class="dtl-ecosystem-card" href="sourcing-marketplace.html"><span class="dtl-ecosystem-icon">🌍</span><span class="dtl-ecosystem-label">Global Sourcing</span><span class="dtl-ecosystem-desc">Import from verified suppliers</span></a>'+
        '<a class="dtl-ecosystem-card" href="'+_e(_con(id,'design',L.title))+'"><span class="dtl-ecosystem-icon">✏️</span><span class="dtl-ecosystem-label">Design Consultation</span><span class="dtl-ecosystem-desc">Expert advice for your space</span></a>'+
      '</div></div>'+
      _vendor(L.sellerType);
    _wireGallery(c.querySelector('.dtl-gallery'));
  }

  function renderPropertyDetail(c, P) {
    if(!c||!P) return;
    var id=P.id||'', price=_price(P.priceOrRent,P.pricePeriod);
    var modeMap={for_sale:'For Sale',sale:'For Sale',for_rent:'For Rent',rent:'For Rent'};
    var mode=modeMap[P.listingMode]||P.listingMode||'';
    var feats=[[P.bedrooms,'\uD83D\uDECF\u00a0'+P.bedrooms+' Bed'+(P.bedrooms>1?'s':'')],[P.bathrooms,'\uD83D\uDEB0\u00a0'+P.bathrooms+' Bath'+(P.bathrooms>1?'s':'')],[P.floorArea,'\uD83D\uDCCF\u00a0'+P.floorArea],[P.parking,'\uD83D\uDE97\u00a0Parking'],[P.furnished,'\uD83D\uDECB\u00a0Furnished']].filter(function(x){return x[0];});
    var featHTML=feats.length?'<div class="dtl-prop-features">'+feats.map(function(x){return '<span class="dtl-prop-feature">'+_e(x[1])+'</span>';}).join('')+'</div>':'';
    c.innerHTML=
      '<div class="dtl-hero">'+
        '<div class="dtl-gallery">'+_gallery(P.images,P.title,'\uD83C\uDFE0')+'</div>'+
        '<div class="dtl-info">'+
          '<h1 class="dtl-info-title">'+_e(P.title||'Property')+'</h1>'+
          (price?'<div class="dtl-info-price">'+price+'</div>':'')+
          '<div class="dtl-badges">'+
            (mode?'<span class="dtl-badge dtl-badge-mode">'+_e(mode)+'</span>':'')+
            (P.propertyType?'<span class="dtl-badge dtl-badge-category">'+_e(P.propertyType)+'</span>':'')+
          '</div>'+
          (P.location?'<div class="dtl-info-location">\uD83D\uDCCD\u00a0'+_e(P.location)+'</div>':'')+
          featHTML+
          (P.description?'<p class="dtl-info-desc-short">'+_e(P.description.substring(0,180)+(P.description.length>180?'\u2026':''))+'</p>':'')+
          '<div class="dtl-cta-block">'+
            '<a class="dtl-cta-btn dtl-cta-primary" href="'+_e(_con(id,'property',P.title))+'">🏠 Request Viewing</a>'+
            '<a class="dtl-cta-btn dtl-cta-wa" href="'+_e(_wa(P.title))+'" target="_blank" rel="noopener">📱 WhatsApp Inquiry</a>'+
          '</div>'+
        '</div>'+
      '</div>'+
      _videos(P.videos, P.title)+
      '<div class="dtl-section"><h2 class="dtl-section-title">About This Property</h2><p class="dtl-desc">'+_e(P.description||'No description provided.')+'</p></div>'+
      '<div class="dtl-section dtl-section-alt"><h2 class="dtl-section-title">Property Details</h2>'+_fields([{l:'Type',v:P.propertyType},{l:'Mode',v:mode},{l:'Location',v:P.location},{l:'Bedrooms',v:P.bedrooms},{l:'Bathrooms',v:P.bathrooms},{l:'Floor Area',v:P.floorArea},{l:'Price',v:price},{l:'Listed',v:_fmt(P.createdAt)}])+'</div>'+
      _trust('property')+
      '<div class="dtl-ecosystem"><h2 class="dtl-ecosystem-title">Furnostyles Property Services</h2><p class="dtl-ecosystem-sub">Maximize value and appeal with our complete property ecosystem.</p><div class="dtl-ecosystem-grid">'+
        '<a class="dtl-ecosystem-card" href="furniture-marketplace.html"><span class="dtl-ecosystem-icon">🛋️</span><span class="dtl-ecosystem-label">Furnishing Package</span><span class="dtl-ecosystem-desc">Premium furniture for every room</span></a>'+
        '<a class="dtl-ecosystem-card" href="services-marketplace.html"><span class="dtl-ecosystem-icon">🔨</span><span class="dtl-ecosystem-label">Renovation Services</span><span class="dtl-ecosystem-desc">Transform before listing</span></a>'+
        '<a class="dtl-ecosystem-card" href="'+_e(_con(id,'airbnb',P.title))+'"><span class="dtl-ecosystem-icon">🏙️</span><span class="dtl-ecosystem-label">Airbnb Setup</span><span class="dtl-ecosystem-desc">Full Airbnb-ready setup</span></a>'+
        '<a class="dtl-ecosystem-card" href="'+_e(_con(id,'staging',P.title))+'"><span class="dtl-ecosystem-icon">✨</span><span class="dtl-ecosystem-label">Property Staging</span><span class="dtl-ecosystem-desc">Stage to sell or rent faster</span></a>'+
        '<a class="dtl-ecosystem-card" href="materials-marketplace.html"><span class="dtl-ecosystem-icon">🧱</span><span class="dtl-ecosystem-label">Renovation Materials</span><span class="dtl-ecosystem-desc">Tiles, gypsum, paint and more</span></a>'+
        '<a class="dtl-ecosystem-card" href="'+_e(_con(id,'maintenance',P.title))+'"><span class="dtl-ecosystem-icon">🔧</span><span class="dtl-ecosystem-label">Maintenance Plan</span><span class="dtl-ecosystem-desc">Ongoing property care</span></a>'+
      '</div></div>'+
      _vendor(P.agentType||'agent');
    _wireGallery(c.querySelector('.dtl-gallery'));
  }

  function renderRepairDetail(c, R) {
    if(!c||!R) return;
    var id=R.id||'';
    var bef=(R.beforeImages||[]).filter(function(u){return u&&u.indexOf('data:')!==0;});
    var aft=(R.afterImages||[]).filter(function(u){return u&&u.indexOf('data:')!==0;});
    var befHTML=bef.length?'<img class="dtl-ba-img" src="'+_e(bef[0])+'" alt="Before">':'<div class="dtl-ba-placeholder">📸<span>Before</span></div>';
    var aftHTML=aft.length?'<img class="dtl-ba-img" src="'+_e(aft[0])+'" alt="After">':'<div class="dtl-ba-placeholder">✨<span>After</span></div>';
    c.innerHTML=
      '<div class="dtl-before-after">'+
        '<div><div class="dtl-ba-label">Before</div>'+befHTML+'</div>'+
        '<div><div class="dtl-ba-label">After</div>'+aftHTML+'</div>'+
      '</div>'+
      '<div class="dtl-hero" style="border-top:1.5px solid #dce4f0;">'+
        '<div class="dtl-gallery">'+
          (bef.length>1?'<div class="dtl-gallery-thumbs">'+bef.concat(aft).filter(Boolean).map(function(u,i){return '<button class="dtl-gallery-thumb'+(i===0?' active':'')+'" data-src="'+_e(u)+'" aria-label="Photo '+(i+1)+'"><img src="'+_e(u)+'" loading="lazy"></button>';}).join('')+'</div>':'<div style="padding:12px 0;font-size:13px;color:#8090a0;">Additional photos above</div>')+
        '</div>'+
        '<div class="dtl-info">'+
          '<h1 class="dtl-info-title">'+_e(R.repairType||'Repair Project')+'</h1>'+
          '<div class="dtl-badges"><span class="dtl-badge dtl-badge-type">Renovation</span></div>'+
          (R.location?'<div class="dtl-info-location">\uD83D\uDCCD\u00a0'+_e(R.location)+'</div>':'')+
          (R.createdAt?'<div class="dtl-info-location">\uD83D\uDCC5\u00a0'+_fmt(R.createdAt)+'</div>':'')+
          (R.description?'<p class="dtl-info-desc-short">'+_e(R.description.substring(0,180)+(R.description.length>180?'\u2026':''))+'</p>':'')+
          '<div class="dtl-cta-block">'+
            '<a class="dtl-cta-btn dtl-cta-primary" href="'+_e(_con(id,'repair',R.repairType))+'">🔨 Request Similar Repair</a>'+
            '<a class="dtl-cta-btn dtl-cta-wa" href="'+_e(_wa(R.repairType))+'" target="_blank" rel="noopener">📱 WhatsApp Inquiry</a>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="dtl-section"><h2 class="dtl-section-title">Project Description</h2><p class="dtl-desc">'+_e(R.description||'No description provided.')+'</p></div>'+
      '<div class="dtl-section dtl-section-alt"><h2 class="dtl-section-title">Project Details</h2>'+_fields([{l:'Repair Type',v:R.repairType},{l:'Location',v:R.location},{l:'Completed',v:_fmt(R.createdAt)}])+'</div>'+
      _trust('repair')+
      '<div class="dtl-ecosystem"><h2 class="dtl-ecosystem-title">Related Furnostyles Services</h2><p class="dtl-ecosystem-sub">Complete your renovation with our full ecosystem.</p><div class="dtl-ecosystem-grid">'+
        '<a class="dtl-ecosystem-card" href="materials-marketplace.html"><span class="dtl-ecosystem-icon">🧱</span><span class="dtl-ecosystem-label">Materials &amp; Supplies</span><span class="dtl-ecosystem-desc">Source renovation materials</span></a>'+
        '<a class="dtl-ecosystem-card" href="furniture-marketplace.html"><span class="dtl-ecosystem-icon">🛋️</span><span class="dtl-ecosystem-label">Furnish After Renovation</span><span class="dtl-ecosystem-desc">Premium furniture selection</span></a>'+
        '<a class="dtl-ecosystem-card" href="'+_e(_con(id,'repair-quote',R.repairType))+'"><span class="dtl-ecosystem-icon">📋</span><span class="dtl-ecosystem-label">Get a Repair Quote</span><span class="dtl-ecosystem-desc">Request a similar project</span></a>'+
      '</div></div>'+
      _vendor('contractor');
  }

  window.FurnostylesDetailRenderer = {
    renderListingDetail:  renderListingDetail,
    renderPropertyDetail: renderPropertyDetail,
    renderRepairDetail:   renderRepairDetail
  };

}());
