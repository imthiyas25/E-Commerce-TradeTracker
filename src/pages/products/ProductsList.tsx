import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

function ProductsList() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Package size={20} />
          <span>Add Product</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-500">No products found. Add your first product to get started.</p>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;