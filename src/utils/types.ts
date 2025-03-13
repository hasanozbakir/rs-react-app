interface FormValues {
  picture: string;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other' | '';
  termsAccepted: boolean;
  country: string;
}

export type { FormValues };
