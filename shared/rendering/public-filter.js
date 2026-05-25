/**
 * Furnostyles Public Filter
 * Builds bridge.list() option objects for public marketplace queries.
 * Only surfaces documents with status === "approved".
 *
 * Load order: firebase-bridge.js → public-filter.js
 */

(function () {
  'use strict';

  var SORT = {
    NEWEST:     { field: 'createdAt', direction: 'desc' },
    OLDEST:     { field: 'createdAt', direction: 'asc' },
    PRICE_LOW:  { field: 'price',     direction: 'asc' },
    PRICE_HIGH: { field: 'price',     direction: 'desc' }
  };

  var SORT_KEY_MAP = {
    newest:     SORT.NEWEST,
    oldest:     SORT.OLDEST,
    price_low:  SORT.PRICE_LOW,
    price_high: SORT.PRICE_HIGH
  };

  function _bridge() {
    return window.FurnostylesFirebase || null;
  }

  function _approvedWhere(extra) {
    var where = [{ field: 'status', operator: '==', value: 'approved' }];
    if (extra && extra.length) {
      extra.forEach(function (w) { where.push(w); });
    }
    return where;
  }

  /**
   * Generic approved query.
   * @param {string} collection
   * @param {Array}  extraWhere - additional { field, operator, value } filters
   * @param {Object} sort       - { field, direction } — default NEWEST
   * @param {number} limit      - default 60
   */
  function getApproved(collection, extraWhere, sort, limit) {
    var b = _bridge();
    if (!b) return Promise.reject(new Error('Firebase bridge not available.'));
    return b.list(collection, {
      where:   _approvedWhere(extraWhere),
      orderBy: sort || SORT.NEWEST,
      limit:   limit || 60
    });
  }

  /** All approved listings regardless of listingType */
  function getApprovedListings(sort, limit) {
    return getApproved('listings', null, sort, limit);
  }

  /** Approved listings filtered to a specific listingType */
  function getApprovedByType(listingType, sort, limit) {
    return getApproved('listings', [
      { field: 'listingType', operator: '==', value: listingType }
    ], sort, limit);
  }

  /** All approved properties */
  function getApprovedProperties(sort, limit) {
    return getApproved('properties', null, sort, limit);
  }

  /** All approved repair projects */
  function getApprovedRepairs(sort, limit) {
    return getApproved('repairProjects', null, sort, limit);
  }

  /**
   * Client-side re-sort when user changes the sort dropdown.
   * Bridge already returns newest-first; this re-sorts locally so no extra query needed.
   */
  function sortItems(items, sortKey) {
    var sorted = items.slice();
    if (sortKey === 'price_low') {
      sorted.sort(function (a, b) { return (a.price || 0) - (b.price || 0); });
    } else if (sortKey === 'price_high') {
      sorted.sort(function (a, b) { return (b.price || 0) - (a.price || 0); });
    } else if (sortKey === 'oldest') {
      sorted.sort(function (a, b) {
        return (a.createdAt || '') < (b.createdAt || '') ? -1 : 1;
      });
    } else {
      sorted.sort(function (a, b) {
        return (a.createdAt || '') > (b.createdAt || '') ? -1 : 1;
      });
    }
    return sorted;
  }

  /** Resolve a sort-key string to a SORT object (for initial load query) */
  function resolveSortKey(key) {
    return SORT_KEY_MAP[key] || SORT.NEWEST;
  }

  window.FurnostylesPublicFilter = {
    SORT:                  SORT,
    getApproved:           getApproved,
    getApprovedListings:   getApprovedListings,
    getApprovedByType:     getApprovedByType,
    getApprovedProperties: getApprovedProperties,
    getApprovedRepairs:    getApprovedRepairs,
    sortItems:             sortItems,
    resolveSortKey:        resolveSortKey
  };

}());
