import { useEffect, useState } from 'react';
import { fetchCountries } from './utils/fetchCountries';
import './App.css';
import { Country } from './utils/types';

function App() {
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    fetchCountries().then((countries) => {
      if (countries && countries.length > 0) {
        setCountry(countries[0]);
      }
    });
  }, []);

  console.log(country);

  return <p>Performance Task</p>;
}

export default App;
