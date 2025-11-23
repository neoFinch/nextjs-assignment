export interface Pokemon {
  id: string;
  name: string;
  image: string;
}

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<Pokemon[]> {
  try {
    const apiUrl = process.env.POKEMON_API || 'https://pokeapi.co/api/v2/pokemon';
    const response = await fetch(`${apiUrl}?limit=${limit}&offset=${offset}`, {
      next: {
        revalidate: 60 * 60 * 1, // 1 hour
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon list: ${response.status} ${response.statusText}`);
    }
    
    const pokemonList = await response.json();
    // console.log({pokemonList});
    if (!pokemonList.results || !Array.isArray(pokemonList.results)) {
      throw new Error('Invalid response format from Pokemon API');
    }
    
    const pokemons = pokemonList.results.map((pokemon: any) => {
      let pokeId = pokemon.url.split("/");
      pokeId = pokeId[pokeId.length - 2];
      
      return {
        id: pokeId,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`,
      };
    });

    return pokemons;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error fetching Pokemon list');
  }
}

