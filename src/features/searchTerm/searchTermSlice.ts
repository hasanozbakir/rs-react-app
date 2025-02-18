import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const saveSearchTermToLocalStorage = (term: string) => {
  localStorage.setItem('lastSearchTerm', term);
};

const loadSearchTermFromLocalStorage = (): string => {
  return localStorage.getItem('lastSearchTerm') || '';
};

export interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: loadSearchTermFromLocalStorage(),
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      saveSearchTermToLocalStorage(action.payload);
    },
    clearSearchTerm(state) {
      state.searchTerm = '';
      localStorage.removeItem('lastSearchTerm');
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;

export const selectSearchTerm = (state: RootState) => state.search.searchTerm;

export default searchSlice.reducer;
