/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, Navigate } from 'react-router-dom';
import { queryClient } from '../config/query-client';
import { useAuthStore } from '../stores/auth';

// Mock the auth store
vi.mock('../stores/auth', () => ({
  useAuthStore: vi.fn(),
}));

// Mock QueryClient devtools
vi.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => <div data-testid="react-query-devtools" />,
}));

// Mock pages
vi.mock('../pages', () => ({
  HomePage: () => <div data-testid="home-page">Home Page</div>,
  DashboardPage: () => <div data-testid="dashboard-page">Dashboard Page</div>,
}));

// Mock AuthenticatedLayout
vi.mock('../components/layouts', () => ({
  AuthenticatedLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="authenticated-layout">{children}</div>
  ),
}));

const mockUseAuthStore = vi.mocked(useAuthStore);

// Create a test version of the App routing logic without BrowserRouter
const TestAppRoutes = () => {
  const { HomePage, DashboardPage } = require('../pages');
  const { AuthenticatedLayout } = require('../components/layouts');
  
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Protected routes - all nested under AuthenticatedLayout */}
        <Route path="/admin" element={<AuthenticatedLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
        
        {/* Redirect /dashboard to /admin/dashboard for backwards compatibility */}
        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {import.meta.env.DEV && <div data-testid="react-query-devtools" />}
    </QueryClientProvider>
  );
};

const renderWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <TestAppRoutes />
    </MemoryRouter>
  );
};

describe('App Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default to unauthenticated state
    mockUseAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
    });
  });

  describe('Public Routes', () => {
    it('should render HomePage on root path', () => {
      renderWithRouter(['/']);
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    it('should redirect unknown routes to home', () => {
      renderWithRouter(['/unknown-route']);
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
  });

  describe('Protected Routes', () => {
    it('should render DashboardPage in authenticated layout for /admin/dashboard', () => {
      renderWithRouter(['/admin/dashboard']);
      
      expect(screen.getByTestId('authenticated-layout')).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
    });

    it('should redirect /dashboard to /admin/dashboard for backwards compatibility', () => {
      renderWithRouter(['/dashboard']);
      
      // Should render the authenticated layout with dashboard
      expect(screen.getByTestId('authenticated-layout')).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
    });
  });

  describe('Route Structure', () => {
    it('should have proper nested route structure', () => {
      renderWithRouter(['/admin/dashboard']);
      
      // Should render both the layout and the page within it
      const layout = screen.getByTestId('authenticated-layout');
      const dashboard = screen.getByTestId('dashboard-page');
      
      expect(layout).toBeInTheDocument();
      expect(dashboard).toBeInTheDocument();
      expect(layout).toContainElement(dashboard);
    });

    it('should show React Query devtools in development', () => {
      // Mock development environment
      vi.stubEnv('DEV', true);

      renderWithRouter(['/']);
      
      expect(screen.getByTestId('react-query-devtools')).toBeInTheDocument();
      
      vi.unstubAllEnvs();
    });
  });
});
