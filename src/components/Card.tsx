import { Person } from '../utils/types';
import { SelectedItem } from '../features/selectedItems/selectedItemsSlice';
import { useTheme } from '../utils/themeContext';
import styles from './Card.module.css';

interface CardProps {
  person: Person;
  isSelected: boolean;
  onSelect: (item: SelectedItem) => void;
  onClick: () => void;
}

const Card = ({ person, isSelected, onSelect, onClick }: CardProps) => {
  const { theme } = useTheme();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onSelect({
      url: person.url,
      name: person.name,
      birth_year: person.birth_year,
      gender: person.gender,
      height: person.height,
      mass: person.mass,
    });
  };

  return (
    <div onClick={onClick} className={`${styles.card} ${styles[theme]}`}>
      <input
        type="checkbox"
        aria-label="chech-box"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
      <h2>Select {person.name}</h2>
      <h3>{person.name}</h3>
      <p>{person.birth_year}</p>
      <p>{person.gender}</p>
    </div>
  );
};

export default Card;
