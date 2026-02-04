/**
 * getElementsByTagName
 * -------------------
 * Mimics a very basic version of document.getElementsByTagName.
 *
 * NOTE:
 * - This implementation returns a static Array (NOT a live HTMLCollection).
 * - It traverses the DOM tree manually using recursion.
 * - Matching is case-insensitive.
 * - Search starts from document.body.
 *
 * @param {string} tagName - The tag name to search for (e.g. "div", "p")
 * @returns {HTMLElement[]} An array of matched elements
 */
function getElementsByTagName(tagName) {
  // Array to store all matching elements
  const elements = [];

  /**
   * Recursive helper function to traverse the DOM tree
   *
   * @param {Node} ele - Current DOM node being visited
   */
  function getElement(ele) {
    // Check if the current node is an element node
    // and whether its tagName matches the required tagName
    if (
      ele.tagName &&
      ele.tagName.toUpperCase() === tagName.toUpperCase()
    ) {
      // If matched, add the element to the result array
      elements.push(ele);
    }

    // Recursively traverse all child nodes of the current node
    // childNodes includes element, text, and comment nodes
    for (var i = 0; i < ele.childNodes.length; i++) {
      getElement(ele.childNodes[i]);
    }
  }

  // Start traversal from document.body
  // This ensures all visible DOM elements are searched
  getElement(document.body);

  // Return the collected elements
  return elements;
}
