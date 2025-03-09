import { useTheme } from '../../utils/themeContext';
import Search from '../search/Search';
import Pagination from '../pagination/Pagination';
import Flyout from '../flyout/Flyout';
import CardList from '../cardList/CardList';
import Spinner from '../spinner/Spinner';
import { useEffect, useState } from 'react';
import { ApiResponse, Person } from '@/utils/types';
import styles from './MainLayout.module.css';
import { useGetPeopleQuery } from '@/features/api/apiSlice';
import { useAppSelector } from '@/redux-store/hooks';
import { useSearch } from '@/redux-store/useSearch';
import { selectCurrentPage } from '@/features/pagination/paginationSlice';
import { selectSearchTerm } from '@/features/searchTerm/searchTermSlice';
import { useLocalSearchTerm } from '@/hooks/useLocalSearchTerm';

interface MainLayoutProps {
  children?: React.ReactNode;
  serverData?: ApiResponse;
}

export default function MainLayout({ children, serverData }: MainLayoutProps) {
  const { theme } = useTheme();
  const [isSSR, setIsSSR] = useState(true);
  const [search, setSearch] = useLocalSearchTerm();
  const searchTerm = useAppSelector(selectSearchTerm);
  const currentPage = useAppSelector(selectCurrentPage);
  const { handleSearch } = useSearch();
  let queryData = serverData;

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const { data, isLoading, isError, isFetching, error } = useGetPeopleQuery(
    { search: searchTerm, page: currentPage },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const onSearch = (query: string) => {
    setSearch(query);
    handleSearch(query);
  };

  if (!isSSR) queryData = data;

  return (
    <div
      className={`${styles[theme]} ${styles['main-layout']}`}
      data-testid="main"
    >
      <h1>SWAPI API People Search</h1>
      <Search onSearch={onSearch} />
      <div className={styles.main}>
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
          {queryData?.results.length === 0 && <p>No results found.</p>}
          {queryData && queryData.results.length > 0 && (
            <CardList people={queryData.results} />
          )}
          {children}
        </div>
        {queryData && queryData.results.length > 0 && (
          <Pagination totalItems={queryData.count} />
        )}
        <Flyout />
      </div>
    </div>
  );
}
