import { FormEntry } from '../../utils/types';
import '../../App.css';

const FormDataList = ({
  data,
  highlightId,
}: {
  data: FormEntry[];
  highlightId: string | null;
}) => (
  <div className="list-container">
    {data.map(({ id, name, email, age, country, picture }: FormEntry) => (
      <div key={id} className={highlightId === id ? 'card highlight' : 'card'}>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Email: {email}</p>
        <p>Country: {country}</p>
        <img src={picture as Base64URLString} alt="image" />
      </div>
    ))}
  </div>
);

export default FormDataList;
