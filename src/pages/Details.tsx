import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Person } from '../utils/types';
import Spinner from '../components/Spinner';
import styles from './Details.module.css';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [person, setPerson] = useState<Person | null>(location.state?.person || null);
  const [loading, setLoading] = useState(!location.state?.person);

  useEffect(() => {
    // if (!person) {
    //   fetchPersonDetails();
    // }
    if (!person || person.url.split('/').slice(-2, -1)[0] !== id) {
      fetchPersonDetails();
    }
  }, [id]);

  const fetchPersonDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/people/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch person details');
      }
      const result: Person = await response.json();
      setPerson(result);
    } catch (err) {
      console.error('Error fetching person details:', err);
      navigate('/not-found');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate(-1); 
  };

  return (
    <div className={styles.panel}>
      <button type='button' className={styles.closeButton} onClick={handleClose}>
        Close
      </button>
      {loading ? (
        <Spinner />
      ) : person ? (
        <>
          <h2 className={styles.title}>{person.name}</h2>
          <p>Height: {person.height}</p>
          <p>Mass: {person.mass}</p>
          <p>Gender: {person.gender}</p>
          <p>Birth Year: {person.birth_year}</p>
        </>
      ) : (
        <p>No details available.</p>
      )}
    </div>
  );
};

export default Details;












// import React from 'react';
// import { Person } from '../utils/types';

// interface DetailsProps {
//   person: Person;
//   onClose: () => void;
// }

// const Details: React.FC<DetailsProps> = ({ person, onClose }) => {
//   return (
//     <div>
//       <button type='button' onClick={onClose} >
//         Close
//       </button>
//       <h2>{person.name}</h2>
//       <p>Height: {person.height}</p>
//       <p>Mass: {person.mass}</p>
//       <p>Gender: {person.gender}</p>
//       <p>Birth Year: {person.birth_year}</p>
//     </div>
//   );
// };

// export default Details;