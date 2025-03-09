import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useRouter } from 'next/router';
import NotFound from '@/pages/404';
import { useTheme } from '@/utils/themeContext';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/utils/themeContext', () => ({
  useTheme: vi.fn(),
}));

describe('NotFound Page', () => {
  const mockPush = vi.fn(() => Promise.resolve());

  beforeEach(() => {
    vi.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
    });
  });

  it('renders the 404 page with the correct content', () => {
    render(<NotFound />);

    expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
    expect(screen.getByTestId('reload-button')).toBeInTheDocument();
  });

  it('navigates to the home page when the button is clicked', async () => {
    render(<NotFound />);
    const button = screen.getByTestId('reload-button');

    fireEvent.click(button);

    await expect(mockPush).toHaveBeenCalledWith('/');
  });
});
