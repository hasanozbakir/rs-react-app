import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface PaginationState {
  // totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: PaginationState = {
  // totalPages: 1,
  currentPage: 1,
  itemsPerPage: 10,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
    resetPagination(state) {
      state.currentPage = 1;
      state.itemsPerPage = 10;
    },
  },
});

export const { setCurrentPage, setItemsPerPage, resetPagination } =
  paginationSlice.actions;

export const selectCurrentPage = (state: RootState) =>
  state.pagination.currentPage;
export const selectItemsPerPage = (state: RootState) =>
  state.pagination.itemsPerPage;

export default paginationSlice.reducer;
