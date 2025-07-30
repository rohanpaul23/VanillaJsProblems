/**
 * Wraps a method on an object to track its return values each time it is called.
 * Returns a tracker object with a `.call()` method to access all stored return values.
 *
 * @param {Object} obj - The object whose method you want to spy on.
 * @param {string} method - The name of the method to wrap.
 * @returns {Object} An object with a .call() method that returns stored return values.
 */
function listenTo(obj, method) {
  // Store the original method before wrapping
  const originalMethod = obj[method];

  // Array to store return values of each invocation
  const finalResult = [];

  // Replace the method with a wrapper
  obj[method] = function(...args) {
    // Call the original method with the correct `this` context and arguments
    const result = originalMethod.apply(this, args);

    // Store the return value
    finalResult.push(result);

    // Return the result to preserve original behavior
    return result;
  }

  // Return a tracker interface to access stored return values
  return {
    /**
     * Returns the array of return values from all calls to the wrapped method.
     * @returns {Array} Array of return values
     */
    call() {
      return finalResult;
    }
  }
}
