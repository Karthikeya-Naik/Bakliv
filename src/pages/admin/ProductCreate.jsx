
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, X, AlertCircle } from 'lucide-react';
import { productService } from '../../services/productService';

const ProductCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  const [images, setImages] = useState({
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-generate slug from alt_text
    if (name === 'alt_text' && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, [imageKey]: 'Please select an image file' }));
        return;
      }

      // Validate file size (2.5MB)
      if (file.size > 2.5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [imageKey]: 'Image size must be less than 2.5MB' }));
        return;
      }

      setImages(prev => ({ ...prev, [imageKey]: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => ({ ...prev, [imageKey]: reader.result }));
      };
      reader.readAsDataURL(file);

      // Clear error
      setErrors(prev => ({ ...prev, [imageKey]: null }));
    }
  };

  const removeImage = (imageKey) => {
    setImages(prev => ({ ...prev, [imageKey]: null }));
    setImagePreviews(prev => ({ ...prev, [imageKey]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.alt_text.trim()) {
      newErrors.alt_text = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Short description is required';
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

    setLoading(true);

    try {
      // Create FormData
      const data = new FormData();

      // Append form fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      // Append images
      Object.keys(images).forEach(key => {
        if (images[key]) {
          data.append(key, images[key]);
        }
      });

      const response = await productService.adminCreate(data);

      if (response.success) {
        navigate('/admin/products');
      } else {
        setErrors({ submit: response.message || 'Failed to create product' });
      }
    } catch (error) {
      console.error('Failed to create product:', error);
      const errorMessage = error.response?.data?.error?.message || 'Failed to create product';
      const validationErrors = error.response?.data?.data;

      if (validationErrors) {
        setErrors(validationErrors);
      } else {
        setErrors({ submit: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/admin/products"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-1">Create a new product listing</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* General Error */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-red-700">{errors.submit}</p>
          </div>
        )}

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
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

            {/* Slug */}
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

            {/* Price */}
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

          {/* Short Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={255}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#181d54] focus:border-transparent ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Brief description for product listing"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Long Description */}
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
              placeholder="Detailed product information, usage instructions, etc."
            />
          </div>

          {/* Disclaimer */}
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
              placeholder="Medical disclaimer or important warnings"
            />
          </div>
        </div>

        {/* Product Images */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Product Images</h2>
          <p className="text-sm text-gray-600 mb-4">Upload up to 4 images (JPG, PNG, WEBP - Max 2.5MB each)</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['image1', 'image2', 'image3', 'image4'].map((imageKey, index) => (
              <div key={imageKey}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image {index + 1} {index === 0 && <span className="text-gray-500">(Main)</span>}
                </label>
                {imagePreviews[imageKey] ? (
                  <div className="relative">
                    <img
                      src={imagePreviews[imageKey]}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(imageKey)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="text-gray-400 mb-2" size={32} />
                    <span className="text-sm text-gray-600">Click to upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, imageKey)}
                      className="hidden"
                    />
                  </label>
                )}
                {errors[imageKey] && (
                  <p className="text-red-500 text-sm mt-1">{errors[imageKey]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO / Meta Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">SEO Information</h2>

          <div className="space-y-6">
            {/* Meta Title */}
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

            {/* Meta Description */}
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

            {/* Canonical URL */}
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

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            to="/admin/products"
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#181d54] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#202566] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;