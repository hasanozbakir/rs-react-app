import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../utils/types';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPerson = async () => {
      setLoading(true);
      try {
        const apiUrl = `https://swapi.dev/api/people/${id}/`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format: Expected JSON');
        }

        const data: Person = await response.json();
        setPerson(data);
        setError('');
      } catch (err) {
        setError('Failed to fetch person details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPerson();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!person) return <div>No data found.</div>;

  return (
    <div>
      <h2>{person.name}</h2>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
      <p>Gender: {person.gender}</p>
    </div>
  );
};

export default Details;