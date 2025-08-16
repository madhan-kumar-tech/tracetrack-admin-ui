import { Layout } from '../components/layouts/Layout';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { NewRequests } from '../components/dashboard/NewRequests';
import vehicleIcon from '../assets/vehicle_icon.svg';
import activeVehiclesIcon from '../assets/active_vehicles.svg';
import stocksIcon from '../assets/stocks_icon.svg';
import expiredVehiclesIcon from '../assets/expired_vehicles.svg';
import inactiveVehiclesIcon from '../assets/inactive_vehicles.svg';

const stats = [
  { icon: vehicleIcon, title: 'Total Vehicles', value: '1686' },
  { icon: activeVehiclesIcon, title: 'Active Vehicles', value: '989' },
  { icon: stocksIcon, title: 'Stock', value: '250' },
  { icon: expiredVehiclesIcon, title: 'Expired Vehicles', value: '579' },
  { icon: inactiveVehiclesIcon, title: 'Inactive Vehicles', value: '118' },
];

const newRequests = [
  {
    username: 'Vinith Kumar',
    email: 'vinithmatt1356@gmail.com',
    mobile: '9856231445',
    imei: '258963124578',
    vehicleNumber: 'TN40 AV 2638',
    action: 'Proceed',
  },
  {
    username: 'Vinith Kumar',
    email: 'vinithmatt1356@gmail.com',
    mobile: '9856231445',
    imei: '258963124578',
    vehicleNumber: 'TN40 AV 2638',
    action: 'Proceed',
  },
  {
    username: 'Vinith Kumar',
    email: 'vinithmatt1356@gmail.com',
    mobile: '9856231445',
    imei: '258963124578',
    vehicleNumber: 'TN40 AV 2638',
    action: 'Proceed',
  },
  {
    username: 'Vinith Kumar',
    email: 'vinithmatt1356@gmail.com',
    mobile: '9856231445',
    imei: '258963124578',
    vehicleNumber: 'TN40 AV 2638',
    action: 'Proceed',
  },
  {
    username: 'Vinith Kumar',
    email: 'vinithmatt1356@gmail.com',
    mobile: '9856231445',
    imei: '258963124578',
    vehicleNumber: 'TN40 AV 2638',
    action: 'Proceed',
  },
  {
    username: 'Vinith Kumar',
    email: 'vinithmatt1356@gmail.com',
    mobile: '9856231445',
    imei: '258963124578',
    vehicleNumber: 'TN40 AV 2638',
    action: 'Proceed',
  },
  {
    username: 'Vinith Kumar',
    email: 'vinithmatt1356@gmail.com',
    mobile: '9856231445',
    imei: '258963124578',
    vehicleNumber: 'TN40 AV 2638',
    action: 'Proceed',
  },
  // ...more rows
];

export default function Dashboard() {
  return (
    <Layout>
      <StatsGrid stats={stats} />
      <div className="mt-8">
        <NewRequests data={newRequests} />
      </div>
    </Layout>
  );
}
