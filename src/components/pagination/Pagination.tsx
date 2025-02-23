import { useTheme } from '../../utils/themeContext';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCurrentPage,
  setCurrentPage,
  selectItemsPerPage,
} from '../../features/pagination/paginationSlice';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalItems: number;
}

const Pagination = ({ totalItems }: PaginationProps) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  const itemsPerPage = useAppSelector(selectItemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div
      className={`${styles.pagination} ${styles[theme]}`}
      data-testid="pagination"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
