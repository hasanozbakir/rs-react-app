import React, { Component } from 'react';
import SearchInput from './SearchInput';
import Button from './Button';
import ResponseDisplay from './ResponseDisplay';
import { searchApi } from '../services/apiResponse';

interface ApiResponse {
  results: { id: number; name: string }[];
}

interface SearchComponentState {
  inputValue: string;
  apiResponse: ApiResponse | null;
  loading: boolean;
}

class SearchComponent extends Component<{}, SearchComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      inputValue: '',
      apiResponse: null,
      loading: false,
    };
  }

  handleSearch = async () => {
    const { inputValue } = this.state;
    if (!inputValue) return;

    this.setState({ loading: true });

    try {
      const data = await searchApi(inputValue);
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
        <SearchInput value={inputValue} onChange={(value) => this.setState({ inputValue: value })} />
        <Button onClick={this.handleSearch}>Search</Button>
        <ResponseDisplay apiResponse={apiResponse} loading={loading} />
      </div>
    );
  }
}

export default SearchComponent;