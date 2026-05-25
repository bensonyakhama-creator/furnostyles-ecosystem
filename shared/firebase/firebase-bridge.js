/**
 * FURNOSTYLES — FIREBASE BRIDGE
 * ==============================
 * File: shared/firebase/firebase-bridge.js
 *
 * PURPOSE:
 *   Dual-mode data layer that all pages use for persistence.
 *   Automatically detects the correct mode and switches accordingly.
 *
 * MODES:
 *   LOCAL MODE    — Firebase SDK not loaded OR config has placeholder values.
 *                   All data stored in localStorage (dev/demo only).
 *   FIREBASE MODE — Firebase Compat SDK loaded AND real config keys present.
 *                   All data reads/writes go to Firestore + Auth + Storage.
 *
 * LOAD ORDER (in HTML):
 *   1. (Optional for Firebase mode) Firebase Compat SDK from CDN
 *   2. shared/firebase/firebase-config.js
 *   3. shared/firebase/firebase-bridge.js          ← this file
 *
 * EXPOSES:
 *   window.FurnostylesFirebase        — unified API object (same surface in both modes)
 *   window.FurnostylesFirebaseReady   — Promise that resolves when bridge is ready
 *
 * UNIFIED API (available in both modes):
 *   .save(collection, data)           → Promise<id>
 *   .list(collection, options)        → Promise<Array>
 *   .get(collection, id)              → Promise<object|null>
 *   .update(collection, id, data)     → Promise<void>
 *   .remove(collection, id)           → Promise<void>
 *   .getUser()                        → object|null (current auth user)
 *   .onAuthChange(callback)           → unsubscribe function
 *   .isLive()                         → Boolean (true = Firebase mode)
 *   .mode                             → 'local' | 'firebase'
 *   .app                              → Firebase app instance | null
 *   .db                               → Firestore instance | null
 *   .auth                             → Firebase Auth instance | null
 *   .storage                          → Firebase Storage instance | null
 */

