
function chunk(array, size = 1) {

  if (!Array.isArray(array)) {
    return []
  }

  if (typeof size !== 'number' || size <= 0) {
    return []
  }

  const result = [];

  // Iterate over the array, stepping by 'size'
  for (let i = 0; i < array.length; i += size) {
    // Slice a chunk of length `size` and push to result
    result.push(array.slice(i, i + size));
  }

  return result;
}
// console.log(chunk(['a', 'b', 'c', 'd'], 2)) 
// console.log(chunk(['a', 'b', 'c']));
console.log(chunk(['a', 'b', 'c', 'd'], 3));
