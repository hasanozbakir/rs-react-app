import { ApiResponse } from '../utils/types';

export const searchApi = async (
  endpoint: string,
  query: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`https://swapi.dev/api/${endpoint}/${query}`);

    // Check if the response status is in the 4xx or 5xx range
    if (!response.ok) {
      let errorMessage = 'An error occurred while fetching data.';
      if (response.status >= 400 && response.status < 500) {
        errorMessage =
          'Client error: Invalid request. Please check your input.';
      } else if (response.status >= 500) {
        errorMessage = 'Server error: Please try again later.';
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
