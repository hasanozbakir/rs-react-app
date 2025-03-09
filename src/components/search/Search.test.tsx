import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Search from './Search';
import useLocalStorage from '@/hooks/useLocalStorage';

vi.mock('@/hooks/useLocalStorage', () => ({
  default: vi.fn(),
}));

describe('Search Component', () => {
  it('renders input and button', () => {
    (useLocalStorage as jest.Mock).mockReturnValue(['', vi.fn()]);

    render(<Search onSearch={() => {}} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input value', () => {
    const setSearch = vi.fn();
    (useLocalStorage as jest.Mock).mockReturnValue(['', setSearch]);

    render(<Search onSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'John' } });

    expect(setSearch).toHaveBeenCalledWith('John');
  });

  it('calls onSearch with trimmed input', () => {
    const setSearch = vi.fn();
    const onSearchMock = vi.fn();
    (useLocalStorage as jest.Mock).mockReturnValue(['  John Doe  ', setSearch]);

    render(<Search onSearch={onSearchMock} />);

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(onSearchMock).toHaveBeenCalledWith('John Doe');
  });
});
