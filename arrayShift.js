/**
 * Problem Statement
 * -----------------
 * Implement a function `customShift` that mimics the behavior of
 * `Array.prototype.shift`.
 *
 * The `shift()` method:
 * 1. Removes the first element from an array
 * 2. Shifts all remaining elements one position to the left
 * 3. Decreases the array's length by 1
 * 4. Returns the removed element
 * 5. Mutates the original array
 * 6. Works on array-like objects
 *
 * Examples:
 *   const arr = [1, 2, 3];
 *   const first = arr.shift();
 *   // first === 1
 *   // arr === [2, 3]
 *
 * Edge cases:
 * - If the array is empty, return undefined
 * - If `this` is null or undefined, throw a TypeError
 * - Sparse arrays (holes) must be preserved correctly
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

// DO NOT CHANGE FUNCTION NAME
function customShift() {
  // Enforce strict mode to match native Array method behavior
  'use strict';

  /**
   * Step 0: Validate `this`
   * Native Array methods throw a TypeError when called on
   * null or undefined (e.g., Array.prototype.shift.call(null))
   */
  if (this == null) {
    throw new TypeError();
  }

  /**
   * Step 1: Convert `this` to an object
   * This allows the method to work with array-like objects
   * such as { 0: 'a', 1: 'b', length: 2 }
   */
  const arr = Object(this);

  /**
   * Step 2: Normalize length
   * `>>> 0` converts length into an unsigned 32-bit integer,
   * ensuring safe iteration even for invalid or missing lengths
   */
  const length = arr.length >>> 0;

  /**
   * Step 3: Handle empty array
   * If length is 0, nothing can be shifted
   */
    if (length === 0) {
        return undefined;
    }

  /**
   * Step 4: Store the first element
   * This value will be returned after shifting
   */
  const firstElement = arr[0];

  /**
   * Step 5: Shift elements to the left
   * Move each element at index `i` to index `i - 1`
   * If an index does not exist (sparse array),
   * delete the destination index to preserve holes
   */
  for (let i = 1; i < length; i++) {
    if (i in arr) {
      arr[i - 1] = arr[i];
    } else {
      delete arr[i - 1];
    }
  }

  /**
   * Step 6: Remove the last element
   * After shifting, the last index is duplicated and must be deleted
   */
  delete arr[length - 1];

  /**
   * Step 7: Update the length
   * Shifting reduces the array size by one
   */
  arr.length = length - 1;

  /**
   * Step 8: Return the removed first element
   */
  return firstElement;
}

// Attach the method to Array.prototype
Array.prototype.customShift = customShift;
