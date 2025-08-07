/**
 * Adds a custom `.square()` method to all arrays.
 * This method squares each element, rounds it to 2 decimal places,
 * and returns a new array of the results.
 *
 * Example:
 * [0.1, -0.5, 2].square() ➞ [0.01, 0.25, 4.00]
 *
 * @returns {number[]} A new array with each element squared and rounded to 2 decimals.
 */
function square() {
  // Use Array.prototype.map to apply the transformation to each element
  return this.map((item) => {
    // Square the number, round to 2 decimal places using toFixed, and convert back to Number
    return Number((item * item).toFixed(2));
  });
}

// Attach the square function to Array prototype
Array.prototype.square = square;
