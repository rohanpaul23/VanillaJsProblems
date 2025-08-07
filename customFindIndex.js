/**
 * ✅ Problem Statement
 *
 * Implement a function `customFindIndex` that mimics the behavior of `Array.prototype.findIndex`.
 *
 * The `findIndex()` method returns the **index of the first element** in the array that satisfies
 * the provided testing function (`callback`). If no element matches, it returns `-1`.
 *
 * Syntax:
 *   array.customFindIndex(callbackFn)
 *   array.customFindIndex(callbackFn, thisArg)
 *
 * Parameters:
 * - `callback` (Function): A function to test each element. It is called with:
 *     - element: The current element in the array
 *     - index: The index of the current element
 *     - array: The full array
 * - `thisArg` (optional): Value to use as `this` inside `callbackFn`
 *
 * Return:
 * - The index of the first matching element, or `-1` if no element matches.
 */

function customFindIndex(callback, thisArg) {
  // DO NOT REMOVE
  'use strict';

  // Step 1: Check that `this` is not null or undefined
  if (this == null) {
    throw new TypeError('Array.prototype.customFindIndex called on null or undefined');
  }

  // Step 2: Ensure the callback is a function
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // Step 3: Convert `this` to an object and get valid length
  const list = Object(this);
  const length = list.length >>> 0; // 32-bit unsigned integer

  // Step 4: Loop through each element in the array
  for (let i = 0; i < length; i++) {
    // Skip sparse (missing) elements
    if (i in list) {
      const value = list[i];

      // Step 5: Call the callback with correct thisArg
      if (callback.call(thisArg, value, i, list)) {
        return i; // Found a match, return the index
      }
    }
  }

  // Step 6: No matching element found
  return -1;
}

// Step 7: Attach to Array.prototype
Array.prototype.customFindIndex = customFindIndex;
