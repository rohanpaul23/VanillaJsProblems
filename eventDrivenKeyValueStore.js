/**
 * Problem Statement:
 * ------------------
 * Implement a `StoreData` class that functions as a key-value store with event-driven notifications.
 *
 * Requirements:
 *   1. The store must allow adding/updating key-value pairs.
 *   2. You can check if a key exists using `.has(key)`.
 *   3. You can register event listeners with `.on(event, callback)`:
 *        - Direct key events: `on('age', cb)` → fires when the value of 'age' changes.
 *        - Change events: `on('change:age', cb)` → fires when the value of 'age' changes.
 *   4. You can manually trigger events using `.emit(event, oldValue, newValue, key)`.
 *   5. Event callbacks receive `(oldValue, newValue, key)` as arguments.
 *   6. Events fire ONLY when a value changes for an existing key.
 *        - No event on initial set of a key.
 *        - No event when setting the same value again (uses `Object.is` for equality).
 *
 * Event System Rules:
 *   - Multiple listeners per event are supported.
 *   - Removing listeners is possible via the `release()` method returned by `.on()`.
 *   - Errors inside event listeners do not crash the store (they are thrown asynchronously).
 */

class StoreData {
  constructor() {
    // Internal storage for key-value pairs
    this._data = new Map();
    // Internal storage for event listeners: Map<eventName, Set<callbacks>>
    this._events = new Map();
  }

  /**
   * Add or update a key-value pair in the store.
   * - Emits events only when the key already exists AND the value changes.
   * - Uses Object.is() for strict change detection (handles NaN, +0/-0 cases).
   *
   * @param {string} key - The key to add/update.
   * @param {*} value - The new value to set for the key.
   */
  add(key, value) {
    if (typeof key !== 'string' || key.length === 0) {
      throw new TypeError('key must be a non-empty string');
    }

    const hadKey = this._data.has(key);              // Check if key already exists
    const oldValue = hadKey ? this._data.get(key) : undefined;
    const changed = hadKey && !Object.is(oldValue, value); // Only true if existing key and value actually changed

    // Always store the value
    this._data.set(key, value);

    // Only emit events if key existed and value changed
    if (changed) {
      // Emit direct key event: e.g., 'age'
      this.emit(key, oldValue, value, key);
      // Emit change-prefixed event: e.g., 'change:age'
      this.emit(`change:${key}`, oldValue, value, key);
    }
  }

  /**
   * Check if a key exists in the store.
   *
   * @param {string} key - The key to check.
   * @returns {boolean} - True if the key exists, false otherwise.
   */
  has(key) {
    return this._data.has(key);
  }

  /**
   * Register an event listener for a specific event.
   * - Example: store.on('age', cb) or store.on('change:age', cb)
   * - Returns an object with a `.release()` method to unsubscribe.
   *
   * @param {string} event - Event name to listen for.
   * @param {Function} callback - Function to execute when the event is emitted.
   * @returns {{ release: () => void }} - Handle to remove the listener.
   */
  on(event, callback) {
    if (typeof event !== 'string' || event.length === 0) {
      throw new TypeError('event must be a non-empty string');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }

    // Retrieve or create the listener set for the event
    let set = this._events.get(event);
    if (!set) {
      set = new Set();
      this._events.set(event, set);
    }
    set.add(callback);

    // Return unsubscribe handle
    return {
      release: () => {
        const listeners = this._events.get(event);
        if (!listeners) return;
        listeners.delete(callback);
        if (listeners.size === 0) this._events.delete(event);
      },
    };
  }

  /**
   * Manually trigger an event.
   * - Usually called internally by `.add()` when values change.
   * - Calls all registered listeners for the given event name.
   *
   * @param {string} event - Event name to trigger.
   * @param {*} oldValue - The previous value before change.
   * @param {*} newValue - The updated value.
   * @param {string} key - The key that changed.
   */
  emit(event, oldValue, newValue, key) {
    const listeners = this._events.get(event);
    if (!listeners || listeners.size === 0) return;

    // Snapshot to prevent issues if listeners modify the set while iterating
    for (const fn of Array.from(listeners)) {
      try {
        fn(oldValue, newValue, key);
      } catch (err) {
        // Prevent one failing listener from stopping others
        // Throw the error asynchronously
        setTimeout(() => { throw err; }, 0);
      }
    }
  }
}
