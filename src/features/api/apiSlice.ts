import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Person, ApiResponse } from '../../utils/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<ApiResponse, { search: string; page: number }>({
      query: ({ search, page }) => `people?search=${search}&page=${page}`,
    }),
    getPerson: builder.query<Person, string>({
      query: (id: string) => `person/${id}`,
    }),
  }),
});

export const { useGetPersonQuery, useGetPeopleQuery } = apiSlice;
