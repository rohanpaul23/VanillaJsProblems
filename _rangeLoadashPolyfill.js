function range(start = 0, end, step) {
  // If only one argument is provided, treat it as `end`
  // Set `start` to 0 in that case (e.g., range(4) → [0, 1, 2, 3])
  if (end === undefined) {
    end = start;
    start = 0;
  }

  // If step is not provided, choose default based on direction
  // Ascending (start < end) → step = 1
  // Descending (start > end) → step = -1
  if (step === undefined) {
    step = start < end ? 1 : -1;
  }

  const result = [];

  // Special case: when step is 0, fill the array with repeated `start` value
  // Number of elements = end - start (e.g., range(1, 4, 0) → [1, 1, 1])
  if (step === 0) {
    const count = Math.max(0, end - start);
    for (let i = 0; i < count; i++) {
      result.push(start);
    }
    return result;
  }

  // Standard case: step > 0, ascending sequence
  // Add values starting from `start` up to (but not including) `end`
  for (let i = start; step > 0 && i < end; i += step) {
    result.push(i);
  }

  // Descending case: step < 0
  // Add values from `start` down to (but not including) `end`
  for (let i = start; step < 0 && i > end; i += step) {
    result.push(i);
  }

  return result;
}
