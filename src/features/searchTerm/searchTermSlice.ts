import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Helper functions for localStorage
const getLocalStorageItem = (key: string, initialValue: string): string => {
  if (typeof window === 'undefined') {
    return initialValue; // Handle server-side rendering
  }
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return initialValue;
  }
};

const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window === 'undefined') {
    return; // Handle server-side rendering
  }
  try {
    localStorage.setItem(key, value); // Save the value directly
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

const removeLocalStorageItem = (key: string) => {
  if (typeof window === 'undefined') {
    return; // Handle server-side rendering
  }
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export interface SearchState {
  searchTerm: string;
}

// Use a function to generate the initial state
const getInitialState = (): SearchState => ({
  searchTerm: getLocalStorageItem('lastSearchTerm', ''),
});

const searchSlice = createSlice({
  name: 'search',
  initialState: getInitialState(), // Call the function to get the initial state
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      setLocalStorageItem('lastSearchTerm', action.payload);
    },
    clearSearchTerm(state) {
      state.searchTerm = '';
      removeLocalStorageItem('lastSearchTerm');
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;

export const selectSearchTerm = (state: RootState) => state.search.searchTerm;

export default searchSlice.reducer;
