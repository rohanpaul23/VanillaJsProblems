/**
 * Problem Statement:
 * Implement `customShift` that mimics Array.prototype.shift.
 * 
 * - Removes the first element of an array or array-like object
 * - Returns that element (or undefined if not present)
 * - Shifts all remaining items one position left
 * - Updates the "length" property
 * - Preserves holes (sparse arrays remain sparse)
 */

function customShift() {
  // 1. Validate that `this` is not null/undefined
  if (this == null) {
    throw new TypeError(
      "Array.prototype.customShift called on null or undefined"
    );
  }

  // 2. Convert to object (works with arrays & array-likes)
  const obj = Object(this);

  // 3. Normalize length (force to unsigned 32-bit int)
  const len = obj.length >>> 0;

  // 4. Handle empty array/array-like → nothing to remove
  if (len === 0) {
    obj.length = 0;
    return undefined;
  }

  // 5. Get the first element if it exists, otherwise undefined
  const firstElement = 0 in obj ? obj[0] : undefined;

  // 6. Shift all elements left by one
  for (let i = 1; i < len; i++) {
    if (i in obj) {
      // If current index exists → move it left
      obj[i - 1] = obj[i];
    } else {
      // If current index missing (hole) → ensure left stays missing
      delete obj[i - 1];
    }
  }

  // 7. Remove the last element (already shifted)
  delete obj[len - 1];

  // 8. Update length
  obj.length = len - 1;

  // 9. Return the removed first element
  return firstElement;
}

// Attach to Array prototype for easy use
Array.prototype.customShift = customShift;

/* --------------------
   ✅ Test Cases
--------------------- */

// Example 1: Normal array
let arr1 = [1, 2, 3];
console.log(arr1.customShift()); // 1
console.log(arr1);               // [2, 3]

// Example 2: Empty array
let arr2 = [];
console.log(arr2.customShift()); // undefined
console.log(arr2);               // []

// Example 3: Array-like object (sparse)
const input = { length: 3, unrelated: "foo", 2: 4 };
const result = Array.prototype.customShift.call(input);
console.log("Return value:", result);   // undefined
console.log("Updated object:", input);  // { length: 2, unrelated: 'foo', 1: 4 }
