import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FormValues } from '../../utils/types';
import { useState } from 'react';
import { countries } from '../../data/countries';

interface Props {
  control: Control<FormValues>;
  name: keyof FormValues;
  errors: FieldErrors<FormValues>;
}

const CountryAutocomplete = ({ control, name, errors }: Props) => {
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setFilteredCountries(
      countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <label htmlFor={name}>Country:</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              id={name}
              list="country-list"
              {...field}
              value={inputValue}
              onChange={(e) => {
                field.onChange(e.target.value);
                handleInputChange(e.target.value);
              }}
            />
            {filteredCountries.length > 0 && (
              <ul>
                {filteredCountries.map((country) => (
                  <li
                    key={country}
                    onClick={() => {
                      setInputValue(country);
                      field.onChange(country);
                      setFilteredCountries([]);
                    }}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      />
      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
};

export default CountryAutocomplete;
