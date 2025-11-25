/**
 * Problem Statement:
 * ------------------
 * Implement a function `memoizeOne` that optimizes performance by caching results
 * of function calls. If the function is called again with the same arguments, 
 * the cached result should be returned instead of recomputing it.
 *
 * Requirements:
 *  - Store function results in a cache (Map).
 *  - Use arguments as a key to identify repeated calls.
 *  - Ensure that repeated calls with the same arguments are efficient.
 *
 * Example:
 * --------
 * function add(a, b) { return a + b; }
 * const memoizedAdd = memoizeOne(add);
 *
 * console.log(memoizedAdd(2, 3)); // computes 2+3 → 5
 * console.log(memoizedAdd(2, 3)); // returns cached value → 5
 * console.log(memoizedAdd(4, 3)); // computes 4+3 → 7
 */

function memoizeOne(fn) {
  // Create a cache to store previous computations
  const map = new Map();

  // Return a new function that wraps the original one
  return function (...args) {
    // Convert arguments into a string key (joined with "_")
    // Note: This simple approach works for primitive values but 
    // might fail for complex objects.
    const key = args.join("_");

    // If the result for this key is already cached, return it
    if (map.has(key)) {
      return map.get(key);
    }

    // Otherwise, compute the result using the original function
    const value = fn(...args);

    // Store the result in cache for future calls
    map.set(key, value);

    // Return the computed result
    return value;
  };
}
