
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

/**
 * Converts an ISO date string or Date object to "YYYY-MM-DD" format
 * @param {string|Date} date - The date to format
 * @returns {string} - The formatted date string
 */
export const formatDateToYYYYMMDD = (date) => {
  if (!date) return "";

  // If it's not already a Date object, try converting it
  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return ""; // Invalid date
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


/**
 * Converts a date string in "YYYY-MM-DD" format to "Mon. DD, YYYY"
 * @param {string} dateString - The date string in "YYYY-MM-DD" format
 * @returns {string} - The formatted date string like "Aug. 21, 2025"
 */
export const formatDateToMonDDYYYY = (dateString) => {
  if (typeof dateString !== "string" || !dateString.trim()) {
    return "";
  }

  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) {
    return ""; // Invalid date
  }

  const months = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.",
    "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
  ];

  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return `${month} ${day}, ${year}`;
};


/**
 * Converts an ISO datetime string to a "time ago" format
 * @param {string|Date} date - The date to convert
 * @returns {string} - Relative time like "3 days ago"
 */
export const timeAgo = (date) => {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) {
    return ""; // Invalid date
  }

  const now = new Date();
  const seconds = Math.floor((now - dateObj) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return count === 1
        ? `${count} ${interval.label} ago`
        : `${count} ${interval.label}s ago`;
    }
  }

  return "just now";
};
