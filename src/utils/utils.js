
/**
 * Validates if an email address is in a valid format
 * @param {string} email - The email address to validate
 * @returns {boolean} - Returns true if email is valid, false otherwise
 */
export const isValidEmail = (email) => {
  // Check if email is a string and not empty
  if (typeof email !== 'string' || !email.trim()) {
    return false;
  }

  // RFC 5322 compliant email regex pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Test the email against the regex
  return emailRegex.test(email.trim());
}


/**
 * Validates if a password meets minimum requirements
 * @param {string} password - The password to validate
 * @returns {boolean} - Returns true if password is valid, false otherwise
 */
export const isValidPassword = (password) => {
  // Check if password is a string and not empty
  if (typeof password !== 'string' || !password.trim()) {
    return false;
  }

  // Check if password is at least 8 characters long
  return password.length >= 8;
}