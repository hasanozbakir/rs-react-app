import { GetServerSidePropsResult } from 'next';
import { ApiResponse } from './types';

interface FetchDataOptions {
  url: string;
  notFoundOnError?: boolean;
  search?: string;
  page?: number;
}

export const fetchPeopleData = async <T>({
  url,
  notFoundOnError = true,
  search = '',
  page = 1,
}: FetchDataOptions): Promise<
  GetServerSidePropsResult<{ [key: string]: any }>
> => {
  try {
    const apiUrl = `${url}?search=${search}&page=${page}`;
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: ApiResponse = await res.json();
    return {
      props: {
        data: data,
        count: data.count,
        people: data.results,
        isLoading: false,
        error: null,
      },
    };
  } catch (error) {
    if (notFoundOnError) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data: null,
        count: 0,
        people: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    };
  }
};
