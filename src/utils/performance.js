/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and custom performance metrics
 */

// Web Vitals thresholds (Google's recommended values)
export const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay (deprecated, replaced by INP)
  INP: { good: 200, needsImprovement: 500 },   // Interaction to Next Paint
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }  // Time to First Byte
};

/**
 * Report Web Vitals to analytics
 * @param {object} metric - Web Vital metric object
 */
export const reportWebVitals = (metric) => {
  const { name, value, rating, delta } = metric;
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: Math.round(value),
      rating,
      delta: Math.round(delta)
    });
  }

  // Send to analytics endpoint
  if (window.gtag) {
    window.gtag('event', name, {
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_rating: rating,
      metric_delta: Math.round(delta),
      non_interaction: true
    });
  }

  // Send to custom analytics
  sendToAnalytics({
    event: 'web-vitals',
    metric: name,
    value: Math.round(value),
    rating,
    delta: Math.round(delta),
    timestamp: new Date().toISOString()
  });
};

/**
 * Send analytics data to backend
 * @param {object} data - Analytics data
 */
const sendToAnalytics = (data) => {
  // Use sendBeacon for reliable delivery
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics', blob);
  } else {
    // Fallback to fetch
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true
    }).catch(() => {
      // Silent fail - analytics shouldn't break app
    });
  }
};

/**
 * Measure custom performance metric
 * @param {string} name - Metric name
 * @param {function} fn - Function to measure
 * @returns {Promise} - Result of the function
 */
export const measurePerformance = async (name, fn) => {
  const startMark = `${name}-start`;
  const endMark = `${name}-end`;
  const measureName = name;

  performance.mark(startMark);
  
  try {
    const result = await fn();
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);
    
    const measure = performance.getEntriesByName(measureName)[0];
    console.log(`[Performance] ${name}: ${Math.round(measure.duration)}ms`);
    
    // Clean up marks
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(measureName);
    
    return result;
  } catch (error) {
    performance.clearMarks(startMark);
    throw error;
  }
};

/**
 * Monitor long tasks (> 50ms)
 */
export const observeLongTasks = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn(`[Long Task] Duration: ${Math.round(entry.duration)}ms`, entry);
          
          sendToAnalytics({
            event: 'long-task',
            duration: Math.round(entry.duration),
            startTime: Math.round(entry.startTime),
            timestamp: new Date().toISOString()
          });
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
      return observer;
    } catch (error) {
      console.error('Failed to observe long tasks:', error);
    }
  }
};

/**
 * Monitor layout shifts
 */
export const observeLayoutShifts = () => {
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            
            if (process.env.NODE_ENV === 'development') {
              console.warn('[Layout Shift]', {
                value: entry.value.toFixed(4),
                cumulativeValue: clsValue.toFixed(4),
                sources: entry.sources
              });
            }
          }
        }
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
      return observer;
    } catch (error) {
      console.error('Failed to observe layout shifts:', error);
    }
  }
};

/**
 * Get navigation timing metrics
 * @returns {object} - Navigation metrics
 */
export const getNavigationMetrics = () => {
  if (!window.performance || !window.performance.timing) {
    return null;
  }

  const timing = window.performance.timing;
  const navigationStart = timing.navigationStart;

  return {
    dns: timing.domainLookupEnd - timing.domainLookupStart,
    tcp: timing.connectEnd - timing.connectStart,
    ttfb: timing.responseStart - timing.requestStart,
    download: timing.responseEnd - timing.responseStart,
    domInteractive: timing.domInteractive - navigationStart,
    domComplete: timing.domComplete - navigationStart,
    loadComplete: timing.loadEventEnd - navigationStart
  };
};

/**
 * Preload critical resources
 * @param {string} href - Resource URL
 * @param {string} as - Resource type (image, script, style, etc.)
 */
export const preloadResource = (href, as = 'fetch') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }
  
  document.head.appendChild(link);
};

/**
 * Lazy load script
 * @param {string} src - Script URL
 * @param {object} options - Loading options
 * @returns {Promise} - Resolves when script loads
 */
export const loadScript = (src, options = {}) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = options.async !== false;
    script.defer = options.defer || false;
    
    script.onload = resolve;
    script.onerror = reject;
    
    document.body.appendChild(script);
  });
};

/**
 * Debounce function for performance
 * @param {function} fn - Function to debounce
 * @param {number} delay - Delay in ms
 * @returns {function} - Debounced function
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Throttle function for performance
 * @param {function} fn - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {function} - Throttled function
 */
export const throttle = (fn, limit = 300) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export default {
  reportWebVitals,
  measurePerformance,
  observeLongTasks,
  observeLayoutShifts,
  getNavigationMetrics,
  preloadResource,
  loadScript,
  debounce,
  throttle,
  THRESHOLDS
};
