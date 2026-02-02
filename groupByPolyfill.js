function groupBy(collection, iteratee) {
    if(collection === null) return {}

    const identity = (x) => x

    let getKey;

    if(typeof iteratee === 'function') {
        getKey = iteratee
    } else if(typeof iteratee === 'string') {
        getKey = (x) => x[iteratee]
    } else {
        getKey = identity
    }

    const result = {}

     for (let i = 0; i < collection.length; i++) {
    const item = collection[i];

    // Compute group key; object keys are strings, so normalize
    const key = String(getKey(item));

    // Create bucket if missing
    if (!result[key]) result[key] = [];

    // Add item to its group
    result[key].push(item);
  }

  return result;
}   