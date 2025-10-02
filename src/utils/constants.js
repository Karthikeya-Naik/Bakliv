

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://bakliv-backend/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Public
  PRODUCTS: '/products',
  PRODUCT_BY_SLUG: (slug) => `/products/${slug}`,
  CONTACTS: '/contacts',
  
  // Admin Auth
  ADMIN_LOGIN: '/admin/login',
  ADMIN_LOGOUT: '/admin/logout',
  ADMIN_ME: '/admin/me',
  ADMIN_CSRF: '/admin/csrf-token',
  
  // Admin Products
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCT_BY_ID: (id) => `/admin/products/${id}`,
  
  // Admin Contacts
  ADMIN_CONTACTS: '/admin/contacts',
  ADMIN_CONTACT_BY_ID: (id) => `/admin/contacts/${id}`,
};

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const ADMIN_PAGE_SIZE = 20;

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:slug',
  
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCT_CREATE: '/admin/products/create',
  ADMIN_PRODUCT_EDIT: '/admin/products/edit/:id',
  ADMIN_CONTACTS: '/admin/contacts',
};