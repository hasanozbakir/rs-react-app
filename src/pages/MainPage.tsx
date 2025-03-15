import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../redux-store/hooks';
import FormDataList from '../components/formDataList/FormDataList';
import { RootState } from '../redux-store/store';

const Main = () => {
  const controlledData = useAppSelector(
    (state: RootState) => state.controlledForm
  );
  const uncontrolledData = useAppSelector(
    (state: RootState) => state.uncontrolledForm
  );

  const lastAddedId = useMemo(
    () => controlledData.lastAddedId ?? uncontrolledData.lastAddedId,
    [controlledData.lastAddedId, uncontrolledData.lastAddedId]
  );

  const [highlightId, setHighlightId] = useState<number | null>(null);

  useEffect(() => {
    if (lastAddedId) {
      setHighlightId(lastAddedId);
      const timeout = setTimeout(() => setHighlightId(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [lastAddedId]);

  return (
    <div>
      <h1>Main Page</h1>
      <div className="form-container">
        <FormDataList data={controlledData.data} highlightId={highlightId} />
        <FormDataList data={uncontrolledData.data} highlightId={highlightId} />
      </div>
    </div>
  );
};

export default Main;
