import { memo } from 'react';
import { Country } from '../../utils/types';
import CountryCard from '../countryCard/CountryCard';
import styles from './CountryList.module.css';

interface CountryListProps {
  countries: Country[];
  visitedCountries: string[];
  toggleVisited: (name: string) => void;
}

const CountryList = ({
  countries,
  visitedCountries,
  toggleVisited,
}: CountryListProps) => {
  return (
    <div className={styles['list-container']}>
      {countries.map(({ name, population, region, flags }) => (
        <CountryCard
          visitedCountries={visitedCountries}
          toggleVisited={toggleVisited}
          key={name.common}
          name={name.common}
          population={population}
          region={region}
          flag={flags.png}
          alt={flags.alt}
        />
      ))}
    </div>
  );
};

export default memo(CountryList);
