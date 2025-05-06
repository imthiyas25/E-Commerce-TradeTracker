import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Product } from '../../types';
import toast from 'react-hot-toast';

interface ProductFormProps {
  initialData?: Product;
  storeId?: string;
  onSubmit: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

const ProductForm = ({ initialData, storeId, onSubmit, onCancel }: ProductFormProps) => {
  const { stores, addProduct, updateProduct } = useApp();
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    image: initialData?.image || '',
    storeId: initialData?.storeId || storeId || '',
    status: initialData?.status || 'in_stock',
    createdAt: initialData?.createdAt || new Date().toISOString(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
    }));

    // Clear error for the field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.storeId) newErrors.storeId = 'Store is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      if (initialData) {
        await updateProduct(initialData.id, formData);
        toast.success('Product updated successfully!');
      } else {
        await addProduct(formData);
        toast.success('Product created successfully!');
      }
      onSubmit(formData);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image URL *
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.image ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0.01"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className={`mt-1 block w-full border ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock *
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            min="0"
            step="1"
            value={formData.stock}
            onChange={handleChange}
            className={`mt-1 block w-full border ${
              errors.stock ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="storeId" className="block text-sm font-medium text-gray-700">
          Store *
        </label>
        <select
          id="storeId"
          name="storeId"
          value={formData.storeId}
          onChange={handleChange}
          disabled={!!storeId}
          className={`mt-1 block w-full border ${
            errors.storeId ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            storeId ? 'bg-gray-100' : ''
          }`}
        >
          <option value="">Select a store</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
        {errors.storeId && <p className="mt-1 text-sm text-red-600">{errors.storeId}</p>}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="in_stock">In Stock</option>
          <option value="out_of_stock">Out of Stock</option>
          <option value="low_stock">Low Stock</option>
          <option value="discontinued">Discontinued</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;