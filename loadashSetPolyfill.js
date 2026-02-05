/**
 * ------------------------------------------------------------
 * Problem Statement
 * ------------------------------------------------------------
 * Implement a function `set(object, path, value)` that sets a
 * value at a given deep path inside an object.
 *
 * Requirements:
 * 1. If a portion of the path does not exist, it must be created.
 * 2. Missing numeric keys should create Arrays.
 * 3. Missing non-numeric keys should create Objects.
 * 4. The function must mutate the original object.
 * 5. The original object reference must be returned.
 *
 * Path can be:
 * - An array: ["a", "b", 0, "c"]
 * - A string: "a.b[0].c"
 *
 * Examples:
 *
 * set({}, "a.b.c", 1)
 * → { a: { b: { c: 1 } } }
 *
 * set({}, "a[0].b", 2)
 * → { a: [{ b: 2 }] }
 *
 * ------------------------------------------------------------
 * Approach
 * ------------------------------------------------------------
 * 1. Normalize the path:
 *    - Convert string paths like "a.b[0].c" into an array
 *      → ["a", "b", "0", "c"]
 *
 * 2. Traverse the object step-by-step:
 *    - For each key in the path:
 *      - If the key does not exist:
 *          → create an object {} or array []
 *      - Move deeper into the structure
 *
 * 3. When the final key is reached:
 *    - Assign the given value
 *
 * 4. Return the original object (mutated)
 * ------------------------------------------------------------
 */

function set(object, path, value) {
  // Guard clause: if object is null or undefined, return it as-is
  if (object == null) return object;

  /**
   * Normalize the path
   *
   * If path is a string:
   *   "a.b[0].c" → ["a", "b", "0", "c"]
   *
   * If path is already an array:
   *   ["a", "b", 0, "c"] → ["a", "b", "0", "c"]
   */
  const keys = Array.isArray(path)
    ? path.map(String)
    : path
        .replace(/\[(\d+)\]/g, '.$1') // convert [0] → .0
        .split('.')                   // split by dot
        .filter(Boolean);             // remove empty segments

  // Pointer to walk through the object
  let current = object;

  // Iterate through each path segment
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    // If this is the last key, assign the value
    if (i === keys.length - 1) {
      current[key] = value;
      break;
    }

    /**
     * If the next level does not exist,
     * we must create it.
     */
    if (current[key] == null) {
      const nextKey = keys[i + 1];

      /**
       * Decide whether to create an Array or Object
       *
       * If the next key is numeric (e.g. "0"),
       * it represents an array index → create []
       *
       * Otherwise → create {}
       */
      const isArrayIndex = String(Number(nextKey)) === nextKey;

      current[key] = isArrayIndex ? [] : {};
    }

    // Move deeper into the object
    current = current[key];
  }

  // Return the original object (mutated)
  return object;
}
