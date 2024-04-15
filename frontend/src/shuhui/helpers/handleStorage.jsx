/* eslint no-underscore-dangle: 0 */
// You can create multiple storage stores
const LOCAL_STORAGE_STORE = "storage_sample";

// Setting data to localStorage
export function setLocalStorage(
  localStorageName,
  localStorageValue,
  isJson = true
) {
  if (isJson) {
    localStorage.setItem(localStorageName, JSON.stringify(localStorageValue));
  } else {
    localStorage.setItem(localStorageName, localStorageValue);
  }
}

// Getting data from localStorage
export function getLocalStorage(localStorageName) {
  let localStorageValue;
  if (localStorage.getItem(localStorageName) !== null) {
    localStorageValue = localStorage.getItem(localStorageName);
  } else {
    localStorageValue = false;
  }

  return JSON.parse(localStorageValue);
}

// Clear data from localStorage
export function clearLocalStorage() {
  localStorage.clear();
}

export const clearLocalStorageAuth = () => {
  clearLocalStorage();
};

export const setLocalStorageAuth = (newLocalStorage) => {
  setLocalStorage(LOCAL_STORAGE_STORE, newLocalStorage);
};

export const getHasLocalStorageAuth = () => {
  // Check local storage
  const localStorageData = getLocalStorage(LOCAL_STORAGE_STORE);
  return { status: !!localStorageData, data: localStorageData.auth };
};
