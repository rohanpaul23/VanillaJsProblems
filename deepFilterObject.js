/**
 * Problem Statement:
 * ------------------
 * Implement a function `filter` that takes a nested object and a callback function.
 * The callback should be invoked for every primitive value (string, number, boolean, null, undefined).
 * 
 * The function should return a new object with only those primitive values for which
 * the callback returns `true`. Nested objects should be filtered recursively.
 * 
 * Constraints:
 * - Skip any keys where the value is an empty object after filtering.
 * - Input can be a deeply nested object.
 * - Only primitives are passed to the callback.
 *
 * Syntax:
 * filter(collection, callback)
 *
 * @param {Object} collection - The object to filter (can be nested).
 * @param {Function} callback - A function that returns true/false for a given primitive value.
 * @returns {Object} - A new filtered object.
 */

function filter(collection, callback) {
  // Helper function to check if a value is a primitive
  function isPrimitive(val) {
    return val === null || (typeof val !== 'object' && typeof val !== 'function');
  }

  // Recursive function to apply filter on the object
  function recursiveFilter(obj) {
    const result = {};

    // Iterate over each key in the object
    for (const key in obj) {
      const value = obj[key];

      if (isPrimitive(value)) {
        // If value is primitive and passes callback, include it
        if (callback(value)) {
          result[key] = value;
        }
      } else if (typeof value === 'object' && value !== null) {
        // Recursively filter nested objects
        const filteredChild = recursiveFilter(value);

        // Include only non-empty filtered objects
        if (Object.keys(filteredChild).length > 0) {
          result[key] = filteredChild;
        }
      }
    }

    return result;
  }

  // Validate input type
  if (typeof collection !== 'object' || collection === null) {
    throw new TypeError('Expected a non-null object as the first argument');
  }

  // Begin filtering process
  return recursiveFilter(collection);
}

// ---------------------------------------------
// ✅ Example Usage
// ---------------------------------------------

const input = {
  name: 'Alice',
  age: 25,
  active: true,
  meta: {
    hobbies: ['reading', 'gaming'],
    verified: true,
    score: 42,
    social: {
      twitter: null,
      github: 'alice123'
    },
    emptyObj: {}
  }
};

// Filter all string values that contain letter "a"
const result = filter(input, val => typeof val === 'string' && val.includes('a'));

console.log("Filtered Result:");
console.log(JSON.stringify(result, null, 2));

/**
Expected Output:
{
  "name": "Alice",
  "meta": {
    "hobbies": [
      "reading",
      "gaming"
    ],
    "social": {
      "github": "alice123"
    }
  }
}
*/
