import { useTheme } from '../../utils/themeContext';
import { Person } from '../../utils/types';
import { SelectedItem } from '../../features/selectedItems/selectedItemsSlice';
import styles from './Card.module.css';

interface CardProps {
  person: Person;
  isSelected: boolean;
  onSelect: (item: SelectedItem) => void;
  onClick: () => void;
}

const Card = ({ person, isSelected, onSelect, onClick }: CardProps) => {
  const { theme } = useTheme();
  const { url, name, birth_year, gender, height, mass } = person;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    onSelect({
      url,
      name,
      birth_year,
      gender,
      height,
      mass,
    });
  };

  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${styles[theme]}`}
      data-testid="card"
    >
      <input
        type="checkbox"
        aria-label={`Select ${person.name}`}
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
      <h2>Select {name}</h2>
      <h3>{name}</h3>
      <p>{birth_year}</p>
      <p>{gender}</p>
      <p
        aria-label={`${person.name} ${isSelected ? 'Selected' : 'Not Selected'}`}
      >
        {isSelected ? 'Selected' : 'Not Selected'}
      </p>
    </div>
  );
};

export default Card;
