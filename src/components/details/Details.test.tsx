import { render, screen, waitFor } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  beforeAll,
  afterAll,
  afterEach,
} from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  MemoryRouter,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { handlers } from '../../mocks/handlers';
import { setupServer } from 'msw/node';
import React from 'react';
import Details from './Details';
import { useGetPersonQuery } from '../../features/api/apiSlice';

const server = setupServer(...handlers);

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

vi.mock('../../features/api/apiSlice', () => ({
  useGetPersonQuery: vi.fn(),
}));

const store = configureStore({
  reducer: {
    // Add your reducers here if needed
  },
});

vi.mock('../../utils/themeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

vi.mock('../spinner/Spinner', () => ({
  default: () => React.createElement('div', null, 'Loading...'),
}));

const mockUseGetPersonQuery = (overrides = {}) => ({
  data: undefined,
  isLoading: false,
  isError: false,
  refetch: vi.fn(),
  currentData: undefined,
  isFetching: false,
  isSuccess: false,
  isUninitialized: false,
  status: 'pending',
  ...overrides,
});

describe('Details Component', () => {
  const mockNavigate = vi.fn();
  const mockLocation = {
    state: {
      person: null,
      from: '/',
    },
    key: 'testKey',
    pathname: '/details/1',
    search: '',
    hash: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLocation).mockReturnValue(mockLocation);
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render loading spinner when data is loading', () => {
    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(useGetPersonQuery).mockReturnValue(
      mockUseGetPersonQuery({
        data: undefined,
        isLoading: true,
        isError: false,
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error message when there is an error', () => {
    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(useGetPersonQuery).mockReturnValue(
      mockUseGetPersonQuery({
        data: undefined,
        isLoading: false,
        isError: true,
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Error loading details')).toBeInTheDocument();
  });

  it('should render person details when data is available', async () => {
    const mockPerson = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
      birth_year: '19BBY',
      hair_color: 'blond',
      skin_color: 'fair',
      url: 'https://swapi.dev/api/people/1/',
    };

    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(useGetPersonQuery).mockReturnValue(
      mockUseGetPersonQuery({
        data: mockPerson,
        isLoading: false,
        isError: false,
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
    );

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

  it('should navigate to not-found page if id is missing', () => {
    vi.mocked(useParams).mockReturnValue({ id: undefined });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/not-found', { replace: true });
  });

  it('should call navigate with fromPage when close button is clicked', async () => {
    const mockPerson = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
      birth_year: '19BBY',
      hair_color: 'blond',
      skin_color: 'fair',
      url: 'https://swapi.dev/api/people/1/',
    };

    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(useGetPersonQuery).mockReturnValue(
      mockUseGetPersonQuery({
        data: mockPerson,
        isLoading: false,
        isError: false,
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByText('Close');
    closeButton.click();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
