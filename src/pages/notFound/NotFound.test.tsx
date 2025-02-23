import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  it('renders the 404 title and message', () => {
    render(<NotFound />);

    expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  it('renders the "Go Home" button', () => {
    render(<NotFound />);

    const button = screen.getByRole('button', { name: 'Go Home' });
    expect(button).toBeInTheDocument();
  });

  it('redirects to the home page when the "Go Home" button is clicked', () => {
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });

    render(<NotFound />);

    const button = screen.getByRole('button', { name: 'Go Home' });
    fireEvent.click(button);

    expect(window.location.href).toBe('/');

    Object.defineProperty(window, 'location', {
      value: originalLocation,
    });
  });
});
