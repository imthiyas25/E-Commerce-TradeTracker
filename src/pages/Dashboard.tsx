import { useApp } from '../contexts/AppContext';
import StatCard from '../components/dashboard/StatCard';
import StoresList from '../components/dashboard/StoresList';
import TopProducts from '../components/dashboard/TopProducts';
import StoreSummaryChart from '../components/dashboard/StoreSummaryChart';
import CategoryDistribution from '../components/dashboard/CategoryDistribution';
import { Package, ShoppingBag, DollarSign, Truck } from 'lucide-react';

const Dashboard = () => {
  const { stores, products, loading, error, getStoreStats, categories } = useApp();
  
  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const storeStats = getStoreStats();
  const totalProducts = products.length;
  const totalStores = stores.length;
  const activeStores = stores.filter(store => store.status === 'active').length;
  const totalInventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Stores"
          value={totalStores}
          change="+3"
          changeType="increase"
          icon={<ShoppingBag className="h-8 w-8 text-indigo-600" />}
        />
        <StatCard
          title="Active Stores"
          value={activeStores}
          change="+2"
          changeType="increase"
          icon={<Truck className="h-8 w-8 text-emerald-600" />}
        />
        <StatCard
          title="Total Products"
          value={totalProducts}
          change="+15"
          changeType="increase"
          icon={<Package className="h-8 w-8 text-amber-600" />}
        />
        <StatCard
          title="Inventory Value"
          value={`$${totalInventoryValue.toLocaleString()}`}
          change="+8.2%"
          changeType="increase"
          icon={<DollarSign className="h-8 w-8 text-indigo-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Store Performance</h2>
          <div className="h-64">
            <StoreSummaryChart storeStats={storeStats} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Category Distribution</h2>
          <div className="h-64">
            <CategoryDistribution stores={stores} categories={categories} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 pb-0">
            <h2 className="text-lg font-medium text-gray-900">Recent Stores</h2>
          </div>
          <StoresList stores={stores.slice(0, 5)} />
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 pb-0">
            <h2 className="text-lg font-medium text-gray-900">Top Products</h2>
          </div>
          <TopProducts products={products} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;