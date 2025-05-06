import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import StoreForm from '../../components/stores/StoreForm';
import { Store } from '../../types';

const StoresList = () => {
  const { stores, categories, loading, error } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Apply filters
  const filteredStores = stores.filter((store) => {
    const matchesCategory = categoryFilter ? store.categoryId === categoryFilter : true;
    const matchesStatus = statusFilter ? store.status === statusFilter : true;
    const matchesSearch = searchTerm
      ? store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Get category name
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  // Get category color
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.color : '#CBD5E1';
  };

  const handleAddStore = (newStore: Omit<Store, 'id'>) => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Stores</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Store
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search stores..."
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label htmlFor="category" className="sr-only">
                  Filter by Category
                </label>
                <select
                  id="category"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="status" className="sr-only">
                  Filter by Status
                </label>
                <select
                  id="status"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <button
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  setCategoryFilter('');
                  setStatusFilter('');
                  setSearchTerm('');
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <Link
                key={store.id}
                to={`/stores/${store.id}`}
                className="group bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${store.logo})` }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
                    <div>
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full text-white"
                        style={{ backgroundColor: getCategoryColor(store.categoryId) }}
                      >
                        {getCategoryName(store.categoryId)}
                      </span>
                      <span
                        className="ml-2 px-2 py-1 text-xs font-semibold rounded-full capitalize"
                        style={{
                          backgroundColor:
                            store.status === 'active'
                              ? 'rgba(16, 185, 129, 0.9)'
                              : store.status === 'inactive'
                              ? 'rgba(239, 68, 68, 0.9)'
                              : 'rgba(245, 158, 11, 0.9)',
                          color: 'white',
                        }}
                      >
                        {store.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {store.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{store.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{store.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No stores found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsAddModalOpen(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Add New Store</h3>
                <StoreForm onSubmit={handleAddStore} onCancel={() => setIsAddModalOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoresList;