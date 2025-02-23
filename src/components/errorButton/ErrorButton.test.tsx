import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ErrorButton from './ErrorButton';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

describe('ErrorButton Component', () => {
  it('renders the button correctly', () => {
    render(<ErrorButton />);
    expect(screen.getByText('Generate Error')).toBeInTheDocument();
  });

  it('throws an error when clicked and is caught by ErrorBoundary', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Generate Error'));

    await waitFor(() => {
      expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Test error thrown by ErrorButton'
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
