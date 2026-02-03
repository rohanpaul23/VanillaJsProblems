/**
 * ============================================================
 * Problem Statement
 * ============================================================
 * You are given a sequence of payment events in a banking application.
 *
 * Each payment event consists of:
 *   - a timestamp (in milliseconds)
 *   - a payment pair: [sender, receiver]
 *
 * For every payment event, you must determine whether it occurs
 * within a given `timelimit` of the PREVIOUS payment with the
 * same sender → receiver pair.
 *
 * Rules:
 * 1) If it is the FIRST occurrence of a sender → receiver pair,
 *    the result is false.
 * 2) If the pair has appeared before:
 *      - Compute the time difference between the current timestamp
 *        and the last timestamp for that pair.
 *      - Return true ONLY if:
 *            (currentTime - previousTime) < timelimit
 *        (strictly less than).
 * 3) If a timestamp is missing (undefined), the result must be false.
 * 4) The result array must have the same length as the payments array.
 *
 * Special Case:
 * - If `timestamps.length < payments.length`, missing timestamps
 *   are treated as undefined and must yield false.
 *
 * Function Signature:
 *   getPaymentConfirmationStatus(timestamps, payments, timelimit)
 *
 * ============================================================
 * Solution Approach
 * ============================================================
 * We process payment events in order and keep track of the most recent
 * timestamp for each sender → receiver pair.
 *
 * Data Structure:
 * - Use a Map where:
 *     key   = "sender→receiver"
 *     value = last seen timestamp for that pair
 *
 * Algorithm:
 * 1) Initialize an empty Map `lastSeen`.
 * 2) Iterate over the payments array by index `i`.
 * 3) For each payment:
 *      - Build a unique key from sender and receiver.
 *      - Read timestamp `t = timestamps[i]` (may be undefined).
 *      - If the pair has NOT appeared before:
 *            → result[i] = false
 *            → store timestamp only if it exists
 *      - Else (pair appeared before):
 *            → if t is undefined → result[i] = false
 *            → else:
 *                 diff = t - lastSeen[key]
 *                 result[i] = (diff < timelimit)
 *                 update lastSeen[key] = t
 * 4) Return the result array.
 *
 * ============================================================
 * Complexity Analysis
 * ============================================================
 * Let n = payments.length.
 *
 * Time Complexity:  O(n)
 *   - Each payment is processed once.
 *
 * Space Complexity: O(k)
 *   - k = number of distinct sender → receiver pairs stored in the Map.
 *
 * ============================================================
 */

/**
 * Determines payment confirmation status for each payment event.
 *
 * @param {number[]} timestamps - Array of timestamps in milliseconds
 * @param {[string, string][]} payments - Array of [sender, receiver] pairs
 * @param {number} timelimit - Allowed maximum time gap (exclusive)
 * @returns {boolean[]} Array indicating confirmation status for each payment
 */
function getPaymentConfirmationStatus(timestamps, payments, timelimit) {
  // Map to store the last timestamp for each sender→receiver pair
  const lastSeen = new Map();

  // Result array aligned with payments length
  const result = new Array(payments.length);

  // Iterate through all payment events
  for (let i = 0; i < payments.length; i++) {
    const [sender, receiver] = payments[i];
    const key = `${sender}→${receiver}`;

    // Current timestamp may be undefined if timestamps array is shorter
    const t = timestamps[i];

    // First occurrence of this sender→receiver pair
    if (!lastSeen.has(key)) {
      result[i] = false;

      // Only store timestamp if it exists
      if (t !== undefined) {
        lastSeen.set(key, t);
      }
      continue;
    }

    // Pair has appeared before, but current timestamp is missing
    if (t === undefined) {
      result[i] = false;
      continue;
    }

    // Compute time difference from previous occurrence
    const prev = lastSeen.get(key);
    const diff = t - prev;

    // Confirm only if strictly less than timelimit
    result[i] = diff < timelimit;

    // Update last seen timestamp for this pair
    lastSeen.set(key, t);
  }

  return result;
}

/* ============================================================
   Example Usage
============================================================ */

console.log(
  getPaymentConfirmationStatus(
    [1000, 2000, 3000],
    [["Alice", "Bob"], ["Alice", "Bob"], ["Bob", "Carol"]],
    1500
  )
); // [false, true, false]

console.log(
  getPaymentConfirmationStatus(
    [1000],
    [["A", "B"], ["A", "B"]],
    1000
  )
); // [false, false]
