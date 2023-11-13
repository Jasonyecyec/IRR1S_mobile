// utils.js

export const containsGmail = (str) => {
  return str.includes("@gmail");
};

export const validatePassword = (password) => {
  let errors = "";
  let isValid = true;

  if (password.length < 8) {
    errors = "Must be at least 8 characters long. ";
    isValid = false;
  }
  if (!/[A-Z]/.test(password)) {
    errors = "Must contain at least one uppercase letter. ";
    isValid = false;
  }
  if (!/[0-9]/.test(password)) {
    errors = "Must contain at least one number. ";
    isValid = false;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors = "Must contain at least one special character. ";
    isValid = false;
  }

  return {
    isValid: isValid,
    errors: errors.trim(), // Remove any trailing whitespace
  };
};
