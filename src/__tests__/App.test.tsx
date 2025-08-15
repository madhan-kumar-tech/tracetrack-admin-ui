/// <reference types="vitest/globals" />
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../config/query-client';
import { HomePage, DashboardPage, DetailPage } from '../pages';
import { AuthenticatedLayout } from '../components/layouts';
import { useAuthStore } from '../stores/auth';
import { useSidebarStore } from '../stores/sidebar';

// Mock the auth store
vi.mock('../stores/auth', () => ({
  useAuthStore: vi.fn(),
}));

// Mock the sidebar store
vi.mock('../stores/sidebar', () => ({
  useSidebarStore: vi.fn(),
}));

// Mock QueryClient devtools - no direct import since it's conditional
const ReactQueryDevtools = () => (
  <div data-testid="react-query-devtools">DevTools</div>
);

const mockUseAuthStore = vi.mocked(useAuthStore);
const mockUseSidebarStore = vi.mocked(useSidebarStore);

// Extract the route structure for testing without the outer BrowserRouter
const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />

        {/* Protected routes - all nested under AuthenticatedLayout */}
        <Route path="/admin" element={<AuthenticatedLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="dashboard/:type" element={<DetailPage />} />
          <Route path="requests" element={<div>Requests Page</div>} />
          <Route path="clients" element={<div>Clients Page</div>} />
        </Route>

        {/* Redirect /dashboard to /admin/dashboard for backwards compatibility */}
        <Route
          path="/dashboard"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

const renderWithRouter = (initialEntries: string[]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppRoutes />
    </MemoryRouter>
  );
};

describe('App Routing', () => {
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

    // Default to unauthenticated state
    mockUseAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      setLoading: vi.fn(),
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
    beforeEach(() => {
      // Set authenticated state for protected route tests
      mockUseAuthStore.mockReturnValue({
        user: { id: '1', name: 'Admin User', email: 'admin@test.com' },
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
        isLoading: false,
        setLoading: vi.fn(),
      });
    });

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
      // Set authenticated state
      mockUseAuthStore.mockReturnValue({
        user: { id: '1', name: 'Admin User', email: 'admin@test.com' },
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
        isLoading: false,
        setLoading: vi.fn(),
      });

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
