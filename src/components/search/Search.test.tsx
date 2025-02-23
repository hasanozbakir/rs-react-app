import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';
import useLocalStorage from '../../hooks/useLocalStorage';

vi.mock('../../hooks/useLocalStorage');

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the search input and button', () => {
    vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);

    render(<Search onSearch={mockOnSearch} />);

    expect(
      screen.getByRole('textbox', { name: 'Search for people' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('updates the input value when the user types', () => {
    const setSearchTermMock = vi.fn();

    vi.mocked(useLocalStorage).mockReturnValue(['', setSearchTermMock]);

    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox', { name: 'Search for people' });
    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(setSearchTermMock).toHaveBeenCalledWith('Luke');
  });

  it('calls onSearch with the trimmed search term when the button is clicked', () => {
    const searchTerm = '  Luke  ';
    const setSearchTermMock = vi.fn();

    vi.mocked(useLocalStorage).mockReturnValue([searchTerm, setSearchTermMock]);

    render(<Search onSearch={mockOnSearch} />);

    const button = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Luke');
  });

  it('persists the search term in local storage', () => {
    const searchTerm = 'Luke';
    const setSearchTermMock = vi.fn();

    vi.mocked(useLocalStorage).mockReturnValue([searchTerm, setSearchTermMock]);

    render(<Search onSearch={mockOnSearch} />);

    expect(useLocalStorage).toHaveBeenCalledWith('searchTerm', '');
    expect(
      screen.getByRole('textbox', { name: 'Search for people' })
    ).toHaveValue('Luke');
  });
});
