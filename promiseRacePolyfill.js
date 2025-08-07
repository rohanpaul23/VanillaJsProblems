/**
 * Implement a polyfill for `Promise.race`.
 *
 * `Promise.race(promises)` returns a new promise that settles (either resolves or rejects)
 * as soon as the first promise in the provided iterable settles.
 *
 * For example:
 * - If the first settled promise resolves, `race` resolves with that value.
 * - If the first settled promise rejects, `race` rejects with that reason.
 *
 * This implementation assumes input is an array of promises (or values).
 */
function race(arr) {
  /**
   * Polyfill for Promise.race
   * 
   * @param {Array<Promise|any>} arr - An array of promises or values
   * @returns {Promise} A promise that settles with the first result (resolve or reject)
   */

  return new Promise((resolve, reject) => {
    // Loop through all items in the array
    for (const promise of arr) {
      // Use Promise.resolve to handle non-promise values
      Promise.resolve(promise)
        .then((value) => {
          // Resolve outer promise as soon as one resolves
          resolve(value);
        })
        .catch((error) => {
          // Reject outer promise as soon as one rejects
          reject(error);
        });
    }
  });
}

// Override the native Promise.race with custom polyfill (for testing/demo)
Promise.race = race;
