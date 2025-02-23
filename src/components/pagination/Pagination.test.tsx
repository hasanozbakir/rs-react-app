import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import paginationReducer, {
  setCurrentPage,
} from '../../features/pagination/paginationSlice';
import Pagination from './Pagination';

vi.mock('../../utils/themeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

const createTestStore = (currentPage: number, itemsPerPage: number) =>
  configureStore({
    reducer: { pagination: paginationReducer },
    preloadedState: { pagination: { currentPage, itemsPerPage } },
  });

describe('Pagination Component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore(1, 10);
  });

  const renderWithStore = () =>
    render(
      <Provider store={store}>
        <Pagination totalItems={50} />
      </Provider>
    );

  it('renders with correct total pages', () => {
    renderWithStore();
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('disables "Previous" button on first page', () => {
    renderWithStore();
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables "Next" button on last page', () => {
    store = createTestStore(5, 10);
    renderWithStore();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('dispatches setCurrentPage when "Next" is clicked', () => {
    store = createTestStore(2, 10);
    vi.spyOn(store, 'dispatch');

    renderWithStore();
    fireEvent.click(screen.getByText('Next'));

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentPage(3));
  });

  it('dispatches setCurrentPage when "Previous" is clicked', () => {
    store = createTestStore(3, 10);
    vi.spyOn(store, 'dispatch');

    renderWithStore();
    fireEvent.click(screen.getByText('Previous'));

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentPage(2));
  });
});