(function () {
  'use strict';

  /* ============================================================
     PLACEHOLDER DETECTION
     Checks whether the config contains real credentials or the
     PASTE_... placeholder strings from firebase-config.js.
  ============================================================ */

  function configIsPlaceholder(cfg) {
    if (!cfg || !cfg.apiKey) return true;
    var key = String(cfg.apiKey);
    return (
      key === '' ||
      key.indexOf('PASTE') === 0 ||
      key.indexOf('AIzaSyXXX') === 0 ||
      key.length < 20
    );
  }

  /* ============================================================
     DETERMINE BRIDGE MODE
  ============================================================ */

  var cfg         = window.FURNOSTYLES_FIREBASE_CONFIG || {};
  var hasSDK      = (typeof firebase !== 'undefined' &&
                     typeof firebase.initializeApp === 'function');
  var hasRealCfg  = !configIsPlaceholder(cfg);
  var liveMode    = hasSDK && hasRealCfg;

  /* ============================================================
     LOCAL STORAGE HELPERS  (used in LOCAL mode)
     Key pattern: fns_col_<collection>   →  JSON array of docs
  ============================================================ */

  var LOCAL_PREFIX = 'fns_col_';

  function lsKey(col)    { return LOCAL_PREFIX + col; }
  function lsGenId()     { return 'local_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7); }

  function lsRead(col) {
    try { return JSON.parse(localStorage.getItem(lsKey(col)) || '[]'); }
    catch (e) { return []; }
  }

  function lsWrite(col, docs) {
    try { localStorage.setItem(lsKey(col), JSON.stringify(docs)); }
    catch (e) { console.warn('[Bridge/local] localStorage write failed:', e); }
  }

  /* ============================================================
     LOCAL MODE API
  ============================================================ */

  var localBridge = {
    mode:    'local',
    app:     null,
    db:      null,
    auth:    null,
    storage: null,

    isLive: function () { return false; },

    save: function (collection, data) {
      var docs = lsRead(collection);
      var id   = data.id || lsGenId();
      var doc  = Object.assign({}, data, {
        id:        id,
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      docs.push(doc);
      lsWrite(collection, docs);
      return Promise.resolve(id);
    },

    list: function (collection, options) {
      var docs = lsRead(collection);
      /* Basic client-side filter/sort matching Firestore options shape */
      if (options && options.where) {
        options.where.forEach(function (w) {
          docs = docs.filter(function (d) {
            if (w.operator === '==' || w.operator === '===') return d[w.field] === w.value;
            if (w.operator === '!=' || w.operator === '!==') return d[w.field] !== w.value;
            if (w.operator === '>') return d[w.field] > w.value;
            if (w.operator === '<') return d[w.field] < w.value;
            return true;
          });
        });
      }
      if (options && options.orderBy) {
        var ob = Array.isArray(options.orderBy) ? options.orderBy[0] : options.orderBy;
        var dir = (ob.direction || 'asc') === 'desc' ? -1 : 1;
        docs = docs.slice().sort(function (a, b) {
          return a[ob.field] < b[ob.field] ? -dir : a[ob.field] > b[ob.field] ? dir : 0;
        });
      }
      if (options && options.limit) {
        docs = docs.slice(0, options.limit);
      }
      return Promise.resolve(docs);
    },

    get: function (collection, id) {
      var docs = lsRead(collection);
      var doc  = docs.find(function (d) { return d.id === id; }) || null;
      return Promise.resolve(doc);
    },

    update: function (collection, id, data) {
      var docs = lsRead(collection);
      var idx  = docs.findIndex(function (d) { return d.id === id; });
      if (idx === -1) return Promise.reject(new Error('[Bridge/local] Document not found: ' + id));
      docs[idx] = Object.assign({}, docs[idx], data, { updatedAt: new Date().toISOString() });
      lsWrite(collection, docs);
      return Promise.resolve();
    },

    remove: function (collection, id) {
      var docs = lsRead(collection).filter(function (d) { return d.id !== id; });
      lsWrite(collection, docs);
      return Promise.resolve();
    },

    getUser:      function () { return null; },
    onAuthChange: function (cb) { cb(null); return function () {}; }
  };

  /* ============================================================
     FIREBASE MODE — use instances from firebase-init.js
     firebase-init.js is the SINGLE initialization point.
     This bridge only uses the instances, never initializes.
  ============================================================ */

  function buildFirebaseBridge() {
    var app, db, auth;

    /* Use instances from firebase-init.js if available */
    if (window.FurnostylesFirebaseInit && window.FurnostylesFirebaseInit.isInitialized()) {
      var instances = window.FurnostylesFirebaseInit.getInstances();
      app  = instances.app;
      db   = instances.firestore;
      auth = instances.auth;
      console.log('[Bridge/firebase] Using instances from firebase-init.js');
    } else {
      /* Fallback: Use existing global instances if bridge already initialized them */
      if (window.FurnostylesFirebase && window.FurnostylesFirebase.app) {
        app  = window.FurnostylesFirebase.app;
        db   = window.FurnostylesFirebase.db;
        auth = window.FurnostylesFirebase.auth;
        console.log('[Bridge/firebase] Using existing global instances');
      } else {
        console.error('[Bridge/firebase] No Firebase instances available. firebase-init.js must be loaded first.');
        return localBridge;
      }
    }

    /* Expose singleton instances for advanced service files */
    window.FurnostylesFirebase = window.FurnostylesFirebase || {};
    window.FurnostylesFirebase.app     = app;
    window.FurnostylesFirebase.db      = db;
    window.FurnostylesFirebase.auth    = auth;
    window.FurnostylesFirebase.storage = null;

    /* Also wire FurnostylesFirebaseInit so existing service files work */
    window.FurnostylesFirebaseInit = window.FurnostylesFirebaseInit || {};
    window.FurnostylesFirebaseInit.getFirestore = function () { return db; };
    window.FurnostylesFirebaseInit.getAuth      = function () { return auth; };
    window.FurnostylesFirebaseInit.getStorage   = function () { return null; }; // Storage skipped for Cloudflare hosting
    window.FurnostylesFirebaseInit.isInitialized = function () { return true; };

    return {
      mode:    'firebase',
      app:     app,
      db:      db,
      auth:    auth,
      storage: null, // Storage skipped for Cloudflare hosting

      isLive: function () { return true; },

      save: function (collection, data) {
        if (!db) return localBridge.save(collection, data);
        var doc = Object.assign({}, data, {
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return db.collection(collection).add(doc)
          .then(function (ref) { return ref.id; });
      },

      list: function (collection, options) {
        if (!db) return localBridge.list(collection, options);
        var q = db.collection(collection);
        if (options && options.where) {
          options.where.forEach(function (w) {
            q = q.where(w.field, w.operator, w.value);
          });
        }
        if (options && options.orderBy) {
          var ob = Array.isArray(options.orderBy) ? options.orderBy[0] : options.orderBy;
          q = q.orderBy(ob.field, ob.direction || 'asc');
        }
        if (options && options.limit) { q = q.limit(options.limit); }
        return q.get().then(function (snap) {
          var docs = [];
          snap.forEach(function (d) { docs.push(Object.assign({ id: d.id }, d.data())); });
          return docs;
        });
      },

      get: function (collection, id) {
        if (!db) return localBridge.get(collection, id);
        return db.collection(collection).doc(id).get()
          .then(function (d) {
            return d.exists ? Object.assign({ id: d.id }, d.data()) : null;
          });
      },

      update: function (collection, id, data) {
        if (!db) return localBridge.update(collection, id, data);
        return db.collection(collection).doc(id).update(
          Object.assign({}, data, {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })
        );
      },

      remove: function (collection, id) {
        if (!db) return localBridge.remove(collection, id);
        return db.collection(collection).doc(id).delete();
      },

      getUser: function () {
        return auth ? auth.currentUser : null;
      },

      onAuthChange: function (cb) {
        if (!auth) { cb(null); return function () {}; }
        return auth.onAuthStateChanged(cb);
      }
    };
  }

  /* ============================================================
     BUILD + EXPOSE BRIDGE
  ============================================================ */

  var bridge = liveMode ? buildFirebaseBridge() : localBridge;

  window.FurnostylesFirebase = Object.assign(
    window.FurnostylesFirebase || {},
    bridge,
    {
      mode:   liveMode ? 'firebase' : 'local',
      isLive: function () { return liveMode; }
    }
  );

  window.FurnostylesFirebaseReady = Promise.resolve(window.FurnostylesFirebase);

  /* Wire FurnostylesFirebaseInit stubs for service files when in local mode */
  if (!liveMode) {
    window.FurnostylesFirebaseInit = window.FurnostylesFirebaseInit || {};
    window.FurnostylesFirebaseInit.getFirestore  = function () { return null; };
    window.FurnostylesFirebaseInit.getAuth       = function () { return null; };
    window.FurnostylesFirebaseInit.getStorage    = function () { return null; };
    window.FurnostylesFirebaseInit.isInitialized = function () { return false; };
  }

  if (liveMode) {
    console.log('[FurnostylesFirebase] Bridge running in FIREBASE mode — Firestore/Auth/Storage active.');
  } else {
    console.info('[FurnostylesFirebase] Bridge running in LOCAL mode — using localStorage. ' +
      (hasSDK ? '(Config has placeholder values.)' : '(Firebase SDK not loaded.)'));
  }

}());
