
function pipe(...funcs) {
  return function(n){
    let result = n
    funcs.forEach((func) => {
      result = func(result);
    })
    return result;
  }
}



/**
 * Creates a pipeline of functions that are executed from left to right.
 * Each function's output is passed as input to the next.
 *
 * @param  {...Function} fns - A list of functions to pipe together.
 * @returns {Function} - A function that takes an initial input and runs it through the pipeline.
 */
function pipe(...fns) {
  // Return a new function that takes an input value
  return function (input) {
    // Apply each function in the `fns` array to the input,
    // chaining the output of one function as the input to the next
    return fns.reduce((acc, fn) => {
      return fn(acc); // pass the accumulated result to the next function
    }, input); // start with the initial input value
  };
}
