export interface IPokemonResponseData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonBasicInfo[];
}

interface IPokemonFull {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  species: {
    name: string;
    url: string;
  };
}

export interface IPokemonData extends IPokemonFull {
  description?: string;
  color: string;
  gender: string;
  capture_rate: number;
  base_happiness: number;
  is_legendary: boolean;
  is_baby: boolean;
}

export interface IPokemonBasicInfo {
  name: string;
  url: string;
}

export async function fetchPokemonResponseData(
  limit: number = 20,
  offset: number = 0
): Promise<IPokemonResponseData> {
  const pokemonResponseData = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  return await pokemonResponseData.json();
}

export async function fetchPokemonDataList(
  pokemonBasicInfoList: IPokemonBasicInfo[]
): Promise<IPokemonData[]> {
  return await Promise.all(
    pokemonBasicInfoList.map((item: IPokemonBasicInfo) => fetchPokemonData(item))
  );
}

export async function fetchPokemonData(item: IPokemonBasicInfo): Promise<IPokemonData> {
  const pokemonRes = await fetch(item.url);
  const baseData: IPokemonFull = await pokemonRes.json();
  const speciesRes = await fetch(baseData.species.url);
  const speciesData = await speciesRes.json();
  const flavor = speciesData.flavor_text_entries.find(
    (entry: {
      flavor_text: string;
      language: {
        name: string;
        url: string;
      };
    }) => entry.language.name === 'en'
  );

  const description = flavor?.flavor_text?.replace(/\f/g, ' ') || 'No description available.';
  const color =
    !speciesData.color?.name || speciesData.color.name === 'white'
      ? 'gray'
      : speciesData.color.name;
  const gender =
    speciesData.gender_rate === 8
      ? 'female'
      : speciesData.gender_rate === -1
        ? 'genderless'
        : 'male';

  return {
    name: baseData.name,
    id: baseData.id,
    sprites: baseData.sprites,
    types: baseData.types,
    height: baseData.height,
    weight: baseData.weight,
    species: baseData.species,
    description,
    color,
    gender,
    capture_rate: speciesData.capture_rate,
    base_happiness: speciesData.base_happiness,
    is_legendary: speciesData.is_legendary,
    is_baby: speciesData.is_baby,
  };
}
