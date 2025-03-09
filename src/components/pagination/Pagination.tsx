import { useTheme } from '../../utils/themeContext';
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks';
import {
  setCurrentPage,
  selectItemsPerPage,
} from '../../features/pagination/paginationSlice';
import { useRouter } from 'next/router';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalItems: number;
}

const Pagination = ({ totalItems }: PaginationProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentPage: number = parseInt(router.query.page?.toString() || '1');
  const itemsPerPage = useAppSelector(selectItemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    router
      .push({
        pathname: '/',
        query: { ...router.query, page: page },
      })
      .catch((error) => {
        console.error('Navigation error:', error);
      });
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
