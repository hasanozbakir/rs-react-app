import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import CountryList from './components/countryList/CountryList';
import Filter from './components/filter/Filter';
import Search from './components/search/Search';
import Sort from './components/sort/Sort';
import { Country } from './utils/types';
import { API_URL } from './utils/constants';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortOption, setSortOption] = useState<'name' | 'population' | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch countries');

        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(
        (country) =>
          selectedRegion === 'All' || country.region === selectedRegion
      )
      .sort((a, b) => {
        if (!sortOption) return 0;
        const valueA = sortOption === 'name' ? a.name.common : a.population;
        const valueB = sortOption === 'name' ? b.name.common : b.population;

        if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [countries, searchQuery, selectedRegion, sortOption, sortOrder]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedRegion(e.target.value);
    },
    []
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(e.target.value as 'name' | 'population' | null);
    },
    []
  );

  const toggleSortOrder = useCallback(() => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  }, []);

  if (isLoading) return <p className="loading">Loading countries...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="app-container">
      <h1>Country Explorer App</h1>
      <div className="controls">
        <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <Filter
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
        />
        <Sort
          sortOption={sortOption}
          onSortChange={handleSortChange}
          sortOrder={sortOrder}
          toggleSortOrder={toggleSortOrder}
        />
      </div>
      <CountryList countries={filteredCountries} />
    </div>
  );
}

export default App;
