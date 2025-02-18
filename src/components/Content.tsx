import CardList from './CardList';
import Spinner from './Spinner';
import { useNavigation } from '../utils/navigation';
import { usePeopleData } from '../app/usePeopleData';
import { useAppSelector } from '../app/hooks';
import { selectSelectedItems } from '../features/selectedItems/selectedItemsSlice';

const Content = () => {
  const { data, isLoading, isError } = usePeopleData();
  const { handlePersonClick } = useNavigation();
  const selectedItems = useAppSelector(selectSelectedItems);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Failed to fetch data. Please try again later.</p>;
  if (data?.results.length === 0) return <p>There is no one. Try again.</p>;

  return (
    <CardList
      people={data?.results || []}
      onPersonClick={handlePersonClick}
      selectedItems={selectedItems}
    />
  );
};

export default Content;
