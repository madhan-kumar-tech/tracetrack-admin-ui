import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  id: string;
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: LucideIcon;
  color: string;
  route: string;
}

export function DashboardCard({ 
  title, 
  value, 
  change, 
  positive, 
  icon: Icon,
  color,
  route 
}: DashboardCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="text-2xl font-bold text-gray-900 mt-1">
              {value}
            </dd>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`text-sm font-medium ${
              positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {change}
            </div>
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
