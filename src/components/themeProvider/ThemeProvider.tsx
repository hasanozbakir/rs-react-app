import React, { useState } from 'react';
import ThemeContext, {
  THEME_CONSTANT_DARK,
  THEME_CONSTANT_LIGHT,
} from '../../utils/themeContext';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme: string) =>
      prevTheme === THEME_CONSTANT_LIGHT
        ? THEME_CONSTANT_DARK
        : THEME_CONSTANT_LIGHT
    );
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
