import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, MessageSquare, Plus, TrendingUp } from 'lucide-react';
import { productService } from '../../services/productService';
import { contactService } from '../../services/contactService';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalContacts: 0,
    recentProducts: [],
    recentContacts: [],
  });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, contactsRes] = await Promise.all([
        productService.adminGetAll({ limit: 5 }),
        contactService.adminGetAll({ limit: 5 }),
      ]);

      setStats({
        totalProducts: productsRes.data.pagination.total,
        totalContacts: contactsRes.data.pagination.total,
        recentProducts: productsRes.data.products,
        recentContacts: contactsRes.data.contacts,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, link }) => (
    <Link
      to={link}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#181d54]"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="bg-blue-500"
          link="/admin/products"
        />
        <StatCard
          title="Contact Messages"
          value={stats.totalContacts}
          icon={MessageSquare}
          color="bg-green-500"
          link="/admin/contacts"
        />
        <StatCard
          title="Growth"
          value="+12%"
          icon={TrendingUp}
          color="bg-purple-500"
          link="/admin"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/products/create"
            className="bg-[#181d54] text-white rounded-lg p-6 hover:bg-[#202566] transition-colors flex items-center space-x-4"
          >
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <Plus size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Add New Product</h3>
              <p className="text-white/70 text-sm">Create a new product listing</p>
            </div>
          </Link>

          <Link
            to="/admin/products"
            className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#181d54] transition-colors flex items-center space-x-4"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Package size={24} className="text-[#181d54]" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Manage Products</h3>
              <p className="text-gray-600 text-sm">View and edit existing products</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Products</h2>
            <Link to="/admin/products" className="text-sm text-[#181d54] hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentProducts.length > 0 ? (
              stats.recentProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  {product.images.image1 && (
                    <img
                      src={product.images.image1}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-600">₹{product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No products yet</p>
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Messages</h2>
            <Link to="/admin/contacts" className="text-sm text-[#181d54] hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentContacts.length > 0 ? (
              stats.recentContacts.map((contact) => (
                <div key={contact.id} className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-600 truncate">{contact.email}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{contact.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No messages yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;