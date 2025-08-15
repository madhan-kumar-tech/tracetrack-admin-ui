import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MENU_ITEMS, ROUTES } from '../../constants';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb() {
  const location = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;
    
    // Base breadcrumb
    const breadcrumbs: BreadcrumbItem[] = [
      { label: MENU_ITEMS.DASHBOARD, href: ROUTES.DASHBOARD }
    ];
    
    // Dynamic breadcrumbs based on path
    if (path.includes('/total-users')) {
      breadcrumbs.push({ label: 'Total Users' });
    } else if (path.includes('/active-sessions')) {
      breadcrumbs.push({ label: 'Active Sessions' });
    } else if (path.includes('/revenue')) {
      breadcrumbs.push({ label: 'Revenue' });
    } else if (path.includes('/support-tickets')) {
      breadcrumbs.push({ label: 'Support Tickets' });
    } else if (path.includes('/requests')) {
      breadcrumbs[0] = { label: MENU_ITEMS.REQUESTS, href: ROUTES.REQUESTS };
    } else if (path.includes('/clients')) {
      breadcrumbs[0] = { label: MENU_ITEMS.CLIENTS, href: ROUTES.CLIENTS };
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-6">
      <Home className="h-4 w-4" />
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          {item.href && index < breadcrumbs.length - 1 ? (
            <Link 
              to={item.href} 
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
