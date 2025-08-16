import { CustomTable, type Column } from '../ui/customTable';
import GradientText from '../ui/gradientText';

interface Request {
  username: string;
  email: string;
  mobile: string;
  imei: string;
  vehicleNumber: string;
  action: string;
  [key: string]: unknown;
}

const columns: Column<Request>[] = [
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Reg Mail ID' },
  { key: 'mobile', label: 'Mobile No.' },
  { key: 'imei', label: 'IMEI' },
  { key: 'vehicleNumber', label: 'Vehicle Number' },
  {
    key: 'action',
    label: 'Action',
    render: () => (
      <GradientText
        className="font-regular text-base hover:underline"
        text="Proceed"
      />
    ),
  },
];

export function NewRequests({ data }: { data: Request[] }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-6 py-4">
        <h3 className="text-2xl font-semibold text-black">New Requests</h3>
      </div>
      <div className="mx-6 max-h-116 overflow-y-auto">
        <CustomTable<Request>
          columns={columns}
          data={data}
          pageSize={5}
          isLoading={false}
        />
      </div>
    </div>
  );
}
