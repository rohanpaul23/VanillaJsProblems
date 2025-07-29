/**
 * Merges the resolved values of multiple promises based on their common type.
 * Supports: number (sum), string (concat), boolean (AND), array (concat), object (merge).
 * Throws TypeError for mismatched or unsupported types (e.g., Set, Map, Date).
 *
 * @param  {...Promise} promises - Any number of input promises.
 * @returns {Promise<any>} - A single promise that resolves to the merged result.
 */
function promiseMerge(...promises) {
  // Wait for all promises to resolve
  return Promise.all(promises).then(results => {
    // Handle empty input case
    if (results.length === 0) return null;

    // Determine the type of the first resolved value
    const firstType = getType(results[0]);

    // Ensure all resolved values have the same type
    for (const val of results) {
      if (getType(val) !== firstType) {
        throw new TypeError("All resolved values must be of the same type");
      }
    }

    // Reject unsupported types
    if (!['number', 'string', 'boolean', 'array', 'object'].includes(firstType)) {
      throw new TypeError("Unsupported data type");
    }

    // Perform merging logic based on type
    switch (firstType) {
      case 'number':
        return results.reduce((a, b) => a + b, 0); // Sum of numbers

      case 'string':
        return results.join(''); // Concatenate strings

      case 'boolean':
        return results.every(Boolean); // Logical AND

      case 'array':
        return results.flat(); // Concatenate arrays

      case 'object':
        return Object.assign({}, ...results); // Merge objects
    }
  });
}

/**
 * Helper to determine the specific type of a value.
 * Distinguishes between array, plain object, set, map, date, etc.
 *
 * @param {*} val - The value to check.
 * @returns {string} - A normalized string representing the type.
 */
function getType(val) {
  if (Array.isArray(val)) return 'array'; // Handle arrays
  if (val === null) return 'null';        // Distinguish null
  if (val instanceof Set) return 'set';   // Special case: Set
  if (val instanceof Map) return 'map';   // Special case: Map
  if (val instanceof Date) return 'date'; // Special case: Date

  // Only treat plain objects as 'object'
  if (typeof val === 'object' && val.constructor === Object) return 'object';

  return typeof val; // string, number, boolean, undefined, etc.
}
