import React from 'react';
import { Person } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { extractIdFromUrl } from '../utils/helpers';
import './CardList.css'

interface CardProps {
  person: Person;
}

const Card: React.FC<CardProps> = ({ person }) => {
  const navigate = useNavigate();
  const personId = extractIdFromUrl(person.url);

  const handleClick = () => {
    if (personId) {
      navigate(`/details/${personId}`); 
    }
  };

  return (
    <div onClick={handleClick}>
      <h3>{person.name}</h3>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  );
};

export default Card;