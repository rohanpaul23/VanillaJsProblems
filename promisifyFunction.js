/**
 * Problem Statement:
 * ------------------
 * Create a `promisify` function that converts a Node.js-style
 * callback-based function into a Promise-based one.
 *
 * Rules:
 *   - Returned function accepts the same arguments as the original (excluding the callback).
 *   - Returns a Promise that:
 *        - Resolves with the result if no error
 *        - Rejects with the error if one is passed
 *   - Must preserve the original `this` context.
 *   - Assumes the callback follows Node.js convention:
 *        function callback(err, result) { ... }
 *
 * @param {Function} fn - The callback-based function to convert
 * @returns {Function} A function returning a Promise
 */
function promisify(fn) {
  // Return a new function that wraps the original function
  return function (...args) {
    // Return a Promise so the user can use `.then()` / `await`
    return new Promise((resolve, reject) => {
      /**
       * Call the original function with:
       * - Preserved `this` context (`fn.call(this, ...)`)
       * - All original arguments (`...args`)
       * - Plus a callback function that matches Node.js style: (err, result)
       */
      fn.call(
        this,                // Preserve `this` for methods
        ...args,             // Pass through all provided arguments
        (err, result) => {   // Callback gets injected as the last parameter
          if (err) {
            // If there's an error, reject the Promise
            reject(err);
          } else {
            // If no error, resolve with the result
            resolve(result);
          }
        }
      );
    });
  };
}