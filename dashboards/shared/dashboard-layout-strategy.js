/**
 * FURNOSTYLES — DASHBOARD LAYOUT STRATEGY
 * ========================================
 * File: dashboards/shared/dashboard-layout-strategy.js
 * Purpose: Centralized dashboard layout strategy for topbar, navigation,
 *          cards, widgets, grids, and CTA sections.
 * 
 * This file DOES NOT implement dashboard layouts.
 * It only defines the strategy and structure for future dashboard layouts.
 * 
 * Load order: After dashboard-architecture.js
 * 
 * Usage: This strategy will be used when dashboard layouts are implemented
 */

(function () {
  'use strict';

  /**
   * DASHBOARD TOPBAR STRATEGY
   * Centralized dashboard topbar strategy
   */
  var DashboardTopbarStrategy = {
    /**
     * Topbar structure
     */
    structure: {
      container: 'div.fns-dashboard-topbar',
      brand: 'div.fns-dashboard-brand',
      search: 'div.fns-dashboard-search',
      actions: 'div.fns-dashboard-actions',
      userMenu: 'div.fns-dashboard-user-menu',
      notifications: 'div.fns-dashboard-notifications'
    },
    
    /**
     * Topbar elements
     */
    elements: {
      brandLogo: {
        type: 'image',
        alt: 'Furnostyles',
        link: 'index.html'
      },
      brandName: {
        type: 'text',
        text: 'Furnostyles',
        link: 'index.html'
      },
      searchInput: {
        type: 'input',
        placeholder: 'Search...',
        icon: 'search'
      },
      notificationBell: {
        type: 'icon',
        icon: 'bell',
        badge: true
      },
      userAvatar: {
        type: 'avatar',
        showName: true,
        showRole: true
      },
      logoutButton: {
        type: 'button',
        text: 'Sign Out',
        variant: 'secondary'
      }
    },
    
    /**
     * Topbar classes
     */
    classes: {
      container: 'fns-dashboard-topbar',
      fixed: 'fns-dashboard-topbar--fixed',
      compact: 'fns-dashboard-topbar--compact'
    },
    
    /**
     * Topbar data attributes
     */
    dataAttributes: {
      'data-user-role': 'user-role',
      'data-dashboard-type': 'dashboard-type'
    }
  };

  /**
   * DASHBOARD NAVIGATION STRATEGY
   * Centralized dashboard navigation strategy
   */
  var DashboardNavigationStrategy = {
    /**
     * Navigation structure
     */
    structure: {
      container: 'nav.fns-dashboard-nav',
      list: 'ul.fns-dashboard-nav-list',
      item: 'li.fns-dashboard-nav-item',
      link: 'a.fns-dashboard-nav-link',
      icon: 'span.fns-dashboard-nav-icon',
      label: 'span.fns-dashboard-nav-label',
      badge: 'span.fns-dashboard-nav-badge'
    },
    
    /**
     * Navigation positions
     */
    positions: {
      left: 'fns-dashboard-nav--left',
      top: 'fns-dashboard-nav--top',
      right: 'fns-dashboard-nav--right'
    },
    
    /**
     * Navigation states
     */
    states: {
      expanded: 'fns-dashboard-nav--expanded',
      collapsed: 'fns-dashboard-nav--collapsed',
      mobile: 'fns-dashboard-nav--mobile'
    },
    
    /**
     * Navigation item types
     */
    itemTypes: {
      link: 'link',
      dropdown: 'dropdown',
      divider: 'divider',
      header: 'header'
    },
    
    /**
     * Navigation classes
     */
    classes: {
      container: 'fns-dashboard-nav',
      active: 'fns-dashboard-nav--active',
      disabled: 'fns-dashboard-nav--disabled'
    }
  };

  /**
   * DASHBOARD CARD STRATEGY
   * Centralized dashboard card strategy
   */
  var DashboardCardStrategy = {
    /**
     * Card structure
     */
    structure: {
      container: 'div.fns-dashboard-card',
      header: 'div.fns-dashboard-card-header',
      title: 'h3.fns-dashboard-card-title',
      subtitle: 'p.fns-dashboard-card-subtitle',
      actions: 'div.fns-dashboard-card-actions',
      body: 'div.fns-dashboard-card-body',
      footer: 'div.fns-dashboard-card-footer'
    },
    
    /**
     * Card types
     */
    types: {
      stat: 'fns-dashboard-card--stat',
      list: 'fns-dashboard-card--list',
      chart: 'fns-dashboard-card--chart',
      table: 'fns-dashboard-card--table',
      activity: 'fns-dashboard-card--activity',
      notification: 'fns-dashboard-card--notification'
    },
    
    /**
     * Card variants
     */
    variants: {
      primary: 'fns-dashboard-card--primary',
      secondary: 'fns-dashboard-card--secondary',
      success: 'fns-dashboard-card--success',
      warning: 'fns-dashboard-card--warning',
      danger: 'fns-dashboard-card--danger'
    },
    
    /**
     * Card sizes
     */
    sizes: {
      small: 'fns-dashboard-card--small',
      medium: 'fns-dashboard-card--medium',
      large: 'fns-dashboard-card--large',
      full: 'fns-dashboard-card--full'
    },
    
    /**
     * Card data attributes
     */
    dataAttributes: {
      'data-card-type': 'card-type',
      'data-card-id': 'card-id',
      'data-card-variant': 'card-variant'
    }
  };

  /**
   * DASHBOARD WIDGET STRATEGY
   * Centralized dashboard widget strategy
   */
  var DashboardWidgetStrategy = {
    /**
     * Widget structure
     */
    structure: {
      container: 'div.fns-dashboard-widget',
      header: 'div.fns-dashboard-widget-header',
      content: 'div.fns-dashboard-widget-content',
      footer: 'div.fns-dashboard-widget-footer'
    },
    
    /**
     * Widget types
     */
    types: {
      metric: 'fns-dashboard-widget--metric',
      chart: 'fns-dashboard-widget--chart',
      progress: 'fns-dashboard-widget--progress',
      activity: 'fns-dashboard-widget--activity',
      notification: 'fns-dashboard-widget--notification',
      quickAction: 'fns-dashboard-widget--quick-action'
    },
    
    /**
     * Widget configurations
     */
    configurations: {
      metric: {
        showLabel: true,
        showValue: true,
        showChange: true,
        showTrend: true
      },
      chart: {
        type: 'line',
        showLegend: true,
        showTooltip: true,
        responsive: true
      },
      progress: {
        showPercentage: true,
        showLabel: true,
        animated: true
      }
    },
    
    /**
     * Widget classes
     */
    classes: {
      container: 'fns-dashboard-widget',
      clickable: 'fns-dashboard-widget--clickable',
      loading: 'fns-dashboard-widget--loading',
      error: 'fns-dashboard-widget--error'
    }
  };

  /**
   * DASHBOARD GRID STRATEGY
   * Centralized dashboard grid strategy
   */
  var DashboardGridStrategy = {
    /**
     * Grid structure
     */
    structure: {
      container: 'div.fns-dashboard-grid',
      row: 'div.fns-dashboard-grid-row',
      column: 'div.fns-dashboard-grid-column'
    },
    
    /**
     * Grid breakpoints
     */
    breakpoints: {
      mobile: { columns: 1, gap: '16px' },
      tablet: { columns: 2, gap: '24px' },
      desktop: { columns: 3, gap: '32px' },
      large: { columns: 4, gap: '32px' }
    },
    
    /**
     * Column spans
     */
    columnSpans: {
      full: 12,
      half: 6,
      third: 4,
      quarter: 3,
      twoThirds: 8,
      threeQuarters: 9
    },
    
    /**
     * Grid classes
     */
    classes: {
      container: 'fns-dashboard-grid',
      responsive: 'fns-dashboard-grid--responsive',
      masonry: 'fns-dashboard-grid--masonry'
    }
  };

  /**
   * DASHBOARD CTA SECTION STRATEGY
   * Centralized dashboard CTA section strategy
   */
  var DashboardCTASectionStrategy = {
    /**
     * CTA section structure
     */
    structure: {
      container: 'section.fns-dashboard-cta',
      content: 'div.fns-dashboard-cta-content',
      heading: 'h2.fns-dashboard-cta-heading',
      description: 'p.fns-dashboard-cta-description',
      actions: 'div.fns-dashboard-cta-actions',
      primaryButton: 'button.fns-dashboard-cta-primary',
      secondaryButton: 'button.fns-dashboard-cta-secondary'
    },
    
    /**
     * CTA types
     */
    types: {
      upgrade: 'fns-dashboard-cta--upgrade',
      verification: 'fns-dashboard-cta--verification',
      onboarding: 'fns-dashboard-cta--onboarding',
      promotion: 'fns-dashboard-cta--promotion',
      alert: 'fns-dashboard-cta--alert'
    },
    
    /**
     * CTA variants
     */
    variants: {
      primary: 'fns-dashboard-cta--primary',
      secondary: 'fns-dashboard-cta--secondary',
      success: 'fns-dashboard-cta--success',
      warning: 'fns-dashboard-cta--warning',
      info: 'fns-dashboard-cta--info'
    },
    
    /**
     * CTA data attributes
     */
    dataAttributes: {
      'data-cta-type': 'cta-type',
      'data-cta-action': 'cta-action',
      'data-cta-id': 'cta-id'
    }
  };

  /**
   * EXPORT DASHBOARD LAYOUT STRATEGY
   */
  window.FurnostylesDashboardLayoutStrategy = {
    DashboardTopbarStrategy: DashboardTopbarStrategy,
    DashboardNavigationStrategy: DashboardNavigationStrategy,
    DashboardCardStrategy: DashboardCardStrategy,
    DashboardWidgetStrategy: DashboardWidgetStrategy,
    DashboardGridStrategy: DashboardGridStrategy,
    DashboardCTASectionStrategy: DashboardCTASectionStrategy
  };

}());
