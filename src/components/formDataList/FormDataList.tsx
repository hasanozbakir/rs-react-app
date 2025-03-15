import { FormEntry } from '../../utils/types';

const FormDataList = ({
  data,
  highlightId,
}: {
  data: FormEntry[];
  highlightId: number | null;
}) => (
  <div>
    {data.map(({ id, name, email }: FormEntry) => (
      <div key={id} className={highlightId === id ? 'highlight' : ''}>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
      </div>
    ))}
  </div>
);

export default FormDataList;
