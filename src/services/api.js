import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // No need for credentials with JWT
  timeout: 15000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🟡 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    // Add JWT token to ALL requests
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('🟡 API Request: JWT token added');
    }
    
    // REMOVED: CSRF token handling (not needed with JWT)
    
    return config;
  },
  (error) => {
    console.error('🔴 API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`🟢 API Response: ${response.status} ${response.config.url}`);
    
    // Store JWT token if present in login response
    if (response.data?.token) {
      sessionStorage.setItem('auth_token', response.data.token);
      console.log('🟢 API Response: JWT token stored');
    }
    
    // REMOVED: CSRF token handling
    
    return response;
  },
  (error) => {
    console.error('🔴 API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      method: error.config?.method,
      message: error.message,
    });

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.log('🔴 API: 401 Unauthorized - Clearing token');
      sessionStorage.removeItem('auth_token');
      // Optionally redirect to login page
      // window.location.href = '/admin/login';
    }
    
    return Promise.reject(error);
  }
);

// API helper functions
export const apiClient = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data, config = {}) => api.post(url, data, config),
  put: (url, data, config = {}) => api.put(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
};

// Multipart form data helper
export const apiFormData = {
  post: (url, formData) => {
    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  put: (url, formData) => {
    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;