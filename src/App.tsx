import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ControlledComponentPage from './pages/ControlledComponentPage';
import UncontrolledComponentPage from './pages/UncontrolledComponentPage';
import NotFoundPage from "./pages/NotFoundPage";
import { ROUTES } from './utils/constants';
import './App.css';

function App() {
  return (
    <Router>
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
          path={ROUTES.NOT_FOUND}
          element={<NotFoundPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
