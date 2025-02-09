import React from 'react';
import Card from './Card';
import { Person } from '../utils/types';
import styles from './CardList.module.css';

interface CardListProps {
  people: Person[];
  onPersonClick: (person: Person) => void;
}

const CardList: React.FC<CardListProps> = ({ people, onPersonClick }) => {
  return (
    <div className={styles['card-list']}>
      {people.map((person) => (
        <Card
          key={person.url}
          person={person}
          onClick={() => onPersonClick(person)}
        />
      ))}
    </div>
  );
};

export default CardList;
