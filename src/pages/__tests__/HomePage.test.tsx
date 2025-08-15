/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../config/query-client';
import { HomePage } from '../HomePage';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
    queryClient.clear();
  });

  it('should render login form when user is not authenticated', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByText('Welcome to TraceTrack Admin')).toBeInTheDocument();
    expect(screen.getByText('Please sign in to continue to your dashboard')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should display technology stack information', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByText(/Built with React 19, TypeScript, Vite, Tailwind CSS v4, Zustand, and TanStack Query/)).toBeInTheDocument();
  });

  it('should have proper form structure', () => {
    renderWithProviders(<HomePage />);

    // Check form elements
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('should display demo credentials info', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByText('Demo credentials are pre-filled')).toBeInTheDocument();
  });
});
