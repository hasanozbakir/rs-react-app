import { useRef } from 'react';

const UncontrolledComponentPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      termsAccepted: termsRef.current?.checked,
      picture: pictureRef.current?.files?.[0],
      country: countryRef.current?.value,
    };
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" ref={nameRef} required />

      <label htmlFor="age">Age:</label>
      <input type="number" id="age" ref={ageRef} required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" ref={emailRef} required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" ref={passwordRef} required />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        ref={confirmPasswordRef}
        required
      />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" ref={genderRef} required>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label>
        <input type="checkbox" ref={termsRef} required /> I accept the Terms &
        Conditions
      </label>

      <label htmlFor="picture">Upload Picture:</label>
      <input type="file" id="picture" ref={pictureRef} accept="image/*" />

      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        ref={countryRef}
        placeholder="Type to search..."
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledComponentPage;
