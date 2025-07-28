/**
 * Measures and logs execution time of a function (sync or async).
 * @param {Function} fn - The function to measure.
 * @param  {...any} args - Any number of arguments to pass to the function.
 * @returns {Promise<any>} - Returns the result of the function (awaited if async).
 */
async function measureExecutionTime(fn, ...args) {
  const start = performance.now(); // ✅ Start the timer (in milliseconds)

  try {
    const result = fn(...args); // ✅ Call the function with provided arguments

    // ✅ If the result is a Promise (i.e., async function), await it
    const awaited = result instanceof Promise ? await result : result;

    const end = performance.now(); // ✅ Stop the timer
    const time = Math.round(end - start); // ✅ Round time to nearest integer

    console.log(`Execution time: ${time} milliseconds`); // ✅ Log as required

    return awaited; // ✅ Return the result of the function
  } catch (error) {
    const end = performance.now(); // ✅ Stop the timer even on error
    const time = Math.round(end - start);

    console.log(`Execution time: ${time} milliseconds`); // ✅ Still log the time

    throw error; // ✅ Rethrow the error so it's not swallowed
  }
}
