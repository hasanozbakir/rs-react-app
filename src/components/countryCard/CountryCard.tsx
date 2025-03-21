import { memo } from 'react';
import styles from './ContryCard.module.css';

interface CountryCardProps {
  name: string;
  population: number;
  region: string;
  flag: string;
  alt?: string;
  visitedCountries: string[];
  toggleVisited: (name: string) => void;
}

function CountryCard({
  name,
  population,
  region,
  flag,
  alt,
  visitedCountries,
  toggleVisited,
}: CountryCardProps) {
  const isVisited = visitedCountries.includes(name);

  return (
    <div
      className={`${styles['country-card']} ${isVisited ? styles['visited'] : ''}`}
    >
      <div className={styles['country-info']}>
        <h2>{name}</h2>
        <p>Population: {population.toLocaleString()}</p>
        <p>Region: {region}</p>
        <button onClick={() => toggleVisited(name)}>
          {isVisited ? 'Unmark Visited' : 'Mark as Visited'}
        </button>
      </div>
      <div className={styles['flag-container']}>
        <img src={flag} alt={alt || name} />
      </div>
    </div>
  );
}

export default memo(CountryCard);
