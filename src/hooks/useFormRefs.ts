import { useRef, createRef } from 'react';

export const useFormRefs = () => ({
  nameRef: useRef<HTMLInputElement>(null),
  ageRef: createRef<HTMLInputElement>(),
  emailRef: useRef<HTMLInputElement>(null),
  passwordRef: useRef<HTMLInputElement>(null),
  confirmPasswordRef: useRef<HTMLInputElement>(null),
  genderRef: useRef<HTMLSelectElement>(null),
  termsRef: useRef<HTMLInputElement>(null),
  pictureRef: useRef<HTMLInputElement>(null),
  countryRef: useRef<HTMLInputElement>(null),
  formRef: useRef<HTMLFormElement>(null),
});
