import { Store, Category } from '../../types';

interface CategoryDistributionProps {
  stores: Store[];
  categories: Category[];
}

const CategoryDistribution = ({ stores, categories }: CategoryDistributionProps) => {
  // Count stores by category
  const categoryCounts = categories.map(category => {
    const count = stores.filter(store => store.categoryId === category.id).length;
    return { 
      ...category, 
      count,
      percentage: Math.round((count / stores.length) * 100)
    };
  });
  
  // Sort by count (descending)
  const sortedCategories = [...categoryCounts].sort((a, b) => b.count - a.count);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 grid grid-cols-2 gap-4">
        {sortedCategories.map((category) => (
          <div 
            key={category.id} 
            className="flex flex-col p-3 rounded-lg"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <div className="flex items-center justify-between">
              <span 
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: category.color }}
              ></span>
              <span className="text-sm font-medium flex-1">{category.name}</span>
              <span className="text-sm font-bold">{category.count}</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full" 
                style={{ 
                  width: `${category.percentage}%`,
                  backgroundColor: category.color
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 mt-1">{category.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDistribution;