/**
 * FURNOSTYLES — INTELLIGENT ARTISAN ROUTING
 * ==========================================
 * File: shared/routing/intelligent-artisan-routing.js
 * Purpose: Intelligent artisan routing architecture for customer requests,
 *          intelligent artisan matching, ratings, discipline scoring, response speed,
 *          reliability, location, and specialization.
 */

(function () {
  'use strict';

  /**
   * CUSTOMER REQUEST STRUCTURE
   * How customer requests are structured
   */
  var CustomerRequestStructure = {
    types: {
      repair: 'repair-service-request',
      installation: 'installation-service-request',
      consultation: 'consultation-service-request',
      maintenance: 'maintenance-service-request',
      renovation: 'renovation-service-request'
    },
    details: {
      category: 'service-category',
      description: 'service-description',
      urgency: 'urgency-level',
      location: 'service-location',
      budget: 'budget-range',
      timeline: 'timeline-preference'
    },
    submission: {
      quick: 'quick-request-form',
      detailed: 'detailed-request-form',
      voice: 'voice-input-option',
      images: 'image-upload-option'
    }
  };

  /**
   * INTELLIGENT ARTISAN MATCHING STRUCTURE
   * How artisans are intelligently matched to requests
   */
  var IntelligentArtisanMatchingStructure = {
    matching: {
      automatic: 'automatic-artisan-matching',
      manual: 'manual-artisan-selection',
      hybrid: 'hybrid-matching-system'
    },
    factors: {
      ratings: 'artisan-rating-weight',
      discipline: 'discipline-match-score',
      responsiveness: 'responsiveness-score',
      expertise: 'expertise-match-score',
      location: 'location-proximity-score',
      reliability: 'reliability-score',
      availability: 'availability-status',
      pricing: 'pricing-competitiveness-score',
      history: 'historical-performance-score'
    },
    algorithm: {
      weighted: 'weighted-scoring-algorithm',
      machineLearning: 'machine-learning-optimization',
      feedback: 'feedback-loop-optimization',
      prediction: 'performance-prediction'
    }
  };

  /**
   * ARTISAN RATING STRUCTURE
   * How artisan ratings are calculated
   */
  var ArtisanRatingStructure = {
    components: {
      overall: 'overall-rating-1-5',
      quality: 'quality-rating',
      reliability: 'reliability-rating',
      communication: 'communication-rating',
      professionalism: 'professionalism-rating',
      timeliness: 'timeliness-rating'
    },
    sources: {
      customers: 'customer-reviews',
      furnostyles: 'furnostyles-assessment',
      peers: 'peer-reviews',
      performance: 'performance-metrics'
    },
    calculation: {
      weighted: 'weighted-average-calculation',
      recent: 'recent-performance-weighting',
      volume: 'volume-adjusted-rating'
    }
  };

  /**
   * DISCIPLINE SCORING STRUCTURE
   * How discipline matching is scored
   */
  var DisciplineScoringStructure = {
    disciplines: {
      electrical: 'electrician-discipline',
      plumbing: 'plumber-discipline',
      carpentry: 'carpenter-discipline',
      painting: 'painter-discipline',
      flooring: 'flooring-specialist-discipline',
      roofing: 'roofing-specialist-discipline',
      welding: 'welder-discipline',
      handyman: 'handyman-discipline',
      general: 'general-contractor-discipline'
    },
    scoring: {
      primary: 'primary-discipline-match',
      secondary: 'secondary-discipline-match',
      expertise: 'expertise-level-match',
      certification: 'certification-match'
    },
    weighting: {
      exact: 'exact-discipline-match-weight',
      related: 'related-discipline-match-weight',
      general: 'general-discipline-match-weight'
    }
  };

  /**
   * RESPONSE SPEED STRUCTURE
   * How response speed is measured and weighted
   */
  var ResponseSpeedStructure = {
    metrics: {
      average: 'average-response-time',
      acceptance: 'job-acceptance-rate',
      communication: 'communication-frequency'
    },
    scoring: {
      realtime: 'realtime-response-tracking',
      historical: 'historical-response-data',
      trends: 'response-speed-trends'
    },
    weighting: {
      urgent: 'urgent-request-response-weight',
      standard: 'standard-request-response-weight',
      scheduled: 'scheduled-request-response-weight'
    }
  };

  /**
   * RELIABILITY STRUCTURE
   * How reliability is measured and weighted
   */
  var ReliabilityStructure = {
    metrics: {
      completion: 'job-completion-rate',
      onTime: 'on-time-completion-rate',
      quality: 'quality-consistency',
      communication: 'communication-reliability'
    },
    tracking: {
      history: 'job-history-tracking',
      patterns: 'reliability-patterns',
      flags: 'reliability-flags'
    },
    scoring: {
      calculation: 'reliability-score-calculation',
      weighting: 'reliability-weight-in-matching',
      impact: 'impact-on-routing'
    }
  };

  /**
   * LOCATION STRUCTURE
    * How location proximity is calculated
   */
  var LocationStructure = {
    routing: {
      proximity: 'proximity-based-routing',
      coverage: 'service-area-coverage',
      travel: 'travel-time-consideration'
    },
    coverage: {
      primary: 'primary-service-area',
      secondary: 'secondary-service-area',
      special: 'special-travel-arrangements'
    },
    scoring: {
      distance: 'distance-score',
      travel: 'travel-time-score',
      availability: 'location-availability-score'
    }
  };

  /**
   * SPECIALIZATION STRUCTURE
   * How specialization is matched
   */
  var SpecializationStructure = {
    types: {
      niche: 'niche-specialization',
      expertise: 'expertise-level',
      certification: 'certification-specialization',
      experience: 'experience-specialization'
    },
    matching: {
      exact: 'exact-specialization-match',
      related: 'related-specialization-match',
      general: 'general-specialization-match'
    },
    scoring: {
      primary: 'primary-specialization-score',
      secondary: 'secondary-specialization-score',
      expertise: 'expertise-level-score'
    }
  };

  /**
   * ROUTING ALGORITHM STRUCTURE
   * How the routing algorithm works
   */
  var RoutingAlgorithmStructure = {
    process: {
      request: 'receive-customer-request',
      analysis: 'analyze-request-requirements',
      matching: 'match-available-artisans',
      scoring: 'score-matched-artisans',
      selection: 'select-best-artisan',
      notification: 'notify-selected-artisan',
      confirmation: 'confirm-artisan-acceptance'
    },
    optimization: {
      efficiency: 'routing-efficiency-optimization',
      quality: 'quality-optimization',
      cost: 'cost-optimization',
      time: 'time-optimization'
    },
    learning: {
      feedback: 'feedback-loop-learning',
      performance: 'performance-data-learning',
      patterns: 'pattern-recognition-learning'
    }
  };

  /**
   * ARTISAN AVAILABILITY STRUCTURE
   * How artisan availability is managed
   */
  var ArtisanAvailabilityStructure = {
    status: {
      available: 'immediately-available',
      scheduled: 'scheduled-availability',
      busy: 'currently-busy',
      offline: 'temporarily-offline'
    },
    scheduling: {
      realtime: 'realtime-availability',
      calendar: 'calendar-based-availability',
      onDemand: 'on-demand-availability'
    },
    matching: {
      immediate: 'immediate-availability-match',
      scheduled: 'scheduled-availability-match',
      flexible: 'flexible-availability-match'
    }
  };

  /**
   * ROUTING CUSTOMER EXPERIENCE STRUCTURE
   * How the routing experience feels to customers
   */
  var RoutingCustomerExperienceStructure = {
    request: {
      simple: 'simple-request-process',
      fast: 'fast-request-submission',
      clear: 'clear-request-tracking'
    },
    matching: {
      transparent: 'transparent-matching-process',
      informed: 'informed-artisan-selection',
      control: 'customer-control-option'
    },
    communication: {
      updates: 'realtime-updates',
      notifications: 'push-notifications',
      support: 'support-throughout-process'
    }
  };

  /**
   * ROUTING ARTISAN EXPERIENCE STRUCTURE
   * How the routing experience feels to artisans
   */
  var RoutingArtisanExperienceStructure = {
    notification: {
      timely: 'timely-job-notifications',
      detailed: 'detailed-job-information',
      convenient: 'convenient-response-methods'
    },
    acceptance: {
      quick: 'quick-acceptance-process',
      flexible: 'flexible-acceptance-options',
      transparent: 'transparent-job-details'
    },
    management: {
      scheduling: 'easy-scheduling',
      communication: 'easy-customer-communication',
      completion: 'simple-completion-process'
    }
  };

  /**
   * EXAMPLE ROUTING SCENARIO
   * Example: Customer buys tiles → requests tile fixing → Furnostyles routes best artisan
   */
  var ExampleRoutingScenario = {
    trigger: {
      action: 'customer-purchases-tiles',
      context: 'tile-purchase-transaction',
      opportunity: 'installation-service-opportunity'
    },
    suggestion: {
      prompt: 'suggest-tile-installation-service',
      option: 'request-installer',
      value: 'professional-installation-value'
    },
    request: {
      submission: 'customer-submits-installation-request',
      details: 'tile-type-quantity-location-details',
      preferences: 'timeline-budget-preferences'
    },
    routing: {
      analysis: 'analyze-installation-requirements',
      matching: 'match-tiling-artisans',
      scoring: 'score-by-ratings-discipline-location',
      selection: 'select-best-tiling-artisan'
    },
    completion: {
      notification: 'notify-selected-artisan',
      scheduling: 'schedule-installation',
      execution: 'artisan-completes-installation',
      review: 'customer-reviews-service'
    }
  };

  /**
   * EXPORT INTELLIGENT ARTISAN ROUTING
   */
  window.FurnostylesIntelligentArtisanRouting = {
    CustomerRequestStructure: CustomerRequestStructure,
    IntelligentArtisanMatchingStructure: IntelligentArtisanMatchingStructure,
    ArtisanRatingStructure: ArtisanRatingStructure,
    DisciplineScoringStructure: DisciplineScoringStructure,
    ResponseSpeedStructure: ResponseSpeedStructure,
    ReliabilityStructure: ReliabilityStructure,
    LocationStructure: LocationStructure,
    SpecializationStructure: SpecializationStructure,
    RoutingAlgorithmStructure: RoutingAlgorithmStructure,
    ArtisanAvailabilityStructure: ArtisanAvailabilityStructure,
    RoutingCustomerExperienceStructure: RoutingCustomerExperienceStructure,
    RoutingArtisanExperienceStructure: RoutingArtisanExperienceStructure,
    ExampleRoutingScenario: ExampleRoutingScenario
  };

}());
