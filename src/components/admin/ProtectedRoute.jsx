
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, checkAuth } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!authChecked && !loading) {
      console.log('🔵 ProtectedRoute: Checking authentication...');
      checkAuth().finally(() => {
        console.log('🔵 ProtectedRoute: Auth check completed');
        setAuthChecked(true);
      });
    }
  }, [checkAuth, authChecked, loading]);

  if (loading || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#181d54] mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  console.log('🟡 ProtectedRoute: isAuthenticated =', isAuthenticated);

  // TEMPORARY: Allow access to see what's happening
  if (!isAuthenticated) {
    console.log('🔴 ProtectedRoute: Not authenticated, but allowing access for debugging');
    // return <Navigate to="/admin/login" replace />;
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">🔴 Not Authenticated</h2>
          <p className="text-gray-700 mb-4">You would normally be redirected to login.</p>
          <p className="text-sm text-gray-500">Debug mode: Showing admin area anyway</p>
          {children}
        </div>
      </div>
    );
  }

  console.log('🟢 ProtectedRoute: User authenticated, granting access');
  return children;
};

export default ProtectedRoute;