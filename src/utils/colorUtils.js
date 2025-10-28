/**
 * Color utility functions
 */

/**
 * Convert hex color to rgba
 * @param {string} hex - Hex color code
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} RGBA color string
 */
export const hexToRgba = (hex, alpha = 1) => {
  if (!hex) return `rgba(0, 0, 0, ${alpha})`;
  
  const cleanHex = hex.replace("#", "");
  const fullHex = cleanHex.length === 3 
    ? cleanHex.split("").map((c) => c + c).join("") 
    : cleanHex;
  
  const bigint = parseInt(fullHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Get color tones for an event
 * @param {Object} event - Event object
 * @returns {Object} Object with solid and bg colors
 */
export const getEventColorTone = (event) => {
  const solid = event?.color || (event?.type === "etape" ? "#2563EB" : "#0EA5E9");
  return { 
    solid, 
    bg: hexToRgba(solid, 0.18) 
  };
};
