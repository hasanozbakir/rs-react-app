import React, { Component } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

class Button extends Component<ButtonProps> {
  render() {
    const { onClick, children } = this.props;
    return (
      <button onClick={onClick} className="search-button">
        {children}
      </button>
    );
  }
}

export default Button;