// DO NOT CHANGE THE CLASS NAME
class TaskRunner {
  constructor(concurrency) {
    this.limit = concurrency;
    this.queue = [];
    this.running = 0;
  }

  push(task) {
    return new Promise((resolve, reject) => {
      const runTask = () => {
        this.running++;

        Promise.resolve()
          .then(task)            // runs task(), catches sync throws
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.running--;
            this.next();
          });
      };

      if (this.running < this.limit) {
        runTask();
      } else {
        this.queue.push(runTask);  // ✅ enqueue wrapper
      }
    });
  }

  next() {
    // With concurrency=1, this runs exactly one queued task when the running one finishes.
    // With higher concurrency, this can start as many as possible.
    while (this.queue.length > 0 && this.running < this.limit) {
      const nextTask = this.queue.shift();
      nextTask();
    }
  }
}
