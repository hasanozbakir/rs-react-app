import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { useGetPersonQuery } from '@/features/api/apiSlice';
import { useTheme } from '@/utils/themeContext';
import Details from './Details';

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    query: { id: '1' },
    push: vi.fn(() => Promise.resolve(true)),
    replace: vi.fn(),
    route: '/',
    pathname: '/details',
    asPath: '/details',
    basePath: '',
    isLocaleDomain: false,
    forward: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    isReady: true,
    isPreview: false,
  })),
}));

vi.mock('@/features/api/apiSlice', () => ({
  useGetPersonQuery: vi.fn(() => ({
    data: undefined,
    isLoading: true,
    isError: false,
    refetch: vi.fn(),
  })),
}));

vi.mock('@/utils/themeContext', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  })),
}));

describe('Details Component', () => {
  const mockPush = vi.fn(() => Promise.resolve(true));
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      query: { id: '1' },
      push: mockPush,
      replace: mockReplace,
      route: '/',
      pathname: '/details',
      asPath: '/details',
      basePath: '',
      isLocaleDomain: false,
      forward: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      isFallback: false,
      isReady: true,
      isPreview: false,
    });

    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render person details', async () => {
    const mockPerson = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
      birth_year: '19BBY',
      hair_color: 'blond',
      skin_color: 'fair',
    };

    vi.mocked(useGetPersonQuery).mockReturnValue({
      data: mockPerson,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    render(<Details />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Height: 172')).toBeInTheDocument();
      expect(screen.getByText('Mass: 77')).toBeInTheDocument();
      expect(screen.getByText('Gender: male')).toBeInTheDocument();
      expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
      expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
      expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
    });
  });

  it('should redirect to not-found page if id is not provided', () => {
    vi.mocked(useRouter).mockReturnValue({
      query: {},
      push: mockPush,
      replace: mockReplace,
      route: '/',
      pathname: '/details',
      asPath: '/details',
      basePath: '',
      isLocaleDomain: false,
      forward: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      isFallback: false,
      isReady: true,
      isPreview: false,
    });

    render(<Details />);
    expect(mockReplace).toHaveBeenCalledWith('/not-found');
  });

  it('should navigate back to home page when close button is clicked', async () => {
    const mockPerson = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
      birth_year: '19BBY',
      hair_color: 'blond',
      skin_color: 'fair',
    };

    vi.mocked(useGetPersonQuery).mockReturnValue({
      data: mockPerson,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    render(<Details />);

    const closeButton = screen.getByText('Close');
    await userEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
