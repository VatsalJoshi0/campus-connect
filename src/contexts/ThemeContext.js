import React, { createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { getInitialTheme, applyTheme } from '../utils/themeUtils';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', getInitialTheme);
  const isDark = useMemo(() => theme === 'dark', [theme]);

  // Apply theme when it changes. applyTheme will update the DOM class.
  useEffect(() => {
    applyTheme(theme);
    if (process.env.NODE_ENV !== 'production') {
      // Helpful debug: log theme changes so developer can verify behavior quickly
      // eslint-disable-next-line no-console
      console.debug('[ThemeContext] applied theme:', theme, 'html.hasDarkClass=', document.documentElement.classList.contains('dark'));
      console.debug('[ThemeContext] CSS variables:', {
        '--custom-bg': getComputedStyle(document.documentElement).getPropertyValue('--custom-bg'),
        '--custom-text': getComputedStyle(document.documentElement).getPropertyValue('--custom-text'),
        '--custom-bg-2': getComputedStyle(document.documentElement).getPropertyValue('--custom-bg-2')
      });
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  const contextValue = useMemo(() => ({
    isDark,
    toggleTheme,
    theme
  }), [isDark, toggleTheme, theme]);

  // No extra initial mount side-effects needed; useLocalStorage/getInitialTheme provides initial value

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
