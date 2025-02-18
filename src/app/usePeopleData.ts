import { useGetPeopleQuery } from '../features/api/apiSlice';
import { useAppSelector } from '../app/hooks';
import { selectSearchTerm } from '../features/searchTerm/searchTermSlice';
import { selectCurrentPage } from '../features/pagination/paginationSlice';

export const usePeopleData = () => {
  const searchTerm = useAppSelector(selectSearchTerm);
  const currentPage = useAppSelector(selectCurrentPage);

  const { data, isLoading, isError, error } = useGetPeopleQuery({
    search: searchTerm,
    page: currentPage,
  });

  return { data, isLoading, isError, error };
};
