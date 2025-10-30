// Constants
const STORAGE_KEY = 'theme';
const DEFAULT_THEME = 'light';
const VALID_THEMES = ['light', 'dark'];
const TRANSITION_DURATION = 200; // ms

/**
 * Error class for theme-related errors
 */
class ThemeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ThemeError';
  }
}

/**
 * Validates theme value
 * @param {string} theme - Theme to validate
 * @returns {boolean} - Whether theme is valid
 */
const isValidTheme = (theme) => {
  return VALID_THEMES.includes(theme);
};

/**
 * Safely accesses localStorage with error handling
 * @param {string} key - Storage key
 * @returns {string|null} - Stored value or null
 */
const safeGetStorage = (key) => {
  try {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  } catch (error) {
    console.error(`[ThemeUtils] Error accessing localStorage: ${error.message}`);
    return null;
  }
};

/**
 * Safely sets localStorage with error handling
 * @param {string} key - Storage key 
 * @param {string} value - Value to store
 */
const safeSetStorage = (key, value) => {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.error(`[ThemeUtils] Error setting localStorage: ${error.message}`);
  }
};

/**
 * Gets stored theme with validation
 * @returns {string|null} - Stored theme or null
 */
export const getStoredTheme = () => {
  const savedTheme = safeGetStorage(STORAGE_KEY);
  if (!savedTheme) return null;
  
  try {
    const parsedTheme = JSON.parse(savedTheme);
    if (!isValidTheme(parsedTheme)) {
      throw new ThemeError(`Invalid theme value: ${parsedTheme}`);
    }
    return parsedTheme;
  } catch (error) {
    console.error(`[ThemeUtils] Error parsing stored theme: ${error.message}`);
    // Clear invalid value
    safeSetStorage(STORAGE_KEY, '');
    return null;
  }
};

/**
 * Gets system color scheme preference
 * @returns {string} - 'dark' or 'light'
 */
export const getSystemTheme = () => {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  
  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return mediaQuery.matches ? 'dark' : 'light';
  } catch (error) {
    console.error(`[ThemeUtils] Error getting system theme: ${error.message}`);
    return DEFAULT_THEME;
  }
};

/**
 * Gets initial theme with fallback logic
 * @returns {string} - Initial theme value
 */
export const getInitialTheme = () => {
  try {
    const storedTheme = getStoredTheme();
    if (storedTheme) return storedTheme;
    
    const systemTheme = getSystemTheme();
    if (isValidTheme(systemTheme)) return systemTheme;
    
    return DEFAULT_THEME;
  } catch (error) {
    console.error(`[ThemeUtils] Error getting initial theme: ${error.message}`);
    return DEFAULT_THEME;
  }
};

/**
 * Debounced function to trigger CSS transition
 */
const debouncedTransition = (() => {
  let timeoutId;
  return (callback) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, TRANSITION_DURATION);
  };
})();

/**
 * Applies theme with transition handling
 * @param {string} theme - Theme to apply
 */
export const applyTheme = (theme) => {
  if (typeof document === 'undefined') return;
  if (!isValidTheme(theme)) {
    throw new ThemeError(`Invalid theme: ${theme}`);
  }
  
  const root = document.documentElement;
  const isDark = theme === 'dark';
  
  // Add transition class
  root.classList.add('theme-transition');
  
  // Update theme class
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // Remove transition class after animation
  debouncedTransition(() => {
    root.classList.remove('theme-transition');
  });
  
  // Dispatch custom event
  try {
    const event = new CustomEvent('themechange', { 
      detail: { theme, isDark } 
    });
    window.dispatchEvent(event);
  } catch (error) {
    console.error(`[ThemeUtils] Error dispatching theme change event: ${error.message}`);
  }
};

/**
 * Initializes theme and sets up system preference listener
 * @returns {string} - Applied theme
 */
export const initializeTheme = () => {
  const theme = getInitialTheme();
  applyTheme(theme);
  
  // Setup system preference listener
  if (typeof window !== 'undefined') {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handler = (e) => {
        const storedTheme = getStoredTheme();
        if (!storedTheme) {
          const newTheme = e.matches ? 'dark' : 'light';
          applyTheme(newTheme);
        }
      };
      
      // Use newer addEventListener if available, fallback to deprecated addListener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handler);
      } else {
        mediaQuery.addListener(handler);
      }
    } catch (error) {
      console.error(`[ThemeUtils] Error setting up system theme listener: ${error.message}`);
    }
  }
  
  return theme;
};
