import { FormData } from './types';

export const ROUTES = {
  HOME: '/',
  CONTROLLED_FORM: '/react-hook-form',
  UNCONTROLLED_FORM: '/uncontrolled-form',
  NOT_FOUND: '*',
};

export const initialState: FormData = {
  name: '',
  age: null,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  termsAccepted: false,
  picture: undefined,
  country: '',
};
