// LocalStorage Helpers
export const getLocalStorage = (key, initialValue) => {
  const savedItem = localStorage.getItem(key);
  return savedItem ? JSON.parse(savedItem) : initialValue;
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
