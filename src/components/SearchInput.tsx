import React, { Component } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

class SearchInput extends Component<SearchInputProps> {
  render() {
    const { value, onChange, onKeyDown } = this.props;
    return (
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="search-input"
      />
    );
  }
}

export default SearchInput;
