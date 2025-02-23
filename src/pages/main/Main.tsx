import { useSearchParams, Outlet } from 'react-router-dom';
import { useTheme } from '../../utils/themeContext';
import { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useGetPeopleQuery } from '../../features/api/apiSlice';
import Search from '../../components/search/Search';
import Pagination from '../../components/pagination/Pagination';
import Flyout from '../../components/flyout/Flyout';
import ErrorButton from '../../components/errorButton/ErrorButton';
import CardList from '../../components/cardList/CardList';
import Spinner from '../../components/spinner/Spinner';
import { selectSearchTerm } from '../../features/searchTerm/searchTermSlice';
import { selectCurrentPage } from '../../features/pagination/paginationSlice';
import { useSearch } from '../../app/useSearch';
import styles from './Main.module.css';

const Main = () => {
  const [, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const searchTerm = useAppSelector(selectSearchTerm);
  const currentPage = useAppSelector(selectCurrentPage);
  const { handleSearch } = useSearch();

  const { data, isLoading, isError, isFetching, error } = useGetPeopleQuery(
    { search: searchTerm, page: currentPage },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const onSearch = (query: string) => {
    handleSearch(query);
  };

  useEffect(() => {
    setSearchParams({ search: searchTerm, page: currentPage.toString() });
  }, [searchTerm, currentPage, setSearchParams]);

  return (
    <div data-testid="main">
      <h1>SWAPI API People Search</h1>
      <Search onSearch={onSearch} />
      <div className={`${styles.main} ${styles[theme]}`}>
        <div className={styles['main-container']}>
          {(isLoading || isFetching) && <Spinner />}
          {isError && (
            <p>
              Error:{' '}
              {error && 'status' in error ? error.status : error?.message}
              <span>
                <p>Failed to fetch data. Please try again later.</p>
              </span>
            </p>
          )}
          {data?.results.length === 0 && <p>No results found.</p>}
          {data && data.results.length > 0 && (
            <CardList people={data.results} />
          )}
          <Outlet />
        </div>
        {data && data.results.length > 0 && (
          <Pagination totalItems={data.count} />
        )}
        <Flyout />
        <ErrorButton />
      </div>
    </div>
  );
};

export default Main;
