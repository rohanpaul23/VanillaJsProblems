// DO NOT CHANGE FUNCTION NAME

function maskify(cardNumber) {
  if (typeof cardNumber !== "string" && typeof cardNumber !== "number") {
    return "";
  }

  const str = String(cardNumber);

  if (str.length < 6) return str;

  let result = "";

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];

    // Keep first char and last 4 chars
    if (i === 0 || i >= str.length - 4) {
      result += ch;
    } else {
      // Mask only digits
      if (/\d/.test(ch)) {
        result += "#";
      } else {
        result += ch;
      }
    }
  }

  return result;
}