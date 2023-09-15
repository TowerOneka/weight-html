const delayMs = 300;

export const stubRequest = <T>(stub: T) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(stub);
    }, delayMs);
  });
};
