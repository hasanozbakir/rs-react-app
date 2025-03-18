import styles from './Search.module.css';

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const Search = ({ searchQuery, setSearchQuery }: SearchProps) => {
  return (
    <input
      className={styles['search-input']}
      type="text"
      placeholder="Search by name..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default Search;
