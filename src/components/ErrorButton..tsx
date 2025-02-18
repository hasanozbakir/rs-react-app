import { useState } from 'react';
import styles from './ErrorButton.module.css';

const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test error thrown by ErrorButton');
  }

  return (
    <button type="button" className={styles.button} onClick={throwError}>
      Generate Error
    </button>
  );
};

export default ErrorButton;
