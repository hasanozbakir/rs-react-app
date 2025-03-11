import { useForm } from 'react-hook-form';
import { FormData } from '../utils/types';

const ControlledComponentPage = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        {...register('name', { required: 'Name is required' })}
      />
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        {...register('age', {
          required: 'Age is required',
          valueAsNumber: true,
        })}
      />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        {...register('email', { required: 'Email is required' })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        {...register('password', { required: 'Password is required' })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
        })}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <label htmlFor="gender">Gender:</label>
      <select
        id="gender"
        {...register('gender', { required: 'Gender is required' })}
      >
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <p>{errors.gender.message}</p>}

      <label>
        <input
          type="checkbox"
          {...register('termsAccepted', {
            required: 'You must accept the terms',
          })}
        />{' '}
        I accept the Terms & Conditions
      </label>
      {errors.termsAccepted && <p>{errors.termsAccepted.message}</p>}

      <label htmlFor="picture">Upload Picture:</label>
      <input
        type="file"
        id="picture"
        {...register('picture')}
        accept="image/*"
      />

      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        {...register('country', { required: 'Country is required' })}
        placeholder="Type to search..."
      />
      {errors.country && <p>{errors.country.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledComponentPage;
