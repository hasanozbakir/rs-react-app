import {
  UseFormSetValue,
  UseFormSetError,
  UseFormClearErrors,
} from 'react-hook-form';

import { convertFileToBase64 } from './convertFileToBase64';
import { FILE_SIZE_LIMIT, SUPPORTED_FORMATS } from './constants';
import { FormValues } from './types';

export const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<FormValues>,
  setError: UseFormSetError<FormValues>,
  clearErrors: UseFormClearErrors<FormValues>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (file.size > FILE_SIZE_LIMIT) {
    setError('picture', { message: 'File size exceeds the limit' });
    return;
  }

  if (!SUPPORTED_FORMATS.includes(file.type)) {
    setError('picture', { message: 'Unsupported file format' });
    return;
  }

  try {
    const base64String = await convertFileToBase64(file);
    setValue('picture', base64String);
    clearErrors('picture');
  } catch (error) {
    console.log(error);
    setError('picture', { message: 'Error processing file' });
  }
};
