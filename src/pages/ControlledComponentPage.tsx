import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux-store/hooks';
import CountryAutocomplete from '../components/autocompletion/CountryAutocomplete';
import { convertFileToBase64 } from '../utils/convertFileToBase64';
import { addFormData } from '../features/form/formSlice';
import { FormSchemaValues } from '../utils/types';
import { formSchema } from '../utils/formSchema';
import { checkPasswordStrength } from '../utils/checkPasswordStrength';
import { ROUTES } from '../utils/constants';
import '../App.css';

const ControlledComponentPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [_, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const {
    control,
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useForm<FormSchemaValues>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
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

        dispatch(addFormData({ formData: updatedFormData, type: 'form' }));
        navigate(ROUTES.HOME);
      } catch (error) {
        console.log(error);
        setError('picture', { message: 'Error processing file' });
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(checkPasswordStrength(newPassword));
    setValue('password', newPassword, { shouldValidate: true });
  };

  const shouldDisableButton = isSubmitted && !isValid;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="name">Name:</label>
      <input id="name" {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}

      <CountryAutocomplete control={control} name="country" errors={errors} />

      <label htmlFor="age">Age:</label>
      <input id="age" type="number" {...register('age')} />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="email">Email:</label>
      <input id="email" type="email" {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        {...register('password')}
        onChange={handlePasswordChange}
      />

      <div className="strength-bar">
        <div className={`strength-level strength-${strength}`}></div>
      </div>

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

      <button type="submit" disabled={shouldDisableButton}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ControlledComponentPage;
