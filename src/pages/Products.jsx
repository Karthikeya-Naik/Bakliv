import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when search term changes
  useEffect(() => {
    filterProducts();
  }, [searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch all products without pagination
      const response = await productService.getAll({
        page: 1,
        limit: 1000, // Get all products
      });

      if (response.success) {
        // Sort products alphabetically by name
        const sortedProducts = response.data.products.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        
        setProducts(sortedProducts);
        
        // Initialize image indices
        const indices = {};
        sortedProducts.forEach(product => {
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

  const filterProducts = () => {
    if (!searchTerm.trim()) {
      // If no search term, show all products
      return;
    }

    // Filter logic is handled in the displayedProducts calculation
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the useEffect
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`);
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

  // Get displayed products (all or filtered)
  const displayedProducts = searchTerm.trim() 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        (product.slug && product.slug.toLowerCase().includes(searchTerm.toLowerCase().trim()))
      ).sort((a, b) => {
        const searchLower = searchTerm.toLowerCase().trim();
        const aNameLower = a.name.toLowerCase();
        const bNameLower = b.name.toLowerCase();
        const aSlugLower = (a.slug || '').toLowerCase();
        const bSlugLower = (b.slug || '').toLowerCase();
        
        // Check if product name or slug starts with search term (prioritize these)
        const aStartsWith = aNameLower.startsWith(searchLower) || aSlugLower.startsWith(searchLower);
        const bStartsWith = bNameLower.startsWith(searchLower) || bSlugLower.startsWith(searchLower);
        
        // Check for exact match
        const aExactMatch = aNameLower === searchLower || aSlugLower === searchLower;
        const bExactMatch = bNameLower === searchLower || bSlugLower === searchLower;
        
        // Priority: exact match > starts with > contains (all alphabetically within each group)
        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        
        // Within same priority level, sort alphabetically
        return aNameLower.localeCompare(bNameLower);
      })
    : products;

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
                onChange={handleSearchChange}
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
          ) : displayedProducts.length > 0 ? (
            <>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProducts.map(product => {
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
                      <div className="relative w-full h-80 bg-white overflow-hidden">
                        {images.length > 0 ? (
                          <>
                            <img 
                              src={images[currentIndex]} 
                              alt={product.name}
                              className="w-full h-full object-contain group-hover:opacity-95 transition-opacity duration-200"
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
                        <h1 className="text-lg font-medium text-[#181d54] mb-2">{product.name}</h1>
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