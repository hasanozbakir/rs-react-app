import { memo } from 'react';
import { Country } from '../../utils/types';
import CountryCard from '../countryCard/CountryCard';
import styles from './CountryList.module.css';

interface CountryListProps {
  countries: Country[];
}

const CountryList = ({ countries }: CountryListProps) => {
  return (
    <div className={styles['list-container']}>
      {countries.map(({ name, population, region, flags }) => (
        <CountryCard
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
