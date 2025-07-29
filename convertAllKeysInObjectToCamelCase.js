/**
 * Recursively converts all object keys to camelCase.
 * Handles nested objects and arrays.
 *
 * @param {*} input - Any input value (object, array, primitive).
 * @returns {*} - New structure with camelCased keys.
 */
function camelCaseKeys(input) {
  // If the input is an array, recursively convert keys of each item
  if (Array.isArray(input)) {
    return input.map(camelCaseKeys);
  }

  // If the input is a plain object (not null), convert all keys
  if (input !== null && typeof input === 'object') {
    const newObj = {};
    for (const [key, value] of Object.entries(input)) {
      const camelKey = toCamelCase(key);       // Convert key to camelCase
      newObj[camelKey] = camelCaseKeys(value); // Recursively process nested values
    }
    return newObj;
  }

  // If the input is a primitive (string, number, boolean, etc.), return as-is
  return input;
}

/**
 * Capitalizes the first character of a string.
 * Used to convert segments to PascalCase during camelCase conversion.
 *
 * @param {string} string - The string to capitalize.
 * @returns {string} - Capitalized string.
 */
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Converts a string with delimiters or special characters into camelCase.
 * Supports complex patterns such as:
 *   "total_questions" => "totalQuestions"
 *   "total questions" => "totalQuestions"
 *   "total+questions" => "totalQuestions"
 *   "total2+questions" => "total2Questions"
 *
 * @param {string} str - The input string to convert.
 * @returns {string} - Camel-cased string.
 */
function toCamelCase(str) {
  // Normalize to lowercase first
  let parsedString = str.toLowerCase();

  return parsedString
    // Find every word-like group after a non-alphabet character and capitalize it
    .replace(/(?<=[^a-zA-Z])([a-z]+)/g, (match, p0) => {
      return capitalize(p0);
    })
    // Remove all non-alphanumeric characters used as delimiters
    .replace(/[^a-zA-Z0-9]/g, '');
}
