class PromiseScheduler {
  constructor(functions) {
    this.functions = functions;
    this.currentIndex = 0;
    this.isPaused = false;
    this.isRunning = false;

    this._pauseRequested = false;
    this._pauseResolvers = [];

    this._inFlight = null;
  }

  getState() {
    return {
      currentIndex: this.currentIndex,
      total: this.functions.length,
      isPaused: this.isPaused,
      isRunning: this.isRunning,
    };
  }

  run() {
    if (this.isRunning) return;

    this.isPaused = false;
    this._pauseRequested = false;
    this.isRunning = true;

    const runNext = () => {
      // Stop if done
      if (this.currentIndex >= this.functions.length) {
        this.isRunning = false;
        return Promise.resolve();
      }

      // Stop if pause requested
      if (this._pauseRequested) {
        this.isPaused = true;
        this.isRunning = false;

        // Resolve all pause waiters
        this._pauseResolvers.forEach(r => r());
        this._pauseResolvers = [];

        return Promise.resolve();
      }

      const fn = this.functions[this.currentIndex];

      // Run current task (support sync + async)
      this._inFlight = Promise.resolve().then(fn);

      return this._inFlight
        .then(() => {
          this._inFlight = null;
          this.currentIndex++;
          return runNext();   // recursively run next
        })
        .catch(() => {
          this._inFlight = null;
          this.currentIndex++;
          return runNext();   // continue even if error
        });
    };

    return runNext();
  }

  pause() {
    if (this.isPaused) return Promise.resolve();

    // If nothing running, pause immediately
    if (!this.isRunning && !this._inFlight) {
      this.isPaused = true;
      this._pauseRequested = true;
      return Promise.resolve();
    }

    this._pauseRequested = true;

    return new Promise(resolve => {
      this._pauseResolvers.push(resolve);
    });
  }

  runAllUnexecutedFunctions() {
    // Request stop of sequential execution
    this._pauseRequested = true;

    const waitForCurrent = this._inFlight
      ? this._inFlight.catch(() => {})
      : Promise.resolve();

    return waitForCurrent.then(() => {
      // Stop sequential loop
      this.isRunning = false;
      this.isPaused = false;

      const remaining = this.functions.slice(this.currentIndex);

      return Promise.all(
        remaining.map(fn => Promise.resolve().then(fn))
      ).then(() => {
        this.currentIndex = this.functions.length;
      });
    });
  }
}