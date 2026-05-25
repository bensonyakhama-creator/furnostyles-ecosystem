/**
 * FURNOSTYLES — RENDERING ARCHITECTURE
 */

(function () {
  'use strict';

  var ProductRenderingStrategy = {
    cardStructure: { container: 'div.fns-product-card', image: 'div.fns-product-image', content: 'div.fns-product-content', title: 'h3.fns-product-title', vendor: 'div.fns-product-vendor', price: 'div.fns-product-price', badges: 'div.fns-product-badges', actions: 'div.fns-product-actions' },
    variants: ['grid', 'list', 'compact', 'featured'],
    options: { showVendor: true, showPrice: true, showBadges: true, showActions: true, lazyLoad: true }
  };

  var ServiceRenderingStrategy = {
    cardStructure: { container: 'div.fns-service-card', image: 'div.fns-service-image', content: 'div.fns-service-content', title: 'h3.fns-service-title', provider: 'div.fns-service-provider', pricing: 'div.fns-service-pricing', rating: 'div.fns-service-rating', actions: 'div.fns-service-actions' },
    variants: ['grid', 'list', 'featured'],
    options: { showProvider: true, showPricing: true, showRating: true, showActions: true }
  };

  var PropertyRenderingStrategy = {
    cardStructure: { container: 'div.fns-property-card', image: 'div.fns-property-image', content: 'div.fns-property-content', title: 'h3.fns-property-title', location: 'div.fns-property-location', pricing: 'div.fns-property-pricing', specifications: 'div.fns-property-specs', badges: 'div.fns-property-badges', actions: 'div.fns-property-actions' },
    variants: ['grid', 'list', 'featured'],
    options: { showLocation: true, showPricing: true, showSpecs: true, showBadges: true }
  };

  var SourcingRenderingStrategy = {
    cardStructure: { container: 'div.fns-sourcing-card', content: 'div.fns-sourcing-content', category: 'div.fns-sourcing-category', description: 'div.fns-sourcing-description', budget: 'div.fns-sourcing-budget', timeline: 'div.fns-sourcing-timeline', status: 'div.fns-sourcing-status', actions: 'div.fns-sourcing-actions' },
    variants: ['grid', 'list'],
    options: { showBudget: true, showTimeline: true, showStatus: true }
  };

  var FeaturedCollectionsStrategy = {
    collectionStructure: { container: 'div.fns-featured-collection', header: 'div.fns-collection-header', title: 'h2.fns-collection-title', description: 'p.fns-collection-description', grid: 'div.fns-collection-grid', items: 'array' },
    layouts: ['grid', 'carousel', 'masonry'],
    options: { showDescription: true, showViewAll: true, itemLimit: 8 }
  };

  var RecommendationSectionsStrategy = {
    types: { related: 'related-items', trending: 'trending-items', popular: 'popular-items', recentlyViewed: 'recently-viewed', recommendedForYou: 'recommended-for-you' },
    sectionStructure: { container: 'div.fns-recommendation-section', header: 'div.fns-recommendation-header', title: 'h2.fns-recommendation-title', subtitle: 'p.fns-recommendation-subtitle', grid: 'div.fns-recommendation-grid' },
    options: { showSubtitle: false, itemLimit: 6, lazyLoad: true }
  };

  window.FurnostylesRenderingArchitecture = {
    ProductRenderingStrategy: ProductRenderingStrategy,
    ServiceRenderingStrategy: ServiceRenderingStrategy,
    PropertyRenderingStrategy: PropertyRenderingStrategy,
    SourcingRenderingStrategy: SourcingRenderingStrategy,
    FeaturedCollectionsStrategy: FeaturedCollectionsStrategy,
    RecommendationSectionsStrategy: RecommendationSectionsStrategy
  };

}());
