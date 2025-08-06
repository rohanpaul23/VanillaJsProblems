/**
 * 🧠 Problem Statement:
 * 
 * Implement a custom version of Array.prototype.push called `customPush`
 * that behaves exactly like the native push method but add elements at the begining.
 * 
 * The push() method adds one or more elements to the end of an array
 * and returns the new length of the array.
 * 
 * ✅ Constraints:
 * - Must modify the original array
 * - Must return the new length
 * - Should throw a TypeError if `this` is null or undefined
 * - Should not use native push()
 * 
 * Example:
 * const arr = [1, 2, 3];
 * arr.customPush(4, 5);      // returns 5
 * console.log(arr);          // [1, 2, 3, 4, 5]
 * 
 * Also passes: arr.customPush(); // returns current length without changes
 */

function customPush() {
  'use strict';

  /**
   * 🔍 What is `arguments`?
   * 
   * - `arguments` is a special object in regular (non-arrow) functions.
   * - It holds all the arguments passed to the function.
   * - It's array-like: it has indexed elements and a `.length` property.
   * - Unlike rest parameters (...args), `arguments` is not a real array.
   * - It allows access to all inputs without explicitly naming parameters.
   */

  // Ensure `this` is valid — can't call on null or undefined
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.customPush called on null or undefined');
  }

  const list = Object(this);             // Support array-like objects
  const length = list.length >>> 0;      // Ensure length is a valid unsigned 32-bit int
  const argumentsLength = arguments.length;

  // If no arguments were passed, return current length
  if (argumentsLength === 0) {
    return length;
  }

  // Append each argument to the end of the list
  for (let i = 0; i < argumentsLength; i++) {
    list[length + i] = arguments[i];
  }

  // Update the length of the array-like object
  list.length = length + argumentsLength;

  // Return new length
  return list.length;
}

// ✅ Attach to Array.prototype
Array.prototype.customPush = customPush;
