/**
 * Measures and logs execution time of a function (sync or async).
 * Promisifies sync functions so the result is always a Promise.
 * @param {Function} fn - The function to measure.
 * @param  {...any} args - Arguments to pass to the function.
 * @returns {Promise<any>} - A Promise that resolves or rejects with the function's result.
 */
function measureExecutionTime(fn, ...args) {
  // ⏱ Start high-resolution timer
  const start = performance.now();

  // Ensure we handle both synchronous and asynchronous functions safely
  return Promise.resolve()
    .then(() => fn(...args)) // Call the function with provided arguments
    .then((result) => {
      // ✅ Function completed successfully
      const end = performance.now(); // ⏱ Stop timer
      const duration = Math.round(end - start); // ⏱ Round to nearest ms
      console.log(`Execution time: ${duration} milliseconds`); // 🖨️ Log execution time
      return result; // 🔁 Pass result back to caller
    })
    .catch((error) => {
      // ❌ Function threw an error (sync or async)
      const end = performance.now(); // ⏱ Stop timer
      const duration = Math.round(end - start); // ⏱ Round to nearest ms
      console.log(`Execution time: ${duration} milliseconds`); // 🖨️ Log execution time
      throw error; // 🔁 Rethrow the error so caller can handle it
    });
}
