
import { apiClient, apiFormData } from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const productService = {
  // Public: Get all products
  getAll: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS, { params });
    return response.data;
  },

  // Public: Get product by slug
  getBySlug: async (slug) => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCT_BY_SLUG(slug));
    return response.data;
  },

  // Admin: Get all products
  adminGetAll: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN_PRODUCTS, { params });
    return response.data;
  },

  // Admin: Get product by ID
  adminGetById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN_PRODUCT_BY_ID(id));
    return response.data;
  },

  // Admin: Create product
  adminCreate: async (formData) => {
    const response = await apiFormData.post(API_ENDPOINTS.ADMIN_PRODUCTS, formData);
    return response.data;
  },

  // Admin: Update product
  adminUpdate: async (id, formData) => {
    const response = await apiFormData.put(API_ENDPOINTS.ADMIN_PRODUCT_BY_ID(id), formData);
    return response.data;
  },

  // Admin: Delete product
  adminDelete: async (id) => {
    const response = await apiClient.delete(API_ENDPOINTS.ADMIN_PRODUCT_BY_ID(id));
    return response.data;
  },
};