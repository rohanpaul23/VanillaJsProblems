/**
 * Problem Statement
 * -----------------
 * Implement a function `sortBy` that sorts an array of objects in ascending order
 * based on a given property.
 *
 * Requirements:
 * - Return a NEW sorted array (do NOT mutate the original array).
 * - Sort in ascending order.
 * - Support nested properties using dot notation (e.g. "b.c").
 * - Handle edge cases where the property value can be `null` or `undefined`:
 *   → such values should always appear at the END of the sorted array.
 * - Maintain stable sorting:
 *   → if two elements have the same sort value, their original order
 *     in the input array must be preserved.
 *
 * Examples:
 * sortBy([{a: 3}, {a: 2}, {a: null}], "a")
 * // → [{a: 2}, {a: 3}, {a: null}]
 *
 * sortBy([{a:1,b:{c:4}}, {a:2,b:{c:2}}], "b.c")
 * // → sorted by nested property b.c
 *
 *
 * Solution Approach
 * -----------------
 * 1. Create a shallow copy of the input array to avoid mutating it.
 * 2. Parse the property string (e.g. "b.c") into a path array ["b", "c"].
 * 3. For each element:
 *    - Extract the value at the given property path.
 *    - Decorate the element with:
 *        - the extracted value
 *        - its original index (to guarantee stable sorting).
 * 4. Sort the decorated array:
 *    - Push `null` / `undefined` values to the end.
 *    - Otherwise, compare values in ascending order.
 *    - If values are equal, fall back to original index (stable sort).
 * 5. Undecorate the array by returning only the original elements.
 */

function sortBy(collection, property) {
  // Create a shallow copy so the original array is not mutated
  const arr = collection.slice();

  // Split property path to support nested access (e.g. "b.c" → ["b", "c"])
  const path = property.split(".");

  /**
   * Safely retrieves the value from an object using the property path.
   * If at any point the path does not exist, returns null.
   */
  function getValue(obj) {
    let current = obj;

    for (let i = 0; i < path.length; i++) {
      // If any intermediate level is null/undefined, stop
      if (current == null) return null;
      current = current[path[i]];
    }

    return current;
  }

  /**
   * Decorate → Sort → Undecorate pattern
   *
   * We decorate each element with:
   * - `value`: the value to sort by
   * - `index`: original position (used for stable sorting)
   */
  return arr
    .map((item, index) => ({
      item,              // original object
      value: getValue(item), // extracted sort value
      index,             // original index for stability
    }))
    .sort((a, b) => {
      const av = a.value;
      const bv = b.value;

      // Push null / undefined values to the end
      const aNull = av == null;
      const bNull = bv == null;

      if (aNull && !bNull) return 1;
      if (!aNull && bNull) return -1;
      if (aNull && bNull) {
        // Both null → preserve original order
        return a.index - b.index;
      }

      // Normal ascending comparison
      if (av < bv) return -1;
      if (av > bv) return 1;

      // Values are equal → preserve original order (stable sort)
      return a.index - b.index;
    })
    // Undecorate: return only the original items
    .map(wrapper => wrapper.item);
}
