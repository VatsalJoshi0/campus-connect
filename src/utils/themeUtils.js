// Theme utility functions for early theme application
export const getStoredTheme = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme);
      return parsedTheme;
    }
  } catch (error) {
    console.error('Error reading theme from localStorage:', error);
  }
  
  return null;
};

export const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light';
  
  const prefersDark = window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  return prefersDark ? 'dark' : 'light';
};

export const getInitialTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  // Default to light if no stored preference. Do not persist system preference here.
  return 'light';
};

export const applyTheme = (theme) => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  const isDark = theme === 'dark';
  
  // Update classList for Tailwind dark mode
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // Force a repaint to ensure the theme changes are applied
  const reflow = root.offsetHeight;
  
  // NOTE: do NOT automatically save here to avoid overwriting user's stored preference
};

// Initialize theme immediately when this module loads
export const initializeTheme = () => {
  const theme = getInitialTheme();
  applyTheme(theme);
  return theme;
};

// Add theme change listener for system preference changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const storedTheme = getStoredTheme();
    // Only update if user hasn't manually set a theme
    if (!storedTheme) {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
    }
  });
}
