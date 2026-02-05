/**
 * ------------------------------------------------------------
 * Problem Statement: Invert an Object
 * ------------------------------------------------------------
 *
 * You are given a plain JavaScript object where:
 * - All keys are strings
 * - All values are strings
 *
 * Your task is to invert the object such that:
 * - Original values become keys
 * - Original keys become values
 *
 * Special Rules:
 * 1. If the input is null, undefined, or not an object → throw TypeError
 * 2. If multiple keys share the same value:
 *    - The first occurrence uses the value as-is
 *    - Subsequent duplicates must append `_<index>` to the key
 *      (index is the position of the key in Object.keys order)
 *
 * Example:
 * invert({ a: "x", b: "y", c: "x" })
 * → { x: "a", y: "b", x_2: "c" }
 *
 * Constraints:
 * - Do NOT change the function name
 * - Preserve insertion order using Object.keys
 */

// DO NOT CHANGE FUNCTION NAME
function invert(input) {
  // ❌ Reject invalid inputs:
  // - null or undefined
  // - non-object values (number, string, boolean, etc.)
  if (input == null || typeof input !== "object") {
    throw new TypeError("Invalid input");
  }

  // Result object that will store inverted key-value pairs
  const result = {};

  // Extract keys in insertion order
  const keys = Object.keys(input);

  // Iterate through each key using index
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    // Original value (guaranteed to be a string per problem spec)
    const value = input[key];

    // If this value already exists as a key in result,
    // append `_index` to make it unique
    const invertedKey = result.hasOwnProperty(value)
      ? `${value}_${i}`
      : value;

    // Invert:
    // - original value becomes key
    // - original key becomes value
    result[invertedKey] = key;
  }

  // Return the inverted object
  return result;
}
