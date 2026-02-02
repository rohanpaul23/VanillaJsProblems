/**
 * ✅ Problem Statement
 * -------------------
 * You are given an `input` value that can be a deeply nested structure containing:
 *   - Plain objects (e.g. { a: 1, nested: {...} })
 *   - Arrays (e.g. [1, () => 2, { x: () => 3 }])
 *   - Functions as values at any depth
 *   - Primitive constants (number, string, boolean, null, undefined, etc.)
 *
 * You are also given an `args` object that maps a *property key* (function name in the object)
 * to an array of arguments to pass to that function.
 *
 * Example:
 *   input = { total: (a,b)=>a+b, nested:{ multiply:(x,y)=>x*y }, constant:10 }
 *   args  = { total:[2,3], multiply:[4,5] }
 *
 * Output:
 *   { total: 5, nested:{ multiply: 20 }, constant: 10 }
 *
 * ✅ Requirements
 * --------------
 * 1) Traverse the input recursively.
 * 2) Whenever a function is found as a value, call it.
 *    - If the function is a property value under key `k`, call it with `args[k]` if present,
 *      otherwise call it with no arguments.
 * 3) IMPORTANT: If a function returns an object/array, resolve that returned structure recursively too.
 *    (This fixes Test Case 5: function returns an object)
 * 4) Resolve functions inside arrays as well.
 *    (This fixes Test Case 6: arrays containing functions)
 * 5) Preserve the original shape (same keys / array indices), but with functions replaced by results.
 *
 * ✅ Solution Approach
 * -------------------
 * We use a single recursive helper `resolveAny(value, keyForArgs)`:
 *
 *   A) If `value` is a function:
 *        - Build the argument list from args[keyForArgs] if available
 *        - Execute the function
 *        - Recursively resolve what the function returned (so returned objects/arrays also get processed)
 *
 *   B) If `value` is an array:
 *        - Map every element through resolveAny(...)
 *
 *   C) If `value` is a plain object:
 *        - Create a new object
 *        - For each (key, childValue), resolve childValue with key passed as keyForArgs
 *
 *   D) Otherwise (primitive / null / Date / etc.):
 *        - Return as-is
 *
 * ✅ Complexity
 * ------------
 * Let N be total nodes (properties + array elements + function nodes) in the structure
 * plus nodes created/returned by functions.
 *
 * Time:  O(N)   (each node is visited once)
 * Space: O(H)   (recursion depth, where H is maximum nesting height)
 */

/**
 * @param {any} input - object/array/function/primitive to resolve
 * @param {Record<string, any[]>} args - mapping from property key -> argument array
 * @returns {any} resolved structure with all functions executed
 */
function resolveObjectFunctions(input, args = {}) {
  /**
   * Check for a "plain object" (created via `{}` or `new Object()`).
   * We exclude arrays and null, because those are also typeof "object".
   */
  const isPlainObject = (v) =>
    v !== null && typeof v === "object" && !Array.isArray(v);

  /**
   * Recursively resolve any value:
   * - functions (execute + resolve returned value)
   * - arrays (map elements)
   * - plain objects (resolve each property)
   * - primitives/others (return as-is)
   *
   * @param {any} value - current value to resolve
   * @param {string} [keyForArgs] - the property key name used to lookup args[keyForArgs]
   * @returns {any}
   */
  const resolveAny = (value, keyForArgs) => {
    // 1) Function: execute and then recursively resolve what it returns.
    //    This is crucial for the test where function returns { b: () => 2 }.
    if (typeof value === "function") {
      // If we have args for this key, use them; else use empty array.
      const fnArgs = Array.isArray(args[keyForArgs]) ? args[keyForArgs] : [];

      // Execute the function.
      const returned = value(...fnArgs);

      // Recursively resolve the returned value (could be object/array/function/primitive).
      return resolveAny(returned);
    }

    // 2) Array: resolve each element.
    //    Fixes tests where arrays contain functions: [() => 1, 2, () => 3] -> [1,2,3]
    if (Array.isArray(value)) {
      return value.map((item) => resolveAny(item));
    }

    // 3) Plain object: resolve each property.
    //    We pass the property key down so functions can use args[key].
    if (isPlainObject(value)) {
      const out = {};
      for (const [k, v] of Object.entries(value)) {
        out[k] = resolveAny(v, k);
      }
      return out;
    }

    // 4) Primitive or other non-plain-object types: return as-is.
    //    (e.g., number/string/boolean/null/undefined/Date/Map/Set etc.)
    return value;
  };

  // Start recursion at the root.
  return resolveAny(input);
}

/* -----------------------------
   Example usage (from prompt)
-------------------------------- */

const input = {
  total: (a, b) => a + b,
  nested: {
    multiply: (x, y) => x * y
  },
  constant: 10
};

const args = {
  total: [2, 3],
  multiply: [4, 5]
};

const result = resolveObjectFunctions(input, args);

console.log(result);
// Expected:
// {
//   total: 5,
//   nested: { multiply: 20 },
//   constant: 10
// }

/* -----------------------------
   Extra sanity checks for tests
-------------------------------- */

// Test Case 5: Function returns an object (should resolve returned object recursively)
console.log(resolveObjectFunctions({ a: () => ({ b: () => 2 }) }));
// Expected: { a: { b: 2 } }

// Test Case 6: Object containing arrays with functions
console.log(resolveObjectFunctions({ a: [() => 1, 2, () => 3] }));
// Expected: { a: [1, 2, 3] }
