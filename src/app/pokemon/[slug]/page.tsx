import TypeBadge from "@/features/pokemon/components/TypeBadge";
import Image from "next/image";
import { getPokemonDetail } from "@/features/pokemon/lib/getPokemonDetail";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pokemonDetails = await getPokemonDetail(slug);


  return (
    <div className="flex flex-row flex-wrap items-center justify-center p-8 gap-8">
      <h1 className="w-full text-5xl font-bold capitalize text-center pb-12">
        {pokemonDetails.name}
      </h1>
      <Image
        src={pokemonDetails.sprites.other["official-artwork"].front_default}
        alt={pokemonDetails.name}
        width={300}
        height={300}
      />
      <div className="space-y-8">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-white/60">Types</h2>
            <ul className="flex flex-row gap-2 text-cyan-400/70">
              {pokemonDetails.types.map((type: any) => (
                <li key={type.type.name}>
                  <TypeBadge type={type.type.name} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-white/60">Stats</h2>
            <ul className="flex flex-col gap-2 p-4 border border-white/30 rounded-md text-cyan-400/70">
              {pokemonDetails.stats.map((stat: any) => (
                <li
                  key={stat.stat.name}
                  className="flex flex-row gap-2 justify-between"
                >
                  <p>{stat.stat.name} </p>
                  <p>{stat.base_stat}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pokemon = await getPokemonDetail(slug);
  return {
    title: `${pokemon.name} - Pokemon App`,
  };
}
