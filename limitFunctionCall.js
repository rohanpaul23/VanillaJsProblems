function limit(callback, n) {
  // Variable to store the last returned result from the callback
  let result = null;

  // Counter to track how many times the callback has been invoked
  let noOfCalls = 0;

  // Return a new function that wraps the original callback
  return function (...args) {
    // Only invoke the callback if the call count is less than `n`
    if (noOfCalls < n) {
      // Use `.apply` to preserve `this` context and pass all arguments
      result = callback.apply(this, args);

      // Increment the call counter
      noOfCalls++;
    }

    // After `n` calls, just return the last computed result
    return result;
  };
}
