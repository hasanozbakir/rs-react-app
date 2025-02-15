import React from 'react';
import { Person } from '../utils/types';
import { useTheme } from '../App';
import styles from './Card.module.css';

interface CardProps {
  person: Person;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ person, onClick }) => {
  const { theme } = useTheme()
  return (
    <div onClick={onClick} data-testid="person-card" className={`${styles.card} ${styles[theme]}`}>
      <h3>{person.name}</h3>
      <p>{person.birth_year}</p>
      <p>{person.gender}</p>
    </div>
  );
};

export default Card;
