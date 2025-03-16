import * as Yup from 'yup';
import { FILE_SIZE_LIMIT, SUPPORTED_FORMATS } from './constants';

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
      /[!@#$%^&*(),.?":{}|<>]/,
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
    .default(false)
    .transform((value) => (value === 'on' ? true : value))
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: Yup.mixed<FileList>()
    .test('fileRequired', 'File is required', (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return false;
      return true;
    })
    .test('fileSize', 'File size must be less than 2MB', (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return false;
      return value[0].size <= FILE_SIZE_LIMIT;
    })
    .test('fileType', 'Only PNG or JPEG files are allowed', (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return false;
      return SUPPORTED_FORMATS.includes(value[0].type);
    })

    .required('Picture is required'),
  country: Yup.string().default('').required('Country selection is required'),
});
