import { getDataFromLocalStorage, saveDataInLocalStorage } from '../src/helpers/localStorage.ts';

describe('local storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save data to local storage', () => {
    const key = 'key';
    const value = 'value';

    saveDataInLocalStorage(key, value);

    expect(localStorage.getItem(key)).toEqual(JSON.stringify(value));
  });

  it('should get existing data', () => {
    const key = 'key';
    const value = 'value';

    localStorage.setItem(key, JSON.stringify(value));

    expect(getDataFromLocalStorage(key)).toEqual(value);
  });

  it("should return null if data doesn't exists", () => {
    expect(getDataFromLocalStorage('nonExistingKey')).toBeNull();
  });
});
