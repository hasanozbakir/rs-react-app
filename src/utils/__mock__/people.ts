import { Person } from '../types';

export const mockPeople: Person[] = [
  {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
  },
  {
    name: 'Leia Organa',
    birth_year: '19BBY',
    gender: 'female',
    url: 'https://swapi.dev/api/people/5/',
    height: '150',
    mass: '49',
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'brown',
    homeworld: 'https://swapi.dev/api/planets/2/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-10T15:20:09.791000Z',
    edited: '2014-12-20T21:17:50.315000Z',
  },
];

export const emptyMockPeople: Person[] = [];
