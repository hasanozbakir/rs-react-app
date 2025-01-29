import React, { Component } from 'react';

interface ApiResponse {
  results: { id: number; name: string }[];
}

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

    if (!apiResponse) {
      return null;
    }

    return (
      <div className="response-container">
        <h2>Search Results:</h2>
        <ul>
          {apiResponse.results.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ResponseDisplay;