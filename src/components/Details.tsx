import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetPersonQuery } from '../features/api/apiSlice';
import Spinner from './Spinner';
import styles from './Details.module.css';
import { useTheme } from '../utils/themeContext';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const initialData = location.state?.person;
  const fromPage = location.state?.from || '/';

  const {
    data: freshData,
    isLoading,
    isError,
  } = useGetPersonQuery(id || '', {
    skip: !id,
  });

  const person = initialData || freshData;

  const handleClose = () => {
    navigate(fromPage);
  };

  if (!id) {
    navigate('/not-found', { replace: true });
    return null;
  }

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <button className={styles.closeButton} onClick={handleClose}>
        Close
      </button>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>Error loading details</p>
      ) : person ? (
        <>
          <h2 className={styles.title}>{person.name}</h2>
          <div className={styles.details}>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
            <p>Gender: {person.gender}</p>
            <p>Birth Year: {person.birth_year}</p>
            <p>Hair Color: {person.hair_color}</p>
            <p>Skin Color: {person.skin_color}</p>
          </div>
        </>
      ) : (
        <p>No details available</p>
      )}
    </div>
  );
};

export default Details;
