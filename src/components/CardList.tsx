import React from 'react';
import Card from './Card';
import Pagination from './Pagination';
import { Person } from '../utils/types';
import './CardList.css'

interface CardListProps {
  results: Person[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CardList: React.FC<CardListProps> = ({ results, currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      {results.map((person) => (
        <Card key={person.url} person={person} />
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default CardList;