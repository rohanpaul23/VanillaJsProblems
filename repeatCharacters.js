/**
 * Problem Statement:
 * ------------------
 * You are given an array `collection`.
 *
 * Your task is to create a new array containing only the elements
 * at EVEN indices (0, 2, 4, ...).
 *
 * For each element at an even index `i`, repeat the element
 * exactly `(i + 1)` times and push the result into the output array.
 *
 * Rules & Edge Cases:
 * - Odd-indexed elements must be ignored.
 * - If the input array is empty, return an empty array.
 * - If no argument is passed, treat it as an empty array.
 * - Calling `.repeat()` on non-string values should naturally throw an error.
 * - Empty strings should be handled without errors.
 *
 * Example:
 * getRepeatedArray(['a', 'b', 'c', 'd', 'e'])
 * → ['a', 'ccc', 'eeeee']
 */

// do not change function name
function getRepeatedArray(collection) {
  // If no argument is passed, default to an empty array
  collection = collection ?? [];

  const res = [];

  // Iterate only over even indices by incrementing i by 2
  for (let i = 0; i < collection.length; i += 2) {
    // Repeat count is based on index:
    // index 0 → 1 time
    // index 2 → 3 times
    // index 4 → 5 times
    const repeatCount = i + 1;

    // String.prototype.repeat is intentionally used directly
    // This will throw an error automatically if the value is not a string
    res.push(collection[i].repeat(repeatCount));
  }

  // Return the resulting array of repeated strings
  return res;
}
