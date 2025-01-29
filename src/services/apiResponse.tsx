interface ApiResponse {
    results: { id: number; name: string }[];
  }
  
  export const searchApi = async (query: string): Promise<ApiResponse> => {
    try {
      const response = await fetch(`https://api.example.com/search?query=${query}`);
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