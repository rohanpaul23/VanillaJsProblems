/**
 * ============================================================
 * Problem Statement
 * ============================================================
 * Implement `composeAsync(...fns)` which composes multiple async functions
 * into a single async function.
 *
 * Composition order is RIGHT -> LEFT:
 *   composeAsync(f3, f2, f1)(...args)
 * executes as:
 *   f3(await f2(await f1(...args)))
 *
 * Requirements:
 * - Each function can be async (returns a Promise) OR sync (returns a value).
 * - The RIGHTMOST function (last one) can accept multiple arguments.
 * - Every function to its left receives exactly ONE argument:
 *   the resolved result of the function to its right.
 * - If no functions are provided, return an async identity function that
 *   resolves to the first argument.
 * - If any function rejects/throws, the composed function must reject.
 *
 * ============================================================
 * Solution Approach
 * ============================================================
 * 1) If `fns` is empty:
 *      return async (...args) => args[0]
 *
 * 2) Otherwise return an async function (...args):
 *    - Start by calling the last function with all args:
 *          result = await fns[last](...args)
 *    - Then iterate leftwards:
 *          result = await fns[i](result)
 *    - Return the final result.
 *
 * Why this passes your tests:
 * - Test 1,6: multi-args only go to the last function via (...args).
 * - Test 2,3,7: each next function receives previous resolved output.
 * - Test 4: empty composeAsync() returns identity (first arg).
 * - Test 5: rejection/throw naturally propagates through await.
 *
 * ============================================================
 * Complexity
 * ============================================================
 * n = number of functions
 * Time:  O(n)
 * Space: O(1) (ignoring Promise internals)
 */

function composeAsync(...fns) {
  // ---------------------------
  // Identity case (no functions)
  // ---------------------------
  if (fns.length === 0) {
    // Must be awaitable: return an async function
    return async (...args) => args[0];
  }

  // ---------------------------
  // Return the composed async function
  // ---------------------------
  return async function (...args) {
    // 1) Invoke the RIGHTMOST function with all initial arguments.
    //    This is the ONLY function allowed to take multiple args.
    let result = await fns[fns.length - 1](...args);

    // 2) Feed result into remaining functions from right to left.
    for (let i = fns.length - 2; i >= 0; i--) {
      result = await fns[i](result);
    }

    // 3) Final output
    return result;
  };
}

/* ============================================================
   Quick sanity checks for your test cases
   (Kept minimal; your test runner will assert these)
============================================================ */

// Test 4: Identity case
composeAsync()(123).then(console.log); // 123
