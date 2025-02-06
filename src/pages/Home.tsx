import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import CardList from '../components/CardList';
import Spinner from '../components/Spinner';
import ErrorButton from '../components/ErrorButton';
import { ApiResponse, Person } from '../utils/types';
import useLocalStorage from '../hooks/useLocalStorage';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');
  const [results, setResults] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (term: string, page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${term}&page=${page}`);
        
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      
      setResults(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      setError('');
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Search onSearch={handleSearch} initialValue={searchTerm} /> 
      {loading && <Spinner />}
      {error && <div className="error">{error}</div>}
      <CardList
        results={results}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ErrorButton />
    </div>
  );
};

export default Home;