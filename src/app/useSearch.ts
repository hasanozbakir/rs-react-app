import { useAppDispatch } from '../app/hooks';
import { setSearchTerm } from '../features/searchTerm/searchTermSlice';
import { setCurrentPage } from '../features/pagination/paginationSlice';

export const useSearch = () => {
  const dispatch = useAppDispatch();

  const handleSearch = (term: string, resetPage = true) => {
    dispatch(setSearchTerm(term));
    if (resetPage) {
      dispatch(setCurrentPage(1));
    }
  };

  return { handleSearch };
};
