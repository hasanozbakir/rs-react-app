import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ControlledComponentPage from './pages/ControlledComponentPage';
import UncontrolledComponentPage from './pages/UseActionStateFormPage';
import UseActionStateFormPage from './pages/UseActionStateFormPage';
import NotFoundPage from './pages/NotFoundPage';
import Nav from './components/navbar/Nav';
import { ROUTES } from './utils/constants';
import './App.css';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path={ROUTES.HOME} element={<MainPage />} />
        <Route
          path={ROUTES.CONTROLLED_FORM}
          element={<ControlledComponentPage />}
        />
        <Route
          path={ROUTES.UNCONTROLLED_FORM}
          element={<UncontrolledComponentPage />}
        />
        <Route
          path={ROUTES.USE_ACTION_STATE_FORM}
          element={<UseActionStateFormPage />}
        />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
