import styles from './Sort.module.css';

interface SortProps {
  sortOption: string | null;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortOrder: 'asc' | 'desc';
  toggleSortOrder: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Sort = ({
  sortOption,
  onSortChange,
  sortOrder,
  toggleSortOrder,
}: SortProps) => {
  return (
    <div className={styles['sort-option-container']}>
      <select
        className={styles['sort-select']}
        title="option-selected"
        value={sortOption || ''}
        onChange={onSortChange}
      >
        <option value="">Sort by...</option>
        <option value="name">Name</option>
        <option value="population">Population</option>
      </select>
      <button
        className={styles['sort-btn']}
        onClick={(e) => toggleSortOrder(e)}
      >
        {sortOrder === 'asc' ? '⬆️' : '⬇️'}
      </button>
    </div>
  );
};

export default Sort;
