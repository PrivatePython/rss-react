import type { IPokemonBasicInfo, IPokemonData } from '../../src/services/pokemon.service.ts';

export const fakeResponse = {
  count: 1000,
  next: null,
  previous: null,
  results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
};

export const fakeParams: {
  limit: number;
  offset: number;
} = {
  limit: 10,
  offset: 5,
};

export const fakeBaseData = {
  id: 1,
  name: 'bulbasaur',
  sprites: { front_default: 'sprite.png' },
  types: [{ type: { name: 'grass' } }],
  height: 7,
  weight: 69,
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/spcies/1/',
  },
};

export const fakeSpeciesData = {
  flavor_text_entries: [
    {
      flavor_text: 'A strange seed was planted.',
      language: { name: 'en', url: '' },
    },
  ],
  color: { name: 'green' },
  gender_rate: -1,
  capture_rate: 12,
  base_happiness: 12,
  is_legendary: true,
  is_baby: true,
};

export const basicInfo = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' };

export const fakeSpeciesDataWithoutDescriptionAndColor = {
  flavor_text_entries: [],
  color: { name: 'white' },
};

export const list: IPokemonBasicInfo[] = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
];

export const mockResults: IPokemonData[] = [
  {
    color: 'green',
    description: 'A strange seed was planted.',
    height: 7,
    id: 1,
    name: 'bulbasaur',
    sprites: {
      front_default: 'sprite.png',
    },
    types: [
      {
        type: {
          name: 'grass',
        },
      },
    ],
    weight: 69,
    species: {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/spcies/1/',
    },
    gender: 'genderless',
    captureRate: 12,
    baseHappiness: 12,
    isLegendary: true,
    isBaby: true,
  },
];
