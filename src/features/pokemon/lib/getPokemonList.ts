export interface Pokemon {
  id: string;
  name: string;
  image: string;
}

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<Pokemon[]> {
  const apiUrl = process.env.POKEMON_API || 'https://pokeapi.co/api/v2/pokemon';
  const data = await fetch(`${apiUrl}?limit=${limit}&offset=${offset}`);
  const pokemonList = await data.json();
  
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
}

