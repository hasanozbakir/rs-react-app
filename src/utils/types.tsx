interface ApiResponse {
  count: number;
  next: string;
  previous: null;
  results: People[];
}

interface People {
  birth_year: string;
  eye_color: string;
  films: string[]; // URLs to films
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string; // URL to a planet
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[]; // URLs to species
  starships: string[]; // URLs to starships
  url: string;
  vehicles: string[]; // URLs to vehicles
}

export type { ApiResponse };
