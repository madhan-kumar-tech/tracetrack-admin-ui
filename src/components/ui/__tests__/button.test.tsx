/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Loading button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // Check for the loading spinner by looking for the SVG element
    expect(button.querySelector('svg')).toBeInTheDocument();
    expect(button.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    render(<Button variant="secondary">Secondary</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-100');
  });

  it('applies size styles correctly', () => {
    render(<Button size="lg">Large button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-12');
  });
});
