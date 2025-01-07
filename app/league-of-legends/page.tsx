"use client";
import RiotConnection from "@/components/RiotConnection";
import GameTable from "@/components/GameTable";
import ProfileStats from "@/components/ProfileStats";
import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

interface TableFilters {
  game: string;
  gameMode: string;
  language: string;
  rank: string;
}

const Page: React.FC = () => {
  const { data: session } = useSession();
  const riotGames = session?.user?.riotId;
  const [connection, setConnection] = useState<boolean>(false);
  const [filters, setFilters] = useState<TableFilters>({
    game: "League of Legends",
    gameMode: "Ranked Solo/Duo",
    language: "",
    rank: "",
  });
  console.log(riotGames)
  return (
    <section className="min-h-screen h-full relative flex flex-col py-24 px-4 md:px-20">
      <main className="flex z-10 flex-col">
        {riotGames ? (
          <div className="flex items-center space-x-2 mb-4 md:mb-16">
            <Image
              src="/assets/game_icons/lol.png"
              alt="League of Legends"
              width={100}
              height={100}
              className="w-8 h-8"
            />
            <h1 className="text-sm font-bold">League of Legends</h1>
          </div>
        ) : (
          <div className="flex items-center space-x-2 mb-16">
            <Image
              src="/assets/game_icons/lol.png"
              alt="League of Legends"
              width={100}
              height={100}
              className="w-24 h-24"
            />
            <div className="flex flex-col">
              <h1 className="text-lg lg:text-3xl font-bold">League of Legends</h1>
              <h3 className="text-sm lg:text-base">
                Connect your account to see your stats and post or find partner
              </h3>
              <button
                onClick={() => setConnection(true)}
                className="px-10 max-w-max hover:bg-[#4dc1bb] transition-colors duration-300 ease-in-out py-1 mt-2 rounded text-[#1c1c1c] font-bold bg-[#5AECE5]"
              >
                Connect
              </button>
            </div>
            {connection && <RiotConnection setConnection={setConnection} />}
          </div>
        )}
        <ProfileStats onChange={(value: TableFilters) => setFilters(value)} gameName="League of Legends" />
        <GameTable filters={filters} />
      </main>
      <div className="absolute inset-0 -top-32 overflow-hidden">
        <Image
          src="/assets/BG.png"
          alt="Bg"
          quality={100}
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default Page;
