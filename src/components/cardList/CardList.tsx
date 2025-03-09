import { useRouter } from 'next/router';
import { Person } from '../../utils/types';
import { useAppSelector } from '../../redux-store/hooks';
import { useSelectedPerson } from '../../redux-store/useSelectedPerson';
import { selectSelectedItems } from '../../features/selectedItems/selectedItemsSlice';
import Card from '../card/Card';
import styles from './CardList.module.css';

interface CardListProps {
  people: Person[];
}

const CardList = ({ people }: CardListProps) => {
  const router = useRouter();
  const selectedItems = useAppSelector(selectSelectedItems);
  const toggleSelection = useSelectedPerson();

  const handleCardClick = (url: string) => {
    if (!router.isReady) {
      console.error('Router is not ready');
      return;
    }

    const id = url.split('/').filter(Boolean).pop();

    if (!id) {
      console.error('Invalid ID extracted from URL:', url);
      return;
    }

    router.push(`/details/${id}`).catch((error) => {
      console.error('Navigation error:', error);
    });
  };

  return (
    <div className={styles['card-list']}>
      {people.map((person) => (
        <Card
          key={person.url}
          person={person}
          isSelected={selectedItems.some(
            (item: { url: string }) => item.url === person.url
          )}
          onSelect={() => toggleSelection(person)}
          onClick={() => handleCardClick(person.url)}
        />
      ))}
    </div>
  );
};

export default CardList;
