import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet } from 'react-router-dom'; // Use MemoryRouter for testing
import App from './App';
import { useTheme } from './utils/themeContext';

vi.mock('./utils/themeContext', () => ({
  useTheme: vi.fn(),
}));

vi.mock('./components/errorBoundary/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

vi.mock('./components/themeButton/ThemeButton', () => ({
  default: () => <div data-testid="theme-button">ThemeButton</div>,
}));

vi.mock('./pages/main/Main', () => ({
  default: () => (
    <div data-testid="main">
      <Outlet /> {/* Render nested routes */}
    </div>
  ),
}));

vi.mock('./pages/notFound/NotFound', () => ({
  default: () => <div data-testid="not-found">NotFound</div>,
}));

vi.mock('./components/details/Details', () => ({
  default: () => <div data-testid="details">Details</div>,
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the ThemeButton and Main components for the home route', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        {' '}
        {/* Use MemoryRouter for testing */}
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('theme-button')).toBeInTheDocument();
    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  it('renders the Details component for the details route', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('main')).toBeInTheDocument();

    expect(screen.getByTestId('details')).toBeInTheDocument();
  });

  it('renders the NotFound component for an unknown route', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/unknown']}>
        {' '}
        {/* Use MemoryRouter for testing */}
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('wraps the application with the ErrorBoundary component', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(
      <MemoryRouter>
        {' '}
        {/* Use MemoryRouter for testing */}
        <App />
      </MemoryRouter>
    );

    const errorBoundary = screen.getByTestId('error-boundary');
    expect(errorBoundary).toBeInTheDocument();
  });
});
