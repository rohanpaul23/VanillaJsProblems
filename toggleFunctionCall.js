/**
 * Problem Statement:
 * ------------------
 * Implement a `toggle` function that takes a non-empty array as input and returns a function (closure)
 * which cycles through the array elements in a clockwise (forward) direction on each invocation.
 *
 * Requirements:
 * - The input must be a valid array with at least one element.
 * - If the input is not an array or is empty, the function must throw a TypeError.
 * - The returned function should return the next item in the array each time it's called,
 *   and wrap back to the start after reaching the end (cyclic behavior).
 *
 * Example:
 * const toggled = toggle(['a', 'b', 'c']);
 * toggled(); // 'a'
 * toggled(); // 'b'
 * toggled(); // 'c'
 * toggled(); // 'a' (wraps around)
 */

function toggle(arr) {
  // ✅ Validate input: must be a non-null, non-empty array
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new TypeError("Input must be a non-empty array.");
  }

  // ✅ Private index to track current position
  let index = 0;

  // ✅ Return a function that cycles through the array values
  return function () {
    const value = arr[index];               // Get current value
    index = (index + 1) % arr.length;       // Increment index, wrap using modulo
    return value;                           // Return the value
  };
}
