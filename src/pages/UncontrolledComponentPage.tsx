import { useState } from 'react';
import { useFormRefs } from '../hooks/useFormRefs';
import { refSchema } from '../utils/refSchema';
import { getFormData } from '../data/getFormData';
import CountryAutocomplete from '../components/autocompletion/CountryAutocomplete';
import { processFormData } from '../utils/processFormData';
import { useAppDispatch } from '../redux-store/hooks';
import { setUncontrolledFormData } from '../features/uncontrolledForm/uncontrolledFormSlice';
import { FormValues } from '../utils/types';

const UncontrolledComponentPage = () => {
  const dispatch = useAppDispatch();
  const refs = useFormRefs();
  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    []
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors([]);

    const rawFormData = getFormData(refs);
    if (!rawFormData) {
      console.error('Error: getFormData returned undefined');
      return;
    }

    const result = await processFormData(refSchema, rawFormData);

    if (result.success) {
      dispatch(setUncontrolledFormData(result.formData as FormValues));
    } else {
      setErrors(
        Object.entries(result.errors ?? {}).map(([field, messages]) => ({
          field,
          message: Array.isArray(messages) ? messages[0] : 'Invalid input',
        }))
      );
    }
  };

  return (
    <form ref={refs.formRef} onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input ref={refs.nameRef} id="name" name="name" type="text" />
      <p>{errors.find((err) => err.field === 'name')?.message}</p>

      <label htmlFor="age">Age:</label>
      <input ref={refs.ageRef} id="age" name="age" type="number" />
      <p>{errors.find((err) => err.field === 'age')?.message}</p>

      <label htmlFor="email">Email:</label>
      <input ref={refs.emailRef} id="email" name="email" type="email" />
      <p>{errors.find((err) => err.field === 'email')?.message}</p>

      <label htmlFor="password">Password:</label>
      <input
        ref={refs.passwordRef}
        id="password"
        name="password"
        type="password"
      />
      <p>{errors.find((err) => err.field === 'password')?.message}</p>

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        ref={refs.confirmPasswordRef}
        id="confirmPassword"
        name="confirmPassword"
        type="password"
      />
      <p>{errors.find((err) => err.field === 'confirmedPassword')?.message}</p>

      <label>Gender:</label>
      <select ref={refs.genderRef} title="gender" name="gender">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <p>{errors.find((err) => err.field === 'gender')?.message}</p>

      <label>
        <input ref={refs.termsRef} type="checkbox" name="termsAccepted" />{' '}
        Accept Terms
      </label>
      <p>{errors.find((err) => err.field === 'termsAccepted')?.message}</p>

      <label htmlFor="picture">Upload Picture:</label>
      <input ref={refs.pictureRef} id="picture" name="picture" type="file" />
      <p>{errors.find((err) => err.field === 'picture')?.message}</p>

      <CountryAutocomplete ref={refs.countryRef} name="country" />
      <p>{errors.find((err) => err.field === 'country')?.message}</p>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledComponentPage;
