import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { useTheme } from './utils/themeContext';
import Main from './pages/Main';
import Details from './components/Details';
import NotFound from './pages/NotFound';
import ThemeButton from './components/ThemeButton';
import './App.css';

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <ErrorBoundary>
        <ThemeButton />
        <Router>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="details/:id" element={<Details />} />
            </Route>
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
