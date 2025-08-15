import { DashboardCard, Table } from '../components/ui';
import { DASHBOARD_CARDS } from '../constants';

// Sample data for the table
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
];

const columns = [
  { key: 'id' as const, label: 'ID' },
  { key: 'name' as const, label: 'Name' },
  { key: 'email' as const, label: 'Email' },
  { key: 'role' as const, label: 'Role' },
  { 
    key: 'status' as const, 
    label: 'Status',
    render: (value: string | number) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'Active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {DASHBOARD_CARDS.map((card) => (
          <DashboardCard key={card.id} {...card} />
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
        </div>
        <Table data={sampleData} columns={columns} />
      </div>
    </div>
  );
}