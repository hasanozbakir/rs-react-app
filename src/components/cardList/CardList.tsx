import { useNavigation } from '../../utils/navigation';
import { Person } from '../../utils/types';
import { useAppSelector } from '../../app/hooks';
import { useSelectedPerson } from '../../app/useSelectedPerson';
import { selectSelectedItems } from '../../features/selectedItems/selectedItemsSlice';
import Card from '../card/Card';
import styles from './CardList.module.css';

interface CardListProps {
  people: Person[];
}

const CardList = ({ people }: CardListProps) => {
  const selectedItems = useAppSelector(selectSelectedItems);
  const toggleSelection = useSelectedPerson();
  const { handlePersonClick } = useNavigation();

  return (
    <div className={styles['card-list']}>
      {people.map((person) => (
        <Card
          key={person.url}
          person={person}
          isSelected={selectedItems.some((item) => item.url === person.url)}
          onSelect={toggleSelection}
          onClick={() => handlePersonClick(person)}
        />
      ))}
    </div>
  );
};

export default CardList;
