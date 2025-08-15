import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Users, 
  LogOut,
  Building2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuthStore } from '../../stores/auth';
import { useSidebarStore } from '../../stores/sidebar';
import { MENU_ITEMS, ROUTES, APP_NAME } from '../../constants';
import { Button } from './button';
import { useEffect } from 'react';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  action?: () => void;
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebarStore();

  // Close mobile sidebar when route changes
  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  // Handle window resize to reset collapsed state on mobile
  useEffect(() => {
    const handleResize = () => {
      // On mobile screens, always ensure sidebar is not collapsed when opened
      if (window.innerWidth < 1024) {
        // Don't auto-expand, but the mobile view will ignore collapsed state
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems: MenuItem[] = [
    {
      label: MENU_ITEMS.DASHBOARD,
      icon: <Home className="h-5 w-5" />,
      href: ROUTES.DASHBOARD
    },
    {
      label: MENU_ITEMS.REQUESTS,
      icon: <FileText className="h-5 w-5" />,
      href: ROUTES.REQUESTS
    },
    {
      label: MENU_ITEMS.CLIENTS,
      icon: <Users className="h-5 w-5" />,
      href: ROUTES.CLIENTS
    }
  ];

  const isActive = (href: string) => {
    if (href === ROUTES.DASHBOARD) {
      return location.pathname === ROUTES.DASHBOARD || location.pathname.startsWith(ROUTES.DASHBOARD + '/');
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden" 
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-300
        ${isCollapsed ? 'lg:w-16' : 'lg:w-64'} w-64
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <h1 className={`text-xl font-bold text-gray-900 truncate transition-opacity duration-300 ${
              isCollapsed ? 'lg:hidden' : 'block'
            }`}>
              {APP_NAME}
            </h1>
          </div>
          
          {/* Mobile Close Button */}
          <button
            onClick={closeMobile}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Desktop Collapse Button */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors items-center justify-center"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href!}
                  className={`
                    group flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors relative
                    ${isActive(item.href!) 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${isCollapsed ? 'lg:justify-center' : 'space-x-3'}
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  {item.icon}
                  <span className={`transition-opacity duration-300 ${
                    isCollapsed ? 'lg:hidden' : 'block'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Tooltip for collapsed state - only on desktop */}
                  {isCollapsed && (
                    <span className="hidden lg:block absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="p-2 border-t border-gray-200">
          <Button
            variant="ghost"
            className={`
              group w-full text-red-600 hover:text-red-700 hover:bg-red-50 relative transition-colors
              ${isCollapsed ? 'lg:justify-center lg:px-3' : 'justify-start'}
            `}
            onClick={handleLogout}
            title={isCollapsed ? MENU_ITEMS.LOGOUT : undefined}
          >
            <LogOut className="h-5 w-5" />
            <span className={`transition-opacity duration-300 ${
              isCollapsed ? 'lg:hidden ml-3' : 'ml-3'
            }`}>
              {MENU_ITEMS.LOGOUT}
            </span>
            
            {/* Tooltip for collapsed state - only on desktop */}
            {isCollapsed && (
              <span className="hidden lg:block absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                {MENU_ITEMS.LOGOUT}
              </span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
