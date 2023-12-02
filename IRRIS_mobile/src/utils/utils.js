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

export const maskEmail = (email) => {
  const atIndex = email.indexOf("@");
  const dotIndex = email.lastIndexOf(".");

  if (atIndex !== -1 && dotIndex !== -1) {
    const username = email.slice(0, atIndex);
    const maskedUsername =
      username.length > 1
        ? `${username[0]}${"*".repeat(username.length - 2)}${username.slice(
            -1
          )}`
        : username;
    const domain = email.slice(atIndex, dotIndex);
    const maskedEmail = `${maskedUsername}${domain}${email.slice(dotIndex)}`;
    return maskedEmail;
  }

  return email; // Return the original email if '@' or '.' is not found
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};