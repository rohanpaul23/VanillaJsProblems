/**
 * ❓ Problem Statement:
 * 
 * Implement a robust deep cloning function called `cloneDeep` that:
 * 
 * ✅ Deeply copies all nested structures:
 *    - Arrays
 *    - Plain Objects
 * ✅ Supports special object types:
 *    - Date
 *    - RegExp
 *    - Map
 *    - Set
 * ✅ Preserves:
 *    - Functions and class instances (returned as-is)
 * ✅ Handles:
 *    - Circular references using a WeakMap cache
 * 
 * ⚠️ Not supported in this version:
 *    - TypedArrays, Buffers, DOM elements, Promises, etc.
 */

/**
 * Deep clone function that supports nested structures, special types, and circular references.
 *
 * @param {*} input - The value to deep clone.
 * @param {WeakMap} cache - Internal cache for circular reference tracking.
 * @returns {*} A deep clone of the input.
 */
function cloneDeep(input, cache = new WeakMap()) {
  // ✅ Handle primitive values (number, string, boolean, null, undefined, symbol, bigint)
  if (typeof input !== 'object' || input === null) {
    return input; // Primitives are returned as-is
  }

  // ✅ Handle circular references (return cached result if already cloned)
  if (cache.has(input)) {
    return cache.get(input);
  }

  // ✅ Handle Date objects
  if (input instanceof Date) {
    return new Date(input.getTime());
  }

  // ✅ Handle RegExp objects
  if (input instanceof RegExp) {
    return new RegExp(input.source, input.flags);
  }

  // ✅ Handle Map
  if (input instanceof Map) {
    const result = new Map();
    cache.set(input, result); // Cache before recursion
    input.forEach((value, key) => {
      result.set(cloneDeep(key, cache), cloneDeep(value, cache));
    });
    return result;
  }

  // ✅ Handle Set
  if (input instanceof Set) {
    const result = new Set();
    cache.set(input, result); // Cache before recursion
    input.forEach(value => {
      result.add(cloneDeep(value, cache));
    });
    return result;
  }

  // ✅ Handle Arrays
  if (Array.isArray(input)) {
    const result = [];
    cache.set(input, result); // Cache before recursion
    input.forEach((item, index) => {
      result[index] = cloneDeep(item, cache);
    });
    return result;
  }

  // ✅ Handle functions and class instances (preserve by reference)
  const proto = Object.getPrototypeOf(input);
  if (proto !== Object.prototype && proto !== null) {
    return input; // Keep reference to preserve prototype chain
  }

  // ✅ Handle plain objects
  const result = {};
  cache.set(input, result); // Cache before recursion
  Object.keys(input).forEach(key => {
    result[key] = cloneDeep(input[key], cache);
  });

  return result;
}
