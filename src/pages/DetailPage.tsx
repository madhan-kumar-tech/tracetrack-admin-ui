import { useParams } from 'react-router-dom';
import { Table } from '../components/ui';
import { DASHBOARD_CARDS } from '../constants';

// Sample data for different detail pages
const getDetailData = (type: string) => {
  const baseData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', date: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', date: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Completed', date: '2024-01-13' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', date: '2024-01-12' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Inactive', date: '2024-01-11' },
  ];

  switch (type) {
    case 'users':
      return baseData.map(item => ({ ...item, role: 'User' }));
    case 'sessions':
      return baseData.map(item => ({ ...item, duration: '2h 45m' }));
    case 'revenue':
      return baseData.map(item => ({ ...item, amount: '$1,234' }));
    case 'tickets':
      return baseData.map(item => ({ ...item, priority: 'High' }));
    default:
      return baseData;
  }
};

const getColumns = (type: string) => {
  const baseColumns = [
    { key: 'id' as const, label: 'ID' },
    { key: 'name' as const, label: 'Name' },
    { key: 'email' as const, label: 'Email' },
    { 
      key: 'status' as const, 
      label: 'Status',
      render: (value: string | number) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'Active' || value === 'Completed'
            ? 'bg-green-100 text-green-800' 
            : value === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'date' as const, label: 'Date' },
  ];

  switch (type) {
    case 'users':
      return [...baseColumns, { key: 'role' as const, label: 'Role' }];
    case 'sessions':
      return [...baseColumns, { key: 'duration' as const, label: 'Duration' }];
    case 'revenue':
      return [...baseColumns, { key: 'amount' as const, label: 'Amount' }];
    case 'tickets':
      return [...baseColumns, { key: 'priority' as const, label: 'Priority' }];
    default:
      return baseColumns;
  }
};

export function DetailPage() {
  const { type } = useParams<{ type: string }>();
  
  if (!type) {
    return <div>Invalid page</div>;
  }

  const card = DASHBOARD_CARDS.find(card => card.route === `/admin/dashboard/${type}`);
  const data = getDetailData(type);
  const columns = getColumns(type);

  if (!card) {
    return <div>Page not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${card.color}`}>
            <card.icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{card.title}</h1>
            <p className="text-gray-600">Detailed view of {card.title.toLowerCase()}</p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total {card.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Growth</h3>
            <p className="text-2xl font-bold text-green-600">{card.change}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">This Month</h3>
            <p className="text-2xl font-bold text-gray-900">+15%</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">{card.title} List</h2>
        </div>
        <div className="p-6">
          <Table data={data as any} columns={columns as any} />
        </div>
      </div>
    </div>
  );
}
