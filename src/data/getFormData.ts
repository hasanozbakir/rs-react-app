export const getFormData = (
  refs: ReturnType<typeof import('../hooks/useFormRefs').useFormRefs>
) => ({
  name: refs.nameRef.current?.value || '',
  age: refs.ageRef.current?.value
    ? Number(refs.ageRef.current.value)
    : undefined,
  email: refs.emailRef.current?.value || '',
  password: refs.passwordRef.current?.value || '',
  confirmPassword: refs.confirmPasswordRef.current?.value || '',
  gender: refs.genderRef.current?.value || '',
  termsAccepted: refs.termsRef.current?.checked || false,
  picture: refs.pictureRef.current?.files?.[0] || null,
  country: refs.countryRef.current?.value || '',
});
