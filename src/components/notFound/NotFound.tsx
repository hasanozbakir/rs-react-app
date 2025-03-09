import { useRouter } from 'next/router';
import styles from './NotFound.module.css';
import { useTheme } from '../../utils/themeContext';

const NotFound = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/').catch((error) => {
      console.error('Navigation error:', error);
    });
  };

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <h1 className={styles.title}>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        type="button"
        className={styles['reload-button']}
        onClick={handleGoHome}
        data-testid="reload-button"
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default NotFound;
