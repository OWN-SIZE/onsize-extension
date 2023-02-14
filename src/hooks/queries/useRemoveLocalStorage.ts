export const useRemoveLocalStorage = () => {
  const removeLocalStorageItem = (...args: unknown[]) => {
    args.forEach((key) => localStorage.removeItem(`${key}`));
  };

  return { removeLocalStorageItem };
};
