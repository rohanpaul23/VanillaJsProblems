/**
 * Problem Statement
 * -----------------
 * In JavaScript, many older APIs use callbacks instead of Promises.
 * This often leads to deeply nested callbacks ("callback hell"),
 * making code hard to read, reason about, and maintain.
 *
 * Your task is to implement a utility function `promisify` that:
 *
 * 1) Takes a callback-based function as input.
 * 2) Returns a new function that:
 *    - Accepts the same arguments as the original function (except the callback)
 *    - Returns a Promise
 *    - Resolves on success
 *    - Rejects on error
 * 3) Preserves the original `this` context.
 *
 *
 * Callback Convention (Node.js-style)
 * ----------------------------------
 * The function to be promisified follows this pattern:
 *
 *   fn(arg1, arg2, ..., callback)
 *
 * Where:
 *   callback(error, result)
 *
 * - `error` is `null` or `undefined` on success
 * - `error` is an Error (or truthy value) on failure
 * - `result` is the successful value
 *
 *
 * Examples
 * --------
 * function fetchUser(id, callback) {
 *   setTimeout(() => {
 *     if (!id) {
 *       throw new Error("Invalid ID");
 *     }
 *     callback(null, { id, name: `User ${id}` });
 *   }, 1000);
 * }
 *
 * const fetchUserAsync = promisify(fetchUser);
 *
 * fetchUserAsync(123).then(console.log).catch(console.error);
 *
 *
 * High-Level Solution Idea
 * -----------------------
 * - Wrap the callback-based function in a Promise.
 * - Inject our own callback as the last argument.
 * - Inside that callback:
 *     - If `err` exists → reject the Promise
 *     - Else → resolve the Promise
 * - Use `fn.apply(this, args)` to preserve `this` binding.
 * - Catch synchronous errors and reject the Promise.
 *
 *
 * Edge Cases Considered
 * --------------------
 * 1) Preserving `this`:
 *    - Required for methods like `obj.method(callback)`
 *
 * 2) Synchronous errors:
 *    - If the original function throws before calling callback,
 *      the Promise should reject.
 *
 * 3) Multiple callback results:
 *    - Some callbacks do: callback(null, a, b, c)
 *    - We can optionally resolve with:
 *        - the first value
 *        - OR an array of values
 *
 * 4) Performance:
 *    - This implementation creates one Promise per call
 *    - This is standard and acceptable for most use cases
 */

/**
 * promisify
 * ---------
 * Converts a callback-based function into a Promise-based one.
 *
 * @param {Function} fn - function following Node.js callback pattern
 * @returns {Function} - promisified version of fn
 */
function promisify(fn) {
  return function (...args) {
    // Preserve `this` context
    const context = this;

    return new Promise((resolve, reject) => {
      // Create the callback that resolves/rejects the promise
      function callback(err, ...results) {
        if (err) {
          reject(err);
        } else {
          // If multiple success values exist, return array
          // Otherwise return the single value
          resolve(results.length > 1 ? results : results[0]);
        }
      }

      try {
        // Call original function with:
        // - same arguments
        // - injected callback as last parameter
        fn.apply(context, [...args, callback]);
      } catch (error) {
        // Catch synchronous errors
        reject(error);
      }
    });
  };
}

/* ----------------------------------------------------
   Example usage
---------------------------------------------------- */

function fetchUser(id, callback) {
  setTimeout(() => {
    if (id <= 0) {
      return callback(new Error("Invalid ID"));
    }

    callback(null, { id, name: `User ${id}` });
  }, 1000);
}

const fetchUserAsync = promisify(fetchUser);

// Success case
fetchUserAsync(123)
  .then((user) => console.log("User:", user))
  .catch((err) => console.error("Error:", err.message));

// Error case
fetchUserAsync(-1)
  .then((user) => console.log("User:", user))
  .catch((err) => console.error("Error:", err.message));

/* ----------------------------------------------------
   this-binding example
---------------------------------------------------- */

const service = {
  prefix: "User",
  getName(id, callback) {
    callback(null, `${this.prefix}-${id}`);
  },
};

service.getNameAsync = promisify(service.getName);

// Correctly preserves `this`
service.getNameAsync(10).then(console.log); // "User-10"
