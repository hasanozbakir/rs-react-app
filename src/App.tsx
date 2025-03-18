import { useState } from 'react';
import './App.css';
import CountryList from './components/countryList/CountryList';
import Filter from './components/filter/Filter';
import Search from './components/search/Search';
import Sort from './components/sort/Sort';
import { countries } from './data/countries';
import { Country } from './utils/types';

function App() {
  const data: Country[] = countries;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortOption, setSortOption] = useState<'name' | 'population' | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredCountries = () => {
    return data
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
  };

  const handleSortChange = (option: string | null) => {
    if (option === '' || option === null) {
      setSortOption(null);
    } else if (option === 'name' || option === 'population') {
      setSortOption(option);
    }
  };

  return (
    <div className="app-container">
      <h1>Country Explorer App</h1>
      <div className="controls">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Filter
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
        <Sort
          sortOption={sortOption}
          setSortOption={handleSortChange}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
      <CountryList countries={filteredCountries()} />
    </div>
  );
}

export default App;
