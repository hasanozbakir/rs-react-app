import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux-store/hooks';
import { setControlledFormData } from '../features/controlledForm/controlledFormSlice';
import { formSchema } from '../utils/formSchema';
import { FormValues } from '../utils/types';
import { handleFileChange } from '../utils/handleFileChange';
import CountryAutocomplete from '../components/autocompletion/CountryAutocomplete';

const ControlledComponentPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const handleFormSubmit = async (data: FormValues) => {
    dispatch(setControlledFormData(data));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="name">Name:</label>
      <input id="name" {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="age">Age:</label>
      <input id="age" type="number" {...register('age')} />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="email">Email:</label>
      <input id="email" type="email" {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password:</label>
      <input id="password" type="password" {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        id="confirmPassword"
        type="password"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <label htmlFor="gender">Gender:</label>
      <select id="gender" {...register('gender')}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <p>{errors.gender.message}</p>}

      <label htmlFor="termsAccepted">
        <input type="checkbox" {...register('termsAccepted')} />
        Accept Terms and Conditions
      </label>
      {errors.termsAccepted && <p>{errors.termsAccepted.message}</p>}

      <label htmlFor="picture">Upload Picture:</label>
      <input
        id="picture"
        type="file"
        accept="image/png, image/jpeg"
        onChange={(event) =>
          handleFileChange(event, setValue, setError, clearErrors)
        }
      />
      {errors.picture && <p>{errors.picture.message}</p>}

      <CountryAutocomplete control={control} name="country" errors={errors} />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ControlledComponentPage;
