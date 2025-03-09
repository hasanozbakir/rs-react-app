import { useRouter } from 'next/router';
import { useGetPersonQuery } from '@/features/api/apiSlice';
import { Person } from '../../utils/types';
import { useTheme } from '@/utils/themeContext';
import styles from './Details.module.css';

const Details = () => {
  const router = useRouter();
  const fromPage = '/';
  const { theme } = useTheme();
  const { id } = router.query as { id: string };

  const {
    data: freshData,
    isLoading,
    isError,
  } = useGetPersonQuery(id, {
    skip: !id,
  });
  const person: Person | undefined = freshData;

  if (!id) {
    router.replace('/not-found');
    return null;
  }

  const handleClose = () => {
    router.push(fromPage).catch((error) => {
      console.error('Navigation error:', error);
    });
  };

  return (
    <div className={`${styles.panel} ${styles[theme]}`} data-testid="details">
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleClose}
      >
        Close
      </button>
      <>
        <h2 className={styles.title}>{person?.name}</h2>
        <div className={styles.details}>
          <p>Height: {person?.height}</p>
          <p>Mass: {person?.mass}</p>
          <p>Gender: {person?.gender}</p>
          <p>Birth Year: {person?.birth_year}</p>
          <p>Hair Color: {person?.hair_color}</p>
          <p>Skin Color: {person?.skin_color}</p>
        </div>
      </>
    </div>
  );
};

export default Details;
