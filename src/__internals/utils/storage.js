import storage from 'local-storage-fallback';

export const saveToStorage = (name, value) =>
  storage.setItem(name, value);

export const getFromStorage = (name) => {
  storage.getItem(name);
};
