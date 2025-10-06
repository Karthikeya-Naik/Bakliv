import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      console.log('🟡 AuthContext: Checking authentication...');
      const response = await authService.me();
      console.log('🟡 AuthContext: Auth check response:', response);
      
      if (response.success) {
        setAdmin(response.data.admin || response.data.data?.admin); // ✅
        setIsAuthenticated(true);

        console.log('🟢 AuthContext: User is authenticated');
        return { success: true };
      } else {
        console.log('🔴 AuthContext: Auth check failed - no success flag');
        clearAuth();
        return { success: false };
      }
    } catch (error) {
      console.error('🔴 AuthContext: Auth check error:', error);
      clearAuth();
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  // Check for existing token on mount
  useEffect(() => {
    const existingToken = sessionStorage.getItem('auth_token');
    if (existingToken) {
      console.log('AuthContext: Found existing token, checking auth...');
      checkAuth();
    }
  }, [checkAuth]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      console.log('🟡 AuthContext: Attempting login...');
      const response = await authService.login(credentials);
      console.log('🟡 AuthContext: Login response:', response);
      
      if (response.success) {
        setAdmin(response.data.admin || response.data.data?.admin);
        setIsAuthenticated(true);

        // Store JWT token
        const token = response.data.token || response.data.data?.token;
        if (token) {
          sessionStorage.setItem('auth_token', token);
          console.log('🟢 AuthContext: JWT token stored');
        }

        
        console.log('🟢 AuthContext: Login successful');
        return { success: true };
      } else {
        console.log('🔴 AuthContext: Login failed - no success flag');
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('🔴 AuthContext: Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.error?.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const clearAuth = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('auth_token');
    console.log('🟡 AuthContext: Auth cleared');
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
      console.log('AuthContext: Logout completed');
    }
  };

  const value = {
    admin,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};