import { Link } from 'react-router-dom';
import { Store } from '../../types';
import { useApp } from '../../contexts/AppContext';

interface StoresListProps {
  stores: Store[];
}

const StoresList = ({ stores }: StoresListProps) => {
  const { categories } = useApp();

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : '#CBD5E1';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Store
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stores.map((store) => (
            <tr key={store.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={store.logo}
                      alt={store.name}
                    />
                  </div>
                  <div className="ml-4">
                    <Link
                      to={`/stores/${store.id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                    >
                      {store.name}
                    </Link>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  style={{ backgroundColor: `${getCategoryColor(store.categoryId)}20`, color: getCategoryColor(store.categoryId) }}
                >
                  {getCategoryName(store.categoryId)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {store.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    store.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : store.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoresList;