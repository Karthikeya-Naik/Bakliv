import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { productService } from '../../services/productService';
import ProductImageUpload from '../../components/admin/ProductImageUpload';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    alt_text: '',
    description: '',
    long_description: '',
    disclaimer: '',
    slug: '',
    price: '',
    meta_info_title: '',
    meta_info_description: '',
    meta_info_canonical: '',
  });
  const [existingImages, setExistingImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [newImages, setNewImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productService.adminGetById(id);
      if (response.success) {
        const product = response.data;
        
        // Debug: Check the actual data coming from backend
        console.log('🔍 Product data from backend:', {
          description: product.description,
          descriptionLength: product.description?.length,
          alt_text: product.alt_text,
          long_description: product.long_description
        });
        
        // Decode any HTML entities that might be stored in the database
        const decodeHtmlEntities = (text) => {
          if (!text) return '';
          return text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&apos;/g, "'")
            .replace(/&#x27;/g, "'")
            .replace(/&#x2F;/g, '/')
            .replace(/&#96;/g, '`');
        };
        
        setFormData({
          alt_text: decodeHtmlEntities(product.alt_text || ''),
          description: decodeHtmlEntities(product.description || ''),
          long_description: decodeHtmlEntities(product.long_description || ''),
          disclaimer: decodeHtmlEntities(product.disclaimer || ''),
          slug: product.slug || '',
          price: product.price || '',
          meta_info_title: decodeHtmlEntities(product.meta?.title || ''),
          meta_info_description: decodeHtmlEntities(product.meta?.description || ''),
          meta_info_canonical: product.meta?.canonical || '',
        });

        // Store the actual image paths from backend
        const imagePaths = {
          image1: product.images.image1,
          image2: product.images.image2,
          image3: product.images.image3,
          image4: product.images.image4,
        };

        setExistingImages(imagePaths);
        setImagePreviews(imagePaths);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
      setErrors({ submit: 'Failed to load product' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (imageKey, file) => {
    console.log('🟡 handleImageChange called:', { imageKey, file });
    
    if (!file) {
      console.log('🔴 No file provided');
      setErrors(prev => ({ ...prev, [imageKey]: 'No file selected' }));
      return;
    }

    if (!file.type || !file.type.startsWith('image/')) {
      console.log('🔴 Invalid file type:', file.type);
      setErrors(prev => ({ ...prev, [imageKey]: 'Please select an image file (JPEG, PNG, GIF, WebP)' }));
      return;
    }

    if (!file.size || file.size > 2.5 * 1024 * 1024) {
      console.log('🔴 File too large:', file.size);
      setErrors(prev => ({ ...prev, [imageKey]: 'Image size must be less than 2.5MB' }));
      return;
    }

    // If there's an existing image being replaced, mark it for deletion
    if (existingImages[imageKey]) {
      console.log('🟡 Marking existing image for deletion:', existingImages[imageKey]);
      setDeletedImages(prev => {
        const newDeleted = [...prev];
        const imagePath = existingImages[imageKey];
        if (imagePath && !newDeleted.includes(imagePath)) {
          newDeleted.push(imagePath);
        }
        return newDeleted;
      });
      setExistingImages(prev => ({ ...prev, [imageKey]: null }));
    }

    setNewImages(prev => ({ ...prev, [imageKey]: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviews(prev => ({ ...prev, [imageKey]: reader.result }));
    };
    reader.onerror = () => {
      console.error('🔴 Failed to read file');
      setErrors(prev => ({ ...prev, [imageKey]: 'Failed to process image' }));
    };
    reader.readAsDataURL(file);

    setErrors(prev => ({ ...prev, [imageKey]: null }));
  };

  const removeImage = (imageKey) => {
    console.log('🟡 Removing image:', imageKey);
    
    if (existingImages[imageKey]) {
      const imagePath = existingImages[imageKey];
      console.log('🟡 Marking existing image for deletion:', imagePath);
      
      setDeletedImages(prev => {
        const newDeleted = [...prev];
        if (imagePath && !newDeleted.includes(imagePath)) {
          newDeleted.push(imagePath);
        }
        return newDeleted;
      });
    }
    
    // Clear all image states for this slot
    setExistingImages(prev => ({ ...prev, [imageKey]: null }));
    setNewImages(prev => ({ ...prev, [imageKey]: null }));
    setImagePreviews(prev => ({ ...prev, [imageKey]: null }));
    setErrors(prev => ({ ...prev, [imageKey]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.alt_text.trim()) {
      newErrors.alt_text = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Short description is required';
    } else if (formData.description.length > 350) {
      newErrors.description = 'Short description must be 350 characters or less';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();

      // Debug: Check what we're sending to backend
      console.log('🔍 Data being sent to backend:', {
        description: formData.description,
        descriptionLength: formData.description.length,
        alt_text: formData.alt_text,
        long_description: formData.long_description
      });

      // Encode special characters properly before sending to backend
      const encodeSpecialChars = (text) => {
        if (!text) return text;
        return text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      };

      // Append form data with proper encoding
      const encodedFormData = {
        ...formData,
        alt_text: encodeSpecialChars(formData.alt_text),
        description: encodeSpecialChars(formData.description),
        long_description: encodeSpecialChars(formData.long_description),
        disclaimer: encodeSpecialChars(formData.disclaimer),
        meta_info_title: encodeSpecialChars(formData.meta_info_title),
        meta_info_description: encodeSpecialChars(formData.meta_info_description),
      };

      Object.keys(encodedFormData).forEach(key => {
        if (encodedFormData[key] !== null && encodedFormData[key] !== undefined) {
          data.append(key, encodedFormData[key]);
        }
      });

      // Append new images
      Object.keys(newImages).forEach(key => {
        if (newImages[key]) {
          console.log('🟡 Appending new image:', key, newImages[key].name);
          data.append(key, newImages[key]);
        }
      });

      // Append deleted images
      if (deletedImages.length > 0) {
        console.log('🟡 Sending deleted images:', deletedImages);
        data.append('deleted_images', JSON.stringify(deletedImages));
      }

      console.log('🟡 Submitting form data...');
      const response = await productService.adminUpdate(id, data);

      if (response.success) {
        console.log('🟢 Product updated successfully');
        console.log('🔍 Response from backend:', response.data);
        navigate('/admin/products');
      } else {
        console.log('🔴 Update failed:', response.message);
        setErrors({ submit: response.message || 'Failed to update product' });
      }
    } catch (error) {
      console.error('🔴 Failed to update product:', error);
      const errorMessage = error.response?.data?.error?.message || 'Failed to update product';
      const validationErrors = error.response?.data?.data;

      if (validationErrors) {
        setErrors(validationErrors);
      } else {
        setErrors({ submit: errorMessage });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#181d54]"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link
          to="/admin/products"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-600 mt-1">Update product information</p>
      </div>

      <form onSubmit={handleSubmit}>
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-red-700">{errors.submit}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="alt_text"
                value={formData.alt_text}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#181d54] focus:border-transparent ${
                  errors.alt_text ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., ACECLODL-P"
              />
              {errors.alt_text && (
                <p className="text-red-500 text-sm mt-1">{errors.alt_text}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#181d54] focus:border-transparent ${
                  errors.slug ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., aceclodl-p"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#181d54] focus:border-transparent ${
                  errors.price ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 ml-2">
                {formData.description.length}/350 characters
              </span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={350}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#181d54] focus:border-transparent ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Brief description for product listing (max 350 characters)"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Description
            </label>
            <textarea
              name="long_description"
              value={formData.long_description}
              onChange={handleInputChange}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181d54] focus:border-transparent"
              placeholder="Detailed product information, usage instructions, etc. Special characters like ', @, ? will be preserved."
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disclaimer
            </label>
            <textarea
              name="disclaimer"
              value={formData.disclaimer}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181d54] focus:border-transparent"
              placeholder="Medical disclaimer or important warnings. Special characters like ', @, ? will be preserved."
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <ProductImageUpload
            images={newImages}
            previews={imagePreviews}
            errors={errors}
            onImageChange={handleImageChange}
            onImageRemove={removeImage}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">SEO Information</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                name="meta_info_title"
                value={formData.meta_info_title}
                onChange={handleInputChange}
                maxLength={255}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181d54] focus:border-transparent"
                placeholder="SEO title for search engines"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                name="meta_info_description"
                value={formData.meta_info_description}
                onChange={handleInputChange}
                maxLength={500}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181d54] focus:border-transparent"
                placeholder="SEO description for search engines"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Canonical URL
              </label>
              <input
                type="url"
                name="meta_info_canonical"
                value={formData.meta_info_canonical}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#181d54] focus:border-transparent"
                placeholder="https://yoursite.com/products/product-slug"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Link
            to="/admin/products"
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#181d54] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#202566] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;