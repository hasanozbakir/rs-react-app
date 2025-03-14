import * as Yup from 'yup';
import { refSchema } from './refSchema';
import { convertFileToBase64 } from './convertFileToBase64';
import { FormValues } from './types';

interface FormState {
  success: boolean;
  fields?: Record<string, unknown>;
  errors?: Record<string, string[]>;
  formData?: FormValues;
}

export async function handleFormAction(
  _previousState: FormState,
  payload: FormData
): Promise<FormState> {
  if (!(payload instanceof FormData)) {
    return {
      success: false,
      errors: { error: ['Invalid Form Data'] },
    };
  }

  const formData = Object.fromEntries(payload);
  let isValid: FormValues;
  let base64File: string = '';

  try {
    isValid = await refSchema.validate(formData, { abortEarly: false });
    if (isValid) {
      base64File = await convertFileToBase64(formData.picture as File);
      console.log(formData);
    }

    return {
      success: true,
      formData: {
        ...formData,
        picture: base64File,
      } as FormValues,
    };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors: Record<string, string[]> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = errors[err.path] || [];
          errors[err.path].push(err.message);
        }
      });

      const fields: Record<string, string> = {};
      for (const key of Object.keys(formData)) {
        fields[key] = formData[key].toString();
      }

      return {
        success: false,
        fields,
        errors,
      };
    }

    return {
      success: false,
      errors: { error: ['An unexpected error occurred'] },
    };
  }
}
