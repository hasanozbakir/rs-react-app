interface FormValues {
  picture: File | string;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other' | '';
  termsAccepted: boolean;
  country: string;
}

interface FormSchemaValues {
  picture: FileList;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other' | '';
  termsAccepted: boolean;
  country: string;
}

interface FormEntry extends FormValues {
  id: number;
}

interface FormState {
  data: FormEntry[];
  lastAddedId: number | null;
}

export type { FormValues, FormSchemaValues, FormEntry, FormState };
