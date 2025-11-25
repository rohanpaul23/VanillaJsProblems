/**
 * Problem Statement:
 * ------------------
 * Implement `fetchWithAutoRetry(fetcher, maximumRetryCount)` that repeatedly calls
 * the provided fetcher until it succeeds or the retry limit is reached.
 *
 * Behavior:
 *  - Call `fetcher()`; if it resolves, return the value.
 *  - If it rejects/throws, retry until `maximumRetryCount` is exhausted.
 *  - If all retries fail, reject with the last error.
 *  - Total attempts = maximumRetryCount + 1
 *
 * @param {Function} fetcher - Function with no arguments that returns a Promise (or value)
 * @param {number} maximumRetryCount - Number of retries after the first attempt
 * @returns {Promise<*>} - Resolves with the successful result or rejects with the last error
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  // Validate that fetcher is a function
  if (typeof fetcher !== 'function') {
    throw new TypeError('fetchWithAutoRetry: `fetcher` must be a function');
  }

  // Ensure maximumRetryCount is a non-negative integer
  const retries = Math.max(0, Number(maximumRetryCount) | 0);

  // Return a Promise so caller can use `.then()` / `.catch()` without `async` keyword
  return new Promise((resolve, reject) => {
    let attempt = 0; // Number of retries done so far

    /**
     * Inner function that attempts the fetch.
     * - If successful → resolve outer promise
     * - If failure → retry until retry limit reached
     */
    function tryFetch() {
      Promise.resolve() // Ensure fetcher can be sync or async
        .then(fetcher)  // Call the fetcher function
        .then(resolve)  // On success → resolve outer promise
        .catch((err) => {
          if (attempt < retries) {
            attempt++;   // Increment retry count
            tryFetch();  // Retry again
          } else {
            reject(err); // Out of retries → reject with last error
          }
        });
    }

    // Start first attempt
    tryFetch();
  });
}