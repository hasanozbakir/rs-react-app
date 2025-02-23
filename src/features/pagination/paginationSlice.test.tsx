import { configureStore } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import paginationReducer, {
  setCurrentPage,
  setItemsPerPage,
  resetPagination,
  selectCurrentPage,
  selectItemsPerPage,
} from './paginationSlice';
import { describe, it, expect } from 'vitest';

describe('paginationSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        pagination: paginationReducer,
      },
    });
  });

  it('should initialize with the correct initial state', () => {
    const state = store.getState() as RootState; // Cast to RootState
    expect(state.pagination).toEqual({
      currentPage: 1,
      itemsPerPage: 10,
    });
  });

  it('should update the current page', () => {
    store.dispatch(setCurrentPage(3));
    const state = store.getState() as RootState;
    expect(state.pagination.currentPage).toBe(3);
  });

  it('should update the items per page', () => {
    store.dispatch(setItemsPerPage(20));
    const state = store.getState() as RootState;
    expect(state.pagination.itemsPerPage).toBe(20);
  });

  it('should reset pagination to initial state', () => {
    store.dispatch(setCurrentPage(5));
    store.dispatch(setItemsPerPage(15));

    store.dispatch(resetPagination());

    const state = store.getState() as RootState;
    expect(state.pagination).toEqual({
      currentPage: 1,
      itemsPerPage: 10,
    });
  });

  it('should select the current page and items per page from the state', () => {
    store.dispatch(setCurrentPage(2));
    store.dispatch(setItemsPerPage(25));

    const state = store.getState() as RootState;
    const currentPage = selectCurrentPage(state);
    const itemsPerPage = selectItemsPerPage(state);

    expect(currentPage).toBe(2);
    expect(itemsPerPage).toBe(25);
  });
});
