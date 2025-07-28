import {
  fetchPokemonResponseData,
  fetchPokemonData,
  fetchPokemonDataList,
} from '../src/services/pokemon.service.ts';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  basicInfo,
  fakeBaseData,
  fakeParams,
  fakeResponse,
  fakeSpeciesData,
  fakeSpeciesDataWithoutDescriptionAndColor,
  list,
  mockResults,
} from './mocks/mocks.ts';

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('fetchPokemonResponseData', () => {
  it('should fetch data with correct query params', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(fakeResponse),
    });

    const data = await fetchPokemonResponseData(fakeParams.limit, fakeParams.offset);
    expect(fetch).toHaveBeenCalledWith(
      `https://pokeapi.co/api/v2/pokemon?limit=${fakeParams.limit}&offset=${fakeParams.offset}`
    );
    expect(data).toEqual(fakeResponse);
  });
});

describe('fetchPokemonData', () => {
  it('should return enriched pokemon data', async () => {
    mockFetch
      .mockResolvedValueOnce({ json: () => Promise.resolve(fakeBaseData) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(fakeSpeciesData) });

    const result = await fetchPokemonData(basicInfo);

    expect(result).toEqual({
      ...fakeBaseData,
      description: fakeSpeciesData.flavor_text_entries[0].flavor_text,
      color: fakeSpeciesData.color.name,
      base_happiness: 12,
      capture_rate: 12,
      gender: 'genderless',
      is_baby: true,
      is_legendary: true,
    });
  });

  it("should set gray color by default and return description if it doesn't exist", async () => {
    mockFetch
      .mockResolvedValueOnce({ json: () => Promise.resolve(fakeBaseData) })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(fakeSpeciesDataWithoutDescriptionAndColor),
      });

    const result = await fetchPokemonData(basicInfo);

    expect(result.description).toBe('No description available.');
    expect(result.color).toBe('gray');
  });
});

describe('fetchPokemonDataList', () => {
  it('should return correct result', async () => {
    mockFetch.mockResolvedValueOnce({ json: () => Promise.resolve(fakeBaseData) });
    mockFetch.mockResolvedValueOnce({ json: () => Promise.resolve(fakeSpeciesData) });

    const result = await fetchPokemonDataList(list);
    expect(result).toEqual(mockResults);
  });
});
