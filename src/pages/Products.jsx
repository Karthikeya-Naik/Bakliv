import React, { useState } from 'react';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: 'Premium Baklava Selection',
      category: 'baklava',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
      description: 'Traditional handcrafted baklava with pistachios, walnuts, and honey',
      featured: true,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Turkish Delight Assortment',
      category: 'sweets',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      description: 'Authentic Turkish lokum in various flavors including rose and lemon',
      featured: false,
      rating: 4.7
    },
    {
      id: 3,
      name: 'Kunafa Rolls',
      category: 'desserts',
      price: 22.99,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
      description: 'Crispy kunafa rolls filled with sweet cheese and pistachios',
      featured: true,
      rating: 4.8
    },
    {
      id: 4,
      name: 'Premium Mixed Nuts',
      category: 'nuts',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop',
      description: 'Roasted almonds, pistachios, and hazelnuts from the finest sources',
      featured: false,
      rating: 4.6
    },
    {
      id: 5,
      name: 'Honey Drizzled Baklava',
      category: 'baklava',
      price: 26.99,
      image: 'https://images.unsplash.com/photo-1571877227653-e35fcbd1bb4d?w=400&h=300&fit=crop',
      description: 'Extra honey-soaked baklava with layers of phyllo and nuts',
      featured: false,
      rating: 4.9
    },
    {
      id: 6,
      name: 'Date Filled Cookies',
      category: 'cookies',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop',
      description: 'Soft cookies filled with premium Medjool dates and warm spices',
      featured: false,
      rating: 4.5
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'baklava', name: 'Baklava' },
    { id: 'sweets', name: 'Sweets' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'nuts', name: 'Nuts' },
    { id: 'cookies', name: 'Cookies' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Hero Section */}
      <section className="bg-[#181d54] text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-light mb-4 tracking-wide">Our Products</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Authentic Middle Eastern delicacies crafted with traditional recipes and premium ingredients
          </p>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-light text-[#181d54] text-center mb-12">Featured Selection</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {featuredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-12">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-[#181d54] mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-light text-[#181d54]">${product.price}</span>
                      <button className="bg-[#181d54] text-white px-6 py-2 text-sm font-medium hover:bg-[#202566] transition-colors duration-200">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Products Section */}
      <section className="py-16">
        <div className="container-custom">
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            {/* Search */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md mx-auto block px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#181d54] focus:ring-1 focus:ring-[#181d54] text-sm"
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-6 py-2 text-sm font-medium border transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-[#181d54] text-white border-[#181d54]'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#181d54]'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="max-w-6xl mx-auto">
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                    <div className="aspect-w-16 aspect-h-12">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:opacity-95 transition-opacity duration-200"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-[#181d54] mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-3 text-sm leading-relaxed">{product.description}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-500 text-sm mr-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-500 text-sm">({product.rating})</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-light text-[#181d54]">${product.price}</span>
                        <button className="bg-[#181d54] text-white px-4 py-2 text-sm font-medium hover:bg-[#202566] transition-colors duration-200">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-light text-[#181d54] mb-4">Need Something Special?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact us for custom orders or if you have any questions about our products
          </p>
          <button className="bg-[#181d54] text-white px-8 py-3 font-medium hover:bg-[#202566] transition-colors duration-200">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default Products;