import { API_URL } from './constants';
import { Country } from './types';

export const fetchCountries = async (): Promise<Country[] | null> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    return null;
  }
};
