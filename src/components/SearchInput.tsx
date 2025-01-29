import React, { Component } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

class SearchInput extends Component<SearchInputProps> {
  render() {
    const { value, onChange } = this.props;
    return (
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    );
  }
}

export default SearchInput;