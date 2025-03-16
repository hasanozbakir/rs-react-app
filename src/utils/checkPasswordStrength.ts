export const checkPasswordStrength = (password: string) => {
  let strengthLevel = '';
  const lengthCriteria = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strengthScore = [
    lengthCriteria,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  if (strengthScore === 2) strengthLevel = 'weak';
  else if (strengthScore === 3) strengthLevel = 'moderate';
  else if (strengthScore === 4) strengthLevel = 'good';
  else if (strengthScore === 5) strengthLevel = 'strong';

  return strengthLevel;
};
