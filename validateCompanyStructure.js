/**
 * Validates if the given manager-employee relationships form a valid organization.
 *
 * A valid organization must:
 * 1. Have exactly one ultimate leader (someone who reports to no one).
 * 2. Contain no cycles (no person should indirectly or directly report to themselves).
 * 3. Be fully connected (all individuals reachable from the root).
 *
 * @param {string[][]} relationships - Array of [manager, employee] pairs.
 * @returns {boolean} - True if the hierarchy is valid, otherwise false.
 */
function isValidOrganization(relationships) {
  // ✅ Base case: An empty organization is trivially valid
  if (!relationships || relationships.length === 0) return true;

  const managerToReports = new Map();        // manager → list of direct reports
  const personToManagerCount = new Map();    // person → number of managers (in-degree)
  const allPeople = new Set();               // all unique people mentioned

  // 🔁 Step 1: Build the graph and in-degree count
  for (const [manager, employee] of relationships) {
    allPeople.add(manager);
    allPeople.add(employee);

    // Add employee under manager
    if (!managerToReports.has(manager)) {
      managerToReports.set(manager, []);
    }
    managerToReports.get(manager).push(employee);

    // Track how many managers each person has
    personToManagerCount.set(employee, (personToManagerCount.get(employee) || 0) + 1);
    if (!personToManagerCount.has(manager)) {
      personToManagerCount.set(manager, 0); // Ensure manager exists in the map
    }
  }

  // 🧍 Step 2: Identify root(s) — people who don't report to anyone
  const roots = [];
  for (const [person, managerCount] of personToManagerCount.entries()) {
    if (managerCount === 0) {
      roots.push(person);
    }
  }

  // 🚫 Invalid if there is no root or more than one
  if (roots.length !== 1) {
    return false;
  }

  const root = roots[0];

  // 🔍 Step 3: DFS traversal to detect cycles and ensure connectivity
  const visited = new Set();        // Fully processed people
  const recursionPath = new Set();  // People currently on the DFS path (for cycle detection)

  function dfs(person) {
    if (recursionPath.has(person)) {
      return false; // ❌ Cycle detected
    }

    if (visited.has(person)) {
      return true; // ✅ Already visited and processed
    }

    recursionPath.add(person); // Mark current path
    const directReports = managerToReports.get(person) || [];

    // Recursively traverse all reports
    for (const report of directReports) {
      if (!dfs(report)) {
        return false; // ❌ Cycle found deeper in the tree
      }
    }

    recursionPath.delete(person);  // Done with this path
    visited.add(person);           // Mark person as fully visited
    return true;
  }

  // 🚀 Begin DFS from the root
  const isAcyclic = dfs(root);
  const isConnected = visited.size === allPeople.size;

  // ✅ Valid if no cycles and all people are connected to the root
  return isAcyclic && isConnected;
}

