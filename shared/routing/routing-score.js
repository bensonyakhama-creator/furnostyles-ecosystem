/**
 * Furnostyles Routing Score
 * Evaluates candidates based on verification status, discipline scores, response speed, and completion rates.
 */

(function () {
  'use strict';

  /**
   * Calculates a match suitability score (0 - 100) for a given provider and request.
   */
  function calculateScore(provider, request) {
    if (!provider || !request) return 0;

    var score = 50; // Starting baseline

    // Factor 1: Verification status (Max +15)
    if (provider.verificationStatus === 'verified') score += 15;
    else if (provider.verificationStatus === 'pending') score += 5;

    // Factor 2: Trust level / Rank (Max +15)
    var trustMap = { tier_1: 15, premium: 15, tier_2: 10, standard: 5 };
    score += (trustMap[provider.trustLevel] || 0);

    // Factor 3: Discipline score (Max +20)
    // Scale local metric: e.g. 9.8 out of 10
    var disc = Number(provider.disciplineScore) || 8.0;
    score += (disc * 2.0); // scale 10 to 20

    // Factor 4: Response speed suitability (Max +10)
    var speedMap = { 'Under 1 hour': 10, 'Under 2 hours': 8, 'Under 3 hours': 6, 'Under 6 hours': 4 };
    score += (speedMap[provider.responseSpeed] || 5);

    // Factor 5: Completion rates (Max +15)
    var rate = Number(provider.completionRate) || 90; // default 90%
    score += (rate * 0.15); // scaled to max 15

    // Factor 6: Location match penalty/bonus (Max +/- 15)
    if (request.location && provider.location) {
      var reqLoc = String(request.location).toLowerCase();
      var provLoc = String(provider.location).toLowerCase();
      if (reqLoc === provLoc || reqLoc.indexOf(provLoc) !== -1 || provLoc.indexOf(reqLoc) !== -1) {
        score += 15; // Local bonus
      } else {
        score -= 5;  // Distance penalty
      }
    }

    // Wrap-around clamp
    return Math.min(100, Math.max(0, Math.round(score)));
  }

  window.FurnostylesRoutingScore = {
    calculateScore: calculateScore
  };

}());
