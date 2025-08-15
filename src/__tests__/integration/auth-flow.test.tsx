/// <reference types="vitest/globals" />
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../config/query-client';
import { HomePage } from '../../pages/HomePage';
import { DashboardPage } from '../../pages/DashboardPage';
import { AuthenticatedLayout } from '../../components/layouts/AuthenticatedLayout';

// Mock console.error to avoid React Router warnings in tests
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

// Create a simplified test app with just the pages we need
const TestApp = ({ initialRoute = '/' }: { initialRoute?: string }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter initialEntries={[initialRoute]}>
      {initialRoute === '/' ? <HomePage /> : 
       initialRoute === '/admin/dashboard' ? 
         <AuthenticatedLayout><DashboardPage /></AuthenticatedLayout> : 
         <HomePage />}
    </MemoryRouter>
  </QueryClientProvider>
);

describe('Authentication Flow Integration Tests', () => {
  beforeEach(() => {
    // Clear any existing auth state
    localStorage.clear();
    queryClient.clear();
  });

  it('should complete full authentication flow', async () => {
    const user = userEvent.setup();
    
    render(<TestApp />);

    // Should start on login page
    expect(screen.getByText('Welcome to TraceTrack Admin')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    
    // Fill in login form
    await user.type(screen.getByLabelText(/email/i), 'admin@tracetrack.com');
    await user.type(screen.getByLabelText(/password/i), 'admin123');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Should show loading state
    expect(screen.getByRole('button', { name: /signing in/i })).toBeInTheDocument();
    
    // Wait for authentication
    await waitFor(
      () => {
        expect(screen.getByText('Welcome back, Admin User!')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should handle login with invalid credentials', async () => {
    const user = userEvent.setup();
    
    render(<TestApp />);

    // Fill in invalid credentials
    await user.type(screen.getByLabelText(/email/i), 'wrong@email.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
    
    // Should remain on login page
    expect(screen.getByText('Welcome to TraceTrack Admin')).toBeInTheDocument();
  });

  it('should handle logout flow', async () => {
    const user = userEvent.setup();
    
    render(<TestApp />);

    // Login first
    await user.type(screen.getByLabelText(/email/i), 'admin@tracetrack.com');
    await user.type(screen.getByLabelText(/password/i), 'admin123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Wait for welcome message
    await waitFor(() => {
      expect(screen.getByText('Welcome back, Admin User!')).toBeInTheDocument();
    });
    
    // Logout
    await user.click(screen.getByRole('button', { name: /logout/i }));
    
    // Should show login form again
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });
  });

  it('should redirect to login when accessing protected route without authentication', () => {
    render(<TestApp initialRoute="/admin/dashboard" />);

    // Should show login page instead of dashboard
    expect(screen.getByText('Welcome to TraceTrack Admin')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
