import React, { Component } from 'react';
import SearchInput from './SearchInput';
import Button from './Button';
import ResponseDisplay from './ResponseDisplay';
import Spinner from './loading/Spinner';
import { searchApi } from '../services/apiResponse';
import { ApiResponse } from '../utils/types';

interface SearchComponentState {
  inputValue: string;
  apiResponse: ApiResponse | null;
  loading: boolean;
}

class SearchComponent extends Component<{}, SearchComponentState> {
  constructor(props: {}) {
    super(props);

    // Initialize state with the value from local storage (if it exists)
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';

    this.state = {
      inputValue: savedSearchTerm, // Set initial value from local storage
      apiResponse: null,
      loading: false,
    };
  }

  // Save the search term to local storage whenever it changes
  handleInputChange = (value: string) => {
    this.setState({ inputValue: value });
    localStorage.setItem('searchTerm', value); // Save to local storage
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch(); // Trigger search on Enter key press
    }
  };

  handleSearch = async () => {
    const { inputValue } = this.state;

    // Trim the search term to remove trailing spaces
    const searchTerm = inputValue.trim();

    this.setState({ loading: true });

    try {
      // If the input is empty, fetch all items (first page)
      const query = searchTerm ? `?search=${searchTerm}` : '?page=1';
      const data = await searchApi(query);
      this.setState({ apiResponse: data });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { inputValue, apiResponse, loading } = this.state;

    return (
      <div className="search-container">
        <SearchInput
          value={inputValue}
          onChange={this.handleInputChange} 
          onKeyDown={this.handleKeyDown}
        />
        <Button onClick={this.handleSearch}>Search</Button>
        {loading && <Spinner />}
        <ResponseDisplay apiResponse={apiResponse} loading={loading} />
      </div>
    );
  }
}

export default SearchComponent;