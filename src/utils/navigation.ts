import { useNavigate } from 'react-router-dom';
import { Person } from '../utils/types';

export const useNavigation = () => {
  const navigate = useNavigate();

  const handlePersonClick = (person: Person) => {
    const urlParts = person.url.split('/').filter(Boolean);
    const id = urlParts[urlParts.length - 1];

    navigate(`/details/${id}`, {
      state: {
        person,
        from: location.pathname + location.search,
      },
    });
  };

  return { handlePersonClick };
};
