import React, { useState } from 'react';

const ErrorButton: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  const triggerError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test error');
  }

  return (
    <button type='button' className="error-button" onClick={triggerError}>
      Throw Error
    </button>
  );
};

export default ErrorButton;