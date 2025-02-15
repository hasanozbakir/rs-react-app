import React, { useEffect, useState, useCallback  } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Person } from '../utils/types';
import Spinner from './Spinner';
import { useTheme } from '../App';
import styles from './Details.module.css';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [person, setPerson] = useState<Person | null>(location.state?.person || null);
  const [loading, setLoading] = useState(!location.state?.person);
  const { theme } = useTheme();

  const fetchPersonDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/people/${id}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch person details');
      }
      const result: Person = await response.json();
      setPerson(result);
    } catch (err) {
      console.error('Error fetching person details:', err);
      navigate('/not-found', { replace: true });
    } finally {
      setLoading(false);
    }
  }, [id, navigate]); 

  useEffect(() => {
    const shouldFetch = !person || (person.url && !person.url.includes(`/people/${id}/`));
    if (shouldFetch) {
      fetchPersonDetails();
    }
  }, [id, person, fetchPersonDetails]); 

  const handleClose = () => {
    navigate(-1);
  };

  if (!id) {
    navigate('/not-found', { replace: true });
    return null;
  }

  return (
    <div className={`${styles.panel} ${styles[theme]}`}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleClose}
      >
        Close
      </button>
      {loading ? (
        <Spinner />
      ) : person ? (
        <>
          <h2 className={styles.title}>{person.name}</h2>
          <div className={styles.details}>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
            <p>Gender: {person.gender}</p>
            <p>Birth Year: {person.birth_year}</p>
          </div>
        </>
      ) : (
        <p>No details available.</p>
      )}
    </div>
  );
};

export default Details;