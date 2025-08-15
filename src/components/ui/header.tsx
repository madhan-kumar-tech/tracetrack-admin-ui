import { Search, ChevronDown, Menu } from 'lucide-react';
import { useAuthStore } from '../../stores/auth';
import { useSidebarStore } from '../../stores/sidebar';
import { SEARCH_PLACEHOLDER, USER_ROLES } from '../../constants';

export function Header() {
  const { user } = useAuthStore();
  const { isCollapsed, toggleMobile } = useSidebarStore();

  return (
    <header className={`
      fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-40 transition-all duration-300
      ${isCollapsed ? 'lg:left-16' : 'lg:left-64'}
      left-0
    `}>
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Mobile Menu Button & Search */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobile}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={SEARCH_PLACEHOLDER}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            {/* User Avatar */}
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium text-gray-600">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              )}
            </div>
            
            {/* User Info */}
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{USER_ROLES.ADMIN}</p>
            </div>
            
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
