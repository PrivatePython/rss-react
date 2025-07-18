export interface IPokemonResponseData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonBasicInfo[];
}

interface PokemonFull {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
}

export interface IPokemonData extends PokemonFull {
  description?: string;
  color: string;
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
  const baseData: PokemonFull = await pokemonRes.json();

  const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${item.name}`);
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

  return {
    name: baseData.name,
    id: baseData.id,
    sprites: baseData.sprites,
    types: baseData.types,
    height: baseData.height,
    weight: baseData.weight,
    description,
    color,
  };
}
