import { addDays } from "../utils/dateUtils";

/**
 * Recompute template plan dates based on first date
 * @param {string} firstDate - First date in YYYY-MM-DD format
 * @param {Array} plan - Array of template steps
 * @returns {Array} Updated plan with computed dates
 */
export const recomputePlanFromFirst = (firstDate, plan) => {
  if (!firstDate || !Array.isArray(plan)) return plan || [];

  return plan.map((step, index) => {
    if (index === 0) {
      return { ...step, date: firstDate };
    }
    
    const daysToAdd = Number(step?.duree || 0);
    return { 
      ...step, 
      date: addDays(firstDate, daysToAdd) 
    };
  });
};
