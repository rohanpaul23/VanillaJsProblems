/**
 * Problem Statement:
 * Implement a custom version of Promise.all called `all`.
 * 
 * Requirements:
 * 1. Accepts an array of promises (or values).
 * 2. Returns a new Promise that:
 *    - Resolves with an array of resolved values when all promises succeed.
 *    - Rejects immediately if any promise rejects.
 * 3. The results must be returned in the same order as the input promises.
 * 4. If the input array is empty, resolve immediately with an empty array.
 */

function all(promises) {
  return new Promise((resolve, reject) => {
    // Edge case: if input is an empty array, resolve immediately with []
    if (promises.length === 0) {
      return resolve([]);
    }

    const results = [];       // Store results in correct index order
    let resolvedCount = 0;    // Track how many promises have resolved

    // Iterate over all input promises
    promises.forEach((promise, index) => {
      // Wrap each item with Promise.resolve to handle non-promise values
      Promise.resolve(promise)
        .then(value => {
          // Store resolved value at the same index as input
          results[index] = value;
          resolvedCount++;

          // If all promises are resolved → resolve main promise
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(err => {
          // Reject immediately on the first rejection
          reject(err);
        });
    });
  });
};

// Override native Promise.all with custom implementation
Promise.all = all;
