import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useTheme } from '../../utils/themeContext';
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks';
import {
  setCurrentPage,
  selectItemsPerPage,
} from '../../features/pagination/paginationSlice';
import Pagination from './Pagination';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    query: { page: '1' },
    push: vi.fn(() => Promise.resolve(true)),
    replace: vi.fn(() => Promise.resolve(true)),
    reload: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(() => Promise.resolve()),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    isReady: true,
    isPreview: false,
    route: '/',
    pathname: '/',
    asPath: '/',
    basePath: '',
    isLocaleDomain: false,
  })),
  default: {
    push: vi.fn(() => Promise.resolve(true)),
  },
}));

vi.mock('../../redux-store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../utils/themeContext', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  })),
}));

describe('Pagination Component', () => {
  const mockDispatch = vi.fn();
  const mockPush = vi.fn(() => Promise.resolve(true));

  beforeEach(() => {
    vi.clearAllMocks();

    (
      useAppDispatch as jest.MockedFunction<typeof useAppDispatch>
    ).mockReturnValue(mockDispatch);

    (
      useAppSelector as jest.MockedFunction<typeof useAppSelector>
    ).mockImplementation((selector) => {
      if (selector === selectItemsPerPage) return 10;
      return 1;
    });

    (useTheme as jest.MockedFunction<typeof useTheme>).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    (useRouter as jest.MockedFunction<typeof useRouter>).mockReturnValue({
      query: { page: '1' },
      push: mockPush,
      replace: vi.fn(() => Promise.resolve(true)),
      reload: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(() => Promise.resolve()),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      isFallback: false,
      isReady: true,
      isPreview: false,
      route: '/',
      pathname: '/',
      asPath: '/',
      basePath: '',
      isLocaleDomain: false,
    });
  });

  it('renders the pagination component correctly', () => {
    render(<Pagination totalItems={50} />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
  });

  it('calls dispatch and router.push when clicking next', async () => {
    render(<Pagination totalItems={50} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockDispatch).toHaveBeenCalledWith(setCurrentPage(2));
    await expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: 2 },
    });
  });

  it('calls dispatch and router.push when clicking previous', async () => {
    (useRouter as jest.MockedFunction<typeof useRouter>).mockReturnValue({
      query: { page: '2' },
      push: mockPush,
      replace: vi.fn(() => Promise.resolve(true)),
      reload: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(() => Promise.resolve()),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      isFallback: false,
      isReady: true,
      isPreview: false,
      route: '/',
      pathname: '/',
      asPath: '/',
      basePath: '',
      isLocaleDomain: false,
    });

    render(<Pagination totalItems={50} />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);

    expect(mockDispatch).toHaveBeenCalledWith(setCurrentPage(1));
    await expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: 1 },
    });
  });

  it('disables "Next" button on the last page', () => {
    (useRouter as jest.MockedFunction<typeof useRouter>).mockReturnValue({
      query: { page: '5' },
      push: mockPush,
      replace: vi.fn(() => Promise.resolve(true)),
      reload: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(() => Promise.resolve()),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      isFallback: false,
      isReady: true,
      isPreview: false,
      route: '/',
      pathname: '/',
      asPath: '/',
      basePath: '',
      isLocaleDomain: false,
    });

    render(<Pagination totalItems={50} />);

    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });
});
