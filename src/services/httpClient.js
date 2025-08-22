import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get base API URL from Expo configuration
const BASE_API_URL = Constants.expoConfig?.extra?.baseApiUrl;

/**
 * HTTP client for making API requests with automatic token handling and cache prevention
 */
export const httpClient = {

  /**
   * Makes an HTTP request with automatic authentication handling and cache busting
   * @param {string} endpoint - API endpoint path
   * @param {Object} options - Request options (method, headers, body, etc.)
   * @param {boolean} options.skipAuth - Skip authentication header if true
   * @param {boolean} options.allowCache - Allow caching if true (defaults to false)
   * @returns {Promise<Response>} Fetch response object
   */
  async request(endpoint, options = {}) {
    // Get stored access token
    const token = await AsyncStorage.getItem('accessToken');

    // Default cache-busting headers (can be overridden with allowCache: true)
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // Add auth header unless skipAuth is true
      ...(!options.skipAuth && token && { Authorization: `Bearer ${token}` }),
    };

    // Add cache-busting headers unless explicitly allowing cache
    if (!options.allowCache) {
      defaultHeaders['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      defaultHeaders['Pragma'] = 'no-cache';
      defaultHeaders['Expires'] = '0';
    }

    // Build request configuration
    const config = {
      headers: {
        ...defaultHeaders,
        // Merge additional headers (these can override defaults)
        ...options.headers,
      },
      ...options,
    };

    // Add timestamp to URL for GET requests to prevent caching (if not allowing cache)
    let finalEndpoint = endpoint;
    if (!options.allowCache && (!options.method || options.method === 'GET')) {
      const separator = endpoint.includes('?') ? '&' : '?';
      finalEndpoint = `${endpoint}${separator}_t=${Date.now()}`;
    }

    // Make the request
    const response = await fetch(`${BASE_API_URL}${finalEndpoint}`, config);

    // Handle token expiration
    if (response.status === 401) {
      await AsyncStorage.removeItem('accessToken');
    }

    return response;
  },

  /**
   * Makes a GET request with cache busting by default
   * @param {string} endpoint - API endpoint path
   * @param {Object} options - Additional options
   * @returns {Promise<Response>} Fetch response object
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  /**
   * Makes a POST request with JSON data
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - Request body data
   * @param {Object} options - Additional options
   * @returns {Promise<Response>} Fetch response object
   */
  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Makes a PUT request with JSON data
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - Request body data
   * @param {Object} options - Additional options
   * @returns {Promise<Response>} Fetch response object
   */
  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Makes a PATCH request with JSON data
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - Request body data
   * @param {Object} options - Additional options
   * @returns {Promise<Response>} Fetch response object
   */
  patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Makes a DELETE request
   * @param {string} endpoint - API endpoint path
   * @param {Object} options - Additional options
   * @returns {Promise<Response>} Fetch response object
   */
  delete(endpoint, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'DELETE',
    });
  },

  /**
   * Makes a GET request that allows caching (useful for static data)
   * @param {string} endpoint - API endpoint path
   * @param {Object} options - Additional options
   * @returns {Promise<Response>} Fetch response object
   */
  getCached(endpoint, options = {}) {
    return this.request(endpoint, { 
      ...options, 
      method: 'GET', 
      allowCache: true 
    });
  },
};