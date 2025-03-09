import { useState, useEffect } from 'react';

export const useLocalSearchTerm = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const isBrowser = typeof window !== 'undefined';

  const [search, setSearch] = useState<string>(() => {
    if (isBrowser) {
      return localStorage.getItem('searchTerm') || '';
    }
    return '';
  });

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('searchTerm', search);
    }
  }, [search, isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'searchTerm') {
        setSearch(event.newValue || '');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isBrowser]);

  return [search, setSearch];
};
