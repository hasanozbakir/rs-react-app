import React, { useState } from 'react';
import './Search.css';

interface SearchProps {
  onSearch: (term: string) => void;
  initialValue: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, initialValue }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue); // Use initialValue

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    onSearch(trimmedTerm);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for people..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;