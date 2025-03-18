import styles from './Sort.module.css';

interface SortProps {
  sortOption: string | null;
  setSortOption: (option: string | null) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

const Sort = ({
  sortOption,
  setSortOption,
  sortOrder,
  setSortOrder,
}: SortProps) => {
  return (
    <div className={styles['sort-option-container']}>
      <select
        className={styles['sort-select']}
        title="option-selected"
        value={sortOption || ''}
        onChange={(e) => setSortOption(e.target.value || null)}
      >
        <option value="">Sort by...</option>
        <option value="name">Name</option>
        <option value="population">Population</option>
      </select>
      <button
        className={styles['sort-btn']}
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        {sortOrder === 'asc' ? '⬆️' : '⬇️'}
      </button>
    </div>
  );
};

export default Sort;
