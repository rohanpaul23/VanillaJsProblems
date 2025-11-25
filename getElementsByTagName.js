function getElementsByTagName(tagName) {
  // Validate input: tagName must be a string
  if (typeof tagName !== 'string') {
    throw new TypeError('getElementsByTagName expects a string tag name');
  }

  /**
   * Determine the search context (`ctx`):
   * - If `this` is an Element (nodeType === 1) or Document (nodeType === 9), search inside it
   * - Otherwise, default to the global `document`
   *
   * Why:
   * - This makes the function work both like:
   *     getElementsByTagName('p')                  // searches whole document
   *     getElementsByTagName.call(element, 'div') // searches inside element's descendants
   */
  const ctx =
    this && (this.nodeType === 1 /* ELEMENT_NODE */ || this.nodeType === 9 /* DOCUMENT_NODE */)
      ? this
      : document;

  /**
   * Delegate to the native DOM API:
   * - Preserves browser behavior exactly (case-insensitive tag matching, '*' wildcard)
   * - Returns a **live HTMLCollection** that updates automatically when DOM changes
   * - Uses browser's optimized C++ DOM engine internally, making it faster than manual traversal
   */
  return ctx.getElementsByTagName(tagName);
}
