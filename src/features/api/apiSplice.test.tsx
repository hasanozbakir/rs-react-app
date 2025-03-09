import { renderHook, waitFor } from '@testing-library/react';
import { useGetPersonQuery, useGetPeopleQuery } from './apiSlice';
import {
  allPeopleResults,
  testItemsPerPage,
  testTerm,
} from '../../mocks/testData';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('apiSlice', () => {
  it('should fetch people with search term and pagination', async () => {
    const { result } = renderHook(
      () => useGetPeopleQuery({ search: testTerm, page: 1 }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      count: allPeopleResults.filter((person) =>
        person.name.toLowerCase().includes(testTerm.toLowerCase())
      ).length,
      next: expect.any(String),
      previous: null,
      results: allPeopleResults
        .filter((person) =>
          person.name.toLowerCase().includes(testTerm.toLowerCase())
        )
        .slice(0, testItemsPerPage),
    });
  });

  it('should fetch a single person by id', async () => {
    const testPerson = allPeopleResults[0];
    const testId = testPerson.url.split('/').filter(Boolean).pop();

    const { result } = renderHook(() => useGetPersonQuery(testId ?? ''), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(testPerson);
  });

  it('should fetch a single person by id', async () => {
    const testPerson = allPeopleResults[0];
    const testId = testPerson.url.split('/').filter(Boolean).pop();

    const { result } = renderHook(() => useGetPersonQuery(testId ?? ''), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(testPerson);
  });

  it('should handle 404 error when fetching a non-existent person', async () => {
    const nonExistentId = '999';

    const { result } = renderHook(() => useGetPersonQuery(nonExistentId), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual({
      status: 404,
      data: null,
    });
  });
});
