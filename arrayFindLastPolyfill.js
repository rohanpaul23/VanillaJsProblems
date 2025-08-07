/**
 * ✅ Problem Statement
 *
 * Implement a method `customFindLast` that mimics the behavior of `Array.prototype.findLast`.
 *
 * The `findLast()` method iterates the array **in reverse order** and returns the **value of the last element**
 * (i.e., nearest to the end) that satisfies the provided testing function.
 *
 * If no elements satisfy the function, it returns `undefined`.
 *
 * Syntax:
 *   array.customFindLast(callbackFn)
 *
 * Parameters:
 * - callbackFn (required): A function that takes:
 *     - element: current value
 *     - index: current index
 *     - array: the entire array
 *
 * Return:
 * - The value of the last matching element, or `undefined` if no match is found.
 */

function customFindLast(callback) {
  // DO NOT REMOVE
  'use strict';

  // Step 1: Validate `this` context
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.customFindLast called on null or undefined');
  }

  // Step 2: Validate that callback is a function
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }

  // Step 3: Convert `this` to object and ensure valid array-like length
  const list = Object(this);
  const length = list.length >>> 0; // Fix: use >>> 0 instead of >>> 32 to get 32-bit unsigned int

  // Step 4: Iterate backward from end to start
  for (let i = length - 1; i >= 0; i--) {
    if (i in list) {
      const value = list[i];

      // Step 5: Execute callback
      if (callback(value, i, list)) {
        return value; // Found match, return value
      }
    }
  }

  // Step 6: No match found
  return undefined;
}

// Step 7: Attach to Array prototype
Array.prototype.customFindLast = customFindLast;
