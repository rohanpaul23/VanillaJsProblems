/**
 * Problem Statement:
 * ------------------
 * Implement a `clearAllTimeout` method that cancels all active timers
 * created with `setTimeout`. Normally, `clearTimeout` only clears one
 * specific timer when given its ID. The challenge is to build a utility
 * that clears *all* timeouts at once.
 * 
 * Approach:
 * ---------
 * - Override the native `setTimeout` function.
 * - Whenever a new timeout is created, capture its timer ID in a global array.
 * - Implement `clearAllTimeout` that iterates over this array and clears
 *   each timeout using `clearTimeout`.
 * - This ensures we only cancel *our own tracked timers* instead of
 *   forcibly clearing every timer in the environment.
 */

window.timeoutIds = []; // Array to store all active timeout IDs

// 1. Store the original setTimeout function (so we can still use it internally)
const originalTimeoutFn = window.setTimeout;

// 2. Override the global setTimeout
window.setTimeout = function (fn, delay) {
  // Call the original setTimeout and get the timer ID
  const id = originalTimeoutFn(fn, delay);

  // Save the ID in our global list for later clearing
  timeoutIds.push(id);

  // Return the ID so it can still be cleared individually if needed
  return id;
};

// 3. Define clearAllTimeout
window.clearAllTimeout = function () {
  // Keep clearing until all tracked IDs are removed
  while (timeoutIds.length) {
    // Pop the last ID and clear that timer
    clearTimeout(timeoutIds.pop());
  }
};
