import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from './components/themeProvider/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import App from './App';
import './index.css';

vi.mock('./App', () => ({
  default: () => <div data-testid="app">App Component</div>,
}));

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn().mockImplementation(() => ({
    render: vi.fn(),
  })),
}));

describe('main.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the App component with all providers', () => {
    render(
      <StrictMode>
        <Provider store={store}>
          <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </StrictMode>
    );

    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('logs an error if the root element is not found', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    vi.spyOn(document, 'getElementById').mockReturnValue(null);

    await import('./main.tsx');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to find the root element'
    );
  });
});
