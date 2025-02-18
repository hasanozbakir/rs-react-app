import { useEffect } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import Flyout from '../components/Flyout';
import ErrorButton from '../components/ErrorButton.';
import Content from '../components/Content';
import { selectSearchTerm } from '../features/searchTerm/searchTermSlice';
import { selectCurrentPage } from '../features/pagination/paginationSlice';
import { usePeopleData } from '../app/usePeopleData';
import { useSearch } from '../app/useSearch';
import { useTheme } from '../utils/themeContext';
import styles from './Main.module.css';

const Main = () => {
  const [, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const searchTerm = useAppSelector(selectSearchTerm);
  const currentPage = useAppSelector(selectCurrentPage);
  const { handleSearch } = useSearch();
  const { data } = usePeopleData();

  useEffect(() => {
    setSearchParams({ search: searchTerm, page: currentPage.toString() });
  }, [searchTerm, currentPage, setSearchParams]);

  return (
    <>
      <h1>SWAPI API People Search</h1>
      <Search onSearch={handleSearch} />
      <div className={`${styles.main} ${styles[theme]}`}>
        <div className={styles['main-container']}>
          <Content />
          <Outlet />
        </div>
        {data && data.results.length > 0 && (
          <Pagination totalItems={data.count} />
        )}
        <Flyout />
        <ErrorButton />
      </div>
    </>
  );
};

export default Main;
