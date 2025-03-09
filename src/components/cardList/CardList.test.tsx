import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CardList from './CardList';
import { Person } from '../../utils/types';
import { ThemeProvider } from '../themeProvider/ThemeProvider';

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    isReady: true,
  }),
}));

const mockToggleSelection = vi.fn();
vi.mock('../../redux-store/useSelectedPerson', () => ({
  useSelectedPerson: () => mockToggleSelection,
}));

const mockStore = configureStore({
  reducer: {
    selectedItems: () => ({
      selectedItems: [
        {
          url: 'https://swapi.dev/api/people/1/',
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          height: '172',
          mass: '77',
        },
      ],
    }),
  },
});

describe('CardList Component', () => {
  const mockPeople: Person[] = [
    {
      url: 'https://swapi.dev/api/people/1/',
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      height: '172',
      mass: '77',
      eye_color: '',
      films: [],
      hair_color: '',
      homeworld: '',
      skin_color: '',
      created: '',
      edited: '',
      species: [],
      starships: [],
      vehicles: [],
    },
    {
      url: 'https://swapi.dev/api/people/2/',
      name: 'Leia Organa',
      birth_year: '19BBY',
      gender: 'female',
      height: '150',
      mass: '49',
      eye_color: '',
      films: [],
      hair_color: '',
      homeworld: '',
      skin_color: '',
      created: '',
      edited: '',
      species: [],
      starships: [],
      vehicles: [],
    },
  ];

  it('renders the correct number of cards', () => {
    render(
      <ThemeProvider>
        <Provider store={mockStore}>
          <CardList people={mockPeople} />
        </Provider>
      </ThemeProvider>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockPeople.length);
  });

  it('passes the correct isSelected prop to each card', () => {
    render(
      <ThemeProvider>
        <Provider store={mockStore}>
          <CardList people={mockPeople} />
        </Provider>
      </ThemeProvider>
    );

    const lukeCard = screen.getByLabelText('Luke Skywalker Selected');
    const leiaCard = screen.getByLabelText('Leia Organa Not Selected');

    expect(lukeCard).toBeInTheDocument();
    expect(leiaCard).toBeInTheDocument();
  });

  it('calls toggleSelection when the select button is clicked', () => {
    render(
      <ThemeProvider>
        <Provider store={mockStore}>
          <CardList people={mockPeople} />
        </Provider>
      </ThemeProvider>
    );

    const selectButton = screen.getByLabelText('Select Luke Skywalker');
    fireEvent.click(selectButton);

    expect(mockToggleSelection).toHaveBeenCalledWith(mockPeople[0]);
  });
});
