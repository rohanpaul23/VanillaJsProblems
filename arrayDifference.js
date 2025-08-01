// Helper function that implements SameValueZero comparison
// Returns true if values are equal using SameValueZero rules

// ✅ What it does:
// This function implements SameValueZero equality:

// Comparison	Result
// 1 === 1	✅ true
// NaN === NaN	❌ false (===) but ✅ true (sameValueZero)
// -0 === 0	✅ true (SameValueZero treats them as equal)
// Object.is(-0, 0)	❌ false, so we don’t use Object.is directly

function sameValueZero(a, b) {
  return a === b || (a !== a && b !== b); // handles NaN === NaN
}

function difference(array, excludeArray) {
  // ✅ Edge Case: If array is valid but excludeArray is null, return original array
  if (Array.isArray(array) && excludeArray === null) {
    return array;
  }
  // ❌ If both inputs are not arrays, return empty result
  else if (!Array.isArray(array) && !Array.isArray(excludeArray)) {
    return [];
  }

  const result = []; // This will store final filtered items

  // 🔁 Loop through each item in the input array
  for (const item of array) {
    // Use `some()` to check if item exists in excludeArray using SameValueZero
    const isExcluded = excludeArray.some(excludedItem =>
      sameValueZero(item, excludedItem)
    );

    // ✅ If not found in excludeArray, keep the item
    if (!isExcluded) {
      result.push(item);
    }
  }

  return result; // Return filtered array
}
