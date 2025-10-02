import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { productService } from '../services/productService';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getBySlug(slug);
      if (response.success) {
        setProduct(response.data);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/products');
  };

  const handleImageNavigation = (direction) => {
    if (!product.images || product.images.length === 0) return;
    
    if (direction === 'next') {
      setSelectedImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setSelectedImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') {
      handleImageNavigation('prev');
    } else if (e.key === 'ArrowRight') {
      handleImageNavigation('next');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#181d54]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Product not found'}</h2>
          <button
            onClick={handleBack}
            className="bg-[#181d54] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#202566] transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const hasMultipleImages = product.images && product.images.length > 1;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={handleBack}
            className="text-[#181d54] hover:underline font-medium flex items-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </button>
        </div>
      </div>

      {/* Product Detail Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div 
                className="bg-gradient-to-br from-gray-50 to-white rounded-lg overflow-hidden mb-4 relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {product.images && product.images.length > 0 ? (
                  <>
                    <img 
                      src={product.images[selectedImageIndex]} 
                      alt={product.name}
                      className="w-full h-96 object-contain p-6"
                    />
                    
                    {/* Navigation Buttons */}
                    {hasMultipleImages && isHovering && (
                      <>
                        <button
                          onClick={() => handleImageNavigation('prev')}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all z-10"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={() => handleImageNavigation('next')}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all z-10"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}

                    {/* Image Indicators */}
                    {hasMultipleImages && (
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {product.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              idx === selectedImageIndex 
                                ? 'bg-[#181d54] w-8' 
                                : 'bg-gray-400 hover:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-96 flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {hasMultipleImages && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index 
                          ? 'border-[#181d54] shadow-md' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-24 object-contain p-2 bg-white"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div>
              <h1 className="text-4xl font-light text-[#181d54] mb-4">{product.name}</h1>

              {/* Short Description */}
              <div className="mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Description */}
              {product.fullDescription && (
                <div className="prose prose-lg mb-8">
                  <h2 className="text-2xl font-light text-[#181d54] mb-4">Description</h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {product.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Medical Supervision Message */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                <p className="text-blue-900 font-semibold text-lg mb-2">Medical Supervision Required</p>
                <p className="text-blue-800 leading-relaxed">
                  This product should only be used under proper medical supervision. Please consult with a healthcare professional before use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-light text-[#181d54] mb-6 text-center">Important Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-[#181d54] mb-3">Prescription Required</h3>
              <p className="text-gray-600 text-sm">This medication requires a valid prescription from a licensed healthcare provider.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-[#181d54] mb-3">Professional Guidance</h3>
              <p className="text-gray-600 text-sm">Always follow your doctor's instructions regarding dosage and duration of treatment.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-[#181d54] mb-3">Safety First</h3>
              <p className="text-gray-600 text-sm">Report any adverse effects to your healthcare provider immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-light text-[#181d54] mb-4">Have Questions?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact us for more information about this product or any medical consultation
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

export default ProductDetail;