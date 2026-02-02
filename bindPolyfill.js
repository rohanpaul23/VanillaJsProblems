/**
 * ============================
 * Problem: Implement Function.prototype.bind (customBind)
 * ============================
 *
 * JavaScript's `bind` method creates a NEW function that:
 *
 * 1. Permanently binds the `this` value for normal function calls
 * 2. Supports partial application (pre-filling arguments at bind time)
 * 3. Still works correctly when the bound function is used as a constructor
 *
 * Example:
 *
 *   function greet(greeting, name) {
 *     return `${greeting} ${name} from ${this.city}`;
 *   }
 *
 *   const user = { city: "Delhi" };
 *   const sayHello = greet.customBind(user, "Hello");
 *
 *   sayHello("Rohan"); // "Hello Rohan from Delhi"
 *
 * Special (important) behavior:
 * -------------------------------
 * If a bound function is called using `new`,
 * the bound `this` MUST be ignored and a new object
 * created by `new` must be used as `this`.
 *
 *   function Person(name) {
 *     this.name = name;
 *   }
 *
 *   const BoundPerson = Person.customBind({ ignored: true });
 *   const p = new BoundPerson("Rohan");
 *
 *   p.name === "Rohan"          // true
 *   p instanceof Person        // true
 *
 * To support this behavior, we must:
 * - Detect constructor calls using `instanceof`
 * - Preserve the prototype chain
 *
 * Time Complexity:
 * ----------------
 * - Bind creation: O(1)
 * - Each function call: O(n) where n = number of arguments
 *
 * Space Complexity:
 * -----------------
 * - O(n) for storing bound arguments
 */

// DO NOT CHANGE FUNCTION NAME
function customBind(context, ...boundArgs) {
  // `this` refers to the function on which customBind is called
  const originalFn = this;

  // Safety check: bind can only be called on functions
  if (typeof originalFn !== "function") {
    throw new TypeError("customBind must be called on a function");
  }

  // The function returned by bind
  function boundFn(...callTimeArgs) {
    /**
     * Detect if the bound function is being called with `new`
     *
     * - Normal call: boundFn()
     *   → this is undefined (or global object in non-strict mode)
     *
     * - Constructor call: new boundFn()
     *   → this is the newly created object
     */
    const isNew = this instanceof boundFn;

    /**
     * If called with `new`, ignore the bound context and use the new instance
     * Otherwise, use the provided bound context
     */
    const finalThis = isNew ? this : context;

    /**
     * Call the original function with:
     * - Correct `this` value
     * - Bound arguments first
     * - Call-time arguments after
     *
     * Example:
     *   fn.bind(ctx, 1, 2)(3, 4)
     *   → fn(1, 2, 3, 4)
     */
    return originalFn.apply(
      finalThis,
      [...boundArgs, ...callTimeArgs]
    );
  }

  /**
   * Preserve prototype chain
   *
   * This ensures:
   * - new boundFn() instanceof originalFn === true
   * - Prototype methods remain accessible
   */
  if (originalFn.prototype) {
    boundFn.prototype = Object.create(originalFn.prototype);
  }

  // Return the bound wrapper function
  return boundFn;
}

// Attach customBind to Function.prototype
Function.prototype.customBind = customBind;
