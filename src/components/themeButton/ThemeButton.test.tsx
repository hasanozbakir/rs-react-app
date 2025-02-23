import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeButton from './ThemeButton';
import {
  THEME_CONSTANT_DARK,
  THEME_CONSTANT_LIGHT,
  useTheme,
} from '../../utils/themeContext';

vi.mock('../../utils/themeContext', () => ({
  useTheme: vi.fn(),
  THEME_CONSTANT_DARK: 'dark',
  THEME_CONSTANT_LIGHT: 'light',
}));

describe('ThemeButton Component', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the theme toggle button', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: THEME_CONSTANT_LIGHT,
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeButton />);

    const checkbox = screen.getByRole('checkbox', { name: 'Theme Toggle' });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders the checkbox as checked when the theme is dark', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: THEME_CONSTANT_DARK,
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeButton />);

    const checkbox = screen.getByRole('checkbox', { name: 'Theme Toggle' });
    expect(checkbox).toBeChecked();
  });

  it('calls toggleTheme when the checkbox is toggled', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: THEME_CONSTANT_LIGHT,
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeButton />);

    const checkbox = screen.getByRole('checkbox', { name: 'Theme Toggle' });
    fireEvent.click(checkbox);

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
