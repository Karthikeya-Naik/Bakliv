import { apiClient } from './api';

export const authService = {
  async login(credentials) {
    const response = await apiClient.post('/admin/login', credentials);
    return response.data;
  },

  async logout() {
    const response = await apiClient.post('/admin/logout');
    return response.data;
  },

  async me() {
    const response = await apiClient.get('/admin/me');
    return response.data;
  },

  // REMOVED: getCsrfToken() - not needed with JWT
};