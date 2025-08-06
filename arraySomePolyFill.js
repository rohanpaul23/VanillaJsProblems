/**
 * ✅ Problem Statement
 * 
 * Implement a method called `customSome` that mimics the behavior of `Array.prototype.some`.
 * 
 * The `some()` method tests whether at least one element in the array passes the test
 * implemented by the provided callback function.
 * 
 * Requirements:
 * - Return `true` if the callback returns a truthy value for **any** element.
 * - Return `false` if the callback never returns a truthy value.
 * - Skip missing elements (i.e., sparse array holes).
 * - Must throw a `TypeError` if `this` is `null` or `undefined`.
 * - Must support array-like objects.
 * 
 * Do NOT use the built-in `Array.prototype.some`.
 */

function customSome(callback) {
  // DO NOT REMOVE
  'use strict';

  // Step 1: Check for null or undefined context
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.customSome called on null or undefined');
  }

  // Step 2: Convert to object to support array-like structures
  const list = Object(this);

  // Step 3: Ensure valid length as a 32-bit unsigned integer
  const listLength = list.length >>> 0;

  // Step 4: Loop through the list
  for (let i = 0; i < listLength; i++) {
    // Skip missing indices in sparse arrays
    if (i in list) {
      // Step 5: If callback returns truthy for any element, return true
      if (callback(list[i], i, list)) {
        return true;
      }
    }
  }

  // Step 6: If none passed the test, return false
  return false;
}

// Step 7: Attach to Array prototype
Array.prototype.customSome = customSome;
