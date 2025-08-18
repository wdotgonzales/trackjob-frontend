
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

/**
 * Converts date and time strings into ISO 8601 PH (Asia/Manila) format
 * @param {string} date - Date string in "MM/DD/YYYY" format
 * @param {string} time - Time string in "hh:mm AM/PM" format
 * @returns {string} - ISO string like "2025-10-17T22:43:00+08:00"
 */
export const convertToPHISOString = (date, time) => {
  if (!date || !time) return "";

  try {
    // Parse date parts
    const [month, day, year] = date.split("/").map(Number);

    // Parse time parts
    const timeMatch = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
    if (!timeMatch) return "";

    let [, hour, minute, period] = timeMatch;
    hour = Number(hour);
    minute = Number(minute);

    // Convert to 24-hour format
    if (period.toUpperCase() === "PM" && hour !== 12) {
      hour += 12;
    }
    if (period.toUpperCase() === "AM" && hour === 12) {
      hour = 0;
    }

    // Create a Date object in Asia/Manila time
    const dateInPH = new Date(Date.UTC(year, month - 1, day, hour - 8, minute, 0));

    // Format to ISO with PH offset (+08:00)
    const pad = (n) => String(n).padStart(2, "0");
    return (
      `${dateInPH.getUTCFullYear()}-` +
      `${pad(dateInPH.getUTCMonth() + 1)}-` +
      `${pad(dateInPH.getUTCDate())}T` +
      `${pad(dateInPH.getUTCHours() + 8)}:` +
      `${pad(dateInPH.getUTCMinutes())}:00+08:00`
    );
  } catch {
    return "";
  }
};


/**
 * Converts an ISO datetime string to "Mon. DD, YYYY, hh:mm AM/PM" format in PH time (UTC+8)
 * @param {string|Date} isoString - The ISO datetime string (e.g., "2025-08-17T09:05:00.000Z")
 * @returns {string} - Formatted date like "Aug. 17, 2025, 05:05 PM"
 */
export const formatISOToReadablePH = (isoString) => {
  if (!isoString) return "";

  try {
    const dateObj = isoString instanceof Date ? isoString : new Date(isoString);
    if (isNaN(dateObj.getTime())) return "";

    // Force to Asia/Manila
    const options = {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    // Use Intl for correct PH conversion
    const formatter = new Intl.DateTimeFormat("en-PH", options);
    const parts = formatter.formatToParts(dateObj);

    const month = parts.find(p => p.type === "month")?.value.replace(".", "") + ".";
    const day = parts.find(p => p.type === "day")?.value;
    const year = parts.find(p => p.type === "year")?.value;
    const hour = parts.find(p => p.type === "hour")?.value.padStart(2, "0");
    const minute = parts.find(p => p.type === "minute")?.value;
    const period = parts.find(p => p.type === "dayPeriod")?.value.toUpperCase();

    return `${month} ${day}, ${year}, ${hour}:${minute} ${period}`;
  } catch {
    return "";
  }
};

