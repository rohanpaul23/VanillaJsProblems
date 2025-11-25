/**
 * Problem Statement:
 * ------------------
 * Implement a function `generateSelector(root, target)` that returns
 * a valid CSS selector string uniquely identifying `target`
 * relative to a given `root` DOM element.
 *
 * Approach (Simplified):
 * - Start at `target` and walk up its ancestors until reaching `root`.
 * - For each element:
 *    * Use its tag name in lowercase (e.g., "div", "a").
 *    * If the element is not the first child, append `:nth-child(n)`
 *      to disambiguate it among siblings.
 * - Collect these selectors bottom → top and join them with ">".
 */

function generateSelector(root, target) {
  const selectors = [];  // store selector parts from target up to root
  let element = target;  // start from the target node

  // Traverse ancestors until reaching the root
  while (element && element !== root) {
    // Start with tag name (e.g., "div", "p", "a")
    let selector = element.tagName.toLowerCase();

    // Find this element's index among its parent's children
    const index = Array.from(element.parentNode.children).indexOf(element);

    // If not the first child, add :nth-child to make it unique
    if (index > 0) {
      selector += `:nth-child(${index + 1})`;
    }

    // Add this selector at the beginning of the array
    selectors.unshift(selector);

    // Move one level up in the DOM tree
    element = element.parentNode;
  }

  // Finally add the root's tag name (if root is valid and reached)
  if (element === root) {
    selectors.unshift(root.tagName.toLowerCase());
  }

  // Join all parts with ">" to form a full CSS path
  return selectors.join(' > ');
}

/* --------------------
   ✅ Example Usage
-------------------- */

const root = document.querySelector("div");   // outermost <div>
const target = document.querySelector("a");   // <a href="...">here</a>

console.log(generateSelector(root, target));
// Example Output: "div > div > a:nth-child(2)"
