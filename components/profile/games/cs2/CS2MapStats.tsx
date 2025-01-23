import { useGameProfileContext } from "@/components/context/GameContext";
import React from "react";
import Map from "./Map";
import Image from "next/image";

const CS2MapStats = () => {
  const { cs2ProfileData } = useGameProfileContext();
  return cs2ProfileData ? (
    <div className="flex flex-col w-full lg:w-[60%]">
      <h1 className="font-bold text-xl">Player Stats</h1>
      <div className="mt-4 grid md:space-y-0 space-y-4 md:grid-cols-2 space-x-2 rounded border border-[#303030] p-2 bg-[#1e1e1e]">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">Combat Stats</h1>
          <div className="rounded border grid grid-cols-3 gap-4 h-full border-[#303030] p-2 bg-[#1e1e1e]">
            <div className="flex flex-col border-[#303030] rounded border p-4 justify-center items-center">
              <h1 className="text-sm">KD Ratio</h1>
              <p className="text-lg font-bold">
                {cs2ProfileData.cs2Data?.kdRatio}%
              </p>
            </div>
            <div className="flex flex-col border-[#303030] rounded border p-4 justify-center items-center">
              <h1 className="text-sm">ADR</h1>
              <p className="text-lg font-bold">
                {cs2ProfileData.cs2Data?.averageDamagePerRound}
              </p>
            </div>
            <div className="flex flex-col border-[#303030] rounded border p-4 justify-center items-center">
              <Image
                src="/assets/headshot.svg"
                alt="headshot"
                width={24}
                height={24}
              />
              <p className="text-lg font-bold">
                {cs2ProfileData.cs2Data?.hsPercentage}
              </p>
            </div>
            <div className="flex flex-col items-center col-span-3">
              <Image
                src={`/assets/cs2/guns/${cs2ProfileData.cs2Data?.favoriteWeapon}.png`}
                alt="weapon"
                width={140}
                height={140}
                quality={100}
              />
              <h1 className="text-xl font-semibold text-center text-white">
                Favorite weapon
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">Maps</h1>
          <div className="h-72 overflow-y-auto scrollbar rounded border border-[#303030] p-2 bg-[#1e1e1e]">
            <div className="flex flex-col space-y-6">
              {cs2ProfileData &&
              cs2ProfileData.cs2Data.mapWinPercentages.length > 0 ? (
                cs2ProfileData.cs2Data.mapWinPercentages.map(
                  (map: any, idx: number) => <Map key={idx} map={map} />
                )
              ) : (
                <p>No recent matches</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default CS2MapStats;
