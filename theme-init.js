/**
 * This script prevents Flash of Unstyled Content (FOUC) by applying the theme
 * before React hydration. It runs in the <head> of the document.
 */

(function() {
  // Get theme from localStorage; default to 'light' if nothing saved.
  // Do NOT overwrite a stored user preference with system preference on load.
  function getTheme() {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return JSON.parse(savedTheme);
      }
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
    }

    // Default to light when there is no stored preference
    return 'light';
  }

  // Apply theme to document
  function applyTheme(theme) {
    const root = document.documentElement;
    // Only toggle the 'dark' class. If theme is 'dark', add it; otherwise ensure it's removed.
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Force a repaint to ensure styles are applied
    void root.offsetHeight;
  }

  // Run immediately
  const initialTheme = getTheme();
  applyTheme(initialTheme);
  
  // Listen to system preference changes only if the user hasn't explicitly selected a theme
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMediaQuery.addEventListener('change', (e) => {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (!storedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
      }
    } catch (err) {
      // ignore
    }
  });

  // Make theme helper available globally
  window.__theme = {
    get: getTheme,
    apply: applyTheme
  };
})();