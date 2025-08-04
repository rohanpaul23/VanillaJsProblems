// Method to multiply the ith element (1-based index) of each nested tuple
function multiple(position) {
  // If the tuple array is empty, return 0 immediately
  if (this.length === 0) return 0;

  // Use `reduce` to multiply the (position - 1)th element from each tuple
  return this.reduce((res, tuple) => tuple[position - 1] * res, 1);
}

function tuple(input) {
  // Validate input: throw TypeError for null or undefined
  if (input === null || input === undefined) {
    throw new TypeError;
  }

  // Match all substrings that look like a tuple, e.g., "(1,2)"
  const matches = input.match(/\(([^)]+)\)/g);

  // If no matches found (e.g., input is empty), return empty array with `.multiple()` attached
  if (!matches) {
    const empty = [];
    empty.multiple = multiple; // Attach the method to the array
    return empty;
  }

  // Parse each matched group:
  // - Remove parentheses
  // - Split by comma
  // - Trim and convert each part to a number
  const data = matches.map(group =>
    group
      .slice(1, -1) // remove surrounding parentheses
      .split(",")   // split by comma
      .map(num => Number(num.trim())) // convert string to number
  );

  // Attach the `.multiple()` method to the resulting array
  data.multiple = multiple;

  return data;
}
