import { configureStore } from '@reduxjs/toolkit';
import selectedItemsSliceReducer, {
  toggleItemSelection,
  clearSelectedItems,
  selectSelectedItems,
  SelectedItem,
} from './selectedItemsSlice';
import { describe, it, expect } from 'vitest';
import type { RootState } from '../../redux-store/store';
import { allPeopleResults } from '../../mocks/testData';
import { Person } from '../../utils/types';

const mapToSelectedItem = (person: Person): SelectedItem => ({
  url: person.url,
  name: person.name,
  birth_year: person.birth_year,
  gender: person.gender,
  height: person.height,
  mass: person.mass,
});

describe('selectedItemsSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        selectedItems: selectedItemsSliceReducer,
      },
    });
  });

  it('should initialize with the correct initial state', () => {
    const state = store.getState() as RootState;
    expect(state.selectedItems.selectedItems).toEqual([]);
  });

  it('should add an item to selectedItems if it is not already selected', () => {
    const item = mapToSelectedItem(allPeopleResults[0]);

    store.dispatch(toggleItemSelection(item));

    const state = store.getState() as RootState;
    expect(state.selectedItems.selectedItems).toEqual([item]);
  });

  it('should remove an item from selectedItems if it is already selected', () => {
    const item = mapToSelectedItem(allPeopleResults[0]);

    store.dispatch(toggleItemSelection(item));

    store.dispatch(toggleItemSelection(item));

    const state = store.getState() as RootState;
    expect(state.selectedItems.selectedItems).toEqual([]);
  });

  it('should clear all selected items', () => {
    const item1 = mapToSelectedItem(allPeopleResults[0]);
    const item2 = mapToSelectedItem(allPeopleResults[1]);

    store.dispatch(toggleItemSelection(item1));
    store.dispatch(toggleItemSelection(item2));

    store.dispatch(clearSelectedItems());

    const state = store.getState() as RootState;
    expect(state.selectedItems.selectedItems).toEqual([]);
  });

  it('should select the selected items from the state', () => {
    const item = mapToSelectedItem(allPeopleResults[0]);

    store.dispatch(toggleItemSelection(item));

    const state = store.getState() as RootState;
    const selectedItems = selectSelectedItems(state);
    expect(selectedItems).toEqual([item]);
  });
});
