/**
 * ============================================================
 * Problem Statement
 * ============================================================
 * Implement `getPreferredResponse(endpoints)`:
 *
 * - `endpoints` is an ordered array of URLs (index 0 is highest priority).
 * - Start ALL fetch calls concurrently (not sequentially).
 * - A response is valid only if:
 *    1) fetch resolves (no network error)
 *    2) response.ok is true (HTTP 2xx)
 * - Return parsed JSON from the highest-priority endpoint that succeeds.
 *
 * Priority rule:
 * - Even if a lower-priority endpoint succeeds earlier, we cannot return it
 *   until we know all higher-priority endpoints have failed.
 *
 * Early return:
 * - As soon as we can prove which success is the highest-priority possible,
 *   resolve immediately (don’t wait for lower-priority requests).
 *
 * Reject:
 * - If endpoints is empty => reject
 * - If all endpoints fail (network error or non-2xx) => reject
 * ============================================================
 */

// do not change the function name
function getPreferredResponse(endpoints) {
  return new Promise((resolve, reject) => {
    // 1) Validate input
    if (!Array.isArray(endpoints) || endpoints.length === 0) {
      reject(new Error("getPreferredResponse: endpoints must be a non-empty array."));
      return;
    }

    const n = endpoints.length;

    // Track each endpoint: "pending" | "failed" | "succeeded"
    const state = Array(n).fill("pending");

    // Store successful JSON payload by index
    const successData = Array(n).fill(undefined);

    // Store failures (for meaningful final error)
    const failureReasons = Array(n).fill(undefined);

    let settled = 0;  // how many have finished (success or fail)
    let done = false; // ensure resolve/reject only once

    /**
     * Can we determine the best (highest-priority) success now?
     *
     * If endpoint[i] succeeded, it is eligible ONLY IF all endpoints
     * [0..i-1] have already failed.
     */
    function findEligibleSuccess() {
      for (let i = 0; i < n; i++) {
        if (state[i] !== "succeeded") continue;

        // Ensure all higher-priority indexes failed
        for (let j = 0; j < i; j++) {
          if (state[j] !== "failed") return -1; // cannot decide yet
        }
        return i; // i is the best success we can return now
      }
      return -1;
    }

    function finishSuccess(index) {
      if (done) return;
      done = true;
      resolve(successData[index]);
    }

    function finishFailure() {
      if (done) return;
      done = true;

      const details = failureReasons
        .map((r, i) => `#${i} (${endpoints[i]}): ${r || "failed"}`)
        .join("\n");

      reject(new Error("getPreferredResponse: All endpoints failed.\n" + details));
    }

    // 2) Fire ALL requests concurrently
    endpoints.forEach((url, index) => {
      // IMPORTANT FOR YOUR TESTS:
      // Call fetch with exactly ONE arg so sinon stubs match perfectly.
      fetch(url)
        .then(async (res) => {
          // Non-2xx => failure
          if (!res || !res.ok) {
            const status = res && typeof res.status === "number" ? res.status : "unknown";
            throw new Error(`HTTP ${status}`);
          }

          // Parse JSON payload
          // (Your stubs provide json(), so this is safe for tests)
          return res.json();
        })
        .then((data) => {
          state[index] = "succeeded";
          successData[index] = data;
        })
        .catch((err) => {
          state[index] = "failed";
          failureReasons[index] = err?.message || String(err);
        })
        .finally(() => {
          settled++;

          if (done) return;

          // 3) Early resolve if highest-priority determinable now
          const eligibleIndex = findEligibleSuccess();
          if (eligibleIndex !== -1) {
            finishSuccess(eligibleIndex);
            return;
          }

          // 4) If everything settled and no success => reject
          if (settled === n) {
            finishFailure();
          }
        });
    });
  });
}
