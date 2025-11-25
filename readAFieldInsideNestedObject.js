/**
 * ============================================================
 * Problem Statement
 * ============================================================
 * Implement a function `read(collection, property)` that safely retrieves
 * a nested value from an object/array using a path string. The path may use:
 *   - dot notation:           "a.b.c"
 *   - bracket array indices:  "[1].count[0]"
 *
 * If the full path exists, return the resolved value; otherwise return `undefined`.
 *
 * Examples:
 *   const collection = { a: { b: { c: { d: { e: 2 } } } } };
 *   read(collection, "a.b.c.d.e")         // → 2
 *   read(collection, "a.b.c.f")           // → undefined
 *
 *   const input = [{ developer: "Tom" }, { count: [0, 1] }];
 *   read(input, "[0].developer")          // → "Tom"
 *   read(input, "[1].count[0]")           // → 0
 *
 * Constraints / Notes:
 *   - `collection` can be an object or an array.
 *   - `property` is a string path; if invalid (non-string), return `undefined`.
 *   - Do not throw for missing segments; return `undefined` instead.
 *   - This implementation supports numeric bracket indices (e.g., [0], [12]).
 *     (Quoted bracket keys like ["count"] are not handled in this simple version.)
 * ============================================================
 */

function read(collection, property) {
  // Guard against null/undefined collection or non-string path
  if (collection == null || typeof property !== "string") return undefined;

  /**
   * ------------------------------------------------------------
   * Normalizing the path: bracket indices → dot notation
   * ------------------------------------------------------------
   * We want to turn paths like "[1].count[0]" into a uniform dot form
   * so we can split by "." and iterate keys consistently.
   *
   *   "[1].count[0]"   → ".1.count.0"
   *   "a.b[2].c"       → "a.b.2.c"
   *
   * Regex used:  /\[(\d+)\]/g
   *
   * - \[ and \]         : Match literal "[" and "]" characters.
   * - (\d+)             : Capturing group #1 that matches one or more digits.
   *                       This extracts the numeric index inside the brackets.
   * - /g                : Global flag so *all* occurrences are replaced,
   *                       not just the first one.
   *
   * Replacement string: ".$1"
   * - "$1" refers to the first capturing group (the digits).
   * - Prepending a "." makes the index behave like a property segment when we
   *   later split on ".". For example, "[12]" becomes ".12".
   *
   * After replacement, we split on "." and filter out empty strings that can
   * appear if the path starts with a bracket (e.g., "[0]..." → ".0...").
   * ------------------------------------------------------------
   */
  const normalizedPath = property.replace(/\[(\d+)\]/g, ".$1");
  const keys = normalizedPath.split(".").filter(Boolean);

  // Walk the object/array along the keys
  let current = collection;
  for (const key of keys) {
    // We only proceed if current is not null/undefined AND has the own key
    // Using hasOwnProperty avoids stepping into prototype chain.
    if (current != null && Object.prototype.hasOwnProperty.call(current, key)) {
      current = current[key];
    } else {
      return undefined; // Path segment missing → bail out with undefined
    }
  }

  // All segments resolved successfully
  return current;
}

/* ============================
 * Quick Tests / Examples
 * ============================
 */
const collection = {
  a: {
    b: {
      c: {
        d: {
          e: 2
        }
      }
    }
  }
};

console.log(read(collection, "a.b.c.d.e"));   // 2
console.log(read(collection, "a.b.c.f"));     // undefined
console.log(read(null, "a.b"));               // undefined
console.log(read(collection, 123));           // undefined (non-string path)

const input = [{ developer: "Tom" }, { count: [0, 1] }];
console.log(read(input, "[0].developer"));    // "Tom"
console.log(read(input, "[1].count[0]"));     // 0
console.log(read(input, "[1].count[1]"));     // 1
console.log(read(input, "[2].test"));         // undefined
