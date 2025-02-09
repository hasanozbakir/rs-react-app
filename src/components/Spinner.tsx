import React from 'react';
import styles from './Spinner.module.css';

const Spinner: React.FC = () => {
  return <div className={styles.spinner}>
            <div className={styles['spinner-inner']}></div>
          </div>
};

export default Spinner;
