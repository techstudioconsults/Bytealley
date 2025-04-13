/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/polyfills.ts
export function applyPolyfills() {
  if (typeof Promise.withResolvers !== "function") {
    Promise.withResolvers = function withResolvers<T>() {
      let resolve: (value: T | PromiseLike<T>) => void = undefined!;
      let reject: (reason?: any) => void = undefined!;
      const promise = new Promise<T>((response, rej) => {
        resolve = response;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  }
}
