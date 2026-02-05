/**
 * =========================================================
 * Problem Statement: Generate a valid CSS selector for a DOM element
 * =========================================================
 *
 * You are given:
 *  - a valid DOM tree root element `root`
 *  - a target DOM element `target` that exists somewhere inside `root`
 *
 * Your task is to generate a **valid CSS selector string** that uniquely
 * targets the `target` element relative to the `root`.
 *
 * Requirements:
 * 1. The selector must be constructed using **direct child selectors (`>`)**
 * 2. Use **tag names** to build the selector path
 * 3. If multiple sibling elements share the same tag name,
 *    use `:nth-of-type(n)` to disambiguate
 * 4. The selector should correctly resolve to the `target` element
 *
 * Examples:
 *
 * Example 1:
 * <div>
 *   <h1>Devtools Tech</h1>
 *   <div>
 *     <p>Subscribe</p>
 *     <a>here</a>
 *   </div>
 * </div>
 *
 * generateSelector(root, target)
 * → "div > div > a"
 *
 * Example 2:
 * <section>
 *   <ul>
 *     <li>Home</li>
 *     <li>Services</li>
 *     <li>Product</li>
 *   </ul>
 * </section>
 *
 * generateSelector(root, target)
 * → "section > ul > li:nth-of-type(3)"
 */

// DO NOT CHANGE FUNCTION NAME
function generateSelector(root, target) {
  'use strict';

  // Basic validation
  if (!root || !target) return '';

  // If root and target are the same, selector is just the root tag
  if (root === target) {
    return root.tagName.toLowerCase();
  }

  // Ensure target is actually inside root
  if (!root.contains(target)) return '';

  /**
   * We will build the selector from the target → root,
   * then reverse it at the end.
   *
   * Example:
   *   target = <a>
   *   parts = ["a", "div", "div"]
   *   final selector = "div > div > a"
   */
  const parts = [];
  let node = target;

  /**
   * Walk upwards in the DOM tree until we reach the root.
   * At each step, determine how to uniquely identify the node
   * among its siblings.
   */
  while (node && node !== root) {
    const parent = node.parentElement;
    if (!parent) break;

    const tagName = node.tagName.toLowerCase();

    /**
     * ---------------------------------------------------------
     * Determine whether `:nth-of-type()` is required
     * ---------------------------------------------------------
     *
     * CSS `:nth-of-type(n)` counts only siblings
     * with the SAME tag name.
     *
     * Example:
     * <ul>
     *   <li></li>   ← nth-of-type(1)
     *   <div></div>
     *   <li></li>   ← nth-of-type(2)
     * </ul>
     */

    const sameTagSiblings = [];

    // Start from the first element child (ignores text nodes)
    let child = parent.firstElementChild;

    // Traverse all element siblings
    while (child) {
      // Only count siblings with the same tag name
      if (child.tagName === node.tagName) {
        sameTagSiblings.push(child);
      }

      // Move to the next sibling element
      child = child.nextElementSibling;
    }

    /**
     * If there is more than one sibling with the same tag,
     * we must use `:nth-of-type(n)` to uniquely identify this node.
     */
    if (sameTagSiblings.length > 1) {
      // nth-of-type is 1-based
      const index = sameTagSiblings.indexOf(node) + 1;
      parts.push(`${tagName}:nth-of-type(${index})`);
    } else {
      // Tag name alone is sufficient
      parts.push(tagName);
    }

    // Move up the DOM tree
    node = parent;
  }

  // Finally include the root tag name
  parts.push(root.tagName.toLowerCase());

  /**
   * We built the selector from bottom → top,
   * so reverse to get root → target order
   */
  return parts.reverse().join(' > ');
}
