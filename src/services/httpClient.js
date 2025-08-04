import Constants from 'expo-constants';

// Get base API URL from Expo configuration
const BASE_API_URL = Constants.expoConfig?.extra?.baseApiUrl;

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * HTTP client for making API requests with automatic token handling
 */
export const httpClient = {

  /**
   * Makes an HTTP request with automatic authentication handling
   * @param {string} endpoint - API endpoint path
   * @param {Object} options - Request options (method, headers, body, etc.)
   * @param {boolean} options.skipAuth - Skip authentication header if true
   * @returns {Promise<Response>} Fetch response object
   */
  async request(endpoint, options = {}) {
    // Get stored access token
    const token = await AsyncStorage.getItem('accessToken');

    // Build request configuration
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Add auth header unless skipAuth is true
        ...(!options.skipAuth && token && { Authorization: `Bearer ${token}` }),
        // Merge additional headers
        ...options.headers,
      },
      ...options,
    };

    // Make the request
    const response = await fetch(`${BASE_API_URL}${endpoint}`, config);

    // Handle token expiration
    if (response.status === 401) {
      await AsyncStorage.removeItem('accessToken');
    }

    return response;
  },

  /**
   * Makes a GET request
   * @param {string} endpoint - API endpoint path
   * @returns {Promise<Response>} Fetch response object
   */
  get(endpoint) {
    return this.request(endpoint);
  },

  /**
   * Makes a POST request with JSON data
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - Request body data
   * @returns {Promise<Response>} Fetch response object
   */
  post(endpoint, data) {
      return this.request(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

  /**
   * Makes a PUT request with JSON data
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - Request body data
   * @returns {Promise<Response>} Fetch response object
   */
  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Makes a PATCH request with JSON data
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - Request body data
   * @returns {Promise<Response>} Fetch response object
   */
  patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Makes a DELETE request
   * @param {string} endpoint - API endpoint path
   * @returns {Promise<Response>} Fetch response object
   */
  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  },
};