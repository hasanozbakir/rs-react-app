import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux-store/hooks';
import { RootState } from '../redux-store/store';
import { FormEntry } from '../features/controlledForm/controlledFormSlice';

const Main = () => {
  const controlledData = useAppSelector(
    (state: RootState) => state.controlledForm
  );
  const lastAddedId = useSelector(
    (state: RootState) => state.controlledForm.lastAddedId
  );
  const [highlightId, setHighlightId] = useState<number | null>(null);

  useEffect(() => {
    if (lastAddedId) {
      setHighlightId(lastAddedId);
      setTimeout(() => setHighlightId(null), 3000);
    }
  }, [lastAddedId]);

  console.log('Controlled Data:', controlledData);

  console.log('Main', controlledData);

  return (
    <div>
      <h1>Main Page</h1>
      <div className="form-tiles">
        {controlledData.data.map(
          ({ id, name, age, email, gender, country }: FormEntry) => (
            <div
              key={id}
              className={`tile ${highlightId === id ? 'highlight' : ''}`}
            >
              <p>Name: {name}</p>
              <p>Age: {age}</p>
              <p>Email: {email}</p>
              <p>Gender: {gender}</p>
              <p>Country: {country}</p>
              {/* Other form data */}
            </div>
          )
        )}
      </div>

      <style>{`
  .highlight { background-color: yellow; transition: background-color 1s ease-in-out; }
`}</style>
    </div>
  );
};

export default Main;
