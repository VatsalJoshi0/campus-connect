import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { getInitialTheme, applyTheme } from './utils/themeUtils';

// Initialize theme before React renders to prevent flash
const initialTheme = getInitialTheme();
applyTheme(initialTheme);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
