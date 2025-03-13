import { useAppSelector } from '../redux-store/hooks';

const Main = () => {
  const data = useAppSelector((state) => state.controlledForm.name);

  console.log('Main', data);

  return <h1>Main Page</h1>;
};

export default Main;
