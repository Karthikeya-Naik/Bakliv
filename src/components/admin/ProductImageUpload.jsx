import React from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ProductImageUpload = ({ 
  images, 
  previews, 
  errors, 
  onImageChange, 
  onImageRemove 
}) => {
  const imageSlots = ['image1', 'image2', 'image3', 'image4'];

  const handleFileSelect = (imageKey, event) => {
    const file = event.target.files[0];
    console.log('🟡 ProductImageUpload: File selected', { imageKey, file });
    
    if (file) {
      onImageChange(imageKey, file);
    } else {
      console.log('🔴 ProductImageUpload: No file selected');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Images</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload up to 4 images. Accepted formats: JPG, PNG, WEBP (Max 2.5MB each)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {imageSlots.map((imageKey, index) => (
          <div key={imageKey} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image {index + 1}
              {index === 0 && (
                <span className="ml-2 text-gray-500 font-normal">(Main Image)</span>
              )}
            </label>

            {previews[imageKey] ? (
              // Image Preview
              <div className="relative group">
                <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
                  <img
                    src={previews[imageKey]}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => onImageRemove(imageKey)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transform hover:scale-110 transition-transform"
                      title="Remove image"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* New badge if it's a new upload */}
                  {images[imageKey] && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      New
                    </div>
                  )}
                </div>

                {/* Change Image Button */}
                <label className="mt-2 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                  <ImageIcon size={16} className="mr-2" />
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(imageKey, e)}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              // Upload Area
              <label className="block">
                <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#181d54] transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 hover:text-[#181d54] transition-colors">
                    <Upload size={48} className="mb-3" />
                    <p className="text-sm font-medium mb-1">Click to upload</p>
                    <p className="text-xs text-gray-400">or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-2">
                      PNG, JPG, WEBP up to 2.5MB
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(imageKey, e)}
                  className="hidden"
                />
              </label>
            )}

            {/* Error Message */}
            {errors[imageKey] && (
              <div className="flex items-start space-x-2 text-red-600 text-sm mt-2">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{errors[imageKey]}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image Guidelines */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          Image Guidelines
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use high-quality images with good lighting</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Recommended resolution: 800x800px or higher</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>First image will be used as the main product image</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Accepted formats: JPG, JPEG, PNG, WEBP</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Maximum file size: 2.5MB per image</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductImageUpload;