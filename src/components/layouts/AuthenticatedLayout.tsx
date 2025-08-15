import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';
import { useSidebarStore } from '../../stores/sidebar';
import { Sidebar, Header, Breadcrumb } from '../ui';

export function AuthenticatedLayout() {
  const { isAuthenticated } = useAuthStore();
  const { isCollapsed } = useSidebarStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div data-testid="authenticated-layout" className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'} ml-0`}
      >
        <div className="p-4 lg:p-6">
          <Breadcrumb />
          <Outlet />
        </div>
      </main>
    </div>
  );
}
