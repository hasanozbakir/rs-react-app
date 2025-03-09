import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Flyout from './Flyout';
import {
  clearSelectedItems,
  SelectedItem,
} from '../../features/selectedItems/selectedItemsSlice';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({ selectedItems: [] });

const mockDispatch = vi.fn();
const mockSelectedItems: SelectedItem[] = [
  {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    height: '172',
    mass: '77',
    url: '#',
  },
];

const mockUseSelector = vi.fn(() => mockSelectedItems);

vi.mock('../../redux-store/hooks.ts', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => mockUseSelector(),
}));

describe('Flyout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly when items are selected', async () => {
    mockUseSelector.mockReturnValue(mockSelectedItems);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const element = await screen.findByTestId('items-selected');
    expect(element.textContent?.trim()).toBe('1 items selected');
  });

  it('does not render when no items are selected', () => {
    mockUseSelector.mockReturnValue([]);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByTestId('items-selected')).not.toBeInTheDocument();
  });

  it('dispatches clearSelectedItems when "Unselect All" is clicked', () => {
    mockUseSelector.mockReturnValue(mockSelectedItems);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const unselectAllButton = screen.getByTestId('unselect-all-button');
    fireEvent.click(unselectAllButton);

    expect(mockDispatch).toHaveBeenCalledWith(clearSelectedItems());
  });

  it('triggers CSV download and clears selection when "Download CSV" is clicked', () => {
    mockUseSelector.mockReturnValue(mockSelectedItems);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    global.URL.createObjectURL = vi.fn(() => 'mocked-url');
    global.URL.revokeObjectURL = vi.fn();

    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    const downloadCsvButton = screen.getByTestId('download-csv-button');
    fireEvent.click(downloadCsvButton);

    expect(appendChildSpy).toHaveBeenCalledWith(expect.any(HTMLAnchorElement));
    expect(removeChildSpy).toHaveBeenCalledWith(expect.any(HTMLAnchorElement));

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();

    expect(mockDispatch).toHaveBeenCalledWith(clearSelectedItems());
  });

  it('should mock appendChild and removeChild', () => {
    const appendChildSpy = vi
      .spyOn(document.body, 'appendChild')
      .mockImplementation((el: Node) => el);
    const removeChildSpy = vi
      .spyOn(document.body, 'removeChild')
      .mockImplementation((el: Node) => el);

    const div = document.createElement('div');

    document.body.appendChild(div);
    document.body.removeChild(div);

    expect(appendChildSpy).toHaveBeenCalledWith(div);
    expect(removeChildSpy).toHaveBeenCalledWith(div);
  });
});
