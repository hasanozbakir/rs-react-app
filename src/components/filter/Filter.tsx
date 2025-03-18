import { regions } from '../../utils/constants';
import styles from './Filter.module.css';

interface FilterProps {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

const Filter = ({ selectedRegion, setSelectedRegion }: FilterProps) => {
  return (
    <select
      className={styles['region-select']}
      title="region-selected"
      value={selectedRegion}
      onChange={(e) => setSelectedRegion(e.target.value)}
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
