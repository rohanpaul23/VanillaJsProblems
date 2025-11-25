/**
 * Problem Statement:
 * ------------------
 * Implement a function `mapLimit` that:
 *  1. Processes an array of inputs using an async function (`iterateeFn`).
 *  2. Limits the number of concurrent operations to `limit`.
 *  3. Ensures the final results preserve the same order as the inputs.
 *  4. Invokes a final callback with all results once processing is complete.
 *
 * Arguments:
 * ----------
 * - inputs:     An array of items to process.
 * - limit:      Maximum number of operations that can run at the same time.
 * - iterateeFn: An async-style function called as (input, done),
 *               where `done(output)` must be invoked with the result.
 * - callback:   Function invoked with the array of results after all inputs are processed.
 *
 * Example:
 * --------
 * mapLimit([1,2,3,4,5], 2, getUserById, (results) => {
 *   console.log(results); // ["User1","User2","User3","User4","User5"]
 * });
 */

function mapLimit(inputs, limit, iterateeFn, callback) {
  // If inputs is empty, immediately invoke callback with []
  if (!Array.isArray(inputs) || inputs.length === 0) {
    return callback([]);
  }

  const results = new Array(inputs.length); // To store outputs in correct order
  let i = 0;           // Next index to start processing
  let completed = 0;   // Number of inputs processed so far

  // Function to start processing the next input
  function runNext() {
    // If no more inputs left to start, just return
    if (i >= inputs.length) return;

    const index = i++; // Pick the current index and advance for the next call

    // Call the iteratee function with input and a callback
    iterateeFn(inputs[index], (output) => {
      results[index] = output; // Save result at the correct index
      completed++;

      // If all inputs processed, fire the final callback with results
      if (completed === inputs.length) {
        callback(results);
      } else {
        // Otherwise, start another input (if any left)
        runNext();
      }
    });
  }

  // Kick off up to "limit" operations in parallel
  for (let j = 0; j < Math.min(limit, inputs.length); j++) {
    runNext();
  }
}

/* ---------------- DEMO ---------------- */

// Example async function: fetches "User{n}" after random delay
function getUserById(id, done) {
  setTimeout(() => done(`User${id}`), 100 + Math.random() * 200);
}

// Run the mapLimit with a concurrency of 2
mapLimit([1, 2, 3, 4, 5], 2, getUserById, (allResults) => {
  console.log("output:", allResults);
  // Expected: ["User1","User2","User3","User4","User5"]
});

// Run the mapLimit with a concurrency of 1
mapLimit([1, 2, 3, 4, 5], 1, getUserById, (allResults) => {
  console.log("output:", allResults);
  // Expected: ["User1","User2","User3","User4","User5"]
});