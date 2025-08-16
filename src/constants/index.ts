import { Users, Activity, DollarSign, AlertCircle } from 'lucide-react';

// App Constants
export const APP_NAME = 'TraceTrack Admin';

// Menu Items
export const MENU_ITEMS = {
  DASHBOARD: 'Dashboard',
  REQUESTS: 'Requests',
  CLIENTS: 'Clients',
  LOGOUT: 'Logout',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/admin/dashboard',
  REQUESTS: '/admin/requests',
  CLIENTS: '/admin/clients',
  TOTAL_USERS: '/admin/dashboard/total-users',
  ACTIVE_SESSIONS: '/admin/dashboard/active-sessions',
  REVENUE: '/admin/dashboard/revenue',
  SUPPORT_TICKETS: '/admin/dashboard/support-tickets',
} as const;

// Dashboard Cards
export const DASHBOARD_CARDS = [
  {
    id: 'total-users',
    title: 'Total Users',
    value: '2,651',
    change: '+12%',
    positive: true,
    icon: Users,
    color: 'bg-blue-500',
    route: '/admin/dashboard/users',
  },
  {
    id: 'active-sessions',
    title: 'Active Sessions',
    value: '1,423',
    change: '+5%',
    positive: true,
    icon: Activity,
    color: 'bg-green-500',
    route: '/admin/dashboard/sessions',
  },
  {
    id: 'revenue',
    title: 'Revenue',
    value: '$45,231',
    change: '+23%',
    positive: true,
    icon: DollarSign,
    color: 'bg-yellow-500',
    route: '/admin/dashboard/revenue',
  },
  {
    id: 'support-tickets',
    title: 'Support Tickets',
    value: '12',
    change: '-8%',
    positive: false,
    icon: AlertCircle,
    color: 'bg-red-500',
    route: '/admin/dashboard/tickets',
  },
] as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  USER: 'User',
} as const;

// Table Pagination
export const TABLE_PAGE_SIZES = [10, 20, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 10;

// Search
export const SEARCH_PLACEHOLDER = 'Search here...';
