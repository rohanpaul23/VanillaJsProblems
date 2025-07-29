function customFilter(callbackFn, thisArg) {
   if (this == null) {
      throw new TypeError('Array.prototype.filter called on null or undefined');
    }

    // Ensure the callback is a function
    if (typeof callbackFn !== 'function') {
      throw new TypeError(callbackFn + ' is not a function');
    }

  let res = [];
  for (let i = 0; i < this.length; i++) {
    if (callbackFn.call(thisArg, this[i], i, this)) {
      res.push(this[i]);
    }
  }
  return res;
}

Array.prototype.customFilter = customFilter;
