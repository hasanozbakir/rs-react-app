import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FormSchemaValues, FormValues } from '../../utils/types';
import { useEffect, useRef, useState } from 'react';
import { countries } from '../../data/countries';
import { forwardRef } from 'react';
import '../../App.css';

interface Props {
  control?: Control<FormSchemaValues>;
  name: keyof FormValues;
  errors?: FieldErrors<FormValues | FormSchemaValues>;
}

const CountryAutocomplete = forwardRef<HTMLInputElement, Props>(
  ({ control, name, errors }, ref) => {
    const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const internalRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (!control && internalRef.current) {
        internalRef.current.value = inputValue;
      }
    }, [inputValue, control]);

    const handleInputChange = (
      value: string,
      onChange?: (value: string) => void
    ) => {
      setInputValue(value);
      setFilteredCountries(
        countries.filter((country) =>
          country.toLowerCase().startsWith(value.toLowerCase())
        )
      );
      if (onChange) onChange(value);
    };

    const renderInput = (field?: {
      value?: string | number | boolean;
      onChange: (value: string) => void;
    }) => (
      <>
        <input
          ref={
            control
              ? undefined
              : (ref as React.RefObject<HTMLInputElement>) || internalRef
          }
          id={name}
          name={name}
          className="contry-list-container"
          list="country-list"
          value={typeof field?.value === 'string' ? field.value : inputValue}
          onChange={(e) => handleInputChange(e.target.value, field?.onChange)}
        />
        {inputValue.trim() !== '' && filteredCountries.length > 0 && (
          <ul className="country-list">
            {filteredCountries.map((country) => (
              <li
                className="country-name"
                key={country}
                onClick={() => {
                  setInputValue(country);
                  field?.onChange?.(country);
                  setFilteredCountries([]);
                }}
              >
                {country}
              </li>
            ))}
          </ul>
        )}
      </>
    );

    return (
      <div>
        <label htmlFor={name}>Country:</label>
        {control ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) =>
              renderInput({
                value:
                  typeof field.value === 'string' ||
                  typeof field.value === 'number' ||
                  typeof field.value === 'boolean'
                    ? field.value
                    : '',
                onChange: field.onChange,
              })
            }
          />
        ) : (
          renderInput()
        )}
        {errors && errors[name] && <p>{errors[name].message}</p>}
      </div>
    );
  }
);

CountryAutocomplete.displayName = 'CountryAutocomplete';

export default CountryAutocomplete;
