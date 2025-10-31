import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param {string} dirty - Potentially unsafe HTML string
 * @param {object} config - DOMPurify configuration options
 * @returns {string} - Sanitized HTML string
 */
export const sanitizeHTML = (dirty, config = {}) => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title'],
    ...config
  });
};

/**
 * Sanitizes user input text (strips all HTML)
 * @param {string} input - User input string
 * @returns {string} - Plain text string
 */
export const sanitizeText = (input) => {
  if (!input) return '';
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

/**
 * Escapes special characters in a string for safe display
 * @param {string} str - Input string
 * @returns {string} - Escaped string
 */
export const escapeHTML = (str) => {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Sanitizes chat message content
 * @param {string} message - Chat message
 * @returns {string} - Sanitized message
 */
export const sanitizeChatMessage = (message) => {
  return sanitizeText(message).trim();
};

/**
 * Validates and sanitizes URL
 * @param {string} url - URL to validate
 * @returns {string|null} - Sanitized URL or null if invalid
 */
export const sanitizeURL = (url) => {
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return null;
    }
    return urlObj.href;
  } catch {
    return null;
  }
};

export default {
  sanitizeHTML,
  sanitizeText,
  escapeHTML,
  sanitizeChatMessage,
  sanitizeURL
};
