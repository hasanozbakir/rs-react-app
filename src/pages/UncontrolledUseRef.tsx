// import { useRef, createRef } from 'react';
// // import { handleFormAction } from '../utils/handleFormAction';
// import CountryAutocomplete from '../components/autocompletion/CountryAutocomplete';
// // import { useAppDispatch } from '../redux-store/hooks';
// // import { setUncontrolledFormData } from '../features/uncontrolledForm/uncontrolledFormSlice';
// // import { FormValues } from '../utils/types';

// const UncontrolledComponentPage = () => {
// //   const dispatch = useAppDispatch();
// //   const [formState, formAction] = useActionState(handleFormAction, {
// //     success: false,
// //   });

//   const nameRef = useRef<HTMLInputElement>(null);
//   const ageRef = createRef<HTMLInputElement>();
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const confirmPasswordRef = useRef<HTMLInputElement>(null);
//   const genderRef = useRef<HTMLSelectElement>(null);
//   const termsRef = useRef<HTMLInputElement>(null);
//   const pictureRef = useRef<HTMLInputElement>(null);
//   const formRef = useRef<HTMLFormElement>(null);

// //   useEffect(() => {
// //     if (formState.success) {
// //       dispatch(setUncontrolledFormData(formState?.formData as FormValues));
// //     }
// //   }, [formState, dispatch]);

//   const handleFocus = () => {
//     nameRef.current?.focus();
//   };

//   return (
//     <form ref={formRef} action={formAction}>
//       <label htmlFor="name">Name:</label>
//       <input ref={nameRef} id="name" name="name" type="text" />
//       {formState?.errors?.name && <p>{formState?.errors?.name}</p>}

//       <label htmlFor="age">Age:</label>
//       <input ref={ageRef} id="age" name="age" type="number" />
//       {formState?.errors?.age && <p>{formState?.errors?.age}</p>}

//       <label htmlFor="email">Email:</label>
//       <input ref={emailRef} id="email" name="email" type="email" />
//       {formState?.errors?.email && <p>{formState?.errors?.email}</p>}

//       <label htmlFor="password">Password:</label>
//       <input ref={passwordRef} id="password" name="password" type="password" />
//       {formState?.errors?.password && <p>{formState?.errors?.password}</p>}

//       <label htmlFor="confirmPassword">Confirm Password:</label>
//       <input ref={confirmPasswordRef} id="confirmPassword" name="confirmPassword" type="password" />
//       {formState?.errors?.confirmedPassword && <p>{formState?.errors?.confirmedPassword}</p>}

//       <label>Gender:</label>
//       <select ref={genderRef} title="gender" name="gender">
//         <option value="">Select Gender</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>
//       {formState?.errors?.gender && <p>{formState?.errors?.gender}</p>}

//       <label>
//         <input ref={termsRef} type="checkbox" name="termsAccepted" /> Accept Terms
//       </label>
//       {formState?.errors?.termsAccepted && <p>{formState?.errors?.termsAccepted}</p>}

//       <label htmlFor="picture">Upload Picture:</label>
//       <input ref={pictureRef} id="picture" name="picture" type="file" />
//       {formState?.errors?.picture && <p>{formState?.errors?.picture}</p>}

//       {/* Using forwardRef for CountryAutocomplete */}
//       <CountryAutocomplete ref={genderRef} name="country" />
//       {formState?.errors?.country && <p>{formState?.errors?.country}</p>}

//       <button type="submit">Submit</button>
//       <button type="button" onClick={handleFocus}>Focus Name</button>
//     </form>
//   );
// };

// export default UncontrolledComponentPage;
