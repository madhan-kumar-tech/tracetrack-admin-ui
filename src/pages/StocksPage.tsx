import { useState } from 'react';
import { CustomTable } from '../components/ui/customTable';
import CaretRight from '../assets/caret-right.svg';
import EyeIcon from '../assets/eye_icon.svg';
import {
  TotalVehicle,
  ActiveVehicle,
  ExpiredVehicle,
  InactiveVehicle,
} from '../utils/mockData';

// Types for each vehicle data
export type TotalVehicleType = (typeof TotalVehicle)[number];
export type ActiveVehicleType = (typeof ActiveVehicle)[number];
export type ExpiredVehicleType = (typeof ExpiredVehicle)[number];
export type InactiveVehicleType = (typeof InactiveVehicle)[number];

// Table columns for each tab
const columnsMap = {
  total: [
    { key: 'vehicleRegNo', label: 'Vehicle Reg No' },
    { key: 'deviceImei', label: 'Device IMEI' },
    { key: 'clientName', label: 'Client Name' },
    { key: 'clientMobile', label: 'Client Mobile No' },
    {
      key: 'vehicleStatus',
      label: 'Vehicle Status',
      render: (value: string) => (
        <span
          className={
            value === 'Moving'
              ? 'font-light text-green-500'
              : value === 'Idle'
                ? 'font-light text-orange-500'
                : 'font-light text-gray-500'
          }
        >
          {value}
        </span>
      ),
    },
    {
      key: 'planStatus',
      label: 'Plan Status',
      render: (value: string) => (
        <span
          className={
            value === 'Active'
              ? 'font-light text-green-500'
              : 'font-light text-red-500'
          }
        >
          {value}
        </span>
      ),
    },
    {
      key: 'details',
      label: 'Details',
      render: () => (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-t from-[#660033] to-[#A60D4F] p-0 hover:from-[#8a0b41] hover:to-[#4d0026]"
          type="button"
        >
          <img src={EyeIcon} alt="View" className="h-4 w-4" />
        </button>
      ),
    },
  ],
  active: [
    { key: 'vehicleRegNo', label: 'Vehicle Reg No' },
    { key: 'deviceImei', label: 'Device IMEI' },
    { key: 'clientName', label: 'Client Name' },
    { key: 'clientMobile', label: 'Client Mobile No' },
    { key: 'vehicleStatus', label: 'Vehicle Status' },
    {
      key: 'CurrentStatus',
      label: 'Current Status',
      render: (value: string) => (
        <span style={{ color: '#660033' }}>{value}</span>
      ),
    },
    {
      key: 'details',
      label: 'Details',
      render: () => (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-t from-[#660033] to-[#A60D4F] p-0 hover:from-[#8a0b41] hover:to-[#4d0026]"
          type="button"
        >
          <img src={EyeIcon} alt="View" className="h-4 w-4" />
        </button>
      ),
    },
  ],
  expired: [
    { key: 'vehicleRegNo', label: 'Vehicle Reg No' },
    { key: 'deviceImei', label: 'Device IMEI' },
    { key: 'clientName', label: 'Client Name' },
    { key: 'clientMobile', label: 'Client Mobile No' },
    { key: 'clientMailId', label: 'Client Mail ID' },
    {
      key: 'details',
      label: 'Details',
      render: () => (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-t from-[#660033] to-[#A60D4F] p-0 hover:from-[#8a0b41] hover:to-[#4d0026]"
          type="button"
        >
          <img src={EyeIcon} alt="View" className="h-4 w-4" />
        </button>
      ),
    },
  ],
  inactive: [
    { key: 'vehicleRegNo', label: 'Vehicle Reg No' },
    { key: 'deviceImei', label: 'Device IMEI' },
    { key: 'clientName', label: 'Client Name' },
    { key: 'clientMobile', label: 'Client Mobile No' },
    { key: 'clientMailId', label: 'Client Mail ID' },
    {
      key: 'details',
      label: 'Details',
      render: () => (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-t from-[#660033] to-[#A60D4F] p-0 hover:from-[#8a0b41] hover:to-[#4d0026]"
          type="button"
        >
          <img src={EyeIcon} alt="View" className="h-4 w-4" />
        </button>
      ),
    },
  ],
};

export default function StocksPage() {
  const [activeTab, setActiveTab] = useState('inactive');

  const tabs = [
    { id: 'total', label: 'Total Vehicles' },
    { id: 'active', label: 'Active Vehicles' },
    { id: 'expired', label: 'Expired Vehicles' },
    { id: 'inactive', label: 'Inactive Vehicles' },
  ];

  // Tab data mapping
  const tabDataMap = {
    total: TotalVehicle,
    active: ActiveVehicle,
    expired: ExpiredVehicle,
    inactive: InactiveVehicle,
  } as const;
  type TabKey = keyof typeof tabDataMap;
  const safeActiveTab = (tabs.find(tab => tab.id === activeTab)?.id ||
    'total') as TabKey;

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Stocks</h2>
      <div className="mb-6 flex items-center space-x-2">
        <span className="text-sm text-[#660033]">Dashboard</span>
        <img src={CaretRight} alt="CaretRight" draggable={false} />
        <span className="text-sm text-gray-700">
          {tabs.find(tab => tab.id === activeTab)?.label}
        </span>
      </div>
      <div className="inline-flex h-10 items-center rounded-lg border border-[#E0E2E7] bg-white p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`h-8 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-[#EDE8F5] text-[#660033]' // active state
                : 'text-[#667085] hover:text-gray-900' // inactive state
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-7 rounded-xl bg-white px-6 py-3 shadow">
        {/* eslint-disable-next-line */}
        <CustomTable
          columns={columnsMap[safeActiveTab] as any}
          data={tabDataMap[safeActiveTab] as any}
          pageSize={10}
        />
      </div>
    </div>
  );
}
