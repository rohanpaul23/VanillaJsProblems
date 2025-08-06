/**
 * Problem Statement:
 * ------------------
 * Implement a custom version of Array.prototype.pop called `customPop`.
 *
 * Requirements:
 * - Removes the last element from an array or array-like object.
 * - Returns the removed element.
 * - Updates the length property (length -= 1).
 * - Returns undefined if the object is empty (length === 0).
 * - Works with array-like objects (e.g., { 0: 'x', 1: 'y', length: 2 }).
 * - Throws TypeError if `this` is null or undefined.
 * - Must use 'use strict' to enforce correct context binding.
 */

function customPop() {
  // DO NOT REMOVE
  'use strict';

  // Ensure `this` is not null or undefined
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.customPop called on null or undefined');
  }

  // Convert to object to support array-like structures
  const list = Object(this);
  const length = list.length || 0;

  // If empty, return undefined
  if (!length) {
    return undefined;
  }

  // Get the last element
  const element = list[length - 1];

  // Delete the last property
  delete this[length - 1];

  // Update the length
  this.length = length - 1;

  // Return the removed value
  return element;
}

// Attach customPop to the prototype
Array.prototype.customPop = customPop;

// ---------------------------------------------------
// ✅ Test Cases
// ---------------------------------------------------

console.log('--- Test Case 1: Normal Array ---');
const arr1 = [10, 20, 30];
console.log(arr1.customPop()); // Expected: 30
console.log(arr1);             // Expected: [10, 20]

console.log('--- Test Case 2: Empty Array ---');
const arr2 = [];
console.log(arr2.customPop()); // Expected: undefined
console.log(arr2);             // Expected: []

console.log('--- Test Case 3: Array-like Object ---');
const obj = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
console.log(Array.prototype.customPop.call(obj)); // Expected: 'c'
console.log(obj); // Expected: { 0: 'a', 1: 'b', length: 2 }

console.log('--- Test Case 4: Object with length 0 ---');
const emptyObj = { length: 0 };
console.log(Array.prototype.customPop.call(emptyObj)); // Expected: undefined
console.log(emptyObj); // Expected: { length: 0 }

console.log('--- Test Case 5: Calling on null ---');
try {
  Array.prototype.customPop.call(null); // Should throw TypeError
} catch (e) {
  console.log(e instanceof TypeError); // Expected: true
}

console.log('--- Test Case 6: Calling on a string ---');
try {
  Array.prototype.customPop.call('hello'); // Should throw TypeError
} catch (e) {
  console.log(e instanceof TypeError); // Expected: true
}
