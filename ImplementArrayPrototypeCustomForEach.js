/**
 * Problem Statement: Implement Array.prototype.customForEach
 * ---------------------------------------------------------
 * Create a custom array method `customForEach` that behaves like
 * JavaScript’s native `Array.prototype.forEach`.
 *
 * The method executes the provided callback function once for each
 * existing element in the array, in ascending index order.
 *
 * Behavior & Requirements:
 * - Does NOT return anything (always returns `undefined`).
 * - Does NOT mutate the original array structure (unless the callback does).
 * - Skips holes in sparse arrays.
 * - Supports an optional `thisArg` to control `this` inside the callback.
 * - Throws a TypeError if:
 *     - called on null or undefined
 *     - callbackFn is not a function
 *
 * Callback Signature:
 *   callbackFn(element, index, array)
 *
 * Example:
 *   [1, 2, 3].customForEach((x, i) => console.log(i, x));
 */

// DO NOT CHANGE FUNCTION NAME
function customForEach(callbackFn, thisArg) {
  // 1) Validate the `this` value (native behavior)
  if (this == null) {
    throw new TypeError(
      "Array.prototype.customForEach called on null or undefined"
    );
  }

  // 2) Validate callback
  if (typeof callbackFn !== "function") {
    throw new TypeError("callbackFn must be a function");
  }

  // 3) Convert `this` to an object to support array-like objects
  const arr = Object(this);

  // 4) Normalize length to a safe non-negative integer
  const len = arr.length >>> 0;

  // 5) Iterate over array indices
  for (let i = 0; i < len; i++) {
    // 6) Skip holes in sparse arrays (matches native forEach)
    if (!(i in arr)) continue;

    // 7) Call callback with correct `this` binding and arguments
    callbackFn.call(thisArg, arr[i], i, arr);
  }

  // 8) Native forEach returns undefined
  return undefined;
}

Array.prototype.customForEach = customForEach;
