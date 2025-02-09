import React, { useState } from 'react';
import styles from './ErrorButton.module.css';

const ErrorButton: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test error thrown by ErrorButton');
  }

  return (
    <button type='button' className={styles.button} onClick={throwError}>
      Generate Error
    </button>
  );
};

export default ErrorButton;

// import React, { useState } from 'react';

// const ErrorButton: React.FC = () => {
//   const [hasError, setHasError] = useState(false);

//   const triggerError = () => {
//     setHasError(true);
//   };

//   if (hasError) {
//     throw new Error('Test error');
//   }

//   return (
//     <button type='button' className="error-button" onClick={triggerError}>
//       Throw Error
//     </button>
//   );
// };

// export default ErrorButton;