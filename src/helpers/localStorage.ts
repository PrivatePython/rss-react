export function saveDataInLocalStorage(key: string, data: string) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromLocalStorage(key: string) {
  const result = localStorage.getItem(key);
  return result ? JSON.parse(result) : null;
}
