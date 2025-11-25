/**
 * Problem Statement:
 * ------------------
 * Implement a function `transform` that flattens a nested object into a single-level object.
 * The flattened keys should be constructed by joining nested keys with an underscore (_).
 *
 * Requirements:
 * 1. If a value is another object (but not an array), flatten it recursively.
 * 2. Arrays and primitive values should remain as they are.
 * 3. Keys should be prefixed with their parent keys using underscores.
 * 4. Use `Object.assign` to merge results from recursive calls into the main result.
 *
 * Example:
 * Input:
 * {
 *   user: {
 *     name: "Alice",
 *     address: { city: "Paris", zip: 75000 }
 *   },
 *   isAdmin: true,
 *   tags: ["a", "b"]
 * }
 *
 * Output:
 * {
 *   user_name: "Alice",
 *   user_address_city: "Paris",
 *   user_address_zip: 75000,
 *   isAdmin: true,
 *   tags: ["a", "b"]
 * }
 */

function transform(collection, prefix = "") {
  const result = {};

  // Iterate over all own properties of the collection
  for (const key of Object.keys(collection)) {
    const value = collection[key];
    // Build the new flattened key (append prefix if available)
    const newKey = prefix ? `${prefix}_${key}` : key;

    // If value is a nested object (but not an array), recurse
    if (value && typeof value === "object" && !Array.isArray(value)) {
      // Merge the recursively flattened object into result
      Object.assign(result, transform(value, newKey));
    } else {
      // Otherwise, directly assign the value to the flattened key
      result[newKey] = value;
    }
  }

  // Return the fully flattened result
  return result;
}
