"use client";
import GameTable from "@/components/GameTable";
import ProfileStats from "@/components/ProfileStats";
import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import FortniteConnection from "@/components/FortniteConnection";
import Link from "next/link";

interface TableFilters {
  game: string;
  gameMode: string;
  language: string;
  rank: string;
}

const Page: React.FC = () => {
  const { data: session } = useSession();
  const epicGames = session?.user?.epicId;
  const [connection, setConnection] = useState<boolean>(false);
  const [filters, setFilters] = useState<TableFilters>({
    game: "Fortnite",
    gameMode: "Ranked Battle Royale",
    language: "",
    rank: "",
  });
 
  return (
    <section className="min-h-screen h-full relative flex flex-col py-24 px-4 md:px-20">
      <div className="flex z-10 flex-col">
        {session && epicGames !== "null" ? (
          <div className="flex items-center space-x-2 mb-4 md:mb-16">
            <Image
              src="/assets/game_icons/fortnite.webp"
              alt="Valorant"
              width={100}
              height={100}
              className="w-8 h-8"
            />
            <h1 className="text-sm font-bold">Fortnite</h1>
          </div>
        ) : (
          <div className="flex items-center space-x-2 mb-16">
            <Image
              src="/assets/game_icons/fortnite.webp"
              alt="Valorant"
              width={100}
              height={100}
              className="w-24 h-24"
            />
            <div className="flex flex-col">
              <h1 className="text-lg lg:text-3xl font-bold">Fortnite</h1>
              <h3 className="text-sm lg:text-base">
                Connect your account to see your stats and post or find partner
              </h3>
              {session ? (
                <button
                  onClick={() => setConnection(true)}
                  className="px-10 max-w-max hover:bg-[#4dc1bb] transition-colors duration-300 ease-in-out py-1 mt-2 rounded text-[#1c1c1c] font-bold bg-[#5AECE5]"
                >
                  Connect
                </button>
              ) : (
                <Link
                  href="/login"
                  className="px-10 max-w-max hover:bg-[#4dc1bb] transition-colors duration-300 ease-in-out py-1 mt-2 rounded text-[#1c1c1c] font-bold bg-[#5AECE5]"
                >
                  Sign in to connect
                </Link>
              )}
            </div>
            {connection && <FortniteConnection setConnection={setConnection} />}
          </div>
        )}
        <ProfileStats
          onChange={(value: TableFilters) => setFilters(value)}
          gameName="Fortnite"
        />
        <GameTable filters={filters} />
      </div>
      <div className="absolute inset-0 top-0 overflow-hidden">
        <Image
          src="/assets/BGFort.png"
          alt="Bg"
          quality={100}
          fill
          className="object-cover min-h-48 max-h-screen lg:max-h-full"
        />
      </div>
    </section>
  );
};

export default Page;
