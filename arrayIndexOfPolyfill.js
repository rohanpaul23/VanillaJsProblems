/**
 * Problem Statement:
 * ------------------
 * Implement a custom version of the Array.prototype.indexOf method.
 * 
 * The indexOf method returns the first index at which a given element 
 * can be found in the array, or -1 if it is not present.
 *
 * Syntax:
 *    arr.customIndexOf(searchElement)
 *    arr.customIndexOf(searchElement, fromIndex)
 *
 * Parameters:
 *    searchElement → The element to search for in the array.
 *    fromIndex (Optional) → The index to start the search at.
 * 
 * Rules:
 *    1. If fromIndex >= array length → return -1 immediately.
 *    2. If fromIndex is negative → treat it as offset from the end 
 *       (i.e., length + fromIndex). Clamp to 0 if still negative.
 *    3. Search always goes from left to right.
 *    4. Return the first index if found, else return -1.
 *    5. NaN is never found (same as native indexOf).
 */

function customIndexOf(searchElement, fromIndex = 0) {
  // If search start index >= array length, nothing to search
  if (fromIndex >= this.length) return -1;

  // Normalize fromIndex:
  // - If positive, use it as is
  // - If negative, calculate offset from end: length + fromIndex
  // - Clamp to 0 to avoid negative index
  fromIndex = Math.max(fromIndex >= 0 ? fromIndex : fromIndex + this.length, 0);

  // Iterate from fromIndex → end of array
  for (let idx = fromIndex; idx < this.length; idx++) {
    // Strict equality check (===) like native indexOf
    if (this[idx] === searchElement) {
      return idx; // Return first index where element is found
    }
  }

  // Element not found → return -1
  return -1;
}

// Attach the method to Array prototype to mimic native indexOf
if (!Array.prototype.customIndexOf) {
  Array.prototype.customIndexOf = customIndexOf;
}


// -------------------
// Example Test Cases
// -------------------
const arr = [2, 5, 9, 2, undefined, NaN];

console.log(arr.customIndexOf(2));          // 0   → found at index 0
console.log(arr.customIndexOf(2, 2));       // 3   → found at index 3
console.log(arr.customIndexOf(7));          // -1  → not found
console.log(arr.customIndexOf(undefined));  // 4   → found at index 4
console.log(arr.customIndexOf(NaN));        // -1  → NaN is never found
console.log(arr.customIndexOf(2, -1));      // 3   → offset from end → found at index 3
console.log(arr.customIndexOf(2, -10));     // 0   → negative larger than length → start from 0
