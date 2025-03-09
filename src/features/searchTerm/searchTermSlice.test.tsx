import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer, {
  setSearchTerm,
  clearSearchTerm,
  selectSearchTerm,
} from './searchTermSlice';
import { describe, it, expect, beforeEach } from 'vitest';
import type { RootState } from '../../redux-store/store';

describe('searchTermSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    localStorage.clear();

    store = configureStore({
      reducer: {
        search: searchTermReducer,
      },
    });
  });

  it('should initialize with the correct initial state', () => {
    const state = store.getState() as RootState;
    expect(state.search.searchTerm).toBe('');
  });

  it('should select the search term from the state', () => {
    store.dispatch(setSearchTerm('Leia'));

    const state = store.getState() as RootState;
    const selectedSearchTerm = selectSearchTerm(state);
    expect(selectedSearchTerm).toBe('Leia');
  });
  it('should clear the search term in the state', () => {
    store.dispatch(setSearchTerm('Yoda'));

    store.dispatch(clearSearchTerm());

    const state = store.getState() as RootState;
    expect(state.search.searchTerm).toBe('');
  });

  it('should select the search term from the state', () => {
    store.dispatch(setSearchTerm('Leia'));

    const state = store.getState() as RootState;
    const selectedSearchTerm = selectSearchTerm(state);
    expect(selectedSearchTerm).toBe('Leia');
  });
});
