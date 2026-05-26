/**
 * FURNOSTYLES FOOTER RENDERER
 * ============================
 * File: shared/layout/footer-render.js
 *
 * Reads window.FurnostylesFooterData and renders the full shared footer.
 * All section builders check for missing data and degrade gracefully.
 *
 * Load order required in HTML:
 *   1. <link rel="stylesheet" href="shared/layout/footer.css">
 *   2. <script src="shared/layout/footer-data.js"></script>
 *   3. <script src="shared/layout/footer-render.js"></script>
 *
 * Mount point in HTML body:
 *   <div id="fns-footer-mount"></div>
 *
 *   If #fns-footer-mount is not found, the footer is appended to <body>.
 *
 * Public API (after init):
 *   window.FurnostylesFooter.init()              — manual re-init
 *   window.FurnostylesFooter.scrollToTop()        — smooth scroll to top
 *   window.FurnostylesFooter.submitNewsletter()   — newsletter form handler
 *   window.FurnostylesFooter.submitSearch()       — footer search handler
 *
 * Compatible with: vanilla JS, static hosting.
 * No inline styles injected. No external dependencies.
 */

(function () {
  'use strict';

  /* ============================================================
     SAFETY HELPERS
  ============================================================ */

  function safe(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function when(condition, html) {
    return condition ? (html || '') : '';
  }

  /* ============================================================
     SECTION: ANNOUNCEMENT BAR
     Driven by data.announcementBar (or data.liveElements fallback).
     Only rendered when enabled = true and message is non-empty.
  ============================================================ */

  function buildAnnounceBar(data) {
    var bar = data.announcementBar || data.liveElements || {};
    if (!bar.enabled || !bar.message) return '';
    var type = safe(bar.type || 'promo');
    return (
      '<div class="fld-footer__announce fld-footer__announce--visible fld-footer__announce--' + type + '"' +
      ' role="banner" aria-live="polite">' +
        safe(bar.message) +
      '</div>'
    );
  }

  /* ============================================================
     SECTION: EMERGENCY REPAIR CTA
     Driven by data.emergencyCTA.
     Dark red strip with CTA button and phone link.
  ============================================================ */

  function buildEmergencyCTA(data) {
    var cta = data.emergencyCTA || {};
    if (!cta.enabled) return '';
    var phoneHref = cta.phone ? 'tel:' + cta.phone.replace(/\s/g, '') : '';
    return (
      '<div class="fld-footer__emergency" role="complementary" aria-label="Emergency Repair Contact">' +
        '<div class="fld-footer__emergency-text">' +
          '<h3>' + safe(cta.heading || 'Emergency Repair?') + '</h3>' +
          when(cta.description, '<p>' + safe(cta.description) + '</p>') +
        '</div>' +
        '<div class="fld-footer__emergency-actions">' +
          when(cta.href,
            '<a class="fld-footer__emergency-btn" href="' + safe(cta.href) + '">' +
              safe(cta.buttonText || 'Request Emergency Repair') +
            '</a>'
          ) +
          when(cta.phone,
            '<a class="fld-footer__emergency-phone" href="' + safe(phoneHref) + '">' +
              safe(cta.phone) +
            '</a>'
          ) +
        '</div>' +
      '</div>'
    );
  }

  /* ============================================================
     SECTION: TOP — BRAND + NEWSLETTER
     Two-column grid: brand info left, newsletter signup right.
  ============================================================ */

  function buildBrand(data) {
    var brand = data.brand || {};
    var phoneHref = brand.phone ? 'tel:' + brand.phone.replace(/\s/g, '') : '';
    return (
      '<div class="fld-footer__brand">' +
        '<h2>' + safe(brand.name || 'Furnostyles') + '</h2>' +
        when(brand.tagline, '<p>' + safe(brand.tagline) + '</p>') +
        when(brand.address, '<span>' + safe(brand.address) + '</span>') +
        when(brand.phone,
          '<span><a href="' + safe(phoneHref) + '" style="color:inherit;text-decoration:none;">' +
            safe(brand.phone) +
          '</a></span>'
        ) +
        when(brand.email,
          '<span><a href="mailto:' + safe(brand.email) + '" style="color:inherit;text-decoration:none;">' +
            safe(brand.email) +
          '</a></span>'
        ) +
      '</div>'
    );
  }

  function buildNewsletter(data) {
    var nl = data.newsletter || {};
    if (!nl.enabled) return '';
    return (
      '<div class="fld-footer__newsletter">' +
        '<h3>' + safe(nl.heading || 'Stay in the Loop') + '</h3>' +
        when(nl.description, '<p>' + safe(nl.description) + '</p>') +
        '<div class="fld-footer__subscribe">' +
          '<input type="email"' +
            ' id="fldFooterNewsletterInput"' +
            ' placeholder="' + safe(nl.placeholder || 'Enter your email') + '"' +
            ' autocomplete="email"' +
            ' aria-label="Newsletter email address">' +
          '<button type="button" onclick="FurnostylesFooter.submitNewsletter()">' +
            safe(nl.buttonText || 'Subscribe') +
          '</button>' +
        '</div>' +
        when(nl.disclaimer,
          '<small style="display:block;margin-top:8px;color:#5e7880;font-size:11px;">' +
            safe(nl.disclaimer) +
          '</small>'
        ) +
        /* FUTURE: Replace localStorage collector with Firebase write or Mailchimp API here */
        '<div id="fldFooterNewsletterStatus" style="display:none;margin-top:8px;font-size:12px;font-weight:800;"></div>' +
      '</div>'
    );
  }

  function buildTop(data) {
    return (
      '<div class="fld-footer__top">' +
        buildBrand(data) +
        buildNewsletter(data) +
      '</div>'
    );
  }

  /* ============================================================
     SECTION: QUICK CONTACT BAR
     Driven by data.quickContact.
     Renders WhatsApp, phone and email as pill links.
  ============================================================ */

  function buildQuickContact(data) {
    var qc = data.quickContact || {};
    if (!qc.enabled) return '';
    var links = '';
    if (qc.whatsapp && qc.whatsapp.url) {
      links +=
        '<a class="fld-footer__quick-contact-link fld-footer__quick-contact-link--whatsapp"' +
        ' href="' + safe(qc.whatsapp.url) + '"' +
        ' target="_blank" rel="noopener noreferrer">' +
          safe(qc.whatsapp.label || 'WhatsApp') +
        '</a>';
    }
    if (qc.phone && qc.phone.url) {
      links +=
        '<a class="fld-footer__quick-contact-link" href="' + safe(qc.phone.url) + '">' +
          safe(qc.phone.label || '') +
        '</a>';
    }
    if (qc.email && qc.email.url) {
      links +=
        '<a class="fld-footer__quick-contact-link" href="' + safe(qc.email.url) + '">' +
          safe(qc.email.label || '') +
        '</a>';
    }
    if (!links) return '';
    return (
      '<div class="fld-footer__quick-contact">' +
        when(qc.label,
          '<span class="fld-footer__quick-contact-label">' + safe(qc.label) + '</span>'
        ) +
        links +
      '</div>'
    );
  }

  /* ============================================================
     SECTION: BUSINESS HOURS
     Driven by data.businessHours.
  ============================================================ */

  function buildHours(data) {
    var bh = data.businessHours || {};
    if (!bh.enabled || !Array.isArray(bh.hours) || !bh.hours.length) return '';
    var rows = bh.hours.map(function (h) {
      return (
        '<div class="fld-footer__hours-row">' +
          '<span class="fld-footer__hours-day">' + safe(h.day) + '</span>' +
          '<span class="fld-footer__hours-time">' + safe(h.time) + '</span>' +
        '</div>'
      );
    }).join('');
    return (
      '<div class="fld-footer__hours" aria-label="Business Hours">' +
        '<span class="fld-footer__hours-heading">' + safe(bh.heading || 'Business Hours') + '</span>' +
        rows +
        when(bh.note, '<p class="fld-footer__hours-note">' + safe(bh.note) + '</p>') +
      '</div>'
    );
  }

  /* ============================================================
     SECTION: TRUST BADGES
     Driven by data.trustBadges.
  ============================================================ */

  function buildTrustBadges(data) {
    var tb = data.trustBadges || {};
    if (!tb.enabled || !Array.isArray(tb.items) || !tb.items.length) return '';
    var items = tb.items.map(function (item) {
      return (
        '<span class="fld-footer__trust-item">' +
          '<span class="fld-trust-icon" aria-hidden="true">' + safe(item.icon) + '</span>' +
          safe(item.label) +
        '</span>'
      );
    }).join('');
    return (
      '<div class="fld-footer__trust" aria-label="Trust Signals">' +
        items +
      '</div>'
    );
  }

  /* ============================================================
     SECTION: FOOTER LINK COLUMNS
     Driven by data.columns[].
     Each column uses <nav> with aria-label for SEO and accessibility.
  ============================================================ */

  function buildColumns(data) {
    if (!Array.isArray(data.columns) || !data.columns.length) return '';
    var cols = data.columns.map(function (col) {
      var links = (col.links || []).map(function (link) {
        return '<a href="' + safe(link.href) + '">' + safe(link.label) + '</a>';
      }).join('');
      return (
        '<nav class="fld-footer__column" aria-label="' + safe(col.heading) + '">' +
          '<h3>' + safe(col.heading) + '</h3>' +
          links +
        '</nav>'
      );
    }).join('');
    return '<div class="fld-footer__columns">' + cols + '</div>';
  }

  /* ============================================================
     SECTION: SERVICE AREAS
     Driven by data.serviceAreas.
     Rendered as a tag cloud — SEO-friendly local area names.
     FUTURE: Each tag could link to a local landing page.
  ============================================================ */

  function buildServiceAreas(data) {
    var sa = data.serviceAreas || {};
    if (!sa.enabled || !Array.isArray(sa.areas) || !sa.areas.length) return '';
    var tags = sa.areas.map(function (area) {
      /* FUTURE: Replace <span> with <a href="/services/[area-slug]"> when local pages exist */
      return '<span class="fld-footer__area-tag">' + safe(area) + '</span>';
    }).join('');
    return (
      '<section class="fld-footer__areas" aria-label="Service Areas">' +
        '<h4 class="fld-footer__areas-heading">' + safe(sa.heading || 'Areas We Serve') + '</h4>' +
        '<div class="fld-footer__areas-tags">' + tags + '</div>' +
        when(sa.note, '<p class="fld-footer__areas-note">' + safe(sa.note) + '</p>') +
      '</section>'
    );
  }

  /* ============================================================
     SECTION: PAYMENT BADGES
     Driven by data.paymentBadges.
     Visual only — no payment processing connected.
     FUTURE: Wire live payment buttons to M-Pesa STK or Stripe here.
  ============================================================ */

  function buildPayments(data) {
    var pb = data.paymentBadges || {};
    if (!pb.enabled || !Array.isArray(pb.methods) || !pb.methods.length) return '';
    var items = pb.methods.map(function (method) {
      var cls = 'fld-footer__payment-item' + (method.comingSoon ? ' fld-footer__payment-item--coming-soon' : '');
      return (
        '<span class="' + cls + '">' +
          '<span class="fld-pay-icon" aria-hidden="true">' + safe(method.icon) + '</span>' +
          safe(method.label) +
        '</span>'
      );
    }).join('');
    return (
      '<div class="fld-footer__payments" aria-label="Accepted Payment Methods">' +
        when(pb.heading,
          '<span class="fld-footer__payments-heading">' + safe(pb.heading) + '</span>'
        ) +
        items +
        when(pb.note,
          '<p class="fld-footer__payments-note">' + safe(pb.note) + '</p>'
        ) +
      '</div>'
    );
  }

  /* ============================================================
     SECTION: APP DOWNLOAD PLACEHOLDER
     Driven by data.appDownload.
     Only rendered when appDownload.enabled = true.
     FUTURE: Update URLs and set comingSoon: false when app launches.
  ============================================================ */

  function buildApp(data) {
    var app = data.appDownload || {};
    if (!app.enabled) return '';
    function appBtn(store) {
      if (!store) return '';
      var liveCls = !store.comingSoon ? ' fld-footer__app-btn--live' : '';
      var attrs = store.comingSoon
        ? 'aria-disabled="true" tabindex="-1"'
        : 'target="_blank" rel="noopener noreferrer"';
      return (
        '<a class="fld-footer__app-btn' + liveCls + '" href="' + safe(store.url || '#') + '" ' + attrs + '>' +
          safe(store.label || '') +
        '</a>'
      );
    }
    return (
      '<div class="fld-footer__app">' +
        '<div class="fld-footer__app-text">' +
          '<h3>' + safe(app.heading || '') + '</h3>' +
          when(app.description, '<p>' + safe(app.description) + '</p>') +
        '</div>' +
        '<div class="fld-footer__app-buttons">' +
          appBtn(app.playStore) +
          appBtn(app.appStore) +
        '</div>' +
      '</div>'
    );
  }

  /* ============================================================
     SECTION: FOOTER MINI SEARCH
     Driven by data.footerSearch.
     Calls window.searchSite() from main.js if available.
     FUTURE: Replace redirect with Algolia or Firebase full-text search.
  ============================================================ */

  function buildSearch(data) {
    var fs = data.footerSearch || {};
    if (!fs.enabled) return '';
    return (
      '<div class="fld-footer__search">' +
        '<div class="fld-footer__search-form" role="search" aria-label="Footer site search">' +
          '<input type="search"' +
            ' class="fld-footer__search-input"' +
            ' id="fldFooterSearchInput"' +
            ' placeholder="' + safe(fs.placeholder || 'Search...') + '"' +
            ' aria-label="Search the site"' +
            ' onkeydown="if(event.key===\'Enter\')FurnostylesFooter.submitSearch()">' +
          '<button class="fld-footer__search-btn" type="button" onclick="FurnostylesFooter.submitSearch()">' +
            safe(fs.buttonText || 'Search') +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  /* ============================================================
     SECTION: SOCIAL LINKS
     Driven by data.socialLinks[].
     Only entries where enabled = true are rendered.
  ============================================================ */

  function buildSocial(data) {
    if (!Array.isArray(data.socialLinks)) return '';
    var active = data.socialLinks.filter(function (l) { return l.enabled; });
    if (!active.length) return '';
    
    var iconMap = {
      whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
      facebook: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
      youtube: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
      tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
      twitter: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
      linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
    };
    
    var links = active.map(function (link) {
      var icon = iconMap[link.icon] || '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>';
      return (
        '<a class="fld-footer__social-link fld-footer__social-link--' + safe(link.icon) + '"' +
        ' href="' + safe(link.url) + '"' +
        ' target="_blank" rel="noopener noreferrer"' +
        ' aria-label="' + safe(link.name) + ' (opens in new tab)">' +
          '<span class="fld-social-icon" aria-hidden="true">' + icon + '</span>' +
        '</a>'
      );
    }).join('');
    return (
      '<div class="fld-footer__social" aria-label="Social Media Links">' +
        links +
      '</div>'
    );
  }

  /* ============================================================
     SECTION: BOTTOM BAR
     Copyright year injected automatically when yearAuto = true.
     Back-to-top inline button rendered when backToTop.enabled = true.
  ============================================================ */

  function buildBottom(data) {
    var copy = data.copyright || {};
    var text  = typeof copy === 'string' ? copy : (copy.text || '');
    var auto  = typeof copy !== 'string' ? copy.yearAuto !== false : true;
    var year  = auto ? new Date().getFullYear() : '';
    var yearHtml = year ? ('&copy; ' + year + ' ') : '';

    // Remove inline Back to Top button - keep only floating version
    return (
      '<div class="fld-footer__bottom">' +
        '<p>' + yearHtml + safe(text) + '</p>' +
      '</div>'
    );
  }

  /* ============================================================
     FOOTER ASSEMBLER
  ============================================================ */

  function buildFooter(data) {
    return [
      '<footer class="fld-footer" role="contentinfo" aria-label="Furnostyles Site Footer">',
      buildAnnounceBar(data),
      buildEmergencyCTA(data),
      buildTop(data),
      buildQuickContact(data),
      buildHours(data),
      buildTrustBadges(data),
      buildColumns(data),
      buildServiceAreas(data),
      buildPayments(data),
      buildApp(data),
      buildSearch(data),
      buildSocial(data),
      buildBottom(data),
      '</footer>'
    ].join('');
  }

  /* ============================================================
     FLOATING BACK-TO-TOP BUTTON
     Appended to <body> separately from the footer.
     Visible after 300px scroll via JS class toggle.
  ============================================================ */

  function attachFloatingBackToTop(data) {
    var btt = data.backToTop || {};
    if (!btt.enabled) return;

    var btn = document.createElement('button');
    btn.className  = 'fld-footer__back-to-top fld-footer__back-to-top--floating';
    btn.id         = 'fldFloatingBackToTop';
    btn.type       = 'button';
    btn.setAttribute('aria-label', 'Scroll back to top');
    btn.textContent = btt.text || 'Back to Top';
    btn.addEventListener('click', scrollToTop);
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btn.classList.add('fld-footer__back-to-top--visible');
      } else {
        btn.classList.remove('fld-footer__back-to-top--visible');
      }
    }, { passive: true });
  }

  /* ============================================================
     MOUNT — inject footer into page
  ============================================================ */

  function mount() {
    var data = window.FurnostylesFooterData;
    if (!data) {
      console.warn('[FurnostylesFooter] footer-data.js must be loaded before footer-render.js.');
      return;
    }

    var html       = buildFooter(data);
    var mountPoint = document.getElementById('fns-footer-mount');

    if (mountPoint) {
      var temp   = document.createElement('div');
      temp.innerHTML = html;
      var footer = temp.firstElementChild;
      if (footer) {
        mountPoint.replaceWith(footer);
      }
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }

    attachFloatingBackToTop(data);
  }

  /* ============================================================
     NEWSLETTER HANDLER
     Saves email to localStorage.
     FUTURE: Replace localStorage write with Firebase or Mailchimp.
  ============================================================ */

  function submitNewsletter() {
    var input  = document.getElementById('fldFooterNewsletterInput');
    var status = document.getElementById('fldFooterNewsletterStatus');
    if (!input || !status) return;

    var email = (input.value || '').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.style.display = 'block';
      status.style.color   = '#ff6b4a';
      status.textContent   = 'Please enter a valid email address.';
      return;
    }

    try {
      var stored = JSON.parse(localStorage.getItem('fldNewsletterSubscribers') || '[]');
      if (stored.indexOf(email) === -1) {
        stored.push(email);
        localStorage.setItem('fldNewsletterSubscribers', JSON.stringify(stored));
      }
    } catch (e) {}

    /* FUTURE: await firebase.firestore().collection('newsletter').add({ email, date }) */

    input.value          = '';
    status.style.display = 'block';
    status.style.color   = '#d4af37';
    status.textContent   = 'Thank you! You\'re subscribed.';

    setTimeout(function () { status.style.display = 'none'; }, 4000);
  }

  /* ============================================================
     SEARCH HANDLER
     Delegates to window.searchSite() from main.js when available.
     Falls back to marketplace.html?q= query string redirect.
     FUTURE: Replace redirect with Algolia InstantSearch or Firebase.
  ============================================================ */

  function submitSearch() {
    var input = document.getElementById('fldFooterSearchInput');
    var query = ((input && input.value) || '').trim();
    if (!query) return;

    if (typeof window.searchSite === 'function') {
      var mainInput = document.getElementById('siteSearch');
      if (mainInput) mainInput.value = query;
      window.searchSite();
    } else {
      window.location.href = 'marketplace.html?q=' + encodeURIComponent(query);
    }
  }

  /* ============================================================
     SCROLL TO TOP
  ============================================================ */

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ============================================================
     PUBLIC API
  ============================================================ */

  window.FurnostylesFooter = {
    init:              mount,
    scrollToTop:       scrollToTop,
    submitNewsletter:  submitNewsletter,
    submitSearch:      submitSearch
  };

  /* Auto-init — runs immediately if DOM is ready, otherwise waits */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

}());
