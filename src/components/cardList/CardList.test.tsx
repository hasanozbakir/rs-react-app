import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CardList from './CardList';
import { describe, it, expect } from 'vitest';
import { Person } from '../../utils/types';

vi.mock('../card/Card', () => ({
  default: vi.fn(({ person, isSelected, onSelect, onClick }) => (
    <div data-testid="card" onClick={() => onClick()}>
      {person.name} {isSelected ? 'Selected' : 'Not Selected'}
      <button onClick={() => onSelect(person)}>Select</button>
    </div>
  )),
}));

// Mock the useNavigation hook
const handlePersonClickMock = vi.fn();
vi.mock('../../utils/navigation', () => ({
  useNavigation: () => ({
    handlePersonClick: handlePersonClickMock,
  }),
}));

// Mock the useSelectedPerson hook
const toggleSelectionMock = vi.fn();
vi.mock('../../app/useSelectedPerson', () => ({
  useSelectedPerson: () => toggleSelectionMock,
}));

// Mock the Redux store
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
      <Provider store={mockStore}>
        <CardList people={mockPeople} />
      </Provider>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockPeople.length);
  });

  it('passes the correct isSelected prop to each card', () => {
    render(
      <Provider store={mockStore}>
        <CardList people={mockPeople} />
      </Provider>
    );

    const lukeCard = screen.getByText('Luke Skywalker Selected');
    const leiaCard = screen.getByText('Leia Organa Not Selected');

    expect(lukeCard).toBeInTheDocument();
    expect(leiaCard).toBeInTheDocument();
  });

  it('calls handlePersonClick when a card is clicked', () => {
    render(
      <Provider store={mockStore}>
        <CardList people={mockPeople} />
      </Provider>
    );

    const lukeCard = screen.getByText('Luke Skywalker Selected');
    fireEvent.click(lukeCard);

    expect(handlePersonClickMock).toHaveBeenCalledWith(mockPeople[0]);
  });

  it('calls toggleSelection when the select button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <CardList people={mockPeople} />
      </Provider>
    );

    const selectButton = screen.getAllByText('Select')[0];
    fireEvent.click(selectButton);

    expect(toggleSelectionMock).toHaveBeenCalledWith(mockPeople[0]);
  });
});
