export interface PokemonDetail {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    stat: {
      name: string;
    };
    base_stat: number;
  }>;
}

export async function getPokemonDetail(slug: string): Promise<PokemonDetail> {
  const apiUrl = process.env.POKEMON_API || 'https://pokeapi.co/api/v2/pokemon';
  const data = await fetch(`${apiUrl}/${slug.toLowerCase()}`);
  const pokemonDetails = await data.json();
  return pokemonDetails;
}

