/**
 * countBy(collection, iteratee?)
 * ------------------------------
 * Builds an object where each key is produced by applying `iteratee` to every element,
 * and the value is the count of times that key appears.
 *
 * Supports:
 *  - iteratee as a function
 *  - iteratee as a property name string (e.g., 'length')
 *  - iteratee omitted → defaults to identity (value itself)
 *
 * @param {Array|Object} collection - Array or object to iterate over
 * @param {Function|string} [iteratee] - Optional transform:
 *        - function(value) → key
 *        - string (property name) → value[property]
 *        - undefined → identity function (value itself)
 * @returns {Object} counts - Map of keys to their occurrence counts
 */
function countBy(collection, iteratee) {
  const result = {}; // Object to store counts

  // Handle null/undefined collection by returning an empty object
  if (collection == null) return result;

  let fn; // The function we'll use to generate keys

  // If iteratee is a string, create a property accessor function
  if (typeof iteratee === 'string') {
    const prop = iteratee;
    fn = (value) => (value != null ? value[prop] : undefined);

  // If iteratee is already a function, use it directly
  } else if (typeof iteratee === 'function') {
    fn = iteratee;

  // If iteratee is not provided, default to identity (returns the value itself)
  } else if (iteratee === undefined) {
    fn = (value) => value;

  // Any other type for iteratee is invalid
  } else {
    throw new TypeError('countBy: iteratee must be a function, string, or omitted');
  }

  // Get iterable values:
  // - If collection is an array → use it directly
  // - If it's an object → use its values
  const iterable = Array.isArray(collection) ? collection : Object.values(collection);

  // Loop through each value in the collection
  for (let i = 0; i < iterable.length; i++) {
    const value = iterable[i];

    // Apply iteratee function to generate the key
    const key = fn(value);

    // Convert the key to string because JS object keys are always strings
    const keyStr = String(key);

    // Increment count for this key (or initialize to 1 if first occurrence)
    if (Object.prototype.hasOwnProperty.call(result, keyStr)) {
      result[keyStr]++;
    } else {
      result[keyStr] = 1;
    }
  }

  return result;
}

/* -------------------------
 * Example usage
 * ------------------------- */

// Example 1: Using a function as iteratee
console.log(countBy([6.1, 4.2, 6.3], Math.floor));
// { '4': 1, '6': 2 }

// Example 2: Using a property name string
console.log(countBy(['one', 'two', 'three'], 'length'));
// { '3': 2, '5': 1 }

// Example 3: No iteratee → defaults to identity
console.log(countBy([6.1, 4.2, 6.3]));
// { '6.1': 1, '4.2': 1, '6.3': 1 }

// Example 4: Works with objects too
console.log(countBy({ a: 1, b: 2, c: 1 }));
// { '1': 2, '2': 1 }
