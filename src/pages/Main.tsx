import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Outlet } from 'react-router-dom';
import Search from '../components/Search';
import CardList from '../components/CardList';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import ErrorButton from '../components/ErrorButton.';
import { ApiResponse, Person } from '../utils/types';
import styles from './Main.module.css';

const Main: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [searchTerm, page]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`);

      if (!response.ok) {
        if (response.status === 404) {
          navigate('/not-found');
          return;
        }
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (result.count === 0 || page > Math.ceil(result.count / 10)) {
        navigate('/not-found');
        return;
      }

      setData(result);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again later.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
    setSearchParams({ search: term, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ search: searchTerm, page: newPage.toString() });
  };

  const handlePersonClick = (person: Person) => {
    navigate(`details/${person.url.split('/').slice(-2, -1)[0]}`, { state: { person } });
  };

  return (
    <>
      <h1>SWAPI API People Search</h1>
      <Search onSearch={handleSearch} />
      <div className={styles.main}>
        <div className={styles['main-container']}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <p>{error}</p>
          ) : data?.results.length === 0 ? (
            <p>There is no one. Try again.</p>
          ) : (
            <CardList people={data?.results || []} onPersonClick={handlePersonClick} />
          )}
          <Outlet />
        </div>
          {data && data.results.length > 0 && (
            <Pagination currentPage={page} totalPages={Math.ceil(data.count / 10)} onPageChange={handlePageChange} />
          )}
          <ErrorButton /> 
      </div>
    </>
  );
};

export default Main;