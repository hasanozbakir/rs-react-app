import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux-store/hooks';
import CountryAutocomplete from '../components/autocompletion/CountryAutocomplete';
import { convertFileToBase64 } from '../utils/convertFileToBase64';
import { setControlledFormData } from '../features/controlledForm/controlledFormSlice';
import { FormSchemaValues } from '../utils/types';
import { formSchema } from '../utils/formSchema';
import { ROUTES } from '../utils/constants';

const ControlledComponentPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaValues>({
    resolver: yupResolver(formSchema),
  });

  const handleFormSubmit = async (data: FormSchemaValues) => {
    if (Object.keys(errors).length === 0) {
      const file = data.picture[0];
      try {
        const base64String = await convertFileToBase64(file);
        const updatedFormData = {
          ...getValues(),
          picture: base64String,
        };

        dispatch(setControlledFormData(updatedFormData));
        navigate(ROUTES.HOME);
      } catch (error) {
        console.log(error);
        setError('picture', { message: 'Error processing file' });
      }
    }
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
        type="file"
        accept="image/png, image/jpeg"
        {...register('picture')}
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
