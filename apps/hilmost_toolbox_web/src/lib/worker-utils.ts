/**
 * Executes a function in a background Web Worker to keep the main thread responsive.
 *
 * @param fn The function to execute in the worker. Must be self-contained (no external dependencies).
 * @param data The data to pass to the function.
 * @returns A promise that resolves with the function result.
 */
export function runInWorker<T, R>(fn: (data: T) => R, data: T): Promise<R> {
  if (typeof window === "undefined" || !window.Worker) {
    // Fallback to main thread if not in browser or Workers not supported
    return Promise.resolve(fn(data));
  }

  return new Promise((resolve, reject) => {
    try {
      // Create a blob containing the worker code
      const workerCode = `
        onmessage = function(e) {
          try {
            const result = (${fn.toString()})(e.data);
            postMessage({ type: 'success', result: result });
          } catch (error) {
            postMessage({ type: 'error', error: error.message });
          }
        };
      `;

      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      const worker = new Worker(workerUrl);

      worker.onmessage = (e) => {
        if (e.data.type === 'success') {
          resolve(e.data.result);
        } else {
          reject(new Error(e.data.error));
        }
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
      };

      worker.onerror = (e) => {
        reject(new Error(e.message));
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
      };

      worker.postMessage(data);
    } catch (err) {
      reject(err);
    }
  });
}
