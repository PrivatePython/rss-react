import {
  // getDataFromLocalStorage,
  // saveDataInLocalStorage,
  useLocalStorage,
} from '../src/hooks/useLocalStorage.hooks.ts';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

describe('local storage custom hook', () => {
  const localStorageKey = 'key';

  beforeEach(() => {
    localStorage.clear();
  });

  it("should return null if data doesn't exists", () => {
    const { result } = renderHook(() => useLocalStorage<string>(localStorageKey));

    const [storedValue] = result.current;
    expect(storedValue).toBeNull();
  });

  it('should save data to local storage', () => {
    const value = 'value';
    const { result } = renderHook(() => useLocalStorage<string>(localStorageKey));
    const [, saveDataInLocalStorage] = result.current;

    act(() => {
      saveDataInLocalStorage(value);
    });

    expect(localStorage.getItem(localStorageKey)).toEqual(JSON.stringify(value));
  });

  it('should get existing data', () => {
    const value = 'value';

    localStorage.setItem(localStorageKey, JSON.stringify(value));

    const { result } = renderHook(() => useLocalStorage<string>(localStorageKey));
    const [dataInLocalStorage] = result.current;

    expect(dataInLocalStorage).toEqual(value);
  });
});
