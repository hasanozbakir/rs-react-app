import { useAppDispatch } from '../app/hooks';
import { toggleItemSelection } from '../features/selectedItems/selectedItemsSlice';
import { SelectedItem } from '../features/selectedItems/selectedItemsSlice';

export const useSelectedPerson = () => {
  const dispatch = useAppDispatch();

  return (person: SelectedItem) =>
    dispatch(
      toggleItemSelection({
        url: person.url,
        name: person.name,
        birth_year: person.birth_year,
        gender: person.gender,
        height: person.height,
        mass: person.mass,
      })
    );
};
