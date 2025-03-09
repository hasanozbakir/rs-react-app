import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Main from './MainLayout';
import { useGetPeopleQuery } from '../../features/api/apiSlice';
import { selectSearchTerm } from '../../features/searchTerm/searchTermSlice';
import { selectCurrentPage } from '../../features/pagination/paginationSlice';
import { useTheme } from '../../utils/themeContext';
import selectedItemsReducer from '../../features/selectedItems/selectedItemsSlice';
import searchTermReducer from '../../features/searchTerm/searchTermSlice';
import paginationReducer from '../../features/pagination/paginationSlice';

vi.mock('../../features/api/apiSlice', () => ({
  useGetPeopleQuery: vi.fn(),
}));

vi.mock('../../utils/themeContext', () => ({
  useTheme: vi.fn(),
}));

vi.mock('../../features/searchTerm/searchTermSlice', async () => {
  const actual = await vi.importActual(
    '../../features/searchTerm/searchTermSlice'
  );
  return {
    ...actual,
    selectSearchTerm: vi.fn(),
  };
});

vi.mock('../../features/pagination/paginationSlice', async () => {
  const actual = await vi.importActual(
    '../../features/pagination/paginationSlice'
  );
  return {
    ...actual,
    selectCurrentPage: vi.fn(),
  };
});

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    query: { page: '1' },
  })),
}));

describe('Main Component', () => {
  const mockStore = configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
      searchTerm: searchTermReducer,
      pagination: paginationReducer,
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the search bar and title', () => {
    vi.mocked(useGetPeopleQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
      currentData: undefined,
      isSuccess: false,
      isUninitialized: false,
      status: 'pending',
    });

    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    vi.mocked(selectSearchTerm).mockReturnValue('');
    vi.mocked(selectCurrentPage).mockReturnValue(1);

    render(
      <Provider store={mockStore}>
        <Main />
      </Provider>
    );

    expect(screen.getByText('SWAPI API People Search')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Search for people' })
    ).toBeInTheDocument();
  });

  it('displays the spinner when loading', () => {
    vi.mocked(useGetPeopleQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      isFetching: true,
      error: undefined,
      refetch: vi.fn(),
      currentData: undefined,
      isSuccess: false,
      isUninitialized: false,
      status: 'pending',
    });

    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    vi.mocked(selectSearchTerm).mockReturnValue('');
    vi.mocked(selectCurrentPage).mockReturnValue(1);

    render(
      <Provider store={mockStore}>
        <Main />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays an error message when there is an error', () => {
    vi.mocked(useGetPeopleQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isFetching: false,
      error: { status: 500, message: 'Failed to fetch data' },
      refetch: vi.fn(),
      currentData: undefined,
      isSuccess: false,
      isUninitialized: false,
      status: 'pending',
    });

    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    vi.mocked(selectSearchTerm).mockReturnValue('');
    vi.mocked(selectCurrentPage).mockReturnValue(1);

    render(
      <Provider store={mockStore}>
        <Main />
      </Provider>
    );

    expect(screen.getByText('Error: 500')).toBeInTheDocument();
    expect(
      screen.getByText('Failed to fetch data. Please try again later.')
    ).toBeInTheDocument();
  });

  it('displays "No results found" when there are no results', () => {
    vi.mocked(useGetPeopleQuery).mockReturnValue({
      data: { results: [], count: 0 },
      isLoading: false,
      isError: false,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
      currentData: undefined,
      isSuccess: false,
      isUninitialized: false,
      status: 'pending',
    });

    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    vi.mocked(selectSearchTerm).mockReturnValue('');
    vi.mocked(selectCurrentPage).mockReturnValue(1);

    render(
      <Provider store={mockStore}>
        <Main />
      </Provider>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
});
