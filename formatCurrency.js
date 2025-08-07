/**
 * ❓ Problem Statement:
 * Implement a function `format(n)` that takes a non-negative integer `n`
 * and returns a string with commas as thousand separators.
 *
 * For example:
 * format(123456789) ➞ "123,456,789"
 * format(123)       ➞ "123"
 *
 * ❗ Constraints:
 * - Input must be a number (not null/undefined/empty).
 * - Do not use regular expressions.
 * - Do not handle decimals or negative numbers in this version.
 */

/**
 * Formats a number with commas as thousand separators without using regex.
 *
 * @param {number} n - The input number to be formatted.
 * @returns {string} - Formatted number with commas.
 */
function format(n) {
  // Validate input: check if it's not a number or an empty string
  if (typeof n !== 'number' || isNaN(n) || n === '') {
    throw new TypeError('Input must be a valid number.');
  }

  // Convert number to string for processing
  const str = n.toString();
  const result = [];
  let count = 0;

  // Traverse the string from right to left
  for (let i = str.length - 1; i >= 0; i--) {
    result.push(str[i]); // Push the current digit
    count++;

    // Insert a comma after every 3 digits (not before the first digit)
    if (count % 3 === 0 && i !== 0) {
      result.push(',');
    }
  }

  // The digits and commas are in reverse order, so reverse them
  return result.reverse().join('');
}
