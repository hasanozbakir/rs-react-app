import { useState, useEffect } from 'react';
import {
  THEME_CONSTANT_LIGHT,
  THEME_CONSTANT_DARK,
} from '../utils/themeContext';

type Theme = typeof THEME_CONSTANT_LIGHT | typeof THEME_CONSTANT_DARK;

export const useClientSideTheme = (): [
  Theme,
  React.Dispatch<React.SetStateAction<Theme>>,
] => {
  const isBrowser = typeof window !== 'undefined';

  const [theme, setTheme] = useState<Theme>(() => {
    if (isBrowser) {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === THEME_CONSTANT_DARK
        ? THEME_CONSTANT_DARK
        : THEME_CONSTANT_LIGHT;
    }
    return THEME_CONSTANT_LIGHT;
  });

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'theme') {
        setTheme(
          event.newValue === THEME_CONSTANT_DARK
            ? THEME_CONSTANT_DARK
            : THEME_CONSTANT_LIGHT
        );
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isBrowser]);

  return [theme, setTheme];
};
