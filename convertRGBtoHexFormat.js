/**
 * ==========================================================
 * Problem: RGB to HEX Conversion
 * ==========================================================
 *
 * You need to create a function `rgbToHex` that converts
 * RGB values to a HEX color string.
 *
 * Syntax:
 * rgbToHex(r, g, b)
 *
 * Parameters:
 * - r: string | number → Red channel (0–255)
 * - g: string | number → Green channel (0–255)
 * - b: string | number → Blue channel (0–255)
 *
 * Rules:
 * 1. All parameters are mandatory.
 * 2. If any parameter is null or undefined → throw an error.
 * 3. If any parameter is not a valid number → throw an error.
 * 4. Values must be clamped between 0 and 255.
 * 5. The final HEX value must:
 *      - Be 6 digits
 *      - Be uppercase
 *      - Be prefixed with "#"
 *
 * Examples:
 *
 * rgbToHex(255, 255, 255) → "#FFFFFF"
 * rgbToHex(0, 0, 0)       → "#000000"
 * rgbToHex(186, 218, 85)  → "#BADA55"
 * rgbToHex(256, 255, 255) → "#FFFFFF"
 * rgbToHex(null, null, null) → Throw Error
 *
 * ==========================================================
 * Approach:
 * ==========================================================
 *
 * 1️⃣ Validate input presence (null / undefined check)
 * 2️⃣ Convert each value to Number
 * 3️⃣ Validate numeric conversion
 * 4️⃣ Clamp values between 0–255
 * 5️⃣ Convert each value to hex using base-16
 * 6️⃣ Ensure each hex value is exactly 2 characters
 * 7️⃣ Convert to uppercase
 * 8️⃣ Concatenate into final "#RRGGBB" format
 *
 * ==========================================================
 */

function rgbToHex(r, g, b) {
  // 1️⃣ Check if any parameter is null or undefined
  // Using == null catches both null and undefined
  if (r == null || g == null || b == null) {
    throw new Error("All RGB parameters are required.");
  }

  /**
   * Helper function to:
   * - Convert input to number
   * - Validate numeric conversion
   * - Clamp value between 0–255
   * - Convert to 2-digit uppercase hex
   */
  function convert(channel) {
    // 2️⃣ Convert input to a number
    const num = Number(channel);

    // 3️⃣ If conversion fails → NaN
    if (Number.isNaN(num)) {
      throw new Error("RGB values must be valid numbers.");
    }

    // 4️⃣ Clamp value between 0 and 255
    // If value < 0 → 0
    // If value > 255 → 255
    const clamped = Math.min(255, Math.max(0, num));

    // 5️⃣ Convert decimal to hexadecimal (base-16)
    // Example:
    // 186 → "ba"
    const hex = clamped.toString(16);

    // 6️⃣ Ensure exactly 2 characters
    // Example:
    // "f" → "0f"
    const padded = hex.padStart(2, "0");

    // 7️⃣ Convert to uppercase
    return padded.toUpperCase();
  }

  // 8️⃣ Convert each channel and combine
  const redHex = convert(r);
  const greenHex = convert(g);
  const blueHex = convert(b);

  return `#${redHex}${greenHex}${blueHex}`;
}
