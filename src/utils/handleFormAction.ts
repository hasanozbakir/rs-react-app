import { processFormData } from './processFormData';
import { refSchema } from './refSchema';
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
  const result = await processFormData(refSchema, formData);

  if (result.success) {
    return { success: true, formData: result.formData };
  }

  return {
    success: false,
    errors: result.errors,
    fields: Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.toString()])
    ),
  };
}
