/**
 * Returns the number of parameters expected by the given function.
 *
 * @param {Function} inputFunction - The function whose parameter count is to be determined.
 * @returns {number} - The number of parameters declared in the function definition.
 * @throws {TypeError} - If the input is not a function.
 */
function getParameterCount(inputFunction) {
  // Check if the input is a function
  if (typeof inputFunction !== "function") {
    throw new TypeError("Expected a function as input");
  }

  // Use the `length` property of the function, which returns the number of declared parameters
  return inputFunction?.length;
}
