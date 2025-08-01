/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 *
 * @param {*} value - First value to compare.
 * @param {*} other - Second value to compare.
 * @returns {boolean} - True if values are deeply equal, false otherwise.
 */
function deepEqual(value, other) {
  // ✅ Step 1: Handle primitives and reference equality (fast path)
  if (value === other) return true;

  // ⚠️ Step 2: Handle null values (note: typeof null === 'object')
  if (value === null || other === null) return false;

  // ❌ Step 3: If one is object and one is primitive, not equal
  if (typeof value !== 'object' || typeof other !== 'object') return false;

  // 🔍 Step 4: Ensure both have the same constructor (Array vs Object, etc.)
  if (value.constructor !== other.constructor) return false;

  // 📦 Step 5: Compare arrays
  if (Array.isArray(value)) {
    // If other isn't an array or lengths differ → not equal
    if (!Array.isArray(other) || value.length !== other.length) return false;

    // Recursively compare each array item
    for (let i = 0; i < value.length; i++) {
      if (!deepEqual(value[i], other[i])) return false;
    }
    return true; // All array elements matched
  }

  // 🧱 Step 6: Compare plain objects
  const keysA = Object.keys(value);
  const keysB = Object.keys(other);

  // If number of keys differ → not equal
  if (keysA.length !== keysB.length) return false;

  // Check each key's presence and value equality
  for (let key of keysA) {
    if (!other.hasOwnProperty(key)) return false; // key missing
    if (!deepEqual(value[key], other[key])) return false; // value mismatch
  }

  return true; // All keys and values matched
}
