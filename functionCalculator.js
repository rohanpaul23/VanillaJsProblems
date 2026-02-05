/**
 * Problem Statement:
 * Implement a chainable calculator function `cal(initialValue)` that supports
 * arithmetic operations through method chaining. The calculator should:
 *
 * 1) Start with an initial value: cal(2)
 * 2) Support chainable operations:
 *    - .add(num): adds `num` to the current value
 *    - .sub(num): subtracts `num` from the current value
 * 3) Only produce the final result when .val() is called.
 *
 * Example:
 *   cal(2).add(5).sub(4).val(); // 3
 *
 * Additional requirement:
 * - Invalid (non-numeric) inputs should result in NaN (not throw an error).
 *
 * ------------------------------------------------------------------------
 * Solution Approach (Detailed):
 *
 * We need method chaining, meaning:
 * - Each operation should return the same calculator object so we can call
 *   the next method: cal(2).add(5).sub(4)...
 *
 * We also want the computed value to be private and not pollute global scope:
 * - Use a closure: `currentValue` lives inside `cal` and is only accessible
 *   through the returned object's methods.
 *
 * Handling invalid input (non-numeric):
 * - We normalize all inputs using `Number(...)`.
 *   - If conversion fails, `Number(...)` returns NaN.
 * - JavaScript arithmetic naturally propagates NaN:
 *   - NaN + 5 => NaN
 *   - NaN - 2 => NaN
 * So once invalid input occurs anywhere, the final .val() returns NaN,
 * which matches the test expectation.
 *
 * Time Complexity:
 * - O(k) where k is the number of chained operations performed.
 *
 * Space Complexity:
 * - O(1), only one internal number is stored.
 */

function cal(initialValue) {
  // Convert initialValue into a number.
  // If it's invalid (e.g., "abc"), this becomes NaN.
  let currentValue = Number(initialValue);

  // Return an object whose methods can be chained.
  return {
    /**
     * Adds `num` to the current value.
     * Returns `this` so the call can be chained:
     *   cal(2).add(5).sub(4) ...
     */
    add(num) {
      // Convert operand to number; invalid input => NaN
      // If currentValue is NaN, it stays NaN after arithmetic.
      currentValue += Number(num);
      return this; // enable chaining
    },

    /**
     * Subtracts `num` from the current value.
     * Returns `this` so the call can be chained.
     */
    sub(num) {
      currentValue -= Number(num);
      return this; // enable chaining
    },

    /**
     * Resolves (returns) the final computed value.
     * This is the only method that returns a number, ending the chain.
     */
    val() {
      return currentValue;
    }
  };
}

// Example usage:
// console.log(cal(2).add(5).sub(4).val()); // 3
// console.log(cal(10).sub(3).add(7).val()); // 14
// console.log(cal(2).add("x").val()); // NaN
