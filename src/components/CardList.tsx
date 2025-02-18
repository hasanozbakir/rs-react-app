import Card from './Card';
import { Person } from '../utils/types';
import { SelectedItem } from '../features/selectedItems/selectedItemsSlice';
import { useSelectedPerson } from '../utils/useSelectedPerson';
import styles from './CardList.module.css';

interface CardListProps {
  people: Person[];
  selectedItems: SelectedItem[];
  onPersonClick: (person: Person) => void;
}

const CardList = ({ people, selectedItems, onPersonClick }: CardListProps) => {
  const getSelectedPerson = useSelectedPerson();

  return (
    <div className={styles['card-list']}>
      {people.map((person) => (
        <Card
          key={person.url}
          person={person}
          isSelected={selectedItems.some((item) => item.url === person.url)}
          onSelect={(item) => getSelectedPerson(item)}
          onClick={() => onPersonClick(person)}
        />
      ))}
    </div>
  );
};

export default CardList;
