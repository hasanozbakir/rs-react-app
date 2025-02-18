import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface SelectedItem {
  url: string;
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
}

export interface SelectedItemsState {
  selectedItems: SelectedItem[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItemSelection(state, action: PayloadAction<SelectedItem>) {
      const item = action.payload;
      const index = state.selectedItems.findIndex(
        (selected) => selected.url === item.url
      );
      if (index === -1) {
        state.selectedItems.push(item);
      } else {
        state.selectedItems.splice(index, 1);
      }
    },
    clearSelectedItems(state) {
      state.selectedItems = [];
    },
  },
});

export const { toggleItemSelection, clearSelectedItems } =
  selectedItemsSlice.actions;

export const selectSelectedItems = (state: RootState) =>
  state.selectedItems.selectedItems;

export default selectedItemsSlice.reducer;
