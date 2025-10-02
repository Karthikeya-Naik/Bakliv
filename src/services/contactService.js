
import { apiClient } from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const contactService = {
  // Submit contact form
  submit: async (data) => {
    const response = await apiClient.post(API_ENDPOINTS.CONTACTS, data);
    return response.data;
  },

  // Admin: Get all contacts
  adminGetAll: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN_CONTACTS, { params });
    return response.data;
  },

  // Admin: Delete contact
  adminDelete: async (id) => {
    const response = await apiClient.delete(API_ENDPOINTS.ADMIN_CONTACT_BY_ID(id));
    return response.data;
  },
};