/**
 * Read FAQs section on the left for more information on how to use the editor
**/
// Do no change function name

/**
 * ✅ Problem Statement
 *
 * Implement a function `customLastIndexOf` that mimics the behavior of `Array.prototype.lastIndexOf`.
 *
 * The `lastIndexOf()` method returns the **last index** at which a given element can be found in the array,
 * or `-1` if it is not present. The array is searched **backwards**, starting from the optional `fromIndex`.
 *
 * Syntax:
 *   array.customLastIndexOf(searchElement)
 *   array.customLastIndexOf(searchElement, fromIndex)
 *
 * Parameters:
 * - searchElement (required): The value to search for.
 * - fromIndex (optional): The index to start searching backwards from.
 *   - Defaults to `array.length - 1`
 *   - If negative, treated as `length + fromIndex`
 *   - If result is less than 0, return -1 immediately
 *
 * Return Value:
 * - Index of last match found, or -1 if not found
 */

function customLastIndexOf(searchElement, fromIndex) {
  // DO NOT REMOVE
  'use strict';

  // Step 1: Validate `this` is not null/undefined
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.customLastIndexOf called on null or undefined');
  }

  // Step 2: Convert to object to support array-like values
  const list = Object(this);
  const length = list.length >>> 0;

  // Step 3: Determine starting index
  let start = (fromIndex !== undefined) ? Number(fromIndex) : length - 1;

  // Step 4: Adjust for NaN or invalid values
  if (isNaN(start)) {
    start = length - 1;
  }

  // Step 5: Handle negative fromIndex
  if (start < 0) {
    start = length + start;
  }

  // Step 6: Clamp start to valid range
  if (start >= length) {
    start = length - 1;
  }

  // Step 7: If resulting start is still < 0, return -1
  if (start < 0) return -1;

  // Step 8: Search backward from `start` to 0
  for (let i = start; i >= 0; i--) {
    if (!(i in list)) continue;

    const current = list[i];

    // Special case: NaN !== NaN, so check manually
    if (searchElement !== searchElement && current !== current) {
      return i;
    }

    if (current === searchElement) {
      return i;
    }
  }

  // Step 9: Not found
  return -1;
}

// Attach to Array prototype
Array.prototype.customLastIndexOf = customLastIndexOf;
