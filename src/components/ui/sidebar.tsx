import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';
import { useSidebarStore } from '../../stores/sidebar';
import { MENU_ITEMS, ROUTES } from '../../constants';
import { useEffect } from 'react';

// SVG icon imports
import dashboardIcon from '../../assets/dashboard_icon.svg';
import requestsIcon from '../../assets/requests_icon.svg';
import clientsIcon from '../../assets/clients_icon.svg';
import logoutIcon from '../../assets/user_logout_icon.svg';
import logoIcon from '../../assets/logo_with_name.svg';

interface MenuItem {
  label: string;
  icon: string; // file path from import
  href?: string;
  action?: () => void;
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { isMobileOpen, closeMobile } = useSidebarStore();

  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (href: string) => {
    if (href === ROUTES.DASHBOARD) {
      return (
        location.pathname === ROUTES.DASHBOARD ||
        location.pathname.startsWith(ROUTES.DASHBOARD + '/')
      );
    }
    return location.pathname.startsWith(href);
  };

  const menuItems: MenuItem[] = [
    {
      label: MENU_ITEMS.DASHBOARD,
      icon: dashboardIcon,
      href: ROUTES.DASHBOARD,
    },
    {
      label: MENU_ITEMS.REQUESTS,
      icon: requestsIcon,
      href: ROUTES.REQUESTS,
    },
    {
      label: MENU_ITEMS.CLIENTS,
      icon: clientsIcon,
      href: ROUTES.CLIENTS,
    },
    {
      label: MENU_ITEMS.LOGOUT,
      icon: logoutIcon,
      action: handleLogout,
    },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-gray-600 lg:hidden"
          onClick={closeMobile}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 flex h-screen w-60 flex-col border-r border-gray-200 bg-white ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300`}
      >
        {/* Logo */}
        <div className="flex items-center border-b border-gray-100 px-6 py-5">
          <img src={logoIcon} alt="Logo" className="mr-3 h-14 w-48" />
          {/* <span className="text-lg font-extrabold text-[#231F20]">{APP_NAME}</span> */}
        </div>

        {/* Menu */}
        <nav className="mt-4 flex-1 px-3">
          <ul className="space-y-1">
            {menuItems.map(item => {
              const active = item.href ? isActive(item.href) : false;
              const textColor = active ? '#000424' : '#686973';

              return (
                <li key={item.label}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors`}
                      style={{
                        backgroundColor: active ? '#F1F1F1' : 'transparent',
                        color: textColor,
                      }}
                    >
                      <img
                        src={item.icon}
                        alt={`${item.label} icon`}
                        className="mr-3 h-5 w-5"
                      />
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={item.action}
                      className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: 'transparent',
                        color: textColor,
                      }}
                    >
                      <img
                        src={item.icon}
                        alt={`${item.label} icon`}
                        className="mr-3 h-5 w-5"
                      />
                      {item.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
