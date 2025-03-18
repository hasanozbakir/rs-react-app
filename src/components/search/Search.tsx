import styles from './Search.module.css';

interface SearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ searchQuery, onSearchChange }: SearchProps) => {
  return (
    <input
      className={styles['search-input']}
      type="text"
      placeholder="Search by name..."
      value={searchQuery}
      onChange={onSearchChange}
    />
  );
};

export default Search;
