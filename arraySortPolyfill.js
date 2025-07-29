function customSort(compareFn) {
  // If no compare function is provided, use default string comparison
  if (typeof compareFn !== 'function') {
    compareFn = (a, b) => {
      // Convert both values to strings and compare them
      if (String(a) > String(b)) return 1;
      return 0; // ⚠️ This assumes a == b or a < b, but should ideally return -1 for a < b
    }
  }

  // Bubble Sort begins
  var swapped = false;

  // Outer loop: runs for each pass over the array
  for (var i = 0; i < this.length; i++) {

    // Inner loop: compares each pair of adjacent elements
    for (var j = 0; j < this.length - 1; j++) {
      // Use the compare function to determine if swap is needed
      if (compareFn(this[j], this[j + 1]) > 0) {
        // Swap elements using destructuring
        [this[j], this[j + 1]] = [this[j + 1], this[j]];
        swapped = true; // Track that a swap occurred
      }
    }

    // If no swaps occurred in this pass, array is sorted — exit early
    if (!swapped) break;
  }

  // Return the sorted array (in-place)
  return this;
}
