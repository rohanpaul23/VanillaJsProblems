/**
 * ✅ Problem Statement
 *
 * Implement a function `customIncludes` that mimics the behavior of `Array.prototype.includes`.
 *
 * The includes() method determines whether an array includes a certain value among its entries,
 * returning true or false as appropriate.
 *
 * Syntax:
 *   arr.customIncludes(searchElement)
 *   arr.customIncludes(searchElement, fromIndex)
 *
 * Parameters:
 * - searchElement (required): The value to search for.
 * - fromIndex (optional): The index to begin searching from.
 *     - If negative, it's treated as `length + fromIndex`.
 *     - If resulting index is less than 0, it starts from 0.
 *
 * Return Value:
 * - true if the value is found, otherwise false.
 *
 * Edge Cases:
 * - Handles negative `fromIndex`
 * - Properly checks for `NaN` (since `NaN !== NaN`)
 */

function customIncludes(searchElement, fromIndex) {
  // DO NOT REMOVE
  'use strict';

  // Step 1: Handle undefined or negative fromIndex
  if (fromIndex) {
    if (fromIndex < 0) {
      // Negative index means count from the end
      fromIndex = this.length + fromIndex;
      // Clamp to zero if still negative
      fromIndex = fromIndex < 0 ? 0 : fromIndex;
    }
  } else {
    // Default to starting from index 0
    fromIndex = 0;
  }

  // Step 2: Loop from fromIndex to end of array
  for (let i = fromIndex; i < this.length; i++) {
    // Special case: NaN !== NaN, so we manually check for it
    if (searchElement !== searchElement && this[i] !== this[i]) {
      return true;
    }

    // Step 3: Regular strict equality match
    if (searchElement === this[i]) {
      return true;
    }
  }

  // Step 4: If not found, return false
  return false;
}

// Step 5: Attach customIncludes to Array prototype
Array.prototype.customIncludes = customIncludes;
