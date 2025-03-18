export interface Country {
  name: Record<string, unknown>;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean | null;
  status: string;
  unMember: boolean;
  currencies: Record<string, unknown>;
  idd: Record<string, unknown>;
  capital: string[];
  altSpellings: string[];
  region: string;
  languages: Record<string, string>;
  translations: Record<string, Record<string, string>>;
  latlng: [number, number];
  landlocked: boolean;
  area: number;
  demonyms: Record<string, Record<string, string>>;
  flag: string;
  maps: Record<string, string>;
  population: number;
  car: Record<string, unknown>;
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  coatOfArms: Record<string, string>;
  startOfWeek: string;
  capitalInfo: Record<string, unknown>;
}
