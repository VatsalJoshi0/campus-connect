/**
 * API Utilities
 * Standardized API calls with error handling, retry logic, and security
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';
const DEFAULT_TIMEOUT = 30000; // 30 seconds

/**
 * HTTP Status Codes
 */
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

/**
 * Custom API Error
 */
export class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Get authentication token
 * @returns {string|null} - Auth token
 */
const getAuthToken = () => {
  try {
    const authData = localStorage.getItem('authToken');
    return authData ? JSON.parse(authData).token : null;
  } catch {
    return null;
  }
};

/**
 * Build headers for API request
 * @param {object} customHeaders - Custom headers to merge
 * @returns {object} - Headers object
 */
const buildHeaders = (customHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...customHeaders
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise} - Parsed response data
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJSON = contentType?.includes('application/json');

  let data;
  try {
    data = isJSON ? await response.json() : await response.text();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const errorMessage = data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`;
    throw new APIError(errorMessage, response.status, data);
  }

  return data;
};

/**
 * Make API request with timeout
 * @param {string} url - Request URL
 * @param {object} options - Fetch options
 * @param {number} timeout - Timeout in ms
 * @returns {Promise} - Response data
 */
const fetchWithTimeout = async (url, options = {}, timeout = DEFAULT_TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new APIError('Request timeout', 408);
    }
    throw error;
  }
};

/**
 * Retry logic for failed requests
 * @param {function} fn - Function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Delay between retries (ms)
 * @returns {Promise} - Result of function
 */
const retryRequest = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry client errors (4xx) except 429
      if (error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
      }
    }
  }
  
  throw lastError;
};

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 * @returns {Promise} - Response data
 */
export const get = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  return retryRequest(async () => {
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: buildHeaders(options.headers),
      ...options
    });
    return handleResponse(response);
  });
};

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @param {object} options - Request options
 * @returns {Promise} - Response data
 */
export const post = async (endpoint, data, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  return retryRequest(async () => {
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: buildHeaders(options.headers),
      body: JSON.stringify(data),
      ...options
    }, options.timeout);
    return handleResponse(response);
  }, 1); // Don't retry POST by default
};

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @param {object} options - Request options
 * @returns {Promise} - Response data
 */
export const put = async (endpoint, data, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  return retryRequest(async () => {
    const response = await fetchWithTimeout(url, {
      method: 'PUT',
      headers: buildHeaders(options.headers),
      body: JSON.stringify(data),
      ...options
    }, options.timeout);
    return handleResponse(response);
  }, 1); // Don't retry PUT by default
};

/**
 * PATCH request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @param {object} options - Request options
 * @returns {Promise} - Response data
 */
export const patch = async (endpoint, data, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  return retryRequest(async () => {
    const response = await fetchWithTimeout(url, {
      method: 'PATCH',
      headers: buildHeaders(options.headers),
      body: JSON.stringify(data),
      ...options
    }, options.timeout);
    return handleResponse(response);
  }, 1);
};

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 * @returns {Promise} - Response data
 */
export const del = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  return retryRequest(async () => {
    const response = await fetchWithTimeout(url, {
      method: 'DELETE',
      headers: buildHeaders(options.headers),
      ...options
    });
    return handleResponse(response);
  }, 1); // Don't retry DELETE by default
};

/**
 * Upload file
 * @param {string} endpoint - API endpoint
 * @param {File} file - File to upload
 * @param {object} additionalData - Additional form data
 * @param {function} onProgress - Progress callback
 * @returns {Promise} - Response data
 */
export const uploadFile = async (endpoint, file, additionalData = {}, onProgress = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const formData = new FormData();
  
  formData.append('file', file);
  Object.entries(additionalData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          onProgress(percentComplete);
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch {
          resolve(xhr.responseText);
        }
      } else {
        reject(new APIError(`Upload failed: ${xhr.statusText}`, xhr.status));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new APIError('Upload failed', 0));
    });

    xhr.open('POST', url);
    
    const token = getAuthToken();
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    xhr.send(formData);
  });
};

/**
 * Build query string from object
 * @param {object} params - Query parameters
 * @returns {string} - Query string
 */
export const buildQueryString = (params) => {
  const filtered = Object.entries(params).filter(([, value]) => value !== null && value !== undefined);
  return filtered.length > 0 
    ? '?' + filtered.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')
    : '';
};

/**
 * Check if error is network error
 * @param {Error} error - Error object
 * @returns {boolean} - True if network error
 */
export const isNetworkError = (error) => {
  return error instanceof TypeError && error.message.includes('Failed to fetch');
};

/**
 * Check if error requires authentication
 * @param {Error} error - Error object
 * @returns {boolean} - True if auth required
 */
export const isAuthError = (error) => {
  return error instanceof APIError && (error.status === 401 || error.status === 403);
};

export default {
  get,
  post,
  put,
  patch,
  del,
  uploadFile,
  buildQueryString,
  isNetworkError,
  isAuthError,
  APIError,
  STATUS_CODES
};
