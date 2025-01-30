import React, { Component } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  throwError?: boolean; 
}

class Button extends Component<ButtonProps> {
  render() {
    const { onClick, children, throwError } = this.props;

    if (throwError) {
      throw new Error('Test error in Button component');
    }

    return (
      <button onClick={onClick} className="search-btn">
        {children}
      </button>
    );
  }
}

export default Button;