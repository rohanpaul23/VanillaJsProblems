/**
 * ============================================================
 * Problem Statement
 * ============================================================
 * You are designing a simplified deferred task engine for an Uber-like driver system.
 *
 * The driver exposes chainable methods like:
 *   pick(name, location), drive(distance), drop(), rest(duration), status(), coffeeBreak(duration)
 *
 * Key requirements:
 * 1) Method chaining: every method returns the same UberDriver instance.
 * 2) Deferred execution: calling methods only enqueues actions; nothing runs immediately.
 * 3) Awaitable chain: the final chained object must be awaitable (Promise-like),
 *    so you can do:
 *       const result = await new UberDriver().pick(...).drive(...).rest(...);
 * 4) Priority rule: coffeeBreak() has the highest priority.
 *    - All coffeeBreak actions must execute BEFORE any other action,
 *      regardless of where they appear in the chain.
 *    - Multiple coffeeBreak calls are allowed and must keep their insertion order.
 * 5) Order rule: all non-coffee actions execute in the exact order they were added.
 * 6) The awaited result resolves to an array of strings describing the actual execution order.
 *
 * Example:
 *   const result = await new UberDriver()
 *     .pick("Alice", 1)
 *     .drive(5)
 *     .coffeeBreak(3)
 *     .pick("Bob", 2)
 *     .status()
 *     .drop()
 *     .rest(2);
 *
 * Expected result:
 * [
 *   "coffeeBreak(3)",
 *   "pick(Alice,1)",
 *   "drive(5)",
 *   "pick(Bob,2)",
 *   "status()",
 *   "drop()",
 *   "rest(2)"
 * ]
 *
 * ============================================================
 * Detailed Solution Approach
 * ============================================================
 * We solve this with three ideas:
 *
 * A) Record actions, do not run them
 *    - Each chain call stores an "action descriptor" in an internal list:
 *        { label: string, priority: number, i: insertionIndex }
 *    - label:    the output string we want in the result
 *    - priority: 0 for coffeeBreak, 1 for normal actions
 *    - i:        insertion counter (0,1,2,...) so we can preserve insertion order
 *
 * B) Compute execution order at the end (when awaited)
 *    - When execution starts, we sort actions by:
 *        (priority ASC, insertionIndex ASC)
 *      This ensures:
 *        - all coffeeBreak first (priority 0)
 *        - normal actions next (priority 1)
 *        - stable ordering within each priority group via insertionIndex
 *
 * C) Make the chain awaitable using a "thenable"
 *    - JavaScript `await` works on Promises AND on objects that have a `.then()` method.
 *    - We implement `.then(res, rej)`:
 *        - On first await / then-call, lazily create a Promise by calling `_run()`
 *        - Cache that Promise so multiple awaits do NOT re-execute actions
 *        - Return `this._promise.then(res, rej)` to behave like a real Promise
 *
 * Note: In this simplified version, we don't perform real async work per action—
 * we just return the label list in correct execution order. `_run()` is `async`,
 * so it still returns a Promise and satisfies the "awaitable" requirement.
 *
 * ============================================================
 * Complexity
 * ============================================================
 * Let N be number of actions.
 * - Enqueue: O(1) per call
 * - Execution sorting: O(N log N)
 * - Building result: O(N)
 * - Space: O(N)
 */

class UberDriver {
  constructor() {
    // Stores all actions in the order they were enqueued.
    // Each item: { label, priority, i }
    this.actions = [];

    // Promise cache so execution happens once even if awaited multiple times.
    this._promise = null;

    // Insertion counter to preserve enqueue order when priorities are equal.
    this._i = 0;
  }

  /**
   * Internal helper to add an action descriptor.
   *
   * @param {string} label - string representation used in final output
   * @param {number} [priority=1] - 0 for coffeeBreak, 1 for normal actions
   * @returns {UberDriver} - return `this` to enable chaining
   */
  _add(label, priority = 1) {
    // Store insertion index so we can deterministically preserve original order.
    this.actions.push({ label, priority, i: this._i++ });

    // Must return the same instance for chaining.
    return this;
  }

  // ---------------------------
  // Chainable API Methods
  // ---------------------------

  pick(name, location) {
    // Normal priority action.
    return this._add(`pick(${name},${location})`, 1);
  }

  drive(distance) {
    // Normal priority action.
    return this._add(`drive(${distance})`, 1);
  }

  drop() {
    // Normal priority action.
    return this._add(`drop()`, 1);
  }

  rest(duration) {
    // Normal priority action.
    return this._add(`rest(${duration})`, 1);
  }

  status() {
    // Normal priority action.
    return this._add(`status()`, 1);
  }

  coffeeBreak(duration) {
    // Highest priority action: must execute before all others.
    return this._add(`coffeeBreak(${duration})`, 0);
  }

  /**
   * Execute all queued actions in the correct order and produce the output array.
   *
   * Because this is an `async` function, it returns a Promise that resolves
   * to the final array of labels. (Even though we don't `await` anything here.)
   *
   * @returns {Promise<string[]>}
   */
  async _run() {
    // We copy actions because sort() mutates arrays. We don't want to reorder
    // the original `this.actions` permanently (safer + avoids surprises).
    const ordered = [...this.actions].sort(
      // Primary sort: priority (coffeeBreak=0 before normal=1)
      // Secondary sort (tie-break): insertion index `i` (preserve enqueue order)
      (a, b) => a.priority - b.priority || a.i - b.i
    );

    // Return the action labels in the actual execution order.
    return ordered.map((a) => a.label);
  }

  /**
   * Thenable interface: makes the UberDriver instance awaitable.
   *
   * `await driver` triggers `driver.then(resolve, reject)` internally.
   * We lazily start `_run()` here and cache the Promise so that multiple
   * awaits or `.then()` calls do NOT re-run the actions.
   */
  then(res, rej) {
    // Lazily create the promise only once (single execution semantics).
    if (!this._promise) this._promise = this._run();

    // Delegate to the underlying promise, just like a real Promise would.
    return this._promise.then(res, rej);
  }
}

/* -----------------------------
   Example usage
-------------------------------- */
(async () => {
  const result = await new UberDriver()
    .pick("Alice", 1)
    .drive(5)
    .coffeeBreak(3)
    .pick("Bob", 2)
    .status()
    .drop()
    .rest(2);

  console.log(result);
  // [
  //   "coffeeBreak(3)",
  //   "pick(Alice,1)",
  //   "drive(5)",
  //   "pick(Bob,2)",
  //   "status()",
  //   "drop()",
  //   "rest(2)"
  // ]
})();
