/**
 * ✅ Problem Statement
 *
 * Implement a method `customFindLastIndex` that mimics the behavior of `Array.prototype.findLastIndex`.
 *
 * The `findLastIndex()` method iterates the array **in reverse order** and returns the **index of the last element**
 * (i.e., nearest to the end) that satisfies the provided testing function.
 * 
 * If no elements satisfy the function, it returns `-1`.
 *
 * Syntax:
 *   array.customFindLastIndex(callbackFn)
 *   array.customFindLastIndex(callbackFn, thisArg)
 *
 * Parameters:
 * - callbackFn (required): Function to execute on each element. It receives:
 *     - element: current item
 *     - index: current index
 *     - array: the full array
 * - thisArg (optional): Value to use as `this` inside callbackFn
 *
 * Return:
 * - Index of the last element that satisfies the test, or -1 if none do.
 */

function customFindLastIndex(callback, thisArg) {
  // DO NOT REMOVE
  'use strict';

  // Step 1: Check if `this` is valid
  if (this == null) {
    throw new TypeError('Array.prototype.customFindLastIndex called on null or undefined');
  }

  // Step 2: Convert to object
  const list = Object(this);
  const length = list.length >>> 0;

  // Step 3: Validate callback is a function
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // Step 4: Loop backwards through the array
  for (let i = length - 1; i >= 0; i--) {
    if (i in list) {
      // Execute callback with correct thisArg
      if (callback.call(thisArg, list[i], i, list)) {
        return i; // Found the matching element
      }
    }
  }

  // Step 5: No match found
  return -1;
}

// Attach to Array prototype
Array.prototype.customFindLastIndex = customFindLastIndex;
