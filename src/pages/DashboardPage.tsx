import { Table, Button } from '../components/ui';
import vehicleIcon from '../assets/vehicle_icon.svg';
import activeVehiclesIcon from '../assets/active_vehicles.svg';
import stocksIcon from '../assets/stocks_icon.svg';
import expiredVehiclesIcon from '../assets/expired_vehicles.svg';
import inactiveVehiclesIcon from '../assets/inactive_vehicles.svg';
import addNewIcon from '../assets/add_new_icon.svg';

// Sample data for the New Requests table
const newRequests = [
  {
    username: 'Vinith Kumar',
    email: 'vinithmatt1356@gmail.com',
    mobile: '9856231445',
    imei: '258963124578',
    vehicleNumber: 'TN40 AV 2638',
    action: 'Proceed',
  },
  // ...more rows as needed
];

const columns = [
  { key: 'username' as const, label: 'Username' },
  { key: 'email' as const, label: 'Reg Mail ID' },
  { key: 'mobile' as const, label: 'Mobile No.' },
  { key: 'imei' as const, label: 'IMEI' },
  { key: 'vehicleNumber' as const, label: 'Vehicle Number' },
  {
    key: 'action' as const,
    label: 'Action',
    render: (value: string) => (
      <Button
        variant="ghost"
        className="text-primary-700 px-0 font-semibold hover:underline"
        onClick={() => {}}
      >
        {value}
      </Button>
    ),
  },
];

const dashboardCards = [
  {
    id: 'total-vehicles',
    title: 'Total Vehicles',
    value: '1686',
    icon: vehicleIcon,
    subtitle: '',
  },
  {
    id: 'active-vehicles',
    title: 'Active Vehicles',
    value: '989',
    icon: activeVehiclesIcon,
    subtitle: '',
  },
  {
    id: 'stocks',
    title: 'Stock',
    value: '250',
    icon: stocksIcon,
    subtitle: '',
  },
  {
    id: 'expired-vehicles',
    title: 'Expired Vehicles',
    value: '579',
    icon: expiredVehiclesIcon,
    subtitle: '',
  },
  {
    id: 'inactive-vehicles',
    title: 'Inactive Vehicles',
    value: '118',
    icon: inactiveVehiclesIcon,
    subtitle: '',
  },
];

export function DashboardPage() {
  return (
    <div data-testid="dashboard-page" className="space-y-8">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {dashboardCards.map(card => (
          <div
            key={card.id}
            className="flex min-h-[120px] flex-col items-start justify-between rounded-lg bg-white p-6 shadow"
          >
            <img src={card.icon} alt={card.title} className="mb-4 h-8 w-8" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{card.title}</div>
            </div>
          </div>
        ))}
        {/* Add New Device Card */}
        <div className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg bg-white shadow transition-shadow hover:shadow-md">
          <button className="flex h-full w-full flex-col items-center justify-center py-6">
            <img
              src={addNewIcon}
              alt="Add New Device"
              className="mb-2 h-8 w-8"
            />
            <span className="text-primary-700 text-lg font-semibold">
              Add New Device
            </span>
          </button>
        </div>
      </div>

      {/* New Requests Table Section */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-bold text-gray-900">New Requests</h3>
        </div>
        <Table data={newRequests} columns={columns} />
      </div>
    </div>
  );
}
