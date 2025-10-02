import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total: 0,
  });
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [pagination.current_page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getAll({
        page: pagination.current_page,
        limit: 12,
        search: searchTerm || undefined,
      });

      if (response.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
        // Initialize image indices
        const indices = {};
        response.data.products.forEach(product => {
          indices[product.id] = 0;
        });
        setCurrentImageIndex(indices);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, current_page: 1 }));
    fetchProducts();
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`);
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, current_page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageNavigation = (e, productId, direction, images) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => {
      const currentIndex = prev[productId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      }
      
      return { ...prev, [productId]: newIndex };
    });
  };

  const getProductImages = (product) => {
    // Assuming product has 'images' array or 'image' single field
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    } else if (product.image) {
      return [product.image];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Search */}
      <section className="bg-[#181d54] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-light mb-8 tracking-wide text-center">Our Products</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-12 rounded-lg text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#181d54] text-white p-2 rounded-lg hover:bg-[#202566] transition-colors"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#181d54]"></div>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {products.map(product => {
                  const images = getProductImages(product);
                  const currentIndex = currentImageIndex[product.id] || 0;
                  const hasMultipleImages = images.length > 1;
                  
                  return (
                    <div 
                      key={product.id} 
                      onClick={() => handleProductClick(product)}
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-200"
                    >
                      <div className="relative w-full h-80 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                        {images.length > 0 ? (
                          <>
                            <img 
                              src={images[currentIndex]} 
                              alt={product.name}
                              className="w-full h-full object-contain p-4 group-hover:opacity-95 transition-opacity duration-200"
                            />
                            
                            {/* Image Navigation Controls */}
                            {hasMultipleImages && hoveredProduct === product.id && (
                              <>
                                <button
                                  onClick={(e) => handleImageNavigation(e, product.id, 'prev', images)}
                                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all z-10"
                                >
                                  <ChevronLeft size={20} />
                                </button>
                                <button
                                  onClick={(e) => handleImageNavigation(e, product.id, 'next', images)}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all z-10"
                                >
                                  <ChevronRight size={20} />
                                </button>
                                
                                {/* Image Indicators */}
                                {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                  {images.map((_, idx) => (
                                    <div
                                      key={idx}
                                      className={`w-2 h-2 rounded-full ${
                                        idx === currentIndex ? 'bg-[#181d54]' : 'bg-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div> */}
                              </>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                            No Image
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-medium text-[#181d54] mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                        
                        {/* Medical Supervision Message - styled like the reference image */}
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-500 text-xs italic leading-relaxed">
                            Medical Supervision Required This product should only be used under proper medical supervision. Please consult with a healthcare professional before use.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {pagination.total_pages > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={!pagination.has_prev}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  >
                    <ChevronLeft size={20} />
                    <span>Previous</span>
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Page</span>
                    <span className="px-4 py-2 bg-[#181d54] text-white rounded-lg font-medium">
                      {pagination.current_page}
                    </span>
                    <span className="text-gray-600">of {pagination.total_pages}</span>
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={!pagination.has_next}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-light text-[#181d54] mb-4">Need Medical Consultation?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact us for medical guidance or if you have any questions about our products
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-[#181d54] text-white px-8 py-3 font-medium hover:bg-[#202566] transition-colors duration-200"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default Products;