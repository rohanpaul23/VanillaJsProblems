/**
 * Problem: Flatten Leaf Properties from a Deeply Nested Object
 * ------------------------------------------------------------
 * You are given a deeply nested JavaScript object. Write a function that extracts
 * all leaf properties and returns them in a new flat object.
 *
 * A leaf property is any property whose value is NOT a plain object.
 *
 * Requirements
 * - Recursively traverse nested objects.
 * - If a value is not a plain object, include it in the result.
 * - Use the original key name for each leaf property.
 * - If the same key appears multiple times at different depths, the deeper value
 *   should overwrite the earlier one.
 *
 * Constraints
 * - The input may contain nested objects of any depth.
 * - Arrays must be treated as values and must NOT be flattened.
 * - null and undefined must be preserved.
 * - Only plain objects should be recursively processed.
 * - The original object must not be modified.
 * - If the input is empty, return an empty object.
 *
 * Function Signature
 * function flattenObject(collection) { }
 *
 * Returns
 * - A new object containing only the leaf key-value pairs.
 */

// do not change function name
function flattenObject(collection) {
  /**
   * `res` is the new object we build and return.
   * We never modify `collection`, so the original object remains unchanged.
   */
  let res = {};

  /**
   * We loop through every key in `collection`.
   * Each key can point to:
   * - a plain object (needs recursion)
   * - or a "leaf" value (copy directly)
   */
  for (let key in collection) {
    /**
     * Current value for this key.
     */
    const value = collection[key];

    /**
     * If the value is:
     * - an object (typeof === "object")
     * - not null (because typeof null is also "object")
     * - and not an array (arrays must be treated as leaf values)
     *
     * then we decide to "go deeper" and flatten inside it.
     *
     * NOTE:
     * This check treats ANY non-null, non-array object as a "plain object".
     * That means Date/Map/Set/class instances would also be recursed into,
     * which may or may not match the strict definition of "plain object".
     * (But we are keeping your solution unchanged, as requested.)
     */
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      /**
       * Recursively flatten the nested object.
       * This returns an object containing ONLY leaf key/value pairs
       * found deeper inside.
       */
      const deeperLeaves = flattenObject(value);

      /**
       * Merge the deeper leaf pairs into our current `res`.
       *
       * Why spread like this?
       * - `{ ...res, ...deeperLeaves }` creates a NEW object
       * - It copies everything from `res`
       * - Then copies everything from `deeperLeaves` on top
       *
       * Overwrite rule:
       * - If the same key exists in both `res` and `deeperLeaves`,
       *   the value in `deeperLeaves` wins because it is spread LAST.
       *
       * That exactly matches the requirement:
       * "If the same key appears multiple times at different depths,
       *  the deeper value should overwrite the earlier one."
       */
      res = { ...res, ...deeperLeaves };
    } else {
      /**
       * Otherwise, this value is a LEAF value.
       *
       * Leaf includes:
       * - primitives (number/string/boolean)
       * - null
       * - undefined
       * - arrays (must NOT be flattened)
       * - functions
       * - etc.
       *
       * We keep the original key name and store it in `res`.
       */
      res[key] = value;

      /**
       * If later, in a deeper nested object, the same key appears again,
       * it will overwrite this value during the merge step above.
       */
    }
  }

  /**
   * Return the final flat object containing only leaf properties.
   */
  return res;
}
