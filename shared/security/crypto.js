/**
 * FURNOSTYLES — CRYPTO UTILITIES
 * ===============================
 * File: shared/security/crypto.js
 * Purpose: Simple encryption/decryption for sensitive data
 *          Uses Web Crypto API for secure encryption
 *
 * Note: This is a basic implementation. For production, consider:
 * - Using a proper key management system
 * - Server-side encryption for sensitive data
 * - HTTPS for all communications
 *
 * Usage:
 *   window.FurnostylesCrypto.encrypt(text, password)
 *   window.FurnostylesCrypto.decrypt(encrypted, password)
 */

(function() {
  'use strict';

  /**
   * Generate a cryptographic key from a password
   * @param {string} password - Password to derive key from
   * @returns {Promise<CryptoKey>} - Derived key
   */
  async function deriveKey(password) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('furnostyles-salt'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Encrypt text using AES-GCM
   * @param {string} text - Text to encrypt
   * @param {string} password - Encryption password
   * @returns {Promise<string>} - Encrypted data (base64)
   */
  async function encrypt(text, password) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const key = await deriveKey(password);
      
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        data
      );

      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encrypted), iv.length);

      // Convert to base64
      return btoa(String.fromCharCode.apply(null, combined));
    } catch (e) {
      console.error('[Crypto] Encryption failed:', e);
      return null;
    }
  }

  /**
   * Decrypt text using AES-GCM
   * @param {string} encrypted - Encrypted data (base64)
   * @param {string} password - Decryption password
   * @returns {Promise<string>} - Decrypted text
   */
  async function decrypt(encrypted, password) {
    try {
      const combined = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
      const iv = combined.slice(0, 12);
      const data = combined.slice(12);
      
      const key = await deriveKey(password);
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        data
      );

      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    } catch (e) {
      console.error('[Crypto] Decryption failed:', e);
      return null;
    }
  }

  /**
   * Simple hash function for non-sensitive data
   * @param {string} text - Text to hash
   * @returns {string} - Hashed string
   */
  function simpleHash(text) {
    if (typeof text !== 'string') return '';
    var hash = 0;
    for (var i = 0; i < text.length; i++) {
      var char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
  }

  /**
   * Obfuscate data (simple encoding, not encryption)
   * For non-sensitive data that just needs to be unreadable
   * @param {string} text - Text to obfuscate
   * @returns {string} - Obfuscated text
   */
  function obfuscate(text) {
    if (typeof text !== 'string') return '';
    return btoa(encodeURIComponent(text));
  }

  /**
   * De-obfuscate data
   * @param {string} obfuscated - Obfuscated text
   * @returns {string} - Original text
   */
  function deobfuscate(obfuscated) {
    if (typeof obfuscated !== 'string') return '';
    try {
      return decodeURIComponent(atob(obfuscated));
    } catch (e) {
      console.error('[Crypto] De-obfuscation failed:', e);
      return '';
    }
  }

  // Export API
  window.FurnostylesCrypto = {
    encrypt: encrypt,
    decrypt: decrypt,
    simpleHash: simpleHash,
    obfuscate: obfuscate,
    deobfuscate: deobfuscate
  };

  console.log('[Crypto] Crypto utilities module loaded');

})();
