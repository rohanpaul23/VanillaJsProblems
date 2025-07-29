function isArrayPolyfill(value){
  // Object.prototype.toString.call(value) safely gets the internal class of any value.
  // For arrays, it always returns: '[object Array]'
  // This works even across different execution contexts (e.g., iframes, workers)
  return Object.prototype.toString.call(value) === '[object Array]';
}