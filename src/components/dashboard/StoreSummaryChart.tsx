import { StoreStats } from '../../types';
import { useApp } from '../../contexts/AppContext';

interface StoreSummaryChartProps {
  storeStats: StoreStats[];
}

const StoreSummaryChart = ({ storeStats }: StoreSummaryChartProps) => {
  const { categories } = useApp();
  
  // Sort stores by total value
  const sortedStats = [...storeStats].sort((a, b) => b.totalValue - a.totalValue);
  
  // Get top 5 stores
  const topStores = sortedStats.slice(0, 5);
  
  // Calculate the maximum value for scaling
  const maxValue = Math.max(...topStores.map(store => store.totalValue));
  
  // Get category color
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : '#CBD5E1';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">Store</p>
        <p className="text-sm text-gray-500">Inventory Value</p>
      </div>
      
      <div className="flex-1 space-y-4">
        {topStores.map((store) => (
          <div key={store.id} className="relative">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-gray-700 truncate" title={store.name}>
                {store.name}
              </p>
              <p className="text-sm font-medium text-gray-900">
                ${store.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${(store.totalValue / maxValue) * 100}%`,
                  backgroundColor: getCategoryColor(store.categoryId),
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{store.totalProducts} products</span>
              <span>{store.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreSummaryChart;