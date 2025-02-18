import { useAppDispatch } from '../app/hooks';
import { setSearchTerm } from '../features/searchTerm/searchTermSlice';
import { setCurrentPage } from '../features/pagination/paginationSlice';

export const useSearch = () => {
  const dispatch = useAppDispatch();

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
    dispatch(setCurrentPage(1));
  };

  return { handleSearch };
};
