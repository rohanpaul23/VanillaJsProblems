/**
 * ✅ Problem Statement
 *
 * Implement a method called `customEvery` that mimics the behavior of `Array.prototype.every`.
 * 
 * The `every()` method tests whether **all** elements in the array pass the test implemented by the provided callback function.
 *
 * Requirements:
 * - Return `true` only if the callback returns a truthy value for every element.
 * - Return `false` immediately if any element fails the test.
 * - Must skip sparse (missing) elements.
 * - Must throw a TypeError if called on `null` or `undefined`.
 * - Must support array-like objects (e.g., objects with `length` and indexed keys).
 *
 * Do NOT use the built-in `Array.prototype.every` method.
 */

function customEvery(callback) {
  // DO NOT REMOVE
  'use strict';

  // Step 1: Ensure `this` is not null or undefined
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.customEvery called on null or undefined');
  }

  // Step 2: Convert `this` to an object (to support arrays and array-like objects)
  const list = Object(this);

  // Step 3: Get the length as an unsigned 32-bit integer
  const length = list.length >>> 0;

  // Step 4: Iterate through each index
  for (let i = 0; i < length; i++) {
    // Skip sparse elements (i.e., holes in arrays)
    if (i in list) {
      // If callback returns falsy, return false early
      if (!callback(list[i], i, list)) {
        return false;
      }
    }
  }

  // Step 5: If all elements pass, return true
  return true;
}

// Attach to Array prototype
Array.prototype.customEvery = customEvery;

///////////////////////////////////////////////////////
// ✅ Test Suite
///////////////////////////////////////////////////////

// const _ = require('lodash');

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

// // ------------------- Test Case 1: All pass -------------------
// const arr1 = [2, 4, 6];
// const result1 = arr1.customEvery(num => num % 2 === 0);
// assertionLibrary.expect(result1).to.eql(true, 'All elements are even');

// // ------------------- Test Case 2: One fails -------------------
// const arr2 = [2, 3, 6];
// const result2 = arr2.customEvery(num => num % 2 === 0);
// assertionLibrary.expect(result2).to.eql(false, 'Not all elements are even');

// // ------------------- Test Case 3: Empty array -------------------
// const arr3 = [];
// const result3 = arr3.customEvery(() => false);
// assertionLibrary.expect(result3).to.eql(true, 'Empty array should return true');

// // ------------------- Test Case 4: Sparse array -------------------
// const arr4 = [1, , 3]; // Missing index 1
// const visited = [];
// const result4 = arr4.customEvery((num, i) => {
//   visited.push(i);
//   return typeof num === 'number';
// });
// assertionLibrary.expect(result4).to.eql(true, 'Sparse array should skip holes');
// assertionLibrary.expect(visited).to.eql([0, 2], 'Visited only present indices');

// // ------------------- Test Case 5: Called on array-like object -------------------
// const obj = { 0: 5, 1: 10, length: 2 };
// const result5 = Array.prototype.customEvery.call(obj, x => x > 0);
// assertionLibrary.expect(result5).to.eql(true, 'Works with array-like objects');

// // ------------------- Test Case 6: Called on null or undefined -------------------
// try {
//   Array.prototype.customEvery.call(null, () => true);
//   assertionLibrary.expect(false).to.eql(true, 'Should throw on null');
// } catch (e) {
//   assertionLibrary.expect(e instanceof TypeError).to.eql(true, 'Throws TypeError on null');
// }

// try {
//   Array.prototype.customEvery.call(undefined, () => true);
//   assertionLibrary.expect(false).to.eql(true, 'Should throw on undefined');
// } catch (e) {
//   assertionLibrary.expect(e instanceof TypeError).to.eql(true, 'Throws TypeError on undefined');
// }


