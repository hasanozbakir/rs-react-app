import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer, {
  setSearchTerm,
  clearSearchTerm,
  selectSearchTerm,
} from './searchTermSlice';
import { describe, it, expect } from 'vitest';
import type { RootState } from '../../app/store';

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

  it('should load the search term from localStorage on initialization', () => {
    localStorage.setItem('lastSearchTerm', 'Luke');

    store = configureStore({
      reducer: {
        search: searchTermReducer,
      },
    });

    const state = store.getState() as RootState;
    expect(state.search.searchTerm).toBe('');
  });

  it('should update the search term and save it to localStorage', () => {
    store.dispatch(setSearchTerm('Darth Vader'));

    const state = store.getState() as RootState;
    expect(state.search.searchTerm).toBe('Darth Vader');
    expect(localStorage.getItem('lastSearchTerm')).toBe('Darth Vader');
  });

  it('should clear the search term and remove it from localStorage', () => {
    store.dispatch(setSearchTerm('Yoda'));

    store.dispatch(clearSearchTerm());

    const state = store.getState() as RootState;
    expect(state.search.searchTerm).toBe('');
    expect(localStorage.getItem('lastSearchTerm')).toBeNull();
  });

  it('should select the search term from the state', () => {
    store.dispatch(setSearchTerm('Leia'));

    const state = store.getState() as RootState;
    const selectedSearchTerm = selectSearchTerm(state);
    expect(selectedSearchTerm).toBe('Leia');
  });
});
