import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: ReactNode;
}

const StatCard = ({ title, value, change, changeType, icon }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-2 bg-indigo-50 rounded-full">{icon}</div>
      </div>
      
      <div className="mt-4">
        <span
          className={`inline-flex items-center text-sm font-medium ${
            changeType === 'increase'
              ? 'text-green-600'
              : changeType === 'decrease'
              ? 'text-red-600'
              : 'text-gray-600'
          }`}
        >
          {changeType === 'increase' ? (
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : changeType === 'decrease' ? (
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : null}
          {change} from last month
        </span>
      </div>
    </div>
  );
};

export default StatCard;