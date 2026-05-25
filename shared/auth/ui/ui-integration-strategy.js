/**
 * FURNOSTYLES — UI INTEGRATION STRATEGY
 * ======================================
 * File: shared/auth/ui/ui-integration-strategy.js
 * Purpose: Centralized UI integration strategy for account buttons, user avatars,
 *          auth popups, saved items, and inquiry tracking.
 * 
 * This file DOES NOT implement UI components.
 * It only defines the strategy and structure for future UI integration.
 * 
 * Load order: After auth-state-strategy.js
 * 
 * Usage: This strategy will be used when UI integration is implemented
 */

(function () {
  'use strict';

  /**
   * ACCOUNT BUTTON STRATEGY
   * Centralized account button strategy
   */
  var AccountButtonStrategy = {
    /**
     * Account button states
     */
    buttonStates: {
      loggedOut: {
        text: 'Sign In',
        action: 'login',
        icon: 'user',
        variant: 'primary'
      },
      loggedIn: {
        text: 'My Account',
        action: 'dashboard',
        icon: 'user',
        variant: 'secondary'
      },
      loading: {
        text: 'Loading...',
        action: 'none',
        icon: 'spinner',
        variant: 'disabled'
      }
    },
    
    /**
     * Get account button state based on auth state
     */
    getButtonState: function (authState) {
      if (!authState || !authState.authenticated) {
        return this.buttonStates.loggedOut;
      }
      return this.buttonStates.loggedIn;
    },
    
    /**
     * Account button data attributes
     */
    buttonDataAttributes: {
      'data-auth-state': 'auth-state',
      'data-user-role': 'user-role',
      'data-action': 'button-action'
    },
    
    /**
     * Account button classes
     */
    buttonClasses: {
      base: 'fns-auth-button',
      variants: {
        primary: 'fns-auth-button--primary',
        secondary: 'fns-auth-button--secondary',
        disabled: 'fns-auth-button--disabled'
      }
    }
  };

  /**
   * USER AVATAR STRATEGY
   * Centralized user avatar strategy
   */
  var UserAvatarStrategy = {
    /**
     * Avatar sizes
     */
    avatarSizes: {
      small: 32,
      medium: 48,
      large: 64,
      xlarge: 96
    },
    
    /**
     * Get avatar URL
     */
    getAvatarUrl: function (user, size) {
      if (!user) return this.getPlaceholderAvatar();
      
      if (user.photoURL) {
        return user.photoURL;
      }
      
      return this.getPlaceholderAvatar(user.displayName, user.email);
    },
    
    /**
     * Get placeholder avatar
     */
    getPlaceholderAvatar: function (name, email) {
      var initials = 'U';
      
      if (name) {
        initials = name.split(' ').map(function (n) {
          return n.charAt(0).toUpperCase();
        }).join('').substring(0, 2);
      } else if (email) {
        initials = email.charAt(0).toUpperCase();
      }
      
      // Future implementation: Generate placeholder avatar
      return 'data:image/svg+xml;base64,placeholder';
    },
    
    /**
     * Avatar classes
     */
    avatarClasses: {
      base: 'fns-avatar',
      sizes: {
        small: 'fns-avatar--small',
        medium: 'fns-avatar--medium',
        large: 'fns-avatar--large',
        xlarge: 'fns-avatar--xlarge'
      },
      variants: {
        circle: 'fns-avatar--circle',
        square: 'fns-avatar--square'
      }
    },
    
    /**
     * Avatar data attributes
     */
    avatarDataAttributes: {
      'data-user-id': 'user-id',
      'data-user-name': 'user-name',
      'data-user-role': 'user-role'
    }
  };

  /**
   * AUTH POPUP STRATEGY
   * Centralized auth popup strategy
   */
  var AuthPopupStrategy = {
    /**
     * Popup types
     */
    popupTypes: {
      login: {
        title: 'Sign In',
        content: 'login-form',
        width: 400,
        height: 'auto'
      },
      signup: {
        title: 'Create Account',
        content: 'signup-form',
        width: 450,
        height: 'auto'
      },
      forgotPassword: {
        title: 'Reset Password',
        content: 'forgot-password-form',
        width: 400,
        height: 'auto'
      },
      roleSelection: {
        title: 'Select Your Role',
        content: 'role-selection-form',
        width: 500,
        height: 'auto'
      }
    },
    
    /**
     * Popup configuration
     */
    popupConfig: {
      overlay: true,
      closeOnEscape: true,
      closeOnOverlayClick: true,
      animation: 'fade-in',
      duration: 300
    },
    
    /**
     * Popup classes
     */
    popupClasses: {
      container: 'fns-auth-popup-container',
      overlay: 'fns-auth-popup-overlay',
      popup: 'fns-auth-popup',
      header: 'fns-auth-popup-header',
      content: 'fns-auth-popup-content',
      footer: 'fns-auth-popup-footer',
      close: 'fns-auth-popup-close'
    },
    
    /**
     * Popup data attributes
     */
    popupDataAttributes: {
      'data-popup-type': 'popup-type',
      'data-auth-state': 'auth-state'
    }
  };

  /**
   * SAVED ITEMS UI STRATEGY
   * Centralized saved items UI strategy
   */
  var SavedItemsUIStrategy = {
    /**
     * Saved item states
     */
    itemStates: {
      notSaved: {
        icon: 'heart-outline',
        text: 'Save',
        action: 'save'
      },
      saved: {
        icon: 'heart-filled',
        text: 'Saved',
        action: 'unsave'
      },
      loading: {
        icon: 'spinner',
        text: 'Saving...',
        action: 'none'
      }
    },
    
    /**
     * Get saved item state
     */
    getItemState: function (itemId, savedItems) {
      if (!savedItems || !Array.isArray(savedItems)) {
        return this.itemStates.notSaved;
      }
      
      var isSaved = savedItems.some(function (savedItem) {
        return savedItem.id === itemId;
      });
      
      return isSaved ? this.itemStates.saved : this.itemStates.notSaved;
    },
    
    /**
     * Saved item button classes
     */
    buttonClasses: {
      base: 'fns-save-button',
      states: {
        notSaved: 'fns-save-button--not-saved',
        saved: 'fns-save-button--saved',
        loading: 'fns-save-button--loading'
      }
    },
    
    /**
     * Saved item data attributes
     */
    buttonDataAttributes: {
      'data-item-id': 'item-id',
      'data-item-type': 'item-type',
      'data-saved-state': 'saved-state',
      'data-action': 'button-action'
    }
  };

  /**
   * INQUIRY TRACKING UI STRATEGY
   * Centralized inquiry tracking UI strategy
   */
  var InquiryTrackingUIStrategy = {
    /**
     * Inquiry states
     */
    inquiryStates: {
      pending: {
        label: 'Pending',
        color: 'yellow',
        icon: 'clock'
      },
      inProgress: {
        label: 'In Progress',
        color: 'blue',
        icon: 'spinner'
      },
      responded: {
        label: 'Responded',
        color: 'green',
        icon: 'check'
      },
      completed: {
        label: 'Completed',
        color: 'green',
        icon: 'check-circle'
      },
      cancelled: {
        label: 'Cancelled',
        color: 'red',
        icon: 'x'
      }
    },
    
    /**
     * Get inquiry state UI
     */
    getInquiryStateUI: function (status) {
      return this.inquiryStates[status] || this.inquiryStates.pending;
    },
    
    /**
     * Inquiry tracking badge classes
     */
    badgeClasses: {
      base: 'fns-inquiry-badge',
      colors: {
        yellow: 'fns-inquiry-badge--yellow',
        blue: 'fns-inquiry-badge--blue',
        green: 'fns-inquiry-badge--green',
        red: 'fns-inquiry-badge--red'
      }
    },
    
    /**
     * Inquiry tracking data attributes
     */
    trackingDataAttributes: {
      'data-inquiry-id': 'inquiry-id',
      'data-inquiry-status': 'inquiry-status',
      'data-inquiry-type': 'inquiry-type'
    }
  };

  /**
   * AUTH NOTIFICATION UI STRATEGY
   * Centralized auth notification UI strategy
   */
  var AuthNotificationUIStrategy = {
    /**
     * Notification types
     */
    notificationTypes: {
      success: {
        icon: 'check-circle',
        color: 'green',
        duration: 3000
      },
      error: {
        icon: 'x-circle',
        color: 'red',
        duration: 5000
      },
      warning: {
        icon: 'alert-triangle',
        color: 'yellow',
        duration: 4000
      },
      info: {
        icon: 'info',
        color: 'blue',
        duration: 3000
      }
    },
    
    /**
     * Notification configuration
     */
    notificationConfig: {
      position: 'top-right',
      maxNotifications: 3,
      animation: 'slide-in',
      duration: 300
    },
    
    /**
     * Notification classes
     */
    notificationClasses: {
      container: 'fns-notification-container',
      notification: 'fns-notification',
      icon: 'fns-notification-icon',
      message: 'fns-notification-message',
      close: 'fns-notification-close',
      types: {
        success: 'fns-notification--success',
        error: 'fns-notification--error',
        warning: 'fns-notification--warning',
        info: 'fns-notification--info'
      }
    },
    
    /**
     * Notification data attributes
     */
    notificationDataAttributes: {
      'data-notification-type': 'notification-type',
      'data-notification-id': 'notification-id'
    }
  };

  /**
   * EXPORT UI INTEGRATION STRATEGY
   */
  window.FurnostylesUIIntegrationStrategy = {
    AccountButtonStrategy: AccountButtonStrategy,
    UserAvatarStrategy: UserAvatarStrategy,
    AuthPopupStrategy: AuthPopupStrategy,
    SavedItemsUIStrategy: SavedItemsUIStrategy,
    InquiryTrackingUIStrategy: InquiryTrackingUIStrategy,
    AuthNotificationUIStrategy: AuthNotificationUIStrategy
  };

}());
