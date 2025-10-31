import validator from 'validator';

/**
 * Validates email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const isValidEmail = (email) => {
  return validator.isEmail(email || '');
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {object} - { isValid, errors }
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
export const isValidURL = (url) => {
  return validator.isURL(url || '', {
    protocols: ['http', 'https'],
    require_protocol: true
  });
};

/**
 * Validates phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export const isValidPhone = (phone) => {
  return validator.isMobilePhone(phone || '', 'any', { strictMode: false });
};

/**
 * Sanitizes and validates text input
 * @param {string} input - Input to validate
 * @param {object} options - Validation options
 * @returns {object} - { isValid, sanitized, errors }
 */
export const validateTextInput = (input, options = {}) => {
  const {
    minLength = 1,
    maxLength = 1000,
    required = false,
    alphanumeric = false
  } = options;

  const errors = [];
  const trimmed = (input || '').trim();

  if (required && !trimmed) {
    errors.push('This field is required');
  }

  if (trimmed && trimmed.length < minLength) {
    errors.push(`Must be at least ${minLength} characters`);
  }

  if (trimmed && trimmed.length > maxLength) {
    errors.push(`Must be less than ${maxLength} characters`);
  }

  if (alphanumeric && trimmed && !validator.isAlphanumeric(trimmed, 'en-US', { ignore: ' ' })) {
    errors.push('Only letters and numbers are allowed');
  }

  return {
    isValid: errors.length === 0,
    sanitized: trimmed,
    errors
  };
};

/**
 * Validates file upload
 * @param {File} file - File to validate
 * @param {object} options - Validation options
 * @returns {object} - { isValid, errors }
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  } = options;

  const errors = [];

  if (!file) {
    errors.push('No file provided');
    return { isValid: false, errors };
  }

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Rate limiting check (client-side)
 * @param {string} key - Unique key for the action
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} - True if action is allowed
 */
export const checkRateLimit = (key, maxAttempts = 5, windowMs = 60000) => {
  const now = Date.now();
  const attempts = JSON.parse(localStorage.getItem(`rateLimit_${key}`) || '[]');
  
  // Remove old attempts outside the window
  const recentAttempts = attempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return false;
  }
  
  recentAttempts.push(now);
  localStorage.setItem(`rateLimit_${key}`, JSON.stringify(recentAttempts));
  
  return true;
};

export default {
  isValidEmail,
  validatePassword,
  isValidURL,
  isValidPhone,
  validateTextInput,
  validateFile,
  checkRateLimit
};
