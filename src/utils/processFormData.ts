import * as Yup from 'yup';
import { convertFileToBase64 } from './convertFileToBase64';
import { FormValues } from './types';

export async function processFormData(
  schema: Yup.ObjectSchema<FormValues>,
  data: Record<string, unknown>
) {
  try {
    const validatedData = await schema.validate(data, { abortEarly: false });

    let base64File = '';
    if (validatedData.picture instanceof File) {
      base64File = await convertFileToBase64(validatedData.picture);
    }

    return {
      success: true,
      formData: { ...validatedData, picture: base64File },
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

      return {
        success: false,
        errors: error instanceof Yup.ValidationError ? errors : {},
      };
    }

    return {
      success: false,
      errors: { error: ['An unexpected error occurred'] },
    };
  }
}
