import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux-store/hooks';
import FormDataList from '../components/formDataList/FormDataList';
import { RootState } from '../redux-store/store';
import '../App.css';

const Main = () => {
  const { form, ref } = useAppSelector((state: RootState) => state.form.data);
  const lastAddedId = useAppSelector(
    (state: RootState) => state.form.lastAddedId
  );

  const [highlightId, setHighlightId] = useState<string | null>(null);

  useEffect(() => {
    if (lastAddedId) {
      setHighlightId(lastAddedId);
      setTimeout(() => setHighlightId(null), 5000);
    }
  }, [lastAddedId]);

  return (
    <div className="main">
      <div className="form-container">
        <h1>Form Data</h1>
        <FormDataList data={form} highlightId={highlightId} />
      </div>

      <div className="form-container">
        <h1>Ref Data</h1>
        <FormDataList data={ref} highlightId={highlightId} />
      </div>
    </div>
  );
};

export default Main;

// import { useEffect, useState } from 'react';
// import { useAppSelector } from '../redux-store/hooks';
// import FormDataList from '../components/formDataList/FormDataList';
// import { RootState } from '../redux-store/store';
// import '../App.css';

// const Main = () => {
//   const formData = useAppSelector(
//     (state: RootState) => state.form
//   );
//   const lastAddedId = useAppSelector(
//     (state: RootState) => state.form.lastAddedId
//   );

//   const [highlightId, setHighlightId] = useState<string | null>(null);

//   useEffect(() => {
//     if (lastAddedId) {
//       setHighlightId(lastAddedId);
//       setTimeout(() => setHighlightId(null), 3000);
//     }
//   }, [lastAddedId]);

//   return (
//     <div>
//       <h1>RS Forms</h1>
//       <div className="form-container">
//         <FormDataList data={formData.data} highlightId={highlightId} />
//       </div>
//     </div>
//   );
// };

// export default Main;
