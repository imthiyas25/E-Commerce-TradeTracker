import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Loading product {id}...</p>
      </div>
    </div>
  );
}

export default ProductDetails;