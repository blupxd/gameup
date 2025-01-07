import { games } from "@/data/games";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const GameSection = () => {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold my-12 text-2xl md:text-3xl">Games</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link
            key={game.name}
            href={game.url}
            className="flex flex-col w-full h-full md:w-[250px] md:h-[340px]"
          >
            <div className="relative hover:scale-105 transition-transform duration-300 ease-in-out h-[250px] md:h-full overflow-hidden w-full rounded">
              <Image
                src={game.showcaseImage}
                alt={game.name}
                fill
                quality={100}
                className="object-cover"
              />
            </div>

            <h4 className="mt-4 text-lg lg:text-2xl font-bold">{game.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameSection;
