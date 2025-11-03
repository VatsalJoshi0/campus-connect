// Google Analytics Integration
// This module provides analytics tracking for user interactions

const ANALYTICS_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
const ENABLE_ANALYTICS = process.env.REACT_APP_ENABLE_ANALYTICS === 'true';

// Initialize Google Analytics
export const initializeAnalytics = () => {
  if (!ENABLE_ANALYTICS || !ANALYTICS_ID) {
    console.log('Analytics disabled or not configured');
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', ANALYTICS_ID, {
    send_page_view: false // We'll handle page views manually
  });

  console.log('Analytics initialized');
};

// Track page views
export const trackPageView = (path, title) => {
  if (!ENABLE_ANALYTICS || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title
  });

  console.log('Page view tracked:', path);
};

// Track custom events
export const trackEvent = (category, action, label, value) => {
  if (!ENABLE_ANALYTICS || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });

  console.log('Event tracked:', { category, action, label, value });
};

// Track user interactions
export const trackUserAction = (action, details = {}) => {
  if (!ENABLE_ANALYTICS) return;

  const eventData = {
    action,
    timestamp: new Date().toISOString(),
    ...details
  };

  // Send to analytics
  trackEvent('User Action', action, JSON.stringify(details));

  // Store in local analytics (for debugging)
  const localAnalytics = JSON.parse(localStorage.getItem('local_analytics') || '[]');
  localAnalytics.push(eventData);
  
  // Keep only last 100 events
  if (localAnalytics.length > 100) {
    localAnalytics.shift();
  }
  
  localStorage.setItem('local_analytics', JSON.stringify(localAnalytics));
};

// Track specific user actions
export const analytics = {
  // Event tracking
  eventRegistered: (eventId, eventName) => {
    trackUserAction('event_registered', { eventId, eventName });
  },

  eventViewed: (eventId, eventName) => {
    trackUserAction('event_viewed', { eventId, eventName });
  },

  // Network tracking
  connectionMade: (userId, userName) => {
    trackUserAction('connection_made', { userId, userName });
  },

  messageSent: (recipientId) => {
    trackUserAction('message_sent', { recipientId });
  },

  // Profile tracking
  profileUpdated: (fields) => {
    trackUserAction('profile_updated', { fields });
  },

  profileViewed: (userId) => {
    trackUserAction('profile_viewed', { userId });
  },

  // Search tracking
  searchPerformed: (query, resultsCount) => {
    trackUserAction('search_performed', { query, resultsCount });
  },

  // Live session tracking
  liveSessionJoined: (sessionId, sessionName) => {
    trackUserAction('live_session_joined', { sessionId, sessionName });
  },

  liveSessionLeft: (sessionId, duration) => {
    trackUserAction('live_session_left', { sessionId, duration });
  },

  // Theme tracking
  themeChanged: (theme) => {
    trackUserAction('theme_changed', { theme });
  },

  // Error tracking
  errorOccurred: (errorType, errorMessage) => {
    trackUserAction('error_occurred', { errorType, errorMessage });
  },

  // Performance tracking
  pageLoadTime: (page, loadTime) => {
    trackUserAction('page_load_time', { page, loadTime });
  }
};

// Get analytics summary
export const getAnalyticsSummary = () => {
  const localAnalytics = JSON.parse(localStorage.getItem('local_analytics') || '[]');
  
  const summary = {
    totalEvents: localAnalytics.length,
    eventTypes: {},
    recentEvents: localAnalytics.slice(-10)
  };

  localAnalytics.forEach(event => {
    summary.eventTypes[event.action] = (summary.eventTypes[event.action] || 0) + 1;
  });

  return summary;
};

// Clear local analytics
export const clearLocalAnalytics = () => {
  localStorage.removeItem('local_analytics');
  console.log('Local analytics cleared');
};

export default {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackUserAction,
  analytics,
  getAnalyticsSummary,
  clearLocalAnalytics
};
