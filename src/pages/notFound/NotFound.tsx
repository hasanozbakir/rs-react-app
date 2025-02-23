import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        type="button"
        onClick={() => (window.location.href = '/')}
        className={styles.button}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
