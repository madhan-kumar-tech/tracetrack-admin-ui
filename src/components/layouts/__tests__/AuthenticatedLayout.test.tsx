/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticatedLayout } from '../AuthenticatedLayout';
import { useAuthStore } from '../../../stores/auth';
import { useSidebarStore } from '../../../stores/sidebar';

// Mock the auth store
vi.mock('../../../stores/auth', () => ({
  useAuthStore: vi.fn(),
}));

// Mock the sidebar store
vi.mock('../../../stores/sidebar', () => ({
  useSidebarStore: vi.fn(),
}));

const mockUseAuthStore = vi.mocked(useAuthStore);
const mockUseSidebarStore = vi.mocked(useSidebarStore);

// Mock the Navigate component
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to, replace }: { to: string; replace?: boolean }) => {
      mockNavigate(to, replace);
      return <div data-testid="navigate">Navigate to {to}</div>;
    },
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AuthenticatedLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default sidebar store mock
    mockUseSidebarStore.mockReturnValue({
      isCollapsed: false,
      isMobileOpen: false,
      toggle: vi.fn(),
      collapse: vi.fn(),
      expand: vi.fn(),
      toggleCollapse: vi.fn(),
      closeMobile: vi.fn(),
    });
  });

  it('should redirect to home when user is not authenticated', () => {
    // Mock unauthenticated state
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      setLoading: vi.fn(),
    });

    renderWithRouter(<AuthenticatedLayout />);

    expect(screen.getByTestId('navigate')).toBeInTheDocument();
    expect(screen.getByText('Navigate to /')).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/', true);
  });

  it('should render layout when user is authenticated', () => {
    // Mock authenticated state
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', name: 'Admin User', email: 'admin@test.com' },
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      setLoading: vi.fn(),
    });

    renderWithRouter(<AuthenticatedLayout />);

    // Should not redirect
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();

    // Check if main content area is present
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should have proper layout structure when authenticated', () => {
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', name: 'Admin User', email: 'admin@test.com' },
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      setLoading: vi.fn(),
    });

    renderWithRouter(<AuthenticatedLayout />);

    // Should not redirect
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();

    // Check main content area is present
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
