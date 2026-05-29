/**
 * FURNOSTYLES — INPUT SANITIZATION
 * ================================
 * File: shared/security/sanitize.js
 * Purpose: Sanitize user input to prevent XSS attacks
 *          Provides safe alternatives to innerHTML
 *
 * Usage:
 *   window.FurnostylesSanitize.escapeHtml(text)
 *   window.FurnostylesSanitize.sanitizeHtml(html)
 *   window.FurnostylesSanitize.setSafeHtml(element, html)
 */

(function() {
  'use strict';

  /**
   * Escape HTML entities to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} - Escaped text
   */
  function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Sanitize HTML by removing dangerous tags and attributes
   * This is a basic sanitizer - for production, consider using DOMPurify
   * @param {string} html - HTML to sanitize
   * @returns {string} - Sanitized HTML
   */
  function sanitizeHtml(html) {
    if (typeof html !== 'string') return html;

    // Remove script tags and their content
    var sanitized = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, '');
    
    // Remove on* event handlers (onclick, onerror, etc.)
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gim, '');
    
    // Remove javascript: protocol
    sanitized = sanitized.replace(/javascript:/gim, '');
    
    // Remove iframe tags
    sanitized = sanitized.replace(/<iframe\b[^>]*>([\s\S]*?)<\/iframe>/gim, '');
    
    // Remove object/embed tags
    sanitized = sanitized.replace(/<(object|embed)\b[^>]*>([\s\S]*?)<\/\1>/gim, '');
    
    // Remove style tags with dangerous content
    sanitized = sanitized.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, function(match, content) {
      // Remove expressions and url() with javascript:
      var safeContent = content
        .replace(/expression\s*\([^)]*\)/gim, '')
        .replace(/url\s*\(\s*["']?javascript:/gim, 'url("about:blank');
      return '<style>' + safeContent + '</style>';
    });

    return sanitized;
  }

  /**
   * Safely set innerHTML on an element
   * @param {HTMLElement} element - Target element
   * @param {string} html - HTML content
   * @param {boolean} escape - Whether to escape all HTML (default: false)
   */
  function setSafeHtml(element, html, escape) {
    if (!element || !html) return;
    
    if (escape) {
      element.textContent = html;
    } else {
      element.innerHTML = sanitizeHtml(html);
    }
  }

  /**
   * Create a text node and append to element (safest method)
   * @param {HTMLElement} element - Target element
   * @param {string} text - Text content
   */
  function setTextContent(element, text) {
    if (!element) return;
    element.textContent = text;
  }

  /**
   * Sanitize URL to prevent javascript: and data: exploits
   * @param {string} url - URL to sanitize
   * @returns {string} - Sanitized URL
   */
  function sanitizeUrl(url) {
    if (typeof url !== 'string') return '';
    
    // Remove javascript: and data: protocols
    var sanitized = url.replace(/^(javascript|data):/i, '');
    
    // Ensure http or https protocol
    if (sanitized && !sanitized.match(/^https?:\/\//i)) {
      sanitized = 'https://' + sanitized;
    }
    
    return sanitized;
  }

  /**
   * Validate and sanitize attribute value
   * @param {string} value - Attribute value
   * @param {string} type - Attribute type (url, html, text)
   * @returns {string} - Sanitized value
   */
  function sanitizeAttribute(value, type) {
    if (typeof value !== 'string') return '';
    
    switch (type) {
      case 'url':
        return sanitizeUrl(value);
      case 'html':
        return sanitizeHtml(value);
      case 'text':
      default:
        return escapeHtml(value);
    }
  }

  // Export API
  window.FurnostylesSanitize = {
    escapeHtml: escapeHtml,
    sanitizeHtml: sanitizeHtml,
    setSafeHtml: setSafeHtml,
    setTextContent: setTextContent,
    sanitizeUrl: sanitizeUrl,
    sanitizeAttribute: sanitizeAttribute
  };

  console.log('[Sanitize] Input sanitization module loaded');

})();
