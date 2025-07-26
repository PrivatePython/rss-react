import { useState } from 'react';

export function useLocalStorage<T>(key: string): [T | null, (value: T) => void] {
  const [data, setData] = useState<T | null>(() => {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  });

  const saveData = (data: T) => {
    setData(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  return [data, saveData];
}
