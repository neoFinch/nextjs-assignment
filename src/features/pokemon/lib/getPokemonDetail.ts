export interface PokemonDetail {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<any>;
  stats: Array<any>;
}

export async function getPokemonDetail(slug: string): Promise<PokemonDetail> {
  try {
    const apiUrl = process.env.POKEMON_API || 'https://pokeapi.co/api/v2/pokemon';
    const response = await fetch(`${apiUrl}/${slug.toLowerCase()}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pokemon "${slug}" not found`);
      }
      throw new Error(`Failed to fetch Pokemon details: ${response.status} ${response.statusText}`);
    }
    
    const pokemonDetails = await response.json();
    return pokemonDetails;
  } catch (error) {
    throw new Error(`Error fetching Pokemon details for "${slug}"`);
  }
}

