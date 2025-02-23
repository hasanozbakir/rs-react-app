import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinner} data-testid="spinner">
      <div
        className={styles['spinner-inner']}
        data-testid="spinner-inner"
      ></div>
    </div>
  );
};

export default Spinner;
