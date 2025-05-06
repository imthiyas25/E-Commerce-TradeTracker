import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Store, Product } from '../../types';
import { Edit, Trash2, ArrowLeft, Package, Mail, Phone, Clock } from 'lucide-react';
import StoreForm from '../../components/stores/StoreForm';
import ProductForm from '../../components/products/ProductForm';
import toast from 'react-hot-toast';

const StoreDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getStore,
    getStoreProducts,
    updateStore,
    deleteStore,
    categories,
    loading,
    error,
  } = useApp();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const storeData = getStore(id);
      if (storeData) {
        setStore(storeData);
        setProducts(getStoreProducts(id));
      }
    }
  }, [id, getStore, getStoreProducts]);

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!store) return <div className="text-red-500">Store not found</div>;

  const handleUpdateStore = async (updatedStoreData: Partial<Store>) => {
    try {
      const updatedStore = await updateStore(store.id, updatedStoreData);
      setStore(updatedStore);
      setIsEditModalOpen(false);
      toast.success('Store updated successfully!');
    } catch (error) {
      console.error('Error updating store:', error);
      toast.error('Failed to update store');
    }
  };

  const handleDeleteStore = async () => {
    try {
      await deleteStore(store.id);
      toast.success('Store deleted successfully!');
      navigate('/stores');
    } catch (error) {
      console.error('Error deleting store:', error);
      toast.error('Failed to delete store');
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.color : '#CBD5E1';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/stores"
            className="mr-4 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{store.name}</h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => setIsDeleteConfirmOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="relative h-64 bg-cover bg-center sm:h-80" style={{ backgroundImage: `url(${store.logo})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <span
              className="inline-block px-2 py-1 text-xs font-semibold rounded-full"
              style={{ backgroundColor: getCategoryColor(store.categoryId) }}
            >
              {getCategoryName(store.categoryId)}
            </span>
            <span
              className="ml-2 inline-block px-2 py-1 text-xs font-semibold rounded-full capitalize"
              style={{
                backgroundColor:
                  store.status === 'active'
                    ? 'rgba(16, 185, 129, 0.9)'
                    : store.status === 'inactive'
                    ? 'rgba(239, 68, 68, 0.9)'
                    : 'rgba(245, 158, 11, 0.9)',
              }}
            >
              {store.status}
            </span>
          </div>
        </div>

        <div className="px-4 py-5 sm:px-6">
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{store.description}</p>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 flex items-start">
              <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-lg">
                <Mail className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-sm text-gray-900">{store.contactEmail}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 flex items-start">
              <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-lg">
                <Phone className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-sm text-gray-900">{store.contactPhone}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 flex items-start">
              <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-lg">
                <Clock className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Opening Hours</h3>
                <p className="mt-1 text-sm text-gray-900">{store.openingHours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Products</h2>
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Package className="h-4 w-4 mr-2" />
              Add Product
            </button>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div
                    className="h-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
                      <div>
                        <span
                          className="px-2 py-1 text-xs font-semibold rounded-full text-white capitalize"
                          style={{
                            backgroundColor:
                              product.status === 'in_stock'
                                ? 'rgba(16, 185, 129, 0.9)'
                                : product.status === 'out_of_stock'
                                ? 'rgba(239, 68, 68, 0.9)'
                                : product.status === 'low_stock'
                                ? 'rgba(245, 158, 11, 0.9)'
                                : 'rgba(107, 114, 128, 0.9)',
                          }}
                        >
                          {product.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-indigo-600 font-semibold">${product.price.toFixed(2)}</span>
                      <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a product to this store.</p>
              <div className="mt-6">
                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Package className="h-5 w-5 mr-2" />
                  Add Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsEditModalOpen(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Store</h3>
                <StoreForm
                  initialData={store}
                  onSubmit={handleUpdateStore}
                  onCancel={() => setIsEditModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsAddProductModalOpen(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Add New Product</h3>
                <ProductForm
                  storeId={store.id}
                  onSubmit={() => setIsAddProductModalOpen(false)}
                  onCancel={() => setIsAddProductModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsDeleteConfirmOpen(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Store</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this store? All of its products will also be
                        deleted. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteStore}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsDeleteConfirmOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDetails;