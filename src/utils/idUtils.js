/**
 * ID generation utilities
 */

/**
 * Generate a unique ID using crypto-based randomness
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
};
