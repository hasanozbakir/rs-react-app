import React, { Component } from 'react';
import { ApiResponse } from '../utils/types';

interface ResponseDisplayProps {
  apiResponse: ApiResponse | null;
  loading: boolean;
}

class ResponseDisplay extends Component<ResponseDisplayProps> {
  render() {
    const { apiResponse, loading } = this.props;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!apiResponse || !apiResponse.results) {
      return null;
    }

    return (
      <div className="response-container">
          {apiResponse.results.length === 0 ? 
            <p>No results found. Please try another search term.</p>:
          <ul>
            <li>
              <span className='list-name'>Name:</span>
              <span className='list-description'>Description:</span>
            </li> 
          {apiResponse.results.map((result) => (   
            <li key={result.url}>
              <span className='list-name'>{result.name}</span>
              <span className='list-description'>
                Born in {result.birth_year} with {result.eye_color} eyes
              </span>
            </li>))}
          </ul>}
      </div>
    );
  }
}

export default ResponseDisplay;