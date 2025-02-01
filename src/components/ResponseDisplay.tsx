import { Component } from 'react';
import { ApiResponse } from '../utils/types';

interface ResponseDisplayProps {
  apiResponse: ApiResponse | null;
  loading: boolean;
}

class ResponseDisplay extends Component<ResponseDisplayProps> {
  render() {
    const { apiResponse, loading } = this.props;

    // Display loading message
    if (loading) {
      return <p className="loading">Loading...</p>;
    }

    // Handle null or undefined apiResponse
    if (!apiResponse || !apiResponse.results) {
      return null;
    }

    // Handle empty results
    if (apiResponse.results.length === 0) {
      return <p>No results found. Please try another search term.</p>;
    }

    // Display results
    return (
      <div className="response-container">
        <p className="list-title">
          <span>Name:</span>
          <span>Description:</span>
        </p>
        <ul>
          {apiResponse.results.map((result) => (
            <li key={result.url}>
              <span className="list-name">{result.name}</span>
              <span className="list-description">
                Born in {result.birth_year} with {result.eye_color} eyes
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ResponseDisplay;
