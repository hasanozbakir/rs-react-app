import { useAppDispatch } from '../app/hooks';
import {
  toggleItemSelection,
  SelectedItem,
} from '../features/selectedItems/selectedItemsSlice';

export const useSelectedPerson = () => {
  const dispatch = useAppDispatch();

  const toggleSelection = (person: SelectedItem) => {
    dispatch(toggleItemSelection(person));
  };

  return toggleSelection;
};
