import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import ThemeContext, {
  THEME_CONSTANT_LIGHT,
  THEME_CONSTANT_DARK,
} from '../../utils/themeContext';
import React from 'react';

const TestComponent = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    return <div>No theme context available</div>;
  }

  const { theme, toggleTheme } = context;

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <button onClick={toggleTheme} data-testid="toggle-theme">
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeProvider Component', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sets the initial theme to light if no theme is stored in local storage', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent(THEME_CONSTANT_LIGHT);
  });

  it('toggles the theme between light and dark', () => {
    localStorageMock.getItem.mockReturnValue(THEME_CONSTANT_LIGHT);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent(THEME_CONSTANT_LIGHT);

    fireEvent.click(screen.getByTestId('toggle-theme'));

    expect(screen.getByTestId('theme')).toHaveTextContent(THEME_CONSTANT_DARK);

    fireEvent.click(screen.getByTestId('toggle-theme'));

    expect(screen.getByTestId('theme')).toHaveTextContent(THEME_CONSTANT_LIGHT);
  });
});
