import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Store } from '../../types';
import toast from 'react-hot-toast';

interface StoreFormProps {
  initialData?: Store;
  onSubmit: (store: Omit<Store, 'id'>) => void;
  onCancel: () => void;
}

const StoreForm = ({ initialData, onSubmit, onCancel }: StoreFormProps) => {
  const { categories, addStore, updateStore } = useApp();
  const [formData, setFormData] = useState<Omit<Store, 'id'>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    logo: initialData?.logo || '',
    categoryId: initialData?.categoryId || '',
    location: initialData?.location || '',
    contactEmail: initialData?.contactEmail || '',
    contactPhone: initialData?.contactPhone || '',
    openingHours: initialData?.openingHours || '',
    status: initialData?.status || 'active',
    createdAt: initialData?.createdAt || new Date().toISOString(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
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
    if (!formData.logo.trim()) newErrors.logo = 'Logo URL is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Email is required';
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format';
    }
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Phone is required';
    if (!formData.openingHours.trim()) newErrors.openingHours = 'Opening hours are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      if (initialData) {
        await updateStore(initialData.id, formData);
        toast.success('Store updated successfully!');
      } else {
        await addStore(formData);
        toast.success('Store created successfully!');
      }
      onSubmit(formData);
    } catch (error) {
      console.error('Error saving store:', error);
      toast.error('Failed to save store');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Store Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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
          className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
          Logo URL *
        </label>
        <input
          type="text"
          id="logo"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          className={`mt-1 block w-full border ${errors.logo ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo}</p>}
      </div>

      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className={`mt-1 block w-full border ${errors.categoryId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location *
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`mt-1 block w-full border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>}
        </div>

        <div>
          <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
            Phone *
          </label>
          <input
            type="text"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.contactPhone && <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700">
          Opening Hours *
        </label>
        <input
          type="text"
          id="openingHours"
          name="openingHours"
          value={formData.openingHours}
          onChange={handleChange}
          placeholder="e.g. 10:00 AM - 9:00 PM"
          className={`mt-1 block w-full border ${errors.openingHours ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.openingHours && <p className="mt-1 text-sm text-red-600">{errors.openingHours}</p>}
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
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
          {initialData ? 'Update Store' : 'Create Store'}
        </button>
      </div>
    </form>
  );
};

export default StoreForm;