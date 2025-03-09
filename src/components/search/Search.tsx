import useLocalStorage from '@/hooks/useLocalStorage';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [search, setSearch] = useLocalStorage('searchTerm', '');

  const handleSearch = () => {
    onSearch(search.trim());
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search for people"
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
