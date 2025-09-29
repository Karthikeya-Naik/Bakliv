import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './components/sections/About';
import './styles/index.css';
import Contact from './components/sections/Contact';
import ScrollToTop from './components/sections/ScrollToTop';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/products" element={<Products/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;