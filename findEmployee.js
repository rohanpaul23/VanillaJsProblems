/**
 * PROBLEM STATEMENT
 * -----------------
 * You are given a nested JavaScript object representing an organizational hierarchy.
 * Each employee can have zero or more direct reports stored in a `children` array.
 *
 * Your task is to write a function that searches this hierarchy and returns
 * the employee node that matches a given `id`.
 *
 * If the employee does not exist in the hierarchy, return `null`.
 *
 * REQUIREMENTS
 * ------------
 * - Implement a function `findEmployee(employees, id)`
 * - Traverse the hierarchy recursively
 * - Return the full employee object when a match is found
 * - Return `null` if the employee does not exist
 *
 * ASSUMPTIONS
 * -----------
 * - Each employee has a unique `id`
 * - The `children` property may be missing or empty
 *
 * FUNCTION SIGNATURE
 * ------------------
 * function findEmployee(employees, id)
 *
 * ARGUMENTS
 * ---------
 * employees (Object | null)
 *   - The root node of the employee hierarchy
 *   - Each node may contain:
 *     - id (number): unique employee identifier
 *     - name (string): employee name
 *     - children (Array<Object>): optional list of direct reports
 *
 * id (number)
 *   - The employee ID to search for
 *
 * RETURNS
 * -------
 * Object
 *   - The full employee node whose `id` matches the input
 *
 * null
 *   - If the employee is not found
 *   - If the provided hierarchy is null or undefined
 */

/**
 * @param {Object|null} employees
 * @param {number} id
 * @returns {Object|null}
 */
function findEmployee(employees, id) {
  // Base case: empty tree
  if (!employees) return null;

  // Check current employee
  if (employees.id === id) {
    return employees;
  }

  // Recursively search direct reports
  if (Array.isArray(employees.children)) {
    for (const child of employees.children) {
      const result = findEmployee(child, id);
      if (result) return result;
    }
  }

  // Employee not found in this branch
  return null;
}
