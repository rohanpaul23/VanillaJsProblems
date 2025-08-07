/**
 * ✅ Problem Statement
 *
 * Implement a method `customFind` that mimics the behavior of `Array.prototype.find`.
 *
 * The `find()` method returns the **value of the first element** in the array that satisfies
 * the provided testing function (`callback`). If no element satisfies the condition, `undefined` is returned.
 *
 * Syntax:
 *   array.customFind(callbackFn)
 *   array.customFind(callbackFn, thisArg)
 *
 * Parameters:
 * - `callback` (Function): A function that receives:
 *     - element: the current element
 *     - index: the current index
 *     - array: the entire array
 * - `thisArg` (optional): Value to use as `this` inside the `callback`
 *
 * Returns:
 * - The first matching element's value, or `undefined` if no match is found.
 */

function customFind(callback, thisArg) {
  // DO NOT REMOVE
  'use strict';

  // Step 1: Validate `this` is not null or undefined
  if (this == null) {
    throw new TypeError('Array.prototype.customFind called on null or undefined');
  }

  // Step 2: Ensure callback is a function
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // Step 3: Convert array-like structure and get length
  const list = Object(this);
  const length = list.length >>> 0; // convert to 32-bit unsigned integer

  // Step 4: Iterate through the array
  for (let i = 0; i < length; i++) {
    // Step 4a: Skip holes in sparse arrays
    if (i in list) {
      const element = list[i];

      // Step 4b: Call callback with element, index, and array, binding `thisArg` as `this`
      if (callback.call(thisArg, element, i, list)) {
        return element; // Step 4c: If true, return the value
      }
    }
  }

  // Step 5: If no matching element found, return undefined
  return undefined;
}

// Step 6: Attach method to Array.prototype
Array.prototype.customFind = customFind;
