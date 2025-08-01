// Main function that wraps an API call with timeout and retry logic
function callWithTimeout(fn, { timeout = 300, maxRetries = 0 } = {}) {
  
  // Internal helper function to run one attempt of the API call
  function runAttempt(attempt = 0) {
    return new Promise((resolve, reject) => {
      let timerId; // Will hold the timeout timer ID

      try {
        // Ensures that synchronous errors are caught as promise rejections
        const promise = Promise.resolve().then(() => fn());

        // Set a timeout: if the API doesn't respond in time, reject with a timeout error
        timerId = setTimeout(() => {
          reject(new Error("Timeout: API did not respond in time"));
        }, timeout);

        // If the API resolves before timeout, clear timer and resolve the result
        promise
          .then((res) => {
            clearTimeout(timerId); // Cancel timeout
            resolve(res);          // Pass result to caller
          })
          .catch((err) => {
            clearTimeout(timerId); // Cancel timeout
            reject(err);           // Reject with original error
          });
      } catch (syncError) {
        // If `fn()` throws synchronously, catch and reject it
        reject(syncError);
      }
    }).catch((err) => {
      // After the promise rejects (either timeout or real error), decide if we should retry
      const isTimeout = err.message === "Timeout: API did not respond in time";

      // If it's a timeout and we have retries left, try again
      if (isTimeout && attempt < maxRetries) {
        return runAttempt(attempt + 1); // Recursive retry with incremented attempt count
      }

      // Re-throw the error (either non-timeout or out of retries)
      throw err;
    });
  }

  // Start with the first attempt
  return runAttempt(0);
}
