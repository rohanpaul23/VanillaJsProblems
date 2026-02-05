/**
 * ------------------------------------------------------------
 * Problem Statement: Implement Array.prototype.fill
 * ------------------------------------------------------------
 *
 * Implement a function `customFill` that mimics the behavior of
 * JavaScript's built-in Array.prototype.fill method.
 *
 * The fill() method:
 * - Mutates the original array
 * - Replaces elements with a static value
 * - Works between a start index (inclusive) and an end index (exclusive)
 * - Returns the modified array
 *
 * Syntax:
 *   arr.fill(value)
 *   arr.fill(value, start)
 *   arr.fill(value, start, end)
 *
 * Rules & Edge Cases:
 * 1. Default `start` = 0
 * 2. Default `end` = array.length
 * 3. Negative indices are allowed:
 *    - start < 0 → start = max(length + start, 0)
 *    - end < 0   → end   = max(length + end, 0)
 * 4. If start >= end → no changes
 * 5. Method must mutate `this` array
 * 6. Must return the same array
 *
 * Example:
 *   [1,2,3,4].fill(0, 1, 3) → [1,0,0,4]
 */

// DO NOT CHANGE FUNCTION NAME
function customFill(value, start, end) {
  // DO NOT REMOVE
  'use strict';

  if(this === null) {
    throw new TypeError()
  }

  // Step 1: Convert `this` to an object (as native methods do)
  const arr = Object(this);
  const length = arr.length >>> 0; // ensure unsigned 32-bit integer

  // Step 2: Handle default values
  let startIndex = start === undefined ? 0 : start;
  let endIndex = end === undefined ? length : end;

  // Step 3: Normalize negative start index
  if (startIndex < 0) {
    startIndex = Math.max(length + startIndex, 0);
  } else {
    startIndex = Math.min(startIndex, length);
  }

  // Step 4: Normalize negative end index
  if (endIndex < 0) {
    endIndex = Math.max(length + endIndex, 0);
  } else {
    endIndex = Math.min(endIndex, length);
  }

  // Step 5: Fill values from startIndex → endIndex (exclusive)
  for (let i = startIndex; i < endIndex; i++) {
    arr[i] = value;
  }

  // Step 6: Return the mutated array
  return arr;
}

// Attach to Array prototype
Array.prototype.customFill = customFill;
