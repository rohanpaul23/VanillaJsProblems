/**
 * ============================================================
 * Problem Statement
 * ============================================================
 * You are given two DOM nodes representing the roots of two
 * independent DOM subtrees.
 *
 * Your task is to determine whether these two DOM trees are
 * structurally and semantically identical.
 *
 * Two DOM trees are considered IDENTICAL if:
 * 1) They have the same node types (ELEMENT_NODE, TEXT_NODE, etc.)
 * 2) For element nodes:
 *    - tagName matches
 *    - all attributes and attribute values match
 *    - children count matches
 *    - children appear in the same order
 * 3) For text nodes:
 *    - textContent matches exactly
 * 4) All corresponding children match recursively
 *
 * Constraints:
 * - Must handle deeply nested DOM structures
 * - Must NOT mutate the DOM
 * - Must work for any valid DOM node
 *
 * Function signature:
 *   identicalDOMTrees(nodeA, nodeB) -> boolean
 *
 * ============================================================
 * High-Level Solution Approach
 * ============================================================
 * This is a classic *tree comparison* problem.
 *
 * We solve it using a **depth-first recursive traversal**:
 *
 * Step 1: Base checks
 *   - If both nodes are the same reference → true
 *   - If either node is null/undefined → false
 *
 * Step 2: Compare node types
 *   - nodeA.nodeType must equal nodeB.nodeType
 *
 * Step 3: Handle node-type–specific comparisons
 *
 *   A) TEXT_NODE
 *      - Compare textContent exactly
 *
 *   B) ELEMENT_NODE
 *      - Compare tagName
 *      - Compare attributes:
 *          * same number of attributes
 *          * same attribute names
 *          * same attribute values
 *      - Compare children:
 *          * same number of childNodes
 *          * recursively compare each child in order
 *
 *   C) Other node types (COMMENT_NODE, etc.)
 *      - You can extend logic if needed
 *      - By default, treat them as equal if nodeType matches
 *
 * Step 4: Recursive traversal
 *   - For each child index `i`, compare:
 *       identicalDOMTrees(nodeA.childNodes[i], nodeB.childNodes[i])
 *
 * ============================================================
 * Complexity Analysis
 * ============================================================
 * Let N be the total number of nodes in the DOM tree.
 *
 * Time Complexity:  O(N)
 *   - Each node is visited once
 *
 * Space Complexity: O(H)
 *   - Recursion stack, where H is the tree height
 *
 * ============================================================
 */

function identicalDOMTrees(nodeA, nodeB) {
  // ----------------------------------------------------------
  // 1) Reference & null checks
  // ----------------------------------------------------------

  // Same reference → identical
  if (nodeA === nodeB) return true;

  // If one is null and the other isn't → not identical
  if (!nodeA || !nodeB) return false;

  // ----------------------------------------------------------
  // 2) Compare node types
  // ----------------------------------------------------------

  if (nodeA.nodeType !== nodeB.nodeType) return false;

  // ----------------------------------------------------------
  // 3) Handle TEXT nodes
  // ----------------------------------------------------------
  if (nodeA.nodeType === Node.TEXT_NODE) {
    // Exact text comparison (no trimming unless explicitly required)
    return nodeA.textContent === nodeB.textContent;
  }

  // ----------------------------------------------------------
  // 4) Handle ELEMENT nodes
  // ----------------------------------------------------------
  if (nodeA.nodeType === Node.ELEMENT_NODE) {
    // 4.1 Compare tag names (case-sensitive in DOM)
    if (nodeA.tagName !== nodeB.tagName) return false;

    // 4.2 Compare attributes
    const attrsA = nodeA.attributes;
    const attrsB = nodeB.attributes;

    // Same number of attributes
    if (attrsA.length !== attrsB.length) return false;

    // Compare each attribute by name and value
    for (let i = 0; i < attrsA.length; i++) {
      const attr = attrsA[i];
      if (nodeB.getAttribute(attr.name) !== attr.value) {
        return false;
      }
    }

    // 4.3 Compare children count
    const childrenA = nodeA.childNodes;
    const childrenB = nodeB.childNodes;

    if (childrenA.length !== childrenB.length) return false;

    // 4.4 Recursively compare children in order
    for (let i = 0; i < childrenA.length; i++) {
      if (!identicalDOMTrees(childrenA[i], childrenB[i])) {
        return false;
      }
    }

    // All checks passed
    return true;
  }

  // ----------------------------------------------------------
  // 5) Other node types (COMMENT_NODE, etc.)
  // ----------------------------------------------------------
  // If needed, extend logic here.
  // Default behavior: same nodeType → identical
  return true;
}

/* ============================================================
   Example Usage
============================================================ */

// Example HTML:
// <div id="a"><span>Hello</span></div>
// <div id="a"><span>Hello</span></div>

// const tree1 = document.querySelector("#tree1");
// const tree2 = document.querySelector("#tree2");
// console.log(identicalDOMTrees(tree1, tree2)); // true
