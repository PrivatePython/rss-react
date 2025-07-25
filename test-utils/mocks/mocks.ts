import type { IPokemonBasicInfo } from '../../src/services/pokemon.service.ts';

export const fakeResponse = {
  count: 1,
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
};

export const basicInfo = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' };

export const fakeBaseDataFor = {
  id: 1,
  name: 'bulbasaur',
  sprites: { front_default: 'bulbasaur.png' },
  types: [],
  height: 62,
  weight: 15,
};

export const fakeSpeciesDataWithoutDescriptionAndColor = {
  flavor_text_entries: [],
  color: { name: 'white' },
};

export const list: IPokemonBasicInfo[] = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
];

export const mockResults = [
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
  },
];
