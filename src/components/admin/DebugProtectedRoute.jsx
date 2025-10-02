import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const DebugProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, checkAuth } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    console.log('🟡 DebugProtectedRoute: Mounted');
    console.log('🟡 DebugProtectedRoute: Initial state - isAuthenticated:', isAuthenticated, 'loading:', loading);
    
    if (!authChecked && !loading) {
      console.log('🟡 DebugProtectedRoute: Calling checkAuth...');
      checkAuth().then(result => {
        console.log('🟡 DebugProtectedRoute: checkAuth result:', result);
        setAuthChecked(true);
      }).catch(error => {
        console.error('🔴 DebugProtectedRoute: checkAuth error:', error);
        setAuthChecked(true);
      });
    }
  }, [checkAuth, authChecked, loading, isAuthenticated]);

  console.log('🟡 DebugProtectedRoute: Render - isAuthenticated:', isAuthenticated, 'loading:', loading, 'authChecked:', authChecked);

  // NEVER redirect - always show children with debug info
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Debug Header */}
      <div className="bg-yellow-500 text-black p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">🔧 DEBUG MODE - PROTECTED ROUTE</h1>
          <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
            <div>isAuthenticated: <span className={isAuthenticated ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{isAuthenticated ? 'TRUE' : 'FALSE'}</span></div>
            <div>loading: <span className={loading ? 'text-blue-600 font-bold' : 'text-gray-600 font-bold'}>{loading ? 'TRUE' : 'FALSE'}</span></div>
            <div>authChecked: <span className={authChecked ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{authChecked ? 'TRUE' : 'FALSE'}</span></div>
          </div>
          <div className="mt-2 text-sm">
            CSRF Token: {sessionStorage.getItem('csrf_token') ? '✅ EXISTS' : '❌ MISSING'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto p-4">
        {children}
      </div>

      {/* Debug Footer */}
      <div className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto">
          <h2 className="font-bold mb-2">Debug Information:</h2>
          <pre className="text-sm">
            {JSON.stringify({
              timestamp: new Date().toISOString(),
              isAuthenticated,
              loading,
              authChecked,
              hasCsrfToken: !!sessionStorage.getItem('csrf_token'),
              pathname: window.location.pathname
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DebugProtectedRoute;