/**
 * CustomPromise (class-based) with polyfills:
 * ✅ Instance methods: then, catch, finally
 * ✅ Static methods: resolve, reject, all, race, allSettled, any
 *
 * Notes about THIS implementation:
 * - Uses queueMicrotask to behave asynchronously like native Promises.
 * - "Promise adoption" is limited to `instanceof CustomPromise` (NOT full thenable assimilation).
 * - `reject(value instanceof CustomPromise)` adopts that promise too (this is different from native Promise,
 *   but I kept it consistent with your original code).
 */

class CustomPromise {
  /**
   * ==========================================================
   * constructor(executorfunction)
   * ==========================================================
   * Single-sentence use-case summary:
   * - Initializes internal state + callback queues, runs the executor immediately
   *   with bound resolve/reject, and auto-rejects if the executor throws.
   */
  constructor(executorfunction) {
    /**
     * ===========================
     * 1) INTERNAL PROMISE STATE
     * ===========================
     * Use-cases handled here:
     * - Start in "pending" (not finished yet)
     * - Later become "fulfilled" (success) OR "rejected" (failure)
     * - Store the final value (success value or error reason)
     */
    this.value = undefined;
    this.state = "pending";

    /**
     * ===========================
     * 2) CALLBACK QUEUES
     * ===========================
     * Use-cases handled here:
     * - Store .then() success handlers until the promise resolves
     * - Store .then() error handlers / .catch() handlers until the promise rejects
     * - Support multiple .then() calls by queuing multiple callbacks
     */
    this.thenCallbacks = [];
    this.catchCallbacks = [];

    /**
     * ===========================
     * 3) EXECUTOR RUN + SYNC ERROR CAPTURE
     * ===========================
     * Use-cases handled here:
     * - Executor runs immediately (like native Promise)
     * - resolve/reject are passed with correct `this` (bound to this instance)
     * - If executor throws synchronously, reject the promise with that error
     */
    try {
      executorfunction(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  /**
   * ==========================================================
   * runCallbacks()
   * ==========================================================
   * Single-sentence use-case summary:
   * - When settled, run queued success callbacks if fulfilled OR queued error
   *   callbacks if rejected, passing the stored value/reason, then clear queues.
   *
   * Where `result` comes from:
   * - We call each wrapper callback as callback(this.value), so `result === this.value`.
   */
  runCallbacks() {
    if (this.state === "fulfilled") {
      this.thenCallbacks.forEach((callback) => callback(this.value));
      this.thenCallbacks = [];
    } else if (this.state === "rejected") {
      this.catchCallbacks.forEach((callback) => callback(this.value));
      this.catchCallbacks = [];
    }
  }

  /**
   * ==========================================================
   * resolve(value)
   * ==========================================================
   * Single-sentence use-case summary:
   * - Asynchronously fulfill once, optionally adopt another CustomPromise,
   *   store final value, and flush success handlers.
   */
  resolve(value) {
    queueMicrotask(() => {
      if (this.state !== "pending") return;

      // Adoption (unwrap) if resolving with another CustomPromise
      if (value instanceof CustomPromise) {
        return value.then(this.resolve.bind(this), this.reject.bind(this));
      }

      this.state = "fulfilled";
      this.value = value;
      this.runCallbacks();
    });
  }

  /**
   * ==========================================================
   * reject(value)
   * ==========================================================
   * Single-sentence use-case summary:
   * - Asynchronously reject once, optionally adopt another CustomPromise (your behavior),
   *   store rejection reason, and flush error handlers.
   */
  reject(value) {
    queueMicrotask(() => {
      if (this.state !== "pending") return;

      // NOTE: This adoption-on-reject matches your original implementation
      if (value instanceof CustomPromise) {
        return value.then(this.resolve.bind(this), this.reject.bind(this));
      }

      this.state = "rejected";
      this.value = value;
      this.runCallbacks();
    });
  }

  /**
   * ==========================================================
   * then(thenCb, catchCb)
   * ==========================================================
   * Single-sentence use-case summary:
   * - Register success & error handlers, return a NEW CustomPromise for chaining,
   *   forward values/errors if handlers missing, resolve next with returned value,
   *   and reject next if handler throws.
   */
  then(thenCb, catchCb) {
    return new CustomPromise((resolve, reject) => {
      // Success wrapper
      this.thenCallbacks.push((result) => {
        if (!thenCb) return resolve(result);
        try {
          resolve(thenCb(result));
        } catch (error) {
          reject(error);
        }
      });

      // Error wrapper
      this.catchCallbacks.push((result) => {
        if (!catchCb) return reject(result);
        try {
          resolve(catchCb(result)); // returning value = recovery => next promise fulfills
        } catch (error) {
          reject(error);
        }
      });

      // If already settled, flush immediately
      this.runCallbacks();
    });
  }

  /**
   * ==========================================================
   * catch(catchCb)
   * ==========================================================
   * Single-sentence use-case summary:
   * - Shorthand for error handling by delegating to then(null, catchCb).
   */
  catch(catchCb) {
    return this.then(null, catchCb);
  }

  /**
   * ==========================================================
   * finally(onFinally)
   * ==========================================================
   * Single-sentence use-case summary:
   * - Runs cleanup on success or failure, waits if cleanup returns CustomPromise,
   *   preserves original value/reason if cleanup succeeds, but rejects with cleanup
   *   error if cleanup throws or fails.
   */
  finally(onFinally) {
    const cb = typeof onFinally === "function" ? onFinally : () => { };

    return this.then(
      (value) => {
        try {
          const result = cb();
          if (result instanceof CustomPromise) {
            return result.then(() => value);
          }
          return value;
        } catch (error) {
          return new CustomPromise((_, reject) => reject(error));
        }
      },
      (reason) => {
        try {
          const result = cb();
          if (result instanceof CustomPromise) {
            return result.then(() => {
              throw reason;
            });
          }
          throw reason;
        } catch (error) {
          return new CustomPromise((_, reject) => reject(error));
        }
      }
    );
  }

  // ==========================================================================
  // ✅ STATIC "POLYFILL" METHODS (Promise.* equivalents)
  // ==========================================================================

  /**
   * ==========================================================
   * CustomPromise.resolve(x)
   * ==========================================================
   * Use-cases handled:
   * - Wrap a normal value into a resolved CustomPromise
   * - If x is already a CustomPromise, return it as-is (no double wrapping)
   */
  static resolve(x) {
    if (x instanceof CustomPromise) return x;
    return new CustomPromise((resolve) => resolve(x));
  }

  /**
   * ==========================================================
   * CustomPromise.reject(reason)
   * ==========================================================
   * Use-cases handled:
   * - Create an already-rejected CustomPromise with the given reason
   */
  static reject(reason) {
    return new CustomPromise((_, reject) => reject(reason));
  }

  /**
   * ==========================================================
   * CustomPromise.all(iterable)
   * ==========================================================
   * Use-cases handled:
   * - Wait for ALL items to fulfill (items can be values or CustomPromises)
   * - Preserve original order of results
   * - Reject immediately if ANY item rejects (fail-fast)
   * - Resolve immediately with [] for empty input
   */
  static all(iterable) {
    return new CustomPromise((resolve, reject) => {
      const items = Array.from(iterable);

      if (items.length === 0) return resolve([]);

      const results = new Array(items.length);
      let remaining = items.length;

      items.forEach((item, index) => {
        CustomPromise.resolve(item).then(
          (value) => {
            results[index] = value;
            remaining -= 1;
            if (remaining === 0) resolve(results);
          },
          (err) => {
            // Fail-fast: first rejection rejects the whole all()
            reject(err);
          }
        );
      });
    });
  }

  /**
   * ==========================================================
   * CustomPromise.race(iterable)
   * ==========================================================
   * Use-cases handled:
   * - Settle as soon as the FIRST item settles (fulfill or reject)
   * - Accept values or CustomPromises
   */
  static race(iterable) {
    return new CustomPromise((resolve, reject) => {
      for (const item of iterable) {
        CustomPromise.resolve(item).then(resolve, reject);
      }
    });
  }

  /**
   * ==========================================================
   * CustomPromise.allSettled(iterable)
   * ==========================================================
   * Use-cases handled:
   * - Wait for ALL items to finish (fulfilled or rejected)
   * - Never rejects; always resolves to an array of outcome objects
   * - Preserves input order
   * - Resolve immediately with [] for empty input
   */
  static allSettled(iterable) {
    return new CustomPromise((resolve) => {
      const items = Array.from(iterable);

      if (items.length === 0) return resolve([]);

      const results = new Array(items.length);
      let remaining = items.length;

      items.forEach((item, index) => {
        CustomPromise.resolve(item).then(
          (value) => {
            results[index] = { status: "fulfilled", value };
            remaining -= 1;
            if (remaining === 0) resolve(results);
          },
          (reason) => {
            results[index] = { status: "rejected", reason };
            remaining -= 1;
            if (remaining === 0) resolve(results);
          }
        );
      });
    });
  }

  /**
   * ==========================================================
   * CustomPromise.any(iterable)
   * ==========================================================
   * Use-cases handled:
   * - Resolve as soon as ANY item fulfills
   * - If ALL items reject, reject with AggregateError (like native Promise.any)
   * - Reject immediately for empty input (native rejects with AggregateError)
   */
  static any(iterable) {
    return new CustomPromise((resolve, reject) => {
      const items = Array.from(iterable);

      if (items.length === 0) {
        return reject(new AggregateError([], "All promises were rejected"));
      }

      const errors = new Array(items.length);
      let rejectedCount = 0;

      items.forEach((item, index) => {
        CustomPromise.resolve(item).then(
          (value) => {
            resolve(value); // first fulfillment wins
          },
          (err) => {
            errors[index] = err;
            rejectedCount += 1;

            if (rejectedCount === items.length) {
              reject(new AggregateError(errors, "All promises were rejected"));
            }
          }
        );
      });
    });
  }
}