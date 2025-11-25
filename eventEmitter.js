/**
 * ❓ Problem Statement:
 *
 * Implement a basic Event Emitter class (`Emitter`) that supports:
 *
 * 1. Subscribing to events via `subscribe(eventName, callback)`
 *    - Registers a callback for a given event name.
 *    - Returns a `release()` method to unsubscribe the callback.
 *
 * 2. Emitting events via `emit(eventName, ...args)`
 *    - Triggers all callbacks registered under that event name.
 *    - Forwards any arguments to the callbacks.
 *
 * 💡 Features:
 * - Multiple callbacks can be registered for the same event.
 * - Supports releasing/removing individual callbacks.
 * - Uses Map internally to track callbacks for each event.
 */

class Emitter {
  constructor() {
    // Map of eventName -> array of callback functions
    this.callBacksMap = new Map();
  }

  /**
   * Subscribes a callback function to an event.
   *
   * @param {string} eventName - The name of the event to listen to.
   * @param {Function} callback - The callback function to invoke when the event is emitted.
   * @returns {Object} An object with a `release()` method to unsubscribe the callback.
   */
  subscribe(eventName, callback) {
    // If the event already has subscribers, add to the list
    if (this.callBacksMap.has(eventName)) {
      let currentEvents = this.callBacksMap.get(eventName);
      currentEvents.push(callback);
    } else {
      // Otherwise, create a new array of subscribers
      this.callBacksMap.set(eventName, [callback]);
    }

    // Return an object with a release method to remove this callback
    return {
      release: () => {
        const allCallbacks = this.callBacksMap.get(eventName);
        const index = allCallbacks.indexOf(callback);
        if (index !== -1) {
          allCallbacks.splice(index, 1); // Remove the callback from the array
        }
      }
    };
  }

  /**
   * Emits an event and invokes all registered callbacks with the provided arguments.
   *
   * @param {string} eventName - The name of the event to emit.
   * @param  {...any} args - Arguments to pass to the callback functions.
   */
  emit(eventName, ...args) {
    const callbacksToInvoke = this.callBacksMap.get(eventName);
    // If any callbacks exist for this event, call each with the args
    callbacksToInvoke?.forEach((cb) => {
      cb(...args);
    });
  }
}
