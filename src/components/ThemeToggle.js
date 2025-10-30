import React, { useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  const labelText = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  return (
    <div className="flex items-center">
      {showLabel && (
        <span className="mr-2 text-sm text-custom-text">
          {labelText}
        </span>
      )}
      <div className="relative inline-block">
        <input
          type="checkbox"
          id="theme-toggle"
          className="sr-only"
          checked={isDark}
          onChange={handleToggle}
          onKeyDown={handleKeyDown}
          aria-label={labelText}
        />
        <label
          htmlFor="theme-toggle"
          className={`theme-toggle ${isDark ? 'checked' : ''}`}
          role="switch"
          aria-checked={isDark}
        >
          <div className="theme-toggle-knob" />
        </label>
      </div>
    </div>
  );
};

export default ThemeToggle;
