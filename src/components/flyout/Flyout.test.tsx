import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Flyout from './Flyout';
import { clearSelectedItems } from '../../features/selectedItems/selectedItemsSlice';

const mockDispatch = vi.fn();
const mockUseSelector = vi.fn();

vi.mock('../../app/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => mockUseSelector(),
}));

describe('Flyout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when items are selected', () => {
    mockUseSelector.mockReturnValue([
      {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        height: '172',
        mass: '77',
        url: '#',
      },
    ]);

    render(<Flyout />);

    expect(screen.getByText('1 items selected')).toBeInTheDocument();
  });

  it('does not render when no items are selected', () => {
    mockUseSelector.mockReturnValue([]); // Ensure it returns an empty array

    render(<Flyout />);

    expect(screen.queryByText('items selected')).not.toBeInTheDocument();
  });

  it('dispatches clearSelectedItems when "Unselect All" is clicked', () => {
    mockUseSelector.mockReturnValue([
      {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        height: '172',
        mass: '77',
        url: '#',
      },
    ]);

    render(<Flyout />);

    fireEvent.click(screen.getByText('Unselect All'));

    expect(mockDispatch).toHaveBeenCalledWith(clearSelectedItems());
  });

  it('triggers CSV download and clears selection when "Download CSV" is clicked', () => {
    mockUseSelector.mockReturnValue([
      {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        height: '172',
        mass: '77',
        url: '#',
      },
    ]);

    render(<Flyout />);

    global.URL.createObjectURL = vi.fn(() => 'mocked-url');
    global.URL.revokeObjectURL = vi.fn();

    const anchor = document.createElement('a');
    anchor.click = vi.fn();
    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockImplementation((tag) => {
        if (tag === 'a') return anchor;
        return document.createElement(tag);
      });

    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    fireEvent.click(screen.getByText('Download CSV'));

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledWith(anchor);
    expect(removeChildSpy).toHaveBeenCalledWith(anchor);
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(clearSelectedItems());

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });
});
