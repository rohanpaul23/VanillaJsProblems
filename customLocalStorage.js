/**
 * Problem Statement:
 * ------------------
 * Implement a custom version of the `window.localStorage` API in JavaScript.
 * 
 * Your custom `localStorage` should:
 * - Store key-value pairs as strings.
 * - Provide the following methods:
 *    - setItem(key, value): Stores or updates a key with a string value.
 *    - getItem(key): Returns the value associated with the key, or `undefined` if not found.
 *    - removeItem(key): Deletes the specified key.
 *    - clear(): Removes all keys from storage.
 *    - key(index): Returns the key at the given index or null if out of range.
 * - Provide a `length` property to get the number of stored items.
 * - Throw appropriate errors when required arguments are missing.
 * 
 * Notes:
 * - Do not use the real window.localStorage.
 * - This is an in-memory storage; it will not persist across page reloads.
 * - All keys and values must be stored as strings.
 */

const localStorage = {
  // Internal object to store key-value pairs
  _store: {},

  /**
   * Returns the number of keys currently stored.
   */
  get length() {
    return Object.keys(this._store).length;
  },

  /**
   * Stores or updates a key with a given value.
   * @param {string} key - The key to set.
   * @param {string} value - The value to associate with the key.
   * @throws {TypeError} if either key or value is missing.
   */
  setItem(key, value) {
    if (arguments.length < 2) {
      throw new TypeError('setItem requires both key and value');
    }

    // Ensure both key and value are stored as strings
    key = String(key);
    value = String(value);

    this._store[key] = value;
  },

  /**
   * Retrieves the value associated with the given key.
   * @param {string} key - The key to retrieve.
   * @returns {string|undefined} - Returns the value if found, or undefined.
   * @throws {TypeError} if no key is provided.
   */
  getItem(key) {
    if (arguments.length === 0) {
      throw new TypeError('getItem requires a key argument');
    }

    key = String(key);

    return this._store[key];
  },

  /**
   * Removes the key and its associated value from storage.
   * @param {string} key - The key to remove.
   */
  removeItem(key) {
    key = String(key);
    delete this._store[key];
  },

  /**
   * Clears all key-value pairs from the storage.
   */
  clear() {
    this._store = {};
  },

  /**
   * Returns the key at the specified index.
   * @param {number} index - The index of the key to retrieve.
   * @returns {string|null} - Returns the key or null if index is out of bounds.
   */
  key(index) {
    const keys = Object.keys(this._store);
    return index >= 0 && index < keys.length ? keys[index] : null;
  }
};
