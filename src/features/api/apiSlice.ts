import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/constants';

import type { Person, ApiResponse } from '../../utils/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL.replace(/\/$/, '') }),
  endpoints: (builder) => ({
    getPeople: builder.query<ApiResponse, { search: string; page: number }>({
      query: ({ search, page }) => `people/?search=${search}&page=${page}`,
    }),
    getPerson: builder.query<Person, string>({
      query: (id: string) => `people/${id}`,
    }),
  }),
});

export const { useGetPersonQuery, useGetPeopleQuery } = apiSlice;
