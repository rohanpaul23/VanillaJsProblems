/**
 * This code demonstrates how to create a clean (pure) object without a prototype.
 * 
 * Normally, JavaScript objects inherit from Object.prototype and include built-in methods like:
 *   - toString()
 *   - hasOwnProperty()
 *   - constructor
 * 
 * This inheritance can sometimes cause issues in certain use cases,
 * especially when using the object as a dictionary/map.
 * 
 * ✅ This is how you create a pure object — one that:
 * 
 * - Has no inherited methods like:
 *     - .toString()
 *     - .hasOwnProperty()
 *     - .constructor
 * 
 * - Is useful for:
 *     - Clean key-value storage
 *     - Preventing prototype pollution
 *     - Dictionary-like objects where inherited props might interfere
 */

// Declare a variable named `devtools`
var test;

// Create an object with **no prototype** using Object.create(null)
test = Object.create(null);