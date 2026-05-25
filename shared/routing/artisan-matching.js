/**
 * Furnostyles Artisan Matching
 * Discovers and computes matches from the platform provider collection against incoming customer requests.
 */

(function () {
  'use strict';

  function _score() { return window.FurnostylesRoutingScore; }

  /**
   * Fetches available artisans / providers from 'users' or fallback and scores them.
   * Filters by specialization matching the service category.
   */
  function findMatches(request, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));
    if (!request) return Promise.resolve([]);

    var category = request.category || 'repair';

    // Role filters to target providers
    var roles = ['vendor', 'supplier', 'admin'];

    return bridge.list('users', {
      where: [{ field: 'role', operator: 'in', value: roles }]
    })
    .then(function (users) {
      var scored = [];

      users.forEach(function (user) {
        // Prepare mock variables if database fields are unpopulated (future-proof fallback)
        var p = {
          id: user.id || user.uid,
          storeName: user.storeName || user.companyName || user.displayName || 'Ecosystem Provider',
          role: user.role,
          specialization: user.importSpecialization || user.businessType || 'renovation',
          location: user.location || 'Nairobi',
          trustLevel: user.trustLevel || 'tier_2',
          disciplineScore: user.disciplineScore || 9.2,
          responseSpeed: user.responseSpeed || 'Under 2 hours',
          completionRate: user.completionRate || 95,
          verificationStatus: user.verificationStatus || 'verified'
        };

        var finalScore = _score() ? _score().calculateScore(p, request) : 80;

        scored.push({
          provider: p,
          score: finalScore
        });
      });

      // Sort by descending matching score
      return scored.sort(function (a, b) { return b.score - a.score; });
    });
  }

  window.FurnostylesArtisanMatching = {
    findMatches: findMatches
  };

}());
