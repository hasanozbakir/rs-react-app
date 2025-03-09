import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchTermState {
  searchTerm: string;
}

const initialState: SearchTermState = {
  searchTerm: '',
};

const searchTermSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = '';
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchTermSlice.actions;
export const selectSearchTerm = (state: { search: SearchTermState }) =>
  state.search.searchTerm;
export default searchTermSlice.reducer;
