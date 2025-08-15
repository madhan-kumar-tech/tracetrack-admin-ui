/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticatedLayout } from '../AuthenticatedLayout';
import { useAuthStore } from '../../../stores/auth';

// Mock the auth store
vi.mock('../../../stores/auth', () => ({
  useAuthStore: vi.fn(),
}));

const mockUseAuthStore = vi.mocked(useAuthStore);

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
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AuthenticatedLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to home when user is not authenticated', () => {
    // Mock unauthenticated state
    mockUseAuthStore.mockReturnValue(false);

    renderWithRouter(<AuthenticatedLayout />);

    expect(screen.getByTestId('navigate')).toBeInTheDocument();
    expect(screen.getByText('Navigate to /')).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/', true);
  });

  it('should render layout when user is authenticated', () => {
    // Mock authenticated state
    mockUseAuthStore.mockReturnValue(true);

    renderWithRouter(<AuthenticatedLayout />);

    expect(screen.getByText('TraceTrack Admin')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  it('should have proper layout structure when authenticated', () => {
    mockUseAuthStore.mockReturnValue(true);

    renderWithRouter(<AuthenticatedLayout />);

    // Check header structure
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white', 'shadow-sm', 'border-b');
    
    // Check main content area
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    // Check title
    expect(screen.getByText('TraceTrack Admin')).toHaveClass('text-xl', 'font-semibold', 'text-gray-900');
  });
});
