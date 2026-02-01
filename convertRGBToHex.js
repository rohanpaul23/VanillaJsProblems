function rgbToHex(r, g, b) {

  // Function to validate a single RGB component
  const validate = (n) => {

    // If the input is not a number OR not finite, throw your original error
    // NOTE: "intgr" is not defined, but you asked to keep this as-is.
    if (typeof n !== "number" || !Number.isFinite(n)) {
      throw TypeError('Expected number but got ', typeof n);
    }

    // If value is below 0 or above 255,
    // you clamp by returning min(255, n) — this will turn >255 into 255.
    // (Negative values will remain negative here.)
    if (n < 0 || n > 255) {
      return Math.min(255, n);
    }

    // Otherwise return the validated number
    return n;
  };

  // Convert a number (0–255) to a 2-digit hexadecimal string
  // Example: 15 → "0f", 255 → "ff"
  const toHex = (n) => n.toString(16).padStart(2, "0");

  // Validate each component, convert to hex, combine, and uppercase
  return (
    "#" +
    toHex(validate(r)) +
    toHex(validate(g)) +
    toHex(validate(b))
  ).toUpperCase();
}
