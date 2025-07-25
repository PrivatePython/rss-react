import { getDataFromLS, saveDataInLS } from '../src/helpers/localStorage.ts';

describe('local storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save data to local storage', () => {
    const key = 'key';
    const value = 'value';

    saveDataInLS(key, value);

    expect(localStorage.getItem(key)).toEqual(JSON.stringify(value));
  });

  it('should get existing data', () => {
    const key = 'key';
    const value = 'value';

    localStorage.setItem(key, JSON.stringify(value));

    expect(getDataFromLS(key)).toEqual(value);
  });

  it("should return null if data doesn't exists", () => {
    expect(getDataFromLS('nonExistingKey')).toBeNull();
  });
});
