function customReverse() {
  // DO NOT REMOVE
  'use strict';

    // 🔒 Ensure 'this' is not null or undefined
    if (this == null) {
      throw new TypeError('Array.prototype.reverse called on null or undefined');
    }

    // 🧱 Convert 'this' into an object (handles arrays and array-like objects)
    const obj = Object(this);

    // 🔢 Ensure length is a valid non-negative integer (like ToUint32)
    const len = obj.length >>> 0;

    // 🧮 Only need to loop halfway to reverse the array
    const middle = Math.floor(len / 2);

    // 🔁 Loop from 0 to middle index
    for (let i = 0; i < middle; i++) {
      const j = len - i - 1; // Mirror index from the end

      // ✅ Check if index i and j exist on the object
      const iExists = i in obj;
      const jExists = j in obj;

      // 🧪 Temporarily store the value at index i (if it exists)
      const temp = iExists ? obj[i] : undefined;

      // ↔️ Move value at j to i, or delete i if j doesn't exist
      if (jExists) {
        obj[i] = obj[j];
      } else {
        delete obj[i];
      }

      // ↔️ Move temp (original i) to j, or delete j if i didn't exist
      if (iExists) {
        obj[j] = temp;
      } else {
        delete obj[j];
      }
    }

    // 🔄 Return the modified object/array (reversed in-place)
    return obj;
}