import { useGameProfileContext } from "@/components/context/GameContext";
import { Crown } from "lucide-react";
import Image from "next/image";
import React from "react";

const FortPlayer = () => {
  const { fortniteProfileData } = useGameProfileContext();
  return fortniteProfileData ? (
    <div className="flex flex-col w-full lg:w-[60%]">
      <h1 className="font-bold text-xl">Player Stats</h1>
      <div className="mt-4 rounded border border-[#303030] p-2 bg-[#1e1e1e]">
        <div className="flex flex-col items-center p-2 rounded overflow-hidden relative">
          <div className="grid text-xl w-full grid-cols-2 sm:grid-cols-3 z-10 gap-4 p-4">
            <div className="flex flex-col items-start bg-[#1e1e1e] bg-opacity-50 border border-[#303030] p-2 justify-center rounded">
              <div className="flex items-center text-lg space-x-1">
                <p>Wins</p>
                <Crown size={20} />
              </div>
              <h2 className="font-bold">{fortniteProfileData.wins}</h2>
            </div>
            <div className="flex flex-col items-start bg-[#1e1e1e] bg-opacity-50 border border-[#303030] p-2 justify-center rounded">
              <h1 className="text-lg">KD Ratio</h1>
              <h2 className="font-bold">{fortniteProfileData.kd}</h2>
            </div>
            <div className="flex flex-col items-start bg-[#1e1e1e] bg-opacity-50 border border-[#303030] p-2 justify-center rounded">
              <h1 className="text-lg">KPM</h1>
              <h2 className="font-bold">{fortniteProfileData.killsPerMatch}</h2>
            </div>
            <div className="flex flex-col items-start bg-[#1e1e1e] bg-opacity-50 border border-[#303030] p-2 justify-center rounded">
              <h1 className="text-lg">Top 5</h1>
              <h2 className="font-bold">{fortniteProfileData.top5}</h2>
            </div>
            <div className="flex flex-col items-start bg-[#1e1e1e] bg-opacity-50 border border-[#303030] p-2 justify-center rounded">
              <h1 className="text-lg">Top 10</h1>
              <h2 className="font-bold">{fortniteProfileData.top10}</h2>
            </div>
            <div className="flex flex-col items-start bg-[#1e1e1e] bg-opacity-50 border border-[#303030] p-2 justify-center rounded">
              <h1 className="text-lg">Top 25</h1>
              <h2 className="font-bold">{fortniteProfileData.top25}</h2>
            </div>
            <div className="flex col-span-2 sm:col-span-3 flex-col items-start p-2 justify-center ">
              <h1 className="text-lg">Total matches played</h1>
              <h2 className="font-bold">{fortniteProfileData.matches}</h2>
            </div>
          </div>
          <Image
            src="/assets/fortnite/fnStatBg.jpg"
            alt="Fortnite Stats"
            fill
            className="object-cover opacity-30"
          />
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default FortPlayer;
