"use client";
import GameTable from "@/components/GameTable";
import ProfileStats from "@/components/ProfileStats";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next/client"; // Importing cookies-next for client-side cookie handling
import Link from "next/link";
import SteamLogin from "@/components/SteamLogin";

interface TableFilters {
  game: string;
  gameMode: string;
  language: string;
  rank: string;
}

const Page: React.FC = () => {
  const { data: session, update } = useSession();
  const steamId = session?.user.steamid || "null";
  useEffect(() => {
    console.log(session?.user.steamid)
    if (session?.user.steamid === "null") {
      // Trying to get steamId from client-side cookies
      const storedSteamId = getCookie("steamId") as string | undefined;
      if (storedSteamId) {
        
        update({
          steamid: storedSteamId || "null",
        }); // Update the session to get the latest data
      }
    }
  }, [session]);

  const [filters, setFilters] = useState<TableFilters>({
    game: "CS2",
    gameMode: "Competitive",
    language: "",
    rank: "",
  });

  return (
    <section className="min-h-screen h-full relative flex flex-col py-24 px-4 md:px-20">
      <div className="flex z-10 flex-col">
        {session && steamId !== "null" ? (
          <div className="flex items-center space-x-2 mb-4 md:mb-16">
            <Image
              src="/assets/game_icons/cs2.png"
              alt="Counter Strike 2"
              width={100}
              height={100}
              className="w-8 h-8"
            />
            <h1 className="text-sm font-bold">Counter Strike 2</h1>
          </div>
        ) : (
          <div className="flex items-center space-x-2 mb-16">
            <Image
              src="/assets/game_icons/cs2.png"
              alt="Counter Strike 2"
              width={100}
              height={100}
              className="w-24 h-24"
            />
            <div className="flex flex-col">
              <h1 className="text-lg lg:text-3xl font-bold">
                Counter Strike 2
              </h1>
              <h3 className="text-sm lg:text-base">
                Connect your account to see your stats and post or find partner
              </h3>
              {session ? (
                <SteamLogin />
              ) : (
                <Link
                  href="/login"
                  className="px-10 max-w-max hover:bg-[#4dc1bb] transition-colors duration-300 ease-in-out py-1 mt-2 rounded text-[#1c1c1c] font-bold bg-[#5AECE5]"
                >
                  Sign in to connect
                </Link>
              )}
            </div>
          </div>
        )}
        <ProfileStats
          onChange={(value: TableFilters) => setFilters(value)}
          gameName="CS2"
        />
        <GameTable filters={filters} />
      </div>
      <div className="absolute inset-0 top-0 overflow-hidden">
        <Image
          src="/assets/BGCS.png"
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
