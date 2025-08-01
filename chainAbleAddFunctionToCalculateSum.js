function add(n) {  
  if (typeof n !== 'number' && n !== undefined) {
    throw Error()
  }
  // Initialize with the provided number, or 0 by default
  const numbers = [n === undefined ? 0 : n];


  const calculator = {
    add(x = 0) {
      numbers.push(x);      // Add number or default 0
      return calculator;    // Return self for chaining
    },
    sum() {
      return numbers.reduce((a, b) => a + b, 0);
    }
  };

  return calculator;
}

// add(4).add(2).add(3).sum()
console.log(add().sum())