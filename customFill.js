function customFill(value, start, end) {
  // DO NOT REMOVE
  'use strict'; // Ensures stricter parsing and error handling (e.g., `this` won't auto-box)

  // Throw an error if called on null or undefined
  if (this == null) {
    throw new TypeError('Array.prototype.customFill called on null or undefined');
  }

  // Get the length of the array or array-like object
  const len = this.length;

  // Default start to 0 if undefined
  start = start === undefined ? 0 : start;

  // Default end to array length if undefined
  end = end === undefined ? len : end;

  // Convert negative start to a positive index relative to end of array
  // If start >= 0, use Math.min to clamp it to valid length
  let relativeStart = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);

  // Convert negative end to a positive index relative to end of array
  // If end >= 0, use Math.min to clamp it to valid length
  let relativeEnd = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);

  // Fill the array from relativeStart to relativeEnd (exclusive)
  for (let i = relativeStart; i < relativeEnd; i++) {
    this[i] = value;
  }

  // Return the modified array or array-like object
  return this;
}
