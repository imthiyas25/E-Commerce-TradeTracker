import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useApp } from '../../contexts/AppContext';

interface TopProductsProps {
  products: Product[];
}

const TopProducts = ({ products }: TopProductsProps) => {
  const { getStore } = useApp();
  
  // Sort products by stock value (price * stock)
  const sortedProducts = [...products]
    .sort((a, b) => b.price * b.stock - a.price * a.stock)
    .slice(0, 5);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Store
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedProducts.map((product) => {
            const store = getStore(product.storeId);
            return (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                      >
                        {product.name}
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {store ? (
                    <Link
                      to={`/stores/${store.id}`}
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      {store.name}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-500">Unknown Store</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock > 50
                        ? 'bg-green-100 text-green-800'
                        : product.stock > 10
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TopProducts;