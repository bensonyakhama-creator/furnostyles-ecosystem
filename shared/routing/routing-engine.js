/**
 * Furnostyles Routing Engine
 * Core coordinator managing service requests submissions, state tracking, and recommendation builds.
 */

(function () {
  'use strict';

  function _matching() { return window.FurnostylesArtisanMatching; }

  /**
   * Registers a customer request into the serviceRequests collection.
   * Generates dynamic internal routing recommendations in parallel.
   */
  function submitRequest(data, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));
    if (!data) return Promise.reject(new Error('Invalid request payload.'));

    var doc = {
      category: data.category || 'repair',
      subcategory: data.subcategory || '',
      location: data.location || 'Nairobi',
      urgency: data.urgency || 'standard',
      description: data.description || '',
      images: data.images || [],
      budgetPlaceholder: data.budget || '',
      preferredSchedule: data.schedule || '',
      status: 'pending review', // Starts moderated
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    var reqId;

    return bridge.create('serviceRequests', doc)
      .then(function (newReq) {
        reqId = newReq.id;

        // Automatically build future-ready internal routing recommendations
        if (_matching()) {
          return _matching().findMatches(doc, bridge)
            .then(function (matches) {
              var recs = {
                requestId: reqId,
                category: doc.category,
                matchedAt: new Date().toISOString(),
                candidates: matches.slice(0, 3).map(function (m) {
                  return {
                    providerId: m.provider.id,
                    score: m.score,
                    reason: 'Suitable score matching location (' + m.provider.location + ') and discipline score.'
                  };
                })
              };
              return bridge.create('routingRecommendations', recs);
            })
            .then(function () {
              return { success: true, id: reqId, status: 'pending review' };
            });
        }
        return { success: true, id: reqId, status: 'pending review' };
      });
  }

  window.FurnostylesRoutingEngine = {
    submitRequest: submitRequest
  };

}());
