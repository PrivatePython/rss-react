export interface IPokemonData {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  description?: string;
  color: string;
}

export interface IPokemonBasicInfo {
  name: string;
  url: string;
}

export async function fetchPokemonData(item: IPokemonBasicInfo): Promise<IPokemonData> {
  try {
    const pokemonRes = await fetch(item.url);
    const baseData = await pokemonRes.json();

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
  } catch (error) {
    console.error('Failed to fetch Pokémon data:', error);
    throw error;
  }
}
