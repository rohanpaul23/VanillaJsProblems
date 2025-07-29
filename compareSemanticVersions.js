/**
 * Compares two semantic version strings.
 * @param {string} v1 - First version string (e.g. "1.2.3")
 * @param {string} v2 - Second version string (e.g. "1.2.4")
 * @returns {number} - Returns:
 *    1  if v1 > v2,
 *   -1  if v1 < v2,
 *    0  if v1 === v2
 */
function compareSemver(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

  // Compare each corresponding MAJOR, MINOR, PATCH number
  for (let i = 0; i < 3; i++) {
    if (parts1[i] > parts2[i]) return 1;
    if (parts1[i] < parts2[i]) return -1;
  }

  // All components are equal
  return 0;
}
