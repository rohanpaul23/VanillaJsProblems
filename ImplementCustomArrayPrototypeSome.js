/**
 * Problem Statement: Implement Array.prototype.customSome
 * ------------------------------------------------------
 * Implement a custom array method `customSome` (like native Array.prototype.some).
 *
 * It should:
 *  - Return true if callback returns a truthy value for ANY existing element.
 *  - Return false if callback never returns truthy.
 *  - Stop early (short-circuit) once a match is found.
 *  - Not mutate the original array.
 *  - Skip holes in sparse arrays (do NOT call callback for missing indices).
 *  - Support optional thisArg (2nd argument) as the `this` binding for callback.
 *  - Throw TypeError if:
 *      - called on null/undefined
 *      - callback is not a function
 *
 * Signature (as used by tests):
 *   arr.customSome(callbackFn)
 *   arr.customSome(callbackFn, thisArg)
 *
 * NOTE:
 * The platform scaffold says "DO NOT CHANGE FUNCTION NAME" and gives
 * `function customSome() {}`. That means we MUST read callbackFn/thisArg
 * from the `arguments` object (even if parameters aren't declared).
 */

// DO NOT CHANGE FUNCTION NAME
function customSome() {
  // Grab the callback function from the 1st argument (works even though params aren't declared)
  const callbackFn = arguments[0];

  // Grab the optional thisArg from the 2nd argument
  const thisArg = arguments[1];

  // 1) Validate `this` (covers cases like Array.prototype.customSome.call(null, fn))
  if (this == null) {
    throw new TypeError("Array.prototype.customSome called on null or undefined");
  }

  // 2) Validate callbackFn
  // If callbackFn is missing or not a function, match native behavior by throwing TypeError
  if (typeof callbackFn !== "function") {
    throw new TypeError("callbackFn must be a function");
  }

  // 3) Convert the receiver (`this`) into an object (supports array-like objects too)
  // Example array-like: {0:'a', 1:'b', length:2}
  const arr = Object(this);

  // 4) Normalize length into a safe non-negative integer
  // `>>> 0` converts to an unsigned 32-bit integer (spec-like ToLength for typical tests)
  const len = arr.length >>> 0;

  // 5) Iterate from 0 to len-1
  for (let i = 0; i < len; i++) {
    // 6) Skip holes in sparse arrays (native some does NOT call callback for missing indices)
    // Example: const a = []; a[2] = 10; (0 and 1 are holes)
    if (!(i in arr)) continue;

    // 7) Call callback with:
    // - `this` bound to thisArg
    // - arguments: (element, index, array)
    const passes = callbackFn.call(thisArg, arr[i], i, arr);

    // 8) Short-circuit: if callback returns truthy, return true immediately
    if (passes) return true;
  }

  // 9) If nothing passed, return false
  return false;
}

Array.prototype.customSome = customSome;
