function once(callback) {
  // Store the result of the first callback invocation
  let result = null;

  // Return a new function that wraps the original callback
  return function (...args) {
    // Only invoke the callback if it hasn't been called before
    if (result === null) {
      // Use `.apply(this, args)` to preserve the `this` context and pass all arguments
      result = callback.apply(this, args);
    }

    // Return the stored result (same value after the first call)
    return result;
  };
}
