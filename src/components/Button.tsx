import React, { Component } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  throwError?: boolean;
  className?: string;
}

class Button extends Component<ButtonProps> {
  render() {
    const { onClick, children, throwError, className } = this.props;

    if (throwError) {
      throw new Error('Generated error in Button component');
    }

    return (
      <button onClick={onClick} className={className || 'search-btn'}>
        {children}
      </button>
    );
  }
}

export default Button;
