/**
 * Furnostyles Moderation Service
 * All Firestore read/write operations for admin moderation.
 *
 * Uses FurnostylesFirebase bridge — no direct Firestore calls.
 * Does NOT permanently delete documents.
 *
 * Load order: firebase-bridge.js → moderation-status.js → moderation-service.js
 */

(function () {
  'use strict';

  function getBridge() {
    return window.FurnostylesFirebase || null;
  }

  var COL = {
    LISTINGS:        'listings',
    PROPERTIES:      'properties',
    REPAIR_PROJECTS: 'repairProjects'
  };

  /* ------------------------------------------------------------------ */
  /* READ OPERATIONS                                                      */
  /* ------------------------------------------------------------------ */

  /**
   * Load items from a collection filtered by status.
   * @param {string} collection
   * @param {string} statusFilter - 'pending' | 'approved' | 'rejected' | 'hidden' | 'flagged' | 'all'
   * @returns Promise<Array>
   */
  function getByStatus(collection, statusFilter) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available.'));

    var options = { orderBy: { field: 'createdAt', direction: 'asc' } };
    if (statusFilter && statusFilter !== 'all') {
      options.where = [{ field: 'status', operator: '==', value: statusFilter }];
    }
    return bridge.list(collection, options);
  }

  /** Shorthand: load pending-only items */
  function getPending(collection) {
    return getByStatus(collection, 'pending');
  }

  /* ------------------------------------------------------------------ */
  /* MODERATION WRITE OPERATIONS (status updates only — no deletion)     */
  /* ------------------------------------------------------------------ */

  function _setStatus(collection, id, fields) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available.'));
    if (!id)     return Promise.reject(new Error('Document ID is required.'));

    return bridge.update(collection, id, Object.assign({
      updatedAt:   new Date().toISOString(),
      moderatedAt: new Date().toISOString()
    }, fields));
  }

  /**
   * Approve a submission.
   * Sets status → 'approved'. Listing becomes eligible for future public display.
   */
  function approve(collection, id, moderatorNote) {
    return _setStatus(collection, id, {
      status:        'approved',
      approvedAt:    new Date().toISOString(),
      moderatorNote: String(moderatorNote || '').trim()
    });
  }

  /**
   * Reject a submission.
   * Sets status → 'rejected'. Stays in Firestore for audit trail.
   */
  function reject(collection, id, reason) {
    return _setStatus(collection, id, {
      status:          'rejected',
      rejectedAt:      new Date().toISOString(),
      rejectionReason: String(reason || '').trim()
    });
  }

  /**
   * Hide a submission.
   * Sets status → 'hidden'. Not publicly visible but not permanently removed.
   */
  function hide(collection, id, reason) {
    return _setStatus(collection, id, {
      status:     'hidden',
      hiddenAt:   new Date().toISOString(),
      hideReason: String(reason || '').trim()
    });
  }

  /**
   * Flag a submission for further admin review.
   * Sets status → 'flagged'. Appears in flagged queue.
   */
  function flag(collection, id, reason) {
    return _setStatus(collection, id, {
      status:     'flagged',
      flaggedAt:  new Date().toISOString(),
      flagReason: String(reason || '').trim()
    });
  }

  /* ------------------------------------------------------------------ */
  /* EXPORT                                                               */
  /* ------------------------------------------------------------------ */

  window.FurnostylesModeration = {
    COLLECTIONS: COL,
    getByStatus: getByStatus,
    getPending:  getPending,
    approve:     approve,
    reject:      reject,
    hide:        hide,
    flag:        flag
  };

}());
