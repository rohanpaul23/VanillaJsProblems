/**
 * Problem Statement:
 * Implement a custom version of the `Array.prototype.at()` method called `customAt`.
 *
 * This method takes an integer `index` and returns the element at that index from the array.
 * - Supports negative indexing: `-1` returns the last element, `-2` the second-last, etc.
 * - If the index is out of bounds, return `undefined`.
 * - If the method is called on `null` or `undefined`, throw a `TypeError`.
 * 
 * Constraints:
 * - Do not use the built-in `at()` method.
 * - Attach this function to `Array.prototype` as `customAt`.
 */

function customAt(index) {
  // DO NOT REMOVE
  'use strict';

  // Check if the method is called on null or undefined
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.customAt called on null or undefined');
  }

  // Convert `this` to an object (to support array-like objects)
  const list = Object(this);

  // Get the length of the array
  const length = list.length >>> 0; // Ensures it's treated as an unsigned 32-bit integer

  // Handle negative indexing: convert to a positive index from end
  if (index < 0) {
    index = length + index;
  }

  // If the final index is out of bounds, return undefined
  if (index < 0 || index >= length) {
    return undefined;
  }

  // Return the element at the valid index
  return list[index];
}

// Attach the method to Array.prototype
Array.prototype.customAt = customAt;

// ---------- Test Cases ----------

const arr = [10, 20, 30, 40, 50];

console.log(arr.customAt(0));     // Output: 10
console.log(arr.customAt(2));     // Output: 30
console.log(arr.customAt(-1));    // Output: 50
console.log(arr.customAt(-3));    // Output: 30
console.log(arr.customAt(10));    // Output: undefined
console.log(arr.customAt(-10));   // Output: undefined

// Error case
try {
  Array.prototype.customAt.call(null, 0);
} catch (e) {
  console.log(e.message); // Output: Array.prototype.customAt called on null or undefined
}
