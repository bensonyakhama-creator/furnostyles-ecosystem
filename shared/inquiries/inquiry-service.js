/**
 * Furnostyles Inquiry Service
 * Service layer for inquiry submission and Firestore integration.
 * Uses the FurnostylesFirebase bridge (.save/.list/.get/.update) which
 * works in both LOCAL mode (localStorage) and FIREBASE mode (Firestore).
 */

(function () {
  'use strict';

  /**
   * Get the active bridge instance
   */
  function getBridge() {
    return window.FurnostylesFirebase || null;
  }

  /**
   * Get inquiry collection name from config
   */
  function getCollection() {
    return (window.FurnostylesInquiryConfig &&
      window.FurnostylesInquiryConfig.getCollectionName()) || 'inquiries';
  }

  /**
   * Submit inquiry via bridge (works LOCAL + FIREBASE)
   */
  function submitInquiry(inquiryData) {
    return new Promise(function (resolve, reject) {
      var bridge = getBridge();
      if (!bridge) {
        reject(new Error('Firebase bridge not available'));
        return;
      }

      var sanitizedData = window.FurnostylesInquiryValidation ?
        window.FurnostylesInquiryValidation.sanitizeInquiryData(inquiryData) : inquiryData;

      var doc = {
        inquiryType: sanitizedData.inquiryType || 'general',
        fullName: sanitizedData.fullName || '',
        phone: sanitizedData.phone || '',
        email: sanitizedData.email || '',
        location: sanitizedData.location || '',
        message: sanitizedData.message || '',
        relatedCategory: sanitizedData.relatedCategory || '',
        relatedPage: sanitizedData.relatedPage ||
          window.location.pathname.split('/').pop() || '',
        status: 'new',
        source: sanitizedData.source || 'web_form',
        createdAt: new Date().toISOString()
      };

      if (window.FurnostylesAuthState) {
        var user = window.FurnostylesAuthState.getCurrentUser();
        if (user) {
          doc.userId = user.uid;
          doc.userEmail = user.email;
        }
      }

      bridge.save(getCollection(), doc)
        .then(function (id) {
          resolve({ success: true, inquiryId: id, inquiry: doc });
        })
        .catch(function (error) {
          console.error('[InquiryService] Submit error:', error);
          reject(error);
        });
    });
  }

  /**
   * Submit inquiry with validation
   */
  function submitInquiryWithValidation(inquiryData) {
    return new Promise(function (resolve, reject) {
      // Validate inquiry data
      var validation = window.FurnostylesInquiryValidation ?
        window.FurnostylesInquiryValidation.validateInquiry(inquiryData) :
        { isValid: true, errors: {} };

      if (!validation.isValid) {
        reject({
          success: false,
          type: 'validation',
          errors: validation.errors
        });
        return;
      }

      // Submit validated inquiry
      submitInquiry(inquiryData)
        .then(function (result) {
          resolve(result);
        })
        .catch(function (error) {
          reject({
            success: false,
            type: 'submission',
            error: error
          });
        });
    });
  }

  /**
   * Get inquiry by ID
   */
  function getInquiryById(inquiryId) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available'));

    return bridge.get(getCollection(), inquiryId)
      .then(function (doc) {
        if (!doc) throw new Error('Inquiry not found');
        return { success: true, inquiryId: doc.id || inquiryId, inquiry: doc };
      });
  }

  /**
   * Get all inquiries (for admin use)
   * Returns up to 100 most recent inquiries ordered by createdAt desc
   */
  function getAllInquiries(options) {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available'));

    var opts = {
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit: (options && options.limit) ? options.limit : 100
    };

    return bridge.list(getCollection(), opts)
      .then(function (docs) {
        return { success: true, inquiries: docs };
      });
  }

  /**
   * Get inquiries for current authenticated user
   */
  function getUserInquiries() {
    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available'));

    var user = window.FurnostylesAuthState ?
      window.FurnostylesAuthState.getCurrentUser() : null;
    if (!user) return Promise.reject(new Error('User not authenticated'));

    return bridge.list(getCollection(), {
      where: [{ field: 'userId', operator: '==', value: user.uid }],
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit: 50
    }).then(function (docs) {
      return { success: true, inquiries: docs };
    });
  }

  /**
   * Update inquiry status (admin only — no delete exposed)
   * Allowed statuses: new, contacted, in_progress, assigned, completed, closed
   */
  function updateInquiryStatus(inquiryId, newStatus) {
    var ALLOWED = ['new', 'contacted', 'in_progress', 'assigned', 'completed', 'closed'];
    if (ALLOWED.indexOf(newStatus) === -1) {
      return Promise.reject(new Error('Invalid status: ' + newStatus));
    }

    var bridge = getBridge();
    if (!bridge) return Promise.reject(new Error('Firebase bridge not available'));

    return bridge.update(getCollection(), inquiryId, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    }).then(function () {
      return { success: true, inquiryId: inquiryId, status: newStatus };
    });
  }

  /**
   * Export service API
   */
  window.FurnostylesInquiryService = {
    submitInquiry: submitInquiry,
    submitInquiryWithValidation: submitInquiryWithValidation,
    getInquiryById: getInquiryById,
    getAllInquiries: getAllInquiries,
    getUserInquiries: getUserInquiries,
    updateInquiryStatus: updateInquiryStatus
  };

}());
