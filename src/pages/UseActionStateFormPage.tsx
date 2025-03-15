import { useActionState, useEffect } from 'react';
import { handleFormAction } from '../utils/handleFormAction';
import CountryAutocomplete from '../components/autocompletion/CountryAutocomplete';
import { useAppDispatch } from '../redux-store/hooks';
import { setUncontrolledFormData } from '../features/uncontrolledForm/uncontrolledFormSlice';
import { FormValues } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const UseActionStateFormPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formState, formAction] = useActionState(handleFormAction, {
    success: false,
  });
  console.log('state', formState?.formData?.picture);
  useEffect(() => {
    if (formState.success) {
      dispatch(setUncontrolledFormData(formState?.formData as FormValues));
      navigate(ROUTES.HOME);
    }
  }, [formState, dispatch, navigate]);

  return (
    <form action={formAction}>
      <label htmlFor="name">Name:</label>
      <input id="name" name="name" type="text" />
      {formState?.errors?.name && <p>{formState?.errors?.name}</p>}

      <label htmlFor="age">Age:</label>
      <input id="age" name="age" type="number" />
      {formState?.errors?.age && <p>{formState?.errors?.age}</p>}

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" />
      {formState?.errors?.email && <p>{formState?.errors?.email}</p>}

      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" />
      {formState?.errors?.password && <p>{formState?.errors?.password}</p>}

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input id="confirmPassword" name="confirmPassword" type="password" />
      {formState?.errors?.confirmedPassword && (
        <p>{formState?.errors?.confirmedPassword}</p>
      )}

      <label>Gender:</label>
      <select title="gender" name="gender">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {formState?.errors?.gender && <p>{formState?.errors?.gender}</p>}

      <label>
        <input type="checkbox" name="termsAccepted" /> Accept Terms
      </label>
      {formState?.errors?.termsAccepted && (
        <p>{formState?.errors?.termsAccepted}</p>
      )}

      <label htmlFor="picture">Upload Picture:</label>
      <input id="picture" name="picture" type="file" />
      {formState?.errors?.picture && <p>{formState?.errors?.picture}</p>}

      <CountryAutocomplete name="country" />
      {formState?.errors?.country && <p>{formState?.errors?.country}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default UseActionStateFormPage;
