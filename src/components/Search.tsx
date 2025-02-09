import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchTerm}
        aria-label="Search for people"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type='button' onClick={handleSearch} className={styles.button}>Search</button>
    </div>
  );
};

export default Search;