import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps {
  id: string;
  name: string;
  image: string;
}
const PokemonCard = ({ id, name, image }: PokemonCardProps) => {
  return (
    <Link href={`/pokemon/${name}`}>
    <div className="flex flex-col border border-white/10 items-center rounded-xl p-4 w-58 shadow-white/5 shadow-md hover:shadow-cyan-400/30 hover:shadow-lg">
      <div className="w-32 border border-white/0 rounded-xl">
        <Image
          width={200}
          height={200}
          src={image}
          alt={name}
          className="rounded-xl"
        />
      </div>
      <h3 className="text-xl font-bold px-2 text-white/50 capitalize">{name}</h3>
    </div>
    </Link>
  );
};

export default PokemonCard;
