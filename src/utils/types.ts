interface FormData {
  name: string;
  age: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  picture?: string;
  country: string;
}

export type { FormData };
