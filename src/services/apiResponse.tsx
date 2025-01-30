import { ApiResponse } from '../utils/types';
  
export const searchApi = async (query: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};