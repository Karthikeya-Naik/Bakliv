// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Helmet } from 'react-helmet-async'; // Add this
// import { productService } from '../services/productService';

// const ProductDetail = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [error, setError] = useState(null);
//   const [isHovering, setIsHovering] = useState(false);

//   useEffect(() => {
//     fetchProduct();
//   }, [slug]);

//   const fetchProduct = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await productService.getBySlug(slug);
//       if (response.success) {
//         setProduct(response.data);
//       } else {
//         setError('Product not found');
//       }
//     } catch (error) {
//       console.error('Failed to fetch product:', error);
//       setError('Failed to load product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate('/products');
//   };

//   const handleImageNavigation = (direction) => {
//     if (!product.images || product.images.length === 0) return;
    
//     if (direction === 'next') {
//       setSelectedImageIndex((prev) => 
//         prev === product.images.length - 1 ? 0 : prev + 1
//       );
//     } else {
//       setSelectedImageIndex((prev) => 
//         prev === 0 ? product.images.length - 1 : prev - 1
//       );
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'ArrowLeft') {
//       handleImageNavigation('prev');
//     } else if (e.key === 'ArrowRight') {
//       handleImageNavigation('next');
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [product]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#181d54] border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <h2 className="text-xl font-medium text-gray-900 mb-4">{error || 'Product not found'}</h2>
//           <button
//             onClick={handleBack}
//             className="bg-[#181d54] text-white px-6 py-2.5 rounded-md text-sm hover:bg-[#202566] transition-colors"
//           >
//             Back to Products
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const hasMultipleImages = product.images && product.images.length > 1;

//   // Get meta information from product data
//   const metaTitle = product.meta_info_title || product.name;
//   const metaDescription = product.meta_info_description || product.description;
//   const canonicalUrl = product.meta_info_canonical || `https://bakliv.com/product/${product.slug}`;
//   console.log(metaTitle);
//   console.log(metaDescription);

//   return (
//     <>
//       {/* Add Helmet for SEO Meta Tags */}
//       <Helmet>
//         <title>{metaTitle}</title>
//         <meta name="description" content={metaDescription} />
//         <meta name="keywords" content={`${product.name}, pharmaceuticals, medicines, healthcare, BAKLIV`} />
//         <link rel="canonical" href={canonicalUrl} />
        
//         {/* Open Graph Tags */}
//         <meta property="og:title" content={metaTitle} />
//         <meta property="og:description" content={metaDescription} />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:type" content="product" />
//         {product.images && product.images.length > 0 && (
//           <meta property="og:image" content={product.images[0]} />
//         )}
        
//         {/* Twitter Card Tags */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={metaTitle} />
//         <meta name="twitter:description" content={metaDescription} />
//         {product.images && product.images.length > 0 && (
//           <meta name="twitter:image" content={product.images[0]} />
//         )}
        
//         {/* Structured Data */}
//         <script type="application/ld+json">
//           {`
//             {
//               "@context": "https://schema.org",
//               "@type": "Product",
//               "name": "${product.name}",
//               "description": "${product.description.replace(/"/g, '\\"')}",
//               "image": ${JSON.stringify(product.images || [])},
//               "brand": {
//                 "@type": "Brand",
//                 "name": "BAKLIV PHARMA"
//               },
//               "offers": {
//                 "@type": "Offer",
//                 "price": "${product.price || ""}",
//                 "availability": "https://schema.org/InStock",
//                 "priceCurrency": "INR"
//               }
//             }
//           `}
//         </script>
//       </Helmet>

//       <div className="min-h-screen bg-gray-50">
//         {/* Back to Products Link */}
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
//           <button
//             onClick={handleBack}
//             className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
//           >
//             <ArrowLeft size={20} />
//             <span className="font-medium">Back to Products</span>
//           </button>
//         </div>

//         {/* Rest of your existing UI code remains exactly the same */}
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
//           {/* Product Card */}
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
//             <div className="p-8">
//               {/* Product Header */}
//               <div className="mb-0">
//                 <h1 className="text-3xl font-bold text-[#181d54] mb-3">{product.name}</h1>
//                 <p className="text-gray-600 text-sm">{product.description}</p>
//               </div>

//               {/* Image Gallery Section */}
//               <div className="mb-8">
//                 <div 
//                   className="bg-white rounded-lg relative mb-4"
//                   onMouseEnter={() => setIsHovering(true)}
//                   onMouseLeave={() => setIsHovering(false)}
//                 >
//                   {product.images && product.images.length > 0 ? (
//                     <>
//                       <img 
//                         src={product.images[selectedImageIndex]} 
//                         alt={product.name}
//                         className="w-full h-96 object-contain p-0"
//                       />
                      
//                       {hasMultipleImages && isHovering && (
//                         <>
//                           <button
//                             onClick={() => handleImageNavigation('prev')}
//                             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-2.5 rounded-full shadow-md transition-all"
//                           >
//                             <ChevronLeft size={20} />
//                           </button>
//                           <button
//                             onClick={() => handleImageNavigation('next')}
//                             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-2.5 rounded-full shadow-md transition-all"
//                           >
//                             <ChevronRight size={20} />
//                           </button>
//                         </>
//                       )}

//                       {hasMultipleImages && (
//                         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//                           {product.images.map((_, idx) => (
//                             <button
//                               key={idx}
//                               onClick={() => setSelectedImageIndex(idx)}
//                               className={`w-2 h-2 rounded-full transition-all ${
//                                 idx === selectedImageIndex ? 'bg-[#181d54] w-6' : 'bg-gray-400'
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="w-full h-80 flex items-center justify-center text-gray-400">
//                       No Image Available
//                     </div>
//                   )}
//                 </div>
                
//                 {hasMultipleImages && (
//                   <div className="grid grid-cols-5 gap-2">
//                     {product.images.map((img, index) => (
//                       <button 
//                         key={index}
//                         onClick={() => setSelectedImageIndex(index)}
//                         className={`rounded-md border-2 overflow-hidden transition-all ${
//                           selectedImageIndex === index ? 'border-[#181d54]' : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                       >
//                         <img 
//                           src={img} 
//                           alt={`View ${index + 1}`}
//                           className="w-full h-16 object-contain p-1.5 bg-white"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Description */}
//               {product.fullDescription && (
//                 <div className="mb-8">
//                   <h2 className="text-xl font-bold text-[#181d54] mb-3">Description</h2>
//                   <div className="text-gray-700 space-y-3 text-sm leading-relaxed">
//                     {product.fullDescription.split('\n\n').map((paragraph, index) => (
//                       <p key={index}>{paragraph}</p>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Medical Alert */}
//               <div className="bg-white-50  px-0 py-3 rounded-r-lg">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 mt-0.5">
//                     <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <h3 className="text-sm font-semibold text-[#010172]">Medical Supervision Required</h3>
//                     <p className="text-sm text-[#010176] mt-1 font-light ">
//                       This product should only be used under proper medical supervision. Please consult with a healthcare professional before use.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Information Cards */}
//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="font-semibold text-[#181d54] text-sm mb-2">Prescription Required</h3>
//               <p className="text-gray-600 text-xs leading-relaxed">This medication requires a valid prescription from a licensed healthcare provider.</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="font-semibold text-[#181d54] text-sm mb-2">Professional Guidance</h3>
//               <p className="text-gray-600 text-xs leading-relaxed">Always follow your doctor's instructions regarding dosage and duration of treatment.</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="font-semibold text-[#181d54] text-sm mb-2">Safety First</h3>
//               <p className="text-gray-600 text-xs leading-relaxed">Report any adverse effects to your healthcare provider immediately.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetail;









import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
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

  // 🔥 CRITICAL SEO FIX: Direct meta tag updates
  useEffect(() => {
    if (product) {
      const metaTitle = product.meta_info_title || `${product.name} | BAKLIV Pharmaceuticals`;
      const metaDescription = product.meta_info_description || product.description;
      const canonicalUrl = product.meta_info_canonical || `https://bakliv.com/product/${product.slug}`;

      // Update document title directly (for SEO crawlers)
      document.title = metaTitle;

      // Update or create meta description
      let metaDescTag = document.querySelector('meta[name="description"]');
      if (!metaDescTag) {
        metaDescTag = document.createElement('meta');
        metaDescTag.name = 'description';
        document.head.appendChild(metaDescTag);
      }
      metaDescTag.content = metaDescription;

      // Update or create canonical URL
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.href = canonicalUrl;

      console.log('✅ SEO Meta Tags Updated:', {
        title: metaTitle,
        description: metaDescription,
        canonical: canonicalUrl
      });
    }

    // Cleanup: Reset title when component unmounts
    return () => {
      document.title = 'BAKLIV - Pharmaceutical Excellence';
    };
  }, [product]);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#181d54] border-t-transparent"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-4">{error || 'Product not found'}</h2>
          <button
            onClick={handleBack}
            className="bg-[#181d54] text-white px-6 py-2.5 rounded-md text-sm hover:bg-[#202566] transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const hasMultipleImages = product.images && product.images.length > 1;

  // Get meta information from product data
  const metaTitle = product.meta_info_title || `${product.name} | BAKLIV Pharmaceuticals`;
  const metaDescription = product.meta_info_description || product.description;
  const canonicalUrl = product.meta_info_canonical || `https://bakliv.com/product/${product.slug}`;
  
  console.log('📊 Product Meta Data:', {
    metaTitle,
    metaDescription,
    canonicalUrl
  });

  return (
    <>
      {/* Helmet for meta tags */}
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${product.name}, pharmaceuticals, medicines, healthcare, BAKLIV`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="product" />
        <meta name="robots" content="index, follow" />
        {product.images && product.images.length > 0 && (
          <meta property="og:image" content={product.images[0]} />
        )}
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {product.images && product.images.length > 0 && (
          <meta name="twitter:image" content={product.images[0]} />
        )}
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "${product.name}",
              "description": "${product.description.replace(/"/g, '\\"')}",
              "image": ${JSON.stringify(product.images || [])},
              "brand": {
                "@type": "Brand",
                "name": "BAKLIV PHARMA"
              },
              "offers": {
                "@type": "Offer",
                "price": "${product.price || ""}",
                "availability": "https://schema.org/InStock",
                "priceCurrency": "INR"
              }
              "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "reviewCount": "1"
              }
            }
          `}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Back to Products Link */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Products</span>
          </button>
        </div>

        {/* Main Container */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          {/* Product Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-8">
              {/* Product Header */}
              <div className="mb-0">
                <h1 className="text-3xl font-bold text-[#181d54] mb-3">{product.name}</h1>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>

              {/* Image Gallery Section */}
              <div className="mb-8">
                <div 
                  className="bg-white rounded-lg relative mb-4"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {product.images && product.images.length > 0 ? (
                    <>
                      <img 
                        src={product.images[selectedImageIndex]} 
                        alt={product.name}
                        className="w-full h-96 object-contain p-0"
                      />
                      
                      {hasMultipleImages && isHovering && (
                        <>
                          <button
                            onClick={() => handleImageNavigation('prev')}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-2.5 rounded-full shadow-md transition-all"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() => handleImageNavigation('next')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-2.5 rounded-full shadow-md transition-all"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}

                      {hasMultipleImages && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {product.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                idx === selectedImageIndex ? 'bg-[#181d54] w-6' : 'bg-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-80 flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>
                
                {hasMultipleImages && (
                  <div className="grid grid-cols-5 gap-2">
                    {product.images.map((img, index) => (
                      <button 
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`rounded-md border-2 overflow-hidden transition-all ${
                          selectedImageIndex === index ? 'border-[#181d54]' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`View ${index + 1}`}
                          className="w-full h-16 object-contain p-1.5 bg-white"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              {product.fullDescription && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#181d54] mb-3">Description</h2>
                  <div className="text-gray-700 space-y-3 text-sm leading-relaxed">
                    {product.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Medical Alert */}
              <div className="bg-white-50  px-0 py-3 rounded-r-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold text-[#010172]">Medical Supervision Required</h3>
                    <p className="text-sm text-[#010176] mt-1 font-light ">
                      This product should only be used under proper medical supervision. Please consult with a healthcare professional before use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-[#181d54] text-sm mb-2">Prescription Required</h3>
              <p className="text-gray-600 text-xs leading-relaxed">This medication requires a valid prescription from a licensed healthcare provider.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-[#181d54] text-sm mb-2">Professional Guidance</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Always follow your doctor's instructions regarding dosage and duration of treatment.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-[#181d54] text-sm mb-2">Safety First</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Report any adverse effects to your healthcare provider immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;