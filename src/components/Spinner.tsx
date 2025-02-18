import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles['spinner-inner']}></div>
    </div>
  );
};

export default Spinner;
