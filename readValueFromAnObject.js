/**
 * =========================================================
 * Problem Statement: Read value from an object using a path
 * =========================================================
 *
 * Implement a function `read` that retrieves a value from a
 * nested object/array using a path.
 *
 * The path can be provided in multiple formats:
 *  - Dot notation:            "a.b.c"
 *  - Bracket notation:        "a[0].b"
 *  - Quoted bracket notation: "a['x']", 'a["y"]'
 *  - Mixed notation:          "a.b[0]['c']"
 *
 * Function Signature:
 *   read(collection, property)
 *
 * Arguments:
 * - collection (Object | Array): The root object to read from
 * - property (string): Path describing the value to access
 *
 * Behavior:
 * - Returns the value if the full path exists
 * - Returns `undefined` if:
 *     • collection is null or undefined
 *     • property is empty or invalid
 *     • any part of the path does not exist
 *
 * Examples:
 *
 * read({ a: { b: { c: 2 } } }, "a.b.c");                 // 2
 * read({ a: [{ b: 3 }] }, "a[0].b");                     // 3
 * read([{ developer: "Tom" }, [0, null]], "[1][1]");     // null
 * read({ a: { b: 1 } }, "a.c");                          // undefined
 */

// DO NOT CHANGE FUNCTION NAME
function read(collection, property) {
  'use strict';

  // If the collection itself is null or undefined, nothing can be read
  if (collection == null) return undefined;

  // If path is not a valid non-empty string, return undefined
  if (typeof property !== 'string' || property.length === 0) {
    return undefined;
  }

  /**
   * Normalize the path into an array of keys
   *
   * Examples:
   *  "a.b[0].c"      → ["a", "b", "0", "c"]
   *  "[1][1]"        → ["1", "1"]
   *  "a['x'].y"      → ["a", "x", "y"]
   */
  const keys = Array.isArray(property)
    ? property.map(String)
    : property
        // Convert ["key"] or ['key'] into dot notation → .key
        .replace(/\[(["'])(.*?)\1\]/g, '.$2')
        // Convert numeric brackets [0] → .0
        .replace(/\[(\d+)\]/g, '.$1')
        // Split the path by dots
        .split('.')
        // Remove empty segments caused by leading dots
        .filter(Boolean);

  // Start traversal from the root collection
  let current = collection;

  /**
   * Traverse the object step by step using normalized keys
   * Stop early and return undefined if any level is missing
   */
  for (const key of keys) {
    if (current == null) return undefined;
    current = current[key];
  }

  // Return the final resolved value
  return current;
}
