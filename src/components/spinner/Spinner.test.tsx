import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
import { describe, expect, it } from 'vitest';

describe('Spinner Component', () => {
  it('renders the spinner container', () => {
    render(<Spinner />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('has the correct CSS classes applied', () => {
    render(<Spinner />);
    const spinner = screen.getByTestId('spinner');
    const spinnerInner = screen.getByTestId('spinner-inner');

    expect(spinner.className).toBeTruthy();
    expect(spinnerInner.className).toBeTruthy();
  });
});
