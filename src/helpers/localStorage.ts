export function saveDataInLS(key: string, data: string) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromLS(key: string) {
  const result = localStorage.getItem(key);
  return result ? JSON.parse(result) : null;
}
