// import { FormValues } from './types';

import { FormState } from './types';

export const FILE_SIZE_LIMIT = 2 * 1024 * 1024;
export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', '.png'];

export const ROUTES = {
  HOME: '/',
  CONTROLLED_FORM: '/react-hook-form',
  UNCONTROLLED_FORM: '/uncontrolled-form',
  NOT_FOUND: '*',
};

export const initialState: FormState = {
  data: {
    form: [],
    ref: [],
  },
  lastAddedId: null,
};

// export const initialState: FormValues = {
//   name: '',
//   age: 0,
//   email: '',
//   password: '',
//   confirmPassword: '',
//   gender: '',
//   termsAccepted: false,
//   picture: '',
//   country: '',
// };
