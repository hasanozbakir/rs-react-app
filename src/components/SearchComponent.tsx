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
  error: string | null;  
  throwError: boolean;
}

class SearchComponent extends Component<{}, SearchComponentState> {
  constructor(props: {}) {
    super(props);

    // Initialize state with the value from local storage (if it exists)
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';

    this.state = {
      inputValue: savedSearchTerm, 
      apiResponse: null,
      loading: false,
      error: null,
      throwError: false,
    };
  }

  handleInputChange = (value: string) => {
    this.setState({ inputValue: value });
    localStorage.setItem('searchTerm', value); 
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch(); 
    }
  };

  handleSearch = async () => {
    const { inputValue } = this.state;

    const searchTerm = inputValue.trim();

    this.setState({ loading: true });

    try {
      // If the input is empty, fetch all items (first page)
      const query = searchTerm ? `?search=${searchTerm}` : '?page=1';
      const data = await searchApi('people', query);
      this.setState({ apiResponse: data });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message });
      } else {
        this.setState({ error: 'An unknown error occurred.' });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  simulateError = () => {
    this.setState({ throwError: true });
  };

  render() {
    const { inputValue, apiResponse, loading, error } = this.state;

    return (
      <div className="search-container">
        <SearchInput
          value={inputValue}
          onChange={this.handleInputChange} 
          onKeyDown={this.handleKeyDown}
        />
        <Button onClick={this.handleSearch}>Search</Button>

        <Button onClick={this.simulateError} throwError={this.state.throwError}>
          Throw Error
        </Button>

        {loading && <Spinner />}

        {error && <div className="error-message">{error}</div>}

        <ResponseDisplay apiResponse={apiResponse} loading={loading} />
      </div>
    )
  }
}

export default SearchComponent;