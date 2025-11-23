import PokemonCard from "@/features/pokemon/components/PokemonCard";
import { getPokemonList, type Pokemon } from "@/features/pokemon/lib/getPokemonList";

export default async function Home() {
  const pokemons = await getPokemonList(20, 0);

  return (
    <div className="p-8">
      <main className="flex flex-row flex-wrap justify-start gap-8">
        {pokemons.map((pokemon: Pokemon) => (
          <PokemonCard
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            key={pokemon.id}
          />
        ))}
      </main>
    </div>
  );
}
