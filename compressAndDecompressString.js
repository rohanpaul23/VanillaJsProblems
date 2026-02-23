/**
 * Run-Length Encoding (RLE)
 * -------------------------
 * compress("AAAABBBCCC") -> [4,"A",3,"B",3,"C"]
 * decompress([4,"A",3,"B"]) -> "AAAABBB"
 *
 * Guarantees:
 * - Preserves order (unlike Map frequency counting)
 * - Works with digits, whitespace, special chars, etc.
 * - Handles empty string
 * - Throws errors for invalid inputs / malformed compressed arrays
 */

/**
 * @param {string} input
 * @returns {(number|string)[] | ""}  // "" only for empty input to match your Test Case 5
 */
function compress(input) {
  // Test Case 11: invalid input types
  if (typeof input !== "string") {
    throw new TypeError("compress: input must be a string");
  }

  // Test Case 5
  if (input === "") return "";

  const output = [];
  let count = 1;

  // Scan runs: A A A A B B B C C C
  for (let i = 1; i <= input.length; i++) {
    if (input[i] === input[i - 1]) {
      count++;
    } else {
      output.push(count, input[i - 1]);
      count = 1;
    }
  }

  return output;
}

/**
 * @param {any} input
 * @returns {string}
 */
function decompress(input) {
  // We ONLY accept the compressed array format: [count, char, count, char, ...]
  // (So Test Case 12 "A4B3" should error.)
  if (!Array.isArray(input)) {
    throw new TypeError("decompress: input must be an array like [count, char, ...]");
  }

  // Empty compressed array -> empty string (reasonable behavior)
  if (input.length === 0) return "";

  // Must be pairs
  if (input.length % 2 !== 0) {
    throw new Error("decompress: malformed input (odd length, expected count/char pairs)");
  }

  let res = "";

  for (let i = 0; i < input.length; i += 2) {
    const count = input[i];
    const ch = input[i + 1];

    // Validate count
    // Test Case 12: "0A3B" should error because 0 is invalid
    if (!Number.isInteger(count) || count <= 0) {
      throw new Error(`decompress: invalid count at index ${i} (must be positive integer)`);
    }

    // Validate char
    // Must be a string of length 1 (so we can represent whitespace, \n, \t, digits, symbols)
    if (typeof ch !== "string" || ch.length !== 1) {
      throw new Error(`decompress: invalid character at index ${i + 1} (must be 1 char string)`);
    }

    res += ch.repeat(count);
  }

  return res;
}