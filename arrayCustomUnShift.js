/**
 * ✅ Problem Statement
 *
 * Implement a method called `customUnshift` that mimics the behavior of `Array.prototype.unshift`.
 * This method should:
 * - Add one or more elements to the beginning of an array (or array-like object).
 * - Shift existing elements to the right accordingly.
 * - Return the new length of the array.
 *
 * The method should:
 * - Handle empty arrays
 * - Handle array-like objects
 * - Throw TypeError for `null` or `undefined`
 * - Preserve unrelated properties on the object
 *
 * Do NOT use the built-in `unshift` method.
 */

function customUnshift(...args) {
  // DO NOT REMOVE
  'use strict';

  // Validate the context (`this`) is not null or undefined
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.customUnshift called on null or undefined');
  }

  // Convert to an object to support both arrays and array-like objects
  const list = Object(this);
  const originalLength = list.length >>> 0; // force unsigned 32-bit integer
  const newItemsCount = args.length;

  if (newItemsCount === 0) return originalLength;

  // Shift existing elements to the right to make room for new elements
  for (let i = originalLength - 1; i >= 0; i--) {
    if (Object.prototype.hasOwnProperty.call(list, i)) {
      list[i + newItemsCount] = list[i];
    } else {
      // Clean up sparse indexes so we don't copy undefined explicitly
      delete list[i + newItemsCount];
    }
  }

  // Insert new elements at the start
  for (let i = 0; i < newItemsCount; i++) {
    list[i] = args[i];
  }

  // Update the length property
  list.length = originalLength + newItemsCount;

  return list.length;
}

// Attach to Array prototype
Array.prototype.customUnshift = customUnshift;

///////////////////////////////////////////////////////
// ✅ Test Suite
///////////////////////////////////////////////////////

// const _ = require('lodash'); // Ensure lodash is installed: npm install lodash
// const assertionLibrary = {
//   expect(actual) {
//     return {
//       to: {
//         eql(expected, msg = '') {
//           if (!_.isEqual(actual, expected)) {
//             console.error(`❌ Assertion Failed: ${msg}`);
//             console.error(`   Expected: ${JSON.stringify(expected)}`);
//             console.error(`   Found:    ${JSON.stringify(actual)}`);
//           } else {
//             console.log(`✅ Passed: ${msg}`);
//           }
//         }
//       }
//     };
//   }
// };

// // ------------------- Test Case 1: Normal array -------------------
// const arr1 = [1, 2, 3];
// const newLength1 = arr1.customUnshift(4, 5);
// assertionLibrary.expect(newLength1).to.eql(5, 'Return new length');
// assertionLibrary.expect(arr1).to.eql([4, 5, 1, 2, 3], 'Insert multiple elements at start');

// // ------------------- Test Case 2: Empty array -------------------
// const arr2 = [];
// const newLength2 = arr2.customUnshift(10);
// assertionLibrary.expect(newLength2).to.eql(1, 'Insert one element into empty array');
// assertionLibrary.expect(arr2).to.eql([10]);

// // ------------------- Test Case 3: No arguments -------------------
// const arr3 = [1, 2];
// const newLength3 = arr3.customUnshift();
// assertionLibrary.expect(newLength3).to.eql(2, 'Unshift with no arguments');
// assertionLibrary.expect(arr3).to.eql([1, 2]);

// // ------------------- Test Case 4: Non-array object -------------------
// const obj = { 0: 'a', 1: 'b', length: 2 };
// const newLength4 = Array.prototype.customUnshift.call(obj, 'x');
// assertionLibrary.expect(newLength4).to.eql(3, 'Unshift on array-like object');
// assertionLibrary.expect(obj).to.eql({ 0: 'x', 1: 'a', 2: 'b', length: 3 });

// // ------------------- Test Case 5: Object with unrelated properties -------------------
// const input = { length: 3, unrelated: 'foo', 2: 4 };
// const newLength5 = Array.prototype.customUnshift.call(input, 1, 2);
// const expectedOutput = {
//   0: 1,
//   1: 2,
//   4: 4,          // Original 2 shifted to 4
//   unrelated: 'foo',
//   length: 5
// };
// assertionLibrary.expect(newLength5).to.eql(expectedOutput.length, 'Return correct length on array-like');
// assertionLibrary.expect(input).to.eql(expectedOutput, 'Correctly shift and insert on object');

// // ------------------- Test Case 6: Null or undefined throws -------------------
// try {
//   Array.prototype.customUnshift.call(null, 1);
//   assertionLibrary.expect(false).to.eql(true, 'Should throw on null');
// } catch (e) {
//   assertionLibrary.expect(e instanceof TypeError).to.eql(true, 'Throws TypeError on null');
// }

// try {
//   Array.prototype.customUnshift.call(undefined, 1);
//   assertionLibrary.expect(false).to.eql(true, 'Should throw on undefined');
// } catch (e) {
//   assertionLibrary.expect(e instanceof TypeError).to.eql(true, 'Throws TypeError on undefined');
// }
