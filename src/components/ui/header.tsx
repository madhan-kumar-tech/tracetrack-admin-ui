import { Search, Menu } from 'lucide-react';
import { useAuthStore } from '../../stores/auth';
import { useSidebarStore } from '../../stores/sidebar';
import { SEARCH_PLACEHOLDER, USER_ROLES } from '../../constants';
import GradientText from './gradientText';

export function Header() {
  const { user } = useAuthStore();
  const { isCollapsed, toggleMobile } = useSidebarStore();

  return (
    <header
      className={`fixed top-0 right-0 z-40 h-16 border-b border-gray-200 bg-white transition-all duration-300 ${isCollapsed ? 'lg:left-16' : 'lg:left-64'} left-0`}
    >
      <div className="flex h-full w-full items-center justify-between px-4 lg:px-6">
        {/* Left side: Mobile Menu Button */}
        <div className="flex items-center">
          <button
            onClick={toggleMobile}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Right side: Search + User */}
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative w-134">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-[#000424]" />
            <input
              type="text"
              placeholder={SEARCH_PLACEHOLDER}
              className="w-full rounded-full bg-[#F8F9FC] py-2 pr-4 pl-10 text-sm text-[#000424] placeholder-[#686973] focus:ring-0 focus:outline-none"
            />
          </div>

          {/* User Profile */}
          <div className="flex cursor-pointer items-center space-x-3 rounded-lg px-3 py-2 hover:bg-gray-50">
            {/* User Avatar */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium text-gray-600">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              )}
            </div>

            {/* User Info */}
            <div className="text-right">
              <p className="text-xl font-medium">{user?.name}</p>
              <GradientText
                className="text-sm font-extrabold"
                text={`${USER_ROLES.ADMIN}`}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
