// // frontend/src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/layout/Layout';
// import Home from './pages/Home';
// import About from './components/sections/About';
// import Contact from './components/sections/Contact';
// import ScrollToTop from './components/sections/ScrollToTop';
// import Products from './pages/Products';
// import ProductDetail from './pages/ProductsDetails';

// // Admin imports
// import AdminLogin from './pages/admin/AdminLogin';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import ProductsList from './pages/admin/ProductsList';
// import ProductCreate from './pages/admin/ProductCreate';
// import ProductEdit from './pages/admin/ProductEdit';
// import ContactsList from './pages/admin/ContactsList';
// import ProtectedRoute from './components/admin/ProtectedRoute';
// import AdminLayout from './components/admin/AdminLayout';


// // Context Provider
// import { AuthProvider } from './context/AuthContext';

// import './styles/index.css';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <ScrollToTop />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Layout><Home /></Layout>} />
//           <Route path="/about" element={<Layout><About /></Layout>} />
//           <Route path="/contact" element={<Layout><Contact /></Layout>} />
//           <Route path="/products" element={<Layout><Products /></Layout>} />
//           <Route path="/product/:slug" element={<Layout><ProductDetail /></Layout>} />

//           {/* Admin Login (No Layout) */}
//           <Route path="/admin/login" element={<AdminLogin />} />

//           {/* Protected Admin Routes */}
//           <Route path="/admin" element={
//               <ProtectedRoute>
//                 <AdminLayout />
//               </ProtectedRoute>
//           }>
//             <Route index element={<AdminDashboard />} />
//             <Route path="products" element={<ProductsList />} />
//             <Route path="products/create" element={<ProductCreate />} />
//             <Route path="products/edit/:id" element={<ProductEdit />} />
//             <Route path="contacts" element={<ContactsList />} />
//           </Route>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;








// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // Add this
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import ScrollToTop from './components/sections/ScrollToTop';
import Products from './pages/Products';
import ProductDetail from './pages/ProductsDetails';

// Admin imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsList from './pages/admin/ProductsList';
import ProductCreate from './pages/admin/ProductCreate';
import ProductEdit from './pages/admin/ProductEdit';
import ContactsList from './pages/admin/ContactsList';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

// Context Provider
import { AuthProvider } from './context/AuthContext';

import './styles/index.css';

function App() {
  return (
    <HelmetProvider> {/* Wrap everything with HelmetProvider */}
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/product/:slug" element={<Layout><ProductDetail /></Layout>} />

            {/* Admin Login (No Layout) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ProductsList />} />
              <Route path="products/create" element={<ProductCreate />} />
              <Route path="products/edit/:id" element={<ProductEdit />} />
              <Route path="contacts" element={<ContactsList />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;