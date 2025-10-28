/**
 * Date utility functions
 */

/**
 * Get current date in YYYY-MM-DD format (local timezone)
 * @returns {string} Date in YYYY-MM-DD format
 */
export const getLocalYMD = () => {
  const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
  return date.toISOString().slice(0, 10);
};

/**
 * Add days to a date string
 * @param {string} dateStr - Date in YYYY-MM-DD format
 * @param {number} days - Number of days to add
 * @returns {string} New date in YYYY-MM-DD format
 */
export const addDays = (dateStr, days) => {
  const date = new Date(dateStr + "T00:00:00");
  date.setDate(date.getDate() + days);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
};

/**
 * Compare two event dates (descending order)
 * @param {Object} a - First event
 * @param {Object} b - Second event
 * @returns {number} Comparison result
 */
export const compareEventsByDateDesc = (a, b) => {
  const dateA = String(a?.event_date ?? a?.date ?? "");
  const dateB = String(b?.event_date ?? b?.date ?? "");
  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
};
