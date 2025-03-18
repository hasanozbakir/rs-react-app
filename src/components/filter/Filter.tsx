import { regions } from '../../utils/constants';
import styles from './Filter.module.css';

interface FilterProps {
  selectedRegion: string;
  onRegionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter = ({ selectedRegion, onRegionChange }: FilterProps) => {
  return (
    <select
      className={styles['region-select']}
      title="region-selected"
      value={selectedRegion}
      onChange={onRegionChange}
    >
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
};

export default Filter;
