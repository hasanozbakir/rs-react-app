import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card';
import { Person } from '../../utils/types';

vi.mock('./Card.module.css', () => ({
  default: {
    card: 'card',
    light: 'light',
    dark: 'dark',
  },
}));

vi.mock('../../utils/themeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

const mockPerson: Person = {
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
};

describe('Card Component', () => {
  it('renders the person details correctly', () => {
    render(
      <Card
        person={mockPerson}
        isSelected={false}
        onSelect={vi.fn()}
        onClick={vi.fn()}
      />
    );

    expect(screen.getByText('Select Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  it('calls onClick when the card is clicked', () => {
    const onClickMock = vi.fn();
    render(
      <Card
        person={mockPerson}
        isSelected={false}
        onSelect={vi.fn()}
        onClick={onClickMock}
      />
    );

    fireEvent.click(screen.getByText('Select Luke Skywalker'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('calls onSelect when the checkbox is clicked', () => {
    const onSelectMock = vi.fn();
    render(
      <Card
        person={mockPerson}
        isSelected={false}
        onSelect={onSelectMock}
        onClick={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(onSelectMock).toHaveBeenCalledWith({
      url: mockPerson.url,
      name: mockPerson.name,
      birth_year: mockPerson.birth_year,
      gender: mockPerson.gender,
      height: mockPerson.height,
      mass: mockPerson.mass,
    });
  });

  it('renders with the correct theme class', () => {
    const { container } = render(
      <Card
        person={mockPerson}
        isSelected={false}
        onSelect={vi.fn()}
        onClick={vi.fn()}
      />
    );

    expect(container.firstChild).toHaveClass('light');
  });

  it('checkbox reflects the isSelected prop', () => {
    render(
      <Card
        person={mockPerson}
        isSelected={true}
        onSelect={vi.fn()}
        onClick={vi.fn()}
      />
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
