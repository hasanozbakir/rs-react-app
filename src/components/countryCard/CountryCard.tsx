import { memo } from 'react';
import styles from './ContryCard.module.css';

interface CountryCardProps {
  name: string;
  population: number;
  region: string;
  flag: string;
  alt?: string;
}

function CountryCard({
  name,
  population,
  region,
  flag,
  alt,
}: CountryCardProps) {
  return (
    <div className={styles['country-card']}>
      <div className={styles['country-info']}>
        <h2>{name}</h2>
        <p>Population: {population.toLocaleString()}</p>
        <p>Region: {region}</p>
      </div>
      <div className={styles['flag-container']}>
        <img src={flag} alt={alt || name} />
      </div>
    </div>
  );
}

export default memo(CountryCard);
