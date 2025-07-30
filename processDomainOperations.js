/**
 * Simulates a DNS-like key-value store with support for PUT, GET, and COUNT operations.
 * Optimized by caching COUNT results for repeated suffix queries.
 *
 * @param {string[][]} operations - List of operations to execute.
 * @returns {string[]} - Outputs from GET and COUNT operations in execution order.
 */
function processDomainOperations(operations) {
  const map = new Map();           // Stores domain → IP mappings
  const res = [];                  // Stores output from GET and COUNT operations
  const countCache = new Map();    // Caches results for COUNT operations (suffix → count)

  for (const operation of operations) {
    const opType = operation[0]; // First element indicates operation type

    if (opType === 'PUT') {
      // Format: ['PUT', domain, ip]
      const domain = operation[1];
      const ip = operation[2];
      map.set(domain, ip);        // Add or update the IP for the domain

      countCache.clear();         // Invalidate COUNT cache since the domain list has changed

    } else if (opType === 'GET') {
      // Format: ['GET', domain]
      const domain = operation[1];

      // Retrieve IP if domain exists, else return '404'
      res.push(map.get(domain) || '404');

    } else if (opType === 'COUNT') {
      // Format: ['COUNT', suffix]
      const suffix = operation[1];

      // If we've already computed this suffix, return cached result
      if (countCache.has(suffix)) {
        res.push(countCache.get(suffix));
        continue;
      }

      // Otherwise, count how many domains end with the given suffix
      let count = 0;
      for (const domain of map.keys()) {
        if (domain.endsWith(suffix)) {
          count++;
        }
      }

      const countStr = String(count);           // Convert to string (required by spec/test)
      countCache.set(suffix, countStr);         // Cache the result for future queries
      res.push(countStr);                       // Add result to output
    }
  }

  return res; // Return all collected results
}
