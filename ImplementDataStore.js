/**
 * Problem Statement
 * -----------------
 * Implement a tiny in-memory data store (pub/sub style) that:
 *
 * 1) Stores key-value pairs.
 * 2) Allows subscribing listeners (callbacks) to changes:
 *    - Listen to a specific key (e.g. "name")
 *    - Also support a special "change:<key>" channel (e.g. "change:name")
 * 3) When a value is added/updated:
 *    - Store the new value
 *    - Notify listeners with (oldValue, newValue, key)
 *
 * The store should support:
 *  - add(key, value): set/update value and notify listeners
 *  - has(key): check whether the store currently contains a key
 *  - on(eventOrKey, callback): subscribe to a key or event channel
 *
 *
 * Detailed Solution / Design
 * -------------------------
 * We keep two maps:
 *
 * A) data: Record<string, any>
 *    - Holds the latest value for each key.
 *
 * B) listeners: Record<string, Function[]>
 *    - Maps an "event name" to a list of callbacks.
 *    - We support two kinds of event names:
 *        1) key itself: "name"
 *        2) change channel: "change:name"
 *
 * When add(key, value) is called:
 *  1) Read old value from data[key]
 *  2) Write new value to data[key]
 *  3) Trigger callbacks for:
 *      - "change:<key>" first (more explicit channel)
 *      - "<key>" next (direct key listeners)
 *
 * Why call "change:<key>" first?
 *  - It’s more specific and often used for "any update" semantics.
 *  - But this ordering is a choice; you can swap if you want.
 *
 * Important correctness note about `has()`:
 *  - Using `!!this.data[key]` is wrong when the stored value is falsy
 *    (0, false, "", null). A key can exist but still be falsy.
 *  - Correct approach: Object.prototype.hasOwnProperty.call(this.data, key)
 *
 * Minor naming / typo fixes:
 *  - listner -> listeners
 *  - on(key, val) -> on(eventName, callback)
 */

class StoreData {
  constructor() {
    // Holds stored values by key
    this.data = {};

    // Holds arrays of callbacks by event name (key or "change:key")
    this.listeners = {};
  }

  /**
   * Add/update a value and notify listeners.
   * @param {string} key
   * @param {*} val
   */
  add(key, val) {
    // Read old value before overwriting
    const oldVal = this.data[key];

    // Store new value
    this.data[key] = val;

    // Notify all relevant listeners
    this.trigger(oldVal, val, key);
  }

  /**
   * Check whether the store contains the key.
   * IMPORTANT: must not treat falsy values as "missing".
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.data, key);
  }

  /**
   * Subscribe to a key or event channel.
   * Examples:
   *  - store.on("name", cb)
   *  - store.on("change:name", cb)
   *
   * @param {string} eventName
   * @param {(oldVal:any, newVal:any, key:string) => void} callback
   */
  on(eventName, callback) {
    // Create array if first listener for this event name
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    // Add callback to listeners list
    this.listeners[eventName].push(callback);

    // Optional: return an unsubscribe function (handy in real apps)
    // return () => this.off(eventName, callback);
  }

  /**
   * Internal: trigger listeners for both "change:key" and "key".
   * @param {*} oldVal
   * @param {*} val
   * @param {string} key
   */
  trigger(oldVal, val, key) {
    // 1) Trigger change channel listeners first: "change:<key>"
    const changeKey = `change:${key}`;
    if (this.listeners[changeKey]) {
      this.listeners[changeKey].forEach((cb) => {
        cb(oldVal, val, key);
      });
    }

    // 2) Trigger direct key listeners: "<key>"
    if (this.listeners[key]) {
      this.listeners[key].forEach((cb) => {
        cb(oldVal, val, key);
      });
    }
  }

  /**
   * Optional (not requested): remove a specific listener
   * Useful if you want unsubscribe support.
   */
  // off(eventName, callback) {
  //   const arr = this.listeners[eventName];
  //   if (!arr) return;
  //   const idx = arr.indexOf(callback);
  //   if (idx >= 0) arr.splice(idx, 1);
  //   if (arr.length === 0) delete this.listeners[eventName];
  // }
}

/* ----------------------------
   Example usage:

const store = new StoreData();

store.on("name", (oldV, newV, key) => {
  console.log(`[${key}] changed from`, oldV, "to", newV);
});

store.on("change:name", (oldV, newV, key) => {
  console.log(`(change channel) [${key}]`, oldV, "->", newV);
});

store.add("name", "Rohan");
store.add("name", "Paul");

console.log(store.has("name")); // true
store.add("age", 0);
console.log(store.has("age"));  // true (even though value is falsy)

---------------------------- */
