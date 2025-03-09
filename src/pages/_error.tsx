import { useRouter } from 'next/router';
import styles from './index.module.css';

const ErrorPage = ({ error }: { error: Error }) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/').catch((error) => {
      console.error('Navigation error:', error);
    });
  };

  return (
    <div className={styles['error-boundary']} data-testid="error-boundary">
      <h2>Something went wrong.</h2>
      <p data-testid="error-message">{error?.message}</p>
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

export default ErrorPage;
