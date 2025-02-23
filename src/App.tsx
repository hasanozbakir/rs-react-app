import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './utils/routes';
import { useTheme } from './utils/themeContext';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import Main from './pages/main/Main';
import NotFound from './pages/notFound/NotFound';
import Details from './components/details/Details';
import ThemeButton from './components/themeButton/ThemeButton';
import './App.css';

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <ErrorBoundary>
        <ThemeButton />
        <Routes>
          <Route path={ROUTES.HOME} element={<Main />}>
            <Route path={ROUTES.DETAILS} element={<Details />} />
          </Route>
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
