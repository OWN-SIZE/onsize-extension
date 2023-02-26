export const useRemoveLocalStorage = () => {
  const removeLocalStorageItem = (...args: string[]) => {
    args.forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  return { removeLocalStorageItem };
};
