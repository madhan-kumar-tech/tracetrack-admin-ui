export * from './api';

export interface Stat {
  icon: string;
  title: string;
  value: string;
}

export interface RequestRow {
  username: string;
  email: string;
  mobile: string;
  imei: string;
  vehicleNumber: string;
  action: string;
}
