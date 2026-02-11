/**
 * ============================================================
 * Problem Statement:
 * ============================================================
 * 
 * Implement a function `excludeItems(items, excludes)` that:
 * 
 * - Receives:
 *      items    → An array of objects.
 *      excludes → An array of exclusion rules.
 * 
 * Each exclusion rule is an object:
 *      { k: <property_name>, v: <value_to_exclude> }
 * 
 * The function should:
 *      Return a NEW array containing only the items
 *      that DO NOT match ANY of the exclusion rules.
 *
 * Matching Rule:
 *      An item should be excluded if:
 *          item[rule.k] === rule.v
 *      for ANY rule inside excludes.
 *
 * Important:
 *      - If an item matches at least ONE rule → it must be removed.
 *      - If an item matches NONE of the rules → keep it.
 *      - The original array must not be mutated.
 *
 * ------------------------------------------------------------
 * Example:
 *
 * items = [
 *   { role: 'admin', active: true, age: 34 },
 *   { role: 'editor', active: false, age: 28 },
 *   { role: 'viewer', active: true, age: 22 },
 *   { role: 'admin', active: false, age: 41 }
 * ];
 *
 * excludes = [
 *   { k: 'role', v: 'viewer' },
 *   { k: 'active', v: false }
 * ];
 *
 * Expected Output:
 * [
 *   { role: 'admin', active: true, age: 34 }
 * ]
 *
 * ============================================================
 * Approach:
 * ============================================================
 *
 * 1️⃣ For each item:
 *      Check if it matches ANY exclusion rule.
 *
 * 2️⃣ If it matches ANY rule:
 *      Exclude it.
 *
 * 3️⃣ If it matches NONE:
 *      Keep it in result.
 *
 * We use:
 *      Array.prototype.filter()
 *      Array.prototype.some()
 *
 * Why?
 *      - filter → builds new array automatically
 *      - some   → checks if ANY condition matches
 *
 * Time Complexity:
 *      O(n * m)
 *      n = items.length
 *      m = excludes.length
 *
 * Space Complexity:
 *      O(n) for result array
 * ============================================================
 */

// do not change function name
function excludeItems(items, excludes) {
  return items.filter(item =>
    // We KEEP the item only if
    // NONE of the exclude rules match
    !excludes.some(rule => {
      // Check if item matches current exclusion rule
      return item[rule.k] === rule.v;
    })
  );
}
