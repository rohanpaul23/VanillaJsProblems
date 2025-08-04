/**
 * Returns the most frequently used word in a given paragraph,
 * excluding words from a banned list (if provided).
 *
 * @param {string} text - The paragraph of text to analyze.
 * @param {string[]} bannedWords - Optional array of words to exclude.
 * @returns {string|null} The most frequent non-banned word, or null if no valid word is found.
 */
function mostUsedWord(text, bannedWords) {

  // Handle empty string input by throwing a TypeError
  if (text === '') {
    throw new TypeError("Input text cannot be an empty string");
  }

  // Convert text to lowercase and extract alphabetic words using regex
  const words = text.toLowerCase().match(/\b[a-z]+\b/g);

  // If no words are found, return null
  if (!words) return null;

  // Create a Set of banned words in lowercase for efficient lookup
  const bannedSet = new Set(bannedWords?.map(w => w.toLowerCase()));

  // Initialize a Map to count frequencies of non-banned words
  const freqMap = new Map();

  // Count occurrences of each valid word
  for (const word of words) {
    if (!bannedSet.has(word)) {
      freqMap.set(word, (freqMap.get(word) || 0) + 1);
    }
  }

  // Initialize variables to track the most frequent word
  let maxWord = null;
  let maxCount = 0;

  // Loop through the frequency map to find the word with the highest count
  for (const [word, count] of freqMap) {
    if (count > maxCount) {
      maxWord = word;
      maxCount = count;
    }
  }

  // Return the most frequent non-banned word
  return maxWord;
}
