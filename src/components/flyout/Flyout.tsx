import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearSelectedItems,
  selectSelectedItems,
} from '../../features/selectedItems/selectedItemsSlice';
import styles from './Flyout.module.css';

const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(selectSelectedItems);

  const handleDownload = () => {
    if (selectedItems.length === 0) return;

    const csvContent = [
      ['Name', 'Birth Year', 'Gender', 'Height', 'Mass', 'URL'],
      ...selectedItems.map((item) => [
        item.name,
        item.birth_year,
        item.gender,
        item.height,
        item.mass,
        item.url,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedItems.length}_people.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    dispatch(clearSelectedItems());
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className={styles.flyout}>
      <div className={styles['flyout-content']}>
        <span>{selectedItems.length} items selected</span>
        <div className={styles['flyout-actions']}>
          <button onClick={() => dispatch(clearSelectedItems())}>
            Unselect All
          </button>
          <button onClick={handleDownload}>Download CSV</button>
        </div>
      </div>
    </div>
  );
};

export default Flyout;
