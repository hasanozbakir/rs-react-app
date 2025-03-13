import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .test(
      'first-uppercase',
      'Name must start with an uppercase letter',
      (value) => {
        return typeof value === 'string' && /^[A-Z]/.test(value);
      }
    ),
  age: Yup.number()
    .positive('Age must be a positive number')
    .integer('Age must be a whole number')
    .required('Age is required')
    .typeError('Age must be a number'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(
      /[!@#$%^&.,?_$*]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.mixed<'male' | 'female' | 'other' | ''>()
    .oneOf(['male', 'female', 'other'], 'Invalid gender')
    .required('Gender is required'),
  termsAccepted: Yup.boolean()
    .defined()
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: Yup.string().required('Picture is required'),
  country: Yup.string().required('Country selection is required'),
});
