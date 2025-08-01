function groupByType(collection) {
  let res = [];     // Final result: an array containing a single grouped object
  let obj = {};     // Object that will hold type → grouped items

  const map = new Map(); // Temporary map to group items by 'type'

  // Step 1: Group items by their 'type' key
  collection.forEach((obj) => {
    if (!map.has(obj.type)) {
      // If this type hasn't been seen before, start a new array
      map.set(obj.type, [obj]);
    } else {
      // If type already exists, push this item into the existing array
      const allValues = map.get(obj.type);
      allValues.push(obj);
      map.set(obj.type, allValues); // (Re-setting not needed, but done for clarity)
    }
  });

  // Step 2: Convert map entries to a plain object
  const entries = map.entries();
  for (const [key, value] of entries) {
    obj[key] = value;
  }

  // Step 3: Push the grouped object into the result array
  res.push(obj);

  return res;
}
