function customRepeat(count) {
  // Do not remove 'use strict' — ensures strict mode is enabled
  // Prevents use of undeclared variables and enforces safer JavaScript
  'use strict';

  // Convert the input `count` to a number, then floor it to ensure it's an integer
  count = Math.floor(Number(count));

  // Throw an error if `count` is negative
  // (matching the behavior of the native `String.prototype.repeat`)
  if (count < 0) {
    throw new RangeError;
  }

  // Initialize an empty string to accumulate the repeated result
  let result = "";

  // Repeat `this` string `count` times
  for (let i = 0; i < count; i++) {
    result = result + this;
  }

  // Return the final repeated string
  return result;
}
