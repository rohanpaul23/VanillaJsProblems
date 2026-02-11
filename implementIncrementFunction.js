/**
 * ============================================================
 * Problem Statement
 * ============================================================
 * Implement an `Increment` constructor/function that behaves the same whether
 * it is called with `new` or without `new`, and that maintains an internal
 * counter.
 *
 * The following usage MUST work:
 *
 *   let increment1 = new Increment();
 *   let increment2 = Increment();
 *
 *   console.log(increment1 == +increment2); // true
 *   console.log(`val: ${increment1}`);      // val: 1
 *   console.log(`val: ${increment1}`);      // val: 2
 *   console.log(`val: ${increment1}`);      // val: 3
 *
 * Requirements:
 * 1) `new Increment()` and `Increment()` must produce compatible results.
 * 2) The returned value must behave like a number in numeric contexts:
 *      - `+obj` or `Number(obj)` returns the current count as a number
 *        WITHOUT incrementing it.
 * 3) Each time the object is coerced to a string (e.g. `${obj}` or `String(obj)`):
 *      - return the current count as a string
 *      - THEN increment the counter for the next string coercion.
 * 4) No global variables may be used to store the counter.
 *
 * ============================================================
 * Solution Explanation (How it works)
 * ============================================================
 *
 * A) Make it work with or without `new`
 * -----------------------------------
 * If someone calls `Increment()` without `new`, `this` will NOT be a proper
 * instance. So we detect that and re-invoke using `new`.
 *
 *   if (!(this instanceof Increment)) return new Increment();
 *
 * This guarantees both:
 *   new Increment()  and  Increment()
 * return the same kind of object.
 *
 * B) Private counter using closure (no globals)
 * --------------------------------------------
 * We create `count` inside the function:
 *
 *   let count = 1;
 *
 * This variable is captured by the returned object's methods (closure),
 * so it's private per instance and not stored globally.
 *
 * C) Control JS coercion: numeric vs string
 * ----------------------------------------
 * JavaScript converts objects to primitives in different contexts:
 *
 * - Numeric context (unary +, Number(), == with number):
 *     JS tries `valueOf()` first → we return `count` WITHOUT increment.
 *
 * - String context (template literals `${obj}`, String(obj)):
 *     JS calls `toString()` → we return current `count` as string and
 *     POST-INCREMENT it using `count++`.
 *
 * Why post-increment?
 *   - `count++` returns the current value, THEN increases count.
 *   - So outputs go: "1", "2", "3", ...
 *
 * ============================================================
 * Behavior Summary
 * ============================================================
 * - +obj / Number(obj)     -> calls valueOf() -> returns count (no increment)
 * - `${obj}` / String(obj) -> calls toString() -> returns count, then increments
 * ============================================================
 */

// do not change the function name
function Increment() {
  // 1) Ensure correct behavior whether called with `new` or without it.
  // If called without `new`, `this` is not an instance of Increment.
  // We fix that by returning a proper instance.
  if (!(this instanceof Increment)) {
    return new Increment();
  }

  // 2) Private per-instance counter (no globals).
  // Starts at 1, as shown in the examples.
  let count = 1;

  // 3) Return an object that defines custom coercion behavior.
  return {
    /**
     * Numeric coercion hook.
     * Used by: +obj, Number(obj), obj == 1 (loose equality triggers numeric coercion)
     *
     * Requirement: numeric coercion should NOT increment the counter.
     */
    valueOf() {
      return count;
    },

    /**
     * String coercion hook.
     * Used by: `${obj}`, String(obj)
     *
     * Requirement: string coercion should return the current count,
     * then increment for the next string coercion.
     */
    toString() {
      return String(count++);
    }
  };
}
