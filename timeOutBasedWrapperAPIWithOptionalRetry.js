// Main function that wraps an unstable async function `fn`
// Adds a timeout mechanism and an optional single retry
function callWithTimeout(fn, { timeout = 300, retry = false } = {}) {

  // Internal helper function that performs a single attempt
  function run() {
    return new Promise((resolve, reject) => {
      let timerId; // Used to track and clear the timeout

      try {
        // Wrap the call in a promise chain to capture synchronous throws
        const promise = Promise.resolve().then(() => fn());

        // Set a timeout to reject the promise if it takes too long
        timerId = setTimeout(() => {
          reject(new Error("Timeout: API did not respond in time"));
        }, timeout);

        // If the API call resolves before the timeout, clear the timer and resolve
        promise
          .then((res) => {
            clearTimeout(timerId); // Cancel the timeout
            resolve(res);          // Return the result
          })
          .catch((err) => {
            clearTimeout(timerId); // Cancel the timeout
            reject(err);           // Propagate the error
          });

      } catch (syncError) {
        // If `fn()` throws synchronously (e.g., not returning a promise), reject immediately
        reject(syncError);
      }
    });
  }

  // Perform the first attempt
  return run().catch((err) => {
    // If retry is enabled and the error is a timeout, try again once
    if (retry && err.message === "Timeout: API did not respond in time") {
      return run(); // Retry once
    }

    // Otherwise, propagate the error
    throw err;
  });
}
