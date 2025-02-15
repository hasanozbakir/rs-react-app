import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Main from './pages/Main';
import Details from './components/Details';
import NotFound from './pages/NotFound';
import ThemeButton from './components/ThemeButton';
import './App.css'

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>('light'); 
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <div className={`app-container ${theme}`}>
    <ErrorBoundary>
      <ThemeContext.Provider value={value}>
        <ThemeButton />
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="details/:id" element={<Details />} />
            </Route>
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </ErrorBoundary>
    </div>
  );
};

export default App;
