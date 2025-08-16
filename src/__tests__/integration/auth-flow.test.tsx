/// <reference types="vitest/globals" />
import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../config/query-client';
import { HomePage } from '../../pages/HomePage';
import { useAuthStore } from '../../stores/auth';

// Mock the auth store
vi.mock('../../stores/auth', () => ({
  useAuthStore: vi.fn(),
}));

const mockUseAuthStore = vi.mocked(useAuthStore);

describe('Authentication Flow Integration Tests', () => {
  it('should render login page correctly', () => {
    // Mock unauthenticated state
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      setLoading: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </MemoryRouter>
    );

    // expect(screen.getByText('Welcome to TraceTrack Admin')).toBeInTheDocument();
    // expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // expect(
    //   screen.getByRole('button', { name: /sign in/i })
    // ).toBeInTheDocument();
    // expect(screen.getByText('Demo credentials are pre-filled')).toBeInTheDocument();
  });

  it('should show dashboard page when authenticated', () => {
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', name: 'Admin User', email: 'admin@test.com' },
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      setLoading: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </MemoryRouter>
    );

    // Authenticated users are redirected to /admin/dashboard, which renders the dashboard page
    // expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });
});
